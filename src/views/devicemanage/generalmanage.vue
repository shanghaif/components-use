<template>
  <div class="general">
    <Resource
      style="width:340px;max-height:100vh;overflow:scroll;flex-shrink:0;"
      :data="data"
      @change="addUser"
      @lookdata="getDetailforUser"
      @username="getusername"
      @resetusername="resetusername"
    />
    <el-tabs v-model="activeName" @tab-click="handleClick">
    <el-tab-pane label="设备列表" name="first">
        <div class="block">
      <div class="blockheader1">
        <el-form :inline="true" :model="formInline" class="demo-form-inline" >
          <el-form-item label="设备状态">
            <el-select placeholder="设备状态" v-model="formInline.ol_status" style="width:150px">
              <el-option label="全部" :value="9"></el-option>
              <el-option label="在线" :value="1"></el-option>
              <el-option label="离线" :value="0"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="客户名称">
            <el-select placeholder="客户名称" v-model="formInline.customer" style="width:150px">
            <el-option v-for="(item,index) in userdata" :label="item.attributes.name" :key="index" :value="item.id"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="设备类型">
            <el-select placeholder="设备类型" v-model="formInline.hardwareType" style="width:150px">
              <el-option
                  v-for="(item,index) in deviceData"
                  :key="index"
                  :label="item.name"
                  :value="item.name"
                ></el-option>
            </el-select>
          </el-form-item>
          <!-- <el-form-item label="注册服务器">
            <el-select placeholder="注册服务器" v-model="formInline.route" style="width:150px">
              <el-option label="无线" value="tcp"></el-option>
              <el-option label="485" value="tcp1"></el-option>
              <el-option label="载波" value="tcp2"></el-option>
            </el-select>
          </el-form-item> -->
          <el-form-item label="使用情况">
            <el-select placeholder="使用情况" v-model="formInline.status" style="width:150px">
              <el-option label="全部" :value="9"></el-option>
              <el-option label="正常使用" :value="1"></el-option>
              <el-option label="已废弃" :value="0"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="授权状态">
            <el-select placeholder="授权状态" v-model="formInline.auth" style="width:150px">
              <el-option label="--" :value="9"></el-option>
              <el-option label="已获授权" :value="1"></el-option>
              <el-option label="未获授权" :value="0"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="设备编号">
            <el-input v-model="formInline.hardware_number" placeholder="设备编号"></el-input>
          </el-form-item>
        </el-form>
      </div>
      <div class="blockbutton">
        <el-button type="primary" icon="el-icon-search" size="small" @click="searchskUser">查询</el-button>
        <el-button type="primary" size="small" @click="reset">重置</el-button>
        <el-button type="primary" size="small" @click="dialogFormVisible=true">客户编辑</el-button>
        <!-- <el-button type="primary" size="small">新增设备类型</el-button> -->
      </div>
      <div class="blockheader">
        <el-table :data="tableData" stripe style="width: 100%;text-align:center" @selection-change="handleSelectionChange">
          <el-table-column type="selection" width="55" align="center"></el-table-column>
          <el-table-column prop="customer" label="客户名称" align="center"></el-table-column>
          <el-table-column prop="hardwareType" label="设备类型" align="center"></el-table-column>
          <el-table-column prop="hardware_number" label="设备编号" align="center"></el-table-column>
          <!-- <el-table-column prop="address" label="注册服务器" align="center"></el-table-column> -->
          <el-table-column prop="yysName" label="服务商名称" align="center"></el-table-column>
           <el-table-column  label="在线状况" align="center">
            <template slot-scope="scope">
              <span v-if="scope.row.ol_status==1" style="color:green">在线</span>
              <span v-else style="color:red">离线</span>
            </template>
          </el-table-column>
          <el-table-column  label="使用状况" align="center">
            <template slot-scope="scope">
              <span v-if="scope.row.status==1" style="color:green">正常使用</span>
              <span v-else style="color:red">废弃</span>
            </template>
          </el-table-column>
         <el-table-column prop="cardId" label="授权码" align="center"></el-table-column>
          <el-table-column  label="授权状态" align="center">
             <template slot-scope="scope">
              <span v-if="scope.row.auth==1" style="color:green">已获取授权</span>
              <span v-else style="color:red">未获取授权</span>
            </template>
          </el-table-column>
           <el-table-column  label="设备地址" align="center" prop="address">
          </el-table-column>
          <el-table-column prop="createdAt" label="注册时间" align="center"></el-table-column>
          <el-table-column  label="操作" align="center">
            <template slot-scope="scope">
             <el-button type="primary" size="mini" @click="editordevtype(scope.row)">状态修改</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <div class="fenye">
                <el-pagination
                background
                @size-change="UserSizeChange"
                @current-change="UserCurrentChange"
                :page-sizes="[1,10, 20, 30, 50]"
                :page-size="UserPageSize"
                layout="total, sizes, prev, pager, next, jumper"
                :total="UserTotal">
                </el-pagination>
            </div>
            <el-dialog title="添加客户" :visible.sync="dialogFormVisible">
              <el-form :model="customerForm">
                <el-form-item label="客户名称">
                    <el-select placeholder="客户名称" v-model="customerForm.customer" style="width:60%" @change="selsectname">
                    <el-option v-for="(item,index) in userdata" :label="item.attributes.name" :key="index" :value="item.id"></el-option>
                    </el-select>
                </el-form-item>
                 <el-form-item v-if="!isadduser">
                   <el-link type="primary" @click="isadduser=true" :underline="false" style="margin-left:80px">添加用户</el-link>
                </el-form-item>
                <el-form-item v-if="isadduser" label="添加客户"> 
                  <el-input v-model="customerForm.username" autocomplete="off" style="width:60%"></el-input>
                  <el-button type="primary" @click="addsukeuser">添 加</el-button>
                </el-form-item>
                
              </el-form>
              <div slot="footer" class="dialog-footer">
                <el-button @click="dialogFormVisible = false">取 消</el-button>
                <el-button type="primary" @click="addDevTypeForUser">确 定</el-button>
              </div>
            </el-dialog>
            <!--客户编辑-->
            <el-dialog title="状态编辑" :visible.sync="userFormVisible">
                <el-form :model="userform">
                  <el-form-item label="使用状态" :label-width="formLabelWidth">
                     <el-select v-model="userform.name" style="width:100%">
                      <el-option label="启用" :value="1"></el-option>
                      <el-option label="废弃" :value="0"></el-option>
                    </el-select>
                  </el-form-item>
                  <el-form-item label="授权状态" :label-width="formLabelWidth">
                    <el-select v-model="userform.region" style="width:100%">
                      <el-option label="已获取授权" :value="1"></el-option>
                      <el-option label="未获取授权" :value="0"></el-option>
                    </el-select>
                  </el-form-item>
                   <el-form-item label="设备地址" :label-width="formLabelWidth">
                     <el-input v-model="userform.addr"></el-input>
                  </el-form-item>
                   <el-form-item label="接口客户" :label-width="formLabelWidth">
                <el-select v-model="userform.hardwareType" placeholder="请选择接口客户" style="width:100%" @change="selsectserver">
                  <el-option
                    v-for="(item,index) in ispData"
                    :key="index"
                    :label="item.name"
                    :value="item.id"
                  ></el-option>
                </el-select>
              </el-form-item>
                </el-form>
                <div slot="footer" class="dialog-footer">
                  <el-button @click="userFormVisible = false">取 消</el-button>
                  <el-button type="primary" @click="updateusertype">确 定</el-button>
                </div>
            </el-dialog>
    </div>
    </el-tab-pane>
       
    <!--设备类型管理-->
    <el-tab-pane label="设备类型管理" name="third">
        <div class="sukethree">
            <el-form :inline="true" :model="formthree" class="formthree">
                <el-form-item label="设备类型编码">
                    <el-input v-model="formthree.number" placeholder="硬件类型编码"></el-input>
                </el-form-item>
                 <el-form-item label="设备类型名称">
                    <el-input v-model="formthree.name" placeholder="硬件类型名称"></el-input>
                </el-form-item>
                <el-form-item label="状态">
                    <el-select v-model="formthree.enable" placeholder="状态">
                    <el-option label="全部" :value='9'></el-option>
                    <el-option label="启用" :value='1'></el-option>
                    <el-option label="废弃" :value='0'></el-option>
                    </el-select>
                </el-form-item>
                 <el-form-item>
                    <el-button type="success" size="small" style="height:26px;line-height:0;" @click="querydevtype">查询</el-button>
                    <el-button type="primary" size="small" style="height:26px;line-height:0;" @click="resetdevtype">重置</el-button>
                </el-form-item>
                <el-form-item style="float:right">
                    <el-button type="primary" icon="el-icon-plus" @click="isDevice=true">发布设备类型</el-button>
                </el-form-item>
            </el-form>
            <el-table
                :data="deviceData"
                border
                style="width: 100%;margin-top:10px;text-align:center"
                height="300">
                <el-table-column
                prop="number"
                label="设备类型编码"
                align="center">
                </el-table-column>
                <el-table-column
                prop="name"
                label="设备类型名称"
                align="center">
                </el-table-column>
                <el-table-column
                label="状态"
                align="center">
                <template slot-scope="scope">
                 <span v-if="scope.row.enable==1" style="color:green">启用</span>
                 <span v-else style="color:red">废弃</span>
                </template>
                </el-table-column>
                 <el-table-column
                label="操作"
                align="center"
                width="300">
                 <template slot-scope="scope">
                  <el-button type="primary" size="small" @click="edirtdevtype(scope.row)">编辑</el-button>
                  <el-button type="success" size="small" v-if="scope.row.enable==0" @click="editorsuketype(scope.row)">启用</el-button>
                  <el-button type="danger"  size="small" v-else @click="editorsuketype(scope.row)">废弃</el-button>
                </template>
                </el-table-column>
               
            </el-table>
            <div class="fenye">
                <el-pagination
                background
                @size-change="DeviceSizeChange"
                @current-change="DeviceCurrentChange"
                :page-sizes="[1,10, 20, 30, 50]"
                :page-size="DevicePageSize"
                layout="total, sizes, prev, pager, next, jumper"
                :total="DeviceTotal">
                </el-pagination>
            </div>
            <div class="geduan" style="width:100%;height:4px;background:#cccccc;margin-top:5px"></div>
            <div class="addevice" v-show="isDevice">
                <el-form ref="Deviceform" :model="Deviceform" label-width="200px" :rules="Devicerule">
                    <el-form-item label="设备类型名称" prop="name">
                        <el-input v-model="Deviceform.name" placeholder="设备类型名称，1-30个字符"></el-input>
                    </el-form-item>
                    <el-form-item label="设备类型编码" prop="code">
                        <el-input v-model="Deviceform.code" placeholder="设备类型编码，1-30个字符"></el-input>
                    </el-form-item>
                     <el-form-item label="备注">
                        <el-input type="textarea" v-model="Deviceform.desc" :rows="5"></el-input>
                    </el-form-item>
                    <el-form-item >
                        <el-button type="primary" @click="addSuketype('Deviceform')">提 交</el-button>
                    </el-form-item>
                </el-form>
            </div>
        </div>
    </el-tab-pane>
  </el-tabs>
    
  </div>
