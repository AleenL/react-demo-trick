<template>
    <div>
        <div class="billlist">
          <div style="flex-direction: row;align-items: center;justify-content: space-around">
            <text class="title bg_ff color_12 p_lr20">收入(元) {{total.income}}  支出(元) {{total.disburse}}</text>
            <div slot="right" style="flex-direction: row;margin-right: 30px" @click="goChooseTime">
              <text style="color: #666666;font-size: 24px;line-height: 84px;" v-if="start_time != ''">{{timeStart.month}}/{{timeStart.day}}</text>
              <text style="color: #666666;font-size: 24px;line-height: 84px;" v-else>{{time.month2}}/{{time.day}}</text>
              <text style="color: #666666;font-size: 24px;line-height: 84px;"> 至 </text>
              <text style="color: #666666;font-size: 24px;line-height: 84px;" v-if="start_time != ''">{{timeEnd.month}}/{{timeEnd.day}}</text>
              <text style="color: #666666;font-size: 24px;line-height: 84px;" v-else>{{time.month}}/{{time.day}} </text>
              <text class="iconfont">&#xe645;</text>
            </div>
          </div>
            <scroller>
                <div class="list border_b" v-for="(item, index) in financeList" :key="index" @click="goinfo(item)">
                    <text class="bg_f2 time color_4a p_lr20" v-if="index == 0 ">{{item.charge_time_str2}}</text>
                    <text class="bg_f2 time color_4a p_lr20" v-if="index > 0 && financeList[index].charge_time_str2 !== financeList[index - 1].charge_time_str2">{{item.charge_time_str2}}</text>
                    <div class=" flex_row p_20 border_b">
                        <image class="headimg" :src="item.uavatar" />
                        <div class="flex_item p_lr20">
                            <text class="color_51 font_14">{{item.title}}</text>
                            <text class="color_9b font_12 overflow">{{item.desc}}</text>
                        </div>
                        <div class="flex_item t_right">
                            <text class="color_4a t_right font_14">{{item.shop_name}}</text>
                            <text class="color_bb t_right font_12">{{item.charge_time_str}}</text>
                        </div>
                    </div>
                </div>
                <div class="overlayLoading" v-if="goodsLodingShow">
                    <wxc-part-loading :show="goodsLodingShow" width="50px" height="50px"></wxc-part-loading>
                </div>
                <div class="empty" v-if="financeList.length == 0 && !goodsLodingShow">
                    <div class="empty-div">
                        <image class="empty-img" src="bmlocal://assets/empty-bill.png"></image>
                        <text class="empty-text">暂时没有账单明细</text>
                    </div>
                </div>
            </scroller>
        </div>
    </div>
</template>

<script>
    import { WxcMinibar, WxcPartLoading } from 'weex-ui'
    import { financeList, financeTotal } from '../services/employee'
    import util from '../utils/util'

    export default {
        name: 'bill',
        components: { WxcMinibar, WxcPartLoading },
        data () {
            return {
                financeList: [],
                page: 1,
                width: 200,
                income: '',
                expenditure: '',
                total: {},
                goodsLodingShow: true,
                start_time: '',
                end_time: '',
                time: {},
                timeStart: {},
                timeEnd: {}
            }
        },
        beforeCreate () {
            util.initIconFont()
        },
        created () {
            this.$event.on('timeChoose', params => {
                this.start_time = params.start_time
                this.end_time = params.end_time
                this.getList()
            })
            this.getList()
        },
        methods: {
            goChooseTime () {
                this.$router.open({
                    name: 'billList.chooseTime',
                    params: {
                        start_time: this.start_time || this.time.year+'-'+this.time.month2+'-'+this.time.day,
                        end_time: this.end_time || this.time.year+'-'+this.time.month+'-'+this.time.day
                    }
                })
            },
            getList () {
                this.time = this.formatTime(new Date())
                this.timeStart = this.formatTime(new Date(this.start_time))
                this.timeEnd = this.formatTime(new Date(this.end_time))
                let params = {
                    page: this.page,
                    // 默认查询最近一个月
                    start_time: this.start_time,
                    end_time: this.end_time
                }
                financeTotal(params, (data) => {
                    setTimeout(() => {
                        this.total = data.data
                    }, 300)
                })
                financeList(params, (data) => {
                    console.log(data.data)
                    setTimeout(() => {
                        this.financeList = data.data
                        for(let i=0;i<this.financeList.length;i++){
                            const time = this.formatTime(new Date(this.financeList[i].charge_time_str_2))
                            this.$set(this.financeList[i], 'charge_time_str2', time.year+'年'+time.month+'月')
                            this.$set(this.financeList[i], 'charge_time_str2_year', time.year)
                            this.$set(this.financeList[i], 'charge_time_str2_month', time.month)
                        }
                        this.goodsLodingShow = false
                    }, 300)
                })
            },
            goinfo (i) {
                this.$storage.set('financeId', {id: i._id})
                this.$router.open({
                    name: 'billList.billInfo'
                })
            },
            // xxxx-xx-xx 时间格式
            formatTime (t) {
              console.log(t)
                let year = t.getFullYear()
                let month = t.getMonth() + 1 > 9 ? t.getMonth() + 1 : '0' + (t.getMonth() + 1)
                let num = t.getMonth() > 9 ? t.getMonth() : '0' + t.getMonth()
                let month2 = num > 0 ? num : 12
                let day = t.getDate() > 9 ? t.getDate() : '0' + t.getDate()
                return { year, month, month2, day }
            }
        }
    }
</script>

<style src="../common.css" scoped></style>
<style scoped>
    .iconfont{
        font-family: iconfont;
        font-size: 28px;
        color: #666;
        line-height: 84px;
    }
    .billlist{
        flex: 1;
        background-color: #fff;
    }
    .title{
        line-height: 84px;
    }
    .time{
        height: 60px;
        line-height: 60px;
        background-color: #EEEEEE;
    }
    .headimg{
        width:68px;
        height:68px;
        border-radius: 50%;
    }
    .overflow{
        lines: 1;
        overflow: hidden;
        /*white-space: nowrap;*/
        text-overflow: ellipsis;
    }
    .overlayLoading{
        position: absolute;
        top: 170px;
        left: 0;
        bottom: 0;
        right: 0;
        justify-content: center;
        align-content: center;
        align-items: center;
        width: 750px;
        background-color: rgba(255, 255, 255, 0.1);
    }
    .empty{
        width: 750px;
        padding-top: 280px;
        text-align: center;
        flex-direction: row;
        justify-content: center;

    }
    .empty-div{
        flex-direction: column;
        align-items: center;
    }
    .empty-img{
        width: 210px;
        height: 174px;
    }
    .empty-text{
        font-size:28px;
        color: #4A4A4A;
        line-height: 40px;
        margin-top: 40px;
    }
</style>
