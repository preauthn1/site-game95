import request from '@/utils/request'

/**
 * @param {Object} data
 */

//游戏首页
export function game_index_api(data) {
    return request({
        url: '/game/index2',
        cache:true,
        method: 'post',
        data
    })
}

//游戏收藏
export function collect_index(data) {
    return request({
        url: '/collect/index',
        method: 'post',
        data
    })
}

// 获取游戏分类
export function game_get_type_api() {
    return request({
        url: '/game/get_type',
        cache:true,
        method: 'post'
    })
}

// 获取游戏收藏
export function collect_collect(data) {
    return request({
        url: '/collect/collect',
        method: 'post',
        data
    })
}

// 获取游戏列表
export function game_game_list_api(page, limit, t_id) {
    let data = {
        page,
        limit,
        t_id
    }
    return request({
        url: '/game/list',
        method: 'post',
        data
    })
}

// 获取首页游戏订单-所有人
export function all_game_order_api(page) {
    let data = {
        limit: 8,
        page,
        is_new: 1
    }
    return request({
        url: '/game/order3',
        method: 'post',
        data
    })
}

// 我的投注
export function user_game_order_api() {
    let data = {
        limit: 8,
        page: 1,
        is_new: 1,
        settlement: 0,
        sports: 0
    }
    return request({
        url: '/game/order',
        method: 'post',
        data
    })
}

// 获取最高下注和最大盈利订单
export function game_high_order_api(page) {
    let data = {
        limit: 10,
    }
    return request({
        url: '/game/order4',
        method: 'post',
        data
    })
}

// fb baseURL
export function game_login_game_api(data) {
    return request({
        url: '/game/login_game',
        method: 'post',
        data
    })
}

// fb baseURL
export function game_fb_login_game_api(data) {
    return request({
        url: '/game/fb_login_game',
        method: 'post',
        data
    })
}
// 获取游戏路径
export function game_get_url_api(platform, gid) {
    let data = {
        platform,
        gid
    }
    return request({
        url: '/game/get_url',
        method: 'post',
        data
    })
}

// 获取游戏统计
export function game_statistics_api() {
    return request({
        url: '/game/statistics',
        method: 'post'
    })
}

// 投注记录
export function game_order_api(data) {
    return request({
        url: '/game/order',
        method: 'post',
        data
    })
}

// url - token sports
// 获取游戏列表
export function game_list_api(data) {
    // 收藏不做缓存
    return request({
        url: '/game/list',
        method: 'post',
        cache: data.t_id!= "collect_id",
        data
    })
}

export function game_user_transout_api(tid) {
    const data = {
        tid: tid
    }
    return request({
        url: '/game/user_transout',
        method: 'post',
        data
    })
}
// 三方游戏平台
export function game_third_api(type='') {
  return request({
      url: '/game/third',
      cache:true,
      method: 'post',
      data:{type}
  })
}
// 游戏详情
export function game_detail_api(data) {
    return request({
        url: '/game/detail',
        method: 'post',
        data
    })
}





