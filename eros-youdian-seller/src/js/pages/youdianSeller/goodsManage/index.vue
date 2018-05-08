<template>
    <div class="wrapper" @click="reset">
        <div style="height: 46px"></div>
        <div class="topBar">
            <input  type="text" class="search" placeholder="搜索商品/品牌名称/条形码" v-model="params.keywords" @input="getGoods">
            <image class="icon-search" src="http://cdn.udian.me/search.png"></image>
            <image  class="icon-add" src="http://cdn.udian.me/icon-add.png" @click="setOverlayShow"></image>
        </div>
        <div class="">
            <wxc-searchbar :always-show-cancel="true" :default-value="params.keywords" @wxcSearchbarInputOnInput="getShopGoods" cancel-label="测试+"></wxc-searchbar>
        </div>
        <div class="topTable" >
            <div @click="activeClick(1)">
                <text :class="[active===1?'active':'']" class="text-table" >出售中</text>
            </div>
            <text class="bridge bridge1" :class="[active===1?'active-color':'']">{{active_num}}</text>
            <div @click="activeClick(2)">
                <text :class="[active===2?'active':'']" class="text-table" >未上架</text>
            </div>
            <text class="bridge bridge2" :class="[active===2?'active-color':'']">{{inactive_num}}</text>
        </div>
        <div class="content">
            <side-bar :tabTitles="goodsLi" @wxcTabPageCurrentTabSelected="changeCate"></side-bar>
            <div :style="deviceHeight" class="list-right">
                <goods-list :goodsList="goods" v-if="!goodsLodingShow && goods.length > 0"></goods-list>
                <div class="overlayLoading" v-if="goodsLodingShow">
                    <wxc-part-loading :show="goodsLodingShow" width="50px" height="50px"></wxc-part-loading>
                </div>
                <!--<loading class="loading" :display="loadinging ? 'show' : 'hide'">-->
                    <!--<loading-indicator class="indicator"></loading-indicator>-->
                <!--</loading>-->
                <div class="empty" v-if="goods.length == 0 && !goodsLodingShow">
                    <div class="empty-div">
                        <image class="empty-img" src="bmlocal://assets/empty-goods.png"></image>
                        <text class="empty-text">还没有添加商品哦~</text>
                    </div>
                </div>
            </div>
        </div>
        <overlay :obj="overlayObj" @close="closeOverlay"></overlay>
    </div>
</template>

<script>
    import { getShopTopCategories, getShopGoodsList, addOrEditGoods } from '../services/goods'
    import { Utils, WxcSearchbar, WxcPartLoading } from 'weex-ui'

    export default {
        components: {
            overlay: require('./Overlay.vue'),
            goodsList: require('./GoodsItem.vue'),
            sideBar: require('./sideBar.vue'),
            WxcSearchbar,
            WxcPartLoading
        },
        data () {
            return {
                deviceHeight: {},
                params: {
                    is_off: 0,
                    keywords: '',
                    page: 1
                },
                loadinging: false,
                active_num: '',
                inactive_num: '',
                activeIndex: -1,
                overlayObj: {
                    text: ['新增商品', '分类管理'],
                    src: ['http://cdn.udian.me/icon-addGood.png', 'http://cdn.udian.me/icon-classify.png'],
                    isShow: false,
                    right: {
                        right: `20px`
                    },
                    fn: [
                         () => {
                            this.overlayObj.isShow = false
                            this.$router.open({
                                navTitle: '新增商品',
                                name: 'goodsManage.editGoods'
                            })
                        },
                         () => {
                             this.overlayObj.isShow = false
                             this.$router.open({
                                name: 'classifyGoods',
                                params: {
                                    edit: false
                                }
                            })
                        }
                    ]
                },
                goodsLodingShow: true,
                active: 1,
                activeItem: 0,
                goodsLi: [],
                goods: []
            }
        },
        beforeCreate () {
          this.$event.on('newGoods', (params) => {
            // if(params.index){
            //   this.$set(this.goods, params.index -1, params.goods)
            //   // this.goods[params.index -1] = params.goods
            // } else {
            //   this.params.page = 1
            //   this.getGoods()
            // }
            getShopTopCategories({}, (data) => {
              this.goodsLi = data.data
            })
            this.params.page = 1
            this.getGoods()
          })
          this.$event.on('classifyModify', params => {
            if(this.goodsLi[this.activeItem]._id !== params.cate_pid){
              let data = {
                goods_id: this.goods[params.index]._id,
                cate_pid: params.cate_pid,
              }
              addOrEditGoods(data, (data) => {
                this.$notice.toast({
                  message: '修改成功！'
                })
                this.goods.splice(params.index, 1)
              })
            }
            getShopTopCategories({}, (data) => {
              this.goodsLi = data.data
            })
          })
        },
        created () {
            this.getShopTopCategories()
            // 获f取屏幕高度
            this.deviceHeight.height = (Utils.env.getScreenHeight() - 74 - weex.config.env.statusBarHeight - 96 - 80) + 'px'
        },
        methods: {
            getShopTopCategories () {
                getShopTopCategories({}, (data) => {
                  this.goodsLi = data.data
                  this.$storage.set('classily', data.data)
                  if(data.data.length > 0) this.getGoods()
                })
            },
            hideOverlayFn () {
                this.activeIndex = -1
            },
            onloading (event) {
                this.params.page += 1
                this.getGoods()
                this.loadinging = !this.loadinging
                setTimeout(() => {
                    this.loadinging = !this.loadinging
                }, 1000)
            },
            activeClick (num) {
                this.active = num
                this.goodsLodingShow = true
                this.params.is_off = num === 1 ? 0 : 1
                this.params.page = 1
                this.getGoods()
            },
            setOverlayShow () {
                this.overlayObj.isShow = !this.overlayObj.isShow
                this.activeIndex = -1
            },
            closeOverlay () {
                this.overlayObj.isShow = false
            },
            changeActiveIndex (i) {
                this.activeIndex = i
            },
            changeCate (e) {
                this.goodsLodingShow = true
                this.goods = []
                this.activeItem = e.page
                this.params.page = 1
                this.getGoods()
            },
            getGoods () {
                this.activeIndex = -1
                var data = {
                    cate_pid: `${this.goodsLi[this.activeItem]._id}`,
                    ...this.params
                }
                // 获取当前点击分类商品数据
                getShopGoodsList(data, (data) => {
                    this.active_num = data.data.active_num
                    this.inactive_num = data.data.inactive_num
                    this.goods = this.params.page === 1 ? data.data.goods_list : this.goods.concat(data.data.goods_list)
                    console.log(this.goods)
                  setTimeout(() => {
                          this.goodsLodingShow = false
                      }, 300)
                })
            },
            stickSort (index) {
                if (index !== 0) {
                    var sliceArrayBefor = this.goods.slice(0, index)
                    var sliceArrayAfter = this.goods.slice(index + 1)
                    var newArray = [this.goods[index], ...sliceArrayBefor, ...sliceArrayAfter]
                    this.goods = newArray
                }
            }
        }
    }
