<template>
  <div class="shopset">
    <div class="setbox">
        <wxc-cell title="门店编码"
                  :cell-style="cellStyle"
                  :has-top-border="false"
                  :auto-accessible="false">
            <text class="inputs" slot="value">{{info.merchant_code}}</text>
        </wxc-cell>
        <wxc-cell title="账号"
                  :cell-style="cellStyle"
                  :has-top-border="false"
                  :auto-accessible="false">
            <text class="inputs" slot="value">{{info.login_name}}</text>
        </wxc-cell>
        <wxc-cell title="修改密码"
                  :cell-style="cellStyle"
                  :has-arrow="true"
                  :has-top-border="false"
                  :has-bottom-border="false"
                  @wxcCellClicked="goEdit"
                  :auto-accessible="false">
        </wxc-cell>
    </div>
    <div class="btnbox">
        <text class="btn" @click="logout">退出登录</text>
    </div>
  </div>
</template>

<script>
import { WxcMinibar, WxcCell } from 'weex-ui'
import { employeeLogin } from '../services/login'

export default {
  components: { WxcMinibar, WxcCell },
  data () {
    return {
        info: {
            merchant_code: '',
            login_name: ''
        },
        cellStyle: {
            fontSize: '28px',
            fontColor: '#121C32'
        }
    }
  },
  created () {
      this.info = this.$storage.getSync('role_info')
  },
  methods: {
      goEdit () {
          this.$router.open({
            name: 'accountManage.passwordEdit'
          })
      },
      logout(){
          this.$storage.removeAll().then(data=> {
              this.$router.open({
                  name: 'index'
              })
          })
      }
  }
}
</script>

<style scoped>
  .shopset{
    /*background-color: #f2f2f2;*/
  }
  .setbox{
    background-color: white;
    padding-left: 24px;
    margin-top: 20px;
  }
  .inputs{
    color: #9B9B9B;
    font-size:28px;
    /*text-align: right;*/
    outline: none;
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
      font-size: 32px;
      color: #FFFFFF;
      letter-spacing: 3px;
      text-align: center;
  }
</style>
