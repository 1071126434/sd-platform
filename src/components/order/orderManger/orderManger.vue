<template>
  <div class="wrap">
    <header>
      <el-tabs v-model="activeName2" @tab-click="handleClicks">
        <ul class="search getOrder">
          <li>
            派单时间&nbsp; &nbsp;
            <el-date-picker v-model="value6" type="datetimerange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期" format="yyyy-MM-dd" value-format='yyyy-MM-dd'>
            </el-date-picker>
          </li>
          <li>
            管理员&nbsp; &nbsp;
            <el-select v-model="value" placeholder="请选择" @change="adName">
              <el-option v-for="(item, index) in adminNameArr" :label="item.userName" :value="item.operateUserAccountId" :key="index"></el-option>
            </el-select>
          </li>
          <li>
            管理员微信号&nbsp; &nbsp;
            <el-select v-model="value1" placeholder="请选择">
              <el-option v-for="(item, index) in wechatArr" :label="item.wechatNum" :value="item.operateWechatId" :key="index"></el-option>
            </el-select>
          </li>
        </ul>
        <ul class="search_1 getOrder">
          <li>
            <span class="status">状态</span>&nbsp; &nbsp;
            <el-select v-model="value2" placeholder="请选择">
              <el-option v-for="(item,index) in options" :key="index" :label="item.label" :value="item.value">
              </el-option>
            </el-select>
          </li>
          <li>
            <el-button type="primary" @click="searchBtn">查询</el-button>
          </li>
        </ul>
        <el-tab-pane label="未联系" name="first">
          <div class="accountTab">
            <el-table :data="tableData" border style="width: 100%">
              <el-table-column fixed type="index" width="50" label="编号">
              </el-table-column>
              <el-table-column prop="date" label="任务包编号" width="120">
              </el-table-column>
              <el-table-column prop="name" label="任务包状态" width="120">
              </el-table-column>
              <el-table-column prop="province" label="垫付总金额" width="120">
              </el-table-column>
              <el-table-column prop="city" label="预计佣金" width="120">
              </el-table-column>
              <el-table-column prop="address" label="单数" width="120">
              </el-table-column>
              <el-table-column prop="zip" label="剩余单数" width="120">
              </el-table-column>
              <el-table-column prop="zip" label="买家姓名" width="120">
              </el-table-column>
              <el-table-column prop="zip" label="买家手机号" width="120">
              </el-table-column>
              <el-table-column prop="zip" label="买家微信备注" width="120">
              </el-table-column>
              <el-table-column prop="zip" label="平台联系人" width="120">
              </el-table-column>
              <el-table-column prop="zip" label="联系状态" width="120">
              </el-table-column>
              <el-table-column prop="zip" label="派包时间" width="120">
              </el-table-column>
              <el-table-column fixed="right" label="操作" width="100">
                <template slot-scope="scope">
                  <el-button @click="handleClick(scope.row)" type="text" size="small">我已联系</el-button>
                  <el-button @click="handleNoClickNo(scope.row)" type="text" size="small">取消</el-button>
                </template>
              </el-table-column>
            </el-table>
          </div>
        </el-tab-pane>
        <el-tab-pane label="已联系" name="second">
          <!-- 展示内容部分 -->
          <div class="accountTab">
            <el-table :data="tableDataBuy" border style="width: 100%">
              <el-table-column fixed type="index" width="50" label="编号">
              </el-table-column>
              <el-table-column prop="date" label="任务包编号" width="120">
              </el-table-column>
              <el-table-column prop="name" label="任务包状态" width="120">
              </el-table-column>
              <el-table-column prop="province" label="垫付总金额" width="120">
              </el-table-column>
              <el-table-column prop="city" label="预计佣金" width="120">
              </el-table-column>
              <el-table-column prop="address" label="单数" width="120">
              </el-table-column>
              <el-table-column prop="zip" label="剩余单数" width="120">
              </el-table-column>
              <el-table-column prop="zip" label="买家姓名" width="120">
              </el-table-column>
              <el-table-column prop="zip" label="买家手机号" width="120">
              </el-table-column>
              <el-table-column prop="zip" label="买家微信备注" width="120">
              </el-table-column>
              <el-table-column prop="zip" label="平台联系人" width="120">
              </el-table-column>
              <el-table-column prop="zip" label="联系状态" width="120">
              </el-table-column>
              <el-table-column prop="zip" label="派包时间" width="120">
              </el-table-column>
              <el-table-column fixed="right" label="操作" width="100">
                <template slot-scope="scope">
                  <el-button @click="handleClick(scope.row)" type="text" size="small">查看</el-button>
                  <el-button type="text" size="small">撤销</el-button>
                </template>
              </el-table-column>
            </el-table>
          </div>
          <noCont v-if="this.tableDataBuy.length===0"></noCont>
        </el-tab-pane>
        <!-- <noCont v-if="this.tableDataBuy.length===0"></noCont> -->
        <div class="pager" v-if="noContPage">
          <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage" :page-sizes="[5, 10, 15, 20]" :page-size='pageSize' layout="total, sizes, prev, pager, next, jumper" :total="totalCount">
          </el-pagination>
        </div>
      </el-tabs>
    </header>
    <!-- 点击撤销触发的弹框 -->
    <el-dialog title="撤销" :visible.sync="dialogFormVisible_2" :modal-append-to-body='false' width="36%" style="margin-top: 25vh">
      <el-radio-group v-model="radio2">
        <el-radio :label="3" style="line-height:40px">已联系做单，立马做</el-radio> <br>
        <el-radio :label="6" style="line-height:40px">已联系做单，晚点做</el-radio> <br>
        <el-radio :label="9" style="line-height:40px">已联系，未回信息</el-radio> <br>
      </el-radio-group>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible_2 = false">取 消</el-button>
        <el-button type="primary" @click="sure_2">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script type="text/ecmascript-6">
