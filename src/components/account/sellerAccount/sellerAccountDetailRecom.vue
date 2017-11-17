<template>
  <div class="borderCard">
    <el-tabs type="border-card">
      <el-tab-pane label="员工账号">
        <div class="accountTab">
          <el-table :data="tableDataSell" style="width: 100%">
            <el-table-column prop="name" align="center" label="姓名">
            </el-table-column>
            <el-table-column prop="number" align="center" label="账号名">
            </el-table-column>
            <el-table-column prop="numberType" align="center" label="账号类型">
            </el-table-column>
            <el-table-column prop="admin" align="center" label="管理员">
            </el-table-column>
            <el-table-column align="center" label="帐号状态">
              <template slot-scope="scope">
                <span class="tipSmall" :class="scope.row.JDStatus==='正常' ? 'tipSuccess' : scope.row.JDStatus==='冻结' ? 'tipWait' : 'tipError'">{{scope.row.JDStatus}}</span>
              </template>
            </el-table-column>
            <el-table-column prop="time" align="center" label="注册时间">
            </el-table-column>
          </el-table>
        </div>
      </el-tab-pane>
      <el-tab-pane label="买手账号">
        <div class="accountTab">
          <el-table :data="tableDataBuy" style="width: 100%">
            <el-table-column prop="name" align="center" label="姓名">
            </el-table-column>
            <el-table-column prop="number" align="center" label="账号名">
            </el-table-column>
            <el-table-column prop="numberType" align="center" label="账号类型">
            </el-table-column>
            <el-table-column prop="admin" align="center" label="管理员">
            </el-table-column>
            <el-table-column align="center" label="帐号状态">
              <template slot-scope="scope">
                <span class="tipSmall" :class="scope.row.JDStatus==='正常' ? 'tipSuccess' : scope.row.JDStatus==='冻结' ? 'tipWait' : 'tipError'">{{scope.row.JDStatus}}</span>
              </template>
            </el-table-column>
            <el-table-column prop="time" align="center" label="注册时间">
            </el-table-column>
          </el-table>
        </div>
      </el-tab-pane>
      <el-tab-pane label="管理员账号">
        <div class="accountTab">
          <el-table :data="tableDataAdmin" style="width: 100%">
            <el-table-column prop="name" align="center" label="姓名">
            </el-table-column>
            <el-table-column prop="number" align="center" label="账号名">
            </el-table-column>
            <el-table-column prop="numberType" align="center" label="账号类型">
            </el-table-column>
            <el-table-column align="center" label="帐号状态">
              <template slot-scope="scope">
                <span class="tipSmall" :class="scope.row.JDStatus==='正常' ? 'tipSuccess' : scope.row.JDStatus==='冻结' ? 'tipWait' : 'tipError'">{{scope.row.JDStatus}}</span>
              </template>
            </el-table-column>
            <el-table-column prop="time" align="center" label="注册时间">
            </el-table-column>
          </el-table>
        </div>
      </el-tab-pane>
      <!-- 分页 -->
      <div class="pager">
        <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage" :page-sizes="[100, 200, 300, 400]" :page-size="100" layout="total, sizes, prev, pager, next, jumper" :total="400">
        </el-pagination>
      </div>
    </el-tabs>
  </div>
</template>
<script type="text/ecmascript-6">
export default {
  name: 'g',
  data () {
    return {
      currentPage: 1,
      tableDataSell: [{
        name: '王小虎',
        number: '18655554444',
        numberType: '员工账号',
        admin: '哈哈',
        JDStatus: '正常',
        inviter: '1866699887',
        time: '2017-11-15 20:30:30'
      }],
      tableDataBuy: [{
        name: '王小虎',
        number: '18655554444',
        numberType: '买手账号',
        admin: '哈哈',
        JDStatus: '冻结',
        inviter: '1866699887',
        time: '2017-11-15 20:30:30'
      }],
      tableDataAdmin: [{
        name: '王小虎',
        number: '18655554444',
        numberType: '买手账号',
        JDStatus: '冻结',
        inviter: '1866699887',
        time: '2017-11-15 20:30:30'
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