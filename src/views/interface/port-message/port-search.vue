<template>
  <div class="port-search-container">

    <el-divider content-position="left">
      <span style="font-size: 16px;font-weight: bold;">端口状态</span>
    </el-divider>
    <div class="port-status">

      <div class="operation">
        <el-button type="primary" size="mini" plain>刷新端口状态</el-button>
      </div>

      <div class="port-status-table">

        <div class="block" style="padding-right: 20px;display: flex;">
          <div v-for="c in Q1_col" class="row">
            <div v-for="r in Q1_row" class="col">
              <!--            <div class="q-item"-->
              <!--                 :style="{margin: c === 2 ? '0 10px 0 0' : '', background: c === 4 ? '#67C23A' : c % 4 === 0 ? '#F56C6C' : '#ffffff'}">-->
              <div class="q-item" :style="{margin: c === 2 ? '0 10px 0 0' : '', background: ((c -1) * 3 + r) === 1 ? '#67C23A' : '#f2f2f2'}">
                {{ "Q" + ((c -1) * 3 + r) }}
              </div>
              <div v-if="r < 3" class="mask" style="width: 65px; height: 20px;">
                <img src="@/assets/port/q.jpg" width="65" height="20">
              </div>
            </div>
          </div>
        </div>

        <div class="block" style="padding-right: 20px; display: flex;">
          <div v-for="c in S_col" class="row">
            <div v-for="r in S_row" class="col">
              <div
                class="s-item"
                :style="{margin : (c % 4 === 0) && (c !== 12) ? '0 10px 0 0': '0', background: '#f2f2f2'}"
              >
                {{ "S" + ((c -1) * 3 + r) }}
              </div>
              <div v-if="r < 3" class="mask" style="width: 55px; height: 20px;">
                <img src="@/assets/port/s.jpg" width="55" height="20">
              </div>
            </div>
          </div>
        </div>

        <div class="block" style="padding-right: 20px;display: flex;">
          <div v-for="c in Q1_col" class="row">
            <div v-for="r in Q1_row" class="col">
              <div
                class="q-item"
                :style="{margin : c === 2 ? '0 10px 0 0': '0', background: ((c + 3) * 3 + r) === 15 ? '#E6A23C' : '#f2f2f2'}">
                <span>{{ "Q" + ((c + 3) * 3 + r) }}</span>
                <div class="mask-inner">
                  <div class="one port"></div>
                  <div class="two port"></div>
                  <div class="three port"></div>
                  <div class="four port"></div>
                </div>
              </div>
              <div v-if="r < 3" class="mask" style="width: 65px; height: 20px;">
                <img src="@/assets/port/q.jpg" width="65" height="20">
              </div>
            </div>
          </div>
        </div>

      </div>

      <div class="port-status-mark">
        <div class="block">
          <div class="success" />
          <div class="label">UP</div>
        </div>
        <div class="block">
          <div class="four_ten" />
          <div class="label">甩纤</div>
        </div>
        <div class="block">
          <div class="error" />
          <div class="label">DOWN</div>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
  export default {
    name: 'PortSearch',
    data() {
      return {
        Q1_row: [1, 2, 3],
        Q1_col: [1, 2, 3, 4],
        S_row: [1, 2, 3],
        S_col: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]
      }
    },
    mounted() {

    }
  }
</script>

<style lang="scss" scoped>
  .port-search-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    height: 100%;
    margin: 20px;

    .port-status:hover {
      box-shadow: 0 1px 6px rgba(0,0,0,.25);
      border-color: #eee;
    }
    .port-status {
      width: 100%;
      display: flex;
      flex-direction: column;
      align-items: center;
      border-radius: 4px;
      padding: 20px;
      border: 1px solid #DCDFE6;

      .operation {
        width: 100%;
        display: flex;
        justify-content: flex-end;
        margin-bottom: 10px;
      }

      .port-status-table {
        width: 1300px;
        padding: 20px;
        margin-top: 10px;
        display: flex;
        justify-content: flex-start;
        background: #1e50a0;
        box-sizing: border-box;
        font-size: 12px;
        color: #606266;

        .q-item {
          position: relative;
          overflow: hidden;
          display: flex;
          justify-content: center;
          align-items: center;
          width: 65px;
          height: 30px;
          border-left: 1px solid #ccc;

          .mask-inner {
            position: absolute;
            left: 0;
            top: 200%;
            width: 100%;
            height: 100%;
            background: rgba(0,0,0,.5);
          }
        }

        .q-item:hover {
          background: #f2f2f2 !important;
          border-left: 1px solid rgba(0,0,0,.5) !important;

          span {
            display: none;
          }

          .mask-inner {
            padding: 0 10px;
            top: 0;
            color: #ffffff;
            display: flex;
            justify-content: space-between;
            flex-wrap: wrap;

            .port{
              width: 10px;
              height: 10px;
              margin: 2px 5px;
              border-radius: 50%;
            }

            .one, .three {
              background: #67C23A;
            }

            .two, .four {
              background: #f2f2f2;
            }
          }
        }

        .s-item {
          display: flex;
          justify-content: center;
          align-items: center;
          width: 55px;
          height: 30px;
          border-left: 1px solid #ccc;
        }
      }

      .port-status-mark {
        width: 1300px;
        display: flex;
        justify-content: flex-end;
        padding: 20px;
        font-size: 14px;
        font-weight: bold;
        color: #606266;

        .block {
          display: flex;
          justify-content: center;
          align-items: center;
          margin-right: 30px;

          .success {
            width: 65px;
            height: 30px;
            background: #67C23A;
            border: 1px solid #DCDFE6;
            margin-right: 10px;
          }

          .four_ten {
            width: 65px;
            height: 30px;
            background: #E6A23C;
            border: 1px solid #DCDFE6;
            margin-right: 10px;
          }

          .error {
            width: 65px;
            height: 30px;
            background: #f2f2f2;
            border: 1px solid #DCDFE6;
            margin-right: 10px;
          }
        }
      }
    }

  }
</style>
