/**
 * Created by zhouchao on 2018/3/9.
 */
import http from '../utils/http'
// 员工列表
export function getEmployeeList ({ keywords }, successBack, errorBack) {
  http.postAjax('employee/listEmployee', { keywords }, successBack, errorBack)
}
// 职位列表
export function getPositionList ({}, successBack, errorBack) {
  http.postAjax('employee/positionList', {}, successBack, errorBack)
}
// 增加职位
export function addPosition ({ position_name }, successBack, errorBack) {
  http.postAjax('employee/addPosition', { position_name }, successBack, errorBack)
}

// 修改职位
export function editPosition ({ position_name, position_id }, successBack, errorBack) {
    http.postAjax('employee/updatePosition', { position_name, position_id }, successBack, errorBack)
}

// 删除职位
export function deletePosition ({ position_id }, successBack, errorBack) {
    http.postAjax('employee/deletePosition', { position_id }, successBack, errorBack)
}

// 增加员工
// export function addEmployee ({ position_id, merchants_code, employee_name, login_name, password, mobile }, successBack, errorBack) {
//   http.postAjax('employee/addEmployee', { position_id, merchants_code, employee_name, login_name, password, mobile }, successBack, errorBack)
// }

// 编辑员工
export function editEmployee ({ employee_id, position_id, merchants_code, employee_name, login_name, password, mobile, status }, successBack, errorBack) {
    let _url = employee_id ? 'employee/updateEmployee' : 'employee/addEmployee'
    http.postAjax(_url, { employee_id, position_id, merchants_code, employee_name, login_name,password, mobile, status }, successBack, errorBack)
}

//删除员工
export function deleteEmployee ({ employee_id }, successBack, errorBack) {
    http.postAjax('employee/deleteEmployee', { employee_id }, successBack, errorBack)
}

// 店铺销售统计
export function saleStatistics ({ day }, successBack, errorBack) {
  http.postAjax('employeeOrder/saleStatistics', { day }, successBack, errorBack)
}
// 财务记录
export function financeList ({ page, start_time, end_time }, successBack, errorBack) {
  http.postAjax('employeeOrder/finance', { page, start_time, end_time }, successBack, errorBack)
}
//  单个财务详情
export function financeInfo ({ finance_id }, successBack, errorBack) {
  http.postAjax('employeeOrder/financeInfo', { finance_id }, successBack, errorBack)
}
// 财务总收入
export function financeTotal ({ start_time, end_time }, successBack, errorBack) {
  http.postAjax('employeeOrder/financeTotal', { start_time, end_time }, successBack, errorBack)
}
// 得到店铺详情
export function getShop ({ }, successBack, errorBack) {
    http.postAjax('employeeShop/getShop', { }, successBack, errorBack)
}
// 修改店铺详情
export function editShop ({ shop_name, shop_logo, province, city, county, address, house_number,lng, lat,work_time,work_state,contact_mobile,contact_name, shop_desc,delivery_fee,delivery_range,delivery_desc,notice,shop_picture,license,license_food,id_card }, successBack, errorBack) {
    http.postAjax('employeeShop/editShop', { shop_name, shop_logo, province, city, county, address, house_number,lng, lat,work_time,work_state,contact_mobile,contact_name, shop_desc,delivery_fee,delivery_range,delivery_desc,notice,shop_picture,license,license_food,id_card }, successBack, errorBack)
}
