<template>
    <div class="log">
        <div class="top">
            <div class="left">
                <el-button type="primary" icon="el-icon-circle-plus-outline" @click="install">设 置</el-button>
            </div>
            <div class="right">
                <label for="" style="">搜索：</label>
                <el-input style="width:200px" v-model="search"></el-input>
                <el-button type="primary" @click="Getinformation">搜 索</el-button>
            </div>
            
        </div>
        <el-table
            :data="tableData5"
            style="width: 100%"
            :row-class-name="tableRowClassName">
            <el-table-column type="expand" >
                <template slot-scope="props" icon="el-icon-circle-plus-outline">
                    <el-form label-position="left" inline class="demo-table-expand">
                    <el-form-item >
                        <span>{{ props.row.msg}}</span>
                    </el-form-item>
                    </el-form>
                </template>
                </el-table-column>
                <el-table-column
                label="级别"
                prop="level">
                </el-table-column>
                <el-table-column
                label="节点"
                prop="node">
                </el-table-column>
                <el-table-column
                label="应用"
                prop="author">
                </el-table-column>
                <el-table-column
                label="模块"
                prop="module">
                </el-table-column>
                <el-table-column
                label="函数"
                prop="function">
                </el-table-column>
                <el-table-column
                label="行号"
                prop="line">
                </el-table-column>
                <el-table-column
                label="进程"
                prop="pid">
                </el-table-column>
                <el-table-column
                label="时间"
                prop="datetime">
                </el-table-column>
        </el-table>
         <div class="block" style="margin-top:30px;">
                    <el-pagination
                    background
                    @size-change="handleSizeChange"
                    @current-change="handleCurrentChange"
                    :page-sizes="[10, 25, 50, 100]"
                    :page-size="length"
                    layout="total, sizes, prev, pager, next, jumper"
                    :total="total">
                    </el-pagination>
                </div>
                <!--创建弹窗-->
                <el-dialog
                    title="日志级别设置"
                    :visible.sync="dialogVisible"
                    width="30%"
                    :before-close="handleClose">
                    <div >
                        <el-table
                        :data="installtion"
                         style="width: 100%">
                         <el-table-column
                            label="模块"
                            prop="handle"
                            >
                        </el-table-column>
                        <el-table-column
                            label="级别"
                            >
                            <template scope="scope">
                                <el-select :value="scope.row.level">
                                    <el-option v-for="(item,key) in selsectinstall" :key="key" :label='item.label' :value="item.value"></el-option>
                                    
                                </el-select>
                            </template>
                        </el-table-column>

                        </el-table>
                        
                    </div>
                    <span slot="footer" class="dialog-footer">
                        <el-button @click="dialogVisible = false" style="float:left">关 闭</el-button>
                    </span>
                </el-dialog>
    </div>
</template>
<script>
import { Getdata,Getinstall } from '@/api/installation/index'
export default {
   data() {
      return {
          tableData5: [],
          node:null,
          start:0,
          length:10,
          total:0,
          draw:1,
          search:'',
          dialogVisible:false,
          installtion:[],
          selsectinstall:[{
              value:'info',
              label:'info'
          },
          {
              value:'error',
              label:'error'
          },
          {
              value:'warning',
              label:'warning'
          },
          {
              value:'debug',
              label:'debug'
          },
          {
              value:'mqtt',
              label:'mqtt'
          },
          {
              value:'kafka',
              label:'kafka'
          },
          {
              value:'alert',
              label:'alert'
          },
          {
              value:'critical',
              label:'critical'
          },{
              value:'emergency',
              label:'emergency'
          },
          {
              value:'notice',
              label:'notice'
          }
          ]
      }
   },
   mounted() {
       this.Getinformation()
   },
   methods: {
       Getinformation(){
           Getdata(this.node,this.start,this.length,++this.draw,this.search).then(response=>{
               if(response.result==true){
                   response.data.map(item=>{
                       item.author =item.author.substring(0,8)
                   })
                   this.tableData5 = response.data
                   this.total = response.recordsTotal
               }
           })
       },
        handleSizeChange(val) {
        this.length=val
        this.Getinformation()
      },
      handleCurrentChange(val) {
        this.start=(val-1)*10
        this.Getinformation()
      },
      tableRowClassName({row, rowIndex}) {
        if(row.level=='error'){
             return 'error-row';
        }else if(row.level=='info'){
             return 'success-row';
        }else if(row.level=='debug'){
            return 'debug-row'
        }
        else{
            return 'warning-row';
        }
      },
      install(){
          Getinstall(this.node).then(response=>{
              if(response.result==true){
                  this.installtion = response.handles
                  
              }
             
          })
          this.dialogVisible=true
      },
      handleClose(){
          this.dialogVisible=false
      }
   }
}
</script>
<style scoped>
.log{
min-height: 875px;
  background: white;
  padding: 20px;
  box-sizing: border-box;
  margin-top:20px;
}
.log .top div{
    display:inline-block;
}
.top .left{
    float:left
}
.top .right{
    float:right;
}
</style>
<style >
  .log  .demo-table-expand {
    font-size: 0;
  }
 .log .demo-table-expand label {
    width: 90px;
    color: #99a9bf;
  }
  .log .demo-table-expand .el-form-item {
    margin-right: 0;
    margin-bottom: 0;
    width: 50%;
  }
  .log .el-table .error-row {
    background: #f56c6c;
  }
  .log .el-table .debug-row {
    background: #909399;
  }
.log .el-table .warning-row {
    background: #e6a23c;
  }
  .log .el-table .success-row {
    background: #67c23a;
  }
  .log .cell{
      color:black;
      font-size:14px;
  }
  .log .el-dialog__body{
    background:#f5f5f5;
}
.log .el-dialog__footer{
    padding-bottom:50px;
}
</style>
