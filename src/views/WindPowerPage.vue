<template>
    <div class="com-page">
        <wind-power ref="child"></wind-power>
    </div>
</template>

<script>

import WindPower from '@/components/WindPower.vue';
import { mapGetters } from 'vuex';

export default{
    components:{
        WindPower,
    },
    data(){
        return{
            citywinddata:{},
            flag:true,
        }
    },
    methods:{
        init(data){
            this.citywinddata = data;
        }
    },
    watch:{
        citywinddata:{
            immediate:true,
            deep:true,
            handler(newVal){
                console.log("wind页面需要更新了", newVal);
                this.$nextTick(()=>{
                    this.$refs.child.initData(newVal);
                })  
            }
        }
    },
    mounted(){
        console.log("WindPowerPage Mounted");
        console.log("WindPowerPage cityName数据",this.getCityName);
        console.log("WindPowerPage lives数据",this.getLives);
        console.log("WindPowerPage",this.temperaturedata);
    },
    updated(){
        console.log("WindPowerPage updated");
        
    },
    computed:{
        ...mapGetters(['getLives', 'getCityNameCode','getCityName']), 
    }
    
}
</script>

<style lang="less" scoped>

</style>