<template>
    <div class="content">
        <div style="margin-top:20px ">
            <wxc-cell label="区域名称" >
                <input type="text"
                       class="inputs"
                       placeholder="请输入区域名称"
                       slot="value"
                       :autofocus="true"
                       :value="area.area_name"
                       @input="inputAreaName"
                >
            </wxc-cell>
        </div>
        <div style="align-items: center;margin-top:100px">
            <wxc-button text="保存" class="bt" @wxcButtonClicked="addArea"></wxc-button>
        </div>
        <overlay :obj="obj"
                 @close="closeOverlay"
                 @deleteEvent="deleteItem"
        ></overlay>
    </div>
</template>

<script>
    import { WxcButton,WxcCell } from 'weex-ui'
    import { addOrEditArea, deleteArea } from '../services/region.js'

    export default {
        components: {
            WxcCell,
            WxcButton,
            overlay: require('./Overlay.vue')
        },
        data () {
            return {
                area: {},
                obj: {
                    offset: {
                        top: '0px',
                        right: '34px'
                    },
                    isShow: false,
                },
                isAddPage:false //默认该页面为编辑区域，不为增加区域
            }
        },
        created () {
            this.$router.getParams().then(resData => {
                this.area = resData;
                this.isAddPage = resData.isAddPage;
                if(!this.isAddPage){
                    this.$navigator.setRightItem({
                        image: 'bmlocal://assets/editImage@2x.png'
                    }, () => {
                        this.obj.isShow = !this.obj.isShow
                    })
                }
            })


        },
        methods: {
            inputAreaName (e) {
                this.area.area_name = e.value
            },
            // 请求
            addArea () {
                if(!this.area.area_name) {
                    this.$notice.toast({
                        message: '请输入区域名称'
                    })
                    return false
                }
                addOrEditArea(this.area, (data) => {
                    this.$event.emit('updateRegionList')
                    this.$router.back()
                })
            },
            closeOverlay () {
                this.obj.isShow = false
            },
            deleteItem () {
                let self = this
                this.obj.isShow = false
                this.$notice.confirm({
                    title: '',
                    message: `确认删除${this.area.area_name}区域？`,
                    okTitle: '确认',
                    cancelTitle: '取消',
                    okCallback() {
                        // 点击确认按钮的回调
                        deleteArea({
                            area_id: self.area.area_id
                        }, () => {
                            self.$event.emit('updateRegionList')
                            self.$notice.toast({
                                message: '删除成功'
                            })
                            self.$router.back()
                        })
                    },
                    cancelCallback() {
                    }
                })
            },
        }
    }
</script>

<style scoped>
    .content{
        background-color: #f2f2f2;
    }
    .bt{
        background-color: #FC345C;
        width: 686px;
        border-radius: 8px;
    }
    .inputs{
        width: 320px;
        height: 40px;
        line-height: 40px;
        font-size: 28px;
        text-align: right
    }
</style>
