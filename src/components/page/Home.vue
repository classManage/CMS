<template>
  <el-container class="home-container">
    <el-header class="home-header">
      <div>
        <h2>班级管理</h2>
      </div>
      <el-button type="info" @click="logout">退出</el-button>
    </el-header>
    <el-container>
      <el-aside width="200px">
        <Sidebar></Sidebar>
      </el-aside>
      <el-main>
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import Sidebar from '@/components/page/Sidebar.vue'

export default {
  data() {
    return {};
  },
  components:{
    Sidebar
  },
  methods: {
    logout() {
      this.$router.push("/login");
    }
  }
};
</script>

<style scoped>
.home-container {
  height: 100%;
}
.home-header {
  background-color: rgb(68, 232, 247);
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: #fff;
  font-size: 20px;
}
.el-aside {
  background-color: rgb(112, 112, 112);
}
.el-aside .el-menu {
  border-right: none;
}
.el-main {
  background-color: #eaedf1;
}
.el-menu {
  background-color: rgb(112, 112, 112);
}
.el-submenu,
.el-menu-item {
  background-color: rgb(112, 112, 112);
}
</style>
