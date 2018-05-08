<template>
    <div class="content">
        <div style="margin-top: 20px;margin-bottom: 20px ">
            <wxc-cell :has-arrow="true" @wxcCellClicked="go">
                <text slot="label">区域</text>
                <text slot="value" class="cell-text" :style="desk.area_name !== '请选择' && {color: '#111'}">{{desk.area_name}}</text>
            </wxc-cell>
            <wxc-cell >
                <text slot="label">桌位名称</text>
                <input type="text"
                       placeholder="请输入桌位名称"
                       slot="value"
                       :value="desk.desk_name"
                       @input="inputDeskName"
                       class="inputs"
                       >
            </wxc-cell>


            <wxc-cell >
                <text slot="label">桌位人数</text>
                <wxc-stepper :default-value="parseInt(desk.num)"
                             slot="value"
                             @wxcStepperValueIsMinOver="wxcStepperValueIsMinOver"
                             @wxcStepperValueChanged="setNum">
                </wxc-stepper>
            </wxc-cell>
        </div>
        <div>
            <wxc-cell>
                <text slot="label">自助点餐</text>
                <div slot="value" style="flex-direction: row">
                    <div class="outCircle mr30" @click="toggleEnable(1)" >
                        <text class="iconfont active" v-if="desk.is_service == 1">&#xe6f9;</text>
                        <text class="iconfont" v-if="desk.is_service == 0">&#xe6fa;</text>
                        <text class="text-desc">启用</text>
                    </div>
                    <div class="outCircle" @click="toggleEnable(0)">
                        <text class="iconfont active" v-if="desk.is_service == 0">&#xe6f9;</text>
                        <text class="iconfont" v-if="desk.is_service == 1">&#xe6fa;</text>
                        <text class="text-desc">禁用</text>
                    </div>
                </div>

            </wxc-cell>
            <div class="scan" v-if="isShowCode">
                <div class="ac">
                    <image class="img" :src="codeUrl"> </image>
                </div>
                <text class="text-scan blod">自动生成的本桌二维码</text>
                <text class="text-scan">1.下载并打印次二维码，贴在对应的餐桌或座牌上</text>
                <text class="text-scan">2.用户可以通过微信扫描此二维码后，可用手机进行下单，结账等操作</text>
            </div>
            <div class="bt-wrap">
                <wxc-button class="bt" @wxcButtonClicked="addTable" text="保存"></wxc-button>
            </div>
            <overlay :obj="obj"
                     @close="closeOverlay"
                     @deleteEvent="deleteItem"
            ></overlay>
        </div>
        <wxc-mask height="800"
                  width="702"
                  border-radius="0"
                  duration="200"
                  mask-bg-color="#FFFFFF"
                  :has-animation="true"
                  :has-overlay="true"
                  :show-close="true"
                  :show="maskShow"
                  @wxcMaskSetHidden="wxcMaskSetHidden">
            <div class="msak-content">
                <text>长按二维码保存</text>
                <image class="msak-image" resize="stretch" ref="codeImage" @longpress="keepToNative" :src="maskCodeUrl"></image>
            </div>
        </wxc-mask>
    </div>
</template>

