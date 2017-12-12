<template>
  <div class="wrapSeller">
    <header>
      <div class="top">
        <el-input placeholder="请输入姓名/手机号" v-model="input5_1" class="input-with-select">
          <el-button slot="append" icon="el-icon-search" @click="btn_search"></el-button>
        </el-input>
      </div>
      <el-button style="margin-top:24px" @click="add">添加商户</el-button>
      <div class="line"></div>
      <div class="accountTab">
        <el-table :data="tableData" style="width: 100%;padding-right:20px">
          <el-table-column width="60" type="index" align="center" label="编号">
          </el-table-column>
          <el-table-column prop="phone" align="center" label="手机号">
          </el-table-column>
          <el-table-column prop="shopName" align="center" label="首个店铺名">
          </el-table-column>
          <el-table-column prop="state" align="center" label="帐号状态">
          </el-table-column>
          <el-table-column prop="all" align="center" label="店铺数量">
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
              <el-button @click="handleClick(scope.$index, scope.row)" type="text" size="small">查看</el-button>
            </template>
          </el-table-column>
        </el-table>
        <div class="pager">
          <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="pageNo" :page-sizes="pageSizeArray" :page-size="pageSize" layout="total, sizes, prev, pager, next, jumper" :total="pageTotal">
          </el-pagination>
        </div>
      </div>
      <!-- 弹框部分 -->
      <el-dialog title="确认添加商户" :visible.sync="dialogFormVisible" :modal-append-to-body=false width="40%" class="selectSize">
        <el-form style="padding:0 20px">
          <el-form-item label="手机号" :label-width="formLabelWidth">
            <el-input v-model="phone" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="密码" :label-width="formLabelWidth">
            <el-input v-model="password" auto-complete="off" type="password"></el-input>
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
            <el-select v-model="adminName" @change="adName">
              <el-option v-for="(item, index) in adminNameArr" :label="item.userName" :value="item.operateUserAccountId" :key="index"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="管理员微信号" :label-width="formLabelWidth">
            <el-select v-model="adminWechats">
              <el-option v-for="(item, index) in wechatArr" :label="item.wechatNum" :value="item.operateWechatId" :key="index"></el-option>
            </el-select>
          </el-form-item>
          <p style="margin-top:-20px;margin-left:100px;color:#898989;padding-bottom:20px;font-size:12px">该商家及邀请来的买家添加该账号以便管理</p>
          <el-form-item label="商家来源" :label-width="formLabelWidth">
            <el-input v-model="source" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="充值银行卡" :label-width="formLabelWidth">
            <el-select v-model="bank">
              <el-option v-for="(item, index) in bankArr" :label="item.bankName+' '+item.cardNo+' '+item.userName" :value="item.bankCarId" :key="index"></el-option>
            </el-select>
          </el-form-item>
          <p style="margin-top:-20px;margin-left:100px;color:#898989">该商户充值会向本银行卡转账</p>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogFormVisible = false">取 消</el-button>
          <el-button type="primary" @click="addSure">确 定</el-button>
        </div>
      </el-dialog>
    </header>
  </div>
