<template>
  <div class="error">
    <div class="imgBox">
      <img :src="errorImg" alt="" class="img">
    </div>
    <div class="btns">
      <el-button @click="toPreRouter">返回上一页</el-button>
      <el-button type="success" style="margin-left:40px" @click="toRouter">返回首页</el-button>
    </div>
  </div>
</template>
<script type="text/ecmascript-6">
import Error from '../../assets/images/error.svg'
export default {
  name: 'error',
  data () {
    return {
      errorImg: Error
    }
  },
  mounted () {
    document.title = this.$route.meta.title
  },
  methods: {
    toPreRouter () {
      history.go(-1)
    },
    toRouter () {
      this.$router.push({ path: '/' })
    }
  }
}
</script>
<style lang="stylus" rel="stylesheet/stylus" scoped>
.error
  position fixed
  width 100%
  height 100%
  top 0
  right 0
  left 0
  right 0
  background #fff
  display flex
  flex-direction column
  align-content center
  justify-content center
  .imgBox
    flex 1
    text-align center
    .img
      width 800px
  .btns
    flex 1
    text-align center
</style>