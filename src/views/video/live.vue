/**
* Created by zhangmei on 2018/12/12
*/
<template>
    <div class="live">
        <template v-if="getDetail">
            <div v-if="isAndroid && isWeiXin" class="video-div">
                <video v-show="!playAndroid"
                       class="android-video"
                       x5-playsinline="true"
                       webkit-playsinline="true"
                       x5-video-player-type="h5"
                       width="120%"
                       height="120%"
                       style="object-fit: fill"
                       @loadedmetadata="handleLoadedmetadata($event)"
                       :src="detail.play"
                       ref="videoPlayer">
                </video>
                <div v-show="playAndroid" class="video-hierarchy">
                    <div class="play-btn" @click="startPlay"></div>
                    <img class="android-avatar block" :src="detail.avatar"
                         alt="">
                </div>
            </div>
            <video v-else webkit-playsinline='true'
                   x5-video-player-type="h5"
                   x5-video-player-fullscreen="false"
                   playsinline='true'
                   autoplay="true"
                   class="video-js"
                   ref="videoPlayer">
                <source :src="detail.play"
                        type="application/x-mpegURL">
            </video>
        </template>

        <!--用户信息-->
        <div class="user-info">
            <div class="user-avatar">
                <img :src="detail.avatar"
                     alt="">
            </div>
            <div>
                <p>{{detail.nickname}}</p>
                <p>房间号：{{this.$route.query.id}}</p>
            </div>
        </div>

        <div class="show-more" @click="downloadApp">
            查看更多
        </div>

        <!--提示下载app-->
        <div class="download-tips" v-if="showDownload">
            <div class="live-logo">
            </div>
            <div class="xk-short-video">
            </div>
            <div class="download" @click="downloadApp">
                打开看看
            </div>
        </div>
    </div>
</template>
<script>
    import 'video.js/dist/video-js.css'
    import videojs from 'video.js'
    import 'videojs-contrib-hls'
    import {wakeNative, system, isWeiXin} from "@/util/publicMehotds";

    export default {
        components: {},
        data() {
            return {
                showDownload: true,
                detail: {},
                getDetail: false,
                settingOption: {
                    controls: true,
                    preload: 'auto',
                    mute: true,
                    height: 667,
                    width: 375,
                    loop: true,
                    poster: "",
                    aspectRatio: "16:9",
                    notSupportedMessage: '视频播放失败',
                    fill: true
                },
                showPlayBtn: true,
                playAndroid: false,
                isAndroid: false,
                videoListener: null,
                isWeiXin: isWeiXin(),
            }
        },
        created() {
            this.isAndroid = system() === 'android';
            if (this.isAndroid && this.isWeiXin) {
                this.playAndroid = true;
            }
            this.getShareLive();
        },
        mounted() {
            //videojs设置中文提示,网上看来的
            videojs.addLanguage('zh-CN', {
                "You aborted the media playback": "视频播放被终止",
                "A network error caused the media download to fail part-way.": "网络错误导致视频下载中途失败。",
                "The media could not be loaded, either because the server or network failed or because the format is not supported.": "视频因格式不支持或者服务器或网络的问题无法加载。",
                "The media playback was aborted due to a corruption problem or because the media used features your browser did not support.": "由于视频文件损坏或是该视频使用了你的浏览器不支持的功能，播放终止。",
                "No compatible source was found for this media.": "无法找到此视频兼容的源。",
            });


        },
        methods: {
            initPlayer() {
                this.player = videojs(this.$refs.videoPlayer, this.settingOption);
                this.player.ready(function () {
                    this.addClass('vjs-big-play-centered');
                    this.play();
                });
            },

            //获取直播地址
            getShareLive() {
                let params = {
                    channle_id: this.$route.query.id
                };
                this.$vux.loading.show();
                axios.post(this.$api.shareLive, params)
                    .then(res => {
                        if (res.data.code === 200) {

                            this.getDetail = true;
                            this.detail = res.data.body;
                            this.settingOption.poster = this.detail.avatar;
                            if (this.detail.status !== 2) {
                                return this.$vux.toast.text("直播已关闭");
                            }
                            //初始化播放器
                            if (!(this.isWeiXin && this.isAndroid)) {
                                this.$nextTick(() => {
                                    this.initPlayer();
                                })
                            }
                        }
                    })
                    .catch(err => {
                        this.$vux.toast.text(err.message, "middle")
                    })
                    .finally(() => {
                        this.$vux.loading.hide();
                    })
            },


            /**
             * 点击播放按钮
             * */
            startPlay() {
                if (this.$refs.videoPlayer.readyState >= 2) {
                    this.$refs.videoPlayer.play();
                    this.showPlayBtn = false;
                    this.playAndroid = false;
                    if (!this.videoListener) {
                        this.x5videoEnterFullScreen();
                    }
                }
            },
            //x5videoexitfullscreen退出全屏通知
            x5videoEnterFullScreen() {
                this.videoListener = this.$refs.videoPlayer.addEventListener("x5videoexitfullscreen", () => {
                    this.playAndroid = true;
                })
            },
            handleLoadedmetadata(event) {
                const videoTarget = event.target;
                if (videoTarget.readyState >= 2) {
                    videoTarget.play();
                    this.showPlayBtn = false;
                } else {
                    this.$vux.toast.text('正在缓冲数据...');
                }
            },
            //提示下载app
            downloadApp() {
                wakeNative.call(this, 'zb');
                /* downloadZb.call(this);*/
            }
        },
        computed: {},
    }
