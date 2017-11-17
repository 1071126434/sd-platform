import storage from 'good-storage'

const USER_INFO_KEY = '__userInfo__'
const USER_TOKEN_KEY = '__userToken__'
const ERROR_TIME = '__errorTime__'
  // 设置个人信息
export function setUserInfoStorage (userInfo) {
  storage.set(USER_INFO_KEY, userInfo)
  return userInfo
}
export function clearUserInfo () {
  storage.remove(USER_INFO_KEY)
  return []
}
export function loadUserInfo () {
  return storage.get(USER_INFO_KEY, [])
}
// 设置用户登录token
export function setUserTokenStorage (userToken) {
  storage.set(USER_TOKEN_KEY, userToken)
  return userToken
}
export function clearUserToken () {
  storage.remove(USER_TOKEN_KEY)
  return []
}
export function loadUserToken () {
  return storage.get(USER_TOKEN_KEY, [])
}
// 设置失效时间
export function setErrorTimeList (time) {
  let hasArr = storage.get(ERROR_TIME) || []
  hasArr.push(time)
  return storage.set(ERROR_TIME, hasArr)
}
export function getErrorTimeList (query) {
  return storage.get(ERROR_TIME)
}
export function clearErrorTimeList (query) {
  storage.remove(ERROR_TIME)
}
