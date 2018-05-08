<template>
    <div class="content">
        <!--<wxc-minibar title="职位管理" background-color="#FFFFFF" ></wxc-minibar>-->
        <scroller style="margin-top:20px;margin-bottom: 100px ">
            <div style="padding-left:32px;background-color: #ffffff" >
                <wxc-cell v-for="(item,index) in positionLi"
                          :cell-style="cellStyleObj"
                         :key="index"
                         :has-arrow="params.onlyAddFn"
                         @wxcCellClicked="wxcCellClicked(index)">
                    <!--<text slot="label">{{item.position_name}}</text>-->
                    <text slot="label" :style="!params.onlyAddFn && activeIndex === index ? activeObj : {}">{{item.position_name}}</text>
                    <text slot="value" class="icon" v-if="!params.onlyAddFn && activeIndex === index ">&#xe619;</text>
                </wxc-cell>
            </div>
        </scroller>
        <div class="footer">
            <div class="footer-item" @click="go">
                <image style="width:36px;height:36px" src="http://cdn.udian.me/addJob.png"></image>
                <text class="text-desc">新增职位</text>
            </div>
        </div>
    </div>
</template>

<script>
    import { WxcButton, WxcMinibar, WxcStepper,WxcCell } from 'weex-ui'
    import { getPositionList } from '../services/employee'
    import util from '../utils/util.js'
    export default {
        components: {
            WxcMinibar,
            WxcCell,
            WxcButton,
            WxcStepper,
        },
        created () {
            util.initIconFont()
            this.$router.getParams().then( data => {
                this.params = data
                this.activeIndex = data.activeIndex
            })
            this.$event.on('updateJobList', () => {
                this.init()
                this.activeIndex = this.activeIndex + 1
            }),
            this.init()
        },
        data () {
            return {
                positionLi: [],
                params: {},
                activeIndex: -1,
                activeObj: {
                    color: '#FF847B'
                },
                cellUsabel: true,
                cellStyleObj:{paddingLeft:'0',height:'100px',paddingRight: '32px'}
            }
        },
        methods: {
            init () {
                getPositionList({}, (data) => {
                    this.positionLi = data.data
                })
            },
            go () {
                // weexRouter.push('/editJob')
                this.$router.open({
                    name: 'gradeManage.addJob'
                })
            },
            wxcCellClicked (i) {
                // 只能增加职位，列表点击无响应
                // 4.25修改 点击无响应变为进入编辑页面
                // if(this.params.onlyAddFn) return
                this.activeIndex = i
                let data = {
                    position_id: this.positionLi[i]._id,
                    position_name: this.positionLi[i].position_name,
                    activeIndex: this.activeIndex
                }
                if (this.params.onlyAddFn) {
                    this.$router.open({
                        name: 'gradeManage.editJob',
                        params: data
                    })
                } else {
                    if (!this.cellUsabel) return
                    this.cellUsabel = false
                    setTimeout(() => {
                        this.btUsable = true
                    }, 1000)
                    setTimeout(() => {
                        this.$event.emit('choosePosition', data)
                        this.$router.back()
                    }, 200)
                }

                // http.storageSet('position_if', { position_id: data._id, position_name: data.position_name })
                // weexRouter.push('/staff')
            }
        }
    }
</script>

<style scoped>
    .content{
        background-color: #f2f2f2
    }
    .icon{
        font-family: iconfont;
        color: #FF847B
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
