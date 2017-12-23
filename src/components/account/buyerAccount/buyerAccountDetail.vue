<template>
  <div class="buyerAccountDetail">
    <div class="nav">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{ name: 'buyerAccount' }">买家帐号</el-breadcrumb-item>
        <el-breadcrumb-item>帐号详情</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="card">
      <div class="baseInfo">
        <h2 class="title">买家基本信息</h2>
        <ul>
          <li>
            <img src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1511264881&di=517c3dacb2e6b5c612f16bad69c9fc11&imgtype=jpg&er=1&src=http%3A%2F%2Fimgsrc.baidu.com%2Fimage%2Fc0%253Dshijue1%252C0%252C0%252C294%252C40%2Fsign%3Dce62ca28a5c3793169658e6a83addd30%2F0b55b319ebc4b745f53bbf38c5fc1e178a821574.jpg" alt="">
          </li>
          <li>{{ userInfoObj.userName }}</li>
          <li>
            <b class="iphoneIcon"></b>
            <span>{{ userInfoObj.telephone }}</span>
          </li>
          <li>
            <span>帐号类型: {{ userInfoObj.buyerType == 0 ? '买家' : '员工' }}</span>
            <span>会员等级: {{ userInfoObj.buyerLevel == 1 ? '一类' : userInfoObj.buyerLevel == 2 ? '二类' : '三类' }}</span>
          </li>
        </ul>
      </div>
      <div class="coin">
        <h2 class="title">买家帐号信息</h2>
        <ul>
          <li>
            <strong>{{ userMoneyObj.availableCapitalAmount }}</strong>
            <p>本金余额
              <span class="link" @click="showWithdraw=true">提前支取</span>
            </p>
            <div>
              <el-dialog title="提前支取本金金额" :append-to-body="true" :visible.sync="showWithdraw" width="40%">
                <ul class="editCont" style="padding:0 20px;">
                  <li style="height: 40px;line-height:40px;">
                    <span style="display: inline-block;width:80px;">支取金额: </span>
                    <el-input v-model="withdrawMoneyNum" style="width:340px" type="number" placeholder="请输入内容"></el-input>
                    <p style="padding-left:80px">剩余金额: {{ leastMoney }}</p>
                  </li>
                </ul>
                <span slot="footer" class="dialog-footer">
                  <el-button @click="showWithdraw = false">取 消</el-button>
                  <el-button type="primary" @click="withdrawPost">确 定</el-button>
                </span>
              </el-dialog>
            </div>
          </li>
          <li>
            <strong>{{ userMoneyObj.availableCommissionAmount }}</strong>
            <p>佣金余额</p>
          </li>
        </ul>
        <p>{{ userInfoObj.bankName }}&nbsp;&nbsp;{{ userInfoObj.bankCardNo }}&nbsp;&nbsp;{{ userInfoObj.bankUserName }}</p>
      </div>
      <div class="manger">
        <h2 class="title">买家账号管理</h2>
        <ul>
          <li>
            <el-switch v-model="canGetOrder" :width="45" active-color="#40B6FF" inactive-color="#9f9f9f">
            </el-switch>
            <p>接单</p>
          </li>
          <li>
            <strong>{{ userInfoObj.userScore }}</strong>分
            <p>用户行为分</p>
            <span class="link" @click="showScore=true">设置分数</span>
          </li>
        </ul>
        <div>
          <el-dialog title="修改用户行为分" :append-to-body="true" :visible.sync="showScore" width="40%">
            <ul class="editCont" style="padding:0 20px;">
              <li style="height: 40px;line-height:40px;">
                <span style="display: inline-block;width:80px;">设置分数: </span>
                <el-input v-model="deleScore" style="width:340px" type="number" placeholder="请输入内容"></el-input>
                <p style="padding-left:80px">当前分数: {{ leastScore }}</p>
              </li>
            </ul>
            <span slot="footer" class="dialog-footer">
              <el-button @click="showScore = false">取 消</el-button>
              <el-button type="primary" @click="deleScorePost">确 定</el-button>
            </span>
          </el-dialog>
        </div>
      </div>
    </div>
    <div class="tab">
      <el-tabs v-model="activeName" type="card" @tab-click="handleClick">
        <el-tab-pane label="认证信息" name="first">
          <div class="tabCont">
            <h2>帐号绑定情况</h2>
            <h3>京东帐号&nbsp;&nbsp;
              <strong class="red" v-if="userInfoObj.isJdPassCheck!=1">(认证待审核)</strong>
              <span>收货地址:&nbsp;&nbsp;{{userInfoObj.postProvince + userInfoObj.postCity + userInfoObj.postRegion + userInfoObj.postAddress}}</span>
            </h3>
            <ul>
              <li>
                <p>帐号昵称:
                  <b>{{ userInfoObj.jdNickName }}</b>
                </p>
                <p>帐号等级:
                  <b>金牌会员</b>
                </p>
                <p>京东实名认证截图:
                  <a href="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1511264881&di=517c3dacb2e6b5c612f16bad69c9fc11&imgtype=jpg&er=1&src=http%3A%2F%2Fimgsrc.baidu.com%2Fimage%2Fc0%253Dshijue1%252C0%252C0%252C294%252C40%2Fsign%3Dce62ca28a5c3793169658e6a83addd30%2F0b55b319ebc4b745f53bbf38c5fc1e178a821574.jpg">
                    <img src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1511264881&di=517c3dacb2e6b5c612f16bad69c9fc11&imgtype=jpg&er=1&src=http%3A%2F%2Fimgsrc.baidu.com%2Fimage%2Fc0%253Dshijue1%252C0%252C0%252C294%252C40%2Fsign%3Dce62ca28a5c3793169658e6a83addd30%2F0b55b319ebc4b745f53bbf38c5fc1e178a821574.jpg" alt="">
                  </a>
                </p>
              </li>
              <li>
                <p>plus会员:
                  <b>{{ userInfoObj.isJdPlus ==1 ? '是' : '否' }}</b>
                </p>
                <p>plus会员类型:
                  <b>{{ userInfoObj.jdPlusType == '' ? '非会员' : userInfoObj.jdPlusType == 0 ? '临时会员' : '正式会员' }}</b>
                </p>
                <p>plus会员到期时间:
                  <b>{{ userInfoObj.jdPlusEndDate ? userInfoObj.jdPlusEndDate.split(' ')[0] : '暂无' }}</b>
                </p>
              </li>
              <li>
                <span v-if="userInfoObj.isJdPassCheck!=1" class="btn" @click="confirmAlert(1)">认证通过</span>
                <span v-else class="btn whiteBtn el-icon-circle-check" style="color:#40B6FF;font-size:16px">
                  <span style="color:#000;font-size:12px">&nbsp;&nbsp;已认证</span>
                </span>
                <span class="btn whiteBtn" @click="editPLUS=true">修改plus</span>
                <el-dialog title="修改plus" :append-to-body="true" :visible.sync="editPLUS" width="40%">
                  <ul class="editCont" style="padding:0 20px;">
                    <li style="height: 40px;line-height:40px;">
                      <span style="display: inline-block;width:120px;">是否是会员: </span>
                      <el-radio v-model="isPlus" label="0">否</el-radio>
                      <el-radio v-model="isPlus" label="1">是</el-radio>
                    </li>
                    <li style="height: 40px;line-height:40px;">
                      <span style="display: inline-block;width:120px;">会员类型: </span>
                      <el-radio v-model="plusType" label="0">试用</el-radio>
                      <el-radio v-model="plusType" label="1">正式</el-radio>
                    </li>
                    <li style="height: 40px;line-height:40px;">
                      <span style="display: inline-block;width:120px;">会员到期时间: </span>
                      <el-date-picker v-model="plusTime" type="date" placeholder="选择日期" format="yyyy-MM-dd" :picker-options="pickerOptions">
                      </el-date-picker>
                    </li>
                  </ul>
                  <span slot="footer" class="dialog-footer">
                    <el-button @click="editPLUS = false">取 消</el-button>
                    <el-button type="primary" @click="editPlusPost">确 定</el-button>
                  </span>
                </el-dialog>
              </li>
            </ul>
            <h3>微信帐号</h3>
            <ul>
              <li>
                <p>微信认证绑定状态:
                  <b>{{ userInfoObj.isAddManagerWechat == 1 ? '已加微信' : '未确认' }}</b>
                </p>
                <p>微信号:
                  <b>{{ userInfoObj.wechatNum }}</b>
                </p>
                <p>微信昵称:
                  <b>{{ userInfoObj.wechatNum }}</b>
                </p>
              </li>
              <li>
                <p>平台管理员:
                  <b>{{ storageUserInfo.operaterName }}</b>
                </p>
                <p>管理员微信号:
                  <b>{{ storageUserInfo.operaterWechatNum }}</b>
                </p>
              </li>
              <li>
                <span v-if="userInfoObj.isAddManagerWechat == 1" class="btn longBtn">
                  <span class="el-icon-circle-check" style="color:#ffffff;font-size:16px"></span>&nbsp;&nbsp;已加微信
                </span>
                <span v-else class="btn longBtn" @click="confirmAlert(2)">确认已加微信</span>
              </li>
            </ul>
          </div>
        </el-tab-pane>
        <el-tab-pane label="邀请关系" name="second">
          <div class="inviteCont">
            <div class="top">
              <h2>上一级</h2>
              <span class="btn" @click="addInivite=true" v-if="!showTop">+添加邀请人</span>
              <el-dialog title="添加邀请人" :append-to-body="true" :visible.sync="addInivite" width="600px">
                <ul class="add" style="padding: 0 20px 0 0;">
                  <li style="margin-bottom:20px">
                    <span style="display:inline-block;width:100px;text-align:right;margin-right:10px;">邀请人类别: </span>
                    <el-select style="width:400px" v-model="addClass" placeholder="请选择">
                      <el-option label="买手" value="0" style="width:400px">
                      </el-option>
                      <el-option label="员工" value="1" style="width:400px">
                      </el-option>
                      <el-option label="管理员" value="2" style="width:400px">
                      </el-option>
                    </el-select>
                  </li>
                  <li>
                    <span style="display:inline-block;width:100px;text-align:right;margin-right:10px;">手机号: </span>
                    <el-input style="width:400px" v-model="addInivitePhone" placeholder="请输入邀请人手机号"></el-input>
                  </li>
                </ul>
                <span slot="footer" class="dialog-footer">
                  <el-button @click="addInivite = false">取 消</el-button>
                  <el-button type="primary" @click="addInivitePost">确 定</el-button>
                </span>
              </el-dialog>
              <ul v-if="showTop">
                <li>{{ topInfoObj.userName || '暂无姓名' }}
                  <span>{{ userInfoObj.parentUserType == 2 ? '(管理员)' : userInfoObj.parentUserType == 1 ? '(员工)' : '(买家)' }}</span>
                  <span v-if="userInfoObj.parentUserType == 1" class="link" style="font-size:12px;cursor:pointer;" @click="toDetail(userInfoObj.parentUserId)">查看详情</span>
                </li>
                <li>注册时间: {{ topInfoObj.gmtCreate }}</li>
                <li>手机号: {{ topInfoObj.telephone }}</li>
                <li v-if="userInfoObj.parentUserType != 2">收货地址: {{ (topInfoObj.postProvince+topInfoObj.postCity+topInfoObj.postRegion+topInfoObj.postAddress) ? (topInfoObj.postProvince+topInfoObj.postCity+topInfoObj.postRegion+topInfoObj.postAddress) : '暂未填写' }}</li>
              </ul>
            </div>
            <div class="user">
              <h2>用户</h2>
              <b>{{ userInfoObj.userName }}
                <span style="color:#929292;">{{ userInfoObj.buyerType == 0 ? '(买家)' : '(员工)' }}</span>
              </b>
              <el-button @click="confirmAlert(3)" v-if="userInfoObj.buyerType == 0" :disabled="userInfoObj.isInviteable==1">{{ userInfoObj.isInviteable==1 ? '已是源头帐号' : '标记为源头帐号' }}</el-button>
            </div>
            <div class="next" v-if="userInfoObj.parentUserType != 0">
              <h2>下一级</h2>
              <table>
                <tr>
                  <th>姓名</th>
                  <th>注册时间</th>
                  <th>微信号</th>
                  <th>平台管理员</th>
                  <th>收货地址</th>
                </tr>
                <tr v-for="(item, index) in nextBuyerList" :key="index">
                  <td>
                    <b>{{ item.userName }}
                      <span style="color:#929292;">{{ (item.buyerType == 0 ? '(买家)' : '(员工)') }}</span>
                      <span class="link" style="font-size:12px;cursor:pointer;" @click="toDetail(item.buyerUserAccountId)">查看详情</span>
                    </b>
                  </td>
                  <td>
                    {{ item.gmtCreate }}
                  </td>
                  <td>
                    {{ item.wechatNum }}
                  </td>
                  <td>
                    {{ item.operaterUserName }}
                  </td>
                  <td>
                    {{ item.postProvince+item.postCity+item.postRegion+item.postAddress }}
                  </td>
                </tr>
              </table>
              <div class="pager">
                <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage" :page-sizes="[5, 10, 15, 20]" :page-size="pageSize" layout="total, sizes, prev, pager, next, jumper" :total="totalCount">
                </el-pagination>
              </div>
            </div>
          </div>
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>
<script type="text/ecmascript-6">
export default {
  name: 'buyerAccountDetail',
  data () {
    return {
      currentPage: 1,
      pageSize: 5,
      pageNo: 1,
      totalCount: 0,
      storageUserInfo: JSON.parse(sessionStorage.getItem('clickUserInfo')),
      canGetOrder: true,
      activeName: 'first',
      addInivite: false,
      editPLUS: false,
      // 显示扣除份数弹框
      showScore: false,
      deleScore: 0,
      addClass: '',
      addInivitePhone: '',
      isPlus: '0',
      plusType: '0',
      plusTime: '',
      // 显示上级信息
      showTop: true,
      // 上级信息
      topInfoObj: {},
      // 用户信息
      userInfoObj: {},
      // 用户资金
      userMoneyObj: {},
      // 提前支取
      withdrawMoneyNum: 0,
      showWithdraw: false,
      // 下一级买家列表
      nextBuyerList: [],
      pickerOptions: { // 时间筛选
        disabledDate (time) {
          return time.getTime() < Date.now()
        }
      }
    }
  },
  computed: {
    leastScore: function () {
      let allScore = this.userInfoObj.userScore
      // allScore = allScore - this.deleScore
      // if (allScore > 12) {
      //   this.$message({
      //     type: 'warning',
      //     message: '请输入合理的分数!'
      //   })
      //   this.deleScore = 0
      //   allScore = this.userInfoObj.userScore
      // }
      return allScore
    },
    leastMoney: function () {
      let allMoney = this.userMoneyObj.availableCapitalAmount
      allMoney = allMoney - this.withdrawMoneyNum
      return allMoney
    }
  },
  methods: {
    handleClick (tab, event) {
      if (tab.name === 'second') {
        if (this.userInfoObj.parentUserId && this.userInfoObj.parentUserType) {
          let parentUserId = this.userInfoObj.parentUserId
          let parentUserType = this.userInfoObj.parentUserType
          this.getTopInfo(parentUserId, parentUserType)
        } else {
          this.showTop = false
        }
        // 调曲邀请关系列表
        this.getRelativeList()
      }
    },
    handleSizeChange (val) {
      this.pageSize = val
      this.getRelativeList()
    },
    handleCurrentChange (val) {
      this.pageNo = val
      this.getRelativeList()
    },
    // 修改plus到期时间
    editPlusPost () {
      if (!this.plusTime) {
        this.$message({
          message: '请填写到期时间',
          type: 'warning'
        })
      } else {
        this.$ajax.post('/api/buyerAccount/fixJDPlus', {
          buyerUserAccountId: this.userInfoObj.buyerUserAccountId,
          isJDPlus: this.isPlus,
          JDPlusType: this.plusType,
          JDPlusEndDate: this.plusTime
        }).then((data) => {
          if (data.data.code === '200') {
            this.$message({
              message: '设置成功!',
              type: 'success'
            })
            this.editPLUS = false
            this.getUserInfo()
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
    // 扣除用户行为分
    deleScorePost () {
      this.$ajax.post('/api/buyerAccount/deductScore', {
        buyerUserId: this.userInfoObj.buyerUserAccountId,
        score: this.deleScore
      }).then((data) => {
        if (data.data.code === '200') {
          this.$message({
            message: '设置成功!',
            type: 'success'
          })
          this.showScore = false
          this.getUserInfo()
        } else {
          this.$message({
            message: data.data.message,
            type: 'warning'
          })
        }
      }).catch((err) => {
        this.$message.error(err)
      })
    },
    // 获取用户信息
    getUserInfo (isLook) {
      let id = ''
      if (isLook) {
        id = this.$route.query.id
      } else {
        id = this.storageUserInfo.buyerUserAccountId
      }
      this.$ajax.post('/api/buyerAccount/getUserInfoByUserId', {
        buyerUserAccountId: id
      }).then((data) => {
        if (data.data.code === '200') {
          this.userInfoObj = data.data.data
        } else {
          this.$message({
            message: data.data.message,
            type: 'warning'
          })
        }
      }).catch((err) => {
        this.$message.error(err)
      })
    },
    // 获取上级信息
    getTopInfo (id, type) {
      let api = ''
      if (parseInt(type) === 2) {
        api = '/api/sellerManagerAccount/getParentSellerManagerByManagerId'
      } else {
        api = '/api/buyerAccount/getUserInfoByUserId'
      }
      this.$ajax.post(api, {
        sellerManagerId: id
      }).then((data) => {
        if (data.data.code === '200') {
          this.topInfoObj = data.data.data
        } else {
          this.$message({
            message: data.data.message,
            type: 'warning'
          })
        }
      }).catch((err) => {
        this.$message.error(err)
      })
    },
    // 获取邀请关系
    getRelativeList () {
      this.$ajax.post('/api/buyerAccount/getBuyerListByParentUserId', {
        parentUserId: this.storageUserInfo.buyerUserAccountId,
        pageSize: this.pageSize,
        pageNo: this.pageNo
      }).then((data) => {
        if (data.data.code === '200') {
          this.nextBuyerList = data.data.data.buyerUsers
          this.totalCount = data.data.data.totalCount
        } else {
          this.$message({
            message: data.data.message,
            type: 'warning'
          })
        }
      }).catch((err) => {
        this.$message.error(err)
      })
    },
    // 弹框提醒
    confirmAlert (index) {
      if (index === 1) { // 审核通过操作
        this.$confirm('此操作将通过该任务审核，是否继续？', '确认通过?', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$ajax.post('/api/buyerAccount/passConfirm', {
            buyerUserAccountId: this.userInfoObj.buyerUserAccountId
          }).then((data) => {
            if (data.data.code === '200') {
              this.$message({
                type: 'success',
                message: '操作成功!'
              })
              this.getUserInfo()
            } else {
              this.$message({
                message: data.data.message,
                type: 'warning'
              })
            }
          }).catch((err) => {
            this.$message.error(err)
          })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消操作'
          })
        })
      } else if (index === 2) { // 审核确认添加微信操作
        this.$confirm('此操作将通过确认添加微信，是否继续？', '确认已添加?', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$ajax.post('/api/buyerAccount/confirmAddWechat', {
            buyerUserAccountId: this.userInfoObj.buyerUserAccountId
          }).then((data) => {
            if (data.data.code === '200') {
              this.$message({
                type: 'success',
                message: '操作成功!'
              })
              this.getUserInfo()
            } else {
              this.$message({
                message: data.data.message,
                type: 'warning'
              })
            }
          }).catch((err) => {
            this.$message.error(err)
          })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消操作'
          })
        })
      } else if (index === 3) { // 将用户标记为源头帐号操作
        this.$confirm('此操作将用户标记为源头帐号，是否继续？', '标记用户为源头帐号?', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$ajax.post('/api/buyerAccount/changeInviteable', {
            buyerUserAccountId: this.userInfoObj.buyerUserAccountId
          }).then((data) => {
            if (data.data.code === '200') {
              this.$message({
                type: 'success',
                message: '操作成功!'
              })
              this.getUserInfo()
            } else {
              this.$message({
                message: data.data.message,
                type: 'warning'
              })
            }
          }).catch((err) => {
            this.$message.error(err)
          })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消操作'
          })
        })
      }
    },
    // 查看详情
    toDetail (id) {
      this.$router.push({ name: 'buyerAccountDetail', query: { id: id } })
      this.getUserInfo(this.$route.query.id)
    },
    // 添加邀请人
    addInivitePost () {
      if (this.addClass === '') {
        this.$message({
          type: 'warning',
          message: '请选择邀请人类型!'
        })
      } else if (this.parentTelephone === '') {
        this.$message({
          type: 'warning',
          message: '请填写邀请人手机号码!'
        })
      } else {
        this.$ajax.post('/api/buyerAccount/fillInviterInfo', {
          buyerUserAccountId: this.userInfoObj.buyerUserAccountId,
          parentType: this.addClass,
          parentTelephone: this.parentTelephone
        }).then((data) => {
          if (data.data.code === '200') {
            this.$message({
              type: 'success',
              message: '添加成功!'
            })
            this.getTopInfo(this.userInfoObj.parentUserId, this.userInfoObj.parentUserType)
            this.addInivite = false
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
    // 获取买家资金
    getBuyerMoney () {
      this.$ajax.post('/api/userFund/getBuyerUserFund', {
        buyerUserAccountId: this.storageUserInfo.buyerUserAccountId
      }).then((data) => {
        if (data.data.code === '200') {
          this.userMoneyObj = data.data.data
        } else {
          this.$message({
            message: data.data.message,
            type: 'warning'
          })
        }
      }).catch((err) => {
        this.$message.error(err)
      })
    },
    // 提前支取资金
    withdrawPost () {
      this.$ajax.post('/api/withdrawApply/createBuyerApply', {
        userId: this.userInfoObj.buyerUserAccountId,
        withdrawAmount: this.withdrawMoneyNum
      }).then((data) => {
        if (data.data.code === '200') {
          this.$message({
            message: '支取成功!',
            type: 'success'
          })
          this.getBuyerMoney()
          this.showWithdraw = false
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
    this.getUserInfo()
    this.getBuyerMoney()
  }
}
</script>
<style lang="stylus" rel="stylesheet/stylus" scoped>
.buyerAccountDetail
  padding 0 20px 20px
  .btn
    display inline-block
    text-align center
    width 90px
    height 36px
    line-height 36px
    border-radius 4px
    background #40B6FF
    color #ffffff
    cursor pointer
    margin-left 14px
    margin-right 14px
  .longBtn
    width 200px
  .whiteBtn
    background #ffffff
    color #333333
    border 1px solid #cccccc
  .red
    color #FC1733
  .link
    color #1D6AE7
    cursor pointer
  .nav
    height 36px
    span
      font-size 12px
      line-height 36px
      color #262626
  .card
    display flex
    justify-content space-between
    >div
      height 250px
      box-shadow 0 1px 5px rgba(0, 0, 0, 0.2)
      background #ffffff
      border-radius 4px
      flex 1
    .title
      font-size 12px
      line-height 38px
      padding-left 20px
      padding-right 20px
      color #ffffff
    .baseInfo
      margin-right 20px
      h2
        background #FFAD33
      ul
        padding 30px
        li
          text-align center
          font-size 14px
          color #333333
          line-height 30px
          img
            width 60px
            height 60px
            border-radius 50%
          b
            display inline-block
            width 20px
            height 20px
            vertical-align middle
          span
            margin-left 10px
            margin-right 10px
    .coin
      margin-right 20px
      h2
        background #40B6FF
      ul
        display flex
        justify-content center
        margin 20px
        padding-bottom 14px
        padding-top 14px
        border-bottom 1px solid #e5e5e5
        li
          flex 1
          padding 20px 0
          text-align center
          &:first-child
            border-right 1px solid #e5e5e5
          strong
            font-size 28px
            color #333333
            line-height 36px
          p
            font-size 14px
            color #999999
            line-height 26px
      >p
        color #666666
        // line-height 28px
        font-size 14px
        text-align center
    .manger
      h2
        background #FF3341
      ul
        padding-top 40px
        display flex
        justify-content center
        li
          flex 1
          text-align center
          padding 26px 0
          &:first-child
            border-right 1px solid #e5e5e5
          p
            font-size 14px
            line-height 28px
            color #333333
          strong
            font-size 28px
  .tab
    margin-top 16px
    margin-bottom 20px
    padding 20px
    background #ffffff
    .tabCont
      padding 20px
      h2
        font-size 16px
        color #333333
        margin-bottom 20px
      h3
        font-size 14px
        color #333333
        line-height 30px
        padding-left 20px
        padding-right 20px
        span
          float right
      ul
        padding 20px
        margin-bottom 20px
        display flex
        border-top 1px solid #e5e5e5
        border-bottom 1px solid #e5e5e5
        li
          flex 1
          border-right 1px solid #e5e5e5
          &:nth-child(2)
            padding-left 50px
          &:last-child
            border none
            text-align center
            align-self center
          img
            width 60px
            vertical-align top
          p
            font-size 14px
            color #666666
            line-height 30px
            b
              color #333333
              font-weight 500
    .inviteCont
      >div
        h2
          margin-top 20px
          margin-bottom 10px
          font-size 14px
          color #999999
          line-height 26px
          padding-left 20px
          padding-right 20px
        ul
          height 40px
          line-height 40px
          font-size 14px
          color #2C2C2C
          display flex
          justify-content space-between
          background #f8f8f8
          border 1px solid #e5e5e5
          padding-left 20px
          padding-right 20px
          li
            flex 1
      .user
        b
          padding-left 20px
          padding-right 40px
          font-size 14px
          color #2C2C2C
      .next
        table
          width 100%
          font-size 14px
          tr
            border 1px solid #e5e5e5
            color #666666
            height 40px
            line-height 40px
            text-align center
            th
              background #f8f8f8
              color #333333
</style>  