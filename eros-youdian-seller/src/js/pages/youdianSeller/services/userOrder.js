import http from '../utils/http'

// 用户订单列表
export function getUserOrderList ({ uid }, successBack, errorBack) {
    http.postAjax('cashOrder/list', { uid }, successBack, errorBack)
}

// 用户订单详情
export function getUserOrderInfo ({ order_sn }, successBack, errorBack) {
    http.postAjax('cashOrder/detail', { order_sn }, successBack, errorBack)
}
