<template>
  <div class="zetadevices">
    <div class="zetaheader">
      <el-form :inline="true" :model="formInline" class="demo-form-inline" size="small">
        <el-form-item label="终端类型">
          <el-select v-model="formInline.zetagtype" placeholder="终端类型">
            <el-option label="ZETAG标签" value="ZETAG"></el-option>
           
          </el-select>
          <el-form-item label="终端型号">
            <el-select v-model="formInline.zetag">
              <el-option label="ZETAG AP" value="AP"></el-option>
              <el-option label="ZETAG C1" value="C1"></el-option>
              <el-option label="ZETAG C2" value="C2"></el-option>
              <el-option label="ZETAG P1" value="P1"></el-option>
            </el-select>
          </el-form-item>
        </el-form-item>
        <el-form-item label="标签编号">
          <el-input v-model="formInline.number" placeholder="标签编号"></el-input>
        </el-form-item>
        <el-form-item label="设备状态">
          <el-select v-model="formInline.status" placeholder="设备状态">
            <el-option label="打开" :value="1"></el-option>
            <el-option label="关闭" :value="0"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit">查 询</el-button>
          <el-button type="primary" @click="resetForm">重 置</el-button>
        </el-form-item>
      </el-form>
    </div>
    <!--中间tag标签展示-->
    <div class="zetacontent">
      <div class="zetag" v-for="(items,index) in nowdata" :key="index">
        <div class="zetagleft">
          <img :src="zetagurl" alt="">
        </div>
        <div class="zetagright">
          <p>ZETAG标签(<span style="color:green">{{items.zetagID}}</span>)</p>
          <p><span>型号:C2</span><span style="float:right;" :style="{'color': items.status==1 ? 'green' : 'red'}">{{items.status==1 ?  '打开' : '关闭'}}</span></p>
          <p>最后上报时间：<span style="color:#84f">{{timestampToTime(items.timestamp)}}</span></p>
          <p><span style="vertical-align:sub">最新位置:</span><span style="float:right"><el-button  type="primary" size="mini" @click="locusSearch(items.zetagID,items.timestamp)">轨迹查询</el-button></span></p>
          <p><span>N：{{cacuLonLat(items.lat)}}</span><span style="margin-left:5px;">E：{{cacuLonLat(items.long)}}</span></p>
        </div>
      </div>
    </div>
    <!--分页-->
    <div class="block">
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :page-sizes="[10, 20, 30, 40]"
          :page-size="pagesize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="total"
        ></el-pagination>
      </div>
    <!--轨迹dialog-->
    <el-dialog title="轨迹查询" :visible.sync="dialogTableVisible">
      <el-table :data="tableData.slice((start1-1)*pagesize1,start1*pagesize1)" style="width:100%;text-align:center">
        <el-table-column label="序号" type="index" align="center" width="100" :index='(index)=>{return (index+1) + (start1-1)*pagesize1}' ></el-table-column>
        <el-table-column property="zetagID" label="设备编号" align="center"></el-table-column>
        <el-table-column  label="位置信息" align="center">
          <template slot-scope="scope">
            <span>N：{{cacuLonLat(scope.row.lat)}}</span><span style="margin-left:5px;">E：{{cacuLonLat(scope.row.long)}}</span>
          </template>
        </el-table-column>
        <el-table-column  label="上报时间" align="center">
          <template slot-scope="scope">
            <span>{{timestampToTime(scope.row.timestamp)}}</span>
          </template>
          
        </el-table-column>
      </el-table>
       <div class="block">
        <el-pagination
          @size-change="handleSizeChange1"
          @current-change="handleCurrentChange1"
          :page-sizes="[10, 20, 30, 40]"
          :page-size="pagesize1"
          layout="total, sizes, prev, pager, next, jumper"
          :total="total1"
        ></el-pagination>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogTableVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogTableVisible = false">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import {ZetaEtag,ZetaEtagHistroy} from '@/api/zeta'
