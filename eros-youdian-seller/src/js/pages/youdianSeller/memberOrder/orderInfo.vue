<template>
    <scroller>
        <div class="main">
            <!--头像信息-->
            <div class="picture_wrap">
                <div class="picture_text picture_box">
                    <div class="picture">
                        <image class="picture_image" :src="src"></image>
                    </div>
                </div>
                <div class="picture_text">
                    <text class="person_name">{{person_name}}</text>
                </div>
                <div class="picture_text">
                    <text class="pay_money">¥{{pay_money}}</text>
                    <text class="ording_status" style="top:4px;">{{ording_status}}</text>
                </div>
            </div>

            <!--点的东西-->
            <div class="wrap" v-for="(detail,index) in details" :key="index">
                <div class="box">
                    <text class="text1 title">{{detail.goods_name}}</text>
                    <div class="box-right">
                        <text class="text1 number">x{{detail.goods_num}}</text>
                        <text class="text1 money">¥{{detail.goods_total_price}}</text>
                    </div>
                </div>
            </div>
            <!--配送费-->
            <div class="others_wrap">
                <div class="others_box">
                    <div class="other_div">
                        <div class="text1 other_left">
                            <div class="icon">
                                <image :src="srcicon1" class="icon_img"></image>
                            </div>
                            <text class="coupon">配送费</text>
                        </div>
                        <text class="text1 money">-￥{{distributionFeeMoney}}</text>
                    </div>

                    <div class="other_div">
                        <div class="text1 other_left">
                            <div class="icon">
                                <image :src="srcicon2" class="icon_img"></image>
                            </div>
                            <text class="coupon">优惠券</text>
                        </div>
                        <text class="text1 money">¥{{coupon_money}}</text>
                    </div>
                </div>
            </div>

            <!--实付-->
            <div class="wrap" style="margin-bottom: 20px;">
                <div class="box-end">
                    <text class="text1 money1">实付 -￥{{realPayment}}</text>
                </div>
            </div>

            <!--收货信息-->
            <div class="goods_wrap">
                <text class="goods_text goods_title">{{ReceiptInformation}}</text>
                <div class="goods_text goods_infro">
                    <text class="infro">{{ReceiptInformationName}}  {{ReceiptInformationTel}}</text>
                    <text class="infro">{{ReceiptInformationAddress}}</text>
                </div>
            </div>

            <div class="detail_wrap">
                <text class="detail_text goods_title">配送时间：</text>
                <text class="detail_text infro">{{ImmediateDelivery}}</text>
            </div>
            <div class="detail_wrap">
                <text class="detail_text goods_title">配送方式：</text>
                <text class="detail_text infro">{{MerchantDistribution}}</text>
            </div>

            <div class="detail_wrap" style="height:70px;">
                <text class="detail_text goods_title">订单编号：</text>
                <text class="detail_text infro">{{OrderNumber}}</text>
            </div>
            <div class="detail_wrap" style="height:70px;">
                <text class="detail_text goods_title">下单时间：</text>
                <text class="detail_text infro">{{OrderTime}}</text>
            </div>
            <div class="detail_wrap" style="height:70px;">
                <text class="detail_text goods_title">付款时间：</text>
                <text class="detail_text infro">{{PayTime}}</text>
            </div>
        </div>
    </scroller>
</template>
s
<script>
    import {WxcMinibar} from 'weex-ui'
    import { getUserOrderInfo } from "../services/userOrder";

    export default {
        components: {
            WxcMinibar
        },
        data () {
            return {
                details: [
                    {title: '大亨果茶1', number: 'x2', money: '117.2'},
                    {title: '大亨果茶2', number: 'x3', money: '7.2'},
                    {title: '大亨果茶3', number: 'x4', money: '7.2'},
                    {title: '大亨果茶4', number: 'x2', money: '7.2'}
                ],
                src: 'http://cdn.udian.me/1/-3-xbWGeyqYztcKBvLf7S5lFowDVPbF-.jpg',
                person_name: '小会',
                pay_money: '26.40',
                ording_status: '订单正在配送中',
                distributionFee: '配送费',
                distributionFeeMoney: '122.00',
                srcicon1: 'http://cdn.udian.me/1/-3-xbWGeyqYztcKBvLf7S5lFowDVPbF-.jpg',
                srcicon2: 'http://cdn.udian.me/1/-3-xbWGeyqYztcKBvLf7S5lFowDVPbF-.jpg',
                coupon: '优惠券',
                coupon_money: '26.40',
                realPayment: '7.7',
                ReceiptInformation: '收货信息：',
                ReceiptInformationName: '刘小会女士',
                ReceiptInformationTel: '18323626414',
                ReceiptInformationAddress: '英利国际1号楼 37-2',
                ImmediateDelivery: '立即配送',
                MerchantDistribution: '商家配送',
                OrderNumber: '340084324343',
                OrderTime: '2018-04-21 14:30:24',
                PayTime: '2018-04-21 15:30:24'
            }
        },
        created () {
          this.$router.getParams().then(params => {
            getUserOrderInfo({order_sn: params.order_sn}, (data) => {
              this.src = data.data.buyer_avatar
              this.person_name = data.data.buyer_name
              this.pay_money = data.data.real_pay_price
              this.realPayment = data.data.real_pay_price
              this.ording_status = data.data.order_state_str
              this.distributionFeeMoney =  data.data.delivery_price
              this.MerchantDistribution = data.data.delivery_str
              this.OrderNumber = data.data.order_sn
              this.OrderTime = data.data.confirm_time_str
              this.PayTime = data.data.pay_time_str ? data.data.pay_time_str : '未支付'
                this.coupon_money = data.data.coupon_discount ? data.data.coupan_discount : '0'
              this.delivery_time = data.data.delivery_time
              this.details = data.data.item
            })
          })
        },
        methods: {
        }
    }
