import { request } from '@/utils/request.js'
function getCode (data) {
  return request({
    url: '/au/code',
    method: 'post',
    data
  })
}
export { getCode }
