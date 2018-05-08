<template>
    <div class="content">
        <!--<wxc-minibar title="创建优惠" background-color="#fff" >-->
            <!--<text slot="right" class="text-right" @click="addDiscount">保存</text>-->
        <!--</wxc-minibar>-->
        <scroller :style="scroll">
            <wxc-cell>
                <text slot="label">优惠名称</text>
                <input type="text"
                       placeholder="最多输入20个字"
                       @input="inputPreName"
                       maxlength="20"
                       class="input"
                >
            </wxc-cell>
            <wxc-cell>
                <div slot="label">
                    <text >{{preferentialRateName}}</text>
                </div>
                <div slot="value" class="fr">
                    <input type="number"
                           placeholder="填写90表示打9折"
                           @input="inputDiscount"
                           class="input"
                           maxlength="2">
                    <text class="text-rate">%</text>
                </div>
            </wxc-cell>
            <wxc-cell :has-arrow="true" class="mt" @wxcCellClicked="editTime">
                <text slot="label">优惠生效时间</text>
                <text slot="value" class="text-desc pr28">{{expire}}</text>
            </wxc-cell>
            <div class="mtb" v-if="isEditTime">
                <!--<my.-cell label="优惠生效时间" :has-arrow="true" @wxcCellClicked="editTime">-->
                    <!--<text slot="value" class="text-desc pr28">{{expire}}</text>-->
                <!--</my-cell>-->
                <!--<my-cell label="日期范围" :has-arrow="true"  @wxcCellClicked="showReturnCalendar">-->
                    <!--<text slot="value" class="text-desc pr28">{{formatCurrentDate}}</text>-->
                <!--</my-cell>-->
                    <wxc-cell label="日期范围" :has-arrow="true"  :cell-style="{paddingLeft:'0'}" @wxcCellClicked="chooseDate" >
                        <text slot="value" class="text-desc pr28">{{formatCurrentDate}}</text>
                    </wxc-cell>

                <!--<my-cell label="时间范围" :has-arrow="true" @wxcCellClicked="showTimePicker">-->
                    <!--<text slot="value" class="text-desc pr28">{{showChooseTime}}</text>-->
                <!--</my-cell>-->
                <wxc-cell label="时间范围" :has-arrow="true" :cell-style="{paddingLeft:'0'}">
                    <div style="flex-direction: row" class="pr28">
                    <text slot="value" class="text-desc" @click="chooseTimeStart">{{timePickerValueStart}}-</text>
                    <text slot="value" class="text-desc" @click="chooseTimeEnd">{{timePickerValueEnd}}</text>
                    </div>
                </wxc-cell>
                <wxc-cell label="星期" :has-arrow="true" :cell-style="{paddingLeft:'0'}" @wxcCellClicked="go">
                    <text slot="value" class="text-desc pr28">{{checkedList.toString()}}</text>
                </wxc-cell>
            </div>
            <!--<my-cell :has-arrow="true" class="mt" @wxcCellClicked="editGoods" v-if="!isEditGoods">-->
                <!--<text slot="label" class="text-label">不参与活动的商品</text>-->
                <!--<text slot="value" class="text-desc pr28">{{benefit.exGoods}}</text>-->
            <!--</my-cell>-->
            <div class="mt">
                <!--v-if="isEditGoods"-->
                <wxc-cell :has-arrow="true" @wxcCellClicked="showGoodsPop">
                    <text slot="label">{{textGoodsList}}</text>
                    <text slot="label" v-if="hasGoodsList">({{goodsIdArr.length}})</text>
                    <text slot="value" class="text-desc pr28">{{exGoods}}</text>
                </wxc-cell>
                <!--<my-cell >-->
                    <!--<text slot="label" class="text-label">不参与活动的商品(1)</text>-->
                <!--</my-cell>-->
                <div v-if="hasGoodsList">
                    <good v-for="(item, index) in goodsList"
                          :key="index"
                          :good="item"
                          :index="index"
                          @deleteGoods="deleteGoods"
                    ></good>
                    <div class="footer" @click="chooseGoods">
                        <text class="text-footer">{{buttonGoodsList}}</text>
                    </div>
                </div>
                <bmmask
                    class="mask"
                    animation="transition"
                    position="bottom"
                    :duration="300"
                    ref="goodsPop"
                >
                    <bmpop>
                        <div class="title-pop">
                            <text class="text-title">请选择</text>
                        </div>
                        <wxc-cell @wxcCellClicked="changeHasGoodsState(0)">
                            <text slot="label" class="text-label" :style="!hasGoodsList && textActiveObj">无</text>
                            <text slot="value" class="icon-checked" v-if="!hasGoodsList">&#xe619;</text>
                        </wxc-cell>
                        <wxc-cell @wxcCellClicked="changeHasGoodsState(1)">
                            <text slot="label" class="text-label" :style="hasGoodsList && textActiveObj">部分商品</text>
                            <text slot="value" class="icon-checked" v-if="hasGoodsList">&#xe619;</text>
                        </wxc-cell>
                    </bmpop>
                </bmmask>
                <!--<good></good>-->
            </div>

        </scroller>
        <!--<wxc-page-calendar :date-range="dateRange"-->
                           <!--:animationType="animationType"-->
                           <!--:selected-date="selectedDate"-->
                           <!--:selected-note="selectedNote"-->
                           <!--:is-range="isRange"-->
                           <!--:minibar-cfg="minibarCfg"-->
                           <!--@wxcPageCalendarBackClicked="wxcPageCalendarBackClicked"-->
                           <!--@wxcPageCalendarDateSelected="wxcPageCalendarDateSelected"-->
                           <!--ref="wxcPageCalendar"></wxc-page-calendar>-->
        <!--<bmmask class="timePicker" animation="transition" position="bottom" :duration="300" ref="timePop">-->
            <!--<bmpop>-->
                <!--<time-picker></time-picker>-->
            <!--</bmpop>-->
        <!--</bmmask>-->
    </div>
