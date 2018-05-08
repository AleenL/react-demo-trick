<!-- CopyRight (C) 2017-2022 WeexUI Group Holding Limited. -->
<!-- Created by git@zwwill on 18/02/08. -->
<!--A popover box with customized contents.-->

<template>
  <div class="wrapper">
    <div class="g-cover"
         ref="wxc-cover"
         v-if="show"
         @touchstart="hideAction"
         :style="coverStyle"></div>
    <div ref="wxc-popover"
         class="g-popover"
         v-if="show && buttons"
         :style="contentStyle">
      <!--<div class="u-popover-arrow" :style="arrowStyle"></div>-->
      <div class="u-popover-arrow" ></div>
      <div class="u-popover-inner">
        <div :class="['i-btn',i==buttons.length-1?'i-btn-noborder':'']"
             v-for="(item,i) in buttons"
             :key="i"
             @click="wxcButtonClicked(i)">
          <text v-if="item.icon" class="btn-icon iconfont">{{item.icon}}</text>
          <text class="btn-text">{{item.text}}</text>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  const animation = weex.requireModule('animation');
  export default {
    props: {
      buttons: {
        type: Array,
        default: []
      },
      position: {
        type: Object,
        default: () => ({
          x: 0,
          y: 0
        })
      },
      arrowPosition: {
        type: Object,
        default:  () => ({
          pos: 'right',
          x: 0,
          y: 0
        })
      },
      coverColor: {
        type: String,
        default: 'rgba(0, 0, 0, 0)'
      },
      hasAnimation: {
        type: Boolean,
        default: true
      }
    },
    data: () => ({
      show: false,
      showIn: false
    }),
    computed: {
      coverStyle() {
        return this.coverColor ? { backgroundColor: this.coverColor, opacity:this.hasAnimation||!this.showIn?'0':'1'} : '';
      },
      transformOrigin() {
        let {x=0, y=0, pos='top'} = this.arrowPosition,
            _origins = [];
        switch(pos){
          case 'top':
          case 'bottom':
            _origins = [x<0?'right':'left',pos];
            break;
          case 'left':
          case 'right':
            _origins = [pos,y<0?'bottom':'top'];
            break;
        }
        return _origins.join(' ');
      },
      contentTransform() {
        let {x=0, y=0, pos='top'} = this.arrowPosition,
            _translates=['scale(0)'];
        if(x>=0 && x<22){
          x = 22;
        }else if(x<0 && x>-22){
          x =-22;
        }
        if(y>=0 && y<22){
          y = 22;
        }else if(y<0 && y>-22){
          y =-22;
        }
        switch(pos){
          case 'top':
          case 'bottom':
            _translates[1] = `translateX(${x<0?(x-15):(x+15)}px)`;
            break;
          case 'left':
          case 'right':
            _translates[1] = `translateY(${y<0?(y-15):(y+15)}px)`
            break;
        }
        return _translates.join(' ');
      },
      contentStyle() {
        let { x = 0, y = 0 } = this.position,
            style = {};
        x < 0 ? (style.right = `${-x}px`) : (style.left = `${x}px`);
        y < 0 ? (style.bottom = `${-y}px`) : (style.top = `${y}px`);
        style.opacity = this.hasAnimation||!this.showIn?'0':'1';
        style.transform = this.hasAnimation||!this.showIn?this.contentTransform:'scale(1)';
        style.transformOrigin = this.transformOrigin;
        return style;
      },
      arrowStyle() {
        let { pos = 'top', x = 0, y = 0 } = this.arrowPosition,
            style = {};
        switch (pos) {
          case 'top':
            style.top = '6px';
          case 'bottom':
            !style.top && (style.bottom = '6px');
            style.transform = 'scaleX(0.8) rotate(45deg)';
            if(x>=0 && x<22){
              x = 22;
            }else if(x<0 && x>-22){
              x =-22;
            }
            x < 0 ? (style.right = `${-x}px`) : (style.left = `${x}px`);
            break;
          case 'left':
            style.left = '6px';
          case 'right':
            !style.left && (style.right = '6px');
            style.transform = 'scaleY(0.8) rotate(45deg)';
            if(y>=0 && y<22){
              y = 22;
            }else if(y<0 && y>-22){
              y =-22;
            }
            y < 0 ? (style.bottom = `${-y}px`) : (style.top = `${y}px`);
            break;
          default:
            break;
        }
        return style;
      }
    },
    methods: {
      wxcPopoverShow() {
        if(!!this.animationLock){
          return;
        }
        this.show = true;
        if(this.hasAnimation){
          setTimeout(()=>this.wxcPopoverAnimationShow(),40)
        }else{
          setTimeout(()=>this.showIn=true,40);
        }
      },
      /**
       * smooth in
       **/
      wxcPopoverAnimationShow(){
        const popoverEl = this.$refs['wxc-popover'];
        const coverEl = this.$refs['wxc-cover'];
        if (!coverEl || !popoverEl) {
          return;
        }
        this.setAnimationLock();
        let a1End = false,a2End = false;
        animation.transition(popoverEl, {
          styles: {
            opacity: 1,
            transform: "scale(1)",
            transformOrigin: this.transformOrigin
          },
          delay:0,
          duration: 250,
          timingFunction: 'ease-out'
        }, (e) => {
          a1End = true;
          if(a1End && a2End){
            this.animationLock = false
          }
        });

        animation.transition(coverEl, {
          styles: {
            opacity: 1
          },
          delay:0,
          duration: 150,
          timingFunction: 'ease-in'
        }, (e) => {
          a2End = true;
          if(a1End && a2End){
            this.animationLock = false
          }
        });
      },
      wxcButtonClicked(index) {
        if(!!this.animationLock){
          return;
        }
        this.$emit('wxcPopoverButtonClicked', { index });
        this.hideAction();
      },
      /**
       * 隐藏操作
       */
      hideAction(){
        if(!!this.animationLock){
          return;
        }
        if(this.hasAnimation){
          this.setAnimationLock()
          const popoverEl = this.$refs['wxc-popover'];
          const coverEl = this.$refs['wxc-cover'];
          if (!popoverEl || !coverEl) {
            return;
          }
          let a1End = false,a2End = false;
          animation.transition(popoverEl, {
            styles: {
              opacity: 0,
              transform: this.contentTransform,
              transformOrigin: this.transformOrigin
            },
            duration: 150
          }, () => {
            a1End = true;
            if(a1End && a2End){
              this.show = false;
              this.showIn = false;
              this.animationLock = false
            }
          });
          animation.transition(coverEl, {
            styles: {
              opacity: 0
            },
            duration: 150
          }, () => {
            a2End = true;
            if(a1End && a2End){
              this.show = false;
              this.showIn = false;
              this.animationLock = false
            }
          });
        }else {
          this.show = false;
          this.showIn = false;
        }
        this.$emit('wxcPopoverCover');
      },
      /**
       * 设置动画锁
       */
      setAnimationLock(){
        this.animationLock = true;
      }

    }
  };
