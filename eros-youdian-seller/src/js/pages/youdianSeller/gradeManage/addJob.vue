<template>
    <div class="content">
        <!--<wxc-minibar title="编辑职位" background-color="#FFFFFF" ></wxc-minibar>-->
        <div style="margin-top:20px ">
            <wxc-cell label="职位名称" :cell-style="{height:'100px',paddingLeft:'32px',paddingRight:'32px'}">
                <input type="text"
                       placeholder="请输入职位名称"
                       slot="value"
                       class="inputs"
                       maxlength="10"
                       @input="inputPositionName"
                >
            </wxc-cell>
        </div>
        <div style="align-items: center;margin-top:100px">
            <wxc-button text="保存" class="bt" @wxcButtonClicked="addPosition"></wxc-button>
        </div>
    </div>
</template>

<script>
import { WxcButton, WxcMinibar,WxcCell } from 'weex-ui'
import { addPosition } from "../services/employee";

export default {
  components: {
    WxcMinibar,
      WxcCell,
    WxcButton
  },
  data () {
    return {
      positionName: ''
    }
  },
  methods: {
    inputPositionName (e) {
        this.positionName = e.value
    },
    addPosition () {
      if (this.positionName === '') {
          this.$notice.toast({
              message: '请输入职位名称'
          })
          return
      }
      var data = {
        position_name: this.positionName
      }

      addPosition(data, () => {
          this.$event.emit('updateJobList')
          this.$router.back()
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
