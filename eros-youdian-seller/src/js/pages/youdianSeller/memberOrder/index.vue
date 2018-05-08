<template>
    <div class="main">
        <!--<wxc-minibar title="用户列表" background-color="#FFFFFF" ></wxc-minibar>-->
        <scroller>
            <div class="wrap"
                 v-for="(list,index) in lists"
                 :key="index"
                 @click="go(list)"
            >
                <div class="box">
                    <div class="first_wrap1">
                        <text class="first_text ordingnumber"> {{list.order_sn}}</text>
                        <text class="first_text sendway">{{list.order_state_str}}</text>
                    </div>
                    <div class="first_wrap2">
                        <div class="second_text font1">
                            <text class="font1_text">{{list.order_title}}</text>
                            <text class="font1_text">￥{{list.real_pay_price}}</text>
                        </div>
                        <div class="second_text font2">
                            <text class="font2_text">{{list.confirm_time_str	}}</text>
                        </div>
                    </div>
                </div>
            </div>
        </scroller>
    </div>
</template>

<script>
    import {WxcMinibar} from 'weex-ui'
    import { getUserOrderList } from '../services/userOrder'
    export default {
        components: {
            WxcMinibar
        },
        data () {
            return {
                uid: '',
                lists: []
            }
        },
        created () {
            this.$router.getParams().then(data => {
                this.uid = data.uid
            })
            getUserOrderList ({uid: this.uid}, data => {
                this.lists = data.data.order
            })
        },
        methods: {
            go (o) {
                this.$router.open({
                    name: 'memberOrder.orderInfo',
                    params: {
                        order_sn: o.order_sn
                    }
                })
            }
        }
    }
</script>
<style>
    .main {
        width:750px;
        background-color: #F5F5F5;
    }
    .wrap{
        width:750px;
        height:260px;
        margin-bottom: 20px;
        justify-content: center;
        align-items: center;
        background-color: white;
    }
    .box{
        width:686px;
        height:260px;
    }
    .first_wrap1{
        height:96px;
        /*display: flex;*/
        flex-direction: row;
        align-items: center;
        justify-content: space-between;
        border-bottom-style: solid;
        border-bottom-width: 2px;
        border-bottom-color: #EEEEEE;
    }
    .first_text{
        height:40px;
    }
    .ordingnumber{
        color: #0B152C;
        font-size: 30px;
        border-left-width:6px;
        border-left-style:solid;
        border-left-color:#FF847B;
    }
    .sendway{
        color:#FF847B;
    }
    .first_wrap2{
        height:160px;
    }
    .second_text{
        height:80px;
        line-height: 80px;
    }
    .font1{
        font-size:30px;
        /*display: flex;*/
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
    }
    .font1_text{
        height:40px;
        color:#4A4A4A;
    }
    .font2{
        font-size: 28px;
        /*display: flex;*/
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
    }
    .font2_text{
        height:40px;
        color:#9B9B9B;
    }
</style>

