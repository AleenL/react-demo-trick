<template>
    <div>
        <div class="content">
            <text class="title">账号登录</text>
            <div class="logintype">
                <text class="type1" :class="[checkIndex===0?'active':'']" @click="staffLogin">员工登录</text>
                <text class="type1" :class="[checkIndex===1?'active':'']" @click="businessLogin">商家登录</text>
            </div>
            <div class="cellbox" v-if="checkIndex===0">
                <my-cell title="门店编码"
                         :cellStyle="cellStyle"
                         :has-arrow="false"
                         :has-top-border="false"
                         :has-bottom-border="false"
                >
                    <input placeholder="请输入门店编码" class="inputs" v-model='merchantCode'/>
                </my-cell>
                <my-cell title="用户名" class="cell"
                         :cellStyle="cellStyle"
                         :has-arrow="false"
                         :has-top-border="false"
                         :has-bottom-border="false"
                >
                    <input placeholder="请输入用户名" class="inputs " v-model='loginName'/>
                </my-cell>
                <my-cell title="输入密码"
                         :cellStyle="cellStyle"
                         :has-arrow="false"
                         :has-top-border="false"
                         :has-bottom-border="false"
                >
                    <input placeholder="请输入密码" type="password" class="inputs" v-model='password'/>
                </my-cell>
            </div>

            <div class="cellbox" v-if="checkIndex===1">
                <my-cell title="手机号码"
                         :cellStyle="cellStyle"
                         :has-arrow="false"
                         :has-top-border="false"
                         :has-bottom-border="false"
                >
                    <input type="tel" placeholder="请输入手机号" class="inputs " v-model='loginphone'/>
                </my-cell>
                <my-cell title="输入密码"
                         :cellStyle="cellStyle"
                         :has-arrow="false"
                         :has-top-border="false"
                         :has-bottom-border="false"
                >
                    <input placeholder="请输入密码" type="password" class="inputs" v-model='businesspwd'/>
                </my-cell>
            </div>

            <div class="btnbox">
                <text class="btn" @click="shopLogin">登陆</text>
            </div>
        </div>
    </div>
</template>
<style scoped >
    .content{
        flex: 1;
        width: 750px;
        background-color: #FFFFFF;
    }
    .title{
        font-size:44px;
        color:rgba(18,28,50,1);
        line-height:150px;
        margin-bottom: 60px;
        text-align: center;
        background-color: #ffffff;
    }
    .logintype{
        flex-direction: row;
        color: #121C32;
        background-color: #ffffff;
        text-align: center;
        border-bottom-color: #eeeeee;
        border-bottom-style: solid;
        border-bottom-width: 1px;
    }
    .active{
        color: #FF7570;
        border-bottom-color: #FF7570;
        border-bottom-style: solid;
        border-bottom-width: 6px;
    }
    .type1{
        line-height: 80px;
        font-size: 28px;
        flex: 1;
        text-align: center;
    }
    .cellbox{
        padding-left: 32px;
    }
    .cell{
        /*height: 90px;*/
        /*line-height: 90px;*/
        padding-left: 0px;
        border-bottom-width: 1px;
        border-bottom-style: solid;
        border-bottom-color: #eeeeee;
    }
    .inputs{
        text-align: right;
        width: 400px;
        height: 40px;
        line-height: 40px;
        outline: none;
        font-size:28px;
    }
    .btnbox{
        padding: 0px 32px;
        margin-top: 150px;
        height: 80px;
    }
    .btn{
        background-color: rgba(255,111,111,1);
        height: 80px;
        line-height: 80px;
        border-radius: 8px ;
        font-size: 26px;  color: #FFFFFF;  letter-spacing: 3px;text-align: center;
    }
</style>
<script>
import { WxcButton, WxcResult, WxcMinibar, WxcCell } from 'weex-ui'
import { employeeLogin, sellerLogin } from '../services/login'

export default {
  components: { WxcButton, WxcResult, WxcMinibar, MyCell: WxcCell },
  data () {
    return {
      merchantCode: '201826',
      loginName: 'test',
      password: 'test',
      loginphone: '13761468669',
      businesspwd: '111111',
      cellStyle: {
        borderBottomWidth: '1px',
        borderBottomColor: '#eeeeee',
        paddingLeft: 0
      },
      checkIndex: 0
    }
  },
  created () {
  },
  methods: {
    wxcCellClicked () {
      this.isShow = true
    },
    shopLogin () {
      var self = this
      if (self.checkIndex === 0) {
        if (!self.merchantCode) {
          this.$notice.toast({
            message: '请输入门店编码',
            duration: 1
          })
          return false
        }
        if (!self.loginName) {
          this.$notice.toast({
            message: '请输入用户名!',
            duration: 1
          })
          return false
        }
        if (!self.password) {
          this.$notice.toast({
            message: '请输入密码',
            duration: 1
          })
          return false
        }
        employeeLogin({merchants_code: self.merchantCode, login_name: self.loginName, password: self.password}, (data) => {
          this.$notice.toast({
            message: '登陆成功',
            duration: 1
          })
          this.$storage.set('role_info', data.data)
          this.$storage.set('shop_id', data.data.shop_id)
          this.$storage.set('authToken', data.authToken)
          this.$storage.set('business_code', data.data.business_code)
          this.$router.setHomePage('/pages/youdianSeller/main.js')
            setTimeout(() => {
              this.$router.open({
                  name: 'main',
                  gesBack: false
              })
          }, 1000)
        })
      }else if (self.checkIndex === 1) {
        if (!self.loginphone) {
          this.$notice.toast({
            message: '请输入电话号码!',
            duration: 1
          })
          return false
        }
        var patt1 = new RegExp(/^(((13[0-9]{1})|(14[0-9]{1})|(15[0-9]{1})|(17[0-9]{1})|(18[0-9]{1}))+\d{8})$/)
        if (!patt1.test(self.loginphone)) {
         this.$notice.toast({
            message: '请填写正确的手机号!',
            duration: 1
          })
          return false
        }
        if (!self.businesspwd) {
          this.$notice.toast({
            message: '请输入密码',
            duration: 1
          })
          return false
        }
        sellerLogin({mobile: self.loginphone, password: self.businesspwd}, (data) => {
          this.$notice.toast({
            message: '登陆成功',
            duration: 1
          })
          this.$storage.set('role_info', data.data)
          this.$storage.set('authToken', data.authToken)
          this.$storage.set('business_code', data.data.business_code)
          if (data.data.seller_id == ''){
            setTimeout(() => {
              this.$router.open({
                  name: 'regist.merchantInfoForm'
              })
            }, 1000)
          } else {
            setTimeout(() => {
              this.$router.setHomePage('/pages/youdianSeller/storeList/index.js')
              this.$router.open({
                  name: 'storeList',
                  canBack: false
              })
            }, 1000)
          }

        })
      }
    },
    staffLogin () {
      this.checkIndex = 0
    },
    businessLogin () {
      this.checkIndex = 1
    },
    setMerchantsCode (e) {
      this.merchants_code = e.value
    },
    setLoginName (e) {
      this.login_name = e.value
    },
    setPassword (e) {
      this.password = e.value
    }
  }
}
</script>
