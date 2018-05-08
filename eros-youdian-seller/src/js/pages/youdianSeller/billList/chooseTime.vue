<template>
    <div>
        <div class="wrapper">
            <div class="content">
                <div class="box-left" @click="openBottomPopup">
                    <text class="textcolor1" v-if="startDate === ''">开始时间</text>
                    <text class="textcolor2" v-else>{{startDate}}</text>
                </div>
                <div class="box-center"></div>
                <div class="box-right" @click="openBottomPopup2">
                    <text class="textcolor1" v-if="endDate === ''">结束时间</text>
                    <text class="textcolor2" v-else>{{endDate}}</text>
                </div>
            </div>
            <div class="btnbox">
                <text class="btn" @click="sure">确认</text>
            </div>

            <div class="popup" v-if="isBottomShow || isBottomShow2" @click="popupOverlayBottomClick"></div>
            <div class="popup-date" v-if="isBottomShow">
                <text class="popup-title">请选择开始时间</text>
                <bmcalendar class="calendar" selectType="single" ref="calendar" @finish="finish" :startDate="startDate" :maximumDate="maximumDate" :minimumDate="minimumDate" ></bmcalendar>
            </div>
            <div class="popup-date" v-if="isBottomShow2">
                <text class="popup-title">请选择结束时间</text>
                <bmcalendar class="calendar" selectType="single" ref="calendar" @finish="finish2" :startDate="endDate" :maximumDate="maximumDate" :minimumDate="minimumDate" ></bmcalendar>
            </div>
        </div>
    </div>
</template>

<script>
    import {WxcPopup, WxcCell} from 'weex-ui'

    export default {
        components: {
            WxcPopup,
            WxcCell
        },
        data () {
            return {
                isBottomShow: false,
                isBottomShow2: false,
                minimumDate: '',
                maximumDate: '',
                startDate: '',
                endDate: ''
            }
        },
        created () {
            const dateType = ['YYYY', 'MM', 'DD', 'HH', 'mm', 'ss']
            const dateMap = {
                YYYY: 'getYear',
                MM: 'getMonth',
                DD: 'getDate',
                HH: 'getHours',
                mm: 'getMinutes',
                ss: 'getSeconds'
            }

            const dateFn = {
                getYear: (time) => {
                    return time.getFullYear()
                },
                getMonth: (time) => {
                    const month = time.getMonth() + 1
                    return addZero(month)
                },
                getDate: (time) => {
                    const day = time.getDate()
                    return addZero(day)
                },
                getHours: (time) => {
                    const hour = time.getHours()
                    return addZero(hour)
                },
                getMinutes: (time) => {
                    const minute = time.getMinutes()
                    return addZero(minute)
                },
                getSeconds: (time) => {
                    const second = time.getSeconds()
                    return addZero(second)
                }
            }

            function addZero (num) {
                if (num < 10) num = '0' + num
                return num
            }

            const format = (date, type) => {
                const time = date ? new Date(date) : new Date()
                let placeholder = type
                dateType.forEach((val) => {
                    if (type.indexOf(val) > -1) {
                        const trueValue = dateFn[dateMap[val]](time)
                        placeholder = placeholder.replace(val, trueValue)
                    }
                })
                return placeholder
            }

            const setDays = (date, type, num) => {
                const time = date ? new Date(date) : new Date();
                type === 'add'
                    ? time.setDate(time.getDate() + num)
                    : time.setDate(time.getDate() - num);
                return time;
            }

            this.$router.getParams((resData) => {
                this.startDate = resData.start_time
                this.endDate = resData.end_time
            })

            this.minimumDate = format(setDays('', 'subtract', 90), 'YYYY-MM-DD');
            this.maximumDate = format(setDays('', 'add', 0), 'YYYY-MM-DD');
        },
        methods: {
            openBottomPopup () {
                this.isBottomShow = true;
            },
            openBottomPopup2 () {
                this.isBottomShow2 = true;
            },
            //非状态组件，需要在这里关闭
            popupOverlayBottomClick () {
                this.isBottomShow = false;
                this.isBottomShow2 = false;
            },
            /*popupOverlayBottomClick2 () {
                this.isBottomShow2 = false;
            },*/
            finish (params) {
                this.startDate = params.startDate
                // this.popupOverlayBottomClick()
                this.isBottomShow = false;
                this.openBottomPopup2()
            },
            finish2 (params) {
                this.endDate = params.startDate
                // this.popupOverlayBottomClick2()
                this.isBottomShow2 = false;
            },
            sure () {
                if (this.startDate === '') {
                    this.$notice.toast({
                        message: '请选择开始时间',
                        duration: 1
                    })
                    return false
                }
                if (this.endDate === '') {
                    this.$notice.toast({
                        message: '请选择结束时间',
                        duration: 1
                    })
                    return false
                }
                if (this.startDate > this.endDate) {
                    this.$notice.toast({
                        message: '开始时间不能大于结束时间',
                        duration: 1
                    })
                    return false
                }
                this.$event.emit('timeChoose', {
                    start_time: this.startDate,
                    end_time: this.endDate
                })
                this.$router.back()
            }
        }
    }
