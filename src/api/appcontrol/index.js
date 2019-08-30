import request from '@/utils/request'

export function Addapp(expries,name,product,secret)  {
  return request({
    url: '/classes/App',
    method: 'post',
    data:{
        config:{
            expires:expries,
            name:name,
        },
        secret:secret,
        product:product
    }
  })
}