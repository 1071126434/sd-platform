<template>
  <div class="userInfo">
    <div class="nav">
    </div>
    <div class="info">
      <img :src="user.imgUrl" class="img">
      <span class="text">{{ user.userPhone }}</span>
    </div>
    <div class="logout" @click="logout">
      <span class="icon el-icon-upload2"></span>
      <span class="text">退出</span>
    </div>
  </div>
</template>
<script type="text/ecmascript-6">
import { mapGetters } from 'vuex'
export default {
  name: 'userInfo',
  data () {
    return {
      userPhone: ''
    }
  },
  computed: {
    user () {
      return {
        userPhone: this.userInfo.telephone,
        imgUrl: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1510127020787&di=7ea47f534e3e80cb465a5e45650c433d&imgtype=0&src=http%3A%2F%2Fimg21.mtime.cn%2Fpi%2F2011%2F01%2F26%2F143007.59370061.jpg'
      }
    },
    ...mapGetters([
      'userInfo'
    ])
  },
  methods: {
    logout () {
      this.$confirm('是否退出系统?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        // this.logoutApi()
      })
    }
  }
}
</script>
<style lang="stylus" rel="stylesheet/stylus" scoped>
@import '../../assets/stylus/variable'
.userInfo
  flex 0 0 $normal-height
  background $bg-small
  color $color-text-white
  text-align right
  font-size 0
  border-bottom 1px solid #dedede
  .reportButton
    display inline-block
    margin-right 100px
    button
      color #ffffff
  .nav
    display inline-block
  .info
    display inline-block
    height $normal-height
    line-height $normal-height
    cursor pointer
    .img
      width 30px
      height 30px
      vertical-align top
      margin 15px 0
      border-radius 50%
      margin-right 10px
    .text
      font-size $font-size-normal
  .logout
    display inline-block
    height $normal-height
    line-height $normal-height
    font-size $font-size-normal
    padding 0 20px
    cursor pointer
    margin-left 28px
    .text
      margin-left 12px
</style>
