<template>
  <div class="container">
    <div class="port-status-table">

      <div class="block" style="padding-right: 20px;display: flex;">
        <div v-for="c in Q1_col" class="row">
          <div v-for="r in Q1_row" class="col">
            <div class="q-item" :style="{margin: c === 2 ? '0 10px 0 0' : '', background: ((c -1) * 3 + r) === 1 ? '#67C23A' : '#f2f2f2'}">
              {{ "Q" + ((c -1) * 3 + r) }}
            </div>
            <div v-if="r < 3" class="mask" style="width: 65px; height: 20px;">
              <img src="@/assets/port/s.png" width="65" height="20">
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
              <img src="@/assets/port/s.png" width="55" height="20">
            </div>
          </div>
        </div>
      </div>

      <div class="block" style="padding-right: 20px;display: flex;">
        <div v-for="c in Q2_col" class="row">
          <div v-for="r in Q2_row" class="col">
            <div
              class="q-item"
              :style="{margin : c === 2 ? '0 10px 0 0': '0', background: ((c + 3) * 3 + r) === 15 ? '#ffd700' : '#f2f2f2'}">
              <span>{{ "Q" + ((c + 3) * 3 + r) }}</span>
              <div class="mask-inner">
                <div class="one port">1</div>
                <div class="two port">2</div>
                <div class="three port">3</div>
                <div class="four port">4</div>
              </div>
            </div>
            <div v-if="r < 3" class="mask" style="width: 65px; height: 20px;">
              <img src="@/assets/port/s.png" width="65" height="20">
            </div>
          </div>
        </div>
      </div>

    </div>
  </div>
</template>

<script>
  export default {
    name: "image1",
    data() {
      return {

      }
    },
    props: {
      Q1_row: Array,
      Q1_col: Array,
      S_row: Array,
      S_col: Array,
      Q2_row: Array,
      Q2_col: Array
    }
  }
</script>

<style lang="scss" scoped>
.container {
  .port-status-table {
    width: 1300px;
    padding: 20px;
    margin-top: 10px;
    display: flex;
    justify-content: flex-start;
    background: #007bc3;
    box-sizing: border-box;
    font-size: 12px;
    color: #606266;
    -moz-box-shadow:7px 7px 20px #333333;
    -webkit-box-shadow:7px 7px 20px #333333;
    box-shadow:7px 7px 20px #333333;

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
        background: rgba(0,0,0,.3);
      }
    }


    .q-item:hover {

      span {
        display: none;
      }

      .mask-inner {
        top: 0;
        color: #ffffff;
        display: flex;
        justify-content: center;
        align-items: center;

        .port{
          display: flex;
          justify-content: center;
          align-items: center;
          margin: 0 2px;
          width: 12px;
          height: 12px;
          border-radius: 50%;
          font-size: 4px;
          color: #606266;
        }

        .one, .three {
          background: #13ce66;
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
}
</style>
