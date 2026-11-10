import request from '@/utils/request'

// 任务列表
export function task_list_api(data) {
  return request({
      url: '/task/list',
      method: 'post',
      data
  })
}

// 任务奖励领取
export function task_receive_api(data) {
  return request({
      url: '/task/receive',
      method: 'post',
      data
  })
}

// 领取阶段任务
export function task_stage_receive_api(data) {
  return request({
      url: '/task/stage_receive',
      method: 'post',
      data
  })
}
