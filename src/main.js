// import Vue from 'vue'
import Qs from 'qs'
import App from './App.vue'
import router from './router/router'
import store from './store'
import axios from './axios/index'
import service from './service/index'
import FastClick from 'fastclick'
import math from './util/math'

import ToastPlugin from 'vux/src/plugins/toast'
import LoadingPlugin from 'vux/src/plugins/loading'

import './util/filters'
import './assets/sass/index.scss'
import './icomoon/style.css'

/**
 * vw的兼容处理 （有些手机不支持vw单位 ）
 */
/*const hacks = require('viewport-units-buggyfill/viewport-units-buggyfill.hacks');
require('viewport-units-buggyfill').init({
    hacks: hacks
});*/
Vue.use(ToastPlugin);
Vue.use(LoadingPlugin);

Vue.config.productionTip = false

Vue.prototype.$http = axios
Vue.prototype.$api = service
Vue.prototype.$math = math;


FastClick.attach(document.body);


// simple history management
const history = window.sessionStorage
history.clear()
let historyCount = history.getItem('count') * 1 || 0
history.setItem('/', 0)
let isPush = false
let endTime = Date.now()
let methods = ['push', 'go', 'replace', 'forward', 'back']

document.addEventListener('touchend', () => {
    endTime = Date.now()
})
methods.forEach(key => {
    let method = router[key].bind(router)
    router[key] = function (...args) {
        isPush = true
        method.apply(null, args)
    }
})
router.beforeEach(function (to, from, next) {
    document.title = to.meta.title || '晓可商城';
    store.commit('transition/updateLoadingStatus', {isLoading: true});

    const toIndex = history.getItem(to.path);
    const fromIndex = history.getItem(from.path);

    if (toIndex) {
        if (!fromIndex || parseInt(toIndex, 10) > parseInt(fromIndex, 10) || (toIndex === '0' && fromIndex === '0')) {
            store.commit('transition/updateDirection', {direction: 'forward'})
        } else {
            // 判断是否是ios左滑返回
            if (!isPush && (Date.now() - endTime) < 377) {
                store.commit('transition/updateDirection', {direction: ''})
            } else {
                store.commit('transition/updateDirection', {direction: 'reverse'})
            }
        }
    } else {
        ++historyCount
        history.setItem('count', historyCount)
        to.path !== '/' && history.setItem(to.path, historyCount)
        store.commit('transition/updateDirection', {direction: 'forward'})
    }

    if (/\/http/.test(to.path)) {
        let url = to.path.split('http')[1]
        window.location.href = `http${url}`
    } else {
        next()
    }
})

router.afterEach(function (to) {
    isPush = false
    store.commit('transition/updateLoadingStatus', {isLoading: false})
})

new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app')
