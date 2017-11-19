<template>
  <div class="buyerAccount">
    <div class="inps">
      <div class="selectGroup">
        <div class="select">
          <span>帐号类别:</span>
          <el-select v-model="typeValue" placeholder="请选择">
            <el-option v-for="item in typeClass" :key="item.value" :label="item.label" :value="item.value">
            </el-option>
          </el-select>
        </div>
        <div class="select">
          <span>帐号状态:</span>
          <el-select v-model="typeValue" placeholder="请选择">
            <el-option v-for="item in typeClass" :key="item.value" :label="item.label" :value="item.value">
            </el-option>
          </el-select>
        </div>
        <div class="select">
          <span>微信管理:</span>
          <el-select v-model="typeValue" placeholder="请选择">
            <el-option v-for="item in typeClass" :key="item.value" :label="item.label" :value="item.value">
            </el-option>
          </el-select>
        </div>
      </div>
      <div class="search">
        <el-input placeholder="请输入姓名/手机号">
          <el-button slot="append" icon="el-icon-search" class="primary"></el-button>
        </el-input>
      </div>
    </div>
    <div class="linkAccount">
      <el-button @click="showAlert=true">导入账号</el-button>
      <el-dialog title="导入帐号?" :append-to-body="true" :visible.sync="showAlert" width="40%">
        <div class="upload">
          <div class="cont">
            <el-upload class="upload-demo" accept=".svc" style="text-align:center" drag action="https://jsonplaceholder.typicode.com/posts/" multiple>
              <i class="el-icon-upload"></i>
              <div class="el-upload__text">拖拽CSV文件到此处或者
                <em>点击上传</em>
              </div>
              <div class="el-upload__tip" style="text-align:left;" slot="tip">ps:文件中不得出现 , (逗号)字符, 单次上传20条左右</div>
            </el-upload>
          </div>
          <p style="color:red;font-size14px;">有错误</p>
        </div>
        <span slot="footer" class="dialog-footer">
          <el-button @click="showAlert = false">取消导入</el-button>
          <el-button type="primary" @click="showAlert = false">确定导入</el-button>
        </span>
      </el-dialog>
    </div>
    <div class="accountTab">
      <el-table :data="tableData" style="width: 100%">
        <el-table-column width="60" prop="num" align="center" label="编号">
        </el-table-column>
        <el-table-column prop="name" align="center" label="姓名">
        </el-table-column>
        <el-table-column prop="phone" align="center" label="手机号">
        </el-table-column>
        <el-table-column prop="wechat" align="center" label="微信号">
        </el-table-column>
        <el-table-column prop="type" align="center" label="类别">
        </el-table-column>
        <el-table-column align="center" width="90" label="帐号状态">
          <template slot-scope="scope">
            <span class="tipSmall" :class="scope.row.JDStatus==='已认证' ? 'tipSuccess' : scope.row.JDStatus==='待审核' ? 'tipWait' : 'tipError'">{{scope.row.JDStatus}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="JDStatus" align="center" label="京东帐号状态">
        </el-table-column>
        <el-table-column prop="inviter" align="center" label="邀请人">
        </el-table-column>
        <el-table-column prop="admin" align="center" label="平台管理员">
        </el-table-column>
        <el-table-column prop="creatTime" align="center" label="创建时间">
        </el-table-column>
        <el-table-column align="center" label="操作">
          <template slot-scope="scope">
            <el-button @click="handleClick(scope.row)" type="text" size="small">查看</el-button>
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
  name: 'buyerAccount',
  data () {
    return {
      currentPage: 1,
      typeValue: '',
      showAlert: false, // 导入帐号弹框
      typeClass: [{
        value: '1',
        label: '一类'
      }, {
        value: '2',
        label: '二类'
      }],
      tableData: [{
        num: '1',
        name: '王小虎',
        phone: '18655554444',
        wechat: '19886655555',
        type: '一类',
        accountStatus: '正常',
        JDStatus: '已认证',
        inviter: '1866699887',
        admin: '小智',
        creatTime: '2017-11-15 20:30:30'
      }, {
        num: '2',
        name: '王小虎',
        phone: '18655554444',
        wechat: '19886655555',
        type: '二类',
        accountStatus: '正常',
        JDStatus: '未提交',
        inviter: '1866699887',
        admin: '小智',
        creatTime: '2017-11-15 20:30:30'
      }, {
        num: '3',
        name: '王小虎',
        phone: '18655554444',
        wechat: '19886655555',
        type: '三类',
        accountStatus: '正常',
        JDStatus: '待审核',
        inviter: '1866699887',
        admin: '小智',
        creatTime: '2017-11-15 20:30:30'
      }]
    }
  },
  methods: {
    handleClick (row) {
      console.log(row)
      this.$router.push({ name: 'buyerAccountDetail' })
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
.buyerAccount
  margin 20px
  padding 20px
  background #ffffff
  .inps
    display flex
    justify-content space-between
    .selectGroup
      display flex
      .select
        margin-right 36px
        font-size 14px
        color #333333
    .search
      flex 1
      max-width 300px
      .primary
        background #40B6FF
        color #ffffff
        border-color #40B6FF
        border-top-left-radius 0
        border-bottom-left-radius 0
        border 1px solid #40B6FF
  .linkAccount
    padding-top 24px
    padding-bottom 10px
    border-bottom 1px solid #cccccc
  .accountTab
    padding 20px 0
</style>