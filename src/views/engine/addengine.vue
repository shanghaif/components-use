<template>
  <div class="addengine">
    <!-- <div class="addenheader">
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path: '/rules_engine/engine' }">规则</el-breadcrumb-item>
        <el-breadcrumb-item>{{title}}</el-breadcrumb-item>
      </el-breadcrumb>
    </div>-->
    <div class="addcontent">
      <el-card class="box-card">
        <el-form
          ref="formInline"
          :model="formInline"
          label-width="80px"
          :rules="formlinerule"
          size="medium"
        >
          <div class="form-block__title">
            {{$t('rule.condtion')}}
            <div class="form-block__title-tips">{{$t('rule.Processing')}}</div>
          </div>
          <el-row :gutter="20">
            <el-col :span="row1">
              <!--触发事件-->
              <el-form-item :label="$t('rule.TriggerEvent')" prop="region">
                <el-input v-model="formInline.region" :placeholder="$t('rule.TriggerEvent')"></el-input>
                <div class="show-guess">
                  <p>{{$t('rule.AvailableField')}}</p>
                  <div class="code">
                    <code
                      style="font-size: 12px;"
                    >clientid, username, event, id, payload, peername, qos, timestamp, topic</code>
                  </div>
                  <p>
                    <span class="notice" style="color:#ff6d6d">*</span>
                    {{$t('rule.UpgradeHints')}}
                  </p>
                  <div
                    class="code"
                  >当前版本取消对 payload 的自动 JSON 解码，选择 payload 中的字段请使用 json_decode 解码，如 SQL 示例。</div>
                  <p>{{$t('rule.RuleSQLexample')}}</p>
                  <div class="code">
                    <code
                      style="font-size: 12px;"
                    >SELECT * FROM "message.publish" WHERE topic =~ 't/#'</code>
                  </div>
                </div>
              </el-form-item>
              <!--编写SQL-->
              <el-form-item :label="$t('rule.RuleSQL')" prop="enginesql">
                <pre id="editor1" class="ace_editor" style="min-height:300px"><el-input class="ace_text-input" type="textarea" v-model="formInline.enginesql"></el-input></pre>
              </el-form-item>
              <!--备注-->
              <el-form-item :label="$t('rule.Remarks')">
                <el-input type="text" v-model="formInline.remarks"></el-input>
              </el-form-item>
              <!--SQL测试-->
              <el-form-item :label="$t('rule.SQLtest')">
                <el-switch
                  v-model="formInline.sqltest"
                  active-color="#13ce66"
                  @change="getEditor2"
                  inactive-color="gray"
                ></el-switch>
                <el-popover
                  placement="top-start"
                  width="200"
                  trigger="hover"
                  content="自定义模拟数据进行 SQL 命令测试，仅用于测试功能"
                >
                  <i class="el-icon-question" slot="reference" style="color:#71737d"></i>
                </el-popover>
              </el-form-item>
              <!--其他信息-->
            </el-col>
            <!--中间间隔-->
            <el-col :span="4"></el-col>
            <el-col :span="row2" class="animated fadeInRightBig">
              <el-form-item
                label="clientid"
                v-show="formInline.sqltest==true"
                prop="clientid"
                :rules='[
              { required: true, message: "clientid 不能为空", trigger: "blur" }]'
              >
                <el-input v-model="formInline.clientid"></el-input>
              </el-form-item>
              <el-form-item
                label="username"
                v-show="formInline.sqltest==true"
                prop="username"
                :rules='[
              { required: true, message: "username 不能为空", trigger: "blur" }]'
              >
                <el-input v-model="formInline.username"></el-input>
              </el-form-item>
              <el-form-item
                label="topic"
                v-show="formInline.sqltest==true"
                prop="topic"
                :rules='[
              { required: true, message: "topic 不能为空", trigger: "blur" }]'
              >
                <el-input v-model="formInline.topic"></el-input>
              </el-form-item>
              <el-form-item
                label="qos"
                v-if="formInline.sqltest==true"
                prop="qos"
                :rules='[
              { required: true, message: "qos 不能为空", trigger: "blur" }]'
              >
                <el-input v-model.number="formInline.qos"></el-input>
              </el-form-item>
              <el-form-item
                label="payload"
                v-show="formInline.sqltest==true"
                prop="payload"
                :rules='[
              { required: true, message: "请填写payload", trigger: "blur" }]'
              >
              <el-input type="text" v-model="formInline.payload" style="visibility:hidden"></el-input>
                <pre id="editor2" class="ace_editor" style="min-height:300px"><el-input class="ace_text-input" type="textarea" v-model="formInline.payload"></el-input></pre>
              </el-form-item>
              <el-form-item label=" " v-show="formInline.sqltest==true">
                <el-button type="success" @click="testRule('formInline')">{{$t('rule.Test')}}</el-button>
              </el-form-item>
              <el-form-item :label="$t('rule.TestJie')" v-show="formInline.sqltest==true">
                <el-input type="textarea" v-model="formInline.result" :rows="4"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <!--响应动作-->
          <div class="tablebottom">
            <div class="form-block__title">
              <span style="color: rgb(255, 109, 109);">*</span>
              {{$t('rule.ResponseAction')}}
              <div class="form-block__title-tips">{{$t('rule.Processing')}}</div>
            </div>
            <div class="bottomtable" style="padding-left:20px">
              <div class="tableaction">
                <el-table :data="actionData" style="width: 100%">
                  <el-table-column prop="name" :label="$t('rule.Type')" width="180"></el-table-column>
                  <el-table-column :label="$t('rule.Parameter')">
                    <template slot-scope="scope">
                      <span
                        v-if="scope.row.params.resource!=''"
                      >{{'关联资源:resource:'+scope.row.params.resource}}</span>
                    </template>
                  </el-table-column>
                  <el-table-column width="180" :label="$t('developer.operation')">
                    <template slot-scope="scope">
                      <el-button type="danger" @click="deleteOneData(scope.$index)" size="mini">删除</el-button>
                    </template>
                  </el-table-column>
                </el-table>
                <div>
                  <el-button
                    type="success"
                    plain
                    icon="el-icon-circle-plus-outline"
                    size="small"
                    style="margin-top:20px;"
                    @click="addresouce"
                  >{{$t('rule.Addto')}}</el-button>
                </div>
              </div>
            </div>
            <div>
              <el-dialog
                :title="$t('rule.ResponseAction')"
                :visible.sync="dialogFormVisible"
                width="70%"
                top="1vh"
              >
                <el-form :model="form" :rules="formrule" ref="form">
                  <el-row style="border:0">
                    <el-col :span="11">
                      <el-form-item label="动作" prop="action">
                        <!-- <template slot="label"> -->
                        <el-popover
                          placement="top-start"
                          width="200"
                          trigger="hover"
                          content="动作类型"
                        >
                          <i class="el-icon-question" slot="reference" style="color:#71737d;"></i>
                        </el-popover>
                        <!-- </template> -->
                        <el-select v-model="form.action" @change="selectaction">
                          <el-option label="空动作(调试)" value="do_nothing"></el-option>
                          <el-option label="连接到web调试" value="data_to_webserver"></el-option>
                        </el-select>
                      </el-form-item>
                    </el-col>
                    <!-- <el-col :span="2"></el-col> -->
                    <el-col
                      :span="11"
                      style="margin-left:20px;"
                      v-if="form.action=='data_to_webserver'"
                    >
                      <el-form-item
                        label="关联资源"
                        prop="resource"
                        :rules="
                            [{required:true,message:'请选择资源',trigger:'change'}]
                          "
                      >
                        <el-select v-model="form.resource">
                          <el-option
                            v-for="(item,index) in resourcelist"
                            :key="index"
                            :label="'resource:'+item.attributes.name"
                            :value="item.id"
                          ></el-option>
                        </el-select>
                      </el-form-item>
                    </el-col>
                  </el-row>
                </el-form>
                <div slot="footer" class="dialog-footer">
                  <el-button @click="dialogFormVisible = false">取 消</el-button>
                  <el-button type="primary" @click="addData('form')">确 定</el-button>
                </div>
              </el-dialog>
            </div>
          </div>
          <el-form-item label-width="0">
            <el-button type="success" @click="addrules('formInline')">新建</el-button>
            <el-button>取消</el-button>
          </el-form-item>
        </el-form>
      </el-card>
    </div>
  </div>
