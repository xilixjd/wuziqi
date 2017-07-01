import { config, request } from '../utils'
const { api, DOMAIN } = config
const { userandroom } = api

export async function login(params) {
    return request(DOMAIN + userandroom, {
        method: 'POST',
        body: JSON.stringify(params),
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
    })
}

function paramsToBody(params) {
    let str = ""
    for (let k in params) {
        str += k + '=' + params[k] + '&'
    }
    if (str.indexOf('&') >= 0) {
        str = str.substring(0, str.length - 1)
    }
    return str
}