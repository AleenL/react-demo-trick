<template>
    <div class="wrapper">
        <div :style="{height: barHeight + 'px', backgroundColor: '#FF7470'}"></div>
        <!--<wxc-searchbar-->
            <!--:barStyle="{backgroundColor: '#FF7470'}"-->
            <!--ref="wxc-searchbar"-->
            <!--@wxcSearchbarCancelClicked="wxcSearchbarCancelClicked"-->
            <!--@wxcSearchbarInputReturned="wxcSearchbarInputReturned"-->
            <!--@wxcSearchbarInputOnInput="wxcSearchbarInputOnInput"-->
            <!--@wxcSearchbarCloseClicked="wxcSearchbarCloseClicked"-->
            <!--@wxcSearchbarInputOnFocus="wxcSearchbarInputOnFocus"-->
            <!--@wxcSearchbarInputOnBlur="wxcSearchbarInputOnBlur"-->
            <!--placeholder="搜索用户名/订单号"-->
        <!--&gt;</wxc-searchbar>-->
        <div class="wrap-input">
            <input class="inputs"
                   placeholder="搜索用户手机号/当日订单号"
                   placeholder-color="#ffffff"
                   type="text"
                   @input="wxcSearchbarInputOnInput"
                   @focus="inputFocus"
            >
            <text class="icon-search" >&#xe6de;</text>
        </div>
        <udot-tabtop :itemList="itemList" @tabTopItemOnClick="tabTopItemOnClick"></udot-tabtop>
        <list class="list" style="margin-bottom: 90px" v-if="orderList.length > 0">
            <!--<udot-order-item v-for="(item,index) in orderList" :key="index" :orderInfo="item"></udot-order-item>-->
            <cell v-for="(list, index) in orderList" :key="list._id" class="infos">
                <div class="user">
                    <div class="user-num">
                        <text class="un2">#</text>
                        <text class="un1">{{list.buy_num}}</text>
                    </div>
                    <div class="user-addresstime">
                        <text class="addr">{{list.address_info_str}}</text>
                        <text class="time">{{list.shop_order_state_str}}</text>
                    </div>
                    <div class="user-phone">
                        <image class="imgs" src="http://cdn.udian.me/gphone.png"></image>
                        <text class="username">{{list.buyer_name}}</text>
                    </div>
                </div>
                <div  class="order-list" >
                    <div v-for="(order,index) in list.item" :key="list._id + order._id + index" class="orderbox">
                        <image class="order-img" :src="order.img_path_url + '/' + order.goods_img" />
                        <div class="order-info" style="margin-left: 30px">
                            <text class="names">{{order.goods_name}}</text>
                            <text class="txma">{{order.goods_spec_str}}</text>
                            <text class="price">￥{{order.price}}</text>
                        </div>
                        <div class="times" style="padding-right: 20px;">
                            <text class="num">{{order.goods_num}}件</text>
                        </div>
                    </div>
                    <div class="ordermn">
                        <wxc-cell title="商品总数" style="color: #666666;font-size: 28px;height: 40px;padding-left: 0px"
                                  :has-arrow="false"
                                  :has-top-border="false"
                                  :has-bottom-border="false"
                        >
                            <text slot="value" style="font-size: 28px;color: #121C32;">{{list.goods_num}}件</text>
                        </wxc-cell>

                        <wxc-cell title="商家进帐" style="color: #666666;font-size: 28px;height: 40px;padding-left: 0px"
                                  :has-arrow="false"
                                  :has-top-border="false"
                                  :has-bottom-border="false"
                        >
                            <text slot="value" style="font-size: 36px;color: #F77F4F;">￥{{list.order_price}}</text>
                        </wxc-cell>
                    </div>
                    <div class="leaveword">
                        <text class="le">留言:{{list.order_note}}</text>
                    </div>
                </div>
                <div class="btn" v-if="type === 1">
                    <text class="btn1" @click="refuseOrderz({index, id: list._id})">拒单</text>
                    <text class="btn2 btBc" @click="receiveOrderz({index, id:list._id})">商家自送</text>
                </div>
                <div class="btn" v-if="type === 2">
                    <text class="btn2 btBc ml0" @click="deliveryOrderz({index, id: list._id})">确认送出</text>
                </div>
                <div class="btn" v-if="type === 3">
                    <text class="btn2 btBc ml0" @click="finishOrderz({index, id:list._id})">确认送达</text>
                </div>
                <div class="btn" v-if="type === 4">
                    <text class="btn2 btBc2 ml0">买家取消</text>
                </div>
                <div class="btn" v-if="type === 5">
                    <text class="btn2 btBc3 ml0"
                          @click="refundz({index, id:list._id})"
                    >同意退款</text>
                </div>
            </cell>
            <!--<div class="overlayLoading" v-if="goodsLodingShow" :style="deviceHeight">
                <wxc-part-loading :show="goodsLodingShow" width="50px" height="50px"></wxc-part-loading>
            </div>-->
            <!--page>1 && orderList.length>0-->
            <loading class="loading" @loading="onloading" :display="loadinging ? 'show' : 'hide'" v-if="needLoadFirst">
                <text class="indicator-text">{{loadingText}} ...</text>
                <loading-indicator class="indicator"></loading-indicator>
            </loading>
        </list>
        <div class="empty" v-else>
            <div class="empty-div">
                <image class="empty-img" v-if="type === 5" src="bmlocal://assets/empty-refund.png"></image>
                <image class="empty-img" v-else src="bmlocal://assets/empty-order.png"></image>
                <text class="empty-text" v-if="type === 1">暂时没有新的订单</text>
                <text class="empty-text" v-else-if="type === 5">暂时没有退款订单</text>
                <text class="empty-text" v-else>暂时没有相关订单</text>
            </div>
        </div>
        <div class="overlay" v-if="overlayShow" @click="overlayClick" ref="overlayRef"></div>
    </div>
