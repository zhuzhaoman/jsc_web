<template>
  <div class="history-flow-search-container">

    <div class="operation">
      <label>历史流量存储周期(天)：</label>
      <el-input
        class="input"
        placeholder="请输入内容"
        v-model="flowValue"
        :disabled="true">
      </el-input>
      <el-button size="small" type="primary" @click="open1">修改存储周期</el-button>
      <el-button size="small" type="danger" @click="open">清空历史流量</el-button>
    </div>

    <!-- 主体位置 -->
    <div class="container-body">
      <chart height="100%" width="100%" />
    </div>

  </div>
</template>

<script>
  import Chart from '../../../components/Charts/MixChart'
  export default {
    name: "history-flow-search",
    components: { Chart },
    data() {
      return {
        flowValue: 90
      }
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
          });
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });
        });
      },
      open1() {
        this.$prompt('请输入历史流量存储周期', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          inputPattern: /^(?:[1-8][0-9]?|90)$/,
          inputErrorMessage: '请输入1-90的数字'
        }).then(({ value }) => {
          this.flowValue = value
          this.$message({
            type: 'success',
            message: '修改成功'
          });
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '取消修改'
          });
        });
      }
    }
  }
</script>

<style lang="scss" scoped>
  .history-flow-search-container {
    height: 100%;
    margin: 20px;

    .operation {
      display: flex;
      justify-content: flex-start;
      align-items: center;
      padding: 10px 20px;
      border-radius: 4px;
      border:1px solid #DCDFE6;

      .input {
        width: 50px;
        margin-right: 20px;
      }

      button {
        margin-right: 10px;
      }
    }

    .container-body {
      position: relative;
      width: 100%;
      height: calc(100vh - 185px);
    }

  }
</style>
