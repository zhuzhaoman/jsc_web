<template>
  <div class="real-time-flow-search-container">

    <div class="search">
      <el-select class="input" v-model="value" placeholder="请选择">
        <el-option
          v-for="item in options"
          :key="item.value"
          :label="item.label"
          :value="item.value">
        </el-option>
      </el-select>
      <el-input class="input"  v-model="content" placeholder="请输入内容" clearable></el-input>
      <el-button size="mini" type="primary">搜索</el-button>
    </div>

    <div class="table">
      <el-table
        :data="tableData"
        border
        style="width: 100%">
        <el-table-column
          prop="date"
          label="总包数"
          width="180">
        </el-table-column>
        <el-table-column
          prop="name"
          label="字节数"
          width="180">
        </el-table-column>
        <el-table-column
          prop="address"
          label="包速率">
        </el-table-column>
        <el-table-column
          prop="address"
          label="字节速度">
        </el-table-column>
        <el-table-column
          prop="address"
          label="丢包数">
        </el-table-column>
        <el-table-column
          prop="address"
          label="丢包率">
        </el-table-column>
        <el-table-column
          prop="address"
          label="错报数">
        </el-table-column>
        <el-table-column
          prop="address"
          label="错包率">
        </el-table-column>
        <el-table-column
          prop="address"
          label="总流量">
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
  export default {
    name: "port-flow-search",
    data() {
      return {
        options: [
          {
            value: '1',
            label: '按照板卡为单位'
          },
          {
            value: '2',
            label: '按照输出端口组为单位'
          },
          {
            value: '3',
            label: '按照输入端口组为单位'
          }
        ],
        value: '1',
        content: ''
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import "../../../styles/real-time-flow-search";
</style>
