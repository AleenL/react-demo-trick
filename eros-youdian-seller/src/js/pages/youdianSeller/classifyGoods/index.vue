
<template>
    <div class="content" @click="reset">
        <scroller class="scroller">
            <div class="cate" v-if="!goodsLodingShow && categoryLi.length > 0">
                <wxc-cell
                    :cell-style="cellStyle"
                    v-for="(item, index) in categoryLi"
                    :key="index"
                    @wxcCellClicked="wxcCellGo(index)"
                    :label="item.cate_name"
                    :has-arrow="true"></wxc-cell>
            </div>
            <div :style="showFooter && {height: '96px'}"></div>
            <div class="overlayLoading" v-if="goodsLodingShow" :style="deviceHeight">
                <wxc-part-loading :show="goodsLodingShow" width="50px" height="50px"></wxc-part-loading>
            </div>
            <div class="empty" v-if="categoryLi.length === 0 && !goodsLodingShow">
                <div class="empty-div">
                    <image class="empty-img" src="bmlocal://assets/empty-classify.png"></image>
                    <text class="empty-text">暂时没有分类哦~</text>
                </div>
            </div>
        </scroller>
        <div class="footer" v-if="true"  @click="go">
            <div class="footer-item">
                <image style="width:36px;height:36px" src="http://cdn.udian.me/icon-classify.png"></image>
                <text class="text-desc">新增分类</text>
            </div>
        </div>
    </div>
</template>

<script>
    import { WxcMinibar, WxcPartLoading, WxcCell } from 'weex-ui'
    import { editGoods, getShopTopCategories } from '../services/goods.js'
    const modal = weex.requireModule('modal')
    export default {
        components: {
            WxcCell,
            WxcMinibar,
            WxcPartLoading,
        },
        data () {
            return {
                categoryLi: [],
                goodsLodingShow: true,
                cellStyle: {
                  paddingLeft: 0
                },
                params: '',
            }
        },
        eros: {
          beforeBackAppear () {
            this.getShopTopCategories()
          }
        },
        created () {
            this.getShopTopCategories()
            this.$router.getParams().then( data => {
              console.log(data)
                this.params = data
            })
        },
        methods: {
            getShopTopCategories () {
                getShopTopCategories({}, (data) => {
                  this.categoryLi = data.data
                  setTimeout(() => {
                      this.goodsLodingShow = false
                    }, 300)
                })
            },
            go () {
                this.$router.open({
                    name: 'classifyGoods.addClassify'
                })
            },
            wxcCellGo (i) {
                if (!this.params.edit) {
                  this.$router.open({
                    name: 'classifyGoods.addClassify',
                    params: {
                      cate_name: this.categoryLi[i].cate_name,
                      cate_pid: this.categoryLi[i]._id,
                      modifyCategory: true
                    }
                  })
                } else {
                    this.$event.emit('classifyModify', {
                        cate_name: this.categoryLi[i].cate_name,
                        cate_pid: this.categoryLi[i]._id,
                        index: this.params.index
                    })
                    this.$router.back({
                        type: 'PRESENT'
                    })
                }
            }
        }
    }
</script>

<style scoped>
    .content{
        background-color: #f2f2f2;
    }
    .scroller{
        padding-top: 20px;
        margin-bottom: 100px;
    }
    .overlayLoading{
        position: absolute;
        top: 50px;
        left: 0;
        bottom: 0;
        right: 0;
        justify-content: center;
        align-content: center;
        align-items: center;
        width: 750px;
        background-color: rgba(255, 255, 255, 0.1);
    }
    .empty{
        width: 750px;
        padding-top: 280px;
        text-align: center;
        flex-direction: row;
        justify-content: center;

    }
    .empty-div{
        flex-direction: column;
        align-items: center;
    }
    .empty-img{
        width: 220px;
        height: 136px;
    }
    .empty-text{
        font-size:28px;
        color: #4A4A4A;
        line-height: 40px;
        margin-top: 40px;
    }
    .footer{
        position: fixed;
        bottom:0;
        right: 0;
        width: 750px;
        height: 96px;
        background-color: #fff;
        justify-content: center;
        align-items: center;
    }
    .footer-item{
        align-items: center;
    }
    .text-desc{
        font-size: 20px;
        line-height: 28px;
        color: #FE4D7B;
        letter-spacing: -0.22px;
    }
    .cate{
      padding-left:32px;
      background-color: #ffffff
    }
</style>
