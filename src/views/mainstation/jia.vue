<template>
  <div class="mainstations">
      <!--第一个tree树-->
      <div style="width:322px;" class="firstcard">
        <el-tabs type="border-card" tab-position="left" v-model="activeName" @tab-click="handleClick">
          <el-tab-pane label="收藏" name="first"></el-tab-pane>
          <el-tab-pane label="主网" name="second">
            <div class="zwheader" style="height:100px;">
              <el-input placeholder="请输入内容" v-model="searchvalue" style="width:200px">
                <el-button slot="append" icon="el-icon-search"></el-button>
              </el-input>
              <div style="margin-top:20px;">
                <el-button size="small" type="primary">刷新</el-button>
                <el-button size="small" type="primary">高级查询</el-button>
                <el-button size="small" type="primary">重置</el-button>
              </div>
            </div>
            <el-tree
              :data="treeData"
              :props="defaultProps"
              :expand-on-click-node="false"
              :highlight-current="true"
              default-expand-all
              @node-click="handleNodeClick"
              style="margin-top:20px;"
            />
          </el-tab-pane>
          <!--用户试图-->
          <el-tab-pane label="配网" name="third">
            <el-form
              ref="form"
              :model="userForm"
              label-width="100px"
              style="border-bottom:1px solid #cccccc"
            >
              <el-form-item label="用户类型：">
                <el-select v-model="userForm.usertype" placeholder="请选择用户类型" style="width:176px">
                  <el-option label="公变" value="shanghai"></el-option>
                  <el-option label="专变" value="beijing"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="查询类型：">
                <el-select v-model="userForm.searchtype" placeholder="请选择查询类型" style="width:176px">
                  <el-option label="用户" value="shanghai"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="户号：">
                <el-input type="text" v-model="userForm.userhh" style="width:176px"></el-input>
              </el-form-item>
              <el-form-item label="户名：">
                <el-input type="text" v-model="userForm.username" style="width:176px"></el-input>
              </el-form-item>
              <el-form-item label="终端局号：">
                <el-input type="text" v-model="userForm.zdjh" style="width:176px"></el-input>
              </el-form-item>
              <el-form-item label="逻辑地址：">
                <el-input type="number" v-model="userForm.ljdz" style="width:176px"></el-input>
              </el-form-item>
              <el-form-item size="large" name="third">
                <el-button type="primary" size="small">查询</el-button>
                <el-button type="primary" size="small">高级</el-button>
              </el-form-item>
            </el-form>
          </el-tab-pane>
          <!--终端试图-->
          <el-tab-pane label="行业" name="fourth">定时任务补偿</el-tab-pane>
          <el-tab-pane label="群组" name="five">定时任务补偿</el-tab-pane>
          <el-tab-pane label="省遥测" name="six">定时任务补偿</el-tab-pane>
        </el-tabs>
      </div>
      <!--第三个返回数据展示-->
      <div class="secondcard" style="min-height:875px;border-left:2px solid #156FAE;background:#f6fbff" v-if="activeName=='second'">
        <div style="width:100%;height:auto;padding:20px;box-sizing:border-box;">
          <!--中间白色部分-->
          <div class="blockcontent">
            <el-form
              :inline="true"
              :model="formInline"
              class="demo-form-inline"
              label-width="120px"
            >
              <el-form-item label="操作类型:">
                <el-select placeholder="操作类型" v-model="formInline.operation" @change="firstchange" style="width:150px">
                  <el-option v-for="(item,index) in operatetype" :label="item.attributes.webtype" :key="index" :value="item.id"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="终端逻辑地址:">
                <el-input placeholder="终端逻辑地址" v-model="formInline.vcaddr" style="width:150px"></el-input>
              </el-form-item>
               <el-form-item label="规约名称:">
                <el-select placeholder="规约类型" v-model="formInline.protocol" style="width:150px">
                  <el-option label="南网上行通信规约" value="30"></el-option>
                </el-select>
              </el-form-item>
               <el-form-item label="数据类型:">
                <el-select placeholder="数据类型" v-model="formInline.datatype" @change="dataselect" style="width:150px">
                  <el-option v-for="(item,index) in datatype" :label="item.label" :key="index" :value="item.key"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="通道类型:">
                <el-select placeholder="数据类型" v-model="formInline.route" style="width:150px">
                  <el-option label="无线" value="tcp"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="开始测量点号:">
                <el-input
                  placeholder="开始测量点号"
                  type="number"
                  v-model="formInline.start"
                  :min="0"
                  :max="2048"
                  style="width:150px"
                ></el-input>
              </el-form-item>
              <el-form-item label="结束测量点号:">
                <el-input
                  placeholder="结束测量点号"
                  type="number"
                  v-model="formInline.end"
                  :min="0"
                  :max="2048"
                  style="width:150px"
                ></el-input>
              </el-form-item>
             <el-form-item label="开始时间:">
                <el-date-picker
                  v-model="formInline.starttime"
                  type="datetime"
                  placeholder="选择开始时间"
                  value-format="timestamp"
                  :disabled="isSelecttime"
                  style="width:150px"
                ></el-date-picker>
              </el-form-item>
              <el-form-item label="结束时间:">
                <el-date-picker
                  v-model="formInline.endtime"
                  type="datetime"
                  placeholder="选择结束时间"
                  value-format="timestamp"
                  :disabled="isSelecttime"
                  style="width:150px"
                ></el-date-picker>
              </el-form-item>
            </el-form>
          </div>
          <div class="blockfooter">
            <el-button type="primary" @click="getValue">召测</el-button>
            <el-button type="primary">重置</el-button>
          </div>
          <div style="height:8px;width:100%;background:#ffffff"></div>
          <div class="blockall" style="text-align:center;height:auto">
            <el-transfer
              style="text-align: left; display: inline-block;margin-top:20px"
              v-model="value"
              :render-content="renderFunc"
              :titles="['数据标识DI', '选定查询数据项']"
              :button-texts="['删除', '添加']"
              :format="{
                        noChecked: '${total}',
                        hasChecked: '${checked}/${total}'
                    }"
              @change="handleChange"
              :data="data1"
            ></el-transfer>
          </div>
        </div>
      </div>
    <el-dialog
      title="召测数据"
      :visible.sync="dialogTableVisible"
      :close-on-click-modal="false"
      :before-close="handleClose"
      width="82%"
    >
      <div style="color:green">召测中...</div>
      <el-table
        :data="gridData1.slice((currentPage-1)*pageSize,currentPage*pageSize)"
        style="width:100%;margin-top:10px;"
        height="400"
      >
        <el-table-column label="序号" type="index" width="50" align="center"></el-table-column>
        <el-table-column property="vcaddr" label="终端逻辑地址" width="120" align="center"></el-table-column>
        <el-table-column property="pn" label="测量点号" width="100" align="center"></el-table-column>
        <el-table-column property="meteraddr" label="电表名称" align="center"></el-table-column>
        <el-table-column property="diname" label="数据项标识" width="200" align="center">
        </el-table-column>
        <el-table-column property="value" label="数据" align="center"></el-table-column>
        <el-table-column property="time" label="冻结日期" align="center" show-overflow-tooltip></el-table-column>
        <el-table-column property="ts" label="时间" width="200" align="center">
          <!-- <template slot-scope="scope">
          <span>{{ timestampToTime(scope.row.ts)}}</span>
          </template> -->
        </el-table-column>
        <el-table-column  label="状态" align="center">
          <template slot-scope="scope">
            <span style="color:green" v-if="scope.row.status==1">完成</span>
            <span style="color:green" v-else-if="scope.row.status==0">召测中</span>
            <span style="color:red" v-else>超时</span>
          </template>
        </el-table-column>
      </el-table>
      <div class="block" style="margin-top:15px;">
        <el-pagination
          align="center"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="currentPage"
          :page-sizes="[1,5,10,20]"
          :page-size="pageSize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="gridData1.length"
        ></el-pagination>
      </div>
    </el-dialog>
  </div>
