import http from '../utils/http'

//  优惠列表
export function getPreferential ({ page }, successBack, errorBack) {
  http.postAjax('preferential/getPreferential', { page }, successBack, errorBack)
}
// 创建优惠
export function addPreferential ({ preferential_type, preferential_name, discount, time_limit, target_type, preferential_start_time, preferential_end_time, rules }, successBack, errorBack) {
  http.postAjax('preferential/addPreferential', {
    preferential_type,
    preferential_name,
    preferential_start_time,
    preferential_end_time,
    discount,
    time_limit,
    target_type,
    rules
  }, successBack, errorBack)
}

// goodsInfo by goods_id
export function getGoodsList ({goods_ids}, successBack, errorBack) {
    http.postAjax('SellerGoodsManage/shopGoodsDetails', {goods_ids}, successBack, errorBack)
}

// 删除店铺优惠
export function deletePreferential ({_id}, successBack, errorBack) {
    http.postAjax('preferential/delPreferential', {_id}, successBack, errorBack)
}
