(window.webpackJsonp=window.webpackJsonp||[]).push([["chunk-8383"],{"962Y":function(e,r,t){"use strict";var a=t("pcV5");t.n(a).a},nbyU:function(e,r,t){"use strict";t.r(r);var a=t("gDS+"),o=t.n(a),s=t("v0iw"),l={data:function(){var e=this;return{data:[],treeprops:{value:"objectId",label:"name"},nowuserid:"",ruleForm2:{account:"",phone:"",username:"",password:"",email:"",checkPass:"",departmentid:[]},id:"",rules2:{account:[{required:!0,message:"请输入账号",trigger:"blur"},{min:1,max:10,message:"长度在 1到 10 个字符",trigger:"blur"}],phone:[{required:!0,message:"请输入手机号",trigger:"blur"},{validator:function(e,r,t){/^1[34578]\d{9}$/.test(r)?t():t(new Error("手机号码格式不正确！"))},trigger:"blur"}],password:[{validator:function(e,r,t){""===r?t(new Error("请输入密码")):(/^\w{6,10}$/.test(r)||t(new Error("密码格式不正确")),t())},trigger:"blur",required:!0}],checkPass:[{validator:function(r,t,a){""===t?a(new Error("请再次输入密码")):t!==e.ruleForm2.password?a(new Error("两次输入密码不一致!")):a()},trigger:"blur",required:!0}],username:[{required:!0,message:"请输入昵称",trigger:"blur"},{min:2,max:5,message:"昵称格式不正确",trigger:"blur"}],email:[{required:!0,message:"请输入邮箱地址",trigger:"blur"},{type:"email",message:"请输入正确的邮箱地址",trigger:["blur","change"]}]}}},computed:{treeData:function(){var e=JSON.parse(o()(this.data));return e.filter(function(r){var t=e.filter(function(e){return r.objectId==e.ParentId});return t.length>0&&(r.children=t),0==r.ParentId})}},mounted:function(){this.getDepartment(),console.log(),this.nowuserid=s.Parse.User.current().id},methods:{submitForm:function(e){var r=this;console.log(this.ruleForm2.departmentid),this.$refs[e].validate(function(e){if(!e)return r.$message({message:"信息错误",type:"danger"}),!1;var t=new(s.Parse.Object.extend("_User"));if(0==r.ruleForm2.departmentid.length);else{var a=new(s.Parse.Object.extend("Department"));a.set("objectId",r.ruleForm2.departmentid[r.ruleForm2.departmentid.length-1]),t.set("department",a)}t.set("username",r.ruleForm2.account),t.set("nick",r.ruleForm2.username),t.set("password",r.ruleForm2.password),t.set("phone",r.ruleForm2.phone.toString()),t.set("email",r.ruleForm2.email);var o=new s.Parse.ACL;o.setReadAccess(r.nowuserid,!0),o.setWriteAccess(r.nowuserid,!0),t.set("ACL",o),t.save().then(function(e){r.$message({message:"新增成功",type:"success"}),r.$router.push({path:"/roles/structure"})},function(e){r.$message({type:"error",message:e.error})})})},getDepartment:function(){var e=this,r=s.Parse.Object.extend("Department");new s.Parse.Query(r).find().then(function(r){r.map(function(r){var t={};r.createtime=new Date(r.attributes.createdAt).toLocaleDateString(),t.name=r.attributes.name,t.ParentId=r.attributes.ParentId,t.objectId=r.id,t.level=r.attributes.level,t.createtime=r.createtime,e.data.push(t)})},function(r){e.$message({type:"error",message:r.error})})}}},n=(t("962Y"),t("KHd+")),u=Object(n.a)(l,function(){var e=this,r=e.$createElement,t=e._self._c||r;return t("div",{staticClass:"edituser"},[t("div",{staticClass:"admin",staticStyle:{"margin-bottom":"20px"}},[e._v("新增用户")]),e._v(" "),t("el-form",{ref:"ruleForm2",staticClass:"demo-ruleForm",attrs:{model:e.ruleForm2,"status-icon":"",rules:e.rules2,"label-width":"100px"}},[t("el-form-item",{attrs:{label:"账号",prop:"account"}},[t("el-input",{attrs:{placeholder:"请输入账号","auto-complete":"off"},model:{value:e.ruleForm2.account,callback:function(r){e.$set(e.ruleForm2,"account",r)},expression:"ruleForm2.account"}})],1),e._v(" "),t("el-form-item",{attrs:{label:"手机号",prop:"phone"}},[t("el-input",{attrs:{placeholder:"请输入手机号",maxlength:11,"auto-complete":"off"},model:{value:e.ruleForm2.phone,callback:function(r){e.$set(e.ruleForm2,"phone",e._n(r))},expression:"ruleForm2.phone"}})],1),e._v(" "),t("el-form-item",{attrs:{label:"邮箱",prop:"email"}},[t("el-input",{attrs:{placeholder:"请输入邮箱","auto-complete":"off"},model:{value:e.ruleForm2.email,callback:function(r){e.$set(e.ruleForm2,"email",r)},expression:"ruleForm2.email"}})],1),e._v(" "),t("el-form-item",{attrs:{label:"姓名",prop:"username"}},[t("el-input",{attrs:{placeholder:"2-5个文字",maxlength:5,"auto-complete":"off"},model:{value:e.ruleForm2.username,callback:function(r){e.$set(e.ruleForm2,"username",r)},expression:"ruleForm2.username"}})],1),e._v(" "),t("el-form-item",{attrs:{label:"密码",prop:"password"}},[t("el-input",{attrs:{type:"password","auto-complete":"off",placeholder:"请输入6-10位数字字母组合",maxlength:10},model:{value:e.ruleForm2.password,callback:function(r){e.$set(e.ruleForm2,"password",r)},expression:"ruleForm2.password"}})],1),e._v(" "),t("el-form-item",{attrs:{label:"确认密码",prop:"checkPass"}},[t("el-input",{attrs:{type:"password","auto-complete":"off",placeholder:"请再次输入密码",maxlength:10},model:{value:e.ruleForm2.checkPass,callback:function(r){e.$set(e.ruleForm2,"checkPass",r)},expression:"ruleForm2.checkPass"}})],1),e._v(" "),t("el-form-item",{attrs:{label:"部门选择"}},[t("el-cascader",{staticStyle:{width:"600px"},attrs:{placeholder:"请选择部门",props:e.treeprops,options:e.treeData,"auto-complete":"off","show-all-levels":!1,"change-on-select":""},model:{value:e.ruleForm2.departmentid,callback:function(r){e.$set(e.ruleForm2,"departmentid",r)},expression:"ruleForm2.departmentid"}})],1),e._v(" "),t("el-form-item",[t("el-button",{attrs:{type:"primary"},on:{click:function(r){e.submitForm("ruleForm2")}}},[e._v("保存")])],1)],1)],1)},[],!1,null,"50a8b2d6",null);u.options.__file="adduser.vue";r.default=u.exports},pcV5:function(e,r,t){}}]);