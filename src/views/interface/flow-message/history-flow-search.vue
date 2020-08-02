<template>
  <div class="history-flow-search-container">

    <div class="operation">
      <label>历史流量存储周期(天)：</label>
      <el-input
        v-model="flowCycle.cycle"
        class="input"
        placeholder="请输入内容"
        :disabled="true"
      />
      <el-button size="small" type="primary" @click="onUpdateCycle">修改存储周期</el-button>
      <el-button size="small" type="danger" @click="open">清空历史流量</el-button>
    </div>

    <!-- 主体位置 -->
    <div class="container-body">
      <chart height="100%" width="100%" />
    </div>

  </div>
</template>

<script>
import Chart from '../../../components/Charts/LineMarker'
import { getCycle, updateCycle } from '../../../api/flow-message'
export default {
  name: 'HistoryFlowSearch',
  components: { Chart },
  data() {
    return {
      flowCycle: { id: 1, cycle: 90 }
    }
  },
  mounted() {
    getCycle().then(res => {
      const data = res.data;
      this.flowCycle = data
    })
  },
  methods: {
    open() {
      this.$confirm('此操作将永久清除现有历史流量信息, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$message({
          type: 'success',
          message: '删除成功!'
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    },
    onUpdateCycle() {
      this.$prompt('请输入历史流量存储周期', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        inputPattern: /^(?:[1-8][0-9]?|90)$/,
        inputErrorMessage: '请输入1-90的数字'
      }).then(({ value }) => {
        const flowCycle = this.flowCycle;

        updateCycle({ username: 'root', password: 'password' }).then(res => {
          this.flowCycle.cycle = value;
          this.$message({
            type: 'success',
            message: '修改成功'
          })
        })
      })
    }
  }
}
</script>

<style lang="scss" scoped>
  @import "../../../styles/history-flow-search";
</style>
