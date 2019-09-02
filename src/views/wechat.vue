<template>
    <div>
        <!-- <div style="height: 200px;background-color: red;"></div>
         <button @click="test">切换</button>
         <ul v-if="isShow">
             <li v-for="item in 60">item</li>
         </ul>
         <div v-else style="overflow: hidden">
             <span v-for="item in 60" style="width: 50%;float: left">item</span>
         </div>-->

        <!-- <video id="video" style="width: 100%" controls="controls">
             <source src="http://p7ewuznsy.bkt.clouddn.com/recordings/z1.qiniu-live-video.56335591/1538125181_1538125437.m3u8" type="application/x-mpegURL"/>
         </video>-->
    </div>
</template>

<script>
    // import 'video.js/dist/video-js.css'
    // import videojs from 'video.js'
    // import 'videojs-contrib-hls'
    import {appid} from '../util/publicParams'
    import {queryParam} from '../util/publicMehotds'

    export default {
        data() {
            return {
                isShow: true
            }
        },
        created() {
            let code = queryParam("code");
            if (!code) {
                let url = window.location.href;
                // let code = "snsapi_base";
                let scope = "snsapi_userinfo";
                window.location.href = "https://open.weixin.qq.com/connect/oauth2/authorize?appid=" + appid + "&redirect_uri=" + encodeURIComponent(url) + "&response_type=code&scope=" + scope + "&state=STATE#wechat_redirect";
            } else {
                this.$vux.loading.show({
                    text: '正在注册...'
                });
                let referralCode = this.$route.query.securityCode;
                let param = {
                    code,
                    referralCode
                };
                this.$http.post(this.$api.wechatRegister, param, true)
                    .then(res => {
                        console.log(res);
                        this.$vux.toast.text("注册成功");
                        this.$vux.loading.hide()
                    })
                    .catch(err => {
                        this.$vux.toast.text(err.message);
                        this.$vux.loading.hide()
                    });
                console.log(code);
            }
        },
        mounted() {
            /*  videojs('video', {
                  bigPlayButton: true,
                  textTrackDisplay: true,
                  posterImage: true,
                  errorDisplay: true,
                  controlBar: true
              }, function () {
                  this.play()
              })*/
        },
        methods: {
            test() {
                this.isShow = !this.isShow
            }
        }
    }
</script>

<style scoped>

</style>
