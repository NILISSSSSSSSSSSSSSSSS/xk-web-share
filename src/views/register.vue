<template>
    <div class="register-con">
        <div class="register-head">
            <!-- <p class="title">晓可广场</p>-->
        </div>
        <div class="register-main">
            <div class="reg-form">
                <input maxlength="11" v-model="register.phone" class="reg-inp" type="text" placeholder="请输入您的手机号码">
                <div class="send-code">
                    <input v-model="register.code" class="reg-inp" type="text" placeholder="请输入验证码">
                    <span v-if="!isSend" @click="sendCode" class="send-btn">发送验证码</span>
                    <span v-else @click="sendCode" class="send-btn">{{second}}s</span>
                </div>
                <input v-model="register.password" class="reg-inp" type="password" placeholder="请输入密码（6-20位）">
                <input v-model="register.referralCode" :readonly="isReadonly" class="reg-inp"
                       type="text" placeholder="请输入安全码（推荐）">
                <p class="desc">*安全码可在推荐人或已注册用户处获取</p>
                <p class="desc">*密码可用大小写英文字母、数字、除空格外的特殊符号组成6~20位</p>
                <div class="agreement">
                    <div class="checkbox">
                        <input type="checkbox" v-model="read" id="checkbox">
                        <span :class="{'span-active':read}">
                            <img src="~assets/image/gou.png" alt="">
                        </span>
                        <label for="checkbox">我已阅读并同意</label>
                    </div>
                    <span class="argee" @click="fnRead('UA_APP_USER_PROTOCOL')">用户协议</span>
                    <span class="argee" style="color:#999999">和</span>
                    <span class="argee" @click="fnRead('UA_PRIVACY_PROTOCOL')">隐私协议</span>
                </div>
            </div>
            <div @click="submit" class="sub-btn">
                <img src="../assets/image/reg-btn.png" alt="">
                <span class="info">注册</span>
            </div>
            <div class="download-app">
                <span @click="downloadApp">
                    我已注册,去下载
                </span>
            </div>
        </div>
    </div>
</template>

<script>
    import {system, openXksquareApp} from '../util/publicMehotds';

    export default {
        name: "register",
        data() {
            return {
                timer: null,
                second: 60,
                isReadonly: true,
                isSend: false,
                read: '',
                register: {
                    phone: "",
                    code: "",
                    password: "",
                    channel: "official",
                    referralCode: '',
                    guid: "web-register",
                    os: system()
                },
            }
        },
        mounted() {
            let url = location.href;
            let theParam = {};
            if (url.indexOf("?") != -1) {
                let str = url.split('?')[1];
                let strs = str.split("&");
                for (let i = 0; i < strs.length; i++) {
                    theParam[strs[i].split("=")[0]] = unescape(strs[i].split("=")[1]);
                }
            }
            this.register.referralCode = this.$route.query.securityCode || '';
            if (!this.register.referralCode) {
                this.isReadonly = false
            }
            try {
                openXksquareApp();
            } catch (e) {
                console.log("唤醒APP失败")
            }
        },
        methods: {
            downloadApp() {
                this.$router.replace({
                    path: '/downloadXkSquare'
                })
            },
            fnRead(contractConfigKey) {
                this.$router.push({
                    path: "/agreement",
                    query: {
                        contractConfigKey
                    }
                })
            },
            sendCode() {
                if (!this.register.phone) {
                    this.$vux.toast.text("请输入手机号码");
                    return false
                }
                if (isNaN(this.register.phone) || this.register.phone < 9999999999) {
                    this.$vux.toast.text("请输入正确手机号码");
                    return false
                }

                this.$vux.loading.show();
                this.$http.get(this.$api.sendAuthMessage, {
                    phone: this.register.phone,
                    bizType: "REGISTER",
                    guid: this.register.guid
                }, true)
                    .then(res => {
                        this.$vux.toast.text("发送成功");
                        this.isSend = true;
                        this.timer = setInterval(() => {
                            --this.second
                            if (this.second < 1) {
                                this.second = 60;
                                clearInterval(this.timer);
                                this.isSend = false
                            }
                        }, 1000);
                        this.$vux.loading.hide();
                    })
                    .catch(err => {
                        this.$vux.toast.text(err.message);
                        this.$vux.loading.hide();
                    })
            },
            submit() {
                if (!this.register.phone) {
                    this.$vux.toast.text("请输入手机号码");
                    return false
                }
                if (isNaN(this.register.phone) || this.register.phone < 9999999999) {
                    this.$vux.toast.text("请输入正确手机号码");
                    return false
                }
                if (!this.register.code) {
                    this.$vux.toast.text("请输入验证码");
                    return false
                }
                if (!this.register.password) {
                    this.$vux.toast.text("请输入密码");
                    return false
                }
                if (this.register.password.length < 6 || this.register.password.length > 20) {
                    this.$vux.toast.text("密码长度（6 - 20）");
                    return false
                }
                if (!this.read) {
                    this.$vux.toast.text("请阅读协议");
                    return false
                }
                this.$vux.loading.show();
                this.$http.post(this.$api.xkUserRegisterByPhone, this.register, true)
                    .then(res => {
                        this.$vux.loading.hide();
                        this.$vux.toast.text("注册成功");
                        //注册成功跳转下载链接
                        if (system() === 'android') {
                            window.location = "https://sj.qq.com/myapp/detail.htm?apkName=com.xiaoke.GRoom";
                        } else {
                            this.$router.push('/downloadXkSquare')
                        }
                    })
                    .catch(err => {
                        this.$vux.toast.text(err.message);
                        this.$vux.loading.hide();
                    })
            }
        },
        watch: {
            read(val) {
                console.log(val)
            }
        },
    }
