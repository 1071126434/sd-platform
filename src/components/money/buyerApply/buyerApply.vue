<template>
  <div class="wrap">
    <header>
      <el-tabs v-model="activeName2" type="card" @tab-click="handleClick">
        <el-tab-pane label="买家本金提现申请" name="first">
          <div class="top">
            <div class="purple_2">
              申请时间:
              <el-date-picker v-model="value4" type="datetimerange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期">
              </el-date-picker>
            </div>
            <div class="content">
              <el-button type="primary">批量导出</el-button>
            </div>
          </div>
          <!-- 内容列表展示 -->
          <div class="accountTab">
            <el-table :data="tableDataBuy" style="width: 100%" @select="handSelect" @select-all="selectAll">
              <el-table-column type="selection"></el-table-column>
              <el-table-column prop="phone" align="center" label="手机号">
              </el-table-column>
              <el-table-column prop="moneyNum" align="center" label="提现金额">
              </el-table-column>
              <el-table-column prop="bankNum" align="center" label="银行卡号">
              </el-table-column>
              <el-table-column prop="bank" align="center" label="银行">
              </el-table-column>
              <el-table-column prop="name" align="center" label="姓名">
              </el-table-column>
              <el-table-column prop="time" align="center" label="申请时间">
              </el-table-column>
              <el-table-column prop="state" align="center" label="导出状态">
              </el-table-column>
              <el-table-column align="center" label="操作" prop="state1">
                <template slot-scope="scope">
                  <div v-if="status==='1'">
                    <el-button @click="handleClick(scope.row)" type="text" size="small">确认</el-button>
                    <el-button @click="handleClick(scope.row)" type="text" size="small">撤销</el-button>
                  </div>
                  <div v-if="status==='0'">
                    <el-button @click="handleClick(scope.row)" type="text" size="small">暂不处理</el-button>
                  </div>
                </template>
              </el-table-column>
            </el-table>
            <div class="line"></div>
            <div class="moneyNum">
              <p class="number">实际金额 :
                <span style="color:#ff3341">720.00</span>
              </p>
              <el-button @click="totalSure">批量确认</el-button>
            </div>
          </div>
        </el-tab-pane>
        <el-tab-pane label="买家提现记录" name="second">
          <div class="buyerTop">
            <div class="time">
              申请时间:
              <el-date-picker v-model="value3" type="datetimerange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期">
              </el-date-picker>
            </div>
            <div class="name">
              <el-input placeholder="请输入姓名/手机号" v-model="input5" class="input-with-select">
                <el-button slot="append" icon="el-icon-search"></el-button>
              </el-input>
            </div>
          </div>
          <!-- 内容列表 -->
          <div class="accountTab">
            <el-table :data="tableDataBuy" style="width: 100%">
              <!-- <el-table-column type="selection"></el-table-column> -->
              <el-table-column prop="orderTask" align="center" label="提现编号">
              </el-table-column>
              <el-table-column prop="phone" align="center" label="手机号">
              </el-table-column>
              <el-table-column prop="moneyNum" align="center" label="提现金额">
              </el-table-column>
              <el-table-column prop="remark" align="center" label="提现原因">
              </el-table-column>
              <el-table-column prop="time" align="center" label="确认时间">
              </el-table-column>
              <el-table-column align="center" label="状态">
                <template slot-scope="scope">
                  <span class="tipSmall" :class="scope.row.JDStatus==='成功' ? 'tipSuccess' : scope.row.JDStatus==='失败' ? 'tipWait' : 'tipError'">{{scope.row.JDStatus}}</span>
                </template>
              </el-table-column>
              <el-table-column prop="sBank" align="center" label="收款银行卡">
              </el-table-column>
              <el-table-column prop="dBank" align="center" label="打款银行卡">
              </el-table-column>
              <el-table-column prop="person" align="center" label="操作人员">
              </el-table-column>
            </el-table>
          </div>
        </el-tab-pane>
        <!-- 分页 -->
        <div class="pager" style="clear:both">
          <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage" :page-sizes="[5, 10, 15, 20]" :page-size="pageSize" layout="total, sizes, prev, pager, next, jumper" :total="totalCount">
          </el-pagination>
        </div>
      </el-tabs>
    </header>
    <el-dialog title="暂不处理说明" :visible.sync="dialogFormVisible" :modal-append-to-body='false'>
      <el-form>
        <el-form-item label="">
          <el-input v-model="formName"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="sure">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script type="text/ecmascript-6">
