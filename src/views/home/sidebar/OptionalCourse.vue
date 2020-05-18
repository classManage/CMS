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
          <el-input placeholder="请输入学号快速查找">
          <i slot="prefix" class="el-input__icon el-icon-search"></i>
        </el-input>
        </el-col>
      </el-row>
       <el-table :data="tableData" stripe :height="400">
        <el-table-column prop="date" label="日期" align="center">
        </el-table-column>
        <el-table-column prop="stuid" label="学号" align="center">
        </el-table-column>
        <el-table-column prop="name" label="姓名" align="center">
        </el-table-column>
        <el-table-column label="选课门数" width="150">
          <template slot-scope="scope">
            <el-tooltip content="选课表中查看" placement="right"  :hide-after="2000">
              <el-tag>
              <strong>已选{{scope.row.currname.length}}</strong>门
              </el-tag>
              </el-tooltip>
          </template>
        </el-table-column>
        <el-table-column label="操作" fixed="right" align="center">
          <template slot-scope="scope">
            <el-button type="primary"  icon="el-icon-edit" circle @click="handleEdit(scope.$index, scope.row)"></el-button>
            <el-button type="danger"  icon="el-icon-delete" circle @click="remove(scope.$index, scope.row)"></el-button>
          </template>
        </el-table-column>
      </el-table>
    <!--弹窗-->
    <div class="dialogone">
    <el-dialog :title="dialogTitle" width="25%" :visible.sync="iconFormVisible">
      <el-form :inline="true" :model="userInfo">
        <el-form-item label="姓名">
          <el-input v-model="userInfo.name" placeholder="姓名" size="medium"></el-input>
        </el-form-item>
        <el-form-item label="日期">
          <el-form-item prop="date">
           <el-date-picker
            v-model="userInfo.date"
            type="date"
            placeholder="选择日期">
          </el-date-picker>
           </el-form-item>
        </el-form-item>
        <el-form-item label="学号">
          <el-input v-model="userInfo.stuid" placeholder="学号"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="iconFormVisible = false" class="cancel">取 消</el-button>
        <el-button type="primary" @click="submitUser()" class="confirm">确 定</el-button>
      </div>
    </el-dialog>
    </div>
   <div class="dialogtwo">
    <el-dialog :title="dialogTitle" width="25%" :visible.sync="iconFormVisiblet">
      <el-form :inline="true" :model="curriculadata" :rules="rules" ref="curriculadata">
        <el-form-item label="姓名" prop="name" >
          <el-input v-model="curriculadata.name" placeholder="姓名"></el-input>
        </el-form-item>
        <el-form-item label="学号" prop="stuid">
          <el-input v-model="curriculadata.stuid" placeholder="学号"></el-input>
        </el-form-item>
        <el-form-item label="课程名">
          <el-select v-model="curriculadata.currname" placeholder="课程名">
             <el-option label="js" value="js"></el-option>
             <el-option label="c" value="c"></el-option>
          </el-select>
        </el-form-item>
        </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="iconFormVisiblet = false" class="cancel">取 消</el-button>
        <el-button type="primary" @click="submitUsert()" class="confirm">确 定</el-button>
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
                  <div ref="myChart" :style="{width: '100%', height: '300px'}"></div>
              </div> 
          </el-card> 
        </el-card>
      </el-col>
    </el-row>
    </div>
</template>
<script>
import echarts from "echarts";
export default {
   data() {
      return {
        iconFormVisible: false,
        iconFormVisiblet:false,
        curriculadata: {},
        userInfo: {},
        dialogTitle: '选课',
        rowIndex: null,
        tableData: [{
          date: '2016-05-02',
          name: '王同学',
          stuid:'201803605112',
          currname: 'javascript',
           }, {
          date: '2016-05-04',
          name: '李同学',
          stuid:'201803605113',
          currname: 'c#',
          }, {
          date: '2016-05-01',
          name: '陈同学',
          stuid:'201803605114',
          currname: '网络',
         }, 
         {
          date: '2016-05-01',
          name: '张同学',
          stuid:'201803605115',
          currname: '操作系统',
          },
         {
          date: '2016-05-01',
          name: '枊同学',
           stuid:'201803605116',
          currname: 'python',
          },
        
        {
          date: '2016-05-03',
          name: '林同学',
          stuid:'201803605117',
          currname: 'ios',
          }],
         rules: {
          name: [
            { required: true, message: '请输入合法姓名', trigger: 'blur' },
            { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
          ],
          stuid:[
            { required: true, message: '请输入合法学号', trigger: 'blur' },
            { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
          ]
         }
      };
      
  },
   mounted(){
        this.drawLine();
      },
  methods: {
    // 增加
    add() {
      this.dialogTitle = '选课';
      this.curriculadata = {};
      this.iconFormVisiblet = true;
    },
    // 编辑
    handleEdit(index, row) {
      this.dialogTitle = '编辑';
      this.userInfo = row;
      this.iconFormVisible = true;
      this.rowIndex = index;
    },
    // 弹窗确定
    submitUser() {
      if (this.dialogTitle === '编辑') {
        this.tableData.splice(this.rowIndex, 1, this.userInfo);
        this.iconFormVisible = false;
        return;
      }
      this.tableData.splice(0, 0, this.userInfo);
      this.iconFormVisible = false;
    },

     // 弹窗确定
    submitUsert() {
      console.log(this.curriculadata)
      this.iconFormVisiblet = false;
    },
    // 删除
    remove(index, row) {
      this.$confirm(`确定删除${row.name}吗?`, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'error',
      }).then(() => {
        this.tableData.splice(index, 1);
      });
    },
     drawLine(){
          // 基于准备好的dom，初始化echarts实例
          let myChart = echarts.init(this.$refs.myChart);
          // 绘制图表
           myChart.setOption({
            title: { text: '已选课人数统计' },
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
  },
  }

}
</script>
<style scoped>
.label{
  color:red !important;
}
.dialog-footer{
  text-align: center !important;
}
.cancel{
 padding: 10px 15px !important;
 margin-right: 20px !important;
}
.confirm{
  padding: 10px 15px !important;
}
.chartt{
  margin-top: 20px;
}
.notcurricula{
  margin-top: 50px;
  margin-left: 90px;
}
.text{
 color: #666;
 font-size: 15px;
 font-weight:bold;
}

</style>
