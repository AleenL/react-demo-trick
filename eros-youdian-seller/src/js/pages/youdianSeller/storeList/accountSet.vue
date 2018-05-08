<template>
  <div class="shopset">
    <div class="setbox">
      <wxc-cell :has-arrow="true"
                :has-top-border="false"
                @wxcCellClicked="setAccount"
                :cell-style="cellStyle"
                label="优点账户"
                :auto-accessible="false">
        <text slot="title" class="inputs">{{sellerInfo.mobile}}</text>
      </wxc-cell>
        <wxc-cell :has-arrow="true"
                  :has-top-border="false"
                  @wxcCellClicked="setAccountName"
                  :cell-style="cellStyle"
                  label="公司名称"
                  :auto-accessible="false">
            <text slot="title" class="inputs">{{sellerInfo.seller_name}}</text>
        </wxc-cell>
        <wxc-cell :has-arrow="true"
                  :has-top-border="false"
                  @wxcCellClicked="setAddress"
                  :cell-style="cellStyle"
                  label="公司地址"
                  :auto-accessible="false">
            <text slot="title" class="inputs">{{sellerInfo.seller_address}}</text>
        </wxc-cell>
    </div>
      <div class="login_out" @click="logout">
          <text class="login_out_text">退出登录</text>
      </div>
  </div>
</template>

<script>
import { WxcMinibar, WxcCell } from 'weex-ui'
import { getSellerInfo, improveSellerInfo } from '../services/login'

export default {
  components: { WxcMinibar, WxcCell },
  data () {
    return {
    sellerInfo: '',
      cellStyle: {
        paddingLeft: 0,
      }
    }
  },
  created () {
      // this.$navigator.setRightItem({
      //     text: '保存',                               // 展示的文字 (和图片 二选一)
      //     textColor: '#FF847B',                          // 文字颜色 (默认为白色)
      //     fontSize: '32px',                         // 字号（默认32px）
      //     fontWeight: 'bold',                   // 是否加粗（默认不加粗）
      //     image: ''                             // 展示的图片url (和文字 二选一，文字优先级更高)
      // }, () => {
      //     // 点击回调
      //     console.log("您点击了导航条右侧区域。")
      // })
      this.getShop()
      this.$event.on('locationInfo', params => {
          let loca = params.location.location.split(',')
          this.sellerInfo.province = params.location.pcode
          this.sellerInfo.city = params.location.citycode
          this.sellerInfo.county = params.location.adcode
          this.sellerInfo.lng = loca[0]
          this.sellerInfo.lat = loca[1]
          this.sellerInfo.seller_address = params.location.address
          this.editSeller()
      })
      this.$event.on('sellerNameEdit', params => {
          this.sellerInfo.seller_name = params.seller_name
          this.editSeller()
      })
  },
  methods: {
    getShop () {
      getSellerInfo({ }, (data) =>{
          this.sellerInfo = data.data
      })
    },
    editSeller () {
        improveSellerInfo(this.sellerInfo, (data) => {
            this.$notice.toast({
                message: '修改信息成功！',
                duration: 1
            })
        })
    },
    setAccount () {
      this.$router.open({
        name: 'storeList.accountEdit',
        params: {
          mobile: this.sellerInfo.mobile
        }
      })
    },
      setAccountName () {
      this.$router.open({
        name: 'storeList.accountNameEdit',
        params: {
            name: this.sellerInfo.seller_name
        }
      })
    },
    setAddress () {
      this.$router.open({
        name: 'chooseAddress'
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
    outline: none;
  }
  .login_out{
      width:686px;
      height:80px;
      border-radius: 8px;
      justify-content: center;
      align-items: center;
      margin-top: 100px;
      margin-right: 32px;
      margin-bottom: 0px;
      margin-left: 32px;
      background-image: linear-gradient(-177deg, rgb(255, 156, 121), rgb(255, 111, 111));
  }
  .login_out_text{
      font-size:32px;
      color:#fff;
  }
</style>
