(window.webpackJsonp=window.webpackJsonp||[]).push([["chunk-6507"],{FdXr:function(e,t,a){"use strict";var n=a("Y9KD");a.n(n).a},"OG/P":function(e,t,a){"use strict";a.r(t);var n=a("v0iw"),s=a.n(n),i={data:function(){return{bedData:[],devicesData:[],beddialog:!1,multipleSelection:[],testbedname:"",testbedid:"",testbeddevices:[],origindevices:[],pagesize:10,total:0,start:0}},mounted:function(){this.getBedtable(this.pagesize,this.start)},methods:{handleEdit:function(e){var t=this;this.testbedid=e,this.beddialog=!0;var a=s.a.Object.extend("Testbed"),n=new s.a.Query(a),i=s.a.Object.extend("Devices"),l=new s.a.Query(i);n.get(e).then(function(e){t.testbedname=e.attributes.name;var a=e.relation("relation").query();l.equalTo("devtype","PUMP"),l.ascending("createdAt"),l.find().then(function(e){t.devicesData=e,a.find().then(function(e){e.map(function(e,a){t.testbeddevices.push(e.id),t.devicesData.map(function(a,n){e.id==a.id&&t.$refs.multipleTable.toggleRowSelection(t.devicesData[n],!0)})})})})})},handleDelete:function(e){var t=this;this.$confirm("此操作将永久删除当前测试台体, 是否继续?","提示",{confirmButtonText:"确定",cancelButtonText:"取消",type:"warning"}).then(function(){var a=s.a.Object.extend("Testbed");new s.a.Query(a).get(e).then(function(e){e.destroy().then(function(e){t.$message({type:"success",message:"删除成功!"}),t.getBedtable(t.pagesize,t.start)})})}).catch(function(){t.$message({type:"info",message:"已取消删除"})})},getBedtable:function(e,t){var a=this,n=s.a.Object.extend("Testbed"),i=new s.a.Query(n);i.limit(e),i.skip(t),i.count().then(function(e){a.total=e,i.find().then(function(e){a.bedData=e})})},addTestbed:function(e){var t=this;this.testbedname="",this.beddialog=!0;var a=s.a.Object.extend("Devices"),n=new s.a.Query(a);n.equalTo("devtype","PUMP"),n.find().then(function(e){t.devicesData=e})},handleSelectionChange:function(e){var t=this;this.multipleSelection=[],e.map(function(e){t.multipleSelection.push(e.id)})},addtestbed:function(e){var t=this;if(""==e){(i=new(l=s.a.Object.extend("Testbed"))).set("name",this.testbedname),i.set("status","init");var a=i.relation("relation"),n=new(s.a.Object.extend("Devices"));this.multipleSelection.map(function(e){n.set("objectId",e),a.add(n)}),i.save().then(function(e){t.$message({message:"添加成功",type:"success"}),t.beddialog=!1,t.getBedtable(t.pagesize,t.start)})}else{var i,l=s.a.Object.extend("Testbed");(i=new s.a.Query(l)).get(e).then(function(e){e.set("name",t.testbedname);var a=e.relation("relation"),n=new(s.a.Object.extend("Devices"));t.multipleSelection.map(function(e){t.testbeddevices.includes(e)||(n.set("objectId",e),a.add(n)),t.testbeddevices.map(function(e){t.multipleSelection.includes(e)||(n.set("objectId",e),a.remove(n))})}),e.save().then(function(e){t.$message({message:"修改成功",type:"success"}),t.beddialog=!1,t.getBedtable(t.pagesize,t.start)})})}},handleSizeChange:function(e){this.pagesize=e,this.getBedtable(this.pagesize,this.start)},handleCurrentChange:function(e){this.start=Number(e-1)*Number(this.pagesize),this.getBedtable(this.pagesize,this.start)}}},l=(a("FdXr"),a("KHd+")),d=Object(l.a)(i,function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticClass:"testbedpump"},[a("div",{staticClass:"addbed"},[a("el-button",{attrs:{type:"primary"},on:{click:function(t){e.addTestbed()}}},[e._v("工具矩阵")])],1),e._v(" "),a("div",{staticClass:"bedtable"},[a("el-table",{staticStyle:{width:"100%"},attrs:{data:e.bedData}},[a("el-table-column",{attrs:{prop:"id",label:"设备组编号"}}),e._v(" "),a("el-table-column",{attrs:{label:"测试台提名称"},scopedSlots:e._u([{key:"default",fn:function(t){return[a("span",[e._v(e._s(t.row.attributes.name))])]}}])}),e._v(" "),a("el-table-column",{attrs:{label:"状态"},scopedSlots:e._u([{key:"default",fn:function(t){return[a("span",[e._v(e._s(t.row.attributes.status))])]}}])}),e._v(" "),a("el-table-column",{attrs:{label:"编辑"},scopedSlots:e._u([{key:"default",fn:function(t){return[a("el-button",{attrs:{size:"mini",type:"primary"},on:{click:function(a){e.handleEdit(t.row.id)}}},[e._v("配 置")]),e._v(" "),a("el-button",{attrs:{size:"mini",type:"danger"},on:{click:function(a){e.handleDelete(t.row.id)}}},[e._v("撤 销")])]}}])})],1)],1),e._v(" "),a("div",{staticClass:"block",staticStyle:{"margin-top":"20px"}},[a("el-pagination",{attrs:{"page-sizes":[1,5,10],"page-size":e.pagesize,layout:"total, sizes, prev, pager, next, jumper",total:e.total},on:{"size-change":e.handleSizeChange,"current-change":e.handleCurrentChange}})],1),e._v(" "),a("div",{staticClass:"addbeddialog"},[a("el-dialog",{attrs:{title:"新增测试台体",visible:e.beddialog},on:{"update:visible":function(t){e.beddialog=t}}},[a("div",{staticStyle:{"margin-bottom":"20px"}},[a("label",{attrs:{for:""}},[e._v("测试台名称:")]),e._v(" "),a("el-input",{staticStyle:{width:"200px"},model:{value:e.testbedname,callback:function(t){e.testbedname=t},expression:"testbedname"}})],1),e._v(" "),a("el-table",{ref:"multipleTable",attrs:{data:e.devicesData},on:{"selection-change":e.handleSelectionChange}},[a("el-table-column",{attrs:{type:"selection"}}),e._v(" "),a("el-table-column",{attrs:{label:"设备类别"},scopedSlots:e._u([{key:"default",fn:function(t){return["DTU"==t.row.attributes.basedata.type?a("span",[e._v("控制器")]):"PC"==t.row.attributes.basedata.type?a("span",[e._v("控制台")]):a("span",[e._v("摄像头")])]}}])}),e._v(" "),a("el-table-column",{attrs:{label:"设备编号"},scopedSlots:e._u([{key:"default",fn:function(t){return[a("span",[e._v(e._s(t.row.attributes.devaddr))])]}}])}),e._v(" "),a("el-table-column",{attrs:{label:"当前状态"},scopedSlots:e._u([{key:"default",fn:function(t){return["offline"==t.row.attributes.basedata.status?a("span",{staticStyle:{color:"red"}},[e._v("离线")]):e._e(),e._v(" "),"ready"==t.row.attributes.basedata.status?a("span",{staticStyle:{color:"green"}},[e._v("在线")]):e._e()]}}])})],1),e._v(" "),a("span",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[a("el-button",{on:{click:function(t){e.beddialog=!1}}},[e._v("取 消")]),e._v(" "),a("el-button",{attrs:{type:"primary"},on:{click:function(t){e.addtestbed(e.testbedid)}}},[e._v("确 定")])],1)],1)],1)])},[],!1,null,"a40fec3e",null);d.options.__file="testbedpump.vue";t.default=d.exports},Y9KD:function(e,t,a){}}]);