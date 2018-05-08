<template>
    <div class="wrap">
        <div class="content">
            <image class="image-good" :src="good.img_path_url + '/' + good.goods_img"></image>
            <div>
                <div>
                  <text class="text-name" lines="1">{{good.goods_name}}</text>
                </div>
                <text class="text-price">￥ {{good.price}}</text>
                <!--<text class="text-number">库存{{good.goods_stock}} 销量{{good.sale_num}}</text>-->
            </div>
            <!--<image class="edit-good" :src="isShowOverlay?icon2:icon1" @click="imgClick()"></image>-->
            <text class="edit-good iconfont" :style="chooseIconObj" @click="iconClick()">&#xe6f7;</text>
            <!--<div class="overlay" v-if="isShowOverlay">-->
                <!--<div @click="go(1)" class="overlay_item">-->
                    <!--&lt;!&ndash;<image src="http://cdn.udian.me/edit.png" class="iconItem"></image>&ndash;&gt;-->
                    <!--<text class="iconfont">&#xe6ef;</text>-->
                    <!--<text class="text-desc">编辑</text>-->
                <!--</div>-->
                <!--<div @click="go(2)" class="overlay_item">-->
                    <!--&lt;!&ndash;<image src="http://cdn.udian.me/pulloff.png" class="iconItem"></image>&ndash;&gt;-->
                    <!--<text class="iconfont">&#xe6ee;</text>-->
                    <!--<text class="text-desc">{{changeState}}</text>-->
                <!--</div>-->
                <!--<div @click="go(3)" class="overlay_item">-->
                    <!--&lt;!&ndash;<image src="http://cdn.udian.me/classify.png" class="iconItem"></image>&ndash;&gt;-->
                    <!--<text class="iconfont">&#xe6ed;</text>-->
                    <!--<text class="text-desc">分类</text>-->
                <!--</div>-->
                <!--<div @click="go(4)" class="overlay_item">-->
                    <!--&lt;!&ndash;<image src="http://cdn.udian.me/delete.png" class="iconItem"></image>&ndash;&gt;-->
                    <!--<text class="iconfont">&#xe6ec;</text>-->
                    <!--<text class="text-desc">删除</text>-->
                <!--</div>-->
                <!--<div @click="go(5)" class="overlay_item">-->
                    <!--&lt;!&ndash;<image src="http://cdn.udian.me/stick.png" class="iconItem"></image>&ndash;&gt;-->
                    <!--<text class="iconfont">&#xe6eb;</text>-->
                    <!--<text class="text-desc">置顶</text>-->
                <!--</div>-->
            <!--</div>-->
        </div>
    </div>
</template>

<script>
// import { pullOffGoods, stick, deleteGoods, editGoods} from '../services/goods.js'
const modal = weex.requireModule('modal')
import util from '../utils/util'

