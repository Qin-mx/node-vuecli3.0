import { login, register,current } from '@/api/users' // 引入接口
import Cookies from 'js-cookie';
import { getToken,setToken,removeToken} from './../../utils/auth'
const User = {
    state: {
        userData: Cookies.get('SET_USERINFO') || '',
        username: Cookies.get('SET_USERNAME') || '',
        email: '',
        token: getToken() || '',
        avatar: Cookies.get('SET_AVATAR') || '',
    },
    mutations: {
        SET_USERDATA: (state, userData) => {
            state.username = userData;
        },
        SET_USERNAME: (state, username) => {
            state.username = username;
        },
        SET_EMAIL: (state, email) => {
            state.email = email;
        },
        SET_TOKEN: (state, token) => {
            state.token = token;
        },
        SET_AVATAR: (state, avatar) => {
            state.avatar = avatar;
        },
    },
    actions: {
        login({ commit }, userInfo) {
            return new Promise((resolve, reject) => {
                login(userInfo).then(res => {
                    console.log(res, '////////////////////////////////////')
                    let data = res.data;
                    //处理拿到的数据
                    // 缓存下toke值
                    commit('SET_TOKEN',data.token) // 这个更新了mutation
                    // 本地也得缓存
                    setToken(data.token)
                    resolve(data)

                }).catch(error => {
                    reject(error)
                })
            })
        },
        register({ commit }, resetInfo) {
            return new Promise((resolve, reject) => {
                register(resetInfo).then(res => {
                    resolve(res.data)
                }).catch(err => {
                    reject(err)
                })
            })
        },
        // 鉴定是否成功
        current({commit}){
            return new Promise((resolve, reject) => {
                current().then(res => {
                    console.log(res)
                    // resolve(res.data)
                }).catch(err => {
                    reject(err)
                })
            })
        },
        // 前端登出
        FedLogOut({ commit }) {
            return new Promise(resolve => {
                commit('SET_TOKEN', '');
                // 本地也得缓存
                removeToken();
                resolve();
            })
        }
    }
}

export default User;