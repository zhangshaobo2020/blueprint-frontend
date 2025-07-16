import axios from 'axios'
// 创建axios实例
const service = axios.create({
  baseURL: "/api",
  timeout: 30 * 1000,
  headers: { 'Content-Type': 'application/json; charset=UTF-8' }
})

// request拦截器
service.interceptors.request.use(
  config => {
    return config
  },
  error => {
    return error
  }
)

// response 拦截器
service.interceptors.response.use(
  response => {
    return { response: response.data, data: response.data.data }
  },
  error => {
    return error
  }
)

export default service
