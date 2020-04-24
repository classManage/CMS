const crypto = require("crypto");

const SECRET = "加点盐。。。";

module.exports = {
  //加密
  encrypto(password) {
    let str = password + SECRET;
    let md5 = crypto.createHash("md5");
    md5.update(str);
    let hash = md5.digest("hex");
    return hash;
  },
  //对比
  decrypto(password, hash) {
    return this.encrypto(password) === hash;
  }
};
