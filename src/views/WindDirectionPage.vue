<!--风力数据折线堆叠图-->
<template>
    <div class="com-page">
        <wind-data ref="child"></wind-data>
    </div>
</template>

<script>
import windData from '@/components/WindDirection.vue';
import { mapGetters } from 'vuex';

export default{
    components:{
        windData
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
        },
    },
    watch:{
        citywinddata:{
            immediate:true,
            deep:true,
            handler(newVal){
                console.log("风力页面需要更新了", newVal);
                this.$nextTick(()=>{
                    this.$refs.child.initData(newVal);
                })  
            }
        }
    },
    mounted(){
        console.log("WindDirePage Mounted");
        console.log("WindDirePage cityName数据",this.getCityName);
        console.log("WindDirePage lives数据",this.getLives);
        console.log("WindDirePage",this.temperaturedata);
    },
    updated(){
        console.log("WindDirePage updated");
        
    },
    computed:{
        ...mapGetters(['getLives', 'getCityNameCode','getCityName']), 
    }
}
</script>

<style lang="less" scoped>

</style>