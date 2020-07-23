<template>
  <div class="container">
    <div class="warning-group" @click="showWarning(flag)">
      <div class="warning-group-left" :style="{background: backgroundColor}">
        <svg-icon :icon-class="iconClass" class-name='warning-icon' />
      </div>
      <div class="warning-group-right">
        <count-to :start-val="startValue" :end-val="endValue" :duration="duration" class="count" />
        <el-badge :value="notView">
          <el-button class="title" size="small">{{title}}</el-button>
        </el-badge>
      </div>
    </div>
  </div>
</template>

<script>
  import CountTo from 'vue-count-to'

  export default {
    name: "index",
    components: {
      CountTo
    },
    data() {
      return {

      }
    },
    props: {
      flag: Number,
      notView: Number,
      backgroundColor: String,
      iconClass: String,
      startValue: {
        type: Number,
        default: 0
      },
      endValue: Number,
      duration: Number,
      title: String
    },
    methods: {
      showWarning(flag) {
        this.$parent.showWarning(flag)
      }
    }
  }
</script>

<style lang="scss" scoped>
  .container {
    /*顶部警告信息*/
    .warning-group {
      display: flex;
      justify-content: flex-end;
      /*width: 200px;*/
      height: 80px;

      .warning-group-left {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 70px;
        border-top-left-radius: 7px;
        border-bottom-left-radius: 5px;

        .warning-icon {
          width: 40px;
          height: 40px;
        }
      }

      .warning-group-right {
        flex: 1;
        padding: 10px 0;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        align-items: center;
        border-bottom: 1px solid #E4E7ED;
        color: #606266;

        .count {
          font-size: 30px;
          font-weight: bold;
        }

        .title {
          border: none !important;
        }
      }
    }
    /* 水平抖动，核心代码 */
    @keyframes shake {
      10%, 90% { transform: translate3d(-1px, 0, 0); }
      20%, 80% { transform: translate3d(+2px, 0, 0); }
      30%, 70% { transform: translate3d(-4px, 0, 0); }
      40%, 60% { transform: translate3d(+4px, 0, 0); }
      50% { transform: translate3d(-4px, 0, 0); }
    }

    .warning-group:hover {
      cursor:pointer;
      animation: shake 800ms ease-in-out;
    }
  }
</style>
