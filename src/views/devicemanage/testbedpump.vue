<template>
  <div class="testbedpump">
    <Pumpdepartment
      style="width:360px;height:100vh;overflow:scroll;flex-shrink:0;padding:10px;"
      @pumpDetail="getPumpNode"
    />
    <div style="width:calc(100% - 360px);padding:20px;">
      <div class="addbed">
        <el-button type="primary" @click="addTestbed()">工具矩阵</el-button>
      </div>
      <div class="bedtable">
        <el-table :data="bedData" style="width: 100%;text-align:center" border>
          <el-table-column prop="id" label="设备组编号" align="center"></el-table-column>
          <el-table-column label="测试台提名称" align="center">
            <template slot-scope="scope">
              <span>{{scope.row.attributes.name}}</span>
            </template>
          </el-table-column>
          <el-table-column label="状态" align="center">
            <template slot-scope="scope">
              <span v-if="scope.row.attributes.status=='init'" style="color:green">运行中</span>
            </template>
          </el-table-column>
          <el-table-column label="编辑" align="center">
            <template slot-scope="scope">
              <el-button size="mini" type="primary" @click="handleEdit(scope.row.id)">配 置</el-button>
              <el-button size="mini" type="danger" @click="handleDelete(scope.row.id)">撤 销</el-button>
              <el-button size="mini" type="success" @click="devicesDetail(scope.row)">查看设备</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <!--分页-->
      <div class="block" style="margin-top:20px;">
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :page-sizes="[1,5,10]"
          :page-size="pagesize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="total"
        ></el-pagination>
      </div>
      <!--新增，编辑测试台体弹窗-->
      <div class="addbeddialog">
        <el-dialog title="新增测试台体" :visible.sync="beddialog">
          <div style="margin-bottom:20px;">
            <label for>测试台名称:</label>
            <el-input style="width:200px" v-model="testbedname"></el-input>
          </div>
          <div class="devicecompany">
            <el-form :model="devicelist" :inline="true">
              <el-form-item label="检测单位:">
                <el-select v-model="devicelist.deviceid">
                  <el-option></el-option>
                </el-select>
              </el-form-item>
              <el-form-item>
                <el-button type="primary">筛 选</el-button>
              </el-form-item>
            </el-form>
          </div>
          <el-table
            :data="devicesData"
            @selection-change="handleSelectionChange"
            ref="multipleTable"
            style="width:100%;text-align:center"
          >
            <el-table-column type="selection" align="center" width="100"></el-table-column>
            <el-table-column label="设备类别" align="center">
              <template slot-scope="scope">
                <span v-if="scope.row.attributes.basedata.type=='DTU'">控制器</span>
                <span v-else-if="scope.row.attributes.basedata.type=='PC'">控制台</span>
                <span v-else>摄像头</span>
              </template>
            </el-table-column>
            <el-table-column label="设备编号" align="center">
              <template slot-scope="scope">
                <span>{{scope.row.attributes.devaddr}}</span>
              </template>
            </el-table-column>
            <el-table-column label="当前状态" align="center">
              <template slot-scope="scope">
                <span v-if="scope.row.attributes.basedata.status=='offline'" style="color:red">离线</span>
                <span v-if="scope.row.attributes.basedata.status=='ready'" style="color:green">在线</span>
              </template>
            </el-table-column>
          </el-table>
          <span slot="footer" class="dialog-footer">
            <el-button @click="beddialog = false">取 消</el-button>
            <el-button type="primary" @click="addtestbed(testbedid)">确 定</el-button>
          </span>
        </el-dialog>
      </div>
    </div>
     <el-dialog :title="testbedname+'的设备'" :visible.sync="bedDevicedialog">
          <el-table
            :data="bedDevicesData"
        
            ref="multipleTable"
            style="width:100%;text-align:center"
          >
            <el-table-column label="设备类别" align="center">
              <template slot-scope="scope">
                <span v-if="scope.row.attributes.basedata.type=='DTU'">控制器</span>
                <span v-else-if="scope.row.attributes.basedata.type=='PC'">控制台</span>
                <span v-else>摄像头</span>
              </template>
            </el-table-column>
            <el-table-column label="设备编号" align="center">
              <template slot-scope="scope">
                <span>{{scope.row.attributes.devaddr}}</span>
              </template>
            </el-table-column>
            <el-table-column label="当前状态" align="center">
              <template slot-scope="scope">
                <span v-if="scope.row.attributes.basedata.status=='offline'" style="color:red">离线</span>
                <span v-if="scope.row.attributes.basedata.status=='ready'" style="color:green">在线</span>
              </template>
            </el-table-column>
          </el-table>
          <span slot="footer" class="dialog-footer">
            <el-button @click="bedDevicedialog = false">取 消</el-button>
            <el-button type="primary" @click="bedDevicedialog = false">确 定</el-button>
          </span>
        </el-dialog>
  </div>
