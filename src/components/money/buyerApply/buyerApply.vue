<template>
  <div class="wrap">
    <header>
      <el-tabs v-model="activeName2" type="card" @tab-click="handleClickTab">
        <el-tab-pane label="买家本金提现申请" name="first">
          <div class="top">
            <div class="purple_2">
              申请时间:
              <el-date-picker v-model="value4" type="datetimerange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期" value-format='yyyy-MM-dd'>
              </el-date-picker>
              <el-button type="primary" icon="el-icon-search" @click="blur">搜索</el-button>

            </div>
            <div class="content">
              <el-button type="primary" @click="exportData">批量导出</el-button>
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
                  <div v-if="scope.row.state==='已导出'">
                    <el-button @click="handleClickPass(scope.row)" type="text" size="small">确认</el-button>
                    <el-button @click="handleClickNoPass(scope.row)" type="text" size="small">撤销</el-button>
                  </div>
                  <div v-if="scope.row.state1==='0'&&scope.row.state==='未导出'">
                    <el-button @click="handleClick(scope.row)" type="text" size="small">暂不处理</el-button>
                  </div>
                  <div v-if="scope.row.state1==='1'&&scope.row.state==='未导出'">
                    <el-tooltip class="item" effect="dark" :content="scope.row.comment" placement="top">
                      <el-button @click="handleClicking(scope.row)" type="text" size="small">进行处理</el-button>
                    </el-tooltip>
                  </div>
                </template>
              </el-table-column>
            </el-table>
            <div class="line"></div>
            <div class="moneyNum">
              <p class="number">实际金额 :
                <span style="color:#ff3341">{{moneyNumber}}</span>
              </p>
              <el-button @click="allSure(applyIdsNumChoose)">批量确认</el-button>
            </div>
          </div>
          <Nocont v-if="this.tableDataBuy.length===0"></Nocont>
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
                <el-button slot="append" icon="el-icon-search" @click="search"></el-button>
              </el-input>
            </div>
          </div>
          <!-- 内容列表 -->
          <div class="accountTab">
            <el-table :data="tableDataBuyList" style="width: 100%">
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
                  <span class="tipSmall" :class="scope.row.JDStatus==='成功' ? 'tipSuccess' : scope.row.JDStatus==='失败' ? 'tipError' : ''">{{scope.row.JDStatus}}</span>
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
          <Nocont v-if="this.tableDataBuyList.length===0"></Nocont>
        </el-tab-pane>
        <!-- 分页 -->
        <div class="pager" style="clear:both" v-if="showPager">
          <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage" :page-sizes="[5, 10, 15, 20]" :page-size="pageSize" layout="total, sizes, prev, pager, next, jumper" :total="totalCount">
          </el-pagination>
        </div>
      </el-tabs>
    </header>
    <!-- 批量通过的弹窗 -->
    <el-dialog title="请选择打款卡号" :visible.sync="dialogFormBank" :modal-append-to-body=false>
      <el-form>
        <el-form-item label="信息">
          <el-select v-model="bankName" placeholder="请选择">
            <el-option v-for="(item,index) in bankList" :key="index" :label="item.bankName+' '+item.cardNo+' '+item.userName" :value="item.bankCarId"></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormBank = false">取 消</el-button>
        <el-button type="primary" @click="sureBank">确 定</el-button>
      </div>
    </el-dialog>
    <!-- 当点击单个确认的弹窗 -->
    <el-dialog title="请选择打款卡号" :visible.sync="dialogFormBankOne" :modal-append-to-body=false>
      <el-form>
        <el-form-item label="信息">
          <el-select v-model="bankName" placeholder="请选择">
            <el-option v-for="(item,index) in bankList" :key="index" :label="item.bankName+' '+item.cardNo+' '+item.userName" :value="item.bankCarId"></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormBankOne = false">取 消</el-button>
        <el-button type="primary" @click="sureBankOne">确 定</el-button>
      </div>
    </el-dialog>
    <!-- 当点击单个驳回的弹窗 -->
    <el-dialog title="暂不处理说明" :visible.sync="dialogFormVisible_1" :modal-append-to-body='false'>
      <el-form>
        <el-form-item label="">
          <el-input v-model="formName"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="sure_1">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script type="text/ecmascript-6">
