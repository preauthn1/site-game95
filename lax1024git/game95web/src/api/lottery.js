import request from '@/utils/request'

/**
 * @param {Object} data
 */

// 抽奖
export function lottery_api(data) {
    return request({
        url: '/action/lottery',
        method: 'post',
        data
    })
}
// 抽奖记录
export function lottery_record_api(data) {
    return request({
        url: '/action/lotteryrecord',
        method: 'post',
        data
    })
}
// 奖品/配置信息
export function lottery_config_api() {
    return request({
        url: '/action/lotteryconfig',
        method: 'post'
    })
}


export function get_s_lottery_api() {
    return request({
        url: '/lottery/index',
        method: 'post'
    })
}
export function get_s_lottery_detail_api(data) {
    return request({
        url: '/lottery/detail',
        method: 'post',
        data
    })
}

export function post_s_lottery_order_api(data) {
    return request({
        url: '/lottery/order',
        method: 'post',
        data
    })
}

export function get_s_lottery_myrecord_api(data) {
    return request({
        url: '/lottery/myrecord',
        method: 'post',
        data
    })
}

export function get_s_lottery_record_api(data) {
    return request({
        url: '/lottery/record',
        method: 'post',
        data
    })
}

export function get_lottery_draw_api(data) {
    return request({
        url: '/lottery/draw',
        method: 'post',
        data
    })
}
