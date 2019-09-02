/**
* Created by zhangmei on 2019/5/8
*/
<template>
    <div class="bind-phone">
        <template v-if="notBindWechat">
            <div class="phone-input" @click="inputClick($event)">
                <input type="tel" maxlength="11" v-model="phoneNumber" placeholder="请输入手机号">
            </div>
            <div class="phone-input code-input" @click="inputClick($event)">
                <input type="number" v-model="verificationCode" placeholder="请输入验证码">
                <span @click.stop="getVerificationCode">{{!isSend?'发送验证码':second+'S'}}</span>
            </div>
            <template v-if="!isRegistered">
                <div class="phone-input code-input">
                    <input type="number" v-model="securityCode" :disabled="isDisabled" placeholder="请输入安全码（推荐）">
                </div>
                <p class="tips">默认帮您绑定链接分享人的安全码</p>
            </template>
            <div class="bind-btn" @click="bindPhoneNumber">
                <span>完成绑定</span>
            </div>
            <p class="tips">
                若输入的手机号未注册晓可，系统会自动帮您注册
            </p>
            <custom-dialog v-model="showChangePhone">
                <div class="change-phone">
                    <p>
                        您的手机号已绑定另一个
                        微信账号，是否更换为当前微信号？
                    </p>
                    <div class="btns">
                        <div @click="proceedDownload">
                        <span>
                            不更换
                        </span>
                        </div>
                        <div @click="changePhoneNumber">
                        <span>
                            更换
                        </span>
                        </div>
                    </div>
                </div>
            </custom-dialog>
        </template>
    </div>
</template>

<script>
    import CustomDialog from "@/components/common/dialog/dialog"
    import {queryParam, getSafe} from "@/util/publicMehotds";
    import {system, isWeiXin} from "../util/publicMehotds";

    export default {
        name: "",
        componentName: "",
        components: {
            CustomDialog
        },
        data() {
            return {
                second: 60,
                isSend: false,
                isDisabled: true,
                timer: null,
                phoneNumber: '',
                securityCode: '',
                verificationCode: '', //短信验证码
                code: '', //微信授权码
                jumpUrl: "", //自定义跳转路径
                isRegistered: true,
                showChangePhone: false,
                notBindWechat: false,
                platform: 'zb',
            }
        },
        created() {
            let state = queryParam('state') || '';
            this.securityCode = state.split('break')[0] && state.split('break')[0] != 'undefined' ? state.split('break')[0] : '';
            this.platform = state.split('break')[1];
            this.jumpUrl = this.$route.query.jumpUrl ? decodeURIComponent(this.$route.query.jumpUrl) : "";
            this.code = queryParam('code');
            this.checkWechatValidate();
        },
        beforeDestroy() {
            clearInterval(this.timer);
        },
        methods: {
            inputClick(event) {
                event.target.querySelector('input').focus();
            },

            /**
             *检查之前是否绑定过微信
             * */
            checkWechatValidate() {
                const parameter = {
                    code: this.code
                };
                this.$vux.loading.show();
                this.$http.get(this.$api.xkUserWeChatShareValidate, parameter, true)
                    .then(res => {
                        if (getSafe(() => res.code, 0) === 1346) {  //没绑定过微信
                            this.notBindWechat = true;
                        } else {
                            this.proceedDownload();
                        }
                    })
                    .catch(err => {
                        this.$vux.toast.text(err.message);
                        this.proceedDownload();
                    })
                    .finally(() => {
                        this.$vux.loading.hide();
                    })
            },

            /**
             * 倒计时
             * */
            getVerificationCode() {
                // let phoneReg = /^(0|86|17951)?(13[0-9]|15[012356789]|166|17[3678]|18[0-9]|14[57])[0-9]{8}$/;
                // if (!phoneReg.test(this.phoneNumber)) {
                //     return this.$vux.toast.text('电话号码格式不正确');
                // }
                if (parseInt(this.phoneNumber) < 9999999999) {
                    return this.$vux.toast.text('电话号码格式不正确');
                }
                if (this.isSend) return;
                this.isSend = true;
                this.timer = setInterval(() => {
                    --this.second;
                    if (this.second < 1) {
                        this.second = 60;
                        clearInterval(this.timer);
                        this.isSend = false
                    }
                }, 1000);
                this.sendCode();
            },

            /**
             * 发送验证码
             * */
            sendCode() {
                const parameter = {
                    phone: this.phoneNumber,
                    bizType: "TLOGIN_BIND_PHONE",
                    guid: 'test'
                };
                this.$http.get(this.$api.sendAuthMessage, parameter, true)
                    .then(res => {
                        this.$vux.toast.text('验证码已发送');
                        if (getSafe(() => res.code, 0) === 4021) {
                            this.isRegistered = false;
                            if (!this.securityCode) {
                                this.isDisabled = false;
                            }
                        } else {
                            this.isRegistered = true;
                        }
                    })
                    .catch((err) => {
                        clearInterval(this.timer);
                        this.second = 60;
                        this.isSend = false;
                        this.$vux.toast.text(err.message);
                    })
                    .finally(() => {

                    })
            },

            /**
             *更换微信绑定
             * */
            changePhoneNumber() {
                const parameter = {
                    code: this.code,
                    phone: this.phoneNumber
                };
                this.$http.get(this.$api.xkUserWeChatShareReBind, parameter, true)
                    .then(res => {
                        this.$vux.toast.text('绑定成功');
                        this.proceedDownload();
                    })
                    .catch(err => {
                        this.$vux.toast.text(err.message)
                    })
            },

            /**
             *绑定
             * */
            bindPhoneNumber() {
                if (!this.phoneNumber) {
                    this.$vux.toast.text("请输入手机号码");
                    return
                }
                if (!this.verificationCode) {
                    this.$vux.toast.text("请输入验证码");
                    return
                }
                if (!this.isRegistered && !this.securityCode) {
                    this.$vux.toast.text("请填写安全码");
                    return
                }
                const parameter = {
                    code: this.code,
                    phone: this.phoneNumber,
                    verifyCode: this.verificationCode,
                    referralCode: this.securityCode,
                    os: 'ios'
                };
                this.$vux.loading.show();
                this.$http.get(this.$api.xkUserWeChatShareRegister, parameter, true)
                    .then(res => {
                        if (getSafe(() => res.code, 0) === 1066) {  //此电话号码已经绑定过微信号,弹窗提示更换
                            this.$vux.toast.text('该手机号已绑定微信,请重新输入');
                            /*
                                                        this.showChangePhone = true;
                            */
                        } else {
                            this.$vux.toast.text('绑定成功');
                            this.proceedDownload();
                        }
                    })
                    .catch(err => {
                        this.$vux.toast.text(err.message)
                    })
                    .finally(() => {
                        this.$vux.loading.hide();
                    })
            },

            /**
             * 去往下载页
             * */
            proceedDownload() {
                if (this.jumpUrl && this.jumpUrl !== 'undefined') {
                    window.location.href = this.jumpUrl;
                    return
                }
                setTimeout(() => {
                    if (isWeiXin()) {
                        if (system() === 'ios') {
                            if (this.platform === 'gc') {
                                // this.$router.push("/downloadXkSquare")
                                window.location = `${location.origin}/share/#/downloadXkSquare`;
                            } else {
                                // this.$router.push("/downloadVideoAPP")
                                window.location = `${location.origin}/share/#/downloadVideoAPP`;
                            }
                        } else {
                            if (this.platform === 'gc') {
                                window.location = "https://sj.qq.com/myapp/detail.htm?apkName=com.xiaoke.GRoom";
                            } else {
                                this.$router.push("/downloadVideoAPP")
                                // window.location = `${location.origin}/share/#/downloadVideoAPP`;
                            }
                        }
                    } else {
                        if (this.platform === 'gc') {
                            this.$router.push("/downloadXkSquare")
                            // window.location = `${location.origin}/share/#/downloadXkSquare`;
                        } else {
                            this.$router.push("/downloadVideoAPP")
                            // window.location = `${location.origin}/share/#/downloadVideoAPP`;
                        }
                        /* this.$router.replace({
                             path: '/downloadXkSquare'
                         })*/
                    }
                }, 300)
            }
        },
        computed: {},

    }
