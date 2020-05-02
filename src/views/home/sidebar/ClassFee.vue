<template>
  <el-row :gutter="20">
    <el-col :span="10">
      <el-card shadow="hover" class="mgb">
        <div class="hander">
          <div class="progress">
            <el-progress type="dashboard" :percentage="percentage" :color="percentage | pColor"></el-progress>
            <span>缴费总进度</span>
          </div>
          <div class="right">
            <div class="row">
              <span class="row-t">应缴班费：</span>
              <el-tag size="small">{{ currentClass.classFee.max }}￥</el-tag>
              <el-link type="warning" icon="el-icon-plus" class="button" @click="handleAdd">加征</el-link>
            </div>
            <div class="row">
              <span class="row-t">收到班费：</span>
              <el-tag type="success" size="small">{{ collectMoney }}￥</el-tag>
            </div>
            <div class="row">
              <span class="row-t">剩余班费：</span>
              <el-tag type="warning" size="small">{{ currentClass.classFee.surplus }}￥</el-tag>
              <el-link type="warning" icon="el-icon-sort" class="button" @click="handleMoney">变更</el-link>
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
            v-for="(d, i) in currentClass.classFee.record"
            :key="i"
            :timestamp="d.timestamp"
            :color="d.type | tColor"
          >
            {{ d.content }}
            <el-tooltip effect="dark" :content="d.account" placement="left">
              <span class="account">操作账号：{{ d.account }}</span>
            </el-tooltip>
            <div>
              <el-tag
                type="info"
                size="mini"
                style="margin-top: 5px"
                v-if="d.detail"
                v-text="d.detail"
              ></el-tag>
            </div>
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
              @click="handleAllFull"
              :loading="fastPayLoading"
            >{{fastPayLoading?"提交中":"一键交清"}}</el-button>
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
          <el-table-column prop="name" label="姓名" align="center"></el-table-column>
          <el-table-column label="拖欠/元" align="center">
            <template slot-scope="scope">{{ perMoney - scope.row.classFee.success }}</template>
          </el-table-column>
          <el-table-column prop="classFee.success" label="已交/元" align="center"></el-table-column>
          <el-table-column label="完成度" align="center">
            <template slot-scope="scope">
              <el-progress
                :percentage="
                  Math.floor(
                    (scope.row.classFee.success / (perMoney || 1)) * 100
                  )
                "
              ></el-progress>
            </template>
          </el-table-column>
          <el-table-column label="操作" align="center">
            <template slot-scope="scope">
              <el-popover placement="left" trigger="click" v-model="scope.row.alter">
                <div>合计缴费：{{ scope.row.classFee.success + sutdentPayMoney }}￥</div>
                <div class="flex">
                  缴费：
                  <el-input-number
                    v-model="sutdentPayMoney"
                    :precision="2"
                    :controls="false"
                    size="mini"
                    :max="perMoney - currentRow"
                    :min="currentRow * -1"
                  ></el-input-number>￥
                </div>
                <div style="text-align: right; margin: 10px 0 0 0">
                  <el-button size="mini" type="text" @click="scope.row.alter = false">取消</el-button>
                  <el-button
                    type="primary"
                    size="mini"
                    :loading="PayLoading"
                    @click="
                      handleStudentMoney(scope.row, [
                        {
                          id: scope.row._id,
                          money: scope.row.classFee.success + sutdentPayMoney
                        }
                      ])
                    "
                  >{{ PayLoading ? "提交中" : "确定" }}</el-button>
                </div>
                <el-link
                  slot="reference"
                  type="warning"
                  icon="el-icon-edit"
                  @click="sutdentPayMoney = 0,currentRow=scope.row.classFee.success"
                >修改</el-link>
              </el-popover>
            </template>
            <template></template>
          </el-table-column>
        </el-table>
      </el-card>
    </el-col>
    <el-dialog :visible.sync="addDialog" width="30%">
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
      ></el-input-number>￥
      <span style="margin-left: 50px">
        平均每人需缴
        <el-tag type="warning" size="medium">{{ addMoney / studentCount }}</el-tag>元
      </span>
      <h4 style="margin: 10px 0">当前应缴金额：</h4>
      <el-input-number
        :value="countMoney"
        :precision="2"
        :step="studentCount"
        :max="999999"
        :min="currentClass.classFee.max"
        size="small"
        @change="handleChangeCount"
        style="margin-left: 2em"
      ></el-input-number>￥
      <span slot="footer" class="dialog-footer">
        <el-button size="small" @click="addDialog = false">取 消</el-button>
        <el-button
          size="small"
          type="primary"
          @click="handleMoneyAdd"
          :disabled="!addMoney"
          :loading="maxLoading"
        >{{ maxLoading ? "提交中" : "确 定" }}</el-button>
      </span>
    </el-dialog>

    <el-dialog :visible.sync="moneyDialog" width="30%">
      <template slot="title">
        <h3>剩余班费变更</h3>
      </template>
      <h4 style="margin-bottom: 10px">操作类型：</h4>
      <el-radio v-model="radio" label="1">扣款</el-radio>
      <el-radio v-model="radio" label="2">回款</el-radio>
      <el-progress
        :percentage="moneyP"
        style="position: absolute;right: 55px;top: 69px"
        type="circle"
        :width="100"
        :color="moneyP | pColor"
      ></el-progress>
      <h4 style="margin: 10px 0">实际数值：</h4>
      <el-input-number
        v-model="changeMoney"
        :precision="2"
        :step="10"
        :min="0"
        :max="inputNumberMax"
        size="small"
      ></el-input-number>
      <span style="margin-left: 30px; color: #909399">
        剩余金额：
        <el-tag type="warning" size="small">{{ remainMoney }}</el-tag>￥
      </span>
      <h4 style="margin: 10px 0">备注：</h4>
      <el-input placeholder="资金改动理由" v-model="input" clearable size="small"></el-input>
      <span slot="footer" class="dialog-footer">
        <el-button size="small" @click="moneyDialog = false">取 消</el-button>
        <el-button
          size="small"
          type="primary"
          @click="handleMoneyChange"
          :disabled="!changeMoney"
          :loading="surplusLoading"
        >{{surplusLoading?"提交中":"确 定"}}</el-button>
      </span>
    </el-dialog>
  </el-row>
