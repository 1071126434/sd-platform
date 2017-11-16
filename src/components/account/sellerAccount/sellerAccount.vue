<template>
  <div class="wrapSeller">
    <header>
      <div class="top">
        <el-input placeholder="请输入姓名/手机号" v-model="input5" class="input-with-select">
          <el-button slot="append" icon="el-icon-search"></el-button>
        </el-input>
      </div>
      <el-button style="margin-top:24px" @click="add">添加商户</el-button>
      <div class="line"></div>
      <div class="accountTab">
        <el-table :data="tableData" style="width: 100%">
          <el-table-column width="60" type="index" align="center" label="编号">
          </el-table-column>
          <el-table-column prop="name" align="center" label="姓名">
          </el-table-column>
          <el-table-column prop="phone" align="center" label="手机号">
          </el-table-column>
          <el-table-column prop="shopName" align="center" label="首个店铺名">
          </el-table-column>
          <el-table-column prop="state" align="center" label="帐号状态">
          </el-table-column>
          <el-table-column prop="all" align="center" label="全部">
          </el-table-column>
          <el-table-column prop="loginTime" align="center" label="最后登录时间">
          </el-table-column>
          <el-table-column prop="creatTime" align="center" label="创建时间">
          </el-table-column>
          <el-table-column prop="inviter" align="center" label="邀请人">
          </el-table-column>
          <el-table-column prop="admin" align="center" label="服务人">
          </el-table-column>
          <el-table-column prop="adminWecht" align="center" label="服务人微信号">
          </el-table-column>
          <el-table-column align="center" label="操作">
            <template slot-scope="scope">
              <el-button @click="handleClick(scope.row)" type="text" size="small">查看</el-button>
            </template>
          </el-table-column>
        </el-table>
        <div class="pager">
          <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage" :page-sizes="[100, 200, 300, 400]" :page-size="100" layout="total, sizes, prev, pager, next, jumper" :total="400">
          </el-pagination>
        </div>
      </div>
      <!-- 弹框部分 -->
      <el-dialog title="确认添加商户" :visible.sync="dialogFormVisible" :modal-append-to-body=false width="40%" class="selectSize">
        <el-form>
          <el-form-item label="手机号" :label-width="formLabelWidth">
            <el-input v-model="phone" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="密码" :label-width="formLabelWidth">
            <el-input v-model="password" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="QQ号" :label-width="formLabelWidth">
            <el-input v-model="qqNumber" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="微信号" :label-width="formLabelWidth">
            <el-input v-model="wechat" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="邀请人姓名" :label-width="formLabelWidth">
            <el-input v-model="inviteName" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="管理员人姓名" :label-width="formLabelWidth">
            <el-select v-model="adminName">
              <el-option label="区域一" value="shanghai"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="管理员微信号" :label-width="formLabelWidth">
            <el-select v-model="adminWechat">
              <el-option label="区域一" value="shanghai"></el-option>
            </el-select>
          </el-form-item>
          <p style="margin-top:-20px;margin-left:100px">该商家及邀请来的买家添加该账号以便管理</p>
          <el-form-item label="商家来源" :label-width="formLabelWidth">
            <el-input v-model="source" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="充值银行卡" :label-width="formLabelWidth">
            <el-select v-model="bank">
              <el-option label="区域一" value="shanghai"></el-option>
            </el-select>
          </el-form-item>
          <p style="margin-top:-20px;margin-left:100px">该商户充值会向本银行卡转账</p>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogFormVisible = false">取 消</el-button>
          <el-button type="primary" @click="dialogFormVisible = false">确 定</el-button>
        </div>
      </el-dialog>
    </header>
  </div>
</template>
<script type="text/ecmascript-6">
export default {
  name: 'sellerAccount',
  data () {
    return {
      input5: '',
      phone: '',
      password: '',
      qqNumber: '',
      wechat: '',
      inviteName: '',
      adminName: '',
      adminWechat: '',
      source: '',
      bank: '',
      currentPage: 1,
      tableData: [{
        name: '王小虎',
        phone: '18655554444',
        shopName: '乱七八糟',
        state: '正常',
        all: '1/2',
        loginTime: '2017-11-15 20:30:30',
        creatTime: '2017-11-15 20:30:30',
        inviter: '1866699887',
        admin: '黄军',
        adminWecht: '156146146'
      }, {
        name: '王小虎',
        phone: '18655554444',
        shopName: '乱七八糟',
        state: '正常',
        all: '1/2',
        loginTime: '2017-11-15 20:30:30',
        creatTime: '2017-11-15 20:30:30',
        inviter: '1866699887',
        admin: '黄军',
        adminWecht: '156146146'
      }, {
        name: '王小虎',
        phone: '18655554444',
        shopName: '乱七八糟',
        state: '正常',
        all: '1/2',
        loginTime: '2017-11-15 20:30:30',
        creatTime: '2017-11-15 20:30:30',
        inviter: '1866699887',
        admin: '黄军',
        adminWecht: '156146146'
      }],
      dialogTableVisible: false,
      dialogFormVisible: false,
      form: {
        name: '',
        region: '',
        date1: '',
        date2: '',
        delivery: false,
        type: [],
        resource: '',
        desc: ''
      },
      formLabelWidth: '100px'

    }
  },
  methods: {
    handleClick (row) {
      this.$router.push({ name: 'sellerAccountDetail' })
    },
    handleSizeChange (val) {
      console.log(`每页 ${val} 条`)
    },
    handleCurrentChange (val) {
      console.log(`当前页: ${val}`)
    },
    add () {
      this.dialogFormVisible = true
    }
  }
}
</script>
<style lang="stylus" rel="stylesheet/stylus" scoped>
.wrapSeller
  padding 20px
  header
    background rgba(255, 255, 255, 1)
    padding 20px
    .top
      width 280px
    .line
      height 1px
      background rgba(229, 229, 229, 1)
      margin-top 10px
</style>