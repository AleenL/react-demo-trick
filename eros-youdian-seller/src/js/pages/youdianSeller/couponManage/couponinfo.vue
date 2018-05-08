<template>
    <div class="content">
        <!--<wxc-minibar title="优惠券" background-color="#fd4470" text-color="#fff">-->
            <!--<wxc-icon name="back" style="color:#fff" slot="left"></wxc-icon>-->
            <!--<text slot="right" class="text-right">...</text>-->
        <!--</wxc-minibar>-->
        <!--<wxc-minibar title="优惠券" style="color: #ffffff" background-color="#fd4470" text-color="#fff">-->
            <!--<text slot="right" class="text-right" @click="more">...</text>-->
        <!--</wxc-minibar>-->
        <div class="all" v-if="isder" @click="close"></div>
        <div class="der" v-if="isder">
            <!--<text class="posit"></text>-->
            <image class="posit" src="http://cdn.udian.me/topTriangle.png"></image>
            <text class="deritem" @click="remove(coupan._id)">删除</text>
        </div>
        <div>
            <div class="avatar">
                <image class="shopimg" v-if="coupan.shop_logo!==''" :src=coupan.shop_logo ></image>
                <image class="shopimg" v-if="coupan.shop_logo===''"  src="http://wx.qlogo.cn/mmopen/Z7kTvJzVWnxzo9qCEtvynvACZpfu4yhhXFg1J4FO4k69cRUictURDwP8TzlRxKoJ9RQOVpBhyVHYwEljicIWhVRU5qRqCyaCTR/132" />
            </div>
            <div class="wrap">
                <div class="coupan">
                    <div class="circle circle-left"></div>
                    <div class="circle circle-right"></div>
                    <div class="coupan-top">
                        <text class="name">{{coupan.shop_name}}</text>
                        <text class="price">{{coupan.amount}}元代金券</text>
                        <text class="expire">{{coupan.is_expire_str}}</text>
                        <text class="time">{{coupan.validity_time_str}}</text>
                    </div>
                    <div class="coupan-middle">
                        <div class="item">
                            <text class="text-circle"></text>
                            <text class="text-desc">{{coupan.use_attribute_str}}</text>
                        </div>
                    </div>
                    <wxc-cell class="coupan-cell" title="查看领券用户" @wxcCellClicked="coupanuserinfo" :has-arrow="true">
                        <text class="text-people">{{coupan.user_count}}人</text>
                    </wxc-cell>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { WxcMinibar, WxcIcon, WxcCell } from 'weex-ui'
import { userGetMchCoupon, userDeleteMchCoupon } from '../services/user'
export default {
  components: {
    WxcMinibar,
      WxcCell,
    WxcIcon
  },
  data () {
    return {
      coupan: {
        name: '高兴奶茶店',
        price: '10',
        timeStart: '2018.01.22',
        timeEnd: '2018.02.22',
        people: 15
      },
      isder: false,
      id: ''
    }
  },
  created () {
    this.$navigator.setRightItem({
      text: '...',                             // 展示的文字 (和图片 二选一)
      textColor: '#FE5383',                    // 文字颜色 (默认为白色)
      fontSize: '32',                         // 字号（默认32px）
      fontWeight: 'normal',                   // 是否加粗（默认不加粗）
    }, () => {
      this.more()
    })
      this.$router.getParams('coupanid').then(resData => {
          this.getInfo(resData.coupanid)
      })
  },
  methods: {
    getInfo (id) {
      userGetMchCoupon({_id: id}, (data) => {
        this.coupan = data.data
      })
    },
    more () {
      this.isder = !this.isder
    },
    close () {
      this.isder = !this.isder
    },
    remove (id) {
      userDeleteMchCoupon({_id: id}, (data) => {
        this.$notice.toast({
          message: '删除成功！'
        })
        this.isder = !this.isder
        setTimeout(() => {
            this.$event.emit('addcouponinfo', {})
            this.$router.back()
        }, 1000)
      })
    },
    coupanuserinfo () {
      this.$notice.toast({
        message: '该功能暂未开放！'
      })
    }
  }
}
</script>

<style scoped>
    .content{
        background-color: #fd4470;
    }

    .text-right{
        font-size:50px;
        margin-top: -25px;
        color: #fff;
    }
    .wrap{
        flex-direction: row;
        justify-content: center;
        margin-top: 124px;
    }
    .avatar{
        width: 124px;
        height: 124px;
        border-radius: 62px;
        /*background-color: #666;*/
        position: fixed;
        left: 314px;
        top: 148px;
        z-index: 2;
    }
    .shopimg{
        width: 124px;
        height: 124px;
        border-radius: 50%;
        z-index: 4;
    }
    .coupan{
        width:710px;
        background-color: #fff;
        padding-top: 60px;
        position:relative;
    }
    .coupan-top{
        padding-bottom: 14px;
        align-items:center;
        margin: 0 9px;
        border-bottom-width: 1px;
        border-bottom-style: dashed;
        border-bottom-color: #E4E4E4;
    }
    .name{
        color: #666;
        font-size: 28px;
        margin: 20px 0;
    }
    .price{
        font-weight: bold;
        margin-bottom: 28px;
        font-family: PingFangSC-Medium;
        font-size: 56px;
        height: 80px;
        line-height: 80px;
        color: #121C32;
        letter-spacing: -0.12px;
    }
    .expire{
        width: 280px;
        height: 68px;
        text-align: center;
        line-height: 68px;
        background-color: #F2F2F2;
        font-size: 28px;
        color:#c5c5c5 ;
        margin-bottom: 12px;
    }
    .time{
        font-size: 22px;
        color: #666666;
        letter-spacing: -0.31px;
        margin-bottom: 10px;
        margin-top: 20px;
    }
    .coupan-middle{
        flex-direction: row;
        flex-wrap:wrap;
        padding:  32px;
        border-bottom-width: 1px;
        border-bottom-style: solid;
        border-bottom-color: #eeeeee;

    }
    .item{
        flex-direction:row;
        align-items: center;
        margin-right: 20px;
    }
    .text-circle{
        width: 8px;
        height: 8px;
        border-radius: 4px;
        background-color: #c5c5c5;
        margin-right: 14px;
    }
    .text-desc{
        font-size: 24px;
        height: 40px;
        line-height: 34px;
        color: #121C32;
        letter-spacing: -0.58px;
    }
    .coupan-cell{
        width: 700px;
    }
    .text-people{
        font-family: PingFangSC-Regular;
        font-size: 28px;
        color: #666666;
        letter-spacing: -0.68px;
        padding-right: 18px;
    }
    .circle{
        width: 18px;
        height: 18px;
        border-radius: 9px;
        background-color: #fd4470;
        position:absolute;
        top:381px;
    }
    .circle-left{
        left: -9px;
    }
    .circle-right{
        right: -9px;
    }
    .all {
        position: fixed;
        top: 0px;
        right: 0px;
        bottom: 0px;
        left: 0px;
        background-color: rgba(255, 255, 255, 0.8);
    }
    .der{
        width: 192px;
        align-items: center;
        background-color: #000000;
        padding: 0px 32px;
        position: fixed;
        z-index: 2;
        right:32px;
        top:20px;
        border-radius: 4px ;
    }
    .posit{
        width: 20px;
        height: 20px;
        position: relative;
        top: -20px;
        left: 60px;
    }
    .deritem{
        font-size:30px;
        flex: 1;
        color:rgba(255,255,255,1);
        line-height:40px;
        padding-bottom: 15px;
        border-bottom-width: 1px;
        border-bottom-color: rgba(255,255,255,0.4);
        border-bottom-style: solid;
    }
</style>
