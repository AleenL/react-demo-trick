<template>
    <div class="content">
        <!--<wxc-minibar title="新增员工"-->
                     <!--background-color="#FFFFFF"-->
                     <!--class="topNv"-->
                     <!--@wxcMinibarLeftButtonClicked="minibarLeftButtonClick"-->
        <!--&gt;</wxc-minibar>-->
        <div class="m_t20"></div>
        <div class="addEmp" >
            <wxc-cell
            >
                <text slot="label" class="label" >门店</text>
                <text class="text" slot="value">{{storeInfo.shop_name}}</text>
            </wxc-cell>
            <wxc-cell >
                <text slot="label" class="label" >员工姓名</text>
                <input slot="value"
                       type="text"
                       max-length="4"
                       class="inputs"
                       placeholder="请输入员工姓名"
                       :value="staff.employee_name"
                       @input="inputEmployeeName"
                />
            </wxc-cell>
            <wxc-cell >
                <text slot="label" class="label">登录名</text>
                <input slot="value" type="text"  class="inputs" placeholder="请输入登录名" max-length="7"
                       :value="staff.login_name"
                       @input="inputLoginName"
                />
            </wxc-cell>
            <wxc-cell >
                <text slot="label" class="label" v-if="!staff.employee_id">密码</text>
                <text slot="label" class="label" v-if="staff.employee_id">新密码(可选)</text>
                <div  slot="value" class="ip-pw-wrap">
                    <input  :type="pwtype" class="inputs mr28"
                            placeholder="请输入密码"
                            :value="staff.password"
                            @input="inputPwd"
                            max-length="20"/>
                    <div style="width: 42px;height: 42px;justify-content: center" @click="togglePw">
                        <image style="width:36px;height:36px;" src="http://cdn.udian.me/eye.png"></image>
                    </div>
                </div>
            </wxc-cell>
            <wxc-cell v-if="staff.edit" >
                <text slot="label" class="label">确认密码</text>
                <div  slot="value" class="ip-pw-wrap">
                    <input  :type="pwtype" class="inputs mr28"
                            placeholder="请确认密码"
                            :value="staff.repeat_password"
                            @input="inputRepeatPwd"
                            max-length="20"/>
                    <div style="width: 42px;height: 42px;justify-content: center" @click="togglePw">
                        <image style="width:36px;height:36px;" src="http://cdn.udian.me/eye.png"></image>
                    </div>
                </div>
            </wxc-cell>
            <wxc-cell >
                <text slot="label" class="label" >电话</text>
                <input slot="value"
                       type="tel"
                       max-length="11"
                       class="inputs"
                       placeholder="请输入员工电话"
                       :value="staff.mobile"
                       oninput="if(value.length>11)value=value.slice(0,11)"
                       @input="inputMobile"
                />
            </wxc-cell>
            <wxc-cell >
                <text slot="label" class="label" >是否禁用</text>
                <switch :checked="staff.status !== 1" @change="stopUse"></switch>
            </wxc-cell>
            <wxc-cell :has-arrow="true" @wxcCellClicked="go" :has-bottom-border="false" >
                <text slot="label" class="label" >职位</text>
                <text slot="value"
                      class="text"
                      style="margin-right: 28px;"
                      :style="staff.position_name === '请选择' && {color: '#999'}"
                >{{staff.position_name}}</text>
            </wxc-cell>
        </div>


        <div class="bt-wrap">
            <wxc-button text="保存" class="bt" @wxcButtonClicked="addEmployeeFn"></wxc-button>
        </div>
        <overlay :obj="obj"
                 @close="closeOverlay"
                 @deleteEvent="deleteItem"
        ></overlay>
    </div>
</template>

