<template>
    <div class="screen-container">
        <header class="screen-header">
            <div>
                <img :src="headerSrc" alt="" />
            </div>
            <span class="logo">{{cityNameNow}} {{cityWeatherNow}} {{cityTemperNow}}</span>
            <span class="title">城市气象数据实时监控系统</span>
            <div class="title-right">
                <span class="datetime">{{nowTime}}</span>
            </div>
        </header>
        <div class="screen-body">
            <section class="screen-left">
                <div id="left-top">
                    <temperature-page-vue v-if="flag" ref="temp"></temperature-page-vue>
                </div>
                <div id="left-bottom">
                    <humidity-page-vue v-if="flag" ref="humidity"></humidity-page-vue>
                </div>
                
            </section>
            <section class="screen-middle">
                <div id="comp">
                    <!--地图组件-->
                    <map-page-vue></map-page-vue>
                </div>
            </section>
            <section class="screen-right">
                <div id="comp">
                    <div id="right-top">
                        <wind-direction-page ref="power" v-if="flag"></wind-direction-page>
                    </div>
                    <!--风力风向组件-->
                    <div id="right-bottom">
                        <wind-power-page-vue ref="wind" v-if="flag"></wind-power-page-vue>
                    </div>
                </div>
            </section>
        </div>
        <div class="footer">
            <span>数据来源：高德地图天气api</span>
        </div>
    </div>
</template>

<script>
import {getLiveData, connectWebSocket} from '../api/getData'
import { mapGetters,mapState } from 'vuex';
import webSocket from '@/api/webSocket';

import TemperaturePageVue from './TemperaturePage.vue';
import WindPowerPageVue from './WindPowerPage.vue';
import WindDirectionPage from './WindDirectionPage.vue';
import HumidityPageVue from './HumidityPage.vue';
import MapPageVue from './MapPage.vue';

