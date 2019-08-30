import request from '@/utils/request'

// 获取抄表数据
export function getMeterDate(skip,limit,vcaddr,addr,start_date,end_date,type,di) {
  return request({
    url: '/meter/hisdata',
    method: 'get',
    params:{
        skip,
        limit,
        vcaddr,
        addr,
        start_date,
        end_date,
        type,
        di
    }
  })
}

export function getMeterListDate(di,skip,limit,objectId,start_date,end_date,type) {
  return request({
    url: '/org/meter/hisdata',
    method: 'get',
    params:{
        di,
        skip,
        limit,
        objectId,
        start_date,
        end_date,
        type
    }
  })
}