
<template>
    <div>
        <!--<div :style="voidBox"></div>-->
        <!--<div class="wxc-minibar" >-->
            <!--<div class="left" @click="leftButtonClicked">-->
                <!--<image src="https://gw.alicdn.com/tfs/TB1x18VpwMPMeJjy1XdXXasrXXa-21-36.png"-->
                       <!--class="left-button"></image>-->
            <!--</div>-->
            <!--<text class="middle-title">选择星期</text>-->
            <!--<div class="right" @click="rightButtonClicked">-->
                <!--<text class="right-text">保存</text>-->
            <!--</div>-->
        <!--</div>-->
        <scroller class="scroller">
            <check-box-list :list="list"
                            @wxcCheckBoxListChecked="wxcCheckBoxListChecked"></check-box-list>
            <!--<text class="checked-text">checked list {{checkedList.toString()}}</text>-->
        </scroller>
    </div>
</template>

<script>
    import http from '../utils/http'
    const navigator = weex.requireModule('navigator')

    export default {
        components: { checkBoxList: require('../chooseWeek/checkBoxList') },
        data: () => ({
            // voidBox: {
            //   height: weex.config.eros.statusBarHeight + 'px'
            // },
            list: [
                { title: '星期一', value: 0, checked: true },
                { title: '星期二', value: 1, checked: true },
                { title: '星期三', value: 2, checked: true },
                { title: '星期四', value: 3, checked: true },
                { title: '星期五', value: 4, checked: true },
                { title: '星期六', value: 5, checked: true },
                { title: '星期日', value: 6, checked: true }
            ],
            currentList: [0, 1, 2, 3, 4, 5, 6],
            // checkedList: []
            checkedList: []
        }),
        methods: {
            leftButtonClicked () {
                navigator.pop()
            },
            rightButtonClicked () {
                // 存下未选中的Index组成的数组
                // if (this.checkedList.length !== 7) {
                    let resultArr = this.currentList.filter(item => {
                        return this.checkedList.join('').indexOf(item) === -1
                    })
                    // http.storageSet('checkedWeek', {
                    //     arr: resultArr
                    // })
                    this.$event.emit('checkedWeek', {
                        arr: resultArr
                    })
                    this.$router.back()
                // }
                // weexRouter.push('/discount/createBenefit')
                // this.$router.back()
            },
            wxcCheckBoxListChecked (e) {
                if (e.checked) {
                    this.checkedList.push(e.value)
                } else {
                    let index = this.checkedList.indexOf(e.value)
                    this.checkedList.splice(index, 1)
                }
            }
        },
        created () {
            //设置导航条右侧区域
            this.$navigator.setRightItem({
                text: '保存',                             // 展示的文字 (和图片 二选一)
                textColor: '#FE5383',                    // 文字颜色 (默认为白色)
                fontSize: '32',                         // 字号（默认32px）
                fontWeight: 'normal',                   // 是否加粗（默认不加粗）
            }, () => {
                // 点击回调
                this.rightButtonClicked()
            })

            // http.storageGet('checkedWeek').then(data => {
            //     let arr = data.arr
            //     arr.map(item => {
            //         this.list[item].checked = false
            //     })
            //     // checkedList init
            //     const { list } = this
            //     if (list && list.length > 0) {
            //         list.forEach((item, i) => {
            //             item.checked && this.checkedList.push(item.value)
            //         })
            //     }
            // })
            this.$router.getParams().then(data => {
                    let arr = data.arr
                    arr.map(item => {
                        this.list[item].checked = false
                    })
                    // checkedList init
                    const { list } = this
                    if (list && list.length > 0) {
                        list.forEach((item, i) => {
                            item.checked && this.checkedList.push(item.value)
                        })
                    }
            })
        }
    }
</script>

<style scoped>
    .wxc-minibar {
        width: 750px;
        height: 90px;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
        background-color: #fff;
        padding-left: 32px;
        padding-right: 32px;
    }
    .left-button {
        width: 21px;
        height: 36px;
    }
    .middle-title {
        font-size: 30px;
        color: #1C1C20;
        height: 36px;
        line-height: 34px;
    }
    .right-text{
        font-size: 32px;
        color: #FE5383;
    }
</style>
