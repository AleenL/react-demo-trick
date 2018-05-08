import qs from 'qs'
var stream = weex.requireModule('stream')
var modal = weex.requireModule('modal')
var bmEevent = weex.requireModule('bmEvents')
var router = weex.requireModule('bmRouter')

const _URL_API = 'https://api.udian.me/'
const _img_base = 'http://cdn.udian.me/'
const _token = 'cd0a4415bacb8294f9f6b81ce505b512'
const _time = 1519365883
const _authToken = Vue.prototype.$storage.getSync('authToken') ? Vue.prototype.$storage.getSync('authToken') : ''
const _shop_id = Vue.prototype.$storage.getSync('shop_id') ? Vue.prototype.$storage.getSync('shop_id') : ''
const _business_code = Vue.prototype.$storage.getSync('business_code') ? Vue.prototype.$storage.getSync('business_code') : '0001'
function postAjax (_url, _postData, successBack, errorBack) {
  let header = {
    'Content-Type': 'application/x-www-form-urlencoded'
  }

  _postData.time = _time

  _postData.token = _token

  _postData.authToken = _authToken

  _postData.shop_id = _shop_id

  _postData.business_code = _business_code
    // Vue.prototype.$notice.alert({
    //     message: 'shop_id:' + _postData.shop_id + '-----business_code:' + _postData.business_code
    // })

    console.log('请求'+ _url + '的参数:^^^^^^^^^^^^^^^')
    console.log(_postData)

  /*stream.fetch({
    method: 'POST',
    headers: header,
    url: _URL_API + _url,
    body: qs.stringify(_postData)
  }, function ({data}) {
    data = JSON.parse(data)
      console.log('请求'+ _url + '返回:^^^^^^^^^^^^^^^')
      console.log(data)
    if (data.status === 100) {
        modal.toast({
            message: '登录状态超时，请重新登录',
            duration: 1
        })
        Vue.prototype.$router.open({
            name: 'index',
            type: 'PRESENT',
            canBack: false
        })
    }else if (data.status === 1) {
      successBack(data)
    } else if (errorBack) {
      errorBack(data)
    } else {
      modal.toast({
        message: data.msg,
        duration: 1
      })
    }
  })*/


    // 增加fetch请求超时处理,3秒时间
    Promise.race([
        new Promise((res, rej) => {
            stream.fetch({
                method: 'POST',
                headers: header,
                url: _URL_API + _url,
                body: qs.stringify(_postData)
            }, data => {
                res(data.data)
            })
        }),
        new Promise((res, rej) => {
            setTimeout(() => rej(new Error()), 3000)
        })
    ])
        .then(data =>  {
            data = JSON.parse(data)
            console.log('请求'+ _url + '返回:^^^^^^^^^^^^^^^')
            console.log(data)
            if (data.status === 100) {
                modal.toast({
                    message: '登录状态超时，请重新登录',
                    duration: 1
                })
                Vue.prototype.$router.open({
                    name: 'index',
                    type: 'PRESENT',
                    canBack: false
                })
            }else if (data.status === 1) {
                successBack(data)
            } else if (errorBack) {
                errorBack(data)
            } else {
                modal.toast({
                    message: data.msg,
                    duration: 1
                })
            }
        } )
        .catch(() => {
            Vue.prototype.$notice.toast({
                message: '网络请求超时，请重试'
            })
        })
}

function pickImgUpload(maxCount, cb) {
    let _getQiNiuUpToken = 'index/getQiNiuUpToken';
    postAjax(_getQiNiuUpToken, {}, (data) => {
        let _QiNiuUpUrl = data.data.upHost;
        let _QiNiuUpToken = data.data.upToken;
        Vue.prototype.$image
            .pickAndUpload({
                url: _QiNiuUpUrl,
                maxCount: maxCount,
                imageWidth: 1000,
                allowCrop: true,
                params: {
                    token: _QiNiuUpToken
                },
                header: {}
            })
            .then(
                resData => {
                    modal.toast({
                        message: '上传成功',
                        duration: 1
                    })
                    let img_arr = []
                    let key_arr = []
                    resData.forEach((item, index) => {
                        key_arr.push(item['key'])
                        img_arr.push( _img_base + item['key']+'!180compress')
                    })
                    typeof cb == "function" && cb(key_arr, img_arr);
                },
                error => {
                    modal.toast({
                        message: '上传失败:' + error.errorMsg,
                        duration: 1
                    })
                }
            );
    })
}
export default {
  postAjax: postAjax,
  pickImgUpload: pickImgUpload,
}
