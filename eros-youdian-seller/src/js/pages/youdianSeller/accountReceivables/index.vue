<template>
    <div class="content">
        <scroller style="border-top-color: #eeeeee;border-top-style: solid;border-top-width: 1px">
            <!--<div class="flow">-->
                <!--<div class="dash-line"></div>-->
                <!--<div v-for="(item, index) in flowData" :key="index" class="item-flow">-->
                    <!--<div class="point" :class="[activeIndex===index?'activePoint':'']"></div>-->
                    <!--<text class="item-text" :class="[activeIndex===index?'activeText':'']">{{item.desc}}</text>-->
                <!--</div>-->
            <!--</div>-->
            <div style="background-color: #ffffff;">
                <div class="box">
                    <wxc-cell class="cell"  :has-arrow="true" :cell-style="cellStyleObj">
                        <text slot="label" class="label-cell">账户类型</text>
                        <div style="flex-direction: row">
                            <div style="flex-direction: row" @click="chooseaccounttype(1)">
                                <image v-if="accounttypechecked" class="typeimg" src="http://cdn.udian.me/accetype1.png"></image>
                                <image v-if="!accounttypenochecked" class="typeimg" src="http://cdn.udian.me/accetype2.png"></image>
                                <text class="text-seller">个人账户</text>
                            </div>
                            <div style="flex-direction: row" @click="chooseaccounttype(2)">
                                <image v-if="accounttypenochecked" class="typeimg" src="http://cdn.udian.me/accetype2.png"></image>
                                <image v-if="!accounttypechecked" class="typeimg" src="http://cdn.udian.me/accetype1.png"></image>
                                <text class="text-seller">对公账户</text>
                            </div>
                        </div>
                    </wxc-cell>
                    <wxc-cell class="cell" :cell-style="cellStyleObj" :has-arrow="true" @wxcCellClicked="goinfo(0)">
                        <text slot="label" class="label-cell">开户银行</text>
                        <text class="text-seller" :style="aninfo.bank_open === '请选择' ? {color:'#999'} : {}">{{aninfo.bank_open}}</text>
                    </wxc-cell>
                    <wxc-cell class="cell" :cell-style="cellStyleObj" :has-arrow="true" @wxcCellClicked="chooseProvince">
                        <text slot="label" class="label-cell">开户省份</text>
                        <text class="text-seller" :style="aninfo.bank_province.administrativName === '请选择' ? {color:'#999'} : {}">{{aninfo.bank_province.administrativName}}</text>
                    </wxc-cell>
                    <wxc-cell class="cell"  :cell-style="cellStyleObj" :has-arrow="true" @wxcCellClicked="chooseCity">
                        <text slot="label" class="label-cell">开户城市</text>
                        <text class="text-seller" :style="aninfo.bank_city.administrativName === '请选择' ? {color:'#999'} : {}">{{aninfo.bank_city.administrativName}}</text>
                    </wxc-cell>
                    <wxc-cell class="cell"  :cell-style="cellStyleObj" :has-arrow="true" @wxcCellClicked="goinfo(1)">
                        <text slot="label" class="label-cell">开户支行</text>
                        <text class="text-seller" :style="aninfo.bank_branch === '请选择' ? {color:'#999'} : {}">{{aninfo.bank_branch}}</text>
                    </wxc-cell>
                    <wxc-cell class="cell"  :cell-style="cellStyleObj" :has-arrow="false">
                        <text slot="label" class="label-cell">开户人姓名</text>
                        <input type="text"
                               class="inputs"
                               @input="inputAccountName"
                               placeholder="请输入开户人姓名"/>
                    </wxc-cell>
                    <wxc-cell class="cell" :cell-style="cellStyleObj" :has-arrow="false" :has-bottom-border="true" >
                        <text slot="label" class="label-cell">开户银行预留手机号码</text>
                        <input type="text"
                               class="inputs"
                               @input="inputBankMobile"
                               placeholder="请输入手机号"/>
                    </wxc-cell>
                    <wxc-cell class="cell"  :cell-style="cellStyleObj" :has-arrow="false">
                        <text slot="label" class="label-cell">银行账号</text>
                        <input type="text"
                               class="inputs"
                               @input="inputBankAccount"
                               placeholder="请输入银行账号"/>
                    </wxc-cell>
                    <wxc-cell class="cell" :cell-style="cellStyleObj" :has-arrow="false" :has-bottom-border="true" >
                        <text slot="label" class="label-cell">证件类型</text>
                        <text slot="value" class="text-seller pr10">身份证</text>
                    </wxc-cell>
                    <wxc-cell class="cell" :cell-style="cellStyleObj" :has-arrow="false" :has-bottom-border="true" >
                        <text slot="label" class="label-cell">证件号码</text>
                        <input type="text"
                               class="inputs"
                               @input="inputDocumentNum"
                               placeholder="请输入证件号吗"/>
                    </wxc-cell>
                    <!--<my-cell-->
                        <!--title="门店地址"-->
                        <!--:has-arrow="true">-->
                        <!--<text class="text-seller text-seller-color">{{aninfo.shop_address}}</text>-->
                    <!--</my-cell>-->
                    <!--<input type="text" class="input-address" placeholder="街道门牌信息" v-model="aninfo.shop_street">-->
                </div>
            </div>
            <div class="footer">
                <text class="text-footer">提示:顾客使用在线支付付款后，该资金会在下一个工作日自动打款到您的收款账户,微信或支付宝会收取0.38%的手续费</text>
            </div>
            <wxc-button text="下一步" :btnStyle="btnStyle" @wxcButtonClicked="go"></wxc-button>
        </scroller>
    </div>
