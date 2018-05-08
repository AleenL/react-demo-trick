<template>
    <div>
        <div>
            <div :style="{height: barHeight + 'px'}"></div>
            <wxc-minibar title="经营数据统计" background-color="#ffffff" left-text=" "></wxc-minibar>
        </div>
        <scroller>
            <div style="width: 750px" class="border_t">
                <div class="tabTop">
                    <div class="container" @click="onclickitem(index, item.days)" v-for="(item, index) in tablist" :key="index">
                        <text :class="['tab-text',(item.active && 'tab-text-active')]" :style="{width: pwidth}" >{{item.title}}</text>
                    </div>
                    <div ref="tab-slider" class="slider" :style="{width: pwidth+'px', backgroundColor: '#FF847B', left: left+'px' }"></div>
                </div>
            </div>

            <div class="m_top30" >
                <div class="midtab bg_ff flex_row">
                    <div class="midtabItem flex_item border_l border_r" @click="staticdays(0)" :class="[activeItem === 0 ? 'activebor-bottom' : '']">
                        <text class="mtop t_center font_14 color_4a">{{textday}}营业额(元)</text>
                        <text class="t_center font_18 color_12">{{statistics.total_price.value}}</text>
                    </div>
                    <div class="midtabItem flex_item border_l border_r" @click="staticdays(1)" :class="[activeItem === 1 ? 'activebor-bottom' : '']">
                        <text class="mtop t_center font_14 color_4a">{{textday}}订单</text>
                        <text class="t_center font_18 color_12">{{statistics.order_total.value}}</text>
                    </div>
                    <div class="midtabItem flex_item border_l border_r" @click="staticdays(2)" :class="[activeItem === 2 ? 'activebor-bottom' : '']">
                        <text class="mtop t_center font_14 color_4a">客单价(元)</text>
                        <text class="t_center font_18 color_12">{{statistics.avg_price.value}}</text>
                    </div>
                </div>
                <div class="bg_f2 p_20" v-if="statistics.avg_price.items || statistics.order_total.items || statistics.total_price.items">
                    <div v-if="activeItem === 0" class="stabox m_top30" v-for="(totalinfos, index3) in statistics.total_price.items" :key="index3">
                        <div class="stacell"
                             :style="{width: (20+totalinfos.value) + 'px',backgroundColor: index3 === 0 ? '#FF2D4B' : '#AAAAAA'}">
                            <text class="text1">{{totalinfos.key_as_string}}</text>
                            <text class="text2">{{totalinfos.value_str}}</text>
                        </div>
                    </div>

                    <div v-if="activeItem === 1" class="stabox m_top30" v-for="(orderinfos, index2) in statistics.order_total.items" :key="index2">
                        <div class="stacell"
                             :style="{width: (200+orderinfos.value) + 'px',backgroundColor: index === 0 ? '#FF2D4B' : '#AAAAAA'}">
                            <text class="text1">{{orderinfos.key_as_string}}</text>
                            <text class="text2">{{orderinfos.value_str}}</text>
                        </div>
                    </div>

                    <div v-if="activeItem === 2" class="stabox m_top30" v-for="(avginfos, index) in statistics.avg_price.items" :key="index">
                        <div class="stacell"
                             :style="{width: (20+avginfos.value) + 'px',backgroundColor: index === 0 ? '#FF2D4B' : '#AAAAAA'}">
                            <text class="text1">{{avginfos.key_as_string}}</text>
                            <text class="text2">{{avginfos.value_str}}</text>
                        </div>
                    </div>
                </div>
            </div>
            <div class="overlayLoading" v-if="goodsLodingShow" :style="deviceHeight">
                <wxc-part-loading :show="goodsLodingShow" width="50px" height="50px"></wxc-part-loading>
            </div>
            <div class="empty" v-if="(!statistics.avg_price.items && activeItem === 2 && !goodsLodingShow) ||
                                     (!statistics.order_total.items &&activeItem === 1 && !goodsLodingShow) ||
                                     (!statistics.total_price.items  && activeItem === 0 && !goodsLodingShow)">
                <div class="empty-div">
                    <image class="empty-img" src="bmlocal://assets/empty-statistics.png"></image>
                    <text class="empty-text">暂时没有相关的数据</text>
                </div>
            </div>
        </scroller>
    </div>
</template>

