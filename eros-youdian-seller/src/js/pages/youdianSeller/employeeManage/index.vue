<template>
    <div class="content">
        <!--<div class="heador">-->
        <!--<image class="icon" src="http://cdn.udian.me/icon-back.png"></image>-->
        <!--<div class="box-center">-->
        <!--<image class="icon-search" src="http://cdn.udian.me/search.png"></image>-->
        <!--<input type="text" placeholder="搜索员工姓名/登录" class="input">-->
        <!--</div>-->
        <!--<image class="icon" src="http://cdn.udian.me/icon-add.png" @click="obj.isShow=!obj.isShow"></image>-->
        <!--</div>-->
        <div :style="voidBox"></div>
        <mini-bar>
            <image src="http://cdn.udian.me/icon-back.png"
                   slot="left"
                   class="icon"></image>
            <div slot="middle" class="">
                <input type="text" placeholder="搜索员工姓名/登录名" @input="findEmployee" class="box-input">
                <image class="icon-search" src="http://cdn.udian.me/search.png"></image>
            </div>
            <image slot="right"
                   src="bmlocal://assets/add@2x.png"
                   class="icon"
                   @click="showOverlay"
            ></image>
        </mini-bar>
        <list class="listClass" v-if="employeeLi.length > 0 && !goodsLodingShow">
          <cell>
            <div v-for="(item, index) in employeeLi" :key="index">
              <wxc-cell :cell-style="cellStyle" :has-bottom-border="false">
                <text slot="label" class="cell-text1">{{item.position_name}}</text>
              </wxc-cell>
              <div style="padding-left:32px;background-color: #ffffff">
                <wxc-cell v-for="(employee, index) in item.employee"
                          :key="index"
                          :has-bottom-border="(index+1) !== item.employee.length"
                          :cell-style="{paddingLeft:'0',height:'100px',paddingRight: '32px'}"
                          @wxcCellClicked="go(employee, item.position_name)"
                >
                  <div slot="label" style="flex-direction: row;align-items: center;justify-content: flex-start">
                    <text class="stopUse" v-if="employee.work_status !== 1">禁</text>
                    <text class="cell-text2">{{employee.employee_name}}</text>
                  </div>
                </wxc-cell>
              </div>

            </div>
          </cell>
          <div class="overlayLoading" v-if="goodsLodingShow">
            <wxc-part-loading :show="goodsLodingShow" width="50px" height="50px"></wxc-part-loading>
          </div>
          <div class="empty" v-if="employeeLi.length === 0 && !goodsLodingShow">
            <div class="empty-div">
              <image class="empty-img" src="bmlocal://assets/empty-employee.png"></image>
              <text class="empty-text">没有员工信息</text>
            </div>
          </div>
        </list>
        <overlay :obj="obj" @close="showOverlay"></overlay>
    </div>
</template>

<script>
    import { getEmployeeList } from '../services/employee'
    import { WxcCell, WxcPartLoading } from 'weex-ui'

    export default {
        components: {
            WxcCell,
            WxcPartLoading,
            overlay: require('./Overlay.vue'),
            miniBar: require('./MiniBar')
        },
        data () {
            return {
                allEmployee: [],
                voidBox: {},
                list: {
                    height: (weex.config.env.deviceHeight - 114) + 'px'
                },
                obj: {
                    offset: {
                      top: '110px',
                      right: '8px'
                    },
                    text: [
                        '新增员工',
                        '职位管理'
                    ],
                    src: [
                        'http://cdn.udian.me/icon-addStaff.png',
                        'http://cdn.udian.me/jobManager.png'
                    ],
                    isShow: false,
                    right: {
                        right: `20px`
                    },
                    fn: [
                         () => {
                            // weexRouter.push('/staff')
                             this.obj.isShow = false
                            this.$router.open({
                                name: 'employeeManage.addEmployee'
                            })
                        },
                        () => {
                            // weexRouter.push('/
                            this.obj.isShow = false
                            this.$router.open({
                                name: 'gradeManage',
                                params: {
                                    showFooter: true,
                                    onlyAddFn: true
                                }
                            })
                        }
                    ]
                },
                employeeLi: [],
                cellStyle: {
                    backgroundColor: `#F7F8FA`,
                    height: `60px`
                },
                goodsLodingShow: true,
                keywords: ''
            }
        },
        created () {
          this.voidBox.height = weex.config.eros.statusBarHeight + 'px'
          this.init()
        },
        eros: {
          beforeBackAppear () {
            this.init()
          }
        },
        methods: {
            init () {
                getEmployeeList({ keywords:this.keywords }, (data) => {
                    setTimeout(() => {
                        this.allEmployee = data.data
                        this.employeeLi = data.data
                        this.goodsLodingShow = false
                    }, 300)
                })
            },
            showOverlay () {
                this.obj.isShow = !this.obj.isShow
            },
            findEmployee (e) {
                this.keywords = e.value
                this.init()
            },
            go (data, position_name) {
                data['position_name'] = position_name
                this.$router.open({
                    navTitle: '编辑员工信息',
                    name: 'employeeManage.addEmployee',
                    params: {
                      data: data
                    }
                })
            }
        }
    }
</script>

<style scoped>
    .content{
        background-color: #f2f2f2
    }
    .listClass{
      border-color: #eeeeee;
      border-top-width: 1px;
    }
    .box-center {
        flex-direction: row;
        align-items: center;
        position: relative;
    }
    .box-input {
        width: 540px;
        height: 60px;
        padding-left: 68px;
        background-color: #EEEEEE ;
    }
    .icon-search{
        position: absolute;
        left: 20px;
        top: 14px;
        width: 28px;
        height: 28px;
        margin-right: 28px;
    }
    .icon{
        width: 30px;
        height: 30px;
    }
    .input{
        width: 260px;
        height: 40px;
    }
    .cell-text1{
        color: #666666
    }
    .cell-text2{
        padding-left: 40px;
        color: #121C32
    }
    .overlayLoading{
        position: absolute;
        top: 50px;
        left: 0;
        bottom: 0;
        right: 0;
        justify-content: center;
        align-content: center;
        align-items: center;
        width: 750px;
        background-color: rgba(255, 255, 255, 0.1);
    }
    .empty{
        width: 750px;
        padding-top: 280px;
        text-align: center;
        flex-direction: row;
        justify-content: center;

    }
    .empty-div{
        flex-direction: column;
        align-items: center;
    }
    .empty-img{
        width: 210px;
        height: 174px;
    }
    .empty-text{
        font-size:28px;
        color: #4A4A4A;
        line-height: 40px;
        margin-top: 40px;
    }
    .stopUse{
      position: absolute;
      left: 0;
      top: 5px;
      width: 30px;
      height: 30px;
      line-height: 30px;
      text-align: center;
      font-size: 24px;
      background-color: #F77F4F;
      color: #ffffff;
      border-radius: 50px;
    }
</style>
