<template>
    <div class="content">
        <!--<wxc-minibar title="编辑职位" background-color="#FFFFFF" ></wxc-minibar>-->
        <div style="margin-top:20px;padding-left: 32px">
            <wxc-cell label="职位名称" :has-bottom-border="false" @wxcCellClicked="wxcCellClicked">
                <input type="text"
                       slot="value"
                       class="inputs"
                       maxlength="10"
                       @input="inputPositionName"
                >
            </wxc-cell>
        </div>
        <div style="align-items: center;margin-top:100px">
            <wxc-button text="确定" class="bt" @wxcButtonClicked="addPosition"></wxc-button>
        </div>
        <overlay :obj="obj"
                 @close="closeOverlay"
                 @deleteEvent="deleteItem"
        ></overlay>
    </div>
</template>

<script>
    import { WxcButton, WxcMinibar,WxcCell } from 'weex-ui'
    // import http from '../utils/http'
    import { deletePosition, editPosition } from "../services/employee"

    export default {
        components: {
            WxcMinibar,
            WxcCell,
            WxcButton,
            overlay: require('./Overlay.vue')
        },
        data () {
            return {
                positionName: '',
                position_id: '',
                obj: {
                    offset: {
                        top: '0px',
                        right: '34px'
                    },
                    isShow: false,
                },
                btUsable: true,
                cellStyleObj:{paddingLeft:'0',height:'100px',paddingRight: '32px'}

            }
        },
        created () {
            this.$navigator.setRightItem({
                image: 'bmlocal://assets/editImage@2x.png'
            }, () => {
                this.obj.isShow = !this.obj.isShow
            })

          this.$router.getParams().then( data => {
              this.positionName = data.position_name
              this.position_id = data.position_id
          })
        },
        methods: {
            inputPositionName (e) {
                this.positionName = e.value
            },
            deleteItem () {
                let self = this
                this.obj.isShow = false
                this.$notice.confirm({
                    title: '',
                    message: `确认删除${this.positionName}职位？`,
                    okTitle: '确认',
                    cancelTitle: '取消',
                    okCallback() {
                        // 点击确认按钮的回调
                        deletePosition({
                            position_id: self.position_id
                        }, () => {
                            self.$event.emit('updateJobList')
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
            closeOverlay () {
              this.obj.isShow = false
            },
            editPositionFn () {
                if (!this.btUsable) return
                this.btUsable = false
                if (this.positionName === '') {
                    this.$notice.toast({
                        message: '请输入职位名称'
                    })
                    return
                }
                let data = {
                    // shop_id: '59c1d8ab1d716136ba4474c3',
                    // business_code: '0001',
                    position_name: this.positionName,
                    position_id: this.position_id
                }
                editPosition(data, () => {
                    setTimeout(() => {
                        this.$notice.toast({
                            message: '编辑成功'
                        })
                        this.$event.emit('updateJobList')
                        this.$router.back()
                    }, 200)
                    setTimeout(() => {
                        this.btUsable = true
                    }, 1000)
                })
            }
        }
    }
</script>

<style scoped>
    .inputs{
        width: 320px;
        text-align: right;
        height: 40px;
        line-height: 40px;
        font-size: 28px;
    }
</style>
