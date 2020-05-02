<template>
  <div class="schedule">
    <el-button type="primary">增加</el-button>
    <el-button type="info" plain>导出课表</el-button>
    <div class="title">
      <div class="titlefirst">课</div>
      <div class="titlesecond">程</div>
      <div class="titlethirdly">表</div>
    </div>
    <el-row :gutter="12" class="box">
      <el-col :span="3">
        <el-card shadow="hover">
          <el-tree
            :data="data"
            accordion
            node-key="id"
            size="small"
            :default-expanded-keys="[3, 10]"
            :default-checked-keys="[10]"
            @node-click="handleNodeClick"
          >
          </el-tree>
        </el-card>
      </el-col>
      <el-col :span="15" class="two">
        <el-card shadow="hover">
          <ClasSchedule></ClasSchedule>
        </el-card>
      </el-col>
      <el-col :span="5">
        <el-card shadow="hover">
          提示<br />
          <span>课程表有效时间:2020-2-26至2020-6-26有效</span>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>
<script>
import { ClasSchedule } from "@/utils/components";
export default {
  data() {
    return {
      data: [
        {
          id: 1,
          label: "16级",
          children: [
            { label: "16移动互联网", id: 4 },
            { label: "16大数据", id: 5 },
            { label: "16java程序设计", id: 6 }
          ]
        },
        {
          id: 2,
          label: "17级",
          children: [
            { label: "17移动互联网", id: 7 },
            { label: "17大数据", id: 8 },
            { label: "17java程序设计", id: 9 }
          ]
        },
        {
          id: 3,
          label: "18级",
          children: [
            { label: "18移动互联网", id: 10 },
            { label: "18大数据", id: 11 },
            { label: "18java程序设计", id: 12 }
          ]
        }
      ],
      defaultProps: {
        children: "children",
        label: "label"
      }
    };
  },
  methods: {
    handleNodeClick(data) {
      console.log(data);
    }
  },
  components: {
    ClasSchedule
  }
};
</script>
<style scoped>
.el-button {
  margin-bottom: 20px;
}
.el-tree {
  height: 360px;
}
.el-card {
  height: 360px;
}
.title {
  display: flex;
  width: 300px;
  height: 70px;
  z-index: 1;
  position: absolute;
  left: 38%;
  top: 4%;
  justify-content: space-between;
}
.titlefirst {
  width: 60px;
  height: 60px;
  border-radius: 50%;
  background-color: #909399;
  overflow: hidden;
  color: #fff;
  text-align: center;
  line-height: 60px;
  font-size: 22px;
}
.titlesecond {
  width: 60px;
  height: 60px;
  border-radius: 50%;
  background-color: #f56c6c;
  color: #fff;
  overflow: hidden;
  text-align: center;
  line-height: 60px;
  font-size: 22px;
}
.titlethirdly {
  width: 60px;
  height: 60px;
  border-radius: 50%;
  background-color: #409eff;
  color: #fff;
  overflow: hidden;
  text-align: center;
  line-height: 60px;
  font-size: 22px;
}
.box {
  display: flex;
}
.two {
  flex: 2;
}
.schedule {
  position: relative;
}
</style>
