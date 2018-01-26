<template>
  <div class="rePay">
    <header>
      <el-tabs v-model="activeName" @tab-click="handleClicks">
        <el-tab-pane label="垫付申请" name="first">
          <div class="search">
            <span>申请时间 </span>
            <el-date-picker v-model="applyTime" type="datetimerange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期" format="yyyy-MM-dd" value-format='yyyy-MM-dd'>
            </el-date-picker>
            <span style="margin-left:10px">申请人 </span>
            <el-input style="width: 160px;margin-right:50px" v-model="applyer" placeholder="请输入手机号/姓名"></el-input>
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
              </el-table-column>
              <el-table-column align="center" label="操作">
                <template slot-scope="scope">
                  <el-button type="text" size="small" @click="handleClick(scope.row)">审核通过</el-button>
                  <el-button type="text" size="small" @click="handleClickNo(scope.row)">驳回</el-button>
                </template>
              </el-table-column>
            </el-table>
            <noCont v-if="tableData.length===0"></noCont>
          </div>
        </el-tab-pane>
        <el-tab-pane label="垫付记录" name="second">
          <div class="search">
            <span>申请时间 </span>
            <el-date-picker v-model="applyTime" type="datetimerange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期" format="yyyy-MM-dd" value-format='yyyy-MM-dd'>
            </el-date-picker>
            <span style="margin-left:10px">申请人 </span>
            <el-input style="width: 160px;margin-right:50px" v-model="applyer" placeholder="请输入手机号/姓名"></el-input>
            <span>审核状态 </span>
            <el-select v-model="value" style="width: 160px;margin-right:50px" placeholder="请选择">
              <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
              </el-option>
            </el-select>
            <strong class="btn" @click="search">查询</strong>
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
              <el-table-column prop="applyTime" align="center" label="审核时间">
              </el-table-column>
              <el-table-column prop="status" align="center" label="状态">
              </el-table-column>
              <el-table-column prop="operater" align="center" label="操作人">
              </el-table-column>
            </el-table>
          </div>
          <noCont v-if="tableData.length===0"></noCont>
        </el-tab-pane>
        <div class="pager" v-if="tableData.length!==0">
          <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage" :page-sizes="[5, 10, 15, 20]" :page-size='pageSize' layout="total, sizes, prev, pager, next, jumper" :total="pageTotal">
          </el-pagination>
        </div>
      </el-tabs>
    </header>
    <!-- 点击通过的弹框 -->
    <el-dialog title="提示" :visible.sync="dialogVisible" width="30%" :before-close="handleClose" :modal-append-to-body='false'>
      <span>确认审核通过么?</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="sure">确 定</el-button>
      </span>
    </el-dialog>
    <!-- 点击驳回的弹框 -->
    <el-dialog title="确认驳回么?" :visible.sync="dialogVisible_1" width="30%" :before-close="handleClose" :modal-append-to-body='false'>
      <span>请输入驳回理由</span>
      <el-input v-model="input" placeholder="请输入内容"></el-input>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible_1 = false">取 消</el-button>
        <el-button type="primary" @click="sure_1">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script type="text/ecmascript-6">
import noCont from '../../../base/noCont/noCont'
import { pageCommon } from '../../../assets/js/mixin'
import { mapGetters } from 'vuex'
export default {
  name: 'rePay',
  mixins: [pageCommon],
  components: {
    noCont
  },
  data () {
    return {
      activeName: 'first',
      pageSize: 5,
      currentPage: 1,
      totalCount: 0,
      tableData: [],
      dialogVisible: false,
      dialogVisible_1: false,
      input: '',
      orderNum: '',
      options: [{
        value: '1',
        label: '审核通过'
      }, {
        value: '2',
        label: '被驳回'
      }],
      applyTime: '',
      applyer: '',
      value: '',
      apiUrl: '/api/advanceApply/getListByCondition'
    }
  },
  computed: {
    params () {
      if (this.activeName === 'first') {
        return {
          startTime: this.applyTime ? this.applyTime[0] : '',
          endTime: this.applyTime ? this.applyTime[1] : '',
          condition: this.applyer,
          status: '0',
          pageNo: this.pageNo,
          pageSize: this.pageSize
        }
      } else if (this.activeName === 'second') {
        return {
          startTime: this.applyTime ? this.applyTime[0] : '',
          endTime: this.applyTime ? this.applyTime[1] : '',
          condition: this.applyer,
          status: '1,2,3,4,5',
          pageNo: this.pageNo,
          pageSize: this.pageSize
        }
      }
    },
    ...mapGetters([
      'userInfo'
    ])
  },
  methods: {
    handleClicks () {
      if (this.activeName === 'first') {
        this.getTask()
      } else if (this.activeName === 'second') {
        this.getTask()
      }
    },
    setList (data) {
      let arr = []
      for (let word of data) {
        let goods = {
          advanceApplyId: word.advanceApplyId,
          orderNum: word.packageId || '--',
          money: word.amount || '--',
          yongjin: word.commission || '--',
          weCommon: word.buyerWechatComment || '--',
          admin: word.platformName || '--',
          adminChat: word.platformWechatName || '--',
          applyTime: word.gmtModify || '--',
          status: word.status === '0' ? '未审核' : word.status === '1' ? '审核通过' : word.status === '2' ? '被驳回' : word.status === '3' ? '已导出' : word.status === '4' ? '已打款' : '取消',
          operater: word.operateName
        }
        arr.push(goods)
      }
      this.tableData = arr
    },
    // 点击审核通过触发事件
    handleClick (val) {
      console.log(val)
      this.dialogVisible = true
      this.orderNum = val.advanceApplyId
    },
    sure () {
      this.$ajax.post('/api/advanceApply/passApply', {
        advanceApplyId: this.orderNum,
        operateUserId: this.userInfo.operateUserAccountId
      }).then((data) => {
        let res = data.data
        if (res.code === '200') {
          this.$message({
            message: '已通过审核',
            type: 'success'
          })
          this.dialogVisible = false
          this.getTask()
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
    // 当点击驳回触发的事件
    handleClickNo (val) {
      this.dialogVisible_1 = true
      this.orderNum = val.advanceApplyId
    },
    sure_1 () {
      this.$ajax.post('/api/advanceApply/rejectApply', {
        advanceApplyId: this.orderNum,
        operateUserId: this.userInfo.operateUserAccountId,
        comment: this.input
      }).then((data) => {
        let res = data.data
        if (res.code === '200') {
          this.$message({
            message: '操作成功',
            type: 'success'
          })
          this.dialogVisible_1 = false
          this.getTask()
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
    // 点击查询的进行查询
    search () {
      this.params.status = this.value
      this.getTask()
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