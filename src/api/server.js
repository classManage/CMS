const express = require('express');
const app = express();
const router = require('./router')

let server = app.listen(5000, ()=>{
    console.log(`${server.address().port}千块的电脑都买不起，送外卖去`)
})
app.all('*', (req, res, next)=>{
    res.header('Access-Control-Allow-Origin','*');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Content-Length, Authorization, Accept, X-Requested-With , yourHeaderFeild');
    res.header("X-Powered-By", ' 3.2.1')
    res.header("Access-Control-Max-Age", 600);//缓存预检请求，单位是秒
    next();
})
app.use(router)