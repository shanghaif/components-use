(window.webpackJsonp=window.webpackJsonp||[]).push([["chunk-1c6d"],{21:function(e,t){},22:function(e,t){},23:function(e,t){},MiJ8:function(e,t,l){"use strict";l.r(t);var a=l("FyfS"),o=l.n(a),r=l("gDS+"),s=l.n(r),i=l("YEIV"),n=l.n(i),c=l("72z0"),d=l("v0iw"),m=l.n(d),u=l("EUZL"),h=l.n(u),b=l("t3Un");var f={name:"bulkImport",data:function(){var e;return{isGetInfo:!0,isVerify:!0,isInfo:!0,user:"",state:"无状态",num:1,file:[],headArr:[{en:"tq",ch:"台区名称",ex:"广东南利嘉投资有限公司（小区1）"},{en:"yhabh",ch:"用户编号",ex:"0305420166778469,用户编号不能相同"},{en:"yhmc",ch:"用户名称",ex:"南澳县南利嘉物业管理有限公司"},{en:"vcaddr_web",ch:"集中器地址",ex:"集中器地址为12位,集中器地址不能相同"},{en:"addr_web",ch:"电能表地址",ex:"电表地址为12位,电表地址不能相同"},{en:"pn",ch:"PN值",ex:"0-2000,同一个集中器pn不能相同"},{en:"yhlb",ch:"用户类别",ex:"[公变普通用户][公变大客户][专变用户]"},{en:"cblx",ch:"通道类型",ex:"[虚拟通道][物理通道]"},{en:"deveui",ch:"采集器编号",ex:"c4c13b8fc4a39b0c"},{en:"appeui",ch:"应用编号",ex:"c4cd82096a4837c1"},{en:"yhdz",ch:"用户地址",ex:"广东省汕头市南澳县云澳镇南利嘉银都华轩商铺"},{en:"zcbh",ch:"资产编号",ex:"03001SF00000271700107078"},{en:"sb",ch:"设备类别",ex:"电能表"},{en:"sblx",ch:"设备类型",ex:"[单相电子式电能表][三相电子式电能表]"},{en:"sccj",ch:"生产厂家",ex:"生产厂家"},{en:"ccbh",ch:"出厂编号",ex:"03001SF00000251700249151"},{en:"txfs",ch:"通信方式",ex:"通信方式"},{en:"txgw",ch:"通信规约",ex:"DL/T645"},{en:"ljdz",ch:"逻辑地址",ex:"逻辑地址"},{en:"dbmm",ch:"远程控制密码",ex:"远程控制密码"},{en:"btl",ch:"波特率",ex:"2"},{en:"zhbl",ch:"综合倍率",ex:"综合倍率"},{en:"eddy",ch:"额定电压",ex:"额定电压"},{en:"bddy",ch:"标定电压",ex:"标定电压"},{en:"zqd",ch:"准确度",ex:"准确度"},{en:"bddl",ch:"到货批次号",ex:"标定电流"},{en:"tysj",ch:"投运时间",ex:"投运时间"},{en:"cbqd",ch:"抄表区段",ex:"抄表区段"},{en:"xl",ch:"线路",ex:"线路"},{en:"cz",ch:"厂站",ex:"厂站"},{en:"jlzzfl",ch:"计量装置分类",ex:"计量装置分类"},{en:"jlfs",ch:"计量方式",ex:"低供低计"},{en:"zfbbz",ch:"主副表标志",ex:"主副表标志"},{en:"jldbh",ch:"计量点编号",ex:"1111111129145564"},{en:"jldwz",ch:"计量点位置",ex:"用户测试"},{en:"jlddz",ch:"计量点地址",ex:"计量点地址"},{en:"scjyrq",ch:"上次检验日期",ex:"上次检验日期"},{en:"jlbx",ch:"计量表箱(柜)",ex:"计量表箱(柜)"},{en:"xgwzh",ch:"箱(柜)位置号",ex:"箱(柜)位置号"},{en:"zzjg",ch:"组织架构",ex:"组织架构"}],sum:0,abnormal:0,form:{gddw:"",gddws:[],upload:"",iserr:!1},tableData:[],OIData:[],tableloading:!1,OIloading:!1,multipleSelection:[],formLabelWidth:"120px",dialogFormVisible:!1,updateShow:!1,setForm:(e={yhabh:"",vcaddr_web:"",deveui:"",tq:"",yhmc:"",pn:"",addr_web:"",yhdz:"",cblx:"",cblx_arr:[{label:"虚拟通道",value:1},{label:"物理通道",value:2}],addr:[],provinces:"",gddw:"",yhlb:"",yhlb_arr:[{label:"公变客户",value:1}],zcbh:"",jldbh:"",sblb:"",sblb_arr:[{label:"电能表",value:1}],sblx:"",sblx_arr:[{label:"单相电子式电能表",value:1}],ccbh:"",tysj:(new Date).getTime(),dhpc:"",zhbl:"",cbqd:"",xl:"",cz:"",eddy:"",bddl:"",zqd:"",sccj:"",jlzzfl:"",jlfs:"",zfbbz:"",jldwz:"",jlddz:"",scjyrq:(new Date).getTime(),txfs:"",txfs_arr:[{label:"低供低计",value:1}],txgw:"",ljdz:"",btl:"",jlbx:"",xgwzh:"",dbmm:""},n()(e,"deveui",""),n()(e,"appeui",""),e),options:c.regionData}},created:function(){this.getGddw(),this.getState()},methods:{Parse:function(){var e=m.a.Object.extend("tmp_csv");return new m.a.Query(e)},handleSelectionChange:function(e){this.multipleSelection=e},derive_tmp:function(){for(var e=[],t=[],l=0;l<this.headArr.length;l++)e.push(this.headArr[l].ch);e.push("组织架构");for(var a=0;a<this.headArr.length;a++)t.push(this.headArr[a].ex);t.push("示例：南澳后宅供电所");var o=h.a.utils.aoa_to_sheet([e,t]),r=h.a.utils.book_new();h.a.utils.book_append_sheet(r,o,"Sheet1"),h.a.writeFile(r,"模板.xlsx")},getGddw:function(){var e=this,t=m.a.Object.extend("Department"),l=new m.a.Query(t);l.notEqualTo("org_type","集中器"),l.select("name"),l.find().then(function(t){for(var l=0;l<t.length;l++){var a={};a.value=t[l].id,a.label=t[l].attributes.name,e.form.gddws.push(a)}})},clear:function(){this.OIData=[]},getFile:function(){this.$refs.file.click()},handleFileChange:function(e){this.file=e.target.files[0],this.form.upload=this.file.name;var t=this.file.name.lastIndexOf("."),l=this.file.name.substr(t);".xls"!=l&&".xlsx"!=l&&".csv"!=l&&(this.$message.error("只支持xls、xlsx、csv后缀名的文件，请重新选择文件"),this.form.upload="")},upload:function(e){this.importf(e,!1,void 0)},importf:function(e,t,l){var a=this;if(""!=this.form.upload)if(""!=this.form.gddw){this.tableloading=!0,this.tableData=[],this.sum=0;var o=e,r=new FileReader;r.onload=function(e){var o=e.target.result;l=t?h.a.read(btoa(a.fixdata(o)),{type:"base64"}):h.a.read(o,{type:"binary"});for(var r=JSON.parse(s()(h.a.utils.sheet_to_json(l.Sheets[l.SheetNames[0]],{blankrows:!0,defval:""}))),i=function(e){for(var t={others:{}},l=0,o=0;o<a.form.gddws.length;o++)a.form.gddws[o].value==a.form.gddw&&(t.organization=a.form.gddws[o].label);for(var s in r[e]){var i=a.headArr[l].en;"addr_web"==i||"vcaddr_web"==i||"deveui"==i||"appeui"==i||"pn"==i||"yhabh"==i?t[i]=String(r[e][s]):t.others[i]=String(r[e][s]),l++}(function(e){return Object(b.a)({url:"/yhgx/transaction/add",method:"post",data:{addr:e.addr_web,appeui:e.appeui,deveui:e.deveui,num:e.num,organization:e.organization,others:e.others,pn:e.pn,vcaddr:e.vcaddr_web,yhabh:e.yhabh}})})(t).then(function(t){0==t.code&&(a.$message({message:"上传成功！",type:"success"}),e==r.length-1&&(a.getTmpData(),a.getState()))}).catch(function(e){a.$message.error("上传失败，请确认当前状态！")})},n=0;n<r.length;n++)i(n)},t?r.readAsArrayBuffer(o):r.readAsBinaryString(o)}else this.$message({message:"请选择供电单位",type:"warning"});else this.$message({message:"请选择要上传的文件",type:"warning"})},fixdata:function(e){for(var t="",l=0,a=10240;l<e.byteLength/a;++l)t+=String.fromCharCode.apply(null,new Uint8Array(e.slice(l*a,l*a+a)));return t+=String.fromCharCode.apply(null,new Uint8Array(e.slice(l*a)))},getTmpData:function(){var e=this,t=this.Parse();t.ascending("-createdAt"),t.find().then(function(t){for(var l=0;l<t.length;l++){var a={},o=t[l].attributes;for(var r in a.gddw=o.organization,a.num=l+1,a.addr_web=o.addr,a.vcaddr_web=o.vcaddr,a.appeui=o.appeui,a.deveui=o.deveui,a.pn=o.pn,a.yhabh=o.yhabh,o.others)a[r]=o.others[r];e.tableData.push(a),e.sum++}e.tableloading=!1,e.isGetInfo=!1})},handleClickRoll:function(){var e=this;(function(e){return Object(b.a)({url:"/yhgx/transaction/rollback",method:"post",data:{data:e}})})().then(function(t){0==t.code&&(e.$message({message:"数据回滚成功，数据已改变，回到初始状态！",type:"success"}),e.tableData=[],e.OIData=[],e.isGetInfo=!0,e.isInfo=!0,e.num=1,e.sum=0,e.getState())}).catch(function(t){e.$message.error("回滚失败，请重试！")})},delete:function(e,t,l){var a=this,o=this.Parse();o.equalTo(e,t),o.find().then(function(e){var t=e[0].id;o.get(t).then(function(e){e.destroy().then(function(e){a.$message({message:"删除成功！",type:"success"}),l&&(a.tableData=[],a.getTmpData())}).catch(function(e){a.$message.error("删除失败！")})})})},deleteRow:function(e,t){this.delete("addr",t[e].addr_web,!0),this.form.iserr=!1},handleClickDel:function(){var e=this.multipleSelection,t=!1;if(e){for(var l=0;l<e.length;l++)l==e.length-1&&(t=!0),this.delete("addr",e[l].addr_web,t);this.form.iserr=!1}},setRow:function(e,t){for(var l in t[e])this.setForm[l]=t[e][l];this.dialogFormVisible=!0},handleClickUpdateShow:function(){this.updateShow=!this.updateShow},handleClickSet:function(){var e=this;this.Parse().find().then(function(t){console.log(t);for(var l=0;l<t.length;l++)if(e.setForm.addr_web==t[l].attributes.addr){var a=t[l].attributes.others,o={};for(var r in a)o[r]=e.setForm[r];o.yhdz=e.setForm.provinces+e.setForm.yhdz,t[l].set("appeui",e.setForm.appeui),t[l].set("deveui",e.setForm.deveui),t[l].set("pn",e.setForm.pn),t[l].set("others",o),t[l].save().then(function(t){e.$message({message:"修改成功！",type:"success"}),e.dialogFormVisible=!1,e.tableData=[],e.getTmpData()}).catch(function(t){e.$message.error("修改出错,请重新操作！")})}})},handleModChange:function(e){var t=c.CodeToText[e[0]]+", "+c.CodeToText[e[1]]+", "+c.CodeToText[e[2]];this.setForm.provinces=t.split(",").join("")},handleClickVerify:function(){var e=this;this.abnormal=0,this.OIData=[];for(var t=document.querySelectorAll(".table .el-table__body-wrapper .el-table__row .el-tooltip"),l=0;l<t.length;l++)t[l].style.color="#606266";(function(e){return Object(b.a)({url:"/yhgx/transaction/check",method:"post",data:{data:e}})})().then(function(l){if(0==l.code){e.$message({message:"校验中！",type:"success"}),e.getState();var a=setInterval(function(){if("校验失败"==e.state){e.$message.error("校验失败！"),clearInterval(a),e.isInfo=!1;var l=e.Parse();l.select("error"),l.ascending("-createdAt"),l.find().then(function(l){e.OIData.push({num:e.num,oper:"数据上传",errRow:"",errCell:"",OI:"上传"+e.sum+"条",handlers:e.user,time:(new Date).toLocaleString()});for(var a=0;a<l.length;a++){if("{}"!=s()(l[a].attributes.error)){e.abnormal++;var o=l[a].attributes.error;for(var r in o){var i=0;e.num++;for(var n=0;n<e.headArr.length;n++)e.headArr[n].en!=r&&e.headArr[n].en!=r+"_web"||(i=n,t[42*a+n+2].style.color="#f00");e.OIData.push({num:e.num,oper:"数据校验",errRow:"第"+(a+1)+"行",errCell:a+1+":"+(i+1),OI:r+":"+o[r],handlers:e.user,time:(new Date).toLocaleString()})}}a==l.length-1&&(e.num++,e.OIData.push({num:e.num,oper:"数据验证(汇总)",errRow:"",errCell:"",OI:"校验完成"+e.sum+"条,"+e.abnormal+"条存在异常",handlers:e.user,time:(new Date).toLocaleString()}))}})}else"校验成功"==e.state&&(clearInterval(a),e.isVerify=!1,e.$message({message:"校验成功！",type:"success"}));e.getState()},1e3)}}).catch(function(t){e.$message.error("校验发送错误！")})},handleClickImport:function(){var e=this;(function(e){return Object(b.a)({url:"/yhgx/transaction/commit",method:"post",data:{data:e}})})().then(function(t){0==t.code&&(e.$message({message:"导入成功！",type:"success"}),e.isVerify=!0,e.isGetInfo=!0)}).catch(function(t){e.$message.error("导入出错！")})},getState:function(){var e=this;Object(b.a)({url:"/yhgx/transaction/state",method:"get"}).then(function(t){e.user=t.user,"idle"==t.state?e.state="空闲":"load"==t.state?e.state="加载":"checking"==t.state?e.state="校验中":"check_fail"==t.state?e.state="校验失败":"check_success"==t.state?e.state="校验成功":e.state="提交成功"})},handleChangeUnusual:function(){if(this.form.iserr){var e=document.querySelectorAll(".table .el-table__body-wrapper .el-table__row .el-tooltip"),t=document.querySelectorAll(".table .el-table__fixed-right .el-table__row");console.log(t);for(var l=0,a=0;a<e.length;a++)if("width: 79px; color: rgb(96, 98, 102);"==e[a].getAttribute("style")){if(41==++l){var o=parseInt((a+1)/l-1);e[a].parentNode.parentNode.style.display="none",t[o].style.display="none",l=0}}else l=0}else this.tableData=[],this.getTmpData()},handleClickBackups:function(){var e=this;this.Parse().find().then(function(t){for(var l=JSON.parse(s()(t)),a=0;a<l.length;a++)for(var o in console.log(l[a].others),l[a].others)l[a][o]=l[a].others[o];e.derive(l,{yhabh:"用户编号",yhmc:"用户名称",vcaddr_web:"集中器地址",addr_web:"电能表地址",pn:"PN值",yhlb:"用户类别",cblx:"通道类型",deveui:"采集器编号",appeui:"应用编号",yhdz:"用户地址",zcbh:"资产编号",sb:"设备类别",sblx:"设备类型",sccj:"生产厂家",ccbh:"出厂编号",txfs:"通信方式",txgw:"通信规约",ljdz:"逻辑地址",dbmm:"远程控制密码",btl:"波特率",zhbl:"综合倍率",eddy:"额定电压",bddl:"标定电流",zqd:"准确度",dhpc:"到货批次号",tysj:"投运时间",cbqd:"抄表区段",xl:"线路",cz:"厂站",jlzzfl:"计量装置分类",jlfs:"计量方式",zfbbz:"主副表标志",jldbh:"计量点编号",jldwz:"计量点位置",jlddz:"计量点地址",scjyrq:"上次检验日期",jlbx:"计量表箱(柜)",xgwzh:"箱(柜)位置号"},"数据备份")})},handleClickRecord:function(){this.derive(this.OIData,{num:"编号",oper:"操作",errRow:"异常行数",errCell:"异常单元格",OI:"操作说明",handlers:"操作者",time:"操作时间"},"操作记录")},derive:function(e,t,l){console.log(e);var a=[[]],r=0;for(var s in t)a[0][r]=t[s],r++;r=null;var i=!0,n=!1,c=void 0;try{for(var d,m=o()(e);!(i=(d=m.next()).done);i=!0){var u=d.value,b=[];for(var f in t)b.push(u[f]);a.push(b)}}catch(e){n=!0,c=e}finally{try{!i&&m.return&&m.return()}finally{if(n)throw c}}var p=h.a.utils.json_to_sheet(a,{skipHeader:!0}),v=h.a.utils.book_new();h.a.utils.book_append_sheet(v,p,"Sheet1"),h.a.writeFile(v,l+".xlsx")}}},p=(l("bHGR"),l("KHd+")),v=Object(p.a)(f,function(){var e=this,t=e.$createElement,l=e._self._c||t;return l("div",{attrs:{id:"bulkImport"}},[l("div",{staticClass:"content"},[l("div",[l("el-form",{staticClass:"demo-form-inline",attrs:{inline:!0,size:"small ",model:e.form},nativeOn:{submit:function(e){e.preventDefault()}}},[l("div",[l("el-form-item",[l("el-button",{attrs:{type:"primary"},on:{click:e.derive_tmp}},[e._v("模板下载")])],1),e._v(" "),l("el-form-item",{attrs:{label:"供电单位"}},[l("el-select",{attrs:{placeholder:"请选择供电单位"},model:{value:e.form.gddw,callback:function(t){e.$set(e.form,"gddw",t)},expression:"form.gddw"}},e._l(e.form.gddws,function(e){return l("el-option",{key:e.value,attrs:{label:e.label,value:e.value}})}))],1),e._v(" "),l("input",{directives:[{name:"show",rawName:"v-show",value:!1,expression:"false"}],ref:"file",attrs:{type:"file"},on:{change:function(t){e.handleFileChange(t)}}}),e._v(" "),l("el-form-item",{attrs:{label:"上传表格"}},[l("el-input",{attrs:{placeholder:"请选择需要上传的表格","prefix-icon":"el-icon-upload",clearable:"",readonly:""},model:{value:e.form.upload,callback:function(t){e.$set(e.form,"upload",t)},expression:"form.upload"}},[l("el-button",{attrs:{slot:"append"},on:{click:e.getFile},slot:"append"},[e._v("\n                                选择文件\n                            ")])],1)],1),e._v(" "),l("el-form-item",[l("el-button",{attrs:{type:"primary"},on:{click:function(t){e.upload(e.file)}}},[e._v("本地上传")])],1),e._v(" "),l("el-form-item",[l("el-button",{attrs:{disabled:e.isGetInfo,type:"success"},on:{click:e.handleClickVerify}},[e._v("数据校验")])],1),e._v(" "),l("el-form-item",[l("el-button",{attrs:{disabled:e.isVerify,type:"primary"},on:{click:e.handleClickImport}},[e._v("确认导入")])],1)],1),e._v(" "),l("div",{staticClass:"operation"},[l("el-form-item",{attrs:{label:"当前状态"}},[l("el-input",{attrs:{readonly:""},model:{value:e.state,callback:function(t){e.state=t},expression:"state"}})],1),e._v(" "),l("el-form-item",[l("el-button",{attrs:{type:"warning"},on:{click:e.handleClickRoll}},[e._v("数据回滚")])],1),e._v(" "),l("el-form-item",[l("el-button",{attrs:{disabled:e.isGetInfo,type:"danger"},on:{click:e.handleClickDel}},[e._v("批量删除")])],1),e._v(" "),l("el-form-item",[l("el-button",{attrs:{disabled:e.isGetInfo,type:"primary"},on:{click:e.handleClickBackups}},[e._v("数据备份")])],1),e._v(" "),l("el-form-item",[l("el-checkbox",{attrs:{disabled:e.isGetInfo},on:{change:e.handleChangeUnusual},model:{value:e.form.iserr,callback:function(t){e.$set(e.form,"iserr",t)},expression:"form.iserr"}},[e._v("仅显示异常")])],1)],1)])],1),e._v(" "),l("div",{staticClass:"table"},[l("el-table",{directives:[{name:"loading",rawName:"v-loading",value:e.tableloading,expression:"tableloading"}],staticStyle:{width:"100%"},attrs:{data:e.tableData,stripe:"","max-height":"450",height:"450","element-loading-text":"正在加载...."},on:{"selection-change":e.handleSelectionChange}},[l("el-table-column",{attrs:{type:"selection",width:"40"}}),e._v(" "),l("el-table-column",{attrs:{prop:"num",label:"序号","show-overflow-tooltip":""}}),e._v(" "),l("el-table-column",{attrs:{prop:"gddw",label:"供电单位","show-overflow-tooltip":""}}),e._v(" "),e._l(e.headArr,function(e){return l("el-table-column",{key:e.en,attrs:{prop:e.en,label:e.ch,width:"200","show-overflow-tooltip":""}})}),e._v(" "),l("el-table-column",{attrs:{fixed:"right",label:"操作",width:"160"},scopedSlots:e._u([{key:"default",fn:function(t){return[l("el-button",{attrs:{type:"warning",size:"small"},nativeOn:{click:function(l){l.preventDefault(),e.setRow(t.$index,e.tableData)}}},[e._v("\n                        修改\n                        ")]),e._v(" "),l("el-button",{attrs:{type:"danger",size:"small"},nativeOn:{click:function(l){l.preventDefault(),e.deleteRow(t.$index,e.tableData)}}},[e._v("\n                        删除\n                        ")])]}}])})],2),e._v(" "),l("p",{directives:[{name:"show",rawName:"v-show",value:e.isInfo,expression:"isInfo"}],staticClass:"result"},[e._v("当前成功导入"+e._s(e.sum)+"条，请校验")]),e._v(" "),l("p",{directives:[{name:"show",rawName:"v-show",value:!e.isInfo,expression:"!isInfo"}],staticClass:"result"},[e._v("共"+e._s(e.sum)+"条，其中"+e._s(e.abnormal)+"条存在异常")])],1),e._v(" "),l("div",{staticClass:"OI"},[l("div",{staticClass:"btns"},[l("el-button",{attrs:{size:"small",type:"primary",disabled:e.isGetInfo}},[e._v("刷新")]),e._v(" "),l("el-button",{attrs:{size:"small",type:"warning",disabled:e.isGetInfo},on:{click:e.clear}},[e._v("清屏")]),e._v(" "),l("el-button",{attrs:{size:"small",type:"primary",disabled:e.isGetInfo},on:{click:e.handleClickRecord}},[e._v("导出操作记录")])],1),e._v(" "),l("el-table",{directives:[{name:"loading",rawName:"v-loading",value:e.OIloading,expression:"OIloading"}],staticStyle:{width:"100%","margin-top":"10px"},attrs:{data:e.OIData,border:"","max-height":"150",height:"150","element-loading-text":"拼命加载中"}},[l("el-table-column",{attrs:{"show-overflow-tooltip":"",prop:"num",label:"编号"}}),e._v(" "),l("el-table-column",{attrs:{"show-overflow-tooltip":"",prop:"oper",label:"操作"}}),e._v(" "),l("el-table-column",{attrs:{"show-overflow-tooltip":"",prop:"errRow",label:"异常行数"}}),e._v(" "),l("el-table-column",{attrs:{"show-overflow-tooltip":"",prop:"errCell",label:"异常单元格"}}),e._v(" "),l("el-table-column",{attrs:{prop:"OI",label:"操作说明"}}),e._v(" "),l("el-table-column",{attrs:{"show-overflow-tooltip":"",prop:"handlers",label:"操作者"}}),e._v(" "),l("el-table-column",{attrs:{"show-overflow-tooltip":"",prop:"time",label:"操作时间"}})],1)],1),e._v(" "),l("el-dialog",{attrs:{title:"修改信息",visible:e.dialogFormVisible},on:{"update:visible":function(t){e.dialogFormVisible=t}}},[l("el-form",{attrs:{model:e.setForm}},[l("el-divider",{attrs:{"content-position":"left"}},[e._v("抄表档案")]),e._v(" "),l("el-form-item",{attrs:{label:"供电单位","label-width":e.formLabelWidth}},[l("el-input",{attrs:{autocomplete:"off",disabled:!0},model:{value:e.setForm.gddw,callback:function(t){e.$set(e.setForm,"gddw",t)},expression:"setForm.gddw"}})],1),e._v(" "),l("el-form-item",{attrs:{label:"用户编号","label-width":e.formLabelWidth}},[l("el-input",{attrs:{autocomplete:"off",disabled:!0},model:{value:e.setForm.yhabh,callback:function(t){e.$set(e.setForm,"yhabh",t)},expression:"setForm.yhabh"}})],1),e._v(" "),l("el-form-item",{attrs:{label:"用户名称","label-width":e.formLabelWidth}},[l("el-input",{attrs:{autocomplete:"off"},model:{value:e.setForm.yhmc,callback:function(t){e.$set(e.setForm,"yhmc",t)},expression:"setForm.yhmc"}})],1),e._v(" "),l("el-form-item",{attrs:{label:"用户类别","label-width":e.formLabelWidth}},[l("el-select",{attrs:{clearable:"",placeholder:"请选择用户类别"},model:{value:e.setForm.yhlb,callback:function(t){e.$set(e.setForm,"yhlb",t)},expression:"setForm.yhlb"}},e._l(e.setForm.yhlb_arr,function(e){return l("el-option",{key:e.value,attrs:{label:e.label,value:e.value}})}))],1),e._v(" "),l("el-form-item",{attrs:{label:"台区名称","label-width":e.formLabelWidth}},[l("el-input",{attrs:{autocomplete:"off"},model:{value:e.setForm.tq,callback:function(t){e.$set(e.setForm,"tq",t)},expression:"setForm.tq"}})],1),e._v(" "),l("el-form-item",{attrs:{label:"集中器地址","label-width":e.formLabelWidth}},[l("el-input",{attrs:{autocomplete:"off",disabled:!0},model:{value:e.setForm.vcaddr_web,callback:function(t){e.$set(e.setForm,"vcaddr_web",t)},expression:"setForm.vcaddr_web"}})],1),e._v(" "),l("el-form-item",{attrs:{label:"电能表地址","label-width":e.formLabelWidth}},[l("el-input",{attrs:{autocomplete:"off",disabled:!0},model:{value:e.setForm.addr_web,callback:function(t){e.$set(e.setForm,"addr_web",t)},expression:"setForm.addr_web"}})],1),e._v(" "),l("el-form-item",{attrs:{label:"PN值","label-width":e.formLabelWidth}},[l("el-input",{attrs:{autocomplete:"off"},model:{value:e.setForm.pn,callback:function(t){e.$set(e.setForm,"pn",t)},expression:"setForm.pn"}})],1),e._v(" "),l("el-form-item",{attrs:{label:"抄表类型","label-width":e.formLabelWidth}},[l("el-select",{attrs:{disabled:"",clearable:"",placeholder:"请选择抄表类型"},model:{value:e.setForm.cblx,callback:function(t){e.$set(e.setForm,"cblx",t)},expression:"setForm.cblx"}},e._l(e.setForm.cblx_arr,function(e){return l("el-option",{key:e.value,attrs:{label:e.label,value:e.value}})}))],1),e._v(" "),l("el-form-item",{attrs:{label:"采集器编号","label-width":e.formLabelWidth}},[l("el-input",{attrs:{autocomplete:"off",placeholder:"请输入采集器编号"},model:{value:e.setForm.deveui,callback:function(t){e.$set(e.setForm,"deveui",t)},expression:"setForm.deveui"}})],1),e._v(" "),l("el-form-item",{attrs:{label:"应用编号","label-width":e.formLabelWidth}},[l("el-input",{attrs:{autocomplete:"off",placeholder:"请输入应用编号"},model:{value:e.setForm.appeui,callback:function(t){e.$set(e.setForm,"appeui",t)},expression:"setForm.appeui"}})],1),e._v(" "),l("el-form-item",{attrs:{label:"用户地址","label-width":e.formLabelWidth}},[l("el-cascader",{attrs:{size:"large",options:e.options},on:{change:e.handleModChange},model:{value:e.setForm.addr,callback:function(t){e.$set(e.setForm,"addr",t)},expression:"setForm.addr"}}),e._v(" "),l("el-input",{attrs:{type:"textarea",rows:2,autocomplete:"off",placeholder:"详细地址"},model:{value:e.setForm.yhdz,callback:function(t){e.$set(e.setForm,"yhdz",t)},expression:"setForm.yhdz"}})],1),e._v(" "),l("el-divider"),e._v(" "),l("div",{staticStyle:{display:"flex","justify-content":"space-between",width:"100%",padding:"0 10%","line-height":"0"}},[l("p",{staticStyle:{"font-size":"20px","font-weight":"500"}},[e._v("电表信息(选填)")]),e._v(" "),l("el-button",{staticStyle:{padding:"10px"},attrs:{type:"info"},on:{click:e.handleClickUpdateShow}},[e._v(e._s(e.updateShow?"隐藏":"显示"))])],1),e._v(" "),l("div",{directives:[{name:"show",rawName:"v-show",value:e.updateShow,expression:"updateShow"}],staticStyle:{display:"flex","flex-wrap":"wrap","justify-content":"space-around"}},[l("el-form-item",{attrs:{label:"资产编号","label-width":e.formLabelWidth}},[l("el-input",{attrs:{autocomplete:"off",placeholder:"请输入资产标号编号"},model:{value:e.setForm.zcbh,callback:function(t){e.$set(e.setForm,"zcbh",t)},expression:"setForm.zcbh"}})],1),e._v(" "),l("el-form-item",{attrs:{label:"出厂编号","label-width":e.formLabelWidth}},[l("el-input",{attrs:{autocomplete:"off",placeholder:"请输入出厂编号"},model:{value:e.setForm.ccbh,callback:function(t){e.$set(e.setForm,"ccbh",t)},expression:"setForm.ccbh"}})],1),e._v(" "),l("el-form-item",{attrs:{label:"远程控制密码","label-width":e.formLabelWidth}},[l("el-input",{attrs:{"show-password":"",autocomplete:"off",placeholder:"请输入远程控制密码"},model:{value:e.setForm.dbmm,callback:function(t){e.$set(e.setForm,"dbmm",t)},expression:"setForm.dbmm"}})],1),e._v(" "),l("el-form-item",{attrs:{label:"采集器编号","label-width":e.formLabelWidth}},[l("el-input",{attrs:{autocomplete:"off",placeholder:"请输入采集编号"},model:{value:e.setForm.deveui,callback:function(t){e.$set(e.setForm,"deveui",t)},expression:"setForm.deveui"}})],1),e._v(" "),l("el-form-item",{attrs:{label:"注册应用号","label-width":e.formLabelWidth}},[l("el-input",{attrs:{autocomplete:"off",placeholder:"请输入注册应用号"},model:{value:e.setForm.appeui,callback:function(t){e.$set(e.setForm,"appeui",t)},expression:"setForm.appeui"}})],1),e._v(" "),l("el-form-item",{attrs:{label:"计量点编号","label-width":e.formLabelWidth}},[l("el-input",{attrs:{autocomplete:"off",placeholder:"请输入计量点编号"},model:{value:e.setForm.jldbh,callback:function(t){e.$set(e.setForm,"jldbh",t)},expression:"setForm.jldbh"}})],1),e._v(" "),l("el-form-item",{attrs:{label:"投运时间","label-width":e.formLabelWidth}},[l("el-date-picker",{attrs:{type:"date",placeholder:"选择日期"},model:{value:e.setForm.tysj,callback:function(t){e.$set(e.setForm,"tysj",t)},expression:"setForm.tysj"}})],1),e._v(" "),l("el-form-item",{attrs:{label:"上次检验日期","label-width":e.formLabelWidth}},[l("el-date-picker",{attrs:{type:"date",placeholder:"选择日期"},model:{value:e.setForm.scjyrq,callback:function(t){e.$set(e.setForm,"scjyrq",t)},expression:"setForm.scjyrq"}})],1),e._v(" "),l("el-form-item",{attrs:{label:"到货批次号","label-width":e.formLabelWidth}},[l("el-input",{attrs:{autocomplete:"off",placeholder:"请输入到货批次号"},model:{value:e.setForm.dhpc,callback:function(t){e.$set(e.setForm,"dhpc",t)},expression:"setForm.dhpc"}})],1),e._v(" "),l("el-form-item",{attrs:{label:"综合倍率","label-width":e.formLabelWidth}},[l("el-input",{attrs:{autocomplete:"off",placeholder:"请输入综合倍率"},model:{value:e.setForm.zhbl,callback:function(t){e.$set(e.setForm,"zhbl",t)},expression:"setForm.zhbl"}})],1),e._v(" "),l("el-form-item",{attrs:{label:"抄表区段","label-width":e.formLabelWidth}},[l("el-input",{attrs:{autocomplete:"off",placeholder:"请输入抄表区段"},model:{value:e.setForm.cbqd,callback:function(t){e.$set(e.setForm,"cbqd",t)},expression:"setForm.cbqd"}})],1),e._v(" "),l("el-form-item",{attrs:{label:"线路","label-width":e.formLabelWidth}},[l("el-input",{attrs:{autocomplete:"off",placeholder:"请输入线路"},model:{value:e.setForm.xl,callback:function(t){e.$set(e.setForm,"xl",t)},expression:"setForm.xl"}})],1),e._v(" "),l("el-form-item",{attrs:{label:"厂站","label-width":e.formLabelWidth}},[l("el-input",{attrs:{autocomplete:"off",placeholder:"请输入厂站"},model:{value:e.setForm.cz,callback:function(t){e.$set(e.setForm,"cz",t)},expression:"setForm.cz"}})],1),e._v(" "),l("el-form-item",{attrs:{label:"额定电压","label-width":e.formLabelWidth}},[l("el-input",{attrs:{autocomplete:"off",placeholder:"请输入额定电压"},model:{value:e.setForm.eddy,callback:function(t){e.$set(e.setForm,"eddy",t)},expression:"setForm.eddy"}})],1),e._v(" "),l("el-form-item",{attrs:{label:"标定电流","label-width":e.formLabelWidth}},[l("el-input",{attrs:{autocomplete:"off",placeholder:"请输入标定电流"},model:{value:e.setForm.bddl,callback:function(t){e.$set(e.setForm,"bddl",t)},expression:"setForm.bddl"}})],1),e._v(" "),l("el-form-item",{attrs:{label:"准确率","label-width":e.formLabelWidth}},[l("el-input",{attrs:{autocomplete:"off",placeholder:"请输入准确率"},model:{value:e.setForm.zqd,callback:function(t){e.$set(e.setForm,"zqd",t)},expression:"setForm.zqd"}})],1),e._v(" "),l("el-form-item",{attrs:{label:"生产厂家","label-width":e.formLabelWidth}},[l("el-input",{attrs:{autocomplete:"off",placeholder:"请输入生产厂家"},model:{value:e.setForm.sccj,callback:function(t){e.$set(e.setForm,"sccj",t)},expression:"setForm.sccj"}})],1),e._v(" "),l("el-form-item",{attrs:{label:"主副表标志","label-width":e.formLabelWidth}},[l("el-input",{attrs:{autocomplete:"off",placeholder:"请输入主副表标志"},model:{value:e.setForm.zfbbz,callback:function(t){e.$set(e.setForm,"zfbbz",t)},expression:"setForm.zfbbz"}})],1),e._v(" "),l("el-form-item",{attrs:{label:"计量点位置","label-width":e.formLabelWidth}},[l("el-input",{attrs:{autocomplete:"off",placeholder:"请输入计量点位置"},model:{value:e.setForm.jldwz,callback:function(t){e.$set(e.setForm,"jldwz",t)},expression:"setForm.jldwz"}})],1),e._v(" "),l("el-form-item",{attrs:{label:"计量点地址","label-width":e.formLabelWidth}},[l("el-input",{attrs:{autocomplete:"off",placeholder:"请输入计量点地址"},model:{value:e.setForm.jlddz,callback:function(t){e.$set(e.setForm,"jlddz",t)},expression:"setForm.jlddz"}})],1),e._v(" "),l("el-form-item",{attrs:{label:"通信规约","label-width":e.formLabelWidth}},[l("el-input",{attrs:{autocomplete:"off",placeholder:"请输入通信规约"},model:{value:e.setForm.txgw,callback:function(t){e.$set(e.setForm,"txgw",t)},expression:"setForm.txgw"}})],1),e._v(" "),l("el-form-item",{attrs:{label:"逻辑地址","label-width":e.formLabelWidth}},[l("el-input",{attrs:{autocomplete:"off",placeholder:"请输入逻辑地址"},model:{value:e.setForm.ljdz,callback:function(t){e.$set(e.setForm,"ljdz",t)},expression:"setForm.ljdz"}})],1),e._v(" "),l("el-form-item",{attrs:{label:"波特率","label-width":e.formLabelWidth}},[l("el-input",{attrs:{autocomplete:"off",placeholder:"请输入波特率"},model:{value:e.setForm.btl,callback:function(t){e.$set(e.setForm,"btl",t)},expression:"setForm.btl"}})],1),e._v(" "),l("el-form-item",{attrs:{label:"计量表箱(柜)","label-width":e.formLabelWidth}},[l("el-input",{attrs:{autocomplete:"off",placeholder:"请输入计量表箱(柜)"},model:{value:e.setForm.jlbx,callback:function(t){e.$set(e.setForm,"jlbx",t)},expression:"setForm.jlbx"}})],1),e._v(" "),l("el-form-item",{attrs:{label:"箱(柜)位置号","label-width":e.formLabelWidth}},[l("el-input",{attrs:{autocomplete:"off",placeholder:"请输入箱(柜)位置号"},model:{value:e.setForm.xgwzh,callback:function(t){e.$set(e.setForm,"xgwzh",t)},expression:"setForm.xgwzh"}})],1),e._v(" "),l("el-form-item",{attrs:{label:"计量装置分类","label-width":e.formLabelWidth}},[l("el-select",{attrs:{clearable:"",placeholder:"请选择计量装置分类"},model:{value:e.setForm.jlzzfl,callback:function(t){e.$set(e.setForm,"jlzzfl",t)},expression:"setForm.jlzzfl"}},e._l(e.setForm.jlzzfl_arr,function(e){return l("el-option",{key:e.value,attrs:{label:e.label,value:e.value}})}))],1),e._v(" "),l("el-form-item",{attrs:{label:"通信方式","label-width":e.formLabelWidth}},[l("el-select",{attrs:{clearable:"",placeholder:"请选择通信方式"},model:{value:e.setForm.txfs,callback:function(t){e.$set(e.setForm,"txfs",t)},expression:"setForm.txfs"}},e._l(e.setForm.txfs_arr,function(e){return l("el-option",{key:e.value,attrs:{label:e.label,value:e.value}})}))],1),e._v(" "),l("el-form-item",{attrs:{label:"计量方式","label-width":e.formLabelWidth}},[l("el-select",{attrs:{clearable:"",placeholder:"请选择计量方式"},model:{value:e.setForm.jlfs,callback:function(t){e.$set(e.setForm,"jlfs",t)},expression:"setForm.jlfs"}},e._l(e.setForm.jlfs_arr,function(e){return l("el-option",{key:e.value,attrs:{label:e.label,value:e.value}})}))],1),e._v(" "),l("el-form-item",{attrs:{label:"设备类别","label-width":e.formLabelWidth}},[l("el-select",{attrs:{clearable:"",placeholder:"请选择设备类别"},model:{value:e.setForm.sblx,callback:function(t){e.$set(e.setForm,"sblx",t)},expression:"setForm.sblx"}},e._l(e.setForm.sblx_arr,function(e){return l("el-option",{key:e.value,attrs:{label:e.label,value:e.value}})}))],1),e._v(" "),l("el-form-item",{attrs:{label:"设备类型","label-width":e.formLabelWidth}},[l("el-select",{attrs:{clearable:"",placeholder:"请选择设备类型"},model:{value:e.setForm.sblx,callback:function(t){e.$set(e.setForm,"sblx",t)},expression:"setForm.sblx"}},e._l(e.setForm.sblx_arr,function(e){return l("el-option",{key:e.value,attrs:{label:e.label,value:e.value}})}))],1)],1)],1),e._v(" "),l("div",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[l("el-button",{on:{click:function(t){e.dialogFormVisible=!1}}},[e._v("取 消")]),e._v(" "),l("el-button",{attrs:{type:"primary"},on:{click:e.handleClickSet}},[e._v("确 定")])],1)],1)],1)])},[],!1,null,"424ce1c6",null);v.options.__file="bulkImport.vue";t.default=v.exports},bHGR:function(e,t,l){"use strict";var a=l("mwPC");l.n(a).a},mwPC:function(e,t,l){}}]);