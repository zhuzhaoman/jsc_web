<template>
  <div class="dashboard-container">
    <!--    <component :is="currentRole" />-->

    <!-- 异常信息 -->
    <div class="container-top">
      <div class="warning-group" @click="showWarning(1)">
        <div class="warning-group-left"  style="background: #67C23A;">
          <svg-icon icon-class="fan" class-name='warning-icon' />
        </div>
        <div class="warning-group-right">
          <count-to :start-val="0" :end-val="33" :duration="5000" class="count" />
          <div class="title">风扇异常</div>
        </div>
      </div>

      <div class="warning-group" @click="showWarning(2)">
        <div class="warning-group-left" style="background: #E6A23C">
          <svg-icon icon-class="power-supply"  class-name='warning-icon' />
        </div>
        <div class="warning-group-right">
          <count-to :start-val="0" :end-val="55" :duration="5000" class="count" />
          <div class="title">电源异常</div>
        </div>
      </div>

      <div class="warning-group" @click="showWarning(3)">
        <div class="warning-group-left" style="background: #F56C6C">
          <svg-icon icon-class="temperature"  class-name='warning-icon' />
        </div>
        <div class="warning-group-right">
          <count-to :start-val="0" :end-val="6" :duration="5000" class="count" />
          <div class="title">温度异常</div>
        </div>
      </div>

      <div class="warning-group" @click="showWarning(4)">
        <div class="warning-group-left" style="background: #409EFF">
          <svg-icon icon-class="card"  class-name='warning-icon' />
        </div>
        <div class="warning-group-right">
          <count-to :start-val="0" :end-val="13" :duration="5000" class="count" />
          <div class="title">板卡异常</div>
        </div>
      </div>

      <div class="warning-group" @click="showWarning(5)">
        <div class="warning-group-left" style="background: #2db7f5">
          <svg-icon icon-class="port"  class-name='warning-icon' />
        </div>
        <div class="warning-group-right">
          <count-to :start-val="0" :end-val="8" :duration="5000" class="count" />
          <div class="title">端口状态变化</div>
        </div>
      </div>

      <div class="warning-group" @click="showWarning(6)">
        <div class="warning-group-left" style="background: #543CCD">
          <svg-icon icon-class="port-error"  class-name='warning-icon' />
        </div>
        <div class="warning-group-right">
          <count-to :start-val="0" :end-val="6" :duration="5000" class="count" />
          <div class="title">端口错报</div>
        </div>
      </div>

      <div class="warning-group" @click="showWarning(7)">
        <div class="warning-group-left" style="background: #E1E410">
          <svg-icon icon-class="capacity"  class-name='warning-icon' />
        </div>
        <div class="warning-group-right">
          <count-to :start-val="0" :end-val="156" :duration="5000" class="count" />
          <div class="title">五元容量警告</div>
        </div>
      </div>
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
  import CountTo from 'vue-count-to'

  export default {
    name: 'Dashboard',
    components: { adminDashboard, editorDashboard, Chart, CountTo },
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
        searchDate: []
      }
    },
    computed: {
      ...mapGetters([
        'roles'
      ])
    },
    created() {
      if (!this.roles.includes('admin')) {
        this.currentRole = 'editorDashboard'
      }
    },
    methods: {
      showWarning(index) {
        console.log(index)
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
    }
  }
</script>
<style lang="scss" scoped>
  @import "../../styles/dashboard";
</style>
