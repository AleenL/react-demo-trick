<template>
    <div>
        <div class="wrap" :class="[card.info?'box-info':'']" @click="goinfo">
            <image class="bgimg" :src=card.color></image>
            <div class="header-box" :class="[card.info?'mb170':'']">
                <text class="text-header" >{{card.title || '会员卡名称'}}</text>
                <!--<text class="text-header" v-if="card.info">会员</text>-->
            </div>
            <div style="position:relative">
                <text class="text-desc">{{card.validity_time_str}}</text>
                <div class="wrap-box">
                    <div class="icon-box">
                        <image class="icon" src="http://cdn.udian.me/cdistcount1.png"></image>
                        <text class="text-desc w112">送{{card.give_point_num}}积分</text>
                    </div>
                    <div class="icon-box">
                        <image class="icon" src="http://cdn.udian.me/cdiscount2.png"></image>
                        <text class="text-desc">送{{card.give_coupon_num}}张优惠券</text>
                    </div>
                    <!--<div class="icon-box">-->
                        <!--<image class="icon" src="http://cdn.udian.me/cdistcount1.png"></image>-->
                        <!--<text class="text-desc w112" >送{{card.give_point_num}}积分</text>`-->
                    <!--</div>-->
                    <!--<div class="icon-box">-->
                        <!--<image class="icon" src="http://cdn.udian.me/cdiscount2.png"></image>-->
                        <!--<text class="text-desc">送{{card.give_coupon_num}}张优惠券</text>-->
                    <!--</div>-->
                </div>
                <div class="discount-box">
                    <text class="text-discount f56"
                          :class="[card.info?'text-info':'',card.info?'f64':'']"
                    >{{card.discount_str}}</text>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
  props: {
    card: {
      default: {
          title: '白金卡',
          validity_time_str: '2018-3-1 到 2018-5-1',
          give_point_num: 3,
          give_coupon_num: 1,
          discount_str: 1.5,
          info: false
      }
    }
  },
  methods: {
    goinfo () {
      this.$emit('go')
    }
  }
}
</script>

<style scoped>
    .wrap{
        border-top-left-radius: 18px;
        border-top-right-radius: 18px;
        width:686px;
        height: 240px;
        overflow: hidden;
        padding-left: 20px;
        padding-right: 20px;
        padding-top: 46px;
        margin-top: 20px;
    }
    .bgimg{
        width:686px;
        height: 320px;
        position: absolute;
        top: 0px;
        left: 0px;
    }
    .header-box{
        flex-direction: row;
        align-items: center;
        margin-bottom: 34px;
    }
    .text-header{
        font-size: 32.4px;
        color: #FFFFFF;
        line-height: 32.4px;
        text-shadow: 0 1px 1px #393C3F;
    }
    .wrap-box{
        flex-direction:row;
        margin-top: 10px;
    }
    .text-desc{
        font-size: 24px;
        color: #ffffff;
        height: 32px;
        line-height: 32px;
    }
    .discount-box{
        color: #f2f2f2;
        flex-direction:row;
        vertical-align: bottom;
        align-items: flex-end;
        position: absolute;
        bottom: 10px;
        right: 0;
    }
    .icon-box{
        flex-direction: row;
        align-items: center;
        width: 180px
    }
    .icon{
        width: 20px;
        height: 24px;
        margin-right: 4px;
    }
    .text-discount{
        font-size: 24px;
        color: #fff;
    }
    .w112{
        width: 112px;
        margin-right: 22px;
    }
    .f56{
        font-size: 40px;
    }
    .mb170{
        margin-bottom: 100px;
    }
    .box-info{
        borderRadius: 20px;
        paddingTop: 74px;
        height: 320px;
        width:548px;
        border-radius: 18px;
    }
    .text-info{
        color: #ffffff;
        /*opacity: 0.7;*/
    }
    .f64{
        font-size: 46px;
    }
</style>
