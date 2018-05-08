import http from '../utils/http'

// 桌台列表
export function deskList ({}, successBack, errorBack) {
  http.postAjax('desk/deskList', {}, successBack, errorBack)
}
// 添加桌台
// export function addDesk ({ area_id, desk_name, num, is_service }, successBack, errorBack) {
//   http.postAjax('desk/addDesk', { area_id, desk_name, num, is_service }, successBack, errorBack)
// }
// 区域列表
export function areaList ({ }, successBack, errorBack) {
  http.postAjax('desk/areaList', { }, successBack, errorBack)
}
// 添加修改区域
export function addOrEditArea ({ area_name, area_id }, successBack, errorBack) {
    let _url = area_id ? 'desk/editArea' : 'desk/addArea'
  http.postAjax(_url, { area_name, area_id }, successBack, errorBack)
}

// 删除区域
export function deleteArea ({ area_id }, successBack, errorBack) {
    http.postAjax('desk/deleteArea', { area_id }, successBack, errorBack)
}

// 删除桌位
export function deleteDesk ({ desk_id }, successBack, errorBack) {
    http.postAjax('desk/deleteDesk', { desk_id }, successBack, errorBack)
}

// 编辑桌位
export function editDesk ({ desk_id, area_id, desk_name, num, is_service }, successBack, errorBack) {
    let _url = desk_id ? 'desk/editDesk' : 'desk/addDesk'
    http.postAjax(_url, { desk_id, area_id, desk_name, num, is_service }, successBack, errorBack)
}


