<template>
    <div class="editgoodss">
        <div class="imgingo">
            <!--<image class="headimg" src="http://wx.qlogo.cn/mmopen/Z7kTvJzVWnxzo9qCEtvynvACZpfu4yhhXFg1J4FO4k69cRUictURDwP8TzlRxKoJ9RQOVpBhyVHYwEljicIWhVRU5qRqCyaCTR/132" />-->
            <div v-for="(image, index) in goods.goods_imgs_arr" v-if="goods.goods_imgs_arr.length > 0">
                <image class="headimg" :src="goods.img_path_url + '/' + image + '!180compress'" @click="previewImg(index)"/>
                <text class="jian" @click="deleteGoods(index)">&#xe61f;</text>
            </div>
            <div class="headimg add-box" @click="pickImg">
                <text class="iconfont">&#xe612;</text>
                <text class="text-icon">添加</text>
            </div>
        </div>
        <div class="demo m_top10 padding_left_32">
            <wxc-cell title="上架状态"
                      :cell-style="cellStyleObj"
                     :has-arrow="false"
                     :has-top-border="false">
                <switch slot="value"
                        :checked="goods.state === 1 || goods.state === '1'"
                        @change="onChange"
                ></switch>
            </wxc-cell>
        </div>
        <div class="demo padding_left_32">
            <wxc-cell class="l_style" title="名称"
                      :cell-style="cellStyleObj"
                     :has-arrow="false"
                     :has-top-border="false"
                     :has-bottom-border="false"
            >
                <input type="text"
                       class="input-box"
                       :value="goods.goods_name"
                       @input="changeGoods_name"
                       placeholder="请输入商品名称"
                >
            </wxc-cell>
        </div>
        <div class="demo padding_left_32">
            <wxc-cell title="特点"
                      :cell-style="cellStyleObj"
                     :has-arrow="false"
                     :has-top-border="true"
                     :has-bottom-border="false"
            >
                <input type="text"
                       class="input-box"
                       :value="goods.goods_brief"
                       @input="changeGoods_brief"
                       placeholder="请输入商品特征"
                >
            </wxc-cell>
        </div>
        <div class="demo padding_left_32">
            <wxc-cell title="分类"
                      :cell-style="cellStyleObj"
                     :has-arrow="true"
                     :has-top-border="true"
                     :has-bottom-border="false"
                     @wxcCellClicked="setCategory"
            >
                <text slot="value" class="r_style m_r24">{{goods.cate_name || '请选择'}}</text>
            </wxc-cell>
        </div>
        <div class="demo m_top10 padding_left_32">
            <wxc-cell title="价格"
                      :cell-style="cellStyleObj"
                     :has-arrow="true"
                     :has-top-border="false"
                     :has-bottom-border="false"
            >
                <text slot="value" class="r_style m_r24" @click="editGoodsItem('price')">￥{{goods.price || '0.00'}}</text>
            </wxc-cell>
        </div>
        <div class="demo padding_left_32">
            <wxc-cell title="商品码"
                      :cell-style="cellStyleObj"
                     :has-arrow="true"
                     :has-top-border="true"
                     :has-bottom-border="false"
                     @wxcCellClicked="open"
            >
                <text slot="value" class="r_style m_r24">{{goods.bar_code || '请填写商品条形码'}}</text>
            </wxc-cell>
        </div>
        <div class="demo padding_left_32">
            <wxc-cell title="规格"
                      :cell-style="cellStyleObj"
                     :has-arrow="true"
                     :has-top-border="true"
                     :has-bottom-border="false"
            >
                <text slot="value" class="r_style m_r24" @click="editGoodsItem('format')">{{(goods.goods_unit_msg) || '请填写商品规格参数'}}</text>
            </wxc-cell>
        </div>
        <div class="demo padding_left_32">
            <wxc-cell title="库存"
                      :cell-style="cellStyleObj"
                     :has-arrow="false"
                     :has-top-border="true"
                     :has-bottom-border="false"
            >
                <input type="number"
                       slot="value"
                       class="input-box"
                       :value="goods.goods_stock"
                       @input="changeGoods_stock"
                       placeholder="请输入"
                >
            </wxc-cell>
        </div>
        <wxc-popup popup-color="rgba(255, 255, 255, 0)"
                   :show="isBottomShow"
                   @wxcPopupOverlayClicked="popupOverlayBottomClick"
                   pos="bottom"
                   height="320">
            <div class="pop">
                <div class="first_btn" @click="actionsheetBtnClick"><text class="chooseMa box1">手动输入</text></div>
                <div class="second_btn" @click="saoCode()"><text class="chooseMa box2 ">扫码输入</text></div>
                <div class="close" @click="cancelClick"><text class="chooseMa box">取消</text></div>
            </div>
        </wxc-popup>
        <wxc-mask
            height="320"
            width="680"
            top="280"
            border-radius="15"
            duration="200"
            mask-bg-color="#FFFFFF"
            :has-overlay="true"
            :show-close="false"
            :show="showBar">
            <div>
                <div class=""><text class="t_center font_20 mask_title">商品条形码</text></div>
                <div class="flex_item"><input placeholder="请输入" type="tel" :autofocus="true" v-model="codeInput" class="mask_input"></div>
                <div class="flex_row justify_center align_center">
                    <text class="flex_item t_center mask_btn" @click="showBar = false">取消</text>
                    <text class="flex_item t_center mask_btn left_bor" @click="editCode">确认</text>
                </div>
            </div>
        </wxc-mask>
    </div>
