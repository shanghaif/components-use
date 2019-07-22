<template>
  <div class="longcontrol">
    <!--第一个tree树-->
    <Resource1
      style="width:360px;max-height:100%;overflow:scroll;flex-shrink:0;padding:10px;"
      @meterdetail="meterdetail"
    />
    <!--第三个返回数据展示-->
    <div class="second">
      <div style="width:100%;height:auto;padding:20px;box-sizing:border-box;">
        <div class="secondheader">
          <el-form ref="ruleform" :model="ruleform" label-width="80px" :inline="true" :rules="rules">
            <el-form-item label="供电单位">
              <el-input v-model="ruleform.ggdw"></el-input>
            </el-form-item>
            <el-form-item label="用户编号">
              <el-input v-model="ruleform.yhabh"></el-input>
            </el-form-item>
            <el-form-item label="用户名称">
              <el-input v-model="ruleform.yhmc"></el-input>
            </el-form-item>
            <el-form-item label="终端地址" prop="vcaddr">
              <el-input v-model="ruleform.vcaddr"></el-input>
            </el-form-item>
            <el-form-item label="电表地址" prop="meteraddr">
              <el-input v-model="ruleform.meteraddr"></el-input>
            </el-form-item>
            <el-form-item label="数据类型" prop="datatype">
              <el-select v-model="ruleform.datatype" placeholder="请选择数据类型">
                <el-option label="A.17测量点控制参数" value="A.17"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="规约类型" prop="protocol">
              <el-select v-model="ruleform.protocol" placeholder="请选择规约类型">
                <el-option label="南网上行通信规约" value="30"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="通道类型" prop="route">
              <el-select v-model="ruleform.route" placeholder="请选择通道类型">
                <el-option label="无线" value="tcp"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="操作类型" prop="control">
              <el-select v-model="ruleform.control" placeholder="请选择操作类型">
                <el-option label="拉闸" value="switch_off"></el-option>
                <el-option label="合闸" value="switch_on"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="测量点号" prop="pn">
              <el-input v-model="ruleform.pn" type="number"></el-input>
            </el-form-item>
            <el-form-item >
              <el-radio-group v-model="ruleform.resource">
                <el-radio label="最近一个月"></el-radio>
                <el-radio label="一个月外"></el-radio>
              </el-radio-group>
            </el-form-item>
            <el-form-item label="开始时间">
              <el-date-picker
                v-model="ruleform.starttime"
                type="date"
                placeholder="选择开始时间"
                value-format="timestamp"
              ></el-date-picker>
            </el-form-item>
            <el-form-item label="结束时间">
              <el-date-picker
                v-model="ruleform.endtime"
                type="date"
                placeholder="选择结束时间"
                value-format="timestamp"
              ></el-date-picker>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" size="small" @click="submitForm('ruleform')">下发</el-button>
              <el-button type="primary" size="small" @click="resetForm('ruleform')">查询</el-button>
            </el-form-item>
            <div style="margin:10px 0;">
              <el-button type="primary" size="small">拉闸</el-button>
              <el-button type="primary" size="small">合闸</el-button>
            </div>
          </el-form>
        </div>
        <div class="secondcontent">
          <el-table
            ref="multipleTable"
            :data="tableData"
            tooltip-effect="dark"
            style="width: 100%"
            border
            @selection-change="handleSelectionChange"
          >
            <el-table-column type="selection" width="55"></el-table-column>
            <el-table-column label="供电单位">
              <template slot-scope="scope">{{ scope.row.date }}</template>
            </el-table-column>
            <el-table-column prop="name" label="用户编号"></el-table-column>
            <el-table-column prop="address" label="用户名称"></el-table-column>
            <el-table-column prop="address" label="台区名称"></el-table-column>
            <el-table-column prop="address" label="终端地址"></el-table-column>
            <el-table-column prop="address" label="终端状态"></el-table-column>
            <el-table-column prop="address" label="表地址"></el-table-column>
            <el-table-column prop="address" label="控制类型"></el-table-column>
            <el-table-column prop="address" label="控制论数"></el-table-column>
            <el-table-column prop="address" label="申请时间"></el-table-column>
            <el-table-column prop="address" label="执行状态"></el-table-column>
            <el-table-column prop="address" label="执行时间"></el-table-column>
            <el-table-column prop="address" label="执行结果"></el-table-column>
          </el-table>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import Parse from "parse";
