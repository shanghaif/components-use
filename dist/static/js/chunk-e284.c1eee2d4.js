(window.webpackJsonp=window.webpackJsonp||[]).push([["chunk-e284"],{"/eyY":function(e,t,a){"use strict";a.r(t);var i,n=a("v0iw"),s=a.n(n),c=a("S+eF"),l=a("p46w"),o=a.n(l),r={data:function(){return{onlineall:"",activeall:"",userId:"",batchid:"",pcdialogVisible:!1,devicedialogVisible:!1,equvalue:"0",cities:[],activeName:"first",selectdevice:"",deviceinput:"",devicenumber:"",multipleTable:[],selectRow:[],devicelength:10,devicestart:0,devicetotal:0,visible2:!1,deviceform:{name:"",devaddr:"",batchId:"",desc:"",nodeType:0,devType:"",netType:"",assetNum:"",devModel:"",address:"",productName:""},rules:{name:[{required:!0,message:"请输入设备名称",trigger:"blur"}],devaddr:[{required:!0,message:"请输入设备编号",trigger:"blur"}],batchId:[{required:!0,message:"请输入设备批次",trigger:"blur"}],nodeType:[{required:!0,message:"请输入设备类型",trigger:"blur"}],netType:[{required:!0,message:"请选择网络格式",trigger:"change"}],devType:[{required:!0,message:"请选择设备类型",trigger:"change"}],productName:[{required:!0,message:"请选择产品名称",trigger:"change"}]},pcformInline:{pcnumber:"",pcname:"",createdtime:""},pctableData:[],tableData:[],options:[],proTableData:[],proTableData1:[],activelength:[],onlinelength:[]}},watch:{multipleTable:function(e){var t=this;this.selectRow=[],e.length>0&&e.forEach(function(e,a){t.selectRow.push(t.tableData.indexOf(e))})}},mounted:function(){this.userId=s.a.User.current().id,console.log(this.userId),this.getRole(),this.searchProduct(),i=o.a.get("language")},methods:{getActiveDevices:function(){var e=this,t=s.a.Object.extend("Devices"),a=new s.a.Query(t);a.equalTo("status","ACTIVE"),""!=this.deviceinput&&("设备名称"==this.selectdevice||"Device Name"==this.selectdevice?a.equalTo("name",this.deviceinput):a.equalTo("devaddr",this.deviceinput)),""!=this.devicenumber&&a.equalTo("devaddr",this.devicenumber),0!=this.equvalue&&a.equalTo("product",this.equvalue),a.count().then(function(t){e.activeall=t})},getOnlineDevices:function(){var e=this,t=s.a.Object.extend("Devices"),a=new s.a.Query(t);a.equalTo("status","ONLINE"),""!=this.deviceinput&&("设备名称"==this.selectdevice?a.equalTo("name",this.deviceinput):a.equalTo("devaddr",this.deviceinput)),""!=this.devicenumber&&a.equalTo("devaddr",this.devicenumber),0!=this.equvalue&&a.equalTo("product",this.equvalue),a.count().then(function(t){e.onlineall=t})},searchProduct:function(){var e=this;this.proTableData=[],this.proTableData1=[];var t=s.a.Object.extend("Product"),a=new s.a.Query(t);a.limit(1e4),a.find().then(function(t){t.map(function(t){var a={};a.id=t.id,a.name=t.attributes.name,e.proTableData.push(a),e.proTableData1.push(a)}),e.proTableData.unshift({name:"zh"==i?"全部产品":"All Products",id:"0"}),e.$route.query.productid&&(e.equvalue=e.$route.query.productid),e.getDevices()},function(t){e.$message({type:"error",message:t.message})})},getDevices:function(e){var t=this;0==e&&(this.devicestart=0),this.tableData=[];var a=s.a.Object.extend("Devices"),i=new s.a.Query(a);""!=this.deviceinput&&("设备名称"==this.selectdevice?i.equalTo("name",this.deviceinput):i.equalTo("devaddr",this.deviceinput)),""!=this.devicenumber&&i.equalTo("devaddr",this.devicenumber),0!=this.equvalue&&i.equalTo("product",this.equvalue),i.limit(this.devicelength),i.skip(this.devicestart),i.ascending("-updatedAt"),i.count().then(function(e){t.devicetotal=e,i.find().then(function(e){e&&(e.map(function(e){var a={};a.id=e.id,a.name=e.attributes.name,a.lastOnlineTime=e.attributes.lastOnlineTime,a.status=e.attributes.status,a.originstatus=e.attributes.status,a.nodeType=e.attributes.product.attributes.nodeType,a.desc=e.attributes.desc,a.productName=e.attributes.product.attributes.name,a.devaddr=e.attributes.devaddr,a.isEnable=e.attributes.isEnable,t.tableData.push(a)}),t.getActiveDevices(),t.getOnlineDevices())})})},handelUpdate:function(e,t,a){var i=this,n={};for(var c in t)n[c]=t[c];n.isEnable=1!=n.isEnable,this.tableData[a]=n,this.$confirm("是否修改此设备状态?","提示",{confirmButtonText:"确定",cancelButtonText:"取消",type:"warning"}).then(function(){var e={};for(var a in t)e[a]=t[a];e.isEnable=1==e.isEnable;var n=s.a.Object.extend("Devices");new s.a.Query(n).get(t.id).then(function(t){t.set("isEnable",e.isEnable),t.save().then(function(e){i.$message({type:"success",message:"状态修改成功"})}),i.getDevices()})}).catch(function(){i.$message({type:"info",message:"已取消修改"});var e=t;e.isEnable=1!=e.isEnable,i.tableData[a]=e})},timestampToTime:function(e){var t=new Date(1e3*e);return t.getFullYear()+"-"+((t.getMonth()+1<10?"0"+(t.getMonth()+1):t.getMonth()+1)+"-")+((t.getDate()+1<=10?"0"+t.getDate():t.getDate())+" ")+((t.getHours()+1<=10?"0"+t.getHours():t.getHours())+":")+((t.getMinutes()+1<=10?"0"+t.getMinutes():t.getMinutes())+":")+(t.getSeconds()+1<=10?"0"+t.getSeconds():t.getSeconds())},getRole:function(){var e=this;this.options=[];var t=s.a.Object.extend("_Role");new s.a.Query(t).find().then(function(t){t.map(function(t){var a={};a.objectId=t.id,a.alias=t.attributes.alias,a.name=t.attributes.name,e.options.push(a)})})},utc2beijing:function(e){return new Date(+new Date(e)+288e5).toISOString().replace(/T/g," ").replace(/\.[\d]{3}Z/,"")},filterTag:function(e,t){return t.tag===e},handleSelectionChange:function(e){this.multipleTable=e,console.log(this.multipleTable)},deleteDevcie:function(e){var t=this;c.Promise.all([this.multipleTable.map(function(e){var t=s.a.Object.extend("Devices");new s.a.Query(t).get(e.id).then(function(e){e.destroy().then(function(e){})})})]).then(function(e){0!=e.length?(t.$message({message:"删除成功",type:"success"}),t.getDevices()):t.$message({message:"删除失败",type:"error"})}).catch(function(e){console.log(e)})},unactiveDevice:function(e){var t=this;c.Promise.all([this.multipleTable.map(function(e){var t=new(s.a.Object.extend("Devices"));t.id=e.id,t.set("isEnable",!1),t.save().then(function(e){})})]).then(function(e){e&&0!=e.length?(t.$message({message:"禁用成功",type:"success"}),t.getDevices()):t.$message({message:"禁用失败",type:"error"})}).catch(function(e){console.log(e)})},activeDevice:function(e){var t=this;c.Promise.all([this.multipleTable.map(function(e){var t=new(s.a.Object.extend("Devices"));t.id=e.id,t.set("isEnable",!0),t.save().then(function(e){})})]).then(function(e){e&&0!=e.length?(t.$message({message:"启用成功",type:"success"}),t.getDevices()):t.$message({message:"启用失败",type:"error"})}).catch(function(e){console.log(e)})},rowClass:function(e){e.row;var t=e.rowIndex;if(this.selectRow.includes(t))return console.log(t),{"background-color":"rgba(185, 221, 249, 0.3)"}},deviceSizeChange:function(e){this.devicelength=e,this.getDevices()},deviceCurrentChange:function(e){this.devicestart=(e-1)*this.devicelength,this.getDevices()},handleClose:function(){this.devicedialogVisible=!1},handleClose1:function(){this.pcdialogVisible=!1,this.batchid="",this.pcformInline={pcname:"",createdtime:""}},makeSure:function(e){var t=this,a=s.a.Object.extend("Devices");new s.a.Query(a).get(e.row.id).then(function(a){a.destroy().then(function(a){a&&(t.$message({type:"success",message:"删除成功"}),e._self.$refs["popover-"+e.$index].doClose(),t.getDevices())},function(e){t.$message({type:"error",message:e.message})})})},addDeviceBatch:function(){var e=this;this.pcdialogVisible=!0;var t=s.a.Object.extend("Datas"),a=new s.a.Query(t);a.equalTo("type","batch_number"),a.ascending("-createdAt"),a.find().then(function(t){t&&(e.pctableData=t)},function(t){e.$message({type:"error",message:t.message})})},submitForm:function(e){var t=this;this.$refs[e].validate(function(e){if(!e)return t.$message({type:"error",message:"请按照要求填写参数"}),!1;var a=new(s.a.Object.extend("Devices")),i=new(s.a.Object.extend("Product")),n=new(s.a.Object.extend("Datas")),c=new s.a.ACL;n.id=t.batchid,i.id=t.deviceform.productName,a.set("product",i),a.set("batchId",n),t.options.map(function(e){c.setRoleReadAccess(e.name,!0),c.setRoleWriteAccess(e.name,!0)}),a.set("ACL",c),a.set("devaddr",t.deviceform.devaddr),a.set("name",t.deviceform.name),a.set("assetNum",t.deviceform.assetNum),a.set("devModel",t.deviceform.devModel),a.set("brand",t.deviceform.brand),a.set("address",t.deviceform.address),a.set("desc",t.deviceform.desc),a.set("status","OFFLINE"),a.set("isEnable",!1),a.save().then(function(e){e&&(t.$message({type:"success",message:"设备添加成功"}),t.devicedialogVisible=!1,t.batchid="",t.getDevices(),t.$refs.deviceform.resetFields(),t.deviceform.assetNum="",t.deviceform.devModel="",t.deviceform.address="",t.deviceform.desc="",t.deviceform.brand="")})})},addbatch:function(){var e=this;if(""==this.batchid){var t=new(i=s.a.Object.extend("Datas")),a=new s.a.ACL;t.set("data",{batch_name:this.pcformInline.pcname,createdtime:Math.ceil(this.pcformInline.createdtime/1e3)}),t.set("type","batch_number"),a.setReadAccess(this.userId,!0),a.setWriteAccess(this.userId,!0),t.set("ACL",a),t.save().then(function(t){e.$message({message:"新增成功",type:"success"}),e.addDeviceBatch()},function(t){e.$message({type:"error",message:t.message})})}else{var i=s.a.Object.extend("Datas");(t=new s.a.Query(i)).get(this.batchid).then(function(t){t.set("data",{batch_name:e.pcformInline.pcname,createdtime:Math.ceil(e.pcformInline.createdtime/1e3)}),t.save().then(function(t){t&&(e.$message({message:"修改成功",type:"success"}),e.batchid="",e.pcformInline={pcname:"",createdtime:""},e.addDeviceBatch())},function(t){e.$message({type:"error",message:t.message})})})}},updatebatch:function(e,t){this.pcformInline.pcname=e.attributes.data.batch_name,this.pcformInline.createdtime=1e3*e.attributes.data.createdtime,this.batchid=t},deletebatch:function(e){var t=this,a=s.a.Object.extend("Datas");new s.a.Query(a).get(e).then(function(e){e.destroy().then(function(e){e&&(t.$message({type:"success",message:"删除成功"}),t.addDeviceBatch())},function(e){t.$message({type:"error",message:e.message})})})},selectbatch:function(e,t){this.batchid=t,this.deviceform.pc=e.attributes.data.batch_name,this.deviceform.batchId=e.attributes.data.batch_name,this.pcdialogVisible=!1},deviceToDetail:function(e){this.$router.push({path:"/roles/editdevices",query:{deviceid:e.id,nodeType:e.nodeType,ischildren:!1}})},handleClick:function(e,t){var a=this;if("second"==e.name){var i=s.a.Object.extend("Datas"),n=new s.a.Query(i);n.equalTo("type","batch_number"),n.ascending("-createdAt"),n.find().then(function(e){e&&(a.pctableData=e)},function(e){a.$message({type:"error",message:e.message})})}},deviceToChildren:function(e){this.$router.push({path:"/roles/editdevices",query:{deviceid:e.id,nodeType:e.nodeType,ischildren:!0}})}}},d=(a("Qbkw"),a("SKMb"),a("KHd+")),u=Object(d.a)(r,function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticClass:"equipment"},[a("h3",{staticStyle:{margin:"0"}},[e._v(e._s(e.$t("equipment.equipmentstatistics")))]),e._v(" "),a("div",{staticClass:"equ_header"},[a("ul",[a("li",[a("p",[e._v("\n          "+e._s(e.$t("equipment.totalequipment"))+"\n          "),a("el-tooltip",{attrs:{content:e.$t("equipment.totalequipment"),placement:"top"}},[a("i",{staticClass:"el-icon-question"})])],1),e._v(" "),a("span",[e._v(e._s(e.devicetotal))])]),e._v(" "),a("li",[a("p",[a("span",{staticStyle:{height:"5px",width:"5px","border-radius":"5px",background:"#409eff",display:"inline-block","vertical-align":"middle","margin-right":"5px"}}),e._v(e._s(e.$t("equipment.activationdevice"))+"\n          "),a("el-tooltip",{attrs:{content:e.$t("equipment.totalactive"),placement:"top"}},[a("i",{staticClass:"el-icon-question"})])],1),e._v(" "),a("span",[e._v(e._s(e.activeall))])]),e._v(" "),a("li",[a("p",[a("span",{staticStyle:{height:"5px",width:"5px","border-radius":"5px",background:"#67c23a",display:"inline-block","vertical-align":"middle","margin-right":"5px"}}),e._v(e._s(e.$t("equipment.onlinedevices"))+"\n          "),a("el-tooltip",{attrs:{content:e.$t("equipment.totalonline"),placement:"top"}},[a("i",{staticClass:"el-icon-question"})])],1),e._v(" "),a("span",[e._v(e._s(e.onlineall))])]),e._v(" "),a("li")])]),e._v(" "),a("div",{staticClass:"equtabs"},[a("el-tabs",{on:{"tab-click":e.handleClick},model:{value:e.activeName,callback:function(t){e.activeName=t},expression:"activeName"}},[a("el-tab-pane",{attrs:{label:e.$t("route.设备管理"),name:"first"}},[a("div",[a("div",{staticStyle:{"text-align":"right"}},[a("el-button",[e._v(e._s(e.$t("equipment.batchaddition")))]),e._v(" "),a("el-button",{attrs:{type:"primary"},on:{click:function(t){e.devicedialogVisible=!0}}},[e._v(e._s(e.$t("equipment.adddevice")))])],1)]),e._v(" "),a("div",{staticClass:"equdevices",staticStyle:{"margin-top":"20px"}},[a("el-select",{staticClass:"selectdetail",model:{value:e.equvalue,callback:function(t){e.equvalue=t},expression:"equvalue"}},e._l(e.proTableData,function(e,t){return a("el-option",{key:t,attrs:{label:e.name,value:e.id}})})),e._v(" "),a("el-select",{staticClass:"selectdetail",model:{value:e.selectdevice,callback:function(t){e.selectdevice=t},expression:"selectdevice"}},[a("el-option",{attrs:{value:e.$t("equipment.devicename")}}),e._v(" "),a("el-option",{attrs:{value:e.$t("equipment.devicenumber")}})],1),e._v(" "),e.selectdevice==e.$t("equipment.devicename")?a("el-input",{staticClass:"selectdetail",attrs:{placeholder:e.$t("equipment.enterproductname")},model:{value:e.deviceinput,callback:function(t){e.deviceinput=t},expression:"deviceinput"}}):a("el-input",{staticClass:"selectdetail",attrs:{placeholder:e.$t("equipment.enterdevicenumber")},model:{value:e.deviceinput,callback:function(t){e.deviceinput=t},expression:"deviceinput"}}),e._v(" "),a("el-button",{staticClass:"selectdetail",attrs:{type:"primary"},on:{click:function(t){e.getDevices(0)}}},[e._v(e._s(e.$t("developer.search")))]),e._v(" "),a("el-button",{staticClass:"selectdetail",attrs:{type:"primary",disabled:0==e.multipleTable.length},on:{click:e.deleteDevcie}},[e._v(e._s(e.$t("developer.delete")))]),e._v(" "),a("el-button",{staticClass:"selectdetail",attrs:{type:"primary",disabled:0==e.multipleTable.length},on:{click:e.unactiveDevice}},[e._v(e._s(e.$t("developer.prohibit")))]),e._v(" "),a("el-button",{staticClass:"selectdetail",attrs:{type:"primary",disabled:0==e.multipleTable.length},on:{click:e.activeDevice}},[e._v(e._s(e.$t("developer.enable")))])],1),e._v(" "),a("div",{staticClass:"tabstable"},[a("el-table",{ref:"filterTable",staticStyle:{width:"100%","text-align":"center","margin-top":"20px"},attrs:{data:e.tableData,"row-style":e.rowClass},on:{"selection-change":e.handleSelectionChange}},[a("el-table-column",{attrs:{type:"selection",align:"center",width:"55"}}),e._v(" "),a("el-table-column",{attrs:{label:e.$t("equipment.devicenumber")+"/"+e.$t("equipment.name"),align:"center"},scopedSlots:e._u([{key:"default",fn:function(t){return[a("span",[e._v(e._s(t.row.devaddr))]),e._v(" "),a("p",{staticStyle:{margin:"0",color:"green"}},[e._v(e._s(t.row.name))])]}}])}),e._v(" "),a("el-table-column",{attrs:{label:e.$t("equipment.state"),align:"center"},scopedSlots:e._u([{key:"default",fn:function(t){return["ACTIVE"==t.row.status?a("span",{class:t.row.status},[e._v(e._s(e.$t("product.active")))]):e._e(),"ACTIVE"==t.row.status?a("el-tooltip",{attrs:{content:"设备已注册",placement:"top"}},[a("i",{staticClass:"el-icon-question"})]):e._e(),e._v(" "),"UNACTIVE"==t.row.status?a("span",{class:t.row.status},[e._v(e._s(e.$t("product.unactive")))]):e._e(),"UNACTIVE"==t.row.status?a("el-tooltip",{attrs:{content:"设备未注册",placement:"top"}},[a("i",{staticClass:"el-icon-question"})]):e._e(),e._v(" "),"ONLINE"==t.row.status?a("span",{class:t.row.status},[e._v(e._s(e.$t("product.online")))]):e._e(),"ONLINE"==t.row.status?a("el-tooltip",{attrs:{content:"设备已经上线",placement:"top"}},[a("i",{staticClass:"el-icon-question"})]):e._e(),e._v(" "),"OFFLINE"==t.row.status?a("span",{class:t.row.status},[e._v(e._s(e.$t("product.offline")))]):e._e(),e._v(" "),"OFFLINE"==t.row.status?a("el-tooltip",{attrs:{content:"设备已经离线",placement:"top"}},[a("i",{staticClass:"el-icon-question"})]):e._e()]}}])}),e._v(" "),a("el-table-column",{attrs:{label:e.$t("equipment.product"),align:"center"},scopedSlots:e._u([{key:"default",fn:function(t){return[a("span",{attrs:{type:"success"}},[e._v(e._s(t.row.productName))])]}}])}),e._v(" "),a("el-table-column",{attrs:{label:e.$t("equipment.nodetype"),align:"center"},scopedSlots:e._u([{key:"default",fn:function(e){return[0==e.row.nodeType?a("svg-icon",{staticStyle:{width:"2rem",height:"2rem"},attrs:{"icon-class":"iot"}}):a("svg-icon",{staticStyle:{width:"2rem",height:"2rem"},attrs:{"icon-class":"wgicon"}})]}}])}),e._v(" "),a("el-table-column",{attrs:{label:e.$t("developer.enable")+"/"+e.$t("developer.prohibit"),align:"center"},scopedSlots:e._u([{key:"default",fn:function(t){return[a("el-switch",{attrs:{"active-color":"#5eb058","inactive-color":"#cccccc"},on:{change:function(a){e.handelUpdate(a,t.row,t.$index)}},model:{value:t.row.isEnable,callback:function(a){e.$set(t.row,"isEnable",a)},expression:"scope.row.isEnable"}})]}}])}),e._v(" "),a("el-table-column",{attrs:{label:e.$t("equipment.lastonlinetime"),align:"center"},scopedSlots:e._u([{key:"default",fn:function(t){return[t.row.lastOnlineTime?a("span",[e._v(e._s(e.timestampToTime(t.row.lastOnlineTime)))]):a("span",[e._v("—")])]}}])}),e._v(" "),a("el-table-column",{attrs:{label:e.$t("developer.operation"),align:"center"},scopedSlots:e._u([{key:"default",fn:function(t){return[a("el-link",{attrs:{type:"primary",underline:!1,icon:"el-icon-view"},on:{click:function(a){e.deviceToDetail(t.row)}}},[e._v(e._s(e.$t("equipment.see")))]),e._v(" "),a("el-popover",{ref:"popover-"+t.$index,attrs:{placement:"top",width:"300"}},[a("p",[e._v("确定删除这个"+e._s(t.row.name)+"设备吗？")]),e._v(" "),a("div",{staticStyle:{"text-align":"right",margin:"0"}},[a("el-button",{attrs:{size:"mini"},on:{click:function(e){t._self.$refs["popover-"+t.$index].doClose()}}},[e._v(e._s(e.$t("developer.cancel")))]),e._v(" "),a("el-button",{attrs:{type:"primary",size:"mini"},on:{click:function(a){e.makeSure(t)}}},[e._v(e._s(e.$t("developer.determine")))])],1),e._v(" "),a("el-link",{attrs:{slot:"reference",underline:!1,icon:"el-icon-delete",type:"danger"},slot:"reference"},[e._v(e._s(e.$t("developer.delete")))])],1),e._v(" "),1==t.row.nodeType?a("el-link",{attrs:{type:"primary",underline:!1,icon:"el-icon-s-unfold"},on:{click:function(a){e.deviceToChildren(t.row)}}},[e._v(e._s(e.$t("equipment.subdevice")))]):e._e()]}}])})],1),e._v(" "),a("div",{staticClass:"elpagination",staticStyle:{"margin-top":"20px"}},[a("el-pagination",{attrs:{"page-sizes":[10,20,30,50],"page-size":e.devicelength,layout:"total, sizes, prev, pager, next, jumper",total:e.devicetotal},on:{"size-change":e.deviceSizeChange,"current-change":e.deviceCurrentChange}})],1)],1)]),e._v(" "),a("el-tab-pane",{attrs:{label:e.$t("equipment.batchmanagement"),name:"second"}},[a("el-table",{staticStyle:{width:"100%","text-align":"center"},attrs:{data:e.pctableData}},[a("el-table-column",{attrs:{type:"index",label:e.$t("equipment.serialnumber"),align:"center",width:"200"}}),e._v(" "),a("el-table-column",{attrs:{label:e.$t("equipment.batchname"),align:"center"},scopedSlots:e._u([{key:"default",fn:function(t){return[a("span",[e._v(e._s(t.row.attributes.data.batch_name))])]}}])}),e._v(" "),a("el-table-column",{attrs:{align:"center",label:e.$t("equipment.createdAt")},scopedSlots:e._u([{key:"default",fn:function(t){return[a("span",[e._v(e._s(e.utc2beijing(t.row.createdAt)))])]}}])})],1)],1)],1),e._v(" "),a("el-dialog",{attrs:{title:e.$t("equipment.adddevice"),visible:e.devicedialogVisible,width:"50%","before-close":e.handleClose},on:{"update:visible":function(t){e.devicedialogVisible=t}}},[a("div",{staticClass:"header-title",attrs:{slot:"title"},slot:"title"},[a("span",{staticClass:"title-name"},[e._v("\n         "+e._s(e.$t("equipment.adddevice"))+"\n          "),a("el-tooltip",{staticStyle:{"margin-left":"5px"},attrs:{content:e.$t("equipment.text"),placement:"top"}},[a("i",{staticClass:"el-icon-question"})])],1)]),e._v(" "),a("div",{staticClass:"devicecontent"},[a("el-form",{ref:"deviceform",attrs:{model:e.deviceform,"label-width":"150px",rules:e.rules}},[a("el-form-item",{attrs:{label:e.$t("equipment.devicename"),prop:"name"}},[a("el-input",{model:{value:e.deviceform.name,callback:function(t){e.$set(e.deviceform,"name",t)},expression:"deviceform.name"}})],1),e._v(" "),a("el-form-item",{attrs:{label:e.$t("equipment.devicenumber"),prop:"devaddr"}},[a("el-input",{model:{value:e.deviceform.devaddr,callback:function(t){e.$set(e.deviceform,"devaddr",t)},expression:"deviceform.devaddr"}})],1),e._v(" "),a("el-form-item",{attrs:{label:e.$t("equipment.batchname"),prop:"batchId"}},[a("el-input",{attrs:{disabled:""},model:{value:e.deviceform.batchId,callback:function(t){e.$set(e.deviceform,"batchId",t)},expression:"deviceform.batchId"}},[a("i",{staticClass:"el-icon-plus",attrs:{slot:"suffix"},on:{click:e.addDeviceBatch},slot:"suffix"})])],1),e._v(" "),a("el-form-item",{attrs:{label:e.$t("product.productname"),prop:"productName"}},[a("el-select",{attrs:{placeholder:e.$t("equipment.entername")},model:{value:e.deviceform.productName,callback:function(t){e.$set(e.deviceform,"productName",t)},expression:"deviceform.productName"}},e._l(e.proTableData1,function(e,t){return a("el-option",{key:t,attrs:{label:e.name,value:e.id}})}))],1),e._v(" "),a("el-form-item",{attrs:{label:e.$t("equipment.assetnumber")}},[a("el-input",{model:{value:e.deviceform.assetNum,callback:function(t){e.$set(e.deviceform,"assetNum",t)},expression:"deviceform.assetNum"}})],1),e._v(" "),a("el-form-item",{attrs:{label:e.$t("equipment.equipmenttype")}},[a("el-input",{model:{value:e.deviceform.devModel,callback:function(t){e.$set(e.deviceform,"devModel",t)},expression:"deviceform.devModel"}})],1),e._v(" "),a("el-form-item",{attrs:{label:e.$t("equipment.equipmentbrand")}},[a("el-input",{model:{value:e.deviceform.brand,callback:function(t){e.$set(e.deviceform,"brand",t)},expression:"deviceform.brand"}})],1),e._v(" "),a("el-form-item",{attrs:{label:e.$t("equipment.installationlocation")}},[a("el-input",{model:{value:e.deviceform.address,callback:function(t){e.$set(e.deviceform,"address",t)},expression:"deviceform.address"}})],1),e._v(" "),a("el-form-item",{attrs:{label:e.$t("developer.describe")}},[a("el-input",{attrs:{type:"textarea",autosize:{minRows:4,maxRows:4}},model:{value:e.deviceform.desc,callback:function(t){e.$set(e.deviceform,"desc",t)},expression:"deviceform.desc"}})],1)],1)],1),e._v(" "),a("span",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[a("el-button",{attrs:{type:"primary"},on:{click:function(t){e.submitForm("deviceform")}}},[e._v(e._s(e.$t("developer.determine")))]),e._v(" "),a("el-button",{on:{click:function(t){e.devicedialogVisible=!1}}},[e._v(e._s(e.$t("developer.cancel")))])],1)]),e._v(" "),a("el-dialog",{attrs:{title:e.$t("equipment.batchaddition"),visible:e.pcdialogVisible,width:"50%","before-close":e.handleClose1},on:{"update:visible":function(t){e.pcdialogVisible=t}}},[a("div",{staticClass:"pccontent"},[a("el-form",{staticClass:"demo-form-inline",attrs:{inline:!0,model:e.pcformInline}},[a("el-form-item",{attrs:{label:e.$t("equipment.batchname")}},[a("el-input",{attrs:{placeholder:e.$t("equipment.batchname")},model:{value:e.pcformInline.pcname,callback:function(t){e.$set(e.pcformInline,"pcname",t)},expression:"pcformInline.pcname"}})],1),e._v(" "),a("el-form-item",{attrs:{label:e.$t("equipment.createdAt")}},[a("el-date-picker",{attrs:{type:"datetime"},model:{value:e.pcformInline.createdtime,callback:function(t){e.$set(e.pcformInline,"createdtime",t)},expression:"pcformInline.createdtime"}})],1),e._v(" "),a("el-form-item",[a("el-button",{attrs:{type:"primary"},on:{click:e.addbatch}},[e._v(e._s(e.$t("equipment.addbatch")))])],1)],1),e._v(" "),a("el-table",{staticStyle:{width:"100%","text-align":"center"},attrs:{data:e.pctableData,height:"450"}},[a("el-table-column",{attrs:{type:"index",label:e.$t("equipment.serialnumber"),align:"center",width:"50"}}),e._v(" "),a("el-table-column",{attrs:{label:e.$t("equipment.batchname"),align:"center"},scopedSlots:e._u([{key:"default",fn:function(t){return[a("span",[e._v(e._s(t.row.attributes.data.batch_name))])]}}])}),e._v(" "),a("el-table-column",{attrs:{align:"center",label:e.$t("equipment.createdAt")},scopedSlots:e._u([{key:"default",fn:function(t){return[a("span",[e._v(e._s(e.utc2beijing(t.row.createdAt)))])]}}])}),e._v(" "),a("el-table-column",{attrs:{label:e.$t("developer.operation"),align:"center",width:"300"},scopedSlots:e._u([{key:"default",fn:function(t){return[a("el-button",{attrs:{type:"primary",size:"mini"},on:{click:function(a){e.updatebatch(t.row,t.row.id)}}},[e._v(e._s(e.$t("developer.edit")))]),e._v(" "),a("el-button",{attrs:{type:"danger",size:"mini"},on:{click:function(a){e.deletebatch(t.row.id)}}},[e._v(e._s(e.$t("developer.delete")))]),e._v(" "),a("el-button",{attrs:{type:"success",size:"mini"},on:{click:function(a){e.selectbatch(t.row,t.row.id)}}},[e._v("选择")])]}}])})],1)],1)])],1)])},[],!1,null,"0fa13f26",null);u.options.__file="index.vue";t.default=u.exports},Fy5k:function(e,t,a){},KMe2:function(e,t,a){},Qbkw:function(e,t,a){"use strict";var i=a("Fy5k");a.n(i).a},SKMb:function(e,t,a){"use strict";var i=a("KMe2");a.n(i).a}}]);