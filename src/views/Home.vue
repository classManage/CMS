<template>
  <el-container class="home-container">
    <el-header :style="themeHeader">
      <Header @handleCollapse="handleCollapse" :isCollapse="isCollapse"></Header>
    </el-header>
    <el-container>
      <el-aside style="width: auto;" :style="themeSidebar">
        <Sidebar :isCollapse="isCollapse"></Sidebar>
      </el-aside>
      <el-main>
        <el-breadcrumb separator-class="el-icon-arrow-right" style="margin-bottom: 20px">
          <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
          <el-breadcrumb-item>活动管理</el-breadcrumb-item>
          <el-breadcrumb-item>活动列表</el-breadcrumb-item>
          <el-breadcrumb-item>活动详情</el-breadcrumb-item>
        </el-breadcrumb>
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import { Sidebar, Header } from "@/utils/components";
import { mapState } from "vuex";

export default {
  data() {
    return {
      isCollapse: false //菜单折叠
    };
  },
  computed: {
    ...mapState("theme", ["themeHeader", "themeSidebar"]) //主题，为了实现多皮肤切换
  },
  components: {
    Sidebar,
    Header
  },
  methods: {
    handleCollapse() {
      this.isCollapse = !this.isCollapse;
    }
  },
  mounted() {}
};
</script>

<style scoped>
.home-container {
  height: 100%;
}
</style>
