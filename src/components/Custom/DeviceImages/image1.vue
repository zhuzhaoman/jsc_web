<template>
  <div class="container">
    <div class="port-status-table">

      <div class="table-border">

        <div class="left">
          <svg-icon icon-class="screw"  class-name='icon' />
          <svg-icon icon-class="screw"  class-name='icon' />
        </div>

        <div class="block" style="padding-right: 20px;display: flex;">
          <div v-for="c in Q1_col" class="row">
            <div v-for="r in Q1_row" class="col">
              <div class="q-item" :style="{margin: c === 2 ? '0 10px 0 0' : '0 3px 0 0', background: ((c -1) * 3 + r) === 1 ? '#00e676' : 'rgba(0,0,0,0.3)'}">
                {{ "Q" + ((c -1) * 3 + r) }}
              </div>
              <div v-if="r < 3" class="mask" style="width: 60px; height: 15px;">
                <span v-for="i in [1,2,3,4,5,6]" style="font-size: 14px;color: #ffffff;">•</span>
              </div>
            </div>
          </div>
        </div>

        <div class="block" style="padding-right: 20px; display: flex;">
          <div v-for="c in S_col" class="row">
            <div v-for="r in S_row" class="col">
              <div
                class="s-item"
                :style="{margin : (c % 4 === 0) && (c !== 12) ? '0 10px 0 0': '0 3px 0 0', background: 'rgba(0,0,0,0.3)'}">
                {{ "S" + ((c -1) * 3 + r) }}
              </div>
              <div v-if="r < 3" class="mask" style="width: 50px; height: 15px;">
                <span v-for="i in [1,2,3,4,5]" style="font-size: 14px;color: #ffffff;">•</span>
              </div>
            </div>
          </div>
        </div>

        <div class="block" style="padding-right: 20px;display: flex;">
          <div v-for="c in Q2_col" class="row">
            <div v-for="r in Q2_row" class="col">
              <div
                class="q-item"
                :style="{margin : c === 2 ? '0 10px 0 0': '0 3px 0 0', background: ((c + 3) * 3 + r) === 15 ? '#E6A23C' : 'rgba(0,0,0,0.3)'}">
                <span>{{ "Q" + ((c + 3) * 3 + r) }}</span>
                <div class="mask-inner">
                  <div class="one port">1</div>
                  <div class="two port">2</div>
                  <div class="three port">3</div>
                  <div class="four port">4</div>
                </div>
              </div>
              <div v-if="r < 3" class="mask" style="width: 60px; height: 15px;">
                <span v-for="i in [1,2,3,4,5,6]" style="font-size: 14px;color: #ffffff;">•</span>
              </div>
            </div>
          </div>
        </div>

        <div class="right">
          <svg-icon icon-class="screw"  class-name='icon' />
          <svg-icon icon-class="screw"  class-name='icon' />
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
      display: flex;
      justify-content: center;
      align-items: center;
      border: 10px solid #ffffff;
      border-radius: 20px;
      background: #1890ff;
      -moz-box-shadow:2px 2px 5px #999999;
      -webkit-box-shadow:2px 2px 5px #999999;
      box-shadow:2px 2px 20px #999999;

      .table-border {
        height: 150px;
        display: flex;
        align-items: center;
        background: #1890ff;
        box-sizing: border-box;
        font-size: 12px;
        color: #f2f2f2;
        margin: 15px 20px;
        border: 1px solid #ffffff;
        border-radius: 5px;

        .left {
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          align-items: center;
          padding: 10px 0;
          width: 30px;
          height: 120px;
          background: rgba(0,0,0,.5);
          margin: 0 20px;
          border-radius: 30px;

          .icon {
            width: 20px;
            height: 20px;
            fill: #d5e0e2 !important;

          }
        }

        .right {
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          align-items: center;
          padding: 10px 0;
          width: 30px;
          height: 120px;
          background: rgba(0,0,0,.5);
          margin-right: 20px;
          border-radius: 30px;


          .icon {
            width: 20px;
            height: 20px;
          }
        }

        .mask {
          display: flex;
          justify-content: space-around;
          align-items: center;
        }


        .q-item {
          position: relative;
          overflow: hidden;
          display: flex;
          justify-content: center;
          align-items: center;
          width: 60px;
          height: 27px;
          transition: all .5s linear;

          .mask-inner {
            position: absolute;
            display: flex;
            justify-content: space-between;
            align-items: center;
            left: 0;
            top: 200%;
            width: 100%;
            height: 100%;

            .port{
              display: flex;
              justify-content: center;
              align-items: center;
              width: 13px;
              height: 13px;
              border-radius: 50%;
              font-size: 12px;
              color: #ffffff;
            }

            .one, .three {
              background: #00e676;
            }

            .two, .four {
              background: rgba(0,0,0,0.5);
            }

          }
        }


        .q-item:hover {
          background: rgba(0,0,0,.3) !important;

          span {
            display: none;
          }

          .mask-inner {
            top: 0;
          }

        }

        .s-item {
          display: flex;
          justify-content: center;
          align-items: center;
          width: 50px;
          height: 27px;
          transition: all .5s linear;

        }
      }


    }

  }
</style>
