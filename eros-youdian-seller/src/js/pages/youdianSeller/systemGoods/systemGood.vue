<template>
  <div  class="goods-list">
    <image class="goods-img" :src="good.goods_img_str" />
    <div class="goods-info" style="margin-left: 30px">
      <text class="names">{{good.goods_name}}</text>
      <text class="price">￥{{good.price}}</text>
    </div>
    <div class="times">
      <text class="creatbtn" @click="go">一键创建</text>
    </div>
  </div>
</template>

<script>
// import weexRouter from '../util/weexRouter.js'

export default {
  props: {
    good: {
      default: {}
    },
    btFn: {
      default: () => {}
    }
  },
  methods: {
    go () {
      // weexRouter.push('/views/goods/editGoods', { id: this.good.goods_id, systemGood: 1 })
        this.$router.open({
            name: 'goodsManage.editGoods',
            params: {
                goods_id: this.good.goods_id,
                type: 2
            }
        })
    }
  }
}
</script>

<style scoped>
  .goods-list{
    flex-direction: row;
    align-items: center;
    background-color: white;
    padding: 30px 30px 30px 0;
    margin-left: 32px;
    border-bottom-style: solid;
    border-bottom-width: 1px;
    border-bottom-color:#ececec
  }
  .goods-img{
    width: 132px;
    height: 132px;
    border-radius: 8px;
  }
  .goods-info{
    flex-direction: column;
    text-align: justify;
    flex: 1;
  }
  .names{
    font-size: 36px;
    color: #121C32;
    letter-spacing: 0;
    line-height: 50px;
  }
  .price{
    font-size: 28px;
    margin-top: 15px;
    color: #F77F4F;
    letter-spacing: -0.7px;
    margin-top: 40px;
  }
  .times{
    text-align: right;
    /*flex: 1;*/
  }
  .creatbtn{
    width: 120px;
    line-height: 48px;
    /*margin-top: 40px;*/
    right:0;
    color: #F77F4F;
    font-size: 22px;
    text-align: center;
    border-style: solid ;
    border-width: 1px;
    border-color: #F77F4F;
    border-radius: 6px;
  }
</style>
