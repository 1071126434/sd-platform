<template>
  <div class="wrap">
    <header>
      <el-tabs v-model="activeName2" type="card" @tab-click="handleClick">
        <el-tab-pane label="买家本金提现申请" name="first">
          <div class="top">
            <el-row :gutter="20">
              <el-col :span="4">
                <div class="grid-content bg-purple">
                  <el-checkbox :indeterminate="isIndeterminate" v-model="checkAll" @change="handleCheckAllChange">全选</el-checkbox>
                </div>
              </el-col>
              <el-col :span="16">
                <div class="grid-content bg-purple">
                  | 申请时间
                  <el-date-picker v-model="value1" type="date" placeholder="选择日期">
                  </el-date-picker>
                </div>
              </el-col>
              <el-col :span="4">
                <div class="grid-content bg-purple">
                  <el-button type="primary">批量导出</el-button>
                </div>
              </el-col>
            </el-row>

          </div>
        </el-tab-pane>
        <el-tab-pane label="买家提现记录" name="second">配置管理</el-tab-pane>
      </el-tabs>
    </header>
  </div>
</template>
<script type="text/ecmascript-6">
export default {
  name: 'buyerApply',
  data () {
    return {
      activeName2: 'first',
      checked: true,
      value1: ''
    }
  },
  methods: {
    handleClick (tab, event) {
      console.log(tab, event)
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