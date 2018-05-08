C<template>
    <div class="wrapper" style="background-color: #ffffff">
        <!--<image  class="imgbg" :style="ScreenHeight" src="./images/loginbg.png"></image>-->
        <image  class="imgbg" :style="ScreenHeight" src="bmlocal://assets/index_bg.png"></image>
        <image  class="img1" src="bmlocal://assets/index_title.png"></image>
        <image  class="img2" src="bmlocal://assets/index_bes.png"></image>
        <div class="btnbox">
            <text class="btn btnlogin" @click="goLogin">登录</text>
            <text class="btn btnregister" @click="goRegist">即刻入驻</text>
        </div>
    </div>
</template>
<style scoped >
    .wrapper{
        background-color: #ffffff;
    }
    .imgbg{
        width: 750px;
        position: fixed;
        top:0px;
        left:0px;
    }
    .img1{
        position: fixed;
        width: 508px;
        height: 90px;
        top: 180px;
        left: 120px;
    }
    .img2{
        position: fixed;
        width: 272px;
        height: 84px;
        top: 312px;
        left: 235px;
    }

    .btnbox{
        position: fixed;
        left: 0px;
        bottom: 115px;
        padding: 0px 76px;
        width: 750px;
    }
    .btn{
        flex: 1;
        height:80px;
        line-height: 80px;
        border-radius: 8px ;
        font-size: 26px;
        color: #FFFFFF;
        text-align: center;
        letter-spacing: 3px;
    }
    .btnlogin{
        border:1px solid rgba(225,225,225,0.7);
        background-color:rgba(255,255,255,0.2);
    }
    .btnregister{
        margin-top: 30px;
        background-color:rgba(255,111,111,1);
    }

</style>
<script>
import { WxcCell, WxcButton, WxcResult, WxcMinibar, Utils } from 'weex-ui'
import util from './utils/util'


export default {
    components: { WxcCell, WxcButton, WxcResult, WxcMinibar },
    data () {
        return {
            curHomeBackTriggerTimes: 1,
            maxHomeBackTriggerTimes: 3,
        }
    },
    created () {
        this.ScreenHeight = {height: Utils.env.getScreenHeight() + 'px'}
        util.initIconFont()
        //设置导航条中间区域
        this.$navigator.setCenterItem({
            text: '',                               // 展示的文字 (和图片 二选一)
            textColor: '#666',                          // 文字颜色 (默认为白色)
            fontSize: '32',                         // 字号（默认32px）
            fontWeight: 'normal',                   // 是否加粗（默认不加粗）
        }, () => {
            // 点击回调
        })
        this.$storage.removeAll()
        // 安卓自定义退出 app
        this.androidFinishApp()
    },
    methods: {
        wxcCellClicked() {
          this.isShow = true
        },
        goLogin() {
          this.$router.open({
            name: 'signIn'
          })
        },
        goRegist() {
          this.$router.open({
            name: 'regist'
          })
        },
        androidFinishApp () {
            const globalEvent = weex.requireModule('globalEvent')
            globalEvent.addEventListener('homeBack', options => {
                (this.curHomeBackTriggerTimes === this.maxHomeBackTriggerTimes) && this.$router.finish()
                this.curHomeBackTriggerTimes++
                this.$notice.toast({ message: `点击返回${this.maxHomeBackTriggerTimes}次之后，会关闭应用，当前点击第${this.curHomeBackTriggerTimes}次` })
            })
        }
    }
}
</script>