<script>
    import { WxcCell, WxcButton, WxcMinibar, WxcStepper, WxcMask} from 'weex-ui'
    import { deleteDesk, editDesk } from '../services/region.js'

    export default {
        components: {
            WxcMinibar,
            WxcCell,
            WxcButton,
            WxcStepper,
            WxcMask,
            overlay: require('./deleteOverlay.vue')
        },
        data () {
            return {
                desk: {
                    is_service: 1,
                    desk_name: '',
                    desk_id: '',
                    shop_id:'',
                    num: 1,
                    area_name: '请选择',
                    area_id: '',
                    activeIndex: -1,
                    edit: false,
                },
                obj: {
                    offset: {
                        top: '0px',
                        right: '34px'
                    },
                    isShow: false,
                },
                maskShow:false,//是否显示二维码弹层,
                maskCodeUrl:'',//二维码弹层地址
                btUsable: true,
            }
        },
        computed: {
            //是否在按钮上方直接显示二维码
            isShowCode(){
                return this.desk.edit&&this.desk.is_service==1
            },
            //二维码地址
            codeUrl(){
                let {shop_id,desk_id} = this.desk;
                return this.createCodeUrl(shop_id,desk_id)
            }
        },
        created(){
            this.$router.getParams().then(params => {
                this.desk.edit = params.edit
                if (params.edit) {
                    this.desk = params
                    this.$navigator.setRightItem({
                        image: 'bmlocal://assets/editImage@2x.png'
                    }, () => {
                        this.obj.isShow = !this.obj.isShow
                    })
                }
            })
            this.$event.on('updateRegionList', () => {
                this.desk.activeIndex += 1
            })
            this.$event.on('chooseArea', (resData) => {
                this.desk.area_id = resData.area_id
                this.desk.area_name = resData.area_name
                this.desk.activeIndex = resData.activeIndex
            })
        },
        methods: {
            wxcStepperValueIsMinOver () {
                this.$notice.toast({
                    message: '桌位人数不能小于1'
                })
                this.desk.num = 1
            },
            inputDeskName (e) {
                this.desk.desk_name = e.value
            },
            toggleEnable (e) {
                this.desk.is_service = e
            },
            setNum (e) {
                this.desk.num = e.value
            },
            addTable () {
                if (!this.btUsable) return
                this.btUsable = true
                if(this.desk.area_id === '') {
                    this.$notice.toast({
                        message: '请选择区域'
                    })
                    return false
                }
                if(this.desk.desk_name === '') {
                    this.$notice.toast({
                        message: '请填写桌台名称'
                    })
                    return false
                }
                // if (this.desk.edit) {}
                editDesk(this.desk, (result) => {
                    this.$event.emit('addDeskSuccess', '1')
                    this.$router.back()
                    if(!this.desk.edit&&this.desk.is_service){
                        let {shop_id,desk_id} = result;
                        this.maskCodeUrl = this.createCodeUrl(shop_id,desk_id)
                        this.maskShow = true;
                        return;
                    }
                    setTimeout(() => {
                        this.btUsable = true
                    }, 1000)
                })
            },
            closeOverlay () {
                this.obj.isShow = false
            },
            deleteItem () {
                let self = this
                this.obj.isShow = false
                this.$notice.confirm({
                    title: '',
                    message: `确认删除${this.desk.area_name}下的${this.desk.desk_name}座位？`,
                    okTitle: '确认',
                    cancelTitle: '取消',
                    okCallback() {
                        // 点击确认按钮的回调
                        deleteDesk({
                            desk_id: self.desk.desk_id
                        }, () => {
                            self.$event.emit('updateTablesList')
                            self.$notice.toast({
                                message: '删除成功'
                            })
                            self.$router.back()
                        })
                    },
                    cancelCallback() {
                    }
                })
            },
            go () {
                this.$router.open({
                    name: 'areaManage',
                    params: {
                        choose: true,
                        activeIndex: this.desk.activeIndex
                    }
                })
            },
            wxcMaskSetHidden () {
                this.maskShow = false;
                this.$router.back();

            },
            keepToNative () {
                console.log('触发longpress')
                let codeImage = this.$refs.codeImage;
                codeImage.save((result)=>{
                    this.$notice.toast({
                        message: '保存成功'
                    })
                })
            },
            createCodeUrl(shop_id,desk_id){
                return `http://frontend.udian.me/site/create-code?shop_id=${shop_id}&desk_id=${desk_id}`;
            }
        }
    }
</script>

<style scoped>
    .content{
        background-color: #f2f2f2;
    }
    .iconfont{
        font-family: iconfont;
        font-size: 36px;
        color: #9B9B9B;
    }
    .active{
        color: #F77F4F;
    }
    .cell-text{
        width:360px;
        height:40px;
        font-size:28px;
        color:rgba(197,197,197,1);
        line-height:40px;
        text-align: right;
        padding-right: 28px;
    }
    .outCircle{
        flex-direction: row;
        justify-content: center;
        align-items: center;
        align-content: center;
        /*padding-right: 28px;*/
    }
    .inCircle{
        width: 16px;
        height: 16px;
        border-radius: 50%;
        background-color: #FD3E69;;
    }
    .text-desc{
        margin-left: 10px;
        font-size: 28px;
        color: #666;
    }
    .scan{
        background-color:#fff;
        width: 750px
    }
    .img{
        width: 330px;
        height: 330px;
        margin-top: 16px;
        margin-bottom: 9px;
    }
    .text-scan{
        margin: 0 25px;
        font-size: 24px;
        line-height: 34px;
        color: #666666;
        letter-spacing: -0.58px;
    }
    .text-scan{
        margin: 0 25px;
        font-size: 24px;
        line-height: 34px;
        color: #666666;
        letter-spacing: -0.58px;
    }
    .bt-wrap{
        width: 750px;
        margin-top: 50px;
        align-items: center;
    }
    .bt{
        width:686px;
        border-radius:8px;
        background-color: #FC345C ;
    }
    .ac{
        align-items: center;
    }
    .blod{
        font-weight: bold;
    }
    .mr30 {
        margin-right: 30px;
    }
    .inputs {
        width:360px;
        text-align:right;
        height: 40px;
        line-height: 40px;
        font-size: 28px
    }
    .msak-content{
        height: 800px;
        justify-content: center;
        align-items: center;
    }
    .msak-image{
        width: 328px;
        height: 330px;
    }
</style>
