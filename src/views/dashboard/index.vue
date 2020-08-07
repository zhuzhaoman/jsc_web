<template>
  <div class="dashboard-container">
    <!-- <component :is="currentRole" /> -->

    <!-- 异常信息 -->
    <div class="container-top">
      <warning-group style="width: 14%" :flag="1" :not-view="notViewList[0]" background-color="#67C23A" icon-class="fan" :start-value="0" :end-value="errorNumList[0]" title="风扇异常" />
      <warning-group style="width: 14%" :flag="2" :not-view="notViewList[1]" background-color="#E6A23C" icon-class="power-supply" :start-value="0" :end-value="errorNumList[1]" title="电源异常" />
      <warning-group style="width: 14%" :flag="3" :not-view="notViewList[2]" background-color="#F56C6C" icon-class="temperature" :start-value="0" :end-value="errorNumList[2]" title="温度异常" />
      <warning-group style="width: 14%" :flag="4" :not-view="notViewList[3]" background-color="#409EFF" icon-class="card" :start-value="0" :end-value="errorNumList[3]" title="板卡异常" />
      <warning-group style="width: 14%" :flag="5" :not-view="notViewList[4]" background-color="#2db7f5" icon-class="port" :start-value="0" :end-value="errorNumList[4]" title="端口状态变化" />
      <warning-group style="width: 14%" :flag="6" :not-view="notViewList[5]" background-color="#543CCD" icon-class="port-error" :start-value="0" :end-value="errorNumList[5]" title="端口异常" />
    </div>

    <!-- 主体位置 -->
    <div class="container-body">
      <chart height="100%" width="100%" />
    </div>

    <el-dialog
      title="异常信息"
      :visible.sync="dialogVisible"
      :before-close="handleClose"
      width="50%"
    >

      <div v-if="showErrorIndex === 3" class="block">
        <label>温度阈值(℃)：</label>
        <el-input
          class="input"
          placeholder="请输入内容"
          :disabled="true"
        />
        <el-button size="small" type="primary" @click="open1">修改阈值</el-button>
      </div>

      <div v-if="showErrorIndex === 4" class="block">
        <label>CPU使用率告警值(%)：</label>
        <el-input
          class="input"
          placeholder="请输入内容"
          :disabled="true"
        />
        <el-button size="small" type="primary" @click="open1">修改阈值</el-button>

        <label style="margin-left: 20px;">内存使用率告警值：(%)：</label>
        <el-input
          class="input"
          placeholder="请输入内容"
          :disabled="true"
        />
        <el-button size="small" type="primary" @click="open1">修改阈值</el-button>
      </div>

      <div v-if="showErrorIndex === 6" class="block">
        <label>丢包率(10^-6)：</label>
        <el-input
          class="input"
          placeholder="请输入内容"
          :disabled="true"
        />
        <el-button size="small" type="primary" @click="open1">修改阈值</el-button>

        <label style="margin-left: 20px;">错包率：(10^-6)：</label>
        <el-input
          class="input"
          placeholder="请输入内容"
          :disabled="true"
        />
        <el-button size="small" type="primary" @click="open1">修改阈值</el-button>
      </div>

      <div class="block">
        <el-date-picker
          v-model="searchDate"
          type="daterange"
          align="right"
          unlink-panels
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
          :picker-options="pickerOptions"
        />
        <el-button
          type="primary"
          size="small"
          style="margin-left: 5px;"
          @click="searchWarning"
        >
          搜索
        </el-button>
        <el-button
          type="danger"
          size="small"
          style="margin-left: 5px;"
          @click="cleanErrorMsg"
        >
          清除全部异常信息
        </el-button>
      </div>

      <el-table
        :data="warningList"
        border
        v-loading="loading"
        style="width: 100%"
      >
        <el-table-column
          prop="title"
          label="异常名称"
        />
        <el-table-column
          prop="content"
          label="异常内容"
        />
        <el-table-column
          prop="createTime"
          label="上报时间"
          :formatter="dateFormat"
        />
      </el-table>

      <el-pagination
        style="margin-top: 20px;"
        background
        layout="prev, pager, next"
        :total="total"
        :page-size="5"
        :current-page.sync="currentPage"
        @current-change="handleCurrentChange"
      />

      <span slot="footer" class="dialog-footer">
        <el-button @click="handleClose">取 消</el-button>
        <el-button type="primary" @click="handleClose">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
  import { mapGetters } from 'vuex'
  import adminDashboard from './admin'
  import editorDashboard from './editor'
  import Chart from '../../components/Charts/LineMarker'
  import WarningGroup from '../../components/Custom/WarningGroup'
  import SockJS from 'sockjs-client'
  import Stomp from 'stompjs'
  import { getErrorsCount, readErrors, getErrorsList, cleanErrorsByCategory } from '../../api/dashboard'
  import moment from 'moment'
  let socket;
  export default {
    name: 'Dashboard',
    components: { adminDashboard, editorDashboard, Chart, WarningGroup },
    data() {
      return {
        currentRole: 'adminDashboard',
        warningList: [],
        dialogVisible: false,
        pickerOptions: {
          shortcuts: [
            {
              text: '最近一周',
              onClick(picker) {
                const end = new Date();
                const start = new Date();
                start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
                picker.$emit('pick', [start, end])
              }
            },
            {
              text: '最近一个月',
              onClick(picker) {
                const end = new Date();
                const start = new Date();
                start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
                picker.$emit('pick', [start, end])
              }
            },
            {
              text: '最近三个月',
              onClick(picker) {
                const end = new Date();
                const start = new Date();
                start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
                picker.$emit('pick', [start, end])
              }
            }]
        },
        searchDate: null,
        showErrorIndex: 1,
        temperatureValue: 60,
        currentPage: 0,
        total: 0,
        loading: true,
        notViewList: [null, null, null, null, null, null],
        errorNumList: [0, 0, 0, 0, 0, 0]

      }
    },
    mounted() {
      this._getErrorsCount()
    },
    created() {
      let stompClient = null;
      const that = this;

      // 建立连接对象
      socket = new SockJS('http://localhost:8080/websocket');
      // 获取STOMP子协议的客户端对象
      stompClient = Stomp.over(socket);

      // 向服务器发送websocket连接并发送CONNECT帧
      stompClient.connect({}, function(frame) {
        // 指定订阅
        stompClient.subscribe('/user/admin/error', function(res) {
          const category = data.data.category - 1;

          const notViewList = that.notViewList;
          const notView = notViewList[category] + 1;
          notViewList.splice(category, 1, notView);

          const errorNumList = that.errorNumList;
          const errorNum = errorNumList[category] + 1;
          errorNumList.splice(category, 1, errorNum);

          that.notViewList = notViewList;
          that.errorNumList = errorNumList
        })
      })
    },
    beforeDestroy() {
      socket.close()
    },
    methods: {
      /**
       * 显示异常信息
       */
      showWarning(flag) {

        // 获取当前显示异常分类的标识
        this.showErrorIndex = flag;

        /**
         * 将未读信息变为已读信息
         */
        const notViewList = this.notViewList;
        notViewList.splice(flag - 1, 1, 0);

        // 将未读信息变为已读信息
        readErrors(flag).then(res => {
        })

        // 显示弹出层
        this.dialogVisible = true;
        // 获取数据
        this._getErrorsList(0, flag)
      },

      /**
       * 根据时间范围搜索异常信息
       */
      searchWarning() {
        this._getErrorsList(0, this.showErrorIndex)
      },

      /**
       * 清除历史异常信息
       */
      cleanErrorMsg() {
        this.$confirm('此操作将永久删除异常记录, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          // 删除异常信息
          cleanErrorsByCategory(this.showErrorIndex).then(res => {
            this.$message({
              type: 'success',
              message: '删除成功!'
            })

            // 刷新数据
            this._getErrorsList(0, this.showErrorIndex)
            // 刷新异常信息条数
            this._getErrorsCount()
          })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          })
        })
      },

      /**
       * 获取异常信息条数
       */
      _getErrorsCount() {
        getErrorsCount().then(res => {
          const data = res.data;
          const notViewList = [];
          const errorNumList = [];

          data.forEach((item, index) => {
            notViewList.push(item.notLook);
            errorNumList.push(item.count)
          });

          this.notViewList = notViewList;
          this.errorNumList = errorNumList
        })
      },

      /**
       * 获取异常信息（分页）
       * @param page
       * @param category
       * @private
       */
      _getErrorsList(page, category) {
        let searchDate = this.searchDate
        let date = searchDate === null ? [] : searchDate

        getErrorsList({page: page, size: 5, category: category, startTime: date[0], endTime: date[1]}).then(res => {
          let data = res.data
          this.warningList = data.list
          this.total = data.total
          this.loading = false
        })
      },

      /**
       * 选择第几页显示
       * @param page
       */
      handleCurrentChange(page) {
        this._getErrorsList(page - 1, this.showErrorIndex)
      },

      /**
       * 弹出层关闭
       */
      handleClose() {
        this.currentPage = 0
        this.dialogVisible = false
        this.searchDate = null
        this.loading = true
      },

      /**
       * 日期处理
       * @param row
       * @param column
       * @returns {string}
       */
      dateFormat(row,column){
        let date = row[column.property];
        if(date === undefined){
          return ''
        }
        return moment(date).format("YYYY-MM-DD HH:mm:ss")
      }
    }
  }
</script>
<style lang="scss" scoped>
  @import "../../styles/dashboard";
</style>
