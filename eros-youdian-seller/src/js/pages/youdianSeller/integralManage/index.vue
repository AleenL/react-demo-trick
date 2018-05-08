<template>
    <div>
        <div class="content">
            <!--<wxc-minibar title="积分规则" background-color="#ffffff">-->
            <!--<text slot="right" class="text-right" @click='addinfo'>保存</text>-->
            <!--</wxc-minibar>-->
            <div>
                <div class="list">
                    <text class="list-title">积分赠送规则</text>
                    <ul class="list-ul">
                        <li class="list-li no-border">
                            <div class="li-cell no-border">
                                <text class="text">消费送积分</text>
                                <!--<div class="switch-container">
                                  <label
                                        :checked="obj.is_give_point_consume == 2"
                                        :class="obj.is_give_point_consume == 2 ? 'switch-checked' : ''"
                                        @click="onchange">
                                  </label>
                                </div>-->
                                <switch slot="value" :checked="obj.is_give_point_consume === 2 || obj.is_give_point_consume === '2'" @change="onchange"></switch>
                            </div>
                            <div class="li-cell no-spacebetween" v-if="obj.is_give_point_consume === 2 || obj.is_give_point_consume === '2'">
                                <text class="text color666">每消费</text><input type="number" maxlength="8" class="input" placeholder="输入金额" v-model="obj.consume_price">
                                <text class="text color666">元，</text>
                                <text class="text color666">赠送</text><input type="number" maxlength="8" placeholder="输入积分" class="input" v-model="obj.give_point_consume">
                                <text class="text color666">积分</text>
                            </div>
                        </li>
                        <li class="list-li ">
                            <div class="li-cell no-border">
                                <text class="text">充值送积分</text>
                                <switch slot="value" :checked="obj.is_give_point_recharge === 2 || obj.is_give_point_recharge === '2'" @change="onchange2"></switch>
                            </div>
                            <div class="li-cell no-spacebetween" v-if="obj.is_give_point_recharge === 2 || obj.is_give_point_recharge === '2'">
                                <text class="text color666">每充值</text><input  type="number" class="input" placeholder="输入金额" v-model="obj.recharge_price">
                                <text class="text color666">元，</text>
                                <text class="text color666">赠送</text><input maxlength="8" type="number" placeholder="输入积分" class="input" v-model="obj.give_point_recharge">
                                <text class="text color666">积分</text>
                            </div>
                        </li>
                    </ul>

                    <text class="list-title">积分消耗规则</text>
                    <ul class="list-ul">
                        <li class="list-li no-border">
                            <div class="li-cell no-border">
                                <text class="text">多少积分可抵1元</text>
                                <input type="number" class="input2" placeholder="输入积分" v-model="obj.limit_num">
                            </div>
                            <div class="li-cell ">
                                <text class="text">最高可使用抵现金额的占比</text>
                                <div style="flex-direction: row;align-items: center">
                                    <input type="number" class="input2" placeholder="输入积分占比" style="text-align: right" v-model="obj.percent">
                                    <text class="text" style="color: #666" v-if="obj.percent != ''">%</text>
                                </div>
                            </div>
                        </li>
                    </ul>

                    <ul class="list-ul" style="margin-top: 20px">
                        <li class="list-li no-border">
                            <div class="li-cell no-border" @click="changevalidity_type">
                                <text class="text">积分有效期</text>
                                <text class="text" style="color: #C5C5C5">永久有效</text>
                            </div>
                            <!--<div class="li-cell no-border" @click="changevalidity_type">
                                <text class="text">积分有效期</text>
                                <text class="text" style="color: #C5C5C5" v-if="obj.validity_type==1">永久有效</text>
                                <text class="text" style="color: #C5C5C5" v-if="obj.validity_type==2">固定有效</text>
                                <text class="text" style="color: #C5C5C5" v-if="obj.validity_type==3">相对有效</text>
                            </div>
                            <div class="li-cell no-border" v-if="obj.validity_type!=1">
                                <text class="text" style="color: #333">日期范围</text>
                                <div class="fr" v-if="obj.validity_type==2">
                                    <text class="text-desc">领券后当天有效，有效期</text>
                                    <input type="number" placeholder="请输入" v-model='validity_day' class="fr-input"  style="width: 100px;" maxlength="3">
                                    <text class="text-desc">天</text>
                                </div>
                                <div class="fr" v-if="obj.validity_type==3">
                                    <text class="text-desc">有效期</text>
                                    <input type="date" placeholder="请选择日期" @change="onchange11" @input="oninput" max="2020-12-12" min="2018-01-01" class="fr-input" style="width: 170px">
                                    <text class="text-desc">-</text>
                                    <input type="date" placeholder="请选择日期" @change="onchange11" @input="oninput" max="2020-12-12" min="2018-01-01" class="fr-input" style="width: 170px">
                                </div>
                            </div>-->
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import { WxcMinibar } from 'weex-ui'
    import { userEditMchPointRule, userGetMchPointRule } from '../services/user'

    var modal = weex.requireModule('modal')

    export default {
        components: {
            WxcMinibar
        },
        data () {
            return {
                obj: {},
                txtInput: '',
                txtChange: ''
            }
        },
        created () {
            this.getinfoByid()
            //设置导航条右侧区域
            this.$navigator.setRightItem({
                text: '保存',                             // 展示的文字 (和图片 二选一)
                textColor: '#FE5383',                    // 文字颜色 (默认为白色)
                fontSize: '32',                         // 字号（默认32px）
                fontWeight: 'normal',                   // 是否加粗（默认不加粗）
            }, () => {
                // 点击回调
                this.addinfo()
            })
        },
        methods: {
            getinfoByid () {
                userGetMchPointRule({shop_id: '59c1d8ab1d716136ba4474c3'}, (data) => {
                    console.log(data)
                    this.obj = data.data
                    this.obj.consume_price = data.data.consume_price/100
                    this.obj.recharge_price = data.data.recharge_price/100
                }, (data) => {
                    modal.toast({
                        message: data.msg,
                        duration: 1
                    })
                })
            },
            addinfo () {
                if ((this.obj.is_give_point_consume === 2 || this.obj.is_give_point_consume === '2') && !this.obj.consume_price) {
                    modal.toast({
                        message: '请输入消费金额',
                        duration: 1
                    })
                } else if ((this.obj.is_give_point_consume === 2 || this.obj.is_give_point_consume === '2') && !this.obj.give_point_consume) {
                    modal.toast({
                        message: '请输入消费赠送积分',
                        duration: 1
                    })
                } else if ((this.obj.is_give_point_recharge === 2 || this.obj.is_give_point_recharge === '2') && !this.obj.recharge_price) {
                    modal.toast({
                        message: '请输入充值金额',
                        duration: 1
                    })
                } else if ((this.obj.is_give_point_recharge === 2 || this.obj.is_give_point_recharge === '2') && !this.obj.give_point_recharge) {
                    modal.toast({
                        message: '请输入充值赠送积分',
                        duration: 1
                    })
                } else if (!this.obj.limit_num) {
                    modal.toast({
                        message: '请输入多少积分可抵1元',
                        duration: 1
                    })
                } else if (!this.obj.percent) {
                    modal.toast({
                        message: '请输入最高可使用抵现金额的占比',
                        duration: 1
                    })
                } else {
                    userEditMchPointRule({
                        shop_id: '59c1d8ab1d716136ba4474c3',
                        is_give_point_consume: this.obj.is_give_point_consume,
                        is_give_point_recharge: this.obj.is_give_point_recharge,
                        limit_num: this.obj.limit_num,
                        percent: this.obj.percent,
                        consume_price: this.obj.consume_price,
                        give_point_consume: this.obj.give_point_consume,
                        recharge_price: this.obj.recharge_price,
                        give_point_recharge: this.obj.give_point_recharge
                    }, (data) => {
                        console.log(data)
                        modal.toast({
                            message: '保存成功',
                            duration: 1
                        })
                        this.$router.back()
                    }, (data) => {
                        modal.toast({
                            message: data.msg,
                            duration: 1
                        })
                    })
                }
            },
            onchange (e) {
                if (this.obj.is_give_point_consume === 2 || this.obj.is_give_point_consume === '2') {
                    this.obj.is_give_point_consume = 1
                } else {
                    this.obj.is_give_point_consume = 2
                }
            },
            onchange2 (e) {
                if (this.obj.is_give_point_recharge === 2 || this.obj.is_give_point_recharge === '2') {
                    this.obj.is_give_point_recharge = 1
                } else {
                    this.obj.is_give_point_recharge = 2
                }
            },
            changevalidity_type () {
                if (this.obj.validity_type === 1) {
                    this.obj.validity_type = 2
                } else if (this.obj.validity_type === 2) {
                    this.obj.validity_type = 3
                } else {
                    this.obj.validity_type = 1
                }
            },
            onchange11: function (event) {
                this.txtChange = event.value
            },
            oninput: function (event) {
                this.txtInput = event.value
            }
        }
    }
