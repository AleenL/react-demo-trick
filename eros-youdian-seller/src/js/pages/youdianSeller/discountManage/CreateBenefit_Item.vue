<template>
    <div class="wrap">
        <div class="content" :style=" borderObj ">
           <div style="flex-direction: row;">
            <div>
                <image :src="good.img_path_url + '/' + good.goods_img" class="image-good"></image>
            </div>
            <div class="desc-good">
                <text class="text-name">{{good.goods_name}}</text>
                <text class="text-price">原价:￥{{good.price}}</text>
            </div>
           </div>
            <text class="icon-delete" @click="deleteGoods">&#xe6da;</text>
        </div>
    </div>
</template>

<script>
import Utils from '../utils/util'

export default{
  props: {
    good: {
      default: {
        goods_name: '商品名称',
        price: '商品价格'
      }
    },
    index: {
      default: 0,
    }
  },
  data () {
      return {
          borderObj: {
              borderBottomWidth: '2px',
              borderBottomStyle: 'solid',
              borderBottomColor: '#eee'
          }
      }
  },
  created () {
    Utils.initIconFont()
  },
  methods: {
      deleteGoods () {
          this.$emit('deleteGoods', {
              index: this.index
          })
      }
  }
}
</script>

<style scoped>
    .wrap{
        width: 750px;
        background-color: #fff;
        padding-left: 32px;
    }
    .content{
        padding-left: 24px;
        padding-right: 56px;
        height: 150px;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
    }
    .image-good{
        width: 132px;
        height: 132px;
    }
    .desc-good{
        height: 132px;
        justify-content: space-between;
        padding-top: 12px;
        padding-bottom: 12px;
    }
    .text-name{
        width:320px;
        height:44px;
        font-size:32px;
        font-family:PingFangSC-Regular;
        color:rgba(18,28,50,1);
        line-height:44px;
    }
    .text-price{
        margin-top: 16px;
        width:276px;
        height:40px;
        font-size:28px;
        font-family:PingFangSC-Regular;
        color:rgba(91,91,91,1);
        line-height:40px;
    }
    .icon-delete{
        font-family: iconfont;
        color: #5B5B5B;
    }
</style>
