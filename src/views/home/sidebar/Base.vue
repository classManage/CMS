<template>
  <div class="base">
    <el-row :gutter="20">
      <el-col :span="7">
        <el-card shadow="hover" class="mgb">
          <div class="flex">
            <div class="flex-column">
              <div>
                <el-avatar :size="50" :src="circleUrl"></el-avatar>
              </div>
              <h2 class="text">{{ currentClass.admin.name }}</h2>
              <el-tag type="success" size="mini" effect="dark">班主任</el-tag>
            </div>
            <div class="content">
              <div class="row text">
                <span class="option">荣誉:</span>
                <el-tag
                  type="warning"
                  size="mini"
                  v-for="d in currentClass.admin.honor"
                  :key="d"
                  >{{ d }}</el-tag
                >
              </div>
              <div class="row">
                <span class="option">联系电话:</span>
                {{ currentClass.admin.phone }}
              </div>
              <div class="row">
                <span class="option">执教时间:</span>
                {{ currentClass.admin.duration }}
              </div>
            </div>
          </div>
        </el-card>
        <el-card shadow="hover" body-style="height: 390px">
          <div class="flex cadre">
            <div class="flex-column cadre-item">
              <div>
                <el-avatar :size="50" :src="studentIcon"></el-avatar>
              </div>
              <h2>祁铭清</h2>
              <el-tag type="warning" size="mini" effect="dark">班长</el-tag>
            </div>
            <div class="flex-column cadre-item">
              <div>
                <el-avatar :size="50" :src="studentIcon"></el-avatar>
              </div>
              <h2>蒙永魁</h2>
              <el-tag type="warning" size="mini" effect="dark">副班长</el-tag>
            </div>
            <div class="flex-column cadre-item">
              <div>
                <el-avatar :size="50" :src="studentIcon"></el-avatar>
              </div>
              <h2>陈思远</h2>
              <el-tag type="warning" size="mini" effect="dark">学习委员</el-tag>
            </div>
            <div class="flex-column cadre-item">
              <div>
                <el-avatar :size="50" :src="studentIcon"></el-avatar>
              </div>
              <h2>邱华惠</h2>
              <el-tag type="warning" size="mini" effect="dark">体育委员</el-tag>
            </div>
            <div class="flex-column cadre-item">
              <div>
                <el-avatar :size="50" :src="studentIcon"></el-avatar>
              </div>
              <h2>黄若翰</h2>
              <el-tag type="warning" size="mini" effect="dark">纪律委员</el-tag>
            </div>
            <div class="flex-column cadre-item">
              <div>
                <el-avatar :size="50" :src="studentIcon"></el-avatar>
              </div>
              <h2>陈颖珉</h2>
              <el-tag type="warning" size="mini" effect="dark">文艺委员</el-tag>
            </div>
            <div class="flex-column cadre-item">
              <div>
                <el-avatar :size="50" :src="studentIcon"></el-avatar>
              </div>
              <h2>邱丽贤</h2>
              <el-tag type="warning" size="mini" effect="dark">生活委员</el-tag>
            </div>
          </div>
        </el-card>
      </el-col>
      <el-col :span="10">
        <el-card shadow="hover">
          <div class="flex table-top">
            <div class="left">
              <el-tag type="danger" effect="plain" size="small"
                >本班 {{ currentClass.students.length }} 人</el-tag
              >
            </div>
            <el-tooltip effect="dark" content="导出" placement="right">
              <el-button size="mini" icon="el-icon-share"></el-button>
            </el-tooltip>
          </div>
          <el-table
            :data="filterStudent"
            style="width: 100%"
            height="540px"
            stripe
            size="small"
            :default-sort="{ prop: 'id', order: 'ascending' }"
          >
            <el-table-column prop="SID" label="学号" sortable></el-table-column>
            <el-table-column label="姓名">
              <template slot-scope="scope">
                <i
                  :class="
                    'sex ' +
                      (scope.row.sex === '男'
                        ? 'el-icon-male blue'
                        : 'el-icon-female pick')
                  "
                ></i>
                {{ scope.row.name }}
              </template>
            </el-table-column>
            <el-table-column align="center">
              <template slot="header">
                <input
                  class="el-input search"
                  v-model="search"
                  placeholder="输入关键字搜索"
                />
              </template>
              <template slot-scope="scope">
                <el-popover placement="right" title trigger="hover">
                  <div class="mini-item">
                    <el-tag size="mini">请假</el-tag>
                    <span class="item-text">{{ scope.row.kaoqin.please }}</span>
                  </div>
                  <div class="mini-item">
                    <el-tag type="info" size="mini">迟到</el-tag>

                    <span class="item-text">{{ scope.row.kaoqin.late }}</span>
                  </div>
                  <div class="mini-item">
                    <el-tag type="warning" size="mini">早退</el-tag>

                    <span class="item-text">{{ scope.row.kaoqin.leave }}</span>
                  </div>
                  <div class="mini-item">
                    <el-tag type="danger" size="mini">旷课</el-tag>

                    <span class="item-text">{{ scope.row.kaoqin.absent }}</span>
                  </div>
                  <el-button
                    :type="
                      scope.row.kaoqin.absent > 5 ||
                      scope.row.kaoqin.leave > 10 ||
                      scope.row.kaoqin.late > 10
                        ? 'danger'
                        : 'success'
                    "
                    slot="reference"
                    round
                    size="mini"
                    >出勤状况</el-button
                  >
                </el-popover>
              </template>
            </el-table-column>
          </el-table>
        </el-card>
      </el-col>
      <el-col :span="7">
        <el-card shadow="hover" class="mgb" body-style="height: 255px">
          <h3 style="margin-bottom: 20px">班级荣誉墙</h3>
          <div class="flex reward">
            <el-tooltip
              class="item"
              effect="dark"
              :content="d"
              v-for="d in currentClass.classHonor"
              :key="d"
              placement="top-start"
            >
              <div class="center-item">
                <div class="bg">{{ d }}</div>
              </div>
            </el-tooltip>
          </div>
        </el-card>
        <el-card shadow="hover">
          <div ref="axis" style="height: 250px"></div>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import echarts from "echarts";