import { mapGetters } from 'vuex'
export default {
  name: 'buyerApply',
  data () {
    return {
      activeName2: 'first',
      value1: '',
      value3: '',
      value4: '',
      input5: '',
      currentPage: 1,
      totalCount: 0,
      isIndeterminate: true,
      pageSize: 5,
      tableDataBuy: [],
      BuytableData: [],
      status: '1',
      dialogFormVisible: false,
      formName: '',
      // 将选中的值存在一个数组里面
      applyIdsNum: []
    }
  },
  computed: {
    ...mapGetters([
      'userInfo',
      'userToken'])
  },
  created () {
    this.buyerData(1, this.pageSize)
  },
  methods: {
    // 单个选触发的事件
    handSelect (index, val) {
      console.log(index)
      let arr = []
      for (let word of index) {
        let goods = {
          applyIds: word.withdrawApplyId
        }
        arr.push(goods.applyIds)
      }
      this.applyIdsNum = arr
    },
    // 全选触发的事件
    selectAll (val) {
      console.log(val)
      let arr = []
      for (let word of val) {
        let goods = {
          applyIds: word.withdrawApplyId
        }
        arr.push(goods.applyIds)
      }
      this.applyIdsNum = arr
    },
    handleClick (tab) {
      this.dialogFormVisible = true
      console.log(tab)
    },
    handleSizeChange (val) {
      // console.log(`每页 ${val} 条`)
      this.buyerData(1, val)
    },
    handleCurrentChange (val) {
      console.log(`当前页: ${val}`)
      this.buyerData(val, this.pageSize)
    },
    // 当进入页面进行展示的部分
    buyerData (pageNo, pageSize) {
      this.$ajax.post('/api/withdrawApply/getApplysByConditions', {
        statusList: ['0'],
        pageNo: pageNo,
        pageSize: pageSize,
        startTime: this.value3 ? this.value3[0] : '',
        endTime: this.value3 ? this.value3[1] : ''
      }).then((data) => {
        console.log(data)
        let res = data.data
        this.totalCount = res.data.totalCount
        if (res.code === '200') {
          let arr = []
          for (let word of res.data.withdrawApplys) {
            let goods = {
              phone: word.userTelephone,
              moneyNum: word.actualAmount,
              bankNum: word.bankCardNo,
              bank: word.bankCardName,
              name: word.bankCardName,
              time: word.gmtCreate,
              withdrawApplyId: word.withdrawApplyId,
              state: word.isExport === '0' ? '未导出' : '已导出',
              state1: word.isExport === '0' ? this.status = '0' : this.status = '1'
            }
            arr.push(goods)
          }
          this.tableDataBuy = arr
        } else {
          this.$message({
            message: res.message,
            type: 'warning'
          })
        }
      }).catch(() => {
        this.$message.error('网络错误，刷新下试试')
      })
    },
    // 在未导出的状态下 当点击暂不处理 请求批量拒绝接口
    sure () {
      this.$ajax.post('/api/withdrawApply/updateApplysStop', {
        comment: this.formName,
        operateUserAccountId: this.userInfo.operateUserAccountId,
        operateUserName: this.userInfo.userName,
        applyIds: this.applyIdsNum
      }).then((data) => {
        console.log(data)
        let res = data.data
        if (res.code === '200') {
          this.$message({
            message: res.message,
            type: 'success'
          })
          this.dialogFormVisible = true
          this.buyerData(1, this.pageSize)
        } else {
          this.$message({
            message: res.message,
            type: 'warning'
          })
        }
      }).catch(() => {
        this.$message.error('网络错误，刷新下试试')
      })
    },
    // 当点击批量驳回的时候触发的事件 获取被选中的内容
    totalSure () {
      this.dialogFormVisible = true
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
    overflow hidden
    .buyerTop
      margin-top 14px
      border-bottom 1px solid rgba(229, 229, 229, 1)
      padding-bottom 70px
      .time
        float left
      .name
        width 280px
        float right
    .top
      margin-top 22px
      .purple_2
        float left
      .purple_2
        margin-top -12px
        margin-left 12px
        color rgba(51, 51, 51, 1)
        font-size 14px
      .content
        float right
        margin-top -12px
    .line
      height 1px
      background #E5E5E5
      margin-top 2rem
    .moneyNum
      float right
      margin-top 2rem
      padding-bottom 2rem
      color #333333
      font-size 1.4rem
      .number
        float left
        margin-top 1.2rem
        margin-right 0.5rem
</style>