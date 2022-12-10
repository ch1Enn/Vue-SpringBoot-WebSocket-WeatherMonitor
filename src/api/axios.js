// 万能请求封装
import axios from 'axios'
// 设置跨域请求头
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
// 定义post请求方法
const axiosPost = function (url, params) {
    return new Promise((resolve, reject) => {
        axios
            .post(url, params)
            .then(res => {
                resolve(res);
            })
            .catch(err => {
                reject(err);
            });
    });
};
// 定义get请求方法
const axiosGet = function (url, params) {
    return new Promise((resolve, reject) => {
        axios
            .get(url, {
                params,
            })
            .then(res => {
                resolve(res);
            })
            .catch(err => {
                reject(err);
            });
    });
};

export async function getCity(addr) {
    const params = {
        key: '95b9e8a6bbe5bfb920704b9a17ef9c41', // 你的key  1
        address: addr, // 你的地址信息 2
    };
    let res = await axiosGet('https://restapi.amap.com/v3/geocode/geo?parameters', params);
    // let res = await axiosPost(url, params);  post同理
    //console.log('打印res：', res.data)
    // return res.data
    //console.log(res.data.geocodes[0].adcode);
    return res.data.geocodes[0].adcode;
}

// 执行方法
async function getWeatherData(){
    const city = await getCity("贵阳市");
    console.log(city);
    const params = {
        key: '95b9e8a6bbe5bfb920704b9a17ef9c41', // 你的key  1
        city: city,
        extensions: 'base'
    }
    let res = await axiosGet('https://restapi.amap.com/v3/weather/weatherInfo?parameters', params);
    console.log('打印res：', res.data.lives[0])
}


