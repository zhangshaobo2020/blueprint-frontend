import request from '@/axios'

export function compileTest(data) {
    return request({
        url: '/blueprint/compile/test',
        method: 'post',
        data,
    })
}