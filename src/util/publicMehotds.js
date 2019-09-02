//公共方法
import CryptoJS from 'crypto-js'
import {signKey, dataKey} from './publicParams'
import {appid} from "./publicParams";
import math from './math'

// import Moment from 'moment';

export function formatDate(time, type = "YYYY-MM-DD HH:mm") {
    time = Number(time) < 10000000000 ? Number(time) * 1000 : time;
    if (type) {
        return moment(time).format(type);
    } else {
        return moment(time).format('YYYY-MM-DD HH:mm:ss');
    }
};

//
export function dayDiff(startDate, endDate) {
    let startTime, endTime;
    if (startDate < 10000000000) {
        startTime = Number(startDate) * 1000;
    }
    if (endDate < 10000000000) {
        endTime = Number(endDate) * 1000;
    }
    return moment(endTime).diff(moment(startTime), 'days')
}

/**
 * 判断系统(android/ios)
 * @returns {string}
 */
export const system = () => {
    const u = navigator.userAgent;

    let name;
    if (u.indexOf('Android') > -1 || u.indexOf('Adr') > -1) {
        name = 'android';
    } else if (!!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/)) {
        name = 'ios';
    } else {
        name = 'unknown';
    }

    return name;
};

export function getQuery(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
    var r = window.location.search.substr(1).match(reg);//从?之后开始匹配如getQuery(courseid)返回一个数组["courseid=8","","8","&",index:0,input:"courseid=8"]
    if (r != null) return unescape(r[2]);
    return null;
}


/**
 * 调用native的方法
 * @param fun  方法名
 * @param params  参数
 */
export function callNative(fun, params, callback) {
    let client = getHashParameter("client");
    if (client == "xk" || client == "zb") {
        if (system() === "android") {
            let res = Android[fun](params);
            callback(res);
        } else if (system() === "ios") {
            window.webkit.messageHandlers[fun].postMessage(params);
            window[fun] = (res) => {
                callback(res);
            }
        }
    } else if (client == "sh") {
        window.postMessage([fun, params]);
    }
}

/**
 * 获取路径参数
 * @param key
 * @returns {any}
 */
export function queryParam(key) {
    let obj = getUrlParam();
    return obj[key];
}

function getUrlParam() {
    let url = location.search; //获取url中"?"符后的字符串包括‘？’ ，window.location.href获取的是url完整的字符串
    let theParam = new Object();
    if (url.indexOf("?") != -1) { //确保‘？’不是最后一个字符串，即携带的参数不为空
        let str = url.substr(1); //substr是字符串的用法之一，抽取指定字符的数目，这里抽取？后的所有字符
        let strs = str.split("&"); //将获取到的字符串从&分割，输出参数数组，即输出[参数1=xx,参数2=xx,参数3=xx,...]的数组形式
        for (let i = 0; i < strs.length; i++) { //遍历参数数组
            theParam[strs[i].split("=")[0]] = unescape(strs[i].split("=")[1]); //这里意思是抽取每个参数等号后面的值，unescape是解码的意思
        }
    }
    return theParam; //返回参数值
}

/**
 * 获取hash参数
 */
export function getHashParameter(key) {
    let params = getHashParameters();
    return params[key];
}