</script>

<style scoped lang="scss" type="text/scss">
    .live {
        position: relative;
        overflow: hidden;
        height: 100vh;
        width: 100%;
        background-color: #000000;
        .video-div {
            position: relative;
            width: 100%;
            height: 100%;
            .android-video {
                /*position: absolute;
                z-index: 3;
                top: 50%;
                left: 0;
                transform: translateY(-50%);*/
                /*background-color: #000;*/
                position: absolute;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                object-fit: contain;
                }
            .video-hierarchy {
                position: absolute;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                z-index: 999;
                .play-btn {
                    width: 56px;
                    height: 56px;
                    position: absolute;
                    z-index: 10;
                    top: 50%;
                    left: 50%;
                    transform: translate3d(-50%, -50%, 0);
                    background: no-repeat url("../../assets/image/video/play-btn.png") center/100%;
                    }
                }
            }
        /deep/ .vjs-control-bar {
            display: none;
            }
        /deep/ .video-js {
            height: 100%;
            width: 100%;
            }

        .android-avatar {
            position: absolute;
            z-index: 5;
            /*height: 100%;*/
            width: 100%;
            left: 0;
            top: 50%;
            transform: translateY(-50%);
            }
        video {
            height: 100%;
            width: 100%;
            object-fit: contain;
            }

        .download-tips {
            display: flex;
            height: 50px;
            width: 100%;
            position: fixed;
            align-items: center;
            bottom: 0;
            left: 0;
            z-index: 20;
            padding: 0 20px;
            background: rgba(0, 0, 0, 0.4);
            .live-logo {
                width: 30px;
                height: 30px;
                background: no-repeat url("~assets/image/video/live-logo.png") 0 0 / 30px 30px;
                }
            .xk-short-video {
                flex-grow: 1;
                height: 17px;
                margin-left: 10px;
                background: no-repeat url("~assets/image/video/xk-video.png") 0 0 / 80px 17px;
                }
            .download {
                width: 70px;
                height: 30px;
                background: #FCE76C;
                border-radius: 5px;
                line-height: 30px;
                text-align: center;
                font-size: 12px;
                color: #222222;
                }
            }

        .user-info {
            position: absolute;
            z-index: 20;
            top: 25px;
            left: 15px;
            display: flex;
            .user-avatar {
                height: 40px;
                width: 40px;
                img {
                    display: block;
                    height: 100%;
                    width: 100%;
                    border-radius: 50%;
                    }
                }
            div:last-child {
                margin-left: 5px;
                p {
                    font-size: 14px;
                    color: #FFFFFF;
                    letter-spacing: 0.12px;
                    line-height: 14px;
                    }
                P:last-child {
                    font-size: 12px;
                    margin-top: 10px;
                    }
                }
            }

        .show-more {
            position: fixed;
            width: 59px;
            top: 25px;
            right: 3px;
            z-index: 20;
            font-size: 12px;
            color: #FFFFFF;
            letter-spacing: 0.12px;
            text-align: center;
            line-height: 12px;
            padding-top: 61px;
            background: no-repeat url("~assets/image/video/hongbao.png") left top/59px 51px;
            }

        }

</style>
