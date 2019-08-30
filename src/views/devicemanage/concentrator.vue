<template>
  <div class="concentrator">
    <div class="top">
      <label for>{{ $t('concentrator.concentrator') }}:</label>
      <el-input v-model="vcaddr" placeholder="请输入集中器地址" style="width:200px;"></el-input>
      <el-button
        type="primary"
        style="margin-left:20px;"
        @click="search"
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
              v-if="scope.row.is_online==true"
              style="width:10px;height:10px;border-radius:50%;display:inline-block;background:#00cc33;margin-right:10px"
            ></div>
            <span
              v-if="scope.row.is_online==true"
              style="color:#00cc33"
            >{{$t('concentrator.isonline')}}</span>
            <div
              v-if="scope.row.is_online==false"
              style="width:10px;height:10px;border-radius:50%;display:inline-block;background:#f00;margin-right:10px"
            ></div>
            <span
              v-if="scope.row.is_online==false"
              style="color:#f00"
            >{{$t('concentrator.notonline')}}</span>
          </template>
        </el-table-column>
        <el-table-column :label="$t('concentrator.concentrator')" prop="vcaddr" align="center"></el-table-column>
        <el-table-column prop="address" :label="$t('concentrator.courts')" align="center"></el-table-column>
        <el-table-column :label="$t('concentrator.onlinemeter')" sortable align="center">
          <template slot-scope="scope">
            <span>{{(scope.row.dev_total - scope.row.dev_offline)+"/"+scope.row.dev_total}}</span>
          </template>
        </el-table-column>
        <el-table-column prop :label="$t('concentrator.connection')" align="center" width="100">
          <template slot-scope="scope">
            <el-switch
              v-model="value6"
              active-color="#13ce66"
              v-if="scope.row.iscon==true"
              disabled
            ></el-switch>
            <el-switch v-if="scope.row.iscon!=true" v-model="value7" active-color="#cccccc" disabled></el-switch>
          </template>
        </el-table-column>
        <el-table-column prop="vctime" :label="$t('concentrator.time')" align="center"></el-table-column>
        <el-table-column prop :label="$t('concentrator.operation')" align="center" width="300">
          <template slot-scope="scope">
            <el-button
              plain
              size="mini"
              @click="connect(scope.row.vcaddr)"
            >{{$t('concentrator.connect')}}</el-button>
            <el-button
              size="mini"
              @click="handleEdit(scope.$index,scope.row)"
            >{{$t('concentrator.edit')}}</el-button>
            <el-button
              size="mini"
              type="primary"
              @click="handledetail(scope.$index, scope.row)"
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
  addcon
} from "@/api/login";
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
    
    }
  },
  mounted() {
    this.getinformation();
    this.vcConfig = JSON.stringify(this.vcConfig,null,4)
  },
  methods: {
    Closechecktime() {
      this.checktimedialog = false;
    },
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    handleEdit(index, row) {
      (this.sizeForm.vcaddr = row.vcaddr),
        (this.sizeForm.ipaddress = row.local_ip);
      this.sizeForm.type = row.remote_param.channel_type;
      this.sizeForm.hbinterval = row.hb_interval;
      this.sizeForm.port = row.local_port;
      this.sizeForm.notonline = row.recall_interval;
      this.sizeForm.localmask = row.local_mask;
      this.sizeForm.recalltimes = row.recall_times;
      this.sizeForm.localgateway = row.local_gateway;
      this.sizeForm.localip = row.remote_param.remote_ip;
      this.sizeForm.ipgetway = String(row.get_ip_mod);
      this.sizeForm.remoteport = row.remote_param.remote_port;
      this.sizeForm.tcporudp = String(row.tcp_or_udp);
      this.sizeForm.region = String(row.channel_mod);
      this.sizeForm.mainchannel = Number(row.master_channel);
      this.dialogVisible = true;
    },
    handledetail(index, row) {
      this.$router.push({
        path: "/devicemanage/condetail",
        query: { vcaddr: row.vcaddr }
      });
    },
    handleSizeChange(val) {
      this.length = val;
      this.getinformation();
    },
    handleCurrentChange(val) {
      this.start = (val - 1) * this.length;
      this.getinformation();
    },
    //数据初始化
    getinformation() {
      this.loading=true
      gettables(this.vcaddr, this.start, this.length, this.draw)
        .then(res => {
          if(res){
            res.data.map(item => {
            item.vctime = timestampToTime(item.vctime);
          });
          this.tableData3 = res.data;
         
          this.total = res.recordsTotal;
          this.loading=false
          }
          
        })
        .catch(error=>{
        this.$message({
              message: error.error,
              type: "error"
            });
      });
    },
    //编辑
    Makesureedit() {
      var data = {
        vcaddr: this.sizeForm.vcaddr,
        local_ip: this.sizeForm.ipaddress,
        channel_type: this.sizeForm.type,
        hb_interval: this.sizeForm.hbinterval,
        local_port: this.sizeForm.port,
        recall_interval: this.sizeForm.notonline,
        local_mask: this.sizeForm.localmask,
        recall_times: this.sizeForm.recalltimes,
        local_gateway: this.sizeForm.localgateway,
        remote_ip: this.sizeForm.localip,
        get_ip_mod: this.sizeForm.ipgetway,
        remote_port: this.sizeForm.remoteport,
        tcp_or_udp: this.sizeForm.tcporudp,
        channel_mod: this.sizeForm.region,
        master_channel: this.sizeForm.mainchannel
      };
      makesure(this.sizeForm.vcaddr, data)
        .then(res => {
          if (res) {
            this.$message({
              message: "编辑成功",
              type: "success"
            });
            this.dialogVisible = false;
            this.getinformation();
          }
        })
        .catch(error=>{
        this.$message({
              message: error.error,
              type: "error"
            });
      });
    },
    //搜索
    search() {
      this.start = 0;
      this.length = 10;
      this.draw++;
      this.getinformation();
    },
    //启动
    startdev() {
      this.addrs = [];
      this.multipleSelection.map(item => {
        this.addrs.push(item.vcaddr);
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
            this.getinformation();
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
        this.addrs.push(item.vcaddr);
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
            this.getinformation();
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
          this.str += item.vcaddr + ",";
          this.vcaddrs.push(item.vcaddr);
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
          this.getinformation();
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
            this.getinformation();
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
            this.getinformation();
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
