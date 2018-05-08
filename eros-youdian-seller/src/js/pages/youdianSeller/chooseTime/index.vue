<!--<template>-->
    <!--<div>-->
        <!--<div class="wrapper">-->
            <!--<div class="content">-->
                <!--&lt;!&ndash;<div class="box-left">&ndash;&gt;-->
                    <!--&lt;!&ndash;<text>{{checkedminutes}}</text>&ndash;&gt;-->
                <!--&lt;!&ndash;</div>&ndash;&gt;-->
                <!--&lt;!&ndash;<div class="box-center"></div>&ndash;&gt;-->
                <!--&lt;!&ndash;<div class="box-right">&ndash;&gt;-->
                    <!--&lt;!&ndash;<text>box-right</text>&ndash;&gt;-->
                <!--&lt;!&ndash;</div>&ndash;&gt;-->
                <!--<text class="text-left">{{leftText}}</text>-->
                <!--<text>{{hours[checkedHoursIndex]}}</text>-->
                <!--<text>{{minutes[checkedMinutesIndex]}}</text>-->
                <!--<text class="icon-cancle">&#xe6b4;</text>-->
            <!--</div>-->
            <!--<div class="timer">-->
                <!--<div class="box-checked"></div>-->
                <!--<scroller class="list"-->
                      <!--@scroll="hoursScrollEvent"-->
                      <!--@scrollend="scrollEnd"-->
                      <!--:offset-accuracy="offsetAccuracy"-->
                <!--&gt;-->
                    <!--<div v-for="(item, index) in hours"-->
                         <!--ref="hoursScroll"-->
                         <!--:key="0+index"-->
                         <!--class="cell">-->
                        <!--<text class="text"-->
                              <!--:style="activeHours(index) ? activeObj : defaultObj"-->
                        <!--&gt;{{item}}</text>-->
                    <!--</div>-->
                <!--</scroller>-->
                <!--<scroller class="list"-->
                          <!--@scroll="minutesScrollEvent"-->
                          <!--@scrollend="scrollEnd"-->
                          <!--:offset-accuracy="offsetAccuracy"-->
                <!--&gt;-->
                    <!--<div v-for="(item, index) in minutes"-->
                         <!--ref="minutesScroll"-->
                         <!--:key="1+index"-->
                         <!--class="cell">-->
                        <!--<text class="text"-->
                              <!--:style="activeMinutes(index) ? activeObj : defaultObj"-->
                        <!--&gt;{{item}}</text>-->
                    <!--</div>-->
                <!--</scroller>-->
            <!--</div>-->
            <!--<div class="foot" @click="footClick(footText)">-->
                <!--<text class="text-foot">{{footText}}</text>-->
            <!--</div>-->
        <!--</div>-->
    <!--</div>-->
<!--</template>-->

