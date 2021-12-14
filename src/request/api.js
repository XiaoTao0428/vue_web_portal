import { get, post } from './http'

/**
 * 获取验证码
 */
export const SendMsgCodeApi = param => post('/utils/send-msg-code/', param)


/**
 * 根据token获取头像
 */
export const GetEmployeeAvatarApi = (obj) => get('/employee/employee-avatar/', obj)