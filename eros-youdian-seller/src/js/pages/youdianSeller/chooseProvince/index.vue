<template>
    <div>
        <div class="wrap">
            <div class="box-input">
                <input type="text"
                       :placeholder="placeholder"
                       class="inputs"
                       @input="inputKeywords"
                >
                <image class="icon-search" src="bmlocal://assets/search@2x.png"></image>
            </div>
        </div>
        <scroller>
            <div v-for="(item, index) in resList"
                 class="box-item"
                 :key="index"
                 @click="chooseCity(item, index)"
            >
                <text class="text-item"
                      :style="checkedIndex === index ? textObj : {}"
                >{{item.administrativName}}</text>
                <text class="icon-checked" v-if="checkedIndex === index">&#xe619;</text>
            </div>

            <!--数据为空的展示,待修改-->
            <div v-if="resList.length === 0" class="box-void">
                <text>没有数据...</text>
            </div>

        </scroller>
    </div>
</template>

<script>
  import util from '../utils/util.js'
  import city from '../cityList.js'

  export default {
      data () {
          return{
              resList: [],
              checkedIndex: -1,
              textObj: {
                  color: '#FF847B'
              },
              cellUsabel: true
          }
      },
      computed: {
          placeholder () {
              return '请输入省份搜索'
          }
      },
      methods: {
          inputKeywords (e) {
              this.keywords = e.value
          },
          chooseCity (o, i) {
              if (!this.cellUsabel) return
              this.cellUsabel = false
              if (this.checkedIndex === i) return
              this.checkedIndex = i
              setTimeout(() => {
                  this.$router.setBackParams({...o, province: true, checkedIndex: this.checkedIndex})
                  this.$router.back()
              }, 300)
              setTimeout(() => {
                  this.cellUsabel = true
              }, 1000)
          }
      },
      created () {
          util.initIconFont()
          this.$router.getParams().then(params => {
              this.checkedIndex = params.checkedIndex
          })
          this.resList = city.cityList
      },
  }
</script>

<style scoped>
.wrap{}
.box-input {
    position: relative;
    align-items: center;
    margin-top: 22px;
    margin-bottom: 26px;
}
.inputs{
    width:680px;
    height:60px;
    padding-left: 64px;
    background-color:rgba(238,238,238,1);
}
.icon-search{
    position: absolute;
    left: 52px;
    top: 16px;
    width: 30px;
    height: 30px;
}
.box-item{
    position: relative;
    width: 750px;
    align-items: center;
}
.text-item{
    width: 676px;
    lines: 1;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    height: 90px;
    line-height: 90px;
    font-size:30px;
    color: #1C1C20;
    border-bottom-width: 2px;
    border-bottom-style: solid;
    border-bottom-color: #F0F0F0;
}
.icon-checked{
    position: absolute;
    bottom: 30px;
    right: 32px;
    font-family: iconfont;
    color: #FF847B;
}
.box-void{
    flex: 1;
    align-items: center;
    justify-content: center;
}
</style>