import { mapState } from "vuex";

export default {
  data() {
    return {
      circleUrl: require("@/assets/img/teacherIcon.jpg"),
      studentIcon: require("@/assets/img/studentIcon.jpg"),
      search: "",
      options: {
        title: {
          text: "出勤汇总"
        },
        tooltip: {
          trigger: "axis"
        },
        radar: [
          {
            indicator: [
              { text: "迟到", max: 600 },
              { text: "早退", max: 600 },
              { text: "旷课", max: 600 },
              { text: "请假", max: 600 },
              { text: "平均值", max: 100 }
            ],
            center: ["50%", "50%"],
            radius: 90
          }
        ],
        series: [
          {
            type: "radar",
            tooltip: {
              trigger: "item"
            },
            areaStyle: {},
            data: [
              {
                value: [52, 36, 58, 69, 78],
                name: "本班出勤汇总"
              }
            ]
          }
        ],
        color: "#409EFF"
      }
    };
  },
  watch: {},
  methods: {},
  computed: {
    filterStudent() {
      return this.currentClass.students.filter(item =>
        Object.values(item).some(v => String(v).includes(this.search))
      );
    },
    ...mapState(["currentClass"])
  },
  mounted() {
    let obj = this.currentClass.students.reduce((pre, item) => {
      return {
        kaoqin: {
          late: pre.kaoqin.late + item.kaoqin.late,
          leave: pre.kaoqin.leave + item.kaoqin.leave,
          absent: pre.kaoqin.absent + item.kaoqin.absent,
          please: pre.kaoqin.please + item.kaoqin.please
        }
      };
    });
    let arr = Object.values(obj.kaoqin);
    arr.push(
      Math.floor(
        arr.reduce((pre, item) => pre + item) /
          this.currentClass.students.length
      )
    );
    this.options.series[0].data[0].value = arr;
    echarts.init(this.$refs.axis).setOption(this.options);
  }
};
</script>

<style lang="less" scoped>
.mini-item {
  margin-bottom: 5px;
}
.item-text {
  font-size: 12px;
  margin-left: 5px;
}
.blue {
  color: #409eff;
}
.pick {
  color: #f56c6c;
}
.sex {
  font-weight: 500;
  font-size: 14px;
}
.search {
  -webkit-appearance: none;
  background-color: #fff;
  background-image: none;
  border-radius: 4px;
  border: 1px solid #dcdfe6;
  box-sizing: border-box;
  color: #606266;
  display: inline-block;
  font-size: inherit;
  height: 28px;
  line-height: 28px;
  outline: 0;
  padding: 0 15px;
  transition: border-color 0.2s cubic-bezier(0.645, 0.045, 0.355, 1);
  width: 100%;
}
.flex {
  display: flex;
  align-items: center;
}
.flex-column {
  display: flex;
  flex-direction: column;
  align-items: center;
  h2 {
    margin: 5px;
    font-size: 25px;
    font-weight: 500;
  }
}
.mgb {
  margin-bottom: 20px;
}
.content {
  margin-left: 40px;
  font-size: 14px;
  .el-tag {
    margin-left: 8px;
  }
  .row {
    margin: 10px 0;
  }
  .option {
    font-size: 14px;
    font-weight: 500;
    margin-right: 10px;
  }
}
.cadre {
  flex-wrap: wrap;
}
.cadre-item {
  width: 33.33%;
  margin-bottom: 20px;
  h2 {
    font-size: 20px;
  }
}
.reward {
  flex-wrap: wrap;
}
.center-item {
  width: 33.33%;
  .bg {
    background: url("../../../assets/img/jiangzuang.jpg") center center/100%
      100% no-repeat;
    width: 100px;
    height: 60px;
    text-align: center;
    line-height: 60px;
    font-size: 12px;
    font-weight: bold;
    margin: 0 auto 10px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    padding: 0 5px;
    box-sizing: border-box;
  }
}
.table-top {
  justify-content: space-between;
}
.text {
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
}
</style>
