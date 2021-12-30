import { get, post } from './http'

/**
 * 登录
 */
export const PostUserLoginApi = param => post('/user/login/', param)

/**
 * 获取tab列表
 */
export const GetTabTabListApi = (obj) => get('/tab/tab-list/', obj)

/**
 * 获取tab列表（管理员）
 */
export const GetTabManagementTabListApi = (obj) => get('/tab/management-tab-list/', obj)

/**
 * 新增tab（管理员）
 */
export const PostTabAddTabApi = (param) => post('/tab/add-tab/', param)

/**
 * 删除tab（管理员）
 */
export const PostTabDeleteTabApi = (param) => post('/tab/delete-tab/', param)

/**
 * 删除tab（管理员）
 */
export const PostTabSortTabApi = (param) => post('/tab/sort-tab/', param)

/**
 * 获取tab详情（管理员）
 */
export const GetTabEditTabApi = (obj) => get('/tab/edit-tab/', obj)

/**
 * 根据token获取头像
 */
export const GetEmployeeAvatarApi = (obj) => get('/employee/employee-avatar/', obj)