import request from '@/utils/request'

export function addRule(actions,ctx,description,forname,name,rawsql) {
  return request({
    url: '/rules',
    method: 'post',
    data:{
        actions:actions,
        ctx:ctx,
        description:description,
        for:forname,
        name:name,
        rawsql:rawsql
    }
  })
}
export function getRule() {
  return request({
    url: '/rules',
    method: 'get',
    params:{}
  })
}
export function getRuleDetail(id) {
  return request({
    url: '/rule/'+id,
    method: 'get',
    params:{}
  })
}
export function ruleDelete(id){
  return request({
    url: '/rule/'+id,
    method: 'delete',
    params:{}
  })
}
      
export function ruleTest(actions,ctx,description,forname,name,rawsql){
  return request({
    url: '/rule_test',
    method: 'post',
    data:{
        actions:actions,
        ctx:ctx,
        description:description,
        for:forname,
        name:name,
        rawsql:rawsql
    }
  })
}