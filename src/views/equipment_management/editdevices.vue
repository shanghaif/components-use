
<template>
  <div class="editdevices">
    <div class="editheader">
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path: '/roles/thing' }">设备管理</el-breadcrumb-item>
        <el-breadcrumb-item>设备详情</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div>
      <el-tabs v-model="activeName" @tab-click="tabHandleClick">
        <el-tab-pane label="设备信息" name="first">
          <div style="background:#ffffff;padding:10px;box-sizing:border-box;">
            <!-- <h4>设备信息</h4> -->
            <div>
              <table
                class="mailtable"
                style="width:100%;"
                border="0"
                cellspacing="0"
                cellpadding="0"
              >
                <tr>
                  <td class="cloumn">设备编号:</td>
                  <td>{{devicedetail.devaddr}}</td>
                  <td class="cloumn">所属产品:</td>
                  <td>{{devicedetail.productName}}</td>
                  <td class="cloumn">位置:</td>
                  <td>{{devicedetail.address}}</td>
                </tr>
                <tr>
                  <td class="cloumn">当前状态:</td>
                  <td  :class="devicedetail.status"  v-if="devicedetail.status=='ACTIVE'">已激活</td>
                   <td  :class="devicedetail.status" v-else-if="devicedetail.status=='UNACTIVE'">未激活</td>
                   <td  :class="devicedetail.status" v-else-if="devicedetail.status=='ONLINE'">在线</td>
                   <td  :class="devicedetail.status"  v-else-if="devicedetail.status=='OFFLINE'">离线</td>
                  <td class="cloumn">ProductId:</td>
                  <td>{{devicedetail.productid}}</td>
                 
                  <td class="cloumn">最后上线时间:</td>
                  <td>{{devicedetail.lastOnlineTime}}</td>
                </tr>
                <tr>
                  <td class="cloumn">IP地址:</td>
                  <td>{{devicedetail.ip}}</td>
                  <td class="cloumn">ProductSecret:
                       <el-tooltip
                      content="注意保密，如有泄露即使更换"
                      placement="top"
                      style="margin-left:5px;color:#cccccc"
                    >
                      <i class="el-icon-question"></i>
                    </el-tooltip>
                  </td>
                  <td>{{devicedetail.productSecret}}</td>
                    <td class="cloumn">添加时间:</td>
                  <td>{{devicedetail.createdAt}}</td>
                  
                </tr>
                <tr>
                 <td class="cloumn">所处节点</td>
                  <td>{{devicedetail.node}}</td>
                     <td class="cloumn">节点类型:</td>
                  <td v-if="devicedetail.nodeType==0">设备</td>
                  <td v-else>网关</td>
                  <td class="cloumn">
                    备注: 
                  </td>
                  <td >{{devicedetail.desc}}</td>
                </tr>
              </table>
            </div>
          </div>
          <!-- <div class="jiange" style="width:100%;height:20px;background:#f4f4f4">

          </div>-->
          <div
            class="twofirsttable"
            style="background:#ffffff;padding:10px;box-sizing:border-box;margin-top:20px"
          >
            <h4>设备扩展信息</h4>
            <el-input type="textarea" :row="10" readonly v-model="devicedetail.shadow" :cols="5"></el-input>
          </div>
        </el-tab-pane>
        <el-tab-pane label="Topic列表" name="second">
          <div style="background:#ffffff;padding:10px;box-sizing:border-box;">
            <!-- <div>
                              <h4 style="display:inline">设备TOPIC类 <el-tooltip content="产品下的所有设备都会继承该产品的Topic类" placement="top" style="margin-left:5px;color:#cccccc">
                                <i class="el-icon-question"></i>
                                </el-tooltip></h4>
            </div>-->
            <el-table :data="topicData" style="width: 100%;text-align:center;">
              <el-table-column label="Topic" align="left">
                <template slot-scope="scope">
                  <span>{{scope.row.topic.replace('\${ProductId}\/${DevAddr\}', devicedetail.productid+'/'+devicedetail.devaddr)}}</span>
                </template>
              </el-table-column>
              <el-table-column label="操作权限" align="center">
                <template slot-scope="scope">
                  <span v-if="scope.row.type=='pub'">发布</span>
                  <span v-if="scope.row.type=='sub'">订阅</span>
                </template>
              </el-table-column>
              <el-table-column prop="desc" align="center" label="描述"></el-table-column>
              <el-table-column label="操作" align="center">
                <template slot-scope="scope">
                  <el-button type="primary" size="mini" v-if="!scope.row.isdef">编辑</el-button>
                  <el-button type="danger" size="mini" v-if="!scope.row.isdef">删除</el-button>
                </template>
              </el-table-column>
            </el-table>
          </div>
        </el-tab-pane>
        <el-tab-pane label="运行状态" name="third">
          <div style="background:#ffffff;padding:10px;box-sizing:border-box;">
            <div style="text-align:right">
              <span>实时刷新</span>
              <el-switch
                v-model="isupdate"
                active-color="#13ce66"
                inactive-color="#cccccc"
                @change="updateTrue($event)"
              ></el-switch>
              <el-button-group>
                <el-button type="primary" @click="isshowtable=false" plain :class="!isshowtable ? 'buttonactive':''">图表</el-button>
                <el-button type="primary" @click="isshowtable=true" plain :class="isshowtable ? 'buttonactive':''">表格</el-button>
              </el-button-group>
            </div>
            <div class="thirdtb" v-if="!isshowtable">
            <!--运行状态卡片-->
              <ul style="display: flex;flex-wrap: wrap">
                <li v-for="(item,index) in properties" :key="index" class="updatedtable">
                  <div style="font-family: cursive;text-align:center"><span>{{item.name}}</span></div>
                  <!-- <div><span>ID：</span><span>{{item.identifier}}</span></div> -->
                 <div style="font-size:16px;font-weight: bolder;font-family: fantasy" v-if="item.dataType=='double'||item.dataType=='float'||item.dataType=='int'"><span >{{item.value}}</span><span v-if="item.specs.unit">{{item.specs.unit}}</span></div>
                 <div style="font-size:16px;font-weight: bolder;font-family: fantasy" v-if="item.dataType=='enmu'||item.dataType=='bool'"><span >{{item.value}}</span><span>{{item.specs[item.value]}}</span></div>
                 <div style="font-size:14px;font-weight: bolder;font-family: fantasy" v-if="item.dataType=='struct'">
                    <i v-for="(key,index) in item.specs" :key="index" style="display:block;height:30px;font-style:normal">
                       <div style="font-size:16px;font-weight: bolder;font-family: fantasy" v-if="key.dataType.type=='double'||key.dataType.type=='float'||key.dataType.type=='int'"><span >{{key.name+':'}}</span><span >{{key.value}}</span><span v-if="key.dataType.specs.unit">{{key.dataType.specs.unit}}</span></div>
                        <div style="font-size:16px;font-weight: bolder;font-family: fantasy" v-if="key.dataType.type=='enmu'||key.dataType.type=='bool'"><span >{{key.name+':'}}</span><span >{{key.value}}</span><span>{{key.dataType.specs[key.value]}}</span></div>
                   </i>
                  
                  
                 </div>
                 <div><span>更新时间：</span><span v-if="item.time">{{timestampToTime(item.time)}}</span></div>
                </li>
              </ul>
            </div>
            <div class="thirdtable" v-if="isshowtable">
              <el-table
                :data="thirdData.slice((thirdstart-1)*thirdlength,thirdstart*thirdlength)"
                style="width: 100%;text-align:center;margin-top:10px"
              >
                <el-table-column label="序号" align="center" type="index" width="100"></el-table-column>

                <el-table-column prop="value" align="center" label="值" show-overflow-tooltip></el-table-column>
                <el-table-column prop="time" label="时间" align="center" width="300"></el-table-column>
              </el-table>
              <el-pagination
              background
              @size-change="handleSizeChange1"
              @current-change="handleCurrentChange1"
              :page-sizes="[10, 25, 50, 100]"
              :page-size="thirdlength"
              layout="total, sizes, prev, pager, next, jumper"
              :total="thirdtotal"
              style="margin-top:20px;"
            ></el-pagination>
            </div>
            
          </div>
        </el-tab-pane>
        <!-- <el-tab-pane label="事件管理" name="fixth">事件管理</el-tab-pane>
                <el-tab-pane label="服务调用" name="sixth">服务调用</el-tab-pane>
                <el-tab-pane label="设备影子" name="seventh">设备影子</el-tab-pane>
                <el-tab-pane label="日志服务" name="eighth">日志服务</el-tab-pane> -->
        <el-tab-pane label="在线调试" name="ninth">
          
         
        </el-tab-pane>
        <!--子设备管理-->
         <el-tab-pane label="子设备管理" name="children" v-if="isshowchild">
           <div class="childrendevices">
             <el-form :inline="true" :model="childrendevices" class="demo-form-inline" size="small">
                <el-form-item label="设备编号：">
                  <el-input v-model="childrendevices.devicesname" placeholder="请输入设备编号"></el-input>
                </el-form-item>
                <el-form-item>
                  <el-button type="primary" @click="getDevices(0)">查 询</el-button>
                </el-form-item>
                <el-form-item>
                  <el-button type="primary" :disabled="multipleTable.length==0" @click="deleteDevcie">解除关联</el-button>
                  <el-button type="primary" :disabled="multipleTable.length==0" @click="unactiveDevice">禁 用</el-button>
                  <el-button type="primary" :disabled="multipleTable.length==0" @click="activeDevice">启 用</el-button>
                </el-form-item>
                <el-form-item>
                  <el-button type="info"  plain>刷 新</el-button>
                  <el-button type="primary" @click="childDialog=true">添加子设备</el-button>
                </el-form-item>
            </el-form>
              <div class="devicetable"> 
                <el-table
                  ref="filterTable"
                  :data="devicesTableData"
                  style="width: 100%;text-align:center;margin-top:20px;"
                  @selection-change="DevicesSelectionChange"
                >
              <el-table-column type="selection" align="center" width="55"></el-table-column>
              <el-table-column label="设备编号" align="center">
                <template slot-scope="scope">
                  <span  >{{scope.row.devaddr}}</span>
                  <p  style="margin:0;color:green">{{scope.row.name}}</p>
                </template>
              </el-table-column>
                <el-table-column label="状态" align="center">
                <template slot-scope="scope">
                  <span  :class="scope.row.status">{{scope.row.status}}</span>
                </template>
              </el-table-column> 
              <el-table-column label="所属产品" align="center">
                <template slot-scope="scope">
                  <span type="success">{{scope.row.productName}}</span>
                </template>
              </el-table-column>
              <el-table-column label="节点类型" align="center">
                <template slot-scope="scope">
                  <svg-icon icon-class="iot" v-if="scope.row.nodeType==0" style="width:2rem;height:2rem"/>
                  <svg-icon icon-class="wgicon" style="width:2rem;height:2rem" v-else></svg-icon>
  
                </template>
              </el-table-column>
              <el-table-column label="启用/禁用" align="center">
                <template slot-scope="scope">
                  <el-switch
                    v-model="scope.row.isEnable"
                    active-color="#5eb058"
                    inactive-color="#cccccc"
                    @change="handelUpdate($event,scope.row,scope.$index)"
                  ></el-switch>
                </template>
              </el-table-column>
            
              <el-table-column label="最后上线时间" align="center">
                <template slot-scope="scope">
                  <span
                    v-if="scope.row.lastOnlineTime"
                  >{{timestampToTime(scope.row.lastOnlineTime)}}</span>
                  <span v-else>—</span>
                </template>
              </el-table-column>
              <el-table-column label="操作" align="center">
                <template slot-scope="scope">
                  <el-link
                    type="primary"
                    :underline="false"
                    icon="el-icon-view"
                    @click="deviceToDetail(scope.row.id)"
                  >查看</el-link>
                  <el-popover placement="top" width="300" :ref="`popover-${scope.$index}`">
                    <p>确定解除这个{{scope.row.name}}设备关联吗？</p>
                    <div style="text-align: right; margin: 0">
                      <el-button
                        size="mini"
                        @click="scope._self.$refs[`popover-${scope.$index}`].doClose()"
                      >取消</el-button>
                      <el-button type="primary" size="mini" @click="makeSure(scope)">确定</el-button>
                    </div>
                    <el-link
                      slot="reference"
                      :underline="false"
                      icon="el-icon-delete"
                      type="danger"
                    >解除关联</el-link>
                  </el-popover>
                </template>
              </el-table-column>
            </el-table>
            </div>
            <div class="elpagination" style="margin-top:20px;">
              <el-pagination
                @size-change="childrenDeviceSizeChange"
                @current-change="childrenDeviceCurrentChange"
                :page-sizes="[10, 20, 30, 50]"
                :page-size="childrenDeviceLength"
                layout="total, sizes, prev, pager, next, jumper"
                :total="childrenDeviceTotal"
              ></el-pagination>
              </div>
           </div>
           <!--添加子设备弹窗-->
           <el-dialog
              title="添加子设备"
              :visible.sync="childDialog"
              width="30%"
              :before-close="handleClose">
              <div class="childdialog"> 
                <el-form  ref="childrenForm" :model="childrenForm" class="demo-form-inline">
                <el-form-item label="产品"  prop="product"
                  :rules="[
                    { required: true, message: '选择产品', trigger: 'change' },
                  ]">
                  <el-select 
                  v-model="childrenForm.product" 
                  placeholder="产品"
                  @change="checkProduct"
                  >
                    <el-option v-for="(item,index) in allProudct" :label="item.attributes.name" :key="index" :value="item.id"></el-option>
                  </el-select>
                </el-form-item>
                <el-form-item label="设备"  prop="device"  :rules="[
                    { required: true, message: '选择设备', trigger: 'change' },
                  ]">
                  <el-select 
                  v-model="childrenForm.device"
                  placeholder="设备"
                  :disabled="!ischange"
                  >
                    <el-option v-for="(item,index) in productDevices" :key="index" :label="item.attributes.devaddr" :value="item.id"></el-option>
                  </el-select>
                </el-form-item>
              </el-form>
              </div>
              <span slot="footer" class="dialog-footer">
                <el-button @click="childDialog = false">取 消</el-button>
                <el-button type="primary" @click="submitDevice('childrenForm')">确 定</el-button>
              </span>
            </el-dialog>
         </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>
