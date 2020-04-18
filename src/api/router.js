const express = require("express");
const router = express.Router();
const bodyParser = require("body-parser");
const fs = require("fs");
const { Users } = require("./mongo");
const bcrypt = require("bcrypt");
const { generateToken, verifyToken } = require("./jwk");

// let jsonParser = bodyParser.json();
let jsonParser = express.json();

function message(text) {
  return { message: text };
}

/**
 * 登录
 * username: 用户名
 * password: 密码
 */
router.post("/login", jsonParser, async (req, res) => {
  let user = await Users.findOne({
    username: req.body.username
  });
  if (!user) {
    return res.status(422).send(message("用户不存在"));
  }
  let isPasswordValid = bcrypt.compareSync(req.body.password, user.password);
  if (!isPasswordValid) {
    return res.status(423).send(message("密码无效"));
  }
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
router.post("/register", jsonParser, async (req, res) => {
  try {
    let data = await Users.create({
      username: req.body.username,
      password: req.body.password,
      sex: req.body.sex,
      email: req.body.email || "",
      phone: req.body.phone || "",
      SID: req.body.SID,
      nickname: req.body.nickname
    });
    res.send(data);
  } catch (err) {
    if (err.code == 11000) {
      return res.status(422).send(message("账号已存在"));
    }
    console.log(err);
    res.status(423).send(message("信息错误"));
  }
});

router.get("/users", async (req, res) => {
  let users = await Users.find();
  res.send(users);
});

/**
 * 个人信息
 */
router.get("/profile", async (req, res) => {
  let token = String(req.headers.authorization)
    .split(" ")
    .pop();
  try {
    let { id } = verifyToken(token);
    let user = await Users.findById(id);
    res.send({
      username: user.username,
      sex: user.sex,
      email: user.email,
      phone: user.phone,
      SID: user.SID,
      nickname: user.nickname
    });
  } catch (err) {
    res.status(422).send(message("token无效"));
  }
});

/**
 * 检查token有效性
 */
// router.get('/checkToken', (req, res)=>{
//     let token = String(req.headers.authorization)
//         .split(" ")
//         .pop();
//         try{
//             verifyToken(token);
//             res.send
//         }catch(err){
//             res.send(message('有效token'))
//         }
// })

module.exports = router;
