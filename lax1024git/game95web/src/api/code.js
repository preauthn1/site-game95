import request from '@/utils/request'

/**
 * @param {Object} data
 */
//游戏首页
export function code_receive(data) {
  return request({
      url: '/code/receive',
      method: 'post',
      data
  })
}