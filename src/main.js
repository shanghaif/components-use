import Vue from 'vue'

import 'normalize.css/normalize.css' // A modern alternative to CSS resets

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import locale from 'element-ui/lib/locale/lang/zh-CN' // lang i18n
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
// import './mock'
// import VideoPlayer from 'vue-video-player'

// require('video.js/dist/video-js.css')
// require('vue-video-player/src/custom-theme.css')
// Vue.use(VideoPlayer)
Vue.prototype.$echarts = echarts
Vue.prototype.$axios = service
Vue.prototype.$api = api
Vue.use(VueResource)
Vue.use(ElementUI, {
  locale,
  i18n: (key, value) => i18n.t(key, value)
})

Vue.config.productionTip = false

new Vue({
  el: '#app',
  router,
  store,
  i18n,
  render: h => h(App)
})
