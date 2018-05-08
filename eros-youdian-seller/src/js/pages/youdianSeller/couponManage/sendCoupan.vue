<template>
    <div class="coupanlist">
        <scroller>
            <div class="content">
                <div class="coipanc">
                    <!--<coupan :coupan="coupan" v-for="(coupan) in coupanlisting" :key="coupan._id" @goinfo="goinfo(coupan._id, coupan.amount, coupan.title, coupan.use_attribute_str, coupan.validity_time_str)"></coupan>-->
                    <div class="coupan fr " v-for="(coupan, index) in coupanlisting" :key="coupan._id" @click="goinfo(coupan._id, coupan.amount, coupan.title, coupan.use_attribute_str, coupan.validity_time_str)">
                        <div class="fr price-box">
                            <text class="cf fs20" style="margin-top:15px">￥</text>
                            <text class="price cf">{{coupan.amount}}</text>
                        </div>
                        <div class="toprdios"></div>
                        <div class="bottomrdios"></div>
                        <div class="time-box1">
                            <text class="name c6">{{coupan.title}}</text>
                            <text class="time c6">{{coupan.use_attribute_str}}</text>
                            <text class="time c6">{{coupan.validity_time_str}}</text>
                        </div>
                        <!--<text class="edit-good iconfont" :style="chooseIconObj" @click="iconClick(index, coupan)">&#xe6f7;</text>-->
                    </div>
                </div>
            </div>
        </scroller>
        <div class="footer">
            <div class="footer-item" @click="go">
                <image style="width:36px;height:36px" src="http://cdn.udian.me/addDiscount.png"></image>
                <text class="text-desc">添加优惠券</text>
            </div>
        </div>
    </div>
</template>

<script>
    import { WxcMinibar } from 'weex-ui'
    import coupan from './Coupon'
    import { usergGetMchCouponsForPage } from '../services/user'
    export default {
        components: { WxcMinibar, coupan },
        data () {
            return {
                checkIndex: 0,
                page: 1,
                type: 1,
                coupanlisting: [],
                sendcoupanlist: [],
                chooseIcon: false
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
        },
        created () {
            this.$event.on('addcouponinfo', params => {
                this.$router.refresh()
            })
            this.getList()
        },
        methods: {
            getList () {
                usergGetMchCouponsForPage({ page: this.page, type: 1}, (data) => {
                    this.coupanlisting = data.data
                })
            },
            goinfo (id, amount, title, attribute, time) {
                this.$router.getParams('coupantype').then(resData => {
                    if (resData.coupantype) {
                        this.$event.emit('getsendCoupan', {
                            coupanid: id,
                            coupan_price: amount,
                            coupan_name: title,
                            coupan_needPrice: attribute,
                            coupan_time: time
                        })
                        this.$router.back()
                    } else {
                        this.$router.open({
                            name: 'couponManage.couponinfo',
                            params: { coupanid: id}
                        })
                    }
                })
            },
            go () {
                this.$router.open({
                    name: 'couponManage.addCouponinfo'
                })
            },
            iconClick (index, e) {
                this.chooseIcon = !this.chooseIcon
                this.sendcoupanlist.push(e)
                console.log(this.sendcoupanlist)
                // if () {}
                // var chooseIndexid = this.sendcoupanlist[index]._id
                // console.log(index)
                // console.log('传入：'+e._id)
                // if (chooseIndexid === e._id) {
                //     this.sendcoupanlist[index].splice(index, 1)
                // }
            },
        }
    }
</script>

<style scoped>
    .iconfont {
        font-family: iconfont;
        color: #fff;
    }
    .edit-good{
        position: absolute;
        width: 38px;
        height: 38px;
        right: 20px;
        bottom: 50px;
    }
    .coupanlist{
        background-color: #ffffff;
    }
    .content{
        /*padding: 30px 24px;*/
    }
    .topbarc{
        padding: 15px 20px;
        border-bottom-width: 1px;
        border-bottom-style: solid;
        border-bottom-color: #e4e4e4;
    }
    .coipanc{
        padding: 0px 32px;
    }

    .heador-content{
        width: 710px;
        border-color:#FE5282;
        border-style: solid;
        border-width: 2px;
        border-radius: 4px;
        flex-direction: row;
        align-items: center;
    }
    .wrap{
        width: 750px;
        flex-direction: row;
        justify-content: center;
        margin-top: 27px;
    }
    .text-box{
        flex: 1;
        font-family: PingFangSC-Medium;
        font-size: 28px;
        height: 56px;
        line-height: 56px;
        color: #FE5383;
        letter-spacing: -0.68px;
        text-align: center;
    }
    .active{
        background-color: #FE5383;
        color:#fff;
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
    .coupan{
        height: 176px;
        background-color: #F7F8FA;
        margin-bottom: 20px;
    }
    .fr{
        flex-direction: row;
    }
    .hc{
        justify-content: center;
        margin: 20px 0;
    }
    .bt{
        background-color: #fd3e69;
        width: 300px;
    }
    .price-box{
        align-items: center;
        padding-left:30px;
        width: 174px;
        border-right-width: 1px;
        border-right-style: dashed;
        border-right-color: #e4e4e4;
        position: relative;
    }
    .toprdios{
        width: 30px;
        height: 30px;
        background-color: white;
        border-radius: 50%;
        position: absolute;
        top: -18px;
        left: 160px;
        border-bottom-width: 1px;
        border-bottom-style: solid;
        border-bottom-color: #e4e4e4;
    }
    .bottomrdios{
        width: 30px;
        height: 30px;
        background-color: white;
        border-radius: 50%;
        position: absolute;
        bottom: -18px;
        left: 160px;
        border-top-width: 1px;
        border-top-style: solid;
        border-top-color: #e4e4e4;
    }
    .c6{
        color: #666666;
    }
    .cf{
        color: #F2693F;
    }
    .fs20{
        font-size: 30px;
        font-weight: bold;
    }
    .price{
        font-size: 64px;
        /*margin-top: -22px;*/
    }
    .time-box1{
        padding-left: 30px;
    }
    .name{
        font-size: 28px;
        margin: 20px 0;
    }
    .time{
        font-size:24px;
        margin-bottom: 8px;
    }
</style>