<!--<script>-->
    <!--import {WxcMinibar, WxcButton} from 'weex-ui'-->
    <!--const modal = weex.requireModule('modal')-->
    <!--const dom = weex.requireModule('dom')-->
    <!--import  Utils from '../utils/util'-->

    <!--export default {-->
        <!--components: {-->
            <!--WxcMinibar,-->
            <!--WxcButton-->
        <!--},-->
        <!--data () {-->
            <!--return {-->
                <!--scrollType: 'hours',-->
                <!--activeObj: {-->
                    <!--color: 'rgba(102, 102, 102, 1)'-->
                <!--},-->
                <!--defaultObj: {-->
                    <!--color: 'rgba(102, 102, 102, 0.3)'-->
                <!--},-->
                <!--offsetAccuracy: 2,-->
                <!--end: true,-->
                <!--leftText: '开始时间',-->
                <!--footText: '下一步',-->
                <!--checkedHoursIndex: 0,-->
                <!--checkedMinutesIndex: 0,-->
                <!--startTime: [],-->
                <!--endTime: [],-->
                <!--// checkedhours: '',-->
                <!--// checkedminutes: '',-->
                <!--// checkedDay: '',-->
                <!--hours: [-->
                    <!--'', '',-->
                    <!--'00', '01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11',-->
                    <!--'12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23',-->
                    <!--'', ''-->
                <!--],-->
                <!--minutes: [-->
                    <!--'', '',-->
                    <!--'00', '01', '02', '03', '04', '05', '06', '07', '08', '09', '10',-->
                    <!--'11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21',-->
                    <!--'22', '23', '24', '25', '26', '27', '28', '29', '30', '31', '32',-->
                    <!--'33', '34', '35', '36', '37', '38', '39', '40', '41', '42', '43',-->
                    <!--'44', '45', '46', '47', '48', '49', '50', '51', '52', '53', '54',-->
                    <!--'55', '56', '57', '58','59',-->
                    <!--'', ''-->
                <!--],-->
            <!--}-->
        <!--},-->
        <!--created () {-->
            <!--Utils.initIconFont()-->
        <!--},-->
        <!--methods: {-->
            <!--activeHours (i) {-->
              <!--return this.checkedHoursIndex === i-->
            <!--},-->
            <!--activeMinutes (i) {-->
              <!--return this.checkedMinutesIndex === i-->
            <!--},-->
            <!--hoursScrollEvent () {-->
                <!--this.scrollType = 'hours'-->
            <!--},-->
            <!--minutesScrollEvent (e) {-->
                <!--// let i = -parseInt(e.contentOffset.y / 74)-->
                <!--// this.checkedMinutesIndex = i + 2-->
                <!--this.scrollType = 'minutes'-->
            <!--},-->
            <!--scrollEnd (e) {-->
                <!--if (!this.end) {-->
                    <!--// 在dom.scrollToElement结束后重置回去-->
                    <!--this.offsetAccuracy = 10-->
                    <!--this.end = !this.end-->
                    <!--return-->
                <!--}-->
                <!--// 标志位设置，不触发scroll-->
                <!--this.offsetAccuracy = 10000-->
                <!--this.end = false-->
                <!--// 偏移量-->
                <!--let i = -parseInt(e.contentOffset.y / 74)-->
                <!--if (this.scrollType === 'hours') {-->
                    <!--this.checkedHoursIndex = i + 2-->
                <!--}-->
                <!--if (this.scrollType === 'minutes') {-->
                    <!--this.checkedMinutesIndex = i + 2-->
                <!--}-->
                <!--// 滚动-->
                <!--let el = this.scrollType === 'hours' ? this.$refs.hoursScroll[i] : this.$refs.minutesScroll[i]-->
                <!--dom.scrollToElement(el, {offset: 0})-->
            <!--},-->
            <!--hoursTest (s,e) {-->
                <!--this.$notice.toast({-->
                    <!--message: e-->
                <!--})-->
            <!--},-->
            <!--checkState (s) {-->
                <!--switch (s) {-->
                    <!--case '下一步' : {-->
                        <!--return 0-->
                    <!--}-->
                    <!--case '完成' : {-->
                        <!--return 1-->
                    <!--}-->
                <!--}-->
            <!--},-->
            <!--nextChoose () {-->
                <!--this.leftText = '结束时间'-->
                <!--this.footText = '完成'-->
                <!--this.startTime.push(this.hours[this.checkedHoursIndex])-->
                <!--this.startTime.push(this.minutes[this.checkedMinutesIndex])-->
            <!--},-->
            <!--finishChoose () {-->
                <!--this.endTime.push(this.hours[this.checkedHoursIndex])-->
                <!--this.endTime.push(this.minutes[this.checkedMinutesIndex])-->
                <!--this.$event.emit('chooseTimeFinish', {-->
                    <!--data: {-->
                        <!--startTime: this.startTime,-->
                        <!--endTime: this.endTime-->
                    <!--}-->
                <!--})-->
                <!--this.$event.emit('closeTimePop')-->
                <!--this.leftText = '开始时间'-->
                <!--this.footText = '下一步'-->
            <!--},-->
            <!--footClick (s) {-->
                <!--if (this.checkState(s) === 0) {-->
                    <!--this.nextChoose()-->
                <!--}-->
                <!--if (this.checkState(s) === 1) {-->
                    <!--this.finishChoose()-->
                <!--}-->
                <!--dom.scrollToElement(this.$refs.hoursScroll[0])-->
                <!--dom.scrollToElement(this.$refs.minutesScroll[0])-->
            <!--}-->
        <!--}-->
    <!--}-->
<!--</script>-->

