(window.webpackJsonp=window.webpackJsonp||[]).push([["chunk-efd5"],{"1dlF":function(e,t,a){"use strict";var n=a("EdsV");a.n(n).a},"3SVy":function(e,t,a){},"3q6/":function(e,t,a){"use strict";a.r(t);var n=a("gDS+"),i=a.n(n),r=a("v0iw"),l=a.n(r),o=a("LIjw"),s={name:"Mainstation",data:function(){return{msg:{bianma:"",time:""},readtime:""}},computed:{},mounted:function(){this.$nextTick(function(){this.nowtime})},methods:{nowtime:function(){var e=Date.parse(new Date),t=new Date(e),a=t.getFullYear()+"年",n=(t.getMonth()+1<=10?"0"+(t.getMonth()+1):t.getMonth()+1)+"月",i=(t.getDate()+1<=10?"0"+t.getDate():t.getDate())+"日  ",r=(t.getHours()+1<=10?"0"+t.getHours():t.getHours())+":",l=(t.getMinutes()+1<=10?"0"+t.getMinutes():t.getMinutes())+":",o=t.getSeconds()+1<=10?"0"+t.getSeconds():t.getSeconds();this.readtime=a+n+i+r+l+o,this.$emit("handback",this.msg)},getinformation:function(){}}},c=(a("J6tw"),a("sCux"),a("KHd+")),d=Object(c.a)(s,function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticClass:"mainstation"},[a("div",[a("el-row",{attrs:{gutter:32}},[a("el-col",{attrs:{span:8}},[a("div",{staticClass:"grid-content bg-purple",staticStyle:{position:"relative"}},[a("span",{staticStyle:{"margin-top":"-20px","margin-left":"10px",position:"fixed",top:"-5",left:"10",background:"white"}},[e._v("终端信息")]),e._v(" "),a("div",{staticClass:"outmain"},[a("label",{attrs:{for:""}},[e._v("终端编码：")]),e._v(" "),a("el-input",{staticStyle:{display:"inline-block",width:"200px"},attrs:{type:"text"},model:{value:e.msg.bianma,callback:function(t){e.$set(e.msg,"bianma",t)},expression:"msg.bianma"}})],1)])]),e._v(" "),a("el-col",{attrs:{span:8}},[a("div",{staticClass:"grid-content bg-purple",staticStyle:{position:"relative"}},[a("span",{staticStyle:{"margin-top":"-20px","margin-left":"10px",position:"fixed",top:"-5",left:"10",background:"white"}},[e._v("系统时间：")]),e._v(" "),a("div",{staticClass:"outmain"},[a("el-input",{staticStyle:{display:"inline-block",width:"300px"},attrs:{type:"text"},model:{value:e.readtime,callback:function(t){e.readtime=t},expression:"readtime"}})],1)])]),e._v(" "),a("el-col",{attrs:{span:8}},[a("div",{staticClass:"grid-content bg-purple",staticStyle:{position:"relative"}},[a("span",{staticStyle:{"margin-top":"-20px","margin-left":"10px",position:"fixed",top:"-5",left:"10",background:"white"}},[e._v("等待应答反馈时间/秒")]),e._v(" "),a("div",{staticClass:"outmain"},[a("el-input",{staticStyle:{display:"inline-block",width:"200px"},attrs:{type:"number"},model:{value:e.msg.time,callback:function(t){e.$set(e.msg,"time",t)},expression:"msg.time"}})],1)])])],1)],1)])},[],!1,null,"77a917a9",null);d.options.__file="index.vue";d.exports;var u=a("gHYM"),m=a("xiB2"),p=a("6y/i"),f=a("fe1z"),h=(a("S+eF"),a("p46w"),{components:{Resource1:u.a},data:function(){var e=this;this.$createElement;return{datatimetype:"datetime",operatetype:[],isSelecttime:!0,isCollapse:!0,data1:[],value:[],renderFunc:function(e,t){return e("span",[t.label])},currentPage:1,total:20,pageSize:10,activeName:"second",formInline:{protocol:"30",user:"",vcaddr:"",datatype:"",operation:"",start:"1",end:"1",jiange:"",starttime:"",endtime:"",route:"tcp"},pickerBeginDateBefore:{disabledDate:function(t){return e.formInline.endtime?t.getTime()>new Date(e.formInline.endtime).getTime():t.getTime()>Date.now()-864e4}},pickerBeginDateAfter:{disabledDate:function(t){return e.formInline.starttime?t.getTime()>Date.now()||t.getTime()<new Date(e.formInline.starttime).getTime():t.getTime()>Date.now()-864e4}},operation:"",datatype:[],dialogTableVisible:!1,radio:3,data:[],defaultProps:{children:"children",label:"name",isLeaf:"leaf"},tableData1:[],searchvalue:"",departmentid:"",userForm:{usertype:"",searchtype:"",userhh:"",username:"",zdjh:"",ljdz:""},selectdata:[],session:"",data2:{},originrecivedata:[],gridData1:[]}},computed:{treeData:function(){var e=JSON.parse(i()(this.data));return e.filter(function(t){var a=e.filter(function(e){return t.objectId==e.ParentId});return a.length>0&&(t.children=a),a.length>0&&(t.leaf=!0),0==t.ParentId})}},mounted:function(){this.getOperate(),this.session=sessionStorage.getItem("token"),console.log(this.datatype)},methods:{protocolChange:function(e){20==e?(this.datatimetype="date",this.formInline.operation=this.operatetype[2].id,this.firstchange(this.operatetype[2].id)):(this.datatimetype="datetime",this.formInline.operation=this.operatetype[1].id,this.firstchange(this.operatetype[1].id))},getOperate:function(){var e=this,t=l.a.Object.extend("MainStationIndex"),a=new l.a.Query(t);a.startsWith("name","C."),a.ascending("name"),a.find().then(function(t){e.operatetype=t,e.formInline.operation=t[1].id,e.firstchange(t[1].id)})},handleClick:function(){},handleClose:function(){this.dialogTableVisible=!1},firstchange:function(e){var t=this;this.formInline.datatype="",this.datatype=[];var a=l.a.Object.extend("MainStationIndex"),n=new l.a.Query(a);n.equalTo("objectId",e),n.find().then(function(e){e.map(function(e){e.attributes.leafs.map(function(a){var n={label:a,modelindex:e.attributes.sendtype,key:a};t.datatype.push(n)}),t.formInline.datatype=t.datatype[0].key,t.dataselect(t.datatype[0].key)})})},getcheck:function(e,t){this.getMainstation(e.objectId)},test:function(){this.formInline={protocol:"30",user:"",vcaddr:"",datatype:"",operation:"",start:"1",end:"1",jiange:"",starttime:new Date,endtime:new Date,route:"tcp"},this.getOperate()},getValue:function(){var e=this;if(this.gridData1.length=0,0==this.selectdata.length)this.$message({type:"warning",message:"请选择数据项标识"});else if(0==m.a.connState)this.$message({type:"warning",message:"正在重新连接，请稍后"});else if(""==this.formInline.vcaddr)this.$message({type:"warning",message:"请挑选集中器或电表"});else{var t=this;m.a.originrecivedata=[];var a=Math.ceil(25*Math.random()),n=String.fromCharCode(65+a)+Math.ceil(1e5*Math.random());p.a.$on(n,function(e){t.gridData1=[],e.data.map(function(a){m.b.map(function(n){a.di==n.key&&t.gridData1.unshift({di:a.di,pn:a.pn,value:i()(a.value),vcaddr:e.vcaddr,ts:Object(f.n)(a.ts),meteraddr:a.meteraddr,diname:n.label,time:a.time,status:a.status})})})}),this.formInline.route="tcp",Object(o.b)(this.formInline.vcaddr,this.session,n,this.operation,this.formInline.start,this.formInline.end,Math.ceil(this.formInline.starttime/1e3),Math.ceil(this.formInline.endtime/1e3),this.formInline.route,this.formInline.protocol,this.selectdata).then(function(t){t&&(e.dialogTableVisible=!0)}).catch(function(t){e.$message({type:"error",message:t.error})})}},handleChange:function(e){this.selectdata=e},meterdetail:function(e){var t=this;if("集中器"!=e.icon&&"电表"!=e.icon)this.$message({type:"warning",message:"请挑选集中器或电表"});else if("集中器"==e.icon)this.formInline.vcaddr=e.alias,this.formInline.start=1,this.formInline.end=1;else if("电表"==e.icon){var a=l.a.Object.extend("Smartmeter");new l.a.Query(a).get(e.objectId).then(function(e){t.formInline.vcaddr=e.attributes.vcaddr_web,t.formInline.start=e.attributes.pn,t.formInline.end=e.attributes.pn},function(e){t.$message({type:"error",message:e.error})})}},handleSizeChange:function(e){this.currentPage=1,this.pageSize=e},handleCurrentChange:function(e){this.currentPage=e},getMainstation:function(e){var t=this;this.session=l.a.User.current().attributes.sessionToken;var a=l.a.Object.extend("Department"),n=new l.a.Query(a);n.equalTo("ParentId",e),n.limit(1e4),n.find().then(function(e){e.map(function(e){var a={};e.createtime=new Date(e.attributes.createdAt).toLocaleDateString(),a.name=e.attributes.name,a.ParentId=e.attributes.ParentId,a.objectId=e.id,a.level=e.attributes.level,a.createtime=e.createtime,a.alias=e.attributes.alias,a.leaf=e.attributes.leafnode,a.icon=e.attributes.org_type,t.data.push(a)})},function(e){"209"==e.code?(t.$message({type:"warning",message:"登陆权限过期，请重新登录"}),t.$router.push({path:"/login"})):t.$message.error(e.message)})},dataselect:function(e){var t=this;if(m.b.length=0,this.value=[],this.data1=[],this.datatype.map(function(a){e==a.label&&(t.operation=a.modelindex)}),30==this.formInline.protocol){var a=l.a.Object.extend("DataItem"),n=new l.a.Query(a);n.equalTo("leafname",e),n.limit(1e3),n.ascending("itemCode"),n.find().then(function(e){e.map(function(e){var a={label:e.attributes.itemName,key:e.attributes.itemCode};t.data1.push(a),m.b.push(a)})})}else{var i=l.a.Object.extend("DataItemGW"),r=new l.a.Query(i);r.equalTo("leafname",e),r.limit(1e3),r.ascending("itemCode"),r.find().then(function(e){e.map(function(e){var a={label:e.attributes.itemname,key:e.attributes.itemCode};t.data1.push(a),m.b.push(a)})})}"c.3"==this.operation||"c.4"==this.operation?(this.isSelecttime=!1,this.formInline.starttime=new Date((new Date).setHours(0,0,0,0)-864e5),this.formInline.endtime=new Date):"c.2"==this.operation&&(this.isSelecttime=!0,this.formInline.endtime=(new Date).getTime(),this.formInline.starttime=this.formInline.endtime-2538e5)}}}),g=(a("Gw6L"),a("1dlF"),a("VF55"),Object(c.a)(h,function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticClass:"mainstations"},[a("Resource1",{staticStyle:{width:"360px",height:"100vh",overflow:"scroll","flex-shrink":"0",padding:"10px"},on:{meterdetail:e.meterdetail}}),e._v(" "),"second"==e.activeName?a("div",{staticClass:"secondcard",staticStyle:{"min-height":"875px","border-left":"2px solid #156FAE",background:"#f6fbff"}},[a("div",{staticStyle:{width:"100%",height:"auto",padding:"20px","box-sizing":"border-box"}},[a("div",{staticClass:"blockcontent"},[a("el-form",{staticClass:"demo-form-inline",attrs:{inline:!0,model:e.formInline,"label-width":"120px"}},[a("el-form-item",{attrs:{label:"操作类型:"}},[a("el-select",{staticStyle:{width:"150px"},attrs:{placeholder:"操作类型"},on:{change:e.firstchange},model:{value:e.formInline.operation,callback:function(t){e.$set(e.formInline,"operation",t)},expression:"formInline.operation"}},e._l(e.operatetype,function(e,t){return a("el-option",{key:t,attrs:{label:e.attributes.webtype,value:e.id}})}))],1),e._v(" "),a("el-form-item",{attrs:{label:"终端逻辑地址:"}},[a("el-input",{staticStyle:{width:"150px"},attrs:{placeholder:"终端逻辑地址"},model:{value:e.formInline.vcaddr,callback:function(t){e.$set(e.formInline,"vcaddr",t)},expression:"formInline.vcaddr"}})],1),e._v(" "),a("el-form-item",{attrs:{label:"规约名称:"}},[a("el-select",{staticStyle:{width:"150px"},attrs:{placeholder:"规约类型"},on:{change:e.protocolChange},model:{value:e.formInline.protocol,callback:function(t){e.$set(e.formInline,"protocol",t)},expression:"formInline.protocol"}},[a("el-option",{attrs:{label:"南网上行通信规约",value:"30"}}),e._v(" "),a("el-option",{attrs:{label:"国网通信规约",value:"20"}})],1)],1),e._v(" "),a("el-form-item",{attrs:{label:"数据类型:"}},[a("el-select",{staticStyle:{width:"150px"},attrs:{placeholder:"数据类型"},on:{change:e.dataselect},model:{value:e.formInline.datatype,callback:function(t){e.$set(e.formInline,"datatype",t)},expression:"formInline.datatype"}},e._l(e.datatype,function(e,t){return a("el-option",{key:t,attrs:{label:e.label,value:e.key}})}))],1),e._v(" "),a("el-form-item",{attrs:{label:"通道类型:"}},[a("el-select",{staticStyle:{width:"150px"},attrs:{placeholder:"数据类型"},model:{value:e.formInline.route,callback:function(t){e.$set(e.formInline,"route",t)},expression:"formInline.route"}},[a("el-option",{attrs:{label:"默认",value:"tcp"}}),e._v(" "),a("el-option",{attrs:{label:"无线",value:"tcp1"}}),e._v(" "),a("el-option",{attrs:{label:"载波",value:"tcp2"}})],1)],1),e._v(" "),a("el-form-item",{attrs:{label:"开始测量点号:"}},[a("el-input",{staticStyle:{width:"150px"},attrs:{placeholder:"开始测量点号",type:"number",min:1,max:2048},model:{value:e.formInline.start,callback:function(t){e.$set(e.formInline,"start",t)},expression:"formInline.start"}})],1),e._v(" "),a("el-form-item",{attrs:{label:"结束测量点号:"}},[a("el-input",{staticStyle:{width:"150px"},attrs:{placeholder:"结束测量点号",type:"number",min:1,max:2048},model:{value:e.formInline.end,callback:function(t){e.$set(e.formInline,"end",t)},expression:"formInline.end"}})],1),e._v(" "),a("el-form-item",{attrs:{label:"开始时间:"}},[a("el-date-picker",{staticStyle:{width:"150px"},attrs:{type:e.datatimetype,placeholder:"选择开始时间","value-format":"timestamp","picker-options":e.pickerBeginDateBefore},model:{value:e.formInline.starttime,callback:function(t){e.$set(e.formInline,"starttime",t)},expression:"formInline.starttime"}})],1),e._v(" "),a("el-form-item",{attrs:{label:"结束时间:"}},[a("el-date-picker",{staticStyle:{width:"150px"},attrs:{type:e.datatimetype,placeholder:"选择结束时间","value-format":"timestamp","picker-options":e.pickerBeginDateAfter},model:{value:e.formInline.endtime,callback:function(t){e.$set(e.formInline,"endtime",t)},expression:"formInline.endtime"}})],1)],1)],1),e._v(" "),a("div",{staticClass:"blockfooter"},[a("el-button",{attrs:{type:"primary"},on:{click:e.getValue}},[e._v("召测")]),e._v(" "),a("el-button",{attrs:{type:"primary"},on:{click:e.test}},[e._v("重置")])],1),e._v(" "),a("div",{staticStyle:{height:"8px",width:"100%",background:"#ffffff"}}),e._v(" "),a("div",{staticClass:"blockall",staticStyle:{"text-align":"center",height:"auto"}},[a("el-transfer",{staticStyle:{"text-align":"left",display:"inline-block","margin-top":"20px"},attrs:{"render-content":e.renderFunc,titles:["数据标识DI","选定查询数据项"],"button-texts":["删除","添加"],format:{noChecked:"${total}",hasChecked:"${checked}/${total}"},data:e.data1},on:{change:e.handleChange},model:{value:e.value,callback:function(t){e.value=t},expression:"value"}})],1)])]):e._e(),e._v(" "),a("el-dialog",{attrs:{title:"召测数据",visible:e.dialogTableVisible,"close-on-click-modal":!1,"before-close":e.handleClose,width:"82%"},on:{"update:visible":function(t){e.dialogTableVisible=t}}},[a("el-table",{staticStyle:{width:"100%","margin-top":"10px"},attrs:{data:e.gridData1.slice((e.currentPage-1)*e.pageSize,e.currentPage*e.pageSize),height:"400"}},[a("el-table-column",{attrs:{label:"序号",type:"index",width:"50",align:"center"}}),e._v(" "),a("el-table-column",{attrs:{property:"vcaddr",label:"终端逻辑地址",width:"120",align:"center"}}),e._v(" "),a("el-table-column",{attrs:{property:"pn",label:"测量点号",width:"100",align:"center"}}),e._v(" "),a("el-table-column",{attrs:{property:"meteraddr",label:"电表地址",align:"center"}}),e._v(" "),a("el-table-column",{attrs:{property:"diname",label:"数据项标识",width:"250",align:"center"}}),e._v(" "),a("el-table-column",{attrs:{property:"value",label:"数据",align:"center"}}),e._v(" "),a("el-table-column",{attrs:{property:"time",label:"冻结日期",align:"center","show-overflow-tooltip":""}}),e._v(" "),a("el-table-column",{attrs:{property:"ts",label:"时间",width:"200",align:"center"}}),e._v(" "),a("el-table-column",{attrs:{label:"状态",align:"center"},scopedSlots:e._u([{key:"default",fn:function(t){return[1==t.row.status?a("span",{staticStyle:{color:"green"}},[e._v("完成")]):0==t.row.status?a("span",{staticStyle:{color:"green"}},[e._v("召测中")]):3==t.row.status?a("span",{staticStyle:{color:"red"}},[e._v("无档案")]):a("span",{staticStyle:{color:"red"}},[e._v("超时")])]}}])})],1),e._v(" "),a("div",{staticClass:"block",staticStyle:{"margin-top":"15px"}},[a("el-pagination",{attrs:{align:"center","current-page":e.currentPage,"page-sizes":[1,5,10,20],"page-size":e.pageSize,layout:"total, sizes, prev, pager, next, jumper",total:e.gridData1.length},on:{"size-change":e.handleSizeChange,"current-change":e.handleCurrentChange}})],1)],1)],1)},[],!1,null,"1d673ad2",null));g.options.__file="jia.vue";t.default=g.exports},"8Utz":function(e,t,a){},EdsV:function(e,t,a){},Gw6L:function(e,t,a){"use strict";var n=a("nkv8");a.n(n).a},J6tw:function(e,t,a){"use strict";var n=a("3SVy");a.n(n).a},LIjw:function(e,t,a){"use strict";a.d(t,"b",function(){return i}),a.d(t,"a",function(){return r});var n=a("t3Un");function i(e,t,a,i,r,l,o,s,c,d,u){return Object(n.a)({url:"/readdata",method:"POST",params:{from:"web",vcaddr:e,session:t,operation:a,datatype:i,pn_start:r,pn_end:l,starttime:o,endtime:s,route:c,protocol:d},data:{dis:u}})}function r(e,t,a,i){return Object(n.a)({url:"/measured_point/control",method:"POST",params:{vcaddr:e.vcaddr,from:"web",session:t,operation:a,control:i,datatype:e.datatype,protocol:e.protocol,route:e.route,pn:e.pn,meteraddr:e.meteraddr}})}},"RU/L":function(e,t,a){a("Rqdy");var n=a("WEpk").Object;e.exports=function(e,t,a){return n.defineProperty(e,t,a)}},Rqdy:function(e,t,a){var n=a("Y7ZC");n(n.S+n.F*!a("jmDH"),"Object",{defineProperty:a("2faE").f})},SEkw:function(e,t,a){e.exports={default:a("RU/L"),__esModule:!0}},VF55:function(e,t,a){"use strict";var n=a("n3He");a.n(n).a},YEIV:function(e,t,a){"use strict";t.__esModule=!0;var n=function(e){return e&&e.__esModule?e:{default:e}}(a("SEkw"));t.default=function(e,t,a){return t in e?(0,n.default)(e,t,{value:a,enumerable:!0,configurable:!0,writable:!0}):e[t]=a,e}},n3He:function(e,t,a){},nkv8:function(e,t,a){},sCux:function(e,t,a){"use strict";var n=a("8Utz");a.n(n).a}}]);