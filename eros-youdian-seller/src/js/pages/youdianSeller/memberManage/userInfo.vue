<template>
  <div class="content">
    <!--<wxc-minibar title="用户详情" background-color="#fff"></wxc-minibar>-->
      <div class="user-wrap">
          <image class="avator" :src="userinfo.avatar_str!=='/'?userinfo.avatar_str:'http://cdn.udian.me/1/-880TK_QKlzP8RNUxnkyLiTEzftZJvCs.jpg'"  />
          <!--<image class="avator" :src="userinfo.avatar_str"></image>-->
      <div>
        <text class="text-name">{{userinfo.name}}</text>
        <text class="text-phone">{{userinfo.mobile}}</text>
      </div>
    </div>
    <div class="money-wrap">
      <div class="money-wrap-div">
        <text class="money-wrap-div-text1">{{userinfo.balance}}</text>
        <text class="money-wrap-div-text2">余额</text>
      </div>
      <text class="verticalBar"></text>
      <div  class="money-wrap-div">
        <text class="money-wrap-div-text1">{{userinfo.point_num}}</text>
        <text class="money-wrap-div-text2">积分</text>
      </div>
    </div>
    <div class="cost-wrap padding_left_32">
      <wxc-cell label="平均消费" :cell-style="cellStyleObj">
        <text slot="value" class="cost-text">￥{{userinfo.averageCost || '0'}}</text>
      </wxc-cell>
      <wxc-cell label="累计消费" :cell-style="cellStyleObj">
        <text slot="value" class="cost-text">￥{{userinfo.consume_price}}</text>
      </wxc-cell>
      <wxc-cell label="最后消费" :cell-style="cellStyleObj">
        <text slot="value" class="cost-text">{{userinfo.last_consume_time}}</text>
      </wxc-cell>
    </div>
      <div class="padding_left_32">
          <wxc-cell label="用户订单" :has-arrow="true" @wxcCellClicked="go" :cell-style="cellStyleObj">
              <text slot="value" class="cost-text" style="padding-right: 28px">{{userinfo.order}}</text>
          </wxc-cell>
      </div>

    <div class="footer">
      <wxc-button text="打电话" class="bt" @wxcButtonClicked='call'></wxc-button>
    </div>

  </div>
</template>

<script>
import { WxcButton, WxcMinibar } from 'weex-ui'
import { memberVipGetMember } from '../services/memberVip'
// import http from '../../util/http'
// var modal = weex.requireModule('modal')
import { WxcCell } from 'weex-ui'

export default {
  components: {
      WxcCell,
    WxcButton,
    WxcMinibar
  },
  data () {
    return {
      userid: '',
      userinfo: '',
      cellStyleObj:{paddingLeft:'0',height:'100px',paddingRight: '32px'}
    }
  },
  created () {
    this.getInfo()
  },
  methods: {
    getInfo () {
      this.$router.getParams('userid').then(resData => {
          memberVipGetMember({member_id: resData.userid}, (data) => {
              this.userinfo = data.data
          })
      })
    },
    go () {
        this.$router.open({
            name: 'memberOrder',
            params: {
                uid: this.userinfo._id
            }
        })
    },
      call () {
        this.$notice.toast({
            message: '该功能暂未位开放！'
        })
      }
  }
}
</script>

<style scoped>
  .content{
    background-color: #f2f2f2;
  }
  .user-wrap{
    margin-top: 20px;
    padding-top: 48px;
    padding-left: 32px;
    padding-bottom: 24px;
    flex-direction: row;
    background-color: #ffffff;
    border-bottom-width:2px;
    border-color: #F4F7F6;;
  }
  .avator{
    width: 104px;
    height: 104px;
    background-color: #666;
    margin-right: 20px;
  }
  .text-name{
    height: 40px;
    line-height: 36px;
    font-family: PingFangSC-Medium;
    font-size: 36px;
    color: #121C32;
    letter-spacing: 0;
    margin-left: 28px;
    margin-top: 16px;
  }
  .text-phone{
    font-family: PingFangSC-Regular;
    height: 40px;
    line-height: 40px;
    font-size: 28px;
    color: #666666;
    letter-spacing: -0.68px;
    margin-left: 28px;
    margin-top: 8px;
  }
  .money-wrap{
    flex-direction: row;
    justify-content:space-around;
    align-items: center;
    background-color:#ffffff;
    position: relative;
  }
  .money-wrap-div{
    margin-top: 14px;
    margin-bottom: 6px;
  }
  .money-wrap-div-text1{
    font-family: PingFangSC-Medium;
    width: 188px;
    height: 44px;
    line-height: 44px;
    text-align: center;
    font-size: 32px;
    color: #121C32;
    letter-spacing: -0.78px;
  }
  .money-wrap-div-text2{
    font-family: PingFangSC-Regular;
    width: 188px;
    height: 44px;
    font-size: 24px;
    text-align: center;
    color: #7D7D7D;
    letter-spacing: -0.58px;
    line-height: 44px;
  }
  .verticalBar{
    width: 4px;
    height: 40px;
    background-color:  #E9E9E9;
    position: absolute;
    left: 375px;
    top: 36px;
  }
  .cost-wrap{
    margin: 20px 0;
  }
  .cost-text{
    font-family: PingFangSC-Regular;
    height: 40px;
    line-height: 40px;
    font-size: 28px;
    color: #666666;
    letter-spacing: -0.68px;
  }
  .footer{
    background-color: #fff;
    width: 750px;
    height: 120px;
    justify-content: center;
    align-items: center;
    position: fixed;
    bottom: 0;
  }
  .bt{
    background-color: #FC345C ;
    width: 686px;
    height: 80px;
    border-radius: 8px;
    font-size: 32px;
    color: #FFFFFF;
    letter-spacing: -0.36px;
  }
  .padding_left_32{
      padding-left: 32px;
      background-color: #ffffff;
  }
</style>
