<template>
  <div class="container">
    <div class="operation">

      <el-cascader
        v-model="domainValue"
        :options="domain"
        :props="{ expandTrigger: 'hover' }"
        @change="domainChange">
      </el-cascader>

      <el-select class="change" v-model="value" placeholder="请选择" @change="selectChange(value)">
        <el-option
          v-for="item in options"
          :key="item.value"
          :label="item.label"
          :value="item.value"/>
      </el-select>

      <el-date-picker
        v-if="value === 'day'"
        v-model="value1"
        class="day"
        type="date"
        placeholder="选择日期"
        @change="dateChange"
      />

      <el-date-picker
        v-if="value === 'month'"
        v-model="value2"
        class="month"
        type="month"
        placeholder="选择月"
        @change="monthChange"/>
    </div>
    <div :id="id" :class="className" :style="{width:width}" />
  </div>
</template>

<script>
  import echarts from 'echarts'
  import resize from './mixins/resize'
  import moment from 'moment'
  import { getHistoryFlow, getHistoryFlowByDayRange, getHistoryFlowByQuarterRange } from '../../api/flow-message'
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
        domainValue: ["operator", 1],
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
        value2: '2020-7',
      }
    },
    mounted() {
      this.value1 = moment(new Date()).format("YYYY-MM-DD")
      this.value2 = moment(new Date()).format("YYYY-MM")
      this.initChart()
      this.showDay(this.value1);
    },
    beforeDestroy() {
      if (!this.chart) {
        return
      }
      this.chart.dispose();
      this.chart = null
    },
    methods: {
      /**
       * 选择域
       */
      domainChange(domain) {
        this.domainValue = domain
        let value = this.value
        if (value === 'day') {
          let date = moment(this.value1).format("YYYY-MM-DD")
          this.showDay(date)
        } else if (value === 'month') {
          let date = moment(this.value2).format("YYYY-MM")
          this.showMonth(date)
        } else {
          this.showQuarter()
        }
      },
      /**
       * 选择天、月还是季度展示
       */
      selectChange(value) {
        if (value === 'day') {
          let date = moment(this.value1).format("YYYY-MM-DD")
          this.showDay(date)
        } else if (value === 'month') {
          let date = moment(this.value2).format("YYYY-MM")
          this.showMonth(date)
        } else {
          this.showQuarter()
        }
        this.initChart()
      },
      /**
       * 选择显示日期数据，以天为单位
       */
      dateChange(date) {
        let dateObject = moment(date).format("YYYY-MM-DD")
        this.showDay(dateObject)
      },
      /**
       * 选择显示日期数据，以月为单位
       */
      monthChange(date) {
        let dateObject = moment(date).format("YYYY-MM")
        this.showMonth(dateObject)
      },
      /**
       * 显示天
       **/
      showDay(dateObject) {
        const dateList = [];
        const inputList = [];
        const outputList = [];

        let date = dateObject.toLocaleString()

        let startDay = moment(new Date(new Date(moment(date).startOf('day')).getTime())).valueOf()
        let endDay = moment(new Date(new Date(moment(date).endOf('day')).getTime())).valueOf()
        let domain = this.domainValue[0]
        let domainId = this.domainValue[1]

        getHistoryFlow({domain: domain, domainId: domainId, startTime: startDay, endTime: endDay}).then(res => {
          let historyList = res.data
          for (let i = 0; i < historyList.length; i++) {
            inputList.push(historyList[i].rx)
            outputList.push(historyList[i].tx)
            dateList.push(moment(historyList[i].createTime).format("MM-DD HH:mm:ss"))
          }

          this.date = dateList;
          this.input = inputList;
          this.output = outputList

          this.initChart()
        })
      },
      /**
       * 显示月
       **/
      showMonth(dateObject) {

        const dateList = [];
        const inputList = [];
        const outputList = [];

        let date = dateObject.toLocaleString()
        let firstDay = moment(date).startOf('month')
        let lastDay = moment(date).endOf('month')

        let startDay = moment(new Date(new Date(firstDay).getTime())).valueOf()
        let endDay = moment(new Date(new Date(lastDay).getTime() + 24 * 60 * 60 * 1000 - 1)).valueOf()


        let domain = this.domainValue[0]
        let domainId = this.domainValue[1]


        getHistoryFlowByDayRange({domain: domain, domainId: domainId, startTime: startDay, endTime: endDay}).then(res => {
          let historyList = res.data
          for (let i = 0; i < historyList.length; i++) {
            inputList.push(historyList[i].rx)
            outputList.push(historyList[i].tx)
            dateList.push(moment(historyList[i].createTime).format("MM-DD HH:mm:ss"))
          }

          this.date = dateList;
          this.input = inputList;
          this.output = outputList

          this.initChart()
        })
      },
      /**
       * 显示季度
       */
      showQuarter() {
        const dateList = [];
        const inputList = [];
        const outputList = [];

        let date = moment(new Date()).format("YYYY-MM-DD").toLocaleString()
        let startDay = moment().subtract(3, "months").startOf('day')
        let endDay = moment(new Date(new Date(moment(date).endOf('day')).getTime())).valueOf()
        let domain = this.domainValue[0]
        let domainId = this.domainValue[1]

        getHistoryFlowByQuarterRange({domain: domain, domainId: domainId, startTime: startDay, endTime: endDay}).then(res => {
          let historyList = res.data
          for (let i = 0; i < historyList.length; i++) {
            inputList.push(historyList[i].rx)
            outputList.push(historyList[i].tx)
            dateList.push(moment(historyList[i].createTime).format("MM-DD HH:mm:ss"))
          }

          this.date = dateList;
          this.input = inputList;
          this.output = outputList

          this.initChart()
        })
      },
      /**
       * 初始化统计图
       */
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
            data: ['输出流量','输入流量'],
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
          ],
          dataZoom: [
            {
              type: 'slider',
              show: true,
              start: 0,
              end: 10,
              fillerColor:"rgba(0,0,0,0.2)",
              throttle:100,
              backgroundColor:"rgba(47,69,84,0)",
            },
            {
              type: 'inside',
              show: true,
              start: 0,
              end: 10
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

      .input {
        width: 50px;
      }

      .change,.input,.day,.month {
        margin-left: 10px;
      }
    }

    #chart {
      width: 100%;
      height: 90%;
    }
  }
</style>
