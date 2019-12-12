<template>
  <div class="serverlist">
    <h3>部署管理</h3>
    <div class="servercontent">
      <el-form :inline="true" :model="formInline" class="demo-form-inline" size="small">
        <el-form-item>
          <el-input v-model="formInline.user" placeholder="请输入用户单位"></el-input>
        </el-form-item>
        <el-form-item>
          <el-select v-model="formInline.region" placeholder="运行状态">
            <el-option label="区域一" value="shanghai"></el-option>
            <el-option label="区域二" value="beijing"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit">查询</el-button>
          <el-button type="primary" >新增</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div class="servertable">
      <el-table :data="tableData" style="width: 100%;text-align:center">
        <el-table-column label="编号" type="index" width="50" align="center"></el-table-column>
        <!-- <el-table-column label="用户名称" align="center">
          <template slot-scope="scope">
            <span>{{ scope.row.date }}</span>
          </template>
        </el-table-column> -->
        <el-table-column label="服务器IP" align="center">
          <template slot-scope="scope">
            <span>{{ scope.row.date }}</span>
          </template>
        </el-table-column>
        <el-table-column label="服务器MAC地址" align="center">
          <template slot-scope="scope">
            <span>{{ scope.row.date }}</span>
          </template>
        </el-table-column>
        <el-table-column label="服务器配置" align="center">
          <template slot-scope="scope">
            <el-popover trigger="hover" placement="top">
              <p>姓名: {{ scope.row.name }}</p>
              <p>住址: {{ scope.row.address }}</p>
              <div slot="reference" class="name-wrapper">
                <el-tag size="medium">{{ scope.row.name }}</el-tag>
              </div>
            </el-popover>
          </template>
        </el-table-column>
        <el-table-column label="授权码" align="center">
          <template slot-scope="scope">
            <span>{{ scope.row.date }}</span>
          </template>
        </el-table-column>
        <el-table-column label="服务器部署情况" align="center">
          <template slot-scope="scope">
            <span>{{ scope.row.date }}</span>
          </template>
        </el-table-column>
        <el-table-column label="服务器状态" align="center">
          <template slot-scope="scope">
            <span>{{ scope.row.date }}</span>
          </template>
        </el-table-column>
        <el-table-column label="操作" align="center" width="200">
          <template slot-scope="scope">
            <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
            <el-button
              size="mini"
              type="primary"
              @click="addserver(scope.row)"
            >服务器部署</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="serverpagina">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :page-sizes="[10, 20, 30, 50]"
        :page-size="pagesize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
      ></el-pagination>
    </div>
    <!--新增编辑弹窗-->
    <el-dialog title="服务部署" :visible.sync="dialogFormVisible">
      <el-form
        :model="ruleForm"
        :rules="rules"
        ref="ruleForm"
        label-width="100px"
        class="demo-ruleForm"
      >
        <el-form-item label="设备规模" prop="name">
          <el-input v-model.number="ruleForm.name">
               <template slot="append">台</template>
          </el-input>
        </el-form-item>
        <el-form-item label="应用类型" prop="region">
          <el-select v-model="ruleForm.region" placeholder="请选择应用类型">
            <el-option label="区域一" value="shanghai"></el-option>
            <el-option label="区域二" value="beijing"></el-option>
          </el-select>
          <p style="color:black;margin:0;position:absolute;top:30px;color:#cc6e00">标准版本为单机版</p>
        </el-form-item>
          <el-form-item label="应用名称" prop="appname">
          <el-select v-model="ruleForm.appname" placeholder="请选择需要应用">
            <el-option label="区域一" value="shanghai"></el-option>
            <el-option label="区域二" value="beijing"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="应用版本" prop="version">
          <el-select v-model="ruleForm.version" placeholder="请选择应用版本">
            <el-option label="区域一" value="shanghai"></el-option>
            <el-option label="区域二" value="beijing"></el-option>
          </el-select>
        </el-form-item>
         <el-form-item label="授权码" prop=" licensekey">
          <el-input v-model="ruleForm.licensekey" placeholder="请输入license授权码">
          </el-input>
        </el-form-item>
        <!-- <el-form-item label="许可有效期" required>
          <el-col :span="11">
            <el-form-item prop="date1">
              <el-date-picker
                type="datetime"
                placeholder="选择开始时间"
                v-model="ruleForm.date1"
                style="width: 100%;"
                :picker-options="pickerOptionsStart"
                 @change="startDate"
              ></el-date-picker>
            </el-form-item>
          </el-col>
          <el-col class="line" :span="2">-</el-col>
          <el-col :span="11">
            <el-form-item prop="date2">
              <el-date-picker  type="datetime" placeholder="选择结束时间" v-model="ruleForm.date2" style="width: 100%;"  :picker-options="pickerOptionsEnd" @change="endDate"></el-date-picker>
            </el-form-item>
          </el-col>
        </el-form-item> -->
        <!-- <el-form-item class="notall">
          <el-button type="primary" @click="submitForm('ruleForm')">部 署</el-button>
          <el-button @click="resetForm('ruleForm')">取 消</el-button>
        </el-form-item> -->
      </el-form>
      <div slot="footer" class="dialog-footer">
           <el-button type="primary" @click="dialogFormVisible = false">部 署</el-button>
           <el-button @click="dialogFormVisible = false">取 消</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import Parse from 'parse'
