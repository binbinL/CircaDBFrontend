import {request} from "@/utils/request";

export function fetchOmicsData(species, params) {
    return request({
        url: `/${species}/omics`,
        method: 'get',
        params: params
    })
}
// `
export function fetchTissueData(species, params) {
    return request({
        url: `/${species}/omics/tissue`,
        method: 'get',
        params: params
    })
}

export function fetchGeneData(species,params) {
    return request({
        url: `/${species}/omics/tissue/gene`,
        method: 'get',
        params: params
    })
}

export function fetchGeneDeatail(species,params) {
    return request({
        url: `/${species}/gse/gene`,
        method: 'get',
        params: params
    })
}

export function fetchGeneAnalyse(species,params) {
    return request({
        url: `/analyse/${species}/gse/gene/tissue/condition`,
        method: 'get',
        params: params
    })
}

export function fetchAllGEOData(species,params) {
    return request({
        url: `/download/`,
        method: 'get',
        params: params
    })
}



