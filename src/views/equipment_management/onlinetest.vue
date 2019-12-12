<template>
  <div class="onlinetest">
    <div class="onlinetest_top">
         <div >
            <el-form :model="devices" label-width="100px" :inline="true" size="mini">
                <el-form-item label="请选择设备">
                    <el-select v-model="devices.productid" @change="selsectProduct">
                        <el-option v-for="(item,index) in productlist" :key="index" :label="item.attributes.name" :value="item.id">

                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item>
                    <el-select v-model="devices.deviceid" v-el-select-loadmore="loadmore">
                        <el-option v-for="(item,index) in devicelist" :key="index" :label="item.attributes.name" :value="item.id"></el-option>
                    </el-select>
                </el-form-item>
            </el-form>
        </div>
      <div class="top_content">
            <span style="display:inline-block;font-size:20px;font-weight:900">实时日志</span>
            <span :class="status" class="status"></span>
            <span style="font-size:14px;color:grey">(未激活)真实设备</span>
          <div style="float:right">
              <el-switch
            style="display: inline-block;margin-right:10px;"
            v-model="value4"
            active-color="#13ce66"
            inactive-color="#ff4949"
            inactive-text="自动刷新">
            </el-switch>
            <el-button type="primary" size="medium">刷新</el-button>
            <el-button type="primary" size="medium">清屏</el-button>
          </div>
          <div class="tableforcontent" style="margin-top:20px;">
               <el-table
                :data="contentData"
                style="width: 100%"
                height="250">
                <el-table-column
                    prop="date"
                    label="数据类型"
                    >
                </el-table-column>
                <el-table-column
                    prop="name"
                    label="时间"
                    >
                </el-table-column>
                <el-table-column
                    prop="name"
                    label="数据内容"
                    >
                </el-table-column>
                </el-table>
          </div>
      </div>
    </div>
    <div class="onlinetest_bottom">
      <el-tabs type="border-card">
        <el-tab-pane label="调试真实设备">
            <div class="bottom1_top">
                <el-button-group>
                    <el-button :type="primary==true ? 'primary':'info'" @click="primary=true" size="mini" plain>属性调试</el-button>
                    <el-button :type="primary==false ? 'primary':'info'" @click="primary=false" size="mini" plain>服务调用</el-button>
                </el-button-group>
                <div>
                <div class="editorheader">
                    <el-form :model="editor1" :inline="true" label-width="80px" size="mini">
                        <el-form-item label="调试功能">
                            <el-select v-model="editor1.function" :clear="clearEditor1">
                                <el-option label="11111" value="2222"></el-option>
                            </el-select>
                        </el-form-item>
                        <div style="display:inline-block" v-if="primary==true">
                             <el-form-item label="功能">
                                <el-select v-model="editor1.method">
                                    <el-option></el-option>
                                </el-select>
                            </el-form-item>
                        </div>
                        
                    </el-form>
                </div>
                <div style="background:#ffffff">
                    <label id="plug-name"></label>
                </div>
                    <pre id="editor1" class="ace_editor" style="min-height:300px"><textarea class="ace_text-input"></textarea></pre>
                    <div>
                        <el-tooltip class="item" effect="dark" content="请选择功能" placement="top-start" v-if="editor1.function==''">
                            <span><el-button type="info" plain size="mini" :disabled="editor1.function==''">发送指令</el-button></span>
                        </el-tooltip>
                        <el-button type="info" plain size="mini" v-else :disabled="editor1.function==''">发送指令</el-button>
                        <el-button type="info" plain size="mini" :disabled="editor1.function==''">重置</el-button>
                    </div>
                </div>
            </div>
        </el-tab-pane>
        <!--第二个tab页-->
        <el-tab-pane label="调试虚拟设备">
            <div class="editor2header">
                <div class="editor2show animated fadeIn" v-if="isactive==true" >
                     <el-button-group>
                        <el-button :type="primary1==1 ? 'primary':'info'" size="mini" @click="primary1=1" plain>属性上报</el-button>
                        <el-button :type="primary1==2 ? 'primary':'info'" size="mini" @click="primary1=2" plain>事件上报</el-button>
                        <el-button :type="primary1==3 ? 'primary':'info'" size="mini" @click="functionClick" plain>属性调试</el-button>
                        <el-button :type="primary1==4 ? 'primary':'info'" size="mini" @click="primary1=4" plain>服务调用</el-button>
                    </el-button-group>
                    <!--属性上报-->
                    <div class="primary1 " v-show="primary1==1">
                        <el-form :model="primary1form" size="mini">
                            <el-form-item label="lightStatus">
                                <el-select v-model="primary1form.status">
                                    <el-option label="11111" value="2222"></el-option>
                                </el-select>
                            </el-form-item>
                            <!--属性上报内容-->
                            <div class="primary1content">

                            </div>
                            <div class="primary1bottom">
                                <el-button  type="primary" size="mini">推送</el-button>
                                <el-button  type="info" size="mini" plain>策略推送</el-button>
                                <el-button  type="info" size="mini" plain @click="isactive=false">关闭虚拟设备</el-button>
                                <el-button  type="info" size="mini" plain>查看数据</el-button>
                            </div>
                        </el-form>
                    </div>
                    <!--事件上报-->
                    <div class="primary2 animated fadeInUp" v-show="primary1==2">
                         <img src="../../imgages/logo2.png" alt="" style="height:80px;width:100px">
                         <div style="margin-top: 20px;font-size: 20px;margin-bottom:20px;color:#73777a;">暂无数据</div>
                         <div>
                             <el-button type="primary" size="small">编辑物模型</el-button>
                             <el-button type="info" size="small" @click="isactive=false">关闭设备</el-button>
                         </div>
                    </div>
                    <div class="primary3" v-show="primary1==3||primary1==4">
                         <div class="editorheader">
                    <el-form :model="editor2" :inline="true" label-width="80px" size="mini">
                        <el-form-item label="调试功能">
                            <el-select v-model="editor2.function">
                                <el-option label="11111" value="2222"></el-option>
                            </el-select>
                        </el-form-item>
                        <div style="display:inline-block" v-if="primary1==3">
                             <el-form-item label="功能">
                                <el-select v-model="editor2.method">
                                    <el-option></el-option>
                                </el-select>
                            </el-form-item>
                        </div>
                        
                    </el-form>
                </div>
                <div style="background:#ffffff">
                    <label id="plug-name"></label>
                </div>
                    <pre id="editor2" class="ace_editor" style="min-height:300px"><textarea class="ace_text-input"></textarea></pre>
                    <div>
                        <el-tooltip class="item" effect="dark" content="请选择功能" placement="top-start" v-if="editor2.function==''">
                            <span><el-button type="info" plain size="mini" :disabled="editor2.function==''">发送指令</el-button></span>
                        </el-tooltip>
                        <el-button type="info" plain size="mini" v-else>发送指令</el-button>
                        <el-button type="info" plain size="mini">重置</el-button>
                    </div>
                </div>
                </div>
                <!--第二个tab-->
                <div class="editor2hidden animated fadeInDown" v-else>
                    <img src="../../imgages/logo2.png" alt="" style="height:80px;width:100px">
                    <div style="margin-top: 20px;font-size: 20px">调试虚拟设备</div>
                    <div style="text-align:center;font-size:14px;color:#73777a;margin-top:8px;margin-bottom:20px;">虚拟设备可以模拟真实设备在云端建立连接，上报定义的属性及事件处理，<br/>这样可以不依赖真实设备快速开发应用</div>
                      <el-button type="primary" size="mini" @click="isactive=true">启动真实设备</el-button>
                </div>
               
            </div>
             
        </el-tab-pane>
    </el-tabs>
    </div>
  </div>