export default {
    data(){
        return{
            flag:true,
            nowTime:"",
            /** 
            * 页面左上角的城市，即当前城市
            * 以及当前城市天气状况
            */
            cityNameNow:"成都市",
            cityWeatherNow:"未知",
            cityTemperNow: "0.0℃",
            /**
            * 各个城市的气温数据，数组形式
            */
            temperaturedata:[],
            /**
            * 当前城市的湿度数据
            */
            humiditydata:"0.0",
            /**
             * 风向、风力数据
             * 考虑用多个数组来存？
             * 还是采用多层对象的形式？
             */
            /**
             * 如
             * {
             *      "成都市": [],
             *      "贵阳市": [],
             * }
             */
            citywinddata:{},
            windPowerData:{},
        }
    },
    computed:{
        //getters 获取数据
        ...mapGetters(['getLives', 'getCityNameCode','getCityName']),
        ...mapState(['lives']),
        headerSrc() {
            return '/static/img/' + 'header_border_dark.png';
        },
    },
    mounted(){
        console.log("Screen Mounted");
        this.showTimes();
        // this.setTemperatureData();
        // this.setHumidityData();
        // this.setCityWindData();
        // this.setHeader();
        console.log("screen cityName数据",this.getCityName);
        console.log("screen lives数据",this.getLives);
        console.log("screen温度数据",this.temperaturedata);
        console.log("screen wind数据", this.citywinddata);
        console.log("screen 湿度数据", this.humiditydata);
    },
    updated(){
        //console.log("Screen updated");
        
    },
    created(){
        //建立webSocket连接
        connectWebSocket();
    },
    destroyed(){
        webSocket.close();
    },
    /**
     * 监听属性，监听state中保存的值是否变化
     * 来达到刷新页面的效果
     */
     watch:{
        getCityName : {
            deep:true,
            handler(newVal) {
                console.log("城市名称表发生了变化：", newVal);
                this.cityNameNow = this.getCityName[0];
                //查询城市列表 的气象数据
                this.$nextTick(()=>{
                    this.getData();
                    this.$nextTick(()=>{
                        console.log("state中的lives：",this.$store.state.liveData.lives);
                        this.getLives = this.$store.state.liveData.lives;
                    })
                })
                
            },
        },
        getCityNameCode : {
            deep : true,
            handler(newVal) {
                console.log("城市编码信息表发生了变化：", newVal);
            }
        },
        getLives : {
            deep : true,
            handler(newVal) {
                console.log("城市实况数据表发生了变化：", newVal);
                
                this.flag = false;
                this.$nextTick(() => {
                    this.setTemperatureData();
                    this.setHumidityData();
                    this.setCityWindData();
                    this.setHeader();
                    
                    this.flag = true;
                    this.$nextTick(()=>{
                        //this.$refs.temp.$data.temperaturedata = this.temperaturedata;
                        this.$refs.temp.init(this.temperaturedata);
                        this.$refs.wind.init(this.citywinddata);
                        this.$refs.power.init(this.windPowerData);
                        this.$refs.humidity.init(this.humiditydata);
                    })
                    
                })
            }
        },
    },
    methods:{
        //时间格式化显示
        getNowTime(){
            var date = new Date();
            var sign2 = ":";
            var year = date.getFullYear() // 年
            var month = date.getMonth() + 1; // 月
            var day = date.getDate(); // 日
            var hour = date.getHours(); // 时
            var minutes = date.getMinutes(); // 分
            var seconds = date.getSeconds() //秒
            var weekArr = ['星期一', '星期二', '星期三', '星期四', '星期五', '星期六', '星期天'];
            var week = weekArr[date.getDay()];
                // 给一位数的数据前面加 “0”
            if (month >= 1 && month <= 9) {
                    month = "0" + month;
            }
            if (day >= 0 && day <= 9) {
                day = "0" + day;
            }
            if (hour >= 0 && hour <= 9) {
                hour = "0" + hour;
            }
            if (minutes >= 0 && minutes <= 9) {
                minutes = "0" + minutes;
            }
            if (seconds >= 0 && seconds <= 9) {
                seconds = "0" + seconds;
            }
            this.nowTime =  year + "-" + month + "-" + day + " " + hour + sign2 + minutes + sign2 + seconds;
        },
        showTimes() {
            this.getNowTime();
            clearInterval(this.timer);
            this.timer = setInterval(this.showTimes, 1000);
        }, 

        /**
         * 通过WebSocket向后台发起请求，获取数据
         * 并过滤数据，初始化各个组件的数据
        */
        getData(){
            /**
             * 获取 this.getCityName 中前三个城市的实况天气数据
             * 获取的数据保存在 this.getLives 中
             */
             for(let i = 0; i < this.getCityName.length; i++){
                if(i >= 3){
                    break;
                }else{
                    getLiveData(this.getCityName[i]);
                }
            }
        },

        setTemperatureData(){
            //从store中读取出各城市的气温数据
            // 保存到 temperatureData 中
            //更新温度数据
            for(let i = 0; i < this.getCityName.length; i++){
                if(i >= 3)break;
                //console.log("添加天气到城市：",this.getCityName[i]);
                this.temperaturedata[i] = [];
                for(let data of this.getLives[this.getCityName[i]]){
                    //console.log("添加的天气数据为：");
                    //console.log(data);
                    this.temperaturedata[i].unshift(data.temperature);
                    //console.log("添加后的td：");
                    //console.log(this.temperaturedata[i]);
                }
            }
            
            //console.log("所有城市气温数据：");
            //console.log(this.temperaturedata);
        },

        setHumidityData(){
            //初始化当前城市的湿度数据
            let len = this.getLives[this.cityNameNow].length;
            if(len>0){
                this.humiditydata = this.getLives[this.cityNameNow][len - 1].humidity;
            }
        },

        setCityWindData(){
            //初始化最新三个城市的风力、风向数据
            for(let i = 0; i < this.getCityName.length; i++){
                if(i >= 3)break;
                let name = this.getCityName[i];
                //console.log("添加风参数到城市：",name);
                this.citywinddata[name] = new Array(8);
                this.windPowerData[name] = new Array();

                for(let data of this.getLives[name]){
                    let dir = data.winddirection;
                    let power = data.windpower === "≤3" ? "3":data.windpower;

                    switch(dir){
                        case "北": 
                            this.citywinddata[name][0] = power;
                            break;
                        case "西北": 
                            this.citywinddata[name][1] = power;
                            break;
                        case "西": 
                            this.citywinddata[name][2] = power;
                            break;
                        case "西南": 
                            this.citywinddata[name][3] = power;
                            break;
                        case "南": 
                            this.citywinddata[name][4] = power;
                            break;
                        case "东南": 
                            this.citywinddata[name][5] = power;
                            break;
                        case "东": 
                            this.citywinddata[name][6] = power;
                            break;
                        case "东北": 
                            this.citywinddata[name][7] = power;
                            break;
                        default: break; 
                    }
                    //添加风力数据
                    this.windPowerData[name].unshift(power);
                    
                    //console.log("添加后的wd：");
                    //console.log(this.citywinddata[name]);
                }
            }
            //console.log("所有城市 wind 数据");
            //console.log(this.citywinddata);
        },

        setHeader(){
            console.log("当前城市的基本信息修改：");
            this.cityNameNow = this.getCityName[0];
            console.log("当前城市",this.cityNameNow);
            this.cityWeatherNow = this.getLives[this.cityNameNow][this.getLives[this.cityNameNow].length-1].weather;
            console.log("当前城市",this.cityWeatherNow);
            this.cityTemperNow = this.getLives[this.cityNameNow][this.getLives[this.cityNameNow].length-1].temperature + "℃";
            console.log("当前城市",this.cityTemperNow);
        }

    },
    components:{
        TemperaturePageVue,
        WindPowerPageVue,
        HumidityPageVue,
        MapPageVue,
        WindDirectionPage,
    },
}
</script>

