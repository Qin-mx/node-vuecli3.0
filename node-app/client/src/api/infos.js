import fetch from '@/utils/featch';
function InfoList(){
    return fetch({
        url:`/infos/list`,
        method: 'GET'
    })
}

function InfoAdd(data){
    return fetch({
        url:`/infos/add`,
        method: 'POST',
        data
    })
}

// 验证token是否正确
function InfoEdit(data){
    return fetch({
        url: '/infos/edit',
        method: 'POST',
        data
    })
}

export default{
    InfoList,
    InfoAdd,
    InfoEdit
}