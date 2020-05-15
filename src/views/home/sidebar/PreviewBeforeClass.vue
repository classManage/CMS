<template>
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
</template>
<script>
import echarts from "echarts";
export default {
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