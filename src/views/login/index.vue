<template>
  <div class="login-container">
    <div class="loginbanner">
      <Pointwave style="width:100%;height:100%"></Pointwave>
      <el-form ref="loginForm" :model="loginForm" class="login-form" auto-complete="on" label-position="left">
        <div class="logo">
          <!-- <img :src="imgsrc" alt="logo" style="width:80px;height:80px;"> -->
          <p>JohnQian</p>
        </div>
        <el-form-item prop="username">
          <span class="svg-container">
            <svg-icon icon-class="user" />
          </span>
          <el-input v-model="loginForm.username" name="username" type="text" auto-complete="on" placeholder="请输入手机号/用户名" />
        </el-form-item>
        <el-form-item prop="password">
          <span class="svg-container">
            <svg-icon icon-class="password" />
          </span>
          <el-input v-model="loginForm.password" name="password" auto-complete="on" placeholder="请输入密码" :type="pwdType" @keyup.enter.native="handleLogin"
          /> 
          <span class="show-pwd" @click="showPwd">
            <svg-icon icon-class="eye" />
          </span>
        </el-form-item>
        <div style="margin-bottom:40px;height:30px;line-height:30px;">
          <el-checkbox v-model="checked" style="float:left;color:#409EFF">记住密码</el-checkbox>
          <span style="float:right;color:#409EFF;font-size:14px;cursor:pointer" @click="register">注册用户</span>
          <span style="float:right;color:#409EFF;font-size:14px;cursor:pointer;margin-right:20px;" @click="phonelogin">手机号登录</span>
        </div>
        <el-form-item>
          <el-button type="primary" style="width:100%;letter-spacing:10px;" @click.native.prevent="handleLogin">登陆</el-button>
        </el-form-item>
        <!-- <div style="margin-top:20px;height:30px;line-height:30px;">
          
        </div>-->
      </el-form>
    </div>
  </div>
</template>
 
<script>
  import { isvalidUsername } from "@/utils/validate";
  import { login } from "@/api/login";
  import Cookies from "js-cookie";
  import { Parse } from "parse";
  import {  setToken } from '@/utils/auth'
  import Config from '@/config'
  import {
    getsession
  } from "@/utils/wxscoket.js";
  import { Sitepro } from '@/api/login'
  import Pointwave from '@/components/three'
  export default {
    name: "Login",
    components:{
      Pointwave
    },
    data() {
      const validateUsername = (rule, value, callback) => {
        if (!isvalidUsername(value)) {
          callback(new Error("请输入正确的用户名"));
        } else {
          callback();
        }
      };
      const validatePass = (rule, value, callback) => {
        if (value.length < 5) {
          callback(new Error("密码不能小于5位"));
        } else {
          callback();
        }
      };
      return {
        title: "",
        loginForm: {
          username: "",
          password: ""
        },
        loginRules: {
          username: [
            { required: true, trigger: "blur", validator: validateUsername }
          ],
          password: [{ required: true, trigger: "blur", validator: validatePass }]
        },
        loading: false,
        pwdType: "password",
        redirect: undefined,
        checked: false,
        imgsrc: require("../../imgages/u50.png"),
        logosrc: '',
        backgroundsrc: require("../../imgages/login_background.png"),
        redirect: undefined,
        routes: [],
      };
    },
    methods: {
      // 获取标题
      getTitle() {
        let pro = window.location.pathname;
        pro = pro.slice(5, pro.length);
        
        pro = pro == '' ? 'develop' : pro
      
        Parse.User.logOut();
        Sitepro(pro).then(resultes => {
          this.title = resultes.title
          this.logosrc = resultes.logo
          sessionStorage.setItem('product_title', resultes.title)
          sessionStorage.setItem('dashboard', resultes.dashboard)
          sessionStorage.setItem('imgsrc', resultes.logo)
          sessionStorage.setItem('copyright', resultes.copyright)
          sessionStorage.setItem('roletype', pro)
        })
 
      },
      showPwd() {
        if (this.pwdType === "password") {
          this.pwdType = "";
        } else {
          this.pwdType = "password";
        }
      },
      handleLogin() {
        this.routes=[]
        this.$refs.loginForm.validate(valid => {
          if (valid) {
            var user = this.loginForm
            Parse.User.logIn(this.loginForm.username, this.loginForm.password)
              .then(user => {
                getsession(user.attributes.sessionToken)
                Cookies.set("sessionToken", user.attributes.sessionToken)
                var Menu = Parse.Object.extend("Navigation");
                var menu = new Parse.Query(Menu);
                menu
                  .find()
                  .then(menu => {
                    var menu1 = menu
                    menu1.map(items => {
                      if (items.attributes.parent) {
                        this.routes.push(items)
                      }
                    })
                    sessionStorage.setItem("username", user.attributes.username);
                    sessionStorage.setItem("roles", user.attributes.roles[0].alias);
                    sessionStorage.setItem("list", JSON.stringify(this.routes));
                    sessionStorage.setItem('token', user.attributes.sessionToken)
                    sessionStorage.setItem('type', 'vcon')
                    this.$router.push({ path: this.redirect || '/dashboard' })
                  })
              })
              .catch(error => {
                if (error.code == 101) {
                  if(error.message.indexOf('Invalid')==-1){
                     this.$message({
                      type: "warning",
                      message: '密码输入错误次数过多，该账户已被锁住'
                    });
                  }else{
                    this.$message({
                      type: "warning",
                      message: '用户名或密码错误'
                    });
                  }
                 
                }
                else {
                  this.$message({
                    type: "warning",
                    message: error.message
                   });
                }
 
              });
          } else {
            console.log("error submit!!");
            return false;
          }
        });
      },
      register() {
        this.$router.push({
          path: "/register"
        });
      },
      phonelogin() {
        this.$router.push({
          path: '/phonelogin',
          query: {
            action: 'login'
          }
        })
      }
    },
    created() { 
      this.getTitle();
      sessionStorage.setItem("list",'[]');
    }
  };