</template>

<script>
    import { WxcButton, WxcMinibar, WxcPopup, WxcMask, WxcCell } from 'weex-ui'
    import http from '../utils/http'
    import { addOrEditGoods, shopGoodsDetail, systemGoodsDetail } from '../services/goods.js'
    const modal = weex.requireModule('modal')
    const globalEvent = weex.requireModule('globalEvent')

    export default {
        components: {
            WxcCell,
            WxcButton,
            WxcMinibar,
            WxcPopup,
            WxcMask,
        },
        data () {
            return {
                goods_id: '',
                goodsListIndex: '',
                isBottomShow: false,
                showBar: false,
                codeInput: '',
                goods: {},
                cellStyleObj:{paddingLeft:'0',height:'100px',paddingRight: '32px'}
            }
        },
        created () {
            //设置导航条右侧区域
            this.$navigator.setRightItem({
                text: '保存',                             // 展示的文字 (和图片 二选一)
                textColor: '#FE5383',                    // 文字颜色 (默认为白色)
                fontSize: '32',                         // 字号（默认32px）
                fontWeight: 'normal',                   // 是否加粗（默认不加粗）
            }, () => {
                // 点击回调
                this.editGoodsFn()
            })
            // 从分类页面跳转过来还是首次编辑页面
            this.$event.on('classifyModify', params => {
                this.goods.cate_name = params.cate_name
                this.goods.cate_pid = params.cate_pid
                this.$set(this.goods, 'cate_name', params.cate_name)
            })
            // 修改价格
            this.$event.on('goodsItemEdit', params => {
                console.log(params)
                if(params.price) this.goods.price = params.price
                if(params.goods_spec) {
                    this.goods.goods_spec = params.goods_spec
                    this.goods.goods_unit = params.goods_unit
                    this.goods.goods_unit_msg = params.goods_spec + '/' + params.goods_unit
                }
            })
            this.$router.getParams().then((params) => {
                if (params.goods_id) {
                    this.goodsListIndex = params.index
                    this.goods_id = params.goods_id
                    this.getShopGoods()
                } else {
                    this.goods = {
                        goods_name: '',
                        goods_brief: '',
                        goods_stock: '',
                        bar_code: '',
                        brand_id: '0',
                        brand_name: '自营',
                        price: '',
                        cate_pid: '',
                        state: 1,
                        cate_name: '',
                        goods_unit_msg: '',
                        goods_unit: '',
                        goods_spec: '',
                        goods_imgs_arr: [],
                        img_path_url: 'http://cdn.udian.me'
                    }
                }
            })
        },
        methods: {
            open() {
                this.isBottomShow = true;
            },
            changeGoods_name(e) {
                this.goods.goods_name = e.value;
            },
            changeGoods_brief(e) {
                this.goods.goods_brief = e.value;
            },
            changeGoods_stock(e) {
                this.goods.goods_stock = e.value;
            },
            cancelClick(item,index) {
                this.isBottomShow = false;
            },
            editCode(e) {
                this.goods.bar_code = this.codeInput
                this.showBar = false
            },
            actionsheetBtnClick() {
                this.isBottomShow = false;
                this.showBar = true
                this.codeInput = this.goods.bar_code
            },
            getShopGoods () {
                shopGoodsDetail({ goods_id: this.goods_id }, (data) => {
                    data.data.goods_stock =  !data.data.goods_stock ? '' : data.data.goods_stock
                    this.goods = {...data.data, goods_imgs_arr: data.data.goods_imgs.split('#') }
                })
            },
            getGoods () {
                systemGoodsDetail({ goods_id: this.goods_id }, (data) => {
                    data.data.goods_stock =  !data.data.goods_stock ? '' : data.data.goods_stock
                    this.goods = {...data.data, goods_imgs_arr: data.data.goods_imgs.split('#')}
                })
            },
            deleteGoods (index) {
                this.goods.goods_imgs_arr.splice(index, 1)
            },
            saoCode () {
                this.$tools.scan().then((resData) => {
                    console.log(resData)
                    this.isBottomShow = false;
                    this.goods.bar_code = resData.text
                })
            },
            popupOverlayBottomClick () {
                this.isBottomShow = false;
            },
            previewImg (index) {
                let arr = []
                this.goods.goods_imgs_arr.forEach((item) => {
                    arr.push(this.goods.img_path_url + '/' + item)
                })
                this.$image.preview({
                    index: index,                     // 所点击图片下标
                    images: arr,        // 图片的网络地址
                })
            },
            pickImg () {
                http.pickImgUpload(9, (keys, imgs) => {
                    keys.forEach((item, index) => {
                        this.goods.goods_imgs_arr.push(item)
                    })
                })
            },
            setCategory () {
                this.$router.open({
                    name: 'classifyGoods',
                    type: 'PRESENT',
                    params: {
                      edit: true
                    }
                })
            },
            onChange (e) {
                this.goods.state = e.value ? 1 : 0
            },
            editGoodsFn () {
                let data = this.goods
                data.goods_imgs = data.goods_imgs_arr.join('#')
                data.original_price = data.price
                data.goods_id = this.goods_id
                if (data.goods_imgs === '') {
                  modal.toast({
                    message: '请选择商品图片',
                    duration: 1
                  })
                  return false
                }
                if (data.goods_name === '') {
                  modal.toast({
                    message: '请填写商品名称',
                    duration: 1
                  })
                  return false
                }
                if (data.goods_brief === '') {
                  modal.toast({
                    message: '请填写商品特征',
                    duration: 1
                  })
                  return false
                }
                if (data.cate_pid === '') {
                  modal.toast({
                    message: '请选择商品分类',
                    duration: 1
                  })
                  return false
                }
                if (data.original_price === '') {
                  modal.toast({
                    message: '请填写商品价格',
                    duration: 1
                  })
                  return false
                }
                if (data.bar_code === '') {
                  modal.toast({
                    message: '请填写商品条形码',
                    duration: 1
                  })
                  return false
                }
                if (data.goods_spec === '' || data.goods_unit == '') {
                  modal.toast({
                    message: '请填写商品规格单位',
                    duration: 1
                  })
                  return false
                }
                if (data.goods_stock === '') {
                  modal.toast({
                    message: '请填写商品库存',
                    duration: 1
                  })
                  return false
                }
                addOrEditGoods(data, (data) => {
                    modal.toast({
                        message: !this.goods_id ? '添加商品成功' : '编辑商品成功',
                        duration: 1
                    })
                    setTimeout(() => {
                      let pamse = {
                        index: this.goodsListIndex + 1,
                        goods: data.data
                      }
                      // if (this.goods_id)
                      // this.$event.emit('newGoods', pamse)
                      this.$event.emit('newGoods')
                      this.$router.back()
                    }, 500)
                })
            },
            editGoodsItem (value) {
                let type = value === 'price' ? 1 : 2
                this.$router.open({
                    name: 'goodsManage.editGoodsItem',
                    params: {
                        type,
                        goods_spec: this.goods.goods_spec,
                        goods_unit: this.goods.goods_unit,
                        price: this.goods.price
                    }
                })
            }
        }
    }
