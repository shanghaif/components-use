import axios from 'axios'
import { Message } from 'element-ui'
import store from '../store'
import { getToken } from '@/utils/auth'
import { promised } from 'q';
// 创建axios实例
axios.defaults.withCredentials =true

const service = axios.create({
  baseURL: process.env.BASE_API,
  timeout: 200000
})

// request拦截器
service.interceptors.request.use(config => {
  config.headers["Content-Type"]='application/json'
  config.headers["Accept"]='application/json'
  if (sessionStorage.getItem('token')) {
    config.headers['token'] = sessionStorage.getItem('token') // 让每个请求携带自定义token 请根据实际情况自行修改
  }
  return config
}, error => {
  // Do something with request error
  console.log(error) // for debug
  Promise.reject(error)
})

// respone拦截器
service.interceptors.response.use(
  response => {
    const res = response.data
    if (response.status !== 200 && response.status !== 201) {
    //if ((response.status !== 200) || (response.status !== 201)) {
        Message({
          message: res.data,
          type: 'error',
          duration: 1 * 1000
        })
    } else {
      return response.data
    }
  },
  error => {
    console.log(error)// for debug
    if (error.response.status === 504) {
      Message({
        message: '请求超时',
        type: 'error',
        duration: 2 * 1000
      })
    } else if(error.response.status===401){
      Message({
        message:'您权限过期,请重新登录',
        type: 'warning',
        duration: 2 * 1000
      })
     sessionStorage.removeItem('roles')
     sessionStorage.removeItem('username')
     sessionStorage.removeItem('token')
     sessionStorage.removeItem('list')
     location.href = '/#/login'
    }
    else if(error.response.status===403){
      Message({
        message: '没有操作权限',
        type: 'error',
        duration: 2 * 1000
      })
    }
    else{
      return Promise.reject(error.response.data)
    }
  }
)

export default service
