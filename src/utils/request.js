import axios from 'axios'
import { ElMessage } from 'element-plus'

const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API,
  timeout: 5000,
})

// 响应拦截器
service.interceptors.response.use(
  // 请求成功
  response => {
    const { success, message, data } = response.data
    // 判断当前请求是否成功
    // 成功返回解析后的数据
    // 失败(请求成功,但业务失败),消息提示
    if (success) {
      // 成功返回解析后的数据
      return data
    } else {
      // 失败(请求成功,业务失败),消息提示
      ElMessage.err(message)
      return Promise.reject(new Error(message))
    }
  },
  // 请求失败
  error => {
    ElMessage.error(error.message)
    return Promise.reject(error)
  }
)

export default service
