export default{
    //初始化webSocket
    webSocketInit(webSocketURL){
        this.webSocket = new WebSocket(webSocketURL);
        console.log(this.webSocket);
        this.webSocket.onopen = this.onOpenwellback;
        this.webSocket.onmessage = this.onMessageCallback;
        this.webSocket.onerror = this.onErrorCallback;
        this.webSocket.onclose = this.onCloseCallback;
    },

    //自定义回调函数
    setOpenCallback(callback){
        this.webSocket.onopen = callback;
    },
    setMessageCallback(callback){
        this.webSocket.onmessage = callback
    },
    setErrorCallback(callback){
        this.webSocket.onerror = callback
    },
    setCloseCallback(callback){
        this.webSocket.onclose = callback
    },

    close(){
        this.webSocket.close();
    },
    sendMessage(message){
        this.webSocket.send(message);
    }
}