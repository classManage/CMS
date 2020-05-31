<template>
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
      <el-col :span="6" :offset="14">
        <el-input
          placeholder="输入关键字进行过滤"
          v-model="search"
          clearable
          size="small"
        ></el-input>
      </el-col>
    </el-row>
    <el-table
      ref="table"
      :data="filterStudent"
      height="600px"
      stripe
      :default-sort="{ prop: 'id', order: 'ascending' }"
    >
      <el-table-column
        prop="SID"
        label="学号"
        sortable
        align="center"
      ></el-table-column>
      <el-table-column label="姓名" align="center">
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
      <el-table-column label="迟到/次" align="center">
        <template slot-scope="scope">
          <span style="color: #FF7340">{{ scope.row.kaoqin.late }}</span>
        </template>
      </el-table-column>
      <el-table-column label="早退/次" align="center">
        <template slot-scope="scope">
          <span style="color: #E6A23C">{{ scope.row.kaoqin.leave }}</span>
        </template>
      </el-table-column>
      <el-table-column label="旷课/次" align="center">
        <template slot-scope="scope">
          <span style="color: #FF4040">{{ scope.row.kaoqin.absent }}</span>
        </template>
      </el-table-column>
      <el-table-column label="请假/次" align="center">
        <template slot-scope="scope">
          <span style="color: #409EFF">{{ scope.row.kaoqin.please }}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="本阶段/评分">
        <template slot-scope="scope">
          <el-button
            type="success"
            round
            icon="el-icon-star-off"
            size="mini"
            v-if="filterData(scope.row.kaoqin) === '优秀'"
            >优秀</el-button
          >
          <el-button
            type="warning"
            round
            icon="el-icon-star-off"
            size="mini"
            v-else-if="filterData(scope.row.kaoqin) === '良好'"
            >良好</el-button
          >
          <el-button
            type="danger"
            round
            icon="el-icon-star-off"
            size="mini"
            v-else
            >很差</el-button
          >
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { mapState } from "vuex";

export default {
  data() {
    return {
      search: "",
      date: ""
    };
  },
  methods: {
    filterData(row) {
      let num = row.late * 4 + row.leave * 4 + row.absent * 8 + row.please * 1;
      if (num <= 30) {
        return "优秀";
      } else if (num <= 40) {
        return "良好";
      } else {
        return "很差";
      }
    }
  },
  computed: {
    filterStudent() {
      return this.currentClass.students.filter(item =>
        Object.values(item).some(v => String(v).includes(this.search))
      );
    },
    ...mapState(["currentClass"])
  },
  mounted() {}
};
</script>

<style lang="less" scoped>
.blue {
  color: #409eff;
}
.pick {
  color: #f56c6c;
}
.red {
  color: red;
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
</style>
