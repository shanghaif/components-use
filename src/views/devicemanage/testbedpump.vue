<template>
  <div class="testbedpump">
    <div class="addbed">
      <el-button type="primary" @click="addTestbed()">工具矩阵</el-button>
    </div>
    <div class="bedtable">
      <el-table :data="bedData" style="width: 100%">
        <el-table-column prop="id" label="设备组编号"></el-table-column>
        <el-table-column label="测试台提名称">
          <template slot-scope="scope">
            <span>{{scope.row.attributes.name}}</span>
          </template>
        </el-table-column>
        <el-table-column label="状态">
          <template slot-scope="scope">
            <span>{{scope.row.attributes.status}}</span>
          </template>
        </el-table-column>
        <el-table-column label="编辑">
          <template slot-scope="scope">
            <el-button size="mini" type="primary" @click="handleEdit(scope.row.id)">配 置</el-button>
            <el-button size="mini" type="danger" @click="handleDelete(scope.row.id)">撤 销</el-button>
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

        <el-table :data="devicesData" @selection-change="handleSelectionChange" ref="multipleTable">
          <el-table-column type="selection"></el-table-column>
          <el-table-column label="设备类别">
            <template slot-scope="scope">
              <span v-if="scope.row.attributes.basedata.type=='DTU'">控制器</span>
              <span v-else-if="scope.row.attributes.basedata.type=='PC'">控制台</span>
              <span v-else>摄像头</span>
            </template>
          </el-table-column>
          <el-table-column label="设备编号">
            <template slot-scope="scope">
              <span>{{scope.row.attributes.devaddr}}</span>
            </template>
          </el-table-column>
          <el-table-column label="当前状态">
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
</template>
<script>
import Parse from "parse";
export default {
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
      start: 0
    };
  },
  mounted() {
    this.getBedtable(this.pagesize, this.start);
  },
  methods: {
    //编辑测试台体
    handleEdit(id) {
      this.testbedid = id;
      this.beddialog = true;
      var Testbed = Parse.Object.extend("Testbed");
      var query = new Parse.Query(Testbed);
      var Devices = Parse.Object.extend("Devices");
      var devices = new Parse.Query(Devices);
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
              this.getBedtable()
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
    getBedtable(val, start) {
      var Testbed = Parse.Object.extend("Testbed");
      var query = new Parse.Query(Testbed);
      query.limit(val);
      query.skip(start);
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
      var Devices = Parse.Object.extend("Devices");
      var devices = new Parse.Query(Devices);
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
        var Dev = Parse.Object.extend("Devices");
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
          this.getBedtable();
        });
      } else {
        var Testbed = Parse.Object.extend("Testbed");
        var testbed = new Parse.Query(Testbed);
        testbed.get(id).then(resultes => {
          resultes.set("name", this.testbedname);
          var relation = resultes.relation("relation");
          var Dev = Parse.Object.extend("Devices");
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
            this.getBedtable();
          });
        });
      }
    },
    handleSizeChange(val) {
      this.pagesize = val;
      this.getBedtable(this.pagesize, this.start);
    },
    handleCurrentChange(val) {
      this.start = Number(val - 1) * Number(this.pagesize);
      this.getBedtable(this.pagesize, this.start);
    }
  }
};
</script>
<style scoped>
.testbedpump {
  width: 100%;
  min-height: 875px;
  padding: 20px;
  margin-top: 20px;
  box-sizing: border-box;
  background: #ffffff;
}
.bedtable {
  margin-top: 20px;
}
</style>
