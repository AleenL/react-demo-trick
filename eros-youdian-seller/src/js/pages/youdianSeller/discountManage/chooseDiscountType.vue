<template>
    <div class="content">
        <!--<wxc-minibar title="优惠类型" background-color="#ffffff"></wxc-minibar>-->
        <scroller :style="scroll">
            <div class="wrap">
                <text class="text-desc">订单折扣</text>
                <discount :obj="discount1" ></discount>
            </div>
            <div class="wrap">
                <text class="text-desc">会员管理</text>
                <div class="body-wrap">
                    <discount :obj="discount2"></discount>
                    <discount :obj="discount3"></discount>
                </div>
            </div>
        </scroller>
    </div>
</template>

<script>
    import { WxcMinibar, Utils } from 'weex-ui'
    // import weexRouter from '../../util/weexRouter'
    export default {
        components: {
            WxcMinibar,
            discount: require('./DiscountType.vue')
        },
        data () {
            return {
                scroll: {
                    height: (Utils.env.getPageHeight() - 90) + 'px'
                },
                discount1: {
                    text1: '全场折扣',
                    text2: '全场订单8折，酒水不参加',
                    src: 'http://cdn.udian.me/discount.png',
                    fn: () => {
                        // weexRouter.push('/discount/createBenefit')
                        this.$router.open({
                            name: 'discountManage.createDiscount',
                            params: {
                                preferential_type: 1
                            }
                        })
                    }
                },
                discount2: {
                    text1: '特价商品',
                    text2: '指定时间段内特价商品',
                    src: 'http://cdn.udian.me/bargain.png',
                    fn: () => {
                        // weexRouter.push('/discount/createBenefit')
                        this.$router.open({
                            name: 'discountManage.createDiscount',
                            params: {
                                preferential_type: 2
                            }
                        })
                    }
                },
                discount3: {
                    text1: '相同商品第二份优惠',
                    text2: '指定商品可以享受第二份半价',
                    src: 'http://cdn.udian.me/halfPrice.png',
                    fn: () => {
                        // weexRouter.push('/discount/createBenefit')
                        this.$router.open({
                            name: 'discountManage.createDiscount',
                            params: {
                                preferential_type: 3
                            }
                        })
                    }
                }
            }
        }
    }
</script>

<style scoped>
    .content{
        background-color: #f2f2f2;
    }
    .wrap{
        margin-bottom: 36px;
        padding:0 28px ;
    }
    .text-desc{
        font-family: PingFangSC-Medium;
        font-size: 26px;
        height: 36px;
        line-height: 36px;
        color: #666666;
        letter-spacing: -0.66px;
        margin-top: 40px;
        margin-bottom: 26px;
    }
    .body-wrap{
        flex-direction: row;
        justify-content: space-between;
    }
</style>
