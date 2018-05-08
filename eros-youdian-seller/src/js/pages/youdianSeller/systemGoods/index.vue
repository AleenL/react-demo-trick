<template>
    <div class="addgoods">
        <div style="height: 46px"></div>

        <div class="head">
            <image class="back" src="http://app.ttouch.com.cn/ui/youdianshangjia/assets/back.png" />
            <wxc-searchbar ref="wxc-searchbar"
                           class="inputs"
                           cancel-label="确定"
                           :autofocus="false"
                           :auto-appear="false"
                           placeholder="搜索在线商品库"
                           :always-show-cancel="true"
                           @wxcSearchbarCancelClicked="wxcSearchbarCancelClicked"
                           @wxcSearchbarInputReturned="wxcSearchbarInputReturned"
                           @wxcSearchbarInputOnInput="wxcSearchbarInputOnInput"
                           @wxcSearchbarCloseClicked="wxcSearchbarCloseClicked"
                           @wxcSearchbarInputOnFocus="wxcSearchbarInputOnFocus"
                           @wxcSearchbarInputOnBlur="wxcSearchbarInputOnBlur">
            </wxc-searchbar>
        </div>
        <!--<div>-->
            <!--<list :style="scroller" class="scrollerBc">-->
                <!--<cell>-->

                <!--</cell>-->
                <!--<loading class="loading" @loading="onloading" :display="loadinging ? 'show' : 'hide'">-->
                    <!--<text class="indicator-text" v-if="page>1 && systemGoods.length>0">{{loadingText}} ...</text>-->
                    <!--<loading-indicator class="indicator" v-if="page>1 && systemGoods.length>0"></loading-indicator>-->
                <!--</loading>-->
            <!--</list>-->
        <!--</div>-->
        <scroller class="scrollerBc">
            <good v-for="(item, index) in systemGoods"
                  :key="index"
                  :good="item"
            ></good>
        </scroller>
        <div class="btnbox">
            <div class="btnbox1">
                <text class="bt1">*在线商品库中没有想要的商品</text>
                <div style="text-align: right" @click="goAddGoods"><text class="bt2">直接创建</text></div>
            </div>
        </div>
    </div>
</template>

<script>
    import { WxcButton, WxcSearchbar, Utils } from 'weex-ui'
    import { getGoodsList } from '../services/goods.js'

    export default {
        components: {
            good: require('./systemGood.vue'),
            WxcButton,
            WxcSearchbar
        },
        created () {
            this.getData()
        },
        // computed: {
        //     needLoad () {
        //         return this.systemGoods.length * 240 > (Utils.env.getPageHeight() - 175)
        //     }
        // },
        data () {
            return {
                platform: '',
                loadinging: false,
                loadingText: '加载更多数据',
                // cancelLabel: '确定',
                // name: '合味道海鲜杯面',
                // price: '￥8.0',
                // time: '今天下午',
                // height: 88,
                // top: 0,
                scroller: {
                    height: {}
                },
                systemGoods: [],
                inputKey: '水',
                page: 1
            }
        },
        methods: {
            onloading (event) {
                if (!this.needLoad) return
                this.loadinging = true
                // 获取下一页数据
                var _data = {
                    keywords: this.inputKey,
                    page: ++this.page
                }
                getGoodsList(_data, (data) => {
                    if (data.data.length > 0) {
                        this.loadingText = '加载更多数据'
                        this.systemGoods = [...this.systemGoods, ...data.data]
                    } else {
                        this.loadingText = '没有更多商品了'
                    }
                    this.loadinging = false
                }, () => {
                    this.loadinging = false
                })
            },
            wxcCellClicked (e) {
                console.log(e)
            },
            wxcButtonClicked (e) {
                console.log(e)
            },
            wxcSearchbarInputOnFocus () {
            },
            wxcSearchbarInputOnBlur () {
            },
            wxcSearchbarInputReturned () {
            },
            wxcSearchbarCloseClicked () {
            },
            wxcSearchbarInputOnInput (e) {
                if (this.inputKey !== e.value) {
                    this.inputKey = e.value
                    this.page = 1
                    this.loadingText = '加载更多数据'
                    this.inputKey && this.getData()
                }
            },
            wxcSearchbarCancelClicked () {
            },
            wxcSearchbarInputDisabledClicked () {
            },
            wxcSearchbarDepChooseClicked () {
            },
            go () {
                // weexRouter.push('/views/goods/editGoods')
            },
            getData () {
                var data = {
                    keywords: this.inputKey,
                    page: this.page
                }
                getGoodsList(data, (data) => {
                    this.systemGoods = data.data
                })
            },
            goAddGoods () {
                this.$router.open({
                    name: 'goodsManage.editGoods'
                })
            }
        }
    }
</script>

<style scoped>
    .addgoods {
        background-color: #F2F2F2;
    }
    .head{
        flex-direction: row;
        background-color: white;
        heigt: 100px;
        border-bottom-style: solid;
        border-bottom-width: 1px;
        border-bottom-color:#ececec
    }
    .user-seach input{
        width: 600px !important;
    }
    .btnbox{
        position: fixed;
        width: 750px;
        background-color: white ;
        height: 92px;
        padding: 0px 24px;
        bottom: 0px;
        left: 0px;
    }
    .btnbox1{
        background-color: white;
        flex-direction: row;
    }
    .bt1{
        font-size: 24px;
        color: #666666;
        line-height: 92px;
        flex: 1;
    }
    .bt2{
        line-height: 92px;
        font-size: 28px;
        color: #FE4D7B;
        text-align: right;
    }
    .scrollerBc{
        background-color: #fff;
        margin-bottom: 92px;
        /*background-color: #00B4FF;*/
    }
    .loading {
        width: 750px;
        display: -ms-flex;
        display: -webkit-flex;
        display: flex;
        -ms-flex-align: center;
        -webkit-align-items: center;
        -webkit-box-align: center;
        align-items: center;
    }
    .indicator-text {
        color: #888888;
        font-size: 26px;
        text-align: center;
    }
    .indicator {
        margin-top: 16px;
        height: 40px;
        width: 40px;
        color: blue;
    }
</style>
