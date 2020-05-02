const fs = require("fs");
const { Classes } = require("./mongo");

Classes.findOne({ class: "18移动互联网应用技术高技班" }, (err, doc) => {
  if (err) return console.log("失败");

  let str = fs.readFileSync("./18移动班级名单.json", "utf-8");
  let json = JSON.parse(str);
  doc.students = json.map(v => {
    return {
      SID: v.id,
      name: v.name,
      sex: v.sex,
      position: "学生",
      alter: false,
      kaoqin: {
        late: v.late,
        leave: v.leave,
        absent: v.absent,
        please: v.please
      },
      classFee: {
        success: 0
      }
    };
  });
  doc.save((err, res) => {
    if (err) return console.log("保存失败");
    console.log(res);
  });
});

// let classes = {
//   class: "18移动互联网应用技术高技班",
//   classHonor: ["优秀班级体", "文明班级", "课业训练优秀作品", "模范班级"],
//   classFee: {
//     max: 0,
//     receive: 0,
//     surplus: 0,
//     record: []
//   },
//   admin: {
//     name: "许锦辉",
//     honor: ["优秀教师", "道德模范", "活雷锋"],
//     phone: "17569985132",
//     duration: "3年"
//   },
//   students: []
// };

// let str = fs.readFileSync("./18移动班级名单.json", "utf-8");
// let json = JSON.parse(str);
// classes.students = json.map(v => {
//   return {
//     SID: v.id,
//     name: v.name,
//     sex: v.sex,
//     position: "学生",
//     kaoqin: {
//       late: v.late,
//       leave: v.leave,
//       absent: v.absent,
//       please: v.please
//     },
//     classFee: {
//       success: 0
//     }
//   };
// });
// Classes.create(classes).then(res => {
//   console.log("成功");
// });
// fs.writeFileSync("./18移动班级名单.json", JSON.stringify(arr));
