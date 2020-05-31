<template>
  <div>
    <el-row>
      <el-col :span="2">
        <el-button type="info" size="small">导出成绩</el-button>
      </el-col>
      <el-col :span="6" :offset="16">
        <el-input placeholder="请输入学号快速查找" v-model="search">
          <i slot="prefix" class="el-input__icon el-icon-search"></i>
        </el-input>
      </el-col>
    </el-row>
    <el-table
      :data="tableData"
      style="width: 100%;margin-top:30px;"
      :header-cell-style="{ 'text-align': 'center' }"
      :cell-style="{ 'text-align': 'center' }"
      :default-sort="{ prop: 'stuid', order: 'descending' }"
      max-height="300"
    >
      <el-table-column fixed prop="stuid" label="学号" sortable width="200">
      </el-table-column>
      <el-table-column prop="name" label="姓名" width="200"> </el-table-column>
      <el-table-column prop="kcname" label="课程" width="200" align="center">
        <template slot="header">
          <el-dropdown trigger="click" @command="handleCommand" szie="mini">
            <span>
              课程 <i class="el-icon-arrow-down el-icon--right"></i>
            </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item
                v-for="item in kc"
                :key="item.id"
                :command="item.kcname"
              >
                {{ item.kcname }}
              </el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </template>
      </el-table-column>
      <el-table-column prop="stage" label="阶段" width="200">
        <template slot="header">
          <el-dropdown trigger="click" @command="handleCommand" szie="mini">
            <span>
              阶段 <i class="el-icon-arrow-down el-icon--right"></i>
            </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item
                v-for="item in kc"
                :key="item.id"
                :command="item.stage"
              >
                {{ item.stage }}
              </el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </template>
      </el-table-column>
      <el-table-column prop="score" label="分数" width="200"> </el-table-column>
      <el-table-column prop="rate" label="评级" width="200"> </el-table-column>

      <el-table-column fixed="right" label="操作" width="180">
        <template slot-scope="scope">
          <el-button
            type="primary"
            icon="el-icon-edit"
            size="mini"
            @click="Edit(scope.$index, scope.row)"
          ></el-button>
        </template>
      </el-table-column>
    </el-table>

    <el-dialog
      :title="dialogTitle"
      :visible.sync="EditdialogVisible"
      width="50%"
    >
      <el-form :inline="true" :model="scoreEdit">
        <el-form-item label="学号">
          <el-input
            v-model="scoreEdit.stuid"
            placeholder="学号"
            size="medium"
          ></el-input>
        </el-form-item>
        <el-form-item label="姓名">
          <el-input
            v-model="scoreEdit.name"
            placeholder="姓名"
            size="medium"
          ></el-input>
        </el-form-item>
        <el-form-item label="课程">
          <el-input v-model="scoreEdit.kcname" placeholder="课程"></el-input>
        </el-form-item>
        <el-form-item label="阶段">
          <el-input v-model="scoreEdit.stage" placeholder="阶段"></el-input>
        </el-form-item>
        <el-form-item label="分数">
          <el-input v-model="scoreEdit.score" placeholder="分数"></el-input>
        </el-form-item>
        <el-form-item label="评级">
          <el-input v-model="scoreEdit.rate" placeholder="评级"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="EditdialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="EditdialogVisible = false"
          >确 定</el-button
        >
      </span>
    </el-dialog>
  </div>
</template>
<script>
export default {
  methods: {
    Edit(index, row) {
      // rows.splice(index, 1);
      this.EditdialogVisible = true;
      this.dialogTitle = "修改用户";
      this.scoreEdit = row;
      this.rowIndex = index;
    },
    // 弹窗确定
    submitUser() {
      if (this.dialogTitle === "修改用户") {
        this.tableData.splice(this.rowIndex, 1, this.scoreEdit);
        this.EditdialogVisible = false;
        return;
      }
      this.tableData.splice(0, 0, this.scoreEdit);
      this.EditdialogVisible = false;
    },
    handleCommand(command) {
      console.log(command);
    }
  },
  data() {
    return {
      dialogTitle: "修改用户",
      EditdialogVisible: false,
      scoreEdit: {},
      tableData: [
        {
          stuid: "201803605116",
          name: "王小虎",
          stage: "期中",
          score: "60",
          rate: "及格",
          kcname: "js"
        },
        {
          stuid: "201803605116",
          name: "王小虎",
          stage: "期中",
          score: "70",
          rate: "良好",
          kcname: "js"
        },
        {
          stuid: "201803605116",
          name: "王小虎",
          stage: "期中",
          score: "90",
          rate: "优秀",
          kcname: "js"
        },
        {
          stuid: "201803605116",
          name: "王小虎",
          stage: "期中",
          score: "50",
          rate: "不及格",
          kcname: "js"
        },
        {
          stuid: "201803605116",
          name: "王小虎",
          stage: "期中",
          score: "80",
          rate: "良好",
          kcname: "js"
        },
        {
          stuid: "201803605116",
          name: "王小虎",
          stage: "期中",
          score: "70",
          rate: "良好",
          kcname: "js"
        },
        {
          stuid: "201803605116",
          name: "王小虎",
          stage: "期中",
          score: "85",
          rate: "良好",
          kcname: "js"
        }
      ],
      kc: [
        {
          kcname: "Androind",
          stage: "期中"
        },
        {
          kcname: "html",
          stage: "期末"
        },
        {
          kcname: "js",
          stage: "项目考核"
        }
      ]
    };
  }
};
</script>
