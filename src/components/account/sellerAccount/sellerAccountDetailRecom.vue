<template>
  <div class="borderCard">
    <el-tabs type="border-card" v-model="activeName" @tab-click="handleClick">
      <el-tab-pane label="员工账号" name="one">
        <div class="accountTab">
          <el-table :data="tableDataSell" style="width: 100%">
            <el-table-column prop="name" align="center" label="姓名">
            </el-table-column>
            <el-table-column prop="number" align="center" label="账号名">
            </el-table-column>
            <el-table-column prop="numberType" align="center" label="账号类型">
            </el-table-column>
            <el-table-column prop="admin" align="center" label="管理员">
            </el-table-column>
            <el-table-column align="center" label="帐号状态">
              <template slot-scope="scope">
                <span class="tipSmall" :class="scope.row.JDStatus==='正常' ? 'tipSuccess' : scope.row.JDStatus==='冻结' ? 'tipError' : 'tipWait'">{{scope.row.JDStatus}}</span>
              </template>
            </el-table-column>
            <el-table-column prop="time" align="center" label="注册时间">
            </el-table-column>
          </el-table>
        </div>
      </el-tab-pane>
      <el-tab-pane label="买手账号" name="two">
        <div class="accountTab">
          <el-table :data="tableDataBuy" style="width: 100%">
            <el-table-column prop="name" align="center" label="姓名">
            </el-table-column>
            <el-table-column prop="number" align="center" label="账号名">
            </el-table-column>
            <el-table-column prop="numberType" align="center" label="账号类型">
            </el-table-column>
            <el-table-column prop="admin" align="center" label="管理员">
            </el-table-column>
            <el-table-column align="center" label="帐号状态">
              <template slot-scope="scope">
                <span class="tipSmall" :class="scope.row.JDStatus==='正常' ? 'tipSuccess' : scope.row.JDStatus==='冻结' ? 'tipError' : 'tipWait'">{{scope.row.JDStatus}}</span>
              </template>
            </el-table-column>
            <el-table-column prop="time" align="center" label="注册时间">
            </el-table-column>
          </el-table>
        </div>
      </el-tab-pane>
      <el-tab-pane label="管理员账号" name="three">
        <div class="accountTab">
          <el-table :data="tableDataAdmin" style="width: 100%">
            <el-table-column prop="name" align="center" label="姓名">
            </el-table-column>
            <el-table-column prop="number" align="center" label="账号名">
            </el-table-column>
            <el-table-column prop="numberType" align="center" label="账号类型">
            </el-table-column>
            <el-table-column align="center" label="帐号状态">
              <template slot-scope="scope">
                <span class="tipSmall" :class="scope.row.JDStatus==='正常' ? 'tipSuccess' : scope.row.JDStatus==='冻结' ? 'tipError' : 'tipWait'">{{scope.row.JDStatus}}</span>
              </template>
            </el-table-column>
            <el-table-column prop="time" align="center" label="注册时间">
            </el-table-column>
          </el-table>
        </div>
      </el-tab-pane>
      <!-- 分页 -->
      <div class="pager">
        <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage" :page-sizes="[1, 5, 10, 20]" :page-size="pageSize" layout="total, sizes, prev, pager, next, jumper" :total="totalCount">
        </el-pagination>
      </div>
    </el-tabs>
  </div>
</template>
<script type="text/ecmascript-6">
import { mapGetters } from 'vuex'
export default {
  name: 'sellerAccountDeatailRecom',
  data () {
    return {
      activeName: 'one',
      currentPage: 1,
      totalCount: 0,
      pageSize: 5,
      tableDataSell: [],
      tableDataBuy: [],
      tableDataAdmin: []
    }
  },
  computed: {
    ...mapGetters([
      'sellerInfo'
    ])
  },
  created () {
    this.sercherOne(1, this.pageSize)
  },
  methods: {
    handleSizeChange (val) {
      this.pageSize = val
      if (this.activeName === 'one') {
        this.sercherOne(1, this.pageSize)
      } else if (this.activeName === 'two') {
        this.sercherTwo(1, this.pageSize)
      } else if (this.activeName === 'three') {
        this.sercherThree(1, this.pageSize)
      }
    },
    handleCurrentChange (val) {
      if (this.activeName === 'one') {
        this.sercherOne(val, this.pageSize)
      } else if (this.activeName === 'two') {
        this.sercherTwo(val, this.pageSize)
      } else if (this.activeName === 'three') {
        this.sercherThree(val, this.pageSize)
      }
    },
    handleClick () {
      if (this.activeName === 'one') {
        this.sercherOne(1, this.pageSize)
      } else if (this.activeName === 'two') {
        this.sercherTwo(1, this.pageSize)
      } else if (this.activeName === 'three') {
        this.sercherThree(1, this.pageSize)
      }
    },
    sercherOne (pageNo, pageSize) {
      this.$ajax.post('/api/buyerAccount/getEmployeeListBySellerUserId', {
        sellerUserId: this.sellerInfo.sellerUserid,
        pageNo: pageNo,
        pageSize: pageSize
      }).then((data) => {
        console.log(data)
        let res = data.data
        this.totalCount = res.data.totalCount
        if (res.code === '200') {
          let arr = []
          for (let word of res.data.employees) {
            let goods = {
              name: word.userName,
              number: word.telephone,
              numberType: word.buyerType === '1' ? '员工账号' : '员工账号',
              admin: word.sellerManagerId || '--',
              JDStatus: word.buyerStatus === '1' ? '正常' : '冻结',
              time: word.gmtCreate
            }
            arr.push(goods)
          }
          this.tableDataSell = arr
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
    sercherTwo (pageNo, pageSize) {
      this.$ajax.post('/api/buyerAccount/getBuyerListBySellerUserId', {
        sellerUserId: this.sellerInfo.sellerUserid,
        pageNo: pageNo,
        pageSize: pageSize
      }).then((data) => {
        console.log(data)
        let res = data.data
        this.totalCount = res.data.totalCount
        if (res.code === '200') {
          let arr = []
          for (let word of res.data.buyers) {
            let goods = {
              name: word.userName,
              number: word.telephone,
              numberType: word.buyerType === '1' ? '买手账号' : '买手账号',
              admin: word.sellerManagerId || '--',
              JDStatus: word.buyerStatus === '1' ? '正常' : '冻结',
              time: word.gmtCreate
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
    sercherThree (pageNo, pageSize) {
      this.$ajax.post('/api/sellerManagerAccount/getManagerListBySellerUserId', {
        sellerUserId: this.sellerInfo.sellerUserid,
        pageNo: pageNo,
        pageSize: pageSize
      }).then((data) => {
        console.log(data)
        let res = data.data
        this.totalCount = res.data.totalCount
        if (res.code === '200') {
          let arr = []
          for (let word of res.data.managers) {
            let goods = {
              name: word.userName || '--',
              number: word.telephone,
              numberType: word.buyerType === '1' ? '管理员账号' : '管理员账号',
              admin: word.sellerManagerId || '--',
              JDStatus: word.status === '1' ? '正常' : '冻结',
              time: word.gmtCreate
            }
            arr.push(goods)
          }
          this.tableDataAdmin = arr
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
</style>