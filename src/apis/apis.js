import {request} from "@/utils/request";

export function fetchOmicsData (params){
    return request({
        url: '/omics',
        method: 'get',
        params: params
    })
}

