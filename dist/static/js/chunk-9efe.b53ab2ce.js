(window.webpackJsonp=window.webpackJsonp||[]).push([["chunk-9efe"],{XzKc:function(t,e,a){},cJrN:function(t,e,a){"use strict";var n=a("fcCT");a.n(n).a},fcCT:function(t,e,a){},lkoM:function(t,e,a){"use strict";var n=a("XzKc");a.n(n).a},mB15:function(t,e,a){"use strict";a.r(e);var n=a("fe1z"),l={data:function(){return{total:0,length:10,start:0,start1:0,length1:10,total1:0,draw:1,activeName:"first",vcaddr:"",input5:"",input6:"",addr:"",tableData3:[],multipleSelection:[],tableData4:[],multipleSelection1:[],dialogVisible:!1,meterdetail:[]}},mounted:function(){this.devsreport=this.$route.query.devsreport},methods:{handleClose:function(){this.dialogVisible=!1},handleClick:function(t){},handleSelectionChange:function(t){this.multipleSelection=t},handleSizeChange:function(t){this.length=t},handleCurrentChange:function(t){this.start=10*(t-1)},handleSelectionChange1:function(t){this.multipleSelection1=t},handleSizeChange1:function(t){this.length1=t},handleCurrentChange1:function(t){this.start1=10*(t-1)},devsdetail:function(){var t=this;Object(n.n)(this.devsreport,this.start,this.length,++this.draw).then(function(e){1==e.result&&(t.tableData3=e.data,t.total=e.recordsFiltered)}).catch(function(t){console.log(t)})},detail:function(){},ammeterdetail:function(t){},searchformeter:function(){var t=this;Object(n.n)(this.input5,this.start,this.length,++this.draw).then(function(e){1==e.result&&(t.tableData3=e.data,t.total=e.recordsFiltered)}).catch(function(t){console.log(t)})},supplementarycopy:function(t){}}},s=(a("lkoM"),a("cJrN"),a("KHd+")),o=Object(s.a)(l,function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"devsdetail"},[a("el-tabs",{on:{"tab-click":t.handleClick},model:{value:t.activeName,callback:function(e){t.activeName=e},expression:"activeName"}},[a("el-tab-pane",{attrs:{label:"详情",name:"first"}},[a("div",{staticClass:"topsearch"},[a("el-button",{attrs:{plain:""}},[t._v("电表详情")]),t._v(" "),a("el-button",{attrs:{type:"primary"}},[t._v("配置任务")]),t._v(" "),a("el-input",{staticStyle:{"margin-left":"30px",width:"300px"},attrs:{placeholder:"请输入内容"},model:{value:t.input5,callback:function(e){t.input5=e},expression:"input5"}},[a("el-button",{attrs:{slot:"append",icon:"el-icon-search"},on:{click:function(e){t.searchformeter()}},slot:"append"})],1)],1),t._v(" "),a("el-table",{ref:"multipleTable",staticStyle:{width:"100%","margin-top":"30px"},attrs:{data:t.tableData3,"tooltip-effect":"dark"},on:{"selection-change":t.handleSelectionChange}},[a("el-table-column",{attrs:{type:"selection"}}),t._v(" "),a("el-table-column",{attrs:{prop:"deveui",label:"DEVEUI"}}),t._v(" "),a("el-table-column",{attrs:{prop:"appeui",label:"APPEUI"}}),t._v(" "),a("el-table-column",{attrs:{prop:"devaddr",label:"电表地址","show-overflow-tooltip":""}}),t._v(" "),a("el-table-column",{attrs:{prop:"pn",label:"PN值"}}),t._v(" "),a("el-table-column",{attrs:{label:"电表状态"},scopedSlots:t._u([{key:"default",fn:function(e){return[e.row.is_online?a("span",[t._v("运行中")]):t._e(),t._v(" "),e.row.is_online?t._e():a("span",[t._v("未运行")])]}}])}),t._v(" "),a("el-table-column",{attrs:{prop:"vcaddr",label:"集中器"}}),t._v(" "),a("el-table-column",{attrs:{label:"通道类型"},scopedSlots:t._u([{key:"default",fn:function(e){return[1==e.row.usercase?a("span",[t._v("载波通道")]):t._e(),t._v(" "),1!=e.row.usercase?a("span",[t._v("虚拟通道")]):t._e()]}}])}),t._v(" "),a("el-table-column",{attrs:{prop:"",label:"操作"},scopedSlots:t._u([{key:"default",fn:function(e){return[a("el-button",{attrs:{size:"mini"},on:{click:function(a){t.ammeterdetail(e.row.devaddr)}}},[t._v("\n                        电表详情\n                    ")])]}}])})],1),t._v(" "),a("div",{staticClass:"block"},[a("el-pagination",{staticStyle:{"margin-top":"30px"},attrs:{background:"","page-sizes":[10,25,50,100],"page-size":t.length,layout:"total, sizes, prev, pager, next, jumper",total:t.total},on:{"size-change":t.handleSizeChange,"current-change":t.handleCurrentChange}})],1)],1),t._v(" "),a("el-tab-pane",{attrs:{label:"实时任务",name:"second"}},[a("div",{staticClass:"secondsearch"},[a("el-button",{attrs:{type:"primary"}},[t._v("配置任务")]),t._v(" "),a("el-button",{attrs:{type:"primary"}},[t._v("立即补抄")]),t._v(" "),a("el-input",{staticStyle:{"margin-left":"30px",width:"300px"},attrs:{placeholder:"请输入内容"},model:{value:t.input6,callback:function(e){t.input6=e},expression:"input6"}},[a("el-button",{attrs:{slot:"append",icon:"el-icon-search"},slot:"append"})],1)],1),t._v(" "),a("el-table",{ref:"multipleTable1",staticStyle:{width:"100%","margin-top":"30px"},attrs:{data:t.tableData4,"tooltip-effect":"dark"},on:{"selection-change":t.handleSelectionChange1}},[a("el-table-column",{attrs:{type:"selection"}}),t._v(" "),a("el-table-column",{attrs:{prop:"cbname",label:"任务模板名称"}}),t._v(" "),a("el-table-column",{attrs:{prop:"date",label:"冻结日期"}}),t._v(" "),a("el-table-column",{attrs:{label:"预抄表数"},scopedSlots:t._u([{key:"default",fn:function(e){return[a("span",[t._v(t._s(e.row.success+e.row.fail))])]}}])}),t._v(" "),a("el-table-column",{attrs:{prop:"success",label:"成功数"}}),t._v(" "),a("el-table-column",{attrs:{prop:"fail",label:"失败数"}}),t._v(" "),a("el-table-column",{attrs:{label:"成功率"},scopedSlots:t._u([{key:"default",fn:function(e){return[a("span",[t._v(t._s(((e.row.success+e.row.retry)/(e.row.success+e.row.fail)).toFixed(2)+"%"))])]}}])}),t._v(" "),a("el-table-column",{attrs:{label:"操作"},scopedSlots:t._u([{key:"default",fn:function(e){return[a("el-button",{attrs:{size:"mini"},on:{click:function(a){t.supplementarycopy(e.$index)}}},[t._v("\n                    立即补抄\n                    ")])]}}])})],1),t._v(" "),a("div",{staticClass:"block"},[a("el-pagination",{staticStyle:{"margin-top":"30px"},attrs:{background:"","page-sizes":[10,25,50,100],"page-size":t.length1,layout:"total, sizes, prev, pager, next, jumper",total:t.total1},on:{"size-change":t.handleSizeChange1,"current-change":t.handleCurrentChange1}})],1)],1)],1),t._v(" "),a("el-dialog",{attrs:{title:"电表详情",visible:t.dialogVisible,width:"30%","before-close":t.handleClose},on:{"update:visible":function(e){t.dialogVisible=e}}},[t._l(t.meterdetail,function(e,n){return a("div",{key:n},[a("p",[a("span",[t._v("集中器地址：")]),a("span",[t._v(t._s(e.vcaddr))])]),t._v(" "),a("p",[a("span",[t._v("信息点标识PN：")]),a("span",[t._v(t._s(e.pn))])]),t._v(" "),a("p",[a("span",[t._v("电表地址：")]),a("span",[t._v(t._s(e.addr))])]),t._v(" "),a("p",[a("span",[t._v("用户编号：")]),a("span",[t._v(t._s(e.jldbh))])]),t._v(" "),a("p",[a("span",[t._v("用户地址：")]),a("span",[t._v(t._s(e.jlddz))])]),t._v(" "),a("p",[a("span",[t._v("用户类别：")]),a("span",[t._v(t._s(e.yhlb))])]),t._v(" "),a("p",[a("span",[t._v("供电单位：")]),a("span",[t._v(t._s(e.gddw))])]),t._v(" "),a("p",[a("span",[t._v("出厂编号：")]),a("span",[t._v(t._s(e.ccbh))])]),t._v(" "),a("p",[a("span",[t._v("生产厂商：")]),a("span",[t._v(t._s(e.sccj))])]),t._v(" "),a("p",[a("span",[t._v("设备类型：")]),a("span",[t._v(t._s(e.sblx))])]),t._v(" "),a("p",[a("span",[t._v("通信规约：")]),a("span",[t._v(t._s(e.txgy))])]),t._v(" "),a("p",[a("span",[t._v("台区：")]),a("span",[t._v(t._s(e.tq))])]),t._v(" "),a("p",[a("span",[t._v("地理位置：")]),a("span",[t._v(t._s(e.province+e.city))])])])}),t._v(" "),a("span",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[a("el-button",{staticStyle:{float:"left"},on:{click:function(e){t.dialogVisible=!1}}},[t._v("关 闭")])],1)],2)],1)},[],!1,null,"491e9441",null);o.options.__file="devsdetail.vue";e.default=o.exports}}]);