import Vue from 'vue'

import 'normalize.css/normalize.css' // A modern alternative to CSS resets

// import ElementUI from 'element-ui'
// import 'element-ui/lib/theme-chalk/index.css'
// import locale from 'element-ui/lib/locale/lang/zh-CN' // lang i18n
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
// import * as fundebug from "fundebug-javascript";
// import fundebugVue from "fundebug-vue";
// fundebug.apikey = "2a79df8192f2096e7172aa1a8f8fb37e2b9fcdb6d697def0461c1cd90fe4055c"
// fundebugVue(fundebug, Vue);
// import './mock'
Vue.prototype.$echarts = echarts
Vue.prototype.$axios = service
Vue.prototype.$api = api
Vue.prototype.$NProgress = NProgress
Vue.use(VueResource)

Vue.use({
  // locale,
  animate,
  i18n: (key, value) => i18n.t(key, value)
})

Vue.config.productionTip = false
router.beforeEach((to, from, next) => {
  NProgress.start();
  next()
});

router.afterEach(transition => {
NProgress.done();
});
new Vue({
  el: '#app',
  router,
  store,
  i18n,
  render: h => h(App)
})