</template>

<script>
    import { WxcCell, Utils, WxcSearchbar, WxcPartLoading } from 'weex-ui'
    import { sellerOrderOrderList, queryOrder, refuseOrder, finishOrder, refund, deliveryOrder, receiveOrder } from '../services/order'
    import udotTabtop from './TabTop.vue'
    import util from '../utils/util.js'
    var modal = weex.requireModule('modal')

    export default {
        name: 'checkOrder',
        components: { udotTabtop, WxcCell, WxcSearchbar, WxcPartLoading },
        data () {
            return {
                overlayShow: false,
                listHeght: {},
                loadingText: '加载更多',
                loadinging: false,
                value: '',
                height: 88,
                top: 0,
                page: 1,
                type: 1,
                itemList: [
                    {
                        title: '新订单',
                        icon: '\ue6f1',
                        active: true
                    },
                    {
                        title: '配货中',
                        icon: '\ue6f0',
                        active: false
                    },
                    {
                        title: '配送中',
                        icon: '\ue6ea',
                        active: false
                    },
                    {
                        title: '取消订单',
                        icon: '\ue6e9',
                        active: false
                    },
                    {
                        title: '售后退款',
                        icon: '\ue6f2',
                        active: false
                    }
                ],
                orderList: [],
                deviceHeight: {},
                // goodsLodingShow: false,
                barHeight: weex.config.env.statusBarHeight ?  weex.config.env.statusBarHeight : 0
            }
        },
        created () {
            util.initIconFont()

            this.listHeght = {
                height: (Utils.env.getPageHeight() - 336) + 'px'
            }
            console.log(1)
            console.log(this.orderList)
            this.getOrderList()
        },
        computed: {
            // 当list内容长度大于list长度时需要load
            needLoadFirst () {
                return this.orderList.length > 1
            },
            needLoadLast () {
                return this.loadingText === '加载更多'
            }
            // 当最后一次请求的数据已经是空时，不需要加载
        },
        methods: {
            // input focus
            inputFocus () {
                this.overlayShow = true
            },
            // overlay blur
            overlayClick () {
              this.overlayShow = false
              this.$refs['overlayRef'].blur()
            },
            // 拒单
            refuseOrderz (o) {
                refuseOrder({
                    order_id: o.id
                }, () => {
                    modal.toast({
                        message: '拒单成功'
                    })
                    this.orderList.splice(o.index, 1)
                })
            },
            // 接单
            receiveOrderz (o) {
                receiveOrder({order_id: o.id}, () => {
                    modal.toast({
                        message: '接单成功'
                    })
                    this.orderList.splice(o.index, 1)
                })
            },
            // 确认送出
            deliveryOrderz (o) {
                deliveryOrder({order_id: o.id}, () => {
                    modal.toast({
                        message: '确认送出'
                    })
                    this.orderList.splice(o.index, 1)
                })
            },
            // 确认送达，完成订单
            finishOrderz (o) {
                finishOrder({ order_id: o.id}, () => {
                    modal.toast({
                        message: '确认送达'
                    })
                    this.orderList.splice(o.index, 1)
                })
            },
            // 同意退款
            refundz (o) {
                refund({order_id: o.id}, () => {
                    modal.toast({
                        message: '已经退款'
                    })
                    this.orderList.splice(o.index, 1)
                })
            },
            // 查询订单,根据query的长度判断是否数据请求
            orderSearch (query) {
                // if (query.length !== 20) return
                queryOrder({ keywords: query, type: this.type}, (data) => {
                    this.orderList = data.data
                }, (data) => {
                    modal.toast({
                        message: data.msg
                    })
                })
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
                this.value = e.value
                this.orderSearch(this.value)
            },
            wxcSearchbarCancelClicked () {
                this.$refs['wxc-searchbar'].blur()
            },
            wxcSearchbarInputDisabledClicked () {
            },
            wxcSearchbarDepChooseClicked () {
            },
            tabTopItemOnClick (e) {
                // this.goodsLodingShow = true
                this.type = e + 1
                this.page = 1
                this.getOrderList()
            },
            getOrderList () {
                var self = this
                if (self.page !== 1) { this.loadinging = true }
                if (!this.needLoadLast) {
                    setTimeout(() => {
                        this.loadinging = false
                    }, 300)
                    return
                }
                sellerOrderOrderList({page: self.page, type: self.type}, (data) => {
                    if (self.page !== 1) {
                        if (data.data.length === 0) { this.loadingText = '没有更多' }
                        this.loadinging = false
                        self.orderList = [...self.orderList, ...data.data]
                    } else {
                        self.orderList = data.data
                    }
                }, () => {
                    this.loadinging = false
                })
            },
            clickPage (index) {
                console.log(index)
                self.type = index
            },
            onloading () {
                this.page += 1
                this.getOrderList()
            }
        }
    }

