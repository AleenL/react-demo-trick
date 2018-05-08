<template>
    <div class="coupanlist">
        <!--<wxc-minibar title="创建优惠券" background-color="#ffffff">-->
        <!--<text slot="right" class="text-right" @click='addinfo'>保存</text>-->
        <!--</wxc-minibar>-->
        <scroller>
            <div class="content">
                <div class="coipanc bg_white">
                    <!--<coupan :coupan="coupan" v-for="(coupan, index) in coupanlist" :key="index"></coupan>-->

                    <div class="coupan fr">
                        <div class="fr price-box">
                            <text class="c6 fs20" style="margin-top:15px">￥</text>
                            <text class="price c6">{{C_edu || '50'}}</text>
                        </div>
                        <div class="toprdios"></div>
                        <div class="bottomrdios"></div>
                        <div class="time-box">
                            <text class="name c6">{{C_name || '优惠券'}}</text>
                            <!--<text class="time c6">{{coupanlist.use_attribute_str}}</text>-->
                            <text class="time c6" v-if='!isuse'>无门槛</text>
                            <text class="time c6" v-if='isuse'>订单满{{C_price || '12'}}元可用</text>
                            <text class="time c6" v-if="validity_type==1">有效期  {{start_time || '2018' }}至{{end_time || '2018'}}</text>
                            <text class="time c6" v-if="validity_type==2">有效期  {{validity_day || '30'}} 天</text>

                        </div>
                    </div>

                </div>
                <div class="addinfo">
                    <div class=" bg_white padding_left_32">
                        <wxc-cell class="cell" :has-bottom-border="true" label="代金券名称" :cell-style="cellStyleObj">
                            <input type="text"
                                   placeholder="最大10个汉字"
                                   maxlength="10"
                                   v-model='C_name' style="width: 360px;text-align: right">
                        </wxc-cell>
                        <wxc-cell :has-bottom-border="false" class="cell" label="金额" :cell-style="cellStyleObj">
                            <input type="number" style="width: 360px;text-align: right" v-model='C_edu' maxlength="3"  placeholder="请输入整,例：10">
                        </wxc-cell>
                    </div>
                    <div class="mtb bg_white padding_left_32">
                        <wxc-cell :cell-style="cellStyleObj" :has-bottom-border="false" :has-arrow="true" @wxcCellClicked="wxcCellClicked" :class="['cell',(isuse && 'b_b')]">
                            <text class="text-label" slot="label" >使用条件</text>
                            <text slot="value" v-if='!isuse' class="text-desc pr28">无门槛</text>
                            <text slot="value" v-if='isuse' class="text-desc pr28">有门槛</text>
                        </wxc-cell>
                        <div v-if="isuse">
                            <wxc-cell :cell-style="cellStyleObj" class="cell" label="金额门槛">
                                <div class="fr">
                                    <text class="text-desc">满</text>
                                    <input type="n1umber" placeholder="请输入"maxlength="5" v-model='C_price' style="width: 100px;font-size: 28px" >
                                    <text class="text-desc">元可用</text>
                                </div>
                            </wxc-cell>
                            <wxc-cell :cell-style="cellStyleObj" :has-bottom-border="false" class="cell" label="分类门槛" :has-arrow="true" @wxcCellClicked="classf">
                                <div class="fr">
                                    <text class="text-desc">{{cate_name}}</text>
                                    <!--<text class="text-desc">新鲜水果等</text>-->
                                    <!--<text class="text-desc fruitNumber">6</text>-->
                                    <!--<text class="text-desc">个分类</text>-->
                                </div>
                            </wxc-cell>
                        </div>
                    </div>
                    <div class="bg_white padding_left_32">
                        <wxc-cell :cell-style="cellStyleObj" class="cell" :has-bottom-border="true " :has-arrow="true" @wxcCellClicked="changevalidity_type">
                            <text class="text-label" slot="label">有效期</text>
                            <text v-if="validity_typeckeched" slot="value" class="text-desc pr28">固定有效期</text>
                            <text v-if="!validity_typeckeched" slot="value" class="text-desc pr28">相对有效期</text>
                        </wxc-cell>
                        <wxc-cell :cell-style="cellStyleObj" :has-bottom-border="false " class="cell" label="日期范围">
                            <div class="fr" v-if="!validity_typeckeched">
                                <text class="text-desc">领券后当天有效，有效期</text>
                                <input type="tel" placeholder="请输入" v-model='validity_day'  style="width: 100px;font-size: 28px " maxlength="3">
                                <text class="text-desc">天</text>
                            </div>
                            <div class="fr" v-if="validity_typeckeched" @click="showReturnCalendar">
                                <text class="text-desc" v-if="!start_time && !end_time">请选择</text>
                                <text class="text-desc" style="color: #121C32" v-if="start_time && end_time">{{start_time +'至'+ end_time}}</text>
                            </div>
                            <!--<div class="fr" v-if="validity_type==2">-->
                            <!--&lt;!&ndash;<input type="time" placeholder="请选择有效期" v-model='validity_day'  style="width: 400px" maxlength="3">&ndash;&gt;-->
                            <!--<text class="text-desc" @click="showReturnCalendar">有效期</text>-->
                            <!--<text class="text-desc">{{formatCurrentDate}}</text>-->
                            <!--<wxc-page-calendar :date-range="dateRange"-->
                            <!--:animationType="animationType"-->
                            <!--:selected-date="selectedDate"-->
                            <!--:selected-note="selectedNote"-->
                            <!--:is-range="isRange"-->
                            <!--:minibar-cfg="minibarCfg"-->
                            <!--@wxcPageCalendarBackClicked="wxcPageCalendarBackClicked"-->
                            <!--@wxcPageCalendarDateSelected="wxcPageCalendarDateSelected"-->
                            <!--ref="wxcPageCalendar"></wxc-page-calendar>-->
                            <!--</div>-->
                        </wxc-cell>
                    </div>
                </div>
            </div>
        </scroller>
    </div>
