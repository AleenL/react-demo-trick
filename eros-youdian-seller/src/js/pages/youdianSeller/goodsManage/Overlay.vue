<template>
  <div v-if="obj.isShow" >
    <div class="all" @click="close"></div>
    <div class="wrap" :style="obj.right">
      <image class="topTriangle" src="http://cdn.udian.me/topTriangle.png"></image>
      <div class="overlay">
        <!--<div class="triangle"></div>-->
        <div class="overlay-row "  @click="go1">
          <!--<div class="overlay-row-icon">-->
          <!--<wxc-icon name="add" icon-style="height: 10px;height:10px"></wxc-icon>-->
          <!--</div>-->
          <image style="width: 40px;height: 40px;background-color: #313132;border-radius: 20px;" :src="obj.src[0]"></image>
          <text class="overlay-text">{{obj.text[0]}}</text>
        </div>
        <div class="hBar" v-if="obj.src[1]"></div>
        <div class="overlay-row" v-if="obj.src[1]" @click="go2">
          <!--<div class="overlay-row-icon">-->
          <!--<wxc-icon name="add" icon-style="height: 10px;height:10px"></wxc-icon>-->
          <!--</div>-->
          <image style="width: 40px;height: 40px;background-color: #313132;border-radius: 20px;" :src="obj.src[1]"></image>
          <text class="overlay-text">{{obj.text[1]}}</text>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    obj: {
      default: {}
    }
  },
  methods: {
    go1 () {
      this.obj.fn[0]()
    },
    go2 () {
      this.obj.fn[1]()
    },
    close () {
      this.$emit('close')
    }
  }
}
</script>

<style scoped>
    .all {
      position: fixed;
      top: 46px;
      right: 0px;
      bottom: 0px;
      left: 0px;
      background-color: rgba(255, 255, 255, 0);
    }
    .wrap{
        position: fixed;
        top:80px;
    }
    .overlay{
        padding-top: 20px;
        padding-bottom: 20px;
        padding-left: 34px;
        padding-right: 28px;
        background-color: #313132;
        border-radius:4px;
    }
    .overlay-text{
        font-family: PingFangSC-Regular;
        font-size: 30px;
        height: 42px;
        line-height: 42px;
        margin-left: 36px;
        color: #FFFFFF;
        letter-spacing: 0.68px;
    }
    .overlay-row{
        flex-direction:row;
        justify-content: space-around;
        align-items: center;
    }
    .hBar{
        width: 206px;
        height: 2px;
        background-color: rgba(255,255,255,0.1);
        /*border-left-width: 2px;*/
        /*border-left-style: solid;*/
        /*border-left-color: rgba(255,255,255,0.1);*/
        /*border-right-width: 2px;*/
        /*border-right-style: solid;*/
        /*border-right-color: rgba(255,255,255,0.1);*/
        /*border-top-width: 2px;*/
        /*border-top-style: solid;*/
        /*border-top-color: rgba(255,255,255,0.1);*/
        /*border-bottom-width: 2px;*/
        /*border-bottom-style: solid;*/
        /*border-bottom-color: rgba(255,255,255,0.1);*/
        margin: 24px 0 ;
    }
    .topTriangle{
        width: 20px;
        height: 20px;
        position: relative;
        top: 2px;
        left: 220px;
    }
</style>