</script>
<style>
    .main {
        background-color:#F5F5F5;
        width:750px;
    }
    .header{
        color:#1C1C20;
        font-size: 34px;
    }
    /*头像信息*/
    .picture_wrap{
        width:750px;
        padding-bottom:40px;
        border-bottom-color: #F1F1F1;
        border-bottom-style: solid;
        border-bottom-width: 4px;
        background-color:white;
        flex-direction: column;
    }
    .picture_text{
    }
    .person_name{
        color:#666666;
        font-size:28px;
        line-height: 56px;
        height:56px;
        text-align: center;
    }
    .pay_money{
        text-align:center;
        color:#0B152C;
        font-size:48px;
        height:70px;
        line-height:70px;
        margin-top:30px;
    }
    .ording_status{
        color:#4A4A4A;
        font-size:24px;
        height:34px;
        line-height:34px;
        text-align:center;

    }
    .picture_box{
        width:750px;
        height:76px;
        /*display: flex;*/
        flex-direction: column;
        justify-content: center;
        align-items: center;
    }
    .picture{
        width:76px;
        height:76px;
        background-color: orchid;
        border-radius:100px;
    }
    .picture_image{
        width:76px;
        height:76px;
        border-radius:100px;
    }
    /*点的饮料*/
    .wrap{
        width:750px;
        flex-direction: row;
        justify-content:flex-end;
        align-items:center;
        background-color: white;
    }
    .box{
        width:750px;
        height:80px;
        flex-direction: row;
        justify-content:space-between;
        align-items: center;
        padding-left: 26px;
        padding-right: 26px;
    }
    .box-right{
        width: 130px;
        flex-direction: row;
        justify-content:space-between;
        align-items: center;
    }
    .text1{
        height:96px;
        line-height: 96px;
        font-size: 28px;
    }
    .title{
        color:#666666;
    }
    .number{
        color:#A9A9A9;
        font-size: 24px;
        text-align: right;
        height: 40px;
        line-height: 40px;
        margin-right: 20px;
    }
    .money{
        color:#0B152C;
        font-size: 28px;
        text-align: right;
        height: 40px;
        line-height: 40px;
    }
    /*配送费*/
    .others_wrap{
        width:750px;
        background-color: white;
        flex-direction: row;
        align-items: center;
        justify-content: flex-end;
    }
    .others_box{
        width:724px;
        border-bottom-color:#F5F5F5;
        border-bottom-width: 2px;
        border-bottom-style: solid;
        border-top-color:#F5F5F5;
        border-top-width: 2px;
        border-top-style: solid;
    }
    .other_div{
        width:724px;
        height:100px;
        display:flex;
        flex-direction: row;
        align-items: center;
        justify-content: space-between;
        padding-right: 26px;
    }
    .other_left{
        height:32px;
        flex-direction: row;
        align-items: center;
        justify-content: flex-start;
    }
    .icon{
        width:32px;
        height:32px;
    }
    .coupon{
        color:#666666;
        font-size:28px;
        left:30px;
        height:32px;
    }
    .box-end{
        width: 750px;
        padding-right: 26px;
        flex-direction: row;
        align-items: center;
        justify-content: flex-end;
    }
    .icon_img{
        width:32px;
        height:32px;
    }
    /*实付*/
    .money1{
        color:#0B1021;
        font-size: 28px;
    }
    /*收货信息*/
    .goods_wrap{
        width:750px;
        height:140px;
        background-color: white;
        flex-direction: row;
        align-items: center;
        justify-content: flex-start;
    }
    .goods_text{
        height:100px;
    }
    .goods_title{
        width:170px;
        left:26px;
        color:#A9A9A9;
        font-size: 28px;
    }
    .goods_infro{
        width:580px;
        /*display: flex;*/
        flex-direction: column;
    }
    .infro{
        flex: 1;
        color:#0B152C;
        font-size: 28px;
        left:20px;
    }

    /*配送时间*/
    .detail_wrap{
        height:80px;
        width:750px;
        flex-direction: row;
        align-items: center;
        justify-content: flex-start;
        background-color: white;
    }
    .detail_text{
        height:40px;
    }

</style>

