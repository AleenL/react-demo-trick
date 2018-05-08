<template>
    <div class="wrapper">
        <div class="topsearch">
            <div class="nowcity" @click="showListCity">
                <text class="btn-txt">{{locationCity}}</text>
                <text class="iconfont down_j btn-txt">&#xe6d8;</text>
            </div>
            <div class="searchaddress" >
                <input class="inputs" @input="onInput" type="text" placeholder="小区/写字楼/学校等" />
            </div>
        </div>
        <div class="box" v-if="locationList.length > 0 && !isShow">
          <div class="panel">
            <text class="text1">当前地址</text>
            <div  class="text2">
              <text class="nowaddress" @click="giveLocation(0)">{{locationList[0] ? locationList[0].name : '定位中'}}</text>
              <div class="dingwei" @click="reGetLoction">
                <text class="iconfont dingweiimg" style="color: rgba(255,45,75,1);">&#xe6db;</text>
                <text style="color: rgba(255,45,75,1);">重新定位</text>
              </div>
            </div>
          </div>
          <div class="panel">
            <text class="text1">附近地址</text>
          </div>
          <scroller class="scroller" @loadmore="moreList">
            <div class="panel" style="border: none;">
              <div  class="text3">
                <div v-for="(loccat, index) in locationList" v-key="index" @click="giveLocation(index)"><text class="addrs">{{loccat.name}}</text></div>
              </div>
            </div>
            <div class="overlayLoading" v-if="loadinging" :style="deviceHeight">
              <wxc-part-loading :show="loadinging" width="50px" height="50px"></wxc-part-loading>
            </div>
          </scroller>

        </div>
      <wxc-result type="errorLocation"
                  :show="show"
                  padding-top="232"
                  @wxcResultButtonClicked="wxcResultButtonClicked"></wxc-result>
      <wxc-loading :show="isShow" type="default" :need-mask="false"></wxc-loading>
    </div>
</template>
<style scoped >
    .iconfont{
        font-family: iconfont;
    }
    .box{
      flex: 1;
    }
    .wrapper{
        background-color: #ffffff;
    }
    .down{
        width: 20px;
        height: 12px;
        left: 100px;
        top:18px;
    }
    .scroller{
        width: 750px;
        flex-direction: row;
        background-color: #ffffff;
    }
    .topsearch{
        flex-direction: row;
        padding-top: 20px;
        padding-bottom: 20px;
        padding-left: 24px;
        padding-right: 24px;
        border-bottom-width: 1px;
        border-bottom-style: solid;
        border-bottom-color: #f0f0f0;
        border-top-width: 1px;
        border-top-style: solid;
        border-top-color: #f0f0f0;
        background-color: #ffffff;
    }
    .nowcity{
        flex-direction: row;
        width: 140px;
        font-size: 28px;
        margin-top: 5px;
    }
    .btn-txt{
        color: #121C32;
        height: 60px;
        line-height: 60px;
    }
    .down_j{
        font-size: 16px;
    }
    .searchaddress{
        flex: 1;
        width: 550px;
    }
    .inputs{
        width: 550px;
        height: 60px;
        line-height: 60px;
        padding-left: 20px;
        background-color:rgba(238,238,238,1);
    }
    .panel{
        padding-left: 24px;
        padding-right: 24px;
        /*border-bottom-width: 1px;*/
        /*border-bottom-style: solid;*/
        /*border-bottom-color: #f0f0f0;*/
        /*background-color: #ffffff;*/
    }
    .text1{
        line-height:80px;
        font-size:28px;
        color:rgba(93,102,122,1);
    }
    .text2{
        padding-top: 30px;
        padding-bottom: 30px;
        flex-direction: row;
        line-height:80px;
        font-size:28px;
        color:rgba(93,102,122,1);
    }
    .nowaddress{
        font-size:28px;
        color:rgba(255,45,75,1);
        line-height:40px;
        flex: 1;
    }
    .dingwei{
        flex: 1;
        flex-direction: row;
        justify-content: flex-end;
        font-size:28px;
        color:rgba(255,45,75,1);
        line-height:40px;
    }
    .dingweiimg{
        width: 38px;
        height: 38px;
        margin-right: 20px;
      font-size: 36px;
        color: rgba(255,45,75,1);
    }
    .addrs{
        font-size:28px;
        color:rgba(28,28,32,1);
        line-height:120px;
    }
    .overlayLoading{
      justify-content: center;
      align-content: center;
      align-items: center;
      width: 750px;
      background-color: rgba(255, 255, 255, 0.1);
    }
</style>
<script>
import { WxcCell, WxcMinibar, WxcSearchbar, WxcResult, WxcLoading, WxcPartLoading } from 'weex-ui'
import sourceData from './citylist';
export default {
  components: { WxcCell, WxcMinibar, WxcSearchbar, WxcResult, WxcLoading, WxcPartLoading },
  data: () => ({
    sourceData,
    show: false,
    loadinging: false,
    isShow: true,
    latLang: '',
    keywords: '',
    locationCity: '定位中',
    locationList: [],
    nowLocation: {},
    page: 1
  }),
  created () {
    this.getLoction()
    this.getLocationCity()
  },
  methods: {
    onloading (event) {
      this.loadinging = true
      setTimeout(() => {
        this.loadinging = false
      }, 1000)
    },
    getLoction () {
        this.$geo.get().then(data => {
            console.log(data)
            this.latLang = data.locationLat + ',' + data.locationLng
            this.page = 1
            this.getLocationList()
        }, error => {
            this.isShow = false
            this.show = true
          console.log(error)
        })
    },
    getLocationList () {
        this.$fetch({
            url: 'http://restapi.amap.com/v3/place/around',
            method: 'GET',
            data: {
                key: '157359ce6ea9fa3a348cf61e88a41e2e',
                location: this.latLang,
                keywords: this.keywords,
                extensions: 'all',
                page: this.page
            }
        }).then(resData => {
            // 成功回调
            this.locationList = this.page === 1 ? resData.pois : this.locationList.concat(resData.pois)
            setTimeout(() => {
              this.isShow = false
              this.loadinging = false
            }, 500)
        }, error => {
            // 错误回调
            console.log(error)
        })
    },
    getLocationCity () {
        this.$fetch({
            url: 'http://restapi.amap.com/v3/ip',
            method: 'GET',
            data: {
                key: '157359ce6ea9fa3a348cf61e88a41e2e',
            }
        }).then(resData => {
            // 成功回调
            console.log(resData)
          setTimeout(() => {
            this.locationCity = resData.city
          }, 500)
        }, error => {
            // 错误回调
            console.log(error)
        })
    },
    moreList () {
      this.loadinging = true
        this.page++
        this.getLocationList()
    },
    giveLocation (i) {
      this.$event.emit('locationInfo', {
        location: this.locationList[i],
      })
      this.$router.back()
    },
    wxcResultButtonClicked () {
      this.getLoction()
    },
    onInput (e) {
      this.keywords = e.value
      this.page = 1
      this.getLocationList()
    }
  }
}
</script>
