<template>
  <div id="app">
    <router-view v-if="isRouterAlive"/>
  </div>
</template>

<script>
import Cookies from 'js-cookie'
import{Parse} from 'parse'
// import {sessionme} from '@/api/login'
export default {
  name: 'App',
  provide () {
    return {
      reload: this.reload
    }
  },
  data(){
    return{
        username:'',
        token:'',
        isRouterAlive: true
    }
  },
  mounted(){
     Parse.initialize("shuwa", "webapi","HZlora2017");
    // Parse.serverURL = "http://148.70.107.74:5080/iotapi";//金鳞的库
    Parse.serverURL = "http://ci.iotn2n.com:5080/iotapi";
    // Parse.serverURL = "http://192.168.2.113:5080/iotapi";//莫易的库
    // Parse.serverURL = "http://132.232.121.164:5080/iotapi";//伟星的库
    // Parse.serverURL = "http://148.70.50.192:5080/iotapi"
    // Parse.serverURL = "http://prod.iotn2n.com/iotapi";//线上环境
    // Parse.serverURL = "http://139.155.158.43:5080/iotapi";//三千万环境
    // Parse.serverURL = '/iotapi'
  },
  methods:{
    getuser(){
      //  Parse.current()
      // this.username=sessionStorage.getItem('username')||''
      // this.token = sessionStorage.getItem('token')||''
      // if(!this.username||!this.token){
      //   this.$router.push('/login')
      // }
    },
    reload () {
      this.isRouterAlive = false
      this.$nextTick(function () {
        this.isRouterAlive = true
      })
    }
  }
}
</script>
<style>
section{
  background:#f0f2f5;
}
#nprogress .bar {
      background: #67c23a !important;
    }
</style>
