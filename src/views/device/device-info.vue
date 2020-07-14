<template>
  <div class="device-info-container">

    <el-divider content-position="left">
      <span style="font-size: 16px;font-weight: bold;">基本信息</span>
    </el-divider>
    <div class="basic-message">

      <div class="operation">
        <el-button type="primary" size="small" plain>刷新数据</el-button>
        <el-button type="success" size="small" plain>查看历史数据</el-button>
      </div>

      <el-row>
        <el-col :span="12">
          <div class="col">
            <div class="label">设备IP：</div>
            <el-tag class="ip">192.168.17.114</el-tag>
          </div>
        </el-col>
        <el-col :span="12">
          <div class="col">
            <div class="label">端口(异常数)：</div>
            <el-tag class="port" type="danger">4</el-tag>
          </div>
        </el-col>
      </el-row>

      <el-row style="margin-top: 30px;">
        <el-col :span="12">
          <div class="col">
            <div class="label">电源状态：</div>
            <el-tag class="power-supply" type="success">正常</el-tag>
          </div>
        </el-col>
        <el-col :span="12">
          <div class="col">
            <div class="label">风扇状态：</div>
            <el-tag class="fan" type="success">正常</el-tag>
          </div>
        </el-col>
      </el-row>

      <el-row style="margin-top: 30px;">
        <el-col :span="12">
          <div class="col">
            <div class="label">机箱类型：</div>
            <el-tag class="case-type">16U</el-tag>
          </div>
        </el-col>
        <el-col :span="12">
          <div class="col">
            <div class="label">软件版本：</div>
            <el-tag class="software-version">3.6.4</el-tag>
          </div>
        </el-col>
      </el-row>

      <el-row style="margin-top: 30px;">
        <el-col :span="12">
          <div class="col">
            <div class="label">启动时间：</div>
            <div class="start-time">
              <svg-icon icon-class="date" class-name='date-icon' />
              2020/07/11 11:11:12
            </div>
          </div>
        </el-col>
        <el-col :span="12">
          <div class="col">
            <div class="label">采集时间：</div>
            <div class="collection-time">
              <svg-icon icon-class="date" class-name='date-icon' />
              2020/07/21 16:11:12
            </div>
          </div>
        </el-col>
      </el-row>
    </div>

    <el-divider content-position="left">
      <span style="font-size: 16px;font-weight: bold;">板卡信息</span>
    </el-divider>
    <div class="card-message">

      <div class="operation">
        <el-button type="primary" size="small" plain>刷新数据</el-button>
        <el-button type="success" size="small" plain>查看历史数据</el-button>
      </div>

      <el-row>
        <el-col :span="12">
          <div class="col">
            <div class="label">板卡类型：</div>
            <div class="card-type">
              <el-tag>ABC-13fdsa-DFA</el-tag>
            </div>
          </div>
        </el-col>
        <el-col :span="12">
          <div class="col">
            <div class="label">温度：</div>
            <el-tag class="temperature" type="danger">58℃</el-tag>
          </div>
        </el-col>
      </el-row>

      <el-row style="margin-top: 30px;">
        <el-col :span="12">
          <div class="col">
            <div class="label">后IO卡类型：</div>
            <el-tag class="io-type">TTT-fdafdsa-DFA</el-tag>
          </div>
        </el-col>
        <el-col :span="12">
          <div class="col">
            <div class="label">板卡运行状态：</div>
            <div class="card-status">
              <el-tag type="success">正常</el-tag>
            </div>
          </div>
        </el-col>
      </el-row>

      <el-row style="margin-top: 30px;">
        <el-col :span="12">
          <div class="col">
            <div class="label">光接口卡类型：</div>
            <el-tag class="light-port-type">FDAJLK-13DFADFSA</el-tag>
          </div>
        </el-col>
        <el-col :span="12">
          <div class="col">
            <div class="label">采集时间：</div>
            <div class="collection-time">
              <svg-icon icon-class="date" class-name='date-icon' />
              2020/07/11 11:11:12
            </div>
          </div>
        </el-col>
      </el-row>

    </div>

    <el-divider content-position="left">
      <span style="font-size: 16px;font-weight: bold;">CPU内存信息</span>
    </el-divider>
    <div class="cpu-message">

      <div class="operation">
        <el-button type="primary" size="small" plain>刷新数据</el-button>
        <el-button type="success" size="small" plain>查看历史数据</el-button>
      </div>

      <el-row>
        <el-col :span="24">
          <div class="col">
            <div class="block" style="width: 100%;margin-bottom: 10px;">
              <div class="label" style="margin-bottom: 5px">cpu利用率：</div>
              <el-progress :text-inside="true" :stroke-width="15" :percentage="70" status="exception"></el-progress>
            </div>
          </div>
        </el-col>
      </el-row>

      <el-row>
        <el-col :span="24">
          <div class="col">
            <div class="block" style="width: 100%;margin-bottom: 10px;">
              <div class="label" style="margin-bottom: 5px">内存利用率：</div>
              <el-progress :text-inside="true" :stroke-width="15" :percentage="26"></el-progress>
            </div>
          </div>
        </el-col>
      </el-row>

      <el-row style="margin-top: 30px;">
        <el-col :span="24">
          <div class="col">
            <div class="label">采集时间：</div>
            <div class="collection-time">
              <svg-icon icon-class="date" class-name='date-icon' />
              2020/07/11 11:11:12
            </div>
          </div>
        </el-col>
      </el-row>
    </div>

  </div>
</template>

<script>
  export default {
    name: "index"
  }
</script>

<style lang="scss" scoped>
  @import "../../styles/device-info";
</style>
