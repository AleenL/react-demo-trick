<template>
    <div>
        <div class="wrapper">
            <text class="title">完善商家信息</text>
            <div class="cellbox">
                <wxc-cell label="店铺名" class="cell"
                          :cell-style="{paddingLeft:'0',paddingRight: '30px'}"
                          :has-arrow="false"
                          :has-top-border="false"
                          :has-bottom-border="false"
                >
                    <input slot="value" placeholder="请输入店铺全称" class="inputs fontStyle" v-model="sellerInfo.seller_name" />
                </wxc-cell>
                <wxc-cell label="商家地址" class="cell"
                          :cell-style="{paddingLeft:'0',paddingRight: '30px'}"
                          :has-arrow="true"
                          :has-top-border="false"
                          :has-bottom-border="false"
                >
                    <text @click="goaddress" class="inputs fontStyle" :style="!sellerInfo.seller_address && {color: '#999'}">{{sellerInfo.seller_address || '请输入商家地址'}}</text>
                </wxc-cell>
                <wxc-cell label="" class="cell"
                          :cell-style="{paddingLeft:'0',paddingRight: '30px'}"
                          :has-arrow="false"
                          :has-top-border="false"
                          :has-bottom-border="false"
                >
                    <input placeholder="请输入详细地址" style="width: 600px" class="inputs fontStyle"  v-model="sellerInfo.house_number" />
                </wxc-cell>

            </div>

            <div class="btnbox">
                <text class="btn" @click="goInfo">确定</text>
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
        padding-left: 30px;
        box-sizing: border-box;
    }
    .cell{
        /*height: 90px;*/
        /*line-height: 90px;*/
        /*padding: 30px 0px;*/
        /*padding-left: 0!important;*/
        border-bottom-style: solid;
        border-bottom-color: #ececec;
        border-bottom-width: 1px;
        box-sizing: border-box;
    }
    .inputs{
        text-align: right;
        width: 400px;
        height: 70px;
        line-height: 70px;
        margin-left: 30px;
        outline: none;
    }
    .fontStyle{
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
import { WxcButton, WxcResult, WxcMinibar,WxcCell } from 'weex-ui'
import { improveSellerInfo } from '../services/login'

export default {
  components: { WxcButton, WxcResult, WxcMinibar,WxcCell },
  data () {
    return {
      sellerInfo: {
          province: '',
          city: '',
          county: '',
          seller_address: '',
      },
      address_str: '',
    }
  },
  created () {
      //设置导航条中间区域
    this.$navigator.setCenterItem({
      text: '',                  // 展示的文字 (和图片 二选一)
      textColor: '#666',                      // 文字颜色 (默认为白色)
      fontSize: '26',                         // 字号（默认32px）
      fontWeight: 'normal',                   // 是否加粗（默认不加粗）
    })
      // 地址
    this.$event.on('locationInfo', params => {
      let loca = params.location.location.split(',')
      this.sellerInfo.province = params.location.pcode
      this.sellerInfo.city = params.location.citycode
      this.sellerInfo.county = params.location.adcode
      this.sellerInfo.lng = loca[0]
      this.sellerInfo.lat = loca[1]
      this.sellerInfo.seller_address = params.location.address
    })
  },
  methods: {
    wxcCellClicked () {
      this.isShow = true
    },
    goInfo () {
      if (!this.sellerInfo.seller_name) {
        this.$notice.toast({
          message: '请输入店铺全称',
          duration: 1
        })
        return false
      }
      if (!this.sellerInfo.seller_address) {
        this.$notice.toast({
          message: '请选择地址',
          duration: 1
        })
        return false
      }
      if (!this.sellerInfo.house_number) {
        this.$notice.toast({
          message: '请填写详细地址',
          duration: 1
        })
        return false
      }
      improveSellerInfo(this.sellerInfo, (data) => {
          this.$notice.toast({
            message: '完善店铺信息成功！',
            duration: 1
          })
          this.$router.setHomePage('/pages/youdianSeller/storeList/index.js')
          setTimeout(() => {
            this.$router.open({
              title: ' ',
              name: 'storeList',
              gesBack: false
            })
          }, 1000)
      })
    },
    goaddress () {
      this.$router.open({
        name: 'chooseAddress'
      })
    }
  }
}
</script>