</script>

<style scoped>
  .wrapper{
    z-index: 999;
  }
  .g-cover {
    position: fixed;
    top: 0;
    right: 0;
    left: 0;
    bottom: 0;
    background-color: rgba(0, 0, 0, 0);
    z-index: 1;
  }
  .g-popover {
    position: fixed;
    z-index: 10;
  }
  .u-popover-arrow {
    position: absolute;
    border-radius: 4px;
    width: 30px;
    height: 30px;
    right: -10px;
    top: 45px;
    transform: rotate(45deg) scaleY(0.8);
    background-color: rgba(0, 0, 0, 0.9);
  }
  .u-popover-inner {
    flex-direction: row;
    border-radius: 10px;
    background-color: rgba(0, 0, 0, 0.9);
    width: 464px;
    height: 100px;
    justify-content: center;
    align-items: center;
    align-content: center;
  }
  .i-btn {
    flex: 1;
    text-align: center;
    justify-content: center;
    align-items: center;
    align-content: center;
  }
  .i-btn-noborder {
  }
  .btn-icon {
    /*width: 32px;*/
    height: 32px;
    line-height: 32px;
    font-size: 30px;
    color: #ffffff;
  }
  .iconfont{
    font-family: iconfont;
  }
  .btn-text {
    margin-top: 8px;
    flex: 1;
    font-size: 20px;
    color: #ffffff;
  }
  .text-align-center {
    text-align: center;
  }
</style>
