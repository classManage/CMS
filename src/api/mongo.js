const mongoose = require("mongoose");

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
    
  },
  sex: { type: String, enum: ["男", "女", "保密"] },
  email: { type: String },
  phone: { type: String },
  SID: { type: String },
  nickname: { type: String }
});
let Users = mongoose.model("users", schema);
// Users.db.dropCollection("users")//删除所有数据
module.exports = { Users };
