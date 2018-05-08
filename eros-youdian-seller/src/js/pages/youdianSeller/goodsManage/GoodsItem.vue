<template>
    <div class="wrap">
      <scroller @loadmore="onloading" :style="deviceHeight" :show-scrollbar="false">
        <div class="content" v-for="(goods, index) in goodsList">
          <image class="image-good" :src="goods.img_path_url + '/' + goods.goods_img"></image>
          <div class="goods-item">
            <div>
              <text class="text-name" lines="1">{{goods.goods_name}}</text>
            </div>
            <text class="text-price">￥ {{goods.price}}</text>
            <text class="text-number">库存{{goods.goods_stock}} 销量{{goods.sale_num}}</text>
          </div>
          <text class="edit-good" @click="imgClick(index, $event)">{{goods.selected ? '\ue678' : '\ue6dc'}}</text>
        </div>
        <popover
            ref="wxc-popover"
            :arrowPosition="{ pos: 'right', y: -40 }"
            :position="position"
            :buttons="btns"
            @wxcPopoverButtonClicked="popoverButtonClicked"
            @wxcPopoverCover="popoverCover"
        ></popover>
      </scroller>
    </div>
</template>

<script>
import { Utils } from 'weex-ui'
import { stick, deleteGoods, addOrEditGoods} from '../services/goods.js'
import util from '../utils/util'

const modal = weex.requireModule('modal')

export default {
  props: {
    goodsList: {
      type: Array
    }
  },
  components: {
    popover: require('./Popover'),
  },
  data () {
    return {
      activeIndex: -1,
      position: '',
      btns: [
        {
          icon: '\ue6ef',
          text:'编辑'
        },
        {
          icon: '\ue6ee',
          text:'上架'
        },
        {
          icon: '\ue6ed',
          text:'分类'
        },
        {
          icon: '\ue6ec',
          text:'删除'
        },
        {
          icon: '\ue6eb',
          text:'置顶'
        }
      ]
    }
  },
  created () {
    util.initIconFont()
    this.deviceHeight ={height: (Utils.env.getScreenHeight() - 74 - weex.config.env.statusBarHeight - 96 - 80) + 'px'}
  },
  methods: {
    imgClick (index, evnet) {
      this.$refs['wxc-popover'].wxcPopoverShow();
      let rect = evnet.position
      this.position = {
        x: rect.x - 478,
        y: rect.y - 45
      }
      this.activeIndex = !this.goodsList[index].selected ? index : -1
      if (this.goodsList[index].state === 0) {
        this.btns[1] = {
          icon: '\ue6ee',
          text:'上架'
        }
      } else {
        this.btns[1] = {
          icon: '\ue6ee',
          text:'下架'
        }
      }
      this.$set(this.goodsList[index], 'selected', !this.goodsList[index].selected)
    },
    popoverCover () {
      this.goodsList = this.goodsList.map((item) => {
          item.selected = false
          return item
      })
    },
    popoverButtonClicked (item) {
      const { index } = item
      const goods = this.goodsList[this.activeIndex]
      let that = this
      if (index === 0) {
          this.$router.open({
              navTitle: '编辑商品',
              name: 'goodsManage.editGoods',
              params: {
                  goods_id: goods._id,
                  index: this.activeIndex
              }
          })
      }
      if (index === 1) {
          let type = goods.state === 1 ? '下架' : '上架'
          this.$notice.confirm({
              title: '确认'+type+'此商品？',
              message: '',
              okTitle: '确认',
              cancelTitl: '取消',
              okCallback() {
                  let data = {
                          goods_id: goods._id,
                          state: goods.state === 0 ? 1 : 0
                      }
                  addOrEditGoods(data, () => {
                    modal.toast({
                      message: type + '成功!'
                    })
                    that.goodsList.splice(this.activeIndex, 1)
                  })
              },
              cancelCallback() {
                  // 点击取消按钮的回调
              }
          })
      }
      if (index === 2) {
          this.$router.open({
              type: 'PRESENT',
              name: 'classifyGoods',
              params: {
                edit: true,
                index: this.activeIndex
              }
          })
      }
      if (index === 3) {
        this.$notice.confirm({
          title: '确认删除此商品？',
          message: '',
          okTitle: '确认',
          cancelTitl: '取消',
          okCallback() {
              // 点击确认按钮的回调
            deleteGoods({ goods_id: goods._id }, () => {
              modal.toast({
                message: '删除商品成功'
              })
              that.goodsList.splice(this.activeIndex, 1)
            })
          },
          cancelCallback() {
              // 点击取消按钮的回调
          }
        })
      }
      if (index === 4) {
        let data = {
          goods_id: goods._id,
        }
        this.$notice.confirm({
          title: '确认置顶此商品？',
          message: '',
          okTitle: '确认',
          cancelTitl: '取消',
          okCallback() {
            // 点击确认按钮的回调
            stick(data, () => {
              modal.toast({
                message: '商品置顶成功',
                duration: 1
              })
              let note = that.goodsList[this.activeIndex]
              that.goodsList.splice(this.activeIndex, 1)
              that.goodsList.unshift(note)
            })
          },
          cancelCallback() {
            // 点击取消按钮的回调
          }
        })
      }
    }
  }
}
</script>

<style scoped>
    .iconfont {
        font-family: iconfont;
        color: #fff;
    }
    .wrap{
        background-color: #fff;
        padding-left: 20px;
    }
    .content{
        flex-direction: row;
        width: 574px;
        padding-bottom: 20px;
        padding-top: 20px;
        border-bottom-width: 2px;
        border-bottom-style: solid;
        border-bottom-color: #eee;
}
    .goods-item{
    }
    .image-good{
        width: 132px;
        height: 132px;
        margin-right: 20px;
    }
    .text-name{
        font-size: 28px;
        width: 350px;
        lines: 1;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
        height: 40px;
        line-height: 40px;
        color: #121C32;
        letter-spacing: -0.15px;
    }
    .text-price{
        font-size: 28px;
        height: 40px;
        line-height: 40px;
        color: #F77F4F;
        margin-top: 24px;
    }
    .text-number{
        font-size: 24px;
        height: 34px;
        line-height: 34px;
        color: #5B5B5B;
    }
    .edit-good{
        font-family: iconfont;
        position: absolute;
        right: 20px;
        bottom: 18px;
        color: #F77F4F;
        font-size: 38px;
        font-weight: bold;
    }
    .overlay{
        position:absolute;
        width: 464px;
        height: 100px;
        background-color: #000000;
        border-radius:8px;
        opacity:0.8;
        top: 50px;
        left: 34px;
        flex-direction: row;
        justify-content: space-around;
        align-items: center;
    }
    .overlay_item {
        justify-content: space-around;
        align-items: center;
    }
    .iconItem{
        width: 34px;
        height: 34px
    }
    .text-desc{
        font-size: 20px;
        height: 34px;
        line-height: 28px;
        color: #FFFFFF;
        letter-spacing: -0.1px;
        margin-top: 10px;
    }
    .triangle{
        position: absolute;
        width: 12px;
        height: 12px;
        top: 114px;
        left: 498px;
    }
</style>
