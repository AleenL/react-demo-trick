<template>
    <div class="content">
        <!--<div class="heador">-->
        <!--<image class="icon" src="http://cdn.udian.me/icon-back.png"></image>-->
        <!--<text class="text-title">桌位管理</text>-->
        <!--<image class="icon" src="http://cdn.udian.me/icon-add.png" @click="obj.isShow=!obj.isShow"></image>-->
        <!--</div>-->
        <!--<div class="content-wrap ">-->
        <!--<text class="text-desc">包厢</text>-->
        <!--<div class="box-wrap">-->
        <!--<div v-for="(item,index) in boxLi" :key="index" class="box-item">-->
        <!--<text class="text1">{{item.name}}</text>-->
        <!--<text class="text2">{{item.number}}</text>-->
        <!--</div>-->
        <!--</div>-->
        <!--</div>-->
        <!--<div class="content-wrap">-->
        <!--<text class="text-desc">大厅</text>-->
        <!--<div class="box-wrap">-->
        <!--<div v-for="(item,index) in hallLi" :key="index" class="box-item">-->
        <!--<text class="text1">{{item.name}}</text>-->
        <!--<text class="text2">{{item.number}}</text>-->
        <!--</div>-->
        <!--<div class="box-void"></div>-->
        <!--<div class="box-void"></div>-->
        <!--</div>-->
        <!--</div>-->
        <!--<div :style="navH"></div>-->
        <!--<WxcMinibar background-color="#fff">-->
            <!--<image src="http://cdn.udian.me/icon-back.png"-->
                   <!--slot="left"-->
                   <!--class="icon"></image>-->
            <!--<text class="text-title" slot="middle">桌位管理</text>-->
            <!--<image slot="right"-->
                   <!--src="http://cdn.udian.me/icon-add.png"-->
                   <!--class="icon"-->
                   <!--@click="showOverlay"-->
            <!--&gt;</image>-->
        <!--</WxcMinibar>-->
        <list>
            <cell>
                <div class="content-wrap" v-for="(item,index) in deskLi" :key="index">
                    <text class="text-desc">{{item.area_name}}</text>
                    <div class="box-wrap">
                        <div v-for="(desk,index) in item.desk" :key="index" class="box-item" @click="go(desk, item.area_name)">
                            <text class="text1">{{desk.desk_name}}</text>
                            <text class="text2">{{desk.num+'人'}}</text>
                        </div>
                        <div class="box-void" v-if="item.desk.length % 3 !== 0"></div>
                    </div>
                </div>
                <div class="overlayLoading" v-if="goodsLodingShow" :style="deviceHeight">
                    <wxc-part-loading :show="goodsLodingShow" width="50px" height="50px"></wxc-part-loading>
                </div>
                <div class="empty" v-if="deskLi.length == 0 && !goodsLodingShow">
                    <div class="empty-div">
                        <image class="empty-img" src="bmlocal://assets/empty-table.png"></image>
                        <text class="empty-text">暂时没有桌位哦</text>
                    </div>
                </div>
            </cell>
        </list>
        <overlay :obj="obj" @close="showOverlay"></overlay>
    </div>
</template>

<script>
import { WxcMinibar, WxcIcon, WxcPartLoading } from 'weex-ui'
import { deskList } from '../services/region'

export default {
    components: {
        WxcMinibar,
        WxcIcon,
        WxcPartLoading,
        overlay: require('./Overlay.vue')
    },
    created () {
        this.$navigator.setRightItem({
            textColor: '',                          // 文字颜色 (默认为白色)
            fontSize: '32',                         // 字号（默认32px）
            fontWeight: 'normal',                   // 是否加粗（默认不加粗）
            image: 'bmlocal://assets/add@2x.png'                               // 展示的图片url (和文字 二选一，文字优先级更高)
        }, () => {
            // 点击回调
            this.showOverlay()
        })
        this.$event.on('addDeskSuccess', (resData) => {
            this.$router.refresh()
        })
        this.$event.on('updateTablesList', () => {
            this.init()
        })
        this.goodsLodingShow = true
        this.init()
        const barHeight = weex.config.env.statusBarHeight ? weex.config.env.statusBarHeight : 0
        this.navH = {height: barHeight + 'px', backgroundColor: '#FFFFFF'}
    },
    data () {
        return {
            obj: {
                offset: {
                  top: '-2px',
                  right: '45px'
                },
                text: [
                    '新增桌位',
                    '管理区域'
                ],
                src: [
                    'http://cdn.udian.me/icon-addStaff.png',
                    'http://cdn.udian.me/jobManager.png'
                ],
                isShow: false,
                right: {
                    right: `20px`
                },
                fn: [
                     () => {
                         this.obj.isShow = false
                        this.$router.open({
                            navTitle:'新增桌位',
                            name: 'tableManage.addTables'
                        })
                    },
                     () => {
                         this.obj.isShow = false
                        this.$router.open({
                            name: 'areaManage'
                        })
                    }
                ]
            },
            deskLi: [],
            goodsLodingShow: false
        }
    },
    methods: {
        init () {
            deskList({}, (data) => {
                this.deskLi = data.data
                setTimeout(() => {
                    this.deskLi = data.data
                    this.goodsLodingShow = false
                }, 300)
            })
        },
        showOverlay () {
            this.obj.isShow = !this.obj.isShow
        },
        go (o, name) {
            this.$router.open({
                navTitle: '编辑桌位',
                name: 'tableManage.addTables',
                params: {...o, area_name: name, edit: true}
            })
        }
    }
}
</script>

<style scoped>
    .content{
        background-color: #f2f2f2;
    }
    .content-wrap{
        margin-top: 38px;
        margin-bottom: 36px;
        padding: 0 28px;
    }

    .text-desc{
        font-family: PingFangSC-Medium;
        font-size: 26px;
        color: #666666;
        letter-spacing: -0.66px;
        height: 36px;
        line-height: 36px;
    }
    .box-wrap{
        flex-direction: row;
        justify-content: space-between;
        flex-wrap: wrap;
        /*margin-bottom: 26px;*/
    }
    .box-item{
        border-radius: 16px;
        width: 212px;
        height: 132px;
        background-color: #FFFFFF;
        align-items: center;
        justify-content: center;
        margin-top: 26px;
    }
    .box-void{
        border-radius: 8px;
        width: 206px;
        height: 126px;
        margin-right: 20px;
        align-items: center;
        justify-content: space-around;
        box-shadow: 0 2px 6px 0 #F2F2F2;
    }
    .text1{
        font-family: PingFangSC-Medium;
        font-size: 36px;
        height: 50px;
        line-height: 50px;
        color: #121C32;
        letter-spacing: -0.38px;
        lines: 1;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
    }
    .text2{
        font-family: PingFangSC-Regular;
        font-size: 28px;
        color: #666666;
        letter-spacing: -0.02px;
        height: 46px;
        line-height: 46px;
    }
    .heador{
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
        width: 750px;
        height: 68px;
        padding-left: 32px;
        padding-right: 36px;
        background-color: #ffffff;
    }
    .icon{
        width: 40px;
        height: 40px;
    }
    .text-title{
        width:150px;
        height:48px;
        font-size:34px;
        font-family:PingFangSC-Regular;
        color:#1C1C20;
        line-height:48px;
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
</style>
