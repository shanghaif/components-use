<template>
  <div class="reportmodule">
    <div class="add">
      <el-button type="primary" @click="addmodule">新 增</el-button>
    </div>
    <div class="reportlist">
      <el-table :data="tableData" stripe style="width: 100%">
        <el-table-column label="ID" width="180">
          <template slot-scope="scope">
            <span>{{scope.row.objectId}}</span>
          </template>
        </el-table-column>
        <el-table-column label="产品名称" width="180">
          <template slot-scope="scope">
            <span>{{scope.row.data.sample}}</span>
          </template>
        </el-table-column>
        <el-table-column label="检验类别">
          <template slot-scope="scope">
            <span>{{scope.row.data.category}}</span>
          </template>
        </el-table-column>
        <el-table-column label="检验标准">
          <template slot-scope="scope">
            <span>{{scope.row.data.inspection_standard}}</span>
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button size="mini" @click="handleEdit(scope.row.objectId)">详 情</el-button>
            <el-button size="mini" type="primary" @click="editorDetail(scope.row.objectId)">编 辑</el-button>
            <el-button size="mini" type="danger" @click="handleDelete(scope.row.objectId)">删 除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <div class="block">
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :page-sizes="[5, 10,20]"
          :page-size="length"
          layout="total, sizes, prev, pager, next, jumper"
          :total="total"
        ></el-pagination>
      </div>
    </div>
    <!--弹窗-->
    <el-dialog
      title="模板详情"
      :visible.sync="dialogTableVisible"
      width="50%"
      style="padding:20px;box-sizing: border-box;"
    >
      <el-table :data="gridData" border>
        <el-table-column label="id" width="50">
          <template slot-scope="scope">
            <el-tag size="medium">{{ scope.row.id }}</el-tag>
          </template>
        </el-table-column>
        <el-table-column label="检验项目">
          <template slot-scope="scope">{{ scope.row.inspecting }}</template>
        </el-table-column>
        <el-table-column property="title" label="保证值" width="200"></el-table-column>
        <el-table-column property="value" label="测试值"></el-table-column>
        <el-table-column property label="评定"></el-table-column>
      </el-table>
    </el-dialog>
  </div>
</template>
<script>
import { Parse } from "parse";
import { getReport, getReportdetail } from "@/api/reportmodule/reportmodule";
import Cookies from "js-cookie";
export default {
  data() {
    return {
      tableData: [],
      total: 0,
      start: 0,
      length: 10,
      dialogTableVisible: false,
      gridData: []
    };
  },
  mounted() {
    this.reportList();
  },
  methods: {
    addmodule() {
      this.$router.push({
        path: "/reportmodule/module"
      });
    },
    handleEdit(id) {
      console.log(id);
      this.dialogTableVisible = true;
      getReportdetail(id)
        .then(res => {
          this.gridData = res.data.inspecting;
        })
        .catch(error => {
          console.log(error);
        });
    },
    handleDelete(id) {
      this.$confirm("此操作将永久删除此检验标准, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          var Datas = Parse.Object.extend("Datas");
          var datas = new Parse.Query(Datas);
          datas.get(id).then(object => {
            object.destroy().then(
              response => {
                this.$message({
                  type: "success",
                  message: "删除成功!"
                });
                this.reportList();
              },
              error => {
                console.log(error);
              }
            );
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },
    reportList() {
      getReport(this.start, this.length).then(resultes => {
        this.tableData = resultes.data;
        this.total = resultes.data.length;
        //					console.log(this.tableData)
      });
    },
    handleSizeChange(val) {
      this.pagesize = val;
      this.reportList(this.start, this.pagesize);
    },
    handleCurrentChange(val) {
      this.start = Number(val - 1) * Number(this.pagesize);
      this.reportList(this.start, this.pagesize);
    },
    editorDetail(id) {
      this.$router.push({
        path: "/reportmodule/module",
        query: {
          id: id
        }
      });
      Cookies.set("reportId", id);
    }
  }
};
</script>
<style scoped>
.reportmodule {
  width: 100%;
  min-height: 875px;
  padding: 20px;
  margin-top: 20px;
  box-sizing: border-box;
  background: #ffffff;
}
.reportlist {
  margin-top: 20px;
}
</style>
<style type="text/css">
.block {
  margin-top: 20px;
}
</style>