<script>
    import { WxcMinibar, Utils, WxcPartLoading } from 'weex-ui'
    import { saleStatistics } from '../services/employee'
    const animation = weex.requireModule('animation')

    export default {
        components: { WxcMinibar, WxcPartLoading },
        data () {
            return {
                activeItem: 0,
                pwidth: 165,
                sheight: 500,
                left: 11.25,
                stacellwidth: 400,
                index: 0,
                daytype: 1,
                tablist: [
                    {
                        title: '今天',
                        days: 0,
                        active: true
                    },
                    {
                        title: '昨天',
                        days: 1,
                        active: false
                    },
                    {
                        title: '近7天',
                        days: 7,
                        active: false
                    },
                    {
                        title: '近30天',
                        days: 30,
                        active: false
                    }
                ],
                textday: '今天',
                statistics: '',
                avgshow: true,
                ordershow: false,
                totalshow: false,
                goodsLodingShow: false,
                barHeight: weex.config.env.statusBarHeight ? weex.config.env.statusBarHeight : 0
            }
        },
        created () {
            this.pwidth = (750 - 90) / this.tablist.length
            this.left = 45 / this.tablist.length
            this.sheight = Utils.env.getPageHeight()
            console.log(this.pwidth)
            this.goodsLodingShow = true
            this.getinfo(0)
        },
        methods: {
            getinfo (day) {
                saleStatistics({day: day}, (data) => {
                    console.log(data)
                    // this.statistics = data.data
                    setTimeout(() => {
                        this.statistics = data.data
                        this.goodsLodingShow = false
                    }, 300)
                })
            },
            onclickitem (e, day) {
                if (day === 0) {
                    this.textday = '今日'
                }
                if (day === 1) {
                    this.textday = '昨日'
                }
                if (day === 7) {
                    this.textday = '近7天'
                }
                if (day === 30) {
                    this.textday = '近30天'
                }
                this.tablist.forEach(function (obj, index) {
                    if (index === e) {
                        obj.active = true
                    } else {
                        obj.active = false
                    }
                })
                this.getinfo(day)
                let dist = 750 / this.tablist.length * e
                this.sliderAnimation(dist)
            },
            sliderAnimation (dist) {
                const containerEl = this.$refs[`tab-slider`]
                animation.transition(containerEl, {
                    styles: {
                        transform: `translateX(${dist}px)`
                    },
                    duration: 300,
                    timingFunction: 'ease-in-out',
                    delay: 0
                }, () => {
                })
            },
            staticdays (type) {
                this.activeItem = type
            }
        }
    }
</script>
<style scoped src="../common.css"></style>
<style scoped >
    .datainfo{
        background-color: #f2f2f2;
        width: 750px;
    }
    .tabTop{
        flex: 1;
        flex-direction: row;
        background-color: #ffffff;
        height: 80px;
    }
    .container{
        flex: 1;
        flex-direction: column;
        align-items:center;
        justify-content:center;
        /*height:56px;*/
        position: relative;
        color: #666666;
    }
    .tab-text {
        width: 100%;
        text-align: center;
        font-size:28px;
        color: #666666;
        line-height:80px;
    }
    .tab-text-active{
        width: 100%;
        color: #FF847B;
        line-height:80px;
    }
    .slider{
        position:absolute;
        content:" ";
        left:0;
        bottom:2px;
        height:6px;
        background-color:white;
        -webkit-transition:-webkit-transform .3s;
        transition:-webkit-transform .3s;
        transition:transform .3s;
        transition:transform .3s,-webkit-transform .3s;
    }
    .midtabItem{
        height: 180px;
    }
    .mtop{
        margin-top: 50px;
    }
    .activebor-bottom{
        border-bottom-color: #FFA641;
        border-bottom-width: 6px;
        border-bottom-style: solid;
    }
    .bg_redf{
        background-color: #FF2D4B;
    }
    .bg_aa{
        background-color: #AAAAAA;
    }
    .stabox{
        background-color: white;
    }
    .stacell{
        flex-direction: row;
        height: 68px;
        line-height: 68px;
        padding-right: 10px;
        padding-left: 10px;
    }
    .text1{
        flex: 1;
        text-align: left;
        line-height: 68px;
        color: white;
        font-size: 28px;
    }
    .text2{
        flex: 1;
        text-align: right;
        line-height: 68px;
        color: white;
        font-size: 28px;
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
</style>
