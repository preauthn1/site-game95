import request from '@/utils/request'

/**
 * @param {Object} data
 */

// 新闻列表
export function journalism_list_api(data) {
    return request({
        url: '/journalism/list',
        method: 'post',
        data
    })
}

// 新闻分类
export function journalism_type_api() {
    return request({
        url: '/journalism/type',
        method: 'post'
    })
}

// 新闻详情
export function journalism_details_api(data) {
    return request({
        url: '/journalism/details',
        method: 'post',
        data
    })
}