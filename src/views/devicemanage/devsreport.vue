<template>
    <div class="devsreport">
        <div class="devsreporttop">
            <label for="">采集器：</label>
            <el-input v-model="devsreport" placeholder="请输入内容"></el-input>
            <el-button type="primary" style="margin-left:20px;" @click="information">查询</el-button>
        </div>
        <div class="devsreportsection">
            <template>
                <el-table
                    ref="multipleTable"
                    :data="tableData3"
                    tooltip-effect="dark"
                    style="width:100%;text-align:center"
                    @selection-change="handleSelectionChange">
                    <!-- <el-table-column
                    type="selection"
                    width="55"
                    align="center">
                    </el-table-column> -->
                    <el-table-column
                    label="状态"
                    align="center"
                    show-overflow-tooltip>
                     <template slot-scope="scope">
                        <div v-if="scope.row.is_online==true" style="width:10px;height:10px;border-radius:50%;display:inline-block;background:#00cc33;margin-right:10px"></div><span v-if="scope.row.is_online==true" style="color:#00cc33">运行中</span>
                        <div v-if="scope.row.is_online==false" style="width:10px;height:10px;border-radius:50%;display:inline-block;background:#f00;margin-right:10px"></div><span v-if="scope.row.is_online==false" style="color:#f00">未运行</span>
                    </template>
                    </el-table-column>
                    <el-table-column
                    prop="deveui"
                    label="DevEUI"
                    align="center"
                    >
                    </el-table-column>
                    <el-table-column
                    prop="appeui"
                    label="AppEUI"
                    align="center"
                    >
                    </el-table-column>
                    
                    <el-table-column
                    prop="devaddr"
                    label="采集器地址"
                    align="center"
                    show-overflow-tooltip>
                        <!-- <template slot-scope="scope">
                            <el-button
                            size="mini"
                            type="primary"
                            @click="handledetail(scope.$index, scope.row.deveui)">查看详情</el-button>
                        </template> -->
                    </el-table-column>
                </el-table>
            </template>
        </div>
        <div class="block" style="margin-top:30px;">
            <el-pagination
            background
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :page-sizes="[10, 25, 50, 100]"
            :page-size="length"
            layout="total, sizes, prev, pager, next, jumper"
            :total="total"
            >
            </el-pagination>
        </div>
    </div>
</template>
<script>
import {getdevsreport} from '@/api/login'
export default {
   data() {
      return {
          start:0,
          length:10,
          total:0,
          draw:1,
          devsreport:'',
          tableData3: [],
        multipleSelection: []
      }
   },
   mounted(){
       this.information()
   },
   methods:{
       handleSelectionChange(val) {
        this.multipleSelection = val;
      },
      handleSizeChange(val) {
        this.length=val
        this.information()
       
      },
      handleCurrentChange(val) {
        this.start=(val-1)*10
        this.information()
      },
      //初始化数据
      information(){
          getdevsreport(this.start,this.length,this.draw,this.devsreport).then(res=>{
              if(res.result==true){
                  this.tableData3 =res.data
                  this.total = res.recordsFiltered
              }
          }).catch(error=>{
              console.log(error)
          })
      },
        //编辑
       handleEdit(index, row){

       }, 
       //查看详情
       handledetail(index,val){
           this.devsreport = val
           this.$router.push({path:'/devicemanage/devsdetail',query:{devsreport:val}})
       },
       //查询
    //    search(){
    //        getdevsreport()
    //    }
   },
}
</script>
<style scoped>
.devsreport{
    background:#ffffff;
    padding-left:20px;
    padding-top:20px;
    margin-top:20px;
    box-sizing: border-box;
    min-height:875px;
}
.devsreportsection{
    margin-top:30px;
}
</style>
<style>
    .devsreporttop .el-input{
        width:200px;
    }
    .devsreport .el-table th{
    background:#fafafa;
    color:#666666;
    font-weight:600;
}
</style>

