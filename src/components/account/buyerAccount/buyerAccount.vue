<template>
  <div class="buyerAccount">
    <div class="inps">
      <div class="selectGroup">
        <div class="select">
          <span>帐号类别:</span>
          <el-select v-model="buyerLevel" placeholder="请选择">
            <el-option label="一类" value="1"></el-option>
            <el-option label="二类" value="2"></el-option>
            <el-option label="三类" value="3"></el-option>
          </el-select>
        </div>
        <div class="select">
          <span>帐号状态:</span>
          <el-select v-model="buyerStatus" placeholder="请选择">
            <el-option label="未提交" value="0"></el-option>
            <el-option label="已认证" value="1"></el-option>
            <el-option label="待审核" value="2"></el-option>
          </el-select>
        </div>
        <!-- <div class="select">
          <span>微信号:</span>
          <el-select v-model="weChat" placeholder="请选择">
            <el-option v-for="(item, index) in weChatList" :key="index" :label="item.wechatNickName + '：' + item.wechatNum" :value="item.operateWechatId">
            </el-option>
          </el-select>
        </div> -->
      </div>
      <div class="search">
        <el-input v-model="telephoneOrUserName" placeholder="请输入姓名/手机号">
          <el-button slot="append" icon="el-icon-search" class="primary" @click="getTask"></el-button>
        </el-input>
      </div>
    </div>
    <div class="linkAccount">
      <el-button @click="showAlert = true">导入账号</el-button>
      <el-dialog title="导入帐号?" :append-to-body="true" :visible.sync="showAlert" width="40%">
        <div class="upload">
          <div class="cont">
            <el-upload class="upload-demo" accept=".csv" style="text-align:center" drag action="/api/file/uploadCsvBuyer" :headers="{'accesstoken':userToken, 'userAccountId':operateUserAccountId}" :on-success="uploadSuccess" multiple>
              <i class="el-icon-upload"></i>
              <div class="el-upload__text">拖拽CSV文件到此处或者
                <em>点击上传</em>
              </div>
              <div class="el-upload__tip" style="text-align:center;" slot="tip">ps:文件中不得出现 , (逗号)字符, 单次上传20条左右</div>
            </el-upload>
          </div>
          <div v-if="uploaded" style="width:360px;margin: 0 auto;">
            <p style="color:#029E4A;font-size14px;">
              <b>成功个数: </b>
              <span>{{ uploadObj.succesNum }}</span>&nbsp;&nbsp;&nbsp;&nbsp;
              <b>失败个数: </b>
              <span>{{ uploadObj.failNum }}</span>
            </p>
            <p v-for="(item, index) in uploadObj.errorList" :key="index" style="color:red;font-size14px;">{{item.errorPhone}}: {{item.errorMsg}}</p>
          </div>
        </div>
        <span slot="footer" class="dialog-footer">
          <el-button @click="showAlert = false">取消导入</el-button>
          <el-button type="primary" @click="linkAccount">确定导入</el-button>
        </span>
      </el-dialog>
    </div>
    <div class="accountTab">
      <el-table :data="tableData" style="width: 100%">
        <el-table-column width="60" type="index" align="center" label="编号">
        </el-table-column>
        <el-table-column prop="userName" align="center" label="姓名">
        </el-table-column>
        <el-table-column prop="telephone" align="center" label="手机号">
        </el-table-column>
        <el-table-column prop="wechatNum" align="center" label="微信号">
        </el-table-column>
        <el-table-column prop="buyerLevel" align="center" label="类别">
          <template slot-scope="scope">
            <span>{{scope.row.buyerLevel == 1 ? '一类' : scope.row.buyerLevel == 2 ? '二类' : '三类'}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="buyerStatus" align="center" label="帐号状态">
          <template slot-scope="scope">
            <span>{{scope.row.buyerStatus == 0 ? '冻结' : '正常'}}</span>
          </template>
        </el-table-column>
        <el-table-column align="center" width="100" label="京东帐号状态">
          <template slot-scope="scope">
            <span class="tipSmall" :class="scope.row.isJdPassCheck==1 ? 'tipSuccess' : scope.row.isJdPassCheck==2 ? 'tipWait' : 'tipError'">{{scope.row.isJdPassCheck == 1 ? '已认证' : scope.row.isJdPassCheck == 0 ? '未提交' : '待审核' }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="parentUserName" align="center" label="邀请人">
        </el-table-column>
        <el-table-column prop="operaterName" align="center" label="平台管理员">
        </el-table-column>
        <el-table-column prop="gmtCreate" align="center" label="创建时间">
        </el-table-column>
        <el-table-column align="center" label="操作">
          <template slot-scope="scope">
            <el-button @click="handleClick(scope.row)" type="text" size="small">查看</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <noCont v-if="this.tableData.length===0"></noCont>
    <div class="pager" v-if="this.tableData.length!==0">
      <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage" :page-sizes="pageSizeArray" :page-size="pageSize" layout="total, sizes, prev, pager, next, jumper" :total="pageTotal">
      </el-pagination>
    </div>
  </div>
</template>
<script type="text/ecmascript-6">
import { pageCommon } from '../../../assets/js/mixin'
import { mapGetters } from 'vuex'
import noCont from '../../../base/noCont/noCont'
export default {
  name: 'buyerAccount',
  mixins: [pageCommon],
  components: {
    noCont
  },
  data () {
    return {
      currentPage: 1,
      // 买家类别
      buyerLevel: '',
      // 帐号状态
      buyerStatus: '',
      // 微信帐号列表
      weChat: '',
      weChatList: [],
      // 输入的手机号或者名字
      telephoneOrUserName: '',
      showAlert: false, // 导入帐号弹框
      uploadObj: {},
      uploaded: false,
      tableData: [],
      apiUrl: '/api/buyerAccount/getBuyerUserDetailList'
    }
  },
  methods: {
    handleClick (row) {
      window.sessionStorage.setItem('clickUserInfo', JSON.stringify(row))
      this.$router.push({ name: 'buyerAccountDetail' })
    },
    linkAccount () {
      this.uploaded = false
      this.showAlert = false
      this.getTask()
    },
    uploadSuccess (response, file, fileList) {
      if (response.code === '200') {
        this.uploaded = true
        this.uploadObj = response.data
      } else {
        this.$message.error(response.message)
      }
    },
    setList (data) {
      let arr = []
      for (let i of data) {
        let obj = {
          buyerLevel: this.isNull(i.buyerLevel),
          buyerStatus: this.isNull(i.buyerStatus),
          gmtCreate: this.isNull(i.gmtCreate),
          inviterId: this.isNull(i.inviterId),
          isJdPassCheck: this.isNull(i.isJdPassCheck),
          operateUserAccountId: this.isNull(i.operateUserAccountId),
          operaterName: this.isNull(i.operaterName),
          operaterWechatNum: this.isNull(i.operaterWechatNum),
          parentTelephone: this.isNull(i.parentTelephone),
          parentUserName: this.isNull(i.parentUserName),
          parentUserType: this.isNull(i.parentUserType),
          telephone: this.isNull(i.telephone),
          userName: this.isNull(i.userName),
          wechatNum: this.isNull(i.wechatNum),
          buyerUserAccountId: this.isNull(i.buyerUserAccountId)
        }
        arr.push(obj)
      }
      this.tableData = arr
    },
    // 获取微信号列表
    getWechatList () {
      this.$ajax.post('/api/platform/wechat/getListByOperateUserId', {
        operateUserId: this.userInfo.operateUserAccountId
      }).then((data) => {
        if (data.data.code === '200') {
          this.weChatList = data.data.data
        } else {
          this.$message({
            message: data.data.message,
            type: 'warning'
          })
        }
      }).catch((err) => {
        this.$message.error(err)
      })
    }
  },
  mounted () {
    this.getWechatList()
  },
  computed: {
    operateUserAccountId () {
      return this.userInfo.operateUserAccountId
    },
    params () {
      return {
        pageSize: this.pageSize,
        pageNo: this.pageNo,
        buyerLevel: this.buyerLevel,
        buyerStatus: this.buyerStatus,
        operateUserAccountId: this.weChat,
        telephoneOrUserName: this.telephoneOrUserName
      }
    },
    ...mapGetters([
      'userInfo',
      'userToken'
    ])
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