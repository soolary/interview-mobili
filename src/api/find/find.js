// 导入请求对象
import { request } from '@/utils/request.js'

// 面试技巧

function technicList (params) {
  return request({
    url: '/articles/technic',
    method: 'get',
    needToken: true,
    params
  })
}
// 热门数据
function hotData () {
  return request({
    url: '/chart-data/hot',
    method: 'get'
  })
}

// 面经分享
function shareList (params) {
  return request({
    url: '/articles/share',
    method: 'get',
    needToken: true,
    params
  })
}
function shareTopSearch () {
  return request({
    url: '/articles/shareTopSearch',
    method: 'get'
  })
}
function shareDetail (id) {
  return request({
    url: `/articles/share/${id}`,
    method: 'get'
  })
}
function shareComments (params) {
  const { id, start, limit } = params
  return request({
    url: `/articles/comments/${id}`,
    method: 'get',
    params: { start, limit }
  })
}
function sendComment (data) {
  return request({
    url: '/articles/comments',
    method: 'post',
    needToken: true,
    data
  })
}
function supportArticle (data) {
  return request({
    url: '/articles/star',
    method: 'post',
    needToken: true,
    data
  })
}

// 暴露出去
export {
  technicList,
  hotData,
  shareList,
  shareTopSearch,
  shareDetail,
  shareComments,
  sendComment,
  supportArticle
}