</script>

<style scoped>
    .wrapper {
        flex: 1;
        background-color: #fff;
    }
    .content {
        flex-direction: row;
        justify-content: center;
        align-items: center;
        border-top-width: 2px;
        border-top-style: solid;
        border-top-color: #CCCCCC;
        height: 216px;
    }
    .box-left, .box-right {
        width:293px;
        height:80px;
        background-color: #FFFFFF;
        border-radius: 4px ;
        border-top-width: 2px;
        border-top-style: solid;
        border-top-color: #EEEEEE;
        border-right-width: 2px;
        border-right-style: solid;
        border-right-color: #EEEEEE;
        border-bottom-width: 2px;
        border-bottom-style: solid;
        border-bottom-color: #EEEEEE;
        border-left-width: 2px;
        border-left-style: solid;
        border-left-color: #EEEEEE;
        align-items: center;
        justify-content: center;
    }
    .box-center{
        width:24px;
        height:4px;
        background-color: #D8D8D8;
        margin-left: 9px;
        margin-right: 9px;
    }
    .textcolor1{
        font-size: 28px;
        color: #9B9B9B;
    }
    .textcolor2{
        font-size: 28px;
        color: #FF6F6F;
    }
    .timer {
        flex-direction: row;
        padding-top: 28px;
        padding-bottom: 28px;
        border-top-width: 2px;
        border-top-style: solid;
        border-top-color: #EEEEEE;
        border-bottom-width: 2px;
        border-bottom-style: solid;
        border-bottom-color: #EEEEEE;
        position: relative;
    }
    .list{
        width: 250px;
        height: 370px;
    }
    .cell {
        flex-direction: row;
        justify-content: center;
    }
    .text {
        height:74px;
        font-size:52px;
        font-family:SFNSDisplay;
        color:rgba(102,102,102,1);
        line-height:74px;
    }
    /*未选中的文字状态*/
    .text2 {
        font-size:46px;
        font-family:SFNSDisplay;
        color:rgba(102,102,102,0.3);
    }
    .text1 {
        font-size:36px;
        font-family:SFNSDisplay;
        color:rgba(102,102,102,0.3);
    }
    .box-checked {
        position: absolute;
        width: 750px;
        height: 74px;
        top: 176px;
        border-top-width: 2px;
        border-top-style: solid;
        border-top-color: #EEEEEE;
        border-bottom-width: 2px;
        border-bottom-style: solid;
        border-bottom-color: #EEEEEE;
    }
    .btnbox{
        padding: 0px 32px;
        margin-top: 150px;
        height: 80px;
    }
    .btn{
        background-color: rgba(255,111,111,1);
        height: 80px;
        line-height: 80px;
        border-radius: 8px ;
        font-size: 26px;  color: #FFFFFF;  letter-spacing: 3px;text-align: center;
    }
    .item-container {
        width: 750px;
        background-color: #f2f3f4;
        align-items: center;
        justify-content: center;
        flex-direction:row;
    }
    .calendar {
        height: 800px;
        background-color: #FFFFFF;
        select-color: #1da1f2;
    }
    .popup{
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        width: 750px;
        background-color: rgba(0, 0, 0, .4);
        align-items: center;
        justify-content: center;
    }
    .popup-date{
        position: absolute;
        left: 0;
        right: 0;
        bottom: 0;
        height: 850px;
    }
    .popup-title{
        height: 84px;
        line-height: 84px;
        font-size: 28px;
        color: #5D667A;
        background-color: #fff;
        border-bottom-width: 2px;
        border-bottom-color: #eee;
        padding-left: 20px;
    }
</style>
