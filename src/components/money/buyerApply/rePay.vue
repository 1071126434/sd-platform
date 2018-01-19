<template>
  <div class="rePay">
    <header>
      <el-tabs v-model="activeName" @tab-click="handleClicks">
        <el-tab-pane label="垫付申请" name="first">
          <div class="search">
            <span>申请时间 </span>
            <el-date-picker style="width: 160px;margin-right:50px" v-model="applyTime" type="date" placeholder="选择日期">
            </el-date-picker>
            <span>申请人 </span>
            <el-input style="width: 160px;margin-right:50px" v-model="applyer" placeholder="请输入内容"></el-input>
            <strong class="btn">查询</strong>
          </div>
          <div class="accountTab">
            <el-table :data="tableData" style="width: 100%">
              <el-table-column prop="orderNum" align="center" label="大包编号">
              </el-table-column>
              <el-table-column prop="money" align="center" label="任务包金额">
              </el-table-column>
              <el-table-column prop="yongjin" align="center" label="预计佣金">
              </el-table-column>
              <el-table-column prop="weCommon" align="center" label="买手微信备注">
              </el-table-column>
              <el-table-column prop="admin" align="center" label="管理员">
              </el-table-column>
              <el-table-column prop="adminChat" align="center" label="管理员微信">
              </el-table-column>
              <el-table-column prop="applyTime" align="center" label="申请时间">
              </el-table-column>
              <el-table-column prop="status" align="center" label="状态">
                <template slot-scope="scope">
                  <span>{{ scope.row.status == 1 ? '通过' : '待审核' }}</span>
                </template>
              </el-table-column>
              <el-table-column align="center" label="操作">
                <template slot-scope="scope">
                  <el-button type="text" size="small">审核通过</el-button>
                  <el-button type="text" size="small">驳回</el-button>
                </template>
              </el-table-column>
            </el-table>
            <noCont v-if="0"></noCont>
          </div>
        </el-tab-pane>
        <el-tab-pane label="垫付记录" name="second">
          <div class="search">
            <span>申请时间 </span>
            <el-date-picker v-model="applyTime" style="width: 160px;margin-right:50px" type="date" placeholder="选择日期">
            </el-date-picker>
            <span>申请人 </span>
            <el-input v-model="applyer" style="width: 160px;margin-right:50px" placeholder="请输入内容"></el-input>
            <span>审核状态 </span>
            <el-select v-model="applyStatus" style="width: 160px;margin-right:50px" placeholder="请选择">
              <el-option label="全部" value="">
              </el-option>
            </el-select>
            <strong class="btn">查询</strong>
          </div>
          <div>
            <strong class="btn-b" style="margin: 0 0 20px">导出</strong>
          </div>
          <!-- 展示内容部分 -->
          <div class="accountTab">
            <el-table :data="tableData" style="width: 100%">
              <el-table-column prop="orderNum" align="center" label="大包编号">
              </el-table-column>
              <el-table-column prop="money" align="center" label="任务包金额">
              </el-table-column>
              <el-table-column prop="yongjin" align="center" label="预计佣金">
              </el-table-column>
              <el-table-column prop="weCommon" align="center" label="买手微信备注">
              </el-table-column>
              <el-table-column prop="admin" align="center" label="管理员">
              </el-table-column>
              <el-table-column prop="adminChat" align="center" label="管理员微信">
              </el-table-column>
              <el-table-column prop="detailTime" align="center" label="审核时间">
              </el-table-column>
              <el-table-column prop="status" align="center" label="状态">
                <template slot-scope="scope">
                  <span>{{ scope.row.status == 1 ? '通过' : '待审核' }}</span>
                </template>
              </el-table-column>
              <el-table-column prop="operater" align="center" label="操作人">
              </el-table-column>
            </el-table>
          </div>
          <noCont v-if="0"></noCont>
        </el-tab-pane>
        <div class="pager">
          <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage" :page-sizes="[5, 10, 15, 20]" :page-size='pageSize' layout="total, sizes, prev, pager, next, jumper" :total="totalCount">
          </el-pagination>
        </div>
      </el-tabs>
    </header>
  </div>
</template>
<script type="text/ecmascript-6">
import noCont from '../../../base/noCont/noCont'
export default {
  name: 'rePay',
  components: {
    noCont
  },
  data () {
    return {
      activeName: 'first',
      tableData: [{
        orderNum: '894894864485',
        money: '26',
        yongjin: '5',
        weCommon: 'weijfsajd',
        admin: '杨树林',
        adminChat: 'yndansffs',
        applyTime: '2017-06-23',
        detailTime: '2017-06-23',
        status: '1',
        operater: '黄黄'
      }],
      applyTime: '',
      applyer: '',
      applyStatus: ''
    }
  },
  methods: {
    handleClicks () {
      if (this.activeName2 === 'first') {

      } else if (this.activeName2 === 'second') {

      }
    }
  }
}
</script>
<style lang="stylus" rel="stylesheet/stylus" scoped>
.rePay
  padding 20px
  min-width 1000px
  .btn
    cursor pointer
    display inline-block
    width 90px
    height 36px
    line-height 36px
    text-align center
    border-radius 4px
    background #40B6FF
    color #ffffff
    font-size 14px
    &:hover
      opacity 0.8
  .btn-b
    display inline-block
    cursor pointer
    width 90px
    height 36px
    line-height 36px
    text-align center
    border-radius 4px
    font-size 14px
    border 1px solid #CCCCCC
    &:hover
      opacity 0.8
  .search
    margin 24px 0
    span
      margin-right 10px
  header
    background rgba(255, 255, 255, 1)
    padding 20px
    .top
      width 280px
      margin-left 70%
    .line
      height 1px
      background rgba(229, 229, 229, 1)
      margin-top 24px
    .second_top
      margin-top 20px
      width 100%
      overflow hidden
      .Stime
        float left
        margin-right 30px
      .search
        width 280px
        float left
      .excel
        float right
</style>