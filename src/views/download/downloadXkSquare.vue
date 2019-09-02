/**
* Created by zhangmei on 2019/3/4
*/
<template>
    <div class="download-page">
        <div class="ios-scroll">
            <div class="xk-merchant-logo">
            </div>
            <div class="download-btn">
                <div class="download-app-btn download-ios" v-if="system==='ios'" :class="{'active':activeIphone}"
                     @click="downloadIOS">iPhone免费下载
                </div>
                <div class="download-app-btn download-andriod" v-if="system==='android'" :class="{'active':!activeIphone}"
                     @click="downloadAndroid">Android免费下载
                </div>
            </div>
            <div class="download-code">
                <img v-if="env==='dev'" src="~assets/image/dev-square-app.png"
                     class="block img-object-fit-cover" alt="">
                <img v-if="env==='test'" src="~assets/image/test-square-app.png"
                     class="block img-object-fit-cover" alt="">
                <img v-if="env==='product'" src="~assets/image/square-app.png"
                     class="block img-object-fit-cover" alt="">
                <img v-if="env==='final'" src="~assets/image/square-app.png"
                     class="block img-object-fit-cover" alt="">
            </div>
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
    import {xkgc, ios_xkgc} from "@/util/publicParams";
    import {getEnv, system, isWeiXin, openXksquareApp} from "@/util/publicMehotds";

    export default {
        name: "Dowload",
        componentName: "Dowload",
        components: {},
        data() {
            return {
                activeIphone: true,
                env: getEnv(),
                showGuide: false,
                system: system()
            }
        },
        created() {
            try {
                openXksquareApp();
            } catch (e) {
                console.log("唤醒APP失败")
            }
        },
        mounted() {
            this.$nextTick(() => {
                if (isWeiXin()) {
                    this.showGuide = true;
                }
                if (system() === 'ios') {
                    window.location = window.location = 'xksquare://';
                } else {
                    window.location = "https://sj.qq.com/myapp/detail.htm?apkName=com.xiaoke.GRoom";
                }
            })
        },
        methods: {
            downloadAndroid() {
                window.location = "https://sj.qq.com/myapp/detail.htm?apkName=com.xiaoke.GRoom";
            },
            downloadIOS() {
                window.location = ios_xkgc;
            }
        },
        computed: {},
    }
</script>
<style scoped lang="scss" type="text/scss">
    .download-page {
        height: 100%;
        width: 100%;
        background: #FFFFFF;
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
        .ios-scroll {
            padding-top: 76px;
            }
        .xk-merchant-logo {
            height: 230px;
            width: 327px;
            background: no-repeat url("~assets/image/download/xksquare-logo.png") 0 0 / 100%;
            margin: 0 auto;
            }
        .download-btn {
            margin: 72px auto 0;
            .download-app-btn {
                width: 212px;
                height: 46px;
                margin: 0 auto;
                color: #3875FD;
                border-radius: 23px;
                border: 1px solid #3774FD;
                font-size: 17px;
                line-height: 46px;
                text-align: left;
                padding-left: 60px;
                background: no-repeat url("~assets/image/download/iphone-logo-blue.png") 30px 14px / 16px 18px, #FFFFFF;
                &.download-app-btn {
                    color: #FFFFFF;
                    background: no-repeat url("~assets/image/download/iphone-logo.png") 30px 14px / 16px 18px, linear-gradient(-90deg, #4A96FF 0%, #3773FD 100%);
                    }
                }
            }
        .download-code {
            height: 110px;
            width: 110px;
            border-radius: 9px;
            background: #FFFFFF;
            margin: 36px auto 0;
            padding: 10px;
            box-shadow: 0 0 10px 0 rgba(56, 118, 253, 0.20);
            img {
                height: 100%;
                width: 100%;
                }
            }
        }
</style>
