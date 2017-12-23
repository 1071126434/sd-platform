<template>
  <div class="taskList">
    <div class="head">
      <el-tabs v-model="activeName" @tab-click="handleClick">
        <el-tab-pane label="全部任务" name="all"></el-tab-pane>
        <el-tab-pane label="待审核" name="toCheck"></el-tab-pane>
        <el-tab-pane label="待上线" name="toLine"></el-tab-pane>
        <el-tab-pane label="已上线" name="lined"></el-tab-pane>
        <el-tab-pane label="已完成任务" name="done"></el-tab-pane>
        <el-tab-pane label="未支付任务" name="toPay"></el-tab-pane>
      </el-tabs>
      <div class="btns">
        <div class="select">
          <span>任务类型:</span>
          <el-select v-model="taskType" placeholder="请选择">
            <el-option label="垫付" value="0">
            </el-option>
            <el-option label="浏览" value="1">
            </el-option>
          </el-select>
        </div>
        <div class="select">
          <span>平台:</span>
          <el-select v-model="shopType" placeholder="请选择">
            <el-option label="京东" value="0">
            </el-option>
            <el-option label="淘宝" value="1">
            </el-option>
            <el-option label="天猫" value="2">
            </el-option>
          </el-select>
        </div>
        <div class="select">
          <span>关键词:</span>
          <el-input v-model="keyword" placeholder="任务编号/商品名称关键词"></el-input>
        </div>
        <div class="searchBtn">
          <el-button type="primary" @click="search">查询</el-button>
        </div>
      </div>
    </div>
    <div class="list">
      <div class="tableHead">
        <div style="width:35%">商品信息</div>
        <div style="width:35%">数量</div>
        <div style="width:15%">状态</div>
        <div style="width:15%">操作</div>
      </div>
      <div class="tables">
        <div class="tableItem" v-for="(item, index) in orderListArr" :key="index">
          <ul class="itemHead">
            <li>
              <span class="shopType" :class="{'jdIcon': item.shopType==0, 'taobaoIcon': item.shopType==1, 'tianmaoIcon': item.shopType==2}"></span>
              <span class="shopName">{{ item.shopName }}</span>
              <span class="taskOrder">任务编号: {{ item.sellerTaskId }}
                <span class="link" @click="lookDetail(item.sellerTaskId)">[查看任务详情]</span>
              </span>
            </li>
            <li>
              <span class="taskType">任务类型:
                <span class="red">{{ item.taskTypeDesc }}</span>
              </span>
            </li>
            <li>
              <span class="onlineTime">上线时间:
                <span class="red">{{ item.throwTime }}</span>
              </span>
            </li>
          </ul>
          <ul class="itemCont">
            <li style="width:20%">
              <img alt="" :src="item.productPicUrl">
              <span class="goodsName">{{ item.productName }}</span>
            </li>
            <li style="width:16%">
              <p>付款价格:
                <span class="red">{{ item.payment }}</span>
              </p>
              <p>待确认订单:
                <span class="red">{{ item.toConfirmOrderNum }}</span>
              </p>
            </li>
            <li style="width:16%">
              <p>任务数量:
                <span class="red">{{ item.throwNum }}</span>
              </p>
              <p>待确认评价截图:
                <span class="red">{{ item.toConfirmFavorNum }}</span>
              </p>
            </li>
            <li style="width:16%">
              <p class="lh60">已完成订单:
                <span class="red">{{ item.doneNum }}</span>
              </p>
            </li>
            <li class="center" style="width:16%">
              <span v-if="item.taskStatus==1 || item.taskStatus==2" class="tipError lh60">待提交</span>
              <span v-if="item.taskStatus==3" class="tipError lh60">待支付</span>
              <span v-if="item.taskStatus==4" class="tipWait lh60">待审核</span>
              <span v-if="item.taskStatus==5" class="tipWait lh60">待上线</span>
              <span v-if="item.taskStatus==6" class="tipError lh60">未通过</span>
              <span v-if="item.taskStatus==7" class="tipError lh60">已撤销</span>
              <span v-if="item.taskStatus==8" class="tipDoing lh60">进行中</span>
              <span v-if="item.taskStatus==9" class="tipError lh60">已终止</span>
              <span v-if="item.taskStatus==20" class="tipSuccess lh60">已完成</span>
              <span v-if="item.taskStatus==21" class="tipSuccess lh60">已结束</span>
            </li>
            <li style="width:16%">
              <div>
                <p class="center" v-if="item.taskStatus==4">
                  <span class="smButton greenBg" @click="lookDetail(item.sellerTaskId)">去审核</span>
                </p>
                <p class="center" v-if="item.taskStatus!=7 || item.taskStatus!=9 || item.taskStatus!=20 || item.taskStatus!=21" :class="{'lh60': !(item.taskStatus==4)}">
                  <span class="smButton" @click="callBack(item.sellerTaskId)">撤&nbsp;&nbsp;销</span>
                </p>
              </div>
            </li>
          </ul>
        </div>
        <noCont v-if="this.orderListArr.length===0"></noCont>
        <div class="pager" v-if="this.orderListArr.length!==0">
          <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage" :page-sizes="pageSizeArray" :page-size="pageSize" layout="total, sizes, prev, pager, next, jumper" :total="pageTotal">
          </el-pagination>
        </div>
      </div>
    </div>
  </div>
