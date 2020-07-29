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
      width="50%"
      :before-close="handleClose">

      <div class="block" v-if="showErrorIndex === 3">
        <label>温度阈值(℃)：</label>
        <el-input
          class="input"
          placeholder="请输入内容"
          :disabled="true">
        </el-input>
        <el-button size="small" type="primary" @click="open1">修改阈值</el-button>
      </div>

      <div class="block" v-if="showErrorIndex === 4">
        <label>CPU使用率告警值(%)：</label>
        <el-input
          class="input"
          placeholder="请输入内容"
          :disabled="true">
        </el-input>
        <el-button size="small" type="primary" @click="open1">修改阈值</el-button>

        <label style="margin-left: 20px;">内存使用率告警值：(%)：</label>
        <el-input
          class="input"
          placeholder="请输入内容"
          :disabled="true">
        </el-input>
        <el-button size="small" type="primary" @click="open1">修改阈值</el-button>
      </div>

      <div class="block" v-if="showErrorIndex === 6">
        <label>丢包率(10^-6)：</label>
        <el-input
          class="input"
          placeholder="请输入内容"
          :disabled="true">
        </el-input>
        <el-button size="small" type="primary" @click="open1">修改阈值</el-button>

        <label style="margin-left: 20px;">错包率：(10^-6)：</label>
        <el-input
          class="input"
          placeholder="请输入内容"
          :disabled="true">
        </el-input>
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
          :picker-options="pickerOptions">
        </el-date-picker>
        <el-button
          type="primary"
          size="small"
          style="margin-left: 5px;"
          @click="searchWarning">
          搜索
        </el-button>
        <el-button
          type="danger"
          size="small"
          style="margin-left: 5px;"
          @click="cleanErrorMsg">
          清除全部异常信息
        </el-button>
      </div>

      <el-table
        :data="warningList"
        border
        style="width: 100%">
        <el-table-column
          prop="id"
          label="ID"
          width="100">
        </el-table-column>
        <el-table-column
          prop="title"
          label="异常名称">
        </el-table-column>
        <el-table-column
          prop="message"
          label="异常内容">
        </el-table-column>
        <el-table-column
          prop="date"
          label="上报时间">
        </el-table-column>
      </el-table>

      <el-pagination style="margin-top: 20px;"
                     background
                     layout="prev, pager, next"
                     :total="100">
      </el-pagination>

      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
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
  import SockJS from "sockjs-client";
  import Stomp from "stompjs";
  import { getErrorCount } from '../../api/dashboard'
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
                picker.$emit('pick', [start, end]);
              }
            },
            {
              text: '最近一个月',
              onClick(picker) {
                const end = new Date();
                const start = new Date();
                start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
                picker.$emit('pick', [start, end]);
              }
            },
            {
              text: '最近三个月',
              onClick(picker) {
                const end = new Date();
                const start = new Date();
                start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
                picker.$emit('pick', [start, end]);
              }
            }]
        },
        searchDate: [],
        showErrorIndex: 1,
        temperatureValue: 60,
        notViewList: [null, null, null, null, null, null],
        errorNumList: [0, 0, 0, 0, 0, 0],

      }
    },
    mounted() {
      getErrorCount().then(res => {
        let data = res.data
        let notViewList = []
        let errorNumList = []

        data.forEach((item, index) => {
          notViewList.push(item.notLook)
          errorNumList.push(item.count)
        })

        this.notViewList = notViewList
        this.errorNumList = errorNumList
      })
    },
    created() {

      let stompClient = null;
      let that = this;

      // 建立连接对象
      socket= new SockJS ('http://localhost:8080/websocket');
      // 获取STOMP子协议的客户端对象
      stompClient = Stomp.over(socket);

      // 向服务器发送websocket连接并发送CONNECT帧
      stompClient.connect ({}, function (frame) {

        // 指定订阅
        stompClient.subscribe('/user/admin/error', function (res) {
          let data = JSON.parse(res.body)
          console.log("====接收到指定订阅(/user/admin/error)返回的数据====")
          console.log(data)
          let category = data.data.category -1

          let notViewList = that.notViewList
          let notView = notViewList[category] + 1
          notViewList.splice(category, 1, notView)


          let errorNumList = that.errorNumList
          let errorNum = errorNumList[category] + 1
          errorNumList.splice(category, 1, errorNum)

          that.notViewList = notViewList
          that.errorNumList = errorNumList
        })
      });
    },
    methods: {
      showWarning(flag) {
        this.showErrorIndex = flag

        let notViewList = this.notViewList
        let notView = notViewList[flag - 1] + 1
        notViewList.splice(flag - 1, 1, null)

        this.dialogVisible = true
        this.warningList = [
          {
            id: 1,
            title: '风扇异常',
            message: 'The fan stops running',
            date: '2020/07/23 11:11:11'
          }
        ]
      },
      searchWarning() {
        let date = this.searchDate
        console.log(date)
        console.log(typeof date)
      },
      cleanErrorMsg() {
        this.$confirm('此操作将永久删除异常记录, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$message({
            type: 'success',
            message: '删除成功!'
          });
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });
        });
      }
    },
    beforeDestroy() {
      socket.close()
    }
  }
</script>
<style lang="scss" scoped>
  @import "../../styles/dashboard";
</style>