<!--<style scoped>-->
    <!--.wrapper {-->
        <!--flex: 1;-->
        <!--background-color: #fff;-->
    <!--}-->
    <!--.content {-->
        <!--flex-direction: row;-->
        <!--justify-content: space-between;-->
        <!--align-items: center;-->
        <!--padding-left: 32px;-->
        <!--padding-right: 32px;-->
        <!--/*border-top-width: 2px;*/-->
        <!--/*border-top-style: solid;*/-->
        <!--/*border-top-color: #CCCCCC;*/-->
        <!--height: 40px;-->
    <!--}-->
    <!--.text-left {-->
        <!--font-size: 32px;-->
        <!--line-height: 40px;-->
        <!--color: #c5c5c5-->
    <!--}-->
    <!--.icon-cancle {-->
        <!--font-family: iconfont;-->
        <!--color: #C5C5C5;-->
    <!--}-->
    <!--/*.box-left, .box-right {*/-->
        <!--/*width:293px;*/-->
        <!--/*height:80px;*/-->
        <!--/*background-color: #FFFFFF;*/-->
        <!--/*border-radius: 4px ;*/-->
        <!--/*border-top-width: 2px;*/-->
        <!--/*border-top-style: solid;*/-->
        <!--/*border-top-color: #EEEEEE;*/-->
        <!--/*border-right-width: 2px;*/-->
        <!--/*border-right-style: solid;*/-->
        <!--/*border-right-color: #EEEEEE;*/-->
        <!--/*border-bottom-width: 2px;*/-->
        <!--/*border-bottom-style: solid;*/-->
        <!--/*border-bottom-color: #EEEEEE;*/-->
        <!--/*border-left-width: 2px;*/-->
        <!--/*border-left-style: solid;*/-->
        <!--/*border-left-color: #EEEEEE;*/-->
        <!--/*align-items: center;*/-->
        <!--/*justify-content: center;*/-->
    <!--/*}*/-->
    <!--/*.box-center{*/-->
        <!--/*width:24px;*/-->
        <!--/*height:4px;*/-->
        <!--/*background-color: #D8D8D8;*/-->
        <!--/*margin-left: 9px;*/-->
        <!--/*margin-right: 9px;*/-->
    <!--/*}*/-->
    <!--.timer {-->
        <!--flex-direction: row;-->
        <!--justify-content: center;-->
        <!--padding-top: 28px;-->
        <!--padding-bottom: 28px;-->
        <!--border-top-width: 2px;-->
        <!--border-top-style: solid;-->
        <!--border-top-color: #EEEEEE;-->
        <!--/*border-bottom-width: 2px;*/-->
        <!--/*border-bottom-style: solid;*/-->
        <!--/*border-bottom-color: #EEEEEE;*/-->
        <!--position: relative;-->
    <!--}-->
    <!--.list{-->
        <!--width: 200px;-->
        <!--height: 370px;-->
        <!--/*background-color: #F77F4F;*/-->
    <!--}-->
    <!--.cell {-->
        <!--flex-direction: row;-->
        <!--justify-content: center;-->
    <!--}-->
    <!--.text {-->
        <!--height:74px;-->
        <!--font-size:52px;-->
        <!--font-family:SFNSDisplay;-->
        <!--color:rgba(102,102,102, 0.3);-->
        <!--line-height:74px;-->
    <!--}-->
    <!--/*未选中的文字状态*/-->
    <!--.text2 {-->
        <!--font-size:46px;-->
        <!--font-family:SFNSDisplay;-->
        <!--color:rgba(102,102,102,0.3);-->
    <!--}-->
    <!--.text1 {-->
        <!--font-size:36px;-->
        <!--font-family:SFNSDisplay;-->
        <!--color:rgba(102,102,102,0.3);-->
    <!--}-->
    <!--.box-checked {-->
        <!--position: absolute;-->
        <!--width: 750px;-->
        <!--height: 74px;-->
        <!--top: 176px;-->
        <!--left: 0px;-->
        <!--border-top-width: 2px;-->
        <!--border-top-style: solid;-->
        <!--border-top-color: #EEEEEE;-->
        <!--border-bottom-width: 2px;-->
        <!--border-bottom-style: solid;-->
        <!--border-bottom-color: #EEEEEE;-->
    <!--}-->
    <!--.foot {-->
        <!--height: 80px;-->
        <!--background-color: #ff788e;-->
        <!--align-items: center;-->
        <!--justify-content: center;-->
    <!--}-->
    <!--.text-foot {-->
        <!--color: #ffffff;-->
        <!--font-size: 32px;-->
        <!--line-height: 80px;-->
    <!--}-->
<!--</style>-->
