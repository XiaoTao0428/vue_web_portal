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
 * 获取tab页面详情
 */
export const GetTabTabDetailApi = (obj) => get('/tab/tab-detail/', obj)

/**
 * 获取新闻列表
 */
export const GetNewsNewsListApi = (obj) => get('/news/news-list/', obj)

/**
 * 获取新闻详情
 */
export const GetNewsNewsDetailApi = (obj) => get('/news/news-detail/', obj)

/**
 * 获取研究列表
 */
export const GetResearchTesearchListApi = (obj) => get('/research/research-list/', obj)

/**
 * 获取研究详情
 */
export const GetResearchResearchDetailApi = (obj) => get('/research/research-detail/', obj)

/**
 * 获取出版物列表
 */
export const GetPublicationPublicationListApi = (obj) => get('/publication/publication-list/', obj)

/**
 * 获取研究列表（管理员）
 */
export const GetResearchManagementResearchListApi = (obj) => get('/research/management-research-list/', obj)

/**
 * 新增研究列表（管理员）
 */
export const GetResearchAddResearchApi = (param) => post('/research/add-research/', param)

/**
 * 编辑研究详情（管理员）
 */
export const GetResearchEditResearchApi = (param) => post('/research/edit-research/', param)

/**
 * 删除研究（管理员）
 */
export const PostResearchDeleteResearchApi = (param) => post('/research/delete-research/', param)

/**
 * 获取新闻列表（管理员）
 */
export const GetNewsManagementNewsListApi = (obj) => get('/news/management-news-list/', obj)

/**
 * 新增新闻（管理员）
 */
export const PostNewsAddNewsApi = (param) => post('/news/add-news/', param)

/**
 * 编辑新闻详情（管理员）
 */
export const PostNewsEditNewsApi = (param) => post('/news/edit-news/', param)

/**
 * 删除新闻（管理员）
 */
export const PostNewsDeleteNewsApi = (param) => post('/news/delete-news/', param)

/**
 * 获取出版物列表（管理员）
 */
export const GetPublicationManagementPublicationListApi = (obj) => get('/publication/management-publication-list/', obj)

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
 * 编辑tab详情（管理员）
 */
export const PostTabEditTabApi = (param) => post('/tab/edit-tab/', param)
