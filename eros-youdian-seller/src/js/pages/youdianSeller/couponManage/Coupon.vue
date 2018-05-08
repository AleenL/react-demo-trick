<template>
    <div style="background-color: #fff">
        <div class="coupan fr" @click='goinfo'>
            <div class="fr price-box">
                <text class="cf fs20" style="margin-top:15px">￥</text>
                <text class="price cf">{{coupan.amount}}</text>
            </div>
            <div class="toprdios"></div>
            <div class="bottomrdios"></div>
            <div class="time-box">
                <text class="name c6">{{coupan.title}}</text>
                <text class="time c6">{{coupan.use_attribute_str}}</text>
                <!--<text class="time c6">订单满{{coupan.needPrice}}元可用</text>-->
                <!--<text class="time c6">有效期  {{coupan.timeStart}}至{{coupan.timeEnd}}</text>-->
                <text class="time c6">{{coupan.validity_time_str}}</text>
            </div>
        </div>
    </div>
</template>

<script>
import { WxcButton } from 'weex-ui'
export default {
  components: {
    WxcButton
  },
  props: {
    coupan: {
      default: {}
    }
  },
  methods: {
    goinfo () {
      this.$emit('goinfo')
    }
  }
}
</script>

<style scoped>
    .coupan{
        height: 176px;
        /*padding:0 32px;*/
        background-color: #F7F8FA;
        margin-top: 22px;
        border: 1px solid #e4e4e4;
    }
    .fr{
        flex-direction: row;
    }
    .hc{
        justify-content: center;
        margin: 20px 0;
    }
    .bt{
        background-color: #fd3e69;
        width: 300px;
    }
    .price-box{
        align-items: center;
        padding-left:30px;
        width: 174px;
        border-right-width: 1px;
        border-right-style: dashed;
        border-right-color: #e4e4e4;
        position: relative;
    }
    .toprdios{
        width: 30px;
        height: 30px;
        background-color: white;
        border-radius: 50%;
        position: absolute;
        top: -18px;
        left: 160px;
        border-bottom-width: 1px;
        border-bottom-style: solid;
        border-bottom-color: #e4e4e4;
    }
    .bottomrdios{
        width: 30px;
        height: 30px;
        background-color: white;
        border-radius: 50%;
        position: absolute;
        bottom: -18px;
        left: 160px;
        border-top-width: 1px;
        border-top-style: solid;
        border-top-color: #e4e4e4;
    }
    .c6{
        color: #666666;
    }
    .cf{
        color: #F2693F;
    }
    .fs20{
        font-size: 30px;
        font-weight: bold;
    }
    .price{
        font-size: 64px;
        /*margin-top: -22px;*/
    }
    .time-box{
        padding-left: 30px;
    }
    .name{
        font-size: 28px;
        margin: 20px 0;
    }
    .time{
        font-size:24px;
        margin-bottom: 8px;
    }
</style>
