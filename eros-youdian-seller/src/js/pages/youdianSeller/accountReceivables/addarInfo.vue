<template>
  <div class="wrap">
      <div class="box-input">
          <input type="text"
                 :placeholder="placeholder"
                 class="inputs"
                 @input="searchKey"
          >
          <image class="icon-search" src="bmlocal://assets/search@2x.png"></image>
      </div>
      <scroller>
          <div v-for="(item, index) in resList"
               class="box-item"
               :key="index"
               @click="chooseBank(item, index)"
          >
              <text class="text-item"
                    :style="checkIndex === index ? textObj : {}"
              >{{params.step ===0 ? item.name : item.sub_branch_name}}</text>
               <text class="icon-checked" v-if="checkIndex === index">&#xe619;</text>
          </div>

          <!--数据为空的展示,待修改-->
          <div v-if="resList.length === 0" class="box-void">
              <text>没有数据...</text>
          </div>

      </scroller>
  </div>
</template>

<script>
  import {getBankList, getBranchList} from '../services/employeeShop.js'
  import util from '../utils/util.js'

  export default {
    data () {
        return {
            accountypetext1: '个人帐户',
            accountypetext2: '公司帐户',
            params: {},
            resList: [1],
            keywords: '',
            checkIndex: -1,
            textObj: {
                color: '#FF847B'
             },
            cellUsabel: true
        }
    },
    computed: {
      placeholder () {
          if (this.params.step === 0) {
              return '请输入银行名称搜索'
          }
          if (this.params.step === 1) {
              return '请输入支行名称搜索'
          }
          return '请输入名称搜索'
      }
    },
    created () {
        util.initIconFont()
        this.$router.getParams().then(params => {
            this.params = params
            if (params.step === 0 ) {
                getBankList({keywords: this.keywords}, data => {
                    this.resList = data.data
                })
            }
            if (params.step === 1) {
                getBranchList({code: parseInt(params.code),city_code: parseInt(params.city_code), keywords: this.keywords}, data => {
                    this.resList = data.data
                })
            }
        })

    },
    methods: {
        searchKey (e) {
            getBankList({keywords: e.value}, data => {
                this.resList = data.data
            })
        },
        chooseBank (e, i) {
            if (!this.cellUsabel) return
            this.cellUsabel = false
            this.checkIndex = i
            setTimeout(() => {
                this.$router.setBackParams({...e, step:this.params.step})
                this.$router.back()
            }, 300)
            setTimeout(() => {
                this.cellUsabel = true
            }, 1000)
        }
    }
  }
</script>

<style scoped>
    .box-input {
        position: relative;
        align-items: center;
        margin-top: 22px;
        margin-bottom: 26px;
    }
    .icon-search{
        position: absolute;
        left: 52px;
        top: 16px;
        width: 30px;
        height: 30px;
    }
    .inputs{
        width:680px;
        height:60px;
        padding-left: 64px;
        background-color:rgba(238,238,238,1);
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
