<template>
  <div class="wrap">
    <div class="orderList">
      <div class="head">
        <el-tabs v-model="activeName">
          <el-tab-pane label="申诉订单管理" name='1'>
            <div class="list" v-for="(item,index) in tableData" :key="index">
              <div class="tables">
                <div class="tableItem">
                  <ul class="itemHead">
                    <li style="width:20%">
                      <span class="shopType jdIcon"></span>
                      <span>{{item.sellerShopName}}</span>
                    </li>
                    <li style="width:35%">
                      <span class="taskOrder">任务编号:
                        <i>{{item.sellerTaskId}}</i>
                      </span>
                    </li>
                    <li style="width:30%">
                      <span class="taskOrder">对应管理员:
                        <i>{{item.operaterUserName}}</i>
                        <i>{{item.platformWechatNum}}</i>
                      </span>
                    </li>
                    <li style="width:10%">
                      <el-checkbox v-model="item.isContact" @change="checkedClick(item)">已联系修改</el-checkbox>
                    </li>
                  </ul>
                  <ul class="itemCont">
                    <li style="width:5%;border:none;margin-top:17px">
                      <img alt="" :src='item.productPictureUrl' @click="lookImg(item.productPictureUrl || '')">
                    </li>
                    <li style="width:30%;margin-left:-80px">
                      <p>{{item.productName}}
                        <a :href="item.productUrl">商品链接</a>
                      </p>
                      <p>订单编号:
                        <i class="red">{{item.buyerTaskRecordId}}</i>
                      </p>
                      <p>任务类型:
                        <i class="red" v-if="item.sellerTaskType==='2'">图文好评</i>
                        <i class="red" v-else-if="item.sellerTaskType==='1'">文字好评</i>
                        <i class="red" v-else>默认好评</i>
                      </p>
                    </li>
                    <li style="width:60px;border:none;margin-left:40px">
                      <img class="taskImg" :src="JSON.parse(item.realOrderPicId)" alt="" @click="lookImg(JSON.parse(item.realOrderPicId) || '')">
                    </li>
                    <li style="width:30%;margin-left:-90px">
                      <p>
                        <span>姓名:
                          <i class="red">{{item.userName}}</i>&nbsp;&nbsp;&nbsp;&nbsp;
                        </span>
                        <span>订单金额:
                          <i class="red">{{item.realOrderPrice}}</i>
                        </span>
                      </p>
                      <p>京东订单编号:
                        <span class="red">{{item.realOrderId}}</span>
                      </p>
                      <p>京东用户名:
                        <span class="red">{{item.jdNickName}}</span>
                      </p>
                      <p>手机号:
                        <span class="red">{{item.telephone}}</span>
                      </p>
                      <p>微信号:
                        <span class="red">{{item.wechatNum}}</span>
                      </p>
                    </li>
                    <li class="center styles" style="width:30%">
                      <span class="onlineTime">驳回时间:
                        <span class="red">{{item.orderTime}}</span>
                      </span>
                      <p class="taskState">驳回原因:
                        <span>{{item.rejectReson}}</span>
                      </p>
                      <p class="taskState">备注:
                        <span>{{item.solution}}</span>
                      </p>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            <noCont v-if="tableData.length===0"></noCont>
          </el-tab-pane>
          <!-- 切换部分 -->
          <div class="pager" v-if="showPager">
            <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage" :page-sizes="[5, 10, 15, 20]" :page-size='pageSize' layout="total, sizes, prev, pager, next, jumper" :total="totalCount">
            </el-pagination>
          </div>
        </el-tabs>
        <div v-show="showLookImg ">
          <lookImg :imgUrl="lookImgUrl " @close="showLookImg=false "></lookImg>
        </div>
      </div>
    </div>
  </div>