</script>

<style scoped >
    .content {
        width: 750px;
        border-top-width: 1px;
        border-top-color: #eeeeee;
        flex-direction: row;
    }
    .wrapper{
        background-color: #f2f2f2;
        flex: 1;
    }
    .topBar{
        width: 750px;
        height: 74px;
        background-color: #fff;
        flex-direction: row;
        align-items: center;
        padding-left: 28px;
        border-bottom-width: 2px;
        border-bottom-style: solid;
        border-bottom-color: #eeeeee;
        position: relative;
    }
    .search{
        width: 610px;
        height: 60px;
        flex-direction: row;
        align-items: center;
        background-color: #eee;
        padding-left: 76px;
    }
    .icon-search{
        position: absolute;
        left: 48px;
        top: 20px;
        width: 30px;
        height: 30px;
        /*margin: 0 20px;*/
    }
    .input{
        width: 388px;
        background-color: #eee;
        height: 40px;
    }
    .icon-add{
        width: 40px;
        height: 40px;
        margin-left: 34px;
    }
    .topTable{
        width: 750px;
        background-color: #fff;
        flex-direction: row;
        justify-content: space-around;
    }
    .active{
        color: #FC345C;
        border-bottom-width: 8px;
        border-bottom-style: solid;
        border-bottom-color: #FC345C
    }
    .active-color{
        color: #FC345C;
    }
    .text-table{
        font-family: PingFangSC-Medium;
        font-size: 28px;
        letter-spacing: -0.14px;
        width: 188px;
        text-align: center;
        line-height: 80px;
        height: 80px;
    }
    .bridge{
        position: absolute;
        top: 10px;
        font-size: 24px;
        letter-spacing: -0.12px;
    }
    .bridge1{
        left: 228px;
    }
    .bridge2{
        left: 600px;
    }
    .item-box{
        position: relative;
        width: 156px;
        height: 108px;
        align-items: center;
    }
    .red-line {
        position: absolute;
        left: 0px;
        top: 0px;
        width: 8px;
        height: 108px;
        background-color: #FF847B;
    }
    .item-title{
        width: 106px;
        height: 108px;
        line-height: 108px;
        text-align: center;
        border-bottom-width: 2px;
        border-bottom-style: solid;
        border-bottom-color: #EDEDED;
        font-size: 26px;
        color: #666666;
    }
    /*.red-line {*/
    /*position: absolute;*/
    /*left: -20px;*/
    /*width: 8px;*/
    /*height: 108px;*/
    /*background-color: #fb3369;*/
    /*}*/
    .text-good{
        width:584px;
        height: 60px;
        line-height: 60px;
        font-family: PingFangSC-Medium;
        font-size: 24px;
        color: #5A5A5A;
        letter-spacing: 0.28px;
        padding-left: 20px;
    }
    /*.noMoreData{*/
    /*height: 200px;*/
    /*padding-top: 20px;*/
    /*text-align:  center;*/
    /*}*/
    .test{
        color: #888888;
        font-size: 42px;
        text-align: center;
    }
    .list{
        width: 156px;
    }
    .list-right{
        width: 594px;
        background-color: #ffffff;
    }
    .overlayLoading{
        position: absolute;
        top: 0;
        left: 0;
        bottom: 0;
        right: 0;
        justify-content: center;
        align-content: center;
        align-items: center;
        width: 594px;
        background-color: rgba(255, 255, 255, 0.1);
    }
    .empty{
        width: 594px;
        padding-top: 280px;
        text-align: center;
        justify-content: center;
    }
    .empty-div{
        flex-direction: column;
        align-items: center;
    }
    .empty-img{
        width: 222px;
        height: 154px;
    }
    .empty-text{
        font-size:28px;
        color: #4A4A4A;
        line-height: 40px;
        margin-top: 40px;
    }
</style>
