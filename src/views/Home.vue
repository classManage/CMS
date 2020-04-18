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
import { profile, setLocalToken } from "@/utils/ajax";

export default {
  data() {
    return {
      isCollapse: true //菜单折叠
    };
  },
  computed: {
    ...mapState("theme", ["themeHeader", "themeSidebar"]), //主题，为了实现多皮肤切换
    ...mapState(["userInfo"])
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
  mounted() {
    //如果vuex中没有用户信息，则尝试根据token更新用户信息
    if (!Object.keys(this.userInfo).length) {
      profile()
        .then(data => {
          console.log(data);
          this.$store.commit("changeUserInfo", data);
        })
        .catch(err => {
          console.log(err);
          //如果token过期则清空token并跳到login
          setLocalToken("");
          this.$router.push("/login");
        });
    }
  }
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
