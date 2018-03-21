import cookie from 'react-cookie'

let token = cookie.load('token');
let postApi = (path) => {
    return path + '?token=' + token
}

export default {
    "ipDress":postApi("https://weixin.jirengu.com/weather/ip")
}