<style lang="less" scoped>
.screen-container {
  width: 100%;
  height: 100%;
  padding: 0 20px;
  background-color: #161522;
  color: #fff;
  box-sizing: border-box;
}

.screen-header {
  width: 100%;
  height: 64px;
  font-size: 20px;
  position: relative;
  > div {
    img {
      width: 100%;
    }
  }
  .title {
    position: absolute;
    left: 50%;
    top: 50%;
    font-size: 20px;
    transform: translate(-50%, -50%);
  }
  .title-right {
    display: flex;
    align-items: center;
    position: absolute;
    right: 0px;
    top: 50%;
    transform: translateY(-80%);
  }
  .qiehuan {
    width: 28px;
    height: 21px;
    cursor: pointer;
  }
  .datetime {
    font-size: 15px;
    margin-left: 10px;
  }
  .logo {
    position: absolute;
    left: 0px;
    top: 50%;
    font-size: 17px;
    transform: translateY(-80%);
  }
}

.screen-body{
    width: 100%;
    height: 90%;
    display: flex;
    margin-top: 13px;
    .screen-left{
        margin-top: 13px;
        height: 92%;
        width: 27.6%;
        #left-top {
            height: 57%;
            position: relative;
        }
        #left-bottom {
            height: 40%;
            margin-top: 25px;
            position: relative;
        }
    }
    .screen-middle{
        height: 92%;
        width: 41.5%;
        margin-top: 13px;
        margin-left: 1.6%;
        margin-right: 1.6%;
        #comp{
            width: 100%;
            height: 100%;
            position: relative;
        }
        // #middle-top {
        //     width: 100%;
        //     height: 56%;
        //     position: relative;
        // }
        // #middle-bottom {
        //     margin-top: 25px;
        //     width: 100%;
        //     height: 28%;
        //     position: relative;
        // }
    }
    .screen-right{
        height: 92%;
        width: 27.6%;
        margin-top: 13px;
        #comp{
            width: 100%;
            height: 100%;
            position: relative;
        }
        #right-top {
            height: 57%;
            position: relative;
        }
        #right-bottom {
            height: 40%;
            margin-top: 25px;
            position: relative;
        }
    }
    
}
.footer{
    height: 38px;
    width: 100%;
    display: flex;
    justify-content: end;

    >span{
        text-align: center;
        font-size: 15px;
        margin-left: 10px;
    }
}

</style>