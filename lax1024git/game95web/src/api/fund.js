import request from '@/utils/request'

/**
 * @param {Object} data
 */

// 基金列表
export function savings_funds_lists_api(data) {
    return request({
        url: '/savings_funds/lists',
        method: 'post',
        data
    })
}

// 购买定期基金产品
export function savings_funds_fund_apply_api(data) {

    return request({
        url: '/savings_funds/fund_apply',
        method: 'post',
        data
    })
}

// 活期
export function savings_funds_get_my_fund_api(data) {
    return request({
        url: '/savings_funds/get_my_fund',
        method: 'post',
        data
    })
}

// 基金转入
export function savings_funds_transfer_in_fund_api(data) {
    return request({
        url: '/savings_funds/transfer_in',
        method: 'post',
        data
    })
}

// 基金转出
export function savings_funds_transfer_out_fund_api(data) {
    return request({
        url: '/savings_funds/transfer_out',
        method: 'post',
        data
    })
}

// 获取基金订单
export function get_fund_order_list_api(data) {
    return request({
        url: '/savings_funds/get_fund_order_list',
        method: 'post',
        data
    })
}
