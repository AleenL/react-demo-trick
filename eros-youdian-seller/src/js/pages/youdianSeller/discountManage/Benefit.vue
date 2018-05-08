<template>
    <div>
        <div class="listbox" @click="deleteDiscount">
            <text class="text-header" >{{formatItem.preferential_name}}</text>
            <div class="h-line"></div>
            <div class="body-wrap">
                <text class="text-desc">活动周期：{{preferential_time}}</text>
                <text class="text-desc">活动对象：{{formatItem.target_type}}</text>
            </div>
            <text class="smallBar">{{formatItem.preferential_type}}</text>
        </div>
    </div>
</template>

<script>
    export default {
        created () {
            // 优惠名称保存
            this.formatItem.preferential_name = this.item.preferential_name
            // 活动时间戳格式化
            this.formatItem.preferential_start_time = this.formatTime(this.item.preferential_start_time)
            this.formatItem.preferential_end_time = this.formatTime(this.item.preferential_end_time)
            // 活动对象设置
            this.formatItem.target_type = this.item.target_type === 'goods' ? '商品' : '订单'
            // 优惠类型设置
            this.formatItem.preferential_type = this.setType(this.item.preferential_type)
        },
        props: {
            item: {
                default: {
                    preferential_name: '优惠名称',
                    preferential_time: '活动周期',
                    target_type: '活动对象',
                    preferential_type: '3',
                    preferential_start_time: '',
                    preferential_end_time: ''
                }
            }
        },
        data () {
            return {
                formatItem: {
                    preferential_name: '',
                    preferential_start_time: '',
                    preferential_end_time: '',
                    target_type: '',
                    preferential_type: ''
                }
            }
        },
        methods: {
            deleteDiscount () {
                this.$emit('deleteDiscount')
            },
            formatTime (t) {
                var time = new Date(parseInt(t) * 1000)
                var year = time.getFullYear()
                var month = time.getMonth() + 1 > 9 ? time.getMonth() + 1 : '0' + (time.getMonth() + 1)
                var day = time.getDate() > 9 ? time.getDate() : '0' + time.getDate()
                return year + '-' + month + '-' + day
            },
            setType (t) {
                switch (t) {
                    case '1' : {
                        return '整单'
                    }
                    case '2' : {
                        return '商品特价'
                    }
                    case '3' : {
                        return '第二份打折'
                    }
                }
            }
        },
        computed: {
            // 检测NaN,是否设置了活动时间
            preferential_time () {
                if (this.formatItem.preferential_start_time === 'NaN-0NaN-0NaN' || this.formatItem.preferential_end_time === 'NaN-0NaN-0NaN') {
                    return '永久有效'
                } else {
                    return this.formatItem.preferential_start_time + '到' + this.formatItem.preferential_end_time
                }
            }
        }
    }
</script>

<style scoped>
    .listbox{
        width:710px;
        height:263px;
        background-color: #FFFFFF;
        /*box-shadow: 0 2px 6px 0 #F2F2F2;*/
        border-radius: 4px;
        position: relative;
        padding-left: 28px;
    }
    .text-header{
        height:40px;
        font-size:28px;
        font-family:PingFangSC-Medium;
        color:#121C32;
        line-height:40px;
        margin-top: 48px;
    }
    .h-line{
        width:652px;
        height:2px;
        background-color: #EEEEEE;
        margin-top: 32px;
    }
    .body-wrap{
        margin-top: 24px;
    }
    .text-desc{
        font-size:26px;
        color:#666666;
        line-height:46px;
        letter-spacing: -0.01px;
    }
    .smallBar{
        position: absolute;
        right:0;
        top: 20px;
        width: 150px;
        height: 44px;
        background-color: rgba(255,247,231,1);
        border-top-left-radius: 24px;
        border-bottom-left-radius: 24px;
        font-size: 22px;
        color: #F77F4F;
        letter-spacing: -0.12px;
        text-align: center;
        line-height: 44px;
    }
</style>
