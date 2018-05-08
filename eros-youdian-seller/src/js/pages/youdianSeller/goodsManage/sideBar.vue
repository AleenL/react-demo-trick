<!-- CopyRight (C) 2017-2022 Alibaba Group Holding Limited. -->
<!-- Created by Tw93 on 17/07/28. -->
<!-- Updated by Tw93 on 17/11/16.-->

<template>
  <div class="wxc-tab-page"
       :style="{ height: (tabPageHeight)+'px', backgroundColor:wrapBgColor }">
    <scroller class="tab-title-list"
              ref="tab-title-list"
              :show-scrollbar="false"
              :data-spm="spmC"
              :style="{ backgroundColor: tabStyles.bgColor, height: (tabPageHeight)+'px',paddingLeft:tabStyles.leftOffset+'px' }">

      <div class="title-item"
           v-for="(v,index) in tabTitles"
           :key="index"
           :ref="'wxc-tab-title-'+index"
           @click="setPage(index,v.url)"
           :style="{ width: tabStyles.width +'px', height: tabStyles.height +'px', backgroundColor: currentPage === index ? tabStyles.activeBgColor : tabStyles.bgColor }"
           :accessible="true"
           :aria-label="`${v.title?v.title:'标签'+index}`">


        <text
            v-if="!titleUseSlot"
            :style="{ fontSize: tabStyles.fontSize+'px', fontWeight: (currentPage === index && tabStyles.isActiveTitleBold)? 'bold' : 'normal', color: currentPage === index ? tabStyles.activeTitleColor : tabStyles.titleColor, paddingLeft:tabStyles.textPaddingLeft+'px', paddingRight:tabStyles.textPaddingRight+'px'}"
            class="tab-text">{{v.cate_name}}</text>
        <div class="border-bottom"
             v-if="tabStyles.hasActiveBottom && !titleUseSlot"
             :style="{ width: '8px', left: '0px', height: tabStyles.height+'px', backgroundColor: currentPage === index ? tabStyles.activeBottomColor : 'transparent' }"></div>
        <div class="border-bottom"
             :style="{ width: tabStyles.activeBottomWidth + 'px', left: (tabStyles.width-tabStyles.activeBottomWidth)/2+'px', height: '2px', backgroundColor: '#eee' }"></div>
        <slot :name="`tab-title-${index}`" v-if="titleUseSlot"></slot>
      </div>
    </scroller>
    <!--<div class="tab-page-wrap"-->
         <!--:style="{ height: (tabPageHeight)+'px' }">-->
      <!--<div ref="tab-container"-->
           <!--class="tab-container">-->
        <!--<slot></slot>-->
      <!--</div>-->
    <!--</div>-->
  </div>
</template>

<style scoped>
  .wxc-tab-page {
    width: 156px;
    flex-direction: row;
  }

  .tab-title-list {
    width: 156px;
  }

  .title-item {
    justify-content: center;
    align-items: center;
    border-bottom-style: solid;
  }

  .border-bottom {
    position: absolute;
    bottom: 0;
  }

  .tab-page-wrap {
    width: 594px;
    overflow: hidden;
  }

  .tab-container {
    flex: 1;
    position: absolute;
  }

  .tab-text {
    lines: 1;
    text-overflow: ellipsis;
  }

</style>

<script>

import { Utils } from 'weex-ui'
// import Binding from 'weex-bindingx/lib/index.weex.js'

const dom = weex.requireModule('dom')
const swipeBack = weex.requireModule('swipeBack')

export default {
  props: {
    tabTitles: {
      type: Array,
      default: () => ([])
    },
    panDist: {
      type: Number,
      default: 200
    },
    spmC: {
      type: [String, Number],
      default: ''
    },
    titleUseSlot: {
      type: Boolean,
      default: false
    },
    titleType: {
      type: String,
      default: 'icon'
    },
    tabPageHeight: {
      type: [String, Number],
      default: 1334
    },
    needSlider: {
      type: Boolean,
      default: true
    },
    isTabView: {
      type: Boolean,
      default: true
    },
    wrapBgColor: {
      type: String,
      default: '#f2f3f4'
    }
  },
  data: () => ({
    currentPage: 0,
    gesToken: 0,
    isMoving: false,
    tabStyles: {
      bgColor: '#f2f3f4',
      titleColor: '#666666',
      activeTitleColor: '#3D3D3D',
      activeBgColor: '#FFFFFF',
      isActiveTitleBold: true,
      iconWidth: 70,
      iconHeight: 70,
      width: 156,
      height: 108,
      fontSize: 26,
      hasActiveBottom: true,
      activeBottomColor: '#FF847B',
      activeBottomWidth: 100,
      activeBottomHeight: 1,
      textPaddingLeft: 10,
      textPaddingRight: 10,
      leftOffset: 0
    }
  }),
  created () {
    const { titleType, tabStyles } = this
    if (titleType === 'iconFont' && tabStyles.iconFontUrl) {
      dom.addRule('fontFace', {
        'fontFamily': 'wxcIconFont',
        'src': `url(${tabStyles.iconFontUrl})`
      })
    }
    this.tabPageHeight = Utils.env.getScreenHeight() - 74 - weex.config.env.statusBarHeight - 96 - 80
  },
  mounted () {
    if (swipeBack && swipeBack.forbidSwipeBack) {
      swipeBack.forbidSwipeBack(true)
    }
    // if (BindEnv.supportsEBForIos() && this.isTabView && this.needSlider) {
    //   const tabPageEl = this.$refs['tab-page-wrap']
    //   Binding.prepare && Binding.prepare({
    //     anchor: tabPageEl.ref,
    //     eventType: 'pan'
    //   })
    // }
  },
  methods: {
    next () {
      let page = this.currentPage
      if (page < this.tabTitles.length - 1) {
        page++
      }
      this.setPage(page)
    },
    prev () {
      let page = this.currentPage
      if (page > 0) {
        page--
      }
      this.setPage(page)
    },
    setPage (page, url = null, animated = true) {
      if (!this.isTabView) {
        this.jumpOut(url)
        return
      }
      if (this.isMoving === true) {
        return
      }
      this.isMoving = true
      const previousPage = this.currentPage
      const currentTabEl = this.$refs[`wxc-tab-title-${page}`][0]
      const { height } = this.tabStyles
      const appearNum = parseInt(this.tabPageHeight / height)
      const tabsNum = this.tabTitles.length
      const offset = page > appearNum ? -(this.tabPageHeight - height) / 2 : -height * 2

      if (appearNum < tabsNum) {
        (previousPage > appearNum || page > 1) && dom.scrollToElement(currentTabEl, {
          offset, animated
        })

        page <= 1 && previousPage > page && dom.scrollToElement(currentTabEl, {
          offset: -height * page,
          animated
        })
      }

      this.isMoving = false
      this.currentPage = page
      this.$emit('wxcTabPageCurrentTabSelected', { page })
    }
  }
}
</script>
