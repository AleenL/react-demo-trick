<template>
    <div>
        <scroller class="editInfo" v-if="showTime">
            <div class="setbox" v-if="type===1">
                <wxc-cell
                    title="店铺logo"
                    :has-arrow="true"
                    :has-top-border="true"
                    :auto-accessible="false"
                    @wxcCellClicked="pickImgLogo">
                    <image class="imglogo" :src="obj.shop_logo ? (obj.shop_logo + '!180compress') : 'bmlocal://assets/logo.png'" placeholder="bmlocal://assets/logo.png"/>
                </wxc-cell>
                <wxc-cell
                    title="店铺名称"
                    :has-arrow="true"
                    :has-top-border="false"
                    :has-bottom-border="false"
                    :auto-accessible="false">
                    <input type="text" class="inputs" v-model="obj.shop_name" placeholder="请输入店铺名称"/>
                </wxc-cell>
            </div>
            <div class="setbox" v-if="type===2">
                <wxc-cell
                        :title="title"
                        :has-top-border="true"
                        :has-bottom-border="false"
                        :auto-accessible="false">
                </wxc-cell>
                <textarea class="inputs1 m_top20" rows="5" v-if="title==='店铺公告'" v-model="obj.notice" :placeholder="'请输入'+title"></textarea>
                <textarea class="inputs1 m_top20" rows="5" v-if="title==='商家信息'" v-model="obj.shop_desc" :placeholder="'请输入'+title"></textarea>
            </div>
            <div class="setbox" v-if="type===3">
                <wxc-cell
                    :title="title"
                    :has-top-border="true"
                    :has-bottom-border="false"
                    :auto-accessible="false">
                </wxc-cell>
                <div class="imgingo m_top20">
                    <div v-for="(image, index) in obj.shop_picture" v-if="obj.shop_picture.length > 0">
                        <image class="headimg" resize="cover" :src="obj.img_base_url + '/' + image + '!180compress'" @click="previewImg(index)"/>
                        <text class="jian" @click="deleteImg(index)">&#xe61f;</text>
                    </div>
                    <div class="headimg add-box" @click="pickImg">
                        <text class="iconfont">&#xe612;</text>
                        <text class="text-icon">添加</text>
                    </div>
                </div>
            </div>
            <div class="setbox" v-if="type===4">
                <wxc-cell
                    :title="title"
                    :has-arrow="true"
                    :has-top-border="true"
                    :has-bottom-border="false"
                    :auto-accessible="false">
                    <input type="tel" class="inputs" maxlength="11" oninput="if(value.length>11)value=value.slice(0,11)" v-model="obj.contact_mobile" :placeholder="'请输入'+title"/>
                </wxc-cell>
            </div>
            <div class="setbox" v-if="type===5">
                <wxc-cell
                    :title="title"
                    :has-arrow="true"
                    :has-top-border="true"
                    :has-bottom-border="false"
                    :auto-accessible="false"
                    @wxcCellClicked="wxcCellClicked">
                    <text style="color: #9b9b9b;font-size: 28px;padding-right: 10px">{{obj.address}}</text>
                </wxc-cell>
              <wxc-cell
                    title="门牌号"
                    :has-top-border="true"
                    :has-bottom-border="false"
                    :auto-accessible="false"
                    >
                  <input type="text" class="inputs" v-model="obj.house_number" placeholder="请输入具体地址"/>
                </wxc-cell>
            </div>
            <div class="setbox" v-if="type===6">
                <wxc-cell
                    title="开始时间"
                    :has-arrow="true"
                    :has-top-border="true"
                    :has-bottom-border="false"
                    :auto-accessible="false">
                    <div style="padding-right: 10px;flex-direction: row;align-items: center">
                        <text class="time" @click="pickTime(1)">{{time.timeStart || '请选择'}}</text>
                    </div>
                </wxc-cell>
                <wxc-cell
                    title="结束时间"
                    :has-arrow="true"
                    :has-top-border="true"
                    :has-bottom-border="false"
                    :auto-accessible="false">
                    <div style="padding-right: 10px;flex-direction: row;align-items: center">
                        <text class="time" @click="pickTime(2)">{{time.timeEnd || '请选择'}}</text>
                    </div>
                </wxc-cell>
            </div>
            <div class="setbox" v-if="type===7">
                <wxc-cell
                    title="配送描述"
                    :has-top-border="false"
                    :has-bottom-border="true"
                    :auto-accessible="false">
                </wxc-cell>
                <textarea class="inputs1" rows="3" v-model="obj.delivery_desc" placeholder="请输入配送描述"></textarea>
                <wxc-cell class="m_top20"
                    title="配送信息"
                    :has-top-border="false"
                    :has-bottom-border="true"
                    :auto-accessible="false">
                </wxc-cell>
                <div class="delivery_desc">
                    <text class="desc-text">配送范围</text>
                    <input type="number" class="inputs-desc" v-model="obj.delivery_range" placeholder="请输入"/>
                    <text class="desc-text">米以内，配送费</text>
                    <input type="number" class="inputs-desc" v-model="obj.delivery_fee" placeholder="请输入"/>
                    <text class="desc-text">元</text>
                </div>
            </div>
            <div class="btnbox">
                <text class="btn" @click="keep">保存</text>
            </div>
        </scroller>
        <div v-else>
          <wxc-loading :show="!showTime" type="default" :need-mask="true"></wxc-loading>
        </div>
    </div>