</template>
<script type="text/ecmascript-6">
import { pageCommon } from '../../../assets/js/mixin'
import { mapGetters } from 'vuex'
import md5 from 'md5'
export default {
  mixins: [pageCommon],
  name: 'sellerAccount',
  data () {
    return {
      input5_1: '',
      phone: '',
      password: '',
      qqNumber: '',
      wechat: '',
      inviteName: '',
      adminName: '',
      adminWechats: '',
      wechatArr: [],
      adminNameArr: [],
      bankArr: [],
      source: '',
      bank: '',
      currentPage: 1,
      apiUrl: '/api/sellerAccout/getSellerListByConditions',
      tableData: [],
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
  // 通过计算属性进行处理
  computed: {
    params () {
      return {
        pageSize: this.pageSize,
        pageNo: this.pageNo,
        telephoneOrUserName: this.input5_1
      }
    },
    ...mapGetters([
      'userInfo'
    ])

  },
  methods: {
    handleClick (index, seller) {
      console.log(index, seller)
      this.$router.push({ name: 'sellerAccountDetail', query: { sellerUserId: seller.sellerUserid, severName: seller.admin, adminWechat: seller.adminWecht } })
    },
    // 搜索
    btn_search () {
      this.getTask()
    },
    add () {
      this.dialogFormVisible = true
      this.bankInfo()
      this.adminName_1()
    },
    setList (data) {
      let arr = []
      for (let word of data) {
        let goods = {
          phone: word.telephone || '暂无数据',
          shopName: word.firstShopName || '暂无数据',
          state: word.status === '1' ? '正常' : '冻结',
          all: word.sellerShopNum || 0,
          loginTime: word.lastLoginTime || '暂无数据',
          creatTime: word.gmtCreate || '暂无数据',
          inviter: word.inviterName || '暂无数据',
          admin: word.operateUserName || '暂无数据',
          adminWecht: word.operateWechatNum || '暂无数据',
          sellerUserid: word.sellerUserId || '暂无数据'
        }
        arr.push(goods)
      }
      this.tableData = arr
    },
    // 添加商家的请求
    addSure () {
      if (this.phone === '' || this.password === '' || this.qqNumber === '' || this.wechat === '' || this.inviteName === '' || this.adminName === '' || this.adminWechat === '' || this.source === '' || this.bank === '') {
        this.$message({
          message: '内容不能为空,请正确填写信息',
          type: 'warning'
        })
        return false
      }
      this.$ajax.post('/api/sellerAccout/register', {
        telephone: this.phone,
        password: md5(this.password),
        qqNum: this.qqNumber,
        wechatNum: this.wechat,
        inviterName: this.inviteName,
        operateUserAccountId: this.adminName,
        operateWechatId: this.adminWechats,
        sellerSourceChannel: this.source,
        platformChargeBankCardId: this.bank
      }).then((data) => {
        console.log(data)
        let res = data.data
        if (res.code === '200') {
          this.$message({
            message: res.message,
            type: 'success'
          })
          this.dialogFormVisible = false
          this.getTask()
        } else {
          this.$message({
            message: res.message,
            type: 'warning'
          })
        }
      }).catch((error) => {
        console.log(error)
        this.$message.error(error)
      })
    },
    adName () {
      this.adminWechats = ' '
      this.wechatArr = []
      this.wechats()
    },
    // 获取平台端联系人微信列表
    wechats () {
      this.$ajax.post('/api/platform/wechat/getListByOperateUserId', {
        operateUserId: this.adminName
      }).then((data) => {
        console.log(data)
        let res = data.data
        if (res.code === '200') {
          let arr = []
          for (let word of res.data) {
            let goods = {
              wechatNickName: word.wechatNickName,
              wechatNum: word.wechatNum,
              operateWechatId: word.operateWechatId
            }
            arr.push(goods)
          }
          this.wechatArr = arr
        } else {
          this.$message({
            message: res.message,
            type: 'warning'
          })
        }
      }).catch((error) => {
        console.log(error)
        // this.$message.error('网络错误，刷新下试试')
      })
    },
    // 获取管理员姓名接口
    adminName_1 () {
      this.$ajax.post('/api/operateAccount/getOperatersOfPlatform', {
      }).then((data) => {
        console.log(data)
        let res = data.data
        if (res.code === '200') {
          let arr = []
          for (let word of res.data) {
            let goods = {
              userName: word.userName || '暂无数据',
              operateUserAccountId: word.operateUserAccountId
            }
            arr.push(goods)
          }
          this.adminNameArr = arr
        } else {
          this.$message({
            message: res.message,
            type: 'warning'
          })
        }
      }).catch(() => {
        this.$message.error('网络错误，刷新下试试')
      })
    },
    // 充值银行卡的信息获取
    bankInfo () {
      this.$ajax.post('/api/config/bankCard/getListByType', {
        type: 1
      }).then((data) => {
        console.log(data)
        let res = data.data
        if (res.code === '200') {
          let arr = []
          for (let word of res.data) {
            let goods = {
              bankName: word.bankName,
              cardNo: word.cardNo,
              userName: word.userName,
              bankCarId: word.bankCardId
            }
            arr.push(goods)
          }
          this.bankArr = arr
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
  // mounted () {
  //   this.getTask()
  // }
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