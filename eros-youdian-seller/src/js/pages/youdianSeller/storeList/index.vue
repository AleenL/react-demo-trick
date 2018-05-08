<template>
  <div class="wrapper">
    <div :style="navH"></div>
    <wxc-minibar title="" left-button="" background-color="#fff">
      <text slot="right" @click="createdStore">创建店铺</text>
    </wxc-minibar>
    <div class="shopinfo">
          <div class="nameaddress" @click="goset">
              <text class="shopname">{{sellerInfo.seller_name}}</text>
              <text class="shopaddress">{{sellerInfo.seller_address}}</text>
          </div>
          <div class="shopicon"><text class="iconfont" style="line-height: 90px;color: #b6b6b6;">&#xe6d7;</text></div>
      </div>
    <list v-if="shoplist.length > 0 && isEmpty">
      <cell class="shoplist">
        <text class="title" @click="test">我的店铺</text>
        <div class="shoplistinfo" v-for="(shops, index) in shoplist" :key="index" @click="goinfo(index)">
          <image class="shopimg" :src="shops.shop_logo" ></image>
          <div class="shoplistna">
            <text class="shoplistname">{{shops.shop_name}}</text>
            <text class="shoplistaddress">{{shops.address}}{{shops.house_number}}</text>
          </div>
        </div>
      </cell>
    </list>
    <div class="empty" v-if="isEmpty && shoplist.length == 0">
          <div class="empty-div">
              <image class="empty-img" src="bmlocal://assets/empty-store.png"></image>
              <text class="empty-text">还没有店铺哦，去创建一个吧~</text>
          </div>
    </div>
    <wxc-loading :show="isShow" type="default" :need-mask="true" :loading-text="lodingTest"></wxc-loading>
  </div>
</template>

<script>
import { WxcMinibar, WxcLoading, WxcPartLoading } from 'weex-ui'
import { getSellerShop, getSellerInfo } from '../services/login'
import util from '../utils/util'

export default {
  components: { WxcMinibar, WxcLoading, WxcPartLoading },
  data () {
    return {
      sellerInfo: '',
      lodingTest: '',
      isShow: false,
      isEmpty: false,
      shoplist: []
    }
  },
  beforeCreate (){
    util.initIconFont()
  },
  created () {
    this.isShow = true
    this.getShop()
    this.getshopInfo()
    const barHeight = weex.config.env.statusBarHeight ? weex.config.env.statusBarHeight : 0
    this.navH = {height: barHeight + 'px', backgroundColor: '#ffffff'}
  },
  eros: {
    beforeBackAppear () {
        this.getShop()
        this.getshopInfo()
    }
  },
  methods: {
    getShop () {
      getSellerInfo({ }, (data) =>{
        this.sellerInfo = data.data
      })
    },
    getshopInfo () {
      getSellerShop({ }, (data) =>{
          this.shoplist = data.data
          setTimeout(() => {
              this.isShow = false
              this.isEmpty = true
          }, 300)
      })
    },
    goset () {
      this.$router.open({
        name: 'storeList.accountSet',
        backCallback: () => {
            this.getShop()
            this.$router.back()
        }
      })
    },
    goinfo (index) {
      let data = this.shoplist[index]
      this.$storage.setSync('shop_id', data._id)
      this.lodingTest = '进入店铺中'
      this.isShow = true
      setTimeout(() => {
        this.isShow = false
        this.$router.open({
            name: 'main',
            backCallback: () => {
                this.getshopInfo()
                this.$router.back()
            }
        })
      }, 500)
    },
    createdStore () {
        this.$router.open({
            name: 'storeList.createStore'
        })
    },
    test () {
      this.$storage.removeAll()
      this.$router.setHomePage('/pages/youdianSeller/index.js')
    }
  }
}
</script>

<style scoped>
    .wrapper{
        background-color: #F6F6F6
    }
    .iconfont{
        font-family: iconfont;
    }
  .shopinfo{
    margin-top: 20px;
    background-color: white;
    flex-direction: row;
    padding: 24px;
  }
  .nameaddress{
    flex: 1;
  }
  .shopname{
    font-size:32px;
    color:#121C32;
    font-weight: bold;
    line-height:54px;
  }
  .shopaddress{
    font-size:28px;
    color:#6B6B6B;
    line-height:50px;
  }
  .shopicon{
    line-height: 100px;
  }
  .shoplist{
    padding: 24px;
    margin-top: 20px;
    background-color: white;
  }
  .title{
    line-height: 100px;
    font-size:32px;
    color:rgba(18,28,50,1);
  }
  .shoplistinfo{
    flex-direction: row;
    padding-top: 24px;
    padding-bottom: 14px;
    border-top-color: #F1F1F1;
    border-top-style: solid;
    border-top-width: 1px;
  }
  .shopimg{
    width: 80px;
    height: 80px;
    border-radius: 6px;
  }
  .shoplistna{
    flex: 1;
    padding-left: 30px;
  }
  .shoplistname{
    font-size:28px;
    color:rgba(51,51,51,1);
    line-height:40px;
  }
  .shoplistaddress{
    font-size:24px;
    color:rgba(91,91,91,1);
    line-height:40px;
  }
    .overlayLoading{
        position: absolute;
        top: 50px;
        left: 0;
        bottom: 0;
        right: 0;
        justify-content: center;
        align-content: center;
        align-items: center;
        width: 750px;
        background-color: rgba(255, 255, 255, 0.1);
    }
    .empty{
        width: 750px;
        padding-top: 280px;
        text-align: center;
        flex-direction: row;
        justify-content: center;

    }
    .empty-div{
        flex-direction: column;
        align-items: center;
    }
    .empty-img{
        width: 210px;
        height: 174px;
    }
    .empty-text{
        font-size:28px;
        color: #4A4A4A;
        line-height: 40px;
        margin-top: 40px;
    }
</style>
