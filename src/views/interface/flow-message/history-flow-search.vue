<template>
    <div class="container">
      <h1>历史流量查询</h1>
      <p>
        <span style="font-size: 16px;font-weight: bold;">1、通过snmp定时获取流量统计信息，该信息需要写入数据库，作为查询使用，默认可以存储1个月</span><br>
        <span style="color: red;">备注：admin可以修改存储的数据周期，范围为1~90天，只存储字节速率。间隔时间较短时，可能导致响应过慢</span>
      </p>
      <p>
        <span style="font-size: 16px;font-weight: bold;">2、支持以板卡为单位查询历史流量信息，查询结果已曲线图的形式展示，横轴为时间，纵轴为流量大小</span><br>
        <span style="color: red;">备注：支持查询一天、一周、一个月、一个季度历史信息，鼠标划过曲线图时可以展示对应点的具体流量情况</span>
      </p>
      <p>
        <span style="font-size: 16px;font-weight: bold;">3、支持查询流量历史峰谷值</span><br>
        <span style="color: red;">备注：在查询历史信息时，在旁边展示峰值信息</span>
      </p>
      <p>
        <span style="font-size: 16px;font-weight: bold;">4、支持流量清除功能（清空后端数据）</span><br>
        <span style="color: red;">备注：清除前需要二次确认</span>
      </p>
    </div>
</template>

<script>
    export default {
        name: "history-flow-search"
    }
</script>

<style scoped>

</style>
