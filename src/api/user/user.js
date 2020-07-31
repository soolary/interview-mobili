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
function uploadFiles (data) {
  return request({
    url: '/upload',
    method: 'post',
    needToken: true,
    data
  })
}
export { getUserInfo, editUserInfo, uploadFiles }
