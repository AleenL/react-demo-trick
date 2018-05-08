<template>
    <div>
        <scroller class="scroller">
            <wxc-cell :has-arrow="true" :cell-style="topCell" @wxcCellClicked="goEdit(1,'')" style="margin-bottom: 20px">
                <!--<image style="width: 120px;height: 120px;border-radius: 8px ;background-color: #087555 ;" slot="label" :src="obj.shop_logo"></image>-->
                <image slot="label" class="imglogo" :src="obj.shop_logo ? (obj.shop_logo + '!180compress') : 'bmlocal://assets/logo.png'" placeholder="bmlocal://assets/logo.png"/>
                <text slot="title" class="text-cell">{{obj.shop_name}}</text>
            </wxc-cell>
            <div style="padding-left:32px;background-color: #ffffff">
                <wxc-cell label="店铺公告" :cell-style="cellStyleObj" :has-arrow="true" @wxcCellClicked="goEdit(2,'店铺公告')"></wxc-cell>
            </div>
            <div class="div-info margin_bottom20">
                <text class="text-info">{{obj.notice || '请填写店铺公告'}}</text>
            </div>
            <div style="padding-left:32px;background-color: #ffffff">
                <wxc-cell label="店铺照片" :cell-style="cellStyleObj" :has-arrow="true" @wxcCellClicked="goEdit(3,'店铺照片')"></wxc-cell>
            </div>
            <div class="imgingo margin_bottom20">
                <scroller style="height: 160px;flex-direction: row"  flex-direction="row" scroll-direction="horizontal" show-scrollbar="false">
                    <div class="shop_picture" v-for="(image, index) in obj.shop_picture" v-if="obj.shop_picture && obj.shop_picture.length > 0">
                        <image class="headimg" :src="obj.img_base_url + '/' + image + '!180compress'" @click="previewImg(index)"/>
                    </div>
                    <text class="text-info" v-if="obj.shop_picture && obj.shop_picture.length == 0">还没有店铺照片请上传</text>
                </scroller>
            </div>
            <div style="padding-left:32px;background-color: #ffffff">
                <wxc-cell label="配送信息" :cell-style="cellStyleObj" :has-arrow="true" style="margin-bottom: 1px;" @wxcCellClicked="goEdit(7,'配送信息')"></wxc-cell>

            </div>
            <div class="div-info2 margin_bottom20">
                <text class="text-info" v-if="obj.delivery_range == '' && obj.delivery_desc == ''">请填写配送信息</text>
                <div v-else>
                    <text class="text-info">{{obj.delivery_desc}}</text>
                    <text class="text-info">配送范围{{obj.delivery_range}}米以内，配送费{{obj.delivery_fee}}元</text>
                </div>
            </div>
            <div style="padding-left:32px;background-color: #ffffff">
                <wxc-cell label="商家信息" :cell-style="cellStyleObj" :has-arrow="true" @wxcCellClicked="goEdit(2,'商家信息')"></wxc-cell>

            </div>
            <div class="div-info margin_bottom20">
                <text class="text-info">{{obj.shop_desc || '请填写商家信息'}}</text>
            </div>
            <div style="padding-left:32px;background-color: #ffffff">
                <wxc-cell label="经营品类" :cell-style="cellStyleObj" >
                    <text class="text-seller" style="margin-right: 32px">{{obj.type_str}}</text>
                </wxc-cell>
                <wxc-cell label="商家电话" :cell-style="cellStyleObj" :has-arrow="true" @wxcCellClicked="goEdit(4,'商家电话')">
                    <text class="text-seller">{{obj.contact_mobile || '请填写商家电话'}}</text>
                </wxc-cell>
                <wxc-cell label="商家地址" :cell-style="cellStyleObj" :has-arrow="true" @wxcCellClicked="goEdit(5,'商家地址')">
                    <text class="text-seller">{{obj.address || '请选择商家地址'}}{{obj.house_number}}</text>
                </wxc-cell>
                <wxc-cell label="营业时间" :cell-style="cellStyleObj" :has-arrow="true" @wxcCellClicked="goEdit(6,'营业时间')">
                    <text class="text-seller">{{obj.work_time || '请选择营业时间'}}</text>
                </wxc-cell>
            </div>

            <!--<my-cell label="营业资质" :has-arrow="true" style="margin-top: 20px"></my-cell> -->
        </scroller>
    </div>