<script>
import Parse from "parse";
import { utc2beijing } from "@/utils/index";
import { timestampToTime } from "@/api/login";
import { getDev } from "@/api/systemmanage/system";
import { clearInterval } from "timers";
import { prototype } from 'stream';

export default {
  data() {
    return {
      childDialog:false,
      ninthform:{
        product:'',
        devices:''
      },
      wmxform:{
        product:'',
        devices:''
      },
      tableData: [],
      activeName: "first",
      text: "1111111",
      deviceid: "",
      devicedetail: {},
      topicData: "",
      thirdstart: 1,
      thirdlength: 10,
      thirdtotal: 0,
      topic: [
        {
          topic: "thing/${ProductId}/${DevAddr}/post",
          type: "pub",
          desc: "设备上报",
          isdef: true
        },
        {
          topic: "thing/${ProductId}/${DevAddr}",
          type: "sub",
          desc: "消息下发",
          isdef: true
        }
      ],
      thirdData: [],
      isupdate: false,
      timer: null,
      properties:[],
      isshowtable:false,
      productProperties:[],
      //子设备数据
      childrendevices:{
        devicesname:''
      },
      multipleTable:[],
      devicesTableData:[],
      childrenDeviceLength:10,
      childrenDeviceStart:0,
      childrenDeviceTotal:0,
      childrenForm:{
        product:'',
        device:''
      },
      isshowchild:false,
      allProudct:[],
      productDevices:[],
      ischange:false,
      ischildren:false,
    };
  },
  mounted() {
    this.getDeviceDetail();
  },
  methods: {
    tabHandleClick(tab){
      if(tab.name=='ninth'){
        this.$router.push({
         path:'/roles/onlinetest',
         query:{
           deviceid:this.deviceid
         }
        })
      }
    },
    timestampToTime(timestamp) {
  var date = new Date(timestamp * 1000) 
	var Y = date.getFullYear() + '-';
	var M = (date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1) + '-';
	var D = (date.getDate()+1 <= 10 ? '0'+(date.getDate()) : date.getDate()) + ' ';
	var h = (date.getHours()+1 <= 10 ? '0'+(date.getHours()) : date.getHours())  + ':';
	var m = (date.getMinutes()+1 <= 10 ? '0'+(date.getMinutes()) : date.getMinutes())  + ':';
	var s = (date.getSeconds()+1 <= 10 ? '0'+(date.getSeconds()) : date.getSeconds());
	return Y+M+D+h+m+s;
},
    getDevices(start) {
      if(start==0){
        this.childrenDeviceStart=0
      }
      this.devicesTableData = [];
      var Devices = Parse.Object.extend("Devices");
      var devices = new Parse.Query(Devices);
      devices.limit(this.childrenDeviceLength);
      devices.skip(this.childrenDeviceStart);
      devices.ascending('-updatedAt')
      if(this.childrendevices.devicesname!=''){
        devices.equalTo('devaddr',this.childrendevices.devicesname)
      }
      devices.equalTo('parentId',this.deviceid)
      devices.count().then(count => {
        this.childrenDeviceTotal = count;
        devices.find().then(resultes => {
          if (resultes) {
            resultes.map(items => {
              var obj = {};
              obj.id = items.id;
              obj.name = items.attributes.name;
              obj.lastOnlineTime = items.attributes.lastOnlineTime;
              obj.status = items.attributes.status;
              obj.originstatus = items.attributes.status;
              obj.nodeType = items.attributes.product.attributes.nodeType;
              obj.desc = items.attributes.desc;
              obj.productName = items.attributes.product.attributes.name;
              obj.devaddr = items.attributes.devaddr;
              obj.isEnable = items.attributes.isEnable;
              this.devicesTableData.push(obj);
            });
          }
        });
      });
    },
    //初始化
    getDeviceDetail() {
      this.deviceid = this.$route.query.deviceid;
      this.ischildren=this.$route.query.ischildren
      if(this.$route.query.nodeType==1&&this.ischildren==true){
          this.activeName = 'children'
          this.isshowchild = true
          this.getDevices()
          var Product = Parse.Object.extend('Product')
          var product = new Parse.Query(Product)
          product.find().then(resultes=>{
            this.allProudct = resultes
          })
      }else if(this.$route.query.nodeType==1&&this.ischildren==false){
        this.isshowchild = true
      }else{
        this.isshowchild = false
      }
      var Devices = Parse.Object.extend("Devices");
      var devices = new Parse.Query(Devices);
      devices.get(this.deviceid).then(resultes => {
        var obj = {};
        console.log(resultes)
        obj.id = resultes.id;
        obj.createdAt = utc2beijing(resultes.createdAt);
        obj.productName = resultes.attributes.product.attributes.name;
        obj.productid = resultes.attributes.product.id;
        obj.address = resultes.attributes.address;
        if (resultes.attributes.lastOnlineTime) {
          obj.lastOnlineTime = timestampToTime(
            resultes.attributes.lastOnlineTime
          );
        } else {
          obj.lastOnlineTime = "—";
        }
        if (resultes.attributes.ip) {
          obj.ip = resultes.attributes.ip;
        } else {
          obj.ip = "—";
        }
        obj.basedata = JSON.stringify(resultes.attributes.basedata);
        obj.DeviceName = resultes.attributes.name;
        obj.status = resultes.attributes.status;
        obj.desc = resultes.attributes.desc;
        obj.devaddr = resultes.attributes.devaddr;
        obj.nodeType = resultes.attributes.product.attributes.nodeType;
        obj.node = resultes.attributes.node
        obj.devType = resultes.attributes.product.attributes.devType;
        obj.productSecret = resultes.attributes.product.attributes.productSecret;
        if(resultes.attributes.product.attributes.thing){
          this.productProperties = resultes.attributes.product.attributes.thing.properties
        }else{
          this.productProperties = []
        }
        if(resultes.attributes.product.attributes.topics){
          this.topicData = resultes.attributes.product.attributes.topics.concat(
          this.topic
        );
        }else{
          this.topicData=this.topic
        }
        
        this.devicedetail = obj;
        // console.log(this.properties)
        this.Update()
      });
      
    },
    //实时刷新
    Update() {
      getDev(this.devicedetail.devaddr, this.devicedetail.productid)
        .then(resultes => {
          if (resultes) {
            console.log(resultes)
            this.thirdData.push({
              time: timestampToTime(Math.ceil(new Date().getTime() / 1000)),
              value: JSON.stringify(resultes)
            });
            this.thirdtotal = this.thirdData.length;
            this.properties = resultes.data
          }
        })
        .catch(error => {
          this.$message({
            type: "error",
            message: error.error
          });
          window.clearInterval(this.timer);
          this.isupdate = false;
        });
    },
    //定时器启动
    updateTrue(event) {
      if (event == true) {
        this.timer = window.setInterval(() => {
          this.Update();
        }, 5000);
      } else {
        window.clearInterval(this.timer);
        this.timer = null;
      }
    },
    handleSizeChange1(val) {
      this.thirdstart = 1;
      this.thirdlength = val;
    },
    handleCurrentChange1(val) {
      this.thirdstart = val;
    },
    //子设备管理表格
    DevicesSelectionChange(val){
      this.multipleTable=val
    },
    //子设备分页
    childrenDeviceCurrentChange(val){
         this.childrenDeviceStart=(val-1)*this.childrenDeviceLength
      this.getDevices()
    },
    childrenDeviceSizeChange(val){
      this.childrenDeviceLength = val
      this.getDevices()
     
    },
    checkProduct(val){
      this.ischange = true
      var Devices = Parse.Object.extend("Devices");
      var devices = new Parse.Query(Devices);
      devices.equalTo('product',val)
      devices.notEqualTo('objectId',this.deviceid)
      devices.notEqualTo('parentId',this.deviceid)
      devices.limit(1000)
      devices.find().then(response=>{
        this.productDevices = response
        this.childrenForm.device=''
      })
    },
    submitDevice(formName){
      this.$refs[formName].validate((valid) => {
          if (valid) {
             var Devices = Parse.Object.extend("Devices");
             var devices = new Parse.Query(Devices);
             var devices1 = new Devices()
              devices.get(this.childrenForm.device).then(response=>{
               devices1.id=this.deviceid
               response.set('parentId',devices1)
               response.save().then(resultes=>{
                 if(resultes){
                   this.$message({
                     type:'success',
                     message:'添加成功'
                   })
                   this.childDialog=false
                   this.getDevices()
                  this.$refs['childrenForm'].resetFields();
                 }
               })
              })
              } else {
                console.log('error submit!!');
                return false;
              }
      });
    },
    deleteDevcie(val) {
      Promise.all([
        this.multipleTable.map(item => {
          var Devices = Parse.Object.extend("Devices");
          // var devices = new Parse.Query(Devices);
          var devices1 = new Devices()
          devices1.id = item.id
          devices1.set('parentId',null)
          devices1.save().then(resultes=>{

          })
        })
      ]).then(data => {
          if(data&&data.length!=0){
             this.$message({
              message: "解除关联成功",
              type: "success"
            });
          this.getDevices()
          }else{
             this.$message({
            message: "解除关联失败",
            type: "error"
          });
          }
         
    
      }).catch(error=>{
        console.log(error)
      });
    },
    //设备多个启用和禁用
    unactiveDevice(val) {
       Promise.all([
        this.multipleTable.map(item => {
           var Devices = Parse.Object.extend("Devices");
          var devices = new Devices();
          devices.id = item.id
          devices.set('isEnable',false)
          devices.save().then(resultes=>{

          })
        })
      ]).then(data => {
          if(data&&data.length!=0){
             this.$message({
            message: "禁用成功",
            type: "success"
          });
          this.getDevices()
          }else{
             this.$message({
            message: "禁用失败",
            type: "error"
          });
          }
      }).catch(error=>{
        console.log(error)
      });
    },
    activeDevice(val) {
       Promise.all([
        this.multipleTable.map(item => {
          var Devices = Parse.Object.extend("Devices");
          var devices = new Devices();
          devices.id = item.id
          devices.set('isEnable',true)
          devices.save().then(resultes=>{

          })
        })
      ]).then(data => {
          if(data&&data.length!=0){
             this.$message({
            message: "启用成功",
            type: "success"
          });
          this.getDevices()
          }else{
             this.$message({
            message: "启用失败",
            type: "error"
          });
          }
      }).catch(error=>{
        console.log(error)
      });
    },
     /*el-popover点击关闭*/
    makeSure(scope) {
      // 可以在这里执行删除数据的回调操作.......删除操作.....
      var Devices = Parse.Object.extend("Devices");
      // var devices1 = new Devices()
      var devices1 = new Devices()
      devices1.id = scope.row.id
      devices1.set('parentId',null)
      devices1.save().then(
          response => {
            if (response) {
              this.$message({
                type: "success",
                message: "解除关联成功"
              });
              scope._self.$refs[`popover-${scope.$index}`].doClose();
              this.getDevices();
            }
          },
          error => {
            this.$message({
              type: "error",
              message: error.message
            });
          }
        );
    },
    handelUpdate(event, row, index) {
      var newData1 = {};
      for (var key in row) {
        newData1[key] = row[key];
      }
      newData1.isEnable = newData1.isEnable == true ? false : true;
      this.devicesTableData[index] = newData1;
      this.$confirm("是否修改此设备状态?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          var newData2 = {};
          for (var key in row) {
            newData2[key] = row[key];
          }
          newData2.isEnable = newData2.isEnable == true ? true : false;
          //   this.tableData[index] = newData2
          var Devices = Parse.Object.extend("Devices");
          var devices = new Parse.Query(Devices);
          devices.get(row.id).then(object => {
            object.set("isEnable", newData2.isEnable);
            object.save().then(resultes => {
              this.$message({
                type: "success",
                message: "状态修改成功"
              });
            });
            this.getDevices();
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消修改"
          });
          let newData = row;
          newData.isEnable = newData.isEnable == true ? false : true;
          this.devicesTableData[index] = newData;
        });
    },
  },
  //清除定时器
  destroyed(){
      window.clearInterval(this.timer)
      this.timer = null
  }
};
</script>
<style scoped>
.editdevices {
  height: 100%;
  width: 100%;
  padding: 20px;
  box-sizing: border-box;
}
.editdevices .OFFLINE{
  color:red;
}
.editdevices .ACTIVE,.editdevices .ONLINE{
  color:green
}
.mailtable .cloumn {
  text-align: left;
  background: #fafafc;
  color: #74777a;

  font-weight: bold;
  border-right: 1px solid #ebecec;
  border-bottom: 1px solid #ebecec;
}
.editdevices .updatedtable{
    width: 300px;
    height: 150px;
    margin: 20px 20px 0 0;
    border: 1px solid #cccccc;
    /* text-align: center; */
    border-radius: 5px;
    font-size: 14px;
    box-shadow: 10px 10px 10px 5px grey;
    list-style: none;
    line-height: 40px;
    /* letter-spacing: 1px; */
    padding-left: 20px;
    box-sizing: border-box;
}
.editdevices .buttonactive{
  background-color:#409EFF;
  color:white;
}
.mailtable td {
  padding: 15px;
  font-size: 14px;
  text-align: left;
  box-sizing: border-box;
  color: #74777a;
  border: 1px solid #ebecec;
}
.childrendevices{
  width:100%;
  height:auto;
  padding:10px;
  box-sizing: border-box;
  background:white;
}
</style>
<style>
.editdevices .el-tabs__item {
  font-size: 16px;
  margin-top: 20px;
  margin: 0;
  height: 50px;
  line-height: 50px;
  font-family: auto;
}
.editdevices .el-tabs__content {
  background: #f4f4f4;
  padding: 20px;
  box-sizing: border-box;
}
.editdevices .childrendevices .el-form-item:last-child{
  float:right;
}
.editdevices .childdialog .el-form-item__content{
  clear:both;
}
.editdevices .childdialog .el-form-item__content .el-select{
  width:100%;
}
</style>

