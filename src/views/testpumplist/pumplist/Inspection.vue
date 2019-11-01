<template>
  <div class="inspection">
    <div class="addtask">
      <el-button type="primary" @click="addtask()">新增任务</el-button>
    </div>
    <div class="tasklist">
      <el-table :data="taskData" stripe border style="width:100%;text-align:center">
        <el-table-column type="index" label="id"></el-table-column>
        <el-table-column label="检验编号" align="center">
          <template slot-scope="scope">
            <span>{{scope.row.inspection_number}}</span>
          </template>
        </el-table-column>
        <el-table-column label="委托单位" align="center">
          <template slot-scope="scope">
            <span>{{scope.row.client}}</span>
          </template>
        </el-table-column>
        <el-table-column label="产品名称" align="center">
          <template slot-scope="scope">
            <span>{{scope.row.produt}}</span>
          </template>
        </el-table-column>
        <el-table-column label="水泵型号" align="center">
          <template slot-scope="scope">
            <span>{{scope.row.model}}</span>
          </template>
        </el-table-column>
        <el-table-column label="测试台体" align="center">
          <template slot-scope="scope">
            <span>{{scope.row.updatedAt}}</span>
          </template>
        </el-table-column>
        <el-table-column label="检验标准" align="center">
          <template slot-scope="scope">
            <span>{{scope.row.standard}}</span>
          </template>
        </el-table-column>
        <el-table-column label="创建日期" align="center">
          <template slot-scope="scope">
            <span>{{new Date(scope.row.createdAt).toLocaleDateString()}}</span>
          </template>
        </el-table-column>
        <el-table-column width="200" label="查看" align="center">
          <template slot-scope="scope">
            <el-button type="primary" @click="taskDetail(scope.row.objectId,scope.row.testbed)" size="mini">详情</el-button>
            <!-- <el-button type="primary" @click="derive(scope.row.objectId)">导出</el-button> -->
          </template>
        </el-table-column>
      </el-table>
      <div style="margin-top:20px">
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :page-sizes="[10, 20, 30, 40]"
          :page-size="pagesize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="total"
        ></el-pagination>
      </div>
      <div class="block">
        <el-dialog title="新增检测任务" :visible.sync="taskdialog" width="30%">
          <el-form ref="form" :model="form" :rules="formrule">
            <el-form-item label="检验编号：" :label-width="formLabelWidth" prop="inspection_number">
              <el-input v-model="form.inspection_number"  placeholder="请输入检验编号"></el-input>
            </el-form-item>
            <el-form-item label="委托单位：" :label-width="formLabelWidth" prop="client">
              <!-- <el-input v-model="form.client"  placeholder="请选择委托单位"></el-input> -->
              <el-select v-model="form.client" placeholder="请选择委托单位" >
                <el-option
                  v-for="(item,index) in options"
                  :key="index"
                  :label="item.label"
                  :value="item.value"
                ></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="产品名称：" :label-width="formLabelWidth" prop="produt">
              <el-input v-model="form.produt"  placeholder="请选择产品名称"></el-input>
            </el-form-item>
            <el-form-item label="水泵型号：" :label-width="formLabelWidth" prop="model">
              <el-input v-model="form.model"  placeholder="请输入泵型号"></el-input>
            </el-form-item>
            <el-form-item label="检验标准：" :label-width="formLabelWidth" prop="region">
              <el-select
                v-model="form.region"
                placeholder="请选择检验标准"
                
                @change="standardName()"
              >
                <el-option
                  v-for="(item,key) in form.standard"
                  :label="item.data.inspection_standard"
                  :value="JSON.stringify(item.data)"
                  :key="key"
                ></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="测试台体：" :label-width="formLabelWidth" prop="bedname">
              <el-select v-model="form.bedname" placeholder="请选择测试台体" >
                <el-option
                  v-for="(item,key) in form.testbed"
                  :label="item.attributes.name"
                  :value="item.id"
                  :key="key"
                ></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="开始时间：" :label-width="formLabelWidth" prop="starttime">
              <el-date-picker
                v-model="form.starttime"
                type="datetime"
                placeholder="选择开始时间"
                @change="testdata"
                :picker-options="pickerOptionsStart"
                value-format="timestamp"
              ></el-date-picker>
            </el-form-item>
            <el-form-item label="结束时间：" :label-width="formLabelWidth" prop="endtime">
              <el-date-picker
                v-model="form.endtime"
                type="datetime"
                placeholder="选择结束时间"
                @change="enddata"
                :picker-options="pickerOptionsEnd"
                value-format="timestamp"
              ></el-date-picker>
            </el-form-item>
          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button @click="taskdialog = false">取 消</el-button>
            <el-button type="primary" @click="addBedtask('form')">确 定</el-button>
          </div>
        </el-dialog>
      </div>
    </div>
  </div>
