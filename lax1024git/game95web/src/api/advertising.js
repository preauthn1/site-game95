import request from '@/utils/request'
// 活动列表
export function advertising_detail_api(data) {
  return request({
      url: '/advertising/detail',
      method: 'post',
      data
  })
}