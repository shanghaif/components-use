(window.webpackJsonp=window.webpackJsonp||[]).push([["chunk-022f"],{EfaL:function(e,t,i){},Ynr8:function(e,t,i){"use strict";i.r(t);var c=i("v0iw"),s=i.n(c),r=i("xiB2"),o="",n=[],d={name:"OnlineTest",data:function(){return{productProperties:[],product:[],devices:[],devicesForm:{product:"",devices:"",wmxmb:"",zlfs:""},deviceid:""}},mounted:function(){var e=this;if(this.getProduct(),this.$route.query){this.deviceid=this.$route.query.deviceid;var t=s.a.Object.extend("Devices");new s.a.Query(t).find().then(function(t){e.devices=t,t.map(function(t){e.deviceid==t.id&&(e.devicesForm.devices=t.attributes.devaddr,e.devicesForm.product=t.attributes.product.id,o=t.attributes.product.attributes.productSecret,t.attributes.product.attributes.thing.properties?e.productProperties=t.attributes.product.attributes.thing.properties:e.productProperties=[])})})}},methods:{getProduct:function(){var e=this,t=s.a.Object.extend("Product");new s.a.Query(t).find().then(function(t){e.product=t})},selectProduct:function(e){var t=this,i=s.a.Object.extend("Devices"),c=new s.a.Query(i);c.equalTo("product",e),this.product.map(function(t){t.id==e&&(o=t.attributes.productSecret)}),c.find().then(function(e){t.devices=e})},selectDevices:function(e){var t=this,i=s.a.Object.extend("Devices"),c=new s.a.Query(i);c.equalTo("devaddr",e),c.find().then(function(e){t.productProperties=e[0].attributes.product.attributes.thing.properties})},connectDevice:function(){r.a.cInfo.clientId="sw1111_"+this.devicesForm.devices,r.a.cInfo.userName=this.devicesForm.product,r.a.cInfo.password=o,r.a.subInfo={topic:"thing/"+this.devicesForm.product+"/${"+this.devicesForm.devices+"}",qos:2},r.a.newClient(),r.a.connect(),r.a.recive=function(e){console.log(e)};var e="thing/"+this.devicesForm.product+"/${"+this.devicesForm.devices+"}";n.push(e)},sendTopic:function(){console.log(this.devicesForm.devices);var e={topic:this.devicesForm.zlfs+"/post",text:"",qos:1};r.a.sendMessage(e,function(e){e.result&&console.log("发送成功")})},selectBlur:function(e){this.devicesForm.devices=e.target.value}}},a=(i("gKe4"),i("KHd+")),l=Object(a.a)(d,function(){var e=this,t=e.$createElement,i=e._self._c||t;return i("div",{staticClass:"onlinetest"},[i("div",{staticClass:"ninthtab1"},[i("h4",{staticStyle:{margin:"0 0 10px"}},[e._v("在线调试")]),e._v(" "),i("el-form",{staticClass:"demo-form-inline",attrs:{inline:!0,model:e.devicesForm,size:"small"}},[i("el-form-item",{attrs:{label:"选择设备:"}},[i("el-select",{attrs:{placeholder:"请选择产品"},on:{change:e.selectProduct},model:{value:e.devicesForm.product,callback:function(t){e.$set(e.devicesForm,"product",t)},expression:"devicesForm.product"}},e._l(e.product,function(e,t){return i("el-option",{key:t,attrs:{label:e.attributes.name,value:e.id}})})),e._v(" "),i("el-select",{attrs:{placeholder:"请选择设备",filterable:""},on:{change:e.selectDevices,blur:e.selectBlur},model:{value:e.devicesForm.devices,callback:function(t){e.$set(e.devicesForm,"devices",t)},expression:"devicesForm.devices"}},e._l(e.devices,function(e,t){return i("el-option",{key:t,attrs:{label:e.attributes.devaddr,value:e.attributes.devaddr}})}))],1),e._v(" "),i("el-form-item",[i("el-button",{attrs:{type:"primary"},on:{click:e.connectDevice}},[e._v("启动设备")])],1),e._v(" "),i("div",[i("el-form-item",{attrs:{label:"选择属性:"}},[i("el-select",{attrs:{placeholder:"请选择调试功能"},model:{value:e.devicesForm.wmxmb,callback:function(t){e.$set(e.devicesForm,"wmxmb",t)},expression:"devicesForm.wmxmb"}},e._l(e.productProperties,function(e,t){return i("el-option",{key:t,attrs:{label:e.name,value:e.identifier}})})),e._v(" "),i("el-select",{attrs:{placeholder:"指令方式"},model:{value:e.devicesForm.zlfs,callback:function(t){e.$set(e.devicesForm,"zlfs",t)},expression:"devicesForm.zlfs"}},[i("el-option",{attrs:{label:"设置",value:"thing/"+e.devicesForm.product+"/${"+e.devicesForm.devices+"}"}}),e._v(" "),i("el-option",{attrs:{label:"获取",value:"beijing"}})],1)],1),e._v(" "),i("el-form-item",[i("el-button",{attrs:{type:"primary"},on:{click:e.sendTopic}},[e._v("发送指令")])],1)],1)],1)],1)])},[],!1,null,"04444305",null);l.options.__file="onlinetest.vue";t.default=l.exports},gKe4:function(e,t,i){"use strict";var c=i("EfaL");i.n(c).a}}]);