</template>
<style>
.transfer-footer {
  margin-left: 20px;
  padding: 6px 5px;
}
</style>
<script>
import Parse from "parse";
import { Mainstationvalue } from "@/api/mainstation";
import Mainstation from '@/components/mainstation';
import {
  Websocket,
  sendInfo,
  TOPIC_EMPTY,
  MSG_EMPTY,
  DISCONNECT_MSG,
  didata
} from "@/utils/wxscoket.js";

export default {
  data() {
    return {
      operatetype:[],
      isSelecttime:true,
      isCollapse:true,
      data1: [],
      value: [],
      renderFunc(h, option) {
        return <span>{option.label}</span>;
      },
      currentPage: 1, // 当前页码
      total: 20, // 总条数
      pageSize: 10, // 每页的数据条数
      activeName: "second",
      formInline: {
        protocol: "30",
        user: "",
        vcaddr: "",
        datatype:"",
        operation: "",
        start: "1",
        end: "1",
        jiange: "",
        starttime:"",
        endtime: "",
        route: "tcp"
      },
      operation:'',
      datatype:[],
      dialogTableVisible: false,
      radio: 3,
      data: [],
      defaultProps: {
        children: "children",
        label: "name"
      },
      tableData1: [],
      searchvalue: "",
      departmentid: "",
      userForm: {
        usertype: "",
        searchtype: "",
        userhh: "",
        username: "",
        zdjh: "",
        ljdz: ""
      },
      selectdata: [],
      session: "",
      gridData1:[]
    };
  },
  computed: {
    treeData() {
      let cloneData = JSON.parse(JSON.stringify(this.data)); // 对源数据深度克隆
      return cloneData.filter(father => {
        let branchArr = cloneData.filter(
          child => father.objectId == child.ParentId
        ); //返回每一项的子级数组
        branchArr.length > 0 ? (father.children = branchArr) : ""; //如果存在子级，则给父级添加一个children属性，并赋值
        return father.ParentId == 0; //返回第一层
      });
    },
  },
 updated() {
   this.gridData1=Websocket.originrecivedata;
 },
  mounted() {
    this.getMainstation();

    this.getmess();
    this.getOperate()
  },
  methods: {
    getOperate(){
      var Mainstation = Parse.Object.extend('MainStationIndex')
      var mainstation = new Parse.Query(Mainstation)
      mainstation.startsWith('name','C.')
      mainstation.ascending('name')
      mainstation.find().then(resultes=>{
        this.operatetype = resultes
      })
    },
    handleClick(){
      
    },
    handleClose(){
      this.dialogTableVisible = false
    },
    firstchange(val){
      this.formInline.datatype=''
       this.datatype=[]
       var Mainstation = Parse.Object.extend('MainStationIndex')
       var mainstation = new Parse.Query(Mainstation)
        mainstation.equalTo('objectId',val)
        mainstation.find().then(resultes=>{
          resultes.map(items=>{
            items.attributes.leafs.map(child=>{
              var obj={
                label:child,
                modelindex:items.attributes.sendtype,
                key:child
              }
              this.datatype.push(obj)
            })
            console.log(this.datatype)
          })
          // this.datatype = resultes
        })
    },
    getValue() {
      
      Websocket.originrecivedata=[]
      var session = 'F'+Math.ceil(Math.random()*100000)
      var info = {
        topic: "vmsc/send/" +session,
        qos: 0
      };
      Websocket.subscribe(info, function(res) {
        if (res.result) {
          console.log(info)
          console.log("订阅成功");
        }
      });
      Mainstationvalue(
        this.formInline.vcaddr,
        session,
        this.formInline.operation,
        this.operation,
        this.formInline.start,
        this.formInline.end,
        Math.ceil(this.formInline.starttime / 1000),
        Math.ceil(this.formInline.endtime / 1000),
        this.formInline.route,
        this.formInline.protocol,
        this.selectdata
      ).then(resultes => {
        this.dialogTableVisible = true;
      }).catch(error=>{
        this.$message({
          type: "error",
          message: "下发失败"
        })
      });
      
    },
    handleChange(value) {
      this.selectdata = value;
    },
    handleNodeClick(row) {
      this.formInline.vcaddr = row.webName;
    },
    handleSizeChange(val) {
      // console.log(`每页 ${val} 条`);
      this.currentPage = 1;
      this.pageSize = val;
    },
    handleCurrentChange(val) {
      // console.log(`当前页: ${val}`);
      this.currentPage = val;
    },
    getMainstation() {
      this.data = [];
      this.session = Parse.User.current().attributes.sessionToken;
      var Department = Parse.Object.extend("Department");
      var department = new Parse.Query(Department);
      department.find().then(
        resultes => {
          resultes.map(items => {
            var obj = {};
            items.createtime = new Date(
              items.attributes.createdAt
            ).toLocaleDateString();
            (obj.name = items.attributes.name),
              (obj.ParentId = items.attributes.ParentId);
            obj.objectId = items.id;
            obj.level = items.attributes.level;
            obj.createtime = items.createtime;
            obj.webName = items.attributes.webName
            this.data.push(obj);
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
    getmess() {
      // Websocket.cInfo.host='ci.iotn2n.com'
      Websocket.cInfo.host = location.hostname;
      Websocket.newClient();
      Websocket.connect();
    },
    dataselect(val) {
      this.value=[]
      this.data1=[]
      this.datatype.map(items=>{
        if(val==items.label){
          this.operation = items.modelindex
        }
      })
       var DataItem = Parse.Object.extend('DataItem')
          var dataitem = new Parse.Query(DataItem)
          dataitem.equalTo('itemType',this.formInline.operation)
          dataitem.equalTo('leafname',val)
          dataitem.limit(1000)
          dataitem.ascending('itemCode')
          dataitem.find().then(res=>{
            res.map(items=>{
              var obj={
                "label": items.attributes.itemName,
                "key": items.attributes.itemCode
              }
              this.data1.push(obj)
              didata.push(obj)
            })
          
          })
        if(this.operation=='c.3'||this.operation=='c.4'){
        this.isSelecttime=false
        this.formInline.starttime = new Date(new Date().setHours(0, 0, 0, 0)-24*60*60*1000)
        this.formInline.endtime = new Date()
        }else if(this.operation=='c.2'){
           this.isSelecttime=true
           this.formInline.starttime = ''
           this.formInline.endtime = ''
        }
    }
  }
};
</script>
<style scoped>
.mainstations {
  width: 100%;
  min-height: 100%;
  box-sizing: border-box;
  background: #ffffff;
  box-sizing:border-box;
  display:flex;
}
.blockcontent {
  height:auto;
}
.blockfooter {
  display: flex;
  justify-content: flex-end;
  margin-bottom:8px;
}
</style>
<style>
.mainstations .el-tabs--left .el-tabs__item.is-left {
  width: 38px;
  white-space: pre-wrap;
  height: auto;
  border: 1px solid #cccccc;
  padding: 20px 10px;
}
.mainstations .el-tabs--border-card > .el-tabs__header .el-tabs__item {
  color: white;
   font-family: Microsoft YaHei;
  font-size:18px;
}
.mainstations .el-tabs--left.el-tabs--border-card .el-tabs__header.is-left {
  min-height: 875px;
}
.mainstations .el-tabs__header {
  background: #1579bf;
}
.mainstations
  .el-tabs--border-card
  > .el-tabs__header
  .el-tabs__item.is-active {
  color: #333333 !important;
  font-family: Microsoft YaHei;
  font-size:18px;
  background-color:#3f93cf;
}
.mainstations .el-tabs__content {
  height: 875px;
  overflow-x: scroll;
  overflow-y: scroll;
}
.mainstations .el-tabs--border-card>.el-tabs__content{
  padding:0;
  padding-top:10px;
}
.mainstations .el-transfer-panel__list {
  height: 100%;
}
.mainstations .el-transfer-panel {
  min-height: 400px;
  width: 350px;
}
.mainstations .el-transfer-panel__body {
  height: 400px;
}
.mainstations .demo-form-inline .el-input__inner {
  border-radius:0;
  height:26px;
  line-height:26px;
}
.mainstations .demo-form-inline .el-input__icon{
  line-height:0;
}
.mainstations .el-dialog {
  position: absolute !important;
  right: 0 !important;
  left: auto;
  background: #f6fbff;
  
}
.mainstations .el-dialog__body{
  padding:10px 20px;
}
.mianstations .el-dialog__header .el-dialog__title{
  font-size:16px;
}
.mainstations .el-form-item{
  margin-bottom:0;
}
.mainstations .el-tabs--border-card{
  border:0;
  width:322px;
}
.mainstations .el-tabs__item{
  line-height:20px;
}
.mainstations .el-transfer__button:nth-child(2){
  margin:0 auto;
}
.mainstations .el-transfer__buttons{
  width:200px;
}
.mainstations .el-form-item__label{
  color:#333333;
   font-family: Microsoft YaHei;
}
.mainstations .el-transfer-panel__item.el-checkbox .el-checkbox__label{
  font-family:Microsoft YaHei;
  color:#333333;
}
.mainstations .blockfooter .el-button{
  width:75px;
  height:32px;
  line-height:0;
  border-radius:0;
}
.el-transfer__buttons .el-button{
padding:0;
width:144px;
height:25px;
}
.zwheader .el-input__inner{
  height:26px;
  width:174px;
  border-radius:0;
}
@media screen and (max-width: 1450px) { /*当屏幕尺寸小于750px时，应用下面的CSS样式*/
        .mainstations .el-transfer__buttons{
          width:200px;
     }
     .mainstations .el-transfer-panel{
       width:300px;
     }
    } 
</style>

