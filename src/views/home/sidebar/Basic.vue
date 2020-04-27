<template>
  <div>
    <el-row :gutter="20">
      <el-col :span="8">
        <el-card shadow="hover" class="mgb20" style="height:252px;">
          <div class="user-info">
            <img
              src="../../../assets/img/userIcon.jpeg"
              class="user-avator"
              alt
            />
            <div class="user-info-cont">
              <div class="user-info-name">{{ userInfo.nickname }}</div>
              <el-tag type="warning" size="mini">{{ role }}</el-tag>
            </div>
          </div>

          <div class="user-info-list">
            上次登录时间：
            <span>2020-4-15</span>
          </div>
          <div class="user-info-list">
            管理班级数量：
            <span>6个</span>
          </div>
        </el-card>
        <el-card shadow="hover">
          <div ref="pie" style="height: 300px"></div>
        </el-card>
      </el-col>
      <el-col :span="16">
        <el-row :gutter="20" class="mgb20">
          <el-col :span="8">
            <el-card shadow="hover" :body-style="{ padding: '0px' }">
              <div class="grid-content grid-con-1">
                <i class="el-icon-s-order grid-con-icon"></i>
                <div class="grid-cont-right">
                  <div class="grid-num">12</div>
                  <div>今日课程量</div>
                </div>
              </div>
            </el-card>
          </el-col>
          <el-col :span="8">
            <el-card shadow="hover" :body-style="{ padding: '0px' }">
              <div class="grid-content grid-con-2">
                <i class="el-icon-s-comment grid-con-icon"></i>
                <div class="grid-cont-right">
                  <div class="grid-num">321</div>
                  <div>系统消息</div>
                </div>
              </div>
            </el-card>
          </el-col>
          <el-col :span="8">
            <el-card shadow="hover" :body-style="{ padding: '0px' }">
              <div class="grid-content grid-con-3">
                <i class="el-icon-s-claim grid-con-icon"></i>
                <div class="grid-cont-right">
                  <div class="grid-num">51</div>
                  <div>打卡</div>
                </div>
              </div>
            </el-card>
          </el-col>
        </el-row>

        <el-card shadow="hover" style="height:403px;" class="mgb20">
          <div slot="header" class="clearfix">
            <span>待办事项</span>
            <el-button style="float: right; padding: 3px 0" type="text"
              >添加</el-button
            >
          </div>
          <el-table :show-header="false" :data="todoList" style="width:100%;">
            <el-table-column width="40">
              <template slot-scope="scope">
                <el-checkbox v-model="scope.row.status"></el-checkbox>
              </template>
            </el-table-column>
            <el-table-column>
              <template slot-scope="scope">
                <div
                  class="todo-item"
                  :class="{ 'todo-item-del': scope.row.status }"
                >
                  {{ scope.row.title }}
                </div>
              </template>
            </el-table-column>
            <el-table-column width="60">
              <template>
                <i class="el-icon-edit"></i>
                <i class="el-icon-delete"></i>
              </template>
            </el-table-column>
          </el-table>
        </el-card>
        <el-card shadow="hover">
          <el-row style="margin: auto">
            <el-col :span="4">距离下节课还剩：</el-col>
            <el-col :span="20">
              <el-progress
                :text-inside="true"
                :stroke-width="22"
                :percentage="80"
                status="warning"
              ></el-progress>
            </el-col>
          </el-row>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { mapState } from "vuex";
import echarts from "echarts";

export default {
  name: "dashboard",
  data() {
    return {
      name: "",
      todoList: [
        {
          title: "对该班级的考试分数进行统计",
          status: false
        },
        {
          title: "因其他老师原因下午第七节课由我来上",
          status: false
        },
        {
          title: "昨天的签到记录有误，要进行核对",
          status: false
        },
        {
          title: "好好睡个午觉",
          status: false
        },
        {
          title: "早上起来吃早餐",
          status: true
        },
        {
          title: "进行晨跑",
          status: true
        }
      ],
      options: {
        title: {
          text: "上课情况统计",
          subtext: "数据来源本站",
          left: "center"
        },
        tooltip: {
          trigger: "item",
          formatter: "{b} : {c} 次 ({d}%)"
        },
        legend: {
          bottom: 10,
          left: "center",
          data: ["迟到", "早退", "旷课", "请假", "准时"]
        },
        series: [
          {
            type: "pie",
            radius: "65%",
            center: ["50%", "50%"],
            selectedMode: "single",
            data: [
              { value: 32, name: "准时" },
              { value: 5, name: "早退" },
              { value: 2, name: "旷课" },
              { value: 12, name: "请假" },
              { value: 8, name: "迟到" }
            ],
            emphasis: {
              itemStyle: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: "rgba(0, 0, 0, 0.5)"
              }
            },
            color: ["#67C23A", "#909399", "#F56C6C", "#409EFF", "#E6A23C"]
          }
        ]
      }
    };
  },
  computed: {
    role() {
      return this.name === "admin" ? "超级管理员" : "人民教师";
    },
    ...mapState(["userInfo"])
  },
  mounted() {
    //出勤情况统计
    echarts.init(this.$refs.pie).setOption(this.options);
  },
  methods: {}
};
</script>

<style scoped>
.el-row {
  margin-bottom: 20px;
}

.grid-content {
  display: flex;
  align-items: center;
  height: 100px;
}

.grid-cont-right {
  flex: 1;
  text-align: center;
  font-size: 14px;
  color: #999;
}

.grid-num {
  font-size: 30px;
  font-weight: bold;
}

.grid-con-icon {
  font-size: 50px;
  width: 100px;
  height: 100px;
  text-align: center;
  line-height: 100px;
  color: #fff;
}

.grid-con-1 .grid-con-icon {
  background: rgb(45, 140, 240);
}

.grid-con-1 .grid-num {
  color: rgb(45, 140, 240);
}

.grid-con-2 .grid-con-icon {
  background: rgb(100, 213, 114);
}

.grid-con-2 .grid-num {
  color: rgb(45, 140, 240);
}

.grid-con-3 .grid-con-icon {
  background: rgb(242, 94, 67);
}

.grid-con-3 .grid-num {
  color: rgb(242, 94, 67);
}

.user-info {
  display: flex;
  align-items: center;
  padding-bottom: 20px;
  border-bottom: 2px solid #ccc;
  margin-bottom: 20px;
}

.user-avator {
  width: 120px;
  height: 120px;
  border-radius: 50%;
}

.user-info-cont {
  padding-left: 50px;
  flex: 1;
  font-size: 14px;
  color: #999;
}

.user-info-list {
  font-size: 14px;
  color: #999;
  line-height: 25px;
}

.user-info-list span {
  margin-left: 70px;
}

.mgb20 {
  margin-bottom: 20px;
}

.todo-item {
  font-size: 14px;
}

.todo-item-del {
  text-decoration: line-through;
  color: #999;
}

.schart {
  width: 100%;
  height: 300px;
}
.user-info-name {
  color: #222;
  font-size: 25px;
  font-weight: 500;
  margin-bottom: 8px;
  letter-spacing: 1px;
}
</style>
