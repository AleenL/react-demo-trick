
<template>
    <div class="content">
        <div class="wrap">
            <wxc-cell label="商品价格" :cell-style="cellStyleObj" v-if="type === 1">
                <input type="number" placeholder="请输入商品价格" slot="value" class="input" v-model="price">
                <text>￥</text>
            </wxc-cell>
            <wxc-cell label="商品规格" :cell-style="cellStyleObj" v-if="type === 2">
                <input type="text" placeholder="输入规格" slot="value" class="input2" v-model="goods_spec">
                <text slot="value" style="margin: 20px">/</text>
                <input type="text" placeholder="输入包装" slot="value" class="input2" v-model="goods_unit">
            </wxc-cell>
        </div>
        <div class="btnbox">
            <text class="btn" @click="keep">保存</text>
        </div>
    </div>
</template>

<script>
    import { WxcMinibar, WxcCell } from 'weex-ui'
    const modal = weex.requireModule('modal')

    export default {
        components: {
            WxcMinibar,
            WxcCell
        },
        data () {
            return {
                price: '',
                goods_spec: '',
                goods_unit: '',
                type: '',
                cellStyleObj:{paddingLeft:'0',height:'100px',paddingRight: '32px'}

            }
        },
        created () {
            this.$router.getParams().then(params => {
                this.type = params.type
                this.price = params.price
                this.goods_spec = params.goods_spec
                this.goods_unit = params.goods_unit
            })
        },
        methods: {
            keep () {
                if (this.price === '' && this.type === 1) {
                    modal.toast({
                        message: '请先输入商品价格',
                        duration: 0.5
                    })
                    return false
                }
                if (this.goods_spec === '' && this.type === 2) {
                    modal.toast({
                        message: '请先输入规格',
                        duration: 0.5
                    })
                    return false
                }
                if (this.goods_unit === '' && this.type === 2) {
                    modal.toast({
                        message: '请先输入包装',
                        duration: 0.5
                    })
                    return false
                }
                this.$event.emit('goodsItemEdit', {
                    price: this.price,
                    goods_spec: this.goods_spec,
                    goods_unit: this.goods_unit
                })
                this.$router.back()
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
        padding-left: 32px;
        background-color: #ffffff;
    }
    .input{
        width: 300px;
        text-align: right;
    }
    .input2{
        width: 160px;
        text-align: center;
        border-width: 1px;
        border-color: #ccc;
        line-height: 60px;
        height: 60px;
        border-radius: 4px;
    }
    .btnbox{
        padding: 32px;
        margin-top: 50px;
    }
    .btn{
        background-color: rgba(255,111,111,1);
        height: 80px;
        line-height: 80px;
        border-radius: 8px ;
        font-size: 26px;  color: #FFFFFF;
        letter-spacing: 3px;text-align: center;
    }
</style>
