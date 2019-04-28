import axios from 'axios'
import qs from 'qs'
const instance = axios.create({
    baseURL: '',
    timeout: 50000,
    transformResponse: handleResponse,
    headers: {
        'x-platform': 'h5'
    }
})

function getHeaders() {
    const _headersToken = {
        'x-platform': 'h5'
    }
    return _headersToken
}

instance.interceptors.request.use(config => {
    const token = token
    if (token) {
        config.headers.token = token
    }
    return config
}, err => {
    return Promise.reject(err.msg)
})

export const request = {
    get(url, data = {}, customHeaders = {}) {
        let headersObj = getHeaders()
        if (JSON.stringify(customHeaders) !== '{}') {
            for (let key in customHeaders) {
                headersObj[key] = customHeaders[key]
            }
        }
        return instance
            .get(url, {
                params: data,
                headers: headersObj
            }).then(res => {
                return res.data
            }).catch(handleError)
    },

    post(url, data = {}, type = 'formData') {
        if (type === 'formData') {
            data = data instanceof FormData ? data : qs.stringify(data)
        }
        return instance
            .post(url, data, {headers: getHeaders()}).then(res => {
                return res.data
            }).catch(handleError)
    },

    put(url, data = {}) {
        data = data instanceof FormData ? data : qs.stringify(data)
        return instance
            .put(url, data, {headers: getHeaders()}).then(res => {
                return res.data
            }).catch(handleError)
    },

    delete(url, data = {}) {
        return instance
            .delete(url, {
                params: data,
                headers: getHeaders()
            }).then(res => {
                return res.data
            }).catch(handleError)
    }
}

function handleError(error) {
    console.log(error.msg || 'request error')
    return Promise.reject(error)
}

function handleResponse (res) {
    try {
        const r = JSON.parse(res)
        if (r.code == 200) {
            return r
        } else {
            throw r
        }
    } catch (e) {
        throw e
    }
}

