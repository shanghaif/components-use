<template>
  <div id="meter_reading">
    <div class="menu">
      <Resource1
        @meterdetail="getRows"
      />
    </div>
    <div class="content">
      <el-form ref="form" :model="form">
        <el-form-item label="集中器地址">
          <el-input v-model="form.vcaddr_web"></el-input>
        </el-form-item>
        <el-form-item label="电能表地址">
          <el-input v-model="form.addr_web"></el-input>
        </el-form-item>
        <el-form-item label="任务模板">
          <el-select v-model="form.task_value" @change="handleTaskChange" placeholder="请选择任务模板">
            <el-option
              v-for="item in form.task"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="数据类型">
          <el-select
            v-model="form.data_type_value"
            placeholder="请选择数据类型"
            @change="handleDateChange"
          >
            <el-option
              v-for="item in form.data_type"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="抄表结果">
          <el-select v-model="form.res" placeholder="请选择">
          <el-option label="全部" value="all"></el-option>
          <el-option label="成功" value="success"></el-option>
          <el-option label="失败" value="fail"></el-option>
        </el-select>
        </el-form-item>
        <el-form-item label="采集时间">
          <el-date-picker
            v-model="form.day_time"
            type="daterange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            v-if="form.data_type_value=='05060101'"
            :picker-options="form.pickerDisabled"
          ></el-date-picker>
          <el-date-picker
            v-model="form.month_time"
            type="monthrange"
            range-separator="至"
            start-placeholder="开始月份"
            end-placeholder="结束月份"
            v-else-if="form.data_type_value=='0001FF01'"
            :picker-options="form.pickerDisabled"
          ></el-date-picker>
        </el-form-item>
 
        <el-form-item>
          <el-button type="primary" @click="query" size="mini">查询</el-button>
          <el-button type="primary" @click="reset" size="mini">重置</el-button>
        </el-form-item>
      </el-form>
      <el-table 
        v-loading="loading" 
        element-loading-text="拼命加载中" 
        :data="table" 
        height="650" 
        border 
        style="width: 100%">
        <el-table-column prop="freeze_time" label="冻结时间" width="150"></el-table-column>
        <el-table-column prop="addr_web" label="电能表地址" width="130"></el-table-column>
        <el-table-column prop="vcaddr_web" label="集中器地址" width="130"></el-table-column>
        <el-table-column prop="task" label="任务模板" width="100"></el-table-column>
        <el-table-column prop="data_type" label="数据类型" width="180"></el-table-column>
        <el-table-column prop="forward_power_total" label="正向有功电能总" width="120"></el-table-column>
        <el-table-column prop="forward_work_rate_1" label="正向有功费率1(尖)" width="120"></el-table-column>
        <el-table-column prop="forward_work_rate_2" label="正向有功费率2(峰)" width="120"></el-table-column>
        <el-table-column prop="forward_work_rate_3" label="正向有功费率3(平)" width="120"></el-table-column>
        <el-table-column prop="forward_work_rate_4" label="正向有功费率4(谷)" width="120"></el-table-column>
        <el-table-column prop="gather_time" label="采集时间" width="190"></el-table-column>
      </el-table>
      <PagingQuery
        :pager="pager"
        @setPager="getinformation"
        @query="setup"
        @now_drive="setup2"
        @alldrive="getdeive"
      />
    </div>
  </div>
</template>
 