</script>

<style scoped>
    .content{
        flex: 1;
        background-color: #f2f2f2;
    }
    .text-right{
        font-size:32px;
        color: #FE5383;
    }
    .list-title{
        padding-left: 32px;
        height: 68px;
        line-height: 68px;
        font-size:24px;
        color:rgba(102,102,102,1);
    }
    .list-ul{
        background-color: #fff;
    }
    .list-li{
        padding-left: 32px;
        border-top-style: solid;
        border-top-width: 2px;
        border-top-color: #eee;
    }
    .li-cell{
        height: 84px;
        padding-right: 32px;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
        font-size:28px;
        color:#121C32;
        border-top-style: solid;
        border-top-width: 2px;
        border-top-color: #eee;
        border-color: #eee;
    }
    .no-border{
        border-top-width: 0;
    }
    .no-spacebetween{
        justify-content: flex-start;
    }
    .text{
        font-size: 28px;
    }
    .color666{
        color: #666;
    }
    .input{
        width: 150px;
        height: 40px;
        line-height: 40px;
        font-size:28px;
        color: #666;
        text-align: center;
        padding-left: 5px;
        padding-right: 5px;
    }
    .input2{
        width: 250px;
        height: 40px;
        line-height: 40px;
        font-size:28px;
        color: #666;
        text-align: right;
        padding-left: 5px;
        padding-right: 5px;
    }
    .weex-switch-checked{
        background-color: #FF847B;
        border-color: #FF847B;
        -webkit-box-shadow: #FF847B 0 0 0 0.533333rem inset;
        box-shadow: #FF847B 0 0 0 0.533333rem inset;
    }
    .fr{
        flex-direction: row;
        align-items: center;
    }
    .fr-input{
        height: 40px;
        line-height: 40px;
        font-size:28px;
        color: #666;
        placeholder-color:#c5c5c5;
        text-align: center;
    }
    .text-desc{
        font-size: 30px;
        color: #666;
        letter-spacing: -0.34px;
        padding-right: 5px;
    }

    /*开关的大小*/
    .switch-container {
        height: 56px;
        width: 92px;
    }

    .display {
        display: none;
    }

    /*设置label标签为椭圆状*/
    label {
        display: block;
        height: 100%;
        width: 100%;
        cursor: pointer;
        border-radius: 28px;
        border-style: solid;
        border-width: 1px;
        border-color: #dfdfdf;
        box-sizing: content-box;
    }

    /*在label标签内容之前添加如下样式，形成一个未选中状态*/
    label:before {
        content: '';
        display: block;
        margin-left: -1px;
        border-radius: 28px;
        height: 100%;
        width: 56px;
        background-color: white;
        opacity: 1;
        -webkit-transition: all 0.2s ease;
        border-style: solid;
        border-width: 1px;
        border-color: #dfdfdf;
    }

    /*在label标签内容之后添加如下样式，形成一个选中状态*/
    label:after {
        position: relative;
        top: -56px;
        left: 36px;
        content: '';
        display: block;
        border-radius: 28px;
        height: 100%;
        width: 56px;
        background-color: white;
        opacity: 0;
        box-shadow: 1px 1px 1px 1px rgba(0, 0, 0, 0.08);
        -webkit-transition: all 0.2s ease;
        border-style: solid;
        border-width: 1px;
        border-color: #dfdfdf;
    }

    /*选中后，选中样式显示*/
    .switch-checked:after {
        opacity: 1;
    }

    /*选中后，未选中样式消失*/
    .switch-checked:before {
        opacity: 0;
    }

    /*选中后label的背景色改变*/
    .switch-checked {
        background-color: #FF847B;
    }
</style>
