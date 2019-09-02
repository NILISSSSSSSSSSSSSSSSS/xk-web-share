/**
* Created by zhangmei on 2018/11/15
*/
<template>
    <!--查看更多-->
    <div class="show-more iphonex-bottom" v-if="show">
        <div class="xk-left">
            <div class="icon-close" @click="closeTip"></div>
            <div class="xk-logo"><img class="block" src="~assets/image/xk-logon.png" alt=""></div>
            <div class="xk">
                <div>晓可广场</div>
                <span>品优价惠，天天大奖</span>
            </div>
        </div>
        <div class="download-app" @click="showMore">打开APP</div>
    </div>
</template>

<script>
    import {wakeNative} from "../util/publicMehotds";

    export default {
        name: "showMore",
        data() {
            return {
                show: true
            }
        },
        props: {
            url: {
                type: String
            },
            jumpUrl: {  //自定义跳转Url
                type: String,
                default: ""
            }
        },
        methods: {
            showMore() {
                wakeNative.call(this, "gc", this.jumpUrl);
            },
            closeTip() {
                this.show = false;
            }
        }
    }
</script>

<style scoped lang="scss" type="text/scss">
    /*查看更多*/
    .show-more {
        padding: 0 15px;
        font-size: 12px;
        color: #999999;
        height: 60px;
        display: flex;
        position: fixed;
        bottom: 0;
        left: 0;
        width: 100%;
        justify-content: space-between;
        background: #FFFFFF;
        align-items: center;
        z-index: 100;
        .icon-close {
            font-size: 20px;
        }
        .xk-left {
            display: flex;
            align-items: center;
            .xk-logo {
                height: 40px;
                width: 40px;
                margin-left: 15px;
                img {
                    width: 100%;
                    height: 100%;
                }
            }
            .xk {
                margin-left: 15px;
                div {
                    font-size: 14px;
                    color: #222222;
                    line-height: 14px;
                }
                span {
                    font-size: 12px;
                    color: #818181;
                    line-height: 12px;
                    margin-top: 5px;
                    display: block;
                }
            }
        }
        .download-app {
            border: 1px solid #4A90FA;
            border-radius: 3px;
            width: 65px;
            height: 25px;
            line-height: 25px;
            text-align: center;
            font-size: 12px;
            color: #4A90FA;
        }

    }
</style>
