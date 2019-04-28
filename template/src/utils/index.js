// 判断是否在微信内打开页面
export function isWX() {
    const ua = navigator.userAgent.toLowerCase()
    return (/micromessenger/.test(ua))
}
const SA_COMMON = {
    app_name: 'xxxxx',
    $ip: window.localStorage.ip ? window.localStorage.ip : '',
    $browser: window.navigator.appCodeName,
    $browser_version: window.navigator.appVersion,
    url: window.location.href
}
// 安装神策服务
export function installSa(sa, Vue, appName = 'xxxxx') {
    const name = 'sa?project=production'
    const url = isWX() ? `//log.xiongmaoyouxuan.com/${name}` : `//log.youxuan.lukou.com/${name}`
    sa.init({
        server_url: url,
        debug_mode: false,
        debug_mode_upload: false,
        use_app_track: true,
        use_client_time: true
    })
    const saTrack = {
        track (type = 'page_view', params = {}) {
            params['device_id'] = sa.store.getDistinctId()
            const data = Object.assign({}, params, SA_COMMON, {
                app_name: appName
            })
            sa.track(type, data)
        },
        login(id = '') {
            sa.login(id)
        }
    }
    Object.defineProperties(Vue.prototype, {
        $saTrack: {
            get() {
                return saTrack
            }
        }
    })
}