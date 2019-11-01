<template>
  <div class="addengine">
    <!-- <div class="addenheader">
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path: '/rules_engine/engine' }">规则</el-breadcrumb-item>
        <el-breadcrumb-item>{{title}}</el-breadcrumb-item>
      </el-breadcrumb>
    </div> -->
    <div class="addcontent">
      <el-card class="box-card">
        <el-form ref="formInline" :model="formInline" label-width="80px" :rules="formlinerule" size="medium">
          <div class="form-block__title">
            条件
            <div class="form-block__title-tips">使用 SQL 定义规则条件与数据处理方式</div>
          </div>
          <el-row :gutter="20">
            <el-col :span="row1">
                <!--触发事件-->
              <el-form-item label="触发事件" prop="region">
                <el-select v-model="formInline.region" placeholder="触发事件">
                  <el-option label="区域一" value="shanghai"></el-option>
                  <el-option label="区域二" value="beijing"></el-option>
                </el-select>
                <div class="show-guess">
                  <p>可用字段</p>
                  <div class="code">
                    <code
                      style="font-size: 12px;"
                    >clientid, username, event, id, payload, peername, qos, timestamp, topic</code>
                  </div>
                  <p>
                    <span class="notice" style="color:#ff6d6d">*</span> 升级提示
                  </p>
                  <div
                    class="code"
                  >当前版本取消对 payload 的自动 JSON 解码，选择 payload 中的字段请使用 json_decode 解码，如 SQL 示例。</div>
                  <p>规则 SQL 示例</p>
                  <div class="code">
                    <code
                      style="font-size: 12px;"
                    >SELECT * FROM "message.publish" WHERE topic =~ 't/#'</code>
                  </div>
                </div>
              </el-form-item>
             <!--编写SQL-->
              <el-form-item label="规则SQL" prop="enginesql">
                  <pre id="editor1" class="ace_editor" style="min-height:300px"><el-input class="ace_text-input" type="textarea" v-model="formInline.enginesql"></el-input></pre>
              </el-form-item>
              <!--备注-->
              <el-form-item label="备注">
                  <el-input type="text" v-model="formInline.remarks"></el-input>
              </el-form-item>
              <!--SQL测试-->
              <el-form-item label="SQL测试">
                    <el-switch
                    v-model="formInline.sqltest"
                    active-color="#13ce66"
                    @change="getEditor2"
                    inactive-color="gray">
                </el-switch>
                <el-popover
                    placement="top-start"
                    width="200"
                    trigger="hover"
                    content="自定义模拟数据进行 SQL 命令测试，仅用于测试功能">
                     <i class="el-icon-question" slot="reference" style="color:#71737d"></i>
                </el-popover>
              </el-form-item>
              <!--其他信息-->
            </el-col>
            <!--中间间隔-->
            <el-col :span="4"></el-col>
            <el-col :span="row2" class="animated fadeInRightBig">
                <el-form-item label="clientid" v-if="formInline.sqltest==true" prop="clientid" :rules='[
              { required: true, message: "clientid 不能为空", trigger: "blur" }]'>
                <el-input v-model="formInline.clientid"></el-input>
              </el-form-item>
              <el-form-item label="username" v-if="formInline.sqltest==true" prop="username" :rules='[
              { required: true, message: "username 不能为空", trigger: "blur" }]'>
                <el-input v-model="formInline.username"></el-input>
              </el-form-item>
              <el-form-item label="topic" v-if="formInline.sqltest==true" prop="topic" :rules='[
              { required: true, message: "topic 不能为空", trigger: "blur" }]'>
                <el-input v-model="formInline.topic"></el-input>
              </el-form-item>
              <el-form-item label="qos" v-if="formInline.sqltest==true" prop="qos" :rules='[
              { required: true, message: "qos 不能为空", trigger: "blur" }]'>
                <el-input v-model.number="formInline.qos"></el-input>
              </el-form-item>
              <el-form-item label="payload" v-if="formInline.sqltest==true" prop="payload" :rules='[
            { required: true, message: "请填写payload", trigger: "blur" }]'>
                  <pre id="editor2" class="ace_editor" style="min-height:300px"><el-input class="ace_text-input" type="textarea" v-model="formInline.payload"></el-input></pre>
              </el-form-item>
              <el-form-item label=" " v-if="formInline.sqltest==true">
                  <el-button type="success">测试</el-button>
              </el-form-item>
              <el-form-item label="测试结果" v-if="formInline.sqltest==true">
                  <el-input type="textarea" v-model="formInline.result" :rows='4'></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <!--响应动作-->
          <div class="tablebottom">
               <div class="form-block__title"><span style="color: rgb(255, 109, 109);">*</span>
            响应动作
                <div class="form-block__title-tips">
                    处理命中规则的消息
                </div>
               </div>
               <div class="bottomtable" style="padding-left:20px">
                   <div class="tableaction">
                       <el-table
                        :data="actionData"
                        style="width: 100%">
                        <el-table-column
                            prop="date"
                            label="类型"
                            width="180">
                        </el-table-column>
                        <el-table-column
                            prop="name"
                            label="参数"
                            width="180">
                        </el-table-column>
                        <el-table-column
                            prop="address"
                            label="操作">
                        </el-table-column>
                        </el-table>
                        <div>
                            <el-button type="success" plain icon="el-icon-circle-plus-outline" size="small" style="margin-top:20px;" @click="dialogFormVisible=true">添加</el-button>
                        </div>
                   </div>
               </div>
               <div>
                   <el-dialog title="响应动作" :visible.sync="dialogFormVisible" width="30%">
                <el-form :model="form" :rules="formrule">
                    <el-row style="border:0">
                        <el-col :span="12">
                            <el-form-item label="动作" prop="action">
                            <!-- <template slot="label"> -->
                                <el-popover
                                placement="top-start"
                                width="200"
                                trigger="hover"
                                content="动作类型">
                                <i class="el-icon-question" slot="reference" style="color:#71737d;"></i>
                            </el-popover>
                            <!-- </template> -->
                            <el-select v-model="form.action">
                                <el-option label="111" value="222"></el-option>
                            </el-select>
                        </el-form-item>
                        </el-col>
                        <el-col :span="12">

                        </el-col>
                    </el-row>
                   
                </el-form>
                <div slot="footer" class="dialog-footer">
                    <el-button @click="dialogFormVisible = false">取 消</el-button>
                    <el-button type="primary" @click="dialogFormVisible = false">确 定</el-button>
                </div>
                </el-dialog>
               </div>
          </div>
         <el-form-item label-width="0">
             <el-button type="success">新建</el-button>
             <el-button >取消</el-button>
         </el-form-item>
        </el-form>
      </el-card>
    </div>
  </div>
