import request from '@/utils/request'

// 任务列表
export function url_menu() {
  return request({
      url: '/url/menu',
      method: 'get',
      cache:true,
  })
}