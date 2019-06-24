import request from '@/utils/request'

export function Getapp(node, start, length) {
  return request({
    url: '/app/get',
    method: 'get',
    params: {
      node: node,
      start: start,
      length: length
    }
  })
}
export function Getmodule(node, start, length, app, version) {
  return request({
    url: '/app/get_modules',
    method: 'get',
    params: {
      node: node,
      start: start,
      length: length,
      app: app,
      version: version
    }
  })
}
export function Getmodule1(node, start, length) {
  return request({
    url: '/app/get_modules',
    method: 'get',
    params: {
      node: node,
      start: start,
      length: length
    }
  })
}
export function Getstart(node, app) {
  return request({
    url: '/app/start',
    method: 'post',
    data: {
      node: node,
      app: app
    }
  })
}
export function Getstop(node, app) {
  return request({
    url: '/app/stop',
    method: 'post',
    data: {
      node: node,
      app: app
    }
  })
}
export function GetReload(node, app, version) {
  return request({
    url: '/app/reload_module?node=' + node,
    method: 'post',
    data: {
      app: app,
      version: version
    }
  })
}
