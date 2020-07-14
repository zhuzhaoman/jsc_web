<template>
  <div class="domain-search-container">
    <div class="search">
      <el-input class="input" v-model="domain" placeholder="请指定域类型" clearable></el-input>
      <el-input class="input"  v-model="domain_id" placeholder="请指定域ID" clearable></el-input>
      <el-button size="small" type="primary">搜索</el-button>
    </div>

    <div class="table">
      <el-table
        :data="tableData"
        border
        style="width: 100%">
        <el-table-column
          prop="date"
          label="槽位类型"
          width="180">
        </el-table-column>
        <el-table-column
          prop="name"
          label="板卡类型"
          width="180">
        </el-table-column>
        <el-table-column
          prop="address"
          label="后IO卡类型">
        </el-table-column>
        <el-table-column
          prop="address"
          label="光接口卡类型">
        </el-table-column>
        <el-table-column
          prop="address"
          label="温度">
        </el-table-column>
        <el-table-column
          prop="address"
          label="板卡运行状态">
        </el-table-column>
        <el-table-column
          prop="address"
          label="采集时间">
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
        tableData: []
      }
    },
    mounted() {

    },
    methods: {
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
