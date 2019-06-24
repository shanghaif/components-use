<template>
  <div class="device">
    <h3>采证设备</h3>
    <div class="deviceslist" style="margin-top:20px">
      <el-table :data="tableData" stripe style="width: 100%" border>
        <el-table-column label="设备名称">
          <template slot-scope="scope">
            <span>{{scope.row.attributes.basedata.type}}</span>
          </template>
        </el-table-column>
        <el-table-column label="设备编号">
          <template slot-scope="scope">
            <span>{{scope.row.attributes.devaddr}}</span>
          </template>
        </el-table-column>
        <el-table-column label="当前状态">
          <template slot-scope="scope">
            <span v-if="scope.row.attributes.basedata.status=='offline'" style="color:red">{{'离线'}}</span>
            <span
              v-else-if="scope.row.attributes.basedata.status=='running'"
              style="color:green"
            >{{'忙碌'}}</span>
            <span v-else style="color:green">{{'在线'}}</span>
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button
              size="mini"
              @click="handleEdit(scope.row.objectId)"
              style="margin-right:20px"
            >控制 面板</el-button>
            <el-button size="mini" type="primary" @click="addJson(scope.row)">配 置</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
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
    <!--弹窗-->
    <el-dialog title="配置信息" :visible.sync="dialogVisible" width="50%">
      <div class="dialog-content">
        <el-input type="textarea" :rows="10" placeholder="请输入内容" v-model="rowdata"></el-input>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
import { Parse } from "parse";
let protection, query;
export default {
  data() {
    return {
      tableData: [],
      rowdata: "",
      dialogVisible: false,
      pagesize: 10,
      total: 0,
      start: 0
    };
  },
  mounted() {
    this.getDevices(this.pagesize, this.start);
  },
  methods: {
    handleSizeChange(val) {
      this.pagesize = val;
      this.getDevices(this.pagesize, this.start);
    },
    handleCurrentChange(val) {
      this.start = Number(val - 1) * Number(this.pagesize);
      this.getDevices(this.pagesize, this.start);
    },
    handleEdit(id) {},
    getDevices(val, start) {
      protection = Parse.Object.extend("Devices");
      query = new Parse.Query(protection);
      query.equalTo("devtype", "PUMP");
      query.limit(val);
      query.skip(start);
      query.count().then(total => {
        this.total = total;
        query.find().then(results => {
          results.map(item => {
            if (item.attributes.basedata.type == "CAMERA") {
              item.attributes.basedata.type = "摄像头";
            } else if (item.attributes.basedata.type == "PC") {
              item.attributes.basedata.type = "控制台";
            } else if (item.attributes.basedata.type == "DTU") {
              item.attributes.basedata.type = "控制器";
            }else if(item.attributes.basedata.type=='ANDROID'){
              item.attributes.basedata.type = "平板"
            }
          });
          this.tableData = results;
        }),
          error => {
            console.log(error);
          };
      });
    },
    addJson(row) {
      this.rowdata = JSON.stringify(row.attributes.basedata.config, null, 4);
      this.dialogVisible = true;
    }
  }
};
</script>
<style scoped>
.device {
  width: 100%;
  min-height: 875px;
  padding: 20px;
  margin-top: 20px;
  box-sizing: border-box;
  background: #ffffff;
}
</style>
