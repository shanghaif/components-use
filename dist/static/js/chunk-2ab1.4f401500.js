(window.webpackJsonp=window.webpackJsonp||[]).push([["chunk-2ab1"],{"8UWz":function(e,t,a){},AnLJ:function(e,t,a){"use strict";var r=a("8UWz");a.n(r).a},FcSC:function(e,t,a){"use strict";a.r(t);var r=a("OJhq"),l=a("v0iw"),n=a.n(l),s={data:function(){return{formLabelWidth:"120px",dialogFormVisible:!1,form:{name:"",region:"",hardwareType:"",nameEncrypt:"",needReply:"",enable:"",remark:"",objectId:""},activeName:"first",zlForm:{hardware_number:"",region:"",hardwareType:"",nameEncrypt:"",needReply:"",status:"",starttime:new Date((new Date).setHours(0,0,0,0)-7776e6),endtime:new Date,display:9},sukeForm:{name:"",region:"",hardwareType:"",enable:9,needReply:9},rules:{name:[{required:!0,message:"请输入指令名称",trigger:"blur"},{min:1,max:30,message:"长度在 1到 30 个字符",trigger:"blur"}],hardwareType:[{required:!0,message:"请选择设备类型",trigger:"change"}],needReply:[{required:!0,message:"请选择指令回复类型",trigger:"change"}],enable:[{required:!0,message:"请选择指令状态",trigger:"change"}],nameEncrypt:[{required:!0,message:"请输入加密指令",trigger:"blur"}]},zlData:[],zlPageSize:10,zlTotal:0,zlStart:0,sukeData:[],sukePageSize:10,sukeTotal:0,sukeStart:0,deviceData:[],zlobjectId:"",sukeDatazl:[]}},mounted:function(){this.getSukedevtype(),this.searchzl1()},methods:{timestampToTime:function(e){var t=new Date(1e3*e);return t.getFullYear()+"-"+((t.getMonth()+1<=10?"0"+(t.getMonth()+1):t.getMonth()+1)+"-")+((t.getDate()+1<=10?"0"+t.getDate():t.getDate())+" ")+((t.getHours()+1<=10?"0"+t.getHours():t.getHours())+":")+((t.getMinutes()+1<=10?"0"+t.getMinutes():t.getMinutes())+":")+(t.getSeconds()+1<=10?"0"+t.getSeconds():t.getSeconds())},getSukedevtype:function(){var e=this;Object(r.g)(this.sukeForm,this.sukeStart,this.sukePageSize).then(function(t){e.deviceData=t.data,e.getZldata()})},getZldata:function(){var e=this,t=n.a.Object.extend("SukeLog"),a=new n.a.Query(t);if(""!=this.zlForm.hardwareType&&a.equalTo("hardwareType",this.zlForm.hardwareType),""!=this.zlForm.hardware_number&&a.equalTo("hardware_number",this.zlForm.hardware_number),""!=this.zlForm.status&&a.equalTo("status",this.zlForm.status),""!=this.zlForm.starttime){var r=Math.ceil(Number(this.zlForm.starttime)/1e3);a.greaterThan("ts",r)}if(""!=this.zlForm.endtime){var l=Math.ceil(Number(this.zlForm.endtime)/1e3);a.lessThan("ts",l)}a.limit(this.zlPageSize),a.skip(this.zlStart),a.count().then(function(t){e.zlTotal=t,a.find().then(function(t){e.zlData=t})})},handleClick:function(e,t){"second"==e.name&&this.searchzl()},resetForm:function(){this.zlForm={hardware_number:"",region:"",hardwareType:"",nameEncrypt:"",needReply:"",status:"",starttime:new Date((new Date).setHours(0,0,0,0)-7776e6),endtime:new Date,display:9}},searchzl1:function(){var e=this;Object(r.i)({}).then(function(t){t&&(e.sukeDatazl=t.data)})},searchzl:function(){var e=this;Object(r.i)(this.sukeForm,this.sukeStart,this.sukePageSize).then(function(t){t&&(e.sukeData=t.data,e.sukeTotal=t.count)})},zlSizeChange:function(e){this.zlPageSize=e,this.getZldata()},zlCurrentChange:function(e){this.zlStart=(e-1)*this.zlPageSize,this.getZldata()},Deletezl:function(e){var t=this;this.$confirm("此操作将永久删除此条指令记录, 是否继续?","提示",{confirmButtonText:"确定",cancelButtonText:"取消",type:"warning"}).then(function(){var a=n.a.Object.extend("SukeLog");new n.a.Query(a).get(e).then(function(e){e.destroy().then(function(e){e&&(t.$message({type:"success",message:"删除成功!"}),t.getZldata())})})}).catch(function(){t.$message({type:"info",message:"已取消删除"})})},handleSelectionChange:function(e){console.log(e)},ESukeZl:function(e){this.dialogFormVisible=!0,this.form.hardwareType=e.hardwareType,this.form.name=e.name,this.form.nameEncrypt=e.nameEncrypt,this.form.needReply=e.needReply,this.form.remark=e.remark,this.form.enable=e.enable,this.form.objectId=e.objectId},sukeSizeChange:function(e){this.sukePageSize=e,this.searchzl()},sukeCurrentChange:function(e){this.sukeStart=(e-1)*this.sukePageSize,this.searchzl()},addsukezl:function(e){var t=this;this.$refs[e].validate(function(a){a&&(""==t.form.objectId?Object(r.a)(t.form).then(function(a){a&&(t.$message({type:"success",message:"添加成功"}),t.$refs[e].resetFields(),t.form.remark="",t.dialogFormVisible=!1,t.searchzl())}).catch(function(e){t.$message({type:"error",message:e.error})}):Object(r.e)(t.form).then(function(a){a&&(t.$message({type:"success",message:"修改成功"}),t.$refs[e].resetFields(),t.form.remark="",t.dialogFormVisible=!1,t.searchzl())}))})},editorsukezl:function(e){var t=this;1==e.enable?(e.enable=0,Object(r.e)(e).then(function(e){e&&(t.$message({type:"error",message:"禁用成功"}),t.handleClick({name:"second"}))})):(e.enable=1,Object(r.e)(e).then(function(e){e&&(t.$message({type:"success",message:"修改成功"}),t.handleClick({name:"second"}))}))},resetsukeForm:function(){this.sukeForm={name:"",region:"",hardwareType:"",enable:9,needReply:9}}}},o=(a("QtX8"),a("AnLJ"),a("KHd+")),i=Object(o.a)(s,function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticClass:"sukezl"},[a("el-tabs",{on:{"tab-click":e.handleClick},model:{value:e.activeName,callback:function(t){e.activeName=t},expression:"activeName"}},[a("el-tab-pane",{attrs:{label:"指令记录管理",name:"first"}},[a("div",{staticClass:"firstheader"},[a("el-form",{ref:"zlForm",attrs:{model:e.zlForm,inline:!0}},[a("el-form-item",{attrs:{label:"设备类型"}},[a("el-select",{attrs:{placeholder:"请选择设备类型"},model:{value:e.zlForm.hardwareType,callback:function(t){e.$set(e.zlForm,"hardwareType",t)},expression:"zlForm.hardwareType"}},e._l(e.deviceData,function(e,t){return a("el-option",{key:t,attrs:{label:e.name,value:e.name}})}))],1),e._v(" "),a("el-form-item",{attrs:{label:"设备编号"}},[a("el-input",{model:{value:e.zlForm.hardware_number,callback:function(t){e.$set(e.zlForm,"hardware_number",t)},expression:"zlForm.hardware_number"}})],1),e._v(" "),a("el-form-item",{attrs:{label:"指令状态"}},[a("el-select",{attrs:{placeholder:"请选择指令状态"},model:{value:e.zlForm.status,callback:function(t){e.$set(e.zlForm,"status",t)},expression:"zlForm.status"}},[a("el-option",{attrs:{label:"发送成功",value:"SEND_SUCCESS"}}),e._v(" "),a("el-option",{attrs:{label:"发送失败设备不在线",value:"SEND_FAIL_OFFLINE"}}),e._v(" "),a("el-option",{attrs:{label:"发送失败授权码不正确",value:"SEND_FAIL_DISALLOW"}}),e._v(" "),a("el-option",{attrs:{label:"等待发送",value:"WAIT_SEND"}})],1)],1),e._v(" "),a("el-form-item",{attrs:{label:"指令回复类型"}},[a("el-select",{attrs:{placeholder:"请选择回复类型"},model:{value:e.zlForm.needReply,callback:function(t){e.$set(e.zlForm,"needReply",t)},expression:"zlForm.needReply"}},[a("el-option",{attrs:{label:"全部",value:9}}),e._v(" "),a("el-option",{attrs:{label:"需要",value:1}}),e._v(" "),a("el-option",{attrs:{label:"不需要",value:0}})],1)],1),e._v(" "),a("el-form-item",{attrs:{label:"开始时间"}},[a("el-date-picker",{attrs:{type:"datetime",placeholder:"选择日期时间"},model:{value:e.zlForm.starttime,callback:function(t){e.$set(e.zlForm,"starttime",t)},expression:"zlForm.starttime"}})],1),e._v(" "),a("el-form-item",{attrs:{label:"结束时间"}},[a("el-date-picker",{attrs:{type:"datetime",placeholder:"选择结束时间"},model:{value:e.zlForm.endtime,callback:function(t){e.$set(e.zlForm,"endtime",t)},expression:"zlForm.endtime"}})],1),e._v(" "),a("el-form-item",[a("el-button",{attrs:{type:"primary",size:"mini"},on:{click:e.getZldata}},[e._v("查询")]),e._v(" "),a("el-button",{attrs:{size:"mini",type:"primary"},on:{click:e.resetForm}},[e._v("重置")])],1)],1)],1),e._v(" "),a("div",{staticClass:"firsttable"},[a("el-table",{ref:"multipleTable",staticStyle:{width:"100%","text-align":"center"},attrs:{data:e.zlData}},[a("el-table-column",{attrs:{label:"设备类型",align:"center"},scopedSlots:e._u([{key:"default",fn:function(t){return[a("span",[e._v(e._s(t.row.attributes.hardwareType))])]}}])}),e._v(" "),a("el-table-column",{attrs:{label:"设备编号",align:"center"},scopedSlots:e._u([{key:"default",fn:function(t){return[a("span",[e._v(e._s(t.row.attributes.hardware_number))])]}}])}),e._v(" "),a("el-table-column",{attrs:{label:"指令ID",align:"center"},scopedSlots:e._u([{key:"default",fn:function(t){return[a("span",[e._v(e._s(t.row.attributes.instruct_id))])]}}])}),e._v(" "),a("el-table-column",{attrs:{label:"指令名称",align:"center",width:"100"},scopedSlots:e._u([{key:"default",fn:function(t){return[a("span",[e._v(e._s(t.row.attributes.name))])]}}])}),e._v(" "),a("el-table-column",{attrs:{label:"指令路径",align:"center",width:"300"},scopedSlots:e._u([{key:"default",fn:function(t){return[a("span",[e._v(e._s(t.row.attributes.dir))])]}}])}),e._v(" "),a("el-table-column",{attrs:{label:"指令参数",align:"center"},scopedSlots:e._u([{key:"default",fn:function(t){return[a("span",[e._v(e._s(t.row.attributes.paras))])]}}])}),e._v(" "),a("el-table-column",{attrs:{label:"指令状态",align:"center"},scopedSlots:e._u([{key:"default",fn:function(t){return[a("span",[e._v(e._s(t.row.attributes.status))])]}}])}),e._v(" "),a("el-table-column",{attrs:{label:"指令下发时间",align:"center",width:"200"},scopedSlots:e._u([{key:"default",fn:function(t){return[a("span",[e._v(e._s(e.timestampToTime(t.row.attributes.ts)))])]}}])}),e._v(" "),a("el-table-column",{attrs:{label:"指令记录操作",align:"center",width:"150"},scopedSlots:e._u([{key:"default",fn:function(t){return[a("el-button",{attrs:{type:"danger",size:"mini"},on:{click:function(a){e.Deletezl(t.row.id)}}},[e._v("删除")])]}}])})],1)],1),e._v(" "),a("div",{staticClass:"fenye"},[a("el-pagination",{attrs:{background:"","pager-count":10,"page-sizes":[10,20,30,50],"page-size":e.zlPageSize,layout:"total, sizes, prev, pager, next, jumper",total:e.zlTotal},on:{"size-change":e.zlSizeChange,"current-change":e.zlCurrentChange}})],1)]),e._v(" "),a("el-tab-pane",{attrs:{label:"指令管理",name:"second"}},[a("div",{staticClass:"secondheader"},[a("el-form",{ref:"sukeForm",attrs:{model:e.sukeForm,inline:!0}},[a("el-form-item",{attrs:{label:"设备类型"}},[a("el-select",{attrs:{placeholder:"请选择设备类型"},model:{value:e.sukeForm.hardwareType,callback:function(t){e.$set(e.sukeForm,"hardwareType",t)},expression:"sukeForm.hardwareType"}},e._l(e.deviceData,function(e,t){return a("el-option",{key:t,attrs:{label:e.name,value:e.name}})}))],1),e._v(" "),a("el-form-item",{attrs:{label:"指令状态"}},[a("el-select",{attrs:{placeholder:"请选择指令状态"},model:{value:e.sukeForm.enable,callback:function(t){e.$set(e.sukeForm,"enable",t)},expression:"sukeForm.enable"}},[a("el-option",{attrs:{label:"全部",value:9}}),e._v(" "),a("el-option",{attrs:{label:"启用",value:1}}),e._v(" "),a("el-option",{attrs:{label:"禁用",value:0}})],1)],1),e._v(" "),a("el-form-item",{attrs:{label:"指令回复类型"}},[a("el-select",{attrs:{placeholder:"请选择指令回复类型"},model:{value:e.sukeForm.needReply,callback:function(t){e.$set(e.sukeForm,"needReply",t)},expression:"sukeForm.needReply"}},[a("el-option",{attrs:{label:"全部",value:9}}),e._v(" "),a("el-option",{attrs:{label:"需要",value:1}}),e._v(" "),a("el-option",{attrs:{label:"不需要",value:0}})],1)],1),e._v(" "),a("el-form-item",{attrs:{label:"指令名称"}},[a("el-select",{attrs:{placeholder:"请选择指令名称",clearable:""},model:{value:e.sukeForm.name,callback:function(t){e.$set(e.sukeForm,"name",t)},expression:"sukeForm.name"}},e._l(e.sukeDatazl,function(e,t){return a("el-option",{key:t,attrs:{label:e.name,value:e.name}})}))],1),e._v(" "),a("el-form-item",[a("el-button",{attrs:{type:"primary",size:"mini"},on:{click:e.searchzl}},[e._v("查询")]),e._v(" "),a("el-button",{attrs:{size:"mini",type:"primary"},on:{click:e.resetsukeForm}},[e._v("重置")]),e._v(" "),a("el-button",{attrs:{size:"mini",type:"primary"},on:{click:function(t){e.dialogFormVisible=!0}}},[e._v("指令增加")])],1)],1)],1),e._v(" "),a("div",{staticClass:"firsttable"},[a("el-table",{staticStyle:{width:"100%","text-align":"center"},attrs:{data:e.sukeData}},[a("el-table-column",{attrs:{prop:"hardwareType",label:"设备类型",align:"center"}}),e._v(" "),a("el-table-column",{attrs:{prop:"name",label:"指令名称",align:"center"}}),e._v(" "),a("el-table-column",{attrs:{prop:"nameEncrypt",label:"加密指令",align:"center"}}),e._v(" "),a("el-table-column",{attrs:{label:"指令回复类型",align:"center"},scopedSlots:e._u([{key:"default",fn:function(t){return[1==t.row.needReply?a("span",[e._v("需要回复")]):a("span",[e._v("不需要回复")])]}}])}),e._v(" "),a("el-table-column",{attrs:{prop:"remark",label:"备注",align:"center"}}),e._v(" "),a("el-table-column",{attrs:{prop:"",label:"指令操作",align:"center",width:"300"},scopedSlots:e._u([{key:"default",fn:function(t){return[a("el-button",{attrs:{type:"primary",size:"mini"},on:{click:function(a){e.ESukeZl(t.row)}}},[e._v("编辑")]),e._v(" "),0==t.row.enable?a("el-button",{attrs:{type:"success",size:"mini"},on:{click:function(a){e.editorsukezl(t.row)}}},[e._v("启用")]):a("el-button",{attrs:{type:"warning",size:"mini"},on:{click:function(a){e.editorsukezl(t.row)}}},[e._v("禁用")])]}}])})],1)],1),e._v(" "),a("div",{staticClass:"fenye"},[a("el-pagination",{attrs:{background:"","pager-count":10,"page-sizes":[1,10,20,30,50],"page-size":e.sukePageSize,layout:"total, sizes, prev, pager, next, jumper",total:e.sukeTotal},on:{"size-change":e.sukeSizeChange,"current-change":e.sukeCurrentChange}})],1),e._v(" "),a("el-dialog",{attrs:{title:"指令",visible:e.dialogFormVisible},on:{"update:visible":function(t){e.dialogFormVisible=t}}},[a("el-form",{ref:"sukeform",attrs:{model:e.form,rules:e.rules}},[a("el-form-item",{attrs:{label:"设备类型","label-width":e.formLabelWidth,prop:"hardwareType"}},[a("el-select",{staticStyle:{width:"100%"},attrs:{placeholder:"请选择设备类型"},model:{value:e.form.hardwareType,callback:function(t){e.$set(e.form,"hardwareType",t)},expression:"form.hardwareType"}},e._l(e.deviceData,function(e,t){return a("el-option",{key:t,attrs:{label:e.name,value:e.name}})}))],1),e._v(" "),a("el-form-item",{attrs:{label:"指令名称","label-width":e.formLabelWidth,prop:"name"}},[a("el-input",{attrs:{autocomplete:"off",placeholder:"请输入指令名称1，30个字符"},model:{value:e.form.name,callback:function(t){e.$set(e.form,"name",t)},expression:"form.name"}})],1),e._v(" "),a("el-form-item",{attrs:{label:"加密指令","label-width":e.formLabelWidth,prop:"nameEncrypt"}},[a("el-input",{attrs:{autocomplete:"off",placeholder:"请输入加密指令1，30个字符"},model:{value:e.form.nameEncrypt,callback:function(t){e.$set(e.form,"nameEncrypt",t)},expression:"form.nameEncrypt"}})],1),e._v(" "),a("el-form-item",{attrs:{label:"指令回复类型","label-width":e.formLabelWidth,prop:"needReply"}},[a("el-select",{staticStyle:{width:"100%"},attrs:{placeholder:"请选择指令回复类型"},model:{value:e.form.needReply,callback:function(t){e.$set(e.form,"needReply",t)},expression:"form.needReply"}},[a("el-option",{attrs:{label:"需要",value:1}}),e._v(" "),a("el-option",{attrs:{label:"不需要",value:0}})],1)],1),e._v(" "),a("el-form-item",{attrs:{label:"指令状态","label-width":e.formLabelWidth,prop:"enable"}},[a("el-select",{staticStyle:{width:"100%"},attrs:{placeholder:"请选择状态"},model:{value:e.form.enable,callback:function(t){e.$set(e.form,"enable",t)},expression:"form.enable"}},[a("el-option",{attrs:{label:"启用",value:1}}),e._v(" "),a("el-option",{attrs:{label:"废弃",value:0}})],1)],1),e._v(" "),a("el-form-item",{attrs:{label:"备注","label-width":e.formLabelWidth}},[a("el-input",{attrs:{type:"textarea",row:5},model:{value:e.form.remark,callback:function(t){e.$set(e.form,"remark",t)},expression:"form.remark"}})],1)],1),e._v(" "),a("div",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[a("el-button",{on:{click:function(t){e.dialogFormVisible=!1}}},[e._v("取 消")]),e._v(" "),a("el-button",{attrs:{type:"primary"},on:{click:function(t){e.addsukezl("sukeform")}}},[e._v("确 定")])],1)],1)],1)],1)],1)},[],!1,null,"94e498ee",null);i.options.__file="sukezl.vue";t.default=i.exports},OJhq:function(e,t,a){"use strict";a.d(t,"c",function(){return s}),a.d(t,"d",function(){return o}),a.d(t,"b",function(){return i}),a.d(t,"f",function(){return u}),a.d(t,"a",function(){return c}),a.d(t,"e",function(){return m}),a.d(t,"i",function(){return d}),a.d(t,"j",function(){return p}),a.d(t,"g",function(){return b}),a.d(t,"h",function(){return f});var r=a("YEIV"),l=a.n(r),n=a("t3Un");function s(e,t,a,r,s,o){var i;return Object(n.a)({url:"/suke/add_yys",method:"post",params:(i={name:e,id:t,url:a,para:r,status_url:s},l()(i,"status_url",s),l()(i,"status_para",o),i)})}function o(e,t,a,r,s,o,i){var u;return Object(n.a)({url:"/suke/edit_yys",method:"put",params:(u={objectId:e,name:t,id:a,url:r,para:s,status_url:o},l()(u,"status_url",o),l()(u,"status_para",i),u)})}function i(e,t,a,r){return Object(n.a)({url:"/suke/add_devtype",method:"post",params:{name:e,number:t,remark:a,enable:r}})}function u(e,t,a,r,l){return Object(n.a)({url:"/suke/edit_devtype",method:"put",params:{objectId:e,name:t,number:a,remark:r,enable:l}})}function c(e){return Object(n.a)({url:"/suke/add_zl",method:"post",params:{hardwareType:e.hardwareType,name:e.name,nameEncrypt:e.nameEncrypt,needReply:e.needReply,remark:e.remark,enable:e.enable}})}function m(e){return Object(n.a)({url:"/suke/edit_zl",method:"put",params:{objectId:e.objectId,hardwareType:e.hardwareType,name:e.name,nameEncrypt:e.nameEncrypt,needReply:e.needReply,remark:e.remark,enable:e.enable}})}function d(e,t,a){return Object(n.a)({url:"/suke/query_zl_info",method:"get",params:{hardwareType:e.hardwareType,name:e.name,needReply:e.needReply,enable:e.enable,skip:t,limit:a}})}function p(e,t,a){return Object(n.a)({url:"/suke/query_suke_dev",method:"get",params:{hardwareType:e.hardwareType,customerId:e.customer,hardware_number:e.hardware_number,status:e.status,ol_status:e.ol_status,auth:e.auth,skip:t,limit:a}})}function b(e,t,a){return Object(n.a)({url:"/suke/query_devtype_info",method:"get",params:{name:e.name,number:e.number,enable:e.enable,skip:t,limit:a}})}function f(e,t,a){return Object(n.a)({url:"/suke/query_yys_info",method:"get",params:{name:e.name,id:e.id,url:e.url,para:e.para,skip:t,limit:a}})}},QtX8:function(e,t,a){"use strict";var r=a("smXd");a.n(r).a},smXd:function(e,t,a){}}]);