<template>
  <div class="content">
    <div class="list">
      <ul class="list-ul">
        <li class="list-li">
          <div class="li-cell li-cell-log" @click="pickImg">
            <text class="text">店铺logo</text>
            <image :src="store.shop_logo ? (store.shop_logo + '!180compress') : 'bmlocal://assets/logo.png'" placeholder="bmlocal://assets/logo.png" class="store-logo" />
            <!--<image src="bmlocal://assets/logo.png" placeholder="bmlocal://assets/logo.png" class="store-logo" />-->
            <text class="iconfont arrow-icon arrow-icon-logo">&#xe6d7;</text>
          </div>
        </li>
        <li class="list-li">
          <div class="li-cell">
            <text class="text">店铺名称</text>
            <input type="text" class="input" placeholder="请输入店铺名称" v-model="store.shop_name">
          </div>
        </li>
        <li class="list-li">
          <div class="li-cell">
            <text class="text">店铺类型</text>
            <div class="radio" style="margin-right: 60px" @click="radio(1)">
              <text class="iconfont radio-img-active" v-if="store.type === 1">&#xe6f6;</text>
              <text class="iconfont radio-img" v-if="store.type === 2">&#xe6f5;</text>
              <text class="radio-text">零售</text></div>
            <div class="radio" @click="radio(2)">
                <text class="iconfont radio-img-active" v-if="store.type === 2">&#xe6f6;</text>
                <text class="iconfont radio-img" v-if="store.type === 1">&#xe6f5;</text>
                <text class="radio-text">餐饮</text>
            </div>
          </div>
        </li>
        <li class="list-li">
          <div class="li-cell " @click="goAddress">
            <text class="text">商家地址</text>
            <text class="input">{{store.address || '请选择地址'}}</text>
            <text class="iconfont arrow-icon">&#xe6d7;</text>
          </div>
        </li>
        <li class="list-li">
          <div class="li-cell">
              <text class="text" style="opacity: 0">商家电话</text>
              <input type="text" class="input" placeholder="请输入详细地址(如：门牌号等)" v-model="store.house_number" />
          </div>
        </li>
        <li class="list-li">
          <div class="li-cell">
            <text class="text">营业时间</text>
            <text class="inputTime" @click="pickDate(1)">{{store.start_time || '请选择营业时间'}}</text>
            <text>-</text>
            <text class="inputTime" @click="pickDate(2)">{{store.end_time || '请选择营业时间'}}</text>
            <!--<input type="time" class="input" placeholder="请选择营业时间" v-model="store.work_time"/>-->
            <text class="iconfont arrow-icon">&#xe6d7;</text>
          </div>
        </li>
        <li class="list-li">
          <div class="li-cell">
            <text class="text">商家电话</text>
            <input type="tel" class="input" placeholder="请输入电话号码" v-model="store.contact_mobile" />
          </div>
        </li>
      </ul>
    </div>
    <div class="submit" @click="submit">
        <text class="submit_text">确定</text>
    </div>
  </div>
</template>

<script>
import { WxcMinibar, WxcCell, WxcRadio, WxcPopup } from 'weex-ui'
import { employeeShopCreateShop } from '../services/login'
import http from '../utils/http'
const modal = weex.requireModule('modal')
const picker = weex.requireModule('picker')
export default {
  components: {
    WxcMinibar,
    WxcCell,
    WxcRadio,
    WxcPopup
  },
  data () {
    return {
      store: {
          type: 1,
          shop_logo: '',
          work_time: '9:00-21:00',
          start_time: '开始时间',
          end_time: '结束时间',
          address: ''
      }
    }
  },
  created () {
      this.$event.on('locationInfo', params => {
          let loca = params.location.location.split(',')
          this.store.province = params.location.pcode
          this.store.city = params.location.citycode
          this.store.county = params.location.adcode
          this.store.lng = loca[0]
          this.store.lat = loca[1]
          this.store.address = params.location.address
      })
  },
  methods: {
    submit () {
        if(!this.store.shop_name){
            modal.toast({
                message: '请填写店铺名称',
                duration: 1
            })
            return false
        }
        if(!this.store.address){
            modal.toast({
                message: '请选择店铺地址',
                duration: 1
            })
            return false
        }
        if(!this.store.house_number){
            modal.toast({
                message: '请填写详细地址',
                duration: 1
            })
            return false
        }
        if(!this.store.start_time || !this.store.end_time){
            modal.toast({
                message: '请选择详营业时间',
                duration: 1
            })
            return false
        }
        if(!this.store.contact_mobile){
            modal.toast({
                message: '请填写联系电话',
                duration: 1
            })
            return false
        }
        this.store.work_time = this.store.start_time + '-' + this.store.end_time;
        this.store.shop_logo = this.store.shop_logo == '' ? 'http://cdn.udian.me/logo.png' : this.store.shop_logo
      employeeShopCreateShop(this.store, (data) => {
        modal.toast({
          message: '保存成功',
          duration: 1
        })
        this.$router.back()
      }, (data) => {
        modal.toast({
          message: data.msg,
          duration: 1
        })
      })
    },
    radio (e) {
      this.$set(this.store, 'type', e)
    },
    pickImg () {
        http.pickImgUpload(1, (keys, imgs) => {//keys 没有前缀的数组，imgs是有图片前缀并加180的图片，前面数字是最多选几张图片
            this.store.shop_logo = 'http://cdn.udian.me/' + keys[0]
            // this.$set(this.store, 'shop_logo', 'http://cdn.udian.me/' + resData[0].key)
        })
      },
    goAddress () {
        this.$router.open({
            name: 'chooseAddress'
        })
    },
    pickDate (e) {
        picker.pickTime({
            value: this.value
        }, event => {
            if (event.result === 'success') {
                if (e == 1) {
                    this.store.start_time = event.data
                } else {
                    this.store.end_time = event.data
                }
            }
        })
    }
  }
}
</script>