</script>

<style scoped >
    .wrapper{
        background-color: #f2f2f2;
        width: 750px;
    }
    .list {
        width: 750px;
    }
    .searchBox{
        background-color: #FC345C;
    }
    .scoll{
        flex: 1;
        background-color: #238FFF;
    }
    .infos{
        padding: 30px 24px;
        width: 750px;
    }
    .user{
        background-color: #FAFAFA;
        padding: 24px;
        flex-direction: row;
        position: relative;

    }
    .user-num{
        width: 108px;
        height: 76px;
        color: white;
        background-color: #FC345C;
        text-align: center;
        border-radius: 4px;
        position: relative;
    }
    .un1{
        font-size:40px;
        color: white;
        text-align: center;
        line-height: 76px;
    }
    .un2{
        position: absolute;
        top: 25px;
        left: 12px;
        font-size: 24px;
        color: white;
    }
    .user-addresstime{
        margin: 0px 24px;
    }
    .addr{
        width:400px;
        height:40px;
        line-height: 40px ;
        font-size: 28px;
        color: #666666;
        lines:1;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
    }
    .time{
        font-size: 24px;
        color: #666666;
    }
    .user-phone{
        position: relative;
        flex: 1;
        align-items: center;
    }
    .imgs{
        width:44px;
        height: 44px;
    }
    .username{
        font-size: 24px;
        color: #666666;
        width: 100px;
        text-align: center;
        lines: 1;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
    }
    .orderbox{
        flex-direction: row;
        /*padding-left: 20px;*/
        padding-top: 20px;
        padding-bottom: 20px;
        border-bottom-style: solid;
        border-bottom-width: 1px;
        border-bottom-color:#ececec
    }
    .order-list{
        background-color: white;
        padding-left: 24px;
    }
    .order-img{
        width: 132px;
        height: 132px;
        border-radius: 8px;
    }
    .order-info{
        flex-direction: column;
        text-align: justify;
        flex: 1;
    }
    .names{
        font-size: 28px;
        color:rgba(18,28,50,1);
        letter-spacing: 0;
        line-height:40px;
    }
    .txma{
        font-size:24px;
        color:rgba(91,91,91,1);
        line-height:34px;
    }
    .price{
        font-size:28px;
        color:rgba(247,127,79,1);
        line-height:40px;
        letter-spacing: -0.7px;
        margin-top: 20px;
    }
    .times{
        text-align: right;
        padding-top: 90px;
        font-size:28px;
        font-family:PingFangSC-Medium;
        color:rgba(18,28,50,1);
    }
    .ordermn{
        padding-top: 30px;
        padding-bottom: 30px;
        border-bottom-width: 1px;
        border-bottom-style: solid;
        border-bottom-color: #eeeeee;
    }
    .leaveword{
        background-color: #FAFAFA;
        margin-right: 20px;
        margin-top: 20px;
        margin-bottom: 20px;
        border-radius: 2px;
    }
    .le{
        height:80px;
        background:rgba(250,250,250,1);
        font-size: 28px;
        color: #666666;
        line-height: 80px;
        padding: 0px 20px;
    }
    .btn{
        flex-direction: row;
        padding: 20px 0px;
        /*margin-top: 20px;*/
    }
    .btn1{
        width: 210px;
        line-height: 80px;
        background-color: #FFFFFF;
        border: 1px solid #E7E7E7;
        border-radius: 4px;
        font-size: 32px;
        color: #4A4A4A;
        text-align: center;
    }
    .btn2{
        flex: 1;
        line-height: 80px;
        margin-left: 30px;
        border-radius: 4px;
        font-size: 32px;
        text-align: center;
    }
    .btBc {
        background-color: #FC345C;
        color: #ffffff;
    }
    .btBc2 {
        background-color: #ffffff;
        color: #c5c5c5
    }
    .btBc3 {
        background-color: #ffffff;
        color: #727272
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
    .ml0 {
        margin-left: 0px;
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
        width: 210px;
        height: 174px;
    }
    .empty-text{
        font-size:28px;
        color: #4A4A4A;
        line-height: 40px;
        margin-top: 40px;
    }
    .wrap-input{
        position: relative;
        padding-top: 20px;
        align-items: center;
        background-color: #FF7470;
    }
    .inputs{
        width:694px;
        height:60px;
        background-color: rgb(255, 140, 139);
        padding-left: 68px;
        color: #ffffff
    }
    .icon-search{
        font-family: iconfont;
        position: absolute;
        top: 34px;
        left: 48px;
        width: 30px;
        height: 30px;
        color: #fff
    }
    .overlay{
        position: fixed;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        background-color: rgba(0, 0, 0, 0);
    }
</style>
