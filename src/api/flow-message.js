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

export function getHistoryFlow(data) {
  return request({
    url: '/historyFlow/day',
    method: 'post',
    data
  })
}

export function getHistoryFlowByDayRange(data) {
  return request({
    url: '/historyFlow/dayRange',
    method: 'post',
    data
  })
}

export function getHistoryFlowByQuarterRange(data) {
  return request({
    url: '/historyFlow/quarter',
    method: 'post',
    data
  })
}
