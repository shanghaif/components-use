<template>
  <div :class="{'has-logo':showLogo}">
    <logo v-if="showLogo" :collapse="isCollapse" />
    <el-scrollbar wrap-class="scrollbar-wrapper">
      <el-menu
        :default-active="activeMenu"
        :collapse="isCollapse"
        :background-color="variables.menuBg"
        :text-color="variables.menuText"
        :unique-opened="false"
        :active-text-color="variables.menuActiveText"
        :collapse-transition="false"
        mode="vertical"
      >
        <sidebar-item v-for="route in routes" :key="route.path" :item="route" :base-path="route.path" />
      </el-menu>
    </el-scrollbar>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import Logo from './Logo'
import SidebarItem from './SidebarItem'
import variables from '@/styles/variables.scss'

export default {
  components: { SidebarItem, Logo },
  data(){
    return{
      route:[],
      originroute:[],
      comparroute:[],
        routes1:[],
        routes2:[],
        routes3:[],
        username:'',
        token:'',
        type:''
    }
  },
  computed: {
    ...mapGetters([
      'sidebar'
    ]),
     routes() {
      this.username=sessionStorage.getItem('username')
      this.token = sessionStorage.getItem('token')
      // this.type = sessionStorage.getItem('type')
      if(!this.username||!this.token){
        this.$router.push('/login')
      }else{
      // this.originroute = this.$router.options.routes
       
      let cloneData = JSON.parse(JSON.stringify(this.routes1)); // 对源数据深度克隆
        cloneData.unshift({
          name:'首页',
          icon:'dashboard',
          url:'/dashboard'
        })
      cloneData.map(items=>{
        if(items.url=='/swagger/'){
          items.url='http://'+location.host+'/swagger/'
        }
          if(items.name=='帮助中心'){
            items.children.map(child=>{
              if(child.url=='/swagger/'){
                  child.url='http://'+location.host+'/swagger/'
              }
           })
          }
      })
      return cloneData
    }
    },
    activeMenu() {
      const route = this.$route
      const { meta, path } = route
      // if set path, the sidebar will highlight the path you set
      if (meta.activeMenu) {
        return meta.activeMenu
      }
      return path
    },
    variables() {
      return variables
    },
    isCollapse() {
      return !this.sidebar.opened
    }
  },
  mounted() {
    this.routes1= JSON.parse(sessionStorage.getItem('list'))
  },
}
</script>
