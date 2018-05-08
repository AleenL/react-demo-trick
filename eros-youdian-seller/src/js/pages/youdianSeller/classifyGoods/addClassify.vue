
<template>
    <div class="content">
        <div class="wrap">
            <wxc-cell label="分类名称" v-if="!params.cate_name">
                <input type="text"
                       placeholder="请输入分类名称"
                       slot="value"
                       class="input"
                       :value="inputClassify"
                       @input="inputClassifyFn"
                >
            </wxc-cell>
            <wxc-cell label="分类名称" v-if="params.cate_name">
                <input type="text"
                       slot="value"
                       class="input"
                       :value="inputClassify"
                       @input="inputClassifyFn"
                >
            </wxc-cell>
        </div>
        <div class="bt-wrap">
            <wxc-button text="保存" class="bt" @wxcButtonClicked="save"></wxc-button>
        </div>
    </div>
</template>

<script>
    import { WxcMinibar, WxcCell,WxcButton } from 'weex-ui'
    import { addShopCategory, modifyShopCategory } from '../services/goods.js'
    const modal = weex.requireModule('modal')

    export default {
        components: {
            WxcMinibar,
            WxcCell,
            WxcButton
        },
        data () {
            return {
                inputClassify: '',
                params: {
                    cate_name: '',
                    cate_pid: ''
                }
            }
        },
        created () {
          this.$router.getParams().then(params => {
            if (params.cate_name) {
              this.params = params
              this.inputClassify = params.cate_name
              this.$navigator.setRightItem({
                image: 'bmlocal://assets/editImage@2x.png'
              }, () => {
                // 点击回调
                this.more()
              })
            }
          })
        },
        methods: {
            inputClassifyFn (e) {
                this.inputClassify = e.value
            },
            save () {
                var data = {
                    cate_name: this.inputClassify
                }
                if (this.inputClassify === '') {
                    modal.toast({
                        message: '请先输入分类名称',
                        duration: 0.5
                    })
                    return false
                }
                if (this.params.modifyCategory) { //modify category
                    modifyShopCategory({
                        category_id: this.params.cate_pid,
                        cate_name: this.inputClassify
                    }, () => {
                        this.$notice.toast({
                            message: '修改分类成功'
                        })
                        setTimeout(() => {
                            this.$router.back()
                        }, 1000)
                    })
                } else { // add category
                    addShopCategory(data, () => {
                        modal.toast({
                            message: '添加分类成功',
                            duration: 1
                        })
                        setTimeout(() => {
                            this.$router.back()
                        }, 1000)
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
    .wrap{
        margin-top: 20px;
    }
    .input{
        width: 300px;
        text-align: right;
    }
    .bt-wrap{
        width: 750px;
        margin-top: 100px;
        align-items: center;
    }
    .bt{
        background-color: #FC345C;
        width: 686px;
        border-radius: 8px;
    }
</style>
