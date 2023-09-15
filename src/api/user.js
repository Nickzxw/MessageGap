import request from '@/utils/request'

// 注册接口
export const userRegisterService = ({ username, password, repassword }) => {
  return request.post('/api/reg', { username, password, repassword })
}
// 登录接口
export const userLoginService = ({ username, password }) =>
  request.post('api/login', { username, password })
// 用户个人信息
export const userGetInfoService = () => request.get('/my/userinfo')
