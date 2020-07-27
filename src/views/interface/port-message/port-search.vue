<template>
  <div class="port-search-container">

    <el-divider content-position="left">
      <span style="font-size: 16px;font-weight: bold;">端口状态</span>
    </el-divider>
    <div class="port-status">

      <div class="operation">
        <el-select class="select" v-model="value" placeholder="请选择">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
        <el-button class="button1" type="primary" size="mini">立即查询</el-button>
        <el-button class="button2" type="success" size="mini">刷新端口状态</el-button>
      </div>

<!--      <Image1 :q1_col="Q1_col" :q1_row="Q1_row" :s_col="S_col" :s_row="S_row" :q2_col="Q1_col" :q2_row="Q1_row" />-->
<!--      <br>-->
<!--      <br>-->
      <Image2 :q1_col="Q1_col" :q1_row="Q1_row" :s_col="S_col" :s_row="S_row" :q2_col="Q1_col" :q2_row="Q1_row"></Image2>


    </div>

  </div>
</template>

<script>
  import Image1 from '../../../components/Custom/DeviceImages/image1'
  import Image2 from '../../../components/Custom/DeviceImages/image2'
  export default {
    name: 'PortSearch',
    components: { Image1,  Image2},
    data() {
      return {
        Q1_row: [1, 2, 3],
        Q1_col: [1, 2, 3, 4],
        S_row: [1, 2, 3],
        S_col: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
        options: [
          {
            value: '1',
            label: '槽位1'
          },
          {
            value: '2',
            label: '槽位2'
          }
        ],
        value: '1'
      }
    },
    mounted() {

    }
  }
</script>

<style lang="scss" scoped>
  @import "../../../styles/port-search";
</style>
