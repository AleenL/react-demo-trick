<template>
  <div class="container">
      <div :style="voidBox"></div>
      <mini-bar background-color="#fff">
          <image src="http://cdn.udian.me/icon-back.png"
                 slot="left"
                 class="icon"></image>
          <div slot="middle" class="">
              <input type="text" placeholder="搜索用户昵称" @input="wxcSearchbarInputOnInput" class="box-input">
              <image class="icon-search" src="http://cdn.udian.me/search.png"></image>
          </div>
      </mini-bar>
      <scroller>
        <div style="padding-left: 32px">
          <div  class="user-list" v-for='(vipuser, index) in vipuserlist' :key='index' @click="goinfo(vipuser._id)">
            <image class="user-img" :src="vipuser.avatar_str!=='/'?vipuser.avatar_str:'http://cdn.udian.me/1/-880TK_QKlzP8RNUxnkyLiTEzftZJvCs.jpg'"  />
            <!--<image class="user-img" src="http://cdn.udian.me/1/-880TK_QKlzP8RNUxnkyLiTEzftZJvCs.jpg"  />-->
            <div class="user-info" style="margin-left: 30px">
              <text class="names">{{vipuser.name || '张三'}}</text>
              <text class="phones">累计消费：{{vipuser.consume_price}}</text>
            </div>
            <div> <text class="times">{{vipuser.created_at_str}}</text></div>
          </div>
            <div class="overlayLoading" v-if="isShow">
                <wxc-part-loading :show="isShow" width="50px" height="50px"></wxc-part-loading>
            </div>
            <div class="empty" v-if="vipuserlist.length == 0 && !isShow">
                <div class="empty-div">
                    <image class="empty-img" src="bmlocal://assets/empty-member.png"></image>
                    <text class="empty-text">暂时没有会员信息哦～</text>
                </div>
            </div>
        </div>
    </scroller>
  </div>
</template>

<script>
import {WxcButton, WxcSearchbar, WxcMinibar, WxcPartLoading} from 'weex-ui'
import { memberVipGetMemberList } from '../services/memberVip'
export default {
  data () {
    return {
      voidBox: {},
      page: 1,
      vipuserlist: [],
      keywords: '',
      height: 88,
      isShow: true,
      barHeight: weex.config.eros.statusBarHeight ? weex.config.eros.statusBarHeight : 0,
      top: 0,
        inputEdit: false
    }
  },
  components: {
      WxcButton, WxcSearchbar, WxcMinibar, WxcPartLoading,
      miniBar: require('./MiniBar')
  },
  created () {
      this.voidBox.height = weex.config.eros.statusBarHeight + 'px'
      this.getList()
  },
  methods: {
    getList () {
      memberVipGetMemberList({keywords: this.keywords, page: this.page}, (data) => {
        // this.vipuserlist = data.data.models
          setTimeout(() => {
              this.vipuserlist = data.data.models
              this.isShow = false
          }, 300)
      })
    },
    goinfo (id) {
        this.$router.open({
            name: 'memberManage.userInfo',
            params: { userid: id}
        })
    },
    wxcCellClicked (e) {
      console.log(e)
    },
    wxcButtonClicked (e) {
      console.log(e)
    },
    wxcSearchbarInputOnFocus () {
    },
    wxcSearchbarInputOnBlur () {
    },
    wxcSearchbarInputReturned () {
    },
    wxcSearchbarCloseClicked () {
    },
    wxcSearchbarInputOnInput (e) {
      this.keywords = e.value
      this.getList()
    },
    wxcSearchbarCancelClicked () {
    },
    wxcSearchbarInputDisabledClicked () {
    },
    wxcSearchbarDepChooseClicked () {
    }
  },
}
</script>

<style scoped>
  .container {
    background-color: white;
  }

  .icon{
      width: 30px;
      height: 30px;
  }
  .user-list{
    flex-direction: row;
    padding-right: 28px;
    padding-top: 24px;
    padding-bottom: 24px;
    border-bottom-style: solid;
    border-bottom-width: 1px;
    border-bottom-color:#ececec
  }
  .user-img{
    width: 104px;
    height: 104px;
    border-radius: 8px;
  }
  .user-info{
    flex-direction: column;
    text-align: justify;
    flex: 1;
  }
  .names{
    width: 300px;
    font-size:28px;
    color:rgba(18,28,50,1);
    line-height:40px;
    lines: 1;
    overflow: hidden;
    /*white-space: nowrap;*/
    text-overflow: ellipsis;
  }
  .times{
    font-size:24px;
    color:rgba(197,197,197,1);
    line-height:40px;
    text-align: right;
    flex: 1;
  }
  .phones{
    font-size:24px;
    font-family:PingFangSC-Medium;
    color:#666666;
    line-height:34px;
    margin-top: 24px;
  }
  .bodr_m{
    border-bottom-style: solid;
    border-bottom-width: 1px;
    border-bottom-color:#ececec
  }
  .box-input {
      width: 540px;
      height: 60px;
      padding-left: 68px;
      background-color: #EEEEEE ;
  }
  .icon-search{
      position: absolute;
      left: 20px;
      top: 14px;
      width: 28px;
      height: 28px;
      margin-right: 28px;
  }
  .overlayLoading{
      position: absolute;
      top: 170px;
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
      width: 232px;
      height: 158px;
  }
  .empty-text{
      font-size:28px;
      color: #4A4A4A;
      line-height: 40px;
      margin-top: 40px;
  }
</style>
