<template>
    <div class="com-page">
        <humidity-vue ref="child"></humidity-vue>
    </div>
</template>

<script>
import humidityVue from '@/components/Humidity.vue';
import { mapGetters } from 'vuex';
export default{
    data(){
        return{
            humiditydata:null,
        }
    },
    components:{
        humidityVue,
    },
    methods:{
        init(data){
            this.humiditydata = data;
        }
    },
    watch:{
        humiditydata:{
            immediate:true,
            deep:true,
            handler(newVal){
                console.log("湿度页面需要更新了", newVal);
                this.$nextTick(()=>{
                    this.$refs.child.initData(newVal);
                })  
            }
        }
    },
    mounted(){
        console.log("HumidityPage Mounted");
        console.log("HumidityPage cityName数据",this.getCityName);
        console.log("HumidityPage lives数据",this.getLives);
        console.log("HumidityPage",this.humiditydata);
    },
    updated(){
        console.log("HumidityPage updated");
        
    },
    computed:{
        ...mapGetters(['getLives', 'getCityNameCode','getCityName']), 
    }
    
}
</script>

<style lang="less" scoped>

</style>