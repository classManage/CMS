<template>
  <!-- 相册 -->
  <div class="block">
    <el-timeline class="b-timeline">
      <el-timeline-item
        class="b-timeline-item"
        v-for="item in mydata"
        :key="item.id"
        :timestamp="item.timestamp"
        placement="top"
      >
        <el-card class="b-card">
          <h4>{{ item.title }}</h4>
          <div class="demo-image__lazy" scroll-container>
            <el-image
              class="b-image"
              v-for="url in item.image"
              :key="url"
              :src="url"
              lazy
              :preview-src-list="item.image"
            ></el-image>
          </div>
          <span><strong>提示:</strong>用鼠标点击图片可开启预览功能</span>
        </el-card>
      </el-timeline-item>
    </el-timeline>
  </div>
</template>
<script>
export default {
  data() {
    return {
      mydata: []
    };
  },
  mounted() {
    this.$axios.get("/json/pdata.json").then(res => {
      console.log(res.data.dataArry);
      this.mydata = res.data.dataArry;
    });
  }
};
</script>
<style lang="less" scoped>
.block {
  height: 100%;
  overflow-y: auto;
  overflow-x: hidden;
}
.b-timeline {
  height: 100%;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
}

.b-card {
  height: 500px;
  width: 500px;
}
.demo-image__lazy {
  width: 460px;
  height: 400px;
  border: 2px solid #eee;
  overflow-y: scroll;
  border-radius: 5px;
}
.b-image {
  width: 100%;
  height: 400px;
}
.b-image img {
  width: 100%;
  height: 100%;
  border-radius: 5px;
}
h4 {
  margin-top: 0;
  text-align: center;
  margin-bottom: 15px;
  font-size: 18px;
}
span {
  line-height: 30px;
}
</style>
