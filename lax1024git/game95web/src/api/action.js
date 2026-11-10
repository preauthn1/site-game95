import request from '@/utils/request'

/**
 * @param {Object} data
 */

// 活动列表
export function action_list_api(data) {
    return request({
        url: '/action/list',
        method: 'post',
        data
    })
}
// 活动详细
export function action_detail_api(data) {
    return request({
        url: '/action/detail',
        method: 'post',
        data
    })
}
// 活动申请
export function action_apply_api(data) {
    return request({
        url: '/action/apply',
        method: 'post',
        data
    })
}
// 活动列表-未登录
export function action_nologin_list_api(data) {
    return request({
        url: '/action/list2',
        method: 'post',
        data
    })
}


// （赛博）游戏救援金列表
export function action_jyjlist(data) {
    return request({
        url: '/action/jyjlist',
        method: 'post',
        data
    })
}