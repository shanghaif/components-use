(window.webpackJsonp=window.webpackJsonp||[]).push([["chunk-6fb4"],{"1dlF":function(e,t,n){"use strict";var i=n("EdsV");n.n(i).a},"3SVy":function(e,t,n){},"3q6/":function(e,t,n){"use strict";n.r(t);var i=n("gDS+"),a=n.n(i),o=n("v0iw"),s=n.n(o),r=n("LIjw"),l={name:"Mainstation",data:function(){return{msg:{bianma:"",time:""},readtime:""}},computed:{},mounted:function(){this.$nextTick(function(){this.nowtime})},methods:{nowtime:function(){var e=Date.parse(new Date),t=new Date(e),n=t.getFullYear()+"年",i=(t.getMonth()+1<=10?"0"+(t.getMonth()+1):t.getMonth()+1)+"月",a=(t.getDate()+1<=10?"0"+t.getDate():t.getDate())+"日  ",o=(t.getHours()+1<=10?"0"+t.getHours():t.getHours())+":",s=(t.getMinutes()+1<=10?"0"+t.getMinutes():t.getMinutes())+":",r=t.getSeconds()+1<=10?"0"+t.getSeconds():t.getSeconds();this.readtime=n+i+a+o+s+r,this.$emit("handback",this.msg)},getinformation:function(){}}},c=(n("J6tw"),n("sCux"),n("KHd+")),d=Object(c.a)(l,function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticClass:"mainstation"},[n("div",[n("el-row",{attrs:{gutter:32}},[n("el-col",{attrs:{span:8}},[n("div",{staticClass:"grid-content bg-purple",staticStyle:{position:"relative"}},[n("span",{staticStyle:{"margin-top":"-20px","margin-left":"10px",position:"fixed",top:"-5",left:"10",background:"white"}},[e._v("终端信息")]),e._v(" "),n("div",{staticClass:"outmain"},[n("label",{attrs:{for:""}},[e._v("终端编码：")]),e._v(" "),n("el-input",{staticStyle:{display:"inline-block",width:"200px"},attrs:{type:"text"},model:{value:e.msg.bianma,callback:function(t){e.$set(e.msg,"bianma",t)},expression:"msg.bianma"}})],1)])]),e._v(" "),n("el-col",{attrs:{span:8}},[n("div",{staticClass:"grid-content bg-purple",staticStyle:{position:"relative"}},[n("span",{staticStyle:{"margin-top":"-20px","margin-left":"10px",position:"fixed",top:"-5",left:"10",background:"white"}},[e._v("系统时间：")]),e._v(" "),n("div",{staticClass:"outmain"},[n("el-input",{staticStyle:{display:"inline-block",width:"300px"},attrs:{type:"text"},model:{value:e.readtime,callback:function(t){e.readtime=t},expression:"readtime"}})],1)])]),e._v(" "),n("el-col",{attrs:{span:8}},[n("div",{staticClass:"grid-content bg-purple",staticStyle:{position:"relative"}},[n("span",{staticStyle:{"margin-top":"-20px","margin-left":"10px",position:"fixed",top:"-5",left:"10",background:"white"}},[e._v("等待应答反馈时间/秒")]),e._v(" "),n("div",{staticClass:"outmain"},[n("el-input",{staticStyle:{display:"inline-block",width:"200px"},attrs:{type:"number"},model:{value:e.msg.time,callback:function(t){e.$set(e.msg,"time",t)},expression:"msg.time"}})],1)])])],1)],1)])},[],!1,null,"77a917a9",null);d.options.__file="index.vue";d.exports;var u=n("gHYM"),p=n("xiB2"),m=n("6y/i"),f=n("fe1z"),h=(n("S+eF"),n("p46w"),{components:{Resource1:u.a},data:function(){var e=this;this.$createElement;return{datatimetype:"datetime",operatetype:[],isSelecttime:!0,isCollapse:!0,data1:[],value:[],renderFunc:function(e,t){return e("span",[t.label])},currentPage:1,total:20,pageSize:10,activeName:"second",formInline:{protocol:"30",user:"",vcaddr:"",datatype:"",operation:"",start:"1",end:"1",jiange:"",starttime:"",endtime:"",route:"tcp"},pickerBeginDateBefore:{disabledDate:function(t){return e.formInline.endtime?t.getTime()>new Date(e.formInline.endtime).getTime():t.getTime()>Date.now()-864e4}},pickerBeginDateAfter:{disabledDate:function(t){return e.formInline.starttime?t.getTime()>Date.now()||t.getTime()<new Date(e.formInline.starttime).getTime():t.getTime()>Date.now()-864e4}},operation:"",datatype:[],dialogTableVisible:!1,radio:3,data:[],defaultProps:{children:"children",label:"name",isLeaf:"leaf"},tableData1:[],searchvalue:"",departmentid:"",userForm:{usertype:"",searchtype:"",userhh:"",username:"",zdjh:"",ljdz:""},selectdata:[],session:"",data2:{},originrecivedata:[],gridData1:[]}},computed:{treeData:function(){var e=JSON.parse(a()(this.data));return e.filter(function(t){var n=e.filter(function(e){return t.objectId==e.ParentId});return n.length>0&&(t.children=n),n.length>0&&(t.leaf=!0),0==t.ParentId})}},mounted:function(){this.getOperate(),this.session=sessionStorage.getItem("token"),console.log(this.datatype)},methods:{protocolChange:function(e){20==e?(this.datatimetype="date",this.formInline.operation=this.operatetype[2].id,this.firstchange(this.operatetype[2].id)):(this.datatimetype="datetime",this.formInline.operation=this.operatetype[1].id,this.firstchange(this.operatetype[1].id))},getOperate:function(){var e=this,t=s.a.Object.extend("MainStationIndex"),n=new s.a.Query(t);n.startsWith("name","C."),n.ascending("name"),n.find().then(function(t){e.operatetype=t,e.formInline.operation=t[1].id,e.firstchange(t[1].id)})},handleClick:function(){},handleClose:function(){this.dialogTableVisible=!1},firstchange:function(e){var t=this;this.formInline.datatype="",this.datatype=[];var n=s.a.Object.extend("MainStationIndex"),i=new s.a.Query(n);i.equalTo("objectId",e),i.find().then(function(e){e.map(function(e){e.attributes.leafs.map(function(n){var i={label:n,modelindex:e.attributes.sendtype,key:n};t.datatype.push(i)}),t.formInline.datatype=t.datatype[0].key,t.dataselect(t.datatype[0].key)})})},getcheck:function(e,t){this.getMainstation(e.objectId)},test:function(){this.formInline={protocol:"30",user:"",vcaddr:"",datatype:"",operation:"",start:"1",end:"1",jiange:"",starttime:new Date,endtime:new Date,route:"tcp"},this.getOperate()},getValue:function(){var e=this;if(this.gridData1.length=0,0==this.selectdata.length)this.$message({type:"warning",message:"请选择数据项标识"});else if(0==p.a.connState)this.$message({type:"warning",message:"正在重新连接，请稍后"});else if(""==this.formInline.vcaddr)this.$message({type:"warning",message:"请挑选集中器或电表"});else{var t=this;p.a.originrecivedata=[];var n=Math.ceil(25*Math.random()),i=String.fromCharCode(65+n)+Math.ceil(1e5*Math.random());m.a.$on(i,function(e){t.gridData1=[],e.data.map(function(n){p.b.map(function(i){n.di==i.key&&t.gridData1.unshift({di:n.di,pn:n.pn,value:a()(n.value),vcaddr:e.vcaddr,ts:Object(f.n)(n.ts),meteraddr:n.meteraddr,diname:i.label,time:n.time,status:n.status})})})}),this.formInline.route="tcp",Object(r.b)(this.formInline.vcaddr,this.session,i,this.operation,this.formInline.start,this.formInline.end,Math.ceil(this.formInline.starttime/1e3),Math.ceil(this.formInline.endtime/1e3),this.formInline.route,this.formInline.protocol,this.selectdata).then(function(t){t&&(e.dialogTableVisible=!0)}).catch(function(t){e.$message({type:"error",message:t.error})})}},handleChange:function(e){this.selectdata=e},meterdetail:function(e){var t=this;if("集中器"!=e.icon&&"电表"!=e.icon)this.$message({type:"warning",message:"请挑选集中器或电表"});else if("集中器"==e.icon)this.formInline.vcaddr=e.alias,this.formInline.start=1,this.formInline.end=1;else if("电表"==e.icon){var n=s.a.Object.extend("Smartmeter");new s.a.Query(n).get(e.objectId).then(function(e){t.formInline.vcaddr=e.attributes.vcaddr_web,t.formInline.start=e.attributes.pn,t.formInline.end=e.attributes.pn},function(e){t.$message({type:"error",message:e.error})})}},handleSizeChange:function(e){this.currentPage=1,this.pageSize=e},handleCurrentChange:function(e){this.currentPage=e},getMainstation:function(e){var t=this;this.session=s.a.User.current().attributes.sessionToken;var n=s.a.Object.extend("Department"),i=new s.a.Query(n);i.equalTo("ParentId",e),i.limit(1e4),i.find().then(function(e){e.map(function(e){var n={};e.createtime=new Date(e.attributes.createdAt).toLocaleDateString(),n.name=e.attributes.name,n.ParentId=e.attributes.ParentId,n.objectId=e.id,n.level=e.attributes.level,n.createtime=e.createtime,n.alias=e.attributes.alias,n.leaf=e.attributes.leafnode,n.icon=e.attributes.org_type,t.data.push(n)})},function(e){"209"==e.code?(t.$message({type:"warning",message:"登陆权限过期，请重新登录"}),t.$router.push({path:"/login"})):t.$message.error(e.message)})},dataselect:function(e){var t=this;if(p.b.length=0,this.value=[],this.data1=[],this.datatype.map(function(n){e==n.label&&(t.operation=n.modelindex)}),30==this.formInline.protocol){var n=s.a.Object.extend("DataItem"),i=new s.a.Query(n);i.equalTo("leafname",e),i.limit(1e3),i.ascending("itemCode"),i.find().then(function(e){e.map(function(e){var n={label:e.attributes.itemName,key:e.attributes.itemCode};t.data1.push(n),p.b.push(n)})})}else{var a=s.a.Object.extend("DataItemGW"),o=new s.a.Query(a);o.equalTo("leafname",e),o.limit(1e3),o.ascending("itemCode"),o.find().then(function(e){e.map(function(e){var n={label:e.attributes.itemname,key:e.attributes.itemCode};t.data1.push(n),p.b.push(n)})})}"c.3"==this.operation||"c.4"==this.operation?(this.isSelecttime=!1,this.formInline.starttime=new Date((new Date).setHours(0,0,0,0)-864e5),this.formInline.endtime=new Date):"c.2"==this.operation&&(this.isSelecttime=!0,this.formInline.endtime=(new Date).getTime(),this.formInline.starttime=this.formInline.endtime-2538e5)}}}),g=(n("Gw6L"),n("1dlF"),n("VF55"),Object(c.a)(h,function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticClass:"mainstations"},[n("Resource1",{staticStyle:{width:"360px",height:"100vh",overflow:"scroll","flex-shrink":"0",padding:"10px"},on:{meterdetail:e.meterdetail}}),e._v(" "),"second"==e.activeName?n("div",{staticClass:"secondcard",staticStyle:{"min-height":"875px","border-left":"2px solid #156FAE",background:"#f6fbff"}},[n("div",{staticStyle:{width:"100%",height:"auto",padding:"20px","box-sizing":"border-box"}},[n("div",{staticClass:"blockcontent"},[n("el-form",{staticClass:"demo-form-inline",attrs:{inline:!0,model:e.formInline,"label-width":"120px"}},[n("el-form-item",{attrs:{label:"操作类型:"}},[n("el-select",{staticStyle:{width:"150px"},attrs:{placeholder:"操作类型"},on:{change:e.firstchange},model:{value:e.formInline.operation,callback:function(t){e.$set(e.formInline,"operation",t)},expression:"formInline.operation"}},e._l(e.operatetype,function(e,t){return n("el-option",{key:t,attrs:{label:e.attributes.webtype,value:e.id}})}))],1),e._v(" "),n("el-form-item",{attrs:{label:"终端逻辑地址:"}},[n("el-input",{staticStyle:{width:"150px"},attrs:{placeholder:"终端逻辑地址"},model:{value:e.formInline.vcaddr,callback:function(t){e.$set(e.formInline,"vcaddr",t)},expression:"formInline.vcaddr"}})],1),e._v(" "),n("el-form-item",{attrs:{label:"规约名称:"}},[n("el-select",{staticStyle:{width:"150px"},attrs:{placeholder:"规约类型"},on:{change:e.protocolChange},model:{value:e.formInline.protocol,callback:function(t){e.$set(e.formInline,"protocol",t)},expression:"formInline.protocol"}},[n("el-option",{attrs:{label:"南网上行通信规约",value:"30"}}),e._v(" "),n("el-option",{attrs:{label:"国网通信规约",value:"20"}})],1)],1),e._v(" "),n("el-form-item",{attrs:{label:"数据类型:"}},[n("el-select",{staticStyle:{width:"150px"},attrs:{placeholder:"数据类型"},on:{change:e.dataselect},model:{value:e.formInline.datatype,callback:function(t){e.$set(e.formInline,"datatype",t)},expression:"formInline.datatype"}},e._l(e.datatype,function(e,t){return n("el-option",{key:t,attrs:{label:e.label,value:e.key}})}))],1),e._v(" "),n("el-form-item",{attrs:{label:"通道类型:"}},[n("el-select",{staticStyle:{width:"150px"},attrs:{placeholder:"数据类型"},model:{value:e.formInline.route,callback:function(t){e.$set(e.formInline,"route",t)},expression:"formInline.route"}},[n("el-option",{attrs:{label:"默认",value:"tcp"}}),e._v(" "),n("el-option",{attrs:{label:"无线",value:"tcp1"}}),e._v(" "),n("el-option",{attrs:{label:"载波",value:"tcp2"}})],1)],1),e._v(" "),n("el-form-item",{attrs:{label:"开始测量点号:"}},[n("el-input",{staticStyle:{width:"150px"},attrs:{placeholder:"开始测量点号",type:"number",min:1,max:2048},model:{value:e.formInline.start,callback:function(t){e.$set(e.formInline,"start",t)},expression:"formInline.start"}})],1),e._v(" "),n("el-form-item",{attrs:{label:"结束测量点号:"}},[n("el-input",{staticStyle:{width:"150px"},attrs:{placeholder:"结束测量点号",type:"number",min:1,max:2048},model:{value:e.formInline.end,callback:function(t){e.$set(e.formInline,"end",t)},expression:"formInline.end"}})],1),e._v(" "),n("el-form-item",{attrs:{label:"开始时间:"}},[n("el-date-picker",{staticStyle:{width:"150px"},attrs:{type:e.datatimetype,placeholder:"选择开始时间","value-format":"timestamp","picker-options":e.pickerBeginDateBefore},model:{value:e.formInline.starttime,callback:function(t){e.$set(e.formInline,"starttime",t)},expression:"formInline.starttime"}})],1),e._v(" "),n("el-form-item",{attrs:{label:"结束时间:"}},[n("el-date-picker",{staticStyle:{width:"150px"},attrs:{type:e.datatimetype,placeholder:"选择结束时间","value-format":"timestamp","picker-options":e.pickerBeginDateAfter},model:{value:e.formInline.endtime,callback:function(t){e.$set(e.formInline,"endtime",t)},expression:"formInline.endtime"}})],1)],1)],1),e._v(" "),n("div",{staticClass:"blockfooter"},[n("el-button",{attrs:{type:"primary"},on:{click:e.getValue}},[e._v("召测")]),e._v(" "),n("el-button",{attrs:{type:"primary"},on:{click:e.test}},[e._v("重置")])],1),e._v(" "),n("div",{staticStyle:{height:"8px",width:"100%",background:"#ffffff"}}),e._v(" "),n("div",{staticClass:"blockall",staticStyle:{"text-align":"center",height:"auto"}},[n("el-transfer",{staticStyle:{"text-align":"left",display:"inline-block","margin-top":"20px"},attrs:{"render-content":e.renderFunc,titles:["数据标识DI","选定查询数据项"],"button-texts":["删除","添加"],format:{noChecked:"${total}",hasChecked:"${checked}/${total}"},data:e.data1},on:{change:e.handleChange},model:{value:e.value,callback:function(t){e.value=t},expression:"value"}})],1)])]):e._e(),e._v(" "),n("el-dialog",{attrs:{title:"召测数据",visible:e.dialogTableVisible,"close-on-click-modal":!1,"before-close":e.handleClose,width:"82%"},on:{"update:visible":function(t){e.dialogTableVisible=t}}},[n("el-table",{staticStyle:{width:"100%","margin-top":"10px"},attrs:{data:e.gridData1.slice((e.currentPage-1)*e.pageSize,e.currentPage*e.pageSize),height:"400"}},[n("el-table-column",{attrs:{label:"序号",type:"index",width:"50",align:"center"}}),e._v(" "),n("el-table-column",{attrs:{property:"vcaddr",label:"终端逻辑地址",width:"120",align:"center"}}),e._v(" "),n("el-table-column",{attrs:{property:"pn",label:"测量点号",width:"100",align:"center"}}),e._v(" "),n("el-table-column",{attrs:{property:"meteraddr",label:"电表地址",align:"center"}}),e._v(" "),n("el-table-column",{attrs:{property:"diname",label:"数据项标识",width:"250",align:"center"}}),e._v(" "),n("el-table-column",{attrs:{property:"value",label:"数据",align:"center"}}),e._v(" "),n("el-table-column",{attrs:{property:"time",label:"冻结日期",align:"center","show-overflow-tooltip":""}}),e._v(" "),n("el-table-column",{attrs:{property:"ts",label:"时间",width:"200",align:"center"}}),e._v(" "),n("el-table-column",{attrs:{label:"状态",align:"center"},scopedSlots:e._u([{key:"default",fn:function(t){return[1==t.row.status?n("span",{staticStyle:{color:"green"}},[e._v("完成")]):0==t.row.status?n("span",{staticStyle:{color:"green"}},[e._v("召测中")]):3==t.row.status?n("span",{staticStyle:{color:"red"}},[e._v("无档案")]):n("span",{staticStyle:{color:"red"}},[e._v("超时")])]}}])})],1),e._v(" "),n("div",{staticClass:"block",staticStyle:{"margin-top":"15px"}},[n("el-pagination",{attrs:{align:"center","current-page":e.currentPage,"page-sizes":[1,5,10,20],"page-size":e.pageSize,layout:"total, sizes, prev, pager, next, jumper",total:e.gridData1.length},on:{"size-change":e.handleSizeChange,"current-change":e.handleCurrentChange}})],1)],1)],1)},[],!1,null,"1d673ad2",null));g.options.__file="jia.vue";t.default=g.exports},"8Utz":function(e,t,n){},EdsV:function(e,t,n){},Gw6L:function(e,t,n){"use strict";var i=n("nkv8");n.n(i).a},J6tw:function(e,t,n){"use strict";var i=n("3SVy");n.n(i).a},LIjw:function(e,t,n){"use strict";n.d(t,"b",function(){return a}),n.d(t,"a",function(){return o});var i=n("t3Un");function a(e,t,n,a,o,s,r,l,c,d,u){return Object(i.a)({url:"/readdata",method:"POST",params:{from:"web",vcaddr:e,session:t,operation:n,datatype:a,pn_start:o,pn_end:s,starttime:r,endtime:l,route:c,protocol:d},data:{dis:u}})}function o(e,t,n,a){return Object(i.a)({url:"/measured_point/control",method:"POST",params:{vcaddr:e.vcaddr,from:"web",session:t,operation:n,control:a,datatype:e.datatype,protocol:e.protocol,route:e.route,pn:e.pn,meteraddr:e.meteraddr}})}},"RU/L":function(e,t,n){n("Rqdy");var i=n("WEpk").Object;e.exports=function(e,t,n){return i.defineProperty(e,t,n)}},Rqdy:function(e,t,n){var i=n("Y7ZC");i(i.S+i.F*!n("jmDH"),"Object",{defineProperty:n("2faE").f})},SEkw:function(e,t,n){e.exports={default:n("RU/L"),__esModule:!0}},VF55:function(e,t,n){"use strict";var i=n("n3He");n.n(i).a},YEIV:function(e,t,n){"use strict";t.__esModule=!0;var i=function(e){return e&&e.__esModule?e:{default:e}}(n("SEkw"));t.default=function(e,t,n){return t in e?(0,i.default)(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}},n3He:function(e,t,n){},nkv8:function(e,t,n){},sCux:function(e,t,n){"use strict";var i=n("8Utz");n.n(i).a},xiB2:function(e,t,n){"use strict";n.d(t,"a",function(){return c}),n.d(t,"b",function(){return r}),n.d(t,"c",function(){return o});var i=sessionStorage.getItem("token"),a={topic:"web/"+i,qos:2};function o(e){a={topic:"web/"+(i=e),qos:2}}function s(e,t){/(y+)/.test(t)&&(t=t.replace(RegExp.$1,(e.getFullYear()+"").substr(4-RegExp.$1.length)));var n={"M+":e.getMonth()+1,"d+":e.getDate(),"h+":e.getHours(),"m+":e.getMinutes(),"s+":e.getSeconds()};for(var i in n)if(new RegExp("("+i+")").test(t)){var a=n[i]+"";t=t.replace(RegExp.$1,1===RegExp.$1.length?a:l(a))}return t}var r=[];function l(e){return("00"+e).substr(e.length)}var c={modName:"websocket",client:null,connState:!1,cInfo:{host:location.hostname,port:8083,clientId:"C_"+(new Date).getTime(),userName:"test",password:"test123",keepAlive:null,keepAliveInterval:10,cleanSession:!1},sendInfo:"{}",tablelist:[],subInfo:a,originrecivedata:[],send:function(){var e=JSON.parse(this.sendInfo);console.log(e),this.sendMessage(e)},log:function(e){try{e=JSON.parse(e)}catch(e){}console.log(111)},newClient:function(){this.client=new Paho.MQTT.Client(this.cInfo.host,Number(this.cInfo.port),this.cInfo.clientId)},sslPort:function(){var e=this.cInfo.useSSL;this.cInfo.port=e?8084:8083},recive:function(e){console.log(e)},connect:function(){var e=this;if(!e.client.isConnected()){e.client.onConnectionLost=function(t){0!==t.errorCode?(console.log("onConnectionLost: "+t.errorMessage),setTimeout(function(){e.connect()},5e3)):window.clearTimeout()},e.client.onMessageArrived=function(t){try{t.msgString=t.payloadString}catch(e){t.msgString="Binary message("+t.payloadBytes.length+")"}e.recive(t.payloadString)};var t={onFailure:function(t){e.connState=!1,console.log("连接失败 "+t.errorMessage),setTimeout(function(){e.connect()},5e3)},onSuccess:function(){e.connState=!0,e.subscribe(e.subInfo,function(t){t.result&&(console.log(e.subInfo),console.log("订阅成功"))})}},n=e.cInfo.userName,i=e.cInfo.password,a=e.cInfo.keepAlive,o=e.cInfo.cleanSession;n&&(t.userName=n),i&&(t.password=i),a&&(t.keepAliveInterval=Number(a)),t.cleanSession=o,e.client.connect(t)}},disconnect:function(){var e=this;e.client&&this.client.isConnected()&&(e.client.disconnect(),e.client=null),console.log("已经断开连接！"),e.connState=!1,setTimeout(function(){e.connect()},5e3)},subscribe:function(e,t){if(!this.client||!this.client.isConnected())return console.log("当前尚未连接"),void this.connect();e.topic?this.client.subscribe(e.topic,{qos:Number(e.qos),onSuccess:function(n){e.msg=n,console.log(e.msg),e.result=!0,t&&t(e)},onFailure:function(n){128===n.errorCode[0]&&console.log("The topic cannot SUBSCRIBE for ACL Deny"),e.msg=n,console.log(n),e.result=!1,t&&t(e)}}):console.log("topic为空！")},unsubscribe:function(e,t){return this.client&&this.client.isConnected()?e.topic?void this.client.unsubscribe(e.topic,{onSuccess:function(n){e.msg=n,console.log(e),e.result=!0,t&&t(e)},onFailure:function(n){e.msg=n,console.log(n),e.result=!0,t&&t(e)}}):(this.tablelist.push({date:s(new Date,"yyyy-MM-dd hh:mm"),content:"topic为空！"}),void console.log("topic为空！")):(this.tablelist.push({date:s(new Date,"yyyy-MM-dd hh:mm"),content:"当前尚未连接"}),console.log("当前尚未连接"),void this.connect())},sendMessage:function(e){var t=e.text;if(!this.client||!this.client.isConnected())return console.log("当前尚未连接"),void this.connect();if(e.topic)if(t){var n=new Paho.MQTT.Message(t);n.destinationName=e.topic,n.qos=Number(e.qos),n.retained=e.retained,this.client.send(n),console.log(e)}else console.log("消息内容为空！");else console.log("topic为空！")}}}}]);