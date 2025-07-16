import request from '@/axios'

export function typeDefinition() {
    return request({
        url: '/blueprint/global/typeDefinition',
        method: 'post',
    })
}

export function functionDefinition() {
    return request({
        url: '/blueprint/global/functionDefinition',
        method: 'post',
    })
}

export function controlFlowDefinition() {
    return request({
        url: '/blueprint/global/controlFlowDefinition',
        method: 'post',
    })
}