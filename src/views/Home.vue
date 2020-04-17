<template>
  <el-container class="home-container">
    <el-header :style="themeHeader">
      <Header
        @handleCollapse="handleCollapse"
        :isCollapse="isCollapse"
      ></Header>
    </el-header>
    <el-container>
      <el-aside style="width: auto;" :style="themeSidebar">
        <Sidebar :isCollapse="isCollapse"></Sidebar>
      </el-aside>
      <el-main>
        <Navigation></Navigation>
        <keep-alive>
          <router-view></router-view>
        </keep-alive>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import { Sidebar, Header, Navigation } from "@/utils/components";
import { mapState } from "vuex";

export default {
  data() {
    return {
      isCollapse: true //菜单折叠
    };
  },
  computed: {
    ...mapState("theme", ["themeHeader", "themeSidebar"]) //主题，为了实现多皮肤切换
  },
  components: {
    Sidebar,
    Header,
    Navigation
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
.el-main {
  color: #303133;
}
</style>
