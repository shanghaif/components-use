(window.webpackJsonp=window.webpackJsonp||[]).push([["chunk-a5f0"],{U9Yz:function(e,t,a){"use strict";var n=a("h4P4");a.n(n).a},h4P4:function(e,t,a){},xmIs:function(e,t,a){"use strict";a.r(t);var n=a("t3Un");var l={data:function(){return{tableData:[{date:"2016-05-02",name:"王小虎",address:"上海市普陀区金沙江路 1518 弄"},{date:"2016-05-04",name:"王小虎",address:"上海市普陀区金沙江路 1517 弄"},{date:"2016-05-01",name:"王小虎",address:"上海市普陀区金沙江路 1519 弄"},{date:"2016-05-03",name:"王小虎",address:"上海市普陀区金沙江路 1516 弄"}],formInline:{user:"",region:""},start:0,pagesize:10,total:0}},mounted:function(){},methods:{onSubmit:function(){},handleSizeChange:function(e){console.log("每页 "+e+" 条")},handleCurrentChange:function(e){console.log("当前页: "+e)},getZetTag:function(e){(function(e){return Object(n.a)({url:"zeta/etag?"+e,method:"get",params:{}})})(e).then(function(e){}).catch(function(e){console.log(e)})},getZetTagHistroy:function(e){(function(e,t,a){return Object(n.a)({url:"zeta/etag/histroy?"+e,method:"get",params:{limit:t,timesatmp:a}})})(e).then(function(e){}).catch(function(e){console.log(e)})}}},o=(a("U9Yz"),a("KHd+")),i=Object(o.a)(l,function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticClass:"zetadevices"},[a("div",{staticClass:"zetaheader"},[a("el-form",{staticClass:"demo-form-inline",attrs:{inline:!0,model:e.formInline,size:"small"}},[a("el-form-item",{attrs:{label:"审批人"}},[a("el-input",{attrs:{placeholder:"审批人"},model:{value:e.formInline.user,callback:function(t){e.$set(e.formInline,"user",t)},expression:"formInline.user"}})],1),e._v(" "),a("el-form-item",{attrs:{label:"活动区域"}},[a("el-select",{attrs:{placeholder:"活动区域"},model:{value:e.formInline.region,callback:function(t){e.$set(e.formInline,"region",t)},expression:"formInline.region"}},[a("el-option",{attrs:{label:"区域一",value:"shanghai"}}),e._v(" "),a("el-option",{attrs:{label:"区域二",value:"beijing"}})],1)],1),e._v(" "),a("el-form-item",[a("el-button",{attrs:{type:"primary"},on:{click:e.onSubmit}},[e._v("查询")])],1)],1)],1),e._v(" "),a("div",{staticClass:"zetacontent"},[a("el-table",{staticStyle:{width:"100%","text-align":"center"},attrs:{data:e.tableData,border:""}},[a("el-table-column",{attrs:{prop:"date",label:"日期",width:"180",align:"center"}}),e._v(" "),a("el-table-column",{attrs:{prop:"name",label:"姓名",width:"180",align:"center"}}),e._v(" "),a("el-table-column",{attrs:{prop:"address",label:"地址",align:"center"}})],1)],1),e._v(" "),a("div",{staticClass:"block"},[a("el-pagination",{attrs:{"page-sizes":[10,20,30,40],"page-size":e.pagesize,layout:"total, sizes, prev, pager, next, jumper",total:e.total},on:{"size-change":e.handleSizeChange,"current-change":e.handleCurrentChange}})],1)])},[],!1,null,"2391479e",null);i.options.__file="zetadevices.vue";t.default=i.exports}}]);