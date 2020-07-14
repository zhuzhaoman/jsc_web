<template>
  <div class="domain-search-container">
    <div class="search">
      <el-input class="input" v-model="domain" placeholder="请指定域类型" clearable></el-input>
      <el-input class="input"  v-model="domain_id" placeholder="请指定域ID" clearable></el-input>
      <el-button type="primary">查找</el-button>
    </div>

    <div class="table">
      <el-table
        :data="tableData"
        border
        style="width: 100%">
        <el-table-column
          prop="date"
          label="日期"
          width="180">
        </el-table-column>
        <el-table-column
          prop="name"
          label="姓名"
          width="180">
        </el-table-column>
        <el-table-column
          prop="address"
          label="地址">
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
  export default {
    name: "index",
    data() {
      return {
        domain: '',
        domain_id: '',
        tableData: [{
          date: '2016-05-02',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          date: '2016-05-04',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1517 弄'
        }, {
          date: '2016-05-01',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1519 弄'
        }, {
          date: '2016-05-03',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1516 弄'
        }]
      }
    },
    mounted() {

    },
    methods: {
      open() {
        this.$prompt('请输入邮箱', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          inputPattern: /[\w!#$%&'*+/=?^_`{|}~-]+(?:\.[\w!#$%&'*+/=?^_`{|}~-]+)*@(?:[\w](?:[\w-]*[\w])?\.)+[\w](?:[\w-]*[\w])?/,
          inputErrorMessage: '邮箱格式不正确'
        }).then(({ value }) => {
          this.$message({
            type: 'success',
            message: '你的邮箱是: ' + value
          });
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '取消输入'
          });
        });
      }
    }
  }
</script>

<style lang="scss" scoped>
  .domain-search-container:hover {
    box-shadow: 0 1px 6px rgba(0,0,0,.25);
    border-color: #eee;
  }
  .domain-search-container {
    height: 100%;
    margin: 20px;
    padding: 20px;
    border-radius: 4px;
    border:1px solid #DCDFE6;

    .search {
      display: flex;
      justify-content: flex-start;

      .input {
        width: 200px;
        margin-right: 20px;
      }
    }

    .table {
      margin-top: 10px;
    }

  }
</style>
