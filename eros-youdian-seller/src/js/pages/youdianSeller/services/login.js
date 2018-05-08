/**
 * Created by zhouchao on 2018/3/9.
 */
import http from '../utils/http'
/**
 * 员工登陆
 */
export function employeeLogin ({ merchants_code, login_name, password}, successBack, errorBack) {
    http.postAjax('employee/employeeLogin', { merchants_code, login_name, password}, successBack, errorBack)
}
/**
 * 商家登陆
 */
export function sellerLogin ({ mobile, password}, successBack, errorBack) {
    http.postAjax('employee/sellerLogin', { mobile, password}, successBack, errorBack)
}
/**
 * 发送验证码
 */
export function userSendcode ({ mobile }, successBack, errorBack) {
    http.postAjax('employee/verifyMobile', { mobile }, successBack, errorBack)
}
/**
 * 验证验证码
 */
export function employeeVerifyCode ({ mobile, code }, successBack, errorBack) {
    http.postAjax('employee/verifyCode', { mobile, code }, successBack, errorBack)
}
/**
 * 完善账户信息(注册商家)
 */
export function registerSeller ({ mobile, password, repassword }, successBack, errorBack) {
    http.postAjax('employee/registerSeller', { mobile, password, repassword }, successBack, errorBack)
}
/**
 * 完善账户信息(注册商家)
 */
export function editPassword ({ old_password, new_password, re_password }, successBack, errorBack) {
    http.postAjax('employee/editPassword', { old_password, new_password, re_password }, successBack, errorBack)
}
/**
 * 完善商家信息
 */
export function improveSellerInfo ({ seller_address, seller_name, province, city, county, lng, lat, _id, house_number }, successBack, errorBack) {
    let _url = _id ? 'employee/editSellerInfo' : 'employee/addSellerInfo'
    http.postAjax(_url, { seller_address, seller_name, province, city, county, lng, lat, house_number }, successBack, errorBack)
}
/**
 * 得到商家信息
 */
export function getSellerInfo ({}, successBack, errorBack) {
    http.postAjax('employee/getSellerInfo', {}, successBack, errorBack)
}
/**
 * 得到店铺列表
 */
export function getSellerShop ({}, successBack, errorBack) {
    http.postAjax('employee/getSellerShop', {}, successBack, errorBack)
}
/**
 * 得到店铺详情
 */
export function getShop ({}, successBack, errorBack) {
    http.postAjax('employeeShop/getShop', {}, successBack, errorBack)
}

/**
 * 得到店铺订单数量
 */
export function getShopOrderNumber ({}, successBack, errorBack) {
    http.postAjax('sellerOrder/todayOrderNum', {}, successBack, errorBack)
}

/**
 * 创建店铺
 */
export function employeeShopCreateShop ({ shop_name, type, shop_logo, province, city, county, lng, lat, address, house_number, work_time, contact_mobile, contact_name }, successBack, errorBack) {
    http.postAjax('employeeShop/createShop', { shop_name, type, shop_logo, province, city, county, lng, lat, address, house_number, work_time, contact_mobile, contact_name }, successBack, errorBack)
}
