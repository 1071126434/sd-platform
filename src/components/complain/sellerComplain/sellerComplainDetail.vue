<template>
  <div class="sellerComplainDetail">
    <div class="title">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{ name: 'sellerComplain' }">投诉处理</el-breadcrumb-item>
        <el-breadcrumb-item>处理详情</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="cont">
      <div class="tab1">
        <table style="width: 100%">
          <tr>
            <th>投诉方</th>
            <th>被投诉方</th>
            <th>投诉时间</th>
          </tr>
          <tr>
            <td>{{ complainDetailObj.complainInfo }}</td>
            <td>{{ complainDetailObj.chuaqinInfo }}</td>
            <td>{{ complainDetailObj.applyTime }}</td>
          </tr>
        </table>
      </div>
      <h6>投诉原因</h6>
      <div class="pCont">
        <p>{{ complainDetailObj.complainReason }}</p>
      </div>
      <div class="imgs" v-if="this.$route.query.id===2">
        <!-- <a :href="complainDetailObj.picUrls" target="_blank"> -->
        <img :src="complainDetailObj.picUrls" @click="lookImg" alt="投诉截图">
        <!-- </a> -->
      </div>
      <div class="imgs" v-if="this.$route.query.id===1">
        <span v-for="(itemObj,index) in pics" :key="index" class="allPic">
          <img :src="itemObj" alt="投诉截图">
        </span>
      </div>
      <h6>投诉备注</h6>
      <div class="pCont">
        <p>{{ complainDetailObj.complainComment||'--' }}</p>
      </div>
      <h6>处理备注</h6>
      <ul class="inputs">
        <li>
          <span>展示给投诉者</span>
        </li>
        <li class="input">
          <el-input type="textarea" v-model="showOut" :rows="2" :autosize="{minRows: 2, maxRows: 6}" resize="both" placeholder="请输入内容">
          </el-input>
        </li>
        <li>
          <span>内部备注</span>
        </li>
        <li class="input">
          <el-input type="textarea" v-model="showIn" :rows="2" :autosize="{minRows: 2, maxRows: 6}" resize="both" placeholder="请输入内容">
          </el-input>
        </li>
      </ul>
      <div class="submit">
        <span class="btn" @click="toDo(1)">处理中</span>
        <span class="btn" @click="toDo(2)">已处理完成</span>
      </div>
      <div class="showImgBox" v-show="isShowImg" @click="isShowImg=false">
        <div class="imgBox">
          <img :src="showImg" alt="pic">
        </div>
      </div>
    </div>
  </div>
</template>
<script type="text/ecmascript-6">
import { mapGetters } from 'vuex'
export default {
  name: 'sellerComplainDetail',
  data () {
    return {
      input: '',
      showOut: '',
      showIn: '',
      showImg: '',
      isShowImg: false,
      complainDetailObj: {},
      tableData: {},
      pics: ''
    }
  },
  computed: {
    ...mapGetters([
      'userInfo'
    ])
  },
  methods: {
    lookImg () {
      this.showImg = this.complainDetailObj.picUrls
      this.isShowImg = true
    },
    toDo (status) {
      this.$ajax.post('/api/platform/complain/dealComplain', {
        complainMessageId: this.$route.query.messageComplainId,
        dealResultIn: this.showIn,
        dealStatus: status,
        dealComment: this.showOut,
        operateUserId: this.userInfo.operateUserAccountId
      }).then((data) => {
        if (data.data.code === '200') {
          this.$message({
            message: '处理成功！',
            type: 'success'
          })
          this.$router.push({ name: 'sellerComplain' })
        } else {
          this.$message({
            message: data.data.message,
            type: 'warning'
          })
        }
      }).catch(() => {
        this.$message.error('处理失败，请重试！')
      })
    },
    getDetail () {
      this.$ajax.post('/api/platform/complain/getComplainDetail', {
        messageComplainId: this.$route.query.messageComplainId
      }).then((data) => {
        if (data.data.code === '200') {
          let res = data.data.data
          this.complainDetailObj = res
          this.showOut = res.dealComment
          this.showIn = res.dealResultIn
          this.pics = JSON.parse(this.complainDetailObj.picUrls)
        } else {
          this.$message({
            type: 'warning',
            message: data.data.message
          })
        }
      }).catch((err) => {
        console.log(err)
      })
    }
  },
  mounted () {
    this.getDetail()
  }
}
</script>
<style lang="stylus" rel="stylesheet/stylus" scoped>
.sellerComplainDetail
  margin-top 12px
  margin-left 20px
  margin-right 20px
  margin-bottom 40px
  .title
    font-size 12px
    margin-bottom 14px
  .cont
    padding 20px
    background #fff
    .tab1
      text-align center
      table
        font-size 14px
        th
          width 25%
          border 1px solid #cccccc
          background #eeeeee
          padding-top 12px
          padding-bottom 12px
          font-weight 500
          color #666666
        td
          border 1px solid #cccccc
          padding-top 12px
          padding-bottom 12px
    h6
      font-size 16px
      color #333333
      margin-top 48px
      margin-bottom 24px
      font-weight bold
    .pCont
      display inline-block
      margin-left 20px
      margin-right 20px
      padding 20px
      background #eeeeee
      p
        line-height 24px
        font-size 14px
        color #666666
    .imgs
      margin-top 12px
      margin-left 20px
      margin-right 20px
      img
        width 80px
        height 80px
        margin-right 24px
    .inputs
      margin-left 20px
      margin-right 20px
      span
        font-size 14px
        color #333333
      .input
        width 700px
        margin-top 8px
        margin-bottom 16px
    .submit
      margin-left 20px
      margin-right 20px
      display flex
      justify-content center
      margin-top 60px
      margin-bottom 80px
      .btn
        margin-left 150px
        margin-right 150px
        display inline-block
        width 90px
        height 36px
        line-height 36px
        color #ffffff
        text-align center
        background #40B6FF
        border-radius 4px
        cursor pointer
  .showImgBox
    position fixed
    width 100%
    height 100%
    top 0
    left 0
    background rgba(0, 0, 0, 0.6)
    .imgBox
      position absolute
      max-width 800px
      max-height 800px
      top 0
      right 0
      left 0
      bottom 0
      margin auto
      img
        position absolute
        top 0
        right 0
        left 0
        bottom 0
        margin auto
        max-width 800px
</style>
