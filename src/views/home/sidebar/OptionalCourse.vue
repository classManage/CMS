<template>
  <div>
    <el-row>
      <el-col :span="2">
        <el-button class="add" type="success" size="small" @click="add">我要选课</el-button>
      </el-col>
      <el-col :span="2">
        <el-button class="add" type="success" size="small">选课表</el-button>
      </el-col>
      <el-col :span="6" :offset="14">
        <el-input placeholder="请输入学号快速查找" v-model="search">
          <i slot="prefix" class="el-input__icon el-icon-search"></i>
        </el-input>
      </el-col>
    </el-row>
    <el-table
      :data="filterStudent"
      stripe
      :height="400"
      :default-sort="{ prop: 'date', order: 'descending' }"
    >
      <el-table-column sortable label="日期" align="center">
        <template
          slot-scope="scope"
        >{{scope.row.selectCourse[0]?scope.row.selectCourse[0].dateTime:'' | formatDate}}</template>
      </el-table-column>
      <el-table-column prop="SID" sortable label="学号" align="center"></el-table-column>
      <el-table-column prop="name" label="姓名" align="center"></el-table-column>
      <el-table-column label="选课门数" width="150" align="center">
        <template slot-scope="scope">{{scope.row.selectCourse.length}}</template>
      </el-table-column>
      <el-table-column label="操作" fixed="right" align="center">
        <template slot-scope="scope">
          <el-button
            type="primary"
            icon="el-icon-edit"
            circle
            @click="handleEdit(scope.$index, scope.row)"
          ></el-button>
          <el-button
            type="danger"
            icon="el-icon-delete"
            circle
            @click="remove(scope.$index, scope.row)"
          ></el-button>
        </template>
      </el-table-column>
    </el-table>
    <div class="dialogtwo">
      <el-dialog :title="dialogTitle" width="25%" :visible.sync="iconFormVisiblet">
        <el-form :inline="true" :model="aa" ref="curriculadata">
          <el-form-item label="日期">
            <el-date-picker v-model="aa.date" type="datetime" placeholder="选择日期时间"></el-date-picker>
          </el-form-item>
          <el-form-item label="学号" prop="stuid">
            <el-input v-model="aa.id" placeholder="学号"></el-input>
          </el-form-item>
          <el-form-item label="课程名">
            <el-select v-model="aa.oldCName" placeholder="课程名">
              <el-option label="js" value="js"></el-option>
              <el-option label="c" value="c"></el-option>
            </el-select>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="iconFormVisiblet = false" class="cancel">取 消</el-button>
          <el-button type="primary" @click="submitUsert()" class="confirm" mode>确 定</el-button>
        </div>
      </el-dialog>
    </div>

    <el-row :gutter="25" class="chartt">
      <el-col :span="8">
        <el-card shadow="hover">
          <div class="text">未选课人数统计</div>
          <el-progress type="circle" :percentage="25" color="red" :width="260" class="notcurricula"></el-progress>
        </el-card>
      </el-col>
      <el-col :span="16">
        <el-card shadow="hover">
          <el-card shadow="hover">
            <div class="chart">
              <div ref="myChart" :style="{ width: '100%', height: '300px' }"></div>
            </div>
          </el-card>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>
<script>
import echarts from "echarts";
import { mapState } from "vuex";
import { handleSCourse } from "@/utils/ajax";
export default {
  data() {
    return {
      iconFormVisiblet: false,
      dialogTitle: "选课",
      search: "",
      aa: {
        date: "",
        id: "",
        oldCName: ""
      }
    };
  },
  filters: {
    formatDate(raw) {
      return raw ? raw.replace("T", " ").match(/^[\w|\-\s:]+/)[0] : "";
    }
  },
  mounted() {
    this.drawLine();
  },

  methods: {
    // 增加
    add() {
      this.dialogTitle = "选课";
      this.curriculadata = {};
      this.iconFormVisiblet = true;
    },

    // 弹窗确定
    submitUsert() {
      if (this.dialogTitle === "选课") {
        let date = new Date(this.aa.date).getTime();
        handleSCourse({
          date: date,
          id: this.aa.id,
          oldCName: this.aa.oldCName,
          mode: "a",
          clName: this.currentClass.class
        }).then(res => {
          this.$store.commit('changeCurrentClass', res)
        });
      }
      this.iconFormVisiblet = false;
    },
    drawLine() {
      // 基于准备好的dom，初始化echarts实例
      let myChart = echarts.init(this.$refs.myChart);
      // 绘制图表
      myChart.setOption({
        title: { text: "已选课人数统计" },
        tooltip: {},
        xAxis: {
          data: ["iOS", "网络", "系统操作", "响应式Web", "javascript", "c#"]
        },
        yAxis: {},
        series: [
          {
            name: "人数",
            type: "bar",
            data: [10, 3, 2, 10, 10, 2]
          }
        ]
      });
    }
  },
  computed: {
    filterStudent() {
      return this.currentClass.students.filter(item =>
        Object.values(item).some(v => String(v).includes(this.search))
      );
    },
    ...mapState(["currentClass"])
  }
};
</script>
<style scoped>
.label {
  color: red !important;
}
.dialog-footer {
  text-align: center !important;
}
.cancel {
  padding: 10px 15px !important;
  margin-right: 20px !important;
}
.confirm {
  padding: 10px 15px !important;
}
.chartt {
  margin-top: 20px;
}
.notcurricula {
  margin-top: 50px;
  margin-left: 90px;
}
.text {
  color: #666;
  font-size: 15px;
  font-weight: bold;
}
</style>
