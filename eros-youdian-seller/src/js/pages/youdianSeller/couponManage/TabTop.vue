<template>
    <div class="tabTop" append="tree">
        <div    v-for="(item, i) in itemList"
                :key="i"
                class="container"
                @click="onclickitem(i)">
            <!--<text class="iconfont" :style="{ color: titleColor }">&#xe68b;</text>-->
            <text :class="['tab-text',(item.active && 'tab-text-active')]" :style="{width: pwidth}" >{{item.title}}</text>
        </div>
        <!--<div ref="tab-slider" class="slider" :style="{width: pwidth, backgroundColor: '#FC345C', left: left }"></div>-->
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
      pwidth: 165,
      left: 11.25,
      index: 0
    }
  },
  created () {
    this.pwidth = (750 - 90) / this.itemList.length
    this.left = 45 / this.itemList.length
    console.log(this.pwidth)
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
        flex-direction: row;
        background-color: #ffffff;
        border-radius: 4px ;
        border: 1px solid #FF847B;
    }
    .container{
        flex: 1;
        flex-direction: column;
        align-items:center;
        justify-content:center;
        height:56px;
        position: relative;
        color: #FF847B;
    }
    .tab-text {
        width: 100%;
        text-align: center;
        font-size:28px;
        color: #FF847B;
        line-height:56px;
    }
    .tab-text-active{
        width: 100%;
        background:rgba(255,132,123,1);
        color: #ffffff;
        line-height:56px;
    }
    .slider{
        position:absolute;
        content:" ";
        left:0;
        bottom:0;
        height:6px;
        background-color:#1aad19;
        -webkit-transition:-webkit-transform .3s;
        transition:-webkit-transform .3s;
        transition:transform .3s;
        transition:transform .3s,-webkit-transform .3s;
    }
</style>
