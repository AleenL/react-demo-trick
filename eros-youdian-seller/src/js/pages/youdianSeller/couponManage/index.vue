<template>
  <div class="coupanlist">
      <div class="topbarc">
          <div class="heador-content">
              <text class="text-box" :class="[checkIndex===0?'active':'']" @click="setGoing(0)">有效</text>
              <text class="text-box" :class="[checkIndex===1?'active':'']" @click="setGoing(1)">已结束</text>
          </div>
      </div>
      <scroller>
          <div class="coipanc" v-if="checkIndex===0 && !goodsLodingShow" v-for="(coupan) in coupanlisting" :key="coupan._id">
              <coupan :coupan="coupan" @goinfo="goinfo(coupan._id)"></coupan>
          </div>
          <div class="coipanc" v-if="checkIndex===1 && !goodsLodingShow" v-for="(coupan) in coupanlistover" :key="coupan._id">
              <coupan :coupan="coupan"@goinfo="goinfo(coupan._id)"></coupan>
          </div>
          <div class="overlayLoading" v-if="goodsLodingShow" :style="deviceHeight">
              <wxc-part-loading :show="goodsLodingShow" width="50px" height="50px"></wxc-part-loading>
          </div>
          <div class="empty" v-if="(coupanlisting.length == 0 && checkIndex===0 && !goodsLodingShow) || (coupanlistover.length == 0 && checkIndex===1 && !goodsLodingShow)">
              <div class="empty-div">
                  <image class="empty-img" src="bmlocal://assets/empty-coupon.png"></image>
                  <text class="empty-text">没有优惠券，去添加优惠券吧</text>
              </div>
          </div>
      </scroller>
      <div class="footer">
          <div class="footer-item" @click="go">
              <image style="width:36px;height:36px" src="http://cdn.udian.me/addDiscount.png"></image>
              <text class="text-desc">添加优惠券</text>
          </div>
      </div>
  </div>
</template>

<script>
import { WxcMinibar, WxcIcon, WxcPartLoading } from 'weex-ui'
import coupan from './Coupon'
import topbar from './TabTop'
import { usergGetMchCouponsForPage } from '../services/user'
// import weexRouter from '../../util/weexRouter'
// import http from '../../çutil/http'
// var modal = weex.requireModule('modal')

export default {
  components: { WxcMinibar, WxcIcon, coupan, topbar, WxcPartLoading },
  data () {
    return {
      checkIndex: 0,
      page: 1,
      type: 1,
      tablist: [
        {
          index: 1,
          active: true,
          title: '有效'
        },
        {
          index: 2,
          active: false,
          title: '已结束'
        }
      ],
      goodsLodingShow: false,
      coupanlisting: [],
      coupanlistover: []
    }
  },
    beforeBackAppear () {

    },
  created () {
    this.goodsLodingShow = true
    this.getList(this.type)
      this.$event.on('addcouponinfo', params => {
          this.$router.refresh()
      })
  },
  methods: {
    getList (type) {
      usergGetMchCouponsForPage({ page: this.page, type: 1}, (data) => {
          setTimeout(() => {
              this.coupanlisting = data.data
              this.goodsLodingShow = false
          }, 300)
      })
      usergGetMchCouponsForPage({ page: this.page, type: 2}, (data) => {
          setTimeout(() => {
              this.coupanlistover = data.data
              this.goodsLodingShow = false
          }, 300)
      })
    },
    tabTopItemOnClick (e) {
      console.log(e)
    },
    go () {
      this.$router.open({
        name: 'couponManage.addCouponinfo'
      })
    },
    goinfo (id) {
        this.$router.getParams('coupantype').then(resData => {
           if (resData.coupantype) {
               this.$event.emit('getsendCoupan', {
                   coupanid: id,
               })
               this.$router.back()
           } else {
               this.$router.open({
                   name: 'couponManage.couponinfo',
                   params: { coupanid: id}
               })
           }
        })
    },
    setGoing (e) {
        this.checkIndex = e
        this.goodsLodingShow = true
        setTimeout(() => {
            this.goodsLodingShow = false
        }, 300)
    }
  }
}
</script>

<style scoped>
  .coupanlist{
    background-color: #ffffff;
  }
  .content{
    /*padding: 30px 24px;*/
  }
  .topbarc{
    padding: 15px 20px;
    border-bottom-width: 1px;
    border-bottom-style: solid;
    border-bottom-color: #e4e4e4;
  }
  .coipanc{
    padding: 0px 32px;
  }

  .heador-content{
    width: 710px;
    border-color:#FE5282;
    border-style: solid;
    border-width: 2px;
    border-radius: 4px;
    flex-direction: row;
    align-items: center;
  }
  .wrap{
    width: 750px;
    flex-direction: row;
    justify-content: center;
    margin-top: 27px;
  }
  .text-box{
    flex: 1;
    font-family: PingFangSC-Medium;
    font-size: 28px;
    height: 56px;
    line-height: 56px;
    color: #FE5383;
    letter-spacing: -0.68px;
    text-align: center;
  }
  .active{
    background-color: #FE5383;
    color:#fff;
  }
  .overlayLoading{
      position: absolute;
      top: 50px;
      left: 0;
      bottom: 0;
      right: 0;
      justify-content: center;
      align-content: center;
      align-items: center;
      width: 750px;
      background-color: rgba(255, 255, 255, 0.1);
  }
  .empty{
      width: 750px;
      padding-top: 280px;
      text-align: center;
      flex-direction: row;
      justify-content: center;
  }
  .empty-div{
      flex-direction: column;
      align-items: center;
  }
  .empty-img{
      width: 210px;
      height: 174px;
  }
  .empty-text{
      font-size:28px;
      color: #4A4A4A;
      line-height: 40px;
      margin-top: 40px;
  }
  .footer{
      position: fixed;
      bottom:0;
      right: 0;
      width: 750px;
      height: 96px;
      background-color: #fff;
      justify-content: center;
      align-items: center;
  }
  .footer-item{
      align-items: center;
  }
  .text-desc{
      font-size: 20px;
      line-height: 28px;
      color: #FE4D7B;
      letter-spacing: -0.22px;
  }
</style>