function getHashParameters() {
    let arr = (location.hash || "").replace(/^\#/, '').split("&");
    let lis = arr[0].split("?");
    if (lis.length < 2) {
        return {};
    }
    arr.splice(0, 1);
    arr = arr.concat(lis[1]);
    let params = {};
    for (let i = 0; i < arr.length; i++) {
        let data = arr[i].split("=");
        if (data.length === 2) {
            params[data[0]] = data[1];
        }
    }
    return params;
}


/**
 * 保存cookie
 * @param key
 * @param str
 */
export function saveCookie(key, str) {
    let Days = 1; //此 cookie 将被保存 7 天
    let exp = new Date();    //new Date("December 31, 9998");
    exp.setTime(exp.getTime() + Days * 24 * 60 * 60 * 1000);
    document.cookie = key + "=" + str + ";expires=" + exp.toGMTString();
}

/**
 * 获取cookie
 * @param key
 * @returns {*}
 */
export function getCookie(key) {  //获取指定名称的cookie的值
    let arr = document.cookie.match(new RegExp("(^| )" + key + "=([^;]*)(;|$)"));
    if (arr != null) {
        return arr[2];
    }
    return null;
}

//判断是否是微信浏览器的函数
export function isWeiXin() {
    //window.navigator.userAgent属性包含了浏览器类型、版本、操作系统类型、浏览器引擎类型等信息，这个属性可以用来判断浏览器类型
    let ua = window.navigator.userAgent.toLowerCase();
    //通过正则表达式匹配ua中是否含有MicroMessenger字符串
    if (ua.match(/MicroMessenger/i) == 'micromessenger') {
        return true;
    } else {
        return false;
    }
}

/**
 * 获取随机数
 * @param len   随机数长度
 * @returns {string}
 * @constructor
 */
export function mathRand(len) {
    let num = "";
    for (let i = 0; i < len; i++) {
        num += Math.floor(Math.random() * 10);
    }
    return num;
}


/**
 * 3des 加密data
 * @param salt
 * @param data
 * @returns {string}
 */
export function des3(salt, data) {
    const md5_hash = CryptoJS.MD5(salt + "" + dataKey).toString();
    return CryptoJS.TripleDES.encrypt(data, CryptoJS.enc.Utf8.parse(md5_hash), {
        mode: CryptoJS.mode.ECB,
        padding: CryptoJS.pad.Pkcs7
    }).toString();
}

/**
 * 3des  data内容解密
 * @param data
 * @param key
 * @returns {string}
 */
export function des3Decrypt(data, key) {
    const md5_hash = CryptoJS.MD5(key + "" + dataKey).toString();
    return CryptoJS.TripleDES.decrypt({
        ciphertext: CryptoJS.enc.Base64.parse(data)
    }, CryptoJS.enc.Utf8.parse(md5_hash), {
        mode: CryptoJS.mode.ECB,
        padding: CryptoJS.pad.Pkcs7
    }).toString(CryptoJS.enc.Utf8);
}

/**
 * 重新组装params  生成sign
 * @param service
 * @param param
 * @param isEncrypt  //data是否加密
 * @returns {{service: *, timestamp: number, version: string, salt: string, sign: *, data: string}}
 */
export function assembleParams(service, param, isEncrypt = false) {
    try {
        let info = decodeURIComponent(getHashParameter("info"));
        if (!info || info === "undefined") {
            info = "";
        }
        param = Object.assign(param, info ? JSON.parse(info) : {});
        const arr = service.split("/");
        const api = arr[arr.length - 2];
        const version = arr[arr.length - 1];
        const timestamp = getTimestamp();
        const salt = mathRand(6);
        const data = isEncrypt ? des3(salt, JSON.stringify(param)) : JSON.stringify(param);
        console.log('%c ' + service + '参数:', 'color:green;', {
            service: api,
            timestamp,
            version: version,
            salt,
            sign: CryptoJS.MD5(api + timestamp + data + version + salt + signKey).toString(),
            data: param
        });
        return {
            service: api,
            timestamp,
            version: version,
            salt,
            sign: CryptoJS.MD5(api + timestamp + data + version + salt + signKey).toString(),
            data
        };
    } catch (e) {
        console.error(e)
    }

}


/**
 * 去掉url地址中的一个参数
 * @param name
 * @returns {string}
 */
export function funcUrlDel(name) {
    let loca = window.location;
    let baseUrl = loca.origin + loca.pathname + "#";
    let query = loca.hash.substr(1);
    if (query.indexOf(name) > -1) {
        let obj = {}
        let arr = query.split("&");
        for (let i = 0; i < arr.length; i++) {
            arr[i] = arr[i].split("=");
            obj[arr[i][0]] = arr[i][1];
        }
        delete obj[name];
        return baseUrl + JSON.stringify(obj).replace(/[\"\{\}]/g, "").replace(/\:/g, "=").replace(/\,/g, "&");
    }
}

/**
 * 让app获取分享链接
 */
export function getSharePath(param) {
    let url = funcUrlDel("info");
    let params = {
        shareUrl: url + "&type=share",
        param: param
    };
    callNative("pushSharePath", JSON.stringify(params))
}

function getTimestamp() {
    let temp = localStorage.getItem("timestamp");
    if (temp) {
        temp = JSON.parse(temp);
        return temp.temp + (Date.parse(new Date()) - temp.currentTemp);
    } else {
        return Date.parse(new Date());
    }
}


function jsBridge(funcName, data, callback) {
    if (system() === "ios") { //ios
        setupWebViewJavascriptBridge(function (bridge) {
            bridge.callHandler(funcName, data, callback);
        });
    } else if (system() === "android") {
        connectWebViewJavascriptBridge(function (bridge) {
            if (window.WebViewJavascriptBridge) {
                window.WebViewJavascriptBridge.callHandler(
                    funcName
                    , data,
                    callback
                );
            } else {
                bridge.callHandler(funcName, data, callback);
            }
        });
    } else {
        console.log('this is an error ouput');
    }
}

function setupWebViewJavascriptBridge(callback) {

    if (window.WebViewJavascriptBridge) {
        return callback(WebViewJavascriptBridge);
    }
    if (window.WVJBCallbacks) {
        return window.WVJBCallbacks.push(callback);
    }
    window.WVJBCallbacks = [callback];
    var WVJBIframe = document.createElement('iframe');
    WVJBIframe.style.display = 'none';
    WVJBIframe.src = 'wvjbscheme://__BRIDGE_LOADED__';
    document.documentElement.appendChild(WVJBIframe);
    setTimeout(function () {
        document.documentElement.removeChild(WVJBIframe)
    }, 100)
}

function connectWebViewJavascriptBridge(callback) {
    if (window.WebViewJavascriptBridge) {
        callback(WebViewJavascriptBridge)
    } else {
        document.addEventListener(
            'WebViewJavascriptBridgeReady'
            , function () {
                callback(WebViewJavascriptBridge)
            }, false);
    }
}

function registerNative(funName) {
    if (system() === "ios") { //ios
        setupWebViewJavascriptBridge(function (bridge) {
            bridge.registerHandler(funcName, function (data, responseCallback) {
            });
        });
    } else if (system() === "android") {
        connectWebViewJavascriptBridge(function (bridge) {
            if (window.WebViewJavascriptBridge) {
                window.WebViewJavascriptBridge.registerHandler(funName, function (data, responseCallback) {
                    console.log("from android", data);
                });
            } else {
                bridge.registerHandler(funName, function (data, responseCallback) {
                    console.log("from android", data);
                });
            }
        });
    }
}

//倒计时
export function countDown(endDateStr, s) {
    //结束时间
    var endDate = new Date(endDateStr);
    //当前时间
    var nowDate = new Date();
    if (endDate - nowDate < 0) {
        s("已结束")
        return;
    }
    //相差的总秒数
    var totalSeconds = parseInt((endDate - nowDate) / 1000);
    //天数
    var days = Math.floor(totalSeconds / (60 * 60 * 24));
    //取模（余数）
    var modulo = totalSeconds % (60 * 60 * 24);
    //小时数
    var hours = Math.floor(modulo / (60 * 60));
    modulo = modulo % (60 * 60);
    //分钟
    var minutes = Math.floor(modulo / 60);
    //秒
    var seconds = modulo % 60;
    //输出到页面
    s(days + " 天 " + hours + " 小时 " + minutes + " 分钟 " + seconds + " 秒 ")

    //延迟一秒执行自己
    setTimeout(function () {
        countDown(endDateStr, s);
    }, 1000)
}


//获取当前页面最大zindex
export function getMaxZindex() {
    console.time();
    return Array.from(document.querySelectorAll('body *'))
        .map(a => parseFloat(window.getComputedStyle(a).zIndex))
        .filter(a => !isNaN(a))
        .sort()
        .pop();
}

/**
 * 重新组装params  生成sign
 * @param date1  结束日期
 * @param date2  开始日期
 * @param limit  日期间隔
 * @returns boolean
 */export function dateLimit(date1, date2, limit = 2) {

    var a = date1.substr(5, 2);
    var b = date1.substr(8, 2);
    var c = date1.substr(0, 4);
    var a2 = date2.substr(5, 2);
    var b2 = date2.substr(8, 2);
    var c2 = date2.substr(0, 4);
    /*
        alert(date1 + "__" + date2 + "\n\n" + c + "__" + a + "__" + b + "\n\n" + c2 + "__" + a2 + "__" + b2);
    */
    if (c === c2) {
        if (a == a2 && b >= b2) {
            if (Number(b) - Number(b2) <= limit) {
                /*
                                alert(Number(b) + "-" + Number(b2) + "=" + (Number(b) - Number(b2)));
                */
                return true;
            }
        } else if (Number(a) - Number(a2) == 1) {
            /*
                        alert(Number(a) + "-" + Number(a2) + "=" + (Number(a) - Number(a2)));
            */
            if (30 + Number(b) - Number(b2) <= limit) {
                return true;
            }
        }
    } else if (c - c2 === 1) {
        if ((Number(a) == 1) && (Number(a2) == 12)) {
            if (30 + Number(b) - Number(b2) <= limit) {
                return true;
            }
        }
    } else if (c2 - c === 1) {
        if ((Number(a2) == 1) && (Number(a) == 12)) {
            if (30 + Number(b2) - Number(b) <= limit) {
                return true;
            }
        }
    }
    return false;
}

//判断是否是微信
export function wakeNative(platform = 'gc', jumpUrl = "") {
    if (isWeiXin()) {
        /*let state = JSON.stringify({
            securityCode: this.$route.query.securityCode,
            platform: url || 'gc',
        });*/
        // let platform = url || 'gc';
        let state = `${this.$route.query.securityCode}break${platform}`;
        let scope = "snsapi_userinfo";
        let redirect_uri = `${location.origin}/share/#/bindPhoneNumber`;
        if (jumpUrl) {
            //自定义跳转链接
            redirect_uri += '?jumpUrl=' + encodeURIComponent(jumpUrl)
        }
        window.location.href = "https://open.weixin.qq.com/connect/oauth2/authorize?appid=" + appid + "&redirect_uri=" + encodeURIComponent(redirect_uri) + "&response_type=code&scope=" + scope + "&state=" + state + "#wechat_redirect";
    } else {
        const url = window.location.href;
        if (url.indexOf("timeline") > 0 || url.indexOf("groupmessage") > 0 || url.indexOf("singlemessage") > 0) {
            //微信来源来自微信直接跳转app下载页面
            if (platform === 'gc') {
                window.location = `${location.origin}/share/#/downloadXkSquare`;
            } else {
                window.location = `${location.origin}/share/#/downloadVideoAPP`;
            }
        } else {
            this.$router.replace({
                path: '/register',
                query: {
                    securityCode: this.$route.query.securityCode
                }
            });
        }
    }
    /*   const ANDROID_SCHEME = "xkgc://shuimukeji.cn/"; //安卓唤醒地址
       const IOS_SCHEME = "xksquare://";  //ios唤醒地址
       if (isWeiXin()) {
           this.$router.push({
               path: '/wechat',
               query: {
                   client: this.$route.query.client,
                   securityCode: this.$route.query.securityCode
               }
           })
           window.location = 'https://xkadmin.xksquare.com/share/#/downloadXkSquare';
       } else {
           if (system() === 'android') {
               window.location.href = ANDROID_SCHEME + url;
           }
           if (system() === 'ios') {
               window.location.href = IOS_SCHEME;
           }
           window.setTimeout(function () {
               window.location.href = "https://xkadmin.xksquare.com/share/#/downloadXkSquare";
           }, 2000)
           this.$router.push({
               path: '/register',
               query: {
                   securityCode: this.$route.query.securityCode
               }
           })
       }*/


}

export function downloadZb() {
    const ANDROID_SCHEME = "xkzb://shuimukeji.cn"; //安卓唤醒地址
    const IOS_SCHEME = "xklive://"; //ios唤醒地址
    if (isWeiXin()) {
        /*  this.$router.push({
              path: '/wechat',
              query: {
                  client: this.$route.query.client,
                  securityCode: this.$route.query.securityCode
              }
          })*/

        window.location = 'https://xkadmin.xksquare.com/share/#/downloadVideoAPP';
    } else {
        if (system() === 'android') {
            window.location.href = ANDROID_SCHEME;//ios app协议
        }
        if (system() === 'ios') {
            window.location.href = IOS_SCHEME;
        }
        window.setTimeout(function () {
            window.location.href = "https://xkadmin.xksquare.com/share/#/downloadVideoAPP";
        }, 2000)
        /*  this.$router.push({
              path: '/register',
              query: {
                  securityCode: this.$route.query.securityCode
              }
          })*/
    }
}


//复制
export const Clipboard = (function (window, document, navigator) {
    var textArea,
        copy;

    function isOS() {
        return navigator.userAgent.match(/ipad|iphone/i);
    }

    function createTextArea(text) {
        textArea = document.createElement('textArea');
        textArea.value = text;
        document.body.appendChild(textArea);
    }

    function selectText() {
        var range,
            selection;

        if (isOS()) {
            range = document.createRange();
            range.selectNodeContents(textArea);
            selection = window.getSelection();
            selection.removeAllRanges();
            selection.addRange(range);
            textArea.setSelectionRange(0, 999999);
        } else {
            textArea.select();
        }
    }

    function copyToClipboard() {
        document.execCommand('copy');
        document.body.removeChild(textArea);
    }

    copy = function (text) {
        createTextArea(text);
        selectText();
        copyToClipboard();
    };

    return {
        copy: copy
    };
})(window, document, navigator);


export function getSafe(fn, defaultVal = '') {
    try {
        let result = fn();
        if (result === undefined || result === null) {
            return defaultVal
        } else {
            return result;
        }

    } catch (e) {
        return defaultVal;
    }
}

export function formatPrice(value) {
    if (value) {
        return (Number(value) / 100).toFixed(2);
    } else {
        return "0.00";
    }
}

// 对价格进行 万 处理
export function getSalePriceText(price = 0, fixedNum = 2) {
    var num = math.divide(price, 100);
    const baseNum_wan = 10000;
    const baseNum_y = 100000000;
    const baseNum_sy = 1000000000;
    const baseNum_by = 10000000000;
    const baseNum_qy = 100000000000;
    const baseNum_wy = 1000000000000;
    if (num >= baseNum_wan && num < baseNum_y) {
        return `${(parseInt((num / baseNum_wan) * 100) / 100)}万`;
    }
    if (num >= baseNum_y && num < baseNum_sy) {
        return `${(parseInt((num / baseNum_y) * 100) / 100)}亿`;
    }
    if (num >= baseNum_sy && num < baseNum_by) {
        return `${(parseInt((num / baseNum_sy) * 100) / 100)}十亿`;
    }
    if (num >= baseNum_by && num < baseNum_qy) {
        return `${(parseInt((num / baseNum_by) * 100) / 100)}百亿`;
    }
    if (num >= baseNum_qy && num < baseNum_wy) {
        return `${(parseInt((num / baseNum_qy) * 100) / 100)}千亿`;
    }
    if (num >= baseNum_wy) {
        return `${(parseInt((num / baseNum_wy) * 100) / 100)}万亿`;
    }
    return formatPrice(num)
}

export function isContain(item, arr = []) {
    return arr.indexOf(item);
}

export function getEnv() {

    const subOrigin = location.host.split('.')[0];
    console.log('subOrigin', subOrigin)
    if (subOrigin === 'xkadmin') {
        return 'product';
    }
    if (subOrigin === 'test' || subOrigin === 'testw') {
        return 'test';
    }
    if (subOrigin === 'final') {
        return 'final'
    }
    if (subOrigin === 'dev' || subOrigin === 'devw') {
        return 'dev';
    }
}


/**
 * 节流函数
 * */
export function throttle(fn, delay) {
    let timer = null;
    let startTime = new Date();
    return function () {
        let context = this, currentTime = new Date(), args = arguments;
        clearTimeout(timer);
        if (currentTime - startTime > delay) {
            fn.apply(context, args);
            startTime = currentTime;
        } else {
            timer = setTimeout(function () {
                fn.apply(context, args)
            }, delay)
        }
    };
};



export function formatDuration(time) {
    if (time > -1) {
        var hour = Math.floor(time / 3600);
        var min = Math.floor(time / 60) % 60;
        var sec = time % 60;
        if (hour < 10) {
            time = '0' + hour + ":";
        } else {
            time = hour + ":";
        }

        if (min < 10) {
            time += "0";
        }
        time += min + ":";

        if (sec < 10) {
            time += "0";
        }
        time += sec;
    }
    return time;
}

export function getRemainTime(endTime, deviceTime) {
    let t = endTime - deviceTime;
    let seconds = Math.floor((t / 1000) % 60);
    let minutes = Math.floor((t / 1000 / 60) % 60);
    let hours = Math.floor((t / (1000 * 60 * 60)) % 24);
    let days = Math.floor(t / (1000 * 60 * 60 * 24));
    return {
        'total': t,
        'days': days,
        'hours': hours,
        'minutes': minutes,
        'seconds': seconds
    }
};

export function openXksquareApp() {
    if (system() === 'android') {
        window.location.href = "xkgc://shuimukeji.cn/launch/splash"
    } else if (system() === 'ios') {
        window.location.href = "xksquare://"
    }
}

export function saveWxConfig(res) {
    sessionStorage.setItem('xk_share_wx_config', des3(123123, JSON.stringify(res)));
}

export function getWxConfig() {
    return sessionStorage.getItem('xk_share_wx_config') ? JSON.parse(des3Decrypt(sessionStorage.getItem('xk_share_wx_config'), 123123)) : '';
}

export function initWxConfig() {
    return new Promise((resolve, reject) => {
        let res = getWxConfig();
        if (!res) reject({code: 500, message: '微信配置信息Config未获取'});
        wx.config({
            debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
            appId: res.appId, // 必填，公众号的唯一标识
            timestamp: res.timestamp, // 必填，生成签名的时间戳
            nonceStr: res.nonceStr, // 必填，生成签名的随机串
            signature: res.sign,// 必填，签名
            jsApiList: [
                'chooseWXPay',
                'scanQRCode',
                'translateVoice',
                'updateTimelineShareData',
                'updateAppMessageShareData'
            ] // 必填，需要使用的JS接口列表
        });
        wx.ready(() => {
            resolve({code: 200})
        });
        wx.error(() => {
            reject({code: 500, message: '初始化微信SDK失败'})
        })
    })
}

/**
 * 自定义“分享给朋友”及“分享到QQ”按钮的分享内容
 * @param options
 * @returns {Promise<any>}
 */
export function shareAppMessage(options) {
    return new Promise((resolve, reject) => {
        wx.updateAppMessageShareData({
            title: options.title, // 分享标题
            desc: options.desc, // 分享描述
            link: options.link, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
            imgUrl: options.imgUrl, // 分享图标
            success: function (res) {
                // 设置成功
                if (res.errMsg === 'updateAppMessageShareData:ok') {
                    resolve()
                } else {
                    reject()
                }
            }
        })
    })
}

/**
 * 自定义“分享到朋友圈”及“分享到QQ空间”按钮的分享内容
 * @param options
 * @returns {Promise<any>}
 */
export function shareTimeline(options) {
    return new Promise((resolve, reject) => {
        wx.updateTimelineShareData({
            title: options.title, // 分享标题
            link: options.link, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
            imgUrl: options.imgUrl, // 分享图标
            success: function (res) {
                // 设置成功
                if (res.errMsg === 'updateTimelineShareData:ok') {
                    resolve()
                } else {
                    reject()
                }
            }
        })
    })
}
