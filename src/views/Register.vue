<template>
  <div>
    <el-button type="text" class="re-button" @click="dialog = true"
      >注册用户</el-button
    >
    <el-drawer title="新用户注册" :visible.sync="dialog" direction="ltr">
      <el-form
        :model="ruleForm"
        :rules="rules"
        ref="ruleForm"
        label-width="80px"
         >
        <el-form-item label="用户名" prop="username">
          <el-input v-model="ruleForm.username" class="re-input"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input v-model="ruleForm.password" class="re-input"></el-input>
        </el-form-item>
        <el-form-item label="性别" prop="sex">
          <el-input v-model="ruleForm.sex" class="re-input"></el-input>
        </el-form-item>
        <el-form-item label="邮箱" prop="email">
          <el-input v-model="ruleForm.email" class="re-input"></el-input>
        </el-form-item>
        <el-form-item label="手机号码" prop="phone">
          <el-input v-model="ruleForm.phone" class="re-input"></el-input>
        </el-form-item>
        <el-form-item label="学号" prop="SID">
          <el-input v-model="ruleForm.SID" class="re-input"></el-input>
        </el-form-item>
        <el-form-item label="昵称" prop="nickname">
          <el-input v-model="ruleForm.nickname" class="re-input"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="nsubmitForm('ruleForm')"
            >立即创建</el-button
          >
          <el-button @click="resetForm('ruleForm')" class="reg-reset">重置</el-button>
        </el-form-item>
      </el-form>
    </el-drawer>
  </div>
</template>
<script>
import { register } from "@/utils/ajax";
export default {
  data() {
    var checkEmail = (rule, value, cb) => {
      const regEmail = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+/;
      if (regEmail.test(value)) {
        return cb();
      }
      cb(new Error("请输入合法的邮箱"));
    };
    var checkPhone = (rule, value, cb) => {
      const regPhone = /^1[3|4|5|7|8][0-9]{9}$/;
      if (regPhone.test(value)) {
        return cb();
      }
      cb(new Error("请输入合法的手机号码"));
    };
    return {
      ruleForm: {
        username: "",
        password: "",
        sex: "",
        email: "",
        phone: "",
        SID: "",
        nickname: ""
      },
      dialog: false,
      size: "50%",

      //  这是表单的验证规则对象
      rules: {
        username: [
          { required: true, message: "请输入用户名", trigger: "blur" },
          { min: 3, max: 10, message: "长度在 3 到 10 个字符", trigger: "blur" }
        ],
        password: [
          { required: true, message: "请输入密码", trigger: "blur" },
          { min: 3, max: 16, message: "长度在 3 到 16 个字符", trigger: "blur" }
        ],
        sex: [
          { required: true, message: "请输入性别", trigger: "blur" },
          { min: 1, max: 1, message: "长度只能有1个字符", trigger: "blur" }
        ],
        SID: [
          { required: true, message: "请输入学号", trigger: "blur" },
          { min: 3, max: 15, message: "长度在 3 到 15 个字符", trigger: "blur" }
        ],
        nickname: [
          { required: true, message: "请输入昵称", trigger: "blur" },
          {
            min: 0,
            max: 10,
            message: "长度不得大于 10 个字符",
            trigger: "blur"
          }
        ],
        email: [
          { required: true, message: "请输入邮箱", trigger: "blur" },
          { validator: checkEmail, trigger: "blur" }
        ],
        phone: [{ validator: checkPhone, trigger: "blur" }]
      }
    };
  },
  methods: {
    nsubmitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          register(this.ruleForm)
            .then(data => {
              console.log(data);
              this.$message.success("注册成功");
              alert("恭喜你注册成功");
            })
            .catch(err => {
              alert(err);
            });
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    }
  }
};
</script>
<style scoped>
.re-button {
  position: absolute;
  left: 48.555%;
  top: 62%;
}
.re-input{
  width:450px;
}
.reg-reset{
  margin-left: 240px;
  padding: 12px 40px;
}

</style>
