(window.webpackJsonp=window.webpackJsonp||[]).push([["chunk-630d"],{"/vH7":function(t,e,i){"use strict";var a=i("v6BD");i.n(a).a},Ynr8:function(t,e,i){"use strict";i.r(e);i("v0iw"),i("MT78"),i("xiB2");var a,n,s={name:"OnlineTest",data:function(){return{primary:!0,status:"active",value4:!0,contentData:[],devices:{device:""},editor1:{function:"",method:""},editor2:{function:"",method:""},primary2active:!0,primary1:1,isactive:!1,primary1form:{status:""}}},mounted:function(){(a=ace.edit("editor1")).session.setMode("ace/mode/json"),a.setTheme("ace/theme/eclipse"),a.setOptions({enableBasicAutocompletion:!0,enableSnippets:!0,enableLiveAutocompletion:!0})},methods:{sendZl:function(){},setJson:function(){},functionClick:function(){this.primary1=3,setTimeout(function(){(n=ace.edit("editor2")).session.setMode("ace/mode/json"),n.setTheme("ace/theme/eclipse"),n.setOptions({enableBasicAutocompletion:!0,enableSnippets:!0,enableLiveAutocompletion:!0})},300)}}},o=(i("/vH7"),i("KHd+")),l=Object(o.a)(s,function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"onlinetest"},[a("div",{staticClass:"onlinetest_top"},[a("div",[a("el-form",{attrs:{model:t.devices,"label-width":"100px",inline:!0,size:"mini"}},[a("el-form-item",{attrs:{label:"请选择设备"}},[a("el-select",{model:{value:t.devices.device,callback:function(e){t.$set(t.devices,"device",e)},expression:"devices.device"}},[a("el-option")],1)],1),t._v(" "),a("el-form-item",[a("el-select",{model:{value:t.devices.device,callback:function(e){t.$set(t.devices,"device",e)},expression:"devices.device"}},[a("el-option")],1)],1)],1)],1),t._v(" "),a("div",{staticClass:"top_content"},[a("span",{staticStyle:{display:"inline-block","font-size":"20px","font-weight":"900"}},[t._v("实时日志")]),t._v(" "),a("span",{staticClass:"status",class:t.status}),t._v(" "),a("span",{staticStyle:{"font-size":"14px",color:"grey"}},[t._v("(未激活)真实设备")]),t._v(" "),a("div",{staticStyle:{float:"right"}},[a("el-switch",{staticStyle:{display:"inline-block","margin-right":"10px"},attrs:{"active-color":"#13ce66","inactive-color":"#ff4949","inactive-text":"自动刷新"},model:{value:t.value4,callback:function(e){t.value4=e},expression:"value4"}}),t._v(" "),a("el-button",{attrs:{type:"primary",size:"medium"}},[t._v("刷新")]),t._v(" "),a("el-button",{attrs:{type:"primary",size:"medium"}},[t._v("清屏")])],1),t._v(" "),a("div",{staticClass:"tableforcontent",staticStyle:{"margin-top":"20px"}},[a("el-table",{staticStyle:{width:"100%"},attrs:{data:t.contentData,height:"250"}},[a("el-table-column",{attrs:{prop:"date",label:"类型 / 时间",width:"300"}}),t._v(" "),a("el-table-column",{attrs:{prop:"name",label:"时间"}})],1)],1)])]),t._v(" "),a("div",{staticClass:"onlinetest_bottom"},[a("el-tabs",{attrs:{type:"border-card"}},[a("el-tab-pane",{attrs:{label:"调试真实设备"}},[a("div",{staticClass:"bottom1_top"},[a("el-button-group",[a("el-button",{attrs:{type:1==t.primary?"primary":"info",size:"mini",plain:""},on:{click:function(e){t.primary=!0}}},[t._v("属性调试")]),t._v(" "),a("el-button",{attrs:{type:0==t.primary?"primary":"info",size:"mini",plain:""},on:{click:function(e){t.primary=!1}}},[t._v("服务调用")])],1),t._v(" "),a("div",[a("div",{staticClass:"editorheader"},[a("el-form",{attrs:{model:t.editor1,inline:!0,"label-width":"80px",size:"mini"}},[a("el-form-item",{attrs:{label:"调试功能"}},[a("el-select",{attrs:{clear:t.clearEditor1},model:{value:t.editor1.function,callback:function(e){t.$set(t.editor1,"function",e)},expression:"editor1.function"}},[a("el-option",{attrs:{label:"11111",value:"2222"}})],1)],1),t._v(" "),1==t.primary?a("div",{staticStyle:{display:"inline-block"}},[a("el-form-item",{attrs:{label:"功能"}},[a("el-select",{model:{value:t.editor1.method,callback:function(e){t.$set(t.editor1,"method",e)},expression:"editor1.method"}},[a("el-option")],1)],1)],1):t._e()],1)],1),t._v(" "),a("div",{staticStyle:{background:"#ffffff"}},[a("label",{attrs:{id:"plug-name"}})]),t._v(" "),a("pre",{staticClass:"ace_editor",staticStyle:{"min-height":"300px"},attrs:{id:"editor1"}},[a("textarea",{staticClass:"ace_text-input"})]),t._v(" "),a("div",[""==t.editor1.function?a("el-tooltip",{staticClass:"item",attrs:{effect:"dark",content:"请选择功能",placement:"top-start"}},[a("span",[a("el-button",{attrs:{type:"info",plain:"",size:"mini",disabled:""==t.editor1.function}},[t._v("发送指令")])],1)]):a("el-button",{attrs:{type:"info",plain:"",size:"mini",disabled:""==t.editor1.function}},[t._v("发送指令")]),t._v(" "),a("el-button",{attrs:{type:"info",plain:"",size:"mini",disabled:""==t.editor1.function}},[t._v("重置")])],1)])],1)]),t._v(" "),a("el-tab-pane",{attrs:{label:"调试虚拟设备"}},[a("div",{staticClass:"editor2header"},[1==t.isactive?a("div",{staticClass:"editor2show animated fadeIn"},[a("el-button-group",[a("el-button",{attrs:{type:1==t.primary1?"primary":"info",size:"mini",plain:""},on:{click:function(e){t.primary1=1}}},[t._v("属性上报")]),t._v(" "),a("el-button",{attrs:{type:2==t.primary1?"primary":"info",size:"mini",plain:""},on:{click:function(e){t.primary1=2}}},[t._v("事件上报")]),t._v(" "),a("el-button",{attrs:{type:3==t.primary1?"primary":"info",size:"mini",plain:""},on:{click:t.functionClick}},[t._v("属性调试")]),t._v(" "),a("el-button",{attrs:{type:4==t.primary1?"primary":"info",size:"mini",plain:""},on:{click:function(e){t.primary1=4}}},[t._v("服务调用")])],1),t._v(" "),a("div",{directives:[{name:"show",rawName:"v-show",value:1==t.primary1,expression:"primary1==1"}],staticClass:"primary1 "},[a("el-form",{attrs:{model:t.primary1form,size:"mini"}},[a("el-form-item",{attrs:{label:"lightStatus"}},[a("el-select",{model:{value:t.primary1form.status,callback:function(e){t.$set(t.primary1form,"status",e)},expression:"primary1form.status"}},[a("el-option",{attrs:{label:"11111",value:"2222"}})],1)],1),t._v(" "),a("div",{staticClass:"primary1content"}),t._v(" "),a("div",{staticClass:"primary1bottom"},[a("el-button",{attrs:{type:"primary",size:"mini"}},[t._v("推送")]),t._v(" "),a("el-button",{attrs:{type:"info",size:"mini",plain:""}},[t._v("策略推送")]),t._v(" "),a("el-button",{attrs:{type:"info",size:"mini",plain:""},on:{click:function(e){t.isactive=!1}}},[t._v("关闭虚拟设备")]),t._v(" "),a("el-button",{attrs:{type:"info",size:"mini",plain:""}},[t._v("查看数据")])],1)],1)],1),t._v(" "),a("div",{directives:[{name:"show",rawName:"v-show",value:2==t.primary1,expression:"primary1==2"}],staticClass:"primary2 animated fadeInUp"},[a("img",{staticStyle:{height:"80px",width:"100px"},attrs:{src:i("lgKv"),alt:""}}),t._v(" "),a("div",{staticStyle:{"margin-top":"20px","font-size":"20px","margin-bottom":"20px",color:"#73777a"}},[t._v("暂无数据")]),t._v(" "),a("div",[a("el-button",{attrs:{type:"primary",size:"small"}},[t._v("编辑物模型")]),t._v(" "),a("el-button",{attrs:{type:"info",size:"small"},on:{click:function(e){t.isactive=!1}}},[t._v("关闭设备")])],1)]),t._v(" "),a("div",{directives:[{name:"show",rawName:"v-show",value:3==t.primary1||4==t.primary1,expression:"primary1==3||primary1==4"}],staticClass:"primary3"},[a("div",{staticClass:"editorheader"},[a("el-form",{attrs:{model:t.editor2,inline:!0,"label-width":"80px",size:"mini"}},[a("el-form-item",{attrs:{label:"调试功能"}},[a("el-select",{model:{value:t.editor2.function,callback:function(e){t.$set(t.editor2,"function",e)},expression:"editor2.function"}},[a("el-option",{attrs:{label:"11111",value:"2222"}})],1)],1),t._v(" "),3==t.primary1?a("div",{staticStyle:{display:"inline-block"}},[a("el-form-item",{attrs:{label:"功能"}},[a("el-select",{model:{value:t.editor2.method,callback:function(e){t.$set(t.editor2,"method",e)},expression:"editor2.method"}},[a("el-option")],1)],1)],1):t._e()],1)],1),t._v(" "),a("div",{staticStyle:{background:"#ffffff"}},[a("label",{attrs:{id:"plug-name"}})]),t._v(" "),a("pre",{staticClass:"ace_editor",staticStyle:{"min-height":"300px"},attrs:{id:"editor2"}},[a("textarea",{staticClass:"ace_text-input"})]),t._v(" "),a("div",[""==t.editor2.function?a("el-tooltip",{staticClass:"item",attrs:{effect:"dark",content:"请选择功能",placement:"top-start"}},[a("span",[a("el-button",{attrs:{type:"info",plain:"",size:"mini",disabled:""==t.editor2.function}},[t._v("发送指令")])],1)]):a("el-button",{attrs:{type:"info",plain:"",size:"mini"}},[t._v("发送指令")]),t._v(" "),a("el-button",{attrs:{type:"info",plain:"",size:"mini"}},[t._v("重置")])],1)])],1):a("div",{staticClass:"editor2hidden animated fadeInDown"},[a("img",{staticStyle:{height:"80px",width:"100px"},attrs:{src:i("lgKv"),alt:""}}),t._v(" "),a("div",{staticStyle:{"margin-top":"20px","font-size":"20px"}},[t._v("调试虚拟设备")]),t._v(" "),a("div",{staticStyle:{"text-align":"center","font-size":"14px",color:"#73777a","margin-top":"8px","margin-bottom":"20px"}},[t._v("虚拟设备可以模拟真实设备在云端建立连接，上报定义的属性及事件处理，"),a("br"),t._v("这样可以不依赖真实设备快速开发应用")]),t._v(" "),a("el-button",{attrs:{type:"primary",size:"mini"},on:{click:function(e){t.isactive=!0}}},[t._v("启动真实设备")])],1)])])],1)],1)])},[],!1,null,"a1113518",null);l.options.__file="onlinetest.vue";e.default=l.exports},lgKv:function(t,e,i){t.exports=i.p+"static/img/logo2.847cc43.png"},v6BD:function(t,e,i){}}]);