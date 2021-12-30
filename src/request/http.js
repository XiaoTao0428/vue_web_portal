import { Message } from 'element-ui'
import axios from 'axios'
import { BASE_URL } from '@/config/baseURL'
import QS from 'qs'; // 引入qs模块，用来序列化post类型的数据
import store from '../store/index'
axios.defaults.baseURL = BASE_URL

/* 请求响应超时时间 */
axios.defaults.timeout = 20000;

/* 设置post请求头 */
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8';


// 请求拦截器
axios.interceptors.request.use(
config => {

    const token = store.state.token;
    if (token) {
        config.headers.Authorization = token
    }
    // token && (config.headers.Authorization = token);
    return config;
},
error => {
    return Promise.error(error);
})

// 响应拦截器
axios.interceptors.response.use(
    response => {

        if ( response.data && response.data.code === 500) {
            Message.error('服务器内部错误')
            // Message({
            //     showClose: true,
            //     message: '服务器内部错误',
            //     type: 'error',
            //     duration: 1500,
            // })
            return ''
        }

        // 如果返回的状态码为200，说明接口请求成功，可以正常拿到数据
        // 否则的话抛出错误
        if ( response.data && response.data.code === 200) {
            return Promise.resolve(response.data.data)
        }
        else {
            // Message({
            //     showClose: true,
            //     message: response.data.message,
            //     type: 'error',
            //     duration: 1500,
            // })
            Message.error(response.data.message)
            return ''
        }
    },
    error => {
        console.log(error)

        if (error.response) {
            Message({
                showClose: true,
                message: error.response.data.message,
                type: 'error',
                duration: 1500,
            })
        }

        return ''
    }
)

/**
 * get方法，对应get请求
 * @param {String} url [请求的url地址]
 * @param {Object} params [请求时携带的参数]
 */
export function get(url, params){
    return new Promise((resolve, reject) =>{
        axios.get(url, {
            params: params
        })
            .then(res => {
            resolve(res)
        }).catch(err =>{
            reject(err)
        })
    })
}

/**
 * post方法，对应post请求
 * @param {String} url [请求的url地址]
 * @param {Object} params [请求时携带的参数]
 */
export function post(url, params) {
    return new Promise((resolve, reject) => {
        axios.post(url, QS.stringify(params))
            .then(res => {
                resolve(res)
            })
            .catch(err =>{
                reject(err)
            })
    })
}
