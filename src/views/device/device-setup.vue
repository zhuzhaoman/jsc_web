<template>
  <div class="device-setup-container">

    <el-divider content-position="left">
      <span style="font-size: 16px;font-weight: bold;">警告值设置</span>
    </el-divider>
    <div class="device-setup">

      <el-row class="row">
        <el-col class="col" :span="24">
          <div class="label">CPU使用率告警值：</div>
          <div class="block">
            <el-slider
              v-model="cpuValue"
              :marks="cpuMarks">
            </el-slider>
          </div>
          <el-button size="mini" type="primary" >修改CPU告警值</el-button>
        </el-col>
      </el-row>

      <el-row class="row">
        <el-col class="col" :span="24">
          <div class="label">内存使用率告警值：</div>
          <div class="block">
            <el-slider
              v-model="memoryValue"
              :marks="memoryMarks">
            </el-slider>
          </div>
          <el-button size="mini" type="primary">修改内存告警值</el-button>
        </el-col>
      </el-row>

      <el-row class="row">
        <el-col class="col" :span="24">
          <div class="label">温度告警值：</div>
          <div class="block">
            <el-slider
              v-model="temperature"
              :marks="temperatureMarks">
            </el-slider>
          </div>
          <el-button size="mini" type="primary">修改温度告警值</el-button>
        </el-col>
      </el-row>
    </div>

  </div>
</template>

<script>
  export default {
    name: "device-setup",
    data() {
      return {
        cpuValue: 80,
        cpuMarks: {
          0: '0%',
          50: {
            style: {
              color: '#67C23A',
            },
            label: this.$createElement('strong', '40%')
          },
          70: {
            style: {
              color: '#E6A23C'
            },
            label: this.$createElement('strong', '70%')
          },
          80: {
            style: {
              color: '#F56C6C',
            },
            label: this.$createElement('strong', '80%')
          },
          90: {
            style: {
              color: 'red',
            },
            label: this.$createElement('strong', '90%')
          }
        },
        memoryValue: 70,
        memoryMarks: {
          0: '0%',
          50: {
            style: {
              color: '#67C23A',
            },
            label: this.$createElement('strong', '40%')
          },
          70: {
            style: {
              color: '#E6A23C'
            },
            label: this.$createElement('strong', '70%')
          },
          80: {
            style: {
              color: '#F56C6C',
            },
            label: this.$createElement('strong', '80%')
          },
        },
        temperature: 60,
        temperatureMarks: {
          0: '0°C',
          40: {
            style: {
              color: '#67C23A',
            },
            label: this.$createElement('strong', '40°C')
          },
          50: {
            style: {
              color: '#E6A23C'
            },
            label: this.$createElement('strong', '50%℃')
          },
          60: {
            style: {
              color: '#F56C6C',
            },
            label: this.$createElement('strong', '60°C')
          },
        }
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import "../../styles/device-setup";
</style>
