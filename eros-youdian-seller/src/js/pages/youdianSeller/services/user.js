/**
 * Created by zhouchao on 2018/3/9.
 */
import http from '../utils/http'
/**
 * 得到优惠券列表
 */
export function usergGetMchCouponsForPage ({ page, type }, successBack, errorBack) {
  http.postAjax('user/getMchCouponsForPage', { page, type }, successBack, errorBack)
}
/**
 * 添加优惠券
 */
export function userAddMchCoupon ({ title, amount, is_limit, limit_price, limit_type, validity_type, validity_day, start_time, end_time }, successBack, errorBack) {
  http.postAjax('user/addMchCoupon', { title, amount, is_limit, limit_price, limit_type, validity_type, validity_day, start_time, end_time }, successBack, errorBack)
}
/**
 * 删除优惠券
 */
export function userDeleteMchCoupon ({ _id }, successBack, errorBack) {
  http.postAjax('user/deleteMchCoupon', { _id }, successBack, errorBack)
}
/**
 * 优惠券详情
 */
export function userGetMchCoupon ({ _id }, successBack, errorBack) {
  http.postAjax('user/getMchCoupon', { _id }, successBack, errorBack)
}
/**
 * 得到商家充值规则列表
 */
export function userGetRechargeRules ({}, successBack, errorBack) {
  http.postAjax('user/getRechargeRules', {}, successBack, errorBack)
}
/**
 * 根据ID得到商家充值规则
 */
export function userGetRechargeRule ({ _id }, successBack, errorBack) {
  http.postAjax('user/getRechargeRule', { _id }, successBack, errorBack)
}
/**
 * 添加商家充值规则
 */
export function userAddRechargeRule ({ need_amount, give_amount, is_give_coupon, give_coupon }, successBack, errorBack) {
  http.postAjax('user/addRechargeRule', { need_amount, give_amount, is_give_coupon, give_coupon }, successBack, errorBack)
}
/**
 * 修改商家充值规则
 */
export function userEditRechargeRule ({ _id, need_amount, give_amount, is_give_coupon, give_coupon }, successBack, errorBack) {
  http.postAjax('user/editRechargeRule', { shop_id, need_amount, give_amount, is_give_coupon, give_coupon }, successBack, errorBack)
}
/**
 * 删除商家充值规则
 */
export function userDeleteRechargeRule ({ _id }, successBack, errorBack) {
  http.postAjax('user/deleteRechargeRule', { _id }, successBack, errorBack)
}
/**
 * 分页得到商户会员卡列表
 */
export function userGetMchCardsForPage ({  page }, successBack, errorBack) {
  http.postAjax('user/getMchCardsForPage', { page }, successBack, errorBack)
}
/**
 * 添加商户会员卡
 */
export function userAddMchCard ({  title, color, type, discount, give_point_num, give_coupon, validity_type, validity_day, start_time, end_time }, successBack, errorBack) {
  http.postAjax('user/addMchCard', { title, color, type, discount, give_point_num, give_coupon, validity_type, validity_day, start_time, end_time }, successBack, errorBack)
}
/**
 * 修改商户会员卡
 */
export function userEditMchCard ({ _id, title, color, type, discount, give_point_num, give_coupon, validity_type, validity_day, start_time, end_time }, successBack, errorBack) {
  http.postAjax('user/editMchCard', { _id, title, color, type, discount, give_point_num, give_coupon, validity_type, validity_day, start_time, end_time }, successBack, errorBack)
}
/**
 * 商户会员卡详情
 */
export function userGetMchCard ({ _id }, successBack, errorBack) {
  http.postAjax('user/getMchCard', { _id }, successBack, errorBack)
}
/**
 * 删除商户会员卡
 */
export function userDeleteMchCard ({ _id }, successBack, errorBack) {
  http.postAjax('user/deleteMchCard', { _id }, successBack, errorBack)
}
/**
 * 添加、修改商家积分规则
 */
export function userEditMchPointRule ({ shop_id, is_give_point_consume, is_give_point_recharge, limit_num, percent, consume_price, give_point_consume, recharge_price, give_point_recharge }, successBack, errorBack) {
    http.postAjax('user/editMchPointRule', { shop_id, is_give_point_consume, is_give_point_recharge, limit_num, percent, consume_price, give_point_consume, recharge_price, give_point_recharge }, successBack, errorBack)
}
/**
 * 得到商户商家积分规则
 */
export function userGetMchPointRule ({ shop_id }, successBack, errorBack) {
    http.postAjax('user/getMchPointRule', { shop_id }, successBack, errorBack)
}
