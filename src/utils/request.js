import axios from 'axios'
import store from '@/store'
import jsonBig from 'json-bigint'

const request = axios.create({
  // baseURL: 'http://ttapi.research.itcast.cn/'
  // transformResponse 允许自定义原始的响应数据（字符串）
  transformResponse: [
    function(data) {
      try {
        // 如果转换成功则返回转换的数据结果
        return jsonBig.parse(data)
      } catch (err) {
        // 如果转换失败，则包装为统一数据格式并返回
        return {
          data
        }
      }
    }
  ]
})

// 请求拦截器
request.interceptors.request.use(
  config => {
    const { user } = store.state
    if (user && user.token) {
      config.headers.Authorization = `Bearer ${user.token}`
    }
    return config
  },
  error => {
    // 如果请求出错了（还没发出去）
    return Promise.reject(error)
  }
)

export default request
