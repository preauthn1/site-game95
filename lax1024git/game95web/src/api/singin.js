import request from '@/utils/request'
/**
 * @param {Object} data
 */

// 获取签到数据
export function sign_getSign_api(data) {
  return request({
      url: '/sign/getSign',
      method: 'post',
      data
  })
}

// 获取签到
export function sign_userSign_api(data) {
  return request({
      url: '/sign/userSign',
      method: 'post',
      data
  })
}

// 补签
export function sign_addSign_api(data) {
  return request({
      url: '/sign/addSign',
      method: 'post',
      data
  })
}

// 更多奖励
export function sign_moreSign_api(data) {
  return request({
      url: '/sign/moreSign',
      method: 'post',
      data
  })
}