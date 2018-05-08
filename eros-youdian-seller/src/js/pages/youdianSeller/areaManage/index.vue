<template>
    <div class="content">
        <scroller style="margin-top:20px;margin-bottom: 100px;">
            <div style="padding-left:32px;background-color: #ffffff"  v-for="(item,index) in areaList">
                <wxc-cell
                          :key="index"
                          :has-arrow="!params.choose"
                          @wxcCellClicked="chooseArea(index)"
                >
                    <text slot="label" :style="params.choose && activeIndex === index ? activeObj : {}">{{item.area_name}}</text>
                </wxc-cell>
            </div>

        </scroller>
        <div class="footer">
            <div class="footer-item" @click="go">
                <image style="width:36px;height:36px" src="http://cdn.udian.me/addRegion.png"></image>
                <text class="text-desc">新增区域</text>
            </div>
        </div>
    </div>
</template>

<script>
    import { WxcCell} from 'weex-ui'
    import { areaList } from '../services/region.js'
    import util from '../utils/util.js'

    export default {
        components: {
            WxcCell
        },
        data () {
            return {
                params: {},
                areaList: [],
                activeIndex: -1,
                activeObj: {
                    color: '#FF847B'
                },
                cellUsabel: true
            }
        },
        created () {
            util.initIconFont()
            this.$event.on('updateRegionList', () => {
                this.init()
                this.activeIndex = this.activeIndex + 1
            })
            this.$router.getParams().then(params => {
                this.params.choose = params.choose
                this.activeIndex = params.activeIndex
            })
            this.init()
        },
        methods: {
            init () {
                areaList({}, (data) => {
                    this.areaList = data.data
                })
            },
            go () {
                this.$router.open({
                    navTitle:'新增区域',
                    name: 'areaManage.addRegion',
                    params:{isAddPage:true}
                })
            },
            chooseArea (i) {
                if (!this.cellUsabel && this.params.choose) return
                this.cellUsabel = false
                this.activeIndex = i
                let data = {
                    area_id: this.areaList[i].area_id,
                    area_name: this.areaList[i].area_name,
                    activeIndex: this.activeIndex
                }
                if (this.params.choose) {
                    setTimeout(() => {
                        this.$event.emit('chooseArea', data)
                        this.$router.back()
                    }, 200)
                    setTimeout(() => {
                        this.cellUsabel = true
                    }, 1000)
                } else {
                    this.$router.open({
                        navTitle:'编辑区域',
                        name: 'areaManage.addRegion',
                        params: data
                    })
                }
            }
        }
    }
</script>

<style scoped>
    .content{
        background-color: #f2f2f2;
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
