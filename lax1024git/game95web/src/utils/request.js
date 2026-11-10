import axios from 'axios';
import store from '@/store/index.js';
import helper from "@/common/helper";
import {addData,getDBData} from './db';


// const langType = helper.getLang();
// create an axios instance
const service = axios.create({
    // baseURL: process.env.VUE_APP_API_BASE_URL,
	baseURL: helper.getApiUrl(),
    timeout: 50000, // request timeout
    headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
    }
})

//http request请求拦截
service.interceptors.request.use(config => {
        const langType = helper.getLang();
        let tokenInfo = helper.get('tokenInfo');
        const share_code = helper.get('share_code');

        if (tokenInfo && config.baseURL != helper.get('sportsApi')) {
            config.headers['usertoken'] = tokenInfo.token;
            config.headers['usertokenkey'] = tokenInfo.token_key;
            config.headers['lang'] = langType;
        } else {
            config.headers['Authorization'] = helper.get('sportsToken');
        }
        if (config.baseURL == helper.get('sportsApi')) {
            config.headers['Content-Type'] = 'application/json';
        }
        if (config.method == 'post' && config.baseURL != helper.get('sportsApi')) {
            config.data = {
                lang: langType,
                share_code_global:share_code,
                ...config.data
            }
        } else if (config.method == 'get' && config.baseURL != helper.get('sportsApi')) {
            config.params = {
                lang: langType,
                share_code_global:share_code,
                ...config.params
            }
        }
        return config
    },
    err => {
        return Promise.reject(err)
    }
)


// respone interceptor
service.interceptors.response.use(
    response => {
        const code = response.data.code;
        if (code * 1 == 1000 || code * 1 == 991 || code * 1 == 101) {
            helper.set("tokenInfo", "");
            store.commit('$vuexSetLoginState', false);
            // Message({
            //     center: true,
            //     customClass: "errorMessage",
            //     message: i18n.t(response.data.msg),
            //     type: "error"
            // });
        }
        return response
    },
    error => {
        // Message({
        //     message: i18n.t('请求失败,请刷新后重新操作'),
        //     center: true,
        //     customClass: "errorMessage",
        //     type: "error"
        // })
        return Promise.reject(error);
    }
)

// 自定义数据拦截，处理本地数据库新增数据
async function intercept(data){
    return new Promise(async (resolve, reject) => {
        if(data.cache){
            const dbData = await getDBData(data)
            if(dbData){
                resolve(JSON.parse(dbData.data))
            }else{
                const res = await service(data)
                addData(data,res,dbData)
                resolve(res)
            }
        }else{
            const res = await service(data)
            resolve(res)
        }
    })
}
export default intercept