import noCont from '../../../base/noCont/noCont'
import { mapGetters } from 'vuex'
export default {
  name: 'sellerRecharge',
  components: {
    noCont
  },
  data () {
    return {
      adminNameArr: [],
      wechatArr: [],
      radio2: 3,
      value3: '',
      input6: '',
      value6: '',
      activeName2: 'first',
      value: '',
      value1: '',
      currentPage: 1,
      pageSize: 5,
      totalCount: 0,
      dialogFormVisible_2: false,
      tableData: [],
      options: [{
        value2: '0',
        label: '未领取'
      }, {
        value2: '1',
        label: '已领取'
      }, {
        value2: '2',
        label: '领取失败'
      }
      ],
      tableDataBuy: []
    }
  },
  computed: {
    noContPage: function () {
      if (this.activeName2 === 'first' && this.tableData.length !== 0) {
        return true
      } else if (this.activeName2 === 'second' && this.tableDataBuy.length !== 0) {
        return true
      } else {
        return false
      }
    },
    ...mapGetters([
      'userInfo'
    ])
  },
  created () {
    this.sercherOne(1, this.pageSize)
    this.adminName_1()
  },
  methods: {
    handleClicks () {
      if (this.activeName2 === 'first') {
        this.sercherOne(1, this.pageSize)
      } else if (this.activeName2 === 'second') {
        this.sellerRecord(1, this.pageSize)
      }
    },
    // 卖家充值申请的搜索
    searchBankNum () {
      this.sercherOne(1, this.pageSize)
    },
    // 卖家充值记录的搜索
    searchTime () {
      this.sellerRecord(1, this.pageSize)
    },
    handleSizeChange (val) {
      if (this.activeName2 === 'first') {
        this.sercherOne(1, val)
      } else if (this.activeName2 === 'second') {
        this.sellerRecord(1, val)
      }
    },
    handleCurrentChange (val) {
      if (this.activeName2 === 'first') {
        this.sercherOne(val, this.pageSize)
      } else if (this.activeName2 === 'second') {
        this.sellerRecord(val, this.pageSize)
      }
    },
    // 当点击撤销触发的事件
    handleNoClickNo (val) {
      this.dialogFormVisible_2 = true
    },
    sure_2 () {
      // 进行撤销的处理
    },
    // 未联系
    sercherOne (pageNo, pageSize) {
      this.$ajax.post('/api/platformPackageAssign/getPackageAssignInfoByCondition', {
        startTime: this.value6 ? this.value6[0] : '',
        endTime: this.value6 ? this.value6[1] : '',
        operateUserAccountId: '',
        operaterWechatId: this.value1,
        status: this.value2,
        contactStatus: '0',
        limit: this.pageSize,
        currPageNo: pageNo
      }).then((data) => {
        let res = data.data
        this.totalCount = res.data.totalCount
        if (res.code === '200') {
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
    // 已联系
    sellerRecord (pageNo, pageSize) {
      this.$ajax.post('/api/platformPackageAssign/getPackageAssignInfoByCondition', {
        statusList: ['1', '2'],
        pageNo: pageNo,
        pageSize: pageSize,
        startTime: this.value3 ? this.value3[0] : '',
        endTime: this.value3 ? this.value3[1] : '',
        sellerTelephoneOrName: this.input6
      }).then((data) => {
        let res = data.data
        this.totalCount = res.data.totalCount
        if (res.code === '200') {
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
    adName () {
      this.value1 = ' '
      this.wechatArr = []
      this.wechats()
    },
    // 获取管理员姓名接口
    adminName_1 () {
      this.$ajax.post('/api/operateAccount/getOperatersOfPlatform', {
      }).then((data) => {
        let res = data.data
        if (res.code === '200') {
          let arr = []
          for (let word of res.data) {
            let goods = {
              userName: word.userName || '暂无数据',
              operateUserAccountId: word.operateUserAccountId
            }
            arr.push(goods)
          }
          this.adminNameArr = arr
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
    // 获取平台端联系人微信列表
    wechats () {
      this.$ajax.post('/api/platform/wechat/getListByOperateUserId', {
        operateUserId: this.value
      }).then((data) => {
        let res = data.data
        if (res.code === '200') {
          let arr = []
          for (let word of res.data) {
            let goods = {
              wechatNickName: word.wechatNickName,
              wechatNum: word.wechatNum,
              operateWechatId: word.operateWechatId
            }
            arr.push(goods)
          }
          this.wechatArr = arr
        } else {
          this.$message({
            message: res.message,
            type: 'warning'
          })
        }
      }).catch((error) => {
        console.log(error)
        // this.$message.error('网络错误，刷新下试试')
      })
    }
  }
}
</script>
<style lang="stylus" rel="stylesheet/stylus" scoped>
.wrap
  padding 20px
  ::-webkit-scrollbar
    width 100%
    height 10px
  header
    background rgba(255, 255, 255, 1)
    padding 20px
    .search, .search_1
      display flex
      justify-content flex-start
      margin-top 20px
      li
        margin-right 20px
      .status
        margin-right 23px
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
    .accountTab
      margin-top 30px
</style>