</template>
<script>
import Parse from "parse";
import Pumpdepartment from "@/components/resource/pumpdepartment";
export default {
  components: {
    Pumpdepartment
  },
  data() {
    return {
      bedData: [],
      devicesData: [],
      beddialog: false,
      multipleSelection: [],
      testbedname: "",
      testbedid: "",
      testbeddevices: [],
      origindevices: [],
      pagesize: 10,
      total: 0,
      start: 0,
      departmentdata: [],
      devicelist: {
        deviceid: ""
      },
      departmentid: "",
      devicesstart:0,
      bedDevicedialog:false,
      bedDevicesData:[],
    };
  },
  mounted() {
    this.getBedtable();
  },
  methods: {
    getPumpNode(val) {
      
      this.departmentid = val.objectId;
      this.getBedtable(this.departmentid)
    },
    devicesDetail(row){
      this.testbedid =row.id
      this.bedDevicedialog=true
      this.testbedname = row.attributes.name
      var Testbed = Parse.Object.extend("Testbed");
      var testbed = new Testbed();
      testbed.id = row.id
      var relation = testbed.relation("relation");
      var query = relation.query()
      query.find().then(resultes=>{
        this.bedDevicesData=resultes
      })        
    },
    // addrelation1() {
    //   var arr1 = [];
    //   var arr = this.bedData.slice(0, 5);
    //   arr.map(item => {
    //     arr1.push(
    //       new Promise((resolve, reject) => {
    //         var Testbed = Parse.Object.extend("Testbed");
    //         var testbed = new Testbed();
    //         var Department = Parse.Object.extend("Department");
    //         var department = new Department();
    //         department.id = this.departmentid;
    //         testbed.id = item.id;
    //         testbed.set("department", department);
    //         return testbed.save().then(
    //           resultes => {
    //             if (resultes) {
    //               resolve(resultes);
    //             }
    //           },
    //           error => {
    //             reject(resultes);
    //           }
    //         );
    //       })
    //     );
    //   });
    //   Promise.all(arr1)
    //     .then(data => {})
    //     .catch(error => {});
    // },
    // addrelation2() {
    //   var arr1 = [];
    //   var arr = this.bedData.slice(5, 10);
    //   arr.map(item => {
    //     arr1.push(
    //       new Promise((resolve, reject) => {
    //         var Testbed = Parse.Object.extend("Testbed");
    //         var testbed = new Testbed();
    //         var Department = Parse.Object.extend("Department");
    //         var department = new Department();
    //         department.id = this.departmentid;
    //         testbed.id = item.id;
    //         testbed.set("department", department);
    //         return testbed.save().then(
    //           resultes => {
    //             if (resultes) {
    //               resolve(resultes);
    //             }
    //           },
    //           error => {
    //             reject(resultes);
    //           }
    //         );
    //       })
    //     );
    //   });
    //   Promise.all(arr1)
    //     .then(data => {})
    //     .catch(error => {});
    // },
    //编辑测试台体
    handleEdit(id) {
      this.testbedid = id;
      this.beddialog = true;
      var Testbed = Parse.Object.extend("Testbed");
      var query = new Parse.Query(Testbed);
      var PumpDevice = Parse.Object.extend("PumpDevice");
      var devices = new Parse.Query(PumpDevice);
      query.get(id).then(results => {
        this.testbedname = results.attributes.name;
        var relation = results.relation("relation");
        var query = relation.query();
        devices.equalTo("devtype", "PUMP");
        devices.ascending("createdAt");
        devices.find().then(devices => {
          this.devicesData = devices;
          query.find().then(beddevices => {
            beddevices.map((items, index) => {
              this.testbeddevices.push(items.id);
              this.devicesData.map((item, index) => {
                if (items.id == item.id) {
                  this.$refs.multipleTable.toggleRowSelection(
                    this.devicesData[index],
                    true
                  );
                }
              });
            });
          });
        });
      }),
        error => {
          console.log(error);
        };
    },
    //删除测试台体
    handleDelete(id) {
      this.$confirm("此操作将永久删除当前测试台体, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          var Testbed = Parse.Object.extend("Testbed");
          var query = new Parse.Query(Testbed);
          query.get(id).then(object => {
            object.destroy().then(response => {
              this.$message({
                type: "success",
                message: "删除成功!"
              });
              this.getBedtable(this.pagesize, this.start);
            });
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },
    //初始化测试台体
    getBedtable(departmentid) {
      var Testbed = Parse.Object.extend("Testbed");
      var query = new Parse.Query(Testbed);
      query.limit(this.pagesize);
      query.skip(this.start);
      query.ascending('name')
      if(departmentid){
        query.equalTo("department",departmentid)
      }
      query.count().then(total => {
        this.total = total;
        query.find().then(results => {
          this.bedData = results;
        }),
          error => {
            console.log(error);
          };
      });
    },
    addTestbed(id) {
      this.testbedname = "";
      this.beddialog = true;
      var PumpDevice = Parse.Object.extend("PumpDevice");
      var devices = new Parse.Query(PumpDevice);
      devices.equalTo("devtype", "PUMP");
      devices.find().then(resultes => {
        this.devicesData = resultes;
      }),
        error => {
          console.log(error);
        };
    },
    handleSelectionChange(val) {
      this.multipleSelection = [];
      val.map(items => {
        this.multipleSelection.push(items.id);
      });
    },
    addtestbed(id) {
      if (id == "") {
        var Testbed = Parse.Object.extend("Testbed");
        var testbed = new Testbed();
        testbed.set("name", this.testbedname);
        testbed.set("status", "init");
        var relation = testbed.relation("relation");
        var Dev = Parse.Object.extend("PumpDevice");
        var devices = new Dev();
        this.multipleSelection.map(item => {
          devices.set("objectId", item);
          relation.add(devices);
        });
        testbed.save().then(resultes => {
          this.$message({
            message: "添加成功",
            type: "success"
          });
          this.beddialog = false;
          this.getBedtable(this.pagesize, this.start);
        });
      } else {
        var Testbed = Parse.Object.extend("Testbed");
        var testbed = new Parse.Query(Testbed);
        testbed.get(id).then(resultes => {
          resultes.set("name", this.testbedname);
          var relation = resultes.relation("relation");
          var Dev = Parse.Object.extend("PumpDevice");
          var devices = new Dev();
          this.multipleSelection.map(items => {
            if (!this.testbeddevices.includes(items)) {
              devices.set("objectId", items);
              relation.add(devices);
            }
            this.testbeddevices.map(item => {
              if (!this.multipleSelection.includes(item)) {
                devices.set("objectId", item);
                relation.remove(devices);
              }
            });
          });
          resultes.save().then(resulte => {
            this.$message({
              message: "修改成功",
              type: "success"
            });
            this.beddialog = false;
            this.getBedtable(this.pagesize, this.start);
          });
        });
      }
    },
    handleSizeChange(val) {
      this.pagesize = val;
      this.getBedtable();
    },
    handleCurrentChange(val) {
      this.start = Number(val - 1) * Number(this.pagesize);
      this.getBedtable();
    }
  }
};
</script>
<style scoped>
.testbedpump {
  width: 100%;
  min-height: 875px;
  /* padding: 20px; */
  box-sizing: border-box;
  /* background: url("../../imgages/echartbanner1.png") no-repeat; */
  /* background-size: cover; */
  display: flex;
  /* overflow: scroll; */
}
.bedtable {
  margin-top: 20px;
}
</style>
<style>
.testbedpump .el-table th.is-leaf {
  background-color: #00587e;
  color: #ffffff;
}
.testbedpump .el-table--striped .el-table__body tr.el-table__row--striped td {
  background-color: #08263e;
  color: #419ba5;
}
.testbedpump td {
  background-color: #08263e;
  color: #419ba5;
}
.testbedpump .el-table__empty-block {
  background: #08263e;
}
</style>
