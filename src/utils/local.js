const TOKENKEY = 'HEIMAMM_TOKEN'
// 保存
function setToken (token) {
  window.localStorage.setItem(TOKENKEY, token)
}
// 获取
function getToken () {
  return window.localStorage.getItem(TOKENKEY)
}
// 删除

function removeToken () {
  window.localStorage.removeItem(TOKENKEY)
}

// 暴露出去
export { setToken, getToken, removeToken }
