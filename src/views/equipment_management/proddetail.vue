<template>
  <div class="editproduct">
    <div class="editheader">
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path: '/roles/product' }">产品管理</el-breadcrumb-item>
        <el-breadcrumb-item>产品详情</el-breadcrumb-item>
      </el-breadcrumb>
      <div class="product">
        <ul>
          <li>
            <span>ProductId:</span>
            <span>{{productId}}</span>
          </li>
          <li>
            <span>ProductSecret:</span>
            <span v-if="isshow==false">
              ********************
              <el-link
                :underline="false"
                type="primary"
                style="margin-left:5px;cursor:pointer"
                @click="isshow=true"
              >显示</el-link>
            </span>
            <span v-else>
              {{ProductSecret}}
              <el-link
                :underline="false"
                type="primary"
                style="margin-left:5px;cursor:pointer"
                @click="isshow=false"
              >隐藏</el-link>
            </span>
          </li>
          <li>
            <span>设备数:</span>
            <span>
              {{form.ProductAll}}
              <el-link
                :underline="false"
                type="primary"
                style="margin-left:10px;font-size:16px"
                @click="goToDevices"
              >前往设备</el-link>
            </span>
          </li>
        </ul>
      </div>
    </div>
    <div>
      <el-tabs v-model="activeName" @tab-click="handleClick">
        <!--产品信息-->
        <el-tab-pane label="产品信息" name="first">
          <div style="background:#ffffff;padding:10px;box-sizing:border-box;">
            <div>
              <table
                class="mailtable"
                style="width:100%;"
                border="0"
                cellspacing="0"
                cellpadding="0"
              >
                <tr>
                  <td class="cloumn">产品名称</td>
                  <td>{{productdetail.name}}</td>
                  <td class="cloumn">节点类型</td>
                  <td v-if="productdetail.nodeType==1">网关</td>
                  <td v-else>设备</td>
                  <td class="cloumn">创建时间</td>
                  <td>{{productdetail.createdAt}}</td>
                </tr>
                <tr>
                  <td class="cloumn">所属分类</td>
                  <td>{{productdetail.category}}</td>
                  <td class="cloumn">
                    动态注册
                    <el-tooltip
                      content="您可以根据需要，开启或关闭动态注册，无需存库"
                      placement="top"
                      style="margin-left:5px;color:#cccccc"
                      effect="light"
                    >
                      <i class="el-icon-question"></i>
                    </el-tooltip>
                  </td>
                  <td>
                    <span v-if="dynamicReg==false" style="color:#cccccc">已关闭</span>
                    <span v-else>已开启</span>
                    <el-switch
                      v-model="dynamicReg"
                      active-color="#5eb058"
                      inactive-color="#cccccc"
                      :active-value="true"
                      :inactive-value="false"
                      @change="handelUpdate($event,dynamicReg)"
                    ></el-switch>
                  </td>
                  <td class="cloumn">连网协议</td>
                  <td v-if="productdetail.netType=='CELLULAR'">蜂窝(2G/3G/4G)</td>
                  <td v-else-if="productdetail.netType=='WIFI'">WiFi</td>
                  <td v-else-if="productdetail.netType=='ETHERNET'">以太网</td>
                  <td v-else-if="productdetail.netType=='LORA'">LoRaWAN</td>
                  <td v-else>其他</td>
                </tr>
                <tr>
                  <td class="cloumn">产品描述</td>
                  <td colspan="6">{{productdetail.desc}}</td>
                </tr>
              </table>
            </div>
          </div>
        </el-tab-pane>
        <!--topic列表-->
        <el-tab-pane label="Topic列表" name="second">
          <div style="background:#ffffff;padding:10px;box-sizing:border-box;">
            <div class="addtopic" style="text-align:right;margin-bottom:10px;">
              <el-button type="primary" size="small" @click="topicdialogVisible=true">自定义Topic类</el-button>
            </div>
            <el-table
              :data="topicData.slice((topicstart-1)*topiclength,topicstart*topiclength)"
              style="width: 100%;text-align:center;"
            >
              <el-table-column label="Topic" align="left">
                <template slot-scope="scope">
                  <span>{{scope.row.topic.replace('\$\{ProductId\}', productId)}}</span>
                </template>
              </el-table-column>
              <el-table-column label="操作权限" align="center">
                <template slot-scope="scope">
                  <span v-if="scope.row.type=='pub'">发布</span>
                  <span v-if="scope.row.type=='sub'">订阅</span>
                </template>
              </el-table-column>
              <el-table-column prop="desc" align="center" label="描述"></el-table-column>
              <el-table-column label="操作" align="center">
                <template slot-scope="scope">
                  <el-button
                    type="primary"
                    size="mini"
                    v-if="!scope.row.isdef"
                    @click="updatetopic(scope.row,scope.$index)"
                  >编辑</el-button>
                  <el-popover placement="top" width="300" :ref="`popover-${scope.$index}`">
                    <p>确定删除这个{{scope.row.topic}}Topic类吗？</p>
                    <div style="text-align: right; margin: 0">
                      <el-button
                        size="mini"
                        @click="scope._self.$refs[`popover-${scope.$index}`].doClose()"
                      >取消</el-button>
                      <el-button
                        type="primary"
                        size="mini"
                        @click="deletetopic(scope,scope.$index)"
                      >确定</el-button>
                    </div>
                    <el-button type="danger" size="mini" v-if="!scope.row.isdef" slot="reference">删除</el-button>
                  </el-popover>
                </template>
              </el-table-column>
            </el-table>
            <div class="elpagination" style="margin-top:20px;">
              <el-pagination
                @size-change="topicSizeChange"
                @current-change="topicCurrentChange"
                :page-sizes="[10, 20, 30, 50]"
                :page-size="topiclength"
                layout="total, sizes, prev, pager, next, jumper"
                :total="topicData.length"
              ></el-pagination>
            </div>
          </div>
          <!--topic弹窗-->
          <el-dialog
            title="定义topic类"
            :visible.sync="topicdialogVisible"
            width="40%"
            :before-close="handleClose"
          >
            <div class="topiccontent">
              <div style="padding:10px;box-sizing:border-box;background:#e6f9fc;font-size:16px;">
                <i class="el-icon-warning"></i>
                Topic格式必须以“/”进行分层，第一个代表产品标识ProductId，第二个${DevAddr}通配devaddr设备连接之后为具体的设备地址。
              </div>
              <div class="topicform">
                <el-form ref="topicform" :model="topicform" :rules="topicrule">
                  <el-form-item label="Topic类：" prop="topic">
                    <el-input v-model="topicform.topic">
                      <template slot="prepend">{{'thing/'+productId+'/${DevAddr}/'}}</template>
                    </el-input>
                  </el-form-item>
                  <el-form-item label="设备操作权限：" prop="type">
                    <el-select v-model="topicform.type" placeholder="请选择设备操作权限">
                      <el-option label="订阅" value="sub"></el-option>
                      <el-option label="发布" value="pub"></el-option>
                    </el-select>
                  </el-form-item>
                  <el-form-item label="描述：">
                    <el-input type="textarea" v-model="topicform.desc"></el-input>
                  </el-form-item>
                </el-form>
              </div>
            </div>
            <span slot="footer" class="dialog-footer">
              <el-button @click="topicdialogVisible = false">取 消</el-button>
              <el-button type="primary" @click="subTopic('topicform',topicform.isupdated)">确 定</el-button>
            </span>
          </el-dialog>
        </el-tab-pane>
        <!--功能定义-->
        <el-tab-pane label="功能定义" name="third">
          <div style="text-align:right">
            <el-button type="primary" @click="checkschema" size="small">查看物模型</el-button>
            <el-button type="primary" @click="wmxdialogVisible = true" size="small">新增自定义属性</el-button>
            <el-button type="primary" @click="addcategory" size="small">新增标准属性</el-button>
          </div>
          <div>
            <el-table
              :data="wmxData.slice((wmxstart-1)*wmxlength,wmxstart*wmxlength)"
              border
              row-key="index"
              style="width: 100%;margin-top:10px;"
              :default-expand-all="true"
              :row-class-name="getRowClass"
            >
              <el-table-column type="expand">
                <template
                  slot-scope="scope"
                  v-if="scope.row.dataType.type=='struct'"
                  class="opentable"
                >
                  <el-table
                    :data="scope.row.dataType.specs"
                    style="width:60%;text-align:center;box-sizing:border-box;"
                  >
                    <el-table-column label="标识符" align="center">
                      <template slot-scope="scope">
                        <span>{{scope.row.identifier}}</span>
                      </template>
                    </el-table-column>
                    <el-table-column label="功能类型" align="center">
                      <template slot-scope="scope">
                        <span>属性</span>
                      </template>
                    </el-table-column>
                    <el-table-column prop="name" label="功能名称" align="center"></el-table-column>
                    <el-table-column label="数据定义" align="center">
                      <template slot-scope="scope">
                        <span>{{scope.row.dataType.type}}</span>
                      </template>
                    </el-table-column>
                  </el-table>
                </template>
              </el-table-column>
              <el-table-column prop="identifier" label="标识符"></el-table-column>
              <el-table-column label="功能类型">
                <template slot-scope="scope">
                  <span>属性</span>
                </template>
              </el-table-column>
              <el-table-column prop="name" label="功能名称"></el-table-column>
              <el-table-column label="数据类型">
                <template slot-scope="scope">
                  <span>{{scope.row.dataType.type}}</span>
                </template>
              </el-table-column>
              <el-table-column label="数据定义">
                <template slot-scope="scope">
                  <span
                    v-if="scope.row.dataType.specs&&(scope.row.dataType.type=='double'||scope.row.dataType.type=='float'||scope.row.dataType.type=='int')"
                  >{{'取值范围:'+scope.row.dataType.specs.min+'~'+scope.row.dataType.specs.max}}</span>
                  <span v-else-if="scope.row.dataType.type!='struct'">{{scope.row.dataType.specs}}</span>
                  <span v-else></span>
                  <!--<span v-if="scope.row.dataType.specs&&scope.row.dataType.type=='text'">{{'长度:'+scope.row.dataType.specs.length}}</span> 
                  <span v-if="scope.row.dataType.specs&&scope.row.dataType.type=='struct'"></span>-->
                </template>
              </el-table-column>
              <el-table-column label="操作">
                <template slot-scope="scope">
                  <el-button type="danger" size="mini" @click="deletewmx(scope.$index)">删除</el-button>
                </template>
              </el-table-column>
            </el-table>
            <!--功能定义分页-->
            <el-pagination
              style="margin-top:10px;"
              @size-change="wmxSizeChange"
              @current-change="wmxCurrentChange"
              :page-sizes="[10, 20, 30, 50]"
              :page-size="wmxlength"
              layout="total, sizes, prev, pager, next, jumper"
              :total="wmxData.length"
            ></el-pagination>
          </div>
          <!--取物模型模板-->
          <el-dialog title="功能添加" :visible.sync="originwmx" width="50%" :before-close="handleClose">
            <div>
              <div style="margin:20px 0">
                <label for>所属分类</label>
                <el-cascader v-model="category" :options="treeData" @change="handleChange"></el-cascader>
                <el-button type="primary" @click="getPropData" size="mini">搜 索</el-button>
              </div>
              <div style="text-align: center;margin-top:10px;">
                <el-table :data="PropData" style="width:100%;text-align:center">
                  <el-table-column label="名称" align="center">
                    <template slot-scope="scope">
                      <span>{{scope.row.attributes.data.Name}}</span>
                    </template>
                  </el-table-column>
                  <el-table-column label="标识符" align="center">
                    <template slot-scope="scope">
                      <span>{{scope.row.attributes.data.Identifier}}</span>
                    </template>
                  </el-table-column>
                  <el-table-column label="适用类型" align="center">
                    <template slot-scope="scope">
                      <span>{{scope.row.attributes.data.CategoryName}}</span>
                    </template>
                  </el-table-column>
                  <el-table-column label="操作" align="center">
                    <template slot-scope="scope">
                      <el-button type="primary" size="mini" @click="addProCategory(scope.row)">添加</el-button>
                    </template>
                  </el-table-column>
                </el-table>
              </div>

              <div>
                <el-pagination
                  style="margin-top:10px;"
                  @size-change="productSizeChange"
                  @current-change="productCurrentChange"
                  :page-sizes="[10, 20, 30, 50]"
                  :page-size="productlength"
                  layout="total, sizes, prev, pager, next, jumper"
                  :total="producttotal"
                  small
                ></el-pagination>
              </div>
            </div>
            <span slot="footer" class="dialog-footer">
              <el-button @click="originwmx = false" size="mini">取 消</el-button>
              <el-button type="primary" @click="originwmx = false" size="mini">确 定</el-button>
            </span>
          </el-dialog>
          <!--添加物模型弹窗-->
          <el-dialog
            title="添加属性参数"
            :visible.sync="wmxdialogVisible"
            width="40%"
            top="5vh"
            :before-close="wmxhandleClose"
          >
            <div class="wmxheader">
              <el-form ref="sizeForm" :model="sizeForm" size="small" :rules="sizerule">
                <el-form-item label="功能类型" prop="resource">
                  <el-radio-group v-model="sizeForm.resource" size="medium">
                    <el-radio :label="1">属性</el-radio>
                    <el-radio :label="2">事件</el-radio>
                    <el-radio :label="3">复合型</el-radio>
                  </el-radio-group>
                </el-form-item>
                <el-form-item label="功能名称" prop="name">
                  <el-input v-model="sizeForm.name"></el-input>
                </el-form-item>
                <el-form-item label="标识符" prop="identifier">
                  <el-input v-model="sizeForm.identifier"></el-input>
                </el-form-item>
                <el-form-item label="数据类型" prop="type">
                  <el-select v-model="sizeForm.type" placeholder="请选择数据类型">
                    <el-option label="整形" value="INT"></el-option>
                    <el-option label="浮点型" value="FLOAT"></el-option>
                    <el-option label="双精度型" value="DOUBLE"></el-option>
                    <el-option label="布尔型" value="BOOL"></el-option>
                    <el-option label="枚举型" value="ENUM"></el-option>
                    <el-option label="结构体" value="STRUCT"></el-option>
                    <el-option label="字符串" value="STRING"></el-option>
                    <el-option label="时间型" value="DATE"></el-option>
                  </el-select>
                </el-form-item>
                <div v-if="sizeForm.type=='INT'||sizeForm.type=='FLOAT'||sizeForm.type=='DOUBLE'">
                  <el-form-item required label="取值范围">
                    <el-col :span="9">
                      <el-form-item prop="startnumber">
                        <el-input
                          v-model.number="sizeForm.startnumber"
                          type="number"
                          placeholder="最小值"
                        ></el-input>
                      </el-form-item>
                    </el-col>
                    <el-col :span="2">-</el-col>
                    <el-col :span="9">
                      <el-form-item prop="endnumber">
                        <el-input
                          v-model.number="sizeForm.endnumber"
                          type="number"
                          placeholder="最大值"
                        ></el-input>
                      </el-form-item>
                    </el-col>
                  </el-form-item>
                  <el-form-item label="步数" prop="step">
                    <el-input v-model.number="sizeForm.step" type="number" class="inputnumber" :precision="2" :step="0.1"></el-input>
                  </el-form-item>
                  <el-form-item label="单位">
                      <el-select v-model="sizeForm.unit" placeholder="单位">
                        <el-option v-for="(item,index) in allunit" :label="item.attributes.data.Name+'/'+item.attributes.data.Symbol" :key="index" :value="item.attributes.data.Symbol"></el-option>
                      </el-select>
                  </el-form-item>
                </div>
                  <div v-if="sizeForm.type=='BOOL'">
                    <el-form-item label="属性"  required>
                  <div style="height:40px;">
                       <el-col :span="11">
                    <el-form-item>
                      <el-input
                        v-model="sizeForm.truevalue"
                        class="inputnumber"
                        type="number"
                        placeholder="属性值"
                        readonly
                      ></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="2">-</el-col>
                  <el-col :span="11">
                    <el-form-item prop="true">
                      <el-input v-model="sizeForm.true" class="inputnumber" placeholder="例如：开"></el-input>
                    </el-form-item>
                  </el-col>
                  </div>
                  <div style="margin-top:20px;">
                    <el-col :span="11">
                      <el-form-item>
                        <el-input
                          v-model="sizeForm.falsevalue"
                          class="inputnumber"
                          type="number"
                          placeholder="属性值"
                          readonly
                        ></el-input>
                      </el-form-item>
                    </el-col>
                    <el-col :span="2">-</el-col>
                    <el-col :span="11">
                      <el-form-item prop="true">
                        <el-input v-model="sizeForm.false" class="inputnumber" placeholder="例如：关"></el-input>
                      </el-form-item>
                    </el-col>
                  </div>
                </el-form-item>
              </div>
                
                <div v-if="sizeForm.type=='ENUM'">
                  <el-form-item v-for="(item, index) in sizeForm.specs" :key="index" required>
                    <el-col :span="9">
                        <el-form-item :label="'属性'+index" :prop="'specs.'+index+'.attribute'" :rules="[{required: true, message: '输入属性'}]"> 
                         
                        <el-input v-model="item.attribute"  placeholder="例编号为'0''"></el-input>
                      </el-form-item>
                    </el-col>
                    <el-col class="line" :span="2">-</el-col>
                    <el-col :span="9">
                      <el-form-item :label="'属性值'+index" :prop="'specs.'+index+'.attributevalue'" :rules="[{required: true, message: '输入属性值'}]">
                        <el-input v-model="item.attributevalue"  placeholder="对改枚举项的描述"></el-input>
                      </el-form-item>
                    </el-col>
                    <el-col class="line" :span="2"></el-col>
                    <el-col class="line" :span="4">
                      <el-link
                        type="primary"
                        @click.prevent="removeDomain(item)"
                        :underline="false"
                        icon="el-icon-minus"
                        style="margin-left:5px;margin-top:30px"
                      >删除</el-link>
                    </el-col>
                  </el-form-item>
                  <el-link
                    @click="addDomain"
                    icon="el-icon-plus"
                    type="primary"
                    :underline="false"
                  >添加枚举项</el-link>
                </div>
                <el-form-item label="读写类型" prop="isread">
                  <el-radio-group v-model="sizeForm.isread" size="medium">
                    <el-radio label="rw">读写</el-radio>
                    <el-radio label="r">只读</el-radio>
                  </el-radio-group>
                </el-form-item>
              </el-form>
            </div>
            <span slot="footer" class="dialog-footer">
              <el-button @click="wmxdialogVisible = false">取 消</el-button>
              <el-button type="primary" @click="submitForm('sizeForm')">确 定</el-button>
            </span>
          </el-dialog>
        </el-tab-pane>
        <!--协议解析-->
        <el-tab-pane label="协议解析" name="fourth">
          <div class="protolheader">
            <el-form
              :inline="true"
              :model="formInline"
              class="demo-form-inline"
              :rules="addRules"
              ref="formInline"
            >
              <el-form-item label="协议名称" prop="name">
                <el-input v-model="formInline.name" placeholder="名称"></el-input>
              </el-form-item>
              <el-form-item label="版本">
                <el-input v-model="formInline.version" placeholder="版本"></el-input>
              </el-form-item>
              <el-form-item label="描述">
                <el-input v-model="formInline.desc" placeholder="版本描述"></el-input>
              </el-form-item>
              <el-form-item>
                <el-button type="primary" @click="subAce('formInline')" size="small">保存</el-button>
                <el-button type="primary" @click="chaxun" size="small">公共协议库</el-button>
              </el-form-item>
              <el-form-item style="display:block">
                <el-button type="primary" @click="protol" size="small">编译</el-button>
              </el-form-item>
            </el-form>
          </div>
          <!--公共协议库弹窗-->
          <el-dialog title="公共协议库" :visible.sync="dialogTableVisible" width="50%">
            <el-table :data="gridData" style="width:100%;text-align:center">
              <el-table-column label="协议名称" align="center">
                <template slot-scope="scope">
                  <span>{{scope.row.attributes.data.name}}</span>
                </template>
              </el-table-column>
              <el-table-column label="版本" align="center">
                <template slot-scope="scope">
                  <span>{{scope.row.attributes.data.version}}</span>
                </template>
              </el-table-column>
              <el-table-column label="描述" align="center" width="300">
                <template slot-scope="scope">
                  <span>{{scope.row.attributes.data.desc}}</span>
                </template>
              </el-table-column>
              <el-table-column label="操作" align="center" width="300">
                <template slot-scope="scope">
                  <el-button type="primary" size="mini" @click="editordata(scope.row)">克隆</el-button>
                </template>
              </el-table-column>
            </el-table>
          </el-dialog>
          <div>
            <div style="background:#ffffff">
              <label id="plug-name"></label>
            </div>
            <pre id="editor" class="ace_editor" style="min-height:600px;margin-bottom:0;"><textarea class="ace_text-input"></textarea></pre>
            <div style="background:#ffffff">
              <label id="plug-name"></label>
            </div>
            <div style="color:#c2be9e;background:#272822;border-top:1px solid #dddddd;padding:5px">
              <span>控制输出</span>
            </div>
            <pre
              id="editor2"
              class="ace_editor"
              style="min-height:300px;margin-bottom:0;margin-top:0"
            ><textarea class="ace_text-input"></textarea></pre>
          </div>
        </el-tab-pane>
        <el-tab-pane label="服务通道" name="fiveth">
          <div class="productchannel" style="text-align:right;padding:10px;">
            <el-button type="primary" size="small" @click="showAllChannel">添加通道</el-button>
          </div>
          <div>
            <el-table :data="channelData" style="width: 100%;">
              <el-table-column label="通道名称">
                <template slot-scope="scope">
                  <span>{{scope.row.attributes.name}}</span>
                </template>
              </el-table-column>
              <el-table-column label="通道地址">
                <template slot="header" slot-scope="scope">
                  <span>
                    <el-tooltip content="${addr}为对应的设备地址" placement="top">
                      <span>
                        通道路径
                        <i class="el-icon-question"></i>
                      </span>
                    </el-tooltip>
                  </span>
                </template>
                <template slot-scope="scope">
                  <span>{{'channel/'+scope.row.attributes.name+'/'+productId+'/${addr}'}}</span>
                </template>
              </el-table-column>
              <el-table-column label="服务类型">
                <template slot-scope="scope">
                  <span>{{scope.row.attributes.type}}</span>
                </template>
              </el-table-column>
              <el-table-column label="侦听端口/TOPIC">
                <template slot-scope="scope">
                  <span v-if="scope.row.attributes.config.port">{{scope.row.attributes.config.port}}</span>
                </template>
              </el-table-column>
              <el-table-column label="操作">
                <template slot-scope="scope">
                  <el-button type="danger" size="mini" @click="deleteRelation(scope.row)">移除通道</el-button>
                </template>
              </el-table-column>
            </el-table>
            <div class="elpagination" style="margin-top:20px;">
              <el-pagination
                @size-change="channelSizeChange"
                @current-change="channelCurrentChange"
                :page-sizes="[10, 20, 30, 50]"
                :page-size="channellength"
                layout="total, sizes, prev, pager, next, jumper"
                :total="channeltotal"
              ></el-pagination>
            </div>
            <!--添加通道-->
            <el-dialog title="添加通道" :visible.sync="innerVisible" append-to-body>
              <div class="addchannel">
                <el-table :data="allchannelData" height="400" style="width: 100%">
                  <el-table-column label="通道名称">
                    <template slot-scope="scope">
                      <span>{{scope.row.attributes.name}}</span>
                    </template>
                  </el-table-column>
                  <el-table-column label="服务类型">
                    <template slot-scope="scope">
                      <span>{{scope.row.attributes.type}}</span>
                    </template>
                  </el-table-column>
                  <el-table-column label="侦听端口/TOPIC">
                    <template slot-scope="scope">
                      <span
                        v-if="scope.row.attributes.config.port"
                      >{{scope.row.attributes.config.port}}</span>
                    </template>
                  </el-table-column>
                  <el-table-column label="通道状态">
                    <template slot-scope="scope">
                      <span v-if="scope.row.attributes.isEnable==true" style="color:green">已启用</span>
                      <span v-else>已禁用</span>
                    </template>
                  </el-table-column>
                  <el-table-column label="操作">
                    <template slot-scope="scope">
                      <el-button
                        size="mini"
                        @click="addProductChannel(scope.row.id)"
                        type="primary"
                      >添加</el-button>
                    </template>
                  </el-table-column>
                </el-table>
                <div class="elpagination" style="margin-top:20px;">
                  <el-pagination
                    @size-change="allChannelSizeChange"
                    @current-change="allChannelCurrentChange"
                    :page-sizes="[10, 20, 30, 50]"
                    :page-size="allChannellength"
                    layout="total, sizes, prev, pager, next, jumper"
                    :total="allChanneltotal"
                  ></el-pagination>
                </div>
              </div>
            </el-dialog>
          </div>
        </el-tab-pane>
      </el-tabs>
    </div>
    <!--物模型-->
    <el-dialog title="查看物模型" :visible.sync="schemadialogVisible" :before-close="handleClose">
      <div>
        <div style="background:#ffffff">
          <label id="plug-name"></label>
        </div>
        <pre id="editor1" class="ace_editor" style="min-height:400px"><textarea class="ace_text-input"></textarea></pre>
      </div>
      <span slot="footer" class="dialog-footer" style="height:30px;">
        <el-button type="primary" @click="preserve">保 存</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
