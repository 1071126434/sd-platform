<template>
  <div class="wrap">
    <div class="orderList">
      <div class="head">
        <el-tabs v-model="activeName" @tab-click="handleClick">
          <!-- 切换部分 -->
          <el-tab-pane label="评价驳回" name="2">
            <div class="list" v-for="(item,index) in tableData" :key="index">
              <div class="tables">
                <div class="tableItem">
                  <ul class="itemHead">
                    <li style="width:10%">
                      <span style="margin-left:20px">{{item.productName}}</span>
                    </li>
                    <li style="width:30%">
                      <span class="taskOrder">任务编号:
                        <i>{{item.sellerTaskId}}</i>
                      </span>
                    </li>
                    <li style="width:20%">
                      <span class="taskOrder">任务类型:
                        <i class="red" v-if="item.sellerTaskType==='2'">图文好评</i>
                        <i class="red" v-else-if="item.sellerTaskType==='1'">文字好评</i>
                        <i class="red" v-else>默认好评</i>
                      </span>
                    </li>
                    <li style="width:25%">
                      <span class="onlineTime">对应管理员:
                        <span>{{item.operaterUserName}}</span>
                        <span>{{item.platformWechatNum}}</span>
                      </span>
                    </li>
                    <li style="width:25%">
                      <span class="onlineTime">提交时间:
                        <span class="red">{{item.gmtCreate}}</span>
                      </span>
                    </li>
                  </ul>
                  <ul class="itemCont">
                    <li style="width:5%;border:none;margin-top:17px">
                      <img alt="" :src="item.productPictureUrl">
                    </li>
                    <li style="width:25%;margin-left:-80px;padding-right:40px">
                      <p>姓名:
                        <span>{{item.userName}}</span>
                      </p>
                      <p>京东用户名:
                        <i class="red">{{item.jdNickName}}</i>
                      </p>
                      <p>手机号:
                        <i class="red">{{item.telephone}}</i>
                      </p>
                      <p>京东订单编号:
                        <i class="red">{{item.realOrderId}}</i>
                      </p>
                    </li>
                    <li style="width:40%:padding-right:40px" class="borderRest">
                      <p v-if="item.sellerTaskType==='1'">
                        <span>文字好评好评</span>&nbsp;&nbsp; |&nbsp;&nbsp;
                        <i>东西很不错,下次继续光顾分发万福金安开发垃圾</i>
                      </p>
                      <p v-if="item.sellerTaskType==='0'">
                        <i>五星好评</i>
                      </p>
                      <div v-if="item.sellerTaskType==='2'">
                        <p>
                          <span>图文好评</span>&nbsp;&nbsp; |&nbsp;&nbsp;
                          <i>东西很不错,下次继续光顾分发万福金安开发垃圾</i>
                        </p>
                        <p>
                          <img style=" margin-right:10px " alt=" " src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1511264881&di=517c3dacb2e6b5c612f16bad69c9fc11&imgtype=jpg&er=1&src=http%3A%2F%2Fimgsrc.baidu.com%2Fimage%2Fc0%253Dshijue1%252C0%252C0%252C294%252C40%2Fsign%3Dce62ca28a5c3793169658e6a83addd30%2F0b55b319ebc4b745f53bbf38c5fc1e178a821574.jpg ">
                          <img style="margin-right:10px " alt=" " src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1511264881&di=517c3dacb2e6b5c612f16bad69c9fc11&imgtype=jpg&er=1&src=http%3A%2F%2Fimgsrc.baidu.com%2Fimage%2Fc0%253Dshijue1%252C0%252C0%252C294%252C40%2Fsign%3Dce62ca28a5c3793169658e6a83addd30%2F0b55b319ebc4b745f53bbf38c5fc1e178a821574.jpg ">
                          <img alt=" " src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1511264881&di=517c3dacb2e6b5c612f16bad69c9fc11&imgtype=jpg&er=1&src=http%3A%2F%2Fimgsrc.baidu.com%2Fimage%2Fc0%253Dshijue1%252C0%252C0%252C294%252C40%2Fsign%3Dce62ca28a5c3793169658e6a83addd30%2F0b55b319ebc4b745f53bbf38c5fc1e178a821574.jpg ">
                        </p>
                      </div>
                    </li>
                    <li style="width:60px;border-right:1px solid #e5e5e5;margin-left:60px ">
                      <img class="taskImg " src="https://ss0.baidu.com/6ONWsjip0QIZ8tyhnq/it/u=499534944,3745393208&fm=173&s=F0B58B7467D353D0480EFDD6030070BA&w=640&h=448&img.JPEG " alt=" ">
                      <span>评价截图</span>
                    </li>
                    <li class="center styles " style="width:20% ">
                      <p class="taskState ">驳回原因:
                        <span>{{item.rejectReson}}</span>
                      </p>
                      <p class="taskState ">备注:
                        <span>{{item.solution}}</span>
                      </p>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </el-tab-pane>
          <div class="pager ">
            <el-pagination @size-change="handleSizeChange " @current-change="handleCurrentChange " :current-page="currentPage " :page-sizes="[5, 10, 15, 20] " :page-size='pageSize' layout="total, sizes, prev, pager, next, jumper " :total="totalCount ">
            </el-pagination>
          </div>
        </el-tabs>
      </div>
    </div>
  </div>
