<template>
    <div class="tabTop" >
        <div v-for="(item, i) in itemList" :key="i" class="container" @click="onclickitem(i)">
            <div class="home-menu" :class="['tab-text',(item.active && 'tab-text-active')]">
                <div class="home-menu-item">
                    <!--<image :src=item.icon class="home-menu-item_img"></image>-->
                    <text class="home-menu-item_img iconfont" :style="item.active ? textActive : {color: 'rgba(255, 255, 255, 0.5)'}">{{item.icon}}</text>
                    <text class="home-menu-item_title" :style="item.active ? textActive : {color: 'rgba(255, 255, 255, 0.5)'}">{{item.title}}</text>
                    <!--<text class="home-menu-item_blef" style="width: 18px;height: 18px"></text>-->
                </div >
            </div>
        </div>
        <div ref="tab-slider" class="slider" :style="{width: pwidth+'px', backgroundColor: 'white', left: left+'px' }" ></div>
        <div></div>
    </div>
</template>

<script>
const animation = weex.requireModule('animation')

export default {
  props: {
    itemList: { default: [] }
  },
  data () {
    return {
      textActive: {
        color: '#FFFFFF'
      },
      pwidth: '',
      left: '',
      index: 0
    }
  },
  created () {
    this.pwidth = (750 - 200) / this.itemList.length
    this.left = 95 / this.itemList.length
    console.log(this.pwidth)
    console.log(this.left)
  },
  methods: {
    onclickitem (e) {
      this.itemList.forEach(function (obj, index) {
        if (index === e) {
          obj.active = true
        } else {
          obj.active = false
        }
      })
      let dist = 750 / this.itemList.length * e
      this.sliderAnimation(dist)
      this.$emit('tabTopItemOnClick', e)
    },
    sliderAnimation (dist) {
      const containerEl = this.$refs[`tab-slider`]
      animation.transition(containerEl, {
        styles: {
          transform: `translateX(${dist}px)`
        },
        duration: 300,
        timingFunction: 'ease-in-out',
        delay: 0
      }, () => {
      })
    }
  }
}
</script>

<style scoped >
    .tabTop{
        width: 750px;
        flex-direction: row;
        background-color: #FF7470;
    }
    .container{
        flex: 1;
        flex-direction: column;
        align-items:center;
        justify-content:center;
        /*height: 88;*/
        position: relative;
        background-color: #FF7470;
    }
    .home-menu{
        flex-direction: row;
        -webkit-box-orient: horizontal;
        -webkit-box-direction: normal;
        /*height: 150px;*/
        color: #ffffff;
        width: 100%;
        padding: 30px 0px;
        background-color: #FF7470;
    }
    .iconfont{
        font-family: iconfont;
    }
    .home-menu-item{
        flex: 1;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        background-color: #FF7470;
        -webkit-box-orient: vertical;
        -webkit-box-direction: normal;
        -webkit-box-align: center;
        -webkit-box-pack: center;
        -webkit-box-flex: 1;
        /*height: 150px;*/
        position: relative;
    }
    .home-menu-item_img{
        margin-top: 10px;
        height: 40px;
        width: 40px;
        line-height: 40px;
        text-align: center;
        font-size: 36px;
        color: rgba(255, 255, 255, 0.5);
    }
    .home-menu-item_title{
        margin-top: 10px;
        color: rgba(255, 255, 255, 0.5);
        font-size: 24px;
    }
    .home-menu-item_blef{
        position: absolute;
        right: 54px;
        top: 54px;
        text-align: center;
        background-color: #f8f800;
        color: #FC345C;
        border-radius: 100px;
        font-size: 20px;
    }
    .home-bill{
        flex-direction: row;
        -webkit-box-orient: horizontal;
        -webkit-box-direction: normal;
        height: 200px;
        color: #ffffff;
        background-color: #ffffff;
        width: 750px;
    }
    .home-bill-item{
        flex: 1;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        -webkit-box-orient: vertical;
        -webkit-box-direction: normal;
        -webkit-box-align: center;
        -webkit-box-pack: center;
        -webkit-box-flex: 1;
        margin-top: 30px;
        margin-bottom: 30px;
    }
    .home-bill-item_title{
        color: #333;
        font-family: PingFangSC-Medium;
        font-size: 40px;
    }
    .home-bill-item_brief{
        color: #4a4a4a;
        ont-family: PingFangSC-Regular;
        font-size: 26px;
    }
    .tab-text {
        margin-top: 5px;
        text-align: center;
        font-size: 20px;
        color: #000000;
    }
    .tab-text-active{
        /*color: #FC345C;*/
        color: white;
    }
    .slider{
        position:absolute;
        content:" ";
        left:0;
        bottom:2px;
        height:6px;
        background-color:white;
        -webkit-transition:-webkit-transform .3s;
        transition:-webkit-transform .3s;
        transition:transform .3s;
        transition:transform .3s,-webkit-transform .3s;
    }
</style>
