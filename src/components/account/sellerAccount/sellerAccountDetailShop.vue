<template>
  <div>
    <div class="accountTab">
      <el-table :data="tableData" style="width: 100%">
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
        <el-table-column prop="wechat" align="center" label="微信号">
        </el-table-column>
        <el-table-column prop="qq" align="center" label="联系人QQ">
        </el-table-column>
        <el-table-column prop="shoptype" align="center" label="店铺所属分类">
        </el-table-column>
        <el-table-column prop="address" align="center" label="发货地">
          <template slot-scope="scope">
              <el-tooltip effect="dark" placement="top">
                <div slot="content">{{ scope.row.content }}</div>
                <p class="overHidden">{{ scope.row.name }}</p>
              </el-tooltip>
            </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="pager">
      <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage" :page-sizes="[100, 200, 300, 400]" :page-size="100" layout="total, sizes, prev, pager, next, jumper" :total="400">
      </el-pagination>
    </div>
  </div>
</template>
<script type="text/ecmascript-6">
export default {
  name: 'ss',
  data () {
    return {
      currentPage: 1,
      tableData: [{
        name: '牛逼店铺',
        chaining: 'www.baidu.com',
        phone: '19886655555',
        person: '黄军',
        accountStatus: '正常',
        state: '已认证',
        wechat: '1866699887',
        qq: '632311638',
        shoptype: '1111',
        address: '发货地'
      }, {
        name: '牛逼店铺',
        chaining: 'www.baidu.com',
        phone: '19886655555',
        person: '黄军',
        accountStatus: '正常',
        state: '已认证',
        wechat: '1866699887',
        qq: '632311638',
        shoptype: '1111',
        address: '发货地'
      }, {
        name: '牛逼店铺',
        chaining: 'www.baidu.com',
        phone: '19886655555',
        person: '黄军',
        accountStatus: '正常',
        state: '已认证',
        wechat: '1866699887',
        qq: '632311638',
        shoptype: '1111',
        address: '发货地'
      }]
    }
  },
  methods: {
    handleClick (row) {
      console.log(row)
    },
    handleSizeChange (val) {
      console.log(`每页 ${val} 条`)
    },
    handleCurrentChange (val) {
      console.log(`当前页: ${val}`)
    }
  }
}
</script>
<style lang="stylus" rel="stylesheet/stylus" scoped>
</style>