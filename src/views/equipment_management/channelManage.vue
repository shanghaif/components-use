<template>
  <div class="channelmanage">
    <h3>服务通道管理</h3>
    <el-tabs v-model="activeName" @tab-click="handleClick">
      <el-tab-pane :label="'设备通道'+'('+total+')'" name="first">
        <div class="firsttable">
          <el-form :inline="true" :model="channelformsearch" class="demo-form-inline" size="small">
            <el-form-item>
              <el-input v-model="channelformsearch.name" placeholder="请输入通道名称"></el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="getChannel(0)">搜 索</el-button>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="channelForm=true">创建通道</el-button>
            </el-form-item>
          </el-form>
        </div>
        <el-table :data="tableData" style="width: 100%;">
          <el-table-column label="通道名称">
            <template slot-scope="scope">
              <span>{{scope.row.attributes.name}}</span>
            </template>
          </el-table-column>
          <el-table-column label="通道地址" width="300">
            <template slot="header" slot-scope="scope">
              <span><el-tooltip content="${productId}为对应的产品Id,${addr}为对应的设备地址" placement="top">
                <span>通道路径<i class="el-icon-question"></i></span>
              </el-tooltip></span>
            </template>
            <template slot-scope="scope">
              <span>{{'channel/'+scope.row.attributes.name+'/${productId}/${addr}'}}</span>
            </template>
          </el-table-column>
          <el-table-column label="服务类型">
            <template slot-scope="scope">
              <span>{{scope.row.attributes.netType}}</span>
            </template>
          </el-table-column>
          <el-table-column label="侦听端口/TOPIC">
            <template slot-scope="scope">
              <span v-if="scope.row.attributes.config.port">{{scope.row.attributes.config.port}}</span>
            </template>
          </el-table-column>
          <el-table-column label="通道状态" >
            <template slot-scope="scope">
              <span v-if="scope.row.attributes.isEnable==true" style="color:green">已启用</span>
              <span v-else>已禁用</span>
            </template>
          </el-table-column>
          <el-table-column label="操作">
            <template slot-scope="scope">
              <el-button
                type="success"
                v-if="scope.row.attributes.isEnable==false"
                size="mini"
                @click="qyChannel(scope.row)"
              >启用</el-button>
              <el-button type="danger" v-else size="mini" @click="qyChannel(scope.row)">禁用</el-button>
              <el-button type="primary" size="mini" @click="updateChannel(scope.row)">编辑</el-button>
              <el-popover placement="top" width="300" :ref="`popover-${scope.$index}`">
                <p>确定删除这个{{scope.row.attributes.name}}通道吗？</p>
                <div style="text-align: right; margin: 0">
                  <el-button
                    size="mini"
                    @click="scope._self.$refs[`popover-${scope.$index}`].doClose()"
                  >取消</el-button>
                  <el-button type="primary" size="mini" @click="deleteChannel(scope)">确定</el-button>
                </div>
                <el-button type="danger" size="mini" slot="reference">删除</el-button>
              </el-popover>
            </template>
          </el-table-column>
        </el-table>
        <div class="elpagination" style="margin-top:20px;">
          <el-pagination
            @size-change="channelSizeChange"
            @current-change="channelCurrentChange"
            :page-sizes="[10, 20, 30, 50]"
            :page-size="length"
            layout="total, sizes, prev, pager, next, jumper"
            :total="total"
          ></el-pagination>
        </div>
        <!--通道管理弹窗-->
        <el-dialog title="新建服务通道" :visible.sync="channelForm" width="40%">
          <!-- <div style="margin:20px 0;">服务通道设置</div> -->
          <el-form :model="addchannel" label-width="80px" ref="addchannel" :rules="addrules">
            <el-form-item label="通道名称" prop="name">
              <el-input v-model="addchannel.name" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="服务类型" prop="region">
              <el-select v-model="addchannel.region" placeholder="请选择服务类型">
                <el-option label="TCP" value="TCP"></el-option>
                <el-option label="UDP" value="UDP"></el-option>
                <el-option label="HTTP" value="HTTP"></el-option>
                <el-option label="MQTT" value="MQTT"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="侦听端口" v-if="addchannel.region!='MQTT'" prop="port">
              <el-input v-model.number="addchannel.port" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="TOPIC" v-if="addchannel.region=='MQTT'" prop="topic">
              <el-input v-model="addchannel.topic" autocomplete="off"></el-input>
            </el-form-item>
             <el-form-item label="通道类型" prop="channeltype">
              <el-select v-model="addchannel.channeltype" placeholder="请选择通道类型">
                <el-option label="采集通道" value="1"></el-option>
                <el-option label="上报通道" value="2"></el-option>
                <el-option label="存储通道" value="3"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="描述">
              <el-input v-model="addchannel.desc" autocomplete="off" type="textarea" :rows="3"></el-input>
            </el-form-item>
          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button @click="channelForm = false">取 消</el-button>
            <el-button type="primary" @click="addchannelForm('addchannel')">确 定</el-button>
          </div>
        </el-dialog>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>
