(window.webpackJsonp=window.webpackJsonp||[]).push([["chunk-c218"],{GqSK:function(e,t,n){"use strict";n.r(t);var a=n("t3Un");function l(e,t){return Object(a.a)({url:"/cluster?action="+e,method:"post",data:{node:t}})}var o={data:function(){return{form:{nodename:""},tableData5:[],node:null,start:1,length:10,total:0,draw:1,search:"",dialogVisible:!1,installtion:[],selsectinstall:[{value:"info",label:"info"},{value:"error",label:"error"},{value:"warning",label:"warning"},{value:"debug",label:"debug"},{value:"mqtt",label:"mqtt"},{value:"kafka",label:"kafka"},{value:"alert",label:"alert"},{value:"critical",label:"critical"},{value:"emergency",label:"emergency"},{value:"notice",label:"notice"}]}},mounted:function(){this.Getinformation()},methods:{Getinformation:function(){var e=this;(this.start,this.lengt,Object(a.a)({url:"/nodes",method:"get",params:{}})).then(function(t){t&&(e.tableData5=t.nodes,e.total=t.nodes.length)})},handleSizeChange:function(e){this.length=e,this.start=1},handleCurrentChange:function(e){this.start=e},join:function(){var e=this;l("join",this.form.nodename).then(function(t){t&&(e.$message({type:"success",message:"加入成功"}),e.dialogVisible=!1,e.Getinformation())}).catch(function(t){e.$message.error(t.error)})},removeNode:function(e){var t=this;l("leave",e.node).then(function(e){e&&(t.$message({type:"success",message:"移除成功"}),t.Getinformation())}).catch(function(e){t.$message.error(e.error)})},install:function(){this.dialogVisible=!0},handleClose:function(){this.dialogVisible=!1}}},s=(n("PeDu"),n("KHd+")),r=Object(s.a)(o,function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticClass:"log"},[n("div",{staticClass:"left"},[n("el-button",{attrs:{type:"primary",icon:"el-icon-circle-plus-outline",size:"small"},on:{click:e.install}},[e._v(e._s(e.$t("node.join")))])],1),e._v(" "),n("el-table",{staticStyle:{width:"100%","margin-top":"20px"},attrs:{data:e.tableData5.slice((e.start-1)*e.length,e.start*e.length),border:""}},[n("el-table-column",{attrs:{label:e.$t("node.nodename"),prop:"name"}}),e._v(" "),n("el-table-column",{attrs:{label:"Erlang/"+e.$t("node.OTPversion"),prop:"otp_release"}}),e._v(" "),n("el-table-column",{scopedSlots:e._u([{key:"header",fn:function(t){return[n("span",[e._v("\n                  "+e._s("Erlang"+e.$t("node.process"))+"\n                ")]),e._v(" "),n("p",[e._v("used/avaliable")])]}},{key:"default",fn:function(t){return[n("span",[e._v(e._s(t.row.process_used+"/"+t.row.process_available))])]}}])}),e._v(" "),n("el-table-column",{attrs:{label:"CPU"},scopedSlots:e._u([{key:"header",fn:function(t){return[n("span",[e._v("\n                  CPU  \n                ")]),e._v(" "),n("p",[e._v("1load/5load/15load")])]}},{key:"default",fn:function(t){return[n("span",[e._v(e._s(t.row.load1+"/"+t.row.load5+"/"+t.row.load15))])]}}])}),e._v(" "),n("el-table-column",{attrs:{label:e.$t("node.memory")},scopedSlots:e._u([{key:"header",fn:function(t){return[n("span",[e._v("\n                  "+e._s(e.$t("node.memory"))+"  \n                ")]),e._v(" "),n("p",[e._v("used/total")])]}},{key:"default",fn:function(t){return[n("span",[e._v(e._s(t.row.memory_used+"/"+t.row.memory_total))])]}}])}),e._v(" "),n("el-table-column",{attrs:{label:e.$t("node.Maximumnumberofhandles"),prop:"max_fds"}}),e._v(" "),n("el-table-column",{attrs:{label:e.$t("node.state"),prop:"node_status"}}),e._v(" "),n("el-table-column",{attrs:{label:e.$t("node.operation")},scopedSlots:e._u([{key:"default",fn:function(t){return[n("el-button",{attrs:{type:"danger",size:"small"},on:{click:function(n){e.removeNode(t.row)}}},[e._v(e._s(e.$t("node.remove")))])]}}])})],1),e._v(" "),n("div",{staticClass:"block",staticStyle:{"margin-top":"30px"}},[n("el-pagination",{attrs:{background:"","page-sizes":[10,25,50,100],"page-size":e.length,layout:"total, sizes, prev, pager, next, jumper",total:e.total},on:{"size-change":e.handleSizeChange,"current-change":e.handleCurrentChange}})],1),e._v(" "),n("el-dialog",{attrs:{title:e.$t("node.joincluster"),visible:e.dialogVisible,width:"30%","before-close":e.handleClose},on:{"update:visible":function(t){e.dialogVisible=t}}},[n("el-form",{attrs:{model:"form"}},[n("el-form-item",{attrs:{label:e.$t("node.nodename")}},[n("el-input",{attrs:{type:"text"},model:{value:e.form.nodename,callback:function(t){e.$set(e.form,"nodename",t)},expression:"form.nodename"}})],1)],1),e._v(" "),n("span",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[n("el-button",{on:{click:function(t){e.dialogVisible=!1}}},[e._v(e._s(e.$t("developer.cancel")))]),e._v(" "),n("el-button",{attrs:{type:"primary"},on:{click:e.join}},[e._v(e._s(e.$t("developer.determine")))])],1)],1)],1)},[],!1,null,"1dfd003e",null);r.options.__file="log.vue";t.default=r.exports},PeDu:function(e,t,n){"use strict";var a=n("hYv0");n.n(a).a},hYv0:function(e,t,n){}}]);