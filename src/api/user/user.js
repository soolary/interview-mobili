import { request } from '@/utils/request.js'
function getUserInfo () {
  return request({
    url: '/au/info',
    method: 'get',
    needToken: true
  })
}
function editUserInfo (data) {
  return request({
    url: '/au/edit',
    method: 'post',
    needToken: true,
    data
  })
}
export { getUserInfo, editUserInfo }
