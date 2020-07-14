<template>
  <div class="container">
    <h1>端口信息查询</h1>
    <p>
      <span style="font-size: 16px;font-weight: bold;">1、支持查询端口组状态(up/down)</span><br>
      <span style="color: red;">
        备注：以板卡为单位，现在各个端口，用绿色标识up，红色表示down。端口状态信息由systemmanager主动上报web，5分钟上报一次<br>
        若有端口link状态改变，会立刻上报。
      </span>
    </p>
  </div>
</template>

<script>
  export default {
    name: "port-search"
  }
</script>

<style lang="scss" scoped>

</style>