</template>
<script>
var editor1
var editor2
export default {
  data() {
    return {
      dialogFormVisible:false,
      title: "",
      formInline: {
        user: "",
        region: "",
        enginesql:'',
        remarks:'',
        sqltest:false,
        clientid:'c_swqx',
        username:'u_swqx',
        qos:1,
        topic:'t/a',
        payload:'',
        row1:24,
        row2:0,
        result:''
      },
      formlinerule: {
        region: [
          { required: true, message: "请选择触发事件", trigger: "change" }
        ],
        enginesql: [
            { required: true, message: '请填写规则SQL', trigger: 'blur' }
          ]
      },
      actiondata:[],
      form:{
          action:''
      },
      formrule: {
        action: [
            { required: true, message: '请选择动作', trigger: 'change' }
          ]
      },
    };
  },
  mounted() {
    this.title = this.$route.query.title;
        editor1 = ace.edit("editor1");
        editor1.session.setMode("ace/mode/json"); // 设置语言
        editor1.setTheme("ace/theme/eclipse"); // 设置主题
        editor1.setOptions({
        enableBasicAutocompletion: true,
        enableSnippets: true,
        enableLiveAutocompletion: true // 设置自动提示
    });
  },
  methods: {
      getEditor2(val){
          if(val==true){
              this.row1=12
              this.row2=12
               setTimeout(()=>{
               editor2 = ace.edit("editor2");
                editor2.session.setMode("ace/mode/json"); // 设置语言
                editor2.setTheme("ace/theme/eclipse"); // 设置主题
                editor2.setOptions({
                enableBasicAutocompletion: true,
                enableSnippets: true,
                enableLiveAutocompletion: true // 设置自动提示
            });
          },0)
          }else{
              this.row1=24
              this.row2=0
          }
         
          
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
    padding-bottom:10px;
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
    /deep/ .el-row{
        border-bottom:1px solid #666666;
        margin-bottom:20px;
    }
    /deep/ .tablebottom{
        padding-bottom:20px;
        margin-bottom:20px;
        border-bottom:1px solid #666666;
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
}
</style>
