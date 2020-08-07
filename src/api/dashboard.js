import request from '@/utils/request'

export function getErrorsCount() {
  return request({
    url: '/errors/getErrorCategoryCount',
    method: 'get'
  })
}

export function getErrorsList(data) {
  return request({
    url: '/errors/list',
    method: 'post',
    data
  })
}

export function readErrors(category) {
  return request({
    url: '/errors/readError',
    method: 'get',
    params: { category }
  })
}

export function cleanErrorsByCategory(category) {
  return request({
    url: '/errors/clean',
    method: 'get',
    params: { category }
  })
}