<script>
import Parse from "parse";
import { prototype } from "stream";
export default {
  data() {
    return {
      //添加产品dialog第二层
      innerVisible: false,
      //全部产品信息
      allProductData: [],
      allProductlength: 10,
      allProductstart: 0,
      allProducttotal: 0,
      productData: [],
      channelProductdialog: false,
      productstart: 0,
      productlength: 10,
      producttotal: 0,
      total: 0,
      start: 0,
      length: 10,
      tableData: [],
      activeName: "first",
      channelformsearch: {
        name: ""
      },
      channelForm: false,
      addchannel: {
        name: "",
        region: "",
        topic: "",
        port: "",
        channeltype:''
      },
      channelId: "",
      addrules: {
        name: [{ required: true, message: "请输入通道名称", trigger: "blur" }],
        region: [
          { required: true, message: "请选择服务类型", trigger: "change" }
        ],
        channeltype: [
          { required: true, message: "请选择通道类型", trigger: "change" }
        ],
        topic: [{ required: true, message: "请输入topic", trigger: "blur" }],
        port: [
          { required: true, message: "请输入侦听端口", trigger: "blur" },
          { type: "number", message: "端口必须为数字值" }
        ]
      },
      productIds: []
    };
  },
  mounted() {
    this.getChannel();
  },
  methods: {
    utc2beijing(utc_datetime) {
      // 转为正常的时间格式 年-月-日 时:分:秒
      var date = new Date(+new Date(utc_datetime) + 8 * 3600 * 1000)
        .toISOString()
        .replace(/T/g, " ")
        .replace(/\.[\d]{3}Z/, "");
      return date; // 2017-03-31 16:02:06
    },
    //初始化
    getChannel(start) {
      if (start == 0) {
        this.start = 0;
      }
      var Channel = Parse.Object.extend("Channel");
      var channel = new Parse.Query(Channel);
      if (this.channelformsearch.name != "") {
        channel.equalTo("name", this.channelformsearch.name);
      }
      channel.ascending("-createdAt");
      channel.skip(this.start);
      channel.limit(this.length);
      channel.count().then(
        count => {
          this.total = count;
          channel.find().then(resultes => {
            if (resultes) {
              this.tableData = resultes;
            }
          });
        },
        error => {
          this.$message.error(error.message);
        }
      );
    },
    //分页
    channelSizeChange(val) {
      this.length = val;
      this.getChannel();
    },
    channelCurrentChange(val) {
      this.start = (val - 1) * this.length;
      this.getChannel();
    },
    addchannelForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          var Channel = Parse.Object.extend("Channel");
          var searchchannel = new Parse.Query(Channel);
          searchchannel.equalTo("config.port", this.addchannel.port);
          searchchannel.find().then(resultes => {
           
              var channel = new Channel();
              if (this.channelId != "") {
                channel.id = this.channelId;
              }else{
                 
                 if (resultes.length == 0) {

                 }
                 else {
                  this.$message({
                    type: "warning",
                    message: "此端口已存在"
                  });
                } 
              }
              channel.set("name", this.addchannel.name);
              channel.set("netType", this.addchannel.region);
              channel.set("type", this.addchannel.channeltype);
              channel.set("desc", this.addchannel.desc);
              channel.set("isEnable", false);
              if (this.addchannel.region != "MQTT") {
                channel.set("config", {
                  port: this.addchannel.port
                });
              } else {
                channel.set("config", {
                  topic: this.addchannel.topic
                });
              }
              channel.save().then(
                resultes => {
                  if (resultes) {
                    this.$message({
                      type: "success",
                      message: "成功"
                    });
                    this.$refs['addchannel'].resetFields();
                    this.addchannel={
                      name: "",
                      region: "",
                      topic: "",
                      port: "",
                      channeltype:''
                    }
                    this.channelForm = false;
                    this.channelId = "";
                    this.getChannel();
                  }
                },
                error => {
                  this.$message({
                    type: "error",
                    message: error.message
                  });
                }
              );
             
          });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    //更新状态
    qyChannel(row) {
      var Channel = Parse.Object.extend("Channel");
      var channel = new Channel();
      channel.id = row.id;
      channel.set("isEnable", !row.attributes.isEnable);
      channel.save().then(
        resultes => {
          if (resultes) {
            this.$message({
              type: "success",
              message: "状态修改成功"
            });
            this.getChannel();
          }
        },
        error => {
          this.$message({
            type: "error",
            message: error.message
          });
        }
      );
    },
    //编辑
    updateChannel(row) {
      this.channelForm = true;
      this.addchannel.name = row.attributes.name;
      this.addchannel.region = row.attributes.netType;
      if (row.attributes.config.topic) {
        this.addchannel.topic = row.attriburtes.config.topic;
      }
      this.addchannel.port = row.attributes.config.port;
      this.addchannel.desc = row.attributes.desc;
      this.addchannel.channeltype = row.attributes.type
      this.channelId = row.id;
    },
    //删除
    deleteChannel(scope) {
      var Channel = Parse.Object.extend("Channel");
      var channel = new Channel();
      channel.id = scope.row.id;
      channel.destroy().then(
        resultes => {
          this.$message({
            type: "success",
            message: "删除成功"
          });
          scope._self.$refs[`popover-${scope.$index}`].doClose();
          this.getChannel();
        },
        error => {
          this.$message({
            type: "error",
            message: error.message
          });
        }
      );
    },
    
  }
};
</script>
<style lang="scss" scoped>
.channelmanage {
  width: 100%;
  height: 100%;
  padding: 20px;
  box-sizing: border-box;
  /deep/ .el-button + .el-button {
    margin-left: 0;
  }
  /deep/ .el-tabs__item {
    font-size: 16px;
    margin-top: 20px;
    margin: 0;
    height: 50px;
    line-height: 50px;
    font-family: auto;
  }
  .firsttable {
    /deep/ .el-form-item:last-child {
      float: right;
    }
  }
  /deep/ .el-dialog__header {
    border-bottom: 1px solid #cccccc;
  }
  /deep/ .el-dialog__body {
    .el-form {
      display: flex;
      flex-wrap: wrap;
      .el-form-item {
        width: 50%;

        .el-select {
          width: 100%;
        }
      }
      .el-form-item:last-child {
        width: 100%;
      }
    }
  }
  /deep/ .el-button--mini{
    margin:2px 0;
  }
}
</style>
