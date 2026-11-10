import request from '@/utils/request'

// 获取pdd转盘数据
export function pdd_getData_api(params) {
  return request({
      url: '/pdd/getData',
      method: 'get',
      params
  })
}

// pdd转盘取款
export function pdd_withdrawal_api(data) {
  return request({
      url: '/pdd/withdrawal',
      method: 'post',
      data
  })
}

// pdd转盘抽奖
export function pdd_turntable_api(data) {
  return request({
      url: '/pdd/turntable',
      method: 'post',
      data
  })
}