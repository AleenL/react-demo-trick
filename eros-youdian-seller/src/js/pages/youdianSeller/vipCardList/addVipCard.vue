<template>
    <div class="content">
        <scroller>
            <div class="" style="padding: 60px 0px;align-items: center;">
                <vip-card :card="card"></vip-card>
            </div>
            <div class="mt cs_l">
                <wxc-cell style="padding-left: 0px;" label="卡面背景"  :has-arrow="false">
                    <div slot="value" class="cardcl card-bg1" @click='bgclick(1)'>
                        <text class="posit" :style="{left: left}"></text>
                    </div>
                    <div slot="value" class="cardcl card-bg2" @click='bgclick(2)'></div>
                    <div slot="value" class="cardcl card-bg3" @click='bgclick(3)'></div>
                    <div slot="value" class="cardcl card-bg4" @click='bgclick(4)'></div>
                    <div slot="value" class="cardcl card-bg5" @click='bgclick(5)'></div>
                </wxc-cell>
                <wxc-cell class="cell" label="会员卡名称" :has-bottom-border="false" :has-arrow="false">
                    <input type="text" placeholder="请输入名称" v-model="card.title" slot="value" style="width: 360px;text-align: right">
                </wxc-cell>
            </div>
            <div class="mt cs_l">
                <wxc-cell class="cell">
                    <div slot="label" class="fr">
                        <div class="vBar"></div>
                        <text class="text-label">优惠方式</text>
                    </div>
                    <div slot="value" class="fr">
                        <div class="fr" @click="ridiock(1)">
                            <image v-if="rediotypechecked" class="image" src="http://cdn.udian.me/circleChecked.png"></image>
                            <image v-if="rediotypenochecked" class="image" src="http://cdn.udian.me/circle.png"></image>
                            <text class="text-image pr40">整单优惠</text>
                        </div>
                        <div class="fr" @click="ridiock(2)">
                            <image v-if="!rediotypechecked" class="image" src="http://cdn.udian.me/circleChecked.png"></image>
                            <image v-if="!rediotypenochecked" class="image" src="http://cdn.udian.me/circle.png"></image>
                            <text class="text-image">会员价</text>
                        </div>
                    </div>
                </wxc-cell>
                <wxc-cell class="cell" label="会员折扣" v-if="rediotypechecked">
                    <div slot="value" class="fr">
                        <input type="number" maxlength="2" placeholder="例填写90表示打9折" v-model='card.discount'  style="width: 360px;text-align: right">
                        <text style="font-size: 28px;height: 40px;line-height: 40px;padding-top: 5px">%</text>
                    </div>
                </wxc-cell>
                <wxc-cell class="cell" label="开卡送积分">
                    <input type="number" slot="value" v-model='card.give_point_num' placeholder="请输入积分数量" style="width: 360px;text-align: right">
                </wxc-cell>
                <wxc-cell class="cell" label="送优惠券" :has-bottom-border="true" :has-arrow="true" @wxcCellClicked="senCoupan">
                    <text v-if="!card.give_coupon_num" class="text-desc">请选择</text>
                    <text v-if="card.give_coupon_num" class="text-desc">{{card.give_coupon_num}}张</text>
                </wxc-cell>
                <div v-if="give_coupon" style="padding: 20px;background-color: white">
                    <div class="coupan fr ">
                        <div class="fr price-box">
                            <text class="cf fs20" style="margin-top:15px">￥</text>
                            <text class="price cf">{{coupan_price}}</text>
                        </div>
                        <div class="toprdios"></div>
                        <div class="bottomrdios"></div>
                        <div class="time-box1">
                            <text class="name c6">{{coupan_name}}</text>
                            <text class="time c6">{{coupan_needPrice}}</text>
                            <text class="time c6">{{coupan_time}}</text>
                        </div>
                    </div>
                </div>
            </div>
            <div class="mt cs_l">
                <wxc-cell class="cell" :has-arrow="true" @wxcCellClicked="changevalidity_type">
                    <div slot="label" class="fr">
                        <div class="vBar"></div>
                        <text class="text-label">有效期</text>
                    </div>
                    <text v-if="validity_typeckeched" slot="value" class="text-desc pr28">固定有效期</text>
                    <text v-if="!validity_typeckeched" slot="value" class="text-desc pr28">相对有效期</text>
                </wxc-cell>
                <wxc-cell class="cell" :has-bottom-border="false" label="日期范围">
                    <div class="fr" v-if="!validity_typeckeched">
                        <text class="text-desc">领券后当天有效</text>
                        <input type="number" placeholder="请输入" v-model='card.validity_day'  style="width: 100px;font-size: 28px;text-align: center" maxlength="3">
                        <text class="text-desc">天有效</text>
                    </div>
                    <div class="fr" v-if="validity_typeckeched" @click="showReturnCalendar">
                        <text class="text-desc" v-if="!start_time && !end_time">请选择</text>
                        <text class="text-desc" style="color: #121C32" v-if="start_time && end_time">{{start_time +'至'+ end_time}}</text>
                    </div>
                </wxc-cell>
            </div>
        </scroller>
    </div>