</template>

<script>
    import { WxcMinibar, WxcCell, WxcButton } from 'weex-ui'
    import http from '../utils/http'
    import { collectShopPaymentInfo, shopPaymentInfo } from  '../services/employeeShop'
    export default {
        components: {
            WxcMinibar,
            WxcCell,
            WxcButton,
        },
        data () {
            return {
                btnStyle: {
                    backgroudColor: '#FF6F6F',
                    width: '750px',
                    height: '80px',
                    borderRadius: '0px'
                },
                flowData: [
                    {
                        desc: '信息审核'
                    },
                    {
                        desc: '录入验证信息'
                    },
                    {
                        desc: '验证'
                    },
                    {
                        desc: '完成'
                    }
                ],
                activeIndex: 0,
                accounttypechecked: true,
                accounttypenochecked: true,
                aninfo: {
                    // id_card_positive: [],
                    // id_card_negative: [],
                    // license: [],
                    // license_food: [],
                    // face_figure: [],
                    // shop_environment: [],
                    account_type: 1,
                    accountypeinfo: '个人账户',
                    bank_open: '请选择',
                    bank_branch: '请选择',
                    bank_province: {
                        administrativName: '请选择'
                    },
                    bank_city: {
                        administrativName: '请选择'
                    },
                    account_name: '张三',
                    bank_mobile: '13101360096',
                    bank_account: '6216911106810696',
                    document_number: '500224199508258962',
                    certificates_type: 1,
                    shop_address: '重庆市渝中区',
                    shop_street: '大坪英利国际',
                    IDfaceimg: [],
                    IDsideimg: [],
                    Businesslicense: [],
                    Foodsafetypermit: [],
                    Facade: [],
                    Insideshop: [],
                    Cashier: []
                },
                img_base_url: 'http://cdn.udian.me/',
                cellStyleObj:{paddingLeft:'0',height:'100px',paddingRight: '32px'}

            }
        },
        created () {
            // this.getinfo()
            // this.$event.on('getaccountinfo', (params) => {
            //     this.aninfo.accountypeinfo = params.accountypeinfo
            //     this.aninfo.account_type = params.accountype
            // })
        },
        eros: {
            beforeBackAppear (params) {
                // 选择银行
                if (params.step === 0) {
                    this.aninfo.bank_open = params.name
                    this.aninfo.bank_value = params.value
                }
                // 选择支行
                if (params.step === 1) {
                    this.aninfo.bank_branch = params.sub_branch_name
                }
                // 选择省份
                if (params.province) {
                    this.aninfo.bank_province = params
                    if (params.children.length === 1) {
                        this.aninfo.bank_city = params.children[0]
                        return
                    }
                    this.aninfo.bank_city = {
                        administrativName: '请选择'
                    }
                }
                // 选择城市
                if (params.city) {
                    this.aninfo.bank_city = params
                }
            }
        },
        methods: {
            inputDocumentNum (e) {
                this.aninfo.document_number = e.value
            },
            inputBankAccount (e) {
                this.aninfo.bank_account = e.value
            },
            inputBankMobile (e) {
                this.aninfo.bank_mobile = e.value
            },
            inputAccountName (e) {
                this.aninfo.account_name = e.value
            },
            goinfo (n) {
                // shopPaymentInfo({payment_id: 1}, (data) => {
                //     console.log(data)
                // })
                this.$router.open({
                    navTitle: n === 0 ? '选择开户银行' : '选择开户支行',
                    name: 'accountReceivables.addarInfo',
                    params: {type: 1, step: n, code: this.aninfo.bank_value, city_code: this.aninfo.bank_province.administrativeCode}
                })
            },
            chooseaccounttype (type) {
                this.aninfo.account_type = type
                if (type === 1) {
                    this.accounttypechecked = !this.accounttypechecked
                    this.accounttypenochecked =!this.accounttypenochecked
                } else {
                    this.accounttypechecked = !this.accounttypechecked
                    this.accounttypenochecked =!this.accounttypenochecked
                }
                console.log('收款类型。。。。。。。。。。' + this.aninfo.account_type)
            },
            chooseProvince () {
                this.$router.open({
                    name: 'chooseProvince',
                    params: this.aninfo.bank_province
                })
            },
            chooseCity () {
                this.$router.open({
                    name: 'chooseCity',
                    params: {...this.aninfo.bank_province, checkedIndex: this.aninfo.bank_city.checkedIndex}
                })
            },
            go () {
                // console.log(this.aninfo)
                let patt1 = new RegExp(/^(((13[0-9]{1})|(15[0-9]{1})|(18[0-9]{1}))+\d{8})$/)
                let accountTest =  new RegExp(/^([1-9]{1})(\d{15}|\d{18})$/)
                let cardTest = new RegExp(/(^[1-9]\d{5}(18|19|([23]\d))\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$)|(^[1-9]\d{5}\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{2}$)/)

                if (!this.aninfo.account_type) {
                    this.$notice.toast({
                        message: '请选择收款账户类型'
                    })
                } else if (this.aninfo.bank_open === '请选择') {
                    this.$notice.toast({
                        message: '请选择开户银行'
                    })
                } else if (this.aninfo.bank_branch === '请选择') {
                    this.$notice.toast({
                        message: '请选择开户支行'
                    })
                } else if (this.aninfo.bank_province.administrativName === '请选择') {
                    this.$notice.toast({
                        message: '请选择开户省份'
                    })
                } else if (this.aninfo.bank_city.administrativName === '请选择') {
                    this.$notice.toast({
                        message: '请选择开户城市'
                    })
                } else if (!this.aninfo.account_name) {
                    this.$notice.toast({
                        message: '请填写开户人姓名'
                    })
                } else if (!this.aninfo.bank_mobile) {
                    this.$notice.toast({
                        message: '请填写开户银行预留手机号码'
                    })
                } else if (!patt1.test(this.aninfo.bank_mobile)) {
                    this.$notice.toast({
                        message: '请填写正确的手机号!',
                    })
                }
                // else if (!patt1.test(this.aninfo.certificates_type)) {
                //     this.$notice.toast({
                //         message: '请选择证件类型',
                //     })
                //     return
                // }
                else if (!accountTest.test(this.aninfo.bank_account)) {
                    this.$notice.toast({
                        message: '请输入正确的银行账号'
                    })
                }
                else if (!cardTest.test(this.aninfo.document_number)) {
                    this.$notice.toast({
                        message: '请填写正确的证件号码',
                    })
                } else {
                    this.$router.open({
                        name: 'accountReceivables.qualificationsinfo',
                        params: {
                            account_type: this.aninfo.account_type,
                            bank_open: this.aninfo.bank_open,
                            bank_province: this.aninfo.bank_province.administrativeCode,
                            bank_city: this.aninfo.bank_city.administrativeCode,
                            bank_branch: this.aninfo.bank_branch,
                            account_name: this.aninfo.account_type,
                            bank_mobile: this.aninfo.bank_mobile,
                            bank_account: this.aninfo.bank_account,
                            document_type: 1,
                            document_number: this.aninfo.document_number
                        }
                    })
                    // collectShopPaymentInfo(_pramas, (data) => {
                    //     console.log(data)
                    //     this.$notice.toast({
                    //         message: '完善信息成功'
                    //     })
                    // })
                }
            },
            test () {
                this.$router.open({
                    name: 'accountReceivables.qualificationsinfo'
                })
            },
            chooseaddress () {
                this.$router.open({
                    name: 'chooseAddress'
                })
            }
        }
    }
