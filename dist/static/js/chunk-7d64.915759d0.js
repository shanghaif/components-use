(window.webpackJsonp=window.webpackJsonp||[]).push([["chunk-7d64"],{C5Di:function(e,t,a){"use strict";var r=a("y/Tx");a.n(r).a},RQDV:function(e,t,a){},bUhs:function(e,t,a){"use strict";a.r(t);var r=a("v0iw"),n=a.n(r),l=a("fe1z"),s=(Math.floor(128*Math.random()+1),{data:function(){return{taskform:{name:""},tableData:[],multipleSelection:[],start:0,pagesize:10,total:0,dialogFormVisible:!1,channel:[{label:"LTE通道",value:1},{label:"GPRS/CMDA通道",value:2},{label:"LoRa通道",value:3},{label:"微功率通道",value:4},{label:"RS232/RS485通道",value:5},{label:"红外通道",value:6},{label:"NB-IOT通道",value:7},{label:"载波通道",value:8},{label:"Zeta通道",value:9},{label:"ZigBee通道",value:10},{label:"光纤通道",value:11},{label:"网络连接",value:12},{label:"5G通道",value:13},{label:"WIFI通道",value:14},{label:"RS422通道",value:15},{label:"NFC通道",value:16},{label:"Bluetooth通道",value:17}],form:{name:"",type:"",attributes:"",unit:"",starttime:"",freq:"",strategy:"",downchannel:[{type:"",interval:"",unit:"seconds"}]},formrules:{name:[{required:!0,message:"请输入任务名称",trigger:"blur"}],type:[{required:!0,message:"请选择任务类型",trigger:"change"}],attributes:[{required:!0,message:"请选择任务属性",trigger:"change"}],strategy:[{required:!0,message:"请选择上报策略",trigger:"change"}],upchannel:[{required:!0,message:"请选择上报通道",trigger:"change"}]},pickerOptionsStart:{disabledDate:function(e){return e.getTime()<Date.now()-864e5}},crondid:""}},mounted:function(){this.getCrondTask(1)},methods:{getCrondTask:function(e){var t=this;0==e&&(this.start=0),this.tableData=[];var a=n.a.Object.extend("Crond"),r=new n.a.Query(a);r.notEqualTo("type",4),""!=this.taskform.name&&r.equalTo("name",this.taskform.name),r.ascending("-updatedAt"),r.skip(this.start),r.limit(this.pagesize),r.count().then(function(e){t.total=e,r.find().then(function(e){e.map(function(e){var a={},r=[];a.id=e.id,a.ts=Object(l.q)(e.attributes.createdAt),a.name=e.attributes.name,1==e.attributes.type?a.type="临时任务":2==e.attributes.type&&(a.type="即时任务"),1==e.attributes.args.attr?a.attr="当前数据":2==e.attributes.args.attr?a.attr="历史日数据":3==e.attributes.args.attr?a.attr="历史日数据":4==e.attributes.args.attr&&(a.attr="远程控制"),e.attributes.args.upchannel.map(function(e){var t="";t=1==e?"主站":2==e?"postgres":"tdengine",r.push(t)}),a.upchannel=r,a.active=e.attributes.active,t.tableData.push(a)})})},function(e){"209"==e.code?(t.$message({type:"warning",message:"登陆权限过期，请重新登录"}),t.$router.push({path:"/login"})):119==e.code?t.$message({type:"error",message:"没有操作权限"}):t.$message.error(e.message)})},handleSizeChange:function(e){this.pagesize=e,this.getCrondTask(1)},handleCurrentChange:function(e){this.start=(e-1)*this.pagesize,this.getCrondTask(1)},testdata:function(){this.form.starttime<Date.now()-2e3&&(this.$message.warning("开始执行时间要大于当前时间"),this.form.starttime="")},removeDomain:function(e){var t=this.form.downchannel.indexOf(e);-1!==t&&this.form.downchannel.splice(t,1)},addDomain:function(){this.form.downchannel.push({type:"",interval:"",unit:"seconds"})},submitForm:function(e){var t=this;this.$refs[e].validate(function(a){if(!a)return console.log("error submit!!"),!1;var r=n.a.Object.extend("Crond"),l=new r;new n.a.Query(r);""!=t.crondid&&(l.id=t.crondid);var s=[];t.form.downchannel.map(function(e){s.push([e.type,e.interval])}),l.set("task",{res:t.form.upchannel,chs:s}),l.set("name",t.form.name),l.set("visible",1),l.set("crond",{freq:2,unit:1,end_time:1601395200,start_time:1571152234}),l.set("type",t.form.type),l.set("args",{upchannel:t.form.upchannel,downchannel:t.form.downchannel,attr:t.form.attributes,strategy:t.form.strategy}),l.set("active",1),1==t.form.type?(l.set("typedesc","临时任务"),l.set("tid",301)):2==t.form.type&&(l.set("typedesc","即时任务"),l.set("tid",302)),""==t.crondid?l.save().then(function(a){a&&(t.$message.success("添加成功"),t.$refs[e].resetFields(),t.form={name:"",type:"",attributes:"",unit:"",starttime:"",freq:"",strategy:"",downchannel:[{type:"",interval:"",unit:"seconds"}]},t.dialogFormVisible=!1,t.crondid="",t.getCrondTask(1))}):l.save().then(function(a){a&&(t.$message.success("编辑成功"),t.$refs[e].resetFields(),t.form={name:"",type:"",attributes:"",unit:"",starttime:"",freq:"",strategy:"",downchannel:[{type:"",interval:"",unit:"seconds"}]},Math.floor(128*Math.random()+1),t.dialogFormVisible=!1,t.crondid="",t.getCrondTask(1))})})},editorCrond:function(e){var t=this;this.crondid=e;var a=n.a.Object.extend("Crond");new n.a.Query(a).get(e).then(function(e){t.dialogFormVisible=!0,t.form.upchannel=e.attributes.args.upchannel,t.form.downchannel=e.attributes.args.downchannel,t.form.attributes=e.attributes.args.attr,t.form.strategy=e.attributes.args.strategy,t.form.name=e.attributes.name,t.form.type=e.attributes.type,e.attributes.tid,console.log(e)},function(e){"209"==e.code?(t.$message({type:"warning",message:"登陆权限过期，请重新登录"}),t.$router.push({path:"/login"})):119==e.code?t.$message({type:"error",message:"没有操作权限"}):t.$message.error(e.message)})},makeSure:function(e){var t=this,a=new(n.a.Object.extend("Crond"));a.id=e.row.id,a.destroy().then(function(a){a&&(t.$message({type:"success",message:"删除成功"}),e._self.$refs["popover-"+e.$index].doClose(),t.getCrondTask(1))},function(e){"209"==e.code?(t.$message({type:"warning",message:"登陆权限过期，请重新登录"}),t.$router.push({path:"/login"})):119==e.code?t.$message({type:"error",message:"没有操作权限"}):t.$message.error(e.message)})}}}),o=(a("C5Di"),a("n/AK"),a("KHd+")),i=Object(o.a)(s,function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticClass:"tasklistmanage"},[a("div",{staticClass:"taskheader"},[a("h4",[e._v("任务资源分配")]),e._v(" "),a("div",{staticClass:"taskform"},[a("el-form",{staticClass:"demo-form-inline",attrs:{inline:!0,model:e.taskform}},[a("el-form-item",[a("el-input",{attrs:{placeholder:"任务名称"},model:{value:e.taskform.name,callback:function(t){e.$set(e.taskform,"name",t)},expression:"taskform.name"}})],1),e._v(" "),a("el-form-item",[a("el-button",{attrs:{type:"primary",icon:"el-icon-search"},on:{click:function(t){e.getCrondTask(0)}}},[e._v("查 询")])],1),e._v(" "),a("el-form-item",[a("el-button",{attrs:{type:"primary",icon:"el-icon-plus"},on:{click:function(t){e.dialogFormVisible=!0}}},[e._v("新建任务")])],1)],1)],1)]),e._v(" "),a("div",{staticClass:"tasktable"},[a("el-table",{ref:"multipleTable",staticStyle:{width:"100%"},attrs:{data:e.tableData,"tooltip-effect":"dark"}},[a("el-table-column",{attrs:{label:"任务名称"},scopedSlots:e._u([{key:"default",fn:function(t){return[e._v(e._s(t.row.name))]}}])}),e._v(" "),a("el-table-column",{attrs:{prop:"type",label:"任务类型"}}),e._v(" "),a("el-table-column",{attrs:{prop:"attr",label:"任务属性"}}),e._v(" "),a("el-table-column",{attrs:{label:"上报通道"},scopedSlots:e._u([{key:"default",fn:function(t){return[a("span",[e._v(e._s(t.row.upchannel.join("、")))])]}}])}),e._v(" "),a("el-table-column",{attrs:{prop:"ts",label:"开始执行时间"}}),e._v(" "),a("el-table-column",{attrs:{label:"任务状态"},scopedSlots:e._u([{key:"default",fn:function(t){return[1==t.row.active?a("span",{staticStyle:{color:"green"}},[e._v("已激活")]):a("span",{staticStyle:{color:"red"}},[e._v("未激活")])]}}])}),e._v(" "),a("el-table-column",{attrs:{prop:"address",label:"操作",width:"180"},scopedSlots:e._u([{key:"default",fn:function(t){return[a("el-button",{attrs:{type:"primary",size:"mini"},on:{click:function(a){e.editorCrond(t.row.id)}}},[e._v("编 辑")]),e._v(" "),a("el-popover",{ref:"popover-"+t.$index,attrs:{placement:"top",width:"300"}},[a("p",[e._v("确定删除"+e._s(t.row.name)+"这个任务吗？")]),e._v(" "),a("div",{staticStyle:{"text-align":"right",margin:"0"}},[a("el-button",{attrs:{size:"mini"},on:{click:function(e){t._self.$refs["popover-"+t.$index].doClose()}}},[e._v("取消")]),e._v(" "),a("el-button",{attrs:{type:"primary",size:"mini"},on:{click:function(a){e.makeSure(t)}}},[e._v("确定")])],1),e._v(" "),a("el-button",{attrs:{slot:"reference",type:"danger",size:"mini"},slot:"reference"},[e._v("删 除")])],1)]}}])})],1)],1),e._v(" "),a("div",{staticClass:"taskpage"},[a("el-pagination",{attrs:{background:"","page-sizes":[10,20,30,50],"page-size":e.pagesize,layout:"total, sizes, prev, pager, next, jumper",total:e.total},on:{"size-change":e.handleSizeChange,"current-change":e.handleCurrentChange}})],1),e._v(" "),a("div",{staticClass:"dialog"},[a("el-dialog",{attrs:{title:"任务配置",visible:e.dialogFormVisible,width:"40%"},on:{"update:visible":function(t){e.dialogFormVisible=t}}},[a("el-form",{ref:"form",attrs:{model:e.form,"label-width":"120px",rules:e.formrules}},[a("el-form-item",{attrs:{label:"任务名称",prop:"name"}},[a("el-input",{attrs:{autocomplete:"off"},model:{value:e.form.name,callback:function(t){e.$set(e.form,"name",t)},expression:"form.name"}})],1),e._v(" "),a("el-form-item",{attrs:{label:"任务类型",prop:"type"}},[a("el-select",{attrs:{placeholder:"请选择任务类型"},model:{value:e.form.type,callback:function(t){e.$set(e.form,"type",t)},expression:"form.type"}},[a("el-option",{attrs:{label:"临时任务",value:1}}),e._v(" "),a("el-option",{attrs:{label:"即时任务",value:2}})],1)],1),e._v(" "),a("el-form-item",{attrs:{label:"任务属性",prop:"attributes"}},[a("el-select",{attrs:{placeholder:"请选择任务属性"},model:{value:e.form.attributes,callback:function(t){e.$set(e.form,"attributes",t)},expression:"form.attributes"}},[a("el-option",{attrs:{label:"当前数据",value:1}}),e._v(" "),a("el-option",{attrs:{label:"历史日数据",value:2}}),e._v(" "),a("el-option",{attrs:{label:"历史月数据",value:3}}),e._v(" "),a("el-option",{attrs:{label:"远程控制",value:4}})],1)],1),e._v(" "),a("el-form-item",{attrs:{label:"上报通道",prop:"upchannel"}},[a("el-select",{attrs:{placeholder:"上报通道",multiple:""},model:{value:e.form.upchannel,callback:function(t){e.$set(e.form,"upchannel",t)},expression:"form.upchannel"}},[a("el-option",{attrs:{label:"主站",value:1}}),e._v(" "),a("el-option",{attrs:{label:"postgres",value:2}}),e._v(" "),a("el-option",{attrs:{label:"tdengine",value:3}})],1)],1),e._v(" "),a("el-form-item",{staticClass:"lineone",attrs:{label:"采集策略","label-width":"100px"}},e._l(e.form.downchannel,function(t,r){return a("div",{key:r,staticClass:"flexg"},[a("el-form-item",{staticClass:"elformcontent",attrs:{label:"采集轮次"+(r+1),"label-width":"100px",prop:"downchannel."+r+".type",rules:[{required:!0,message:"选择通道类型",trigger:"change"}]}},[a("el-select",{attrs:{placeholder:"请选择通道类型"},model:{value:t.type,callback:function(a){e.$set(t,"type",a)},expression:"item.type"}},e._l(e.channel,function(e){return a("el-option",{key:e.value,attrs:{label:e.label,value:e.value}})}))],1),e._v(" "),a("el-form-item",{attrs:{prop:"downchannel."+r+".interval",rules:[{required:!0,message:"输入时长",type:"number"}]}},[a("el-input",{attrs:{type:"number",min:1,placeholder:"本轮时长"},model:{value:t.interval,callback:function(a){e.$set(t,"interval",e._n(a))},expression:"item.interval"}})],1),e._v(" "),a("el-form-item",[a("el-select",{attrs:{placeholder:"选择单位"},model:{value:t.unit,callback:function(a){e.$set(t,"unit",a)},expression:"item.unit"}},[a("el-option",{attrs:{label:"时",value:"hours"}}),e._v(" "),a("el-option",{attrs:{label:"分",value:"minutes"}}),e._v(" "),a("el-option",{attrs:{label:"秒",value:"seconds"}})],1)],1),e._v(" "),a("el-form-item",[a("el-link",{attrs:{type:"primary",underline:!1,icon:"el-icon-minus"},on:{click:function(a){a.preventDefault(),e.removeDomain(t)}}},[e._v("删除")])],1)],1)})),e._v(" "),a("div",{staticStyle:{width:"100%","margin-left":"50px"}},[a("el-link",{attrs:{icon:"el-icon-plus",type:"primary",underline:!1},on:{click:e.addDomain}},[e._v("添加采集策略")])],1),e._v(" "),a("el-form-item",{attrs:{label:"上报策略",prop:"strategy"}},[a("el-select",{attrs:{placeholder:"上报策略"},model:{value:e.form.strategy,callback:function(t){e.$set(e.form,"strategy",t)},expression:"form.strategy"}},[a("el-option",{attrs:{label:"逐条上报",value:1}}),e._v(" "),a("el-option",{attrs:{label:"统一上报",value:2}})],1)],1)],1),e._v(" "),a("div",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[a("el-button",{on:{click:function(t){e.dialogFormVisible=!1}}},[e._v("取 消")]),e._v(" "),a("el-button",{attrs:{type:"primary"},on:{click:function(t){e.submitForm("form")}}},[e._v("确 定")])],1)],1)],1)])},[],!1,null,"5adc58ae",null);i.options.__file="tasklistmanage.vue";t.default=i.exports},"n/AK":function(e,t,a){"use strict";var r=a("RQDV");a.n(r).a},"y/Tx":function(e,t,a){}}]);