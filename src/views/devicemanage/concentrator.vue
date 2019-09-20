<template>
  <div class="concentrator">
    <div class="top">
      <label for>{{ $t('concentrator.concentrator') }}:</label>
      <el-input v-model="vcaddr" placeholder="请输入集中器地址" style="width:200px;"></el-input>
      <el-button
        type="primary"
        style="margin-left:20px;"
        @click="getAllConcentrator"
      >{{ $t('concentrator.search') }}</el-button>
    </div>
    <div class="section">
      <!-- <el-button type="primary" icon="el-icon-plus" @click="uploadadd">{{ $t('concentrator.add') }}</el-button> -->
      <el-button plain @click="startdev">{{ $t('concentrator.start') }}</el-button>
      <el-button plain @click="stop">{{ $t('concentrator.end') }}</el-button>
      <el-button plain @click="checktime">{{ $t('concentrator.checktime') }}</el-button>
    </div>
    <template>
      <el-table
        ref="multipleTable"
        :data="tableData3"
        tooltip-effect="dark"
        style="width:100%;text-align:center;"
        @selection-change="handleSelectionChange"
        v-loading="loading"
      >
        <el-table-column type="selection" align="center" width="50"></el-table-column>
        <el-table-column prop :label="$t('concentrator.status')" align="center" width="100">
          <template slot-scope="scope">
            <div
              v-if="scope.row.attributes.jsondata.isonline==true"
              style="width:10px;height:10px;border-radius:50%;display:inline-block;background:#00cc33;margin-right:10px"
            ></div>
            <span
              v-if="scope.row.attributes.jsondata.isonline==true"
              style="color:#00cc33"
            >{{$t('concentrator.isonline')}}</span>
            <div
              v-if="!scope.row.attributes.jsondata.isonline"
              style="width:10px;height:10px;border-radius:50%;display:inline-block;background:#f00;margin-right:10px"
            ></div>
            <span
              v-if="!scope.row.attributes.jsondata.isonline"
              style="color:#f00"
            >{{$t('concentrator.notonline')}}</span>
          </template>
        </el-table-column>
        <el-table-column :label="$t('concentrator.concentrator')" align="center">
          <template slot-scope="scope">
            <span>{{scope.row.attributes.vcaddr}}</span>
          </template>
        </el-table-column>
        <el-table-column  :label="$t('concentrator.courts')" align="center">
          <template slot-scope="scope">
            <span>{{scope.row.attributes.jsondata.address}}</span>
          </template>
        </el-table-column>
        <el-table-column :label="$t('concentrator.onlinemeter')" sortable align="center">
          <template slot-scope="scope">
            <span>{{(scope.row.attributes.jsondata.online ? scope.row.attributes.jsondata.online:0)+"/"+((scope.row.attributes.jsondata.offline ? scope.row.attributes.jsondata.offline : 0)+ (scope.row.attributes.jsondata.online ? scope.row.attributes.jsondata.online:0))}}</span>
          </template>
        </el-table-column>
        <el-table-column prop :label="$t('concentrator.connection')" align="center" width="100">
          <template slot-scope="scope">
            <el-switch
              v-model="value6"
              active-color="#13ce66"
              v-if="scope.row.attributes.jsondata.iscon==true"
              disabled
            ></el-switch>
            <el-switch v-if="scope.row.attributes.jsondata.iscon!=true" v-model="value7" active-color="#cccccc" disabled></el-switch>
          </template>
        </el-table-column>
        <el-table-column  :label="$t('concentrator.time')" align="center">
          <template slot-scope="scope">
            <span>{{timestampToTime(scope.row.attributes.vctime)}}</span>
          </template>
        </el-table-column>
        <el-table-column prop :label="$t('concentrator.operation')" align="center" width="300">
          <template slot-scope="scope">
            <el-button
              plain
              size="mini"
              @click="connect(scope.row.attributes.vcaddr)"
            >{{$t('concentrator.connect')}}</el-button>
            <el-button
              size="mini"
              @click="handleEdit(scope.$index,scope.row.attributes,scope.row.id)"
            >{{$t('concentrator.edit')}}</el-button>
            <el-button
              size="mini"
              type="primary"
              @click="handledetail(scope.$index, scope.row.attributes)"
            >{{$t('concentrator.detail')}}</el-button>
          </template>
        </el-table-column>
      </el-table>
    </template>
    <div class="block">
      <el-pagination
        background
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :page-sizes="[10, 25, 50, 100]"
        :page-size="length"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
      ></el-pagination>
    </div>
    <!--弹出编辑对话框-->
    <el-dialog title="集中器基本信息" :visible.sync="dialogVisible" width="35%" center>
      <el-form ref="form" :model="sizeForm">
        <el-form-item>
          <span>集中器地址</span>
          <span style="margin-left:50px;">{{sizeForm.vcaddr}}</span>
        </el-form-item>
        <div style="display:flex">
          <el-form-item label="通信工作模式">
            <el-select v-model="sizeForm.region">
              <el-option label="客户机模式" value="1"></el-option>
              <el-option label="混合模式" value="0"></el-option>
              <el-option label="服务器模式" value="3"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="通道类型" style="margin-left:30px;">
            <el-select v-model="sizeForm.type">
              <el-option label="GPRS/CDMA" :value="2"></el-option>
              <el-option label="PSTN" :value="3"></el-option>
              <el-option label="Ethernet" :value="4"></el-option>
              <el-option label="RS232/RS485" :value="6"></el-option>
              <el-option label="CSD" :value="7"></el-option>
              <el-option label="Radio" :value="8"></el-option>
            </el-select>
          </el-form-item>
        </div>
        <!---->
        <div style="display:flex">
          <el-form-item label="终端IP地址">
            <el-input v-model="sizeForm.ipaddress"></el-input>
          </el-form-item>
          <el-form-item label="心跳间隔" style="margin-left:30px;">
            <el-input v-model="sizeForm.hbinterval" style="padding-right:0;"></el-input>
          </el-form-item>
          <span style="line-height:45px;">秒</span>
        </div>
        <!---->
        <div style="display:flex">
          <el-form-item label="TCP监听端口">
            <el-input v-model="sizeForm.port"></el-input>
          </el-form-item>
          <el-form-item label="掉线重播间隔" style="margin-left:30px;">
            <el-input v-model="sizeForm.notonline" style="padding-right:0;"></el-input>
          </el-form-item>
          <span style="line-height:45px;">秒</span>
        </div>
        <!---->
        <div style="display:flex">
          <el-form-item label="终端子网掩码">
            <el-input v-model="sizeForm.localmask"></el-input>
          </el-form-item>
          <el-form-item label="掉线重播次数" style="margin-left:30px;">
            <el-input v-model="sizeForm.recalltimes" style="padding-right:0;"></el-input>
          </el-form-item>
        </div>
        <!---->
        <div style="display:flex">
          <el-form-item label="终端网关地址">
            <el-input v-model="sizeForm.localgateway"></el-input>
          </el-form-item>
          <el-form-item label="主站通信地址" style="margin-left:30px;">
            <el-input v-model="sizeForm.localip" style="padding-right:0;"></el-input>
          </el-form-item>
        </div>
        <!---->
        <div style="display:flex">
          <el-form-item label="IP地址获取方式">
            <el-select v-model="sizeForm.ipgetway">
              <el-option label="自动设置" value="1"></el-option>
              <el-option label="手动设置" value="0"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="主站端口号" style="margin-left:30px;">
            <el-input v-model="sizeForm.remoteport" style="padding-right:0;"></el-input>
          </el-form-item>
        </div>
        <!---->
        <div style="display:flex">
          <el-form-item label="TCP/UDP标识">
            <el-select v-model="sizeForm.tcporudp">
              <el-option label="TCP" value="0"></el-option>
              <el-option label="UDP" value="1"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="主通道类型" style="margin-left:30px;">
            <el-select v-model="sizeForm.mainchannel">
              <el-option label="虚拟集中器通道" :value="1"></el-option>
              <el-option label="物理集中器通道" :value="2"></el-option>
            </el-select>
          </el-form-item>
        </div>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false" style="float:left">关闭</el-button>
        <el-button type="primary" @click="Makesureedit" style="float:right">确 定</el-button>
      </span>
    </el-dialog>
    <!--新建弹框-->
    <el-dialog title="新增集中器" :visible.sync="addconcentrator" width="35%" center>
      <el-form ref="form" :model="concenForm">
        <el-form-item>
          <label for="">集中器地址</label>
          <el-input v-model="concenForm.vcaddr" style="margin-bottom:20px;"></el-input>
        </el-form-item>
        <label ><span class="startUp">启动配置</span>[JSON]:</label>
        <el-input
          type="textarea"
          :rows="18"
          v-model="vcConfig"
          style="margin-top:20px;">
        </el-input>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="addconcentrator= false" style="float:left">关闭</el-button>
        <el-button type="primary" @click="addconcen" style="float:right">新增/更新</el-button>
      </span>
    </el-dialog>
    <!--校时弹框-->
    <el-dialog
      title="校时"
      :visible.sync="checktimedialog"
      width="30%"
      :before-close="Closechecktime"
    >
      <div>
        <h3>集中器地址</h3>
        <el-input disabled v-model="str"></el-input>
      </div>
      <div>
        <h3>Unix时间戳</h3>
        <el-input v-model="unixtime"></el-input>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="checktimedialog = false" style="float:left">关 闭</el-button>
        <el-button type="primary" @click="submitchecktime()" style="float:right">提 交</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
