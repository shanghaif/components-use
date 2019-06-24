<template>
  <el-menu class="navbar" style="background:#549ce6">
    <!-- <hamburger :toggle-click="toggleSideBar" :is-active="sidebar.opened" class="hamburger-container"/> -->
    <!-- <breadcrumb  class="breadcrumb-container"/> -->
     <div class="systitle">
      <h2 v-if="type=='vcon'">海量电能量采集系统</h2>
      <h2 v-if="type=='pump'">水泵智能检测大数据平台</h2>
    </div>
    <el-tooltip :content="$t('navbar.screenfull')" effect="dark" placement="bottom" >
          <screenfull class="screenfull right-menu-item"/>
    </el-tooltip>
    <!-- <div class="language">
      <lang-select class="international right-menu-item"/>
    </div> -->
     <div class="username">
      <span class="user" style="color:#acd0f1">欢迎您：{{username}}</span>
    </div>
    <el-dropdown class="avatar-container" trigger="click">
      <div class="avatar-wrapper">
        <img :src="imgsrc" class="user-avatar">
        <i class="el-icon-caret-bottom"/>
      </div>
      <el-dropdown-menu slot="dropdown">
          <router-link to="/">
            <el-dropdown-item>
              {{ $t('navbar.Home') }}
            </el-dropdown-item>
          </router-link>
            <router-link to="/userinfo">
            <el-dropdown-item>
              个人中心
            </el-dropdown-item>
          </router-link>
          <el-dropdown-item divided>
            <span style="display:block;" @click="logout">{{ $t('navbar.logOut') }}</span>
          </el-dropdown-item>
        </el-dropdown-menu>
    </el-dropdown>
  </el-menu>
</template>
 
<script>
import { mapGetters } from 'vuex'
import Breadcrumb from '@/components/Breadcrumb'
import Hamburger from '@/components/Hamburger'
import {logoutBtn} from '@/api/login'
import Cookies from 'js-cookie'
// export { default as Sidebar } from './Sidebar'
// import LangSelect from '@/components/LangSelect'
import Screenfull from '@/components/Screenfull'
import Parse from 'parse'
// import SizeSelect from '@/components/SizeSelect'
export default {
  data(){
   return{
     imgsrc:require('../../../imgages/banner.png'),
     username:'',
     type:''
   }
  },
  components: {
    Breadcrumb,
    Hamburger,
    // LangSelect,
    Screenfull,
    // Sidebar
 
  },
  computed: {
    ...mapGetters([
      'sidebar',
      'avatar'
    ])
  },
  methods: {
    toggleSideBar() {
      this.$store.dispatch('ToggleSideBar')
    },
    logout() {
     Parse.User.logOut(this.username).then(res=>{
        this.$router.push('/login')
        sessionStorage.removeItem('username')
        sessionStorage.removeItem('token')
        sessionStorage.removeItem('list')
      },(error=>{
         this.$router.push('/login')
        sessionStorage.removeItem('username')
        sessionStorage.removeItem('token')
        sessionStorage.removeItem('list')
      }))
    },
    getFullCreeen(){
      
    }
  },
  mounted() {
    this.username = sessionStorage.getItem('username')
    this.type = sessionStorage.getItem('type')
  },
}
</script>
 
<style rel="stylesheet/scss" lang="scss" scoped>
.navbar {
  height: 50px;
  line-height: 50px;
  border-radius: 0px !important;
  .language{
     height: 50px;
    display: inline-block;
    position: absolute;
    right: 100px;
  }
  .username{
     height: 50px;
    display: inline-block;
    position: absolute;
    right: 150px;
  }
  .systitle{
     height: 50px;
    position: absolute;
    left:20px;
    top:-25px;
    font-size:20px;
    color:white;
    h2{
      width:100%;
      height:100%;
      line-height:50px;
    }
  }
  .size{
     height: 50px;
    display: inline-block;
    position: absolute;
    right: 140px;
  }
  .hamburger-container {
    line-height: 58px;
    height: 80px;
    float: left;
    padding: 0 10px;
  }
  .screenfull {
    position: absolute;
    right:100px;
    top: 16px;
    color: red;
  }
  .avatar-container {
    height: 50px;
    display: inline-block;
    position: absolute;
    right: 35px;
    .avatar-wrapper {
      cursor: pointer;
      margin-top: 5px;
      position: relative;
      line-height: initial;
      .user-avatar {
        width: 40px;
        height: 40px;
        border-radius: 10px;
      }
      .el-icon-caret-bottom {
        position: absolute;
        right: -20px;
        top: 25px;
        font-size: 12px;
      }
    }
  }
}
</style>