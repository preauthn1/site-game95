import request from '@/utils/request'

/**
 * @param {Object} data
 */

// 用户日志
export function user_log_api(data) {
    return request({
        url: '/user/log',
        method: 'post',
        data
    })
}

// 用户等级奖励领取
export function user_receiveLevelReward(data) {
    return request({
        url: '/user/receiveLevelReward',
        method: 'post',
        data
    })
}



// VIP
export function user_vip_api() {
    return request({
        url: '/user/vip',
        method: 'post'
    })
}
// 当前会员等级
export function user_vip_now() {
    return request({
        url: '/user/vip_now',
        method: 'post'
    })
}
// VIP - 未登录
export function user_vip_api2() {
    return request({
        url: '/user/vip2',
        method: 'post'
    })
}

// 系统通知
export function message_system_msg_api(page, limit) {
    const data = {
        page,
        limit
    }
    return request({
        url: '/message/system_msg',
        method: 'post',
        data
    })
}

// 消息全部已读
export function message_setread_api(data) {
    return request({
        url: '/message/setread',
        method: 'post',
        data
    })
}

// 修改用户资料
export function my_editinfo_api(data) {
    return request({
        url: '/my/editinfo',
        method: 'post',
        data
    })
}

// 充值 - 所有收款账户
export function recharge_get_all_api() {
    return request({
        url: '/recharge/get_all',
        method: 'post'
    })
}

// 申请充值
export function recharge_apply_api(data) {
    return request({
        url: '/recharge/apply',
        method: 'post',
        data
    })
}

// 充值参数
export function recharge_parame_api() {
    return request({
        url: '/recharge/parame',
        cache:true,
        method: 'post'
    })
}

// 获取未读消息数量
export function message_unread_api() {
    return request({
        url: '/message/unread',
        method: 'post'
    })
}

// 获取消息列表
export function message_list_api(page, limit, unread) {
    const data = {
        page,
        limit,
        unread
    }
    return request({
        url: '/message/list',
        method: 'post',
        data
    })
}

// 获取用户卡片
export function bank_my_api(data) {
    return request({
        url: '/bank/my',
        method: 'post',
        data
    })
}

// 提现汇率信息
export function withdraw_limit_api() {
    return request({
        url: '/withdraw/limit',
        method: 'post'
    })
}

// 申请提现
export function withdraw_apply_api(data) {
    return request({
        url: '/withdraw/apply',
        method: 'post',
        data
    })
}

// 获取邀请链接
export function team_promotion_api(data) {
    return request({
        url: '/team/promotion',
        method: 'post',
        data
    })
}

// 用户登录设备
export function my_login_api() {
    const data = {
        page: 1,
        limit: 10
    }
    return request({
        url: '/my/login',
        method: 'post',
        data
    })
}

// 游戏记录
export function game_order_api(data) {
    return request({
        url: '/game/order',
        method: 'post',
        data
    })
}

// 余额记录
export function game_balance_record_api(params) {
    return request({
        url: '/my/balanceRecord',
        method: 'get',
        params
    })
}

// 充值记录
export function recharge_record_api(data) {
    return request({
        url: '/recharge/record',
        method: 'post',
        data
    })
}

// 提现记录
export function withdraw_record_api(data) {
    return request({
        url: '/withdraw/record',
        method: 'post',
        data
    })
}

// 流水记录
export function my_waterrecord_api(data) {
    return request({
        url: '/my/waterrecord',
        method: 'post',
        data
    })
}

// 总代理收入
export function team_statprofit0_api() {
    const data = {
        isday: 0
    }
    return request({
        url: '/team/statprofit',
        method: 'post',
        data
    })
}

// 总代理 昨日-收入
export function team_statprofit2_api() {
    const data = {
        isday: 2
    }
    return request({
        url: '/team/statprofit',
        method: 'post',
        data
    })
}


// 总代理 今日-收入
export function team_statprofit1_api() {
    const data = {
        isday: 1
    }
    return request({
        url: '/team/statprofit',
        method: 'post',
        data
    })
}

