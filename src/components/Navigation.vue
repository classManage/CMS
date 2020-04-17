<template>
  <div class="nav-wrap">
    <el-tag
      v-for="data in tags"
      :key="data.path"
      :class="data.path == activePath ? 'active-tag' : ''"
      size="small"
      closable
      effect="plain"
      @close="handleTagClose(data)"
      @click="handleTagClick(data)"
      >{{ data.title }}</el-tag
    >
  </div>
</template>

<script>
import { mapState } from "vuex";

export default {
  data() {
    return {
      tags: []
    };
  },
  computed: {
    ...mapState(["activePath"])
  },
  watch: {
    "$route.path": {
      //监听路由路径变化
      handler(path) {
        if (path.indexOf("/home/") != -1) {
          let exists = this.tags.some(item => {
            return item.path == path;
          });
          if (!exists) {
            //超过10个标签则先删掉第一个
            this.tags.length >= 10 && this.tags.shift();
            //不存在该标签则追加
            this.tags.push({
              title: this.$route.meta,
              path
            });
          }
          this.$store.commit("changeActivePath", path);
        }
      },
      deep: true,
      immediate: true
    }
  },
  methods: {
    handleTagClose(tag) {
      //确保永远保留一个标签不会被删除
      if (this.tags.length > 1) {
        this.tags.splice(this.tags.indexOf(tag), 1); //删除该标签
        //如果删除标签是当前路径的标签，则重新挑选其他标签的路径并进入
        if (tag.path == this.activePath) {
          let t = this.tags[this.tags.length - 1];
          this.$store.commit("changeActivePath", t.path);
          this.$router.push(t.path);
        }
      } else {
        this.$message.error("给我留一个，报错了你负责？");
      }
    },
    //点击标签路由定位到该标签的路径上
    handleTagClick(tag) {
      if (this.activePath != tag.path) {
        this.$store.commit("changeActivePath", tag.path);
        this.$router.push(tag.path);
      }
    }
  },
  mounted() {}
};
</script>

<style lang="less" scoped>
.nav-wrap {
  border-bottom: 1px solid #ccc;
  padding-bottom: 5px;
  margin-bottom: 20px;
}
.el-tag {
  margin-right: 10px;
  cursor: pointer;
}
.el-tag:hover:not(.active-tag) {
  background-color: #ecf5ff;
}
.active-tag {
  background-color: #ecf5ff;
}
</style>
