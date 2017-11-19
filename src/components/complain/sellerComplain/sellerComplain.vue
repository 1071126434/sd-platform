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
      <div class="tabCont">
        <el-table :data="tableData">
          <el-table-column prop="sellerPhone" align="center" label="商家联系方式">
          </el-table-column>
          <el-table-column prop="complainReason" align="center" label="投诉原因">
            <template slot-scope="scope">
              <el-tooltip class="item" effect="dark" :content="scope.row.complainReason" placement="top">
                <span class="overElipes">{{ scope.row.complainReason }}</span>
              </el-tooltip>
            </template>
          </el-table-column>
          <el-table-column prop="complainCommon" align="center" label="投诉备注">
            <template slot-scope="scope">
              <el-tooltip class="item" effect="dark" :content="scope.row.complainCommon" placement="top">
                <span class="overElipes">{{ scope.row.complainCommon }}</span>
              </el-tooltip>
            </template>
          </el-table-column>
          <el-table-column prop="dealOptionIn" align="center" label="处理意见(对内)">
            <template slot-scope="scope">
              <el-tooltip class="item" effect="dark" :content="scope.row.dealOptionIn" placement="top">
                <span class="overElipes">{{ scope.row.dealOptionIn }}</span>
              </el-tooltip>
            </template>
          </el-table-column>
          <el-table-column prop="dealOptionOut" align="center" label="处理意见(对外)">
            <template slot-scope="scope">
              <el-tooltip class="item" effect="dark" :content="scope.row.dealOptionOut" placement="top">
                <span class="overElipes">{{ scope.row.dealOptionOut }}</span>
              </el-tooltip>
            </template>
          </el-table-column>
          <el-table-column prop="applyTime" align="center" label="申请时间">
          </el-table-column>
          <el-table-column v-if="activeName!='first'" prop="operateMember" align="center" label="操作人">
          </el-table-column>
          <el-table-column prop="operate" align="center" label="操作">
            <template slot-scope="scope">
              <el-button @click="lookDetail(scope.row)" type="text" size="small">{{ activeName === 'third' ? '查看' : '去处理' }}</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <div class="pager">
        <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage" :page-sizes="[100, 200, 300, 400]" :page-size="100" layout="total, sizes, prev, pager, next, jumper" :total="400">
        </el-pagination>
      </div>
    </div>
  </div>
</template>
<script type="text/ecmascript-6">
export default {
  name: 'sellerComplain',
  data () {
    return {
      activeName: 'first',
      currentPage: 1,
      tableData: [{
        sellerPhone: '18655554444',
        complainReason: '八个字八个字',
        complainCommon: '八个字八个字',
        dealOptionIn: '--',
        dealOptionOut: '--',
        applyTime: '2017-11-17 19:20:56',
        operateMember: '疯狂到哈倒萨'
      }]
    }
  },
  methods: {
    handleClick (tab, event) {
      console.log(tab, event)
    },
    lookDetail (row) {
      console.log(row)
      this.$router.push({ name: 'sellerComplainDetail' })
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
    .overElipes
      display inline-block
      width 112px
      overflow hidden
      white-space nowrap
      text-overflow ellipsis
</style>