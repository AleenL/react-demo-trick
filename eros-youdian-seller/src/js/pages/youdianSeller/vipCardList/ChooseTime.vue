<template>
    <div style="background-color: white">
        <div class="f_row">
            <text class="timebox" @click="startime">{{start_time || '开始时间'}}</text>
            <text style="margin-left: 20px;margin-right: 20px;line-height: 80px;color: #D8D8D8">-</text>
            <text class="timebox" @click="endtime">{{end_time || '结束时间'}}</text>
        </div>
        <div class="btnbox">
            <text class="btn" @click="getsetime">确定</text>
        </div>
    </div>
</template>

<script>
  const picker = weex.requireModule('picker')
  export default {
    data () {
        return {
            start_time: '',
            end_time: ''
        }
    },
      methods: {
          startime () {
              picker.pickDate({
                  value: this.start_time
              }, event => {
                  if (event.result === 'success') {
                      this.start_time = event.data
                  }
              })
          },
          endtime () {
              picker.pickDate({
                  value: this.end_time
              }, event => {
                  if (event.result === 'success') {
                      this.end_time = event.data
                  }
              })
          },
          getsetime () {
              if (!this.start_time) {
                  this.$notice.toast({
                      message: '请选择开始时间'
                  })
              } else if (!this.end_time) {
                  this.$notice.toast({
                      message: '请选择结束时间'
                  })
              } else {
                  this.$event.emit('gettime', {
                      start_time: this.start_time,
                      end_time: this.end_time,
                  })
                  this.$router.back()
              }
          }
      }
  }
</script>

<style scoped>
    .f_row{
        flex-direction: row;
        justify-content: center;
        margin-top: 200px;
    }
    .timebox{
        width:293px;
        height:80px;
        border-style: solid;
        border-color: #EEEEEE;
        border-width: 1px;
        border-radius: 4px ;
        color: #9B9B9B;
        text-align: center;
        line-height: 80px;
    }
    .btnbox{
        padding-left: 32px;
        padding-right: 32px;
        margin-top: 100px;
        height: 80px;
    }
    .btn{
        flex: 1;
        background-color: #FF6F6F;
        height: 80px;
        line-height: 80px;
        border-radius: 8px ;
        font-size: 26px;
        color: #ffffff;
        letter-spacing: 3px;
        text-align: center;
    }

</style>
