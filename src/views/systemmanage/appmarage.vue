<template>
    <div class="appmarage">
        <div class="header">
            <el-button type="primary" @click="checkupdateall" size="small">
                {{$t('plugins.checkupdate')}}
            </el-button>
        </div>
        <div class="block" style="margin-top:10px;">
            <el-table :data="tableData.slice((start-1)*length,start*length)" style="width: 100%;text-align:center">
                <el-table-column  label="App" align="center">
                    <template slot-scope="scope">
                    <span :style="{'color': (scope.row.active==true ? 'green':'red')}">{{scope.row.app}}</span>
                </template>
                </el-table-column>
                <el-table-column prop="version" :label="$t('plugins.version')" align="center" sortable></el-table-column>
                <el-table-column prop="desc" :label="$t('developer.describe')" align="center" sortable></el-table-column>
                <el-table-column :label="$t('developer.operation')" align="right">
                    <template slot="header" slot-scope="scope">
                        <el-input
                        v-model="search"
                        size="mini"
                        @change="changevalue"
                        :placeholder="$t('plugins.enterappsearch')"/>
                    </template>
                <template slot-scope="scope">
                    <el-button  type="info" size="small" @click="startup(scope.row.app)" v-if="scope.row.active==false" plain><div style="width:10px;height:10px;border-radius:50%;display:inline-block;background:#00cc33;margin-right:10px"></div>{{$t('plugins.start')}}</el-button>
                    <el-button  type="info"  size="small" @click="stopup(scope.row.app)" v-if="scope.row.active==true"  plain><div style="width:10px;height:10px;border-radius:50%;display:inline-block;background:#a94442;margin-right:10px"></div>{{$t('plugins.stop')}}</el-button>
                    <el-button type="info"  size="small" plain @click="checkupdate(scope.row.app)">{{$t('plugins.checkupdate')}}</el-button>
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
        <el-dialog
        :title="$t('plugins.modulelist')"
        :visible.sync="dialogVisible"
        width="40%"
        :before-close="handleClose">
       <div>
           <el-table :data="tableData1.slice((start1-1)*length1,start1*length1)"
           height="300"
           style="width: 100%;text-align:center;margin-top:20px">
               <el-table-column prop="path" :label="$t('plugins.modulename')" sortable align="center">

               </el-table-column>
               <el-table-column prop="is_changed" :label="$t('plugins.ischange')" sortable align="center">

               </el-table-column>
           </el-table>
           <div class="block">
            <el-pagination
                background
                @size-change="handleSizeChange1"
                @current-change="handleCurrentChange1"
                :page-sizes="[10, 25, 50, 100]"
                :page-size="length1"
                layout="total, sizes, prev, pager, next, jumper"
                :total="total1"
                style="margin-top:30px;"
            ></el-pagination>
        </div>
       </div>
        <span slot="footer" class="dialog-footer">
            <el-button @click="dialogVisible = false" style="float:left">{{$t('developer.cancel')}}</el-button>
            <el-button style="float:right" type="primary" @click="reupload">{{$t('developer.determine')}}</el-button>
        </span>
        </el-dialog>
    </div>
</template>
<script>
import {Getapp,Getmodule,Getmodule1,Getstart,Getstop,GetReload} from '@/api/systemmanage/system'
import Cookies from 'js-cookie'
var table = []
var table1=[]
export default {
   data() {
      return {
          tableData:[],
          total:0,
          start:1,
          length:10,
          node:null,
          dialogVisible:false,
          start1:1,
          length1:10,
          total1:0,
          tableData1:[],
          app:'',
          version:"",
          searchvalue:'',
          search:''
      }
   },
   computed: {
   },
   mounted() {
       this.getInformation()
   },
   methods: {
       handleSizeChange(val){
           this.start=1
          this.length=val
      },
      handleCurrentChange(val){
          this.start=val
      },
      //检查更新
       handleSizeChange1(val){
           this.start1=1
           this.length1=val
      },
      handleCurrentChange1(val){
          this.start1=val
          
      },
      getInformation(){
          //初始化数据
          Getapp(this.node,this.start,this.length).then(response=>{
              if(response){
                  this.tableData = response.apps
                  table = response.apps
                  this.total = response.recordsTotal
              }
          }).catch(error=>{
              this.$message({
                  type:'error',
                  message:error.error
              })
          })
      },
       handleClose(){
           this.dialogVisible=false
       },
       changevalue(){
           if(this.search==''){
               this.tableData = table
           }
           this.tableData = this.tableData.filter(data => !this.search || data.app.toLowerCase().includes(this.search.toLowerCase()))
       },
       changedialog(){
           if(this.searchvalue==''){
               this.tableData1 = table1
           }
           this.tableData1 = tableData1.filter(data => !this.searchvalue || data.path.toLowerCase().includes(searchvalue.toLowerCase()))
       },
       checkupdate(app){
           //点击检查更新数据
           this.tableData1=[]
           this.searchvalue=''
           this.dialogVisible=true
           this.app = app,
           this.total1=0
           Getmodule(app).then(res=>{
               if(res){
                   res.map(item=>{
                       if(item.is_changed==false){
                           item.is_changed ='false'
                       }else{
                           item.is_changed = 'true'
                       }
                   })
                   this.tableData1 = res
                   table1 = res
                   this.total1 = res.length
               }
           })
       },
       checkupdateall(){
           this.searchvalue=''
           this.dialogVisible=true
           this.tableData1=[]
           this.total1=0
           Getmodule1('changed').then(res=>{
               if(res){
                   res.map(item=>{
                       if(item.is_changed==false){
                           item.is_changed ='false'
                       }else{
                           item.is_changed = 'true'
                       }
                   })
                   this.tableData1 = res
                   table1 = res
                   this.total1 = res.length
               }
           })
       },
      //启动
      startup(app){
          if(!sessionStorage.getItem('username')){
              this.$message({
                message: '您还未登录',
                type: 'warning'
                })
          }else{
              Getstart(app).then(response=>{
                  if(response){
                      this.$message({
                        message: '启动成功',
                        type: 'success'
                        })
                        this.getInformation()
                  }
              }).catch(error=>{
                  console.log(error)
              })
          }
      },
      //停止
      stopup(app){
          if(!sessionStorage.getItem('username')){
              this.$message({
                message: '您还未登录',
                type: 'warning'
                })
          }else{
              Getstop(app).then(response=>{
                  if(response){
                      this.$message({
                        message: '停止成功',
                        type: 'success'
                        })
                        this.getInformation()
                  }
              }).catch(error=>{
                  console.log(error)
              })
          }
      },
      reupload(){
          GetReload(this.app).then(response=>{
              if(response){
                  if(response.length==0){
                       this.$message({
                    message:'当前无更新',
                    type: 'warning'
                    })
                  }else{
                    this.$message({
                    message:'已更新模块'+ response,
                    type: 'success'
                    })
                  }
              }
          })
      }
   }
}
</script>
<style scoped>
.appmarage{
 background: #ffffff;
  padding: 20px;
  box-sizing: border-box;
  width: 100%;
  height:100%;
}
</style>
<style >
.appmarage .el-dialog__footer{
    padding-bottom:50px;
}
.appmarage .el-table th.is-leaf{
    padding:5px 0;
}
</style>
