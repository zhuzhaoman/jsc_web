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
                :style="{margin : c === 2 ? '0 10px 0 0': '0 3px 0 0', background: ((c + 3) * 3 + r) === 15 ? '#faa755' : 'rgba(0,0,0,0.3)'}">
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
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    .port-status-table {
      display: flex;
      justify-content: center;
      align-items: center;
      border: 10px solid #ffffff;
      border-radius: 30px;
      background: #1890ff;
      -moz-box-shadow: 1px 1px 10px #999999;
      -webkit-box-shadow: 1px 1px 10px #999999;
      box-shadow: 1px 1px 10px #999999;

      .table-border {
        height: 150px;
        display: flex;
        align-items: center;
        background: #1890ff;
        box-sizing: border-box;
        font-size: 12px;
        color: #f2f2f2;
        margin: 20px;
        border: 1px solid #ffffff;
        border-radius: 15px;

        .left {
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          align-items: center;
          padding: 10px 0;
          width: 30px;
          height: 115px;
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
          height: 115px;
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
          border: 1px solid rgba(0,0,0,.3);

          .mask-inner {
            position: absolute;
            display: flex;
            justify-content: center;
            align-items: center;
            left: 0;
            top: 200%;
            width: 100%;
            height: 100%;

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
          border: 1px solid rgba(0,0,0,.3);
        }
      }
    }

    .port-status-mark {
      width: 100%;
      display: flex;
      justify-content: flex-end;
      padding: 20px;
      font-size: 12px;
      font-weight: bold;
      color: #606266;
      margin-top: 20px;

      .block {
        display: flex;
        justify-content: center;
        align-items: center;
        margin-right: 30px;

        .success {
          width: 50px;
          height: 25px;
          background: #00e676;
          border: 1px solid rgba(0,0,0,.1);
          margin-right: 10px;
        }

        .four_ten {
          width: 50px;
          height: 25px;
          background: #faa755;
          border: 1px solid rgba(0,0,0,.1);
          margin-right: 10px;
        }

        .error {
          width: 50px;
          height: 25px;
          background: rgba(0,0,0,.3);
          border: 1px solid rgba(0,0,0,.1);
          margin-right: 10px;
        }
      }
    }

  }
</style>