export default {
  props: {
    good: {
      default: {
        goods_name: '合味道海鲜杯面',
        price: '8.0',
        goods_stock: '9',
        sale_num: '12',
        show: true,
        index: {
          default: -1
        },
        activeIndex: {
          default: -1
        }
      }
    }
  },
  data () {
    return {
      chooseIcon: false,
      showIcon: true,
      icon1: 'http://cdn.udian.me/edit-good.png',
      icon2: 'http://cdn.udian.me/editGood2.png'
    }
  },
  computed: {
    chooseIconObj () {
      if (this.chooseIcon) {
          return {
              color: '#FF847B'
          }
      }
      return {
          color: '#C5C5C5'
      }
    },
    // isShowOverlay () {
    //   return this.good.activeIndex === this.good.index
    // },
    changeState () {
      if (this.good.is_off === 0) {
          return '下架'
      }
      else return '上架'
     }
  },
  created () {
      util.initIconFont()
      if (this.good.activeList.indexOf(this.good.index) !== -1) {
          this.chooseIcon = true
      }
      this.$event.on('toggleAllState', (e) => {
          this.chooseIcon = e.state
          // all点击触发
          this.changeStateEvent()
      })
  },
  methods: {
    iconClick () {
      // if(this.good.activeIndex === this.good.index) {
      //     this.$emit('changeActiveIndex', -1)
      //     return
      // }
      // this.$emit('changeActiveIndex', this.good.index)
        this.chooseIcon = !this.chooseIcon
        // this.chooseIconObj.color = this.chooseIcon ? '#FF847B' : '#C5C5C5'
        // 单个点击触发
        this.changeStateEvent()
    },
    // 选中未选中状态修改触发事件
    changeStateEvent () {
        this.$emit('chooseGoodsEvent', {
            state: this.chooseIcon,
            categoryIndex: this.good.activeItem,
            goodsIndex: this.good.index,
            goods_id: this.good._id
        })
    },
    // go (i) {
    //   this.$emit('changeActiveIndex', -1)
    //   var data = {
    //     goods_img_str: this.good.goods_img_str,
    //     goods_name: this.good.goods_name,
    //     goods_brief: this.good.goods_brief,
    //     price: this.good.price,
    //     goods_spec: this.good.goods_spec,
    //     goods_unit: this.good.goods_unit,
    //     goods_stock: this.good.goods_stock,
    //     goods_cate: this.good.cate_name,
    //     state: this.good.state,
    //     goods_id: this.good._id
    //   }
    //   if (i === 1) {
    //       this.$router.open({
    //           name: 'goodsManage.editGoods',
    //           params: {
    //               goods_id: this.good._id
    //           }
    //       })
    //   }
    //   if (i === 2) {
    //       if( this.good.is_off === 0) {
    //           var data1 = {
    //               state: 0,
    //               goods_id: this.good._id,
    //               cate_pid: this.cate_pid
    //           }
    //           pullOffGoods(data1, () => {
    //               modal.toast({
    //                   message: '下架成功'
    //               })
    //           })
    //       } else {
    //           data.state = 1
    //           editGoods(data, () => {
    //               modal.toast({
    //                   message: '上架成功'
    //               })
    //           })
    //       }
    //     // 物理删除
    //     this.$emit('deleteGood', this.good.index)
    //   }
    //   if (i === 3) {
    //       this.$router.open({
    //           name: 'classifyGoods',
    //           params: {...data, showFooter: false, category: true}
    //       })
    //   }
    //   if (i === 4) {
    //     var goods_id = this.good._id
    //     this.$emit('deleteGood', this.good.index)
    //     deleteGoods({ goods_id }, () => {
    //       modal.toast({
    //         message: '删除商品成功'
    //       })
    //     })
    //   }
    //   if (i === 5) {
    //     var data5 = {
    //       goods_id: this.good._id,
    //       is_hot: 1
    //     }
    //     // 需要置顶的商品Index
    //     this.$emit('stick', this.good.index)
    //     stick(data5, () => {
    //       modal.toast({
    //         message: '商品置顶成功',
    //         duration: 1
    //       })
    //     })
    //   }
    // }
  }
}
</script>

<style scoped>
    .iconfont {
        font-family: iconfont;
        color: #fff;
    }
    .wrap{
        position: relative;
        background-color: #fff;
        padding-left: 20px;
        padding-top: 20px;
    }
    .content{
        flex-direction: row;
        width: 574px;
        padding-bottom: 20px;
        border-bottom-width: 2px;
        border-bottom-style: solid;
        border-bottom-color: #eee;
        position:relative;
}
    .image-good{
        width: 132px;
        height: 132px;
        margin-right: 20px;
    }
    .text-name{
        font-family: PingFangSC-Medium;
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
        font-family: PingFangSC-Medium;
        font-size: 28px;
        height: 40px;
        line-height: 40px;
        color: #F77F4F;
        letter-spacing: -0.30px;
        margin-top: 24px;
    }
    .text-number{
        font-family: PingFangSC-Regular;
        font-size: 24px;
        height: 34px;
        line-height: 34px;
        color: #5B5B5B;
        letter-spacing: -0.26px;
    }
    .edit-good{
        position: absolute;
        width: 38px;
        height: 38px;
        right: 20px;
        bottom: 50px;
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
        font-family: PingFangSC-Regular;
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
