const express = require("express");
const router = express.Router();
const bodyParser = require("body-parser");
const fs = require("fs");
const { Users, Classes } = require("./mongo");
// const bcrypt = require("bcrypt");
const { generateToken, verifyToken, decodeToken } = require("./jwk");
const md5 = require("./md5");

// let jsonParser = bodyParser.json();
let jsonParser = express.json();

//接口路径白名单，在其中的路径不用token验证
let whiteList = ["/login", "/register", "/users", "/db"];

function message(text) {
  return { message: text };
}

function getReqRemoteIp(req) {
  return (req.headers["x-forwarded-for"] || "").split(",")[0] || req.ip;
}

//获取当前指定格式的时间
function getNowTime(rule = "YYYY-MM-DD hh:mm:ss") {
  let d = new Date();
  let config = {
    YYYY: d.getFullYear(),
    MM: d.getMonth() + 1,
    DD: d.getDate(),
    hh: d.getHours(),
    mm: d.getMinutes(),
    ss: d.getSeconds()
  };
  for (const key in config) {
    rule = rule.replace(key, config[key]);
  }
  return rule;
}

router.use(jsonParser);

router.all("*", (req, res, next) => {
  if (!whiteList.find(p => p === req.path) && req.method !== "OPTIONS") {
    let token = String(req.headers.authorization)
      .split(" ")
      .pop();
    try {
      req.userId = verifyToken(token).id;
    } catch (err) {
      return res.status(403).end();
    }
  }
  next();
});

/**
 * 登录
 * username: 用户名
 * password: 密码
 */
router.post("/login", async (req, res) => {
  let user = await Users.findOne({ username: req.body.username });
  if (!user) return res.status(400).end();
  //   let isPasswordValid = bcrypt.compareSync(req.body.password, user.password);
  let isPasswordValid = md5.decrypto(req.body.password, user.password);
  if (!isPasswordValid) return res.status(400).end();
  res.send({
    userInfo: {
      username: user.username,
      sex: user.sex,
      email: user.email,
      phone: user.phone,
      SID: user.SID,
      nickname: user.nickname
    },
    token: generateToken({
      id: String(user._id)
    })
  });
});

/**
 * 注册
 * username: 用户名
 * password: 密码
 * sex: 性别
 * email: 电子邮箱（可选）
 * phone: 手机号（可选）
 * SID: 学号
 * nickname: 昵称
 *
 */
router.post("/register", async (req, res) => {
  try {
    let data = await Users.create({
      username: req.body.username,
      password: md5.encrypto(req.body.password),
      sex: req.body.sex,
      email: req.body.email || "",
      phone: req.body.phone || "",
      SID: req.body.SID,
      nickname: req.body.nickname
    });
    res.send(data);
  } catch (err) {
    if (err.code == 11000) return res.status(400).end();
    res.status(404).end();
  }
});

/**
 * 所有用户
 */
router.get("/users", async (req, res) => {
  let users = await Users.find();
  res.send(users);
});

/**
 * 个人信息
 */
router.get("/profile", async (req, res) => {
  let user = await Users.findById(req.userId);
  res.send({
    username: user.username,
    sex: user.sex,
    email: user.email,
    phone: user.phone,
    SID: user.SID,
    nickname: user.nickname
  });
});

/**
 * 班级信息
 * class 班级名
 */
router.post("/classes", async (req, res) => {
  let classInfo = await Classes.findOne({
    class: req.body.class
  });
  res.send(classInfo);
});

/**
 * 变更应缴班费
 * class 班级名
 * num 变更的金额
 */
router.post("/changeMaxMoney", async (req, res) => {
  try {
    let result = await Promise.all([
      Classes.updateOne(
        { class: req.body.class },
        { "classFee.max": req.body.obj.num }
      ),
      pushMoneyMessage(req.body.obj.record, req.userId, req.body.class)
    ]);
    res.send(result[1]);
  } catch (err) {
    return res.status(400).end();
  }
});

/**
 * 变更剩余班费
 * class 班级名
 * num 变更的金额
 * detail 细节描述
 */
router.post("/changeSurplusMoney", async (req, res) => {
  let num = req.body.num;
  Classes.findOne({ class: req.body.class }, (err, doc) => {
    if (err || num < 0 || num > doc.classFee.receive)
      return res.status(400).end();
    let space = num - doc.classFee.surplus;
    doc.classFee.surplus = num;
    let message = {
      content: `班费${
        space < 0 ? "支出" : "赎回"
        } ${space} ￥，【剩余班费】 ${num} ￥`,
      detail: req.body.detail,
      type: space < 0 ? "1" : "2"
    };
    Promise.all([
      doc.save(),
      pushMoneyMessage(message, req.userId, req.body.class)
    ])
      .then(result => {
        res.send(result[1]);
      })
      .catch(err => {
        res.status(400).end();
      });
  });
});

