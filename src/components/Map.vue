<template>
    <div class="com-container">
        <div class="com-chart" ref="map_ref"></div>
    </div>
    
</template>

<script>
import chinaMap from '../../public/static/map/china.json'
import {getProvinceMapInfo} from '../utils/map_utils'
import { mapGetters } from 'vuex';
import { getCity } from '../api/axios.js'

export default{
    data(){
        return{
            chartInstance: null,
            cityNow: null,
        }
    },
    mounted(){
        this.initChart();
        //this.updateData();
    },
    methods:{
        async initChart(){
            this.chartInstance = echarts.init(this.$refs.map_ref, 'chalk');
            //获取中国地图矢量数据
            //在本地文件中
            //http://localhost:8081/static/map/china.json
            //const ret =  await axios.get('http://localhost:8081/static/map/china.json')
            //console.log(ret);

            //注册地图
            echarts.registerMap('china', chinaMap);

            //地图配置项
            const initOption = {
                title:{
                    text:'▎省会城市概览',
                    left: 20,
                    top: 20,
                    textStyle:{
                        fontSize:17,
                        color: 'rgba(7,252,250,0.8)', 
                    },
                },
                geo:{
                    type: 'map',
                    map: 'china',
                    itemStyle: {
                        areaColor: '#15f6f9',
                        borderColor: '#333'
                    },
                    
                },
                legend: {
                    left: '5%',
                    bottom: '5%',
                    orient: 'vertical',
                },
            };
            this.chartInstance.setOption(initOption);
            //地图点击事件
            //点击省份后查询省会城市的天气
            this.chartInstance.on('click', arg => {
                //console.log(arg); arg.name为点击省份名字
                this.cityNow = getProvinceMapInfo(arg.name);

                //如果state中该城市不存在，则需要查询该城市的城市编码
                if(this.getCityName.indexOf(this.cityNow) === -1){
                    getCity(this.cityNow).then((res) => {
                        //添加城市 {名称：编码} 到state中的cityNameCode中
                        let nameCode = {};
                        nameCode[this.cityNow] = res;
                        //操作 cityNameCode
                        this.$store.commit("updateCityNameCode", nameCode);
                        // console.log("修改后的cityNameCode：");
                        // console.log(this.getCityNameCode, this.getCityName);
                    })
                }else {
                    //存在该城市，需要把该城市放到 cityName 第一位
                    this.$store.commit('updateCityName',this.cityNow);
                }
                
            })
        },
    },
    computed: {
        ...mapGetters(['getCityName', 'getCityNameCode']),
    }

}
</script>

<style lang="less" scoped>

</style>