import { Getlhz } from "@/api/mainstation";
import Resource1 from "@/components/resource/resource";
 var operation=''
 var ranNum = ''
export default {
  components: {
    Resource1
  },
  data() {
    var checkPn = (rule, value, callback) => {
        if (!value) {
          return callback(new Error('pn不能为空'));
        }else{
          callback()
        }
      };
    return {
      rules: {
        vcaddr: [
            { required: true, message: '请在左侧树选择', trigger: 'blur' },
          ],
          meteraddr: [
            { required: true, message: '请在左侧树选择', trigger: 'blur' },
          ],
          pn: [
            { validator: checkPn, trigger: 'blur' }
          ],
          datatype: [
            { required: true, message: '请选择数据类型', trigger: 'change' }
          ],
          protocol: [
            { required: true, message: '请选择规约类型', trigger: 'change' }
          ],
          route: [
            { required: true, message: '请选择通道类型', trigger: 'change' }
          ],
          control: [
            { required: true, message: '请选择操作类型', trigger: 'change' }
          ],
      },
      operation: "",
      ruleform: {
        name: "",
        vcaddr: "",
        meteraddr: "",
        datatype: "A.17",
        protocol: "30",
        route: "tcp",
        pn: 1,
        resource: "",
        starttime: "",
        endtime: ""
      },
      session: "",
      tableData: [],
      multipleSelection: ""
    };
  },
  computed: {},
  mounted() {
    this.session = Parse.User.current().attributes.sessionToken;
  },
  methods: {
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    //树取到电表数据
    meterdetail(val) {
      var Smartmeter = Parse.Object.extend("Smartmeter");
      var smartmeter = new Parse.Query(Smartmeter);
      smartmeter.equalTo("addr_web", val.name);
      smartmeter.find().then(resultes => {
        this.ruleform.pn = resultes[0].attributes.pn
        this.ruleform.vcaddr = resultes[0].attributes.vcaddr_web
        this.ruleform.meteraddr = resultes[0].attributes.addr_web
        this.ruleform.yhmc = resultes[0].attributes.yhmc
        this.ruleform.yhabh =resultes[0].attributes.yhabh
      });
    },
    submitForm(formName) {
       ranNum = Math.ceil(Math.random() * 25)
       operation = String.fromCharCode(65+ranNum)+Math.ceil(Math.random()*100000)
        this.$refs[formName].validate((valid) => {
          
          if (valid) {
            Getlhz(this.ruleform,this.session,operation).then(resultes=>{
              console.log(resultes)
            }).catch(error=>{
              console.log(error)
            })
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
      }
  }
};
</script>
<style scoped lang="scss">
.longcontrol {
  width: 100%;
  min-height: 100%;
  box-sizing: border-box;
  background: #ffffff;
  display: flex;
  .second {
    min-height: 875px;
    border-left: 2px solid #156fae;
    background: #f6fbff;
    overflow-x: scroll;
    .secondcontent {
      margin-top: 20px;
    }
  }
}
</style>
<style>
.longcontrol .el-form-item {
  margin-bottom: 20px;
}
.longcontrol .el-tabs--border-card {
  border: 0;
  width: 322px;
}
.longcontrol .el-tabs__item {
  line-height: 20px;
}
.longcontrol .second .el-input__inner {
  height: 26px;
  line-height: 26px;
  width: 150px;
  border-radius: 0;
}
.longcontrol .el-form-item__label {
  color: #333333;
  font-family: Microsoft YaHei;
  line-height: 26px;
}

.longcontrol .second .secondheader .el-form--inline .el-form-item__content {
  line-height: 26px;
  height: 26px;
  border-radius: 0;
}
.longcontrol .el-date-editor.el-input {
  width:150px;
  border-radius: 0;
}
.longcontrol .el-input__icon {
  line-height: 0;
}
.second .secondheader .el-select {
  width: 100%;
}
.secondheader .el-button {
  width: 75px;
  height: 26px;
  line-height: 0;
  border-radius: 0;
}
.secondheader .el-radio:last-child{
  margin-right:20px;
}
</style>

