<template>
    <div class="live-video">

        <div class="video-mask" v-if="getDetail" @click.self="maskClick">
            <img v-show="showPoster" class="block" :src="detail.video_list.video.first_cover" alt="">
            <transition name="fade">
                <i v-show="showMask" class="video-player-btn icon-play3" :class="[isPlay?'icon-pause2':'icon-play3']"
                   @click="videoAction"></i>
            </transition>
        </div>
        <template v-if="getDetail">
            <!--
                        <video style="object-fit: contain"
                               loop @loadedmetadata="handleLoadedmetadata($event)"
                               :style="{height:finalHeight}"
                               webkit-playsinline='true'
                               x-webkit-airplay="allow"
                               x5-player="true"
                               x5-playsinline=”true”
                               width="120%"
                               height="120%"
                               playsinline='true'
                               :src="detail.video_list.video.wmImg_video"
                               ref="video">
                        </video>
            -->
            <video loop
                   webkit-playsinline='true'
                   x-webkit-airplay="allow"
                   x5-video-player-fullscreen="true"
                   x5-player="true"
                   x5-playsinline=”true”
                   x5-video-player-type="h5"
                   playsinline='true'
                   :src="detail.video_list.video.wmImg_video"
                   ref="video">
            </video>
        </template>
        <show-more v-if="platform==='ua'">
        </show-more>
        <!--提示下载app-->
        <template v-else>
            <div class="download-tips flex-box" v-if="showTips">
                <div class="broadcast-name flex-box">
                    <img :src="detail.video_list.user.user_img" alt="">
                    <div>
                        <p>{{detail.video_list.user.user_name}}</p>
                        <p>晓可号：{{detail.video_list.user.uid}}</p>
                    </div>
                </div>
                <div class="download flex-box">
                    <span class="open-btn" @click="download">
                        打开看看
                    </span>
                    <span class="close" @click="showTips=false">
                    </span>
                </div>
            </div>
        </template>

        <!--右侧点击栏-->
        <!--
                <div class="action-bar">
                    &lt;!&ndash;头像&ndash;&gt;
                    <div class="avatar action-item">
                        <img :src="detail.video_list.user.user_img" alt="">
                        <span class="click-to-follow"></span>
                    </div>
                    &lt;!&ndash;我在直播&ndash;&gt;
                    <div v-if="detail.video_list.user.is_live" class="action-item my-being-live">
                    </div>
                    &lt;!&ndash;小心心&ndash;&gt;
                    <div class="like">
                         <span class="like-peoples">
                            {{detail.video_list.video.praise_num}}
                        </span>
                    </div>
                    &lt;!&ndash;评论&ndash;&gt;
                    <div class="comment">
                        <span class="comment-peoples">
                          {{detail.video_list.video.com_num}}
                        </span>
                    </div>
                    &lt;!&ndash;转发&ndash;&gt;
                    <div class="forward">
                         <span>
                          {{detail.video_list.video.share_num}}
                        </span>
                    </div>

                    &lt;!&ndash;礼物&ndash;&gt;
                    <div class="gift">
                    </div>
                    &lt;!&ndash;音乐旋转&ndash;&gt;
                    <div class="music-rotate">
                        <img :src="detail.video_list.user.user_img" alt="">
                        <span>
                             <img src="~assets/image/video/backgroud-music.png" alt="">
                         </span>
                        <span>
                             <img src="~assets/image/video/backgroud-music.png" alt="">
                        </span>
                        <span>
                            <img src="~assets/image/video/backgroud-music.png" alt="">
                        </span>
                    </div>
                </div>
        -->
        <!--左侧广告栏-->
        <!--
                <div class="video-info">
                    <div class="ad" v-for="(item,$index) in detail.video_list.recom_goods" :key="$index">
                        {{item.goods_name}}
                    </div>
                    <div></div>
                    <div class="location">
                        {{detail.video_list.adds.city}}·{{detail.video_list.adds.add}}
                    </div>

                    <div class="video-description">
                        <p class="author">
                            @{{detail.video_list.user.user_name}}
                        </p>
                        <p class="topic">#{{detail.video_list.topic.topic_name}}#</p>
                        <p class="content">
                            {{detail.video_list.video.describe}}
                        </p>
                        <div class="background-music">
                            <horizontal-scroll ref="horizontalScroll">
                                {{detail.video_list.music.music_name}}
                                {{detail.video_list.music.music_name}}
                                {{detail.video_list.music.music_name}}
                            </horizontal-scroll>
                        </div>
                    </div>
                </div>
        -->
    </div>
