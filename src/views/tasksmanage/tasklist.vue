<template>
  <div class="tasklist">
    <div class="top">
      <div class="left">
        <el-button type="primary" @click="dialogVisible = true">配置任务</el-button>
        <el-button type="primary" style="margin-left:30px" @click="deletetask">删 除</el-button>
      </div>
      <div class="right">
        <el-input
          type="text"
          style="width:200px;margin-left:30px;"
          placeholder="请输入任务名称"
          v-model="valueforsearch"
        ></el-input>
        <el-button type="primary" @click="search">搜 索</el-button>
      </div>
    </div>
    <div class="center">
      <el-table
        ref="multipleTable"
        :data="tableData3"
        tooltip-effect="dark"
        style="width: 100%"
        @selection-change="handleSelectionChange"
        v-loading="loading"
      >
        <el-table-column type="selection" width="55" ></el-table-column>
        <el-table-column label="任务名称" >
          <template slot-scope="scope">
            <span>{{scope.row.attributes.name}}</span>
          </template>
        </el-table-column>
        
        <el-table-column  label="采集开始时间">
          <template slot-scope="scope">
          <span>{{timestampToTime(scope.row.attributes.args.starttime)}}</span>
          </template>
        </el-table-column>
        <el-table-column label="数据项名称">
          <template slot-scope="scope">
            <span>{{scope.row.attributes.args.dis.join(',')}}</span>
          </template>
        </el-table-column>
        <el-table-column  label="周期单位">
          <template slot-scope="scope">
          <span>{{scope.row.attributes.args.freq}}</span>
          <span v-if="scope.row.attributes.args.unit=='day'">天</span>
          <span v-else-if="scope.row.attributes.args.unit=='minute'">分</span>
          <span v-else-if="scope.row.attributes.args.unit=='hour'">时</span>
          </template>
        </el-table-column>
        <el-table-column  label="下发通道">
          <template slot-scope="scope">
            <span v-if="scope.row.attributes.args.downchannel=='1'">虚拟集中器</span>
            <span v-else>物理集中器</span>
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
             <el-button size="mini" type="primary" @click="editcrond(scope.row.id)">编 辑</el-button>
            <el-button size="mini" type="primary" @click="Meterdetail(scope.row)">详 情</el-button>
          </template>
        </el-table-column>
      </el-table>
      <!--分页-->
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
    <!--弹窗-->
    <el-dialog title="配置任务" :visible.sync="dialogVisible" width="50%" :before-close="handleClose" top="5vh">
      <div class="dialog" style="display:flex;flex-wrap:wrap">
        <div class="children">
          <label for>任务名称：</label>
          <el-input type="text" style="width:200px" v-model="name" placeholder="请输入任务名称"></el-input>
        </div>
          <div class="children">
          <label for>终端类型：</label>
          <el-select v-model="ftype" placeholder="请选择">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </div>
        <div class="children">
          <label for>采集开始时间：</label>
          <el-date-picker
            v-model="starttime"
            type="datetime"
            placeholder="选择日期时间"
            @change="testdata"
            :picker-options="pickerOptionsStart"
          ></el-date-picker>
        </div>
         <div class="children">
          <label for>终端逻辑地址：</label>
          <el-input
            type="text"
            style="width:200px"
            v-model="meteraddress"
            placeholder="A终端逻辑地址,B终端逻辑地址"
          ></el-input>
          <p style="color:black;margin:5px 0 0 100px;position:absolute">(all代表全部)(注意:逗号为英文逗号)</p>
        </div>
         <div class="children">
          <label for>采集结束时间：</label>
          <el-date-picker
            v-model="endtime"
            type="datetime"
            placeholder="选择日期时间"
            @change="enddata"
            :picker-options="pickerOptionsEnd"
          ></el-date-picker>
        </div>
         <div class="children">
           <label for>冻结日期：</label>
          <el-date-picker
            v-model="frozendate"
            type="date"
            placeholder="当天"
            value-format="timestamp"
          ></el-date-picker>
        </div>
      
        <div class="starttime">
          <label for>采样间隔时间：</label>
          <el-select v-model="unit" placeholder="请选择" @change="selectchange">
            <el-option
              v-for="item in date"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
          <el-select v-model="freq" placeholder="请选择">
            <el-option
              v-for="item in spacing"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </div>
         <div class="children">
           <label for>上报通道：</label>
           <el-select v-model="upchannel" placeholder="上报通道可多选" multiple>
             <el-option label="主站" :value="1"></el-option>
             <el-option label="postgres" :value="2"></el-option>
             <el-option label="tdengine" :value="3"></el-option>
             <!-- <el-option label="2" value="2"></el-option>
             <el-option label="3" value="3"></el-option> -->
          </el-select>
        </div> 
       
        <div class="notchildren" >
          <label for class="notfloat">采集策略：</label>
          <div v-for="(item,index) in downchannel" :key="index" style="margin-left:50px;margin-bottom:10px;">
            <label for>{{'采集轮次'+(index+1)}}</label>
           
          <el-select v-model="item.type" placeholder="请选择通道类型">
             <el-option
              v-for="item in channel"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
          <el-input v-model.number="item.interval" type="number" :min='1' style="width:100px;" placeholder="本轮时长"></el-input>
          <el-select v-model="item.unit" style="width:100px" placeholder="选择单位">
            <el-option label="时" value="hours"></el-option>
            <el-option label="分" value="minutes"></el-option>
            <el-option label="秒" value="seconds"></el-option>
          </el-select>
          <el-link
            type="primary"
            @click.prevent="removeDomain(item)"
            :underline="false"
            icon="el-icon-minus"
            style="margin-left:5px;"
          >删除</el-link>
          </div>
           
        </div>
        <div class="children">
          <el-link
            @click="addDownChannel"
            icon="el-icon-plus"
            type="primary"
            :underline="false"
            style="margin-bottom:20px"
          >添加采集策略</el-link>
        </div>
         <div class="di" style="width:100%;">
        <label for>数据项标识：</label>
        <el-transfer v-model="diselect" :data="data" :titles="['数据项标识', '数据项标识']" :button-texts="['删除', '添加']"></el-transfer>
      </div>
      </div>
     
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false" style="float:left">关 闭</el-button>
        <el-button @click="convartion" style="float:right" type="primary">保 存</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
