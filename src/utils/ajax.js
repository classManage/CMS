import axios from "axios";

let instance = axios.create({ timeout: 10000 });
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
      });
  });
};

//班级信息
export const getClasses = className => {
  return new Promise((resolve, reject) => {
    instance({
      url: url + "/classes",
      method: "POST",
      data: {
        class: className
      }
    })
      .then(res => {
        resolve(res.data);
      })
      .catch(err => {
        reject(err);
      });
  });
};

//改变应缴班费
export const changeMaxMoney = (className, obj) => {
  return new Promise((resolve, reject) => {
    instance({
      url: url + "/changeMaxMoney",
      method: "POST",
      data: {
        class: className,
        obj
      }
    })
      .then(res => {
        resolve(res.data);
      })
      .catch(err => {
        reject(err);
      });
  });
};

//改变剩余班费
export const changeSurplusMoney = (className, { num, detail }) => {
  return new Promise((resolve, reject) => {
    instance({
      url: url + "/changeSurplusMoney",
      method: "POST",
      data: {
        class: className,
        num,
        detail
      }
    })
      .then(res => {
        resolve(res.data);
      })
      .catch(err => {
        reject(err);
      });
  });
};

//学生缴费
export const studentPayMoney = (className, { max, students }) => {
  return new Promise((resolve, reject) => {
    instance({
      url: url + "/studentAddMoney",
      method: "POST",
      data: {
        class: className,
        max,
        students
      }
    })
      .then(res => {
        resolve(res.data);
      })
      .catch(err => {
        reject(err);
      });
  });
};

//选课操作
export const handleSCourse = data => {
  return new Promise((resolve, reject) => {
    instance({
      url: url + "/handleSCourse",
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
