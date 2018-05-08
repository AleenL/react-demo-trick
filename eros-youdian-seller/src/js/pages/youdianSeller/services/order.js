/**
 * Created by zhouchao on 2018/3/9.
 */
import http from '../utils/http'
/**
 * 订单列表
 */
export function sellerOrderOrderList ({ type, page}, successBack, errorBack) {
  http.postAjax('employeeOrder/orderList', { type, page}, successBack, errorBack)
}
// 查询订单
export function queryOrder ({ type, keywords }, successBack, errorBack) {
  http.postAjax('employeeOrder/orderList', { type, keywords }, successBack, errorBack)
}

// 拒单
export function refuseOrder ({ order_id }, successBack, errorBack) {
  http.postAjax('employeeOrder/refuseOrder', {order_id}, successBack, errorBack)
}

// 接单
export function receiveOrder ({ order_id }, successBack, errorBack) {
  http.postAjax('employeeOrder/receiveOrder', { order_id }, successBack, errorBack)
}

//  确认送出
export function deliveryOrder ({ order_id }, successBack, errorBack) {
  http.postAjax('employeeOrder/deliveryOrder', { order_id }, successBack, errorBack)
}

// 确认送达，订单完成
export function finishOrder ({ order_id }, successBack, errorBack) {
  http.postAjax('employeeOrder/finishOrder', { order_id }, successBack, errorBack)
}

// 同意退款
export function refund ({ order_id }, successBack, errorBack) {
  http.postAjax('employeeOrder/agreeRefund', { order_id }, successBack, errorBack)
}
