<template>
<<<<<<< HEAD
    <div>
       <el-row>
       <el-col :span="18">
          <el-card shadow="hover">
       <div class="chart">
            <div ref="myChart" :style="{width: '100%', height: '300px'}"></div>
         </div> 
          </el-card> 
      </el-col>
      </el-row>
     
    </div>
=======
  <div>
    <el-row>
      <el-col :span="4">
        <el-date-picker
          v-model="date"
          type="datetimerange"
          align="bottom"
          size="small"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
          :default-time="['00:00:00', '00:00:00']"
        ></el-date-picker>
      </el-col>
    </el-row>
    <el-table
      class="box"
      :data="tableData"
      height="250"
      :header-cell-style="{
        'text-align': 'center',
        'background-color': '#f5f5f6'
      }"
      :cell-style="{ 'text-align': 'center' }"
      border
      style="width: 100%"
    >
      <el-table-column type="selection" width="55"></el-table-column>
      <el-table-column prop="name" label="课程名" width="180">
      </el-table-column>
      <el-table-column prop="assessmethod" label="考核方式" width="180">
      </el-table-column>
      <el-table-column prop="teachername" label="教师" width="180">
      </el-table-column>
      <el-table-column prop="content" label="预习内容"> </el-table-column>
      <el-table-column label="操作" width="180">
        <template class="tem">
          <el-link
            type="warning"
            :underline="false"
            icon="el-icon-circle-plus"
          ></el-link>
          <el-link
            type="warning"
            :underline="false"
            icon="el-icon-edit"
            class="modifies"
          ></el-link>
          <el-link
            type="warning"
            :underline="false"
            icon="el-icon-delete"
          ></el-link>
        </template>
      </el-table-column>
    </el-table>
  </div>
>>>>>>> temp
</template>
<script>
import echarts from "echarts";
export default {
<<<<<<< HEAD
    data(){
        return{
         
        }
    },
     mounted(){
        this.drawLine();
      },
       methods:{
        drawLine(){
          // 基于准备好的dom，初始化echarts实例
          let myChart = echarts.init(this.$refs.myChart);
          // 绘制图表
           myChart.setOption({
            title: { text: '下学期选课人数统计' },
            tooltip: {},
            xAxis: {
              data: ["iOS","网络","系统操作","响应式Web","javascript","c#"]
            },
            yAxis: {},
            series: [{
              name: '人数',
              type: 'bar',
              data: [10, 3, 2, 10, 10,2]
            }]
          });
        }
     },
}
</script>
<style scoped>


</style>
=======
  data() {
    return {
      date: "",
      tableData: [
        {
          teachername: "龚鸿飞",
          name: "Android综合训练",
          assessmethod: "考试",
          content: "ListView item多布局的实现"
        },
        {
          teachername: "刘志恒",
          name: "PHP程序设计",
          assessmethod: "考查",
          content: "PHP语法和变量"
        },
        {
          teachername: "许锦辉",
          name: "html5+Css3项目开发",
          assessmethod: "考试",
          content: "html5新特性"
        },
        {
          teachername: "邢思楠",
          name: "语文",
          assessmethod: "考查",
          content: "聘书和简历"
        },
        {
          teachername: "许锦辉",
          name: "小程序项目开发",
          assessmethod: "考查",
          content: "全局配置文件"
        }
      ]
    };
  }
};
</script>
<style scoped>
.box {
  margin-top: 30px;
}
.modifies {
  padding: 0px 50px;
}
</style>
>>>>>>> temp
