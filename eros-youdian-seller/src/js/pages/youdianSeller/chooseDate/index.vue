<template>
    <div class="wrapper">
      <div>
        <bmcalendar class="calendar"
                    :selectType="selectType"
                    :minimumDate="minimumDate"
                    :maximumDate="maximumDate"
                    :startDate="startDate"
                    :endDate="endDate"
                    :showPlaceholder="showPlaceholder"
                    ref='calendar'
                    @finish='finish'
                    style="height: 800px;
                            weekend-color:#FF847B;
                            select-color:#FF847B;"></bmcalendar>
      </div>
    </div>
</template>

<script>

export default {
    components: {
    },
    data () {
        return {
            selectType: 'range',
            minimumDate: "",
            maximumDate: "",
            startDate: "",
            endDate: "",
            showPlaceholder: true
        }
    },
    created () {
        this.$router.getParams().then(params => {
          this.selectType = params.selectType
          this.minimumDate = params.minimumDate
          this.maximumDate = params.maximumDate
          this.startDate = params.startDate
          this.endDate = params.endDate
          this.showPlaceholder = params.showPlaceholder
        })
    },
    methods: {
      finish (params) {
        console.log(params);
        // this.$router.back()
        this.$emit('chooseDate', )
      }
    }
}
</script>

<style scoped>
  .wrapper{
  }
  .calendar{
    background-color: #ffffff;
    margin-top: 20px;
  }
</style>