<style scoped>
  .iconfont{
    font-family: iconfont;
  }
  .list{
    background-color: #f5f5f5;
    padding-top: 24px;
  }
  .list-ul{
    background-color: #fff;
    padding-left: 32px;
  }
  .li-cell{
    height: 94px;
    padding-right: 32px;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
    font-size:28px;
    color:#121C32;
    border-bottom-style: solid;
    border-bottom-width: 2px;
    border-color: #eee;
  }
  .li-cell-log{
    height: 140px;
  }
  .text{
    font-size: 28px;
    margin-right: 60px;
  }
  .input{
    height: 40px;
    width: 480px;
    line-height: 40px;
    font-size:28px;
    color: #757575;
  }
  .inputTime{
    height: 40px;
    width: 120px;
    line-height: 40px;
    font-size:28px;
    color: #757575;
  text-align: center;
  }
  .store-logo{
      width: 116px;
      height: 116px;
  }
  .arrow-icon{
      position: absolute;
      right: 20px;
      top: 0px;
      height: 94px;
      line-height: 94px;
      font-size:24px;
    color: #C5C5C5;
  }
  .arrow-icon-logo{
      height: 140px;
      line-height: 140px;
  }
  .submit{
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
  .submit_text{
      font-size:32px;
      color:#fff;
  }
  .radio{
    flex-direction: row;
    align-items: center;
  }
  .radio-img{
    width: 32px;
    height: 32px;
    margin-right: 20px;
    color: #C5C5C5
  }
  .radio-img-active{
    width: 32px;
    height: 32px;
    margin-right: 20px;
    color: #F77F4F;
  }
  .radio-text{
    font-size:28px;
    color: #757575;
  }
  .popup{
    position: relative;
    height: 663px;
  }
  .popup-title{
    width: 100%;
    height: 84px;
    padding-left: 32px;
    padding-right: 32px;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
  }
  .text2{
    font-size: 32px;
  }
  .text-cancel{
    height: 45px;
    line-height: 45px;
    color: #bbb;
    font-size: 80px;
    font-weight: 100;
    align-items: center;
  }
  .popup-title .text2{
    color: #5D667A;
  }
  .popup-btn{
    width: 100%;
    height: 100px;
    line-height: 100px;
    border-radius: 0;
    position: absolute;
    bottom: 0;
    left: 0;
  }
  .popup-content{
    flex-direction: row;
    justify-content: center;
    padding-top: 28px;
    padding-bottom: 28px;
    position: relative;
  }
  .popup-list{
    width: 112px;
    height: 370px;
    padding-top: 150px;
    padding-bottom: 150px;
    box-sizing: padding-box;
  }
  .cell {
    flex-direction: row;
    justify-content: center;
  }
  .cell .text2{
    font-size: 52px;
    color: #0B152C;
    height: 74px;
    line-height: 74px;
  }
  .box-checked {
    position: absolute;
    width: 100%;
    height: 74px;
    top: 176px;
    border-top-width: 2px;
    border-top-style: solid;
    border-top-color: #EEEEEE;
    border-bottom-width: 2px;
    border-bottom-style: solid;
    border-bottom-color: #EEEEEE;
  }
</style>
