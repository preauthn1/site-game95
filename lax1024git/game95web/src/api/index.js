import request from '@/utils/request'

/**
 * @param {Object} data
 */
//系统配置
export function system_info(data) {
    return request({
        url: '/system/info',
        method: 'get',
        data,
    })
}

//系统配置新
export function system_info_new(data) {
    return request({
        url: '/system/info_new',
        method: 'get',
        data,
    })
}

//系统配置
export function system_channel_api(id) {
    return request({
        url: `/system/channel?acid=${id}`,
        method: 'get',
    })
}


//登录
export function login_api(data) {
    return request({
        url: '/login/login',
        method: 'post',
        data,
    })
}

// 注册
export function login_register_api(data) {
    return request({
        url: '/login/register',
        method: 'post',
        data,
    })
}

// 登录、注册 验证码
export function captcha_api() {
    const data = {
        info: 1
    }
    return request({
        url: '/login/captcha',
        method: 'post',
        data,
    })
}

// 登出
export function my_logout_api() {
    return request({
        url: '/my/logout',
        method: 'post'
    })
}

// 获取用户信息
export function my_info_api() {
    return request({
        url: '/my/info_v5',
        method: 'post'
    })
}

// 获取轮播图
export function banner_index_api() {
    return request({
        url: '/banner/index',
        cache:true,
        method: 'get'
    })
}


// 获取公告
export function notice_list_api(params) {
    return request({
        url: '/notice/list',
        method: 'post',
        data:params
    })
}

// 获取规则文档
export function rule_index_api(type) {
    return request({
        url: '/rule/index?type=' + type,
        cache:true,
        method: 'get'
    })
}

export function doanload_api(){
	return request({
		url:'/doanload/index',
		method:'post'
	})
}

export function service_list_api(){
	return request({
		url:'/service/list',
		method:'post'
	})
}