<script>
import { getMeterDate, getMeterListDate } from "@/api/meterReading";
import Resource1 from "@/components/resource/resource";
import Parse from "parse";
import { utc2beijing } from "@/utils/index";
import PagingQuery from "@/components/Pagination";
import { gettables } from "@/api/login";
import { eventBus } from '@/api/eventBus';
export default {
  components: { Resource1,PagingQuery },
  data() {
    return {
      loading:true,
      pager: {
        count: 0,
        page: 1,
        rows: 25,
        name:"抄表结果展示",
        pages:[25,50,75],
        rest:0//至少还有几页
      },
      draw:1,
      data: [],
      vcaddr:'',
      objId:"",
      obj:{//对应字段
        frozendate:(value,line)=>{
          if(value=='header'){
            return ["冻结时间"]
          }else{
            line.push(this.dateFtt("yyyy-MM-dd",value));
          }
        },
        addr:"电能表地址",
        vcaddr:"集中器地址",
        task:"任务模板",
        datatype:"数据类型",
        data(value,line){
          // console.log(value,line)
          if(value=='header'){
            return ["正向有功电能总","正向有功费率1(尖)","正向有功费率1(峰)","正向有功费率1(平)","正向有功费率1(谷)"]
          }else{
            line.push(value.count);
            line.push(value.rate1);
            line.push(value.rate2);
            line.push(value.rate3);
            line.push(value.rate4);
            return line;
          }
        },
        date:(value,line)=>{
          if(value=='header'){
            return ["采集时间"]
          }else{
            line.push(this.dateFtt("yyyy-MM-dd hh:mm:ss",value));
          }
        }
      },
      // 表格加载
      form: {
        vcaddr_web: "", //集中器地址
        addr_web: "", //电能表地址
        task: [
          //任务模板
          { value: "05060101", label: "日冻结抄表任务" },
          { value: "0001FF01", label: "月冻结抄表任务" },
        ],
        task_value: "05060101",
        data_type: [
          //数据类型
          { value: "05060101", label: "历史日数据" },
          { value: "0001FF01", label: "历史月数据" },
        ],
        data_type_value: "05060101",
        day_time: [
          new Date(new Date().getTime()-86400000*3).toLocaleDateString() ,//开始时间
          new Date(new Date().getTime()).toLocaleDateString()//结束时间
        ], //日时间
        month_time: [
          new Date(new Date().getTime()-86400000*30).toLocaleDateString(), 
          new Date(new Date().getTime()).toLocaleDateString()
        ], //月时间
        res:"all",//抄表结果
        startTime:"",//开始时间
        endTime:"",//结束时间
        pickerDisabled:{
          disabledDate(time) {
            return time.getTime() > Date.now();//如果没有后面的-8.64e6就是不可以选择今天的
          }
        },
        // 导出条件,是否查询过
        deriveWhere:false
      },
      // 表格
      table: [],
      search_res:[],
      // 选中电表（后续有特殊处理，接口查询不一样）
      isMeter:false,
      freeze:"05060101",//数据冻结
    };
  },
  methods: {
    // 时间戳
    dateFtt(fmt,value){
      var date = new Date(value*1000);
      var o = {   
        "M+" : date.getMonth()+1,                 //月份   
        "d+" : date.getDate(),                    //日   
        "h+" : date.getHours(),                   //小时   
        "m+" : date.getMinutes(),                 //分   
        "s+" : date.getSeconds(),                 //秒   
        "q+" : Math.floor((date.getMonth()+3)/3), //季度   
        "S"  : date.getMilliseconds()             //毫秒   
      };   
      if(/(y+)/.test(fmt))   
        fmt=fmt.replace(RegExp.$1, (date.getFullYear()+"").substr(4 - RegExp.$1.length));   
      for(var k in o)   
        if(new RegExp("("+ k +")").test(fmt))   
      fmt = fmt.replace(RegExp.$1, (RegExp.$1.length==1) ? (o[k]) : (("00"+ o[k]).substr((""+ o[k]).length)));   
      return fmt;   
    },
    // 获取采集时间
    collTime(){
      let type=this.form.data_type_value;
      let start,end;
      // console.log(this.form.day_time);
      if (type==1){
          start=this.StartTime(this.form.day_time);
          end=this.EndTime(this.form.day_time);
      }else {
          start=this.StartTime(this.form.month_time);
          end=this.EndTime(this.form.month_time);
      }
      this.form.endTime=parseInt(end/1000);
      this.form.startTime=parseInt(start/1000);
      // console.log(this.form.endTime,this.form.startTime);
    },
    // 查询
    query() {
      this.collTime();
      if (!this.isMeter){
        this.pager.page=1;
      }
      if(this.form.addr_web!=''){
        this.isMeter=true
      }
      getMeterDate((this.pager.page-1)*this.pager.rows, this.pager.rows,this.form.vcaddr_web,this.form.addr_web,this.form.startTime, this.form.endTime+85399999,this.form.res,this.freeze).then(res => {
        this.search_res=res.results;
        // console.log(res);
        this.getForDate(res); 
        if (this.pager.page==1){
          this.incPage(res.rest);
        }
        this.pageLoading(res.rest);
        this.loading=false;
      });
    },
    // 获取开始时间
    StartTime(time) {
      let start = new Date(time[0]).getTime();
      return start;
    },
    // 获取结束时间
    EndTime(time) {
      let end = new Date(time[1]).getTime();
      return end;
    },
    // 重置
    reset() {
      this.form.vcaddr_web = "";
      this.form.addr_web = "";
      this.form.task_value = 1;
      this.form.data_type_value = 1;
      this.form.month_time = "";
      this.form.day_time = [
        new Date().toLocaleDateString(),
        new Date().toLocaleDateString()
      ];
      this.form.month_time = "";
      this.form.res="all"
    },
    // 数据和任务关联
    handleDateChange() {
      this.form.task_value = this.form.data_type_value;
      this.freeze=this.form.task_value;
    },
    handleTaskChange(){
      this.form.data_type_value = this.form.task_value;
      this.freeze=this.form.data_type_value;
    },
    // 获取资源树
    getTree() {
      var Department = Parse.Object.extend("Department");
      var department = new Parse.Query(Department);
      department.limit(10000);
      department.find().then(
        resultes => {
          this.data = [];
          resultes.map(items => {
            var obj = {};
            items.createtime = utc2beijing(items.attributes.createdAt);
            (obj.name = items.attributes.name),
            (obj.ParentId = items.attributes.ParentId);
            obj.objectId = items.id;
            obj.createtime = items.createtime;
            obj.icon = items.attributes.org_type;
            obj.is_show =items.attributes.leafnode;
            this.data.push(obj);
            if(items.attributes.name=='省电力公司'){
              this.objId=items.id;
            }
          });
          getMeterListDate(this.freeze,(this.pager.page-1)*this.pager.rows,this.pager.rows,this.objId,946659661, 7258093261,this.form.res).then(res => {
            // console.log(res);
            // 获取初始页码
            this.incPage(res.rest);
            this.getForDate(res);
            this.loading=false;
          });
        },
        error => {
          if (error.code == "209") {
            this.$message({
              type: "warning",
              message: "登陆权限过期，请重新登录"
            });
            this.$router.push({
              path: "/login"
            });
          }
        }
      );
    },
    // 获取树id
    getRows(row) {
      // 默认取所有信息
      // console.log(row);
      this.loading=true;
      this.objId=row.objectId;
      this.pager.page=1;
      this.collTime();
      this.form.addr_web="";
      this.form.vcaddr_web="";
      if (row.icon=="集中器"){
        this.form.vcaddr_web=row.name;
        this.form.addr_web="";
        if(this.form.addr_web==''){
             this.isMeter=false;
          }else{
             this.isMeter=true;
             this.query()
          }
      }else if (row.icon=="电表"){
        this.form.addr_web=row.name;
        this.form.vcaddr_web="";
        this.isMeter=true;
        this.query();
        return;
      }
      getMeterListDate(this.freeze,(this.pager.page-1)*this.pager.rows, this.pager.rows, this.objId,this.form.startTime, this.form.endTime+85399999,this.form.res).then(res => {
        this.incPage(res.rest);
        this.getForDate(res);
        this.pager.page=1;
        if (res.results.length==0){
          setTimeout(()=>{
            this.loading=false;
          },10000)
          return;
        }
        this.loading=false;
      });
    },
    // 循环每个字段添加
    getForDate(res){
      let r=res.results;
      // console.log(r);
      this.table=[];
      for (let i = 0; i < r.length; i++) {
        let obj = {};
        obj.addr_web = r[i].addr;
        obj.vcaddr_web = r[i].vcaddr;
        obj.data_type = r[i].datatype;
        obj.forward_power_total = r[i].data.count;
        obj.forward_work_rate_1 = r[i].data.rate1;
        obj.forward_work_rate_2 = r[i].data.rate2;
        obj.forward_work_rate_3 = r[i].data.rate3;
        obj.forward_work_rate_4 = r[i].data.rate4;
        obj.freeze_time = this.dateFtt("yyyy-MM-dd",r[i].frozendate);
        obj.gather_time = this.dateFtt("yyyy-MM-dd hh:mm:ss",r[i].date);
        obj.inversion_power_total = r[i].data.NotCount;
        obj.task_value = r[i].task;
        // 是否为空，是的话显示-
        obj.inversion_power_total = this.isNot(obj.inversion_power_total);
        obj.gather_time = this.isNot(obj.gather_time);
        obj.addr_web = this.isNot(obj.addr_web);
        obj.vcaddr_web = this.isNot(obj.vcaddr_web);
        obj.forward_power_total = this.isNot(obj.forward_power_total);
        obj.forward_work_rate_1 = this.isNot(obj.forward_work_rate_1);
        obj.forward_work_rate_2 = this.isNot(obj.forward_work_rate_2);
        obj.forward_work_rate_3 = this.isNot(obj.forward_work_rate_3);
        obj.forward_work_rate_4 = this.isNot(obj.forward_work_rate_4);
        obj.task = this.isNot(obj.task);
        this.table.push(obj);
      }
    },
    // 判断是否为空
    isNot(value) {
      if (value == undefined) {
        return "-";
      } else {
        return value;
      }
    },
    // 分页
    setup(item) {
      this.getinformation(item);
    },
    // 获取数据
    getinformation(item) {
      this.loading=true;
      if (this.objId!=""){
        if (this.isMeter){
          this.query();
        }else {
          this.collTime();
          getMeterListDate(this.freeze,(this.pager.page-1)*this.pager.rows, this.pager.rows, this.objId, this.form.startTime, this.form.endTime+85399999,this.form.res)
          .then(res => {
            // console.log(res)
            this.getForDate(res);
            this.pageLoading(res.rest);
            this.loading=false;
          }).catch(error => {
            console.log(error);
          });
        }
      } 
    },
    setup2(item) {
      this.get_now(item);
    },
    // 导出当前
    get_now(data){
      this.collTime();
       getMeterListDate(this.freeze,(this.pager.page-1)*this.pager.rows,this.pager.rows,this.objId,this.form.startTime, this.form.endTime,this.form.res)
        .then(res => {
          if (this.search_res){
            eventBus.$emit('drive',{json:this.search_res,obj:this.obj,name:this.pager.name});
          }else {
            eventBus.$emit('drive',{json:res.results,obj:this.obj,name:this.pager.name});
          }
        })
        .catch(error => {
          console.log(error);
        });
    },
    // 分页导出
    getdeive(data){
      this.collTime();
      getMeterListDate(this.freeze,data.start,this.pager.rows*(data.end-data.start+1),this.objId,this.form.startTime, this.form.endTime,this.form.res)
        .then(res => {
          // console.log(res);
          if (this.search_res){
            eventBus.$emit('drive',{json:this.search_res,obj:this.obj,name:this.pager.name});
          }else {
            eventBus.$emit('drive',{json:res.results,obj:this.obj,name:this.pager.name});
          }
        })
    },
    // 分页懒加载
    pageLoading(rest){
      // 判断当前总数据/当前每页显示数量===当前页，如果一样代表最后一页，查看是否还有后续页数
      // console.log(this.pager.count,this.pager.rows,this.pager.page);
      if (this.pager.count/this.pager.rows===this.pager.page){
        this.pager.rest+=rest;
        this.pager.count=this.pager.rest*this.pager.rows;
      } 
    },
    // 初始页码
    incPage(rest){
      this.pager.rest=rest;
      this.pager.count=this.pager.rows*this.pager.rest;
    },
    //隐藏总页数
    totalHide(){
      let total=document.getElementsByClassName("el-pagination__total")[0];
      total.style.display="none";
    }
  },
  mounted() {
    this.totalHide();
    this.getTree();
    this.getinformation();
  }
};
</script>
 
<style lang="scss" scoped>
#meter_reading {
  background: #fff;
  display: flex;
  justify-content: space-between;
  .resource1 {
    width:360px;
    flex-shrink:0;
    overflow:scroll;
    height: 800px;
    padding-top: 10px;
  }
  .content {
    width: 80%;
    padding:20px 0 0 20px;
    /deep/ .el-form {
      display: flex;
      justify-content: space-between;
      flex-wrap: wrap;
      .el-form-item {
        display: flex;
        flex-wrap: wrap;
        width: 20%;
        &:nth-child(6) {
          width: 40%;
        }
        /deep/ input {
          height: 26px;
          width: 150px;
          border-radius:0;
          line-height: 26px;
        }
        /deep/ .el-date-editor {
          width: 400px;
          height: 26px;
          line-height: 26px;
          .el-range-input {
            margin-left: 2%;
          }
          i,
          span {
            line-height: 20px;
          }
          input {
            height: 24px;
          }
        }
      }
    }
    /deep/ .el-table {
      th,
      td {
        text-align: center;
        height: 35px;
        font-size: 12px;
        padding: 0;
      }
    }
  }
}
</style>