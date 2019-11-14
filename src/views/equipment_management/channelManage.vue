<template>
  <div class="channelmanage">
    <h3>{{$t('developer.servicechannelmanagement')}}</h3>
    <el-tabs v-model="activeName" @tab-click="handleClick">
      <el-tab-pane :label="$t('developer.equipmentchannel')+'('+total+')'" name="first">
        <div class="firsttable">
          <el-form :inline="true" :model="channelformsearch" class="demo-form-inline" size="small">
            <el-form-item>
              <el-input v-model="channelformsearch.name" :placeholder="$t('developer.inputchannelname')"></el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="getChannel(0)">{{$t('developer.search')}}</el-button>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="addchanneltype">{{$t('developer.createchannel')}}</el-button>
            </el-form-item>
          </el-form>
        </div>
        <el-table :data="tableData" style="width: 100%;" :row-class-name="getChannelEnable">
          <el-table-column :label="$t('developer.channelnumber')">
            <template slot-scope="scope">
              <span>{{scope.row.id}}</span>
            </template>
          </el-table-column>
          <el-table-column :label="$t('developer.channelname')">
            <template slot-scope="scope">
              <span>{{scope.row.attributes.name}}</span>
            </template>
          </el-table-column>
          <el-table-column :label="$t('developer.channeltype')">
            <template slot-scope="scope">
              <span v-if="scope.row.attributes.type==1">{{$t('developer.collectionchannel')}}</span>
              <span v-else>{{$t('developer.resourcechannel')}}</span>
            </template>
          </el-table-column>
          <el-table-column :label="$t('developer.servicetype')">
            <template slot-scope="scope">
              <span>{{scope.row.attributes.cType}}</span>
            </template>
          </el-table-column>

          <el-table-column :label="$t('developer.channelstatus')">
            <template slot-scope="scope">
              <span v-if="scope.row.attributes.isEnable==true" style="color:green">{{$t('developer.enabled')}}</span>
              <span v-else>{{$t('developer.disabled')}}</span>
            </template>
          </el-table-column>
          <el-table-column :label="$t('developer.channeladdr')" width="200">
            <!-- <template slot="header" slot-scope="scope">
              <span>
                <el-tooltip content="${productId}为对应的产品Id,${addr}为对应的设备地址" placement="top">
                  <span>
                    通道路径
                    <i class="el-icon-question"></i>
                  </span>
                </el-tooltip>
              </span>
            </template>-->
            <template slot-scope="scope">
              <span>{{'channel/'+scope.row.id}}</span>
            </template>
          </el-table-column>

          <el-table-column :label="$t('developer.describe')">
            <template slot-scope="scope">
              <span>{{scope.row.attributes.desc}}</span>
            </template>
          </el-table-column>
          <el-table-column :label="$t('developer.operation')" width="250">
            <template slot-scope="scope">
              <el-button
                type="success"
                v-if="scope.row.attributes.isEnable==false"
                size="mini"
                @click="qyChannel(scope.row)"
              >{{$t('developer.enable')}}</el-button>
              <el-button type="danger" v-else size="mini" @click="qyChannel(scope.row)">{{$t('developer.prohibit')}}</el-button>
              <el-button type="primary" size="mini" @click="updateChannel(scope.row)">{{$t('developer.edit')}}</el-button>
              <el-popover placement="top" width="300" :ref="`popover-${scope.$index}`">
                <p>确定删除这个{{scope.row.attributes.name}}通道吗？</p>
                <div style="text-align: right; margin: 0">
                  <el-button
                    size="mini"
                    @click="scope._self.$refs[`popover-${scope.$index}`].doClose()"
                  >{{$t('developer.cancel')}}</el-button>
                  <el-button type="primary" size="mini" @click="deleteChannel(scope)">{{$t('developer.determine')}}</el-button>
                </div>
                <el-button type="danger" size="mini" slot="reference">{{$t('developer.delete')}}</el-button>
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
        <!--通道管理弹窗---------------------------------------------------------------------------------------------->
        <el-dialog
          :title="$t('developer.servicechannelmanagement')"
          :visible.sync="channelForm"
          width="40%"
          top="0"
          :before-close="handleClose"
        >
          <!-- <div style="margin:20px 0;">服务通道设置</div> -->
          <el-form :model="addchannel" label-width="120px" ref="addchannel" :rules="addrules">
            <el-form-item :label="$t('developer.servicetype')" prop="region" class="lastchildren">
              <el-select
                v-model="addchannel.region"
                :placeholder="$t('developer.servicetype')"
                :disabled="channelId!=''"
                @change="removeauto"
              >
                <el-option
                  v-for="(item,index) in channelregion"
                  :label="item.name+item.channeltype"
                  :key="index"
                  :value="item.value"
                ></el-option>
              </el-select>
            </el-form-item>
            <el-form-item :label="$t('developer.channelname')" prop="name" class="lastchildren">
              <el-input v-model="addchannel.name" autocomplete="off" :placeholder="$t('developer.channelname')"></el-input>
            </el-form-item>

            <!--服务通道选择参数配置-->
            <!--kafka---------------------------------------------------------------------------------->
            <!-- <el-form-item
              label="kafka"
              v-if="addchannel.region=='Kafka'"
              class="notlastchildren notline"
              label-width="200px"
              prop="kafkaclient"
              :rules='[
              {required:true,message:"kafa服务器不能为空",trigger: "blur"}
              ]'
            >
              <template>
                <span slot="label">
                  <span>Kafka服务器</span>
                  <el-popover placement="top-start" width="200" trigger="hover" content="Kafka服务器">
                    <i class="el-icon-question" slot="reference" style="color:#71737d;"></i>
                  </el-popover>
                </span>
              </template>
              <el-input type="text" placeholder="kafka服务器" v-model="addchannel.kafkaclient"></el-input>
            </el-form-item>
            <el-form-item
              label="kafka"
              v-if="addchannel.region=='Kafka'"
              class="notlastchildren notline"
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
              <el-input type="text" placeholder="Metadata更新间隔" v-model="addchannel.kafkametadata"></el-input>
            </el-form-item>
            <el-form-item
              label="kafka"
              v-if="addchannel.region=='Kafka'"
              class="notlastchildren notline"
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

              <el-input type="text" placeholder="同步调用间隔时间" v-model="addchannel.kafkaduring"></el-input>
            </el-form-item>
            <el-form-item
              label="kafka"
              v-if="addchannel.region=='Kafka'"
              class="notlastchildren notline"
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
              <el-input type="text" placeholder="最大批处理字节数" v-model="addchannel.kafkakb"></el-input>
            </el-form-item>
            <el-form-item
              label="kafka"
              v-if="addchannel.region=='Kafka'"
              class="notlastchildren notline"
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
            <el-form-item
              label="kafka"
              v-if="addchannel.region=='Kafka'"
              class="notlastchildren notline"
              label-width="200px"
            >
              <template slot="label">
                <span>
                  <span>发送消息的缓冲区大小</span>
                  <el-popover
                    placement="top-start"
                    width="200"
                    trigger="hover"
                    content="发送消息的缓冲区大小"
                  >
                    <i class="el-icon-question" slot="reference" style="color:#71737d;"></i>
                  </el-popover>
                </span>
              </template>
              <el-input type="text" placeholder="发送消息的缓冲区大小" v-model="addchannel.kafkahc"></el-input>
            </el-form-item> -->
            <!--MySQL---------------------------------------------------------------------------------------->
            <!-- <el-form-item
              label="MySQL服务器"
              v-if="addchannel.region=='MySQL'"
              class="notlastchildren notline"
              label-width="200px"
              prop="MySQLclient"
              :rules='[
              {required:true,message:"MySQL服务器不能为空",trigger: "blur"}
              ]'
            >
              <template>
                <span slot="label">
                  <span>MySQL服务器</span>
                  <el-popover placement="top-start" width="200" trigger="hover" content="Kafka服务器">
                    <i class="el-icon-question" slot="reference" style="color:#71737d;"></i>
                  </el-popover>
                </span>
              </template>
              <el-input type="text" placeholder="MySQL服务器" v-model="addchannel.MySQLclient"></el-input>
            </el-form-item>
            <el-form-item
              label="MySQL"
              v-if="addchannel.region=='MySQL'"
              class="notlastchildren notline"
              label-width="200px"
            >
              <template>
                <span slot="label">
                  <span>MySQL数据库名</span>
                  <el-popover placement="top-start" width="200" trigger="hover" content="MySQL数据库名">
                    <i class="el-icon-question" slot="reference" style="color:#71737d;"></i>
                  </el-popover>
                </span>
              </template>
              <el-input type="text" placeholder="MySQL数据库名" v-model="addchannel.MySQLname"></el-input>
            </el-form-item>
            <el-form-item
              label="MySQL"
              v-if="addchannel.region=='MySQL'"
              class="notlastchildren notline"
              label-width="200px"
            >
              <template>
                <span slot="label">
                  <span>连接池大小</span>
                  <el-popover placement="top-start" width="200" trigger="hover" content="连接池大小">
                    <i class="el-icon-question" slot="reference" style="color:#71737d;"></i>
                  </el-popover>
                </span>
              </template>

              <el-input type="text" placeholder="连接池大小" v-model="addchannel.MySQLduring"></el-input>
            </el-form-item>
            <el-form-item
              label="kafka"
              v-if="addchannel.region=='MySQL'"
              class="notlastchildren notline"
              label-width="200px"
            >
              <template>
                <span slot="label">
                  <span>MySQL用户名</span>
                  <el-popover placement="top-start" width="200" trigger="hover" content="MySQL用户名">
                    <i class="el-icon-question" slot="reference" style="color:#71737d;"></i>
                  </el-popover>
                </span>
              </template>
              <el-input
                type="text"
                placeholder="MySQL用户名"
                v-model="addchannel.MySQLusername"
                class="notauto"
                readonly
                autocomplete="off"
              ></el-input>
            </el-form-item>
            <el-form-item
              label="kafka"
              v-if="addchannel.region=='MySQL'"
              class="notlastchildren notline"
              label-width="200px"
            >
              <template>
                <span slot="label">
                  <span>MySQL密码</span>
                  <el-popover placement="top-start" width="200" trigger="hover" content="MySQL密码">
                    <i class="el-icon-question" slot="reference" style="color:#71737d;"></i>
                  </el-popover>
                </span>
              </template>
              <el-input
                type="text"
                placeholder="MySQL密码"
                v-model="addchannel.MySQLpassword"
                class="notauto"
                readonly
                autocomplete="off"
              ></el-input>
            </el-form-item>
            <el-form-item
              label="kafka"
              v-if="addchannel.region=='MySQL'"
              class="notlastchildren notline"
              label-width="200px"
            >
              <template>
                <span slot="label">
                  <span>批量写入大小</span>
                  <el-popover placement="top-start" width="200" trigger="hover" content="批量写入大小">
                    <i class="el-icon-question" slot="reference" style="color:#71737d;"></i>
                  </el-popover>
                </span>
              </template>
              <el-input type="text" placeholder="批量写入大小" v-model="addchannel.MySQLpldx"></el-input>
            </el-form-item>
            <el-form-item
              label="kafka"
              v-if="addchannel.region=='MySQL'"
              class="notlastchildren notline"
              label-width="200px"
            >
              <template>
                <span slot="label">
                  <span>批量写入间隔(毫秒)</span>
                  <el-popover
                    placement="top-start"
                    width="200"
                    trigger="hover"
                    content="批量写入间隔(毫秒)"
                  >
                    <i class="el-icon-question" slot="reference" style="color:#71737d;"></i>
                  </el-popover>
                </span>
              </template>
              <el-input type="text" placeholder="批量写入间隔" v-model="addchannel.MySQLplduring"></el-input>
            </el-form-item>
            <el-form-item
              label="kafka"
              v-if="addchannel.region=='MySQL'"
              class="notlastchildren notline"
              label-width="200px"
            >
              <template>
                <span slot="label">
                  <span>是否重连</span>
                  <el-popover placement="top-start" width="200" trigger="hover" content="是否重连">
                    <i class="el-icon-question" slot="reference" style="color:#71737d;"></i>
                  </el-popover>
                </span>
              </template>
              <el-input type="text" placeholder="是否重连" v-model="addchannel.MySQLconnect"></el-input>
            </el-form-item> -->
            <!---------------------------------------------------MongoDB配置------------------------------------------>
            <!-- <el-form-item
              label="MongoDB服务器"
              v-if="addchannel.region=='MongoDB'"
              class="notlastchildren notline"
              label-width="200px"
              prop="MongoDBclient"
              :rules='[
              {required:true,message:"MongoDB服务器不能为空",trigger: "blur"}
              ]'
            >
              <template>
                <span slot="label">
                  <span>MongoDB服务器</span>
                  <el-popover placement="top-start" width="200" trigger="hover" content="Kafka服务器">
                    <i class="el-icon-question" slot="reference" style="color:#71737d;"></i>
                  </el-popover>
                </span>
              </template>
              <el-input type="text" placeholder="MongoDB服务器" v-model="addchannel.MongoDBclient"></el-input>
            </el-form-item>
            <el-form-item
              label="MongoDB"
              v-if="addchannel.region=='MongoDB'"
              class="notlastchildren notline"
              label-width="200px"
            >
              <template>
                <span slot="label">
                  <span>MongoDB数据库名</span>
                  <el-popover
                    placement="top-start"
                    width="200"
                    trigger="hover"
                    content="MongoDB数据库名"
                  >
                    <i class="el-icon-question" slot="reference" style="color:#71737d;"></i>
                  </el-popover>
                </span>
              </template>
              <el-input type="text" placeholder="MongoDB数据库名" v-model="addchannel.MongoDBname"></el-input>
            </el-form-item>
            <el-form-item
              label="MongoDB"
              v-if="addchannel.region=='MongoDB'"
              class="notlastchildren notline"
              label-width="200px"
            >
              <template>
                <span slot="label">
                  <span>连接池大小</span>
                  <el-popover placement="top-start" width="200" trigger="hover" content="连接池大小">
                    <i class="el-icon-question" slot="reference" style="color:#71737d;"></i>
                  </el-popover>
                </span>
              </template>

              <el-input type="text" placeholder="连接池大小" v-model="addchannel.MongoDBduring"></el-input>
            </el-form-item>
            <el-form-item
              label="kafka"
              v-if="addchannel.region=='MongoDB'"
              class="notlastchildren notline"
              label-width="200px"
            >
              <template>
                <span slot="label">
                  <span>MongoDB用户名</span>
                  <el-popover
                    placement="top-start"
                    width="200"
                    trigger="hover"
                    content="MongoDB用户名"
                  >
                    <i class="el-icon-question" slot="reference" style="color:#71737d;"></i>
                  </el-popover>
                </span>
              </template>
              <el-input
                type="text"
                placeholder="MongoDB用户名"
                v-model="addchannel.MongoDBusername"
                class="notauto"
                readonl
              ></el-input>
            </el-form-item>
            <el-form-item
              label="kafka"
              v-if="addchannel.region=='MongoDB'"
              class="notlastchildren notline"
              label-width="200px"
            >
              <template>
                <span slot="label">
                  <span>MongoDB密码</span>
                  <el-popover placement="top-start" width="200" trigger="hover" content="MongoDB密码">
                    <i class="el-icon-question" slot="reference" style="color:#71737d;"></i>
                  </el-popover>
                </span>
              </template>
              <el-input
                type="text"
                placeholder="MongoDB密码"
                v-model="addchannel.MongoDBpassword"
                class="notauto"
                readonly
              ></el-input>
            </el-form-item>
            <el-form-item
              label="kafka"
              v-if="addchannel.region=='MongoDB'"
              class="notlastchildren notline"
              label-width="200px"
            >
              <template>
                <span slot="label">
                  <span>连接认证源</span>
                  <el-popover placement="top-start" width="200" trigger="hover" content="连接认证源">
                    <i class="el-icon-question" slot="reference" style="color:#71737d;"></i>
                  </el-popover>
                </span>
              </template>
              <el-input
                type="text"
                placeholder="连接认证源"
                v-model="addchannel.MongoDBconnectrenzhen"
                class="notauto"
                readonly
              ></el-input>
            </el-form-item>
            <el-form-item
              label="kafka"
              v-if="addchannel.region=='MongoDB'"
              class="notlastchildren notline"
              label-width="200px"
            >
              <template>
                <span slot="label">
                  <span>连接超时时间(毫秒)</span>
                  <el-popover
                    placement="top-start"
                    width="200"
                    trigger="hover"
                    content="连接超时时间(毫秒)"
                  >
                    <i class="el-icon-question" slot="reference" style="color:#71737d;"></i>
                  </el-popover>
                </span>
              </template>
              <el-input
                type="text"
                placeholder="连接超时时间"
                v-model="addchannel.MongoDBovertime"
                class="notauto"
                readonly
                autocomplete="off"
              ></el-input>
            </el-form-item>
            <el-form-item
              label="kafka"
              v-if="addchannel.region=='MongoDB'"
              class="notlastchildren notline"
              label-width="200px"
            >
              <template>
                <span slot="label">
                  <span>写模式</span>
                  <el-popover placement="top-start" width="200" trigger="hover" content="写模式">
                    <i class="el-icon-question" slot="reference" style="color:#71737d;"></i>
                  </el-popover>
                </span>
              </template>
              <el-input
                type="text"
                placeholder="写模式"
                v-model="addchannel.MongoDBmode"
                class="notauto"
                readonly
                autocomplete="off"
              ></el-input>
            </el-form-item>
            <el-form-item
              label="kafka"
              v-if="addchannel.region=='MongoDB'"
              class="notlastchildren notline"
              label-width="200px"
            >
              <template>
                <span slot="label">
                  <span>开始SSL</span>
                  <el-popover placement="top-start" width="200" trigger="hover" content="开始SSL">
                    <i class="el-icon-question" slot="reference" style="color:#71737d;"></i>
                  </el-popover>
                </span>
              </template>
              <el-input type="text" placeholder="开始SSL" v-model="addchannel.MongoDBopenssl"></el-input>
            </el-form-item>
            <el-form-item
              label="kafka"
              v-if="addchannel.region=='MongoDB'"
              class="notlastchildren notline"
              label-width="200px"
            >
              <template>
                <span slot="label">
                  <span>私密文件路径</span>
                  <el-popover placement="top-start" width="200" trigger="hover" content="私密文件路径">
                    <i class="el-icon-question" slot="reference" style="color:#71737d;"></i>
                  </el-popover>
                </span>
              </template>
              <el-input type="text" placeholder="私密文件路径" v-model="addchannel.MongoDBsmpath"></el-input>
            </el-form-item>
            <el-form-item
              label="kafka"
              v-if="addchannel.region=='MongoDB'"
              class="notlastchildren notline"
              label-width="200px"
            >
              <template>
                <span slot="label">
                  <span>证书文件路径</span>
                  <el-popover placement="top-start" width="200" trigger="hover" content="证书文件路径">
                    <i class="el-icon-question" slot="reference" style="color:#71737d;"></i>
                  </el-popover>
                </span>
              </template>
              <el-input type="text" placeholder="证书文件路径" v-model="addchannel.MongoDBzspath"></el-input>
            </el-form-item>
            <el-form-item
              label="kafka"
              v-if="addchannel.region=='MongoDB'"
              class="notlastchildren notline"
              label-width="200px"
            >
              <template>
                <span slot="label">
                  <span>CA证书文件路径</span>
                  <el-popover placement="top-start" width="200" trigger="hover" content="CA证书文件路径">
                    <i class="el-icon-question" slot="reference" style="color:#71737d;"></i>
                  </el-popover>
                </span>
              </template>
              <el-input type="text" placeholder="CA证书文件路径" v-model="addchannel.MongoDBcapath"></el-input>
            </el-form-item> -->
            <!--PG配置------------------------------------------------------------------------------------------------>
            <!-- <el-form-item
              :label="addchannel.region+'服务器'"
              v-if="addchannel.region=='postgresql'||addchannel.region=='MongoDB'||addchannel.region=='MySQL'"
              class="notlastchildren notline"
              label-width="200px"
              prop="postgresqlhost"
              :rules='[
              {required:true,message:"服务器不能为空",trigger: "blur"}
              ]'
            >
              <el-input type="text" placeholder="服务器" v-model="addchannel.postgresqlhost"></el-input>
            </el-form-item>
            <el-form-item
              label="端口"
              v-if="addchannel.region=='postgresql'||addchannel.region=='MongoDB'||addchannel.region=='MySQL'"
              class="notlastchildren notline"
              label-width="200px"
              prop="postgresqlport"
              :rules='[
              {required:true,message:"服务器端口不能为空",trigger: "blur"},
               { validator: validPort } 
              ]'
            >
              <el-input type="text" placeholder="端口" v-model.number="addchannel.postgresqlport"></el-input>
            </el-form-item>
            <el-form-item
              :label="addchannel.region+'用户名'"
              v-if="addchannel.region=='postgresql'||addchannel.region=='MongoDB'||addchannel.region=='MySQL'"
              class="notlastchildren notline"
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
                readonl
              ></el-input>
            </el-form-item>
            <el-form-item
              :label="addchannel.region+'密码'"
               v-if="addchannel.region=='postgresql'||addchannel.region=='MongoDB'||addchannel.region=='MySQL'"
              class="notlastchildren notline"
              label-width="200px"
              prop="postgresqlpassword"
              :rules='[
              {required:true,message:"密码不能为空",trigger: "blur"}
              ]'
            >
              <el-input
                type="text"
                placeholder="密码"
                v-model="addchannel.postgresqlpassword"
                class="notauto"
                readonly
              ></el-input>
            </el-form-item>
            <el-form-item
              label="database"
              v-if="addchannel.region=='postgresql'||addchannel.region=='MongoDB'||addchannel.region=='MySQL'"
              class="notlastchildren notline"
              label-width="200px"
              prop="postgresqldatabase"
              :rules='[
              {required:true,message:"database不能为空",trigger: "blur"}
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
            <el-form-item
              label="批量写入大小"
              v-if="addchannel.region=='postgresql'"
              class="notlastchildren notline"
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
            <el-form-item
              :label="addchannel.region+'资源名'"
              v-if="addchannel.region=='postgresql'||addchannel.region=='MongoDB'||addchannel.region=='MySQL'"
              class="notlastchildren notline"
              label-width="200px"
            >
              <el-input
                type="text"
                placeholder="数据库名"
                v-model="addchannel.postgresqlname"
              ></el-input>
            </el-form-item>
            <el-form-item
              :label="addchannel.region+'连接数'"
              v-if="addchannel.region=='postgresql'||addchannel.region=='MongoDB'||addchannel.region=='MySQL'"
              class="notlastchildren notline"
              label-width="200px"
            >
              <el-input
                placeholder="连接数"
                v-model.number="addchannel.postgresqlconnect"
                class="notauto"
                readonly
                autocomplete="off"
              ></el-input>
            </el-form-item>
            <el-form-item
              label="开始SSL"
              v-if="addchannel.region=='postgresql'||addchannel.region=='MongoDB'||addchannel.region=='MySQL'"
              class="notlastchildren notline"
              label-width="200px"
            >
            <el-select v-model="addchannel.postgresqlssl">
              <el-option label="disable" value="disable">

              </el-option>
              <el-option label="require" value="require">

              </el-option>
              <el-option label="verify-ca" value="verify-ca">

              </el-option>
              <el-option label="verify-full" value="verify-full">

              </el-option>
            </el-select>
            </el-form-item> -->
            <!--TCP和UDP部分配置--------------------------------------------------------------------------------------->
            <el-form-item
              label="IP"
              v-if="addchannel.region=='UDP'||addchannel.region=='TCP'"
              class="notlastchildren"
            >
              <el-input v-model="addchannel.ip" autocomplete="off" disabled></el-input>
            </el-form-item>
            <el-form-item
              :label="$t('developer.port')"
              v-if="addchannel.region=='UDP'||addchannel.region=='TCP'|| addchannel.region=='HTTP'"
              prop="port"
              :rules='[{ required: true, message:"端口不能为空",trigger: "blur" }, { validator: validPort }]'
              class="notlastchildren"
            >
              <el-input v-model="addchannel.port" autocomplete="off" :placeholder="$t('developer.port')"></el-input>
            </el-form-item>

            <el-form-item
              :label="$t('developer.cacheconstraint')"
              v-if="addchannel.region=='TCP'"
              prop="buff_size"
              :rules='[
          { required: true, message: "最大存储不能为空", trigger: "blur" },
          { type: "number", message: "最大存储必须为数字值" }
        ]'
              class="notlastchildren"
            >
              <el-input v-model.number="addchannel.buff_size" autocomplete="off" :min="1">
                <template slot="append">KB</template>
              </el-input>
            </el-form-item>
            <el-form-item
              :label="$t('developer.path')"
              v-if="addchannel.region=='HTTP'"
              prop="path"
              :rules='[
          { required: true, message: "需要输入正确的url", trigger: "blur" }]'
              class="notlastchildren"
            >
              <el-input v-model="addchannel.path" autocomplete="off" :placeholder="$t('developer.path')"></el-input>
            </el-form-item>
            <!--Tdengine部分配置-------------------------------------------------------------------------------------->
            <el-form-item
              :label="$t('developer.servicelink')"
              v-if="addchannel.region=='Tdengine'"
              prop="server"
              class="lastchildren"
              :rules='[
              { required: true, message: "需要输入正确的url", trigger: "blur" },
              { validator: validUrl, trigger: "blur" }
            ]'
            >
              <el-input v-model="addchannel.server" autocomplete="off" :placeholder="$t('developer.servicelink')">
                <template slot="prepend">http://</template>
              </el-input>
            </el-form-item>
            <el-form-item
              :label="$t('developer.libraryname')"
              v-if="addchannel.region=='Tdengine'"
              prop="username"
              :rules='[
          { required: true, message: "请输入用户名", trigger: "blur" }
        ]'
              class="notlastchildren"
            >
              <el-input
                v-model="addchannel.username"
                autocomplete="off"
                :placeholder="$t('developer.libraryname')"
                type="text"
                class="notauto"
                readonly
              ></el-input>
            </el-form-item>
            <el-form-item
              :label="$t('developer.librarypassword')"
              v-if="addchannel.region=='Tdengine'"
              prop="password"
              :rules='[{ required: true, message: "请输入密码", trigger: "blur" }]'
              class="notlastchildren"
            >
              <el-input
                v-model="addchannel.password"
                autocomplete="off"
                :placeholder="$t('developer.librarypassword')"
                :type="pwdType"
                class="notauto"
                readonly
              >
                <template slot="append">
                  <span class="show-pwd" @click="showPwd" style="cursor:pointer">
                    <svg-icon :icon-class="pwdType=='password' ? 'eye':'zheneys'" />
                  </span>
                </template>
              </el-input>
            </el-form-item>
            <!--同步间隔提示---------------------------------------------------------------------------------->
            <el-form-item
              :label="$t('developer.synchronousinterval')"
              v-if="addchannel.region=='Tdengine'"
              prop="auto_save"
              :rules='[
              { required: true, message: "同步间隔不能为空", trigger: "blur" },
              { type: "number", message: "同步间隔必须为数字值" }
            ]'
              class="notlastchildren"
            >
              <el-input
                v-model.number="addchannel.auto_save"
                autocomplete="off"
                :min="1"
                :placeholder="$t('developer.synchronousinterval')"
              >
                <template slot="append">秒</template>
              </el-input>
            </el-form-item>
            <el-form-item
              :label="$t('developer.amountdata')"
              v-if="addchannel.region=='Tdengine'"
              prop="max_size"
              :rules='[
              { required: true, message: "最大条数不能为空", trigger: "blur" },
              { type: "number", message: "最大条数必须为数字值" }
            ]'
              class="notlastchildren"
            >
              <el-input
                v-model.number="addchannel.max_size"
                autocomplete="off"
                :min="1"
                :placeholder="$t('developer.amountdata')"
              >
                <template slot="append">条</template>
              </el-input>
            </el-form-item>
            <el-form-item
              :label="$t('developer.cacheconstraint')"
              v-if="addchannel.region=='Tdengine'"
              prop="max_memory"
              :rules='[
          { required: true, message: "最大存储不能为空", trigger: "blur" },
          { type: "number", message: "最大存储必须为数字值" }]'
              class="notlastchildren"
            >
              <el-input v-model.number="addchannel.max_memory" autocomplete="off" :min="1">
                <template slot="append">KB</template>
              </el-input>
            </el-form-item>
            <!----------------MQTT----------------------------------------------------------------------------------->
            <el-form-item
              v-if="addchannel.region=='MQTT'"
              class="lastchildren"
              style="margin-bottom:10px;"
            >
              <span>
                <i class="el-icon-question"></i>topic或client满足下面任意条件
              </span>
            </el-form-item>
            <el-form-item label="Topic" v-if="addchannel.region=='MQTT'" class="notlastchildren">
              <el-input v-model="addchannel.topic" autocomplete="off" :placeholder="$t('developer.regularexpression')"></el-input>
            </el-form-item>
            <el-form-item label="Client" v-if="addchannel.region=='MQTT'" class="notlastchildren">
              <el-input v-model="addchannel.client" autocomplete="off" :placeholder="$t('developer.regularexpression')"></el-input>
            </el-form-item>
            <!--MQTTCLI配置------------------------------------------------>
            <el-form-item
              :label="$t('developer.hostaddress')"
              v-if="addchannel.region=='MQTTCLI'"
              prop="address"
              class="notlastchildren"
              :rules='[
              { required: true, message: "输入主机地址", trigger: "blur" },
              { validator: validUrl, trigger: "blur" }
              ]'
            >
              <el-input v-model="addchannel.address" autocomplete="off" :placeholder="$t('developer.hostaddress')"></el-input>
            </el-form-item>
            <el-form-item
              :label="$t('developer.port')"
              v-if="addchannel.region=='MQTTCLI'"
              prop="port"
              :rules='[{ required: true, trigger: "blur" }, { validator: validPort }]'
              class="notlastchildren"
            >
              <el-input v-model="addchannel.port" autocomplete="off" :placeholder="$t('developer.port')"></el-input>
            </el-form-item>
            <el-form-item
              :label="$t('developer.username')"
              v-if="addchannel.region=='MQTTCLI'"
              prop="username"
              :rules='[
                { required: true, message: "请输入用户名", trigger: "blur" }
              ]'
              class="notlastchildren"
            >
              <el-input
                v-model="addchannel.username"
                autocomplete="off"
                :placeholder="$t('developer.username')"
                class="notauto"
                type="text"
                readonly
              ></el-input>
            </el-form-item>
            <el-form-item
              :label="$t('developer.password')"
              v-if="addchannel.region=='MQTTCLI'"
              prop="password"
              :rules='[{ required: true, message: "请输入密码", trigger: "blur" }]'
              class="notlastchildren"
            >
              <el-input
                v-model="addchannel.password"
                autocomplete="off"
                :placeholder="$t('developer.password')"
                :type="pwdType"
                class="notauto"
                readonly
              >
                <template slot="append">
                  <span class="show-pwd" @click="showPwd" style="cursor:pointer">
                    <svg-icon :icon-class="pwdType=='password' ? 'eye':'zheneys'" />
                  </span>
                </template>
              </el-input>
            </el-form-item>
            <el-form-item
              :label="$t('developer.heartbeat')"
              v-if="addchannel.region=='MQTTCLI'"
              prop="keepalive"
              :rules='[
                { required: true, message: "请输入心跳", trigger: "blur" },
                { type: "number", message: "心跳间隔必须为数字值" }
              ]'
              class="notlastchildren"
            >
              <el-input
                v-model.number="addchannel.keepalive"
                autocomplete="off"
                :placeholder="$t('developer.heartbeat')"
                :min="1"
              ></el-input>
            </el-form-item>
            <el-form-item label=" " v-if="addchannel.region=='MQTTCLI'">
              <el-checkbox v-model="addchannel.clean_start">{{$t('developer.clearsession')}}</el-checkbox>
              <el-checkbox v-model="addchannel.ssl">SSL</el-checkbox>
            </el-form-item>
            <el-form-item :label="$t('developer.describe')" class="lastchildren">
              <el-input
                v-model="addchannel.desc"
                autocomplete="off"
                type="textarea"
                :rows="3"
                :placeholder="$t('developer.describe')"
              ></el-input>
            </el-form-item>
          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button @click="handleClose">{{$t('developer.cancel')}}</el-button>
            <el-button type="primary" @click="addchannelForm('addchannel')">{{$t('developer.determine')}}</el-button>
          </div>
        </el-dialog>
        <!-----------------------------------选择通道的类型----------------------------------------------------------------------->
      </el-tab-pane>
    </el-tabs>
  </div>