</template>

<script>
    import { WxcMinibar, WxcCell, WxcPageCalendar } from 'weex-ui'
    import { userAddMchCard, userGetMchCard, userEditMchCard } from '../services/user'
    const picker = weex.requireModule('picker')

    export default {
        components: {
            WxcMinibar,
            WxcCell,
            WxcPageCalendar,
            vipCard: require('./VipCard.vue'),
        },
        data () {
            return {
                vip_id: '',
                title: '',
                color: '',
                type: 1,
                rediotypechecked: true,
                rediotypenochecked: false,
                rediotype1: 1,
                rediotype2: 2,
                discount: '',
                give_point_num: '',
                give_coupon: '',
                validity_type: 1,
                validity_typeckeched: true,
                validity_day: '',
                start_time: '',
                end_time: '',
                coupan_price: 10,
                coupan_name: '优惠券名称',
                coupan_needPrice: 50,
                coupan_time: '2018.01.22',
                card: {
                    _id: '',
                    title: '',
                    give_coupon_num: '',
                    give_point_num: '',
                    validity_time_str: '',
                    validity_day: '',
                    discount_str: '',
                    color: 'http://cdn.udian.me/05.png',
                    info: true
                },
                left: 14
            }
        },
        computed: {
            // 日期范围
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
            this.$router.getParams().then(params => {
                if (params.editinfos) {
                    // this.$navigator.setCenterItem({
                    //     text: '编辑会员卡'
                    // })
                    this.vip_id = params.edvipid
                    // this.getinfoByid(params.edvipid)
                    this.card = params.cardInfo

                    var Time =new Date(parseInt(params.cardInfo.start_time) *1000)
                    var y = Time.getFullYear()
                    var m = Time.getMonth() + 1 > 9 ? Time.getMonth() + 1 : '0' + (Time.getMonth() + 1)
                    var day = Time.getDate() > 9 ? Time.getDate() : '0' + Time.getDate()
                    this.start_time = y + '-' + m + '-' + day
                    var Time1 =new Date(parseInt(params.cardInfo.end_time) *1000)
                    var y1 = Time1.getFullYear()
                    var m1 = Time1.getMonth() + 1 > 9 ? Time1.getMonth() + 1 : '0' + (Time1.getMonth() + 1)
                    var day1 = Time1.getDate() > 9 ? Time1.getDate() : '0' + Time1.getDate()
                    this.end_time = y1 + '-' + m1 + '-' + day1
                    if (this.end_time === '1970-01-01' || this.this.start_time === '1970-01-01') {
                        this.start_time = ''
                        this.end_time = ''
                    }

                    this.type = params.cardInfo.type
                    if(this.type == 1){
                        this.rediotypechecked = true
                        this.rediotypenochecked = false
                    } else {
                        this.rediotypechecked = false
                        this.rediotypenochecked = true
                    }
                    this.validity_type = params.cardInfo.validity_type
                    if(this.validity_type == 1){
                        this.validity_typeckeched = true
                    } else {
                        this.validity_typeckeched = false
                    }
                    // this.card.title = params.cardInfo.title
                    // this.card.validity_time_str = params.cardInfo.validity_time_str
                    // this.card.give_point_num = params.cardInfo.give_point_num
                    // this.card.give_coupon_num = params.cardInfo.give_coupon_num
                }
            })
            this.$navigator.setRightItem({
                text: '保存',                             // 展示的文字 (和图片 二选一)
                textColor: '#FE5383',                    // 文字颜色 (默认为白色)
                fontSize: '32',                         // 字号（默认32px）
                fontWeight: 'normal',                   // 是否加粗（默认不加粗）
            }, () => {
                this.addinfo()
            })
            this.$event.on('getsendCoupan', params => {
                if(params.coupanid) {
                    this.card.give_coupon_num = 1
                }
                this.give_coupon = params.coupanid
                this.coupan_price = params.coupan_price,
                this.coupan_name = params.coupan_name,
                this.coupan_needPrice = params.coupan_needPrice,
                this.coupan_time = params.coupan_time
            })
            this.$event.on('gettime', params => {
                this.start_time = params.start_time
                this.end_time = params.end_time
                this.card.validity_time_str = params.end_time + '到期'
            })

            this.init()
        },
        methods: {
            // getinfoByid (id) {
            //     userGetMchCard({_id: id}, (data) => {
            //         this.card.title = data.data.title
            //         this.card.color = data.data.color
            //         this.type = data.data.type
            //         this.discount = data.data.discount
            //         this.give_point_num = data.data.give_point_num
            //         this.give_coupon = data.data.give_coupon
            //         this.validity_type11 = data.data.validity_type
            //         this.validity_day = data.data.validity_day
            //         this.start_time = data.data.start_time
            //         this.end_time = data.data.end_time
            //     })
            // },
            addinfo () {
                if (!this.card.title) {
                    this.$notice.toast({
                        message: '请输入会员卡名称',
                    })
                } else if (!this.card.give_point_num) {
                    this.$notice.toast({
                        message: '请输入赠送积分数量',
                    })
                } else if (this.validity_type === 2  && this.card.validity_day === '') {
                    this.$notice.toast({
                        message: '请设置会员卡有用天数',
                    })
                } else if (this.validity_type === 1 && this.start_time === '') {
                    this.$notice.toast({
                        message: '请设置会员卡开始时间',
                    })
                } else if (this.validity_type === 1 && this.end_time === '') {
                    this.$notice.toast({
                        message: '请设置会员卡结束时间',
                    })
                } else {
                    var self = this
                    if (!this.card._id) {
                        userAddMchCard(
                            {
                                title: this.card.title,
                                color: this.card.color,
                                type: this.type,
                                discount: this.card.discount,
                                give_point_num: this.card.give_point_num,
                                give_coupon: this.give_coupon,
                                validity_type: this.validity_type,
                                validity_day: this.card.validity_day,
                                start_time: (Date.parse(new Date(this.start_time)) / 1000).toString(),
                                end_time: (Date.parse(new Date(this.end_time)) / 1000).toString()
                            }, (data) => {
                                console.log(data)
                                this.$notice.toast({
                                    message: '添加成功',
                                    duration: 1
                                })
                                setTimeout(() => {
                                    this.$event.emit('addvipinfo', {})
                                    this.$router.back()
                                    // this.$router.open({
                                    //     name: 'vipCardList'
                                    // })
                                    // weexRouter.push('/vip/vipCardLi')
                                }, 1000)
                            })
                    } else {
                        userEditMchCard(
                            {
                                _id: this.card._id,
                                title: this.card.title,
                                color: this.card.color,
                                type: this.type,
                                discount: this.card.discount,
                                give_point_num: this.card.give_point_num,
                                give_coupon: this.give_coupon,
                                validity_type: this.validity_type,
                                validity_day: this.card.validity_day,
                                start_time: (Date.parse(new Date(this.start_time)) / 1000).toString(),
                                end_time: (Date.parse(new Date(this.end_time)) / 1000).toString()
                            }, (data) => {
                                console.log(data)
                                this.$notice.toast({
                                    message: '修改成功',
                                    duration: 1
                                })
                                setTimeout(() => {
                                    this.$event.emit('addvipinfo', {})
                                    this.$router.back()
                                }, 1000)
                            })
                    }
                }
            },
            senCoupan () {
                this.$router.open({
                    name: 'couponManage.sendCoupan',
                    params: {
                        coupantype: true
                    }
                })
            },
            ridiock (type) {
                var self = this
                self.type = type
                if (type === 1) {
                    self.rediotypechecked = true
                    self.rediotypenochecked = false
                    self.card.discount = ''
                    self.card.give_point_num = ''
                }
                if (type === 2) {
                    self.rediotypechecked = false
                    self.rediotypenochecked = true
                    self.card.discount = ''
                    self.card.give_point_num = ''
                }
            },
            showReturnCalendar () {
                this.$router.open({
                    name: 'vipCardList.ChooseTime'
                })
                // this.isRange = true
                // setTimeout(() => {
                //     this.$refs['wxcPageCalendar'].show()
                // }, 10)
            },
            changevalidity_type () {
                var self = this
                self.validity_typeckeched = !self.validity_typeckeched
                if (self.validity_typeckeched) {
                    // self.card.validity_day = ''
                    self.validity_type = 1
                } else {
                    console.log('type2')
                    // self.start_time = ''
                    // self.end_time = ''
                    // this.card.validity_time_str = ''
                    self.validity_type = 2
                }
                console.log(self.validity_type)
            },
            wxcPageCalendarDateSelected (e) {
                this.selectedDate = e.date
                this.currentDate = e.date
            },
            wxcPageCalendarBackClicked () {
            },
            bgclick (num) {
                var self = this
                if (num === 1) {
                    console.log(num)
                    self.card.color = 'http://cdn.udian.me/05.png'
                    self.left = 14 + 'px'
                }
                if (num === 2) {
                    console.log(num)
                    self.card.color = 'http://cdn.udian.me/03.png'
                    self.left = 82 + 'px'
                }
                if (num === 3) {
                    console.log(num)
                    self.card.color = 'http://cdn.udian.me/02.png'
                    self.left = 152 + 'px'
                }
                if (num === 4) {
                    console.log(num)
                    self.card.color = 'http://cdn.udian.me/01.png'
                    self.left = 220 + 'px'
                }
                if (num === 5) {
                    console.log(num)
                    self.card.color = 'http://cdn.udian.me/04.png'
                    self.left = 286 + 'px'
                }
            }
        }
    }
