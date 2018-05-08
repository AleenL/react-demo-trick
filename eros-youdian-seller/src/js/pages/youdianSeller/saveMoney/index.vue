<template>
    <div class="content">
        <!--<wxc-minibar title="储值列表" background-color="#ffffff">-->
            <!--&lt;!&ndash;<text slot="right" class="text-right" @click='addinfo'>保存</text>&ndash;&gt;-->
        <!--</wxc-minibar>-->
        <scroller style="margin-bottom: 100px">
            <div v-for='(rule, index) in rulelist' :key='index'>
                <div class="text-box">
                    <text class="text-left">规则{{index+1}}</text>
                    <text class="text-right2" @click="removerule(rule._id)">删除此规则</text>
                </div>
                <div style="background-color: white;">
                    <div style="padding-left:32px">
                        <wxc-cell label="充值金额" :cell-style="cellStyleObj">
                            <text style="width: 220px;text-align: right;">{{rule.need_amount_str}}</text>
                        </wxc-cell>
                        <wxc-cell label="赠送金额" :cell-style="cellStyleObj">
                            <text style="width: 220px;text-align: right;">{{rule.give_amount_str}}</text>
                        </wxc-cell>
                    </div>

                <!--<my-cell label="赠送优惠券">-->
                    <!--<image v-if="rule.is_give_coupon===2" class="checkimg" src="http://cdn.udian.me/switchchecked.png"></image>-->
                    <!--<image v-if="rule.is_give_coupon===1" class="checkimg" src="http://cdn.udian.me/switchnocheck.png"></image>-->
                <!--</my-cell>-->
                <div style="background-color: white" v-if="rule.is_give_coupon === 2">
                    <div style="padding-left:32px">
                        <wxc-cell label="赠送的优惠券" :has-arrow="false" :cell-style="cellStyleObj">
                            <text style="text-align: right;"></text>
                        </wxc-cell>
                    </div>

                    <div style="padding: 20px">
                        <div class="coupan fr " v-for="(coupan, index) in rule.give_coupons" :key="index">
                            <div class="fr price-box">
                                <text class="cf fs20" style="margin-top:15px">￥</text>
                                <text class="price cf">{{coupan.amount}}</text>
                            </div>
                            <div class="toprdios"></div>
                            <div class="bottomrdios"></div>
                            <div class="time-box1">
                                <text class="name c6">{{coupan.title}}</text>
                                <text class="time c6">{{coupan.use_attribute_str}}</text>
                                <text class="time c6">{{coupan.validity_time_str}}</text>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            </div>
            <!--<div v-if="rulelist.length > 0" style="flex-direction: row; justify-content: center;background-color: white;margin-bottom: 20px;padding: 20px">-->
                <!--<text class="edit" @click="addshow">添加优惠券</text>-->
            <!--</div>-->
            <div style="padding-bottom: 20px" v-if="isaddshow">
            <div class="text-box">
                    <text class="text-left">添加规则</text>
                    <text class="text-right2" @click="addinfo">保存</text>
                </div>
                <div style="padding-left:32px;background-color: #ffffff">
                    <wxc-cell label="充值金额" :cell-style="cellStyleObj">
                        <input type="number" placeholder="请输入充值金额" v-model="need_amount_str" style="width: 220px;height: 80px; text-align: right;">
                    </wxc-cell>
                    <wxc-cell label="赠送金额" :cell-style="cellStyleObj">
                        <input type="number" placeholder="请输入赠送金额" v-model="give_amount_str" style="height: 80px; width: 220px;text-align: right;">
                    </wxc-cell>
                    <wxc-cell label="赠送优惠券" :cell-style="cellStyleObj">
                        <switch slot="value" :checked="addchecked" @change="onchange"></switch>
                    </wxc-cell>
                    <wxc-cell v-if="addchecked" label="赠送的优惠券" :has-arrow="true" @wxcCellClicked="senCoupan"></wxc-cell>
                </div>
            </div>
        </scroller>
        <div class="footer">
            <div class="footer-item" @click="goadd">
                <image style="width:36px;height:36px" src="http://cdn.udian.me/addStoreRule.png"></image>
                <text class="text-desc">添加更多储值规则</text>
            </div>
        </div>
    </div>
</template>

<script>
import { WxcMinibar,WxcCell } from 'weex-ui'
import { userGetRechargeRules, userDeleteRechargeRule, userAddRechargeRule } from '../services/user'

export default {
  components: {
    WxcMinibar,
    WxcCell,
    coupan: require('./Coupan.vue'),
  },
  data () {
    return {
      rulelist: [],
      checked: true,
      coupan: {
        price: 10,
        name: '优惠券名称',
        needPrice: 50,
        timeStart: '2018.01.22',
        timeEnd: '2018.02.22',
        bt: true
      },
      isaddshow: false,
      addchecked: false,
      need_amount_str: '',
      give_amount_str: '',
      is_give_coupon: 1,
      ru_id: '',
      coupon: '3',
      cellStyleObj:{paddingLeft:'0',height:'100px',paddingRight: '32px'}
    }
  },
  created () {
    this.$event.on('getsendCoupan', params => {
      this.coupon = params.coupanid
    })
    this.$event.on('addlist', params => {
      this.$router.refresh()
    })
    this.getList()
  },
  methods: {
    getList () {
      userGetRechargeRules({}, (data) => {
        this.rulelist = data.data
      })
    },
    senCoupan () {
      this.$router.open({
          name: 'couponManage',
          params: {
              coupantype: true
          }
      })
    },
    removerule (id) {
      console.log(id)
      var self = this
      self.$notice.confirm({
        title: '',
        message: '是否删除此条储值信息',
        okTitle: '确认',
        cancelTitl: '取消',
        okCallback() {
            userDeleteRechargeRule({_id: id}, (data) => {
                Vue.prototype.$notice.toast({
                    message: '删除成功',
                })
                self.getList()
            })
        },
        cancelCallback() {}
      })
    },
    goadd () {
      this.$router.open({
        name: 'saveMoney.addRule'
      })
      // weexRouter.push('/store/addStorerule')
    },
    addshow () {
      this.isaddshow = !this.isaddshow
    },
    onchange (e) {
      console.log(e.value)
      var self = this
      self.addchecked = !self.addchecked
      if (self.addchecked) {
        self.is_give_coupon = 2
      } else {
        self.is_give_coupon = 1
      }
      console.log(self.is_give_coupon)
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
      } else if (self.is_give_coupon === 2 && !self.need_amount_str) {
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
          self.isaddshow = false
          self.need_amount_str = ''
          self.give_amount_str = ''
          self.is_give_coupon = 1
          this.getList()
        })
      }
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
    .cell-label-text{
        color: #121C32 !important;
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
    .checkimg{
        width: 92px;
        height: 56px;
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
