import { config, request } from '../utils'
const { api, DOMAIN } = config
const { wuziqi, checkUser, userandroom } = api


export async function getBlog(params) {
    return request(DOMAIN + wuziqi, {
        method: 'get',
        body: JSON.stringify(params),
        credentials: 'include',
    })
}

export async function getCurrentUser(params) {
    return request(DOMAIN + checkUser, {
        method: 'get',
        body: JSON.stringify(params),
        credentials: 'include',
    })
}

export async function userInfo(params) {
    return request(DOMAIN + userandroom, {
        method: 'GET',
        body: JSON.stringify(params),
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
    })
}