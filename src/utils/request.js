import axios from 'axios'
import { Toast } from 'vant'
const request = axios.create({
  baseURL: process.env.VUE_APP_URL
})
request.interceptors.request.use(
  function (config) {
    return config
  },
  function (err) {
    return Promise.reject(err)
  }
)
request.interceptors.response.use(
  function (response) {
    const code = response.data.code
    if (code === 200) {
      return response.data
    } else if (code === 400 || code === 401 || code === 403) {
      Toast.fail(response.data.message)
      return Promise.reject(new Error(response.data.message))
    }
  },
  function (err) {
    return Promise.reject(err)
  }
)
export { request }