import {
  timestampToTime,
  gettables,
  makesure,
  startcon,
  stopcon,
  unixtime,
  submittime,
  timetounix,
  startconnect,
  addcon,
} from "@/api/login";
import Parse from 'parse'
export default {
  data() {
    return {
      // value2: true,
      //  value1: true,
      loading:true,
      value6: true,
      value7: false,
      start: 0,
      length: 10,
      total: 100,
      tableData3: [],
      checktimedialog: false,
      dialogVisible: false,
      multipleSelection: [],
      unixtime: "",
      vcaddrs: [],
      str: "",
      addrs: [],
      vcaddr: "",
      draw: 1,
      sizeForm: {
        vcaddr: "",
        region: "",
        type: "",
        ipaddress: "",
        hbinterval: "",
        port: "",
        notonline: "",
        localmask: "",
        recalltimes: "",
        localgateway: "",
        localip: "",
        ipgetway: "",
        remoteport: "",
        mainchannel: "",
        tcporudp: ""
      },
      concenForm:{
        vcaddr:''
      },
      addconcentrator:false,
      vcConfig:{
      "channel_mod": 1,
      "local_ip": "127.0.0.1",
      "local_port": 9001,
      "local_mask": "255.255.000.001",
      "local_gateway": "172.016.023.255",
      "get_ip_mod": 1,
      "remote_ip": "183.129.189.154",
      "remote_port": 65004,
      "channel_type": 2,
      "hb_interval": 60,
      "recall_interval": 30,
      "recall_times": 3,
      "tcp_or_udp": 0
    },
    vcaddrid:'',
    jsondata:{

    }
    }
  },
  mounted() {
    // this.getinformation();
    this.vcConfig = JSON.stringify(this.vcConfig,null,4)
    this.getAllConcentrator()
  },
  methods: {
    getAllConcentrator(){
      var Vcon = Parse.Object.extend('Vcon')
      var vcon = new Parse.Query(Vcon)
     
      if(this.vcaddr!=''){
        vcon.equalTo('vcaddr',this.vcaddr)
      }
      vcon.skip(this.start)
      vcon.limit(this.length)
      vcon.count().then(count=>{
        this.total = count
        vcon.find().then(resultes=>{
            this.tableData3 = resultes
          this.loading=false
        })
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
            } else if (error.code == 119) {
              this.$message({
                type: "error",
                message: "没有操作权限"
              });
            }
          })
    },
    Closechecktime() {
      this.checktimedialog = false;
    },
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
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
    handleEdit(index, row,id) {
      this.vcaddrid = id
      this.sizeForm.vcaddr = row.vcaddr
      this.sizeForm.ipaddress = row.jsondata.local_ip
      this.sizeForm.type = row.jsondata.remote_param.channel_type;
      this.sizeForm.hbinterval = row.jsondata.hb_interval;
      this.sizeForm.port = row.jsondata.local_port;
      this.sizeForm.notonline = row.jsondata.recall_interval;
      this.sizeForm.localmask = row.jsondata.local_mask;
      this.sizeForm.recalltimes = row.jsondata.recall_times;
      this.sizeForm.localgateway = row.jsondata.local_gateway;
      this.sizeForm.localip = row.jsondata.remote_param.remote_ip;
      this.sizeForm.ipgetway = String(row.jsondata.get_ip_mod);
      this.sizeForm.remoteport = row.jsondata.remote_param.remote_port;
      this.sizeForm.tcporudp = String(row.jsondata.tcp_or_udp);
      this.sizeForm.region = String(row.jsondata.channel_mod);
      this.sizeForm.mainchannel = Number(row.jsondata.master_channel);
      this.dialogVisible = true;
      for(var key in row.jsondata){
        this.jsondata[key] = row.jsondata[key]
      }
     
    },
    handledetail(index, row) {
      this.$router.push({
        path: "/devicemanage/condetail",
        query: { vcaddr: row.vcaddr }
      });
    },
    handleSizeChange(val) {
      this.length = val;
      this.getAllConcentrator()
    },
    handleCurrentChange(val) {
      this.start = (val - 1) * this.length;
      this.getAllConcentrator()
    },
    //编辑
    Makesureedit() {
        this.jsondata.vcaddr=this.sizeForm.vcaddr,
        this.jsondata.local_ip= this.sizeForm.ipaddress,
       this.jsondata.remote_param.channel_type= this.sizeForm.type,
       this.jsondata.hb_interval= this.sizeForm.hbinterval,
        this.jsondata.local_port=this.sizeForm.port,
        this.jsondata.recall_interval= this.sizeForm.notonline,
        this.jsondata.local_mask=this.sizeForm.localmask,
        this.jsondata.recall_times= this.sizeForm.recalltimes,
        this.jsondata.local_gateway= this.sizeForm.localgateway,
        this.jsondata.remote_param.remote_ip= this.sizeForm.localip,
        this.jsondata.get_ip_mod= this.sizeForm.ipgetway,
        this.jsondata.remote_param.remote_port= this.sizeForm.remoteport,
        this.jsondata.tcp_or_udp= this.sizeForm.tcporudp,
        this.jsondata.channel_mod= this.sizeForm.region,
        this.jsondata.master_channel=this.sizeForm.mainchannel
          var Vcon = Parse.Object.extend('Vcon')
          var vcon = new Vcon()
          vcon.id = this.vcaddrid
          vcon.set('jsondata',this.jsondata)
          vcon.save().then(resultes=>{
            if(resultes){
              this.$message({
                type:'success',
                message:'编辑成功'
              })
              this.dialogVisible=false
              this.getAllConcentrator()
            }
          },error => {
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
    //搜索
    search() {
      this.start = 0;
      this.length = 10;
      this.draw++;
     this.getAllConcentrator()
    },
    //启动
    startdev() {
      this.addrs = [];
      this.multipleSelection.map(item => {
        this.addrs.push(item.attributes.vcaddr);
      });
      if (this.addrs.length == 0) {
        this.$message({
          message: "请勾选您要启动的集中器",
          type: "warning"
        });
      } else {
        startcon(this.addrs).then(res => {
          if (res) {
            this.$message({
              message: "成功启动",
              type: "success"
            });
           this.getAllConcentrator()
          }
        }).catch(error=>{
        this.$message({
              message: error.error,
              type: "error"
            });
      });
      }
    },
    //停止
    stop() {
      this.addrs = [];
      this.multipleSelection.map(item => {
        this.addrs.push(item.attributes.vcaddr);
      });
      if (this.addrs.length == 0) {
        this.$message({
          message: "请勾选您要启动的集中器",
          type: "warning"
        });
      } else {
        stopcon(this.addrs).then(res => {
          if (res) {
            this.$message({
              message: "成功关闭",
              type: "success"
            });
            this.getAllConcentrator()
          }
        }).catch(error=>{
        this.$message({
              message: error.error,
              type: "error"
            });
      });
      }
    },
    //校时
    checktime() {
      this.vcaddrs = [];
      this.unixtime = unixtime();
      if (this.multipleSelection.length == 0) {
        this.str = "当前节点所有的集中器";
      } else {
        this.str = "";
        this.multipleSelection.map(item => {
          this.str += item.attributes.vcaddr + ",";
          this.vcaddrs.push(item.attributes.vcaddr);
        });
        this.str = String(this.str).substring(0, this.str.length - 1);
      }
      this.checktimedialog = true;
    },
    //连主站
    connect(val) {
      this.vcaddr = val;
      startconnect(this.vcaddr).then(res => {
        if (res) {
          this.$message({
            message: "主站连接成功",
            type: "success"
          });
          this.vcaddr = "";
          this.getAllConcentrator()
        }
      }).catch(error=>{
        this.$message({
              message: error.error,
              type: "error"
            });
      });
    },
    //提交
    submitchecktime() {
      if (this.vcaddrs.length > 0) {
        submittime(timetounix(this.unixtime), this.vcaddrs).then(res => {
          if (res) {
            this.$message({
              message: "校时成功",
              type: "success"
            });
            this.getAllConcentrator()
          }
        }).catch(error=>{
        this.$message({
              message: error.error,
              type: "error"
            });
      });
      } else {
        submittime(timetounix(this.unixtime)).then(res => {
          if (res) {
            this.$message({
              message: "校时成功",
              type: "success"
            });
            this.getAllConcentrator()
          }
        }).catch(error=>{
        this.$message({
              message: error.error,
              type: "error"
            });
      });
      }
      this.checktimedialog = false;
    },
    uploadadd(){
      this.addconcentrator = true
    },
    addconcen(){
      var config = JSON.parse(this.vcConfig)
      config .vcaddr = this.concenForm.vcaddr
      addcon(config).then(response=>{
        if(response){
           this.$message({
              message: "新增/更新成功",
              type: "success"
            })
            this.addconcentrator = false
            this.getinformation()
 
        }
      }).catch(error=>{
        this.$message({
              message: error.error,
              type: "warning"
            });
      })
    }
  }
};
</script>
<style scoped>
.concentrator {
  background: #ffffff;
  padding-left: 20px;
  padding-top: 20px;
  box-sizing: border-box;
  min-height: 100%;
}
.top {
  margin-top: 10px;
}
.section {
  margin-top: 20px;
}
</style>
<style>
.concentrator .el-pagination {
  margin-top: 20px;
}
.concentrator .el-table {
  margin-top: 20px;
}
.concentrator .el-form-item__label {
  text-align: left;
  float: none;
  display: inline-block;
  width: 120px;
}
.concentrator .el-form-item__content {
  margin-left: 0 !important;
  display: inline-block;
}
.concentrator .el-form-item {
  margin-bottom: 5px;
  display: flex;
}
.concentrator .el-input--suffix,
.el-input__inner {
  padding-right: 0 !important;
}
.concentrator .el-select {
  padding-right: 0 !important;
  box-sizing: border-box;
  text-align: center;
}
.concentrator .el-dialog__footer {
  padding-bottom: 50px;
}
.concentrator .el-dialog__body {
  border-bottom: 1px solid #dddddd;
}
.concentrator .el-table th {
  background: #fafafa;
  color: #666666;
  font-weight: 600;
}
</style>
