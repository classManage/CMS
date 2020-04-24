<template>
  <div>
    <el-row>
      <el-col :span="4">
        <el-dropdown
          size="small"
          trigger="click"
          split-button
          type="primary"
          @command="handleCommand"
          @click="handleClick"
        >
          批量{{ command }}
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item command="点到">点到</el-dropdown-item>
            <el-dropdown-item command="迟到">迟到</el-dropdown-item>
            <el-dropdown-item command="旷课">旷课</el-dropdown-item>
            <el-dropdown-item command="请假">请假</el-dropdown-item>
            <el-dropdown-item command="早退">早退</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
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
      <el-table-column type="selection" width="55"></el-table-column>
      <el-table-column prop="id" label="学号" sortable></el-table-column>
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
      <el-table-column label="迟到">
        <template slot-scope="scope">
          <el-tooltip
            class="item"
            effect="dark"
            :content="String(scope.row.late)"
            placement="top"
          >
            <el-progress
              :stroke-width="20"
              :percentage="filterData(scope.row, scope.row.late)"
              :show-text="false"
              color="#FF7340"
            ></el-progress>
          </el-tooltip>
        </template>
      </el-table-column>
      <el-table-column label="早退">
        <template slot-scope="scope">
          <el-tooltip
            class="item"
            effect="dark"
            :content="String(scope.row.leave)"
            placement="top"
          >
            <el-progress
              :stroke-width="20"
              :percentage="filterData(scope.row, scope.row.leave)"
              status="warning"
              :show-text="false"
            ></el-progress>
          </el-tooltip>
        </template>
      </el-table-column>
      <el-table-column label="旷课">
        <template slot-scope="scope">
          <el-tooltip
            class="item"
            effect="dark"
            :content="String(scope.row.absent)"
            placement="top"
          >
            <el-progress
              :stroke-width="20"
              :percentage="filterData(scope.row, scope.row.absent)"
              :show-text="false"
              color="#FF4040"
            ></el-progress>
          </el-tooltip>
        </template>
      </el-table-column>
      <el-table-column label="请假">
        <template slot-scope="scope">
          <el-tooltip
            class="item"
            effect="dark"
            :content="String(scope.row.please)"
            placement="top"
          >
            <el-progress
              :stroke-width="20"
              :percentage="filterData(scope.row, scope.row.please)"
              :show-text="false"
            ></el-progress>
          </el-tooltip>
        </template>
      </el-table-column>
      <el-table-column align="center" label="状态">
        <template slot-scope="scope">
          <el-button
            type="info"
            round
            icon="el-icon-circle-close"
            size="mini"
            v-if="!scope.row.check"
            >未签到</el-button
          >
          <el-button
            type="success"
            round
            icon="el-icon-circle-check"
            size="mini"
            v-else-if="scope.row.check == '点到'"
            >已{{ scope.row.check }}</el-button
          >
          <el-button
            style="background-color: #FF7340;color: white"
            round
            icon="el-icon-circle-check"
            size="mini"
            v-else-if="scope.row.check == '迟到'"
            >已{{ scope.row.check }}</el-button
          >
          <el-button
            style="background-color: #E6A23C;color: white"
            round
            icon="el-icon-circle-check"
            size="mini"
            v-else-if="scope.row.check == '早退'"
            >已{{ scope.row.check }}</el-button
          >
          <el-button
            style="background-color: #FF4040;color: white"
            round
            icon="el-icon-circle-check"
            size="mini"
            v-else-if="scope.row.check == '旷课'"
            >已{{ scope.row.check }}</el-button
          >
          <el-button
            style="background-color: #409EFF;color: white"
            round
            icon="el-icon-circle-check"
            size="mini"
            v-else
            >已{{ scope.row.check }}</el-button
          >
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import student from "@/assets/json/18移动班级名单.json";

export default {
  data() {
    return {
      tableData: student,
      search: "",
      command: "点到"
    };
  },
  methods: {
    filterData(row, data) {
      return Math.floor(
        (data / (row.late + row.leave + row.absent + row.please)) * 100
      );
    },
    handleCommand(command) {
      this.command = command;
    },
    handleClick() {
      let arr = this.$refs.table.selection.map(v =>
        Object.assign(v, { check: this.command })
      );
      let length = arr.length;
      this.tableData.reduce((arr, item) => {
        let find = arr.find(v => v.id === item.id);
        if (!find) arr.push(item);
        return arr;
      }, arr);
      this.tableData = arr;
      this.$notify({
        title: "成功",
        message: `共${length}名同学标记为已${this.command}`,
        type: "success",
        offset: 30
      });
    }
  },
  computed: {
    filterStudent() {
      return this.tableData.filter(item =>
        Object.values(item).some(v => String(v).includes(this.search))
      );
    }
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
