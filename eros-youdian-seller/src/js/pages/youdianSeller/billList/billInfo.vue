<template>
  <div>
      <div class="billinfo bg_f2">
          <scroller>
              <div class="billinfo-total border_b p_top30 bg_ff">
                  <div class="flex_row  justify_center">
                      <div class="flex_row t_center">
                          <image class="headimg" :src="info.uavatar"/>
                          <text class="font-size16 color_12" style="line-height: 75px;margin-left: 10px">{{info.uname}}</text>
                      </div>
                  </div>
                  <text class="font-size32 color_4a t_center lineheight120" v-if="info.type === 1">+ {{info.order.real_pay_price}}</text>
                  <text class="font-size32 color_4a t_center lineheight120" v-if="info.type === 2">- {{info.order.real_pay_price}}</text>
                  <text class="font_14 color_9b t_center">{{orderStateString}}</text>
              </div>
              <div class="list border_b p_lr20 m_top30 bg_ff">
                  <text class="bg_ff font-size16 border_b color_4a line-height80">{{info.shop_name}}</text>
                  <div class=" flex_row p_tb" v-for="(roderiteminfo, index) in info.order.item" :key="index">
                      <div class="flex_item">
                          <text class="color_51 font_14" v-if="info.type === 1">+{{roderiteminfo.price}}</text>
                          <text class="color_51 font_14" v-if="info.type === 2">-{{roderiteminfo.price}}</text>
                          <text class="color_9b font_12 overflow">{{roderiteminfo.goods_name}}</text>
                      </div>
                      <div class="flex_item t_right">
                          <text class="color_4a t_right font_14">x{{roderiteminfo.goods_num}} &nbsp;&nbsp;{{roderiteminfo.goods_total_price}}</text>
                      </div>
                  </div>
              </div>
              <div class="list border_b m_top30 bg_ff">
                  <wxc-cell label="配送费">
                      <text>￥{{info.order.delivery_price}}</text>
                  </wxc-cell>
                  <div class="flex_row p_20 lineheight80">
                      <div class="flex_item">
                          <image src="http://cdn.udian.me/coupanIcon.jpg" style="width: 32px;height: 32px;position: absolute;top: 5px;"></image>
                          <text class="color_51 font_14" style="margin-left: 45px">优惠券</text>
                      </div>
                      <div class="flex_item t_right">
                          <text class="color_4a t_right font_14">￥{{info.order.coupon_price || 0}}</text>
                      </div>
                  </div>
                  <div class="flex_row p_b20 p_left24 p_r20 border_b">
                      <div class="flex_item">
                          <image src="http://cdn.udian.me/packetIcon.jpg" style="width: 32px;height: 32px;position: absolute;top: 15px;"></image>
                          <text class="color_51 font_14 lineheight60" style="margin-left: 45px">红包</text>
                      </div>
                      <div class="flex_item t_right">
                          <text class="color_4a t_right font_14 lineheight60">￥{{info.red_price || 0}}</text>
                      </div>
                  </div>
                  <text class="flex_row p_r20 p_l20 line-height80 color_f7 t_right font_14">实付￥{{info.order.real_pay_price}}</text>
              </div>
              <div class="list border_b p_t20 p_b20 m_top30 bg_ff" v-if="info.type==2">
                  <div class="flex_row p_l20 p_r20">
                      <text class="color7d font_14 lineheight60" style="width: 150px">退款金额</text>
                      <text class="color_4a flex_item font_14 lineheight60">￥{{info.order.real_pay_price}}</text>
                  </div>
                  <div class="flex_row p_l20 p_r20">
                      <text class="color7d font_14 lineheight60" style="width: 150px">订单编号</text>
                      <text class="color_4a flex_item font_14 lineheight60">{{info.order_sn}}</text>
                  </div>
                  <div class="flex_row p_l20 p_r20">
                      <text class="color7d font_14 lineheight60" style="width: 150px">退款原因</text>
                      <text class="color_4a flex_item font_14 lineheight60">{{info.order.cancel_reason}}</text>
                  </div>
                  <div class="flex_row p_l20 p_r20">
                      <text class="color7d font_14 lineheight60" style="width: 150px">付款时间</text>
                      <text class="color_4a flex_item font_14 lineheight60">{{info.order.pay_time_str}}</text>
                  </div>
                  <div class="flex_row p_l20 p_r20">
                      <text class="color7d font_14 lineheight60" style="width: 150px">入账账户</text>
                      <text class="color_4a flex_item font_14 lineheight60" v-if="info.order.pay_type==1">支付用户的微信钱包</text>
                  </div>
              </div>
              <div class="list border_b p_t20 p_b20 m_top30 bg_ff" v-if="info.type==1">
                  <div class="flex_row p_l20 p_r20">
                      <text class="color7d font_14 lineheight60" style="width: 150px">收货信息</text>
                      <div style="flex-direction: column">
                        <text class="color_4a flex_item font_14 lineheight60">{{info.order.buyer_name}}</text>
                        <text class="color_4a font_14 lineheight60">{{info.order.address_info.address_str}}</text>
                      </div>
                  </div>
                  <div class="flex_row p_l20 p_r20">
                      <text class="color7d font_14 lineheight60" style="width: 150px">配送时间</text>
                      <text class="color_4a flex_item font_14 lineheight60">立即配送</text>
                  </div>
                  <div class="flex_row p_l20 p_r20">
                      <text class="color7d font_14 lineheight60" style="width: 150px">配送方式</text>
                      <text class="color_4a flex_item font_14 lineheight60" v-if="info.order.delivery_type==1">商家配送</text>
                  </div>
                  <div class="flex_row p_l20 p_r20">
                      <text class="color7d font_14 lineheight60" style="width: 150px">订单编号</text>
                      <text class="color_4a flex_item font_14 lineheight60">{{info.order_sn}}</text>
                  </div>
                  <div class="flex_row p_l20 p_r20">
                      <text class="color7d font_14 lineheight60" style="width: 150px">下单时间</text>
                      <text class="color_4a flex_item font_14 lineheight60">{{info.order.confirm_time_str}}</text>
                  </div>
                  <div class="flex_row p_l20 p_r20">
                      <text class="color7d font_14 lineheight60" style="width: 150px">付款时间</text>
                      <text class="color_4a flex_item font_14 lineheight60">{{info.order.pay_time_str}}</text>
                  </div>
              </div>
          </scroller>
      </div>
  </div>
