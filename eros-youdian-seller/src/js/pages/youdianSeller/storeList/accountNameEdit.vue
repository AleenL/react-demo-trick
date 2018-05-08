<template>
  <div class="updateshopname">
    <div class="setbox">
      <wxc-cell title="公司名称"
                :has-arrow="false"
                :has-top-border="false"
                :auto-accessible="false">
          <input class="inputs" v-model="name" slot="value" placeholder="请输入公司名称" />
      </wxc-cell>
    </div>
    <div class="btnbox">
      <text class="btn" @click="keep">保存</text>
    </div>
  </div>
</template>

<script>
import { WxcMinibar, WxcCell} from 'weex-ui'

export default {
  components: { WxcMinibar, WxcCell },
  data () {
    return {
      name: ''
    }
  },
  created () {
      this.$router.getParams().then(resData => {
          this.name = resData.name
      })
  },
  methods: {
    keep () {
        if(this.name==''){
            this.$notice.toast({
                message: '请输入公司名称',
                duration: 1
            })
            return false
        }
        this.$event.emit('sellerNameEdit', {
            seller_name: this.name,
        })
        this.$router.back()
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
    width: 400px;
    color: #1C1C20;
    height: 40px;
    line-height: 40px;
    font-size: 28px;
    text-align: right;
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
