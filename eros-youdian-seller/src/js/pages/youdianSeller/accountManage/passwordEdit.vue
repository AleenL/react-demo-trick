<template>
  <div class="updateshopname">
    <div class="setbox">
      <wxc-cell title="原密码"
                :cell-style="cellStyle"
                :has-top-border="false"
                :auto-accessible="false">
          <input class="inputs" v-model="old_password" type="password" placeholder="请输入原密码" />
      </wxc-cell>
      <wxc-cell title="新密码"
                :cell-style="cellStyle"
                :has-top-border="false"
                :auto-accessible="false">
          <input class="inputs" v-model="new_password" type="password" placeholder="请输入新密码" />
      </wxc-cell>
      <wxc-cell title="确认密码"
                :cell-style="cellStyle"
                :has-top-border="false"
                :has-bottom-border="false"
                :auto-accessible="false">
           <input class="inputs" v-model="re_password" type="password" placeholder="请确认新密码" />
      </wxc-cell>
    </div>
    <div class="btnbox">
      <text class="btn" @click="keep">完成</text>
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
      old_password: '',
      new_password: '',
      re_password: '',
      cellStyle: {
            fontSize: '28px',
            fontColor: '#121C32'
      },
    }
  },
  created () {

  },
  methods: {
    keep () {
      if (!this.old_password) {
        modal.toast({
          message: '请输入原密码',
          duration: 1
        })
        return false
      }
      if (!this.new_password) {
        modal.toast({
          message: '请输入新密码',
          duration: 1
        })
        return false
      }
      if (this.new_password !== this.re_password) {
        this.$notice.toast({
            message: '两次密码输入不一致!',
            duration: 1
        })
        return false
      }
     editPassword({
         old_password: this.old_password,
         new_password: this.new_password,
         re_password: this.re_password
     }, (data) => {
         this.$notice.toast({
             message: '修改成功!',
             duration: 1
         })
         this.$storage.removeAll().then(data=> {
             this.$router.open({
                 name: 'signIn'
             })
         })
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
    width: 400px;
    padding-right: 10px;
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