<script>
    import { WxcMinibar, WxcIcon ,WxcCell,WxcButton} from 'weex-ui'
    import { editEmployee, deleteEmployee } from '../services/employee'
    import http from '../utils/http'

    const storage = weex.requireModule('storage')

    export default {
        components: {
            WxcCell: require('../common/Udian-cell'),
            WxcButton,
            WxcMinibar,
            WxcIcon,
            overlay: require('./DeleteOverlay.vue')
        },
        data () {
            return {
                obj: {
                    offset: {
                        top: '0px',
                        right: '34px'
                    },
                    isShow: false,
                },
                pwtype: 'password',
                staff: {
                    employee_name: '',
                    login_name: '',
                    password: '',
                    mobile: '',
                    position_name: '请选择',
                    position_id: '',
                    merchants_code: '',
                    status: 1,
                    activeIndex: -1
                },
                storeInfo: '',
                btUsable: true,
            }
        },
        created () {
          this.storeInfo = this.$storage.getSync('storeInfo')
          this.staff.merchants_code = this.storeInfo.merchants_code
          this.$router.getParams().then(params => {
                if (params.data) {
                    this.staff = params.data
                    this.staff.employee_id = params.data._id
                    this.staff.status = params.data.work_status
                    this.staff.password = ''
                    this.staff.repeat_password = ''
                    this.$navigator.setRightItem({
                        image: 'bmlocal://assets/editImage@2x.png'
                    }, () => {
                        this.obj.isShow = !this.obj.isShow
                    })
                }
            })
            this.$event.on('choosePosition', params => {
                this.staff.position_name = params.position_name
                this.staff.position_id = params.position_id
                this.staff.activeIndex = params.activeIndex
            })
        },
        methods: {
            inputMobile (e) {
                this.staff.mobile = e.value
            },
            inputPwd (e) {
                this.staff.password = e.value
            },
            inputRepeatPwd (e) {
                this.staff.repeat_password = e.value
            },
            inputEmployeeName (e) {
                this.staff.employee_name = e.value
            },
            inputLoginName (e) {
                this.staff.login_name = e.value
            },
            stopUse (e) {
                if(this.staff.status == 1){
                    this.staff.status = 2
                }else{
                    this.staff.status = 1
                }
            },
            closeOverlay () {
                this.obj.isShow = false
            },
            deleteItem () {
                let self = this
                this.obj.isShow = false
                this.$notice.confirm({
                    title: '',
                    message: `确认删除${this.staff.employee_name}${this.staff.position_name}？`,
                    okTitle: '确认',
                    cancelTitle: '取消',
                    okCallback() {
                        // 点击确认按钮的回调
                        deleteEmployee({
                            employee_id: self.staff._id
                        }, () => {
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
            togglePw () {
                if (this.pwtype === 'text') {
                    this.pwtype = 'password'
                } else {
                    this.pwtype = 'text'
                }
            },
            go () {
                this.$router.open({
                    name: 'gradeManage',
                    params: {
                        onlyAddFn: false,
                        activeIndex: this.staff.activeIndex
                    }
                })
            },
            // 输入手机号码检验
            inputMobileTest () {
                if (this.staff.mobile === '') {
                    this.$notice.toast({
                        message: '请输入电话号码'
                    })
                    return false
                }
                if (!(/^1[3|4|5|7|8][0-9]{9}$/.test(this.staff.mobile))) {
                    this.$notice.toast({
                        message: '手机号码不正确,请重新输入'
                    })
                    return false
                }
                return true
            },
            // 员工姓名检验
            inputEmployeeNameTest () {
                if (this.staff.employee_name === '') {
                    this.$notice.toast({
                        message: '请输入员工姓名'
                    })
                    return false
                }
                return true
            },
            // 员工登录姓名校验
            inputEmployeeLoginNameTest () {
              if(this.staff.login_name === '') {
                  this.$notice.toast({
                      message: '请输入员工登录名'
                  })
                  return false
              }
              return  true
            },
            // 员工密码检验
            inputEmployeePwTest () {
              if ( !this.staff.employee_id && this.staff.password === '') {
                  this.$notice.toast({
                      message: '请输入正确的密码'
                  })
                  return false
              }
              return true
            },
            // 职位选择检验
            inputJobTest () {
                if (this.staff.position_name === '请选择') {
                    this.$notice.toast({
                        message: '请选择职位'
                    })
                    return false
                }
                return true
            },
            addEmployeeFn () {
                if (this.inputEmployeeNameTest() && this.inputEmployeeLoginNameTest()  && this.inputEmployeePwTest() && this.inputMobileTest() && this.inputJobTest()) {
                    if (!this.btUsable) return
                    this.btUsable = false
                    setTimeout(() => {
                        this.btUsable = true
                    }, 1000)
                    editEmployee(this.staff, () => {
                        this.$notice.toast({
                              message: '保存成功'
                          })
                        this.$router.back()
                    })
                }
            }
        }
    }
</script>

<style scoped>
    .addEmp{
      padding-left:32px;
      background-color: #ffffff
    }
    .content{
        background-color: #f2f2f2;
    }
    .topNv{
        margin-bottom: 20px;
    }

    .label{
        font-size: 28px;
        /*font-weight: bold;*/
        color: #121C32;
        letter-spacing: 0;
    }
    .text{
        font-size: 28px;
        letter-spacing: -0.68px;
    }
    .inputs {
        width:360px;
        text-align:right;
        height: 40px;
        line-height: 40px;
        font-size: 28px
    }

    .ip-pw-wrap{
        flex-direction: row;
    }
    .fr{
        flex-direction: row;
    }
    .mr28{
        margin-right: 28px;
    }
    .m_t20{
        margin-top: 20px;
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
