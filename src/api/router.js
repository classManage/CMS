const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const fs = require('fs')

let jsonParser = bodyParser.json();

/**
 * 登录
 * name: 用户名
 * password: 密码
 */
router.post('/login', jsonParser, (req, res) => {
    let body = req.body;
    let [name, pwd] = [body.name, body.password];
    let user = fs.readFileSync(__dirname + '/static/user.js', 'utf-8');
    if (user) {
        let result = JSON.parse(user).some(v => (v.name == name) && (v.password == pwd));
        result && res.send('欢迎你：' + name)
    }
    res.send({ err: '登录失败，账号或密码错误' })
})

module.exports = router