import request from '@/utils/request'

/**
 * @param {Object} data
 */


// 获取五福数据
export function wufu_getData_api(data) {
  return request({
      url: '/wufu/getData',
      method: 'post',
      data
  })
}


// 兑换卡片
export function wufu_receiveCard_api(data) {
  return request({
      url: '/wufu/receiveCard',
      method: 'post',
      data
  })
}


// 五福刮奖
export function wufu_open_api(data) {
  return request({
      url: '/wufu/open',
      method: 'post',
      data
  })
}

// 执行五福刮奖
export function wufu_handleOpen_api(data) {
  return request({
      url: '/wufu/handleOpen',
      method: 'post',
      data
  })
}