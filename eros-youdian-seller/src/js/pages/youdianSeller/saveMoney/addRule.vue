<template>
    <div class="content">
        <!--<wxc-minibar title="添加储值" background-color="#ffffff">-->
            <!--<text slot="right" class="text-right" @click='addinfo'>保存</text>-->
        <!--</wxc-minibar>-->
        <div style="padding-left:32px;background-color: #ffffff">
            <wxc-cell label="充值金额" :cell-style="cellStyleObj">
                <input type="number" placeholder="请输入充值金额" v-model="need_amount_str" style="width: 300px;height: 80px; text-align: right;">
            </wxc-cell>
            <wxc-cell label="赠送金额" :cell-style="cellStyleObj">
                <input type="number" placeholder="请输入赠送金额" v-model="give_amount_str" style="height: 80px; width: 300px;text-align: right;">
            </wxc-cell>
            <wxc-cell label="赠送优惠券" :cell-style="cellStyleObj">
                <switch slot="value" :checked="checked" @change="onchange"></switch>
            </wxc-cell>
            <wxc-cell v-if="checked" label="赠送的优惠券" :has-arrow="true" @wxcCellClicked="senCoupan" :cell-style="cellStyleObj"></wxc-cell>
            <div v-if="coupon" style="padding: 20px;background-color: white">
                <div class="coupan fr ">
                    <div class="fr price-box">
                        <text class="cf fs20" style="margin-top:15px">￥</text>
                        <text class="price cf">{{coupan_price}}</text>
                    </div>
                    <div class="toprdios"></div>
                    <div class="bottomrdios"></div>
                    <div class="time-box1">
                        <text class="name c6">{{coupan_name}}</text>
                        <text class="time c6">{{coupan_needPrice}}</text>
                        <text class="time c6">{{coupan_time}}</text>
                    </div>
                </div>
            </div>
        </div>
        <!--<coupan :coupan="coupan"></coupan>-->
        <!--<foot text="添加更多储值规则" src="http://cdn.udian.me/addStoreRule.png" :fn="goadd"></foot>-->
    </div>
</template>

<script>
import { WxcMinibar, WxcCell } from 'weex-ui'
import { userAddRechargeRule, userGetRechargeRule } from '../services/user'

export default {
  components: {
    WxcMinibar,
    WxcCell,
  },
  data () {
    return {
      checked: false,
      need_amount_str: '',
      give_amount_str: '',
      is_give_coupon: 1,
      ru_id: '',
      coupon: '',
      coupan_price: 10,
      coupan_name: '优惠券名称',
      coupan_needPrice: 50,
      coupan_time: '2018.01.22',
      cellStyleObj:{paddingLeft:'0',height:'100px',paddingRight: '32px'}

    }
  },
  created () {
      this.$navigator.setRightItem({
          text: '保存',                             // 展示的文字 (和图片 二选一)
          textColor: '#FE5383',                    // 文字颜色 (默认为白色)
          fontSize: '32',                         // 字号（默认32px）
          fontWeight: 'normal',                   // 是否加粗（默认不加粗）
      }, () => {
          // 点击回调
          this.addinfo()
      })
      this.$event.on('getsendCoupan', params => {
          this.coupon = params.coupanid
          this.coupan_price = params.coupan_price,
          this.coupan_name = params.coupan_name,
          this.coupan_needPrice = params.coupan_needPrice,
          this.coupan_time = params.coupan_time
      })
      this.init()
  },
  methods: {
    senCoupan () {
      this.$router.open({
        name: 'couponManage.sendCoupan',
        params: {
          coupantype: true
        }
      })
    },
    addinfo () {
      var self = this
      if (!self.need_amount_str) {
        this.$notice.toast({
          message: '请输入充值金额',
          duration: 1
        })
      } else if (!self.give_amount_str) {
        this.$notice.toast({
          message: '请输入赠送金额',
          duration: 1
        })
      } else if (self.is_give_coupon === 2 && !self.coupon) {
        this.$notice.toast({
          message: '请选择赠送的优惠券',
          duration: 1
        })
      } else {
        userAddRechargeRule({
          shop_id: '59c1d8ab1d716136ba4474c3',
          need_amount: self.need_amount_str,
          give_amount: self.give_amount_str,
          is_give_coupon: self.is_give_coupon,
          give_coupon: self.coupon
        }, (data) => {
          console.log(data)
          this.$notice.toast({
              message: '添加成功',
              duration: 1
          })
            this.$event.emit('addlist',{

            })
            this.$router.back()
        })
      }
    },
    goadd () {
      this.$router.open({
        name: 'storeInfo'
      })
      // weexRouter.push('/store/storeInfo')
    },
    onchange (e) {
      console.log(e.value)
      var self = this
      self.checked = !self.checked
      if (self.checked) {
        self.is_give_coupon = 2
      } else {
        self.is_give_coupon = 1
      }
      console.log(self.is_give_coupon)
    }
  }
}
</script>

<style scoped>
    .content{
        background-color: #f2f2f2;
    }
    .text-right{
        font-size:32px;
        color: #FE5383;
    }
    input{
        outline: none;
        font-size: 28px;
    }
    .text-box{
        height: 68px;
        padding: 0 32px;
        flex-direction: row;
        align-items: center;
        justify-content: space-between;
    }
    .text-left{
        font-family: PingFangSC-Regular;
        font-size: 24px;
        color: #121C32;
        letter-spacing: -0.26px;
        height: 34px;
        line-height:  34px;
    }
    .text-right2{
        font-size:24px;
        color: #f79771;
    }
    .text-footer{
        line-height: 60px;
        color: #ff5582;
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
</style>
