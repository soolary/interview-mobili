const SHAREHISTORYKEY = 'SHAREHISTORY'
function saveHistory (history) {
  localStorage.setItem(SHAREHISTORYKEY, JSON.stringify(history))
}
function getHistory () {
  const historyStr = localStorage.getItem(SHAREHISTORYKEY)
  const history = JSON.parse(historyStr)
  if (history) {
    return history
  } else {
    return []
  }
}
function removeHistory () {
  return localStorage.removeItem(SHAREHISTORYKEY)
}
export { saveHistory, getHistory, removeHistory }
