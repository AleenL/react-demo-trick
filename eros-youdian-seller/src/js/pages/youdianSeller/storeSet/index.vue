<template>
    <div class="setup">
        <text class="title" >我的分类</text>
        <div class="home-menu">
            <div class="home-row">
                <div class="home-menu-item" @click="setgopage(1)">
                    <image src="bmlocal://assets/set1.png" class="home-menu-item_img"></image>
                    <text class="home-menu-item_title" >优惠管理</text>
                </div >
                <div class="home-menu-item" @click="setgopage(2)">
                    <image src="bmlocal://assets/set2.png" class="home-menu-item_img"></image>
                    <text class="home-menu-item_title">门店信息</text>
                </div>
                <div class="home-menu-item" @click="setgopage(3)">
                    <image src="bmlocal://assets/set3.png" class="home-menu-item_img"></image>
                    <text class="home-menu-item_title">员工管理</text>
                </div>
                <div class="home-menu-item" @click="setgopage(4)">
                    <image src="bmlocal://assets/set4.png" class="home-menu-item_img"></image>
                    <text class="home-menu-item_title">桌位管理</text>
                </div>
            </div>
            <div class="home-row">
                <div class="home-menu-item" @click="setgopage(12)">
                    <image src="bmlocal://assets/set12.png" class="home-menu-item_img"></image>
                    <text class="home-menu-item_title">打印管理</text>
                </div >
                <div class="home-menu-item" @click="setgopage(6)">
                    <image src="bmlocal://assets/set6.png" class="home-menu-item_img"></image>
                    <text class="home-menu-item_title">收款账号</text>
                </div>
                <div class="home-menu-item" @click="setgopage(13)" v-if="!seller.seller_id">
                    <image src="bmlocal://assets/set13.png" class="home-menu-item_img"></image>
                    <text class="home-menu-item_title">账号管理</text>
                </div>
                <div class="home-menu-item" v-else>

                </div>
                <div class="home-menu-item">

                </div>
            </div>
        </div>

        <text class="title m-t10" >会员管理</text>
        <div class="home-menu">
            <div class="home-row">
                <div class="home-menu-item" @click="setgopage(7)">
                    <image src="bmlocal://assets/set7.png" class="home-menu-item_img" />
                    <text class="home-menu-item_title">会员管理</text>
                </div >
                <div class="home-menu-item" @click="setgopage(8)">
                    <image src="bmlocal://assets/set8.png" class="home-menu-item_img" />
                    <text class="home-menu-item_title">储值</text>
                </div>
                <div class="home-menu-item" @click="setgopage(9)">
                    <image src="bmlocal://assets/set9.png" class="home-menu-item_img" />
                    <text class="home-menu-item_title">会员卡</text>
                </div>
                <div class="home-menu-item" @click="setgopage(10)">
                    <image src="bmlocal://assets/set10.png" class="home-menu-item_img" />
                    <text class="home-menu-item_title">优惠券管理</text>
                </div>
            </div>
            <div class="home-row">
                <div class="home-menu-item" @click="setgopage(11)">
                    <image src="bmlocal://assets/set11.png" class="home-menu-item_img" />
                    <text class="home-menu-item_title">积分管理</text>
                </div >
                <div class="home-menu-item"></div>
                <div class="home-menu-item"></div>
                <div class="home-menu-item"></div>
            </div>
        </div>

    </div>
</template>

<script>
    import { WxcCell, WxcButton, WxcMinibar } from 'weex-ui'
    export default {
        data () {
            return {
              seller: {}
            }
        },
        created: function () {
            this.$navigator.setNavigationInfo({
                navShow: true,                          // 是否显示导航栏
                statusBarStyle: 'Default'               // 状态栏文字颜色：Defautl 黑色， LightContent 白色
            })
            this.seller = this.$storage.getSync('role_info')
        },
        components: { WxcCell, WxcButton, WxcMinibar },
        methods: {
            wxcCellClicked (e) {
                console.log(e)
            },
            wxcButtonClicked (e) {
                console.log(e)
            },
            setgopage (num) {
                if (num === 1) {
                  this.$notice.toast({
                    message: '该功能暂未开放'
                  })
                  //   this.$router.open({
                  //       name: 'discountManage'
                  //   })
                } else if (num === 2) {
                    this.$router.open({
                        name: 'storeInfo'
                    })
                } else if (num === 3) {
                    this.$router.open({
                        name: 'employeeManage'
                    })
                } else if (num === 4) {
                    this.$router.open({
                        name: 'tableManage'
                    })
                } else if (num === 6) {
                    this.$router.open({
                        name: 'accountReceivables'
                    })
                } else if (num === 7) {
                    this.$router.open({
                        name: 'memberManage'
                    })
                } else if (num === 8) {
                    this.$router.open({
                        name: 'saveMoney'
                    })
                } else if (num === 9) {
                    this.$router.open({
                        name: 'vipCardList'
                    })
                } else if (num === 10) {
                  this.$notice.toast({
                    message: '该功能暂未开放'
                  })
                  //   this.$router.open({
                  //       name: 'couponManage'
                  //   })
                } else if (num === 11) {
                    this.$router.open({
                        name: 'integralManage'
                    })
                } else if (num === 12) {
                    this.$notice.toast({
                        message: '该功能暂未开放'
                    })
                } else if (num === 13) {
                    this.$router.open({
                        name: 'accountManage'
                    })
                }
            }
        }
    }
</script>

<style scoped>
    .setup{
        background-color: #f6f6f6;
    }
    .bor_btm{
        border-bottom-width: 1px;
        border-bottom-color: #f2f2f2;
        border-bottom-style: solid;
    }
    .title{
        flex-direction: row;
        background-color: white;
        font-size: 32px;
        color: #121C32;
        padding:20px
    }
    .home-menu{
        color: #ffffff;
        width: 750px;
        background-color: white;
        padding: 0px 30px;
        padding-bottom: 70px;

    }
    .home-row{
        flex-direction: row;
        -webkit-box-orient: horizontal;
        -webkit-box-direction: normal;
        padding: 20px 0px;
    }
    .home-menu-item{
        flex: 1;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        /*background-color: #FC345C;*/
        -webkit-box-orient: vertical;
        -webkit-box-direction: normal;
        -webkit-box-align: center;
        -webkit-box-pack: center;
        -webkit-box-flex: 1;
        height: 120px;
        position: relative;
    }
    .home-menu-item_img{
        margin-top: 10px;
        height: 60px;
        width: 60px;
    }
    .home-menu-item_title{
        margin-top: 10px;
        color: #666666;
        ont-family: PingFangSC-Regular;
        font-size: 24px;
    }
    .m-t10{
        margin-top: 20px;
    }
</style>
