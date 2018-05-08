<template>
    <div>
        <div class="wrapper">
            <text class="title">完善账户信息</text>
            <div class="cellbox">
                <wxc-cell title="输入密码" class="cell"
                          :cell-style="cellStyleObj"
                          :has-arrow="false"
                          :has-top-border="false"
                          :has-bottom-border="false"
                >
                    <input placeholder="请输入密码" class="inputs" type="password" v-model='spwd'/>
                </wxc-cell>

                <wxc-cell title="确认密码" class="cell"
                          :cell-style="cellStyleObj"
                          :has-arrow="false"
                          :has-top-border="false"
                          :has-bottom-border="false"
                >
                    <input placeholder="请再次输入密码" type="password" class="inputs" v-model='respwd'/>
                </wxc-cell>
            </div>

            <div class="btnbox">
                <text class="btn" @click="goInfo">注册</text>
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
        padding-left: 32px;
        box-sizing: border-box;
    }
    .cell{
        padding-left: 0px !important;
        border-bottom-style: solid;
        border-bottom-color: #ececec;
        border-bottom-width: 1px;

    }
    .inputs{
        flex: 1;
        text-align: right;
        width: 600px;
        height: 70px;
        line-height: 70px;
        outline: none;
        font-size:28px;
    }
    .btnbox{
        padding: 0px 32px;
        margin-top: 150px;
        height: 80px;
    }
    .btn{
        background-color: #FF6F6F;
        height: 80px;
        line-height: 80px;
        border-radius: 8px ;
        font-size: 26px;  color: #FFFFFF;  letter-spacing: 3px;text-align: center;
    }

</style>
<script>
import { WxcButton, WxcResult, WxcMinibar, WxcCell } from 'weex-ui'
import { registerSeller } from '../services/login'

export default {
  components: { WxcButton, WxcResult, WxcMinibar, WxcCell },
  data () {
    return {
      phone: '',
      spwd: '',
      respwd: '',
      cellStyleObj:{paddingLeft:'0',height:'100px',paddingRight: '32px'}

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
          console.log(params)
          this.phone = params.mobile
      })
  },
  methods: {
    wxcCellClicked () {
      this.isShow = true
    },
    goInfo () {
      if (!this.spwd) {
        this.$notice.toast({
          message: '请填写密码!',
          duration: 1
        })
        return false
      }
      if (this.spwd !== this.respwd) {
        this.$notice.toast({
          message: '两次密码输入不一致!',
          duration: 1
        })
        return false
      }
      registerSeller({mobile: this.phone, password: this.spwd, repassword: this.respwd}, (data) => {
        this.$notice.toast({
          message: '注册成功！',
          duration: 1
        })
        setTimeout(() => {
          this.$router.open({
            name: 'regist.merchantInfoForm'
          })
        }, 1000)
      })
    }
  }
}
</script>
