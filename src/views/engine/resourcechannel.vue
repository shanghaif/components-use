<template>
  <div class="resourcechannel">
    <h3>资源通道管理</h3>
    <el-tabs v-model="activeName" @tab-click="handleClick">
      <el-tab-pane :label="'资源通道'+'('+total+')'" name="first">
        <div class="firsttable">
          <el-form :inline="true" :model="channelformsearch" class="demo-form-inline" size="small">
            <el-form-item>
              <el-input v-model="channelformsearch.name" placeholder="请输入资源名称搜索"></el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="Get_Re_Channel(0)">搜 索</el-button>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="addchanneltype">创建通道</el-button>
            </el-form-item>
          </el-form>
          <!----------------------------------------------------资源通道表格------------------>
          <el-table :data="tableData" style="width: 100%;" :row-class-name="getChannelEnable">
            <el-table-column label="通道编号">
              <template slot-scope="scope">
                <span>{{scope.row.id}}</span>
              </template>
            </el-table-column>
            <el-table-column label="通道名称">
              <template slot-scope="scope">
                <span>{{scope.row.attributes.name}}</span>
              </template>
            </el-table-column>
            <el-table-column label="启用状态">
              <template slot-scope="scope">
                <span v-if="scope.row.attributes.isEnable==true" style="color:green">已启用</span>
                <span v-else>已禁用</span>
              </template>
            </el-table-column>
            <el-table-column label="连接状态" width="200">
              <template slot-scope="scope">
                <span v-if="scope.row.attributes.status=='off'" style="color:red">未连接</span>
                <span v-else style="color:green">已连接</span>
              </template>
            </el-table-column>
            <el-table-column label="通道地址" width="200">
              <template slot-scope="scope">
                <span>{{scope.row.attributes.config.host}}</span>
              </template>
            </el-table-column>
            <el-table-column label="描述">
              <template slot-scope="scope">
                <span>{{scope.row.attributes.desc}}</span>
              </template>
            </el-table-column>
            <el-table-column label="操作" width="200">
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
        </div>
      </el-tab-pane>
      <!--弹窗--->
      <el-dialog
        :title="channelupdated+'资源通道'"
        :visible.sync="channelForm"
        width="40%"
        top="0"
        :before-close="handleClose"
      >
        <el-form :model="addchannel" label-width="100px" ref="addchannel" :rules="addrules">
          <el-form-item label="服务类型" prop="region" class="lastchildren">
            <el-select
              v-model="addchannel.region"
              placeholder="请选择服务类型"
              :disabled="channelId!=''"
              @change="removeauto('addchannel')"
            >
              <el-option
                v-for="(item,index) in channelregion"
                :label="item.name+item.channeltype"
                :key="index"
                :value="item.value"
              ></el-option>
            </el-select>
          </el-form-item>

          <!--kafka---------------------------------------------------------------------------------->
          <div class="notlastchildren notline" v-if="addchannel.region=='kafka'">
             <el-form-item
            label="kafka服务器"
            label-width="200px"
            prop="kafkahost"
            :rules='[
              {required:true,message:"kafa服务器不能为空",trigger: "blur"}
              ]'
          >
            <template>
              <span slot="label">
                <span>kafka服务器</span>
                <el-popover placement="top-start" width="200" trigger="hover" content="kafka服务器">
                  <i class="el-icon-question" slot="reference" style="color:#71737d;"></i>
                </el-popover>
              </span>
            </template>
            <el-input type="text" placeholder="kafka服务器" v-model="addchannel.kafkahost"></el-input>
          </el-form-item>
          </div>
         <div class="notlastchildren notline" v-if="addchannel.region=='kafka'">
            <el-form-item
            label="kafka端口"
            label-width="200px"
            prop="kafkaport"
            :rules='[
              {required:true,message:"kafka端口不能为空",trigger: "blur"},
              { validator: validPort }
              ]'
          >
            <el-input type="text" placeholder="kafka端口" v-model="addchannel.kafkaport"></el-input>
          </el-form-item>
         </div>
         <div v-if="addchannel.region=='kafka'"
            class="notlastchildren notline">
            <el-form-item
            label="kafka资源名"
            label-width="200px"
          >
            <el-input type="text" placeholder="kafka资源名" v-model="addchannel.kafkaname"></el-input>
          </el-form-item>
         </div>
         <div  v-if="addchannel.region=='kafka'"
            class="notlastchildren notline">
          <el-form-item
            label="kafka"
            label-width="200px"
          >
            <template>
              <span slot="label">
                <span>Metadata更新间隔</span>
                <el-popover
                  placement="top-start"
                  width="200"
                  trigger="hover"
                  content="Metadata更新间隔"
                >
                  <i class="el-icon-question" slot="reference" style="color:#71737d;"></i>
                </el-popover>
              </span>
            </template>
            <el-input
              type="text"
              placeholder="Metadata更新间隔"
              v-model.number="addchannel.kafkametadata"
            ></el-input>
          </el-form-item>
         </div>
          <div  v-if="addchannel.region=='kafka'"
            class="notlastchildren notline">
              <el-form-item
            label="kafka"
           
            label-width="200px"
          >
            <template>
              <span slot="label">
                <span>同步调用间隔时间</span>
                <el-popover placement="top-start" width="200" trigger="hover" content="同步调用间隔时间">
                  <i class="el-icon-question" slot="reference" style="color:#71737d;"></i>
                </el-popover>
              </span>
            </template>

            <el-input type="text" placeholder="同步调用间隔时间" v-model.number="addchannel.kafkaduring"></el-input>
          </el-form-item>
          </div>
          <div v-if="addchannel.region=='kafka'"
            class="notlastchildren notline">
            <el-form-item
            label="kafka"
            label-width="200px"
          >
            <template>
              <span slot="label">
                <span>最大批处理字节数</span>
                <el-popover placement="top-start" width="200" trigger="hover" content="最大批处理字节数">
                  <i class="el-icon-question" slot="reference" style="color:#71737d;"></i>
                </el-popover>
              </span>
            </template>
            <el-input type="text" placeholder="最大批处理字节数" v-model.number="addchannel.kafkabatch"></el-input>
          </el-form-item>
          </div>
          <div  v-if="addchannel.region=='kafka'"
            class="notlastchildren notline">
              <el-form-item
            label="acks"
            label-width="200px"
          >
            <el-select v-model="addchannel.kafkaacks">
              <el-option label="all" value="all"></el-option>
              <el-option label="0" value="0"></el-option>
              <el-option label="1" value="1"></el-option>
            </el-select>
          </el-form-item>
          </div>
          <div v-if="addchannel.region=='kafka'"
            class="notlastchildren notline">
               <el-form-item
            label="kafka"
            label-width="200px"
          >
            <template>
              <span slot="label">
                <span>压缩</span>
                <el-popover placement="top-start" width="200" trigger="hover" content="压缩">
                  <i class="el-icon-question" slot="reference" style="color:#71737d;"></i>
                </el-popover>
              </span>
            </template>
            <el-input type="text" placeholder="压缩" v-model="addchannel.kafkays"></el-input>
          </el-form-item>
          </div>
         <div  v-if="addchannel.region=='kafka'"
            class="notlastchildren notline">
             <el-form-item
            label="kafka"
            label-width="200px"
          >
            <template slot="label">
              <span>
                <span>发送消息的缓冲区大小</span>
                <el-popover placement="top-start" width="200" trigger="hover" content="发送消息的缓冲区大小">
                  <i class="el-icon-question" slot="reference" style="color:#71737d;"></i>
                </el-popover>
              </span>
            </template>
            <el-input type="text" placeholder="发送消息的缓冲区大小" v-model.number="addchannel.kafkabuffer"></el-input>
          </el-form-item>
         </div>
         
          <!--PG配置-资源通道选择参数配置   MongoDB,MySQL,PG-------------------------------------------------------------------------------------------------->
          <div v-if="addchannel.region=='postgresql'||addchannel.region=='mongodb'||addchannel.region=='mysql'||addchannel.region=='influxdb'" class="notlastchildren notline">
            <div>
               <el-form-item
            :label="addchannel.region+'服务器'"
            label-width="200px"
            prop="postgresqlhost"
            :rules='[{required:true,message:"服务器不能为空",trigger: "blur"}]'
          >
            <el-input type="text" placeholder="服务器" v-model="addchannel.postgresqlhost"></el-input>
          </el-form-item>
            </div>
            
          </div>
         <div v-if="addchannel.region=='postgresql'||addchannel.region=='mongodb'||addchannel.region=='mysql'||addchannel.region=='influxdb'"
            class="notlastchildren notline">
            <div>
               <el-form-item
                label="端口"
                label-width="200px"
                prop="postgresqlport"
                :rules='[{required:true,message:"服务器端口不能为空",trigger: "blur"},{ validator: validPort }]'
              >
                <el-input type="text" placeholder="端口" v-model.number="addchannel.postgresqlport"></el-input>
              </el-form-item>
            </div>
           
         </div>
         <div v-if="addchannel.region=='postgresql'||addchannel.region=='mongodb'||addchannel.region=='mysql'||addchannel.region=='influxdb'"
            class="notlastchildren notline">
            <div>
                <el-form-item
                  :label="addchannel.region+'用户名'"
                  label-width="200px"
                  prop="postgresqlusername"
                  :rules='[
                    {required:true,message:"用户名不能为空",trigger: "blur"}
                    ]'
                >
                <el-input
                  type="text"
                  placeholder="用户名"
                  v-model="addchannel.postgresqlusername"
                  class="notauto"
                  readonly
                ></el-input>
             </el-form-item>
            </div>
             
         </div>
         <div v-if="addchannel.region=='postgresql'||addchannel.region=='mongodb'||addchannel.region=='mysql'||addchannel.region=='influxdb'"
            class="notlastchildren notline">
            <div>
              <el-form-item
            :label="addchannel.region+'密码'"
            label-width="200px"
            prop="postgresqlpassword"
            :rules='[
              {required:true,message:"密码不能为空",trigger: "blur"}
              ]'
          >
            <el-input
              :type="pwdType"
              placeholder="密码"
              v-model="addchannel.postgresqlpassword"
              class="notauto readonly"
              readonly
            >
              <template slot="append">
                <span class="show-pwd" @click="showPwd">
                  <svg-icon :icon-class="isopen" />
                </span>
              </template>
            </el-input>
          </el-form-item>
            </div>
             
         </div>
         <div v-if="addchannel.region=='postgresql'||addchannel.region=='mongodb'||addchannel.region=='mysql'||addchannel.region=='influxdb'"
            class="notlastchildren notline">
            <div>
               <el-form-item
            label="database"
            label-width="200px"
            prop="postgresqldatabase"
            :rules='[
              {required:true, message:"database不能为空",trigger: "blur"}
              ]'
          >
            <el-input
              type="text"
              placeholder="database"
              v-model="addchannel.postgresqldatabase"
              class="notauto"
              readonly
            ></el-input>
          </el-form-item>
            </div>
            
         </div>
         <div  v-if="addchannel.region=='postgresql'||addchannel.region=='mongodb'||addchannel.region=='mysql'||addchannel.region=='influxdb'"
            class="notlastchildren notline">
            <div>
               <el-form-item
            label="批量写入大小"
           
            label-width="200px"
          >
            <el-input
              type="text"
              placeholder="批量写入大小"
              v-model.number="addchannel.postgresqllength"
              class="notauto"
              readonly
              autocomplete="off"
            ></el-input>
          </el-form-item>
            </div>  
         </div>
         
         <div v-if="addchannel.region=='postgresql'||addchannel.region=='mongodb'||addchannel.region=='mysql'||addchannel.region=='influxdb'"
            class="notlastchildren notline" >
            <div>
                <el-form-item
            :label="addchannel.region+'资源名'"
             label-width="200px"
          >
            <el-input type="text" placeholder="资源名" v-model="addchannel.postgresqlname"></el-input>
          </el-form-item>
            </div>
             
         </div>
         <div  v-if="addchannel.region=='postgresql'||addchannel.region=='mongodb'||addchannel.region=='mysql'||addchannel.region=='influxdb'"
            class="notlastchildren notline">
            <div>
              <el-form-item
            :label="addchannel.region+'连接数'"
            label-width="200px"
          >
            <el-input
              placeholder="连接数"
              v-model.number="addchannel.postgresqlconnect"
              class="notauto"
              readonly
              autocomplete="off"
              type="number"
            ></el-input>
          </el-form-item>
            </div>
              
         </div>
          <div v-if="addchannel.region=='postgresql'||addchannel.region=='mongodb'||addchannel.region=='mysql'||addchannel.region=='influxdb'"
            class="notlastchildren notline">
            <div>
               <el-form-item
                label="开始SSL"
                label-width="200px"
              >
                <el-select v-model="addchannel.postgresqlssl">
                  <el-option label="disable" value="disable"></el-option>
                  <el-option label="require" value="require"></el-option>
                  <el-option label="verify-ca" value="verify-ca"></el-option>
                  <el-option label="verify-full" value="verify-full"></el-option>
                </el-select>
              </el-form-item>
            </div>
              
          </div>
         <div v-if=" addchannel.region=='HTTP'">
            <el-form-item
            label="端口"
            
            prop="port"
            :rules='[{ required: true, message:"端口不能为空",trigger: "blur" }]'
            class="notlastchildren"
          >
            <el-input v-model="addchannel.port" autocomplete="off" placeholder="请输入通道端口"></el-input>
          </el-form-item>
         </div>
          <div  v-if="addchannel.region=='HTTP'">
              <el-form-item
            label="路径"
           
            prop="path"
            :rules='[
          { required: true, message: "需要输入正确的url", trigger: "blur" }]'
            class="notlastchildren"
          >
            <el-input v-model="addchannel.path" autocomplete="off" placeholder="请输入通道路径"></el-input>
          </el-form-item>
          </div>
          <!--dynamodb----------------->
          <div  v-if="addchannel.region=='dynamodb'"
            class="notlastchildren notline">
            <div>
               <el-form-item
            :label="addchannel.region+'区域'"
           
            label-width="200px"
            prop="dynamodbhost"
            :rules='[
              {required:true,message:"服务器不能为空",trigger: "blur"}
              ]'
          >
            <el-input type="text" placeholder="服务器" v-model="addchannel.dynamodbhost"></el-input>
          </el-form-item>
            </div>
           
          </div>
          <div v-if="addchannel.region=='dynamodb'"
            class="notlastchildren notline">
            <div>
               <el-form-item
            :label="addchannel.region+'服务器'"
            
            label-width="200px"
            prop="dynamodbhost"
            :rules='[
              {required:true,message:"服务器不能为空",trigger: "blur"}
              ]'
          >
            <el-input type="text" placeholder="服务器" v-model="addchannel.dynamodbhost"></el-input>
          </el-form-item>
            </div>
            
          </div>
         <div v-if="addchannel.region=='dynamodb'"
            class="notlastchildren notline">
            <div>
               <el-form-item
            label="连接池大小"
            
            label-width="200px"
            prop="dynamodbhost"
            :rules='[
              {required:true,message:"连接池大小不能为空",trigger: "blur"}
              ]'
          >
            <el-input type="text" placeholder="连接池大小" v-model="addchannel.dynamodbhost"></el-input>
          </el-form-item>
            </div>
             
         </div>
          <div  v-if="addchannel.region=='dynamodb'"
            class="notlastchildren notline">
            <div>
              <el-form-item
            label="连接访问ID"
           
            label-width="200px"
            prop="dynamodbhost"
            :rules='[
              {required:true,message:"连接访问ID不能为空",trigger: "blur"}
              ]'
          >
            <el-input type="text" placeholder="连接访问ID" v-model="addchannel.dynamodbhost"></el-input>
          </el-form-item>
            </div>
              
          </div>
          <div  v-if="addchannel.region=='dynamodb'"
            class="notlastchildren notline">
            <div>
              <el-form-item
            label="连接访问密钥"
           
            label-width="200px"
            prop="dynamodbhost"
            :rules='[
              {required:true,message:"连接访问密钥不能为空",trigger: "blur"}
              ]'
          >
            <el-input type="text" placeholder="连接访问密钥" v-model="addchannel.dynamodbhost"></el-input>
          </el-form-item>
            </div>
            
          </div>
          <div  v-if="addchannel.region=='dynamodb'"
            class="notlastchildren notline">
            <div>
              <el-form-item
            label="自动重连间隔"
           
            label-width="200px"
          >
            <el-input type="text" placeholder="自动重连间隔" v-model="addchannel.dynamodbhost"></el-input>
          </el-form-item>
            </div>
              
          </div>
          
          <!--------------------------------RabbitMq----------------------------------------------------------------------------------->
          <div v-if="addchannel.region=='rabbitmq'"
            class="notlastchildren notline">
            <div>
               <el-form-item
            label="RabbitMq服务器"
            
            label-width="200px"
            prop="rabbitmqhost"
            :rules='[
              {required:true,message:"RabbitMq服务器不能为空",trigger: "blur"}
              ]'
          >
            <el-input type="text" placeholder="RabbitMq服务器" v-model="addchannel.rabbitmqhost"></el-input>
          </el-form-item>
            </div>
             
          </div>
          <div v-if="addchannel.region=='rabbitmq'"
            class="notlastchildren notline">
            <div>
               <el-form-item
            label="连接池大小"
            
            label-width="200px"
            prop="rabbitmqconnect"
            :rules='[
              {required:true,message:"连接池大小",trigger: "blur"}
              ]'
          >
            <el-input type="text" placeholder="连接池大小" v-model="addchannel.rabbitmqconnect"></el-input>
          </el-form-item>
            </div>
             
          </div>
          <div  v-if="addchannel.region=='rabbitmq'"
            class="notlastchildren notline">
            <div>
              <el-form-item
            label="用户名"
           
            label-width="200px"
          >
            <el-input
              type="text"
              placeholder="用户名"
              v-model="addchannel.rabbitmqusername"
              class="notauto"
              readonly
            ></el-input>
          </el-form-item>
            </div>
            
          </div>
          <div v-if="addchannel.region=='rabbitmq'"
            class="notlastchildren notline">
            <div>
               <el-form-item
            label="密码"
            
            label-width="200px"
          >
            <el-input 
              type="text"
              placeholder="密码"
              v-model="addchannel.rabbitmqpassword"
              class="notauto"
              readonly
            ></el-input>
          </el-form-item>
            </div>
           
          </div>
          <div v-if="addchannel.region=='rabbitmq'"
            class="notlastchildren notline">
            <div>
               <el-form-item
            label="连接超时时间"
            
            label-width="200px"
          >
            <el-input
              type="text"
              placeholder="连接超时时间"
              v-model="addchannel.rabbitmqtimeout"
              class="notauto"
              readonly
            >
              <template slot="append">s</template>
            </el-input>
          </el-form-item>
            </div>
              
          </div>
         <div   v-if="addchannel.region=='rabbitmq'"
            class="notlastchildren notline">
            <div>
              <el-form-item
            label="虚拟主机"
          
            label-width="200px"
          >
            <el-input
              type="text"
              placeholder="虚拟主机"
              v-model="addchannel.rabbitmqinvented"
              class="notauto"
              readonly
            ></el-input>
          </el-form-item>
            </div>
            
         </div>
          <div  v-if="addchannel.region=='rabbitmq'"
            class="notlastchildren notline">
            <div>
               <el-form-item
            label="心跳间隔"
           
            label-width="200px"
          >
            <el-input
              type="text"
              placeholder="心跳间隔"
              v-model="addchannel.rabbitmqtimeout"
              class="notauto"
              readonly
            >
              <template slot="append">s</template>
            </el-input>
          </el-form-item>
            </div>
            
          </div>
         <div  v-if="addchannel.region=='rabbitmq'"
            class="notlastchildren notline">
            <div>
               <el-form-item
            label="自动重连间隔"
           
            label-width="200px"
          >
            <el-input
              type="text"
              placeholder="自动重连间隔"
              v-model="addchannel.rabbitmqautoconnect"
              class="notauto"
              readonly
            >
              <template slot="append">s</template>
            </el-input>
          </el-form-item>
            </div>
            
         </div>
         
          <!---------------------统一的配置描述---------------------------->
          <el-form-item label="通道描述" class="lastchildren">
            <el-input
              v-model="addchannel.desc"
              autocomplete="off"
              type="textarea"
              :rows="3"
              placeholder="请输入通道描述"
            ></el-input>
          </el-form-item>
          <el-form-item class="lastchildren">
            <el-button type="success" size="medium" @click="testConnect('addchannel')">测试连接</el-button>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="handleClose">取 消</el-button>
          <el-button type="primary" @click="addchannelForm('addchannel')">确 定</el-button>
        </div>
      </el-dialog>
    </el-tabs>
  </div>
