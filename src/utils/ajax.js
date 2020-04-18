import axios from "axios";

let instance = axios.create({ timeout: 5000 });
const url = "http://localhost:5000/api";

instance.interceptors.request.use(
  req => {
    req.headers = {
      Authorization: "Bearer " + getLocalToken()
    };
    return req;
  },
  err => {
    console.log("请求拦截器异常：" + err);
  }
);

//设置token
export const setLocalToken = token => {
  localStorage.setItem("token", token);
};

//获取token
export const getLocalToken = () => {
  return localStorage.getItem("token") || "";
};

//设置用户名
export const setLocalUsername = name => {
  localStorage.setItem("username", name);
};

//获取用户名
export const getLocalUsername = () => {
  return localStorage.getItem("username") || "";
};

//注册
export const register = data => {
  return new Promise((resolve, reject) => {
    instance({
      url: url + "/register",
      method: "POST",
      data
    })
      .then(res => {
        resolve(res.data);
      })
      .catch(err => {
        reject(err);
      });
  });
};

//登录
export const login = data => {
  return new Promise((resolve, reject) => {
    instance({
      url: url + "/login",
      method: "POST",
      data
    })
      .then(res => {
        setLocalToken(res.data.token);
        resolve(res.data);
      })
      .catch(err => {
        reject(err);
      });
  });
};

//个人信息
export const profile = () => {
  return new Promise((resolve, reject) => {
    instance({
      url: url + "/profile",
      method: "GET"
    })
      .then(res => {
        resolve(res.data);
      })
      .catch(err => {
        reject(err);
        //如果不是token过期错误则抛出
        // if (err.response.status != 422) reject(err);
        // let data = identity();
        // data ? resolve(data) : reject(err)
      });
  });
};

/**
 * 认证身份，在token过期时执行
 */
// function identity() {
//     //用户名
//     let username = getLocalUsername();
//     if (username) {
//         let password = prompt(
//             "长期未认证请确认账户：" + username + " 的密码"
//         );
//         if (password) {
//             //根据当前用户输入的密码尝试登陆
//             login({ username, password })
//                 .then(data => data)
//                 .catch(err => identity());
//         }
//     }
//     return '';
// }
