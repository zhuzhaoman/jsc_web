<template>
  <div class="device-info-container">

    <el-divider content-position="left">
      <span style="font-size: 16px;font-weight: bold;">基本信息</span>
    </el-divider>
    <div class="basic-message">

      <div class="operation">
        <el-button type="primary" size="mini" plain>刷新数据</el-button>
      </div>

      <el-row>
        <el-col :span="12">
          <div class="col">
            <div class="label">设备ID：</div>
            <el-tag class="equ-id">1</el-tag>
          </div>
        </el-col>
        <el-col :span="12">
          <div class="col">
            <div class="label">设备名称：</div>
            <el-tag class="equ-name">3320</el-tag>
          </div>
        </el-col>
      </el-row>

      <el-row class="row">
        <el-col :span="12">
          <div class="col">
            <div class="label">设备类型：</div>
            <el-tag class="equ-type" >BOX</el-tag>
          </div>
        </el-col>
        <el-col :span="12">
          <div class="col">
            <div class="label">软件版本：</div>
            <el-tag class="software-version">main_version=v3.0.0</el-tag>
          </div>
        </el-col>
      </el-row>

      <el-row class="row">
        <el-col :span="12">
          <div class="col">
            <div class="label">正常风扇数：</div>
            <el-tag class="normal-fan-num">0</el-tag>
          </div>
        </el-col>
        <el-col :span="12">
          <div class="col">
            <div class="label">正常功率：</div>
            <el-tag class="normal-power-num">0</el-tag>
          </div>
        </el-col>
      </el-row>

      <el-row class="row">
        <el-col :span="12">
          <div class="col">
            <div class="label">最大内存：</div>
            <el-tag class="max-memory">3877【MB】</el-tag>
          </div>
        </el-col>
        <el-col :span="12">
          <div class="col">
            <div class="label">已运行：</div>
            <el-tag class="run-time" type="success">1days 19hours 1mins</el-tag>
          </div>
        </el-col>
      </el-row>

      <el-row class="row">
        <el-col :span="12">
          <div class="col">
            <div class="label">系统时间：</div>
            <div class="system-time">
              <svg-icon icon-class="date" class-name='date-icon' />
              2020-07-15 10:15:23
            </div>
          </div>
        </el-col>
      </el-row>

      <el-row class="row">
        <el-col :span="24">
          <div class="col">
            <div class="block" style="width: 100%;margin-bottom: 10px;">
              <div class="label" style="margin-bottom: 5px">cpu利用率：</div>
              <el-progress :text-inside="true" :stroke-width="15" :percentage="18" status="success"></el-progress>
            </div>
          </div>
        </el-col>
      </el-row>

      <el-row class="row">
        <el-col :span="24">
          <div class="col">
            <div class="block" style="width: 100%;margin-bottom: 10px;">
              <div class="label" style="margin-bottom: 5px">内存使用率：</div>
              <el-progress :text-inside="true" :stroke-width="15" :percentage="60" status="warning"></el-progress>
            </div>
          </div>
        </el-col>
      </el-row>
    </div>

    <el-divider content-position="left">
      <span style="font-size: 16px;font-weight: bold;">槽位信息</span>
    </el-divider>
    <div class="slot-message">
      <el-row>
        <el-col :span="24">
          <template>
            <el-table
              :data="tableData"
              stripe
              style="width: 100%">
              <el-table-column
                prop="slot"
                label="槽位"
                width="180">
              </el-table-column>
              <el-table-column
                prop="cardType"
                label="板卡类型">
              </el-table-column>
              <el-table-column
                prop="cardRoleType"
                label="板卡角色类型">
              </el-table-column>
              <el-table-column label="运行状态">
                <template slot-scope="scope">
                  <el-tag type="success">{{scope.row.runStatus}}</el-tag>
                </template>
              </el-table-column>
            </el-table>
          </template>
        </el-col>
      </el-row>

    </div>
  </div>
</template>

<script>
  export default {
    name: "index",
    data() {
      return {
        tableData: [
          {
            slot: 'slot[1]',
            cardType: 'NGP_PPB3320',
            cardRoleType: 'DOUBLE_NPS_TYPE',
            runStatus: 'Ready'
          },
          {
            slot: 'slot[2]',
            cardType: 'NGP_PPB3320',
            cardRoleType: 'DOUBLE_NPS_TYPE',
            runStatus: 'Ready'
          }
        ]
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import "../../styles/device-info";
</style>
