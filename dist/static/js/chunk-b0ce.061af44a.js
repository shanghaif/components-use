(window.webpackJsonp=window.webpackJsonp||[]).push([["chunk-b0ce"],{"0rEV":function(e,t,r){},J66h:function(module,exports,__webpack_require__){(function(global){var __WEBPACK_AMD_DEFINE_ARRAY__,__WEBPACK_AMD_DEFINE_RESULT__;!function(global,factory){module.exports=function(global){"use strict";var _Base64=(global=global||{}).Base64,version="2.5.1",buffer;if(void 0!==module&&module.exports)try{buffer=eval("require('buffer').Buffer")}catch(e){buffer=void 0}var b64chars="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/",b64tab=function(e){for(var t={},r=0,o=e.length;r<o;r++)t[e.charAt(r)]=r;return t}(b64chars),fromCharCode=String.fromCharCode,cb_utob=function(e){if(e.length<2){var t=e.charCodeAt(0);return t<128?e:t<2048?fromCharCode(192|t>>>6)+fromCharCode(128|63&t):fromCharCode(224|t>>>12&15)+fromCharCode(128|t>>>6&63)+fromCharCode(128|63&t)}var t=65536+1024*(e.charCodeAt(0)-55296)+(e.charCodeAt(1)-56320);return fromCharCode(240|t>>>18&7)+fromCharCode(128|t>>>12&63)+fromCharCode(128|t>>>6&63)+fromCharCode(128|63&t)},re_utob=/[\uD800-\uDBFF][\uDC00-\uDFFFF]|[^\x00-\x7F]/g,utob=function(e){return e.replace(re_utob,cb_utob)},cb_encode=function(e){var t=[0,2,1][e.length%3],r=e.charCodeAt(0)<<16|(e.length>1?e.charCodeAt(1):0)<<8|(e.length>2?e.charCodeAt(2):0),o=[b64chars.charAt(r>>>18),b64chars.charAt(r>>>12&63),t>=2?"=":b64chars.charAt(r>>>6&63),t>=1?"=":b64chars.charAt(63&r)];return o.join("")},btoa=global.btoa?function(e){return global.btoa(e)}:function(e){return e.replace(/[\s\S]{1,3}/g,cb_encode)},_encode=buffer?buffer.from&&Uint8Array&&buffer.from!==Uint8Array.from?function(e){return(e.constructor===buffer.constructor?e:buffer.from(e)).toString("base64")}:function(e){return(e.constructor===buffer.constructor?e:new buffer(e)).toString("base64")}:function(e){return btoa(utob(e))},encode=function(e,t){return t?_encode(String(e)).replace(/[+\/]/g,function(e){return"+"==e?"-":"_"}).replace(/=/g,""):_encode(String(e))},encodeURI=function(e){return encode(e,!0)},re_btou=new RegExp(["[À-ß][-¿]","[à-ï][-¿]{2}","[ð-÷][-¿]{3}"].join("|"),"g"),cb_btou=function(e){switch(e.length){case 4:var t=(7&e.charCodeAt(0))<<18|(63&e.charCodeAt(1))<<12|(63&e.charCodeAt(2))<<6|63&e.charCodeAt(3),r=t-65536;return fromCharCode(55296+(r>>>10))+fromCharCode(56320+(1023&r));case 3:return fromCharCode((15&e.charCodeAt(0))<<12|(63&e.charCodeAt(1))<<6|63&e.charCodeAt(2));default:return fromCharCode((31&e.charCodeAt(0))<<6|63&e.charCodeAt(1))}},btou=function(e){return e.replace(re_btou,cb_btou)},cb_decode=function(e){var t=e.length,r=t%4,o=(t>0?b64tab[e.charAt(0)]<<18:0)|(t>1?b64tab[e.charAt(1)]<<12:0)|(t>2?b64tab[e.charAt(2)]<<6:0)|(t>3?b64tab[e.charAt(3)]:0),a=[fromCharCode(o>>>16),fromCharCode(o>>>8&255),fromCharCode(255&o)];return a.length-=[0,0,2,1][r],a.join("")},_atob=global.atob?function(e){return global.atob(e)}:function(e){return e.replace(/\S{1,4}/g,cb_decode)},atob=function(e){return _atob(String(e).replace(/[^A-Za-z0-9\+\/]/g,""))},_decode=buffer?buffer.from&&Uint8Array&&buffer.from!==Uint8Array.from?function(e){return(e.constructor===buffer.constructor?e:buffer.from(e,"base64")).toString()}:function(e){return(e.constructor===buffer.constructor?e:new buffer(e,"base64")).toString()}:function(e){return btou(_atob(e))},decode=function(e){return _decode(String(e).replace(/[-_]/g,function(e){return"-"==e?"+":"/"}).replace(/[^A-Za-z0-9\+\/]/g,""))},noConflict=function(){var e=global.Base64;return global.Base64=_Base64,e};if(global.Base64={VERSION:version,atob:atob,btoa:btoa,fromBase64:decode,toBase64:encode,utob:utob,encode:encode,encodeURI:encodeURI,btou:btou,decode:decode,noConflict:noConflict,__buffer__:buffer},"function"==typeof Object.defineProperty){var noEnum=function(e){return{value:e,enumerable:!1,writable:!0,configurable:!0}};global.Base64.extendString=function(){Object.defineProperty(String.prototype,"fromBase64",noEnum(function(){return decode(this)})),Object.defineProperty(String.prototype,"toBase64",noEnum(function(e){return encode(this,e)})),Object.defineProperty(String.prototype,"toBase64URI",noEnum(function(){return encode(this,!0)}))}}global.Meteor&&(Base64=global.Base64);void 0!==module&&module.exports?module.exports.Base64=global.Base64:(__WEBPACK_AMD_DEFINE_ARRAY__=[],__WEBPACK_AMD_DEFINE_RESULT__=function(){return global.Base64}.apply(exports,__WEBPACK_AMD_DEFINE_ARRAY__),void 0===__WEBPACK_AMD_DEFINE_RESULT__||(module.exports=__WEBPACK_AMD_DEFINE_RESULT__));return{Base64:global.Base64}}(global)}("undefined"!=typeof self?self:"undefined"!=typeof window?window:void 0!==global?global:this)}).call(this,__webpack_require__("yLpj"))},Mld3:function(e,t,r){"use strict";r.d(t,"c",function(){return a}),r.d(t,"b",function(){return i}),r.d(t,"a",function(){return n}),r.d(t,"e",function(){return s}),r.d(t,"d",function(){return c});var o=r("t3Un");function a(e){var t=e.order,r=e.limit,a=e.skip,i=e.keys,n=e.include,s=e.where;return Object(o.a)({url:"/classes/Datas",method:"get",params:{order:t,limit:r,skip:a,keys:i,include:n,where:s}})}function i(e){var t=e.order,r=e.limit,a=e.skip,i=e.keys,n=e.include,s=e.where;return Object(o.a)({url:"/classes/App",method:"get",params:{order:t,limit:r,skip:a,keys:i,include:n,where:s}})}function n(e){return Object(o.a)({url:"/classes/App",method:"post",data:{ACL:{"role:admin":{read:!0,write:!0},"role:root":{read:!0,write:!0},"*":{read:!0,write:!0}},copyright:e.copyright,title:e.name,config:{expires:e.expires},secret:e.secret,scale:e.scale,category:e.category,productIdentifier:e.productIdentifier,logo:e.img,desc:e.desc}})}function s(e,t){return Object(o.a)({url:"/classes/App/"+e,method:"put",data:{copyright:t.copyright,title:t.name,config:{expires:t.expires},secret:t.secret,scale:t.scale,category:t.category,productIdentifier:t.productIdentifier,logo:t.img,desc:t.desc}})}function c(e){if("number"==typeof e){e=String(e);var t=/0{8}$/,r=/0{4}$/;return t.test(e)?e.replace(t,"亿"):r.test(e)?e.replace(r,"万"):e}if("string"==typeof e){var o=/万+$/,a=/亿+$/;return a.test(e)?e.replace(a,"00000000"):o.test(e)?e.replace(o,"0000"):e}}},YPRo:function(e,t,r){"use strict";var o=r("yUOC");r.n(o).a},iUFg:function(e,t,r){"use strict";r.r(t);var o=r("gDS+"),a=r.n(o),i=r("Mld3"),n=r("J66h").Base64,s={data:function(){return{imageUrl:!1,host:window.location.origin+"/lot/",form:{name:"",options:[],category:"",number:"",code:"",scale:"",dashboard:"",scaleDate:[{id:0,value:500,label:"500"},{id:1,value:5e3,label:"5000"},{id:2,value:5e4,label:"5万"},{id:3,value:5e5,label:"50万"},{id:4,value:5e6,label:"500万"},{id:5,value:5e7,label:"5000万"},{id:6,value:1e8,label:"1亿"}],productIdentifier:"",fileList:[],img:"",copyright:"",desc:"",time:90,secret:""},sessionToken:"",file:"",page:"",content:{title:"",objectId:""},argu:{},Notification:""}},computed:{treeData:function(){var e=JSON.parse(a()(this.form.options));return e.filter(function(t){var r=e.filter(function(e){return t.id==e.parentid});return r.length>0&&(t.children=r),0==t.parentid})}},created:function(){this.Industry(),this.randomSecret(),this.sessionToken=sessionStorage.getItem("token")},mounted:function(){this.estiPage()},methods:{handleClickRefresh:function(){this.randomSecret()},randomSecret:function(){var e=Math.ceil(25*Math.random());this.form.secret=n.encode(String.fromCharCode(65+e)+Math.ceil(1e7*Math.random())+Number(new Date))},estiPage:function(){this.argu=this.$route.query,console.log(this.argu),this.content.title=this.argu.title,this.page=this.argu.page,"update"==this.page&&(this.form.name=this.argu.name,this.form.scale=Object(i.d)(this.argu.scale),this.form.secret=this.argu.secret,this.form.productIdentifier=this.argu.productIdentifier,this.content.objectId=this.argu.objectId,this.form.category=this.argu.category.split("/"),this.form.dashboard=this.argu.dashboard.substr(7),""!=this.argu.logo&&this.form.fileList.push({name:"logo.png",url:this.argu.logo}))},handleClickBack:function(){this.$router.push({path:"/roles/applicationManagement"})},submitUpload:function(){this.$refs.upload.submit()},handleChangeFile:function(e){var t=e.target.files[0],r=t.name.substr(-3);t.size/1024>500?this.$message.error("上传图片大小不能超过500KB!"):"png"!=r&&"jpg"!=r?this.$message.error("上传图片格式不正确，必须是png或jpg格式！"):this.file=t},handleSuccess:function(e,t,r){this.form.img=e.path,this.$message({message:"上传成功！",type:"success"}),document.getElementsByClassName("el-upload-list__item.is-success")[0].setAttribute("display","block"),document.getElementsByClassName("el-icon-close")[0].setAttribute("display","none")},handleError:function(e,t,r){this.$message({message:"上传失败！",type:"error"})},isSubmit:function(){return""!=this.form.name&&0!=this.$refs.category.currentValue.length&&""!=this.form.scale&&""!=this.form.productIdentifier||(this.$message.error("有必填项没有填写，无法提交！"),!1)},handleClickSubmit:function(){var e=this;if(this.isSubmit()){var t={};t.name=this.form.name,t.category=this.form.category.join("/"),t.scale=this.form.scale,t.productIdentifier=this.form.productIdentifier,t.copyright=this.form.copyright,t.desc=this.form.desc,t.img=this.form.img,t.secret=this.form.secret,t.expires=this.form.time,t.dashboard="http://"+this.form.dashboard,Object(i.a)(t).then(function(t){t.objectId?(e.$message({message:"添加成功！",type:"success"}),e.$router.push({path:"/roles/applicationManagement"})):e.$message.error("添加失败"+t.error)}).catch(function(t){e.$message.error("添加失败"+t.error)})}},handleClickUpdate:function(){var e=this;if(this.isSubmit()){var t=this.argu.objectId,r={};r.name=this.form.name,r.category=this.form.category.join("/"),r.scale=parseInt(this.form.scale),r.productIdentifier=this.form.productIdentifier,r.copyright=this.form.copyright,r.desc=this.form.desc,r.img=this.form.img,r.secret=this.form.secret,r.expires=this.form.time,r.dashboard="http://"+this.form.dashboard,Object(i.e)(t,r).then(function(t){t.updatedAt?(e.$message({message:"修改成功！",type:"success"}),e.$router.push({path:"/roles/applicationManagement"})):e.$message.error("修改失败"+t.error)})}},Industry:function(){var e=this;this.form.options=[],Object(i.c)({limit:1e3,where:{type:"category"}}).then(function(t){t&&(t.results.map(function(t){var r={};r.value=t.data.CategoryName,r.label=t.data.CategoryName,r.id=t.data.Id,r.parentid=t.data.SuperId,e.form.options.push(r)}),console.log())}).catch(function(t){e.$message({type:"error",message:t.error})})},open12:function(){this.Notification=this.$notify({title:"面板预览",dangerouslyUseHTMLString:!0,duration:0,type:"success",message:"<div><iframe\n                src='http://"+this.form.dashboard+'\'\n                width="1000"\n                height="400"\n                frameborder="0"\n      ></iframe></div>'})}},beforeDestroy:function(){this.Notification&&this.Notification.close()}},c=(r("ndfe"),r("YPRo"),r("KHd+")),l=Object(c.a)(s,function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("div",{attrs:{id:"addApp"}},[r("div",{staticClass:"head"},[r("el-breadcrumb",{attrs:{"separator-class":"el-icon-arrow-right"}},[r("el-breadcrumb-item",{attrs:{to:{path:"/roles/applicationManagement"}}},[e._v("应用管理")]),e._v(" "),r("el-breadcrumb-item",[e._v(e._s(e.content.title))])],1),e._v(" "),r("el-button",{attrs:{type:"primary",plain:"",size:"small"},on:{click:e.handleClickBack}},[e._v("返回应用管理")])],1),e._v(" "),r("div",{staticClass:"form"},[e._m(0),e._v(" "),r("el-form",{ref:"form",attrs:{model:e.form,"label-width":"120px"}},[r("el-row",[r("el-col",{attrs:{span:12}},[r("div",{staticClass:"grid-content bg-purple"},[r("el-form-item",{attrs:{label:"应用名称",prop:"name",rules:[{required:!0,message:"应用名称不能为空"}]}},[r("el-input",{attrs:{placeholder:"请填写应用名称"},model:{value:e.form.name,callback:function(t){e.$set(e.form,"name",t)},expression:"form.name"}})],1),e._v(" "),r("el-form-item",{attrs:{label:"应用链接",prop:"productIdentifier",rules:[{required:!0,message:"应用链接不能为空"}]}},[r("el-input",{staticClass:"link",attrs:{placeholder:"例：vcon"},model:{value:e.form.productIdentifier,callback:function(t){e.$set(e.form,"productIdentifier",t)},expression:"form.productIdentifier"}},[r("template",{slot:"prepend"},[e._v(e._s(e.host))])],2)],1),e._v(" "),r("el-form-item",{attrs:{label:"所属行业",prop:"category",rules:[{required:!0,message:"请选择所属行业",trigger:"blur"}]}},[r("el-cascader",{ref:"category",attrs:{options:e.treeData,placeholder:"请选择所属行业",clearable:""},model:{value:e.form.category,callback:function(t){e.$set(e.form,"category",t)},expression:"form.category"}})],1),e._v(" "),r("el-form-item",{attrs:{label:"应用描述"}},[r("el-input",{attrs:{type:"textarea",rows:4,maxlength:"300","show-word-limit":"",placeholder:"请输入应用描述信息"},model:{value:e.form.des,callback:function(t){e.$set(e.form,"des",t)},expression:"form.des"}})],1)],1)]),e._v(" "),r("el-col",{attrs:{span:12}},[r("div",{staticClass:"grid-content bg-purple-light"},[r("el-form-item",{attrs:{label:"应用图片"}},[r("el-upload",{ref:"upload",staticClass:"upload-demo",attrs:{action:"/iotapi/upload","file-list":e.form.fileList,"auto-upload":!1,"list-type":"picture",limit:1,"on-success":e.handleSuccess}},[r("el-button",{attrs:{slot:"trigger",size:"small",type:"primary"},slot:"trigger"},[e._v("选取文件")]),e._v(" "),r("el-button",{staticStyle:{"margin-left":"10px"},attrs:{size:"small",type:"success"},on:{click:e.submitUpload}},[e._v("上传到服务器")]),e._v(" "),r("span",{directives:[{name:"show",rawName:"v-show",value:""!=e.form.img,expression:"form.img != ''"}]},[e._v("路径:"+e._s(e.form.img))]),e._v(" "),r("div",{staticClass:"el-upload__tip",attrs:{slot:"tip"},slot:"tip"},[e._v("只能上传jpg/png文件，且不超过500kb")])],1)],1),e._v(" "),r("el-form-item",{attrs:{label:"版权信息"}},[r("el-input",{attrs:{type:"textarea",rows:3,maxlength:"300","show-word-limit":"",placeholder:"请填写版权信息"},model:{value:e.form.copyright,callback:function(t){e.$set(e.form,"copyright",t)},expression:"form.copyright"}})],1),e._v(" "),r("el-form-item",{attrs:{label:"面板地址"}},[r("el-input",{attrs:{placeholder:"面板地址"},model:{value:e.form.dashboard,callback:function(t){e.$set(e.form,"dashboard",t)},expression:"form.dashboard"}},[r("template",{slot:"prepend"},[e._v("http://")]),e._v(" "),r("el-button",{staticStyle:{background:"#409eff",color:"#ffffff","border-radius":"1px 1px 1px 0"},attrs:{slot:"append",type:"primary"},on:{click:e.open12},slot:"append"},[e._v("预览")])],2)],1)],1)])],1),e._v(" "),r("el-divider",[r("b",[e._v("应用配置")])]),e._v(" "),r("el-row",[r("el-col",{attrs:{span:12}},[r("div",{staticClass:"grid-content bg-purple"},[r("el-form-item",{attrs:{label:"应用接入规模",prop:"scale",rules:[{required:!0,message:"请选择应用接入规模",trigger:"change"}]}},[r("el-select",{attrs:{clearable:"",placeholder:"预计接入设备数量"},model:{value:e.form.scale,callback:function(t){e.$set(e.form,"scale",t)},expression:"form.scale"}},e._l(e.form.scaleDate,function(e){return r("el-option",{key:e.id,attrs:{label:e.label,value:e.value}})}))],1),e._v(" "),r("el-form-item",{attrs:{label:"Token有效时间"}},[r("el-input",{attrs:{"controls-position":"left",type:"number",min:1,placheholder:"请输入Token有效时间"},model:{value:e.form.time,callback:function(t){e.$set(e.form,"time",t)},expression:"form.time"}},[r("template",{slot:"append"},[e._v("秒")])],2)],1)],1)]),e._v(" "),r("el-col",{attrs:{span:12}},[r("div",{staticClass:"grid-content bg-purple-light"},[r("el-form-item",{attrs:{label:"App Secret"}},[r("el-input",{model:{value:e.form.secret,callback:function(t){e.$set(e.form,"secret",t)},expression:"form.secret"}},[r("el-button",{attrs:{slot:"append",icon:"el-icon-refresh-right"},on:{click:e.handleClickRefresh},slot:"append"})],1)],1)],1)])],1)],1),e._v(" "),r("div",{staticClass:"btns"},[r("el-button",{directives:[{name:"show",rawName:"v-show",value:"add"==e.page,expression:"page=='add'"}],attrs:{type:"primary"},on:{click:e.handleClickSubmit}},[e._v("提交")]),e._v(" "),r("el-button",{directives:[{name:"show",rawName:"v-show",value:"update"==e.page,expression:"page=='update'"}],attrs:{type:"primary"},on:{click:e.handleClickUpdate}},[e._v("修改")])],1)],1)])},[function(){var e=this.$createElement,t=this._self._c||e;return t("div",{staticClass:"title"},[t("p",{staticStyle:{color:"#f00"}},[this._v("*为必须填")])])}],!1,null,"0a7f3870",null);l.options.__file="addApp.vue";t.default=l.exports},ndfe:function(e,t,r){"use strict";var o=r("0rEV");r.n(o).a},yUOC:function(e,t,r){}}]);