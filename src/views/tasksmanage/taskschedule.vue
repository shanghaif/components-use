<template>
  <div class="taskschedule">
    <h2>实时任务</h2>
    <div>
      <el-input style="width:200px" v-model="searchvalue"></el-input>
      <el-button type="primary" @click="Gettaskdetail">搜索</el-button>
    </div>
    <div class="block">
      <el-table :data="tableData" style="width: 100%;text-align:center" v-loading="loading">
        <el-table-column type="index" width="50"></el-table-column>
        <el-table-column prop="vcaddr" label="集中器" align="center"></el-table-column>
        <el-table-column prop="datetime" label="冻结日期" align="center"></el-table-column>
        <el-table-column prop="di" label="数据项标识" align="center"></el-table-column>
        <el-table-column prop="success_rate" label="抄表成功率" align="center"></el-table-column>
        <el-table-column label="操作" align="center">
          <template slot-scope="scope">
            <el-button size="mini" type="primary" @click="Meterdetail(scope.row.di,scope.row.datetime,scope.row.vcaddr)">详情</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="block">
      <el-pagination
        background
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :page-sizes="[10, 25, 50, 100]"
        :page-size="length"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
        style="margin-top:30px;"
      ></el-pagination>
    </div>
  </div>
</template>
<script>
import { Taskdetail } from "@/api/historytask";
import { timestampToTime, timetounix } from "@/api/login";
export default {
  data() {
    return {
      id: "",
      node: null,
      draw: 1,
      start: 0,
      length: 10,
      tableData: [],
      total:0,
      searchvalue:'',
      loading:true
    };
  },
  mounted() {
    this.Gettaskdetail();
  },
  methods: {
    Gettaskdetail() {
      this.id = this.$route.query.id;
      this.loading=true
      Taskdetail(this.node, this.start, this.length, this.draw++, this.id,this.searchvalue).then(
        response => {
          if(response){
            response.data.map(item => {
              item.datetime = timestampToTime(item.datetime);
              item.success_rate = item.success_rate + "%";
            });
            this.tableData = response.data;
            this.total = response.recordsTotal
            this.loading=false
          }
        }
      ).catch(error=>{
        this.$message.error(error.error)
      });
    },
     handleSizeChange(val){
          this.length=val
          this.Gettaskdetail()
      },
      handleCurrentChange(val){
          this.start=(val-1)*this.length
          this.Gettaskdetail()
      },
      Meterdetail(di, datetime, vcaddr) {
      datetime = timetounix(datetime);
      this.$router.push({
        path: "/tasksmanage/taskmeterdetail",
        query: { di: di, datetime: datetime, vcaddr: vcaddr,id:this.id }
      });
    },
  }
  
};
</script>
<style scoped>
.taskschedule {
  background: #ffffff;
  padding: 20px;
  box-sizing: border-box;
  width: 100%;
  min-height: 100%;
}
h2 {
  margin-top: 20px;
}
.block {
  margin-top: 20px;
}
</style>
