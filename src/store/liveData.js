
export default {
    namspaced: true,
    state: {
        /*
        保存城市对应的实况天气数据
        如：
        {
            '成都市' : [data1，data2],
            '贵阳市' : [data1, data2],
            ...
        }
        */
        lives:{
            '成都市' : new Array(),
        },

        //保存已经查询过的所有城市名称和城市编码
        cityNameCode:{"成都市":"510100"},

        //保存已经查询过的所有城市名称，数组
        cityName: ["成都市"],
    },
    actions: {
        //调用接口，获取实况天气数据
        getLives({commit}, live){

        }
    },
    mutations: {
        //live 为某城市的一条实况天气数据，将其添加到对应城市的数组中
        updateLives(state, live){
            let name = live.city;
            //添加一条气象数据到对应的城市 数组 末尾
            Object.keys(state.lives).forEach(item => {
                if(item === name){
                    let len = state.lives[name].length;
                    //console.log("最后一条数据："+state.lives[name][len - 1]);
                    //不添加重复的数据
                    if(state.lives[name][len - 1] !== undefined && state.lives[name][len - 1].reporttime !== live.reporttime){
                        state.lives[name].push(live);
                    }else if(state.lives[name][len - 1] === undefined){
                        state.lives[name].push(live);
                    }
                    console.log("添加数据成功");
                }
            })
                
            // console.log("更新后的 " + name + " 的天气数据为：" );//+ state.lives[name]
            // state.lives[name].forEach((item) => {
            //     console.log(item);
            // })
        },
        updateCityNameCode(state, data){
            let [key] = Object.entries(data);
            if(state.cityName.indexOf(key[0]) === -1){
                state.cityNameCode[key[0]] = key[1];
                state.lives[key[0]] = new Array();
                state.cityName.unshift(key[0]);
                // console.log("更新后的城市信息表:", state.cityNameCode);
                // console.log("更新后的城市表",state.cityName);
            }else{
                console.log("城市已存在，不需要新增");
            }
        },

        updateCityName(state, name){
            let indx = state.cityName.indexOf(name);
            state.cityName.splice(indx,1);
            state.cityName.unshift(name);
        }
    },
    getters: {
        getLives : state => state.lives,
        getCityNameCode : state => state.cityNameCode,
        getCityName : state => state.cityName,
        
        // getCityTemperature : (state) => {
        //     //let threeCities = state.getters['livaData/getThreeCities'];
        //     let Cities = new Array();
        //     console.log("Cities" + Cities);
        //     for(const [key, val] of Object.entries(state.cityNameCode)){
        //         //插入到第一个位置
        //         Cities.unshift(key);
        //     }
        //     //只需要最后三个城市
        //     let threeCities = [];
        //     if(Cities.length <= 3){
        //         threeCities = Cities;
        //     }else{
        //         threeCities = Cities.slice(0, 3);
        //     }
            
        //     //各个城市的 温度数据，最后返回
        //     let cityTemper = [];

        //     for(let i = 0; i < threeCities.length; i++){
        //         for(const data of state.lives[threeCities[i]]){
        //             //温度数据也需要逆序展示到折线图中
        //             cityTemper[i].unshift(data.temperature);
        //         }
        //     }
        //     console.log("cityTemper:"+cityTemper);

        //     return cityTemper;
        // },

        // getThreeCities : (state) => {
        //     let Cities = [];
        //     console.log("所有城市信息：");
        //     console.log(state.cityNameCode);
        //     console.log(Object.entries(state.cityNameCode));
        //     for(const [key,val] of Object.entries(state.cityNameCode)){
        //         //插入到第一个位置
        //         Cities.unshift(key);
        //     }
        //     //只需要最后三个城市
        //     let three = [];
        //     if(Cities.length <= 3){
        //         three = Cities;
        //     }else{
        //         three = Cities.slice(0, 3);
        //     }
        //     console.log("three:" +three);
        //     return three;
        // }
    }

}