</template>
<script>
import Parse from "parse";
import { getModule, deriveReport } from "@/api/reportmodule/reportmodule";
export default {
  data() {
    return {
      pickerOptionsStart: {
        disabledDate: time => {
          let endDateVal = this.form.endtime;
          if (endDateVal) {
            return (
              time.getTime() > new Date(endDateVal).getTime() ||
              time.getTime() < Date.now() - 8.64e7
            );
          } else {
            return time.getTime() < Date.now() - 8.64e7;
          }
        }
      },
      pickerOptionsEnd: {
        disabledDate: time => {
          let beginDateVal = this.form.starttime;
          if (beginDateVal) {
            return (
              time.getTime() <
              new Date(beginDateVal).getTime() - 1 * 24 * 60 * 60 * 1000
            );
          } else {
            return time.getTime() < Date.now() - 8.64e7;
          }
        }
      },
      taskData: [],
      pagesize: 10,
      start: 0,
      total: 0,
      standard: "",
      form: {
        starttime: "",
        endtime: "",
        inspection_number: "",
        client: "",
        region: "",
        produt: "",
        model: "",
        standard: [],
        testbed: [],
        bedname: ""
      },
      options: [
        {
          value: "浙江利欧",
          label: "浙江利欧"
        },
        {
          value: "南方泵业",
          label: "南方泵业"
        },
        {
          value: "新界泵业",
          label: "新界泵业"
        },
        {
          value: "丰球",
          label: "丰球"
        }
      ],
      formLabelWidth: "120px",
      taskdialog: false,
      formrule:{
        inspection_number:[
          { required: true, message: '请输入检验编号', trigger: 'blur' },
        ],
        client:[
          { required: true, message: '请选择委托单位', trigger: 'change' }
        ],
        region: [
            { required: true, message: '请选择检验标准', trigger: 'change' }
         ],
         produt:[
          { required: true, message: '请输入产品名称', trigger: 'blur' },
        ],
        model:[
          { required: true, message: '请输入水泵型号', trigger: 'blur' },
        ],
        bedname: [
            { required: true, message: '请选择测试台体', trigger: 'change' }
         ],
         starttime: [
            { type: 'date', required: true, message: '请选择开始时间', trigger: 'change' }
          ],
          endtime: [
            { type: 'date', required: true, message: '请选择结束时间', trigger: 'change' }
          ],
      }
    };
  },
  created() {},
  mounted() {
    this.getTasktable(this.pagesize, this.start);
  },
  methods: {
    getTasktable(pagesize, start) {
      this.taskData = [];
      var Report = Parse.Object.extend("Report");
      var report = new Parse.Query(Report);
      report.descending("createdAt");
      report.limit(pagesize);
      report.skip(start);
      report.count().then(
        count => {
          this.total = count;
          report.find().then(resultes => {
            resultes.map(items => {
              var obj = {};
              obj = JSON.parse(JSON.stringify(items));
              var Testbed = Parse.Object.extend("Testbed");
              var testbed = new Parse.Query(Testbed);
              testbed.get(items.attributes.testbed).then(resulte => {
                obj.updatedAt = resulte.attributes.name;
              });
              this.taskData.push(obj);
            });
            console.log(this.taskData)
          });
        },
        error => {
          console.log(error);
          this.$message({
            type: "error",
            message: error.message
          });
        }
      );
    },
    addtask() {
      this.taskdialog = true;
      var Testbed = Parse.Object.extend("Testbed");
      var testbed = new Parse.Query(Testbed);
      testbed.find().then(resultes => {
        this.form.testbed = resultes;
      });
      getModule()
        .then(resultes => {
          if (resultes) {
            this.form.standard = resultes.data;
          }
        })
        .catch(error => {
          this.$message({
            type: "error",
            message: error.error
          });
        });
    },
    handleSizeChange(val) {
      this.pagesize = val;
    },
    handleCurrentChange(val) {
      this.start = Number(val - 1) * Number(this.pagesize);
    },
    taskDetail(id, testbedid) {
      this.$router.push({
        path: "/inspection/reportdetail",
        query: {
          id: id,
          testbedid: testbedid
        }
      });
    },
    standardName() {
      let obj = {};
      obj = this.form.standard.find(item => {
        //这里的selectList就是上面遍历的数据源
        return JSON.stringify(item.data) === this.form.region; //筛选出匹配数据
      });
      this.standard = obj.data.inspection_standard; //我这边的name就是对应label的
    },
    addBedtask(formName) {
     this.$refs[formName].validate((valid) => {
          if (valid) {
      var Report = Parse.Object.extend("Report");
      var report = new Report();
      report.set("inspection_number", this.form.inspection_number);
      report.set("client", this.form.client);
      report.set("produt", this.form.produt);
      report.set("model", this.form.model);
      report.set("testbed", this.form.bedname);
      report.set("standard", this.standard);
      report.set("datas", JSON.parse(this.form.region));
      report.set("start_time", this.form.starttime / 1000);
      report.set("end_time", this.form.endtime / 1000);
      report.save().then(resultes => {
        this.$message({
          message: "新增成功",
          type: "success"
        });
        this.taskdialog = false;
        this.getTasktable(this.pagesize, this.start);
      },
        error => {
          this.$message({
            type: "error",
            message: error.message
          });
        })
        }
      })
    },
    derive(reportId) {
      deriveReport(reportId).then(res => {});
    },
    //时间校验
    enddata() {
      if (this.form.endtime <= this.form.starttime) {
        this.$message.warning("任务结束时间要小于开始时间");
        this.form.endtime = "";
      }
      if (this.form.endtime < Date.now() - 2000) {
        this.$message.warning("任务结束时间要大于当前时间");
        this.form.endtime = "";
      }
    },
    testdata() {
      if (
        this.form.endtime <= this.form.starttime &&
        this.form.endtime != "" &&
        this.form.endtime != null
      ) {
        this.$message.warning("任务开始时间要小于结束时间");
        this.form.starttime = "";
      }
      if (this.form.starttime < Date.now() - 2000) {
        this.$message.warning("任务开始时间要大于当前时间");
        this.form.starttime = "";
      }
    },
  }
};
</script>
<style scoped>
.inspection {
  width: 100%;
  min-height: 875px;
  padding: 20px;
  box-sizing: border-box;
  background: #ffffff;
}
.tasklist {
  margin-top: 21px;
}
.tasklist .el-select{
  width:100%;
}
.tasklist .el-date-editor.el-input{
  width:100%;
}
</style>
