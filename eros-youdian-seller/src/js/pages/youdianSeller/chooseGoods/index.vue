<template>
    <div class="wrapper" @click="reset">
        <div class="topBar">
            <input  type="text"
                    class="search"
                    placeholder="搜索商品/品牌名称/条形码"
                    v-model="params.keywords"
                    @input="getShopGoods"
            >
            <image class="icon-search" src="http://cdn.udian.me/search.png"></image>
            <!--<image  class="icon-add" src="http://cdn.udian.me/icon-add.png" @click="setOverlayShow"></image>-->
        </div>
        <!--<div class="">-->
            <!--<wxc-searchbar :always-show-cancel="true" :default-value="params.keywords" @wxcSearchbarInputOnInput="getShopGoods" cancel-label="测试+"></wxc-searchbar>-->
        <!--</div>-->
        <!--<div class="topTable">-->
            <!--<div @click="activeClick(1)">-->
                <!--<text :class="[active===1?'active':'']" class="text-table" >出售中</text>-->
            <!--</div>-->
            <!--<text class="bridge bridge1" :class="[active===1?'active-color':'']">{{active_num}}</text>-->
            <!--<div @click="activeClick(2)">-->
                <!--<text :class="[active===2?'active':'']" class="text-table" >未上架</text>-->
            <!--</div>-->
            <!--<text class="bridge bridge2" :class="[active===2?'active-color':'']">{{inactive_num}}</text>-->
        <!--</div>-->
        <div class="content" :style="deviceHeight">
            <scroller class="list" :style="deviceHeight" :show-scrollbar="false">
                <div v-for="(item,index) in goodsLi"
                      :ref="'items'+index"
                      :key="item._id"
                      @click="changeCate(index)"
                      :style="activeItem === index ? {backgroundColor: '#ffffff'} : {}"
                      class="item-box">
                    <div class="red-line" v-if="activeItem === index"></div>
                    <text class="item-title">{{item.cate_name}}</text>
                </div>
            </scroller>
            <list :style="deviceHeight" class="list-right" @click="hideOverlayFn">
                <!--<text class="text-good">啤酒(16)</text>-->
                <cell>
                    <good  v-for="(item,index) in goods"
                           :ref="'item'+index"
                           :key="goodsLi[activeItem]._id+item._id+index"
                           :good="Object.assign({}, item, {activeItem, index, activeList})"
                           @chooseGoodsEvent="modifyChooseGoodsList"
                    >
                    </good>
                </cell>
                <!--<loading class="loading" @loading="onloading" :display="loadinging ? 'show' : 'hide'">-->
                <!--<text class="indicator-text">Loading ...</text>-->
                <!--<loading-indicator class="indicator"></loading-indicator>-->
                <!--</loading>-->
            </list>
        </div>
        <div class="foot" @click="chooseGoodsFinish">
            <text class="text-foot">完成</text>
        </div>
    </div>
</template>

