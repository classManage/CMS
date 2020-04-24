const fs = require("fs");

let str = fs.readFileSync("./18移动班级名单.json", "utf-8");
let json = JSON.parse(str);
let arr = json.map(v => {
  return Object.assign(v, {
    sex: "男",
    late: Math.floor(Math.random() * 11),
    leave: Math.floor(Math.random() * 21),
    absent: Math.floor(Math.random() * 11),
    please: Math.floor(Math.random() * 31)
  });
});
fs.writeFileSync("./18移动班级名单.json", JSON.stringify(arr));