</template>

<script>
import { mapState } from "vuex";

export default {
  data() {
    return {
      search: "",
      selectionData: [],
      addDialog: false,
      moneyDialog: false,
      addMoney: 0.0,
      radio: "1",
      changeMoney: 0,
      input: "",
      maxLoading: false,
      sutdentPayMoney: 0,
      PayLoading: false,
      surplusLoading: false,
      currentRow: 0,
      fastPayLoading: false
    };
  },
  watch: {
    radio() {
      this.changeMoney =
        this.changeMoney > this.inputNumberMax
          ? this.inputNumberMax
          : this.changeMoney;
    }
  },
  computed: {
    filterTable() {
      //过滤显示列表
      return this.currentClass.students.filter(v =>
        Object.values(v).some(v => String(v).includes(this.search))
      );
    },
    percentage() {
      //缴纳班费总进度
      return Math.floor(
        (this.collectMoney / (this.currentClass.classFee.max || 1)) * 100
      );
    },
    moneyP() {
      //剩余班费进度
      return Math.floor((this.remainMoney / (this.collectMoney || 1)) * 100);
    },
    countMoney() {
      //增加应缴班费后的值
      return this.currentClass.classFee.max + this.addMoney;
    },
    studentCount() {
      //学生人数
      return this.currentClass.students.length;
    },
    remainMoney() {
      //改变剩余班费后的剩余的钱
      let s = this.radio === "1" ? "-" : "+";
      return (
        Math.floor(
          eval(this.currentClass.classFee.surplus + s + this.changeMoney) * 100
        ) / 100
      );
    },
    inputNumberMax() {
      //改变剩余班费面板中计数器的最大值，他会随操作类型而改变
      return this.radio === "1"
        ? this.currentClass.classFee.surplus
        : this.collectMoney - this.currentClass.classFee.surplus;
    },
    perMoney() {
      //当前每人需缴纳的金额
      return (
        Math.floor((this.currentClass.classFee.max / this.studentCount) * 100) /
        100
      );
    },
    collectMoney() {
      //收到的总班费
      return this.currentClass.classFee.receive;
    },
    ...mapState(["currentClass"])
  },
  methods: {
    selectionChange(select) {
      //记录选中的学生
      this.selectionData = select;
    },
    handleAdd() {
      //打开追加应缴班费面板
      this.addMoney = 0;
      this.addDialog = true;
    },
    handleChangeCount(val) {
      //记录真实追加应缴班费的值
      this.addMoney = val - this.currentClass.classFee.max;
    },
    handleMoneyAdd() {
      //处理改变后的应缴班费
      this.maxLoading = true;
      this.$store.dispatch("hadleMaxMoney", {
        num: this.currentClass.classFee.max + this.addMoney,
        record: {
          content: `应缴班费 + ${this.addMoney}￥，【应缴班费】${this
            .currentClass.classFee.max + this.addMoney}￥`,
          type: "3"
        },
        done: isSuccess => {
          this.maxLoading = false;
          this.addDialog = false;
          let message = isSuccess
            ? {
                message: `加征成功！您多加了${this.addMoney}￥`,
                type: "success"
              }
            : {
                message: `加征失败！请检查网络是否连接正常`,
                type: "error"
              };
          this.$message(message);
        }
      });
    },
    handleMoney() {
      //打开改变剩余班费面板
      this.changeMoney = 0;
      this.input = "";
      this.radio = "1";
      this.moneyDialog = true;
    },
    handleMoneyChange() {
      //处理改变后的剩余班费
      this.surplusLoading = true;
      this.$store.dispatch("hadleSurplusMoney", {
        num: this.remainMoney,
        detail: this.input,
        done: isSuccess => {
          this.moneyDialog = false;
          this.surplusLoading = false;
          let pre = `班费${this.radio === "1" ? "支出" : "回款"} ${
            this.changeMoney
          } ￥`;
          this.changeMoney = 0;
          let message = isSuccess
            ? {
                message: pre + "成功！",
                type: "success"
              }
            : {
                message: pre + "失败！",
                type: "error"
              };
          this.$message(message);
        }
      });
    },
    handleAllFull() {
      //按下全部交清按钮
      let arr = this.selectionData.map(v => ({
        id: v._id
      }));
      this.fastPayLoading = true;
      this.$store.dispatch("handleStudentPay", {
        max: true,
        students: arr,
        done: isSuccess => {
          this.fastPayLoading = false;
          let message = isSuccess
            ? {
                message: `一键交清成功！`,
                type: "success"
              }
            : {
                message: `一键交清失败！`,
                type: "error"
              };
          this.$message(message);
        }
      });
    },
    handleStudentMoney(isShow, students) {
      //按下某个学生修改界面的确定按钮
      this.PayLoading = true;
      this.$store.dispatch("handleStudentPay", {
        max: false,
        students,
        done: isSuccess => {
          isShow.alter = false;
          this.PayLoading = false;
          let message = isSuccess
            ? {
                message: `缴费成功！`,
                type: "success"
              }
            : {
                message: `缴费失败！`,
                type: "error"
              };
          this.$message(message);
        }
      });
    }
  },
  filters: {
    pColor(per) {
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
    tColor(type) {
      switch (type) {
        case "1":
          return "#F56C6C";
        case "2":
          return "#0bbd87";
        case "3":
          return "#409EFF";
        default:
          return "";
      }
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
.item-center {
  text-align: center;
}
.flex {
  display: flex;
  align-items: center;
  white-space: nowrap;
  margin-top: 10px;
}
</style>
