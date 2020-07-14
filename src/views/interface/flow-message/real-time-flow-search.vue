<template>
    <div class="container">
      <h1>端口流量信息查询</h1>
      <p>
        <span style="font-size: 16px;font-weight: bold;">1、按照板卡为单位查询实时流量</span><br>
        <span style="color: red;">备注：需要展示输入输出总包数、字节数、包速率、字节速度、丢包数、丢包率、错报数、错包率;仅展示总流量信息</span>
      </p>
      <p>
        <span style="font-size: 16px;font-weight: bold;">2、按照输出端口组为单位查询实时流量</span><br>
        <span style="color: red;">备注：需要展示输入输出总包数、字节数、包速率、字节速度、丢包数、丢包率、错报数、错包率;仅展示总流量信息</span>
      </p>
      <p>
        <span style="font-size: 16px;font-weight: bold;">3、按照输入端口组为单位查询实时流量</span><br>
        <span style="color: red;">备注：需要展示输入输出总包数、字节数、包速率、字节速度、丢包数、丢包率、错报数、错包率;仅展示总流量信息</span>
      </p>
    </div>
</template>

<script>
    export default {
        name: "port-flow-search"
    }
</script>

<style lang="scss" scoped>

</style>