</template>
<script type="text/ecmascript-6">
import { pageCommon } from '../../assets/js/mixin'
import noCont from '../../base/noCont/noCont'
export default {
  name: 'task',
  mixins: [pageCommon],
  components: {
    noCont
  },
  data () {
    return {
      currentPage: 1,
      activeName: 'all',
      taskStatus: null,
      taskType: null,
      shopType: null,
      keyword: null,
      orderListArr: [],
      apiUrl: '/api/platform/task/getTaskByCondition'
    }
  },
  computed: {
    params () {
      return {
        taskStatus: this.activeName,
        taskType: this.taskType,
        shopType: this.shopType,
        keyword: this.keyword,
        keywordType: this.keyword ? this.filter(this.keyword) : '',
        pageNo: this.pageNo,
        pageSize: this.pageSize
      }
    }
  },
  methods: {
    setList (data) {
      this.orderListArr = data
    },
    search () {
      this.getTask()
    },
    callBack (sellerTaskId) {
      this.$confirm('确认将该任务撤销?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$ajax.post('/api/platform/task/cancelTask', {
          sellerTaskId: sellerTaskId
        }).then((data) => {
          if (data.data.code === '200') {
            this.$message({
              type: 'success',
              message: '撤销成功!'
            })
            this.getTask()
          } else {
            this.$message({
              type: 'warning',
              message: data.data.message
            })
          }
        }).catch((err) => {
          console.log(err)
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消'
        })
      })
    },
    // 查看任务详情
    lookDetail (sellerTaskId) {
      this.$router.push({ name: 'taskDetail', query: { sellerTaskId: sellerTaskId } })
    },
    handleClick (tab, event) {
      this.getTask()
    },
    filter (val) {
      let res = ''
      let reg = /[^\u4e00-\u9fa5]/
      if (reg.test(val)) {
        res = 'task'
      } else {
        res = 'keyword'
      }
      return res
    }
  }
}
</script>
<style lang="stylus" rel="stylesheet/stylus" scoped>
.taskList
  min-width 900px
  padding 20px
  .head
    padding 20px
    background #ffffff
    .btns
      margin-top 20px
      display flex
      position relative
      justify-content flex-start
      .select
        margin-left 25px
        margin-right 20px
        .el-input
          width 226px
      .searchBtn
        // position absolute
        margin-left 40px
        right 40px
  .list
    margin-top 12px
    background #ffffff
    .tableHead
      display flex
      font-size 14px
      line-height 36px
      color #333333
      background #f0f0f0
      div
        text-align center
    .tables
      padding 12px 20px
      .tableItem
        border 1px solid #40B6FF
        margin-bottom 12px
        .itemHead
          display flex
          font-size 12px
          line-height 32px
          background rgba(151, 204, 247, 0.2)
          color #535353
          li
            margin-right 50px
          .shopType
            margin 7px 10px 8px 20px
            float left
            width 16px
            height 16px
          .shopName
            display inline-block
            width 120px
            overflow
            text-overflow ellipsis
            white-space nowrap
          .taskOrder
            margin-left 48px
        .itemCont
          display flex
          padding 20px
          li
            // min-width 150px
            border-right 1px solid #E5E5E5
            &:last-child
              border none
          .goodsName
            display inline-block
            max-width 200px
            overflow hidden
            text-overflow ellipsis
            white-space nowrap
          img
            float left
            width 60px
            height 60px
          .goodsName
            line-height 60px
            margin-left 14px
            font-size 14px
            color #666666
          p
            font-size 14px
            color #535353
            line-height 30px
            margin-left 20px
          .lh60
            line-height 60px
          .center
            text-align center
  .red
    color #FC1733
  .link
    color #0A5CE0
    cursor pointer
  .smButton
    display inline-block
    width 74px
    cursor pointer
    text-align center
    font-size 14px
    color #333333
    line-height 30px
    border-radius 4px
    line-height 24px
    border 1px solid #cccccc
    &:hover
      opacity 0.8
  .greenBg
    background #40B6FF
    color #ffffff
    border none
</style>