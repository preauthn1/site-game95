import request from '@/utils/request'
import helper from "@/common/helper";

/**
 * @param {Object} data
 */

// 侧边栏分类
export function statistical_api(data) {
    return request({
        url: '/v1/match/statistical',
        method: 'post',
        data: data,
        baseURL: helper.get('sportsApi'),
    })
}

// 赛事列表
export function getList_api(data) {
    return request({
        url: '/v1/match/getList',
        method: 'post',
        data: data,
        baseURL: helper.get('sportsApi'),
    })
}

// 赛事详情
export function getMatchDetail_api(data) {
    return request({
        url: '/v1/match/getMatchDetail',
        method: 'post',
        data: data,
        baseURL: helper.get('sportsApi'),
    })
}

// 获取联赛列表
export function getOnSaleLeagues_api(data) {
    return request({
        url: '/v1/match/getOnSaleLeagues',
        method: 'post',
        data: data,
        baseURL: helper.get('sportsApi'),
    })
}

// 投注数据查询
export function batchBetMatchMarketOfJumpLine_api(data) {
    return request({
        url: '/v1/order/batchBetMatchMarketOfJumpLine',
        method: 'post',
        data: data,
        baseURL: helper.get('sportsApi'),
    })
}

// 单关下注
export function singlePass_api(data) {
    return request({
        url: '/v1/order/bet/singlePass',
        method: 'post',
        data: data,
        baseURL: helper.get('sportsApi'),
    })
}

// 串关下注
export function betMultiple_api(data) {
    return request({
        url: '/v1/order/betMultiple',
        method: 'post',
        data: data,
        baseURL: helper.get('sportsApi'),
    })
}


// 获取投注注单记录接口
export function betOrderList_api(data) {
    return request({
        url: '/v1/order/bet/list',
        method: 'post',
        data: data,
        baseURL: helper.get('sportsApi'),
    })
}