// 财务报表
export function team_report_api(data) {
    return request({
        url: '/team/report',
        method: 'post',
        data
    })
}

// 代理佣金发放记录
export function team_record_api(data) {
    return request({
        url: '/team/record',
        method: 'post',
        data
    })
}
// 代理返佣统计(周)
export function team_profit_api(data) {
    return request({
        url: '/team/profit',
        method: 'post',
        data
    })
}
// 下级用户记录
export function team_user_api(data) {
    return request({
        url: '/team/user',
        method: 'post',
        data
    })
}
// popularize
export function team_popularize_api(data) {
    return request({
        url: '/team/popularize',
        method: 'post',
        data
    })
}

// 绑卡类型信息
export function bank_lists_api() {
    return request({
        url: '/bank/lists',
        method: 'post'
    })
}

// 绑卡类型信息
export function bank_add_api(data) {
    return request({
        url: '/bank/add',
        method: 'post',
        data
    })
}

// 发送邮箱验证码
export function sendcode_mail_api(data) {
    return request({
        url: '/sendcode/mail',
        method: 'post',
        data
    })
}

// 发送手机验证码
export function sendcode_index_api(data) {
    return request({
        url: '/sendcode/index',
        method: 'post',
        data
    })
}

// 活动统计
export function action_statistics_api() {
    return request({
        url: '/action/statistics',
        method: 'post'
    })
}

// 三方登录列表
export function login_get_third_login_api() {
    return request({
        url: '/login/get_third_login',
        cache:true,
        method: 'post'
    })
}

// 三方登录URL
export function login_get_third_login_url_api(data) {
    return request({
        url: '/login/get_third_login_url',
        method: 'post',
        data
    })
}

// 三方登录
export function login_third_login_api(data) {
    return request({
        url: '/login/third_login',
        method: 'post',
        data
    })
}


// 返水记录
export function game_back_report_api(data) {
    return request({
        url: '/game/back_report',
        method: 'post',
        data
    })
}

// 返佣记录
export function game_agent_report_api(data) {
    return request({
        url: '/game/agent_report',
        method: 'post',
        data
    })
}

// 获取谷歌验证码信息
export function get_2fa_qrcode() {
    return request({
        url: '/my/google',
        method: 'post'
    })
}

// 获取谷歌验证码信息
export function post_bind_google(data) {
    return request({
        url: '/my/bind_google',
        method: 'post',
        data
    })
}
// 谷歌验证设置
export function post_google_check(data) {
    return request({
        url: '/my/google_check',
        method: 'post',
        data
    })
}

// 邮箱重置密码
export function forget_mail_pwd(data) {
    return request({
        url: '/forget/mail',
        method: 'post',
        data
    })
}

// 手机重置密码
export function forget_phone_pwd(data) {
    return request({
        url: '/forget/pwd',
        method: 'post',
        data
    })
}

// 获取返水
export function get_water_configuration() {
    return request({
        url: '/game/water_configuration',
        cache:true,
        method: 'post',
    })
}


// 刷新VIP等级
export function refresh_vip_api() {
    return request({
        url: '/refresh/vip',
        method: 'post',
    })
}

// 获取充值返利
export function getRechargeRebate_api(){
    return request({
        url:'/team/getRechargeRebate',
        method:'get'
    })
}

// 获取报酬列表
export function getRemuneration_api(){
    return request({
        url:'/team/getRemuneration',
        method:'get'
    })
}
// 领取奖励
export function get_receiveInviteRebate_api(data){
    return request({
        url:'/team/receiveInviteRebate',
        method:'post',
        data
    })
}


export function getWsToken() {
    return request({
        url:'/user/get_ws_token',
        method:'post'
    })
}

// 用户赠金领取
export function give_api() {
    return request({
        url:'/my/give',
        method:'post'
    })
}

// 团队统计
export function team_view_api(data) {
    return request({
        url:'/team/view',
        method:'post',
        data
    })
}


// 用户默认头像列表
export function user_get_default_head_img_api(data) {
    return request({
        url:'/user/get_default_head_img',
        method:'get',
        data
    })
}
