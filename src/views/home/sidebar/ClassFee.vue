<template>
  <el-row :gutter="20">
    <el-col :span="10">
      <el-card shadow="hover" class="mgb">
        <div class="hander">
          <div class="progress">
            <el-progress
              type="dashboard"
              :percentage="percentage"
              :color="color"
            ></el-progress>
            <span :style="'color:' + color">缴费总进度</span>
          </div>
          <div class="right">
            <div class="row">
              <span class="row-t">应缴班费：</span>
              <el-tag size="small">{{ money.max }}￥</el-tag>
              <el-link
                type="warning"
                icon="el-icon-plus"
                class="button"
                @click="handleAdd"
                >加征</el-link
              >
            </div>
            <div class="row">
              <span class="row-t">收到班费：</span>
              <el-tag type="success" size="small">{{ money.now }}￥</el-tag>
            </div>
            <div class="row">
              <span class="row-t">剩余班费：</span>
              <el-tag type="warning" size="small">{{ money.remain }}￥</el-tag>
              <el-link
                type="warning"
                icon="el-icon-sort"
                class="button"
                @click="handleMoney"
                >变更</el-link
              >
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
          >
            {{ d.content }}
            <el-tooltip effect="dark" :content="d.account" placement="left">
              <span class="account">操作账号：{{ d.account }}</span>
            </el-tooltip>
          </el-timeline-item>
        </el-timeline>
      </el-card>
    </el-col>
    <el-col :span="14">
      <el-card shadow="hover">
        <el-row>
          <el-col :span="6">
            <el-button
              type="success"
              size="mini"
              :disabled="!selectionData.length"
              >一键交清</el-button
            >
          </el-col>
          <el-col :span="18">
            <el-input
              v-model="search"
              placeholder="请输入要筛选的信息"
              size="mini"
            ></el-input>
          </el-col>
        </el-row>
        <el-table
          :data="filterTable"
          stripe
          height="550"
          ref="table"
          @selection-change="selectionChange"
        >
          <el-table-column
            type="selection"
            width="55"
            align="center"
          ></el-table-column>
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

    <el-dialog
      :visible.sync="addDialog"
      width="30%"
    >
      <template slot="title">
        <h3>加征班费</h3>
      </template>
      <h4 style="margin-bottom: 10px">增加金额：</h4>
      <el-input-number
        v-model="addMoney"
        :precision="2"
        :step="studentCount"
        step-strictly
        :max="9999"
        :min="0.0"
        size="small"
        style="margin-left: 2em"
      ></el-input-number>
      ￥
      <span style="margin-left: 50px"
        >平均每人需缴
        <el-tag type="warning" size="medium">{{
          addMoney / studentCount
        }}</el-tag>
        元</span
      >
      <h4 style="margin: 10px 0">当前应缴金额：</h4>
      <el-input-number
        :value="countMoney"
        :precision="2"
        :step="studentCount"
        :max="999999"
        :min="money.max"
        size="small"
        @change="handleChangeCount"
        style="margin-left: 2em"
      ></el-input-number>
      ￥
      <span slot="footer" class="dialog-footer">
        <el-button size="small" @click="addDialog = false">取 消</el-button>
        <el-button size="small" type="primary" @click="handleMoneyAdd" :disabled="!addMoney">确 定</el-button
        >
      </span>
    </el-dialog>

    <el-dialog
      :visible.sync="moneyDialog"
      width="30%"
    >
      <template slot="title">
        <h3>剩余班费变更</h3>
      </template>

    </el-dialog>
  </el-row>
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
        now: 2151,
        remain: 1560
      },
      dataChange: [
        {
          content: "【应缴班费】+ 120，【应缴班费】= 4000",
          account: "yuwjoo6",
          timestamp: "2018-04-15 12:03:45",
          color: "#409EFF"
        },
        {
          content: "【杨辉】缴费 + 30，【收到班费】= 30",
          account: "YH",
          timestamp: "2018-04-13 13:45:05",
          color: "#0bbd87"
        },
        {
          content: "【邱丽贤】缴费 + 50，【收到班费】= 80",
          account: "mutian",
          timestamp: "2018-04-11 13:30:15",
          color: "#0bbd87"
        },
        {
          content: "班费支出 - 45，【剩余班费】= 35",
          account: "yuwjoo6",
          timestamp: "2018-04-15 15:14:31",
          color: "#F56C6C"
        }
      ],
      addDialog: false,
      moneyDialog: false,
      addMoney: 0.0
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
    },
    countMoney() {
      return this.money.max + this.addMoney;
    },
    studentCount() {
      return student.length;
    }
  },
  methods: {
    selectionChange(select) {
      this.selectionData = select;
    },
    handleAdd() {
      this.addMoney = 0;
      this.addDialog = true;
    },
    handleChangeCount(val) {
      this.addMoney = val - this.money.max;
    },
    handleMoneyAdd(){
      this.money.max += this.addMoney;
      this.addDialog = false;
      this.$message({
        message: '加征成功！',
        type: 'success'
      })
    },
    handleMoney(){
      this.moneyDialog = true;
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
.account {
  float: right;
  font-size: 10px;
  color: #909399;
  width: 100px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
</style>
