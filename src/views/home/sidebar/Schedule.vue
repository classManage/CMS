<template>
  <div class="schedule">
    <el-tooltip
      class="item"
      effect="dark"
      content="导出Excel表"
      placement="right"
    >
      <el-button class="kb" type="info" plain @click="exportExcel"
        >导出课表</el-button
      >
    </el-tooltip>
    <div class="title">
      <div class="titlefirst">课</div>
      <div class="titlesecond">程</div>
      <div class="titlethirdly">表</div>
    </div>
    <el-row :gutter="25" class="box">
      <el-col :span="15" class="two">
        <el-card shadow="hover">
          <ClasSchedule></ClasSchedule>
          <p><strong>提示：</strong>课程表于2020年05月至2020年07月有效</p>
        </el-card>
      </el-col>
      <el-col :span="9">
        <el-card shadow="hover">
          <el-button class="add" type="success" size="mini" @click="add"
            >增加</el-button
          >
          <el-table
            :data="teaData"
            size="small"
            :header-cell-style="{
              'text-align': 'center',
              'background-color': '#f5f5f6'
            }"
            :cell-style="{ 'text-align': 'center' }"
            height="280"
            style="width: 100%;margin-bottom: 30px;"
          >
            <el-table-column label="课程" width="160">
              <template slot-scope="scope">
                <el-popover trigger="hover" placement="top">
                  <p>课程名: {{ scope.row.name }}</p>
                  <p>教师: {{ scope.row.tename }}</p>
                  <div slot="reference" class="name-wrapper">
                    <el-tag size="medium">{{ scope.row.name }}</el-tag>
                  </div>
                </el-popover>
              </template>
            </el-table-column>
            <el-table-column label="课时" width="115">
              <template slot-scope="scope">
                <span>{{ scope.row.classhour }}</span>
              </template>
            </el-table-column>
            <el-table-column label="考核方式" width="115">
              <template slot-scope="scope">
                <span>{{ scope.row.date }}</span>
              </template>
            </el-table-column>
            <el-table-column label="操作" width="115">
              <template slot-scope="scope">
                <el-tooltip
                  class="item"
                  effect="dark"
                  content="编辑"
                  placement="left"
                >
                  <el-button
                    size="mini"
                    type="primary"
                    icon="el-icon-edit"
                    circle
                    @click="handleEdit(scope.$index, scope.row)"
                  ></el-button>
                </el-tooltip>
                <el-button
                  size="mini"
                  type="danger"
                  icon="el-icon-delete"
                  circle
                  @click="handleDelete(scope.$index, scope.row)"
                ></el-button>
              </template>
            </el-table-column>
          </el-table>
          <p><strong>提示：</strong>上课教室:2教603</p>
        </el-card>
        <el-dialog
          :title="dialogTitle"
          width="50%"
          :visible.sync="iconFormVisible"
        >
          <el-form :inline="true" :model="Info" class="demo-form-inline">
            <el-form-item label="课程名">
              <el-popover trigger="hover" placement="top">
                <el-input v-model="Info.name" placeholder="课程名"></el-input>
                <el-input v-model="Info.tename" placeholder="教师"></el-input>
                <div slot="reference" class="name-wrapper">
                  <el-tag size="medium">{{ Info.name }}</el-tag>
                </div>
              </el-popover>
            </el-form-item>
            <el-form-item label="课时">
              <el-input
                v-model="Info.classhour"
                placeholder="课时"
                class="dia_input"
              ></el-input>
            </el-form-item>
            <el-form-item label="考核方式">
              <el-input v-model="Info.date" placeholder="考核方式"></el-input>
            </el-form-item>
          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button @click="iconFormVisible = false">取 消</el-button>
            <el-button type="primary" @click="submitUser()">确 定</el-button>
          </div>
        </el-dialog>
      </el-col>
    </el-row>
  </div>
</template>
<script>
import { ClasSchedule } from "@/utils/components";
import FileSaver from "file-saver";
import XLSX from "xlsx";
export default {
  data() {
    return {
      iconFormVisible: false,
      Info: {},
      dialogTitle: "增加",
      rowIndex: null,
      teaData: [
        {
          date: "考查",
          name: "语文",
          tename: "邢老师",
          classhour: 2
        },
        {
          date: "考试",
          name: "Html5+Css3项目开发",
          tename: "许老师",
          classhour: 4
        },
        {
          date: "考试",
          name: "Android综合训练",
          tename: "龚老师",
          classhour: 6
        },
        {
          date: "考查",
          name: "PHP程序设计",
          tename: "刘老师",
          classhour: 6
        },
        {
          date: "考查",
          name: "小程序项目开发",
          tename: "许老师",
          classhour: 4
        }
      ]
    };
  },
  methods: {
    exportExcel() {
      var wb = XLSX.utils.table_to_book(
        document.querySelector(".clasScheTable")
      );
      var wbout = XLSX.write(wb, {
        bookType: "xlsx",
        bookSST: true,
        type: "array"
      });
      try {
        FileSaver.saveAs(
          new Blob([wbout], { type: "application/octet-stream" }),
          "课程表.xlsx"
        );
      } catch (e) {
        if (typeof console !== "undefined") console.log(e, wbout);
      }
      return wbout;
    },
    add() {
      this.dialogTitle = "增加";
      this.Info = {};
      this.iconFormVisible = true;
    },
    handleEdit(index, row) {
      this.dialogTitle = "编辑";
      this.Info = row;
      this.iconFormVisible = true;
      this.rowIndex = index;
      // console.log(index, row);
    },
    handleDelete(index, row) {
      // console.log(index, row);
      this.$confirm(`确定删除${row.name}吗?`, "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "error"
      }).then(() => {
        this.teaData.splice(index, 1);
      });
    },
    // 弹窗确定
    submitUser() {
      if (this.dialogTitle === "编辑") {
        this.teaData.splice(this.rowIndex, 1, this.Info);
        this.iconFormVisible = false;
        return;
      } else if (
        !this.Info.name == "" &&
        this.Info.date &&
        this.Info.classhour
      ) {
        this.teaData.splice(0, 0, this.Info);
        this.iconFormVisible = false;
      } else {
        this.$message({
          message: "警告哦,内容不能为空",
          type: "warning"
        });
      }
    }
  },
  components: {
    ClasSchedule
  }
};
</script>
<style scoped>
.kb {
  margin-bottom: 30px;
}
.add {
  margin-bottom: 10px;
}
.el-card {
  height: 500px;
}
.title {
  display: flex;
  width: 300px;
  height: 70px;
  z-index: 1;
  position: absolute;
  left: 20%;
  top: 4%;
  justify-content: space-between;
}
.titlefirst {
  width: 60px;
  height: 60px;
  border-radius: 50%;
  background-color: #909399;
  overflow: hidden;
  color: #fff;
  text-align: center;
  line-height: 60px;
  font-size: 22px;
}
.titlesecond {
  width: 60px;
  height: 60px;
  border-radius: 50%;
  background-color: #f56c6c;
  color: #fff;
  overflow: hidden;
  text-align: center;
  line-height: 60px;
  font-size: 22px;
}
.titlethirdly {
  width: 60px;
  height: 60px;
  border-radius: 50%;
  background-color: #409eff;
  color: #fff;
  overflow: hidden;
  text-align: center;
  line-height: 60px;
  font-size: 22px;
}
.box {
  display: flex;
}
.two {
  flex: 2;
}
.schedule {
  position: relative;
}
.dia_input {
  width: 160px !important;
}
</style>