</template>

<script>
    import { WxcMinibar, WxcCell, WxcLoading} from 'weex-ui'
    import http from '../utils/http'
    import { getShop , editShop } from '../services/employee'

    const modal = weex.requireModule('modal')
    const picker = weex.requireModule('picker')

    export default {
        components: { WxcMinibar, WxcCell, WxcLoading },
        data () {
            return {
                obj:{},
                title: '',
                showTime: false,
                type: '',
                time: {
                    timeStart: '',
                    timeEnd: ''
                }
            }
        },
        created() {
            this.$router.getParams((params) => {
                // 获取参数信息
                this.title = params.label
                this.type = params.type
            })
            this.getinfoByid()
            this.$event.on('locationInfo', params => {
              let loca = params.location.location.split(',')
              this.obj.province = params.location.pcode
              this.obj.city = params.location.citycode
              this.obj.county = params.location.adcode
              this.obj.lng = loca[0]
              this.obj.lat = loca[1]
              this.obj.address = params.location.address
            })
        },
        methods: {
            getinfoByid () {
                getShop({
                }, (data) => {
                    this.obj = data.data
                    this.showTime = true
                    let timer = this.obj.work_time.split('-')
                    this.time.timeStart = timer[0]
                    this.time.timeEnd = timer[1]
                    console.log(this.time.timeStart)
                }, (data) => {
                    modal.toast({
                        message: data.msg,
                        duration: 1
                    })
                })
            },
            keep () {
              if (this.is_click) {
                return false
              }
              this.is_click = true
              console.log(this.time.timeStart)
              if((this.time.timeStart > this.time.timeEnd) && this.type===6){
                    this.$notice.toast({
                        message: '开始时间不能大于结束时间',
                        duration: 1
                    })
                    return false
                }
                if(!this.obj.shop_name && this.type===1){
                    this.$notice.toast({
                        message: '请填写店铺名称!',
                        duration: 1
                    })
                    return false
                }
                if(this.type===7){
                    if(!this.obj.delivery_range){
                        this.$notice.toast({
                            message: '配送范围不能为空',
                            duration: 1
                        })
                        return false
                    }
                    if(!this.obj.delivery_fee){
                        this.$notice.toast({
                            message: '配送费不能为空',
                            duration: 1
                        })
                        return false
                    }
                }
                if(!this.obj.contact_mobile && this.type===4){
                    this.$notice.toast({
                        message: '请填写电话号码!',
                        duration: 1
                    })
                    return false
                }
                var patt1 = new RegExp(/^(((13[0-9]{1})|(14[0-9]{1})|(15[0-9]{1})|(17[0-9]{1})|(18[0-9]{1}))+\d{8})$/)
                var patt2 = new RegExp(/^([0-9]|[-])+$/g)
                if((!patt1.test(this.obj.contact_mobile) || !patt2.test(this.obj.contact_mobile)) && this.type===4){
                    this.$notice.toast({
                        message: '请填写正确的电话号码!',
                        duration: 1
                    })
                    return false
                }
                this.obj.shop_logo = this.obj.shop_logo === '' ? 'http://cdn.udian.me/logo.png' : this.obj.shop_logo
                editShop({
                    delivery_fee: this.obj.delivery_fee,
                    delivery_range: this.obj.delivery_range,
                    delivery_desc: this.obj.delivery_desc,
                    shop_name: this.obj.shop_name,
                    shop_logo: this.obj.shop_logo,
                    province: this.obj.province,
                    city: this.obj.city,
                    county: this.obj.county,
                    address: this.obj.address,
                    house_number: this.obj.house_number,
                    lng: this.obj.lng,
                    lat: this.obj.lat,
                    work_time: this.time.timeStart+'-'+this.time.timeEnd,
                    work_state: this.obj.work_state,
                    contact_mobile: this.obj.contact_mobile,
                    contact_name: this.obj.contact_name,
                    shop_desc: this.obj.shop_desc,
                    notice: this.obj.notice,
                    shop_picture: this.obj.shop_picture,
                    license: this.obj.license,
                    license_food: this.obj.license_food,
                    id_card: this.obj.id_card
                }, (data) => {
                    this.obj = data.data
                    modal.toast({
                        message: '修改成功',
                        duration: 1
                    })
                    this.is_click = false
                    this.$event.emit('updateRegionList')
                    this.$router.back()
                }, (data) => {
                    this.is_click = false
                    modal.toast({
                        message: data.msg,
                        duration: 1
                    })
                })
            },
            wxcCellClicked (){
                this.$router.open({
                    name: 'chooseAddress'
                })
            },
            deleteImg (index) {
                this.obj.shop_picture.splice(index, 1)
            },
            pickTime (e) {
                picker.pickTime({
                    value: e == 1 ? this.time.timeStart : this.time.timeEnd
                }, event => {
                    if (event.result === 'success') {
                        if (e == 1) {
                            this.time.timeStart = event.data
                        } else {
                            this.time.timeEnd = event.data
                        }
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
            pickImg () {
                http.pickImgUpload(9, (keys, imgs) => {
                    keys.forEach((item, index) => {
                        this.obj.shop_picture.push(item)
                    })
                })
            },
            pickImgLogo () {
                http.pickImgUpload(1, (keys, imgs) => {//keys 没有前缀的数组，imgs是有图片前缀并加180的图片，前面数字是最多选几张图片
                    this.obj.shop_logo = 'http://cdn.udian.me/' + keys[0]
                })
            }
        }
    }
</script>

<style scoped>
    .editInfo{
        background-color: #f2f2f2;
        padding-top: 20px;
    }
    .imglogo{
        width: 120px;
        height: 120px;
        border-radius: 8px;
        margin-right: 10px;
        background-color: #087555;
    }
    .m_top20{
        margin-top: 20px;
    }
    .time{
        color: #9b9b9b;
        font-size: 28px;
        text-align: center;
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
    .inputs1{
        height: 250px;
        padding: 15px;
        color: #9B9B9B;
        background-color: #fff;
        line-height: 50px;
        font-size:28px;
        outline: none;
        box-sizing: content-box;
    }
    .delivery_desc{
        color: #9b9b9b;
        /*height: 70px;*/
        font-size: 28px;
        background-color: #fff;
        flex-direction: row;
        padding-left: 24px;
        padding-right: 10px;
        padding-top: 20px;
        padding-bottom: 20px;
        box-sizing: content-box;
    }
    .inputs-desc{
        width: 130px;
        height: 50px;
        line-height: 50px;
        text-align: center;
        color: #9B9B9B;
        font-size:28px;
        outline: none;
    }
    .desc-text{
        height: 50px;
        line-height: 50px;
        color: #444;
        font-size: 28px;
    }
    .imgingo{
        flex-direction: row;
        background-color: white;
        flex-wrap: wrap;
        margin-top: 20px;
        padding-top: 30px;
        padding-left:  24px;
        padding-right:  24px;
        padding-bottom: 30px;
    }
    .headimg{
        width: 160px;
        height: 160px;
        margin-right: 10px;
        margin-bottom: 10px;
    }
    .jian{
        font-family: iconfont;
        position: absolute;
        right: 12px;
        top: 0;
        font-size: 24px;
        color: #FE5586;
    }
    .add-box{
        background-color: #F7F8FA;
        align-items: center;
        justify-content: center;
    }
    .iconfont{
        font-family: iconfont;
        font-size: 36px;
        color: #9B9B9B;
    }
    .text-icon{
        font-size: 24px;
        line-height: 34px;
        height: 40px ;
        color: #9B9B9B;
        letter-spacing: -0.58px;
    }
    .btnbox{
        padding: 0px 32px;
        margin-top: 150px;
        margin-bottom: 150px;
        height: 80px;
    }
    .btn{
        background-color: rgba(255,111,111,1);
        height: 80px;
        line-height: 80px;
        border-radius: 8px ;
        font-size: 26px;  color: #FFFFFF;  letter-spacing: 3px;text-align: center;
    }
</style>