import { mapGetters } from 'vuex'
import Nocont from '../../../base/noCont/noCont'
export default {
  name: 'buyerApply',
  components: {
    Nocont
  },
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
      bankList: [],
      bankName: '',
      tableDataBuy: [],
      tableDataBuyList: [],
      dialogFormVisible: false,
      dialogFormVisible_1: false,
      withdrawApply_1: '',
      formName: '',
      // 将选中的值存在一个数组里面
      applyIdsNum: [],
      dialogFormBank: false,
      dialogFormBankOne: false,
      withdrawApply_sure: '',
      // 用来判断是否导出就进行提现的问题
      applyIdsNumChoose: [],
      // 钱的数量
      moneyNumber: 0
    }
  },
  computed: {
    ...mapGetters([
      'userInfo',
      'userToken']),
    showPager: function () {
      if (this.activeName2 === 'first' && this.tableDataBuy.length !== 0) {
        return true
      } else if (this.activeName2 === 'second' && this.tableDataBuyList.length !== 0) {
        return true
      } else {
        return false
      }
    }
  },
  created () {
    this.buyerData(1, this.pageSize)
    this.bankLists()
  },
  methods: {
    handleClickTab () {
      if (this.activeName2 === 'first') {
        this.buyerData(1, this.pageSize)
      } else if (this.activeName2 === 'second') {
        this.buyerDataList(1, this.pageSize)
      }
    },
    // 单个选触发的事件
    handSelect (index, val) {
      console.log(index)
      let arr = []
      let arr1 = []
      for (let word of index) {
        let goods = {
          state: word.state,
          applyIds: word.withdrawApplyId
        }
        arr.push(goods.applyIds)
        arr1.push(goods)
      }
      this.applyIdsNum = arr
      this.applyIdsNumChoose = arr1
      let abc = 0
      for (var i = 0; i < index.length; i++) {
        abc += (index[i].moneyNum - 0)
      }
      this.moneyNumber = abc.toFixed(2)
    },
    // 全选触发的事件
    selectAll (val) {
      console.log(val)
      let arr = []
      let arr1 = []
      for (let word of val) {
        let goods = {
          state: word.state,
          applyIds: word.withdrawApplyId
        }
        arr.push(goods.applyIds)
        arr1.push(goods)
      }
      this.applyIdsNum = arr
      this.applyIdsNumChoose = arr1
    },
    // 当点击单个的时候 的暂不处理 触发
    handleClick (tab) {
      this.withdrawApply_1 = tab.withdrawApplyId
      this.dialogFormVisible_1 = true
      console.log(tab)
    },
    sure_1 () {
      this.$ajax.post('/api/withdrawApply/updateApplysStop', {
        comment: this.formName,
        operateUserAccountId: this.userInfo.operateUserAccountId,
        operateUserName: this.userInfo.userName,
        applyIds: [this.withdrawApply_1]
      }).then((data) => {
        console.log(data)
        let res = data.data
        if (res.code === '200') {
          this.$message({
            message: res.message,
            type: 'success'
          })
          this.dialogFormVisible_1 = false
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
    // 当操作单个驳回的结束
    // 当点击单个进行处理的操作
    handleClicking (tab) {
      this.$ajax.post('/api/withdrawApply/updateApplysRestart', {
        comment: '',
        operateUserAccountId: this.userInfo.operateUserAccountId,
        operateUserName: this.userInfo.userName,
        applyIds: [tab.withdrawApplyId]
      }).then((data) => {
        console.log(data)
        let res = data.data
        if (res.code === '200') {
          this.$message({
            message: res.message,
            type: 'success'
          })
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
    // 当点击单个进行处理的结束

    // 当点击单个进行确认的时候开始
    handleClickPass (val) {
      this.dialogFormBankOne = true
      this.withdrawApply_sure = val.withdrawApplyId
    },
    sureBankOne () {
      this.$ajax.post('/api/withdrawApply/updateApplysPass', {
        comment: '本金提现',
        operateUserAccountId: this.userInfo.operateUserAccountId,
        operateUserName: this.userInfo.userName,
        applyIds: [this.withdrawApply_sure],
        platformBankCardId: this.bankName
      }).then((data) => {
        console.log(data)
        let res = data.data
        if (res.code === '200') {
          this.$message({
            message: res.message,
            type: 'success'
          })
          this.dialogFormBankOne = false
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
    // 当点击单个进行确认结束
    // 单个取消的开始
    handleClickNoPass (val) {
      console.log(val)
      this.$confirm('此操作将取消用户申请, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$ajax.post('/api/withdrawApply/updateApplysReject', {
          comment: '',
          operateUserAccountId: this.userInfo.operateUserAccountId,
          operateUserName: this.userInfo.userName,
          applyIds: [val.withdrawApplyId]
        }).then((data) => {
          console.log(data)
          let res = data.data
          if (res.code === '200') {
            this.$message({
              message: res.message,
              type: 'success'
            })
            this.dialogFormVisible = false
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
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消'
        })
      })
    },
    // 单个取消的结束
    handleSizeChange (val) {
      // console.log(`每页 ${val} 条`)
      if (this.activeName2 === 'first') {
        this.buyerData(1, val)
      } else if (this.activeName2 === 'second') {
        this.buyerDataList(1, val)
      }
    },
    handleCurrentChange (val) {
      if (this.activeName2 === 'first') {
        this.buyerData(val, this.pageSize)
      } else if (this.activeName2 === 'second') {
        this.buyerDataList(val, this.pageSize)
      }
    },
    // 当进入页面进行展示的部分
    buyerData (pageNo, pageSize) {
      this.$ajax.post('/api/withdrawApply/getApplysByConditions', {
        statusList: ['0'],
        pageNo: pageNo,
        pageSize: pageSize,
        startTime: this.value4 ? this.value4[0] : '',
        endTime: this.value4 ? this.value4[1] : ''
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
              bank: word.bankName,
              name: word.userName,
              time: word.gmtCreate,
              withdrawApplyId: word.withdrawApplyId,
              state: word.isExport === '0' ? '未导出' : '已导出',
              state1: word.isStoped,
              comment: word.comment
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
    // 当进入第二个请求的部分
    // 当进入页面进行展示的部分
    buyerDataList (pageNo, pageSize) {
      this.$ajax.post('/api/withdrawApply/getApplysByConditions', {
        statusList: ['1', '2'],
        pageNo: pageNo,
        pageSize: pageSize,
        startTime: this.value3 ? this.value3[0] : '',
        endTime: this.value3 ? this.value3[1] : '',
        buyerTelephoneOrName: this.input5
      }).then((data) => {
        console.log(data)
        let res = data.data
        this.totalCount = res.data.totalCount
        if (res.code === '200') {
          let arr = []
          for (let word of res.data.withdrawApplys) {
            let goods = {
              orderTask: word.withdrawApplyId,
              phone: word.userTelephone,
              moneyNum: word.actualAmount,
              remark: word.comment || '无',
              JDStatus: word.status === '1' ? '成功' : '失败',
              sBank: word.bankCardName,
              dBank: word.platformBankCardName || '--',
              time: word.gmtModify,
              person: word.modifiedOperaterName
            }
            arr.push(goods)
          }
          this.tableDataBuyList = arr
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
    allSure (val) {
      if (val.length === 0) {
        this.$message({
          message: '请至少选择一条数据进行操作',
          type: 'warning'
        })
        return false
      }
      for (var i = 0; i < val.length; i++) {
        if (val[i].state === '未导出') {
          this.$message({
            message: '请先进行导出再批量确认',
            type: 'warning'
          })
          return false
        } else {
          this.dialogFormBank = true
        }
      }
    },
    // 批量进行通过提现 部分
    sureBank () {
      this.$ajax.post('/api/withdrawApply/updateApplysPass', {
        comment: '',
        operateUserAccountId: this.userInfo.operateUserAccountId,
        operateUserName: this.userInfo.userName,
        applyIds: this.applyIdsNum,
        platformBankCardId: this.bankName
      }).then((data) => {
        console.log(data)
        let res = data.data
        if (res.code === '200') {
          this.$message({
            message: res.message,
            type: 'success'
          })
          this.dialogFormBank = false
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
    // 设置导出状态的接口
    exportData () {
      this.$ajax.post('/api/withdrawApply/updateApplysExport', {
        comment: '',
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
          this.dialogFormVisible = false
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
    // 批量通过审批的接口
    morePass () {
      this.$ajax.post('/api/withdrawApply/updateApplysPass', {
        comment: '',
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
          this.dialogFormVisible = false
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
    // 日期的筛选
    blur () {
      this.buyerData(1, this.pageSize)
    },
    search () {
      this.buyerDataList(1, this.pageSize)
    },
    // 获取银行卡列表
    bankLists () {
      this.$ajax.post('/api/config/bankCard/getListByType', {
        type: 0
      }).then((data) => {
        console.log(data)
        let res = data.data
        if (res.code === '200') {
          let arr = []
          for (let word of res.data) {
            let goods = {
              bankName: word.bankName,
              cardNo: word.cardNo,
              userName: word.userName,
              bankCarId: word.bankCardId
            }
            arr.push(goods)
          }
          this.bankList = arr
        } else {
          this.$message({
            message: res.message,
            type: 'warning'
          })
        }
      }).catch(() => {
        this.$message.error('网络错误，刷新下试试')
      })
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