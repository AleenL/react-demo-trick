/**
 * Created by zhouchao on 2018/3/9.
 */
import http from '../utils/http'
/**
 * 会员管理--会员列表memberVip/getMemberList
 */
export function memberVipGetMemberList ({ keywords, page }, successBack, errorBack) {
  http.postAjax('memberVip/getMemberList', { keywords, page }, successBack, errorBack)
}
/**
 * 会员管理--会员详情
 */
export function memberVipGetMember ({ member_id }, successBack, errorBack) {
  http.postAjax('memberVip/getMember', { member_id }, successBack, errorBack)
}