</template>
<script>
var editor1;
var editor2;
var editormodel;
var editorcreate;
var editorinsert;
var editorsubtable;
import { addRule,ruleTest} from "@/api/rules";
import Parse from "parse";
import { returnLogin } from "@/utils/return";
export default {
  data() {
    return {
      dialogFormVisible: false,
      title: "",
      formInline: {
        user: "",
        region: "",
        enginesql: "",
        remarks: "",
        sqltest: false,
        clientid: "c_swqx",
        username: "u_swqx",
        qos: 1,
        topic: "t/a",
        payload: "",
        row1: 24,
        row2: 0,
        result: ""
      },
      formlinerule: {
        region: [
          { required: true, message: "请输入触发事件", trigger: "blur" }
        ],
        enginesql: [
          { required: true, message: "请填写规则SQL", trigger: "blur" }
        ]
      },
      actionData: [],
      form: {
        action: "",
        resource: ""
      },
      formrule: {
        action: [{ required: true, message: "请选择动作", trigger: "change" }]
      },
      productid: "",
      resourcelist: []
    };
  },
  mounted() {
    this.title = this.$route.query.title;
    this.productid = this.$route.query.productid;
    editor1 = ace.edit("editor1");
    editor1.session.setMode("ace/mode/sql"); // 设置语言
    editor1.setTheme("ace/theme/eclipse"); // 设置主题
    editor1.setOptions({
      enableBasicAutocompletion: true,
      enableSnippets: true,
      enableLiveAutocompletion: true // 设置自动提示
    });
    editor1.setValue(`SELECT
    payload.msg as msg
    FROM
    "message.publish"
    WHERE
    topic =~ 'thing/${this.productid}/#'`);
    editor2 = ace.edit("editor2");
    editor2.session.setMode("ace/mode/json"); // 设置语言
    editor2.setTheme("ace/theme/eclipse"); // 设置主题
    editor2.setOptions({
      enableBasicAutocompletion: true,
      enableSnippets: true,
      enableLiveAutocompletion: true // 设置自动提示
    });
    editor2.setValue(`{"msg":"hello"}`);
    this.formInline.topic = 'thing/'+this.$route.query.productid
  },
  methods: {
    getEditor2(val) {
      if (val == true) {
        this.row1 = 12;
        this.row2 = 12;
      } else {
        this.row1 = 24;
        this.row2 = 0;
      }
    },
    selectaction(val) {
      // if (val == "data_to_webserver") {
      //   //物模型
      //   editormodel = ace.edit("editormodel");
      //   editormodel.session.setMode("ace/mode/json"); // 设置语言
      //   editormodel.setTheme("ace/theme/twilight"); // 设置主题
      //   editormodel.setOptions({
      //     enableBasicAutocompletion: true,
      //     enableSnippets: true,
      //     enableLiveAutocompletion: true // 设置自动提示
      //   });
      //   editormodel.setReadOnly(true);
      //   //物建表
      //   editorcreate = ace.edit("editorcreate");
      //   editorcreate.session.setMode("ace/mode/mysql"); // 设置语言
      //   editorcreate.setTheme("ace/theme/twilight"); // 设置主题
      //   editorcreate.setOptions({
      //     enableBasicAutocompletion: true,
      //     enableSnippets: true,
      //     enableLiveAutocompletion: true // 设置自动提示
      //   });
      //   //物存储
      //   editorinsert = ace.edit("editorinsert");
      //   editorinsert.session.setMode("ace/mode/mysql"); // 设置语言
      //   editorinsert.setTheme("ace/theme/gob"); // 设置主题
      //   editorinsert.setOptions({
      //     enableBasicAutocompletion: true,
      //     enableSnippets: true,
      //     enableLiveAutocompletion: true // 设置自动提示
      //   });
      //   //子表
      //   editorsubtable = ace.edit("editorsubtable");
      //   editorsubtable.session.setMode("ace/mode/mysql"); // 设置语言
      //   editorsubtable.setTheme("ace/theme/gob"); // 设置主题
      //   editorsubtable.setOptions({
      //     enableBasicAutocompletion: true,
      //     enableSnippets: true,
      //     enableLiveAutocompletion: true // 设置自动提示
      //   });
      //   var Product = Parse.Object.extend("Product");
      //   var product = new Parse.Query(Product);
      //   product.get(this.productid).then(resultes => {
      //     if (resultes) {
      //       editormodel.setValue(
      //         JSON.stringify(resultes.attributes.thing, null, 4)
      //       );
      //     }
      //   });
      // }
    },
    addData(forName) {
      this.$refs[forName].validate(valid => {
        if (valid) {
          if(this.form.action == "data_to_webserver"){
            this.actionData.push({
            name: this.form.action,
            params: {
              $resource: this.form.resource
            }
          });
          }else{
            this.actionData.push({
            name: this.form.action,
            params: {}
           });
          }
          // if (this.form.resource != "") {
            // this.resourcelist.map(item => {
            //   if (item.id == this.form.resource) {
            //     for (var key in item.attributes.config) {
            //       obj[key] = item.attributes.config[key];
            //     }
            //   }
            // });
            // var Channel = Parse.Object.extend("Channel");
            // var channel = new Channel();
            // obj.insert = editorinsert.getValue();
            // channel.id = this.form.resource;
            // obj.subtable = editorsubtable.getValue();
            // obj.datamodel = editorcreate.getValue();
            // channel.set("config", obj);
            // console.log(obj);
            // channel.save().then(
            //   response => {
            //     if (response) {
            //       this.$message.success("添加成功");
            //       this.dialogFormVisible = false;
            //     }
            //   },
            //   error => {
            //     returnLogin(error);
            //   }
            // );
          // } else {
            this.dialogFormVisible = false;
          // }
        }
      });
    },
    testRule(forName){
       this.formInline.payload = editor2.getValue()
       this.formInline.enginesql = editor1.getValue();
       this.$refs[forName].validate(valid => {
        if (valid) {
            var ctx = {
            clientid: this.formInline.clientid,
            payload: editor2.getValue(),
            qos: this.formInline.qos,
            topic: this.formInline.topic,
            username: this.formInline.username
          };
          ruleTest(
            this.actionData,
            ctx,
            this.formInline.remarks,
            this.formInline.region,
            "",
            editor1.getValue()
          ).then(response=>{
           this.formInline.result = JSON.stringify(response,null,4)
          }).catch(error=>{
            this.$message.error(error.error)
          })
        }
       })
    },
    addrules(forName) {
      this.formInline.payload = editor2.getValue()
      this.formInline.enginesql = editor1.getValue();
      this.$refs[forName].validate(valid => {
        if (valid) {
          if (this.actionData.length == 0) {
            this.$message.error("动作不能为空");
            return;
          }
          var ctx = {
            clientid: this.formInline.clientid,
            payload: editor2.getValue(),
            qos: this.formInline.qos,
            topic: this.formInline.topic,
            username: this.formInline.username
          };
          addRule(
            this.actionData,
            ctx,
            this.formInline.remarks,
            this.formInline.region,
            "",
            editor1.getValue()
          )
            .then(resultes => {
              if (resultes) {
                this.$message.success('创建成功')
                this.$router.push(
                  {
                    path:'/roles/detailproduct',
                    query:{
                      id:this.productid,
                      activeName:'sixeth'
                    }
                  }
                  
                )
              }
            })
            .catch(error => {
              this.$message.error(error.error);
            });
        } else {
          this.$message.error("有必填项未填写");
        }
      });
    },
    addresouce() {
      this.dialogFormVisible = true;
      var Channel = Parse.Object.extend("Channel");
      var channel = new Parse.Query(Channel);
      channel.equalTo("type", "2");
      channel.find().then(resultes => {
        this.resourcelist = resultes;
      });
    },
    //删除通道关联
    deleteOneData(index) {
      this.actionData.splice(index, 1);
    }
  }
};
</script>
<style lang="scss" scoped>
.addengine {
  width: 100%;
  padding: 20px;
  height: 100%;
  box-sizing: border-box;
  background-color: #f6f7fb;
  .addenheader {
    padding-bottom: 10px;
    /deep/ .el-breadcrumb {
      font-size: 20px;
    }
  }
  .addcontent {
    color: #71737d !important;
    /deep/ .form-block__title {
      margin-bottom: 30px;
      padding-left: 10px;
      border-left: 4px solid #34c388;
      .form-block__title-tips {
        font-size: 12px;
        display: inline-block;
        margin-left: 4px;
        color: #71737d;
      }
    }
    /deep/ .el-row {
      border-bottom: 1px solid #666666;
      margin-bottom: 20px;
    }
    /deep/ .tablebottom {
      padding-bottom: 20px;
      margin-bottom: 20px;
      border-bottom: 1px solid #666666;
      box-sizing: border-box;
    }
    /deep/ .el-select {
      width: 100%;
    }
    /deep/ .show-guess {
      margin-top: 4px;
      line-height: 1.4;
      p {
        font-size: 13px;
        margin-bottom: 4px;
        margin-top: 6px;
        color: #71737d;
        font-weight: 400;
      }
      .code {
        background-color: hsla(0, 0%, 87%, 0.8);
        line-height: 1.4;
        padding: 6px;
        border-radius: 4px;
        margin-bottom: 12px;
        font-size: 14px;
      }
    }
  }
  /deep/ .el-dialog__footer {
    padding-bottom: 40px;
  }
}
</style>
