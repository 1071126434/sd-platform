<template>
  <div>
    <div class="accountTab">
      <el-table :data="shopArr" style="width: 100%">
        <el-table-column prop="name" align="center" label="店铺信息">
        </el-table-column>
        <el-table-column prop="chaining" align="center" label="店铺链接">
        </el-table-column>
        <el-table-column prop="phone" align="center" label="手机号">
        </el-table-column>
        <el-table-column prop="person" align="center" label="联系人">
        </el-table-column>
        <el-table-column prop="state" align="center" label="认证状态">
        </el-table-column>
        <el-table-column prop="qq" align="center" label="联系人QQ">
        </el-table-column>
        <el-table-column prop="shoptype" align="center" label="店铺所属分类">
        </el-table-column>
        <!-- <el-table-column prop="address" align="center" label="发货地">
          <template slot-scope="scope">
              <el-tooltip effect="dark" placement="top">
                <div slot="content">{{ scope.row.content }}</div>
                <p class="overHidden">{{ scope.row.name }}</p>
              </el-tooltip>
            </template>
        </el-table-column> -->
      </el-table>
    </div>
    <div class="pager">
      <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage" :page-sizes="[5, 10, 15, 20]" :page-size="pageSize" layout="total, sizes, prev, pager, next, jumper" :total="totalCount">
      </el-pagination>
    </div>
  </div>
</template>
<script type="text/ecmascript-6">
import { mapGetters } from 'vuex'
export default {
  name: 'ss',
  data () {
    return {
      currentPage: 1,
      shopArr: [],
      pageSize: 5,
      totalCount: 0,
      pageNo: 1
    }
  },
  computed: {
    ...mapGetters([
      'sellerInfo'
    ])
  },
  created () {
    this.shopList(1, this.pageSize)
  },
  methods: {
    handleClick (row) {
      // console.log(row)
    },
    handleSizeChange (val) {
      // console.log(`每页 ${val} 条`)
      this.shopList(1, val)
    },
    handleCurrentChange (val) {
      // console.log(`当前页: ${val}`)
      this.shopList(val, this.pageSize)
    },
    shopList (pageNo, pageSize) {
      this.$ajax.post('/api/seller/shop/getShopListBySellerUserIdByOperate', {
        sellerUserId: this.sellerInfo.sellerUserid,
        pageNo: pageNo,
        pageSize: pageSize
      }).then((data) => {
        console.log(data)
        let res = data.data
        this.totalCount = res.data.total
        if (res.code === '200') {
          let arr = []
          for (let word of res.data.datas) {
            let goods = {
              name: word.shopName || '--',
              chaining: word.shopHomePageUrl,
              phone: word.contactTelephone,
              person: word.contactName,
              state: word.status === '1' ? '已认证' : '未认证',
              qq: word.contactQQ,
              shoptype: word.classDetail
            }
            arr.push(goods)
          }
          this.shopArr = arr
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