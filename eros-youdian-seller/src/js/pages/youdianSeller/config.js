export const tabConfig = [{
    icon: '\ue6f3',
    activeicon: '\ue6d3',
    name: "首页",
    key: 'home',
    src: `${weex.config.eros.jsServer}/dist/js/pages/youdianSeller/home/index.js`,
    visibility: 'visible'
}, {
    icon: '\ue6d6',
    activeicon: '\ue6f4',
    name: "订单管理",
    key: 'topic',
    src: `${weex.config.eros.jsServer}/dist/js/pages/youdianSeller/orderManage/index.js`,
    visibility: 'hidden'
}, {
    icon: '\ue6d4',
    activeicon: '\ue6d1',
    name: "商品",
    key: 'class',
    src: `${weex.config.eros.jsServer}/dist/js/pages/youdianSeller/goodsManage/index.js`,
    visibility: 'hidden'
}, {
    icon: '\ue6d5',
    activeicon: '\ue6d2',
    name: "统计",
    key: 'shop',
    src: `${weex.config.eros.jsServer}/dist/js/pages/youdianSeller/statistics/index.js`,
    visibility: 'hidden'
}]
