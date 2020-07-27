import axios from 'axios'
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
    return response.data
  },
  function (err) {
    return Promise.reject(err)
  }
)
export { request }