</script>

<style scoped>
    .content{
        background-color: #f2f2f2;
    }
    /*input{*/
        /*outline: none;*/
    /*}*/
    .cs_l{
        padding-left: 32px;
        background-color: #ffffff;
    }
    .text-right{
        font-size: 32px;
        color: #FE5383;;
    }
    .mt{
        margin-top: 20px ;
    }
    .cardcl{
        width: 48px;
        height: 48px;
        margin-right: 20px;
        border-radius: 6px ;
    }
    .posit{
        position: absolute;
        left: 14px;
        top: -20px;
        width: 0;
        height: 0;
        border-left: 8px solid transparent;
        border-right: 8px solid transparent;
        border-top: 14px solid #BBBBBB;
    }
    .card-bg1{
        background-color: #FFC02E;
    }
    .card-bg2{
        background-color: #BAD07C;
    }
    .card-bg3{
        background-color: #FF1F32;
    }
    .card-bg4{
        background-color: #CCA97B;
    }
    .card-bg5{
        background-color: #000000;
    }
    .fr{
        flex-direction: row;
        align-items: center;
    }
    .text-desc{
        font-family: PingFangSC-Regular;
        font-size: 28px;
        height: 40px;
        line-height: 40px;
        margin-right: 28px;
        color: #999999;
        letter-spacing: -0.68px;
    }
    .image{
        width: 36px;
        height: 36px;
        margin-right: 10px;
    }
    .cell{
        padding-left: 0px !important;
        height: 80px !important;
    }
    .text-image{
        font-family: PingFangSC-Medium;
        font-size: 28px;
        color: #666666;
        letter-spacing: -0.68px;
        height: 40px;
        line-height: 40px;
    }
    .pr40{
        padding-right: 40px;
    }
    .vBar{
        width: 8px;
        height: 36px;
        background-color: #FD3E69;
        border-radius: 1px;
        margin-right: 24px;
    }
    .text-label{
        font-size: 30px;
        color: #666666;
        width: 188px;
        margin-right: 10px;
    }
    .coupan{
        height: 176px;
        background-color: #F7F8FA;
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
