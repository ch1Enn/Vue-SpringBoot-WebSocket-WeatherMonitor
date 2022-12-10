import webSocket from "./webSocket";
import {getCity} from './axios.js'
import store from '../store'


//向后端发起请求获取 城市 的实况天气数据
export function getLiveData(address){
    //console.log("当前城市信息："+ JSON.stringify( store.state.liveData.cityNameCode));

    console.log(store.state.liveData.cityNameCode);
    let include = false;
    Object.keys(store.state.liveData.cityNameCode).filter(
        item => {
            if(item === address){
                include = true;
            }
        }
    )
    
    //Vuex中没有保存当前城市的信息
    if(!include){
        //console.log(address + "不存在，正在查询");
        //发出axios请求，请求查询城市的编码
        let nameCode = {};
        getCity(address).then((res) => {
            console.log(res);
            let adCode = res;
            //问题所在!!
            //console.log("address:"+address);
            let addr = address
            nameCode[addr] = adCode;
        })
        console.log(nameCode);
        store.commit("updateCityNameCode", nameCode);
        //console.log("请求参数为："+store.state.liveData.cityNameCode[address]);
        webSocket.sendMessage(store.state.liveData.cityNameCode[address]);
        
    }else{
        //console.log(address + "已存在");
        //通过WebSocet向后端发起请求，查询数据
        console.log("请求参数为："+store.state.liveData.cityNameCode[address]);
        webSocket.sendMessage(store.state.liveData.cityNameCode[address]);
    }
}

//建立WebSocket连接，与后端建立通信，获取城市实况天气数据
export async function connectWebSocket(){
    webSocket.webSocketInit('ws://127.0.0.1:8080/websocket');
    
    webSocket.setOpenCallback(res=>{
        console.log("连接建立成功！",res);
    })

    webSocket.setMessageCallback(res => {
        //处理数据
        console.log("接收到回信：", res.data);

        //返回的是某个城市的实况天气数据 res.data
        //1.需要将这条数据添加到 state 中 lives 所对应的城市的数组中
        if(res.data !== "null"){
            store.commit('updateLives', JSON.parse(res.data));
        }

    })

    webSocket.setErrorCallback(res => {
        console.log("连接异常：", res);
    })

    webSocket.setCloseCallback(res => {
        console.log("连接关闭！",res);
    })
}