</template>
<script>
import Parse from "parse";
import { setInterval } from 'timers';
import {
  channelConnect,
  updateConnect,
  deleteConnect
} from "@/api/testchannel";


export default {
  data() {
    return {
      isopen: "suo",
      pwdType: "password",
      tableData: [],
      channelForm: false,
      channelupdated: "新增",
      activeName: "first",
      channelId: "",
      channelformsearch: {
        name: ""
      },
      channelregion: [
        {
          name: "Kafka",
          value: "kafka",
          channeltype: "资源通道",
          channelvalue: "2"
        },
        {
          name: "MySQL",
          value: "mysql",
          channeltype: "资源通道"
        },
        {
          name: "MongoDB",
          value: "mongodb",
          channeltype: "资源通道"
        },
        {
          name: "postgresql",
          value: "postgresql",
          channeltype: "资源通道"
        },
        {
          name: "RabbitMq",
          value: "rabbitmq",
          channeltype: "资源通道"
        },
        {
          name: "InfluxDB",
          value: "influxdb",
          channeltype: "资源通道"
        },
        {
          name: "DynamoDB",
          value: "dynamodb",
          channeltype: "资源通道"
        }
      ],
      addchannel: {
        region: "kafka",
        port: "",
        path: "",
        desc: "",
        //kafka配置
        kafkahost: "127.0.0.1",
        kafkaport: 9092,
        kafkaname: "",
        kafkametadata: "3s",
        kafkaduring: "3s",
        kafkabuffer: 33554433,
        kafkaacks: "all",
        kafkays: "",
        kafkabatch: 16384,
        //其他数据库配置，已pg名称命名
        postgresqlconnect: "",
        postgresqlhost: "",
        postgresqlusername: "",
        postgresqlpassword: "",
        postgresqlport: 5432,
        postgresqldatabase: "postgres",
        postgresqlssl: "disable",
        postgresqllength: "",
        postgresqlname: "",
        isEnable: true,
        //dynamedb
        dynamodbhost: "",
        //rabbitmq
        rabbitmqhost: "",
        rabbitmqusername: "",
        rabbitmqname: "",
        rabbitconnect: "",
        rabbitpassword: "",
        rabbittimeout: "",
        rabbitinvented: "", //虚拟主机
        rabbitmqautoconnect: "" //自动重连间隔
      },
      addrules: {
        name: [{ required: true, message: "请输入通道名称", trigger: "blur" }],
        region: [
          { required: true, message: "请选择服务类型", trigger: "change" }
        ],
        channeltype: [
          { required: true, message: "请选择通道类型", trigger: "change" }
        ],
      },
      length: 10,
      start: 0,
      total: 0,
      resourceid: ""
    };
  },
  mounted() {
    this.Get_Re_Channel(0);
  },
  methods: {
    showPwd() {
      var readonly = document.getElementsByClassName("readonly")[0];
      if (this.isopen == "suo") {
        //  readonly.children[0].removeAttribute('readonly')
        this.isopen = "opensuo";
        this.pwdType = "text";
      } else {
        // readonly.children[0].setAttribute('readonly','readonly')
        this.isopen = "suo";
        this.pwdType = "password";
      }
    },
    //验证
    validUrl(rule, value, callback) {
      let reg = /^[A-Za-z0-9]+\.[A-Za-z0-9]+[\/=\?%\-&_~`@[\]\':+!]*([^<>\"\"])*$/;
      if (!reg.test(value)) {
        callback(new Error("需要输入正确的url"));
      } else {
        callback();
      }
    },
    validPort(rule, value, callback) {
      let reg = /^([0-9]|[1-9]\d|[1-9]\d{2}|[1-9]\d{3}|[1-5]\d{4}|6[0-4]\d{3}|65[0-4]\d{2}|655[0-2]\d|6553[0-5])$/;
      if (!reg.test(value)) {
        callback(new Error("需要输入正确的端口号"));
      } else {
        callback();
      }
    },
    //初始化数据
    Get_Re_Channel(start) {
      if (start == 0) {
        this.start = 0;
      }
      var Resource = Parse.Object.extend("Resource");
      var resource = new Parse.Query(Resource);
      resource.skip(this.start);
      resource.limit(this.length);
      resource.ascending("updatedAt");
      if (this.channelformsearch.name != "") {
        resource.contains("name", this.channelformsearch.name);
      }
      resource.count().then(count => {
        this.total = count;
        resource.find().then(
          resultes => {
            if (resultes) {
              this.tableData = resultes;
            }
          },
          error => {
            if (error.code == "209") {
              this.$message({
                type: "warning",
                message: "登陆权限过期，请重新登录"
              });
              this.$router.push({
                path: "/login"
              });
            } else if (error.code == 119) {
              this.$message({
                type: "error",
                message: "没有操作权限"
              });
            }
          }
        );
      });
    },
    //更新状态
    qyChannel(row) {
      updateConnect(
        row.id,
        row.attributes.config.host,
        row.attributes.config.port,
        row.attributes.config.username,
        row.attributes.config.password,
        row.attributes.config.database,
        row.attributes.name,
        row.attributes.config.sql_length,
        row.attributes.config.connect,
        row.attributes.config.ssl,
        !row.attributes.isEnable
      )
        .then(response => {
          if (response) {
            this.$message.success("状态更新成功");
            this.Get_Re_Channel(0);
          }
        })
        .catch(error => {
          this.$message.error(error.error);
        });
    },
    //编辑设备
    updateChannel(row) {
      this.channelForm = true;
      this.channelupdated = "编辑";
      var Resource = Parse.Object.extend("Resource");
      var resource = new Parse.Query(Resource);
      this.resourceid = row.id;
      resource.get(row.id).then(
        resultes => {
          if (
            resultes.attributes.resource_type == "mongodb" ||
            resultes.attributes.resource_type == "mysql" ||
            resultes.attributes.resource_type == "postgresql" ||
            resultes.attributes.resource_type == "influxdb"
          ) {
            this.addchannel.region = resultes.attributes.resource_type;
            (this.addchannel.postgresqlconnect =
              resultes.attributes.config.connect),
              (this.addchannel.postgresqlhost =
                resultes.attributes.config.host),
              (this.addchannel.postgresqlusername =
                resultes.attributes.config.username),
              (this.addchannel.postgresqlpassword =
                resultes.attributes.config.password),
              (this.addchannel.postgresqlport =
                resultes.attributes.config.port),
              (this.addchannel.postgresqldatabase =
                resultes.attributes.config.database),
              (this.addchannel.postgresqlssl = "disable"),
              (this.addchannel.postgresqllength =
                resultes.attributes.config.sql_length),
              (this.addchannel.postgresqlname = resultes.attributes.name);
            this.addchannel.isEnable = resultes.attributes.isEnable;
          }
        },
        error => {
          if (error.code == "209") {
            this.$message({
              type: "warning",
              message: "登陆权限过期，请重新登录"
            });
            this.$router.push({
              path: "/login"
            });
          } else if (error.code == 119) {
            this.$message({
              type: "error",
              message: "没有操作权限"
            });
          }
        }
      );
    },
    addchannelForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          if (this.resourceid != "") {
            updateConnect(
              this.resourceid,
              this.addchannel.postgresqlhost,
              this.addchannel.postgresqlport,
              this.addchannel.postgresqlusername,
              this.addchannel.postgresqlpassword,
              this.addchannel.postgresqldatabase,
              this.addchannel.postgresqlname,
              this.addchannel.postgresqllength,
              this.addchannel.postgresqlconnect,
              this.addchannel.postgresqlssl,
              this.addchannel.isEnable
            )
              .then(response => {
                if (response) {
                  this.$message.success("编辑成功");
                  this.channelForm = false;
                  this.Get_Re_Channel(0);
                }
              })
              .catch(error => {
                this.$message.error(error);
              });
          }
        }
      });
    },
    addchanneltype() {
      this.channelForm = true;
      this.channelupdated = "新增";
    },
    testConnect(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          console.log(this.$refs[formName])
          if (
            this.addchannel.region == "mongodb" ||
            this.addchannel.region == "mysql" ||
            this.addchannel.region == "postgresql" ||
            this.addchanneltype.region == "influxdb"
          ) {
            channelConnect(
              this.addchannel.region.toLowerCase(),
              this.addchannel.postgresqlhost,
              this.addchannel.postgresqlport,
              this.addchannel.postgresqlusername,
              this.addchannel.postgresqlpassword,
              this.addchannel.postgresqldatabase,
              this.addchannel.postgresqlname,
              this.addchannel.postgresqllength,
              this.addchannel.postgresqlconnect,
              this.addchannel.postgresqlssl
            )
              .then(resultes => {
                if (resultes) {
                  this.$notify({
                    title: "成功",
                    message: "连接可用,通道已创建",
                    type: "success",
                    duration: 2000
                  });
                }
              })
              .catch(error => {
                this.$notify({
                  title: "连接不可用",
                  message: error.reason,
                  type: "error",
                  duration: 2000
                });
              });
          }
        } else {
          this.$message.error("有必填项未填写");
          return false;
        }
      });
    },
    //关闭弹窗
    handleClose() {
      this.addchannel = {
        region: "HTTP",
        port: "",
        path: "",
        desc: "",
        kafkaclient: "127.0.0.1:9092",
        kafkametadata: "3s",
        kafkaduring: "3s",
        kafkakb: "1024KB",
        kafkays: "",
        kafkahc: "1024KB",
        postgresqlconnect: "",
        postgresqlhost: "",
        postgresqlusername: "",
        postgresqlpassword: "",
        postgresqlport: 5432,
        postgresqldatabase: "postgres",
        postgresqlssl: "disable",
        postgresqllength: "",
        postgresqlname: "",
        isEnable: true
      };
      this.channelForm = false;
      // this.$refs["addchannel"].resetFields();
      this.resourceid = "";
    },
    getChannelEnable(row, rowIndex) {
      if (row.row.attributes.isEnable == true) {
        return "green_active";
      } else {
        return "red_active";
      }
    },
    //分页
    channelSizeChange(val) {
      this.length = val;
    },
    channelCurrentChange(val) {
      this.start = (val - 1) * this.length;
    },
    removeauto(formName) {
      //去掉自动补全
      //   this.$refs[formName].resetFields();
      setTimeout(() => {
        var notautolength = document.getElementsByClassName("notauto");
        for (var i = 0; i < notautolength.length; i++) {
          notautolength[i].children[0].removeAttribute("readonly");
        }
      }, 100);
    },
    //删除设备
    deleteChannel(scope) {
      deleteConnect(scope.row.id)
        .then(resultes => {
          if (resultes) {
            this.$message.error("删除成功");
            scope._self.$refs[`popover-${scope.$index}`].doClose();
            this.Get_Re_Channel(0);
          }
        })
        .catch(error => {
          this.$message.error(error);
        });
    }
  }
};
</script>
<style lang="scss" scoped>
.resourcechannel {
  width: 100%;
  height: 100%;
  padding: 20px;
  box-sizing: border-box;
  /deep/ .green_active {
    color: green;
  }
  /deep/ .red_active {
    color: red;
  }
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
      .notlastchildren{
        width:50%;
      }
      .el-form-item {
        width: 100%;
        .el-select {
          width: 100%;
        }
      }
      .lastchildren {
        width: 100%;
        // .el-form-item__label{
        //   position: relative;
        //   left:20px;
        //   text-align:left;
        // }
      }
      .notlastchildren {
        @media screen and (max-width: 1350px) {
          width: 100%;
        }
      }
      /deep/ .notline {
        .el-form-item__label {
          text-align: left;
          position: relative;
          left: 100px;
          z-index: 100;
        }
        .el-form-item__content {
          margin-left: 100px !important;
        }
        @media screen and (max-width: 1350px) {
          .el-form-item__label {
            text-align: left;
            position: relative;
            left: 30px;
            z-index: 100;
          }
          .el-form-item__content {
            margin-left: 30px !important;
          }
          .el-form-item{
            width:100%;
          }
        }
      }
    }
  }
  /deep/ .el-button--mini {
    margin: 2px 0;
  }
  /deep/ .row-bg {
    .el-form-item__content {
      width: 100%;
    }
  }
  /deep/ .el-dialog__wrapper {
    margin-bottom: 20px;
  }
}
</style>
<style scoped>
input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  -webkit-appearance: none !important;
  margin: 0;
}
</style>