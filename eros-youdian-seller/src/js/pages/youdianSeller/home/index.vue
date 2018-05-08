<template>
    <div class="wrapper" >
        <div :style="navH"></div>
        <list ref="list" :show-scrollbar="false" :showRefresh="true" @refresh="onrefresh">
            <cell >
                <div class="heador">
                    <div class="heador-top">
                        <div style="flex-direction: row" >
                            <text class="text-l" @click="orderInfo">{{storeInfo.work_state_str || '营业中'}}</text>
                            <text class="text-c" @click="changeStore">{{storeInfo.shop_name || '加载中……'}}</text>
                            <text class="iconfont lt" @click="changeStore">&#xe694;</text>
                        </div>
                        <div style="flex: 1">
                            <text class="text-r" @click="goSet">设置</text>
                        </div>
                    </div>
                    <popover ref="wxc-popover"
                             :buttons="btns"
                             coverColor="rgba(0,0,0,0)"
                             :position="popoverPosition"
                             :arrowPosition="popoverArrowPosition"
                             @wxcPopoverButtonClicked="popoverButtonClicked"></popover>
                </div>
                <div class="home-menu">
                    <div class="home-menu-item">
                        <text class="iconfont home-menu-item_img">&#xe6f1;</text>
                        <text class="home-menu-item_title">待接单</text>
                        <text class="home-menu-item_blef" v-if="orderNum.wait_receive">{{orderNum.wait_receive}}</text>
                    </div >
                    <div class="home-menu-item">
                        <text class="iconfont home-menu-item_img">&#xe6f0;</text>
                        <text class="home-menu-item_title">待发货</text>
                        <text class="home-menu-item_blef" v-if="orderNum.received">{{orderNum.received}}</text>
                    </div>
                    <div class="home-menu-item">
                        <text class="iconfont home-menu-item_img">&#xe6ea;</text>
                        <text class="home-menu-item_title">待送达</text>
                        <text class="home-menu-item_blef" v-if="orderNum.delivery">{{orderNum.delivery}}</text>
                    </div>
                    <div class="home-menu-item">
                        <text class="iconfont home-menu-item_img">&#xe6f2;</text>
                        <text class="home-menu-item_title">售后</text>
                        <text class="home-menu-item_blef" v-if="orderNum.after_sale">{{orderNum.after_sale}}</text>
                    </div>
                </div>
                <div style="padding-left:32px;background-color: #ffffff;margin-top: 20px;">
                    <wxc-cell label="经营数据统计"
                              :cell-style="cellStyleObj"
                              :has-arrow="true"
                              @wxcCellClicked="wxcCellClicked"
                              >
                        <text slot="value" class="text-desc">更多</text>
                    </wxc-cell>
                </div>
                <div class="home-bill">
                    <div class="home-bill-item">
                        <text class="home-bill-item_title">{{storeInfo.statistics.today.order_total || '0'}}</text>
                        <text class="home-bill-item_brief">今日订单</text>
                    </div>
                    <div class="cols_line"></div>
                    <div class="home-bill-item">
                        <text class="home-bill-item_title">{{storeInfo.statistics.today.total_price || '0.00'}}</text>
                        <text class="home-bill-item_brief">今日营业额(元)</text>
                    </div >
                    <div class="cols_line"></div>
                    <div class="home-bill-item">
                        <text class="home-bill-item_title">{{storeInfo.statistics.today.avg_price || '0.00'}}</text>
                        <text class="home-bill-item_brief">客单价(元)</text>
                    </div>
                </div>
                <div style="padding-left:32px;background-color: #ffffff;margin-top: 20px;">
                    <wxc-cell label="账单明细"
                              :cell-style="cellStyleObj"
                              :has-arrow="true"
                              @wxcCellClicked="wxcCellClicked2"
                              >
                        <text slot="value" class="text-desc">更多</text>
                    </wxc-cell>
                </div>
                <div style="padding-left:32px;background-color: #ffffff;margin-top: 20px;">
                    <wxc-cell label="登录测试"
                              :cell-style="cellStyleObj"
                              :has-arrow="true"
                              @wxcCellClicked="test">
                        <text slot="value" class="text-desc">更多</text>
                    </wxc-cell>
                </div>

            </cell>
        </list>
    </div>