import {
  Diselect,
  Alltasks,
  Addtasks,
  Removetask,
  Taskdetail
} from "@/api/historytask";
import { timestampToTime, timetounix } from "@/api/login";
import $ from 'jquery'
import Parse from 'parse'
 var taskid = Math.floor(Math.random()*128+1)
export default {
  data() {
    const generateData = _ => {
      const data = [];
      Diselect().then(response => {
        response.data.map(item => {
          data.push({
            key: item.di,
            label: `${item.di + "--" + item.name}`
          });
        });
      });
      return data;
    };
    return {
      node: null,
      total: 0,
      start: 0,
      length: 10,
      draw: 1,
      tableData3: [],
      multipleSelection: [],
      data: generateData(),
      diselect: [],
      dialogVisible: false,
      valueforsearch: "",
      pickerOptionsStart: {
           disabledDate: time => {
             let endDateVal = this.endtime;
             if (endDateVal) {
                return time.getTime() > new Date(endDateVal).getTime() && time.getTime() > Date.now();
             }else{
               return time.getTime() <Date.now()- 8.64e7; 
             }
           }
        },
      pickerOptionsEnd: {
           disabledDate: time => {
             let beginDateVal = this.starttime;
             if (beginDateVal) {
               return (time.getTime()<new Date(beginDateVal).getTime()-1*24*60*60*1000
             );
           }else{
               return time.getTime() <Date.now()- 8.64e7; 
             }
        }
    },
      options: [
        {
          value: "vcaddr",
          label: "集中器"
        },
        {
          value: "meter",
          label: "电表"
        }
      ],
      date: [
        {
          value: "day",
          label: "日"
        },
        {
          value: "month",
          label: "月"
        },
        {
          value: "hour",
          label: "时"
        },
        {
          value: "minute",
          label: "分"
        }
      ],
      spacing: [],
      sendup: [
        {
          value: 0,
          label: "物理通道"
        },
        {
          value: 1,
          label: "虚拟通道"
        }
      ],
      senddown: [
        {
          value: 0,
          label: "物理通道"
        },
        {
          value: 1,
          label: "虚拟通道"
        }
      ],
      name: "",
      frozendate: "",
      downchannel:[
        {
          type:'',
          interval:'',
          unit:'seconds',
        }
      ],
     
      channel:[
        {
          label:'物理集中器',
          value:1
        },
        {
          label:'GPRS',
          value:2
        },
         {
          label:'LoRa',
          value:3
        },
         {
          label:'NB',
          value:4
        }
      ],
      channeltype:'',
      starttime: "",
      meteraddress: "all",
      freq: "",
      unit: "",
      ftype: "vcaddr",
      today:'today',
      idselete: [],
      lunci:'',
      endtime:'',
       upchannel:'',
      loading:true,
      taskobjectid:''
    };
  },
  mounted() {
    this.search();
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
    //删除采集轮次
    removeDomain(item) {
      var index = this.downchannel.indexOf(item);
      if (index !== -1) {
        this.downchannel.splice(index, 1);
      }
    },
    //增加采集轮次
    addDownChannel(){
      this.downchannel.push({
          type:'',
          interval:'',
          unit:'seconds'
        })
    },
    handleClose() {
      this.dialogVisible = false;
    },
    search() {
      this.loading = true
      var Crond = Parse.Object.extend('Crond')
      var querycround = new Parse.Query(Crond)
      
      if(this.valueforsearch!=''){
        querycround.equalTo('name',this.valueforsearch)
      }
      querycround.equalTo('type',4)
     querycround.ascending('-updatedAt')
      querycround.skip(this.start)
      querycround.limit(this.length)
      querycround.count().then(count=>{
        if(count){
          this.total = count
        }
         
         querycround.find().then(res=>{
          if(res){
            this.tableData3 = res
            this.loading=false
          }
        })
      },error=>{
            if (error.code == "209") {
                    this.$message({
                      type: "warning",
                      message: "登陆权限过期，请重新登录"
                    });
                    this.$router.push({
                      path: "/login"
                    });
                  } else if (error.code == 119) {
                    this.$message({
                      type: "error",
                      message: "没有操作权限"
                    });
                  }
      })
    },
    //编辑操作
    editcrond(id){
       var Crond = Parse.Object.extend('Crond')
        var querycround = new Parse.Query(Crond)
        querycround.get(id).then(response=>{
          this.dialogVisible = true
          this.name = response.attributes.name
          this.unit = response.attributes.args.unit
          this.type = response.attributes.args.pns
          this.freq = response.attributes.args.freq
          this.starttime = response.attributes.args.starttime*1000
          this.endtime = response.attributes.args.endtime*1000
          this.downchannel = response.attributes.args.downchannel
          this.diselect = response.attributes.args.dis
          this.upchannel = response.attributes.args.upchannel
          this.frozendate = response.attributes.args.frozendate*1000
          this.taskobjectid = response.id
          taskid=response.attributes.tid
          this.selectchange()
        })
    },
    selectchange() {
      if (this.unit == "month" || this.unit == "day") {
        this.spacing = [
          {
            value: "1",
            label: "1"
          }
        ];
      } else if (this.unit == "hour") {
        this.spacing = [
          { value: "1", label: "1" },
          { value: "2", label: "2" },
          { value: "3", label: "3" },
          { value: "4", label: "4" },
          { value: "6", label: "6" },
          { value: "8", label: "8" },
          { value: "12", label: "12" }
        ];
      } else {
        this.spacing = [
          { value: "10", label: "10" },
          { value: "20", label: "20" },
          { value: "30", label: "30" },
          { value: "1", label: "1" }
        ];
      }
    },
    handleSelectionChange(val) {
      this.idselete = [];
      this.multipleSelection = val;
    },
    handleSizeChange(val) {
      this.length = val;
      this.search();
    },
    handleCurrentChange(val) {
      this.start = (val - 1) * this.length;
      this.search();
    },
    enddata(){
      if(this.endtime<=this.starttime){
        this.$message.warning('采集结束时间要小于开始时间')
        this.endtime=''
      }
      if(this.endtime < Date.now()-2000){
        this.$message.warning('采集结束时间要大于当前时间')
        this.endtime=''
      }
    },
    testdata(){
      if(this.endtime <= this.starttime &&this.endtime!='' &&this.endtime!=null){
        this.$message.warning('采集结束时间要小于开始时间')
        this.starttime=''
      }
      if(this.starttime < Date.now()-2000){
        this.$message.warning('采集开始时间要大于当前时间')
        this.starttime=''
      }
    },
    Meterdetail(row) {
      this.$router.push({
        path: "/tasksmanage/schedule",
        query: { id: row.attributes.tid }
      });
    },
    convartion() {
      var meter = [];
      var vcaddr = this.meteraddress.split(",");
      if (this.ftype == "vcaddr") {
        vcaddr.map(vconitem => {
          meter.push({ vcaddr: vconitem, dis: this.diselect });
        });
      } else {
        if (this.meteraddress == "all") {
          meter.push({ vcaddr: "all", dis: this.diselect });
        } else {
          meter.push({
            vcaddr: "all",
            addr: JSON.parse(vcaddr),
            dis: this.diselect
          });
        }
      }
      var arr=[]
       var unit=''
      if(this.unit=='day'){
         unit=2
      }else if(this.unit=='hour'){
        unit=1
      }else if(this.unit=='minute'){
        unit=0
      }else{
        unit=''
      }
      this.downchannel.map(items=>{
        arr.push([items.type,items.interval])
      })
      var Crond = Parse.Object.extend('Crond')
      var crond = new Crond()
      var querycround = new Parse.Query(Crond)
      if(this.taskobjectid!=''){
        crond.id = this.taskobjectid
      }
       if(this.frozendate!=''){
         crond.set('task',{
        "di":this.diselect,
        "chs": arr,
        'res':this.upchannel,
        "pns": this.meteraddress,
        "fdate":this.frozendate/1000
      })
      }else{
         crond.set('task',{
        "di":this.diselect,
        "chs": arr,
        "pns": this.meteraddress,
        'res':this.upchannel,
    })
      }
      crond.set('args',{
      "frozendate":this.frozendate/1000,
      "chs":arr,
      "freq":  Number(this.freq),
      "pns": this.meteraddress,
      "unit":  this.unit,
      "cycle": this.unit,
      "dis":this.diselect,
      "upchannel":this.upchannel,
      "downchannel":this.downchannel,
      "endtime":  timetounix(this.endtime),
      "starttime":  timetounix(this.starttime),
      })
      crond.set('active',1)
      crond.set('type',4)
      crond.set('name',this.name)
      crond.set('crond',{
        "end_time":timetounix(this.endtime),
        "freq":Number(this.freq) ,
        "unit": unit,
        "start_time": timetounix(this.starttime)
      })
      crond.set('tid',taskid)
     crond.set('typedesc','周期任务')
     
    //查询任务id是否重复
    if(this.taskobjectid==''){
      querycround.equalTo('tid',taskid)
      querycround.find().then(response=>{
      // response.map(items=>{
        if(response.length!=0){
           this.$message({
            message: "任务id重复",
            type: "error"
          });
          return
        }else{
           crond.save().then(resultes=>{
            if(resultes){
                this.$message({
                message: "添加成功",
                type: "success"
              });
              this.dialogVisible = false;
              this.name=''
              this.frozendate=''
              this.starttime=''
              this.endtime=''
              this.freq=''
              this.unit=''
              this.downchannel=[
                {
                  type:'',
                  interval:'',
                  unit:'seconds'
                }
              ]
            }
            this.frozendate="",
            this.diselect=[]
            this.upchannel=[]
            this.search()
          },error=>{
            if (error.code == "209") {
                    this.$message({
                      type: "warning",
                      message: "登陆权限过期，请重新登录"
                    });
                    this.$router.push({
                      path: "/login"
                    });
                  } else if (error.code == 119) {
                    this.$message({
                      type: "error",
                      message: "没有操作权限"
                    });
                  }
          })
        }
      // })
    })
    }else{
      crond.save().then(resultes=>{
            if(resultes){
                this.$message({
                message: "编辑成功",
                type: "success"
              });
              this.dialogVisible = false;
              this.name=''
              this.frozendate=''
              this.starttime=''
              this.endtime=''
              this.freq=''
              this.unit=''
              taskid=Math.floor(Math.random()*128+1)
              this.taskobjectid = ''
              this.downchannel=[
                {
                  type:'',
                  interval:'',
                  unit:'seconds'
                }
              ]
            }
            this.diselect=[]
            this.upchannel=[]
            this.search()
          },error=>{
            if (error.code == "209") {
                    this.$message({
                      type: "warning",
                      message: "登陆权限过期，请重新登录"
                    });
                    this.$router.push({
                      path: "/login"
                    });
                  } else if (error.code == 119) {
                    this.$message({
                      type: "error",
                      message: "没有操作权限"
                    });
                  }
          })
    }
    },
    getfrozen(){
     
    },
    selectTime(val){
      if(val=='other'){
        this.getfrozen()
      }
    },
    deletetask() {
      var arr=[]
      if(this.multipleSelection.length!=0){
        this.multipleSelection.map(items=>{
         arr.push(
           new Promise((resolve,reject)=>{
           var Crond = Parse.Object.extend('Crond')
          var crond = new Crond()
          crond.id = items.id
          return crond.destroy().then(resultes=>{
            resolve(resultes)

        },error=>{
          
          reject(error.message)
        }
        )
        })
      )
        Promise.all(arr).then((data) => {
              this.$message({
              message: "删除成功",
              type: "success"
            });
            if(data.length==this.multipleSelection.length){
                this.search()
            }
          
          }).catch((error)=>{
            this.$message({
              message: error,
              type: "error"
            });
          })
      })
      }else{
        this.$message.warning('请勾选要删除的任务')
      }
    }  
  }
};
</script>
<style scoped>
.tasklist {
  min-height: 100%;
  background: white;
  padding: 20px;
  box-sizing: border-box;
}
.top {
  width: 100%;
  height: 50px;
}
.left {
  width: 50%;
  float: left;
}
.right {
  width: 50%;
  float: right;
  text-align: right;
}
.center {
  margin-top: 30px;
}
</style>
<style>
.tasklist .el-dialog__footer {
  padding-bottom: 50px;
}
.tasklist .el-dialog{
  bottom:40px;
}
.tasklist .dialog .children,
.dialog .starttime {
  margin-top: 20px;
  width: 50%;
}
.tasklist .dialog .notchildren
{

  margin-top: 20px;
  width: 100%;
}
.tasklist .dialog .children label,
.tasklist .dialog .notchildren label:not(.notfloat),
.tasklist .dialog .starttime label {
 
  margin-top: 10px;
  width:120px;
  text-align:right;
  float:left;
}
.tasklist .children .el-input--suffix {
  width: 200px;
}
.tasklist .starttime .el-input--suffix {
  width: 100px;
}
.tasklist .el-transfer {
  display: flex;
  align-items: center;
  justify-content: center;
}
.tasklist .el-transfer-panel {
  width: 300px;
}
.tasklist .el-transfer__button:first-child {
  position: relative;
  top: 50px;
}
.tasklist .el-transfer__button:nth-child(2) {
  position: relative;
  top: -50px;
}
.tasklist .el-picker-panel__sidebar+.el-picker-panel__body{
  visibility: hidden;
}
</style>

