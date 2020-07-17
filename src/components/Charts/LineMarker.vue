<template>
  <div class="container">
    <div class="operation">
      <el-select v-model="value" placeholder="请选择" @change="selectChange(value)">
        <el-option
          v-for="item in options"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        />
      </el-select>

      <el-date-picker
        v-if="value === 'day'"
        v-model="value1"
        class="day"
        type="date"
        placeholder="选择日期"
      />

      <el-date-picker
        v-if="value === 'month'"
        v-model="value2"
        class="month"
        type="month"
        placeholder="选择月"
      />
    </div>
    <div :id="id" :class="className" :style="{width:width}" />
  </div>
</template>

<script>
import echarts from 'echarts'
import resize from './mixins/resize'

export default {
  mixins: [resize],
  props: {
    className: {
      type: String,
      default: 'chart'
    },
    id: {
      type: String,
      default: 'chart'
    },
    width: {
      type: String,
      default: '200px'
    },
    height: {
      type: String,
      default: '200px'
    }
  },
  data() {
    return {
      chart: null,
      date: [],
      input: [],
      output: [],
      options: [
        {
          value: 'day',
          label: '按天查询'
        }, {
          value: 'month',
          label: '按月查询'
        },
        {
          value: 'quarter',
          label: '按季度查询'
        }
      ],
      value: 'day',
      value1: '2020-7-1',
      value2: '2020-7'
    }
  },
  mounted() {
    this.showDay();
    this.initChart()
  },
  beforeDestroy() {
    if (!this.chart) {
      return
    }
    this.chart.dispose();
    this.chart = null
  },
  methods: {
    showDay() {
      const date = [];
      const input = [];
      const output = [];

      for (let hour = 1; hour <= 24; hour++) {
        const member1 = this.random(90, 100);
        const member2 = this.random(85, 95);
        date.push('7.1 ' + hour + ':00');
        input.push(member1);
        output.push(member2)
      }

      this.date = date;
      this.input = input;
      this.output = output
    },
    /**
       * 显示月
       **/
    showMonth() {
      const date = [];
      const input = [];
      const output = [];

      for (let day = 1; day < 31; day++) {
        const member1 = this.random(90, 100);
        const member2 = this.random(85, 95);
        date.push(7 + '.' + day + ' 12' + ':00');
        input.push(member1);
        output.push(member2)
      }

      this.date = date;
      this.input = input;
      this.output = output
    },
    /**
       * 显示季度
       */
    showQuarter() {
      const date = [];
      const input = [];
      const output = [];

      for (let month = 5; month <= 7; month++) {
        for (let day = 1; day < 31; day++) {
          const member1 = this.random(90, 100);
          const member2 = this.random(85, 95);
          date.push(month + '.' + day + ' 12' + ':00');
          input.push(member1);
          output.push(member2)
        }
      }

      this.date = date;
      this.input = input;
      this.output = output
    },
    selectChange(value) {
      if (value === 'day') {
        this.showDay()
      } else if (value === 'month') {
        this.showMonth()
      } else {
        this.showQuarter()
      }
      this.initChart()
    },
    random(m, n) {
      return Math.floor(Math.random() * (n - m)) + m
    },
    initChart() {
      const that = this;
      this.chart = echarts.init(document.getElementById(this.id));

      this.chart.setOption({
        backgroundColor: '#394056',
        title: {
          top: 20,
          text: '历史流量',
          textStyle: {
            fontWeight: 'normal',
            fontSize: 16,
            color: '#F1F1F3'
          },
          left: '1%'
        },
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            lineStyle: {
              color: '#57617B'
            }
          }
        },
        legend: {
          top: 20,
          icon: 'rect',
          itemWidth: 14,
          itemHeight: 5,
          itemGap: 13,
          data: ['输入流量', '输出流量'],
          right: '4%',
          textStyle: {
            fontSize: 12,
            color: '#F1F1F3'
          }
        },
        grid: {
          top: 100,
          left: '2%',
          right: '4%',
          bottom: '2%',
          containLabel: true
        },
        xAxis: [{
          type: 'category',
          name: '(时间)',
          boundaryGap: false,
          axisLine: {
            lineStyle: {
              color: '#57617B'
            }
          },
          data: that.date
        }],
        yAxis: [{
          type: 'value',
          name: '(字节速率)',
          axisTick: {
            show: false
          },
          axisLine: {
            lineStyle: {
              color: '#57617B'
            }
          },
          axisLabel: {
            margin: 10,
            textStyle: {
              fontSize: 14
            }
          },
          splitLine: {
            lineStyle: {
              color: '#57617B'
            }
          }
        }],
        series: [
          {
            name: '输入流量',
            type: 'line',
            smooth: true,
            symbol: 'circle',
            symbolSize: 5,
            showSymbol: false,
            lineStyle: {
              normal: {
                width: 1
              }
            },
            areaStyle: {
              normal: {
                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                  offset: 0,
                  color: 'rgba(0, 136, 212, 0.3)'
                }, {
                  offset: 0.8,
                  color: 'rgba(0, 136, 212, 0)'
                }], false),
                shadowColor: 'rgba(0, 0, 0, 0.1)',
                shadowBlur: 10
              }
            },
            itemStyle: {
              normal: {
                color: 'rgb(0,136,212)',
                borderColor: 'rgba(0,136,212,0.2)',
                borderWidth: 12

              }
            },
            data: that.input
          },
          {
            name: '输出流量',
            type: 'line',
            smooth: true,
            symbol: 'circle',
            symbolSize: 5,
            showSymbol: false,
            lineStyle: {
              normal: {
                width: 1
              }
            },
            areaStyle: {
              normal: {
                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                  offset: 0,
                  color: 'rgba(137, 189, 27, 0.3)'
                }, {
                  offset: 0.8,
                  color: 'rgba(137, 189, 27, 0)'
                }], false),
                shadowColor: 'rgba(0, 0, 0, 0.1)',
                shadowBlur: 10
              }
            },
            itemStyle: {
              normal: {
                color: 'rgb(137,189,27)',
                borderColor: 'rgba(137,189,2,0.27)',
                borderWidth: 12

              }
            },
            data: that.output
          }
        ]
      })
    }
  }
}
</script>
<style lang="scss" scoped>
  .container {
    width: 100%;
    height: 100%;

    .operation {
      width: 100%;
      height: 10%;
      background: #394056;
      padding-left: 20px;
      display: flex;
      align-items: center;

      .day,.month {
        margin-left: 10px;
      }
    }

    #chart {
      width: 100%;
      height: 90%;
    }
  }
</style>
