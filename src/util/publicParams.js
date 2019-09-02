/**
 * 公共变量
 */


const DOWNLOAD_PREFIX = "https://apps.xksquare.com/";
const IOS_PRETIX = "https://itunes.apple.com/cn/app/";

/**
 * 签名密匙signKey
 * @type {string}
 */
export const signKey = "e10adc3949ba59abbe56e057f20f883e";

/**
 * data加密密匙dataKey
 * @type {string}
 */
export const dataKey = "c33367701511b4f6020ec61ded352059";

/**
 * 微信公众号APPID
 * @type {string}
 */
const host = location.hostname;
let app_id = "wxb2b3f0888cb42788"; //生产环境
if (host === "devw.xksquare.com" || host === "testw.xksquare.com") {
    //开发环境 //测试环境 使用同一个公众号
    app_id = "wx6b60ee1dd30a2908"
} else if (host === "final.xksquare.com") {
    //预发布环境
    app_id = "wx291c2533dec74f6e";
}
export const appid = app_id;
export const xkgc = DOWNLOAD_PREFIX + 'xkgc.apk';
export const xklm = DOWNLOAD_PREFIX + 'xklm.apk ';
export const xkps = DOWNLOAD_PREFIX + 'xkps.apk';
export const xkzb = DOWNLOAD_PREFIX + 'xkzb.apk';

export const ios_xkgc = IOS_PRETIX + 'id1313663972';
export const ios_xklm = IOS_PRETIX + 'id1448670815';
export const ios_xkzb = IOS_PRETIX + 'id1373134622';
export const ios_xkps = IOS_PRETIX + 'id1450939688';

