<template>
  <div class="wrap">
    <header>
      <p>买家账号/账号详情</p>
      <el-row type="flex" class="row-bg" justify="space-between">
        <el-col :span="6">
          <div class="grid-content bg-purple">
            <h4>卖家基本信息</h4>
            <div>
              <i class="el-icon-mobile-phone"></i>
              <span>15037183341</span>
              <span>普通会员</span>
            </div>
            <div>
              服务人微信号:
              <span>黄军</span>
              <em>邀请人:
                <span>黄军</span>
              </em>
            </div>
            <div>
              <el-switch v-model="value3" active-text="按月付费">
              </el-switch>
            </div>
          </div>
        </el-col>
        <el-col :span="6">
          <div class="grid-content bg-purple-light">dfaf </div>
        </el-col>
        <el-col :span="6">
          <div class="grid-content bg-purple"> sfasfa</div>
        </el-col>
      </el-row>
    </header>
  </div>
</template>
<script type="text/ecmascript-6">
export default {
  name: 'sellerAccount',
  data () {
    return {
      value3: true
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
</style>