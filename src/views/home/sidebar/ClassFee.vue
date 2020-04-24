<template>
  <el-row :gutter="20">
    <el-col :span="10">
      <el-card shadow="hover" class="mgb">
        <div class="hander">
          <div class="progress">
            <el-progress type="dashboard" :percentage="percentage" :color="color"></el-progress>
            <span :style="'color:'+color">缴费总进度</span>
          </div>
          <div class="right">
            <div class="row">
              <span class="row-t">应缴班费：</span>
              <el-tag size="small">{{money.max}}￥</el-tag>
              <el-link type="warning" icon="el-icon-plus" class="button" @click="handleAdd">加征</el-link>
            </div>
            <div class="row">
              <span class="row-t">收到班费：</span>
              <el-tag type="success" size="small">{{money.now}}￥</el-tag>
            </div>
            <div class="row">
              <span class="row-t">剩余班费：</span>
              <el-tag type="warning" size="small">{{money.remain}}￥</el-tag>
              <el-link type="warning" icon="el-icon-minus" class="button">扣款</el-link>
            </div>
          </div>
        </div>
      </el-card>
      <el-card shadow="hover" body-style="height: 329px;overflow: auto">
        <div slot="header">
          <h4>资金变动记录</h4>
        </div>
        <el-timeline reverse>
          <el-timeline-item
            v-for="(d, i) in dataChange"
            :key="i"
            :timestamp="d.timestamp"
            :color="d.color"
          >{{d.content}}</el-timeline-item>
        </el-timeline>
      </el-card>
    </el-col>
    <el-col :span="14">
      <el-card shadow="hover">
        <el-row>
          <el-col :span="6">
            <el-button type="success" size="mini" :disabled="!selectionData.length">一键交清</el-button>
          </el-col>
          <el-col :span="18">
            <el-input v-model="search" placeholder="请输入要筛选的信息" size="mini"></el-input>
          </el-col>
        </el-row>
        <el-table
          :data="filterTable"
          stripe
          height="550"
          ref="table"
          @selection-change="selectionChange"
        >
          <el-table-column type="selection" width="55" align="center"></el-table-column>
          <el-table-column prop="name" label="姓名"></el-table-column>
          <el-table-column prop="name" label="拖欠/元"></el-table-column>
          <el-table-column prop="name" label="已交/元"></el-table-column>
          <el-table-column label="完成度">
            <template>
              <el-progress :percentage="60"></el-progress>
            </template>
          </el-table-column>
          <el-table-column label="操作">
            <template>
              <el-link type="warning" icon="el-icon-edit">修改</el-link>
            </template>
          </el-table-column>
        </el-table>
      </el-card>
    </el-col>
  </el-row>

  <!-- <el-submenu index="4">
      <template slot="title">
        <i class="el-icon-money"></i>
        <span>班费</span>
      </template>
      <el-menu-item index="1-4-1">
        <template slot="title">
          <span>往期班费记录</span>
        </template>
      </el-menu-item>
      <el-menu-item index="1-4-2">
        <template slot="title">
          <span>班费缴纳人员名单</span>
        </template>
      </el-menu-item>
      <el-menu-item index="1-4-3">
        <template slot="title">
          <span>拖欠次数记录</span>
        </template>
      </el-menu-item>
  </el-submenu>-->
</template>

<script>
import student from "@/assets/json/18移动班级名单.json";

export default {
  data() {
    return {
      tableData: student,
      search: "",
      selectionData: [],
      money: {
        max: 4000,
        now: 100,
        remain: 1560
      },
      dataChange: [
        {
          content: "【应缴班费】+ 120，【应缴班费】= 4000，--- yuwjoo6",
          timestamp: "2018-04-15 12:03:45",
          color: '#409EFF'
        },
        {
          content: "【杨辉】缴费 + 30，【收到班费】= 30，--- yuwjoo6",
          timestamp: "2018-04-13 13:45:05",
          color: '#0bbd87'
        },
        {
          content: "【邱丽贤】缴费 + 50，【收到班费】= 80，--- yuwjoo6",
          timestamp: "2018-04-11 13:30:15",
          color: '#0bbd87'
        },
        {
          content: "班费支出 - 45，【剩余班费】= 35，--- yuwjoo6",
          timestamp: "2018-04-15 15:14:31",
          color: '#F56C6C'
        }
      ]
    };
  },
  computed: {
    filterTable() {
      return this.tableData.filter(v =>
        Object.values(v).some(v => String(v).includes(this.search))
      );
    },
    percentage() {
      return Math.floor((this.money.now / this.money.max) * 100);
    },
    color() {
      let per = this.percentage;
      switch (true) {
        case per <= 20:
          return "#F56C6C";
        case per <= 40:
          return "#E6A23C";
        case per <= 60:
          return "#1989fa";
        case per <= 80:
          return "#409EFF";
        default:
          return "#67C23A";
      }
    }
  },
  methods: {
    selectionChange(select) {
      this.selectionData = select;
    },
    handleAdd() {
      this.money.now += 100;
    }
  }
};
</script>

<style lang="less" scoped>
.mgb {
  margin-bottom: 20px;
}
.hander {
  display: flex;
  align-items: center;
  .right {
    flex: 1;
  }
}
.progress {
  margin-right: 50px;
  span {
    margin-left: -95px;
    font-size: 13px;
  }
}
.row {
  margin-bottom: 8px;
  .button {
    float: right;
    margin-right: 80px;
  }
}
.row-t {
  margin-right: 30px;
  font-weight: 600;
  color: #606266;
}
</style>