export default {
  data() {
    return {
      dialogFormVisible: false,
      formInline: {
        user: "",
        region: ""
      },
      tableData: [
        {
          date: "2016-05-02",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄"
        },
        {
          date: "2016-05-04",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1517 弄"
        },
        {
          date: "2016-05-01",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1519 弄"
        },
        {
          date: "2016-05-03",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1516 弄"
        }
      ],
      pagesize: 10,
      total: 0,
      start: 0,
      ruleForm: {
          name: '',
          region: '',
          date1: '',
          date2: '',
          appname:'',
          version:'',
          licensekey:''
        },
        rules: {
          name: [
            { required: true, message: '请输入预计设计规模'},
           { type: 'number', message: '预计设计规模 必须为数字值'}
          ],
          region: [
            { required: true, message: '请选择应用类型', trigger: 'change' }
          ],
           appname: [
            { required: true, message: '请选择需要应用', trigger: 'change' }
          ],
           version: [
            { required: true, message: '请选择应用版本', trigger: 'change' }
          ],
          licensekey:[
            { required: true, message: 'licensekey', trigger: 'blur' }
          ],
          date1: [
            { type: 'date', required: true, message: '请选择开始时间', trigger: 'change' }
          ],
          date2: [
            { type: 'date', required: true, message: '请选择结束时间', trigger: 'change' }
          ],
        },
         pickerOptionsStart: {
        disabledDate: time => {
          let endDateVal = this.ruleForm.date2;
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
          let beginDateVal = this.ruleForm.date1;
          if (beginDateVal) {
            return (
              time.getTime() < new Date(beginDateVal).getTime()
            );
          } else {
            return time.getTime() < Date.now() - 8.64e7;
          }
        }
      },
    };
  },
  mounted() {
//       var iParse = Parse;
//          iParse.initialize("asdhwu648vx");
//         iParse.serverURL = 'http://139.155.115.215:1337/parse';
//         let query = new iParse.Query('Lic');
//         let subscription = query.subscribe();
        // query.equalTo('lic','hhhhdd')
        // subscription.on('create', (object) => {
        // console.log('object created');
        // console.log(object);
        // });
        // subscription.on('update', (object) => {
        // console.log('object updated');
        // console.log(object);
        // }); 

  },
  methods: {
    //分页
    handleSizeChange(val) {
      this.pagesize = val;
    },
    handleCurrentChange(val) {
      this.start = (val - 1) * this.pagesize;
    },
    addserver(){
        this.dialogFormVisible=true
    },
     startDate() {
      if (
        this.ruleForm.date2 <= this.ruleForm.date1 &&
        this.ruleForm.date2 != "" &&
        this.ruleForm.date2 != null
      ) {
        this.$message.warning("采集结束时间要小于开始时间");
        this.ruleForm.date1 = "";
      }
      if (this.ruleForm.date1 < Date.now() - 2000) {
        this.$message.warning("采集开始时间要大于当前时间");
        this.ruleForm.date1 = "";
      }
    },
     endDate() {
      if (this.ruleForm.date2 <= this.ruleForm.date1) {
        this.$message.warning("采集结束时间要小于开始时间");
        this.ruleForm.date2 = "";
      }
      if (this.ruleForm.date2 < Date.now() - 2000) {
        this.$message.warning("采集结束时间要大于当前时间");
        this.ruleForm.date2 = "";
      }
    },
  }
};
</script>
<style lang="scss" scoped>
.serverlist {
  width: 100%;
  height: 100%;
  padding: 20px;
  box-sizing: border-box;
  background: #fff;
  .servercontent {
    .el-form {
      text-align: right;
    }
  }
  .serverpagina {
    margin-top: 20px;
  }
  /deep/ .el-dialog__body{
      .el-form{
          display: flex;
          flex-wrap: wrap;
          .el-form-item{
              width:50%;
              /deep/.el-select{
                  width:100%;
              }
          }
          /deep/ .notall{
              width:100%;
              text-align: center;
          }
          /deep/ .el-col-11{
              .el-form-item{
                  width:100%;
              }
          }
          /deep/ .el-col-2{
              text-align: center;
          }
      }
  }
    @media screen and (max-width: 1350px) {
    /deep/ .el-dialog__body{
        .el-form{
            .el-form-item{
                 width: 100%;
            }
        }
    }
  }
}
</style>