<script>
    import { getShopTopCategories, getShopGoodsList } from '../services/goods'
    import { Utils, WxcSearchbar } from 'weex-ui'
    const modal = weex.requireModule('modal')
    const dom = weex.requireModule('dom')
    const Height = 300

    export default {
        components: {
            good: require('./GoodsItem.vue'),
            WxcSearchbar
        },
        created () {
            this.setNavigator(this.rightText)
            // // 直接分类回来
            // this.$event.on('classifyBack', () => {
            //     this.getGoods()
            // })
            // // edit 回来
            // this.$event.on('editGood', () => {
            //     this.getGoods()
            // })
            // // updateCategory
            // this.$event.on('updateCategory', () => {
            //     getShopTopCategories({}, data => {
            //         this.goodsLi = data.data
            //     })
            // })
            // 获f取屏幕高度
            this.deviceHeight.height = (Utils.env.getScreenHeight() - Height) + 'px'

            // 请求分类列表并保存给分类页面使用
            var data = {
                // shop_id: '59c1d8ab1d716136ba4474c3'
            }
            getShopTopCategories(data, (data) => {
                this.goodsLi = data.data
                // 根据类别的长度生成二位数组
                this.goodsLi.map(() => {
                    this.chooseGoodsList.push([])
                })
                this.$storage.setSync('categoryLi', data.data)
                // 第一个分类商品数据（上架的）
                this.$router.getParams().then(params => {
                    this.params._ids = params.arr.join(',')
                    this.getGoods()
                })
            })
        },
        data () {
            return {
                chooseAll: true,
                chooseGoodsList: [], //所有选中的index存放在里面,二维数组
                chooseGoodsDataList: [],
                itemActive: {
                    backgroundColor: '#fff'
                },
                deviceHeight: {},
                params: {
                    is_off: 0,
                    keywords: '',
                    page: 1,
                    _ids: '',
                },
                loadinging: false,
                active_num: '',
                inactive_num: '',
                activeIndex: -1,
                active: 1,
                activeItem: 0,
                activeList: [],
                goodsLi: [],
                goods: []
            }
        },
        computed: {
            rightText () {
                if (this.chooseAll) {
                    return '全选'
                }
                return '取消全选'
            }
        },
        methods: {
            // 全选 取消全选
            setNavigator (t) {
                //设置导航条右侧区域
                this.$navigator.setRightItem({
                    text: t,                             // 展示的文字 (和图片 二选一)
                    textColor: '#FE5383',                    // 文字颜色 (默认为白色)
                    fontSize: '32',                         // 字号（默认32px）
                    fontWeight: 'normal',                   // 是否加粗（默认不加粗）
                }, () => {
                    // 点击回调
                    this.chooseAll = !this.chooseAll
                    this.setNavigator(this.rightText)
                    this.$event.emit('toggleAllState', {
                        state: !this.chooseAll
                    })
                })
            },
            // 记录选中的index
            modifyChooseGoodsList (e) {
                // ui展示
                let index = this.chooseGoodsList[e.categoryIndex].indexOf(e.goodsIndex)

                if (e.state) {
                    // push
                    if (index === -1) {
                        this.chooseGoodsList[e.categoryIndex].push(e.goodsIndex)
                    }
                } else {
                    // splice
                    this.chooseGoodsList[e.categoryIndex].splice(index, 1)
                }
                // rightText 全选/取消全选判断
                // this.$notice.toast({
                //     message: this.chooseGoodsList[e.categoryIndex]
                // })
                if (e.state) {
                    // rightText 全不选
                    if (this.chooseGoodsList[e.categoryIndex].length === this.goods.length) {
                        this.chooseAll = false
                        this.setNavigator(this.rightText)
                    }
                } else {
                    // rightText 全选
                    if (this.chooseGoodsList[e.categoryIndex].length !== this.goods.length) {
                        this.chooseAll = true
                        this.setNavigator(this.rightText)
                    }
                }
                // goods_id arr
                let idIndex = this.chooseGoodsDataList.indexOf(e.goods_id)
                if ( idIndex === -1) {
                    this.chooseGoodsDataList.push(e.goods_id)
                } else {
                    this.chooseGoodsDataList.splice(idIndex, 1)
                }
            },
            hideOverlayFn () {
                this.activeIndex = -1
            },
            onloading (event) {
                // this.params.page += 1
                this.getGoods()
                modal.toast({ message: 'Loading', duration: 1 })
                this.loadinging = !this.loadinging
                setTimeout(() => {
                    this.loadinging = !this.loadinging
                }, 1000)
            },
            activeClick (num) {
                // this.reset()
                this.active = num
                this.params.is_off = num === 1 ? 0 : 1
                this.getGoods()
            },
            // setOverlayShow () {
            //     // modal.toast({q
            //     //   message: 'add click'
            //     // })
            //     this.overlayObj.isShow = !this.overlayObj.isShow
            //     this.activeIndex = -1
            // },
            reset () {
                // this.overlayObj.isShow = false
            },
            changeActiveIndex (i) {
                // this.reset()
                this.activeIndex = i
            },
            changeCate (i) {
                if (this.activeItem === i) return
                this.activeItem = i
                this.params.page = 1
                this.getGoods()
                this.activeList = this.chooseGoodsList[i]
                // this.chooseAll = true
                this.setNavigator(this.rightText)
            },
            getGoods () {
                const el = this.$refs['items' + this.activeItem]
                const dis = this.activeItem > 1 ? -216 : 0
                this.activeItem > 1 && dom.scrollToElement(el[0], { offset: dis })
                // 重置activeIndex 隐藏option overlay
                this.goods = []
                this.activeIndex = -1
                var data = {
                    // shop_id: '59c1d8ab1d716136ba4474c3',
                    // test使用
                    // cate_pid: '1',
                    cate_pid: `${this.goodsLi[this.activeItem]._id}`,
                    ...this.params
                }
                // 获取当前点击分类商品数据
                getShopGoodsList(data, (data) => {
                    this.active_num = data.data.active_num
                    this.inactive_num = data.data.inactive_num
                    this.goods = data.data.goods_list
                })
            },
            // stickSort (index) {
            //     if (index !== 0) {
            //         var sliceArrayBefor = this.goods.slice(0, index)
            //         var sliceArrayAfter = this.goods.slice(index + 1)
            //         var newArray = [this.goods[index], ...sliceArrayBefor, ...sliceArrayAfter]
            //         this.goods = newArray
            //     }
            // },
            // getShopGoods by search
            getShopGoods () {
                var data = {
                    // shop_id: '59c1d8ab1d716136ba4474c3',
                    cate_pid: `${this.goodsLi[this.activeItem]._id}`,
                    ...this.params
                }
                getShopGoodsList(data, data => {
                    this.goods = data.data.goods_list
                })
            },
            // delete good . UI层移除
            // deleteGood (i) {
            //     this.goods.splice(i, 1)
            // }
            chooseGoodsFinish () {
                this.$event.emit('chooseGoodsFinish', {
                    data: this.chooseGoodsDataList
                })
                this.$router.back()
            }
        }
    }
</script>

<style scoped >
    .content {
        width: 750px;
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
        width: 700px;
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
    .foot{
        position: fixed;
        bottom: 0px;
        left: 0px;
        right: 0px;
        background-color: #FF6F6F;
        height: 92px;
        align-items: center;
        justify-content: center;
    }
    .text-foot{
        color: #ffffff;
        font-size: 32px;
    }
</style>
