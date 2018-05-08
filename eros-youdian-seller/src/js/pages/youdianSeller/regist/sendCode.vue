<template>
    <div>
        <div class="wrapper">
            <text class="title">输入验证码</text>
            <text class="tis">已发送4位数字验证码至</text>
            <text class="phone">{{phone}}</text>
            <div class="passContainer">
                <div class="code">
                    <text class="pwd">{{inputpwd[0] || ''}}</text>
                    <text class="pwd">{{inputpwd[1] || ''}}</text>
                    <text class="pwd">{{inputpwd[2] || ''}}</text>
                    <text class="pwd">{{inputpwd[3] || ''}}</text>
                </div>
                <input type="tel" maxlength="4" class="in_pwd" style="tint-color: rgba(255, 255, 255, 0);" @input="codeChange" :autofocus="true" />
            </div>
            <div class="btnbox">
                <text class="btn" @click="goInfo">确定</text>
            </div>
            <div>
                <text v-if="show == 1" class="resend" @click="resend">重新发送</text>
                <text v-else class="resend">{{count}} s 后可重新发送</text>
            </div>
        </div>
    </div>
</template>
<style scoped >
    .code{
        flex-direction: row;
        margin-top: 20px
    }
    .wrapper{
        flex: 1;
        background-color: #ffffff;
    }
    .title{
        font-size:44px;
        color:rgba(18,28,50,1);
        line-height:150px;
        text-align: center;
    }
    .tis{
        font-size: 24px;
        color: #5D667A;
        text-align: center;
    }
    .phone{
        font-size: 32px;
        color: #121C32;
        margin-bottom: 40px;
        text-align: center;
    }
    .passContainer {
        width: 750px;
        align-items: center;
        justify-content: center;
        /*flex-direction: row;*/
    }
    .in_pwd{
        line-height: 100px;
        position: absolute;
        left: 0;
        right: 0;
        bottom: 0;
        top: 0;
        color: rgba(255, 255, 255, 0);
        /*opacity: 0;*/
    }
    .code{
        width: 500px;
    }
    .pwd{
        flex: 1;
        width: 80px;
        height: 80px;
        line-height: 80px;
        margin: 20px;
        padding-left: 10px;
        padding-right: 10px;
        outline: none;
        font-size: 40px;
        text-align: center;
        border-bottom-color: #ececec;
        border-bottom-style: solid;
        border-bottom-width: 4px;
    }
    .btnbox{
        padding-left: 32px;
        padding-right: 32px;
        margin-top: 100px;
        height: 80px;
    }
    .btn{
        flex: 1;
        background-color:rgba(255,111,111,0.9);
        height: 80px;
        line-height: 80px;
        border-radius: 8px ;
        font-size: 26px;
        color: #FFFFFF;
        letter-spacing: 3px;
        text-align: center;
    }
    .resend{
        font-size: 28px;
        color: #F77F4F;
        flex: 1;
        margin-top: 20px;
        line-height: 50px;
        text-align: center;
    }

</style>
<script>
import { WxcCell, WxcButton, WxcResult, WxcMinibar } from 'weex-ui'
import { employeeVerifyCode, userSendcode } from '../services/login'

export default {
  components: { WxcCell, WxcButton, WxcResult, WxcMinibar },
  data () {
    return {
      phone: '',
      inputpwd: '',
      pwd1: '',
      pwd2: '',
      pwd3: '',
      pwd4: '',
      show: 1,
      count: '',
      timer: null
    }
  },
  computed: {
    getpwd1: function () {
      if (this.inputpwd.length > 0) {
        return this.inputpwd.substring(0, 1)
      }
    },
    getpwd2: function () {
      if (this.inputpwd.length > 1) {
        return this.inputpwd.substring(1, 2)
      }
    },
    getpwd3: function () {
      if (this.inputpwd.length > 2) {
        return this.inputpwd.substring(2, 3)
      }
    },
    getpwd4: function () {
      if (this.inputpwd.length > 3) {
        return this.inputpwd.substring(3, 4)
      }
    }
  },
  created () {
    //设置导航条中间区域
    this.$navigator.setCenterItem({
      text: '',                  // 展示的文字 (和图片 二选一)
      textColor: '#666',                      // 文字颜色 (默认为白色)
      fontSize: '26',                         // 字号（默认32px）
      fontWeight: 'normal',                   // 是否加粗（默认不加粗）
    }, () => {
          // 点击回调
    })
    this.$router.getParams().then(params => {
        this.phone = params.mobile
    })
  },
  methods: {
      codeChange (e) {
          this.inputpwd = e.value
      },
    wxcCellClicked () {
      this.isShow = true
    },
    goInfo () {
      if (!this.inputpwd) {
        this.$notice.toast({
          message: '请填写验证码!',
          duration: 1
        })
      } else {
        employeeVerifyCode({mobile: this.phone, code: this.inputpwd}, (data) => {
          this.$notice.toast({
            message: '验证码填写成功!',
            duration: 1
          })
          setTimeout(() => {
            this.$router.open({
                name: 'regist.accountInfoForm',
                params: {
                    mobile: this.phone
                }
            })
          }, 1000)
        })
      }
    },
    resend () {
        const TIME_COUNT = 60
        this.show = 2
        if (!this.timer) {
            userSendcode({mobile: this.phone}, (data) => {
                this.count = TIME_COUNT
                this.$notice.toast({
                    message: '验证码发送成功!',
                    duration: 1
                })
                this.timer = setInterval(() => {
                    if (this.count > 0 && this.count <= TIME_COUNT) {
                        this.show = 2
                        this.count--
                    } else {
                        this.show = 1
                        clearInterval(this.timer)
                        this.timer = null
                    }
                }, 1000)
            })
        }
    }
  }
}
</script>