</script>
 
<style rel="stylesheet/scss" lang="scss">
  $light_gray: rgba(0, 0, 0, 0.247058823529412);
 
  /* reset element-ui css */
 
  .login-container {
    background: url("../../imgages/login_background.png") no-repeat;
    height: 100%;
    background-size: cover;
    overflow-y: hidden;
    .loginbanner {
      background: transparent;
      padding: 16px;
      box-sizing: border-box;
      overflow: hidden;
      .el-input {
        display: inline-block;
        height: 47px;
        width: 85%;
 
        input {
          background: transparent;
          border: 1px;
          -webkit-appearance: none;
          border-radius: 0px;
          padding: 12px 5px 12px 15px;
          color: $light_gray;
          height: 47px;
          &:-webkit-autofill {
            // -webkit-box-shadow: 0 0 0px 1000px $bg inset !important;
            -webkit-text-fill-color: black !important;
          }
        }
      }
      .el-form-item {
        border: 1px solid rgba(255, 255, 255, 0.1);
        background: #ffffff;
        border-radius: 5px;
        color: #454545;
      }
    }
 
  }
</style>
 
<style rel="stylesheet/scss" lang="scss" scoped>
  $bg: rgba(45, 58, 75, 0.8);
  $dark_gray: #889aa4;
  $light_gray: #eee;
  .login-container {
    position: fixed;
    height: 100%;
    width:100%;
    background-color: teal;
    .login-form {
      position: absolute;
      height: 500px;
      left:0;
      top:0;
      right:0;
      bottom:0;
      width: 520px;
      max-width: 100%;
      padding: 35px 35px 15px 35px;
      background: rgba(40, 144, 250, 0.2);
      box-shadow: 0px 1px 3px 0px rgba(0, 0, 0, 0.2), 0px 1px 1px 0px rgba(0, 0, 0, 0.14), 0px 2px 1px -1px rgba(0, 0, 0, 0.12);
      border-radius: 5px;
      margin:auto;
      border: 1px solid #2890fa;
    }
    @media screen and (max-width: 1024px) {
      .login-form {
        width:auto;
        max-width: 100%;
        padding: 35px 35px 15px 35px;
        margin: 1.2rem;
    }
      }
    .login_bottom {
      position: absolute;
      left: 0;
      right: 0;
      bottom: 20px;
      width: 520px;
     
      max-width: 100%;
      padding: 35px 35px 15px 35px;
      margin: 0 auto;
      text-align: center;
      color: #ffffff;
      font-size: 14px;
      img {
        height: 16px;
        width: 16px;
        vertical-align: middle;
        margin: 0 2px;
      }
    }
    .tips {
      font-size: 14px;
      color: #fff;
      margin-bottom: 10px;
      span {
        &:first-of-type {
          margin-right: 16px;
        }
      }
    }
    .svg-container {
      padding: 6px 5px 6px 15px;
      color: $dark_gray;
      vertical-align: middle;
      width: 30px;
      display: inline-block;
    }
    .title {
      font-size: 26px;
      font-weight: 400;
      color: $light_gray;
      margin: 0px auto 40px auto;
      text-align: center;
      font-weight: bold;
    }
    .show-pwd {
      position: absolute;
      right: 10px;
      top: 7px;
      font-size: 16px;
      color: $dark_gray;
      cursor: pointer;
      user-select: none;
    }
  }
  .logo {
    display: flex;
    justify-content: center;
    margin-bottom: 10px;
    p {
      font-size: 30px;
      font-weight: bold;
      margin: 25px 0;
    }
    
  }
</style>
<style>
  .login-container .el-form-item__content {
    border: 1px solid #cccccc;
    border-radius: 5px;
  }
  .login-container .loginbanner .el-input input {
    color: black;
  }
</style>