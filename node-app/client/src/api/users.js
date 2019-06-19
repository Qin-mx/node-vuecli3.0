import fetch from '@/utils/featch';
function login(data){
    return fetch({
        url:`/users/login`,
        method: 'POST',
        data
    })
}

function register(data){
    return fetch({
        url:`/users/register`,
        method: 'POST',
        data
    })
}

// 验证token是否正确
function current(){
    return fetch({
        url: '/users/current',
        method: 'GET',
    })
}

export {
    login,
    register,
    current
}