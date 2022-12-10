<!--
    温度数据展示组件
    折线图
-->
<template>
    <div class="com-container">
        <!-- <button @click="sendMessage">请求数据</button> -->
        <div class="com-chart" ref="temprature_ref"></div>
    </div>
</template>

<script>
import { mapGetters } from 'vuex';

export default{
    data(){
        return{
            chartInstance: null,
            temperaturedata:[],
            xData:['now','-3h','-6h','-9h','-12h','-15h','-18h']
        }
    },
    // props:{
    //     temperaturedata:Array,
    // },
    mounted(){
        //Vue 挂载完成后 开始加载ECharts
    
        console.log("Temperature Mounted");
        console.log("Temperature cityName数据",this.getCityName);
        console.log("Temperature lives数据",this.getLives);
        console.log("Temperature",this.temperaturedata);
    
        this.initChart();
        this.updateData();
    },
    created(){},
    updated(){
        console.log("Temperature updated");
        console.log("Temperature cityName数据",this.getCityName);
        console.log("Temperature lives数据",this.getLives);
        console.log("Temperature",this.temperaturedata);
    },
    computed:{
        ...mapGetters(['getLives', 'getCityNameCode','getCityName']), 
    },
    watch:{
        temperaturedata : {
            immediate: true,
            deep: true,
            handler(newVal){
                console.log("温度组件需要更新数据了", newVal);
                console.log(this.temperaturedata, this.getCityName);
                this.$nextTick(() => {
                    //this.initChart();
                    this.updateData();
                })
                
            }
        },
    },
    methods:{
        //初始化 折线图 图表
        initChart(){
            //mounted 方法之后dom元素加载完成
            //才可调用该方法初始化 图表
            this.chartInstance = echarts.init(this.$refs.temprature_ref, 'chalk');
        },

        initData(data){
            console.log("initData :", data);
            this.temperaturedata = data;
        },

        //更新图表的数据
        updateData() {
            //颜色反了。。。
            const option = {
                //最多展示三个城市的温度变化
                color: ['#80FFA5', '#00DDFF', '#37A2FF'],
                title: {
                    text:'▎气温变化表',
                    left: 20,
                    top: 10,
                    textStyle:{
                        fontSize:17,
                        color: 'rgba(7,252,250,0.8)', 
                    },
                    
                },
                tooltip:{
                    trigger: 'axis',
                    axisPointer:{
                        type:'cross',
                        label:{
                            backgroundColor:'#6a7985'
                        }
                    }
                },
                legend:{
                    data: this.getCityName,
                    orient:'horizontal',
                    top:10,
                },
                toolbox: {
                    feature: {
                        saveAsImage: {}
                    }
                },
                grid: {
                    left: '7%',
                    right: '4%',
                    top: '10%',
                    bottom: '3%',
                    containLabel: true
                },
                xAxis: [
                    {
                        type:'category',
                        boundaryGap: false,
                        inverse: true,
                        data: this.xData,
                    }
                ],
                yAxis: [
                    {
                        type: 'value'
                    }
                ],
                series: [
                    {
                        name: this.getCityName[0],
                        type: 'line',
                        stack: 'Total',
                        smooth: true,
                        lineStyle: {
                            width: 0
                        },
                        showSymbol: false,
                        label: {
                            show: true,
                            position: 'top'
                        },
                        areaStyle:{
                            opacity: 0.8,
                            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                                {
                                    offset: 0,
                                    color: 'rgb(128, 255, 165)'
                                },
                                {
                                    offset: 1,
                                    color: 'rgb(1, 191, 236)'
                                }
                            ])
                        },
                        emphasis: {
                            focus: 'series'
                        },
                        data: this.temperaturedata[0],
                    },//第一条折线
                    {
                        name: this.getCityName[1],
                        type: 'line',
                        stack: 'Total',
                        smooth: true,
                        lineStyle: {
                            width: 0
                        },
                        showSymbol: false,
                        label: {
                            show: true,
                            position: 'top'
                        },
                        areaStyle:{
                            opacity: 0.8,
                            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                                {
                                    offset: 0,
                                    color: 'rgb(0, 221, 255)'
                                },
                                {
                                    offset: 1,
                                    color: 'rgb(77, 119, 255)'
                                }
                            ])
                        },
                        emphasis: {
                            focus: 'series'
                        },
                        data: this.temperaturedata[1],
                    },//第二条折线
                    {
                        name: this.getCityName[2],
                        type: 'line',
                        stack: 'Total',
                        smooth: true,
                        lineStyle: {
                            width: 0
                        },
                        showSymbol: false,
                        label: {
                            show: true,
                            position: 'top'
                        },
                        areaStyle:{
                            opacity: 0.8,
                            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                                {
                                    offset: 0,
                                    color: 'rgb(55, 162, 255)'
                                },
                                {
                                    offset: 1,
                                    color: 'rgb(116, 21, 219)'
                                }
                            ])
                        },
                        emphasis: {
                            focus: 'series'
                        },
                        data: this.temperaturedata[2],
                    },//第三条折线
                ]
            };

            this.chartInstance.setOption(option);
            console.log("温度组件得到的数据：",this.getCityName, this.temperaturedata);
        },
    }
}
</script>

<style lang="less" scoped>

</style>