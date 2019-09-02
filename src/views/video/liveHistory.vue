/**
* Created by zhangmei on 2019/4/23
*/
<template>
    <div class="live-history">
        <video v-if="detail.play" ref="video" class="video"
               controls="false"
               playsinline='true'
               webkit-playsinline='true'
               x5-video-player-fullscreen="true"
               x5-video-player-type="h5"
               :poster="detail.poster"
               :src="detail.play">
        </video>
        <div v-show="showStartBtn" class="start-play" @click="startPlay">
        </div>
        <div class="video-control">
            <div class="pause-play" @click="startPlay" :class="{'play':isPlay}">
            </div>
            <div class='current-time'>
                {{formatCurrentTime}}
            </div>
            <div class="progress">
                <div class="all-time" ref="allTime">
                </div>
                <div class="played-time" :style="{'width':playedWidth}" ref="playedTime">
                </div>
                <div class="point" :style="{'left':styleLeft}" ref="point">
                </div>
            </div>
            <div class="total-time">
                {{formatEndTime}}
            </div>
        </div>
        <!--提示下载app-->
        <div class="download-tips">
            <div class="live-logo">
            </div>
            <div class="xk-short-video">
            </div>
            <div class="download" @click="download">
                打开看看
            </div>
        </div>
    </div>
</template>

<script>
    import {formatDuration,wakeNative} from "../../util/publicMehotds"
    import {downloadZb} from "../../util/publicMehotds";

    export default {
        name: "",
        componentName: "",
        components: {},
        data() {
            return {
                showStartBtn: true,
                startX: 0,
                currentX: 0,
                movedDistance: 0,
                startPosition: 0,
                endPosition: 0,
                result: 0,
                isPlay: false,
                duration: 0,
                playedWidth: 0,
                styleLeft: 0,
                currentTime: 0,
                endTime: 0,
                poster: '',
                detail: {
                    play: '',
                    poster: ''
                }
            }
        },
        created() {
        },
        mounted() {
            this.getLiveHistory();
            this.bindTouchEvent();
        },
        methods: {
            download() {
                   wakeNative.call(this, 'zb');
                /* downloadZb.call(this);*/
            },

            /**
             * 获取历史直播
             * */
            getLiveHistory() {
                const parameter = {
                    log_id: this.$route.query.id
                };
                axios.post(this.$api.playback_share, parameter)
                    .then(res => {
                        if (res.data.code === 200) {
                            this.detail.play = res.data.body.play;
                            this.detail.poster = res.data.body.avatar;
                            this.poster = this.detail.avatar;
                            this.$nextTick(() => {
                                this.endTime = Math.ceil(this.$refs.video.duration || 0);
                                this.handleVideoPlay();
                            })
                        } else {
                            this.$vux.toast.text(res.data.message);
                        }
                    })
                    .catch(err => {
                        this.$vux.toast.text(err.message, "middle")
                    })
                    .finally(() => {
                    })
            },

            startPlay() {
                if (!this.detail.play) {
                    return this.$vux.toast.text('未获取到视频源!')
                }
                if (this.isPlay) {
                    this.$refs.video.pause();
                    this.isPlay = false;
                } else {
                    this.$refs.video.currentTime = this.currentTime;
                    this.$refs.video.play();
                    this.isPlay = true;
                    this.showStartBtn = false;
                }
            },
            bindTouchEvent() {
                this.$refs.point.addEventListener('touchstart', this.handleTouchStart);
                this.$refs.point.addEventListener('touchmove', this.handleTouchMove);
                this.$refs.point.addEventListener('touchend', this.handleTouchEnd);
            },
            handleTouchStart(event) {
                this.endPosition = Math.ceil(this.$refs.allTime.getBoundingClientRect().right);
                this.startPosition = Math.ceil(this.$refs.allTime.getBoundingClientRect().left);
                this.startX = event.touches[0].clientX;
                this.startPlay();
            },
            handleTouchMove(event) {
                this.currentX = event.touches[0].clientX;
                if (this.currentX > this.endPosition) {
                    this.result = this.endPosition - this.startPosition - 15;
                } else if (this.currentX < this.startPosition) {
                    this.result = 0;
                } else {
                    this.result = Math.ceil(this.currentX - this.startPosition);
                }
                this.playedWidth = this.styleLeft = Math.floor((this.result / (this.endPosition - this.startPosition)) * 100) + '%';
                let proportion = this.result / (this.endPosition - this.startPosition);
                this.currentTime = Math.ceil(proportion * this.endTime);
            },
            handleTouchEnd() {
                this.startPlay();
            },
            handleVideoPlay() {
                const _this = this;
                this.$refs.video.addEventListener('timeupdate', function () {
                    _this.currentTime = Math.ceil(this.currentTime);
                    _this.endTime = Math.ceil(this.duration);
                    _this.playedWidth = _this.styleLeft = Math.floor((_this.currentTime / _this.endTime) * 100) + '%';
                });

                this.$refs.video.addEventListener('ended', function () {
                    _this.isPlay = false;
                    _this.showStartBtn = true;
                })
            }
        },
        computed: {
            formatCurrentTime() {
                return formatDuration(this.currentTime);
            },
            formatEndTime() {
                return formatDuration(this.endTime);
            }
        },
    }
</script>

<style scoped lang="scss" type="text/scss">
    video::-webkit-media-controls {
        display: none !important;
        }

    .live-history {
        height: 100%;
        width: 100%;
        background: #000000;
        position: relative;
        .start-play {
            position: absolute;
            top: 50%;
            left: 50%;
            height: 52px;
            width: 52px;
            transform: translate3d(-50%, -50%, 0);
            background: no-repeat url("~assets/image/video/staryplay.png") center / 100% 100%;
            }

        /*
        自定义控制栏
        */
        .video-control {
            position: absolute;
            width: 100%;
            bottom: 76px;
            padding-left: 24px;
            padding-right: 15px;
            left: 0;
            display: flex;
            justify-content: center;
            align-items: center;
            .pause-play {
                width: 12px;
                height: 16px;
                background: no-repeat url("~assets/image/video/play.png") center / 100% 100%;
                flex-shrink: 0;
                &.play {
                    background: no-repeat url("~assets/image/video/pause.png") center / 100% 100%;
                    }
                }
            .current-time, .total-time {
                font-size: 12px;
                color: #FFFFFF;
                flex-shrink: 0;
                }
            .total-time {
                margin-left: 20px;
                }
            .current-time {
                margin-left: 18px;
                margin-right: 10px;
                }
            .progress {
                flex-grow: 1;
                height: 2px;
                position: relative;
                .all-time {
                    border-radius: 2px;
                    height: 100%;
                    width: 100%;
                    background: #000000;
                    opacity: .3;
                    }
                .played-time {
                    background: #FFFFFF;
                    position: absolute;
                    left: 0;
                    top: 0;
                    height: 2px;
                    border-radius: 2px;
                    }
                .point {
                    height: 15px;
                    width: 15px;
                    border-radius: 50%;
                    background: #FFFFFF;
                    position: absolute;
                    top: -7px;
                    left: 0;
                    }
                }
            }
        .video {
            height: 100%;
            width: 100%;
            object-fit: contain;
            background: #000000;
            }
        }

    .download-tips {
        display: flex;
        height: 50px;
        width: 100%;
        position: fixed;
        align-items: center;
        bottom: 0;
        left: 0;
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
</style>
