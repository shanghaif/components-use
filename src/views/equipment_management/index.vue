<template>
  <div class="equipment">
    <h3 style="margin:0;">设备统计</h3>
    <div class="equ_header">
      <ul>
        <!-- <li>
          <el-select v-model="equvalue" placeholder="请选择">
             <el-option v-for="(item,index) in proTableData" :label="item.name" :key="index" :value="item.id"></el-option>
          </el-select>
        </li>-->
        <li>
          <p>
            设备总数
            <el-tooltip content="当前指定产品设备总数" placement="top">
              <i class="el-icon-question"></i>
            </el-tooltip>
          </p>
          <span>{{devicetotal}}</span>
        </li>
        <li>
          <p>
            <span
              style="height:5px;width:5px;border-radius:5px;background:#409eff;display:inline-block;vertical-align:middle;margin-right:5px;"
            ></span>激活设备
            <el-tooltip content="当前已激活设备总数" placement="top">
              <i class="el-icon-question"></i>
            </el-tooltip>
          </p>
          <span>{{activeall}}</span>
        </li>
        <li>
          <p>
            <span
              style="height:5px;width:5px;border-radius:5px;background:#67c23a;display:inline-block;vertical-align:middle;margin-right:5px;"
            ></span>在线设备
            <el-tooltip content="当前指在线设备总数" placement="top">
              <i class="el-icon-question"></i>
            </el-tooltip>
          </p>
          <span>{{onlineall}}</span>
        </li>
        <li>
          <!-- <el-button type="info">刷新</el-button> -->
        </li>
      </ul>
    </div>
    <div class="equtabs">
      <!--tabs第一个标签页-->
      <el-tabs v-model="activeName" @tab-click="handleClick">
        <el-tab-pane label="设备管理" name="first">
          <div>
            <div style="text-align:right">
              <el-button>批量添加</el-button>
              <el-button type="primary" @click="devicedialogVisible=true">添加设备</el-button>
            </div>
          </div>
          <div style="margin-top:20px;" class="equdevices">
            <el-select v-model="equvalue" placeholder="请选择" class="selectdetail">
              <el-option
                v-for="(item,index) in proTableData"
                :label="item.name"
                :key="index"
                :value="item.id"
              ></el-option>
            </el-select>
            <el-select v-model="selectdevice" class="selectdetail">
              <el-option value="设备名称"></el-option>
              <el-option value="设备编号"></el-option>
            </el-select>
            <el-input v-model="deviceinput" placeholder="请输入设备名称" v-if="selectdevice=='设备名称'" class="selectdetail"></el-input>
            <el-input v-model="deviceinput" placeholder="请输入设备编号" v-else class="selectdetail"></el-input>
            <!-- <el-input v-model="devicenumber" placeholder="请输入设备编号" style="margin:0;"></el-input> -->
            <el-button type="primary" @click="getDevices(0)" class="selectdetail">查 询</el-button>
            <el-button type="primary" :disabled="multipleTable.length==0" @click="deleteDevcie" class="selectdetail">删 除</el-button>
            <el-button type="primary" :disabled="multipleTable.length==0" @click="unactiveDevice" class="selectdetail">禁 用</el-button>
            <el-button type="primary" :disabled="multipleTable.length==0" @click="activeDevice" class="selectdetail">启 用</el-button>
          </div>
          <!--第一个表格-->
          <div class="tabstable">
            <el-table
              ref="filterTable"
              :data="tableData"
              style="width: 100%;text-align:center;margin-top:20px;"
              @selection-change="handleSelectionChange"
              :row-style="rowClass"
            >
              <el-table-column type="selection" align="center" width="55"></el-table-column>
              <el-table-column label="设备编号/名称" align="center">
                <template slot-scope="scope">
                  <span  >{{scope.row.devaddr}}</span>
                  <p  style="margin:0;color:green">{{scope.row.name}}</p>
                </template>
              </el-table-column>
                <el-table-column label="状态" align="center">
                <template slot-scope="scope">
                  <span  :class="scope.row.status" v-if="scope.row.status=='ACTIVE'">已激活</span><el-tooltip content="设备已注册" placement="top" v-if="scope.row.status=='ACTIVE'">
                <i class="el-icon-question"></i>
              </el-tooltip>
               
                  <span  :class="scope.row.status" v-if="scope.row.status=='UNACTIVE'">未激活</span><el-tooltip content="设备已注册" placement="top" v-if="scope.row.status=='UNACTIVE'">
                  <i class="el-icon-question"></i>
                </el-tooltip>
                  <span  :class="scope.row.status" v-if="scope.row.status=='ONLINE'">在线</span><el-tooltip content="设备已经上线" placement="top" v-if="scope.row.status=='ONLINE'">
                <i class="el-icon-question"></i>
              </el-tooltip>
                  <span  :class="scope.row.status" v-if="scope.row.status=='OFFLINE'">离线</span>
                  <el-tooltip content="设备已经离线" placement="top" v-if="scope.row.status=='OFFLINE'">
                <i class="el-icon-question"></i>
              </el-tooltip>
                </template>
              </el-table-column>
              <!-- <el-table-column label="设备名称" width="180" show-overflow-tooltip align="center">
                <template slot-scope="scope">
                  <span>{{scope.row.name}}</span>
                 <span v-else>{{scope.row.desc}}</span> 
                </template>
              </el-table-column>-->
              <el-table-column label="所属产品" align="center">
                <template slot-scope="scope">
                  <span type="success">{{scope.row.productName}}</span>
                </template>
              </el-table-column>
              <el-table-column label="节点类型" align="center">
                <template slot-scope="scope">
                  <svg-icon icon-class="iot" v-if="scope.row.nodeType==0" style="width:2rem;height:2rem"/>
                  <svg-icon icon-class="wgicon" style="width:2rem;height:2rem" v-else></svg-icon>
                  <!-- <el-tag type="success" >设备</el-tag>
                  <el-tag type="success" v-else>网关</el-tag> -->
                </template>
              </el-table-column>
              <el-table-column label="启用/禁用" align="center">
                <template slot-scope="scope">
                  <!-- <span
                    style="display:inline-block;width:5px;height:5px;border-radius:50%;background:#cccccc;vertical-align:middle"
                    v-if="scope.row.isEnable==false"
                  ></span>
                  <span v-if="scope.row.isEnable==false">已禁用</span>
                  <span
                    style="display:inline-block;width:5px;height:5px;border-radius:50%;background:#5eb058;vertical-align:middle"
                    v-if="scope.row.isEnable==true"
                  ></span>
                  <span v-if="scope.row.isEnable==true">已启用</span> -->
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
                    @click="deviceToDetail(scope.row)"
                  >查看</el-link>
                  <el-popover placement="top" width="300" :ref="`popover-${scope.$index}`">
                    <p>确定删除这个{{scope.row.name}}设备吗？</p>
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
                    >删除</el-link>
                  </el-popover>
                  <el-link
                    type="primary"
                    :underline="false"
                    icon="el-icon-s-unfold"
                    v-if="scope.row.nodeType==1"
                    @click="deviceToChildren(scope.row)"
                  >子设备</el-link>
                </template>
              </el-table-column>
            </el-table>
            <div class="elpagination" style="margin-top:20px;">
              <el-pagination
                @size-change="deviceSizeChange"
                @current-change="deviceCurrentChange"
                :page-sizes="[10, 20, 30, 50]"
                :page-size="devicelength"
                layout="total, sizes, prev, pager, next, jumper"
                :total="devicetotal"
              ></el-pagination>
            </div>
          </div>
        </el-tab-pane>
        <el-tab-pane label="批次管理" name="second">
          <el-table :data="pctableData"  style="width: 100%;text-align:center">
            <el-table-column type="index" label="序号" align="center" width="50"></el-table-column>
            <el-table-column label="批次名称" align="center">
              <template slot-scope="scope">
                <span>{{scope.row.attributes.data.batch_name}}</span>
              </template>
            </el-table-column>
            <el-table-column align="center" label="创建时间">
              <template slot-scope="scope">
                <span>{{utc2beijing(scope.row.createdAt)}}</span>
              </template>
            </el-table-column>
            <!-- <el-table-column label="操作" align="center" width="300">
              <template slot-scope="scope">
                <el-button
                  type="primary"
                  @click="updatebatch(scope.row,scope.row.id)"
                  size="mini"
                >编辑</el-button>
                <el-button type="danger" @click="deletebatch(scope.row.id)" size="mini">删除</el-button>
                <el-button
                  type="success"
                  @click="selectbatch(scope.row,scope.row.id)"
                  size="mini"
                >选择</el-button>
              </template>
            </el-table-column>-->
          </el-table>
        </el-tab-pane>
      </el-tabs>
      <!--添加设备弹窗-->
      <el-dialog
        title="添加设备"
        :visible.sync="devicedialogVisible"
        width="50%"
        :before-close="handleClose"
      >
        <div slot="title" class="header-title">
          <span class="title-name">
            添加设备
            <el-tooltip content="创建设备后可以使用平台颁发的身份信息连接到平台" placement="top" style="margin-left:5px">
              <i class="el-icon-question"></i>
            </el-tooltip>
          </span>
        </div>
        <div class="devicecontent">
          <el-form ref="deviceform" :model="deviceform" label-width="80px" :rules="rules">
            <el-form-item label="设备名称" prop="name">
              <el-input v-model="deviceform.name"></el-input>
            </el-form-item>
            <el-form-item label="设备编号" prop="devaddr">
              <el-input v-model="deviceform.devaddr"></el-input>
            </el-form-item>
            <el-form-item label="设备批次" prop="batchId">
              <el-input v-model="deviceform.batchId" disabled>
                <i slot="suffix" class="el-icon-plus" @click="addDeviceBatch"></i>
              </el-input>
            </el-form-item>
            <!-- <el-form-item label="节点类型" prop="nodeType">
              <el-select v-model="deviceform.nodeType" placeholder="请选择节点类型">
                <el-option label="采集器" :value="0"></el-option>
                <el-option label="终端设备" :value="1"></el-option>
              </el-select>
            </el-form-item>-->
            <!-- <el-form-item label="设备类型" prop="devType">
                <el-input v-model="deviceform.devType" placeholder="请输入设备类型"></el-input>
            </el-form-item>-->
            <el-form-item label="产品名称" prop="productName">
              <el-select v-model="deviceform.productName" placeholder="请选择产品名称">
                <el-option
                  v-for="(item,index) in proTableData1"
                  :label="item.name"
                  :key="index"
                  :value="item.id"
                ></el-option>
              </el-select>
            </el-form-item>
            <!-- <el-form-item label="父级设备" prop="fathername">
              <el-input v-model="deviceform.fathername"></el-input>
            </el-form-item>-->
            <el-form-item label="资产编号">
              <el-input v-model="deviceform.assetNum"></el-input>
            </el-form-item>
            <el-form-item label="设备型号">
              <el-input v-model="deviceform.devModel"></el-input>
            </el-form-item>
            <el-form-item label="设备品牌">
              <el-input v-model="deviceform.brand"></el-input>
            </el-form-item>
            <el-form-item label="安装位置">
              <el-input v-model="deviceform.address"></el-input>
            </el-form-item>
            <el-form-item label="备注">
              <el-input
                type="textarea"
                v-model="deviceform.desc"
                :autosize="{ minRows: 4, maxRows: 4}"
              ></el-input>
            </el-form-item>
          </el-form>
        </div>
        <span slot="footer" class="dialog-footer">
          <el-button type="primary" @click="submitForm('deviceform')">确 定</el-button>
          <el-button @click="devicedialogVisible = false">取 消</el-button>
        </span>
      </el-dialog>
      <!--第二个个弹窗批次添加-->
      <el-dialog
        title="批次添加"
        :visible.sync="pcdialogVisible"
        width="50%"
        :before-close="handleClose1"
      >
        <div class="pccontent">
          <el-form :inline="true" :model="pcformInline" class="demo-form-inline">
            <el-form-item label="批次名称">
              <el-input v-model="pcformInline.pcname" placeholder="批次名称"></el-input>
            </el-form-item>
            <el-form-item label="创建时间">
              <el-date-picker
                v-model="pcformInline.createdtime"
                type="datetime"
                placeholder="选择创建日期时间"
              ></el-date-picker>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="addbatch">创建批次</el-button>
            </el-form-item>
          </el-form>
          <el-table :data="pctableData" height="450" style="width: 100%;text-align:center">
            <el-table-column type="index" label="序号" align="center" width="50"></el-table-column>
            <el-table-column label="批次名称" align="center">
              <template slot-scope="scope">
                <span>{{scope.row.attributes.data.batch_name}}</span>
              </template>
            </el-table-column>
            <el-table-column align="center" label="创建时间">
              <template slot-scope="scope">
                <span>{{utc2beijing(scope.row.createdAt)}}</span>
              </template>
            </el-table-column>
            <el-table-column label="操作" align="center" width="300">
              <template slot-scope="scope">
                <el-button
                  type="primary"
                  @click="updatebatch(scope.row,scope.row.id)"
                  size="mini"
                >编辑</el-button>
                <el-button type="danger" @click="deletebatch(scope.row.id)" size="mini">删除</el-button>
                <el-button
                  type="success"
                  @click="selectbatch(scope.row,scope.row.id)"
                  size="mini"
                >选择</el-button>
              </template>
            </el-table-column>
          </el-table>
        </div>
      </el-dialog>
    </div>
  </div>
