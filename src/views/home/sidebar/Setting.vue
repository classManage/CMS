<template>
  <div class="setting">
    <h2>主题设置</h2>
    <el-radio-group v-model="radio" @change="handleChange">
      <el-radio :label="1">简约黑</el-radio>
      <el-radio :label="2">简约白</el-radio>
      <el-radio :label="3">青春绿</el-radio>
      <el-radio :label="4">神秘紫</el-radio>
      <el-radio :label="5">夏日橘</el-radio>
    </el-radio-group>
  </div>
</template>

<script>
export default {
  data() {
    return {
      radio: 1
    };
  },
  methods: {
    //改变主题
    handleChange(num) {
      switch (num) {
        case 1:
          this.changeThemeState(
            ["setThemeText", { color: "white" }],
            ["setThemeHeader", { backgroundColor: "#242f42" }],
            ["setThemeSidebar", { backgroundColor: "#324157" }]
          );
          break;
        case 2:
          this.changeThemeState(
            ["setThemeText", { color: "#303133" }],
            ["setThemeHeader", { backgroundColor: "#eee" }],
            ["setThemeSidebar", { backgroundColor: "white" }]
          );
          break;
        case 3:
          this.changeThemeState(
            ["setThemeText", { color: "#303133" }],
            ["setThemeHeader", { backgroundColor: "#6BDC60" }],
            ["setThemeSidebar", { backgroundColor: "#A8EFA2" }]
          );
          break;
        case 4:
          this.changeThemeState(
            ["setThemeText", { color: "#303133" }],
            ["setThemeHeader", { backgroundColor: "#B673C9" }],
            ["setThemeSidebar", { backgroundColor: "#DDBEE6" }]
          );
          break;
        case 5:
          this.changeThemeState(
            ["setThemeText", { color: "#303133" }],
            ["setThemeHeader", { backgroundColor: "#ED8D34" }],
            ["setThemeSidebar", { backgroundColor: "#F5C79C" }]
          );
          break;
      }
    },
    changeThemeState(...args) {
      args.forEach(arr => {
        this.$store.commit(`theme/${arr[0]}`, arr[1]);
      });
    }
  }
};
</script>

<style lang="less" scoped>
.setting {
  color: #303133;
}
h2 {
  margin-bottom: 10px;
}
</style>
