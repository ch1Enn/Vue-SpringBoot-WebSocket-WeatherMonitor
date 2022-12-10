<template>
    <div class="com-container">
        <div class="com-chart" ref="humidity_ref"></div>
    </div>
</template>

<script>
import { mapGetters } from 'vuex';
export default{
    data(){
        return{
            chartInstance:null,
            humiditydata:null,
        }
    },
    
    computed:{
        ...mapGetters(['getCityName'])
    },
    mounted(){
        this.initChart();
        this.updateData();
        
    },
    methods:{
        initChart(){
            //初始化图表
            this.chartInstance = echarts.init(this.$refs.humidity_ref,'chalk');
            
        },

        initData(data){
            this.humiditydata = data;
        },  

        updateData(){
            const option1 = {
                title: {
                    text:'▎当前湿度',
                    left: 20,
                    top: 20,
                    textStyle:{
                        fontSize:17,
                        color: 'rgba(7,252,250,0.8)', 
                    },
                },
                series: [
                    {
                        type: 'gauge',
                        center: ['50%', '60%'],
                        startAngle: 200,
                        endAngle: -20,
                        min: 0,
                        max: 100,
                        splitNumber: 10,
                        itemStyle: {
                            color: '#00F5FF'
                        },
                        progress: {
                            show: true,
                            width: 30
                        },
                        pointer: {
                            show: false
                        },
                        axisLine: {
                            lineStyle: {
                                width: 30
                            }
                        },
                        axisTick: {
                            distance: -45,
                            splitNumber: 5,
                            lineStyle: {
                                width: 2,
                                color: '#7FFFD4'
                            }
                        },
                        splitLine: {
                            distance: -52,
                            length: 14,
                            lineStyle: {
                                width: 3,
                                color: '#00EE76'
                            }
                        },
                        axisLabel: {
                            distance: -20,
                            color: '#7FFFD4',
                            fontSize: 20
                        },
                        anchor: {
                            show: false
                        },
                        title: {
                            show: true,
                            text:'wendu'
                        },
                        detail: {
                            valueAnimation: true,
                            width: '60%',
                            lineHeight: 40,
                            borderRadius: 8,
                            offsetCenter: [0, '-15%'],
                            fontSize: 60,
                                fontWeight: 'bolder',
                                formatter: '{value} %',
                            color: 'auto'
                        },
                        data: [
                            {
                                value: this.humiditydata
                            }
                        ]
                    },
                    {
                        type: 'gauge',
                        center: ['50%', '60%'],
                        startAngle: 200,
                        endAngle: -20,
                        min: 0,
                        max: 100,
                        itemStyle: {
                            color: '#00BFFF'
                        },
                        progress: {
                            show: true,
                            width: 8
                        },
                        pointer: {
                            show: false
                        },
                        axisLine: {
                            show: false
                        },
                        axisTick: {
                            show: false
                        },
                        splitLine: {
                            show: false
                        },
                        axisLabel: {
                            show: false
                        },
                        detail: {
                            show: false
                        },
                        data: [
                            {
                                value: this.humiditydata
                            }
                        ]
                    }
                ]
            };

            const option = {
                title: {
                    text:'▎当前湿度',
                    left: 20,
                    top: 20,
                    textStyle:{
                        fontSize:17,
                        color: 'rgba(7,252,250,0.8)', 
                    },
                },
                tooltip:{
                    formatter: '{a} <br/>{b} : {c}%'
                },
                series:[
                    {
                        name: this.getCityName[0]+'湿度',
                        type: 'gauge',
                        progess:{
                            show: true,
                        },
                        detail:{
                            valueAnimation: true,
                            formatter: '{value}'
                        },
                        data:[
                            {
                                value: this.humiditydata,
                            }
                        ]
                    }
                ]
            }

            this.chartInstance.setOption(option);
        }
    },
    created(){

    },
    watch:{
        humiditydata : {
            immediate: true,
            deep: true,
            handler(newVal){
                console.log("湿度组件需要更新数据了",this.humiditydata);
                this.$nextTick(() => {
                    this.updateData();
                })
                
            }
        }
    },

}
</script>

<style lang="less" scoped>

</style>