import Parse from "parse";
var editor;
var editor1;
var editor2;
let Base64 = require("js-base64").Base64;
var setdata = "";
var isallchannel = false;
import { Compile } from "@/api/systemmanage/system";
import { getIndustry } from "@/api/applicationManagement";
import $ from "jquery";
import ScrollPane from "@/components/ScrollPane";
import { setTimeout } from "timers";
export default {
  data() {
    var validCode = (rule, value, callback) => {
      let reg = /[0-9a-zA-Z]/;
      if (!reg.test(value)) {
        callback(new Error("协议名称由数字和字母组合"));
      } else {
        callback();
      }
    };
    var checkFrequency = (rule, value, callback) => {
      let minutes = this.$refs.frequencyMinute.value;
      if (!value && !minutes) {
        callback();
      }
      var reg = /^[1-9]\d*$/;
      if (!reg.test(value) || !reg.test(minutes)) {
        callback(new Error("请输入非零正整数"));
      } else {
        if (value > 1440 || minutes > 1440) {
          callback(new Error("数值不能大于1440"));
        } else {
          callback();
        }
      }
    };
    var validminnumber = (rule, value, callback) => {
      let reg = /^[1-9]\d*$/;
      if (!reg.test(value)) {
        callback(new Error("必须为数字"));
      } else if (value >= this.sizeForm.endnumber) {
        callback(new Error("最小值小于最大值"));
      } else {
        callback();
      }
    };
    var validmaxnumber = (rule, value, callback) => {
      let reg = /^[1-9]\d*$/;
      if (!reg.test(value)) {
        callback(new Error("必须为数字"));
      } else if (value <= this.sizeForm.startnumber) {
        callback(new Error("最大值必须大于最小值"));
      } else {
        callback();
      }
    };
    var vailspecs=(rule,value,callback)=>{
      if(value >=this.sizeForm.endnumber-this.sizeForm.startnumber){
        callback(new  Error('步长必须小于最大值和最小值的差值'))
      }else{
        callback()
      }
    }
    return {
      //topic数据
      topicdialogVisible: false,
      topicform: {
        topic: "",
        type: "",
        desc: "",
        isupdated: -1
      },
      topicrule: {
        topic: [{ required: true, message: "请输入Topic类", trigger: "blur" }],
        type: [
          { required: true, message: "请选择Topic权限", trigger: "change" }
        ]
      },
      topicstart: 1,
      topiclength: 10,
      topictotal: 0,
      //服务通道数据
      channelData: [],
      allchannelData: [],
      innerVisible: false,
      allChannelstart: 0,
      allChannellength: 10,
      allChanneltotal: 0,
      //物模型数据
      category: [],
      current: 0,
      schemadialogVisible: false,
      PropData: [],
      originwmx: false,
      wmxdialogVisible: false,
      //自定义物模型
      allunit:[],
      sizeForm: {
        resource: 1,
        identifier: "",
        type: "INT",
        startnumber: "",
        endnumber: "",
        step: "",
        true: "",
        truevalue: 1,
        false: "",
        falsevalue: 0,
        isread: "",
        unit:'',
        specs: [
          {
            attribute: "",
            attributevalue: ""
          }
        ]
      },
      sizerule: {
        step: [
          { required: true, trigger: "blur", validator: vailspecs, },
          // {
          //   validator: function (rule,value,callback){
          //       if(value >= this.sizeForm.endnumber-this.sizeForm.startnumber){
          //         callback(new  Error('步长必须小于最大值和最小值的差值'))
          //       }else{
          //         callback()
          //       }
          //     },
          //   trigger: "blur"
          // }
        ],
        startnumber: [
          { validator: validminnumber, required: true, trigger: "blur" }
        ],
        endnumber: [
          { validator: validmaxnumber, required: true, trigger: "blur" }
        ],
        resource: [
          { required: true, message: "请选择功能类型", trigger: "change" }
        ],
        true: [
          { required: true, message: "请输入属性值", trigger: "blur" }
        ],
        false: [
          { required: true, message: "请输入属性值", trigger: "blur" }
        ],
        name: [{ required: true, message: "请输入属性名称", trigger: "blur" }],
        identifier: [
          { required: true, message: "请输入标识符", trigger: "blur" }
        ],
        type: [
          { required: true, message: "请选择数据类型", trigger: "change" }
        ],
        attribute: [{ required: true, message: "请输入属性", trigger: "blur" }],
        attributevalue: [
          { required: true, message: "请输入属性值", trigger: "blur" }
        ],
        isread: [
            { required: true, message: '请选择读写类型', trigger: 'change' }
          ],
      },
      tableData: [],
      activeName: "first",
      form: {
        Productname: "",
        ProductKey: "",
        ProductAll: 0
      },
      ProductSecret: "",
      dynamicReg: false,
      productId: "",
      productdetail: {},
      topicData: [],
      topic: [
        {
          topic: "thing/${ProductId}/${DevAddr}/post",
          type: "pub",
          desc: "设备上报",
          isdef: true
        },
        {
          topic: "thing/${ProductId}/${DevAddr}",
          type: "sub",
          desc: "消息下发",
          isdef: true
        }
      ],
      isshow: false,
      addRules: {
        name: [
          { required: true, message: "请输入协议名称", trigger: "blur" },
          { validator: validCode, trigger: "blur" }
        ]
      },
      dialogTableVisible: false,
      gridData: [],
      formInline: {
        name: "",
        version: "",
        desc: "",
        resource: false
      },
      objectId: "",
      option: [],
      CategoryKey: "",
      productstart: 0,
      productlength: 10,
      producttotal: 0,
      wmxstart: 1,
      wmxlength: 10,
      wmxtotal: 20,
      wmxData: [],
      warningeditror: [],
      channellength: 10,
      channelstart: 0,
      channeltotal: 0
    };
  },
  computed: {
    treeData() {
      let cloneData = JSON.parse(JSON.stringify(this.option)); // 对源数据深度克隆
      return cloneData.filter(father => {
        let branchArr = cloneData.filter(child => father.id == child.parentid); //返回每一项的子级数组
        branchArr.length > 0 ? (father.children = branchArr) : ""; //如果存在子级，则给父级添加一个children属性，并赋值
        return father.parentid == 0; //返回第一层
      });
    }
  },
  mounted() {
    editor2 = ace.edit("editor2");
    editor2.session.setMode("ace/mode/json"); // 设置语言
    editor2.setTheme("ace/theme/monokai"); // 设置主题
    editor2.setReadOnly(true);
    editor2.setOptions({
      enableBasicAutocompletion: true,
      enableSnippets: true,
      enableLiveAutocompletion: true // 设置自动提示
    });
    this.Industry();
    this.getAllunit()
  },
  methods: {
    getRowClass(row, rowIndex) {
      if (row.row.dataType.type != "struct") {
        //判断当前行是否有子数据
        return "row-expand-cover";
      }
    },
    handleClick(val) {
      if (val.name == "fiveth") {
        this.getProductChannel();
      } else if (val.name == "second") {
        this.getTopic();
      }
    },
    getAllunit(){
      this.allunit=[]
      var Datas = Parse.Object.extend('Datas')
      var datas = new Parse.Query(Datas)
      var arr=[{
        
      }]
      datas.equalTo('type','unit')
      datas.limit(1000)
      datas.find().then(response=>{
        this.allunit = response.concat([])
        this.allunit.unshift({
          attributes:{
          data:{
            Name:'无',
            Symbol:''
          }
        }
        })
      },error=>{
        this.$message.error(error.message)
      })
    },
    getTopic() {
      var Product = Parse.Object.extend("Product");
      var product = new Parse.Query(Product);
      product.get(this.productId).then(
        resultes => {
          if (resultes) {
            this.topicData = resultes.attributes.topics.concat(this.topic);
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
    getProductChannel() {
      var Channel = Parse.Object.extend("Channel");
      var query = new Parse.Query(Channel);
      var Product = Parse.Object.extend("Product");
      var product = new Product();
      product.id = this.productId;
      query.equalTo("product", product);
      query.skip(this.channelstart);
      query.limit(this.channellength);
      query.ascending("-updatedAt");
      query.count().then(count => {
        this.channeltotal = count;
        query.find().then(res => {
          this.channelData = res;
          if (res.length == 0) {
            isallchannel = true;
          } else {
            isallchannel = false;
          }
        });
      });
    },
    //添加关联
    addProductChannel(id) {
      var Channel = Parse.Object.extend("Channel");
      var channel = new Channel();
      channel.id = id;
      var relation = channel.relation("product");
      var Product = Parse.Object.extend("Product");
      var product = new Product();
      product.set("objectId", this.productId);
      relation.add(product);
      channel.save().then(
        res => {
          if (res) {
            this.$message({
              type: "success",
              message: "添加成功"
            });
            this.showAllChannel();
            this.getProductChannel();
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
    //解除关联
    deleteRelation(row) {
      var Channel = Parse.Object.extend("Channel");
      var channel = new Channel();
      channel.id = row.id;
      var relation = channel.relation("product");
      var Product = Parse.Object.extend("Product");
      var product = new Product();
      product.set("objectId", this.productId);
      relation.remove(product);
      channel.save().then(
        res => {
          if (res) {
            this.$message({
              type: "success",
              message: "删除成功"
            });
            this.getProductChannel();
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
    //关联分页
    channelSizeChange(val) {
      this.channellength = val;
      this.getProductChannel();
    },
    channelCurrentChange(val) {
      this.channelstart = (val - 1) * this.channellength;
      this.getProductChannel();
    },
    //展示全部通道
    showAllChannel() {
      this.innerVisible = true;
      var Channel = Parse.Object.extend("Channel");
      var query = new Parse.Query(Channel);
      var Product = Parse.Object.extend("Product");
      var product = new Product();
      product.id = this.productId;
      query.skip(this.allChannelstart);
      query.limit(this.allChannellength);
      query.ascending("-updatedAt");
      if (!isallchannel) {
        query.notEqualTo("product", product);
      }
      query.count().then(count => {
        this.allChanneltotal = count;
        query.find().then(resultes => {
          this.allchannelData = resultes;
        });
      });
    },
    allChannelSizeChange(val) {
      this.allChannellength = val;
      this.showAllChannel();
    },
    allChannelCurrentChange(val) {
      this.allChannelstart = (val - 1) * this.allChannellength;
      this.showAllChannel();
    },
    //删除枚举型
    removeDomain(item) {
      var index = this.sizeForm.specs.indexOf(item);
      if (index !== -1) {
        this.sizeForm.specs.splice(index, 1);
      }
    },
    addDomain() {
      this.sizeForm.specs.push({
        value: "",
        name: ""
      });
    },
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          var obj={}
          console.log(this.sizeForm)
           var Product = Parse.Object.extend("Product");
           var product = new Parse.Query(Product);
           
          product.get(this.productId).then(response => {
                if(this.sizeForm.type=='FLOAT'||this.sizeForm.type=='DOUBLE'||this.sizeForm.type=='INT'){
                    obj= {
                        "name": this.sizeForm.name,
                        "dataType": {
                          "type": this.sizeForm.type.toLowerCase(),
                          "specs": {
                            "max": this.sizeForm.endnumber,
                            "min": this.sizeForm.startnumber,
                            "step": this.sizeForm.step,
                            "unit": this.sizeForm.unit=='' ? '':this.sizeForm.unit,  
                          }
                        },
                        "required": true,
                        "accessMode": this.sizeForm.isread,
                        "identifier": this.sizeForm.identifier
                      }
                     
                }else if(this.sizeForm.type=="BOOL"){
                   obj={
                  "name": this.sizeForm.name,
                  "dataType": {
                    "type": this.sizeForm.type.toLowerCase(),
                    "specs": {
                      "0": this.sizeForm.false,
                      "1": this.sizeForm.true
                    }
                  },
                   "required": false,
                   "accessMode": this.sizeForm.isread,
                    "identifier": this.sizeForm.identifier
                  }
                }else if(this.sizeForm.type="ENUM") {
                  console.log(this.sizeForm.specs)
                  var specs={}
                  this.sizeForm.specs.map(items=>{
                    
                      var newkey = items['attribute']
                      specs[newkey] = items['attributevalue']
                    
                  })
                  console.log(specs)
                    obj={
                      "name": this.sizeForm.name,
                      "dataType": {
                        "type": this.sizeForm.type.toLowerCase(),
                        "specs":specs
                      },
                      "required": true,
                        "accessMode": this.sizeForm.isread,
                        "identifier": this.sizeForm.identifier
                    }
                }
                      this.productdetail.thing.properties.unshift(obj)
                      response.set('thing',this.productdetail.thing)
                      response.save().then(resultes=>{
                        if(resultes){
                          this.$message({
                            type:'success',
                            message:'添加成功'
                          })
                          this.getProDetail();
                          this.$refs[formName].resetFields()
                          this.wmxdialogVisible=false
                        }
                      })
          })
        } else {
          console.log(valid)
          console.log("error submit!!");
          return false;
        }
      });
    },
    preserve() {
      var Product = Parse.Object.extend("Product");
      var product = new Parse.Query(Product);
      product.get(this.productId).then(response => {
        response.set("thing", JSON.parse(editor1.getValue()));
        response.save().then(
          resultes => {
            if (resultes) {
              this.$message({
                type: "success",
                message: "保存成功"
              });
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
    },
    Industry() {
      this.option = [];
      getIndustry({ limit: 1000, where: { type: "category" } })
        .then(res => {
          if (res) {
            res.results.map(items => {
              var obj = {};
              obj.value = items.data.CategoryKey;
              obj.label = items.data.CategoryName;
              obj.id = items.data.Id;
              obj.parentid = items.data.SuperId;
              this.option.push(obj);
            });
            this.getProDetail();
          }
        })
        .catch(error => {
          this.$message({
            type: "error",
            message: error.error
          });
        });
    },
    utc2beijing(utc_datetime) {
      // 转为正常的时间格式 年-月-日 时:分:秒
      var date = new Date(+new Date(utc_datetime) + 8 * 3600 * 1000)
        .toISOString()
        .replace(/T/g, " ")
        .replace(/\.[\d]{3}Z/, "");
      return date; // 2017-03-31 16:02:06
    },
    getPropData() {
      this.CategoryKey = this.$route.query.CategoryKey;
      var Datas = Parse.Object.extend("Datas");
      var datas = new Parse.Query(Datas);
      datas.limit(this.productlength);
      datas.skip(this.productstart);
      if (this.category.length != 0) {
        datas.equalTo(
          "data.CategoryType",
          this.category[this.category.length - 1]
        );
      }
      datas.equalTo("type", "abilityInfo"),
        datas.count().then(count => {
          this.producttotal = count;
          datas.find().then(
            res => {
              this.PropData = res;
            },
            error => {
              console.log(error);
            }
          );
        });
    },
    productSizeChange(val) {
      this.productlength = val;
      this.getPropData();
    },
    productCurrentChange(val) {
      this.productstart = (val - 1) * this.productlength;
      this.getPropData();
    },
    //查看物模型模板
    checkschema() {
      this.schemadialogVisible = true;
      setTimeout(() => {
        editor1 = ace.edit("editor1");
        editor1.session.setMode("ace/mode/json"); // 设置语言
        editor1.setTheme("ace/theme/eclipse"); // 设置主题
        editor1.setOptions({
          enableBasicAutocompletion: true,
          enableSnippets: true,
          enableLiveAutocompletion: true // 设置自动提示
        });
        editor1.setValue(JSON.stringify(this.productdetail.thing, null, 4));
      }, 1);
    },
    //得到产品详情
    getProDetail() {
      editor = ace.edit("editor");
      editor.session.setMode("ace/mode/erlang"); // 设置语言
      editor.setTheme("ace/theme/monokai"); // 设置主题
      editor.setOptions({
        enableBasicAutocompletion: true,
        enableSnippets: true,
        enableLiveAutocompletion: true // 设置自动提示
      });
      this.productId = this.$route.query.id;
      var Product = Parse.Object.extend("Product");
      var product = new Parse.Query(Product);
      product.get(this.productId).then(
        response => {
          if (response) {
            for (var key in response.attributes) {
              this.productdetail[key] = response.attributes[key];
            }
            this.option.map(items => {
              if (this.productdetail.category == items.value) {
                this.productdetail.category = items.label;
              }
            });
            this.productdetail.createdAt = this.utc2beijing(response.createdAt);
            this.productdetail.id = response.id;
            this.dynamicReg = response.attributes.dynamicReg;
            this.productdetail.isshow = 0;
            this.form.Productname = response.attributes.name;
            this.ProductSecret = response.attributes.productSecret;
            this.form.Productkey = this.productId;
            if (response.attributes.decoder) {
              setdata = response.attributes.decoder.code;
              this.formInline.name = response.attributes.decoder.name;
              this.formInline.version = response.attributes.decoder.version;
              this.formInline.desc = response.attributes.decoder.desc;
            } else {
              setdata =
                "JSUlLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLQolJSUgQGNvcHlyaWdodCAoQykgMjAxOCwgPHNodXdhPgolJSUgQGRvYwolJSUg5Y2P6K6u6Kej5p6QRGVtbwolJSUgQGVuZAolJSUgQ3JlYXRlZCA6IDA4LiDljYHkuIDmnIggMjAxOCAxNDo0OQolJSUtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tCi1tb2R1bGUoc2h1d2FfZGVtb19kZWNvZGVyKS4KLWF1dGhvcigic2h1d2EiKS4KLWRlZmluZShNU0dfVFlQRSwgPDwiREVNTyI+PikuCi1wcm90b2NvbChbPDwiREVNTyI+Pl0pLgoKLWV4cG9ydChbcGFyc2VfZnJhbWUvMiwgdG9fZnJhbWUvMV0pLgoKCnBhcnNlX2ZyYW1lKEJ1ZmYsIE9wdHMpIC0+CiAgICBwYXJzZV9mcmFtZShCdWZmLCBbXSwgT3B0cykuCgoKcGFyc2VfZnJhbWUoPDw+PiwgQWNjLCBfT3B0cykgLT4KICAgIHs8PD4+LCBBY2N9OwpwYXJzZV9mcmFtZSg8PDE2IzY4LCBSZXN0L2JpbmFyeT4+ID0gQmluLCBBY2MsIF9PcHRzKSB3aGVuIGJ5dGVfc2l6ZShSZXN0KSA9PCA2IC0+CiAgICB7QmluLCBBY2N9OwpwYXJzZV9mcmFtZSg8PDE2IzY4LCBMZW46MTYvbGl0dGxlLWludGVnZXIsIExlbjoxNi9saXR0bGUtaW50ZWdlciwgMTYjNjgsIFJlc3QvYmluYXJ5Pj4gPSBCaW4sIEFjYywgT3B0cykgLT4KICAgIGNhc2UgYnl0ZV9zaXplKFJlc3QpIC0gMiA+PSBMZW4gb2YKICAgICAgICB0cnVlIC0+CiAgICAgICAgICAgIGNhc2UgUmVzdCBvZgogICAgICAgICAgICAgICAgPDxVc2VyWm9uZTpMZW4vYnl0ZXMsIENyYzo4LCAxNiMxNiwgUmVzdDEvYmluYXJ5Pj4gLT4KICAgICAgICAgICAgICAgICAgICBBY2MxID0KICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSBzaHV3YV91dGlsczpnZXRfcGFyaXR5KFVzZXJab25lKSA9Oj0gQ3JjIG9mCiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0cnVlIC0+CiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgRnJhbWUgPSAjewogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8PCJtc2d0eXBlIj4+ID0+ID9NU0dfVFlQRSwKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPDwiZGF0YSI+PiA9PiBVc2VyWm9uZQogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0sCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgQWNjICsrIFtGcmFtZV07CiAgICAgICAgICAgICAgICAgICAgICAgICAgICBmYWxzZSAtPgogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIEFjYwogICAgICAgICAgICAgICAgICAgICAgICBlbmQsCiAgICAgICAgICAgICAgICAgICAgcGFyc2VfZnJhbWUoUmVzdDEsIEFjYzEsIE9wdHMpOwogICAgICAgICAgICAgICAgXyAtPgogICAgICAgICAgICAgICAgICAgIHBhcnNlX2ZyYW1lKFJlc3QsIEFjYywgT3B0cykKICAgICAgICAgICAgZW5kOwogICAgICAgIGZhbHNlIC0+CiAgICAgICAgICAgIHtCaW4sIEFjY30KICAgIGVuZDsKcGFyc2VfZnJhbWUoPDxfOjgsIFJlc3QvYmluYXJ5Pj4sIEFjYywgT3B0cykgLT4KICAgIHBhcnNlX2ZyYW1lKFJlc3QsIEFjYywgT3B0cykuCgoKJSUg57uE6KOF5oiQ5bCB5YyFLCDlj4LmlbDkuLpNYXDlvaLlvI8KdG9fZnJhbWUoI3s8PCJtc2d0eXBlIj4+IDo9ID9NU0dfVFlQRX0gPSBGcmFtZSkgLT4KICAgIFBheWxvYWQgPSB0ZXJtX3RvX2JpbmFyeShGcmFtZSksCiAgICA8PDE2IzAzLCBQYXlsb2FkL2JpbmFyeSwgMTYjMjM+Pi4=";
            }
            if (!this.productdetail.thing) {
              this.productdetail.thing = {
                properties: []
              };
              this.wmxData = this.productdetail.thing.properties.concat([]);
            } else {
              this.wmxData = this.productdetail.thing.properties.concat([]);
            }

            editor.setValue(Base64.decode(setdata));
            var Devices = Parse.Object.extend("Devices");
            var devices = new Parse.Query(Devices);

            devices.equalTo("product", this.productId);
            devices.skip(0);
            devices.count().then(count => {
              this.form.ProductAll = count;
            });
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
    handelUpdate(event, row) {
      var isopen;
      if (event == true) {
        isopen = false;
      } else {
        isopen = true;
      }
      this.dynamicReg = isopen;
      var Product = Parse.Object.extend("Product");
      var product = new Parse.Query(Product);
      product.get(this.productId).then(response => {
        response.set("dynamicReg", !isopen);
        response.save().then(
          resultes => {
            if (resultes) {
              this.$message({
                type: "success",
                message: "修改成功"
              });
              this.dynamicReg = !isopen;
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
      // var isopen =
    },
    //    updateisshow(isshow){
    //     this.$set(this.productdetail,'isshow',isshow)
    //     console.log(this.productdetail)

    //    }
    wmxhandleClose() {
      this.wmxdialogVisible = false;
    },
    protol() {
      var log = "";
      Compile(Base64.encode(editor.getValue()))
        .then(res => {
          if (res) {
            this.$message({
              type: "success",
              message: "编译成功"
            });
            log = "编译成功" + res.mod + "\r\n";
            this.warningeditror = res.warnings;
            this.warningeditror.map(items => {
              log += items + "\r\n";
            });
            editor2.setValue(log);
          }
        })
        .catch(error => {
          this.warningeditror = error.error;
          this.warningeditror.map(items => {
            log += items + "\r\n";
          });
          editor2.setValue(log);
        });
    },
    subAce(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          var obj = {
            name: this.formInline.name,
            version: this.formInline.version,
            code: Base64.encode(editor.getValue()),
            desc: this.formInline.desc
          };
          var Product = Parse.Object.extend("Product");
          var product = new Parse.Query(Product);
          product.get(this.productId).then(object => {
            object.set("decoder", obj);
            object.save().then(res => {
              this.$message({
                type: "success",
                message: "保存成功"
              });
            });
          });
        } else {
          this.$message({
            type: "warning",
            message: "输入格式有误"
          });
        }
      });
    },
    chaxun() {
      var Datas = Parse.Object.extend("Datas");
      var datas = new Parse.Query(Datas);
      datas.equalTo("type", "decoder");
      datas.ascending("-createdAt");
      datas.find().then(resultes => {
        if (resultes) {
          this.dialogTableVisible = true;
          this.gridData = resultes;
        }
      });
    },
    editordata(row) {
      this.formInline.name = row.attributes.data.name;
      this.formInline.version = row.attributes.data.version;
      this.formInline.desc = row.attributes.data.desc;
      this.formInline.resource = row.attributes.data.enable;
      editor.setValue(Base64.decode(row.attributes.data.code));
      this.dialogTableVisible = false;
    },
    goToDevices() {
      this.$router.push({
        path: "/roles/thing",
        query: {
          productid: this.productId
        }
      });
    },
    addcategory() {
      this.originwmx = true;
      this.getPropData();
    },
    handleChange(value, direction, movedKeys) {
      console.log(value, direction, movedKeys);
    },
    TypeInstall(origin, arr) {
      arr.map((items, index) => {
        if (items.DataType == "enum" || items.DataType == "bool") {
          var obj = {
            dataType: {
              specs: {}
            }
          };
          obj.name = items.Name;
          obj.dataType.type = items.DataType;
          obj.required = items.Required;
          obj.identifier = items.Identifier;
          obj.accessMode = items.RwFlag == 1 ? "r" : "rw";
          JSON.parse(items.DataSpecsList).map(child => {
            for (var key in child) {
              var attribute = child["value"];
              var value = child["name"];
              obj.dataType.specs[attribute] = value;
            }
          });
          origin.push(obj);
        } else if (
          items.DataType == "double" ||
          items.DataType == "int" ||
          items.DataType == "float"
        ) {
          var obj = {
            dataType: {
              specs: {}
            }
          };
          obj.name = items.Name;
          obj.dataType.type = items.DataType;
          obj.required = items.Required;
          obj.identifier = items.Identifier;
          obj.accessMode = items.RwFlag == 1 ? "r" : "rw";
          for (var key in JSON.parse(items.DataSpecs)) {
            obj.dataType.specs.min = JSON.parse(items.DataSpecs)["min"];
            obj.dataType.specs.max = JSON.parse(items.DataSpecs)["max"];
            obj.dataType.specs.step = JSON.parse(items.DataSpecs)["step"];
            obj.dataType.specs.unit = JSON.parse(items.DataSpecs)["unit"];
          }
          origin.push(obj);
        }
      });
      var update = {};
      origin = origin.reduce((cur, next) => {
        update[next.identifier]
          ? ""
          : (update[next.identifier] = true && cur.push(next));
        return cur;
      }, []);
    },
    addProCategory(row) {
      var Product = Parse.Object.extend("Product");
      var product = new Parse.Query(Product);
      var Datas = Parse.Object.extend("Datas");
      var datas = new Parse.Query(Datas);
      datas.equalTo("type", row.attributes.data.CategoryType);
      datas.find().then(res => {
        if (res) {
          if (res[0].attributes.data.Ability) {
            this.TypeInstall(
              this.productdetail.thing.properties,
              res[0].attributes.data.Ability
            );
            product.get(this.productId).then(resultes => {
              resultes.set("thing", this.productdetail.thing);
              resultes.save().then(resultes => {
                this.$message({
                  type: "success",
                  message: "添加成功"
                });
                this.getProDetail();
              });
            });
          } else {
            console.log("此选项没有属性功能");
          }

          // let obj = {}
          // this. productdetail.thing.properties = this.productdetail.thing.properties.reduce((cur,next) => {
          //         obj[next.identifier] ? "" : obj[next.identifier] = true && cur.push(next);
          //         return cur;
          // },[])
        }
      });
    },
    /*删除物模型*/
    deletewmx(index) {
      this.productdetail.thing.properties.splice(
        (this.wmxstart - 1) * this.wmxlength + index,
        1
      );
      var Product = Parse.Object.extend("Product");
      var product = new Parse.Query(Product);
      product.get(this.productId).then(resultes => {
        resultes.set("thing", this.productdetail.thing);
        resultes.save().then(
          resultes => {
            if (resultes) {
              this.$message({
                type: "success",
                message: "删除成功"
              });
              this.wmxData = this.productdetail.thing.properties.concat([]);
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
    },
    wmxSizeChange(val) {
      this.wmxstart = 1;
      this.wmxlength = val;
      console.log(
        this.wmxData.slice(
          (this.wmxstart - 1) * this.wmxlength,
          this.wmxstart * this.wmxlength
        )
      );
    },
    wmxCurrentChange(val) {
      this.wmxstart = val;
    },
    //topic增加
    subTopic(formName, isupdated) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          var Topic =
            "thing/" + this.productId + "/${DevAddr}/" + this.topicform.topic;
          var Product = Parse.Object.extend("Product");
          var product = new Parse.Query(Product);
          product.get(this.productId).then(resultes => {
            var addTopic = {
              topic: Topic,
              type: this.topicform.type,
              desc: this.topicform.desc
            };
            var arr = [];
            arr.push(addTopic);
            if (isupdated == -1) {
              arr = arr.concat(resultes.attributes.topics);
              resultes.set("topics", arr);
            } else {
              var topicupdated = resultes.attributes.topics.concat([]);
              topicupdated[isupdated] = addTopic;
              resultes.set("topics", topicupdated);
            }
            resultes.save().then(
              response => {
                if (response) {
                  this.$message({
                    type: "success",
                    message: "成功"
                  });
                  this.topicdialogVisible = false;
                  this.$refs[formName].resetFields();
                  (this.topicform.isupdated = -1), (this.topicform.topic = "");
                  this.topicform.desc = "";
                  this.handleClick({ name: "second" });
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
    topicSizeChange(val) {
      this.topicstart = 1;
      this.topiclength = val;
    },
    topicCurrentChange(val) {
      this.topicstart = val;
    },
    updatetopic(row, index) {
      this.topicform.topic = row.topic.substr(row.topic.lastIndexOf("/") + 1);
      this.topicform.type = row.type;
      this.topicform.desc = row.desc;
      this.topicdialogVisible = true;
      this.topicform.isupdated = index;
    },
    deletetopic(scope, index) {
      var Product = Parse.Object.extend("Product");
      var product = new Parse.Query(Product);
      product.get(this.productId).then(resultes => {
        var topic = resultes.attributes.topics.concat([]);
        topic.splice(index, 1);
        resultes.set("topics", topic);
        resultes.save().then(
          response => {
            if (response) {
              this.$message({
                type: "success",
                message: "删除成功"
              });
              scope._self.$refs[`popover-${scope.$index}`].doClose();
              this.handleClick({ name: "second" });
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
    }
  }
};
</script>
<style scoped>
.editproduct {
  height: 100%;
  width: 100%;
  padding: 20px;
  box-sizing: border-box;
}
.mailtable .cloumn {
  text-align: left;
  color: #74777a;
  font-weight: 400;
  background: #fafafc;
  width: 200px;
  font-weight: bold;
  border-right: 1px solid #ebecec;
  border-bottom: 1px solid #ebecec;
}
.mailtable td {
  padding: 15px;
  font-size: 14px;
  text-align: left;
  box-sizing: border-box;
  color: #74777a;
  border: 1px solid #ebecec;
}
.editheader .product ul {
  width: 100%;
  height: 50px;
  padding-left: 0;
}
.editheader .product ul li:first-child,
.editheader .product ul li:last-child {
  width: 25%;
  list-style: none;
  color: #74777a;
  font-size: 16px;
  line-height: 50px;
  float: left;
  text-align: left;
}
.editheader .product ul li:nth-child(2) {
  width: 50%;
  list-style: none;
  color: #74777a;
  font-size: 16px;
  line-height: 50px;
  float: left;
  text-align: left;
}
</style>
<style>
.editproduct .el-tabs__item {
  font-size: 16px;
  margin-top: 20px;
  margin: 0;
  height: 50px;
  line-height: 50px;
  font-family: auto;
}
.editproduct .el-tabs__header {
  margin: 0;
}
.editproduct .el-tabs__content {
  background: #f4f4f4;
  padding: 20px 10px 0 10px;
  box-sizing: border-box;
}
.editproduct .el-tab-pane {
  background: #ffffff;
  padding-top: 10px;
  box-sizing: border-box;
}
.editproduct .el-dialog__body {
  padding: 0 20px;
}
.editproduct .inputnumber {
  width: auto;
}
.editproduct .el-table td,
.editproduct .el-table th {
  padding: 5px 0;
}
.editproduct .warning {
  background: #272822;
  color: #ffffff;
  width: 100%;
}
.editproduct .error {
  background: #272822;
  color: #f56c6c;
  width: 100%;
}
.editproduct .el-form-item {
  margin-bottom: 5px;
}
.editproduct .el-form-item__content {
  clear: both;
  margin-left: 0;
}
.editproduct .el-dialog__header {
  border-bottom: 1px solid #dddddd;
}
.editproduct .el-cascader {
  width: 60%;
}
.editproduct .el-cascader .el-input__inner {
  height: 30px;
}
.editproduct .topiccontent {
  padding: 10px;
  box-sizing: border-box;
}
.editproduct .topicform .el-select {
  width: 100%;
}
.editproduct .row-expand-cover td:first-child .el-icon-arrow-right {
  visibility: hidden;
}
.editproduct .row-expand-cover + tr {
  display: none;
}
.editproduct .el-table__expanded-cell {
  padding: 20px 0 !important;
  text-align: center;
  margin: 0 auto;
  box-sizing: border-box;
  left: 100px;
}
.editproduct .el-table__expanded-cell .el-table th.is-leaf {
  background: #ced7de9c;
}
</style>

