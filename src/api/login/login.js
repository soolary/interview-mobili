import { request } from '@/utils/request.js'
function getCode (data) {
  return request({
    url: '/au/code',
    method: 'post',
    data
  })
}
function login (data) {
  return request({
    url: '/au/login',
    method: 'post',
    data
  })
}
export { getCode, login }
