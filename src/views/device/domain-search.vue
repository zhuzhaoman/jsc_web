<template>
  <div class="domain-search-container">

    <el-divider content-position="left">
      <span style="font-size: 16px;font-weight: bold;">域信息</span>
    </el-divider>

    <div class="domain-message">

      <div class="operator">
        <el-cascader
          v-model="domainValue"
          :options="domain"
          :props="{ expandTrigger: 'hover' }">
        </el-cascader>
        <el-button size="mini" type="primary" @click="show">立即查询</el-button>
      </div>

      <el-row class="domain">
        <el-col class="col" :span="8">
          <div class="label">域ID：</div>
          <div class="domain-id">{{showData.domainId}}</div>
        </el-col>

        <el-col class="col" :span="8">
          <div class="label">域类型：</div>
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
        domainValue: [],
        domain: [
          {
            value: 'operator',
            label: 'operator',
            children: [
              {
                value: 1,
                label: 1
              },
              {
                value: 2,
                label: 2
              },
              {
                value: 3,
                label: 3
              }
            ]
          }
        ],
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
            },
            {
              slotIndex: 2,
              slotWorkStatus: 'Ready',
              slotType: 'NGP-PPB3320',
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
