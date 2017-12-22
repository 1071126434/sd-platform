<template>
  <div class="sellerComplain">
    <div class="tab">
      <div class="inp">
        <div class="search">
          <el-input v-model="phone" placeholder="请输入手机号">
            <el-button slot="append" @click="getTask" icon="el-icon-search" class="primary"></el-button>
          </el-input>
        </div>
      </div>
      <div class="nav">
        <el-tabs v-model="activeName" @tab-click="handleClick">
          <el-tab-pane label="未受理" name="0"></el-tab-pane>
          <el-tab-pane label="处理中" name="1"></el-tab-pane>
          <el-tab-pane label="已处理" name="2"></el-tab-pane>
        </el-tabs>
      </div>
      <div class="tabCont">
        <el-table :data="complainList">
          <el-table-column prop="complainPhone" align="center" label="商家联系方式">
          </el-table-column>
          <el-table-column prop="complainReason" align="center" label="投诉原因">
            <template slot-scope="scope">
              <el-tooltip class="item" effect="dark" :content="scope.row.complainReason" placement="top">
                <span class="overElipes">{{ scope.row.complainReason }}</span>
              </el-tooltip>
            </template>
          </el-table-column>
          <el-table-column prop="complainComment" align="center" label="投诉备注">
            <template slot-scope="scope">
              <el-tooltip class="item" effect="dark" :content="scope.row.complainComment" placement="top">
                <span class="overElipes">{{ scope.row.complainComment }}</span>
              </el-tooltip>
            </template>
          </el-table-column>
          <el-table-column prop="dealResultIn" align="center" label="处理意见(对内)">
            <template slot-scope="scope">
              <el-tooltip class="item" effect="dark" :content="scope.row.dealResultIn || '暂无'" placement="top">
                <span class="overElipes">{{ scope.row.dealResultIn || '暂无' }}</span>
              </el-tooltip>
            </template>
          </el-table-column>
          <el-table-column prop="dealComment" align="center" label="处理意见(对外)">
            <template slot-scope="scope">
              <el-tooltip class="item" effect="dark" :content="scope.row.dealComment || '暂无'" placement="top">
                <span class="overElipes">{{ scope.row.dealComment || '暂无' }}</span>
              </el-tooltip>
            </template>
          </el-table-column>
          <el-table-column prop="time" align="center" :label="activeName == '0' ? '申请时间' : activeName == '1' ? '受理时间' : '完成时间'">
          </el-table-column>
          <el-table-column v-if="activeName!='0'" prop="operateUserName" align="center" label="操作人">
            <template slot-scope="scope">
              <span>{{ scope.row.operateUserName || '未知' }}</span>
            </template>
          </el-table-column>
          <el-table-column align="center" label="操作">
            <template slot-scope="scope">
              <el-button @click="lookDetail(scope.row)" type="text" size="small">{{ activeName === '2' ? '查看' : '去处理' }}</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <noCont v-if="this.complainList.length===0"></noCont>
      <div class="pager" v-if="this.complainList.length!==0">
        <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="pageNo" :page-sizes="pageSizeArray" :page-size="pageSize" layout="total, sizes, prev, pager, next, jumper" :total="pageTotal">
        </el-pagination>
      </div>
    </div>
  </div>
</template>
<script type="text/ecmascript-6">
import { pageCommon } from '../../../assets/js/mixin'
import noCont from '../../../base/noCont/noCont'
export default {
  name: 'sellerComplain',
  mixins: [pageCommon],
  components: {
    noCont
  },
  data () {
    return {
      activeName: '0',
      complainList: [],
      phone: '',
      tableData: [{
        sellerPhone: '18655554444',
        complainReason: '八个字八个字',
        complainCommon: '八个字八个字',
        dealOptionIn: '--',
        dealOptionOut: '--',
        applyTime: '2017-11-17 19:20:56',
        operateMember: '疯狂到哈倒萨'
      }],
      apiUrl: '/api/platform/complain/getComplainListByStatusSellerPhone'
    }
  },
  computed: {
    params () {
      return {
        phone: this.phone,
        status: this.activeName,
        pageNo: this.pageNo,
        pageSize: this.pageSize
      }
    }
  },
  methods: {
    handleClick (tab, event) {
      this.getTask()
    },
    lookDetail (row) {
      this.$router.push({ name: 'sellerComplainDetail', query: { messageComplainId: row.messageComplainId } })
    },
    setList (data) {
      this.complainList = data
    }
  }
}
</script>
<style lang="stylus" rel="stylesheet/stylus" scoped>
.sellerComplain
  padding 20px
  .tab
    padding 20px
    background #ffffff
    .inp
      text-align right
      .search
        display inline-block
        max-width 300px
        .primary
          background #40B6FF
          color #ffffff
          border-color #40B6FF
          border-top-left-radius 0
          border-bottom-left-radius 0
          border 1px solid #40B6FF
    .overElipes
      display inline-block
      width 112px
      overflow hidden
      white-space nowrap
      text-overflow ellipsis
</style>