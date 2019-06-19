import axios from 'axios';
import { getToken } from '@/utils/auth'
import { Message, MessageBox,Loading } from 'element-ui';
import store from '@/vuex/store';

let loading;

function startLoading(){
    console.log(process.env)
    let options = {
        text:'加载中',
        lock:true,
        background: 'rgba(0,0,0,0.7)'

    }
    loading = Loading.service(options);
}

function stopLoading(){
    loading.close();
}
// 创建axios的实例
const service = axios.create({
    baseURL:  process.env.VUE_APP_BASE_API , // api的请求url
    timeout: 15000 // 请求超时时间
    // `withCredentials` 表示跨域请求时是否需要使用凭证
    //   withCredentials: false, // 默认的
})


// request的拦截器 -- 传值
service.interceptors.request.use(config => {
    startLoading(); // 开启加载
    // Do something before request is sent
    // `transformRequest`允许请求的数据在传到服务器之前进行转化。
    // 这个只适用于`PUT`,`GET`,`PATCH`方法。
    // 数组中的最后一个函数必须返回一个字符串，一个`ArrayBuffer`,或者`Stream`
    // console.log(config)
    config.interceptors = [data => {
        let ret = '';
        if (data) {
            const keys = Object.keys(data);
            keys.forEach((val, index) => {
                ret += (ret != '' ? '&' : '') + encodeURIComponent(val) + '=' + encodeURIComponent(data[val]);
            });
        }
        return ret;
    }];
    // config.headers['Content-Type'] = 'application/x-www-form-urlencoded';

    if (store.getters.token) {
        config.headers['Authorization'] = getToken(); // 让每个请求携带token--['X-Token']为自定义key 请根据实际情况自行修改
    }
    //default Accept             'application/json, text/plain, */*'
    //default Content-Type       'application/x-www-form-urlencoded'
    //  =>   文件提交            'Content-Type': 'multipart/form-data'
    //  =>   JSON  上传          'Accept': "application/json;"
    //                           'Content-Type': 'application/json;charset=UTF-8'
    // config.headers['Accept-Language'] = 'zh-EN,zh;q=0.8,en;q=0.6';
    return config;
}, error => {
    // Do something with request error
   return Promise.reject(error);
})

// response的拦截器 -- 后台返回
service.interceptors.response.use(
    response => {
    //   结束加载
    stopLoading()
        /**
       * 下面的注释为通过response自定义code来标示请求状态，当code返回如下情况为权限有问题，登出并返回到登录页
       * 如通过xmlhttprequest 状态码标识 逻辑可写在下面error中
       */
        const res = response.data;
        switch (res.code) {
            case 404:  // 用户未登录
                MessageBox.confirm('你已被登出，可以取消继续留在该页面，或者重新登录', '确定登出', {
                    confirmButtonText: '重新登录',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    store.dispatch('FedLogOut').then(() => {
                        location.reload();// 为了重新实例化vue-router对象 避免bug
                    });
                })
                break;
            case 400: // 400的时候重复
                Message({
                    message: res.msg,
                    type: 'warning',
                    duration: 3 * 1000
                });
                break;

            default:
                if (res.err_code) {
                    Message({
                        message: res.message,
                        type: 'error',
                        duration: 5 * 1000
                    });
                    return Promise.reject(new Error(res.message));
                }else{
                    return response;
                }
        }
        
    },
    error => {
        stopLoading()
        if(error.message.includes('401')){
           return MessageBox.confirm('你已被登出，可以取消继续留在该页面，或者重新登录', '确定登出', {
                confirmButtonText: '重新登录',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                store.dispatch('FedLogOut').then(() => {
                    location.reload();// 为了重新实例化vue-router对象 避免bug
                });
            })
        }
        Message({
            message: error.message,
            type: 'error',
            duration: 3 * 1000
        });
        return Promise.reject(error);
    }
)

export default service