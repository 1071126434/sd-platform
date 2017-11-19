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
            <td>皇军皇九年-15700177632</td>
            <td>皇军皇九年-15700177632</td>
            <td>2017-09-07 19:23:21</td>
          </tr>
        </table>
      </div>
      <h6>投诉原因</h6>
      <div class="pCont">
        <p>这里发互粉 v率达 v 骄傲赌博 v 皮单肩包 v 了电视直播 v记者独家报道北京快乐的； kmb哦爱表皮的方式吧</p>
      </div>
      <div class="imgs">
        <a href="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1511264881&di=517c3dacb2e6b5c612f16bad69c9fc11&imgtype=jpg&er=1&src=http%3A%2F%2Fimgsrc.baidu.com%2Fimage%2Fc0%253Dshijue1%252C0%252C0%252C294%252C40%2Fsign%3Dce62ca28a5c3793169658e6a83addd30%2F0b55b319ebc4b745f53bbf38c5fc1e178a821574.jpg" target="_blank">
          <img src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1511264881&di=517c3dacb2e6b5c612f16bad69c9fc11&imgtype=jpg&er=1&src=http%3A%2F%2Fimgsrc.baidu.com%2Fimage%2Fc0%253Dshijue1%252C0%252C0%252C294%252C40%2Fsign%3Dce62ca28a5c3793169658e6a83addd30%2F0b55b319ebc4b745f53bbf38c5fc1e178a821574.jpg" alt="">
        </a>
      </div>
      <h6>投诉备注</h6>
      <div class="pCont">
        <p>这里发互粉 v率达 v 骄傲赌博 v 皮单肩包 v 了电视直播 v记者独家报道北京快乐的； kmb哦爱表皮的方式吧</p>
      </div>
      <h6>处理备注</h6>
      <ul class="inputs">
        <li>
          <span>展示给投诉者</span>
        </li>
        <li class="input">
          <el-input type="textarea" :rows="2" :autosize="{minRows: 2, maxRows: 6}" resize="both" placeholder="请输入内容">
          </el-input>
        </li>
        <li>
          <span>内部备注</span>
        </li>
        <li class="input">
          <el-input type="textarea" :rows="2" :autosize="{minRows: 2, maxRows: 6}" resize="both" placeholder="请输入内容">
          </el-input>
        </li>
      </ul>
      <div class="submit">
        <span class="btn" @click="toDo(1)">处理中</span>
        <span class="btn" @click="toDo(2)">已处理完成</span>
      </div>
    </div>
  </div>
</template>
<script type="text/ecmascript-6">
export default {
  name: 'sellerComplainDetail',
  data () {
    return {
      input: '',
      tableData: {}
    }
  },
  methods: {
    toDo (status) { // status : 1 处理中  2 处理完成
      // this.$ajax.post('/api/manage/complain/seller/updateHandleStatus', {
      //   'handleStatus': status,
      //   'handleCommentIn': this.tableData.handleCommentIn,
      //   'handleCommentOut': this.tableData.handleCommentOut,
      //   'buyerTaskRecordId': this.$route.query.bId
      // }).then((data) => {
      //   if (data.data.code === '200') {
      //     this.$message({
      //       message: '处理成功！',
      //       type: 'success'
      //     })
      //     this.$router.push({ name: 'complainSeller' })
      //   } else {
      //     this.$message({
      //       message: data.data.message,
      //       type: 'warning'
      //     })
      //   }
      // }).catch(() => {
      //   this.$message.error('处理失败，请重试！')
      // })
    }
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
</style>
