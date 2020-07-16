<template>
  <div class="domain-search-container">

    <el-divider content-position="left">
      <span style="font-size: 16px;font-weight: bold;">域信息</span>
    </el-divider>

    <div class="domain-message">

      <div class="operator">
        <el-input class="input" v-model="domain" placeholder="请指定域类型" clearable></el-input>
        <el-input class="input"  v-model="domain_id" placeholder="请指定域ID" clearable></el-input>
        <el-button size="mini" type="primary" @click="show">立即查询</el-button>
      </div>

      <el-row class="domain">
        <el-col class="col" :span="8">
          <div class="label">域ID：</div>
          <div class="domain-id">{{showData.domainId}}</div>
        </el-col>

        <el-col class="col" :span="8">
          <div class="label">Property：</div>
          <div class="property">{{showData.property}}</div>
        </el-col>

        <el-col class="col" :span="8">
          <div class="label">描述：</div>
          <div class="description">{{showData.description}}</div>
        </el-col>
      </el-row>

      <div class="table">
        <el-table
          :data="showData.domainSlot"
          border
          style="width: 100%">
          <el-table-column
            prop="slotIndex"
            label="插槽索引"
            width="180">
          </el-table-column>
          <el-table-column label="槽工作状态">
            <template slot-scope="scope">
              <el-tag type="success">{{scope.row.slotWorkStatus}}</el-tag>
            </template>
          </el-table-column>
          <el-table-column
            prop="slotType"
            label="槽位类型">
          </el-table-column>
          <el-table-column
            prop="slotDecr"
            label="槽位描述">
          </el-table-column>
          <el-table-column
            prop="slotVersionMsg"
            label="槽位版本信息">
          </el-table-column>
        </el-table>
      </div>

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
        showData: {
          domainId: '暂无数据',
          property: '暂无数据',
          description: '暂无数据',
          domainSlot: []
        }
      }
    },
    mounted() {

    },
    methods: {
      show() {
        this.showData = {
          domainId: 1,
          property: 'Operator',
          description: '这是描述信息',
          domainSlot: [
            {
              slotIndex: 1,
              slotWorkStatus: 'Ready',
              slotType: 'NGP-PPB3320',
              slotDecr: '',
              SlotVersionMsg: ''
            },
            {
              slotIndex: 2,
              slotWorkStatus: 'Ready',
              slotType: 'NGP-PPB3320',
              slotDecr: '',
              SlotVersionMsg: ''
            }
          ]
        }
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import "../../styles/domain-search";
</style>
