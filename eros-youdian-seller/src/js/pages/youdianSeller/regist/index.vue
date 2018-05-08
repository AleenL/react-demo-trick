<template>
    <div>
        <div class="wrapper">
            <text class="title">输入手机号</text>
            <div class="cellbox">
                <wxc-cell title="手机号"
                          :has-arrow="false"
                          :has-top-border="false"
                          :has-bottom-border="true"
                          :cell-style="cellStyle"
                >
                    <input placeholder="请输入手机号" type="tel" class="inputs" maxlength="11" oninput="if(value.length>11)value=value.slice(0,11)" @input="oninput"/>
                </wxc-cell>
            </div>

            <div class="btnbox">
                <text class="btn" @click="goCode">确定</text>
            </div>
        </div>
    </div>
</template>
<style scoped >
    .wrapper{
        flex: 1;
        background-color: #ffffff;
    }
    .title{
        font-size:44px;
        color:rgba(18,28,50,1);
        line-height:150px;
        margin-bottom: 60px;
        text-align: center;
    }
    .cellbox{
        padding-left: 24px;
    }
    .inputs{
        flex: 1;
        text-align: right;
        width: 600px;
        height: 80px;
        line-height: 80px;
        outline: none;
        font-size:28px;
    }
    .btnbox{
        padding-left: 32px;
        padding-right: 32px;
        margin-top: 150px;
        height: 80px;
    }
    .btn{
        flex: 1;
        background-color: #FF6F6F;
        height: 80px;
        line-height: 80px;
        border-radius: 8px ;
        font-size: 26px;
        color: #ffffff;
        letter-spacing: 3px;
        text-align: center;
    }

</style>
<script>
import { WxcButton, WxcResult, WxcMinibar, WxcCell } from 'weex-ui'
import { userSendcode } from '../services/login'

export default {
  components: { WxcCell, WxcButton, WxcResult, WxcMinibar },
  data () {
    return {
      mobile: '',
      show: true,
      cellStyle: {
        paddingLeft: 0
      },
      num: 1
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
  },
  methods: {
    oninput (e){
        this.mobile = e.value
    },
    goCode (val) {
      if (!this.mobile) {
        this.$notice.toast({
          message: '请填写手机号!',
          duration: 1
        })
        return false
      }
      var patt1 = new RegExp(/^(((13[0-9]{1})|(14[0-9]{1})|(15[0-9]{1})|(17[0-9]{1})|(18[0-9]{1}))+\d{8})$/)
        // /^[1][3,4,5,7,8][0-9]{9}$/
      if (!patt1.test(this.mobile)) {
            this.$notice.toast({
                message: '请填写正确的手机号!',
                duration: 1
            })
            return false
      }
      if(this.num == 1) {
          this.num = 2
          setTimeout(() => {
              this.num = 1
              userSendcode({mobile: this.mobile}, (data) => {
                  this.$notice.toast({
                      message: '验证码发送成功!',
                      duration: 1
                  })
                  this.$router.open({
                      name: 'regist.sendCode',
                      params: {
                          mobile: this.mobile
                      }
                  })
              })
          }, 1000)
      }
    }
  }
}
</script>
