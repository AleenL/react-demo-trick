<template>
    <div v-if="obj.isShow" >
        <div class="all" @click="close"></div>
        <div class="wrap" :style="obj.offset">
            <image class="topTriangle" src="bmlocal://assets/topTriangle@2x.png"></image>
            <div class="box-delete"
                 @click="deleteFn"
            >
                <text class="text-delete">删除</text>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        props: {
            obj: {
                default: {}
            }
        },
        methods: {
            deleteFn () {
                this.$emit('deleteEvent')
            },
            close () {
                this.$emit('close')
            }
        }
    }
</script>

<style scoped>
    .all {
        position: fixed;
        top: 0px;
        right: 0px;
        bottom: 0px;
        left: 0px;
        background-color: rgba(255, 255, 255, 0);
    }
    .wrap{
        position: fixed;
    }
    .topTriangle{
        width: 20px;
        height: 20px;
        /*position: relative;*/
        top: 2px;
        left: 145px;
    }
    .box-delete{
        width: 192px;
        height: 86px;
        background-color:rgba(0,0,0,0.8);
        border-radius: 4px ;
        justify-content: center;
        align-items: center;
    }
    .text-delete{
        height: 42px;
        line-height: 42px;
        font-size: 30px;
        color: #fff;
    }
</style>