export default {
  data() {
    return {
      dialogTableVisible:false,
      tableData: [],
      formInline: {
        zetag:'C1',
        zetagtype:'',
        number:'',
        status:1,
      },
      start:0,
      pagesize:10,
      total:0,
      zetagurl:require('../../imgages/zetagnet.png'),
      readtime:'',
      nowdata:[],
      start1:0,
      pagesize1:10,
      total1:0,
      
    };
  },
  mounted() {
    this.getZeTag(11223344)
     this.$nextTick(function () {
            setInterval(this.nowtime, 1000);
        })
      
  },
  methods: {
    timestampToTime(timestamp) {
        var date = new Date(timestamp * 1000) 
        var Y = date.getFullYear() + '-';
        var M = (date.getMonth()+1 <= 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1) + '-';
        var D = (date.getDate()+1 <= 10 ? '0'+(date.getDate()) : date.getDate()) + ' ';
        var h = (date.getHours()+1 <= 10 ? '0'+(date.getHours()) : date.getHours())  + ':';
        var m = (date.getMinutes()+1 <= 10 ? '0'+(date.getMinutes()) : date.getMinutes())  + ':';
        var s = (date.getSeconds()+1 <= 10 ? '0'+(date.getSeconds()) : date.getSeconds());
        return Y+M+D+h+m+s;
      },
      //经纬度装换位度 分 秒
       cacuLonLat(a) {
        var degree = parseInt(a);
        var min = parseInt((a - degree) * 60);
        var sec = parseInt((a - degree) * 3600 - min * 60);
        // var msec = Math.abs(parseInt((a-degree)*360000-sec*1000)).toString().substr(0,2)
        return degree + '°' + min + '′' + sec + '″';
    },
    nowtime(){
            var timestamp3 = Date.parse(new Date());
            var date = new Date(timestamp3) 
            var Y = date.getFullYear() + '-';
            var M = (date.getMonth()+1 <= 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1) + '-';
            var D = (date.getDate()+1 <= 10 ? '0'+(date.getDate()) : date.getDate()) + ' ';
            var h = (date.getHours()+1 <= 10 ? '0'+(date.getHours()) : date.getHours())  + ':';
            var m = (date.getMinutes()+1 <= 10 ? '0'+(date.getMinutes()) : date.getMinutes())  + ':';
            var s = (date.getSeconds()+1 <= 10 ? '0'+(date.getSeconds()) : date.getSeconds());
            this.readtime=(Y+M+D+h+m+s); 
      },
      //查询条件
      onSubmit(){

      },
      //分页
      handleSizeChange(val) {
        console.log(`每页 ${val} 条`);
      },
      handleCurrentChange(val) {
        console.log(`当前页: ${val}`);
      },
      //查询tag标签
      getZeTag(tag){
        this.nowdata=[]
        ZetaEtag(tag).then(response=>{
          //请求成功
          if(response){
              this.nowdata.push(response)
          }
        }).catch(error=>{
          //接口数据错误时的返回
          console.log(error)
        })
      },
      //历史数据tag标签
      getZetTagHistroy(tag,limit,timestamp){
        ZetaEtagHistroy(tag,limit,timestamp).then(response=>{
          //请求成功
          if(response){
            this.tableData = response.trace
            this.total = response.trace.length
          }
        }).catch(error=>{
          //接口数据错误时的返回
          console.log(error)
        })
      },
      resetForm(){

      },
      locusSearch(zetagId,timestamp){
        this.dialogTableVisible=true
        this.getZetTagHistroy(zetagId,100,timestamp)
      },
      //dialog分页
      handleSizeChange1(val) {
         this.start1=1
          this.pagesize1=val
      },
      handleCurrentChange1(val) {
        this.start1=val
      },
  }
};
</script>
<style lang="scss" scoped>
.zetadevices{
    height:100%;
    width:100%;
    padding:20px;
    box-sizing: border-box;
    background:#fff;
    .zetacontent{
       display:flex;
        flex-wrap: wrap;
      .zetag{
        height:140px;
        width:350px;
        border:1px solid #000;
        display:flex;
        margin-right:10px;
        margin-bottom:10px;
        .zetagleft{
          img{
          height:138px;
          }
        }
       .zetagright{
          margin-left:5px;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          p{
            margin:5px 0;
            font-size:14px;
          }
        }
      }
    }
    .block{
      margin-top:20px;
    }
}
</style>
