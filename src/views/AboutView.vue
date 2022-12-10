<template>
  <div class="about">
    <h1>This is an about page</h1>
    <button @click="sendMessage">发送消息</button>
  </div>
</template>

<script>
import webSocket from '@/api/webSocket';

export default{
  name:"webSocket",
  data(){
    return{
      webSocketObject:null,
      citys:["520100","510100"],
    }
  },
  created() {
     // webSocket.webSocketInit(process.env.VUE_APP_BASE_API.replace("http","ws")+"/evgis/todoStatus")
    webSocket.webSocketInit('ws://127.0.0.1:8080/websocket')	//初始化webSocket

    // 按需进行绑定回调函数
    webSocket.setOpenCallback(res=>{
        console.log("连接建立成功",res);
    })
    webSocket.setMessageCallback(res=>{	
        // 在此处进行数据刷新操作即可实现数据发生改变时实时更新数据
        console.log("接收到回信",res.data);
    })
    webSocket.setErrorCallback(res=>{
        console.log("连接异常",res);
    })
    webSocket.setCloseCallback(res=>{
        console.log("连接关闭",res);
    })

  },
  methods:{
    sendMessage(){
      
      webSocket.sendMessage("520100");
      
      webSocket.sendMessage("510100");
      //webSocket.sendMessage("530100");
    }
  }

}
</script>
