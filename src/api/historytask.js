import request from '@/utils/request'

export function HistoryTask(start, length, di, datetime,searchvalue) {
  return request({
    url: '/shuwa_task/historyVcaddr',
    method: 'get',
    params: {
      node: null,
      start: start,
      length: length,
      di: di,
      datetime: datetime,
      'search[value]': searchvalue
    }
  })
}
export function Historydi() {
  return request({
    url: '/shuwa_task/diList',
    method: 'get'
  })
}

export function Histoymeterdetail(node, di, datetime, vcaddr) {
  return request({
    url: 'shuwa_task/historyMeter',
    method: 'get',
    params: {
      node: node,
      di: di,
      datetime: datetime,
      vcaddr: vcaddr
    }
  })
}
export function Diselect() {
  return request({
    url: '/shuwa_task/diList',
    method: 'get',
    data: {
    }
  })
}

export function Alltasks(start, length, draw, searchvalue) {
  return request({
    url: '/shuwa_task/task',
    method: 'get',
    params: {
      start: start,
      length: length,
      draw: draw,
      'search[value]': searchvalue
    }
  })
}
export function Addtasks(name, frozendate, downchannel,starttime, meter, freq, unit) {
  return request({
    url: '/shuwa_task/task',
    method: 'post',
    data: {
      name: name,
      frozendate: frozendate,
      downchannel: downchannel,
      // upchannel: upchannel,
      starttime: starttime,
      meter: meter,
      freq: freq,
      unit: unit
    }
  })
}
export function Taskdetail(node, start, length, draw, id, searchvalue) {
  return request({
    url: '/shuwa_task/vcaddr',
    method: 'get',
    params: {
      node: node,
      start: start,
      length: length,
      draw: draw,
      id: id,
      'search[value]': searchvalue
    }
  })
}
export function Taskmeterdetail(node, di, datetime, vcaddr, id) {
  return request({
    url: 'shuwa_task/meter',
    method: 'get',
    params: {
      node: node,
      di: di,
      datetime: datetime,
      vcaddr: vcaddr,
      id: id
    }
  })
}
export function Removetask(id) {
  return request({
    url: '/shuwa_task/remove_task',
    method: 'post',
    data: {
      id: id
    }
  })
}
//抄表
export function Supporttask(data) {
  return request({
    url: '/shuwa_task/readMeter',
    method: 'post',
    data: {
      data: data
    }
  })
}