</script>

<style lang="scss" scoped>
    .register-con {
        min-height: 100vh;
        background: #FFFFFF;
        .register-head {
            position: relative;
            top: -70px;
            overflow: hidden;
            width: 100%;
            height: 276px;
            background: no-repeat url("../assets/image/register.png");
            background-size: 100% 100%;
            text-align: center;
            .title {
                display: flex;
                align-items: center;
                justify-content: center;
                font-family: HiraKakuStd-W8;
                font-size: 30px;
                color: #FFFFFF;
                margin-top: 88px;
                .plan {
                    display: inline-block;
                    width: 2px;
                    height: 32px;
                    background: #FFFFFF;
                    margin: 0 10px;
                    }
                }
            }
        .register-main {
            position: absolute;
            width: 320px;
            background: #FFFFFF;
            border-radius: 10px;
            top: 79px;
            left: 50%;
            transform: translateX(-50%);
            box-shadow: 0 2px 15px 0 rgba(67, 67, 67, 0.20);
            padding: 0 0 27px;
            .reg-form {
                padding: 0 25px;
                .send-code {
                    position: relative;
                    .send-btn {
                        position: absolute;
                        height: 30px;
                        line-height: 29px;
                        font-family: PingFangSC-Regular;
                        font-size: 14px;
                        color: #4A90FA;
                        right: 0;
                        bottom: 0;
                        }
                    }
                .reg-inp {
                    font-size: 14px;
                    display: inline-block;
                    width: 100%;
                    height: 30px;
                    border-bottom: 1px solid #BCBCBC;
                    margin-top: 30px;
                    letter-spacing: 1px;
                    }
                .desc {
                    font-family: PingFangSC-Regular;
                    font-size: 12px;
                    color: #464646;
                    margin-top: 5px;
                    }
                .agreement {
                    padding-top: 6px;
                    display: flex;
                    align-items: center;
                    margin-bottom: 24px;
                    color: #999999;
                    height: 20px;
                    .checkbox {
                        position: relative;
                        input {
                            opacity: 0;
                            position: relative;
                            z-index: 2;
                            }
                        span {
                            display: block;
                            position: absolute;
                            top: 3px;
                            left: 0;
                            width: 16px;
                            height: 16px;
                            border: 1px solid #DDDDDD;
                            border-radius: 2px;
                            z-index: 1;
                            box-sizing: border-box;
                            img {
                                widows: 100%;
                                height: 100%;
                                transition: all 0.2s;
                                opacity: 0;
                                position: absolute;
                                left: 0;
                                top: 0;
                                }
                            }
                        label {
                            margin-left: -2px;
                            }
                        .span-active {
                            img {
                                opacity: 1;
                                }
                            background: #4A90FA;
                            border: 1px solid #4A90FA;
                            }
                        }
                    .argee {
                        font-size: 12px;
                        color: #4A90FA;
                        margin: 0 2px
                        }
                    }
                }
            }
        .sub-btn {
            position: relative;
            width: 100%;
            text-align: center;
            margin-top: 2px;
            img {
                width: 92%;
                }
            .info {
                position: absolute;
                font-family: PingFangSC-Medium;
                font-size: 17px;
                color: #FFFFFF;
                left: 50%;
                transform: translateX(-50%);
                top: 22px;
                letter-spacing: 5px;
                }
            }
        }

    .download-app {
        color: #4A90FA;
        font-size: 12px;
        display: flex;
        align-items: center;
        justify-content: center;
        }

    .reg-inp {
        -webkit-appearance: none; /*解决iphone safari上的圆角问题*/
        border-radius: 0
        }

</style>