</template>

<script>
    import { WxcMinibar, Utils ,WxcCell} from 'weex-ui'
    import { getShop } from '../services/employee'

    var modal = weex.requireModule('modal')

    export default {
        components: {
            WxcMinibar,
            WxcCell,
        },
        data () {
            return {
                topCell: {
                    height: '204px',
                    // marginBottom: '20px',
                    borderTopWidth: '1px',
                    borderTopStyle: 'solid',
                    borderTopColor: '#eeeeee',
                    paddingRight: '32px'
                },
                obj: {},
                cellStyleObj:{paddingLeft:'0',height:'100px',paddingRight: '32px'}

            }
        },
        created () {
            this.getinfoByid()
        },
        eros: {
            beforeAppear () {
                this.getinfoByid()
            },
            beforeBackAppear () {
                this.getinfoByid()
            }
        },
        methods: {
            getinfoByid () {
                getShop({
                }, (data) => {
                    this.obj = data.data
                })
            },
            goEdit (value,label) {
                let type = value
                this.$router.open({
                    name: 'storeInfo.storeInfoEdit',
                    params: {
                        type: type,
                        label:label,
                        shop_logo: this.obj.shop_logo,
                        shop_name: this.shop_name,
                        notice: this.notice,
                        shop_picture: this.shop_picture,
                        shop_desc: this.shop_desc,
                        contact_mobile: this.contact_mobile,
                        address: this.address,
                        house_number: this.house_number,
                        work_time: this.work_time
                    }
                })

            },
            previewImg (index) {
              let arr = []
              this.obj.shop_picture.forEach((item) => {
                arr.push(this.obj.img_base_url + '/' + item)
              })
              this.$image.preview({
                index: index,                     // 所点击图片下标
                images: arr,        // 图片的网络地址
              })
            },
        }
    }
</script>

<style scoped>
    .scroller{
        background-color: #f2f2f2;
        padding-top: 20px;
    }
    .imglogo{
        width: 120px;
        height: 120px;
        border-radius: 8px ;
    }
    .text-cell{
        font-size: 32px;
        color: #121C32;
        letter-spacing: -0.78px;
        margin-left: 20px;
    }
    .margin_bottom20{
        margin-bottom: 20px;
    }
    .div-info{
        background-color: #fff;
        /*padding:30px 32px;*/
        padding-top: 30px;
        padding-bottom: 30px;
        padding-left: 32px;
        padding-right: 32px;
        justify-content: center;
    }
    .text-info{
        font-size: 28px;
        line-height: 40px;
        color: #666666;
        letter-spacing: -0.50px;
    }
    .imgingo{
        flex-direction: row;
        background-color: white;
        padding-top: 30px;
        padding-left:  24px;
        padding-right:  24px;
        padding-bottom: 30px;
    }
    .shop_picture{
        flex-direction: row;
        width: auto;
    }
    .headimg{
        width: 160px;
        height: 160px;
        margin-right: 10px;
        margin-bottom: 10px;
        border-radius: 4px;
    }
    .div-info2{
        background-color: #fff;
        /*padding:30px 32px;*/
        padding-top: 30px;
        padding-bottom: 30px;
        padding-left: 32px;
        padding-right: 32px;
        margin-bottom: 20px;
    }
    .text-seller{
        font-size:24px;
        color: #666666;
        letter-spacing: -0.34px;
        margin-right: 10px;
    }
</style>
