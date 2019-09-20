import request from '@/utils/request'

export function ZetaEtag(tag) {
  return request({
    url: 'zeta/etag/'+tag,
    method: 'get',
    params:{
        
    }
  })
}
export function ZetaEtagHistroy(tag,limit,timestamp) {
  return request({
    url: 'zeta/etag/history/'+tag,
    method: 'get',
    params:{
    limit:limit,
    timestamp:timestamp
    }
  })
}