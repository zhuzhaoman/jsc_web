<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
  import SockJS from 'sockjs-client'
  import Stomp from 'stompjs'
  export default {
    name: 'App',
    data() {
      return {

      }
    },
    created() {
      let stompClient = null;
      let that = this;

      // 建立连接对象
      let socket= new SockJS ('http://localhost:8080/websocket');
      // 获取STOMP子协议的客户端对象
      stompClient = Stomp.over(socket);

      // 向服务器发送websocket连接并发送CONNECT帧
      stompClient.connect ({}, function (frame) {

        // 全局订阅
        stompClient.subscribe('/app/all', function (res) {
          let data = JSON.parse(res.body)
          console.log("====接收到全局订阅(/app/all)返回的数据====")
          that.$notify({
            title: '警告',
            message: data.msg,
            type: 'success'
          });
        })

        // 指定订阅
        stompClient.subscribe('/topic/all', function (res) {
          let data = JSON.parse(res.body)
          console.log("====接收到指定订阅(/topic/all)返回的数据====")
          that.$notify({
            title: '警告',
            message: data.msg,
            type: 'warning'
          });
        })
      });

    }
  }
</script>
