<template>
    <div class="com-container">
        <div class="com-chart" ref="wind_ref"></div>
    </div>
    
</template>

<script>
import { mapGetters } from 'vuex';
export default{
    data(){
        return{
            charInstance: null,
            //需要的数据有城市名称数组、
            //各个城市的气象数据 用于过滤出风力、风向数据
            citywinddata:{},
        }
    },
    computed:{
        ...mapGetters(['getCityName'])
    },
    mounted(){
        //初始化图表
        this.ininChart();
        //更新数据
        this.updateData();
    },
    methods:{
        ininChart(){
            this.charInstance = echarts.init(this.$refs.wind_ref, 'chalk');
        },

        initData(data){
            this.citywinddata = data;
        },

        updateData(){
            //配置项
            const option = {
                color : ['#2988ff', '#FFE434', '#ff8733', '#FF917C'],
                title: {
                    text: '▎风力风向雷达图',
                    left: 20,
                    top: 20,
                    textStyle:{
                        fontSize:17,
                        color: 'rgba(7,252,250,0.8)', 
                    },
                },
                legend: {
                    left:'5%',
                    bottom:'5%',
                    top:'65%',
                    orient:'vertical'
                },
                radar: [
                    {
                        indicator: [
                            {text: '北'},
                            {text: '西北'},
                            {text: '西'},
                            {text: '西南'},
                            {text: '南'},
                            {text: '东南'},
                            {text: '东'},
                            {text: '东北'},
                        ],
                        center: ['50%', '50%'],
                        radius: 120,
                        startAngle: 90,
                        splitNumber: 6,
                        shape: 'circle',
                        axisName: {
                            formatter: '{value}',
                            color:'#428BD4',
                        },
                        splitArea:{//坐标轴在grid区域中的分割预期与
                            areaStyle:{
                                color: ['#77EADF', '#26C3BE', '#64AFE9', '#428BD4'],
                                shadowColor: 'rgba(0, 0, 0, 0.2)',
                                shadowBlur: 10
                            },
                        },
                        axisLine: {//坐标轴轴线
                            lineStyle:{
                                color: 'rgba(211, 253, 250, 0.8)'
                            }
                        },
                        splitLine: {//分割线
                            lineStyle: {
                                color: 'rgba(211, 253, 250, 0.8)'
                            }
                        },//end
                    }
                ],//end of radar
                series: [
                    {
                        type: 'radar',
                        emphasis:{//高亮状态
                            focus: 'series',
                            lineStyle: {
                                width:4
                            },
                        },
                        data:[//数据
                            {
                                value: this.citywinddata[this.getCityName[0]],
                                name: this.getCityName[0],
                                symbol:'rect',
                                symbolSize:6,
                                lineStyle: {
                                    type: 'dashed'
                                },
                                label:{
                                    show: true,
                                    formatter: function(params){
                                        return params.value
                                    }
                                },
                                areaStyle: {
                                    color: 'rgba(41, 136, 255, 0.6)'
                                }
                            },
                            {
                                value: this.citywinddata[this.getCityName[1]],
                                name: this.getCityName[1],
                                symbol:'rect',
                                symbolSize:6,
                                lineStyle: {
                                    type: 'dashed'
                                },
                                label:{
                                    show: true,
                                    formatter: function(params){
                                        return params.value
                                    }
                                },
                                areaStyle: {
                                    color: 'rgba(255, 228, 52, 0.6)'
                                }
                            },
                            {
                                value: this.citywinddata[this.getCityName[2]],
                                name: this.getCityName[2],
                                symbol:'rect',
                                symbolSize:6,
                                lineStyle: {
                                    type: 'dashed'
                                },
                                label:{
                                    show: true,
                                    formatter: function(params){
                                        return params.value
                                    }
                                },
                                areaStyle: {
                                    color: 'rgba(255, 135, 51, 0.6)'
                                }
                            }
                        ],//end of data
                    }//end of one series
                ]//end of series
            };//end of option
            this.charInstance.setOption(option);
        }
    },
    watch:{
        citywinddata:{
            immediate: true,
            deep:true,
            handler(newVal){
                console.log("wind组件需要更新数据了:", this.citywinddata);
                this.$nextTick(() => {
                    this.updateData();
                })
            }
        }
    }
}

</script>

<style lang="less" scoped>

</style>