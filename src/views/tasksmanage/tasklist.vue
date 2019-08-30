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
        <el-button type="primary" @click="searchvalue">搜 索</el-button>
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
        <el-table-column label="任务名称" prop="name"></el-table-column>
        
        <el-table-column prop="datetime" label="采集开始时间"></el-table-column>
        <el-table-column label="数据项名称">
          <template slot-scope="scope">
            <span>{{scope.row.di.join(',')}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="unit" label="周期单位"></el-table-column>
        <!-- <el-table-column label="频率" prop="freq"></el-table-column> -->
        <el-table-column prop="downchannel" label="下发通道"></el-table-column>
        <el-table-column prop="upchannel" label="上传通道"></el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button size="mini" type="primary" @click="Meterdetail(scope.row.id)">详情</el-button>
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
    <el-dialog title="配置任务" :visible.sync="dialogVisible" width="50%" :before-close="handleClose">
      <div class="dialog" style="height:300px;">
        <div class="children">
          <label for>任务名称：</label>
          <el-input type="text" style="width:200px" v-model="name"></el-input>
        </div>
        <!-- <div class="children">
          <label for>频率：</label>
          <el-input type="text" style="width:200px" v-model="freq"></el-input>
        </div> -->
        <div class="children">
          <label for>采集开始时间：</label>
          <el-date-picker
            v-model="starttime"
            type="datetime"
            placeholder="选择日期时间"
            @change="testdata"
          ></el-date-picker>
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
          <label for>终端逻辑地址：</label>
          <el-input
            type="text"
            style="width:200px"
            v-model="meteraddress"
            placeholder="A终端逻辑地址,B终端逻辑地址"
          ></el-input>
          <!-- <p style="color:black"></p> -->
          <p style="color:black;margin:5px 0 0 100px">(all代表全部)(注意:逗号为英文逗号)</p>
        </div>
        <div class="children">
          <!-- <el-select v-model="today" placeholder="请选择" @change="selectTime">
            <el-option label="当天" value="today"></el-option>
            <el-option label="某一天" value="other"></el-option>
          </el-select> -->
          <label for>冻结日期：</label>
          <el-date-picker
            v-model="frozendate"
            type="date"
            placeholder="当天"
            value-format="yyyy-MM-dd"
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
          <label for>下发通道：</label>
          <el-select v-model="downchannel" placeholder="请选择">
            <el-option
              v-for="item in senddown"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </div>
      </div>
      <div class="di" style="width:100%;">
        <label for>数据项标识：</label>
        <el-transfer v-model="diselect" :data="data" :titles="['数据项标识', '数据项标识']" :button-texts="['删除', '添加']"></el-transfer>
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
      // pickerOptions: {
      //     // disabledDate(time) {
      //     //   return time.getTime() > Date.now();
      //     // },
      //     shortcuts: [{
      //       text: '当前日期',
      //       onClick(picker) {
      //         picker.$emit('pick', new Date());
      //       }
      //     }, {
      //       text: '指定日期',
      //       // onClick(picker) {
      //       //   const date = new Date();
      //       //   date.setTime(date.getTime() - 3600 * 1000 * 24);
      //       //   picker.$emit('pick', date);
      //       // }
      //     }]
      //   },
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
          value: "0",
          label: "物理通道"
        },
        {
          value: "1",
          label: "虚拟通道"
        }
      ],
      senddown: [
        {
          value: "0",
          label: "物理通道"
        },
        {
          value: "1",
          label: "虚拟通道"
        }
      ],
      name: "",
      frozendate: "",
      downchannel: "1",
      starttime: "",
      meteraddress: "all",
      freq: "",
      unit: "",
      ftype: "vcaddr",
      today:'today',
      idselete: [],
      loading:true
    };
  },
  mounted() {
    this.search();
  },
  methods: {
    // testdata(val){
    //   console.log(val)
    // },
    // selectInit(row, index) {
    //   if (row.id == 1 || row.id == 2) {
    //     return false;
    //   } else {
    //     return true;
    //   }
    // },
    handleClose() {
      this.dialogVisible = false;
    },
    search() {
      this.loading = true
      Alltasks(this.start, this.length, this.node, this.draw++, this.valueforsearch).then(
        response => {
          if(response){
             response.data.map(item => {
              if (item.downchannel == 1) {
                item.downchannel = "虚拟通道";
              } else {
                item.downchannel = "物理通道";
              }
              if (item.upchannel == 1) {
                item.upchannel = "虚拟通道";
              } else {
                item.upchannel = "物理通道";
              }
              item.datetime = timestampToTime(item.datetime);
              if (item.unit == "month") {
                item.unit = "1月";
              } else {
                item.unit = "1日";
              }
              if (item.freq_unit=="day"){
                item.freq+="日";
              }
            });
            this.tableData3 = response.data.reverse();
            this.total = response.recordsTotal;
            this.loading=false
          }
           
        }
      );
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
          { value: "30", label: "30" }
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
    Meterdetail(id) {
      this.$router.push({
        path: "/tasksmanage/schedule",
        query: { id: id }
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
      if(this.frozendate==''){
        this.frozendate = null
      }else{
        this.frozendate = timetounix(this.frozendate + " 00:00:00")
      }
      Addtasks(
        this.name,
        this.frozendate,
        Number(this.downchannel),
        timetounix(this.starttime),
        meter,
        Number(this.freq),
        this.unit
      ).then(response => {
        if(response){
        this.$message({
          message: "添加成功",
          type: "success"
        });
        this.dialogVisible = false;
        this.search();
        }
      }).catch(error=>{
        this.$message({
          message: error.error,
          type: "error"
        });
      });
    },
    getfrozen(){
      console.log(1111)
    },
    selectTime(val){
      if(val=='other'){
        this.getfrozen()
      }
    },
    searchvalue() {
      Alltasks(
        this.start,
        this.length,
        this.node,
        this.draw++,
        this.valueforsearch
      )
        .then(response => {
          if(response){
          response.data.map(item => {
            if (item.downchannel == 1) {
              item.downchannel = "虚拟通道";
            } else {
              item.downchannel = "物理通道";
            }
            if (item.upchannel == 1) {
              item.upchannel = "虚拟通道";
            } else {
              item.upchannel = "物理通道";
            }
            item.datetime = timestampToTime(item.datetime);
            if (item.unit == "month") {
              item.unit = "1月";
            } else {
              item.unit = "1日";
            }
          });
          this.tableData3 = response.data;
          this.total = response.recordsTotal;
          }
        })
        .catch(error => {
          console.log(error);
        });
    },
    deletetask() {
      this.multipleSelection.map(item => {
        this.idselete.push(item.id);
      });
      Removetask(this.idselete)
        .then(response => {
          if (response) {
            this.$message({
              message: "删除成功",
              type: "success"
            });
            this.search();
          }
        })
        .catch(error => {
          console.log(error);
        });
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
.tasklist .el-dialog__body {
  height: 650px;
}
.tasklist .dialog .children,
.dialog .starttime {
  float: left;
  margin-top: 20px;
  width: 50%;
}
.tasklist .dialog .children label,
.tasklist .dialog .starttime label {
  float: left;
  margin-top: 10px;
  width:120px;
  text-align:right;
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

