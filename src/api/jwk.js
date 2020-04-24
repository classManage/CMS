// 引入模块依赖
const jwt = require("jsonwebtoken");

let secret = "I_LOVE_JING";

//生成token
const generateToken = payload => {
  let token = jwt.sign(payload, secret, { expiresIn: 10 * 60 * 6 });
  return token;
};

// 校验token
const verifyToken = token => {
  let payload = jwt.verify(token, secret);
  return payload;
};

// 解析token
const decodeToken = token => {
  return jwt.decode(token);
};

module.exports = {
  generateToken,
  verifyToken,
  decodeToken
};