</template>
<script>
/*{params}/由于一些表单的验证用v-if所以规则要写在里面*/
import Parse from "parse";
import { prototype } from "stream";
import {channelConnect} from '@/api/testchannel'
export default {
  data() {
    
    return {
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
      channelregion: [
        {
          name: "HTTP",
          value: "HTTP",
          channeltype: "资源通道",
          channelvalue: "2"
        },
        {
          name: "TCP",
          value: "TCP",
          channeltype: "采集通道",
          channelvalue: "1"
        },
        {
          name: "UDP",
          value: "UDP",
          channeltype: "采集通道",
          channelvalue: "1"
        },
        {
          name: "MQTT",
          value: "MQTT",
          channeltype: "采集通道",
          channelvalue: "1"
        },
        {
          name: "MQTTCLI",
          value: "MQTTCLI",
          channeltype: "采集通道",
          channelvalue: "1"
        },
        {
          name: "Tdengine",
          value: "Tdengine",
          channeltype: "资源通道",
          channelvalue: "2"
        },
      ],
      channelformsearch: {
        name: ""
      },
      channelForm: false,
      addchannel: {
        name: "",
        region: "HTTP",
        topic: "",
        port: "",
        channeltype: "",
        ip: "0.0.0.0",
        path: "",
        client: "",
        desc: "",
        auto_save: 30,
        max_size: 10000,
        max_memory: 1024000,
        server: "",
        username: "",
        password: "",
        isEnable: false,
        buff_size: 1024000,
        address: "",
        clean_start: false,
        ssl: false,
        keepalive: "",
        //kafka参数
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
        postgresqlport:5432,
        postgresqldatabase: "postgres",
        postgresqlssl: 'disable',
        postgresqllength: "",
        postgresqlname: ""
      },
      pwdType: "password",
      channelId: "",
      addrules: {
        name: [{ required: true, message: "请输入通道名称", trigger: "blur" }],
        region: [
          { required: true, message: "请选择服务类型", trigger: "change" }
        ],
        channeltype: [
          { required: true, message: "请选择通道类型", trigger: "change" }
        ]
      },
      productIds: [],
      channelupdated: ""
    };
  },
  mounted() {
    this.getChannel();
  },
  methods: {
    //验证
     validUrl(rule, value, callback){
      let reg = /^[A-Za-z0-9]+\.[A-Za-z0-9]+[\/=\?%\-&_~`@[\]\':+!]*([^<>\"\"])*$/;
      if (!reg.test(value)) {
        callback(new Error("需要输入正确的url"));
      } else {
        callback();
      }
    },
    validPort(rule, value, callback){
      let reg = /^([0-9]|[1-9]\d|[1-9]\d{2}|[1-9]\d{3}|[1-5]\d{4}|6[0-4]\d{3}|65[0-4]\d{2}|655[0-2]\d|6553[0-5])$/;
      if (!reg.test(value)) {
        callback(new Error("需要输入正确的端口号"));
      } else {
        callback();
      }
    },
    showPwd() {
      if (this.pwdType === "password") {
        this.pwdType = "";
      } else {
        this.pwdType = "password";
      }
    },
    getChannelEnable(row, rowIndex) {
      if (row.row.attributes.isEnable == true) {
        return "green_active";
      } else {
        return "red_active";
      }
    },
    utc2beijing(utc_datetime) {
      // 转为正常的时间格式 年-月-日 时:分:秒
      var date = new Date(+new Date(utc_datetime) + 8 * 3600 * 1000)
        .toISOString()
        .replace(/T/g, " ")
        .replace(/\.[\d]{3}Z/, "");
      return date; // 2017-03-31 16:02:06
    },
    addchanneltype() {
      this.channelForm = true;
      this.channelupdated = "新增";
    },
    removeauto() {
      //去掉自动补全
      setTimeout(() => {
        var notautolength = document.getElementsByClassName("notauto");
        for (var i = 0; i < notautolength.length; i++) {
          notautolength[i].children[0].removeAttribute("readonly");
        }
      }, 1000);
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
    //通道类型选择
    //新增服务通道
    addchannelForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.channelregion.map(item => {
            if (item.name == this.addchannel.region) {
              this.addchannel.channeltype = item.channelvalue;
            }
          });
          var Channel = Parse.Object.extend("Channel");
          var searchchannel = new Parse.Query(Channel);
          searchchannel.equalTo("config.port", this.addchannel.port);
          searchchannel.find().then(resultes => {
            var channel = new Channel();
            if (this.channelId != "") {
              channel.id = this.channelId;
            } else {
              if (resultes.length == 0) {
              } else {
                this.$message({
                  type: "warning",
                  message: "此端口已存在"
                });
              }
            }
            channel.set("name", this.addchannel.name);
            channel.set("cType", this.addchannel.region);
            channel.set("type", this.addchannel.channeltype);
            channel.set("desc", this.addchannel.desc);
            channel.set("isEnable", this.addchannel.isEnable);
            if (this.addchannel.region == "UDP") {
              channel.set("config", {
                port: this.addchannel.port
              });
            } else if (this.addchannel.region == "TCP") {
              channel.set("config", {
                port: this.addchannel.port,
                buff_size: this.addchannel.buff_size
              });
            } else if (this.addchannel.region == "MQTT") {
              channel.set("config", {
                topic: this.addchannel.topic,
                client: this.addchannel.client
              });
            } else if (this.addchannel.region == "HTTP") {
              channel.set("config", {
                path: "http://" + this.addchannel.path,
                port: this.addchannel.port
              });
            } else if (this.addchannel.region == "Tdengine") {
              channel.set("config", {
                auto_save: this.addchannel.auto_save,
                max_size: this.addchannel.max_size,
                max_memory: this.addchannel.max_memory,
                server: "http://" + this.addchannel.server,
                username: this.addchannel.username,
                password: this.addchannel.password
              });
            } else if (this.addchannel.region == "MQTTCLI") {
              channel.set("config", {
                address: this.addchannel.address,
                port: this.addchannel.port,
                username: this.addchannel.username,
                password: this.addchannel.password,
                clean_start: this.addchannel.clean_start,
                ssl: this.addchannel.ssl,
                keepalive: this.addchannel.keepalive
              });
            }
            channel.save().then(
              resultes => {
                if (resultes) {
                  this.$message({
                    type: "success",
                    message: "成功"
                  });
                  // this.$refs[formName].resetFields();
                  this.addchannel = {
                    name: "",
                    region: "HTTP",
                    topic: "",
                    port: "",
                    channeltype: "",
                    auto_save: "",
                    max_size: "",
                    max_memory: "",
                    server: "",
                    username: "",
                    password: "",
                    desc: "",
                    buff_size: "",
                    path: "",
                    isEnable: false,
                    ip: "0.0.0.0",
                    address: "",
                    clean_start: false,
                    ssl: false,
                    keepalive: ""
                  };
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
    //测试连接
    testConnect(formName){
         this.$refs[formName].validate(valid => {
           if (valid) {
             if(this.addchannel.region=='MongoDB'||this.addchannel.region=='MySQL'||this.addchannel.region=='postgresql'){
                 channelConnect(this.addchannel.region.toLowerCase(),this.addchannel.postgresqlhost,this.addchannel.postgresqlport,this.addchannel.postgresqlusername,this.addchannel.postgresqlpassword,this.addchannel.postgresqldatabase,this.addchannel.postgresqllength,this.addchannel.postgresqlname,this.addchannel.postgresqlconnect,this.addchannel.postgresqlssl).then(resultes=>{
                   if(resultes){
                      this.$notify({
                      title: '成功',
                      message: '连接可用 ',
                      type: 'success',
                      duration:2000
                    });
                   }
                 }).catch(error=>{
                   this.$message.error(error.error)
                 })
             
             }
           
           }else{
             this.$message.error('有必填项未填写')
             return false
           }
         
        })
    },
    //关闭弹窗清空
    handleClose() {
      this.addchannel = {
        name: "",
        region: "HTTP",
        topic: "",
        port: "",
        channeltype: "",
        ip: "0.0.0.0",
        path: "",
        client: "",
        auto_save: "",
        max_size: "",
        max_memory: "",
        server: "",
        username: "",
        password: "",
        desc: "",
        buff_size: "",
        isEnable: false,
        address: "",
        clean_start: false,
        ssl: false,
        keepalive: ""
      };
      this.channelForm = false;
      // this.$refs["addchannel"].resetFields();
      this.channelId = "";
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
      this.channelupdated = "编辑";
      this.addchannel.name = row.attributes.name;
      this.addchannel.region = row.attributes.cType;
      if (row.attributes.cType == "MQTT") {
        this.addchannel.topic = row.attributes.config.topic;
        this.addchannel.client = row.attributes.config.client;
      } else if (row.attributes.cType == "HTTP") {
        this.addchannel.path = row.attributes.config.path.substring(7);
      } else if (row.attributes.cType == "Tdengine") {
        this.addchannel.auto_save = row.attributes.config.auto_save;
        this.addchannel.max_size = row.attributes.config.max_size;
        this.addchannel.max_memory = row.attributes.config.max_memory;
        //  this.addchannel.path=row.attributes.config.path
        this.addchannel.server = row.attributes.config.server.substring(7);
        this.addchannel.username = row.attributes.config.username;
        this.addchannel.password = row.attributes.config.password;
      } else if (row.attributes.cType == "TCP") {
        this.addchannel.buff_size = row.attributes.config.buff_size;
        // this.addchannel.port = row.attributes.config.port;
      } else if (row.attributes.cType == "MQTTCLI") {
        this.addchannel.address = row.attributes.config.address;
        this.addchannel.username = row.attributes.config.username;
        this.addchannel.password = row.attributes.config.password;
        this.addchannel.clean_start = row.attributes.config.clean_start;
        this.addchannel.ssl = row.attributes.config.ssl;
        this.addchannel.keepalive = row.attributes.config.keepalive;
      }
      this.addchannel.ip = "0.0.0.0";
      this.addchannel.port = row.attributes.config.port;
      this.addchannel.desc = row.attributes.desc;
      this.addchannel.channeltype = row.attributes.type;
      this.addchannel.isEnable = row.attributes.isEnable;
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
    }
  }
};
</script>
<style lang="scss" scoped>
.channelmanage {
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
      .el-form-item {
        width: 50%;
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