</template>

<script>
    import { WxcMinibar, WxcIcon, WxcPageCalendar, WxcCell } from 'weex-ui'
    import coupan from './Coupon'
    import { userAddMchCoupon } from '../services/user'
    const picker = weex.requireModule('picker')

    export default {
        components: { WxcMinibar, WxcIcon, coupan, WxcPageCalendar, WxcCell },
        data () {
            return {
                animationType: 'push',
                currentDate: '',
                selectedDate: '',
                isRange: true,
                calendarTitle: '选择日期',
                dateRange: ['2018-03-14', '2018-06-10'],
                selectedNote: ['开始', '结束'],
                minibarCfg: {
                    title: '日期选择',
                    backgroundColor: '#fff'
                },
                coupanlist: {
                    price: '10',
                    name: '优惠券名称1',
                    needPrice: '50',
                    timeStart: '早上',
                    timeEnd: '晚上',
                    bt: false,
                    condition: false
                },
                isuse: false,
                C_name: '',
                C_edu: '',
                is_limit: 1,
                C_price: '',
                limit_type: '',
                validity_typeckeched: true,
                validity_type: 1,
                validity_type11: 1,
                validity_day: '',
                start_time: '',
                end_time: '',
                cate_name: '',
                cate_pid: '',
                value: '',
                cellStyleObj:{paddingLeft:'0',height:'100px',paddingRight: '32px'}
            }
        },
        computed: {
            // // 日期范围
            // formatCurrentDate () {
            //     if (this.currentDate) {
            //         return this.currentDate[0] + '到' + this.currentDate[1]
            //     } else {
            //         return '请选择'
            //     }
            // },
            // start_time () {
            //     return (Date.parse(new Date(this.currentDate[0])) / 1000).toString()
            // },
            // end_time () {
            //     return (Date.parse(new Date(this.currentDate[1])) / 1000).toString()
            // }
        },
        created () {
            this.$navigator.setRightItem({
                text: '保存',                             // 展示的文字 (和图片 二选一)
                textColor: '#FE5383',                    // 文字颜色 (默认为白色)
                fontSize: '32',                         // 字号（默认32px）
                fontWeight: 'normal',                   // 是否加粗（默认不加粗）
            }, () => {
                // 点击回调
                this.addinfo()
            })
            this.$event.on('classCoupan', params => {
                this.cate_name = params.cate_name
                this.cate_pid = params.cate_pid
            })
            this.$event.on('gettime', params => {
                this.start_time = params.start_time
                this.end_time = params.end_time
            })
            this.init()
        },
        methods: {
            pickTime () {
                picker.pickDate({
                    value: this.value
                }, event => {
                    if (event.result === 'success') {
                        this.value = event.data
                    }
                })
            },
            tabTopItemOnClick (e) {
                console.log(e)
            },
            wxcCellClicked () {
                var self = this
                self.isuse = !self.isuse
                if (self.isuse === false) {
                    self.is_limit = 1
                    self.C_price = ''
                    self.cate_name = ''
                    self.cate_pid = ''
                } else {
                    self.is_limit = 2
                }
            },
            classf () {
                this.$router.open({
                    name: 'classifyGoods',
                    params: {coupantype: true}
                })
            },
            changevalidity_type () {
                var self = this
                self.validity_typeckeched = !self.validity_typeckeched
                if (self.validity_typeckeched) {
                    self.validity_type = 1
                    self.validity_day = ''
                } else {
                    self.validity_type = 2
                    self.start_time = ''
                    self.end_time = ''
                }
                console.log(self.validity_type)
            },
            addinfo () {
                var self = this
                if (!self.C_name) {
                    this.$notice.toast({
                        message: '请输入代金券名称',
                    })
                } else if (!self.C_edu) {
                    this.$notice.toast({
                        message: '请输入金额',
                    })
                } else if (self.is_limit === 2  && !self.C_price) {
                    this.$notice.toast({
                        message: '请设置优惠券使用门槛',
                    })
                } else if (self.validity_type === 2  && !self.validity_day) {
                    this.$notice.toast({
                        message: '请设置优惠券有用天数',
                    })
                } else if (self.validity_type === 1 && !self.start_time) {
                    this.$notice.toast({
                        message: '请设置优惠券开始时间',
                    })
                } else if (self.validity_type === 1 && !self.end_time) {
                    this.$notice.toast({
                        message: '请设置优惠券结束时间',
                    })
                } else {
                    userAddMchCoupon({
                        title: self.C_name,
                        amount: self.C_edu,
                        is_limit: self.is_limit,
                        limit_price: self.C_price,
                        limit_type: self.limit_type,
                        validity_type: self.validity_type,
                        validity_day: self.validity_day,
                        start_time: (Date.parse(new Date(this.start_time)) / 1000).toString(),
                        end_time: (Date.parse(new Date(this.end_time)) / 1000).toString()
                    }, (data) => {
                        this.$notice.toast({
                            message: data.msg,
                        })
                        this.$event.emit('addcouponinfo', {})
                        this.$router.back()
                        // this.$router.open({
                        //     name: 'couponManage'
                        // })
                    })
                }

            },
            wxcPageCalendarDateSelected (e) {
                this.selectedDate = e.date
                this.currentDate = e.date
            },
            wxcPageCalendarBackClicked () {
            },
            showReturnCalendar () {
                this.$router.open({
                    name: 'vipCardList.ChooseTime'
                })
                // this.isRange = true
                // setTimeout(() => {
                //     this.$refs['wxcPageCalendar'].show()
                // }, 10)
            }
        }
    }