</template>

<script>
import { WxcMinibar, WxcCell } from 'weex-ui'
import { financeInfo } from '../services/employee.js'

export default {
  name: 'bill-info',
  components: { WxcMinibar, WxcCell },
  data () {
    return {
      info: ''
    }
  },
  computed: {
    orderStateString () {
      switch (this.info.order.order_state) {
        case 0: {
          return '待付款'
        }
        case 1: {
          return '待接单(已支付)'
        }
        case 3: {
          return '已接单 '
        }
        case 4: {
          return '配送中'
        }
        case 5: {
          return '已完成'
        }
        case 6: {
          return '已取消'
        }
        default: {
          return ''
        }
      }
    }
  },
  created () {
    this.getInfo()
  },
  methods: {
    getInfo () {
      this.$storage.get('financeId').then((dataid) => {
        financeInfo({finance_id: dataid.id}, (data) => {
          console.log(data)
          this.info = data.data
        })
      })
    }
  }
}
</script>

<style src="../common.css" scoped></style>
<style scoped>
  .bg_f2{
    flex: 1;
  }
  .billinfo-total{
    height: 304px;
  }
  .font-size32{
    font-size: 64px;
  }
  .headimg{
    width:68px;
    height:68px;
    border-radius: 50%;
  }
  .lineheight120{
    line-height: 120px;
  }
  .lineheight60{
    line-height: 60px;
  }
  .color7d{
    color: #7D7D7D;
  }
</style>
