/**
* Created by zhangmei on 2019/3/4
*/
<template>
    <div class="download-video-app">
        <div class="ios-scroll">
            <div class="video-writing">
            </div>
            <div class="download-code">
                <img v-if="env==='dev'" src="~assets/image/dev-video-app.png"
                     class="block" alt="">
                <img v-if="env==='test'" src="~assets/image/test-video-app.png"
                     class="block" alt="">
                <img v-if="env==='product'" src="~assets/image/video-app.png"
                     class="block" alt="">
                <img v-if="env==='final'" src="~assets/image/video-app.png"
                     class="block" alt="">
            </div>
            <div class="download-btn-container">
                <div @click="downloadIOS" v-if="system==='ios'">IOS下载</div>
                <div @click="downloadAndroid" v-if="system==='android'">Android下载</div>
            </div>
            <p class="already-download" v-if="system==='android'">如您已下载该APP，请在手机桌面打开即可。</p>
        </div>

        <template v-if="showGuide">
            <div class="guide" :class="{'guide-android':system==='android'}">
                <span @click="showGuide=false">
                    我知道了
                </span>
            </div>
        </template>
    </div>
</template>

<script>
    import {xkzb, ios_xkzb} from "@/util/publicParams";
    import {getEnv, system, isWeiXin, openXksquareApp} from "@/util/publicMehotds";

    export default {
        name: "",
        componentName: "",
        components: {},
        data() {
            return {
                env: getEnv(),
                showGuide: false,
                system: system()
            }
        },
        created() {
            try {
                if (system() === 'ios') {
                    window.location = 'xklive://'
                } else {
                    window.location = 'xkzb://shuimukeji.cn/launch/SPLASH';
                }
            }
            catch (e) {
            }
        },
        mounted() {
            this.$nextTick(() => {
                if (isWeiXin()) {
                    this.showGuide = true;
                }
            })
        },
        methods: {
            downloadAndroid() {
                window.location = xkzb;
            },
            downloadIOS() {
                window.location = ios_xkzb;
            }
        },
        computed: {},
    }
</script>

<style scoped type="text/scss" lang="scss">
    .guide {
        position: fixed;
        left: 0;
        bottom: 0;
        top: 0;
        right: 0;
        z-index: 100;
        background: rgba(0, 0, 0, .7) no-repeat url("../../assets/image/guide-ios.png") center 15px / 266px 228px;
        &.guide-android {
            background: rgba(0, 0, 0, .7) no-repeat url("../../assets/image/guide-android.png") center 15px / 266px 228px;
            }
        text-align: center;
        padding-top: 280px;
        span {
            color: #4A90FA;
            font-size: 15px;
            }
        }

    .download-video-app {
        height: 100%;
        width: 100%;
        background: #FFFFFF;
        .video-writing {
            height: 448px;
            background: no-repeat url("../../assets/image/download/video-mac.png") center 240px / 282px 208px, no-repeat url("../../assets/image/download/video-app-writing.png") 0 0 /100%,;
            }
        .download-code {
            height: 128px;
            width: 128px;
            padding: 10px;
            box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.20);
            margin: 0 auto;
            img {
                height: 100%;
                width: 100%;
                }
            }
        .download-btn-container {
            margin-top: 16px;
            display: flex;
            padding: 0 18px;
            align-items: center;
            justify-content: center;
            > div {
                width: 160px;
                background: no-repeat url("../../assets/image/download/video-iphone.png") 30px 12px / 20px 20px, linear-gradient(-180deg, #FFA702 0%, #FF7402 100%);
                border-radius: 4px;
                color: #FFFFFF;
                height: 44px;
                text-align: left;
                padding-left: 61px;
                font-size: 18px;
                line-height: 44px;
                &:last-child {
                    padding-left: 43px;
                    background: no-repeat url("../../assets/image/download/video-android.png") 13px 12px / 20px 20px, linear-gradient(-180deg, #FFA702 0%, #FF7402 100%);
                    }
                }
            }
        }

    .already-download {
        font-size: 12px;
        color: #999999;
        line-height: 16px;
        margin-top: 8px;
        text-align: center;
        }
</style>
