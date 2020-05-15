<template>
  <div class="header" v-loading.fullscreen.lock="fullscreenLoading">
    <div class="item">
      <i
        :class="
          (isCollapse ? 'el-icon-s-unfold' : 'el-icon-s-fold') + ' coll-button'
        "
        @click="handleCollapse"
      ></i>
      <h1>班级管理系统</h1>
    </div>

    <div class="item">
      <div class="user-block">
        <el-select
          v-model="value"
          placeholder="请选择要管理的班级"
          size="mini"
          class="class-select"
        >
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          ></el-option>
        </el-select>

        <el-avatar
          size="small"
          :src="require('@/assets/img/userIcon.jpeg')"
        ></el-avatar>

        <el-dropdown size="medium" @command="handleCommand">
          <span class="el-dropdown-link" :style="themeText">
            {{ userInfo.username }}
            <i class="el-icon-arrow-down el-icon--right"></i>
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item command="info">个人信息</el-dropdown-item>
            <el-dropdown-item command="logOff">注销</el-dropdown-item>
            <el-dropdown-item command="logOut" divided
              >退出登录</el-dropdown-item
            >
          </el-dropdown-menu>
        </el-dropdown>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import { setLocalToken, getClasses } from "@/utils/ajax";

export default {
  data() {
    return {
      options: [
        {
          value: "18移动互联网应用技术高技班",
          label: "18移动互联网"
        },
        {
          value: "18大数据",
          label: "18大数据"
        },
        {
          value: "19移动互联网",
          label: "19移动互联网"
        },
        {
          value: "18电子商务",
          label: "18电子商务"
        },
        {
          value: "18汽车维修五年",
          label: "18汽车维修五年"
        }
      ],
      value: "18移动互联网应用技术高技班",
      fullscreenLoading: false
    };
  },
  computed: {
    ...mapState("theme", ["themeText"]),
    ...mapState(["classes", "userInfo"])
  },
  props: {
    isCollapse: Boolean
  },
  watch: {
    value: {
      handler(newVal, oldVal) {
        if (newVal) {
          let index = this.classes.findIndex(v => v.class === newVal);
          if (index > -1) {
            this.$store.commit("changeCurrentClass", this.classes[index]);
          } else {
            this.fullscreenLoading = true;
            setTimeout(() => {
              getClasses(newVal)
                .then(data => {
                  console.log(data);
                  this.fullscreenLoading = false;
                  if (data) {
                    this.$store.commit("addClasses", data);
                    this.$store.commit("changeCurrentClass", data);
                    this.$message({
                      message: `当前管理班级：${newVal}`,
                      type: "success"
                    });
                  } else {
                    this.value = oldVal;
                    this.$message({
                      message: `没有找到该班级`,
                      type: "error"
                    });
                  }
                })
                .catch(() => {
                  this.fullscreenLoading = false;
                  setLocalToken("");
                  this.$router.push("/login");
                });
            }, 2000);
          }
        }
      },
      immediate: true
    }
  },
  methods: {
    handleCollapse() {
      this.$emit("handleCollapse");
    },
    handleCommand(comm) {
      //退出登录
      if (comm === "logOut") {
        //清空本地token
        setLocalToken("");
        this.$router.push("/login");
      }
    }
  }
};
</script>

<style lang="less" scoped>
.header {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.item {
  display: flex;
  align-items: center;
}
h1 {
  font-size: 1.2rem;
  font-weight: 500;
  margin-left: 20px;
}
.user-block {
  display: flex;
  align-items: center;
}
.el-dropdown-link {
  cursor: pointer;
  font-size: 12px;
  margin-left: 10px;
}
.class-select {
  margin-right: 50px;
}
.coll-button {
  cursor: pointer;
}
</style>