</template>
<script>
import Parse from "parse";
import echarts from 'echarts';
import {
  Websocket,
  sendInfo,
  TOPIC_EMPTY,
  MSG_EMPTY,
  DISCONNECT_MSG
} from "@/utils/wxscoket.js";
var editor1;
var editor2;
export default {
  name: "OnlineTest",
  directives: {
    'el-select-loadmore': {
      bind(el, binding) {
        // 获取element-ui定义好的scroll盒子
        const SELECTWRAP_DOM = el.querySelector('.el-select-dropdown .el-select-dropdown__wrap');
        SELECTWRAP_DOM.addEventListener('scroll', function () {
          /**
          * scrollHeight 获取元素内容高度(只读)
          * scrollTop 获取或者设置元素的偏移值,常用于, 计算滚动条的位置, 当一个元素的容器没有产生垂直方向的滚动条, 那它的scrollTop的值默认为0.
          * clientHeight 读取元素的可见高度(只读)
          * 如果元素滚动到底, 下面等式返回true, 没有则返回false:
          * ele.scrollHeight - ele.scrollTop === ele.clientHeight;
          */
          const condition = this.scrollHeight - this.scrollTop <= this.clientHeight;
          if (condition) {
            binding.value();
          }
        });
      }
    }
  },
  data() {
    return {
     primary:true,
     status:'active',
     value4:true,
     contentData:[],
     devices:{
         deviceid:'',
         productid:'',
     },
     editor1:{
         function:'',
         method:''
     },
     editor2:{
         function:'',
         method:''
     },
     primary2active:true,
     primary1:1,
     isactive:false,
     primary1form:{
         status:''
     },
     productlist:[],
     devicelist:[],
     formData: {
        pageIndex: 1,
        pageSize: 20,
      }
    };
  },
  mounted() {
        editor1 = ace.edit("editor1");
        editor1.session.setMode("ace/mode/json"); // 设置语言
        editor1.setTheme("ace/theme/eclipse"); // 设置主题
        editor1.setOptions({
        enableBasicAutocompletion: true,
        enableSnippets: true,
        enableLiveAutocompletion: true // 设置自动提示
    });
    this.getProduct()
  },
  methods: {
    //发送指令
    sendZl() {},
    setJson(){
       
    },
    loadmore() {
      this.formData.pageIndex++;
      this.selsectProduct(this.productid);
    },
    getProduct(){
      var Product = Parse.Object.extend("Product");
      var product = new Parse.Query(Product);
      product.limit(1000)
      product.find().then(productresultes=>{
         this.productlist=productresultes
         this.devices.productid = this.$route.query.productid
         this.getDevices(this.productid,true)
        
      })
    },
    //设备
    getDevices(productid,isfirst){
      var Devices = Parse.Object.extend("Devices");
      var devices = new Parse.Query(Devices);
      devices.equalTo('product',productid)
      devices.skip((this.formData.pageIndex-1)*this.formData.pageSize)
      devices.limit(this.formData.pageSize)
      devices.find().then(deviceresultes=>{
          this.devicelist = [...this.devicelist, ...deviceresultes]
          if(isfirst){
              this.devices.deviceid = this.$route.query.deviceid
          }
      })
    },
    //选择产品
    selsectProduct(value){
        this.formData.pageIndex=1
        this.devicelist=[]
        this.devices.productid = value
        this.devices.deviceid=''
        this.getDevices(value)
    },
    //清空选择框1
    // clearEditor1(){
    //      this.editor1.function=''
    //      console.log(this.editor1.function)
    // },
    functionClick(){
        this.primary1=3
        setTimeout(()=>{
             editor2 = ace.edit("editor2");
            editor2.session.setMode("ace/mode/json"); // 设置语言
            editor2.setTheme("ace/theme/eclipse"); // 设置主题
            editor2.setOptions({
            enableBasicAutocompletion: true,
            enableSnippets: true,
            enableLiveAutocompletion: true // 设置自动提示
        })
        },300)
        
}
  }
};
</script>
<style lang="scss" scoped>
.onlinetest {
  height: 100%;
  width: 100%;
  padding: 10px;
  box-sizing: border-box;
  background: #f0f2f5;
  .onlinetest_top {
    padding: 20px;
    width: 100%;
    height: 370px;
    background: white;
    box-sizing: border-box;
    /deep/ .el-form-item__label{
        text-align: left;
    }
    .status{
        display:inline-block;
        width:5px;
        height:5px;
        border-radius: 50%;
        vertical-align:middle;
        margin-left:10px;
    }
    .active{
        background:green
    }
    .notonline{
        background:red
    }
  }
  .onlinetest_bottom {
    padding: 20px;
    width: 100%;
    height: auto;
    background: white;
    margin-top: 20px;
    box-sizing: border-box;
    /deep/ .editorheader{
        padding: 8px;
        border-top: 1px solid rgb(235, 236, 236);
        border-right: none;
        border-bottom: 1px solid rgb(235, 236, 236);
        border-left: none;
        border-image: initial;
        box-sizing: border-box;
        background: #f9f9f9;
        margin-top:10px;
        /deep/ .el-form-item{
            margin-bottom:0;
        }
        /deep/ .ace_editor{
            margin-top:0;
        }     
    }
    /deep/ .editor2header{
                .editor2hidden{
            height:300px;
            width:100%;
            display: flex;
            flex-direction:column;
            align-items: center;
            overflow:  hidden auto;
            justify-content: center;
            }
            .editor2show{
                .primary1{
                    margin-top:10px;
                }
                .primary2{
                    display: flex;
                    flex-direction: column;
                    align-items:center;
                    height:300px;
                    justify-content: center;
                }
            }
            /deep/ .primary1content{
                height:220px;
                border-bottom:1px solid #cccccc;
                margin-bottom:10px;
            }
        }
  }
}
</style>
