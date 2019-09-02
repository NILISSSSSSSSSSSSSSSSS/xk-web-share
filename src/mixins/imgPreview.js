/**
 * Created by zhangmei on 2018/11/22
 */

import {callNative} from '../util/publicMehotds'

export default {
    methods: {
        imgPreview(arr, index) {
            callNative("jsOpenAppImageBrowser", JSON.stringify({list: arr, index: index}));
        },
        openAppTips() {
            this.$vux.toast.text('请下载App', "middle");
        }
    }
}