</template>
<script type="text/ecmascript-6">
import NoCont from '../../../base/noCont/noCont'
import LookImg from '../../../base/lookImg/lookImg'
export default {
  name: 'orderRegectDetail',
  components: {
    LookImg,
    NoCont
  },
  data () {
    return {
      activeName: '1',
      currentPage: 1,
      checked: true,
      pageSize: 5,
      totalCount: 0,
      tableData: [],
      lookImgUrl: '',
      showLookImg: false
    }
  },
  computed: {
    showPager: function () {
      if (this.tableData.length !== 0) {
        return true
      } else {
        return false
      }
    }
  },
  created () {
    this.sercherOne(1, this.pageSize)
  },
  methods: {
    lookImg (url) {
      this.lookImgUrl = url
      this.showLookImg = true
    },
    reset () {
      this.value = ''
    },
    handleSizeChange (val) {
      this.sercherOne(1, val)
    },
    handleCurrentChange (val) {
      this.sercherOne(val, this.pageSize)
    },
    // s是否已联系修改
    checkedClick (val) {
      // console.log(val)
      this.$ajax.post('/api/order/changeIsContact', {
        buyerTaskRecordId: val.buyerTaskRecordId,
        isContact: val.isContact === true ? 1 : 0
      }).then((data) => {
        let res = data.data
        if (res.code === '200') {
          this.$message({
            type: 'success',
            message: '操作成功'
          })
          this.getTask()
        } else {
          this.$message({
            type: 'error',
            message: res.message
          })
        }
      }).catch((err) => {
        this.$message.error(err)
      })
    },
    sercherOne (pageNo, pageSize) {
      this.$ajax.post('/api/order/search/getOrderListByTaskStatus', {
        taskStatus: ['6', '7'],
        pageNo: pageNo,
        pageSize: pageSize
      }).then((data) => {
        let res = data.data
        this.totalCount = res.data.totalCount
        if (res.code === '200') {
          let arr = []
          for (let word of res.data.buyerTaskRecordInfos) {
            let goods = {
              productPictureUrl: word.productPictureUrl,
              sellerShopName: word.sellerShopName,
              sellerTaskId: word.sellerTaskId,
              buyerTaskRecordId: word.buyerTaskRecordId,
              // 对应管理员
              operaterUserName: word.operaterUserName,
              platformWechatNum: word.platformWechatNum,
              sellerTaskType: word.sellerTaskType,
              isContact: word.isContact === '1' ? true : 0,
              remark: word.memo,
              productName: word.productName,
              productUrl: word.productUrl,
              // 买家信息
              userName: word.userName,
              realOrderPrice: word.realOrderPrice,
              realOrderId: word.realOrderId,
              jdNickName: word.jdNickName,
              telephone: word.telephone,
              favorTime: word.favorTime,
              rejectReson: word.rejectReson || '暂无数据',
              solution: word.solution || '暂无数据',
              realOrderPicId: word.realOrderPicId,
              wechatNum: word.wechatNum,
              orderTime: word.orderTime
            }
            arr.push(goods)
          }
          this.tableData = arr
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
  min-width 1050px
  .orderList
    background rgba(255, 255, 255, 1)
    padding 20px
    // margin-top 20px
    .head, padding 20px, background #ffffff, .btns
      margin-top 20px
      display flex
      justify-content flex-start
      .select
        margin-left 25px
        margin-right 20px
        .el-input
          width 226px
      .searchBtn
        position absolute
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
          .shopType
            margin 7px 10px 8px 20px
            float left
            width 16px
            height 16px
          .person
            margin-left 66px
          .taskOrder
            margin-left 46px
        .itemCont
          display flex
          padding 20px
          li
            min-width 150px
            border-right 1px solid #E5E5E5
            &:last-child
              border none
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
            .taskState
              margin-left -5px
            .onlineTime
              font-size 14px
          .styles
            line-height 40px
          .taskImg
            height 107px
            margin-top 10px
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
    margin-top 47px
  .greenBg
    background #40B6FF
    color #ffffff
    border none
</style>