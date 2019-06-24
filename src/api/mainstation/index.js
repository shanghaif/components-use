import request from '@/utils/request'

export function Mainstationvalue(vcaddr,session,operation,datatype,pn_start,pn_end,starttime,endtime,route,protocol,data) {
  return request({
    url: '/readdata/'+vcaddr+'',
    method: 'POST',
    params:{
        from:'web',
        session:session,
        operation:operation,
        datatype:datatype,
        pn_start:pn_start,
        pn_end:pn_end,
        starttime:starttime,
        endtime:endtime,
        route:route,
        protocol:protocol
    },
    data:{
        dis:data
    }
  })
}