</template>
<script type="text/ecmascript-6">
export default {
  name: 'orderRegectDetail',
  data () {
    return {
      activeName: '2',
      currentPage: 1,
      checked: true,
      pageSize: 50,
      totalCount: 0,
      tableData: []
    }
  },
  created () {
    this.sercherOne(1, this.pageSize)
  },
  methods: {
    reset () {
      this.value = ''
    },
    handleSizeChange (val) {
      this.sercherOne(1, val)
    },
    handleCurrentChange (val) {
      this.sercherOne(val, this.pageSize)
    },
    handleClick (tab, event) {
      this.sercherOne(1, this.pageSize)
    },
    sercherOne (pageNo, pageSize) {
      this.$ajax.post('/api/order/search/getOrderListByTaskStatus', {
        taskStatus: ['12'],
        pageNo: pageNo,
        pageSize: pageSize
      }).then((data) => {
        console.log(data)
        let res = data.data
        this.totalCount = res.data.totalCount
        if (res.code === '200') {
          let arr = []
          for (let word of res.data.buyerTaskRecordInfos) {
            let goods = {
              productName: word.productName,
              productPictureUrl: word.productPictureUrl,
              sellerShopName: word.sellerShopName,
              sellerTaskId: word.sellerTaskId,
              buyerTaskRecordId: word.buyerTaskRecordId,
              // 对应管理员
              operaterUserName: word.operaterUserName,
              platformWechatNum: word.platformWechatNum,
              sellerTaskType: word.sellerTaskType,
              isContact: word.isContact === '0' ? this.checked = false : this.checked = true,
              productUrl: word.productUrl,
              // 买家信息
              userName: word.userName,
              realOrderPrice: word.realOrderPrice,
              realOrderId: word.realOrderId,
              jdNickName: word.jdNickName,
              telephone: word.telephone,
              favorTime: word.favorTime,
              gmtCreate: word.gmtCreate,
              rejectReson: word.rejectReson || '暂无数据',
              solution: word.solution || '暂无数据',
              realOrderPicId: word.realOrderPicId,
              wechatNum: word.wechatNum,
              evaluatePicId: word.evaluatePicId
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
  .orderList
    background rgba(255, 255, 255, 1)
    padding 20px
    margin-top 20px
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
            &:last-child
              border none
          .borderRest
            border-left 1px solid #e5e5e5
            border-right 1px solid #e5e5e5
            padding-right 10px
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