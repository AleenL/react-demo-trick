<template>
        <div class="content">
            <!--<wxc-minibar title="会员卡详情" background-color="#ffffff">-->
                <!--<text slot="right" class="text-right" @click="more">...</text>-->
            <!--</wxc-minibar>-->
            <div class="all" v-if="isder" @click="close"></div>
            <div v-if="isder" style="position: fixed; right: 32px; top: 0px;">
                <image class="posit" src="bmlocal://assets/topTriangle@2x.png"></image>
                <div class="der" v-if="isder">
                    <!--<text class="posit"></text>-->
                    <image class="posit" src="bmlocal://assets/topTriangle@2x.png"></image>
                    <text class="deritem" @click="editinfo()">编辑</text>
                    <text class="deritem" @click="disable">禁用</text>
                    <text class="deritem" @click="remove(cardInfo._id)">删除</text>
                </div>
            </div>
            <div class="card-wrap">
                <vip-card :card="cardInfo"></vip-card>
            </div>
            <div style="background-color: #ffffff; padding-left: 32px">
                <wxc-cell class="cell" label="会员期限">
                    <text class="text-desc">{{cardInfo.validity_time_str}}</text>
                </wxc-cell>
                <wxc-cell class="cell" label="赠送积分">
                    <text class="text-desc">{{cardInfo.give_point_num}}积分</text>
                </wxc-cell>
                <wxc-cell class="cell" label="赠送优惠券" :has-arrow="true" @wxcCellClicked="showcoupan">
                    <text class="text-desc pr24">{{cardInfo.give_coupon_num}}张</text>
                </wxc-cell>
                <div v-if="is_coupan && cardInfo.give_coupon_num > 0" v-for="couinfo in cardInfo.coupon_info"  style="padding: 20px">
                    <div class="coupan fr ">
                        <div class="fr price-box">
                            <text class="cf fs20" style="margin-top:15px">￥</text>
                            <text class="price cf">{{couinfo.amount}}</text>
                        </div>
                        <div class="toprdios"></div>
                        <div class="bottomrdios"></div>
                        <div class="time-box1">
                            <text class="name c6">{{couinfo.title}}</text>
                            <text class="time c6">使用条件：{{couinfo.limit_type_str}}</text>
                            <text class="time c6">有效期： {{couinfo.validity}}天</text>
                        </div>
                    </div>
                </div>
                <wxc-cell class="cell" label="查看领卡会员" :has-bottom-border="false" @wxcCellClicked="cardVIP"  :has-arrow="true"></wxc-cell>
            </div>
            <div class="footer">
                <wxc-button class="bt" text="二维码发卡" @wxcButtonClicked='sendcard'></wxc-button>
            </div>
        </div>
</template>

<script>
import { WxcMinibar, WxcButton, WxcCell } from 'weex-ui'
import { userGetMchCard, userDeleteMchCard } from '../services/user'

export default {
  components: {
    WxcMinibar,
    WxcButton,
    WxcCell,
    vipCard: require('./VipCard.vue'),
  },
  data () {
    return {
      card: {
        name: '白金卡',
        time: {
          year: 2018,
          month: '01',
          day: 12
        },
        bp: 10,
        number: 3,
        discount: 9.5,
        hasPadding: true,
        bgc: {
          backgroundColor: '#2D3134'
        },
        info: true
      },
      cardInfo: {
        time: 30,
        bp: 10,
        coupan: 3
      },
      isder: false,
      addinfo_id: '',
      is_coupan: false
    }
  },
  created () {
      this.$navigator.setRightItem({
          image: 'bmlocal://assets/editImage@2x.png'
      }, () => {
          // 点击回调
          this.more()
      })
      this.$router.getParams('vipid').then(resData => {
          // this.vip_id = resData.vipid
          this.getInfo(resData.vipid)
      })
      this.$event.on('addvipinfo', params => {
          this.$router.refresh()
      })
  },
  methods: {
    getInfo (id) {
      var self = this
      userGetMchCard({_id: id}, (data) => {
        data.data.info = true
        self.cardInfo = data.data
      })
    },
    more () {
      this.isder = !this.isder
    },
      close () {
          this.isder = !this.isder
      },
    remove (id) {
      userDeleteMchCard({_id: id}, (data) => {
        this.$notice.toast({
          message: '删除成功！',
        })
        setTimeout(() => {
            this.$event.emit('remove')
            this.$router.back()
        }, 1000)
      })
    },
    editinfo () {
        this.$router.open({
            navTitle: '编辑会员卡',
            name: 'vipCardList.addVipCard',
            params: { cardInfo: this.cardInfo, editinfos: true}
        })
        this.isder = !this.isder
    },
    showcoupan () {
        this.is_coupan = !this.is_coupan
    },
    cardVIP () {
        this.$notice.toast({
            message: '该功能暂未位开放！'
        })
    },
    sendcard () {
        this.$notice.toast({
            message: '该功能暂未位开放！'
        })
    },
    disable () {
        this.$notice.toast({
            message: '该功能暂未位开放！'
        })
        this.isder = !this.isder
    }
  }
}
</script>

<style scoped>
    .content{
        background-color: #f2f2f2;
    }
    .text-right{
        font-size:50px;
        margin-top: -25px;
    }
    .card-wrap{
        flex-direction: row;
        justify-content: center;
        background-color: #fff;
        padding: 30px 0px;
    }
    .cell{
        padding-left: 0px !important;
    }
    .footer{
        width:750px;
        height: 120px;
        background-color: #fff;
        position: fixed;
        bottom: 0;
        align-items: center;
        justify-content: center;
    }
    .bt{
        width: 700px;
        height: 80px;
        background-color: #FC345C;
    }
    .text-desc{
        font-family: PingFangSC-Regular;
        font-size: 28px;
        height: 40px;
        line-height: 40px;
        color: #666666;
        letter-spacing: -0.68px;
    }
    .pr24{
        padding-right: 24px;
    }
    .all {
        position: fixed;
        top: 0px;
        right: 0px;
        bottom: 0px;
        left: 0px;
        background-color: rgba(255, 255, 255, 0);
    }
    .der{
        width: 192px;
        align-items: center;
        background-color: #000000;
        padding: 0px 32px;
        /*position: fixed;*/
        z-index: 2;
        /*right:32px;*/
        /*top:20px;*/
        border-radius: 4px ;
    }
    .posit{
        width: 20px;
        height: 20px;
        position: relative;
        top: 2px;
        left: 145px;
    }
    .deritem{
        font-size:30px;
        flex: 1;
        color:rgba(255,255,255,1);
        line-height:70px;
        border-bottom-width: 1px;
        border-bottom-color: rgba(255,255,255,0.4);
        border-bottom-style: solid;
    }
    .coupan{
        height: 176px;
        background-color: #F7F8FA;
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
    .time-box1{
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
    .edit{
        text-align: center;
        width:280px;
        height:68px;
        line-height: 68px;
        background-color:#FF847B;
        border-radius: 4px ;
        font-size:28px;
        color: #ffffff;
    }
</style>
