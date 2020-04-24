<template>
  <el-collapse v-model="collapse" accordion>
    <el-collapse-item :name="i" v-for="(d,i) in data" :key="d.title">
      <template slot="title">
        <div class="title-wrap">
          <span class="title">{{d.title}}</span>
          <span class="title-date">{{d.createDate}}</span>
        </div>
      </template>
      <div class="content">
        <div class="row">
          <div class="i-title">时间&地点：</div>
          <div class="i-content">{{d.position}}</div>
        </div>
        <div class="row">
          <div class="i-title">活动内容：</div>
          <div class="i-content">{{d.content}}</div>
        </div>
        <div class="row">
          <div class="i-title">结束时间：</div>
          <div class="i-content">{{d.endDate}}</div>
        </div>
        <div class="row">
          <div class="i-title">联系方式：</div>
          <div class="i-content">{{d.contact}}</div>
        </div>
      </div>
      <div v-if="!hideFoot">
        <div class="foot">
          <el-button type="primary" size="small">我要参加</el-button>
        </div>
        <el-progress :percentage="50" :show-text="false"></el-progress>
      </div>
    </el-collapse-item>
  </el-collapse>
</template>

<script>
export default {
  props: {
    data: Array, //包含活动内容的数组
    hideFoot: Boolean
  }
};
</script>

<style lang="less" scoped>
.title {
  color: #409eff;
  font-size: 12px;
}
.title-wrap {
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-right: 50px;
  box-sizing: border-box;
}
.title-date {
  color: #909399;
  font-size: 11px;
}
.content {
  padding-left: 20px;
}
.row {
  margin-bottom: 5px;
}
.i-title {
  font-size: 12px;
  font-weight: bold;
}
.i-content {
  font-size: 12px;
  text-indent: 2em;
}
.foot {
  display: flex;
  justify-content: flex-end;
  align-items: center;
  margin-bottom: 20px;
}
</style>