</template>
<script>
    import Popover from './Popover'
    import { employeeLogin, editShop } from '../services/employee'
    import { getShop, getShopOrderNumber } from '../services/login'
    import util from '../utils/util'
    import { WxcCell } from 'weex-ui'

    const storage = weex.requireModule('storage')
    export default {
        name: 'home',
        components: { WxcCell, Popover },
        data () {
            return {
                storeInfo: {},
                orderNum: '',
                isBottomShow: false,
                height: 400,
                useDefaultReturn: false,
                btns: [
                    {
                        text: '营业中',
                        key: 1
                    },
                    {
                        text: '休息中',
                        key: 2
                    }
                ],
                popoverPosition: { x: 0, y: 130 },
                popoverArrowPosition: { pos: 'top', x: 80 },
                cellStyleObj:{paddingLeft:'0',height:'100px',paddingRight: '32px'}

            }
        },
        beforeCreate (){
            util.initIconFont()
        },
        created: function () {
            const barHeight = weex.config.env.statusBarHeight ? weex.config.env.statusBarHeight : 0
            this.navH = {height: barHeight + 'px', backgroundColor: '#FF7470'}
            this.getStoreInfo()
        },
        methods: {
            orderInfo () {
                this.$refs['wxc-popover'].wxcPopoverShow();
            },
            changeStore () {
                this.$router.back();
            },
            popoverButtonClicked (e) {
                console.log(e.key)
                editShop({
                    work_state: e.key
                }, (data) => {
                    this.$set(this.storeInfo, 'work_state_str', e.key == 1 ? '营业中' : '休息中')
                })
            },
            onrefresh () {
                setTimeout(() => {
                    this.$refs['list'].refreshEnd()
                    this.getStoreInfo()
                }, 1000)
            },
            getStoreInfo () {
                getShop({}, (data) => {
                    this.storeInfo = data.data
                    this.$storage.setSync('storeInfo', data.data)
                    // storage.setItem('storeInfo', data.data, event => {
                    //   console.log('set success')
                    // })
                    this.getShopOrderNumber()
                })
            },
            getShopOrderNumber () {
                getShopOrderNumber({}, (data) => {
                    this.orderNum = data.data
                })
            },
            goSet () {
                this.$router.open({
                    name: 'storeSet'
                })
            },
            openBottomPopup () {
                this.isBottomShow = true
            },
            //  非状态组件，需要在这里关闭
            popupOverlayBottomClick () {
                this.isBottomShow = false
            },
            wxcCellClicked () {
                // this.$router.open({
                //     name: 'statistics'
                // })
                this.$event.emit('tabBarJump', {
                    status: 'tabTo',
                    data: {
                        key: 'shop'
                    }
                })
            },
            wxcCellClicked2 () {
                this.$router.open({
                    name: 'billList'
                })
            },
            test () {
                this.$storage.removeAll()
                this.$router.setHomePage('/pages/youdianSeller/index.js')
            }
        }
    }
</script>
<style scoped >
    .iconfont{
        font-family: iconfont;
    }
    .lt{
        color: #ffffff;
        font-size: 12px;
        line-height: 88px;
        height: 88px;
        margin-left: 5px;
    }
    .wrapper{
        background-color: #f6f6f6;
    }
    .heador{
        height: 88px;
    }
    .heador-top{
        width: 750px;
        height: 88px;
        background-color: #FF7470;
        flex-direction: row;
    }
    .text-l{
        background-color: rgba(255,255,255,0.20);
        border-radius: 100px;
        width: 120px;
        height: 44px;
        font-size: 24px;
        color: #FFFFFF;
        text-align:center;
        line-height: 44px;
        margin-left: 20px;
        margin-right: 20px;
        margin-top: 22px;
    }
    .text-c{
        font-size: 34px;
        color: #FFFFFF;
        line-height: 88px;
        height: 88px;
    }
    .text-r{
        font-size: 30px;
        color: #FFFFFF;
        position: absolute;
        line-height:88px;
        height: 88px;
        right:0px;
        padding-left: 20px;
        padding-right: 20px;
    }
    .header{
        flex-direction: row;
        -webkit-box-orient: horizontal;
        -webkit-box-direction: normal;
        color: #ffffff;
        width: 750px;
        justify-content: space-between;
        align-items: center;
        background-color: rgb(252, 52, 92);
        padding-top: 0px;
        -webkit-box-orient: horizontal;
        -webkit-box-direction: normal;
        -webkit-box-pack: justify;
        -webkit-box-align: center;
        padding-left: 40px;
        padding-right: 20px;
        font-size: 28px;
    }
    .down-la{
        position: absolute;
        top: 50%;
        transform: translateY(-50%);
        right: -30px;
    }
    .shop-title{
        flex-direction: row;
        position: relative;
    }
    .header-left, .header-right{
        color: #ffffff;
    }
    .home-menu{
        flex-direction: row;
        height: 212px;
        color: #ffffff;
        width: 750px;
        background-color: #FF7470;
    }
    .home-menu-item{
        flex: 1;
        align-items: center;
        justify-content: center;
        background-color: #FF7470;
        height: 212px;
    }
    .home-menu-item_img{
        margin-top: 10px;
        height: 60px;
        width: 60px;
        font-size: 48px;
        text-align: center;
        color: #FFFFFF;
    }
    .home-menu-item_title{
        margin-top: 10px;
        color: #ffffff;
        font-size: 24px;
    }
    .home-menu-item_blef{
        position: absolute;
        right: 38px;
        top: 38px;
        text-align: center;
        background-color: #F7D073;
        color: #FF5D5A;
        border-radius: 100px;
        font-size: 24px;
        height: 36px;
        line-height: 36px;
        padding-left: 12px;
        padding-right: 12px;
    }
    .home-bill{
        flex-direction: row;
        -webkit-box-orient: horizontal;
        -webkit-box-direction: normal;
        height: 200px;
        color: #ffffff;
        background-color: #ffffff;
        width: 750px;
        align-items: center;
    }
    .home-bill-item{
        flex: 1;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        -webkit-box-orient: vertical;
        -webkit-box-direction: normal;
        -webkit-box-align: center;
        -webkit-box-pack: center;
        -webkit-box-flex: 1;
        margin-top: 30px;
        margin-bottom: 30px;
    }
    .home-bill-item_title{
        color: #333;
        font-size: 40px;
    }
    .home-bill-item_brief{
        color: #4a4a4a;
        font-size: 26px;
    }
    .list-top{
        padding-left: 32px;
        margin-top: 20px;
    }
    .border-right{
        border-right-width: 2px;
        border-right-color: #F6F6F6;
    }
    .cols_line{
        width: 2px;
        height: 60px;
        background-color: #F6F6F6;
    }
    .list-img{
        width: 36px;
        height: 36px;
        margin-right: 10px;
    }
    .text-desc{
        font-size: 24px;
        color: #666666;
        letter-spacing: -0.68px;
        padding-right: 5px;
    }
</style>
