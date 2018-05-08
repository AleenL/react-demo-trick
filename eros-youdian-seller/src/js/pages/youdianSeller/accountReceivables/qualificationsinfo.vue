<template>
    <div class="content">
        <scroller>
            <!--<div>-->
                <!--<div class="title">-->
                    <!--<div class="bg-line"></div>-->
                    <!--<text class="text-title">基本信息</text>-->
                <!--</div>-->
                <!--<div class="card">-->
                    <!--<div class="card-item">-->
                        <!--<text class="card-text">身份证正面照</text>-->
                        <!--<image class="image" src="http://cdn.udian.me/identificationCard1.jpg"></image>-->
                        <!--<image class="image" src="http://cdn.udian.me/identificationCard2.jpg"></image>-->
                    <!--</div>-->
                    <!--<div class="card-item">-->
                        <!--<text class="card-text">身份证正反面</text>-->
                        <!--<div v-for="(image, index) in aninfo.IDfaceimg" v-if="aninfo.IDfaceimg.length > 0">-->
                            <!--<image class="image" resize="cover" :src="'http://cdn.udian.me' + '/' + image + '!180compress'" />-->
                        <!--</div>-->
                        <!--<image v-if="aninfo.IDfaceimg.length < 1" class="image" src="http://cdn.udian.me/addIdentificationCard1.jpg" @click="addimg(1, 1)"></image>-->
                        <!--<div v-for="(image2, index) in aninfo.IDsideimg" v-if="aninfo.IDsideimg.length > 0">-->
                            <!--<image class="image" resize="cover" :src="'http://cdn.udian.me' + '/' + image2 + '!180compress'" />-->
                        <!--</div>-->
                        <!--<image v-if="aninfo.IDsideimg.length < 1" class="image" src="http://cdn.udian.me/addIdentificationCard2.jpg" @click="addimg(2, 1)"></image>-->
                    <!--</div>-->
                <!--</div>-->
            <!--</div>-->
            <div style="background-color: #ffffff;">
                <div class="box">
                    <div style="padding-left:32px;background-color: #ffffff">
                        <wxc-cell
                            title="身份证正面照"
                            desc="要求身份证信息清晰可见"
                            :has-arrow="true"
                            :has-bottom-border="true"
                            :cellStyle="cellStyle"
                            @wxcCellClicked="imgPop(1, 1)"
                        >
                        </wxc-cell>
                        <div v-for="(image, index) in aninfo.IDfaceimg" v-if="aninfo.IDfaceimg.length > 0" class="wrap-image">
                            <image class="image" resize="cover" :src="'http://cdn.udian.me' + '/' + image + '!180compress'" />
                        </div>
                    </div>
                    <div style="padding-left:32px;background-color: #ffffff">
                        <wxc-cell
                            title="身份证反面照"
                            desc="要求身份证信息清晰可见"
                            :has-arrow="true"
                            :has-bottom-border="true"
                            :cellStyle="cellStyle"
                            @wxcCellClicked="imgPop(2, 1)"
                        >
                        </wxc-cell>
                        <div v-for="(image2, index) in aninfo.IDsideimg" v-if="aninfo.IDsideimg.length > 0" class="wrap-image">
                            <image class="image" resize="cover" :src="'http://cdn.udian.me' + '/' + image2 + '!180compress'" />
                        </div>
                    </div>
                    <div style="padding-left:32px;background-color: #ffffff">
                        <wxc-cell
                            title="营业执照"
                            desc="店内拍摄食品安全许可证,要求许可证文本信息清晰可见"
                            :has-arrow="true"
                            :has-bottom-border="true"
                            :cellStyle="cellStyle"
                            @wxcCellClicked="imgPop(3, 1)"
                        >
                        </wxc-cell>
                        <!--<scroller v-if="aninfo.Businesslicense.length > 0" flex-direction="row" scroll-direction="horizontal" show-scrollbar="false" style="flex-direction: row;height: 240px">-->
                        <div class="wrap-image " v-for="(blimage, index) in aninfo.Businesslicense">
                            <image :class="[aninfo.Businesslicense.length<2?'license': 'licensemore']" resize="cover" :src="'http://cdn.udian.me' + '/' + blimage + '!180compress'" />
                        </div>
                        <!--</scroller>-->
                    </div>
                    <div style="padding-left:32px;background-color: #ffffff">
                        <wxc-cell
                            title="食品安全许可证"
                            desc="店内拍摄食品安全许可证,要求许可证文本信息清晰可见"
                            :has-arrow="true"
                            :cellStyle="cellStyle"
                            @wxcCellClicked="imgPop(4, 1)"
                            :has-bottom-border="true">
                        </wxc-cell>
                        <!--<scroller v-if="aninfo.Foodsafetypermit.length > 0" flex-direction="row" scroll-direction="horizontal" show-scrollbar="false" style="flex-direction: row;height: 240px">-->
                            <div class="wrap-image " v-for="(ftpimage, index) in aninfo.Foodsafetypermit">
                                <image :class="[aninfo.Foodsafetypermit.length<2?'license': 'licensemore']" resize="cover" :src="'http://cdn.udian.me' + '/' + ftpimage + '!180compress'" />
                            </div>
                        <!--</scroller>-->
                    </div>
                    <div style="padding-left:32px;background-color: #ffffff">
                        <wxc-cell
                            title="门面图"
                            desc="需拍出完整门匾/门框(建议正对门店2米处拍摄)"
                            @wxcCellClicked="imgPop(5, 1)"
                            :has-arrow="true"
                            :cellStyle="cellStyle"
                        >
                        </wxc-cell>
                        <!--<scroller v-if="aninfo.Facade.length > 0" flex-direction="row" scroll-direction="horizontal" show-scrollbar="false" style="flex-direction: row;height: 240px">-->
                            <div class="wrap-image " v-for="(fimage, index) in aninfo.Facade">
                                <image :class="[aninfo.Facade.length<2?'license': 'licensemore']" resize="cover" :src="'http://cdn.udian.me' + '/' + fimage + '!180compress'" />
                            </div>
                        <!--</scroller>-->
                    </div>
                    <div style="padding-left:32px;background-color: #ffffff">
                        <wxc-cell
                            title="店内环境图(收银台)"
                            desc="需真实反映用餐环境(收银台/用餐桌椅等)"
                            @wxcCellClicked="imgPop(6, 1)"
                            :has-arrow="true"
                            :cellStyle="cellStyle"
                        >
                        </wxc-cell>
                        <!--<scroller v-if="aninfo.Insideshop.length > 0" flex-direction="row" scroll-direction="horizontal" show-scrollbar="false" style="flex-direction: row;height: 240px">-->
                            <div class="wrap-image " v-for="(isimage, index) in aninfo.Insideshop">
                                <image :class="[aninfo.Insideshop.length<2?'license': 'licensemore']" resize="cover" :src="'http://cdn.udian.me' + '/' + isimage + '!180compress'" />
                            </div>
                        <!--</scroller>-->
                    </div>
                    <div style="padding-left:32px;background-color: #ffffff">
                        <wxc-cell
                            title="店内环境图(用餐桌椅)"
                            desc="需真实反映用餐环境(收银台/用餐桌椅等)"
                            @wxcCellClicked="imgPop(7, 1)"
                            :has-arrow="true"
                            :cellStyle="cellStyle"
                        >
                        </wxc-cell>
                        <!--<scroller v-if="aninfo.InsideshopDesk.length > 0" flex-direction="row" scroll-direction="horizontal" show-scrollbar="false" style="flex-direction: row;height: 240px">-->
                            <div class="wrap-image " v-for="(isimage, index) in aninfo.InsideshopDesk">
                                <image :class="[aninfo.InsideshopDesk.length<2?'license': 'licensemore']" resize="cover" :src="'http://cdn.udian.me' + '/' + isimage + '!180compress'" />
                            </div>
                        <!--</scroller>-->
                    </div>
                    <div style="padding-left:32px;background-color: #ffffff">
                        <wxc-cell
                            title="收银台照片"
                            desc="图片需包含支付标示牌"
                            @wxcCellClicked="imgPop(8, 1)"
                            :has-arrow="true"
                            :cellStyle="cellStyle"
                        >
                        </wxc-cell>
                        <!--<scroller v-if="aninfo.Cashier.length > 0" flex-direction="row" scroll-direction="horizontal" show-scrollbar="false" style="flex-direction: row;height: 240px">-->
                            <div class="wrap-image " v-for="(cimage, index) in aninfo.Cashier">
                                <image :class="[aninfo.Cashier.length<2?'license': 'licensemore']" resize="cover" :src="'http://cdn.udian.me' + '/' + cimage + '!180compress'" />
                            </div>
                        <!--</scroller>-->
                    </div>
                </div>
            </div>
            <!--<div class="footer">-->
                <!--<text class="text-footer">提示:顾客使用在线支付付款后，该资金会在下一个工作日自动打款到您的收款账户,微信或支付宝会收取0.38%的手续费</text>-->
            <!--</div>-->
            <wxc-button text="下一步" :btnStyle="btnStyle" @wxcButtonClicked="test"></wxc-button>
        </scroller>
        <bmmask class="mask" animation="transition" position="bottom" :duration="300" ref="bmmask">
            <bmpop class="modal-bottom">
                <div class="wrap-pop">
                    <div class="cell-pop border-pop" @click="">
                        <text class="text-cell">拍照</text>
                    </div>
                    <div class="cell-pop" @click="addimg(type, mount)">
                        <text class="text-cell">从相册中选取</text>
                    </div>
                    <div class="cell-pop mt20">
                        <text class="text-cell">取消</text>
                    </div>
                </div>
            </bmpop>
        </bmmask>
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
                cellStyle: {
                    height: '140px',
                    lineHeight: '140px',
                    paddingLeft:'0px',
                    paddingRight:'32px'
                },
                btnStyle: {
                    backgroudColor: '#FF6F6F',
                    width: '750px',
                    height: '80px',
                    marginTop: '20px',
                    borderRadius: '0px'
                },
                flowData: [
                    {
                        desc: '填写收款账号'
                    },
                    {
                        desc: '审核'
                    },
                    {
                        desc: '开通完成'
                    }
                ],
                activeIndex: 0,
                preInfo: {},
                aninfo: {
                    // id_card_positive: [],
                    // id_card_negative: [],
                    // license: [],
                    // license_food: [],
                    // face_figure: [],
                    // shop_environment: [],
                    account_type: 1,
                    accountypeinfo: '个人账户',
                    bank_open: '招商银行',
                    bank_branch: '大坪支行',
                    bank_province: '重庆',
                    bank_city: '重庆',
                    account_name: '',
                    bank_mobile: '',
                    shop_address: '重庆市渝中区',
                    shop_street: '大坪英利国际',
                    IDfaceimg: [],
                    IDsideimg: [],
                    Businesslicense: [],
                    Foodsafetypermit: [],
                    Facade: [],
                    Insideshop: [],
                    InsideshopDesk: [],
                    Cashier: []
                },
                img_base_url: 'http://cdn.udian.me/',
                type: '',
                mount: ''
            }
        },
        created () {
            // this.getinfo()
            // this.$event.on('getaccountinfo', (params) => {
            //     this.aninfo.accountypeinfo = params.accountypeinfo
            //     this.aninfo.account_type = params.accountype
            // }
            this.$router.getParams().then(params => {
                this.preInfo = params
            })
        },
        methods: {
            test () {
                let _pramas = {
                    ...this.preInfo,
                    id_card_positive: this.aninfo.IDfaceimg.toString(),
                    id_card_negative: this.aninfo.IDfaceimg.toString(),
                    desk_photo: this.aninfo.Insideshop.toString(),
                    shop_cashier_photo: this.aninfo.InsideshopDesk.toString(),
                    license: this.aninfo.Businesslicense.toString(),
                    license_food: this.aninfo.Foodsafetypermit.toString(),
                    face_figure: this.aninfo.Facade.toString(),
                    // shop_environment: this.aninfo.Insideshop.toString(),
                    cashier_phone: this.aninfo.Cashier.toString()
                }
                collectShopPaymentInfo(_pramas, (data) => {
                    this.$notice.toast({
                        message: '完善信息成功'
                    })
                })
            },
            getinfo () {
                shopPaymentInfo({payment_id: 1}, (data) => {
                    console.log(data)
                })
            },
            addinfo (type) {
                this.$router.open({
                    name: 'accountReceivables.addarInfo',
                    params: {
                        type: type,
                    }
                })
            },
            go () {
                var patt1 = new RegExp(/^(((13[0-9]{1})|(15[0-9]{1})|(18[0-9]{1}))+\d{8})$/)
                if (this.aninfo.IDfaceimg.length < 1) {
                    this.$notice.toast({
                        message: '请添加身份证正面照'
                    })
                } else if (this.aninfo.IDsideimg.length < 1) {
                    this.$notice.toast({
                        message: '请添加身份证反面照'
                    })
                } else if (this.aninfo.Businesslicense.length < 1) {
                    this.$notice.toast({
                        message: '请添加营业执照'
                    })
                } else if (this.aninfo.Foodsafetypermit.length < 1) {
                    this.$notice.toast({
                        message: '请添加食品安全许可证'
                    })
                } else if (this.aninfo.Facade.length < 1) {
                    this.$notice.toast({
                        message: '请添加门面照'
                    })
                } else if (this.aninfo.Insideshop.length < 1) {
                    this.$notice.toast({
                        message: '请添加店内环境图(收银台)'
                    })
                } else if (this.aninfo.InsideshopDesk.length < 1) {
                    this.$notice.toast({
                        message: '请添加店内环境图(用餐桌椅)'
                    })
                } else if (this.aninfo.Cashier.length < 1) {
                    this.$notice.toast({
                        message: '请添加收银台照片'
                    })
                } else {
                    let _pramas = {
                        ...this.preInfo,
                        id_card_positive: this.aninfo.IDfaceimg.toString(),
                        id_card_negative: this.aninfo.IDfaceimg.toString(),
                        desk_photo: this.aninfo.Insideshop.toString(),
                        shop_cashier_photo: this.aninfo.InsideshopDesk.toString(),
                        license: this.aninfo.Businesslicense.toString(),
                        license_food: this.aninfo.Foodsafetypermit.toString(),
                        face_figure: this.aninfo.Facade.toString(),
                        // shop_environment: this.aninfo.Insideshop.toString(),
                        cashier_phone: this.aninfo.Cashier.toString()
                    }
                    collectShopPaymentInfo(_pramas, (data) => {
                        this.$notice.toast({
                            message: '完善信息成功'
                        })
                    })
                }
            },
            addimg (type, mount) {
                this.$refs.bmmask.hide()
                http.pickImgUpload(mount, (keys, imgs) => {
                    keys.forEach((item, index) => {
                        if (type === 1) {
                            this.aninfo.IDfaceimg = []
                            this.aninfo.IDfaceimg.push(item)  //身份证正面照
                            console.log(this.aninfo.IDfaceimg.join('#'))
                        }
                        if (type === 2) {
                            this.aninfo.IDsideimg = []
                            this.aninfo.IDsideimg.push(item)  //身份证反面照
                        }
                        if (type === 3) {
                            this.aninfo.Businesslicense = []
                            this.aninfo.Businesslicense.push(item)  //营业执照
                        }
                        if (type === 4) {
                            this.aninfo.Foodsafetypermit = []
                            this.aninfo.Foodsafetypermit.push(item)  //食品安全许可证
                        }
                        if (type === 5) {
                            this.aninfo.Facade = []
                            this.aninfo.Facade.push(item)  //门面照
                        }
                        if (type === 6) {
                            this.aninfo.Insideshop = []
                            this.aninfo.Insideshop.push(item)  //店内环境图
                        }
                        if (type === 7) {
                            this.aninfo.InsideshopDesk = []
                            this.aninfo.InsideshopDesk.push(item)
                        }
                        if (type === 8) {
                            this.aninfo.Cashier = []
                            this.aninfo.Cashier.push(item)  //收银台
                        }
                    })
                })
            },
            imgPop (t, m) {
                this.type = t
                this.mount = m
                this.$refs.bmmask.show()
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
    .wrap-image{
        align-items: center;
    }
    .image{
        width:700px;
        height:450px;
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
        /*padding-left: 20px;*/
    }
    .cell{
        padding-left: 0px !important;
    }
    .text-seller{
        font-size:30px;
        color: #666666;
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
        height:450px;
        margin-top: 20px;
    }
    /*.licensemorebox{*/
        /*width:340px;*/
        /*height:240px;*/
        /*padding-left: 22px;*/
        /*padding-right: 22px;*/
    /*}*/
    .licensemore{
        /*width:320px;*/
        /*height:220px;*/
        /*margin: 10px;*/
        width:700px;
        height:450px;
        margin-top: 20px;
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
        color: #9B9B9B;
        font-size:28px;
        padding-right: 10px;
        outline: none;
    }
    .mask {
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background-color: rgba(0, 0, 0, .4);
    }
    .modal-bottom{
        align-items: center;
        padding-bottom: 52px;
    }
    .wrap-pop{
        width:686px;
        height:380px;
        background-color: #F2F2F2;
        border-radius: 4px ;
    }
    .cell-pop{
        background-color: #ffffff;
        align-items: center;
    }
    .border-pop{
        border-bottom-width: 2px;
        border-bottom-style: solid;
        border-bottom-color: #EEEEEE;
    }
    .text-cell{
        font-size: 32px;
        color: #666666;
        height: 118px;
        line-height: 118px;
    }
    .mt20 {
        margin-top: 20px;
    }
</style>
