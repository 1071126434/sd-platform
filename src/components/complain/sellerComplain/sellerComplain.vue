<template>
  <div class="sellerComplain">
    <div class="tab">
      <div class="nav">
        <el-tabs v-model="activeName" @tab-click="handleClick">
          <el-tab-pane label="未受理" name="first"></el-tab-pane>
          <el-tab-pane label="处理中" name="second"></el-tab-pane>
          <el-tab-pane label="已处理" name="third"></el-tab-pane>
        </el-tabs>
      </div>
      <div class="tabCont"></div>
      <div class="pager"></div>
    </div>
  </div>
</template>
<script type="text/ecmascript-6">
export default {
  name: 'sellerComplain',
  data () {
    return {
      activeName: 'first'
    }
  },
  methods: {
    handleClick (tab, event) {
      console.log(tab, event)
    },
    handleSizeChange (val) {
      console.log(`每页 ${val} 条`)
    },
    handleCurrentChange (val) {
      console.log(`当前页: ${val}`)
    }
  }
}
</script>
<style lang="stylus" rel="stylesheet/stylus" scoped>
.sellerComplain
  padding 20px
  .tab
    padding 20px
    background #ffffff
</style>