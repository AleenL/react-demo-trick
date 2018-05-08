<template>
  <div class="updateshopname">
    <div class="setbox">
        <wxc-cell
                  :has-top-border="false"
                  title="优点账户"
                  :auto-accessible="false">
            <text slot="value" class="inputs">{{mobile}}</text>
        </wxc-cell>
      <wxc-cell title="原密码"
                :has-top-border="false"
                :auto-accessible="false">
          <input class="inputs" slot="value" v-model="oldpwd" type="password" placeholder="请输入原密码" />
      </wxc-cell>
      <wxc-cell title="新密码"
                :has-top-border="false"
                :auto-accessible="false">
          <input class="inputs" v-model="newpwd" slot="value" type="password" placeholder="请输入新密码" />

      </wxc-cell>
      <wxc-cell title="确认密码"
                :has-top-border="false"
                :auto-accessible="false">
          <input class="inputs" v-model="oknewpwd" slot="value" type="password" placeholder="请确认新密码" />
      </wxc-cell>
    </div>
    <div class="btnbox">
      <text class="btn" @click="keep">保存</text>
    </div>
  </div>
</template>

<script>
import { WxcMinibar, WxcCell} from 'weex-ui'
import { editPassword } from  '../services/login'
var modal = weex.requireModule('modal')

export default {
  components: { WxcMinibar, WxcCell },
  data () {
    return {
      mobile: '',
      oldpwd: '',
      newpwd: '',
      oknewpwd: '',
    }
  },
  created () {
      this.$router.getParams().then(resData => {
          this.mobile = resData.mobile
      })
  },
  methods: {
    keep () {
      if (!this.oldpwd) {
        modal.toast({
          message: '请输入原密码',
          duration: 1
        })
        return false
      }
      if (!this.newpwd) {
        modal.toast({
          message: '请输入新密码',
          duration: 1
        })
        return false
      }
      if (!this.oknewpwd) {
        modal.toast({
            message: '请输入确认密码',
            duration: 1
        })
        return false
      }
      if (this.newpwd !== this.oknewpwd) {
        this.$notice.toast({
            message: '两次密码输入不一致!',
            duration: 1
        })
        return false
      }
     editPassword({
         old_password: this.oldpwd,
         new_password: this.newpwd,
         re_password: this.oknewpwd
     }, (data) => {
         this.$notice.toast({
             message: '修改成功!',
             duration: 1
         })
         this.$router.back()
     })
    }
  }
}
</script>

<style scoped>
  .setbox{
    background-color: white;
    margin-top: 20px;
  }
  .inputs{
    outline: none;
    text-align: right;
    margin-right: 10px;
    width: 400px;
    height: 40px;
    line-height: 40px;
    font-size: 28px;
  }
  .btnbox{
    padding: 32px;
    margin-top: 100px;
  }
  .btn{
    background-color: rgba(255,111,111,1);
    border-radius: 8px ;
    height: 80px;
    line-height: 80px;
    font-size: 32px;
    color: #FFFFFF;
    text-align: center;
  }
</style>
