<template>
  <div>
    <el-table
      :data="tableData"
      height="350"
      :header-cell-style="{
        'text-align': 'center',
        'background-color': '#f5f5f6'
      }"
      :cell-style="{ 'text-align': 'center' }"
      border
      style="width: 100%"
    >
      <el-table-column prop="date" label="时间" width="189"> </el-table-column>
      <el-table-column prop="monday" label="周一" width="189">
        <template slot-scope="scope">
          <span v-text="scope.row.monday"></span>
        </template>
      </el-table-column>
      <el-table-column prop="tuesday" label="周二" width="189">
        <template slot-scope="scope">
          <span v-text="scope.row.tuesday"></span>
        </template>
      </el-table-column>
      <el-table-column prop="wednesday" label="周三" width="189">
        <template slot-scope="scope">
          <span v-text="scope.row.wednesday"></span>
        </template>
      </el-table-column>
      <el-table-column prop="thursday" label="周四" width="189">
        <template slot-scope="scope">
          <span v-text="scope.row.thursday"></span>
        </template>
      </el-table-column>
      <el-table-column prop="friday" label="周五" width="189">
        <template slot-scope="scope">
          <span v-text="scope.row.friday"></span>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>
<script>
export default {
  data() {
    return {
      paper: {
        android: "Android综合训练",
        htmlcss: "html5+Css3项目开发",
        phprog: "PHP程序设计",
        miniapp: "小程序项目开发",
        classmeeting: "班会",
        chicla: "语文"
      },
      tableData: [
        {
          date: "8:20-10:20"
        },
        {
          date: "10:30-12:10"
        },
        {
          date: "14:00-15:30"
        },
        {
          date: "15:40-17:10"
        },
        {
          date: "18:00-19:20"
        },
        {
          date: "19:30-21:00"
        }
      ]
    };
  },
  methods: {
    init() {
      this.tableData[0].monday = this.paper.mondaycur
        ? this.paper.mondaycur
        : "-";
      this.tableData[1].monday = this.paper.android ? this.paper.android : "-";
      this.tableData[2].monday = this.paper.mondaycur
        ? this.paper.mondaycur
        : "-";
      this.tableData[3].monday = this.paper.mondaycur
        ? this.paper.mondaycur
        : "-";
      this.tableData[4].monday = this.paper.classmeeting
        ? this.paper.classmeeting
        : "-";
      this.tableData[5].monday = this.paper.chicla ? this.paper.chicla : "-";
      this.tableData[0].tuesday = this.paper.tuesdaycur
        ? this.paper.tuesdaycur
        : "-";
      this.tableData[1].tuesday = this.paper.android ? this.paper.android : "-";
      this.tableData[2].tuesday = this.paper.phprog ? this.paper.phprog : "-";
      this.tableData[3].tuesday = this.paper.phprog ? this.paper.phprog : "-";
      this.tableData[4].tuesday = this.paper.tuesdaycur
        ? this.paper.tuesdaycur
        : "-";
      this.tableData[5].tuesday = this.paper.tuesdaycur
        ? this.paper.tuesdaycur
        : "-";
      this.tableData[0].wednesday = this.paper.wednesdaycur
        ? this.paper.wednesdaycur
        : "-";
      this.tableData[1].wednesday = this.paper.htmlcss
        ? this.paper.htmlcss
        : "-";
      this.tableData[2].wednesday = this.paper.miniapp
        ? this.paper.miniapp
        : "-";
      this.tableData[3].wednesday = this.paper.miniapp
        ? this.paper.miniapp
        : "-";
      this.tableData[4].wednesday = this.paper.wednesdaycur
        ? this.paper.wednesdaycur
        : "-";
      this.tableData[5].wednesday = this.paper.wednesdaycur
        ? this.paper.wednesdaycur
        : "-";
      this.tableData[0].thursday = this.paper.thursdaycur
        ? this.paper.thursdaycur
        : "-";
      this.tableData[1].thursday = this.paper.android
        ? this.paper.android
        : "-";
      this.tableData[2].thursday = this.paper.thursdaycur
        ? this.paper.thursdaycur
        : "-";
      this.tableData[3].thursday = this.paper.thursdaycur
        ? this.paper.thursdaycur
        : "-";
      this.tableData[4].thursday = this.paper.thursdaycur
        ? this.paper.thursdaycur
        : "-";
      this.tableData[5].thursday = this.paper.thursdaycur
        ? this.paper.thursdaycur
        : "-";
      this.tableData[0].friday = this.paper.fridaycur
        ? this.paper.fridaycur
        : "-";
      this.tableData[1].friday = this.paper.htmlcss ? this.paper.htmlcss : "-";
      this.tableData[2].friday = this.paper.fridaycur
        ? this.paper.fridaycur
        : "-";
      this.tableData[3].friday = this.paper.phprog ? this.paper.phprog : "-";
      this.tableData[4].friday = this.paper.fridaycur
        ? this.paper.fridaycur
        : "-";
      this.tableData[5].friday = this.paper.fridaycur
        ? this.paper.fridaycur
        : "-";
    }
  },
  created() {
    this.init();
  }
};
</script>
<style scoped></style>
