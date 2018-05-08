import http from '../utils/http'

//  商品分类列表
export function getShopTopCategories ({}, successBack, errorBack) {
  http.postAjax('SellerGoodsManage/getShopTopCategories', {}, successBack, errorBack)
}
// 商品详情列表
export function getShopGoodsList ({ cate_pid, is_off, keywords, page, _ids }, successBack, errorBack) {
  http.postAjax('SellerGoodsManage/shopGoodsList', { cate_pid, is_off, keywords, page, _ids }, successBack, errorBack)
}

// 下架商品
export function pullOffGoods ({ cate_pid, goods_id, state }, successBack, errorBack) {
  http.postAjax('SellerGoodsManage/editGoods', { cate_pid, goods_id, state }, successBack, errorBack)
}
// 删除商品
export function deleteGoods ({ goods_id }, successBack, errorBack) {
  http.postAjax('SellerGoodsManage/deleteGoods', { goods_id }, successBack, errorBack)
}
// 添加修改分类
export function addShopCategory ({ cate_name }, successBack, errorBack) {
  http.postAjax('SellerGoodsManage/addShopCategory', { cate_name }, successBack, errorBack)
}

// 添加修改分类
export function modifyShopCategory ({ category_id, cate_name }, successBack, errorBack) {
    http.postAjax('SellerGoodsManage/editShopCategory', { category_id, cate_name }, successBack, errorBack)
}

// 添加分类
export function stick ({ goods_id}, successBack, errorBack) {
  http.postAjax('SellerGoodsManage/goodsTop', { goods_id}, successBack, errorBack)
}
// 系统商品列表
export function getGoodsList ({ keywords, page }, successBack, errorBack) {
  http.postAjax('sellerGoods/goodsList', { keywords, page }, successBack, errorBack)
}
// 添加或者修改商品
export function addOrEditGoods (
  {
    cate_pid,
    goods_id,
    state,
    goods_name,
    goods_brief,
    bar_code,
    brand_id,
    brand_name,
    goods_stock,
    goods_unit,
    goods_spec,
    is_promote,
    original_price,
    goods_imgs,
    img_path_url
  }, successBack, errorBack) {
    let _url = goods_id ? 'SellerGoodsManage/editGoods' : 'SellerGoodsManage/addGoods'
    let _path = {
        goods_id: goods_id ? goods_id : '',
        cate_pid,
        state,
        goods_name,
        goods_brief,
        bar_code,
        brand_id,
        brand_name,
        goods_stock,
        goods_unit,
        goods_spec,
        is_promote,
        original_price,
        goods_imgs,
        img_path_url
    }
  http.postAjax(_url, _path, successBack, errorBack)
}
// 店铺商品详情
export function shopGoodsDetail ({ goods_id }, successBack, errorBack) {
  http.postAjax('SellerGoodsManage/shopGoodsDetail', { goods_id }, successBack, errorBack)
}
// 系统商品详情
export function systemGoodsDetail ({ goods_id }, successBack, errorBack) {
  http.postAjax('sellerGoods/goodsDetail', { goods_id }, successBack, errorBack)
}