/**
 * 学生缴纳班费
 * class 班级名
 * max 是否让传入的学生全部交清
 * students[{
 *  id 学生id
 *  money 缴纳的金额
 * }]
 */
router.post("/studentAddMoney", (req, res) => {
  //寻找班级
  Classes.findOne({ class: req.body.class }, (err, doc) => {
    if (err) return res.status(400).end();
    let arr, message, receive, successArr;
    //每个学生最大缴费金额
    let everyMoney = doc.classFee.max / doc.students.length;
    if (req.body.max) {
      //直接缴清
      arr = req.body.students.map(v => {
        //遍历id修改金额和修改收到金额
        if (
          doc.students.some(i => {
            if (i._id == v.id) {
              let num = everyMoney - i.classFee.success;
              doc.classFee.receive += num;
              doc.classFee.surplus += num;
              return (i.classFee.success = everyMoney);
            }
          })
        )
          return { id: v.id, money: everyMoney };
        return "";
      });
      receive = doc.classFee.receive;
      successArr = arr.filter(v => v);
      message = {
        content: `${arr.length} 人尝试一键缴清，成功 ${successArr.length} 人，【收到班费】 ${receive} ￥`,
        type: "2"
      };
    } else {
      let num, name;
      arr = req.body.students.map(v => {
        //设置缴费金额取值范围
        if (v.money > everyMoney || v.money < 0) return "";
        //遍历id修改金额和修改收到金额
        if (
          doc.students.some(i => {
            if (i._id == v.id) {
              num = v.money - i.classFee.success;
              doc.classFee.receive += num;
              doc.classFee.surplus += num;
              name = i.name;
              return (i.classFee.success = v.money);
            }
          })
        )
          return { id: v.id, money: v.money };
        return "";
      });
      receive = doc.classFee.receive;
      successArr = arr;
      message = {
        content: `【${name}】缴费 ${(num < 0 ? "" : "+") +
          num} ￥成功，【收到班费】 ${receive} ￥`,
        type: num < 0 ? "1" : "2"
      };
    }
    let surplus = doc.classFee.surplus;
    Promise.all([
      doc.save(),
      pushMoneyMessage(message, req.userId, req.body.class)
    ])
      .then(result => {
        res.send({ successArr, receive, surplus, message: result[1] });
      })
      .then(() => {
        res.status(400).end();
      });
  });
});

/**
 * 追加资金变动记录
 * className 班级名
 * userId 用户名
 * record{
 *  content 内容
 *  detail 细节
 *  type 消息类型(String) 1:扣款 2:收入 3:应缴班费
 * }
 */
function pushMoneyMessage(record, userId, className) {
  return new Promise((resolve, reject) => {
    let { content, detail, type } = record;
    if (!content || !["1", "2", "3"].find(v => v === type)) return reject();
    Users.findById(userId, (err, doc) => {
      if (err) return reject();

      Classes.findOne({ class: className }, (err, docu) => {
        if (err) return reject();
        let recordObj = {
          content,
          detail: detail || "",
          account: doc.username,
          timestamp: getNowTime(),
          type
        };
        docu.classFee.record.push(recordObj);
        // docu.classFee.record = [];
        docu.save(err => {
          if (err) return reject();
          resolve(recordObj);
        });
      });
    });
  });
}

/**
 * （追加，删除，修改）选课
 * clName: 班级全称
 * id: 学生id
 * oldCName: 课程名
 * newCName: 新课程名（mode不是u可以不传）
 * date: 时间
 * mode: 模式（a: 追加，d: 删除，u: 修改）
 */
router.post('/handleSCourse', async (req, res) => {
  let { clName, id, oldCName, newCName, date, mode } = req.body;
  try {
    let classObj = await Classes.findOne({ class: clName });
    switch (mode) {
      case 'a':
        if(!classObj.students.find(v => v._id == id).selectCourse.find(v=>v.courseName==oldCName))
        classObj.students.find(v => v._id == id).selectCourse.push({
          courseName: oldCName,
          dateTime: date
        })
        break;
      case 'd':
        classObj.students.find(v => v._id == id).selectCourse = classObj.students.find(v => v._id == id).selectCourse.filter(v=>{
          if(v.courseName!=oldCName) return v;
        })
        break;
      case 'u':
        classObj.students.find(v => v._id == id).selectCourse.forEach(v=>{
          if(v.courseName==oldCName){
            v.courseName = newCName;
            v.dateTime = date;
          }
        })
        break;
    }
    await classObj.save();
    res.send('成功')
  } catch (err) {
    res.send(err)
  }
})

/**
 * db.json
 */
router.get("/db", (req, res) => {
  // res.header('Content-Type', 'applition/json')
  res.sendFile(__dirname + "/db.json");
});

module.exports = router;
