(window.webpackJsonp=window.webpackJsonp||[]).push([["chunk-d9dd"],{"3R7F":function(e,t,r){},J66h:function(module,exports,__webpack_require__){(function(global){var __WEBPACK_AMD_DEFINE_ARRAY__,__WEBPACK_AMD_DEFINE_RESULT__;!function(global,factory){module.exports=function(global){"use strict";var _Base64=(global=global||{}).Base64,version="2.5.1",buffer;if(void 0!==module&&module.exports)try{buffer=eval("require('buffer').Buffer")}catch(e){buffer=void 0}var b64chars="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/",b64tab=function(e){for(var t={},r=0,o=e.length;r<o;r++)t[e.charAt(r)]=r;return t}(b64chars),fromCharCode=String.fromCharCode,cb_utob=function(e){if(e.length<2){var t=e.charCodeAt(0);return t<128?e:t<2048?fromCharCode(192|t>>>6)+fromCharCode(128|63&t):fromCharCode(224|t>>>12&15)+fromCharCode(128|t>>>6&63)+fromCharCode(128|63&t)}var t=65536+1024*(e.charCodeAt(0)-55296)+(e.charCodeAt(1)-56320);return fromCharCode(240|t>>>18&7)+fromCharCode(128|t>>>12&63)+fromCharCode(128|t>>>6&63)+fromCharCode(128|63&t)},re_utob=/[\uD800-\uDBFF][\uDC00-\uDFFFF]|[^\x00-\x7F]/g,utob=function(e){return e.replace(re_utob,cb_utob)},cb_encode=function(e){var t=[0,2,1][e.length%3],r=e.charCodeAt(0)<<16|(e.length>1?e.charCodeAt(1):0)<<8|(e.length>2?e.charCodeAt(2):0),o=[b64chars.charAt(r>>>18),b64chars.charAt(r>>>12&63),t>=2?"=":b64chars.charAt(r>>>6&63),t>=1?"=":b64chars.charAt(63&r)];return o.join("")},btoa=global.btoa?function(e){return global.btoa(e)}:function(e){return e.replace(/[\s\S]{1,3}/g,cb_encode)},_encode=buffer?buffer.from&&Uint8Array&&buffer.from!==Uint8Array.from?function(e){return(e.constructor===buffer.constructor?e:buffer.from(e)).toString("base64")}:function(e){return(e.constructor===buffer.constructor?e:new buffer(e)).toString("base64")}:function(e){return btoa(utob(e))},encode=function(e,t){return t?_encode(String(e)).replace(/[+\/]/g,function(e){return"+"==e?"-":"_"}).replace(/=/g,""):_encode(String(e))},encodeURI=function(e){return encode(e,!0)},re_btou=new RegExp(["[À-ß][-¿]","[à-ï][-¿]{2}","[ð-÷][-¿]{3}"].join("|"),"g"),cb_btou=function(e){switch(e.length){case 4:var t=(7&e.charCodeAt(0))<<18|(63&e.charCodeAt(1))<<12|(63&e.charCodeAt(2))<<6|63&e.charCodeAt(3),r=t-65536;return fromCharCode(55296+(r>>>10))+fromCharCode(56320+(1023&r));case 3:return fromCharCode((15&e.charCodeAt(0))<<12|(63&e.charCodeAt(1))<<6|63&e.charCodeAt(2));default:return fromCharCode((31&e.charCodeAt(0))<<6|63&e.charCodeAt(1))}},btou=function(e){return e.replace(re_btou,cb_btou)},cb_decode=function(e){var t=e.length,r=t%4,o=(t>0?b64tab[e.charAt(0)]<<18:0)|(t>1?b64tab[e.charAt(1)]<<12:0)|(t>2?b64tab[e.charAt(2)]<<6:0)|(t>3?b64tab[e.charAt(3)]:0),n=[fromCharCode(o>>>16),fromCharCode(o>>>8&255),fromCharCode(255&o)];return n.length-=[0,0,2,1][r],n.join("")},_atob=global.atob?function(e){return global.atob(e)}:function(e){return e.replace(/\S{1,4}/g,cb_decode)},atob=function(e){return _atob(String(e).replace(/[^A-Za-z0-9\+\/]/g,""))},_decode=buffer?buffer.from&&Uint8Array&&buffer.from!==Uint8Array.from?function(e){return(e.constructor===buffer.constructor?e:buffer.from(e,"base64")).toString()}:function(e){return(e.constructor===buffer.constructor?e:new buffer(e,"base64")).toString()}:function(e){return btou(_atob(e))},decode=function(e){return _decode(String(e).replace(/[-_]/g,function(e){return"-"==e?"+":"/"}).replace(/[^A-Za-z0-9\+\/]/g,""))},noConflict=function(){var e=global.Base64;return global.Base64=_Base64,e};if(global.Base64={VERSION:version,atob:atob,btoa:btoa,fromBase64:decode,toBase64:encode,utob:utob,encode:encode,encodeURI:encodeURI,btou:btou,decode:decode,noConflict:noConflict,__buffer__:buffer},"function"==typeof Object.defineProperty){var noEnum=function(e){return{value:e,enumerable:!1,writable:!0,configurable:!0}};global.Base64.extendString=function(){Object.defineProperty(String.prototype,"fromBase64",noEnum(function(){return decode(this)})),Object.defineProperty(String.prototype,"toBase64",noEnum(function(e){return encode(this,e)})),Object.defineProperty(String.prototype,"toBase64URI",noEnum(function(){return encode(this,!0)}))}}global.Meteor&&(Base64=global.Base64);void 0!==module&&module.exports?module.exports.Base64=global.Base64:(__WEBPACK_AMD_DEFINE_ARRAY__=[],__WEBPACK_AMD_DEFINE_RESULT__=function(){return global.Base64}.apply(exports,__WEBPACK_AMD_DEFINE_ARRAY__),void 0===__WEBPACK_AMD_DEFINE_RESULT__||(module.exports=__WEBPACK_AMD_DEFINE_RESULT__));return{Base64:global.Base64}}(global)}("undefined"!=typeof self?self:"undefined"!=typeof window?window:void 0!==global?global:this)}).call(this,__webpack_require__("yLpj"))},KEOM:function(e,t,r){"use strict";var o=r("3R7F");r.n(o).a},Q5hx:function(e,t,r){"use strict";var o=r("eLCJ");r.n(o).a},SL4F:function(e,t,r){},SyG9:function(e,t,r){"use strict";var o=r("SL4F");r.n(o).a},avsa:function(e,t,r){e.exports=r.p+"static/img/shuwa_logo.f09e23e.png"},eLCJ:function(e,t,r){},u9TG:function(e,t,r){"use strict";r.r(t);var o=r("gDS+"),n=r.n(o),a=r("v0iw"),s=r.n(a),i=r("fe1z"),u=r("p46w"),c=r.n(u),l=r("J66h").Base64,d={data:function(){var e=this;return{phonesms:"手机验证码",time:60,sendMsgDisabled:!1,code:"",actions:"",routes:[],logosrc:r("avsa"),ruleForm2:{account:"",phone:"",username:"",password:"",email:"",checkPass:"",diqu:[],value:"+86/中国",time:0},origin:["+86/中国","+886/中国台湾","+852/中国香港","+91/India","+244/Angola","+54/Argentina","+1/American Samoa","+880/Bangladesh","+56/Chile","+855/Cambodia","+20/Egypt","+33/France","+49/Germany","+62/Indonesia","+353/Ireland","+972/Israel","+39/Italy","+81/Japan","+60/Malaysia","+63/Philippines","+92/Pakistan","+82/South Korea","+46/Sweden","+65/Singapore","+27/South Africa","+66/Thailand","+971/United Arab Emirates","+44/United Kingdom","+1/United States","+84/Vietnam","+967/Yemen","+260/Zambia"],rules2:{account:[{required:!0,message:"请输入账号",trigger:"blur"},{min:1,max:10,message:"长度在 1到 10 个字符",trigger:"blur"}],phone:[{required:!0,message:"请输入手机号",trigger:"blur"},{validator:function(e,t,r){/^1[34578]\d{9}$/.test(t)?r():r(new Error("手机号码格式不正确！"))},trigger:"blur"}],password:[{validator:function(e,t,r){""===t?r(new Error("请输入密码")):(/^\w{6,10}$/.test(t)||r(new Error("密码格式不正确")),r())},trigger:"blur",required:!0}],checkPass:[{validator:function(t,r,o){""===r?o(new Error("请再次输入密码")):r!==e.ruleForm2.password?o(new Error("两次输入密码不一致!")):o()},trigger:"blur",required:!0}],username:[{required:!0,message:"请输入姓名",trigger:"blur"},{min:2,max:5,message:"姓名格式不正确",trigger:"blur"}],email:[{required:!0,message:"请输入邮箱地址",trigger:"blur"},{type:"email",message:"请输入正确的邮箱地址",trigger:["blur","change"]}]}}},mounted:function(){var e=this;this.$route.query.phone&&(this.ruleForm2.phone=l.decode(this.$route.query.phone),this.$refs.phonerole.$refs.input.disabled=!0),this.ruleForm2.diqu=[],this.actions=this.$route.query.action,this.origin.map(function(t){e.ruleForm2.diqu.push({label:t,value:t.toString()})})},methods:{showPwd:function(){"password"===this.pwdType?this.pwdType="":this.pwdType="password"},login:function(){this.$router.push({path:"/login"})},submitForm:function(e){var t=/^1[34578]\d{9}$/,r=this;r.$refs[e].validate(function(e){if(!e||!t.test(r.ruleForm2.phone))return r.$message({message:"信息错误",type:"error"}),!1;Object(i.e)(r.actions,r.ruleForm2.phone,r.code).then(function(e){s.a.User.become(e.sessionToken).then(function(t){c.a.set("sessionToken",e.sessionToken);var o=s.a.Object.extend("Navigation");new s.a.Query(o).find().then(function(o){o.map(function(e){console.log(e),e.attributes.parent&&r.routes.push(e)}),r.$message({message:"成功登录",type:"success"}),sessionStorage.setItem("username",t.attributes.username),sessionStorage.setItem("list",n()(r.routes)),sessionStorage.setItem("token",e.sessionToken),c.a.set("token",e.sessionToken),r.$router.push({path:r.redirect||"/dashboard"})})})},function(e){console.log(e)})})},send:function(){var e=this,t=this;if(/^1[34578]\d{9}$/.test(t.ruleForm2.phone)){t.sendMsgDisabled=!0,Object(i.a)(t.ruleForm2.phone,encodeURIComponent(t.ruleForm2.value)).then(function(t){e.$message({message:"发送成功",type:"success"}),e.time=t.expire}).catch(function(e){console.log(e)});var r=window.setInterval(function(){t.time--<=0&&(t.time=60*this.time,t.sendMsgDisabled=!1,window.clearInterval(r))},1e3)}else this.$message({message:"请输入正确的手机号",type:"warning"})}}},f=(r("SyG9"),r("Q5hx"),r("KEOM"),r("KHd+")),b=Object(f.a)(d,function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("div",{staticClass:"login-container"},[r("div",{staticClass:"loginbanner"},[r("el-form",{ref:"ruleForm2",staticClass:"login-form",attrs:{model:e.ruleForm2,"status-icon":"",rules:e.rules2,"label-width":"100px"}},[r("img",{staticStyle:{"margin-bottom":"30px"},attrs:{src:e.logosrc,alt:""}}),e._v(" "),r("el-form-item",{staticStyle:{"border-radius":"0"}},[r("span",{staticClass:"svg-container"},[r("el-select",{staticStyle:{border:"0"},attrs:{placeholder:"请选择手机区域"},model:{value:e.ruleForm2.value,callback:function(t){e.$set(e.ruleForm2,"value",t)},expression:"ruleForm2.value"}},e._l(e.ruleForm2.diqu,function(e){return r("el-option",{key:e.value,attrs:{label:e.label,value:e.value}})}))],1),e._v(" "),r("el-input",{ref:"phonerole",staticStyle:{width:"250px"},attrs:{name:"phone",type:"text","auto-complete":"on",maxlength:11,placeholder:"请输入手机号"},model:{value:e.ruleForm2.phone,callback:function(t){e.$set(e.ruleForm2,"phone",t)},expression:"ruleForm2.phone"}})],1),e._v(" "),r("div",{staticClass:"yzm",staticStyle:{height:"50px","margin-left":"20px","margin-bottom":"20px"}},[r("span",{staticClass:"svg-container",staticStyle:{float:"left",width:"25%"}},[r("el-input",{staticStyle:{border:"1px solid #cccccc","border-radius":"0",width:"100%","border-right":"0px"},attrs:{type:"text",disabled:""},model:{value:e.phonesms,callback:function(t){e.phonesms=t},expression:"phonesms"}})],1),e._v(" "),r("el-input",{staticClass:"yzm",staticStyle:{width:"50%",float:"left",border:"1px solid #cccccc","border-radius":"0"},attrs:{type:"text",placeholder:"请输入验证码"},model:{value:e.code,callback:function(t){e.code=t},expression:"code"}}),e._v(" "),r("el-button",{staticStyle:{float:"right",padding:"12px 15px 12px 15px",width:"25%","border-radius":"0",height:"47px"},attrs:{disabled:e.sendMsgDisabled,type:"primary"},on:{click:e.send}},[e.sendMsgDisabled?r("span",[e._v(e._s(e.time+"秒后获取"))]):e._e(),e._v(" "),e.sendMsgDisabled?e._e():r("span",[e._v("发送验证码")])])],1),e._v(" "),r("el-form-item",{staticStyle:{"margin-top":"50px"}},[r("el-button",{staticStyle:{width:"100%","letter-spacing":"10px"},attrs:{type:"primary"},on:{click:function(t){e.submitForm("ruleForm2")}}},[e._v("确 定")])],1),e._v(" "),r("div",{staticClass:"hasuser"},[r("span",{staticStyle:{color:"#409EFF","font-size":"14px",cursor:"pointer"},on:{click:e.login}},[e._v("账号密码登陆")])])],1)],1)])},[],!1,null,"dde31b38",null);b.options.__file="phonesms.vue";t.default=b.exports}}]);