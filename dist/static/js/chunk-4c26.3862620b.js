(window.webpackJsonp=window.webpackJsonp||[]).push([["chunk-4c26"],{Jedr:function(t,e,a){"use strict";a.d(e,"d",function(){return n}),a.d(e,"e",function(){return i}),a.d(e,"f",function(){return s}),a.d(e,"c",function(){return r}),a.d(e,"b",function(){return o}),a.d(e,"a",function(){return c}),a.d(e,"i",function(){return u}),a.d(e,"j",function(){return d}),a.d(e,"g",function(){return h}),a.d(e,"h",function(){return v});var l=a("t3Un");function n(t,e,a,n,i){return Object(l.a)({url:"/shuwa_task/historyVcaddr",method:"get",params:{node:null,start:t,length:e,di:a,datetime:n,"search[value]":i}})}function i(){return Object(l.a)({url:"/shuwa_task/diList",method:"get"})}function s(t,e,a,n){return Object(l.a)({url:"shuwa_task/historyMeter",method:"get",params:{node:t,di:e,datetime:a,vcaddr:n}})}function r(){return Object(l.a)({url:"/shuwa_task/diList",method:"get",data:{}})}function o(t,e,a,n){return Object(l.a)({url:"/shuwa_task/task",method:"get",params:{start:t,length:e,draw:a,"search[value]":n}})}function c(t,e,a,n,i,s,r){return Object(l.a)({url:"/shuwa_task/task",method:"post",data:{name:t,frozendate:e,downchannel:a,starttime:n,meter:i,freq:s,unit:r}})}function u(t,e,a,n,i,s){return Object(l.a)({url:"/shuwa_task/vcaddr",method:"get",params:{node:t,start:e,length:a,draw:n,id:i,"search[value]":s}})}function d(t,e,a){return Object(l.a)({url:"shuwa_task/meter",method:"post",data:{dis:t,vcaddr:e,id:a}})}function h(t){return Object(l.a)({url:"/shuwa_task/task",method:"DELETE",data:{id:t}})}function v(t){return Object(l.a)({url:"/shuwa_task/readMeter",method:"post",data:{data:t}})}},KXyQ:function(t,e,a){},W6Fz:function(t,e,a){"use strict";a.r(e);var l=a("Jedr"),n=a("fe1z"),i=(a("lTfz"),{data:function(){return{node:null,total:0,start:0,length:10,draw:1,tableData3:[],multipleSelection:[],data:function(t){var e=[];return Object(l.c)().then(function(t){t.data.map(function(t){e.push({key:t.di,label:t.di+"--"+t.name})})}),e}(),diselect:[],dialogVisible:!1,valueforsearch:"",options:[{value:"vcaddr",label:"集中器"},{value:"meter",label:"电表"}],date:[{value:"day",label:"日"},{value:"month",label:"月"},{value:"hour",label:"时"},{value:"minute",label:"分"}],spacing:[],sendup:[{value:"0",label:"物理通道"},{value:"1",label:"虚拟通道"}],senddown:[{value:"0",label:"物理通道"},{value:"1",label:"虚拟通道"}],name:"",frozendate:"",downchannel:"1",starttime:"",meteraddress:"all",freq:"",unit:"",ftype:"vcaddr",today:"today",idselete:[],loading:!0}},mounted:function(){this.search()},methods:{handleClose:function(){this.dialogVisible=!1},search:function(){var t=this;this.loading=!0,Object(l.b)(this.start,this.length,this.node,this.draw++,this.valueforsearch).then(function(e){e&&(e.data.map(function(t){1==t.downchannel?t.downchannel="虚拟通道":t.downchannel="物理通道",1==t.upchannel?t.upchannel="虚拟通道":t.upchannel="物理通道",t.datetime=Object(n.t)(t.datetime),"month"==t.unit?t.unit="1月":t.unit="1日","day"==t.freq_unit&&(t.freq+="日")}),t.tableData3=e.data.reverse(),t.total=e.recordsTotal,t.loading=!1)})},selectchange:function(){"month"==this.unit||"day"==this.unit?this.spacing=[{value:"1",label:"1"}]:"hour"==this.unit?this.spacing=[{value:"1",label:"1"},{value:"2",label:"2"},{value:"3",label:"3"},{value:"4",label:"4"},{value:"6",label:"6"},{value:"8",label:"8"},{value:"12",label:"12"}]:this.spacing=[{value:"10",label:"10"},{value:"20",label:"20"},{value:"30",label:"30"}]},handleSelectionChange:function(t){this.idselete=[],this.multipleSelection=t},handleSizeChange:function(t){this.length=t,this.search()},handleCurrentChange:function(t){this.start=(t-1)*this.length,this.search()},Meterdetail:function(t){this.$router.push({path:"/tasksmanage/schedule",query:{id:t}})},convartion:function(){var t=this,e=[],a=this.meteraddress.split(",");"vcaddr"==this.ftype?a.map(function(a){e.push({vcaddr:a,dis:t.diselect})}):"all"==this.meteraddress?e.push({vcaddr:"all",dis:this.diselect}):e.push({vcaddr:"all",addr:JSON.parse(a),dis:this.diselect}),""==this.frozendate?this.frozendate=null:this.frozendate=Object(n.u)(this.frozendate+" 00:00:00"),Object(l.a)(this.name,this.frozendate,Number(this.downchannel),Object(n.u)(this.starttime),e,Number(this.freq),this.unit).then(function(e){e&&(t.$message({message:"添加成功",type:"success"}),t.dialogVisible=!1,t.search())}).catch(function(e){t.$message({message:e.error,type:"error"})})},getfrozen:function(){console.log(1111)},selectTime:function(t){"other"==t&&this.getfrozen()},searchvalue:function(){var t=this;Object(l.b)(this.start,this.length,this.node,this.draw++,this.valueforsearch).then(function(e){e&&(e.data.map(function(t){1==t.downchannel?t.downchannel="虚拟通道":t.downchannel="物理通道",1==t.upchannel?t.upchannel="虚拟通道":t.upchannel="物理通道",t.datetime=Object(n.t)(t.datetime),"month"==t.unit?t.unit="1月":t.unit="1日"}),t.tableData3=e.data,t.total=e.recordsTotal)}).catch(function(t){console.log(t)})},deletetask:function(){var t=this;this.multipleSelection.map(function(e){t.idselete.push(e.id)}),Object(l.g)(this.idselete).then(function(e){e&&(t.$message({message:"删除成功",type:"success"}),t.search())}).catch(function(t){console.log(t)})}}}),s=(a("d4NW"),a("bPS7"),a("KHd+")),r=Object(s.a)(i,function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"tasklist"},[a("div",{staticClass:"top"},[a("div",{staticClass:"left"},[a("el-button",{attrs:{type:"primary"},on:{click:function(e){t.dialogVisible=!0}}},[t._v("配置任务")]),t._v(" "),a("el-button",{staticStyle:{"margin-left":"30px"},attrs:{type:"primary"},on:{click:t.deletetask}},[t._v("删 除")])],1),t._v(" "),a("div",{staticClass:"right"},[a("el-input",{staticStyle:{width:"200px","margin-left":"30px"},attrs:{type:"text",placeholder:"请输入任务名称"},model:{value:t.valueforsearch,callback:function(e){t.valueforsearch=e},expression:"valueforsearch"}}),t._v(" "),a("el-button",{attrs:{type:"primary"},on:{click:t.searchvalue}},[t._v("搜 索")])],1)]),t._v(" "),a("div",{staticClass:"center"},[a("el-table",{directives:[{name:"loading",rawName:"v-loading",value:t.loading,expression:"loading"}],ref:"multipleTable",staticStyle:{width:"100%"},attrs:{data:t.tableData3,"tooltip-effect":"dark"},on:{"selection-change":t.handleSelectionChange}},[a("el-table-column",{attrs:{type:"selection",width:"55"}}),t._v(" "),a("el-table-column",{attrs:{label:"任务名称",prop:"name"}}),t._v(" "),a("el-table-column",{attrs:{prop:"datetime",label:"采集开始时间"}}),t._v(" "),a("el-table-column",{attrs:{label:"数据项名称"},scopedSlots:t._u([{key:"default",fn:function(e){return[a("span",[t._v(t._s(e.row.di.join(",")))])]}}])}),t._v(" "),a("el-table-column",{attrs:{prop:"unit",label:"周期单位"}}),t._v(" "),a("el-table-column",{attrs:{prop:"downchannel",label:"下发通道"}}),t._v(" "),a("el-table-column",{attrs:{prop:"upchannel",label:"上传通道"}}),t._v(" "),a("el-table-column",{attrs:{label:"操作"},scopedSlots:t._u([{key:"default",fn:function(e){return[a("el-button",{attrs:{size:"mini",type:"primary"},on:{click:function(a){t.Meterdetail(e.row.id)}}},[t._v("详情")])]}}])})],1),t._v(" "),a("el-pagination",{staticStyle:{"margin-top":"30px"},attrs:{background:"","page-sizes":[10,25,50,100],"page-size":t.length,layout:"total, sizes, prev, pager, next, jumper",total:t.total},on:{"size-change":t.handleSizeChange,"current-change":t.handleCurrentChange}})],1),t._v(" "),a("el-dialog",{attrs:{title:"配置任务",visible:t.dialogVisible,width:"50%","before-close":t.handleClose},on:{"update:visible":function(e){t.dialogVisible=e}}},[a("div",{staticClass:"dialog",staticStyle:{height:"300px"}},[a("div",{staticClass:"children"},[a("label",{attrs:{for:""}},[t._v("任务名称：")]),t._v(" "),a("el-input",{staticStyle:{width:"200px"},attrs:{type:"text"},model:{value:t.name,callback:function(e){t.name=e},expression:"name"}})],1),t._v(" "),a("div",{staticClass:"children"},[a("label",{attrs:{for:""}},[t._v("采集开始时间：")]),t._v(" "),a("el-date-picker",{attrs:{type:"datetime",placeholder:"选择日期时间"},on:{change:t.testdata},model:{value:t.starttime,callback:function(e){t.starttime=e},expression:"starttime"}})],1),t._v(" "),a("div",{staticClass:"children"},[a("label",{attrs:{for:""}},[t._v("终端类型：")]),t._v(" "),a("el-select",{attrs:{placeholder:"请选择"},model:{value:t.ftype,callback:function(e){t.ftype=e},expression:"ftype"}},t._l(t.options,function(t){return a("el-option",{key:t.value,attrs:{label:t.label,value:t.value}})}))],1),t._v(" "),a("div",{staticClass:"children"},[a("label",{attrs:{for:""}},[t._v("终端逻辑地址：")]),t._v(" "),a("el-input",{staticStyle:{width:"200px"},attrs:{type:"text",placeholder:"A终端逻辑地址,B终端逻辑地址"},model:{value:t.meteraddress,callback:function(e){t.meteraddress=e},expression:"meteraddress"}}),t._v(" "),a("p",{staticStyle:{color:"black",margin:"5px 0 0 100px"}},[t._v("(all代表全部)(注意:逗号为英文逗号)")])],1),t._v(" "),a("div",{staticClass:"children"},[a("label",{attrs:{for:""}},[t._v("冻结日期：")]),t._v(" "),a("el-date-picker",{attrs:{type:"date",placeholder:"当天","value-format":"yyyy-MM-dd"},model:{value:t.frozendate,callback:function(e){t.frozendate=e},expression:"frozendate"}})],1),t._v(" "),a("div",{staticClass:"starttime"},[a("label",{attrs:{for:""}},[t._v("采样间隔时间：")]),t._v(" "),a("el-select",{attrs:{placeholder:"请选择"},on:{change:t.selectchange},model:{value:t.unit,callback:function(e){t.unit=e},expression:"unit"}},t._l(t.date,function(t){return a("el-option",{key:t.value,attrs:{label:t.label,value:t.value}})})),t._v(" "),a("el-select",{attrs:{placeholder:"请选择"},model:{value:t.freq,callback:function(e){t.freq=e},expression:"freq"}},t._l(t.spacing,function(t){return a("el-option",{key:t.value,attrs:{label:t.label,value:t.value}})}))],1),t._v(" "),a("div",{staticClass:"children"},[a("label",{attrs:{for:""}},[t._v("下发通道：")]),t._v(" "),a("el-select",{attrs:{placeholder:"请选择"},model:{value:t.downchannel,callback:function(e){t.downchannel=e},expression:"downchannel"}},t._l(t.senddown,function(t){return a("el-option",{key:t.value,attrs:{label:t.label,value:t.value}})}))],1)]),t._v(" "),a("div",{staticClass:"di",staticStyle:{width:"100%"}},[a("label",{attrs:{for:""}},[t._v("数据项标识：")]),t._v(" "),a("el-transfer",{attrs:{data:t.data,titles:["数据项标识","数据项标识"],"button-texts":["删除","添加"]},model:{value:t.diselect,callback:function(e){t.diselect=e},expression:"diselect"}})],1),t._v(" "),a("span",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[a("el-button",{staticStyle:{float:"left"},on:{click:function(e){t.dialogVisible=!1}}},[t._v("关 闭")]),t._v(" "),a("el-button",{staticStyle:{float:"right"},attrs:{type:"primary"},on:{click:t.convartion}},[t._v("保 存")])],1)])],1)},[],!1,null,"30a3672a",null);r.options.__file="tasklist.vue";e.default=r.exports},bPS7:function(t,e,a){"use strict";var l=a("e6wq");a.n(l).a},d4NW:function(t,e,a){"use strict";var l=a("KXyQ");a.n(l).a},e6wq:function(t,e,a){}}]);