</template>

<script>
    import { WxcMinibar, Utils, WxcCell } from 'weex-ui'
    import { getGoodsList } from '../services/discount'
    // import weexRouter from '../../util/weexRouter.js'
    import http from '../utils/http'
    import { addPreferential } from '../services/discount'
    import util from '../utils/util'

    const picker = weex.requireModule('picker')

    export default {
        components: {
            WxcMinibar,
            WxcCell,
            good: require('./CreateBenefit_Item.vue'),
            // timePicker: require('../chooseTime/index')
        },
        data () {
            return {
                hasGoodsList: false,
                textActiveObj: {
                  color: '#FF847B'
                },
                timePickerValueStart: '00:00',
                timePickerValueEnd: '00:00',
                defaultList: ['一', '二', '三', '四', '五', '六', '日'],
                deleteArr: [],
                checkedList: ['一', '二', '三', '四', '五', '六', '日'],
                // checkedList: ['一', '二', '三', '四', '五', '六', '日'],
                startTime: ['00', '00'],
                endTime: ['00', '00'],
                chooseTime: false,
                goodsIdArr: [],
                goodsList: [],
                scroll: {
                    // height: (Utils.env.getScreenHeight() - weex.config.eros.statusBarHeight - 80) + 'px',
                    // flex: 1,
                    marginTop: '20px'
                },
                isEditTime: false,
                isEditGoods: false,
                preferential_type: 0,
                preferential_name: '',
                discount: '',
                benefit: {
                    expire: '永久有效'
                },
                // wxcPageCalendar
                currentDate: '',
                selectedDate: [],

            }
        },
        computed: {
            preferentialRateName () {
              if (this.preferential_type === 1) {
                  return '整单折扣率'
              }
              if (this.preferential_type === 2) {
                  return '折扣率'
              }
              if (this.preferential_type === 3) {
                  return '第二份优惠方式'
              }
            },
            textGoodsList () {
                if (this.preferential_type === 1) {
                    return '不参与活动的商品'
                }
                return '参与折扣商品'
            },
            buttonGoodsList () {
               if (this.preferential_type === 1) {
                   return '选择不参与折扣的商品'
               }
               return '添加商品'
            },
            exGoods () {
              if (this.hasGoodsList) {
                  return '部分商品'
              }
              return '无'
            },
            expire () {
              if (!this.isEditTime) {
                  return '永久有效'
              }
              return '自定义时间'
            },
            // 日期范围
            formatCurrentDate () {
                if (this.currentDate) {
                    return this.currentDate[0] + '-' + this.currentDate[1]
                } else {
                    return '请选择'
                }
            },
            // 是否有时间限制
            time_limit () {
                if (this.isEditTime) {
                    return 1
                } else {
                    return 2
                }
            },
            preferential_start_time () {
                return (Date.parse(new Date(this.currentDate[0])) / 1000).toString()
            },
            preferential_end_time () {
                return (Date.parse(new Date(this.currentDate[1])) / 1000).toString()
            },
        },
        methods: {
            inputDiscount (e) {
                this.discount = e.value
            },
            inputPreName (e) {
                this.preferential_name = e.value
            },
            showFormatDate () {
                this.currentDate[0] =  this.currentDate[0].split('-').join('')
                this.currentDate[1] =  this.currentDate[1].split('-').join('')
            },
            showGoodsPop () {
                this.$refs.goodsPop.show()
            },
            changeHasGoodsState (s) {
                if (s === 0) {
                    this.hasGoodsList = false
                    this.goodsList = []
                }
                if (s ===1 ) {
                    this.hasGoodsList = true
                }
                this.$refs.goodsPop.hide()
            },
            chooseTimeStart () {
                picker.pickTime({
                    value: this.value
                }, event => {
                    if (event.result === 'success') {
                        this.timePickerValueStart = event.data
                    }
                })
            },
            chooseTimeEnd () {
                picker.pickTime({
                    value: this.value
                }, event => {
                    if (event.result === 'success') {
                        this.timePickerValueEnd = event.data
                    }
                })
            },
            // showTimePicker () {
            //     this.$refs.timePop.show()
            // },
            editTime () {
                // this.isEditTime = true
                this.isEditTime = !this.isEditTime
            },
            editGoods () {
                this.isEditGoods = true
            },
            deleteGoods (e) {
                this.goodsList.splice(e.index, 1)
                this.goodsIdArr.splice(e.index, 1)
            },
            go () {
                // weexRouter.push('/discount/chooseWeek')
                this.$router.open({
                    name: 'chooseWeek',
                    params: {
                        arr: this.deleteArr
                    }
                })
            },
            chooseGoods () {
                this.$router.open({
                    name: 'chooseGoods',
                    params: {
                        arr: this.goodsIdArr
                    }
                })
            },
            addDiscount () {
                console.log(this.preferential_start_time)
                if (this.preferential_name === '') {
                    this.$notice.toast({
                        message: '请输入优惠名称'
                    })
                    return
                }
                if (this.discount === '' || this.discount === 0) {
                    this.$notice.toast({
                        message: '请输入折扣率'
                    })
                    return
                }

                var data = {
                    preferential_type: this.preferential_type,
                    preferential_name: this.preferential_name,
                    discount: this.discount,
                    time_limit: this.time_limit,
                    preferential_start_time: this.preferential_start_time,
                    preferential_end_time: this.preferential_end_time,
                    target_type: 'goods',
                    rules: JSON.stringify([{'data_type': 'goods', 'data_id': 'AWFkyn9r8ZXD6o3hqVER', 'discount_value': '50'}])
                }
                addPreferential(data, () => {
                    // weexRouter.push('/orderDiscount')
                    this.$notice.toast({
                        message: '创建优惠成功'
                    })
                    //
                    this.$event.emit('addDiscount')
                    this.$router.back({
                        length: 2
                    })
                })
            },
            chooseDate () {
                this.$router.open({
                    name: 'chooseDate',
                    params: {
                        selectedDate: this.selectedDate,
                    }
                })
            },
            // showReturnCalendar () {
            //     // 以当天开始三个月
            //     this.initCalendarDate()
            //     this.isRange = true
            //     setTimeout(() => {
            //         this.$refs['wxcPageCalendar'].show()
            //         this.$navigator.setLeftItem({
            //             text: '',                               // 展示的文字 (和图片 二选一)
            //             textColor: '',                          // 文字颜色 (默认为白色)
            //             fontSize: '32',                         // 字号（默认32px）
            //             fontWeight: 'normal',                   // 是否加粗（默认不加粗）
            //             image: ''                               // 展示的图片url (和文字 二选一，文字优先级更高)
            //         }, () => {
            //             this.$navigator.setCenterItem({
            //                 text: '创建优惠',                               // 展示的文字 (和图片 二选一)
            //                 textColor: '',                          // 文字颜色 (默认为白色)
            //                 fontSize: '32',                         // 字号（默认32px）
            //                 fontWeight: 'normal',                   // 是否加粗（默认不加粗）
            //                 image: ''                               // 展示的图片url (和文字 二选一，文字优先级更高)
            //             }, () => {
            //             })
            //             this.$navigator.setLeftItem({
            //                 text: '',                               // 展示的文字 (和图片 二选一)
            //                 textColor: '',                          // 文字颜色 (默认为白色)
            //                 fontSize: '32',                         // 字号（默认32px）
            //                 fontWeight: 'normal',                   // 是否加粗（默认不加粗）
            //                 image: ''                               // 展示的图片url (和文字 二选一，文字优先级更高)
            //             }, () => {
            //                 this.$router.back()
            //             })
            //             this.$navigator.setRightItem({
            //                 text: '保存',                               // 展示的文字 (和图片 二选一)
            //                 textColor: '#FE5383',                          // 文字颜色 (默认为白色)
            //                 fontSize: '32',                         // 字号（默认32px）
            //                 fontWeight: 'normal',                   // 是否加粗（默认不加粗）
            //                 image: ''                               // 展示的图片url (和文字 二选一，文字优先级更高)
            //             }, () => {
            //             })
            //             this.$refs['wxcPageCalendar'].hide()
            //         })
            //         this.$navigator.setCenterItem({
            //             text: '日期选择',                               // 展示的文字 (和图片 二选一)
            //             textColor: '',                          // 文字颜色 (默认为白色)
            //             fontSize: '32',                         // 字号（默认32px）
            //             fontWeight: 'normal',                   // 是否加粗（默认不加粗）
            //             image: ''                               // 展示的图片url (和文字 二选一，文字优先级更高)
            //         }, () => {
            //         })
            //         this.$navigator.setRightItem({
            //             text: '',                               // 展示的文字 (和图片 二选一)
            //             textColor: '',                          // 文字颜色 (默认为白色)
            //             fontSize: '32',                         // 字号（默认32px）
            //             fontWeight: 'normal',                   // 是否加粗（默认不加粗）
            //             image: ''                               // 展示的图片url (和文字 二选一，文字优先级更高)
            //         }, () => {
            //         })
            //     }, 10)
            // }
        },
        created () {
            util.initIconFont()
            this.$router.getParams().then(data => {
                this.preferential_type = data.preferential_type
            })
            this.$event.on('chooseDateFinish', params => {
                this.selectedDate = params.selectedDate
                this.currentDate = params.currentDate
                this.showFormatDate()
            })
            this.$event.on('checkedWeek', params => {
                this.deleteArr = params.arr
                let newArr = []
                this.defaultList.map(item => {
                    newArr.push(item)
                })
                let arr = this.deleteArr.reverse()
                // 根据arr的值删除UI展现的week
                arr.map(item => {
                    newArr.splice(item, 1)
                })
                this.checkedList = newArr
            })
            // 选择的商品数组
            this.$event.on('chooseGoodsFinish', params => {
                this.goodsIdArr = [...this.goodsIdArr, ...params.data]
                getGoodsList({goods_ids: this.goodsIdArr.join(',')}, data => {
                    this.goodsList = data.data.goods_list
                })
            })
            this.$event.on('chooseTimeFinish', params => {
                this.startTime = params.data.startTime
                this.endTime = params.data.endTime
            })
            this.$event.on('closeTimePop', () => {
                this.$refs.timePop.hide()
            })
            //设置导航条右侧区域
            this.$navigator.setRightItem({
                text: '保存',                             // 展示的文字 (和图片 二选一)
                textColor: '#FE5383',                    // 文字颜色 (默认为白色)
                fontSize: '32',                         // 字号（默认32px）
                fontWeight: 'normal',                   // 是否加粗（默认不加粗）
            }, () => {
                // 点击回调
                this.addDiscount()
            })
            // http.storageGet('checkedWeek').then(data => {
            //     let arr = data.arr.reverse()
            //     // 根据arr的值删除UI展现的week
            //     arr.map(item => {
            //         this.checkList.splice(item, 1)
            //     })
            // })
        }
    }
