import { get, post } from './http'

/**
 * 登录
 */
export const PostUserLoginApi = param => post('/user/login/', param)


/**
 * 根据token获取头像
 */
export const GetEmployeeAvatarApi = (obj) => get('/employee/employee-avatar/', obj)