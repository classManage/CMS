<template>
  <!-- 导航 -->
  <el-menu
    :default-active="activePath | filterActivePath"
    class="el-menu-vertical-demo"
    :collapse="isCollapse"
    :background-color="themeSidebar.backgroundColor"
    :text-color="themeText.color"
    unique-opened
    router
  >
    <el-menu-item index="basic">
      <i class="el-icon-s-home"></i>
      <span slot="title">管理首页</span>
    </el-menu-item>

    <el-menu-item index="base">
      <i class="el-icon-s-data"></i>
      <span slot="title">基本情况</span>
    </el-menu-item>

    <el-submenu index="3">
      <template slot="title">
        <i class="el-icon-s-claim"></i>
        <span>考勤</span>
      </template>
      <el-menu-item index="check">
        <template slot="title">
          <span>签到</span>
        </template>
      </el-menu-item>
      <el-menu-item index="historyCheck">
        <template slot="title">
          <span>历史考勤</span>
        </template>
      </el-menu-item>
    </el-submenu>

    <el-menu-item index="classFee">
      <i class="el-icon-money"></i>
      <span slot="title">班费</span>
    </el-menu-item>

    <el-submenu index="5">
      <template slot="title">
        <i class="el-icon-s-grid"></i>
        <span>课表</span>
      </template>
      <el-menu-item index="schedule">
        <template slot="title">
          <span>课程表</span>
        </template>
      </el-menu-item>
      <el-menu-item index="optionalcourse">
        <template slot="title">
          <span>选修课</span>
        </template>
      </el-menu-item>
    </el-submenu>

    <el-menu-item index="scoreinquiry">
      <i class="el-icon-s-marketing"></i>
      <span slot="title">成绩查询</span>
    </el-menu-item>

    <el-submenu index="7">
      <template slot="title">
        <i class="el-icon-s-flag"></i>
        <span>班级风采</span>
      </template>
      <el-menu-item index="activity">
        <template slot="title">
          <span>活动</span>
        </template>
      </el-menu-item>
      <el-menu-item index="photo">
        <template slot="title">
          <span>相册</span>
        </template>
      </el-menu-item>
    </el-submenu>

    <el-menu-item index="setting">
      <i class="el-icon-s-tools"></i>
      <span slot="title">系统设置</span>
    </el-menu-item>

    <el-menu-item index="9">
      <i class="el-icon-s-opportunity"></i>
      <span slot="title">意见&反馈</span>
    </el-menu-item>
  </el-menu>
</template>

<style lang="less" scoped>
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 200px;
  min-height: 400px;
}
.el-menu-vertical-demo {
  height: 100%;
}
</style>

<script>
import { mapState } from "vuex";

export default {
  data() {
    return {};
  },

  props: {
    isCollapse: Boolean //折叠
  },
  computed: {
    ...mapState("theme", ["themeText", "themeSidebar"]),
    ...mapState(["activePath"])
  },
  methods: {},
  mounted() {},
  filters: {
    filterActivePath(path) {
      return path.slice(path.lastIndexOf("/") + 1);
    }
  }
};
</script>