</script>

<style scoped>
    .content{
        background-color: #f2f2f2;
        position:relative;
    }
    .flow{
        width: 750px;
        height: 168px;
        background-color: #F7F8FA;
        flex-direction: row;
        justify-content: space-around;
        align-items: center;
        position: relative;
    }
    .dash-line{
        position: absolute;
        top: 55px;
        left: 150px;
        width:478px;
        border-top-style: dashed;
        border-top-width: 4px;
        border-top-color: #E4E4E4;
    }
    .item-flow{
        align-items: center;
        /*background-color: #00B4FF;*/
    }
    .item-text{
        width:142px;
        height:34px;
        font-size:24px;
        color: #666666;
        line-height:34px;
        text-align: center;
    }
    .point{
        width:28px;
        height:28px;
        border-radius: 14px;
        background-color: #666666;
        margin-bottom: 20px;
    }
    .activePoint{
        background-color: #FF6F6F;
    }
    .activeText{
        color: #FF847B;
    }
    .content .cell-label-text{
        flex: 1;
        width: 350px !important;
    }
    .card{
        flex-direction: row;
        justify-content: space-around;
        padding-left: 28px;
        padding-right: 28px;
        padding-bottom: 40px;
        background-color: #fff;
        margin-bottom: 40px;
    }
    .card-item{
        /*align-items: center;*/
    }
    .image{
        width:338px;
        height:215px;
        margin-top: 20px;
    }
    .card-text{
        height:34px;
        margin-top: 34px;
        font-size:24px;
        font-family:PingFangSC-Regular;
        color: #666666;
        line-height:34px;
    }
    .title{
        background-color: #fff;
        flex-direction: row;
        align-items: center;
        padding-left: 32px;
        padding-top: 20px;
        padding-bottom: 20px;
        border-bottom-width: 2px;
        border-bottom-style: solid;
        border-bottom-color: #EEEEEE;
    }
    .bg-line{
        width:8px;
        height:36px;
        margin-right: 16px;
        background-color:rgba(255,132,123,1);
        border-radius: 2px ;
    }
    .text-title{
        width:112px;
        height:40px;
        font-size:28px;
        font-family:PingFangSC-Regular;
        color:rgba(18,28,50,1);
        line-height:40px;
    }
    .box{
        padding-left: 32px;
    }
    .cell{
        padding-left: 0px !important;
    }
    .typeimg{
        width: 32px;
        height: 32px;
        margin-right: 10px;
    }
    .text-seller{
        font-size:30px;
        letter-spacing: -0.34px;
        padding-right: 28px;
    }
    .text-seller-color{
        color: #999999
    }
    .p1{
        padding-left: 32px;
        height:40px;
        font-size:24px;
        font-family:PingFangSC-Regular;
        color:rgba(102,102,102,1);
        line-height:34px;
    }
    .license{
        width:700px;
        height:448px;
        padding-left: 32px;
    }
    .licensemorebox{
        width:340px;
        height:240px;
        padding-left: 22px;
        padding-right: 22px;
    }
    .licensemore{
        width:320px;
        height:220px;
        margin: 10px;
    }
    .input-address{
        text-align: right;
        height: 80px;
        padding-right: 80px;
    }
    .label-cell{
        color: #333333;
        font-size: 30px;
        line-height: 40px;
    }
    .footer{
        padding-left: 32px;
        padding-right: 32px;
        margin-top: 34px;
        margin-bottom: 64px;
    }
    .text-footer{
        height:68px;
        font-size:24px;
        font-family:PingFangSC-Regular;
        color:rgba(155,155,155,1);
        line-height:34px;
    }
    .inputs{
        width: 400px;
        height: 50px;
        text-align: right;
        font-size:28px;
        padding-right: 10px;
        outline: none;
    }
    .pr10 {
        padding-right: 10px;
    }
</style>
