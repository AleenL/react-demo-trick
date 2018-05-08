import http from '../utils/http'
// 收集店铺收款信息
export function collectShopPaymentInfo ({id_card_positive, id_card_negative, account_type, bank_open, bank_province, bank_city, bank_branch, account_name, bank_mobile, bank_account, document_type, document_number, desk_photo,license, license_food, face_figure, cashier_phone, shop_cashier_photo}, successBack, errorBack) {
    http.postAjax('employeeShop/collectShopPaymentInfo', {id_card_positive, id_card_negative, account_type, bank_open, bank_province, bank_city, bank_branch, account_name, bank_mobile, bank_account, document_type, document_number, desk_photo,license, license_food, face_figure, cashier_phone, shop_cashier_photo}, successBack, errorBack)
}
// 收集店铺收款详情
export function shopPaymentInfo ({payment_id}, successBack, errorBack) {
    http.postAjax('employeeShop/shopPaymentInfo', {payment_id}, successBack, errorBack)
}

// 银行列表
export function getBankList ({keywords	}, successBack, errorBack) {
    http.postAjax('employeeShop/bankList', {keywords}, successBack, errorBack)
}

// 支行列表
export function getBranchList ({code, city_code, keywords}, successBack, errorBack) {
    http.postAjax('employeeShop/branchList', {code, city_code, keywords}, successBack, errorBack)
}