</script>

<style scoped>
    .content{
        background-color: #f2f2f2;
    }
    .content input{
        outline: none
    }

    .text-right{
        font-size:32px;
        color: #FE5383;;
    }
    .mt{
        margin-top: 20px;
    }
    .fr{
        flex-direction: row;
    }
    .text-rate{
        font-size: 28px;
        height: 40px;
        line-height: 40px;
        color: #121C32;
        letter-spacing: -0.68px;
        margin-left: 40px;
        padding-top: 2px;
    }
    .title-pop{
        width: 750px;
        height: 116px;
        background-color: #ffffff;
        align-items: center;
        justify-content: center;
        border-bottom-width: 2px;
        border-bottom-color: #eeeeee;
        border-bottom-style: so;

    }
    .text-title{
        color: #121C32;
        font-size: 32px;
    }
    .text-label{
        color: #666666;
        font-size: 32px;
    }
    .text-desc{
        color: #666;
        padding-right: 5px;
        font-size: 30px;
    }
    .pr28{
        padding-right: 28px;
    }
    .mtb{
        /*margin-top: 20px;*/
        /*margin-bottom: 20px;*/
        padding-left: 32px;
        background-color: #ffffff;
    }
    .footer{
        width:750px;
        height: 82px;
        background-color: #fff;
        justify-content: center;
        align-items: center;
        border-top-width: 2px;
        border-top-style: solid;
        border-top-color: #eee;
        border-bottom-width: 4px;
        border-bottom-style: solid;
        border-bottom-color: #eee;
    }
    .text-footer{
        width:276px;
        height:40px;
        font-size:28px;
        font-family:PingFangSC-Regular;
        color:#F77F4F;
        line-height:40px;
        text-align: center;
    }
    /*.timePicker {*/
        /*position: absolute;*/
        /*top: 0;*/
        /*left: 0;*/
        /*right: 0;*/
        /*bottom: 0;*/
        /*background-color: rgba(0, 0, 0, .4);*/
    /*}*/
    .input {
        width: 360px;
        text-align: right;
        color: #666;
        height: 40px;
        font-size:28px;
        line-height: 40px;
    }
    .mask {
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background-color: rgba(0, 0, 0, .4);
    }
    .icon-checked{
        font-family: iconfont;
        color:#FF847B;
    }
</style>
