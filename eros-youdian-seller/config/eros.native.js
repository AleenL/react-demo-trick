module.exports = {
    'appName': 'eros-yx-demo',
    'appBoard': '/config/index.js',
    // android 监听全局事件homeBack 如果为true 安卓端需要自行调用router.finish方法来关闭应用
    'androidIsListenHomeBack': 'true',
    'version': {
        'android': '1.0.0',
        'iOS': '1.0.0'
    },
    'page': {
        'homePage': '/pages/youdianSeller/index.js',
        'mediatorPage': '/mediator/index.js',
        'navBarColor': '#ffffff',
        'navItemColor': '#333'
    },
    'url': {
        'image': 'https://api.udian.me/',
        'bundleUpdate': 'http://localhosts:3001/app/check'
    },
    'zipFolder': {
        'iOS': '/ios/WeexEros/WeexEros',
        'android': '/android/WeexFrameworkWrapper/app/src/main/assets'
    },
    'getui': {
        'enabled': 'false',
        'appId': '',
        'appKey': '',
        'appSecret': ''
    },
    'umeng': {
        'enabled': 'false',
        'iOSAppKey': '',
        'androidAppKey': ''
    },
    'wechat': {
        'enabled': 'false',
        'appId': '',
        'appSecret': ''
    },
    'amap': {
        'enabled': 'true',
        'iOSAppKey': '44dbe3c8be585056d9fd3690b43255d4',
        'androidAppKey': '89ea2a65eb07afb2be6cd1085029c69e'
    }
}
