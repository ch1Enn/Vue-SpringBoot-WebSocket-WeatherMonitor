<!--
温度图表组件，同时添加路由 /TemperaturePage 到router中
在该组件中，通过子组件注册的方式，显示出Temperature.vue组件
-->
<template>
    <div class="com-page">
        <temperature v-if="flag" ref="child" ></temperature>
    </div>
</template>

<script>

import TemperatureVue from '@/components/Temperature.vue';
import { mapGetters } from 'vuex';
export default{
    components:{
        temperature:TemperatureVue
    },
    data(){
        return{
            temperaturedata:[],
            flag:true,
        }
    },
    methods:{
        init(data){
            console.log("init data: ", data);
            this.temperaturedata = data;
        }
    },
    // props:{
    //     temperaturedata:Array,
    // },
    watch:{
        temperaturedata:{
            immediate:true,
            deep:true,
            handler(newVal){
                console.log("温度页面需要更新了", newVal);
                this.$nextTick(()=>{
                    this.$refs.child.initData(newVal);
                })  
            }
        }
    },
    mounted(){
        console.log("TemperaturePage Mounted");
        console.log("TemperaturePage cityName数据",this.getCityName);
        console.log("TemperaturePage lives数据",this.getLives);
        console.log("TemperaturePage",this.temperaturedata);
    },
    updated(){
        console.log("TemperaturePage updated");
        
    },
    computed:{
        ...mapGetters(['getLives', 'getCityNameCode','getCityName']), 
    }
}
</script>

<style lang="less" scoped>

</style>