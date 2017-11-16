<template>
  <div class="wrap">
    <header>
      <el-tabs v-model="activeName2" type="card" @tab-click="handleClick">
        <el-tab-pane label="卖家充值申请" name="first">
          <div class="top">
            <el-input placeholder="请输入申请的卡号" v-model="input5" class="input-with-select">
              <el-button type="primary" slot="append" icon="el-icon-search"></el-button>
            </el-input>
          </div>
          <div class="line"></div>
        </el-tab-pane>
        <el-tab-pane label="卖家充值记录" name="second">卖家充值记录</el-tab-pane>
      </el-tabs>
    </header>
  </div>
</template>
<script type="text/ecmascript-6">
export default {
  name: 'sellerRecharge',
  data () {
    return {
      activeName2: 'first',
      input5: ''
    }
  },
  methods: {
    handleClick (val) {
      console.log(val)
    }
  }
}
</script>
<style lang="stylus" rel="stylesheet/stylus" scoped>
.wrap
  padding 20px
  header
    background rgba(255, 255, 255, 1)
    padding 20px
    .top
      width 280px
      margin-left 70%
    .line
      height 1px
      background rgba(229,229,229,1)
      margin-top 24px  
</style>