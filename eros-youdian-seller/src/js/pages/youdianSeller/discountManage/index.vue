<template>
    <div class="content">
        <!--<wxc-minibar title="优惠管理" background-color="#FFFFFF" ></wxc-minibar>-->
        <div class="heador">
            <div class="heador-content">
                <text class="text-box" :class="[checkIndex===0?'active':'']" @click="setWait(0)">未开始</text>
                <text class="text-box" :class="[checkIndex===1?'active':'']" @click="setWait(1)">进行中</text>
                <text class="text-box" :class="[checkIndex===2?'active':'']" @click="setWait(2)">已结束</text>
            </div>
        </div>
        <scroller class="scroller" @loadmore="moreList">
            <div class="wrap mt0" v-for="(item) in waitList" :key='item._id' v-if="checkIndex===0 && !goodsLodingShow" v-else>
                <discount :item="item"></discount>
            </div>
            <div class="wrap" v-for="(item) in goingList" :key='item._id' v-if="checkIndex===1 && !goodsLodingShow" v-else>
                <discount :item="item"></discount>
            </div>
            <div class="wrap" v-for="(item) in endList" :key='item._id' v-if="checkIndex===2 && !goodsLodingShow" v-else>
                <discount :item="item"></discount>
            </div>
            <div class="overlayLoading" v-if="goodsLodingShow">
                <wxc-part-loading :show="goodsLodingShow" width="50px" height="50px"></wxc-part-loading>
            </div>
            <div class="overlayLoading" v-if="loadinging">
                <wxc-part-loading :show="loadinging" width="50px" height="50px"></wxc-part-loading>
            </div>
            <div class="empty" v-if="(waitList.length === 0 && checkIndex === 0 && !goodsLodingShow) || (endList.length === 0 && checkIndex === 2 && !goodsLodingShow) || (goingList.length === 0 && checkIndex === 1 && !goodsLodingShow)">
                <div class="empty-div">
                    <image class="empty-img" src="bmlocal://assets/empt-discount.png"></image>
                    <text class="empty-text">去添加一个优惠活动吧</text>
                </div>
            </div>
            <!--<loading @loading="onloading" :display="loadinging ? 'show' : 'hide'" class="loading">-->
                <!--<wxc-part-loading :show="loadinging" width="50px" height="50px"></wxc-part-loading>-->
            <!--</loading>-->
        </scroller>
        <div class="footer" @click="go">
            <div class="footer-item">
                <image style="width:36px;height:36px" src="http://cdn.udian.me/addDiscount.png"></image>
                <text class="text-desc">添加优惠活动</text>
            </div>
        </div>
    </div>
</template>

<script>
import {WxcMinibar, WxcPartLoading} from 'weex-ui'
import { getPreferential } from '../services/discount'

export default {
    components: {
        WxcMinibar,
        WxcPartLoading,
        discount: require('./Benefit'),
    },
    data () {
        return {
            checkIndex: 1,
            page: 1,
            waitList: [],
            goingList: [],
            endList: [],
            loadinging: false,
            goodsLodingShow: false
        }
    },
    created () {
        this.goodsLodingShow = true
        // 获取列表数据
        this.getList()
    },
    methods: {
        onloading (event) {
          this.loadinging = true
          setTimeout(() => {
            this.loadinging = false
          }, 1000)
        },
        moreList (event) {
          this.loadinging = true
          this.page++
          this.getList()
        },
        deleteDiscount (t, i, o) {
            let self = this
            this.$notice.confirm({
                title: '删除优惠',
                message: '是否删除此优惠活动',
                okTitle: '确认',
                cancelTitle: '取消',
                okCallback() {
                    // 点击确认按钮的回调
                    if (t === 0) {
                        self.waitList.splice(i, 1)
                        deletePreferential({_id: o._id}, () => {
                            self.$notice.toast({
                                message: '删除成功'
                            })
                        })
                    }
                    if (t === 1) {
                        self.goingList.splice(i, 1)
                        deletePreferential({_id: o._id}, () => {
                            self.$notice.toast({
                                message: '删除成功'
                            })
                        })
                    }
                    if (t === 2) {
                        self.endList.splice(i, 1)
                        deletePreferential({_id: o._id}, () => {
                            self.$notice.toast({
                                message: '删除成功'
                            })
                        })
                    }
                },
                cancelCallback() {
                    // 点击取消按钮的回调
                }
            })
        },
        getList () {
            let page = this.page
            getPreferential({ page }, (data) => {
                setTimeout(() => {
                    this.waitList = this.page === 1 ? data.data.wait : this.waitList.concat(data.data.wait)
                    this.goingList = this.page === 1 ? data.data.going : this.waitList.concat(data.data.going)
                    this.endList = this.page === 1 ? data.data.end : this.waitList.concat(data.data.end)
                    this.goodsLodingShow = false
                    this.loadinging = false
                }, 300)
            })
        },
        go () {
            this.$router.open({
                name: 'discountManage.chooseDiscountType'
            })
        },
        setWait (e) {
            if (this.checkIndex === e) return
            this.checkIndex = e
            this.goodsLodingShow = true
            setTimeout(() => {
              this.goodsLodingShow = false
            }, 300)
        }
    }
}
</script>

<style scoped>
    .content{
        /*background-color: #f2f2f2;*/
        background:rgba(247,248,250,1);
    }
    .heador{
        background-color: #fff;
        width: 750px;
        flex-direction: row;
        justify-content: center;
        padding-bottom: 12px;
    }
    .heador-content{
        width: 710px;
        border-color:#FE5282;
        border-style: solid;
        border-width: 2px;
        border-radius: 4px;
        flex-direction: row;
        align-items: center;
    }
    .scroller{
        padding-bottom: 97px;
    }
    .wrap{
        width: 750px;
        flex-direction: row;
        justify-content: center;
        margin-top: 27px;
    }
    .text-box{
        flex: 1;
        font-family: PingFangSC-Medium;
        font-size: 28px;
        height: 56px;
        line-height: 56px;
        color: #FE5383;
        letter-spacing: -0.68px;
        text-align: center;
    }
    .active{
        background-color: #FE5383;
        color:#fff;
    }
    .mt0{
        margin-top: 0px;
    }
    .overlayLoading{
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
    .loading{
      width: 750px;
      justify-content: center;
      align-items: center;
      align-content: center;
    }
    .footer{
        position: fixed;
        bottom:0;
        right: 0;
        width: 750px;
        height: 96px;
        background-color: #fff;
        justify-content: center;
        align-items: center;
        border-color: #eeeeee;
        border-top-width: 1px;
    }
    .footer-item{
        align-items: center;
    }
    .text-desc{
        font-size: 20px;
        line-height: 28px;
        color: #FE4D7B;
        letter-spacing: -0.22px;
    }
</style>
