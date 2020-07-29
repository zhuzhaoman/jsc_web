import request from '@/utils/request'

export function getErrorCount() {
  return request({
    url: '/errors/getErrorCategoryCount',
    method: 'get'
  })
}
