import cookie from 'react-cookie'

if(process.env.NODE_ENV  === 'development'){
    require('../../../mock/todoList')
    require('../../../mock/weather')
}

let token = cookie.load('token');
let postApi = (path,mock) => {
    if(token) {
        return path + (mock ? '' : '.mock') + '?token=' + token
    }else{
        return path + (mock ? '' : '.mock?')
    }

};

export default {
    "ipDress":postApi("https://weixin.jirengu.com/weather/ip",1),
    "todoList":postApi('/todoList',0),
    "weatherMock":postApi('/weather',0),
    "cityId":postApi("https://weixin.jirengu.com/weather/cityid",1),
    "future24":postApi("https://weixin.jirengu.com/weather/future24h",1),
    "getNow":postApi("https://weixin.jirengu.com/weather/now",1)
}