<template>
    <div class="content">
        <!--<wxc-minibar title="会员卡" background-color="#ffffff">-->
            <!--&lt;!&ndash;<text slot="right" class="text-right">...</text>&ndash;&gt;-->
        <!--</wxc-minibar>-->
        <scroller>
            <div class="body-box">
                <vip-card :card="card" v-for="(card,index) in cardlist" :key="index" @go="goinfo(card._id)"></vip-card>
                <div class="overlayLoading" v-if="goodsLodingShow" :style="deviceHeight">
                    <wxc-part-loading :show="goodsLodingShow" width="50px" height="50px"></wxc-part-loading>
                </div>
                <div class="empty" v-if="cardlist.length == 0 && !goodsLodingShow">
                    <div class="empty-div">
                        <image class="empty-img" src="bmlocal://assets/empty-vipcard.png"></image>
                        <text class="empty-text">没有会员卡信息</text>
                    </div>
                </div>
            </div>
        </scroller>
        <div class="footer">
            <div class="footer-item" @click="addinfo">
                <image style="width:36px;height:36px" src="http://cdn.udian.me/addVipCard.png"></image>
                <text class="text-desc">添加会员卡</text>
            </div>
        </div>
    </div>
</template>

<script>
import { WxcMinibar, WxcPartLoading } from 'weex-ui'
import { userGetMchCardsForPage } from '../services/user'
// var modal = weex.requireModule('modal')

export default {
  components: {
    WxcMinibar,
    WxcPartLoading,
    vipCard: require('./VipCard.vue'),
  },
  data () {
    return {
      cardlist: [],
      page: 1,
      card2: {
        name: '新年红卡',
        time: {
          year: 2018,
          month: '01',
          day: 12
        },
        bp: 10,
        number: 3,
        discount: 9,
        bgc: {
          backgroundColor: '#B5001B'
        }
      },
      card3: {
        name: '惬意午后卡',
        time: {
          year: 2018,
          month: '01',
          day: 12
        },
        bp: 10,
        number: 3,
        discount: 9,
        bgc: {
          backgroundColor: '#1D53B0'
        }
      },
      goodsLodingShow: false
    }
  },
  created () {
    this.goodsLodingShow = true
    this.getList()
    this.$event.on('addvipinfo', params => {
      this.$router.refresh()
    })
      this.$event.on('remove', params => {
      this.$router.refresh()
    })
  },
  methods: {
    getList () {
      userGetMchCardsForPage({page: this.page}, (data) => {
        for (var i = 0; i < data.data.length; i++) {
          data.data[i].info = false
        }
        this.goodsLodingShow = true
        setTimeout(() => {
            this.cardlist = data.data
            this.goodsLodingShow = false
        }, 300)
        // self.cardlist = data.data
      })
    },
    addinfo () {
      this.$router.open({
        name: 'vipCardList.addVipCard',
        params: { editinfos: false}
      })
    },
    goinfo (id) {
      this.$router.open({
        name: 'vipCardList.vipCardInfo',
        params: { vipid: id}
      })
    }
  }
}
</script>

<style scoped>
    .content{
        background-color: #f2f2f2;
    }
    .text-right{
        font-size:50px;
        margin-top: -25px;
    }
    .body-box{
        margin-top: 6px;
        align-items: center;
        margin-bottom: 100px;
    }
    .overlayLoading{
        position: absolute;
        top: 50px;
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
    .footer{
        position: fixed;
        bottom:0;
        right: 0;
        width: 750px;
        height: 96px;
        background-color: #fff;
        justify-content: center;
        align-items: center;
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