</template>
<script>
import Parse from "parse";
import { Promise } from "q";
export default {
  data() {
    return {
      onlineall:'',
      activeall:'',
      userId: "",
      batchid: "",
      pcdialogVisible: false,
      devicedialogVisible: false,
      equvalue: "0",
      cities: [],
      activeName: "first",
      selectdevice: "设备名称",
      deviceinput: "",
      devicenumber: "",
      multipleTable: [],
      selectRow: [],
      devicelength: 10,
      devicestart: 0,
      devicetotal: 0,
      visible2: false,
      deviceform: {
        name: "",
        devaddr: "",
        batchId: "",
        desc: "",
        nodeType: 0,
        devType: "",
        netType: "",
        assetNum: "",
        devModel: "",
        address: "",
        productName: ""
      },
      rules: {
        name: [{ required: true, message: "请输入设备名称", trigger: "blur" }],
        devaddr: [
          { required: true, message: "请输入设备编号", trigger: "blur" }
        ],
        batchId: [
          { required: true, message: "请输入设备批次", trigger: "blur" }
        ],
        nodeType: [
          { required: true, message: "请输入设备类型", trigger: "blur" }
        ],
        netType: [
          { required: true, message: "请选择网络格式", trigger: "change" }
        ],
        devType: [
          { required: true, message: "请选择设备类型", trigger: "change" }
        ],
        productName: [
          { required: true, message: "请选择产品名称", trigger: "change" }
        ]
      },
      pcformInline: {
        pcnumber: "",
        pcname: "",
        createdtime: ""
      },
      pctableData: [],

      tableData: [],
      options: [],
      proTableData: [],
      proTableData1: [],
      activelength:[],
      onlinelength:[]
    };
  },
  watch: {
    multipleTable(data) {
      this.selectRow = [];
      if (data.length > 0) {
        data.forEach((item, index) => {
          this.selectRow.push(this.tableData.indexOf(item));
        });
      }
    }
  },
  mounted() {
    this.userId = Parse.User.current().id;
    console.log(this.userId);
    this.getRole();
    this.searchProduct();
    
  },
  methods: {
    //激活设备
    getActiveDevices(){
      var Devices = Parse.Object.extend("Devices");
      var devices = new Parse.Query(Devices);
      devices.equalTo('status','ACTIVE')
      if (this.deviceinput != "") {
        if (this.selectdevice == "设备名称") {
          devices.equalTo("name", this.deviceinput);
        } else {
          devices.equalTo("devaddr", this.deviceinput);
        }
      }
      if (this.devicenumber != "") {
        devices.equalTo("devaddr", this.devicenumber);
      }
      if (this.equvalue != 0) {
        devices.equalTo("product", this.equvalue);
      }
      devices.count().then(active=>{
        this.activeall = active
      })
    },
    getOnlineDevices(){
      var Devices = Parse.Object.extend("Devices");
      var devices = new Parse.Query(Devices);
      devices.equalTo('status','ONLINE')
      if (this.deviceinput != "") {
        if (this.selectdevice == "设备名称") {
          devices.equalTo("name", this.deviceinput);
        } else {
          devices.equalTo("devaddr", this.deviceinput);
        }
      }
      if (this.devicenumber != "") {
        devices.equalTo("devaddr", this.devicenumber);
      }
      if (this.equvalue != 0) {
        devices.equalTo("product", this.equvalue);
      }
      devices.count().then(online=>{
        this.onlineall = online
      })
    },
     
    //查询产品
    searchProduct() {
      this.proTableData = [];
      this.proTableData1 = [];
      var Product = Parse.Object.extend("Product");
      var product = new Parse.Query(Product);
      product.limit(10000);
      product.find().then(
        resultes => {
          resultes.map(items => {
            var obj = {};
            obj.id = items.id;
            obj.name = items.attributes.name;
            this.proTableData.push(obj);
            this.proTableData1.push(obj);
          });
          this.proTableData.unshift({ name: "全部产品", id: "0" });
          if (this.$route.query.productid) {
            this.equvalue = this.$route.query.productid;
          }
          this.getDevices();
        },
        error => {
          this.$message({
            type: "error",
            message: error.message
          });
        }
      );
    },
    //查询设备
    getDevices(start) {
      if(start==0){
        this.devicestart=0
      }
      this.tableData = [];
      var Devices = Parse.Object.extend("Devices");
      var devices = new Parse.Query(Devices);
      if (this.deviceinput != "") {
        if (this.selectdevice == "设备名称") {
          devices.equalTo("name", this.deviceinput);
        } else {
          devices.equalTo("devaddr", this.deviceinput);
        }
      }
      if (this.devicenumber != "") {
        devices.equalTo("devaddr", this.devicenumber);
      }
      if (this.equvalue != 0) {
        devices.equalTo("product", this.equvalue);
      }

      devices.limit(this.devicelength);
      devices.skip(this.devicestart);
      devices.ascending('-updatedAt')
      devices.count().then(count => {
        this.devicetotal = count;
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
              this.tableData.push(obj);
            });
            this.getActiveDevices()
            this.getOnlineDevices()
          }
        });
      });
    },
    //状态设备编辑
    handelUpdate(event, row, index) {
      var newData1 = {};
      for (var key in row) {
        newData1[key] = row[key];
      }
      newData1.isEnable = newData1.isEnable == true ? false : true;
      this.tableData[index] = newData1;
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
          this.tableData[index] = newData;
        });
    },
    timestampToTime(timestamp) {
      var date = new Date(timestamp * 1000);
      var Y = date.getFullYear() + "-";
      var M =
        (date.getMonth() + 1 <= 10
          ? "0" + (date.getMonth() + 1)
          : date.getMonth() + 1) + "-";
      var D =
        (date.getDate() + 1 <= 10 ? "0" + date.getDate() : date.getDate()) +
        " ";
      var h =
        (date.getHours() + 1 <= 10 ? "0" + date.getHours() : date.getHours()) +
        ":";
      var m =
        (date.getMinutes() + 1 <= 10
          ? "0" + date.getMinutes()
          : date.getMinutes()) + ":";
      var s =
        date.getSeconds() + 1 <= 10
          ? "0" + date.getSeconds()
          : date.getSeconds();
      return Y + M + D + h + m + s;
    },
    //得到权限
    getRole() {
      this.options = [];
      var roles = Parse.Object.extend("_Role");
      var query = new Parse.Query(roles);
      query.find().then(resultes => {
        resultes.map(item => {
          var obj = {};
          obj.objectId = item.id;
          obj.alias = item.attributes.alias;
          obj.name = item.attributes.name;
          this.options.push(obj);
        });
      });
    },
    utc2beijing(utc_datetime) {
      // 转为正常的时间格式 年-月-日 时:分:秒
      var date = new Date(+new Date(utc_datetime) + 8 * 3600 * 1000)
        .toISOString()
        .replace(/T/g, " ")
        .replace(/\.[\d]{3}Z/, "");
      return date; // 2017-03-31 16:02:06
    },
    filterTag(value, row) {
      return row.tag === value;
    },
    /*设备列表选中 */
    handleSelectionChange(val) {
      this.multipleTable = val;
      console.log(this.multipleTable)
    },
    //删除设备
    deleteDevcie(val) {
      Promise.all([
        this.multipleTable.map(item => {
          var Devices = Parse.Object.extend("Devices");
          var devices = new Parse.Query(Devices);
          devices.get(item.id).then(resultes => {
            resultes.destroy().then(resultes => {

            });
          });
        })
      ]).then(data => {
          if(data.length!=0){
             this.$message({
            message: "删除成功",
            type: "success"
          });
          this.getDevices()
          }else{
             this.$message({
            message: "删除失败",
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
    /*@pamras 选中高亮*/
    rowClass({ row, rowIndex }) {
      if (this.selectRow.includes(rowIndex)) {
        console.log(rowIndex);
        return { "background-color": "rgba(185, 221, 249, 0.3)" };
      }
    },
    /*@param deviceSizeChange 设备列表分页*/

    deviceSizeChange(val) {
      this.devicelength = val;
      this.getDevices()
    },
    deviceCurrentChange(val) {
      this.devicestart = (val - 1) * this.devicelength;
      this.getDevices()
    },
    /*关闭添加设备弹窗*/
    handleClose() {
      this.devicedialogVisible = false;
    },
    /*关闭批次弹窗*/
    handleClose1() {
      this.pcdialogVisible = false;
      this.batchid = "";
      this.pcformInline = {
        pcname: "",
        createdtime: ""
      };
    },
    /*el-popover点击关闭*/
    makeSure(scope) {
      // 可以在这里执行删除数据的回调操作.......删除操作.....
      var Devices = Parse.Object.extend("Devices");
      var devices = new Parse.Query(Devices);
      devices.get(scope.row.id).then(resultes => {
        resultes.destroy().then(
          response => {
            if (response) {
              this.$message({
                type: "success",
                message: "删除成功"
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
      });
    },
    //增加批次
    addDeviceBatch() {
      this.pcdialogVisible = true;
      var Datas = Parse.Object.extend("Datas");
      var datas = new Parse.Query(Datas);
      datas.equalTo("type", "batch_number");
      datas.ascending("-createdAt");
      datas.find().then(
        resultes => {
          if (resultes) {
            this.pctableData = resultes;
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
    /*device添加表单提交*/
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          var Devices = Parse.Object.extend("Devices");
          var devices = new Devices();
          var Product = Parse.Object.extend("Product");
          var product = new Product();
          var Datas = Parse.Object.extend("Datas");
          var datas = new Datas();
          var acl = new Parse.ACL();
          datas.id = this.batchid;
          product.id = this.deviceform.productName;
          devices.set("product", product);
          devices.set("batchId", datas);
          this.options.map(items => {
            acl.setRoleReadAccess(items.name, true);
            acl.setRoleWriteAccess(items.name, true);
          });
          devices.set("ACL", acl);
          devices.set("devaddr", this.deviceform.devaddr);
          devices.set("name", this.deviceform.name);
          devices.set("assetNum", this.deviceform.assetNum);
          devices.set("devModel", this.deviceform.devModel);
          devices.set("brand", this.deviceform.brand);
          devices.set("address", this.deviceform.address);
          devices.set("desc", this.deviceform.desc);
          devices.set("status", "OFFLINE");
          devices.set('isEnable',false)
          devices.save().then(resultes => {
            if (resultes) {
              this.$message({
                type: "success",
                message: "设备添加成功"
              });
              this.devicedialogVisible = false;
              this.batchid = "";
              this.getDevices();
              this.$refs["deviceform"].resetFields();
              this.deviceform.assetNum = "";
              this.deviceform.devModel = "";
              this.deviceform.address = "";
              this.deviceform.desc = "";
              this.deviceform.brand = ""
            }
          });
        } else {
          this.$message({
            type: "error",
            message: "请按照要求填写参数"
          });
          return false;
        }
      });
    },
    /*@pamars addbatch添加批次名称 */
    addbatch() {
      if (this.batchid == "") {
        var Datas = Parse.Object.extend("Datas");
        var datas = new Datas();
        var acl = new Parse.ACL();
        datas.set("data", {
          batch_name: this.pcformInline.pcname,
          createdtime: Math.ceil(this.pcformInline.createdtime / 1000)
        });
        datas.set("type", "batch_number");
        acl.setReadAccess(this.userId, true);
        acl.setWriteAccess(this.userId, true);
        datas.set("ACL", acl);
        datas.save().then(
          resultes => {
            this.$message({
              message: "新增成功",
              type: "success"
            });
            this.addDeviceBatch();
          },
          error => {
            this.$message({
              type: "error",
              message: error.message
            });
          }
        );
      } else {
        var Datas = Parse.Object.extend("Datas");
        var datas = new Parse.Query(Datas);
        datas.get(this.batchid).then(response => {
          response.set("data", {
            batch_name: this.pcformInline.pcname,
            createdtime: Math.ceil(this.pcformInline.createdtime / 1000)
          });
          response.save().then(
            resultes => {
              if (resultes) {
                this.$message({
                  message: "修改成功",
                  type: "success"
                });
                this.batchid = "";
                this.pcformInline = {
                  pcname: "",
                  createdtime: ""
                };
                this.addDeviceBatch();
              }
            },
            error => {
              this.$message({
                type: "error",
                message: error.message
              });
            }
          );
        });
      }
    },
    //编辑批次
    updatebatch(row, id) {
      // this.pcdialogVisible=true
      this.pcformInline.pcname = row.attributes.data.batch_name;
      this.pcformInline.createdtime = row.attributes.data.createdtime * 1000;
      this.batchid = id;
    },
    //删除批次
    deletebatch(id) {
      var Datas = Parse.Object.extend("Datas");
      var datas = new Parse.Query(Datas);
      datas.get(id).then(resultes => {
        resultes.destroy().then(
          res => {
            if (res) {
              this.$message({
                type: "success",
                message: "删除成功"
              });
              this.addDeviceBatch();
            }
          },
          error => {
            this.$message({
              type: "error",
              message: error.message
            });
          }
        );
      });
    },
    //选择批次
    selectbatch(row, id) {
      this.batchid = id;
      this.deviceform.pc = row.attributes.data.batch_name;
      this.deviceform.batchId = row.attributes.data.batch_name;
      this.pcdialogVisible = false;
    },
    //设备详情
    deviceToDetail(row) {
      this.$router.push({
        path: "/roles/editdevices",
        query: {
          deviceid: row.id,
          nodeType:row.nodeType,
          ischildren:false,
        }
      });
    },
    handleClick(tab, event) {
      if (tab.name == "second") {
        var Datas = Parse.Object.extend("Datas");
        var datas = new Parse.Query(Datas);
        datas.equalTo("type", "batch_number");
        datas.ascending("-createdAt");
        datas.find().then(
          resultes => {
            if (resultes) {
              this.pctableData = resultes;
            }
          },
          error => {
            this.$message({
              type: "error",
              message: error.message
            });
          }
        );
      }
    },
    //前往子设备
    deviceToChildren(row){
       this.$router.push({
        path: "/roles/editdevices",
        query: {
          deviceid: row.id,
          nodeType:row.nodeType,
          ischildren:true,    
        }
      });
    }
  }
};
</script>
<style lang="scss" scoped>
.equipment {
  height: 100%;
  width: 100%;
  padding: 20px;
  box-sizing: border-box;
  .equ_header {
    height: 60px;
    width: 100%;
    padding-left: 40px;
    box-sizing: border-box;
    ul {
      padding-left: 20px;
      box-sizing: border-box;
      display:flex;
      li {
        width:200px;
        list-style: none;
        height: 60px;
        text-align: center;
        border-right: 1px solid #cccccc;
        // &:first-child {
        //   width: 15%;
        //   text-align: left;
        //   line-height: 60px;
        // }
        &:last-child {
          border: 0;
          float: right;
          text-align: right;
        }
        &:nth-child(4) {
          border: 0;
        }
        p {
          line-height: 0;
          font-size: 14px;
          color: #666666;
        }
      }
    }
  }
}
</style>
<style>
.equipment .el-tabs__item {
  font-size: 16px;
  margin-top: 20px;
  margin: 0;
  height: 50px;
  line-height: 50px;
  font-family: auto;
}
.equipment .el-tabs__header {
  margin: 0;
}
.equipment .el-tabs__content {
  background: #f4f4f4;
  padding: 20px;
  box-sizing: border-box;
}
.equipment #pane-first {
  background: #ffffff;
  padding: 10px;
  box-sizing: border-box;
}
.equipment #pane-second {
  background: #ffffff;
  padding: 10px;
  box-sizing: border-box;
}
.equipment #pane-first .equdevices .el-input {
  width: 200px;
}
 
.equipment .el-dialog__footer {
  border-top: 1px solid #cccccc;
}
.equipment .devicecontent .el-form {
  display: flex;
  flex-wrap: wrap;
}
.equipment .devicecontent .el-form .el-input--suffix .el-input__inner {
  padding: 0 15px;
}
.equipment .devicecontent .el-form .el-icon-plus {
  width: 40px;
  height: 40px;
  background: cornflowerblue;
  line-height: inherit;
  margin-right: -4px;
  color: white;
  cursor: pointer;
}
.equipment .devicecontent .el-form .el-form-item {
  width: 50%;
}
.equipment .devicecontent .el-form .el-form-item:last-child {
  width: 100%;
}
.equipment .devicecontent .el-form .el-select {
  width: 100%;
}.equipment .ACTIVE,.equipment .ONLINE{
  color:green
}
.equipment .OFFLINE,.equipment .UNACTIVE{
  color:red;
}
.equipment .selectdetail{
  margin:10px 0;
}
/* .equipment .devicecontent .el-form .el-form-item .is-required:not(.is-no-asterisk):after{
    content: '*';
    color: #F56C6C;
    margin-right: 4px;
} */
/* .equipment .devicecontent .el-form .el-form-item__label:before{
    content:''
}
.equipment .devicecontent .el-form .el-form-item__label:after{
    content: '*';
    color: #F56C6C;
    margin-right: 4px;
} */
</style>