</template>
<script>
import Resource from "@/components/resource";
import Parse from "parse";
import { addCustomer } from "@/api/customernode";
import {addSukeyys,searchSuketype,editSukeyys,addSukedevtype,editorSukedevtype,searchSukeuser,querydevinfo,queryyysinfo} from '@/api/sukeserver'
import {utc2beijing} from '@/utils/index'
export default {
  components: {
    Resource
  },
  data() {
       var validCode=(rule,value,callback)=>{
      let reg=/^[0-9a-zA-Z]{2}$/
      if(!reg.test(value))
      {callback(new Error('应用商代号，2个数字、字母组合'))
         }else{
            callback()
         }
      };
      var validName=(rule,value,callback)=>{
        let reg =/^[\u4e00-\u9fa50-9a-zA-Z]{1,30}$/
        if(!reg.test(value))
        {callback(new Error('应用商名称，1到30个字符'))
         }else{
            callback()
         }
       
      };
       var validName1=(rule,value,callback)=>{
        let reg =/^[\u4e00-\u9fa50-9a-zA-Z]{1,30}$/
        if(!reg.test(value))
        {callback(new Error('设备类型，1到30个字符'))
         }else{
            callback()
         }
       };
      var validUrl=(rule,value,callback)=>{
        let reg=/^((https|http|ftp|rtsp|mms)?:\/\/)+[A-Za-z0-9]+\.[A-Za-z0-9]+[\/=\?%\-&_~`@[\]\':+!]*([^<>\"\"])*$/
        
        if(!reg.test(value))
        {
          callback(new Error('需要输入正确的url'))
         }else{
            callback()
         }
      };
      var validpara=(rule,value,callback)=>{
        let reg =/^[0-9a-zA-Z]$/
        if(!reg.test(value))
        {callback(new Error('输入para'))
         }else{
            callback()
         }
       };
    return {
     Devicerule:{
        name:[
               {required:true,message:'设备类型，输入1到30个字符',trigger:'blur'},
               {validator:validName1,trigger:'blur'}
            ],
            code:[
               {required:true,message:'设备类型，输入1到30个字符',trigger:'blur'},
               {validator:validName1,trigger:'blur'}
            ], 
     },
     isDevice:false,
     isadduser:false,
     Deviceform:{
         name:'',
         code:'',
         desc:'',
         status:1
     },
     userFormVisible:false,
     userform:{
       name:'',
       region:'',
       addr:'', 
       hardwareType:'',
     },
     DevicePageSize:10,
     Devicestart:0,
     DeviceTotal:0,
   
     activeName:'first',
      formInline: {
        ol_status: 9,
        customer:'',
        hardwareType:'',
        status:9,
        auth:9,
        hardware_number:''
      },
      customerForm:{
        customer:'',
        username:''
      },
       UserPageSize:10,
      Userstart:0,
      UserTotal:0,
      formthree:{
        number:'',
        name:'',
        enable:9,
      },
      deviceData:[],
      data: [],
      tableData: [],
      ispData:[],
      dialogFormVisible: false,
      form: {
        parentId: "",
        username: ""
      },
      formLabelWidth: "120px",
      objectId:'',
      deviceobjectId:'',
      userdata:[],
      selectdevnumber:[],
      dataforuser:'',
       sukeserver:{
          name:'',
          id:'',
          url:'',
          para:'',
      },
      datafordev:'',
      userdevid:'',
      isaddusername:true,
    };
  },
  mounted() {
    this.getMainstation();
    this.handleClick({name:'first'})
    this.getTree()
    this.getsukesercver()
  },
  methods: {
    reset(){
      this.formInline={
        ol_status: 9,
        customer:'',
        hardwareType:'',
        status:9,
        auth:9,
        hardware_number:''
      }
    },
    resetusername(val){
      this.getTree()
    },
    getusername(val){
      this.data=[]
      var Department = Parse.Object.extend('Department')
      var department = new Parse.Query(Department)
      department.equalTo('name',val)
      department.find().then(resultes=>{
        if(resultes){
          var Department1 = Parse.Object.extend('Department')
          var department1 = new Parse.Query(Department1)
          resultes.map(items=>{
            var obj={}
            items.createtime = utc2beijing(items.attributes.createdAt)
            obj.name = items.attributes.name,
            obj.ParentId = items.attributes.ParentId;
            obj.objectId = items.id;
            obj.createtime = items.createtime;
            obj.is_show = false;
            this.data.push(obj);
            department1.equalTo('ParentId',items.id)
            department1.find().then(response=>{
              response.map(items=>{
                 var obj={}
                  items.createtime = utc2beijing(items.attributes.createdAt)
                  obj.name = items.attributes.name,
                  obj.ParentId = items.attributes.ParentId;
                  obj.objectId = items.id;
                  obj.createtime = items.createtime;
                  obj.is_show = false;
                  this.data.push(obj);
              })
            })
          })
        }
      })
    },
    selsectserver(val){
       this.ispData.map(item=>{
        if(val==item.id){
          this.datafordev=item.name
        }
      })
    },
    selsectname(val){
      this.userdata.map(item=>{
        if(val==item.id){
          this.dataforuser=item.attributes.name
        }
      })
    },
    handleClick(tab){
     if(tab.name=='third'){
          querydevinfo(this.formthree,this.Devicestart,this.DevicePageSize).then(response=>{
         this.deviceData=response.data
         this.DeviceTotal=response.count
      })
      }else{
        searchSukeuser(this.formInline,this.Userstart,this.UserPageSize).then(resultes=>{
        this.tableData=JSON.parse(JSON.stringify(resultes.data))
        this.tableData.map(items=>{
          items.createdAt = utc2beijing(items.createdAt)
        })
         this.UserTotal=resultes.count
      })
      }
    },
    getsukesercver(){
      queryyysinfo(this.sukeserver,this.ispstart,this.ispPageSize).then(response=>{
          this.ispData = response.data; 
        })
    },
    addsukeuser(){
      this.isaddusername = true
      this.data.map(items=>{
        if(this.customerForm.username==items.name){
          this.$message({
            message: "客户姓名重复",
            type: "error"
          })
          this.isaddusername=false
          return this.isaddusername
        }
      })
      if(this.isaddusername){
          var Department = Parse.Object.extend("Department");
      var department = new Department()
      var acl =  new Parse.ACL()
      department.set('name',this.customerForm.username)
      department.set('org_type','suke')
      department.set('ParentId','0')
      acl.setRoleReadAccess('suke',true);
      acl.setRoleWriteAccess('suke',true);
      department.set('ACL',acl)
      department.save().then(object => {
                this.$message({
                  message: "新增成功",
                  type: "success"
                });
            this.isadduser=false
            this.getMainstation()

       })

      }
      
    },
    addDevTypeForUser(){
      var Department = Parse.Object.extend("Department");
      var department = new Parse.Query(Department)
       var SukeDev = Parse.Object.extend("SukeDev");
      var sukdev = new Parse.Query(SukeDev);
      this.selectdevnumber.map(items=>{
        setTimeout(() => {
            sukdev.get(items.objectId).then(object=>{
            object.set('customer',this.dataforuser)
            object.set('customerId',this.customerForm.customer)
            object.save().then(resultes=>{
              department.get(items.departmentId).then(res=>{
                res.set('ParentId',this.customerForm.customer)
                res.save().then(response=>{
                    this.$message({
                    message: "更新成功",
                    type: "success"
                  });
                  this.dialogFormVisible=false
                 
                })
              })
            this.getTree()
            this.handleClick({name:'first'})
            })
             
          }, 500);
        })
      //   department.set('name',items.hardware_number)
      //   department.set('org_type','suke')
      //   department.set('ParentId',this.customerForm.customer)
      //   acl.setRoleReadAccess('suke',true);
      //   acl.setRoleWriteAccess('suke',true);
      //   department.set('ACL',acl)
      //   department.save().then(object => {
      //             this.$message({
      //               message: "客户关联成功",
      //               type: "success"
      //             });
      //         this.dialogFormVisible=false
      //         this.getMainstation()
      //   })
      })
      
    },
    editordevtype(row){
      this.userFormVisible=true
      this.userform.name = row.status
      this.userform.region = row.auth
      this.userdevid = row.objectId
      this.userform.addr = row.address
    },
    updateusertype(){
       var SukeDev = Parse.Object.extend("SukeDev");
        var sukdev = new Parse.Query(SukeDev);
        sukdev.get(this.userdevid).then(object=>{
          object.set('status',this.userform.name)
          object.set('auth',this.userform.region)
          object.set('address',this.userform.addr)
          object.set('yysId',this.userform.hardwareType)
          object.set('yysName',this.datafordev)
          object.save().then(resultes=>{
            this.$message({
              type: "success",
              message: "状态修改成功"
            })
            this.userFormVisible=false
            this.querydevtype()
          },error=>{
            this.$message({
              type: "error",
              message: error
            })
          })
        })
    },
    getTree(){
     
      var Department = Parse.Object.extend("Department");
      var department = new Parse.Query(Department);
        department.limit(10000);
        department.equalTo("org_type", 'suke');
        department.find().then(
        resultes => {
           this.data=[]
          resultes.map(items => {
            var obj = {};
            items.createtime = utc2beijing(items.attributes.createdAt)
            obj.name = items.attributes.name,
            obj.ParentId = items.attributes.ParentId;
            obj.objectId = items.id;
            obj.createtime = items.createtime;
            obj.is_show = false;
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
    getMainstation() {
      var Department = Parse.Object.extend("Department");
      var department = new Parse.Query(Department);
      department.limit(10000);
      department.equalTo("org_type", 'suke');
      department.equalTo("ParentId", '0');
      department.find().then(
        resultes => {
           this.userdata = resultes
           this.handleClick({name:'third'})
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
    handleSelectionChange(val){
      
      this.selectdevnumber=val
    },
    //查询用户
    searchskUser(){
      searchSukeuser(this.formInline,this.Userstart,this.UserPageSize).then(resultes=>{
         this.tableData=JSON.parse(JSON.stringify(resultes.data))
        this.tableData.map(items=>{
          items.createdAt = utc2beijing(items.createdAt)
        })
         this.UserTotal=resultes.count
      })
    },
    getDetailforUser(data) {
      var SukeDev = Parse.Object.extend("SukeDev");
      var sukdev = new Parse.Query(SukeDev);
      sukdev.equalTo("parentId", data.objectId);
      sukdev.equalTo("type", "suke");
      sukdev.find().then(res => {
      });
    },
    addUser(data) {
      this.dialogFormVisible = true;
      this.form.parentId = data.objectId;
    },
    addcus() {
      addCustomer(this.form.parentId, this.form.username).then(resultes => {
        if (resultes) {
          this.$message({
            message: "修改成功",
            type: "success"
          });
          this.dialogFormVisible = false;
          this.getMainstation();
        }
      });
    },
    //设备分页
    DeviceSizeChange(val){
       this.DevicePageSize=val
       this.querydevtype()
    },
    DeviceCurrentChange(val){
      this.Devicestart=(val-1)*this.DevicePageSize
      this.querydevtype()
    },
    //设备类型查询
    querydevtype(){
      querydevinfo(this.formthree,this.Devicestart,this.DevicePageSize).then(response=>{
         this.deviceData=response.data
         this.DeviceTotal=response.count
      })
    },
     UserSizeChange(val){
       this.UserPageSize=val
      this.searchskUser()
      },
      UserCurrentChange(val){
      this.Userstart=(val-1)*this.UserPageSize
      this.searchskUser()
      },
    //设备操作
    resetdevtype(){
      this.formthree={
        number:'',
        name:'',
        enable:9,
      }
    },
    addSuketype(formName){
        this.$refs[formName].validate((valid) => {
         if(valid){
           if(this.deviceobjectId!=''){
             editorSukedevtype(this.deviceobjectId,this.Deviceform.name,this.Deviceform.code,this.Deviceform.desc,this.Deviceform.status).then(resultes=>{
                this.$message({
                message: "设备"+this.Deviceform.name+"修改成功",
                type: "success"
              });
              this.isDevice=false 
              this.handleClick({name:'third'})
              this.deviceobjectId=''
              this.$refs[formName].resetFields()
              this.Deviceform.desc=''
             })
           }
           addSukedevtype(this.Deviceform.name,this.Deviceform.code,this.Deviceform.desc,this.Deviceform.status).then(resultes=>{
             if(resultes){
               this.$message({
                message: "设备添加成功",
                type: "success"
              });
              this.isDevice=false 
              this.handleClick({name:'third'})
              this.$refs[formName].resetFields()
              this.Deviceform.desc=''
             }
           }).catch(error=>{
             console.log(error)
           })
         }
      })
    },
    //编辑设备状态
    editorsuketype(row){
      if(row.enable==0){
        editorSukedevtype(row.objectId,row.name,row.number,row.remark,1).then(resultes=>{
           this.$message({
                message: "设备"+row.name+"启用成功",
                type: "success"
              });
              this.handleClick({name:'third'})
        })
      }else{
         editorSukedevtype(row.objectId,row.name,row.number,row.remark,0).then(resultes=>{
           this.$message({
                message: "设备"+row.name+"已废弃",
                type: "error"
              });
              this.handleClick({name:'third'})
        })
      }
    },
    //编辑设备
    edirtdevtype(row){
      this.isDevice=true
      this.Deviceform.name=row.name
      this.Deviceform.code = row.number
      this.Deviceform.desc = row.remark
      this.Deviceform.status = row.enable
      this.deviceobjectId=row.objectId
    }
  }
};
</script>
<style scoped>
.general {
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  background: #ffffff;
  display: flex;
}
.blockheader {
  width: 100%;
  height: auto;
  padding: 10px;
  box-sizing: border-box;
}
.blockbutton {
  text-align: right;
  padding-right: 10px;
  box-sizing: border-box;
}
.fenye{
    margin-top:10px;
}
.addevice{
    margin-top:10px;
}

</style>
<style>
.general .el-tabs{
    min-height:850px;
    width:inherit;
    margin-top:20px;
}
.general .el-tabs__header{
    padding-left:10px;
    font-size:16px;
}
.general .el-tabs__header .el-tabs__item{
    font-size:16px;
}
.general .el-tabs__content{
    padding-left:10px;
    box-sizing:border-box;
}
.general .blockheader1 .el-form-item {
  margin-bottom: 5px;
}
.general .blockheader1 .el-input--suffix .el-input__inner,
.general .blockheader1 .el-input__inner, .general .sukethree .formthree .el-input--suffix .el-input__inner,.general .sukethree .formthree .el-input__inner{
  height: 26px;
  border-radius: 0;
  line-height: 26px;
  width: 150px;
}
.general .sukethree .formthree.el-button--primary{
background-color: #ffd428;
border-color: #ffd428;
color:#333333;
}
.general .el-table td,.general .el-table th{
    padding:5px 0;
}
.general .addevice .el-input__inner,.general .addevice .el-textarea__inner{
    width:60%;
}
.general .addevice .el-form-item__label{
    text-align:left;
}
.general .addevice .el-form-item{
    padding-bottom: 5px;
    box-sizing: border-box;
}
.general .resource {
  margin-top:20px;
}
</style>