</template>
<script>
    import HorizontalScroll from "@/components/common/HorizontalScroll"
    import ShowMore from "@/components/ShowMore"
    import {wakeNative} from '../../util/publicMehotds'

    export default {
        components: {
            HorizontalScroll,
            ShowMore
        },
        data() {
            return {
                videoSrc: '',
                isPlay: false,
                showMask: false,
                showDownload: false,
                detail: {
                    video_list: {
                        music: {},
                        topic: {},
                        user: {},
                        adds: {},
                        video: {}
                    }
                },
                getDetail: false,
                platform: 'ua',
                videoWidth: 0,
                videoHeight: 0,
                videoProportion: 0,
                clientWidth: 0,
                clientHeight: 0,
                finalHeight: '100%',
                isCover: false,
                showPoster: true,
                showTips: true
            }
        },
        created() {

            this.platform = this.$route.query.platform;
            if (this.platform === 'ua') {
                document.title = '晓可广场';
            }
            let params = {
                video_id: this.$route.query.id
            };
            this.$vux.loading.show();
            axios.get(`${this.$api.liveVideo}?video_id=${params.video_id}`, params)
                .then(res => {
                    if (res.data.code === 200) {
                        this.detail = res.data.body;
                        this.showMask = true;
                        this.getDetail = true;
                        /*
                                                this.$nextTick(() => {
                                                    this.$refs.horizontalScroll.initScroll();
                                                })
                        */
                    }
                })
                .catch(err => {
                    this.$vux.toast.text(err.message);
                })
                .finally(() => {
                    this.$vux.loading.hide();
                })
        },
        mounted() {
            window.onresize = function () {
                this.$el.style.width = window.innerWidth + "px";
                this.$el.style.height = window.innerHeight + "px";
            }
        },
        methods: {
            handleLoadedmetadata(event) {
                let videoTarget = event.target;
                this.clientHeight = window.innerHeight;
                this.clientWidth = window.innerWidth;
                this.videoHeight = videoTarget.videoHeight;
                this.videoWidth = videoTarget.videoWidth;
                if (!this.videoWidth || !this.videoHeight) {  //没有获取到原视频高度
                    return;
                }
                this.videoProportion = this.videoWidth / this.videoHeight;
                this.finalHeight = this.clientWidth / this.videoProportion + 'px';
                videoTarget.style.height = this.finalHeight;
                if (this.finalHeight > this.clientHeight) {
                    this.isCover = true;
                }
            },
            videoAction() {
                if (this.isPlay) {
                    this.$refs.video.pause();
                } else {
                    this.showPoster = false;
                    this.$refs.video.play();
                }
                this.isPlay = !this.isPlay;
                if (!this.isPlay) {
                    this.showMask = true;
                } else {
                    setTimeout(() => {
                        this.showMask = false;
                    }, 200)
                }
            },

            maskClick() {
                this.showMask = !this.showMask;
            },
            download() {
                /*  downloadZb.call(this);*/
                wakeNative.call(this, 'zb');
            }
        },
        computed: {}
    }
</script>
<style src="./liveVideo.scss" lang="scss" type="text/scss" scoped></style>
<style scoped lang="scss" type="text/scss">

    .fade-enter-active, .fade-leave-active {
        transition: opacity .5s;
        }

    .fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */
    {
        opacity: 0;
        }
</style>