</script>

<style scoped>
    .coupanlist{
        background-color: #F2F2F2;
    }
    .text-right{
        font-size:32px;
        color: #FE5383;
    }
    .bg_white{
        background-color: white;
    }
    .b_b{
        border-bottom-width: 1px;
        border-bottom-style: solid;
        border-bottom-color: #e4e4e4;
    }
    input{
        outline: none;
        font-size: 28px;
    }
    .cell{
        padding-left: 0px !important;
        /*height: 80px !important;*/
    }
    .content{
        margin-top: -5px;
        /*padding: 30px 0px;*/
    }
    .coipanc{
        padding: 17px 24px;
        padding-top: 0px;
        border-bottom-width: 1px;
        border-bottom-style: solid;
        border-bottom-color: #e4e4e4;
    }
    .coupan{
        height: 176px;
        /*padding:0 32px;*/
        background-color: #F7F8FA;
        margin-top: 22px;
        border: 1px solid #e4e4e4;
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
    .time-box{
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

    .addinfo{
        /*padding-left: 32px;*/
        /*box-sizing: border-box;*/
    }
    .mtb{
        margin: 20px 0;
    }
    .m_top20{
        margin-top: 20px
    }
    .p_left{
        padding-left: 24px;
        box-sizing: border-box;
    }
    .text-label{
        font-size: 28px;
        height: 40px;
        line-height: 40px;
        color: #121C32;
        padding-left: 16px;
        border-left-width: 8px;
        border-left-style: solid;
        border-left-color: #FF847B;
    }
    .text-desc{
        font-size: 30px;
        color: #7c7c7c;
        letter-spacing: -0.34px;
        padding-right: 5px;
    }
    .fr{
        flex-direction: row;
        align-items: center;
    }
    .fruitNumber{
        color: #FE5383;
    }
    .pr28{
        padding-right: 28px;
    }
    .padding_left_32{
        padding-left: 32px;
    }
</style>
