<!--
    温度数据展示组件
    折线图
-->
<template>
    <div class="com-container">
        <div class="com-chart" ref="winPow_ref"></div>
    </div>
</template>

<script>
import { mapGetters, mapState } from 'vuex';

export default{
    data(){
        return{
            chartInstance: null,
            //各个城市的气象数据
            citywinddata: {},//所获取的城市的实况天气数据
            //cityName:null,
            xData:['now','-3h','-6h','-9h','-12h','-15h','-18h']
        }
    },
    mounted(){
        //Vue 挂载完成后 开始加载ECharts
        this.initChart();
        this.updateData();
    },
    created(){},
    computed:{
        ...mapGetters(['getLives', 'getCityNameCode','getCityName']),
    },
    watch:{
        citywinddata:{
            immediate: true,
            deep:true,
            handler(newVal){
                console.log("windPower组件需要更新数据了:", this.citywinddata);
                this.$nextTick(() => {
                    this.updateData();
                })
            }
        }
    },
    updated(){
        console.log("WindDire updated");
        console.log("WindDire cityName数据",this.getCityName);
        console.log("WindDire lives数据",this.getLives);
        console.log("WindDire",this.temperaturedata);
    },
    methods:{
        //初始化 折线图 图表
        initChart(){
            //mounted 方法之后dom元素加载完成
            //才可调用该方法初始化 图表
            this.chartInstance = echarts.init(this.$refs.winPow_ref, 'chalk');
        },

        initData(data){
            this.citywinddata = data;
        },

        //更新图表的数据
        updateData() {
            const option = {
                title: {
                    text: '▎风力变化表',
                    left: 20,
                    top: 10,
                    textStyle:{
                        fontSize:17,
                        color: 'rgba(7,252,250,0.8)', 
                    },
                },
                tooltip: {
                    trigger: 'axis',
                    axisPointer: {
                        type: 'cross',
                        label: {
                            backgroundColor: '#6a7985'
                        }
                    }
                },
                legend: {
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
                        type: 'category',
                        boundaryGap: false,
                        inverse:true,
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
                        name:this.getCityName[0],
                        type: 'line',
                        stack: 'Total',
                        areaStyle: {},
                        emphasis: {
                            focus: 'series'
                        },
                        data: this.citywinddata[this.getCityName[0]],
                    },
                    {
                        name: this.getCityName[1],
                        type: 'line',
                        stack: 'Total',
                        areaStyle: {},
                        emphasis: {
                            focus: 'series'
                        },
                        data: this.citywinddata[this.getCityName[1]]
                    },
                    {
                        name: this.getCityName[2],
                        type: 'line',
                        stack: 'Total',
                        areaStyle: {},
                        emphasis: {
                            focus: 'series'
                        },
                        data: this.citywinddata[this.getCityName[2]]
                    },
                ]
            };

            this.chartInstance.setOption(option);
        },
    }
}
</script>

<style lang="less" scoped>

</style>