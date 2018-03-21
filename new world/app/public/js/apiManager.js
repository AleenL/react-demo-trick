import cookie from 'react-cookie'

if(process.env.NODE_ENV  === 'development'){
    require('../../../mock/todoList')
}

let token = cookie.load('token');
let postApi = (path,mock) => {
    return path + (mock ? '' : '.mock') + '?token=' + token
}

export default {
    "ipDress":postApi("https://weixin.jirengu.com/weather/ip",1),
    "todoList":postApi('/todoList',0)
}