</script>
<style scoped src="../common.css"></style>
<style scoped>
    .editgoods{
        background-color: #f6f6f6;
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
        height: 164px;
        margin-right: 10px;
        margin-bottom: 10px;
    }
    .m_top10{
        margin-top: 20px;
    }
    .l_style{
        font-size: 28px;
        color: #121C32;
    }
    .r_style{
        font-size: 28px;
        color: #666666;
        letter-spacing: -0.7px;
    }
    .input-box{
        text-align: right;
        width: 400px;
        height: 80px;
        line-height: 80px;
        margin-left: 30px;
        outline: none;
        font-size:28px;
        color: #666666;
    }
    .m_r24{
        margin-right: 24px;
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
    .text-right{
        font-size: 32px;
        color: #FE5383;;
    }
    .jian{
        font-family: iconfont;
        position: absolute;
        right: 12px;
        top: 0;
        font-size: 24px;
        color: #FE5586;
    }
    .pop{
        justify-content: center;
        align-items: center;
    }
    .chooseMa{
        width: 700px;
        background-color: rgba(255, 255, 255, 0.9);
        height: 100px;
        line-height: 100px;
        text-align: center;
    }
    .first_btn{
        border-color: #666;
        border-bottom-width: 1px;
        border-top-left-radius: 15px;
        border-top-right-radius: 15px;
    }
    .second_btn{
        border-color: rgba(1,1,1,0);
        border-bottom-width: 1px;
        border-bottom-left-radius: 15px;
        border-bottom-right-radius: 15px;
    }
    .box1{
        border-top-left-radius: 15px;
        border-top-right-radius: 15px;
    }
    .box2{
        border-bottom-left-radius: 15px;
        border-bottom-right-radius: 15px;
    }
    .box{
        border-radius: 15px;
    }
    .close{
        margin-top: 10px;
    }
    .mask_title{
        height: 100px;
        line-height: 100px;
    }
    .mask_input{
        height: 80px;
        line-height: 80px;
        margin-top: 10px;
        margin-bottom: 30px;
        margin-left: 30px;
        margin-right: 30px;
        border-width: 1px;
        border-color: #9B9B9B;
        text-align: center;
        border-radius: 10px;
    }
    .left_bor{
        /*border-color: #9B9B9B;*/
        /*border-left-width: 1px;*/
        background-color: #F77F4F;
        color: #ffffff;
        border-bottom-right-radius: 15px;
    }
    .mask_btn{
        border-color: #9B9B9B;
        border-top-width: 1px;
        height: 100px;
        line-height: 100px;
    }
    .padding_left_32{
        padding-left: 32px;
    }
    .demo{
        background-color: #ffffff;
    }
</style>