</script>

<style scoped lang="scss" type="text/scss">
    .bind-phone {
        padding: 20px 10px 0;
        .phone-input {
            padding: 7px 0;
            background: #FFFFFF;
            font-size: 14px;
            color: #999999;
            display: flex;
            align-items: center;
            input {
                padding: 8px 15px;
                font-size: 14px;
                line-height: 14px;
                flex-grow: 1;
            }
        }
        .code-input {
            margin-top: 10px;
            display: flex;
            span {
                color: #4A90FA;
                flex-shrink: 0;
                padding-right: 15px;
                line-height: 30px;
            }
        }
        .bind-btn {
            margin-top: 20px;
            font-size: 17px;
            color: #FFFFFF;
            height: 44px;
            line-height: 44px;
            text-align: center;
            border-radius: 8px;
            background: #4A90FA;
        }
        .tips {
            text-align: center;
            font-size: 12px;
            line-height: 34px;
            color: #999999;
            padding-left: 15px;
        }
        .change-phone {
            background: #FFFFFF;
            width: 270px;
            height: 140px;
            border-radius: 14px;
            p {
                line-height: 22px;
                padding: 24px;
                text-align: center;
            }
            .btns {
                display: flex;
                align-items: center;
                justify-content: center;
                height: 45px;
                border-top: 1px solid #F1F1F1;
                > div {
                    flex-grow: 1;
                    font-size: 14px;
                    color: #222222;
                    width: 50%;
                    text-align: center;
                    height: 100%;
                    line-height: 44px;
                    &:last-child {
                        border-left: 1px solid #F1F1F1;
                        color: #4A90FA;
                    }
                }
            }
        }
    }
</style>
