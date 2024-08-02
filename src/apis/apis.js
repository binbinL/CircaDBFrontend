import {request} from "@/utils/request";

export function fetchOmicsData (params){
    return request({
        url: '/omics',
        method: 'get',
        params: params
    })
}

export function fetchTissueData (params){
    return request({
        url: '/omics/tissue',
        method: 'get',
        params: params
    })
}

export function fetchGeneData (params){
    return request({
        url: '/omics/tissue/gene',
        method: 'get',
        params: params
    })
}

export function fetchGeneDeatail (params){
    return request({
        url: '/gse/gene',
        method: 'get',
        params: params
    })
}



