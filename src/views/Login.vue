<template>
  <!-- 登录界面 -->
  <div class="login-interface">
    <div class="login-box">
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      <div class="box-title">班级管理</div>
      <el-form :model="param" :rules="rules" ref="login" label-width="0px" class="box-content">
        <el-form-item prop="username">
          <el-input v-model="param.username" ref="myinput" placeholder="admin">
            <el-button slot="prepend" icon="el-icon-s-custom"></el-button>
          </el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input type="password" v-model="param.password" placeholder="password">
            <el-button slot="prepend" icon="el-icon-lock"></el-button>
          </el-input>
        </el-form-item>
        <div class="login-btn">
          <el-button type="primary" @click="submitForm">登录</el-button>
        </div>
        <el-button type="text" @click="dialog = true">新用户注册</el-button>
        
      </el-form>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      param: {
        username: "",
        password: ""
      },
      //  这是表单的验证规则对象
      rules: {
        username: [
          { required: true, message: "请输入用户名", trigger: "blur" },
          { min: 3, max: 10, message: "长度在 3 到 10 个字符", trigger: "blur" }
        ],
        password: [
          { required: true, message: "请输入密码", trigger: "blur" },
          { min: 3, max: 16, message: "长度在 3 到 16 个字符", trigger: "blur" }
        ]
      }
    };
  },
  mounted() {
    this.$refs.myinput.focus();
  },
  methods: {
    submitForm() {
      axios
        .post("http://localhost:5000/login", {
          name: this.param.username,
          password: this.param.password
        })
        .then(res => {
          console.log(res.data);
        });
      // this.$refs.login.validate(valid => {
      //   // console.log(valid)
      //   if (valid) {
      //     this.$message.success("登录成功");
      //     this.$router.push("/home");
      //   } else {
      //     this.$message.error("请输入账号和密码");
      //     console.log("error submit!!");

      //     return false;
      //   }
      // });
    }
  }
};
</script>

<style scoped>
.login-interface {
  position: relative;
  width: 100%;
  height: 100%;
  background-image: url("https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1587061999219&di=581c6403ca4cbe36aaa4b4b937fbaf77&imgtype=0&src=http%3A%2F%2Fpic1.win4000.com%2Fwallpaper%2F2017-10-18%2F59e6b63354e02.jpg");
  background-size: cover;
  filter: blur(0.1);
}
.login-box {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 350px;
  height: 350px;
  background: rgba(225, 225, 255, 0.3);
  box-sizing: border-box;
  overflow: hidden;
  box-shadow: 0 20px 50px rgb(225, 225, 225, 0.1);
  border-radius: 5px;
}

.box-title {
  width: 100%;
  position: absolute;
  left: 0;
  text-align: center;
  line-height: 50px;
  font-size: 20px;
  color: #fff;
  border-bottom: 1px solid #ddd;
}
.login-box span {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: block;
  box-sizing: border-box;
}

.login-box span:nth-child(1) {
  transform: rotate(0deg);
}

.login-box span:nth-child(2) {
  transform: rotate(90deg);
}

.login-box span:nth-child(3) {
  transform: rotate(180deg);
}

.login-box span:nth-child(4) {
  transform: rotate(270deg);
}

.login-box span:before {
  content: "";
  position: absolute;
  width: 100%;
  height: 2px;
  background: #50dfdb;
  animation: animate 4s linear infinite;
}

@keyframes animate {
  0% {
    transform: scaleX(0);
    transform-origin: left;
  }
  50% {
    transform: scaleX(1);
    transform-origin: left;
  }
  50.1% {
    transform: scaleX(1);
    transform-origin: right;
  }

  100% {
    transform: scaleX(0);
    transform-origin: right;
  }
}
.box-content {
  padding: 100px 30px;
  position: relative;
}
.login-btn {
  text-align: center;
}
.login-btn button {
  width: 100%;
  height: 36px;
  margin-bottom: 10px;
}
</style>
