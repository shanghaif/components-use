import Vue from 'vue'

import 'normalize.css/normalize.css' // A modern alternative to CSS resets

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
// import Axios from 'axios'
import '@/styles/index.scss' // global css
import api from './api/index.js'
import App from './App'
import router from './router'
import store from './store'
import service from '@/utils/request.js'
import i18n from './common/language'
import echarts from 'echarts'
import VueResource from 'vue-resource'
import '@/icons' // icon
import '@/permission' // permission control
import './assets/iconfont/iconfont.css'
// 引入Animate.css
import animate from "animate.css"
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
// import Cookies from 'js-cookie'
// import lang from '@/common/lang' // 中英文翻译
// import * as fundebug from "fundebug-javascript";
// import fundebugVue from "fundebug-vue";
// fundebug.apikey = "2a79df8192f2096e7172aa1a8f8fb37e2b9fcdb6d697def0461c1cd90fe4055c"
// fundebugVue(fundebug, Vue);
// import './mock'
import { ApolloClient } from 'apollo-client'
//前端全栈开发交流圈：866109386
import { HttpLink } from 'apollo-link-http'
 //帮助1-3经验年前端开发人员，提升技术，思维
import { InMemoryCache } from 'apollo-cache-inmemory'
import {ApolloLink} from 'apollo-link'
import VueApollo from 'vue-apollo'

const httpLink = new HttpLink({

// You should use an absolute URL here

//config.js 代理设置

    // '/graphql': {

    // target: "http://45.40.201.220:5080/iotapi/graphql",

    // changeOrigin: true,

    // pathRewrite: {

    // '^/graphql': '/graphql'

    // }

    // },

    uri: '/iotapi/graphql',//访问地址,在这里使用代理

})
// const middlewareLink = new ApolloLink((operation, forward) => {
  
//   operation.setContext({
//     headers: {
//        "Content-Security-Policy": "default-src 'none'",
//     }
//   })
//   return forward(operation)
// })

// Create the apollo client

const apolloClient = new ApolloClient({

link: httpLink,

cache: new InMemoryCache(),

connectToDevTools: true,

})

// Install the vue plugin

Vue.use(VueApollo)

const apolloProvider = new VueApollo({

defaultClient: apolloClient,

})
Vue.prototype.$echarts = echarts
Vue.prototype.$axios = service
Vue.prototype.$api = api
Vue.prototype.$NProgress = NProgress



Vue.use(VueResource)

Vue.use(ElementUI,{
  // locale,
  animate,
  i18n: (key, value) => i18n.t(key, value)
})

Vue.config.productionTip = false
router.beforeEach((to, from, next) => {
  // if (to.meta.title) {
  //     document.title = to.meta.title
  // }
  NProgress.start();
  next()
});

router.afterEach(transition => {
NProgress.done();
});
new Vue({
  el: '#app',
  router,
  provide: apolloProvider.provide(),
  store,
  i18n,
  render: h => h(App)
})
