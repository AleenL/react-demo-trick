<template>
    <div class="wrap">
        <!--<div class="img-wrap"></div>-->
        <image class="img" :src="obj.src"></image>
        <text class="text-title">{{obj.text1}}</text>
        <text class="text-desc">{{obj.text2}}</text>
        <wxc-button text="创建" :btnStyle="btn" @wxcButtonClicked="go" ></wxc-button>
    </div>
</template>

<script>
import { WxcButton } from 'weex-ui'
export default {
  components: {
    WxcButton
  },
  props: {
    obj: {
      text1: {
        default: ''
      },
      text2: {
        default: ''
      },
      src: {
        default: ''
      },
      fn: {
        default: () => {}
      }
    }
  },
  data () {
    return {
      btn: {
        backgroundColor: '#FE5383',
        width: '140px',
        height: '52px',
        borderRadius: '6px',
        marginTop: '36px'
      }
    }
  },
  methods: {
    go () {
      this.obj.fn()
    }
  }
}
</script>

<style scoped>
    .wrap{
        background-color: #FFFFFF;
        box-shadow: 0 2px 6px 0 #F2F2F2;
        border-radius: 16px;
        width: 334px;
        height: 426px;
        align-items: center;
    }
    .img-wrap{
        width: 100px;
        height: 100px;
        background-color:#666;
        margin:30px 0;
    }
    .img{
        width: 144px;
        height: 144px;
        border-radius: 72px;
        margin: 30px 0;
    }
    .text-title{
        /*font-family: PingFangSC-Medium;*/
        font-size: 26px;
        height: 36px;
        line-height: 36px;
        color: #121C32;
        letter-spacing: -0.28px;
    }
    .text-desc{
        /*font-family: PingFangSC-Regular;*/
        font-size: 20px;
        color: #666666;
        letter-spacing: -0.02px;
        height: 46px;
        line-height: 46px;
    }
</style>
