const mongoose = require("mongoose");
// const bcrypt = require("bcrypt");
const md5 = require("./md5");

mongoose.connect(
  "mongodb+srv://new-user_01:ZXFLvg0DRfshS6By@cluster0-dkf7l.azure.mongodb.net/CMS?retryWrites=true&w=majority",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
  }
);
let schema = new mongoose.Schema({
  username: { type: String, unique: true },
  password: {
    type: String,
    set(val) {
      return md5.encrypto(val);
    }
  },
  sex: { type: String, enum: ["男", "女", "保密"] },
  email: { type: String },
  phone: { type: String },
  SID: { type: String },
  nickname: { type: String }
});
let Users = mongoose.model("users", schema);

let classesSchema = new mongoose.Schema({
  class: { type: String, unique: true },
  classHonor: { type: Array },
  classFee: {
    max: { type: Number, min: 0, max: 999999 },
    receive: { type: Number, min: 0, max: 999999 },
    surplus: { type: Number, min: 0, max: 999999 },
    record: [
      {
        content: { type: String },
        detail: { type: String },
        account: { type: String },
        timestamp: { type: String },
        type: { type: String }
      }
    ]
  },
  admin: {
    name: { type: String },
    honor: { type: Array },
    phone: { type: String },
    duration: { type: String }
  },
  students: [
    {
      SID: { type: String, unique: true },
      name: { type: String },
      sex: { type: String, enum: ["男", "女"] },
      position: { type: String },
      alter: { type: Boolean },
      kaoqin: {
        late: { type: Number },
        leave: { type: Number },
        absent: { type: Number },
        please: { type: Number }
      },
      classFee: {
        success: { type: Number }
      }
    }
  ]
});
let Classes = mongoose.model("classes", classesSchema);
// Users.db.dropCollection("users")//删除所有数据
module.exports = { Users, Classes };
