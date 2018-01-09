<template>
  <div class="wrap">
    <div class="orderList">
      <div class="head">
        <el-tabs v-model="activeName">
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
                        <i class="red" v-else-if="item.sellerTaskType==='0'">默认好评</i>
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
                    <li style="width:30%:padding-right:40px" class="borderRest">
                      <p v-if="item.sellerTaskType==='1'">
                        <span>文字好评好评</span>&nbsp;&nbsp; |&nbsp;&nbsp;
                        <i>{{item.sellerFavor}}</i>
                      </p>
                      <p v-if="item.sellerTaskType==='0'">
                        <i>五星好评</i>
                      </p>
                      <div v-if="item.sellerTaskType==='2'" class="midd">
                        <p>
                          <span>图文好评</span>&nbsp;&nbsp; |&nbsp;&nbsp;
                          <i>{{item.sellerFavor}}</i>
                        </p>
                        <p v-for="(itemObj,index) in JSON.parse(item.sellerPicUrls)" :key="index" class="allPic" @click="lookImg(itemObj)">
                          <img style=" margin-right:10px " alt=" " :src="itemObj">
                          <!-- <img src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1513512835319&di=b1c02f7d62cb4788e16ae8fe4ef8f4fb&imgtype=0&src=http%3A%2F%2Fpic.qiantucdn.com%2F58pic%2F14%2F31%2F78%2F00H58PIC3iE_1024.png" alt=""> -->
                        </p>
                      </div>
                    </li>
                    <li style="width:10%;border-right:1px solid #e5e5e5;margin-left:60px ">
                      <img class="taskImg " :src="JSON.parse(item.evaluatePicId)" alt=" " @click="lookImg(JSON.parse(item.evaluatePicId) || '')">
                      <span class=" evaluatePic ">评价截图</span>
                    </li>
                    <li class="center styles " style="width:25% ">
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
            <noCont v-if="tableData.length===0"></noCont>
          </el-tab-pane>
          <div class="pager " v-if="showPager">
            <el-pagination @size-change="handleSizeChange " @current-change="handleCurrentChange " :current-page="currentPage " :page-sizes="[5, 10, 15, 20] " :page-size='pageSize' layout="total, sizes, prev, pager, next, jumper " :total="totalCount ">
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
import LookImg from '../../../base/lookImg/lookImg'
import NoCont from '../../../base/noCont/noCont'
export default {
  name: 'orderRegectDetail',
  components: {
    LookImg,
    NoCont
  },
  data () {
    return {
      activeName: '2',
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
    sercherOne (pageNo, pageSize) {
      this.$ajax.post('/api/order/search/getOrderListByTaskStatus', {
        taskStatus: ['12'],
        pageNo: pageNo,
        pageSize: pageSize
      }).then((data) => {
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
              sellerTaskType: word.buyerFavorType,
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
              solution: word.memo || '暂无数据',
              realOrderPicId: word.realOrderPicId,
              wechatNum: word.wechatNum,
              evaluatePicId: word.evaluatePicId,
              sellerPicUrls: word.sellerPicUrls,
              sellerFavor: word.sellerFavor
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
  min-width 1100px
  .orderList
    background rgba(255, 255, 255, 1)
    padding 20px
    // margin-top 20px
    .head
      // padding 20px
      background #ffffff
      .btns
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
            padding-right 5%
            padding-left 5%
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
          .evaluatePic
            margin-top 10px
            display inline-block
            margin-left 5px
        .midd
          width 200px
          .allPic
            display inline-block
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