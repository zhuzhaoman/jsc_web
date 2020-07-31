import request from '@/utils/request'

export function getCycle() {
  return request({
    url: '/flowCycle/getCycle',
    method: 'get',
  })
}

export function updateCycle(data) {
  return request({
    url: '/flowCycle/updateCycle',
    method: 'post',
    data
  })
}
