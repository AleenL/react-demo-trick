import cookie from 'react-cookie'

if(process.env.NODE_ENV  === 'development'){
    require('../../../mock/todoList')
}

let token = cookie.load('token');
let postApi = (path,mock) => {
    return path + (mock ? '' : '.mock') + '?token=' + token
};

export default {
    "ipDress":postApi("http://int.dpool.sina.com.cn/iplookup/iplookup.php?format=js",1),
    "todoList":postApi('/todoList',0),
    "cityId":postApi("https://weixin.jirengu.com/weather/cityid",1),
    "future24":postApi("https://weixin.jirengu.com/weather/future24h",1),
    "getNow":postApi("https://weixin.jirengu.com/weather/now",1)
}