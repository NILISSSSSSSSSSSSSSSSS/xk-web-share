/**
* Created by zhangmei on 2018/12/17
*/
<template>
    <div class="music-share">
        <iframe style="display: none" allow="autoplay" :src="detail.music_info.meats"></iframe>
        <div class="ios-scroll">
            <div class="mp3">
                <div class="music-cover">
                    <img class="block" :src="detail.music_info.pic" alt="">
                </div>
                <div class="music-info">
                    <p class="music-name">
                        {{detail.music_info.title}}
                    </p>
                    <p>
                        {{detail.music_info.singer_name}}
                    </p>
                    <p>
                        {{detail.music_info.use_num}}人参与
                    </p>
                </div>
            </div>
            <div class="music-list">
                <ul>
                    <li v-for="(item,$index) in detail.video_list" :key="$index">
                        <img class="block" :src="item"
                             alt="">
                        <p>
                            NO.
                            <span>{{$index+1}}</span>
                        </p>
                    </li>
                </ul>
            </div>
        </div>
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
    import {downloadZb, wakeNative} from "@/util/publicMehotds"

    export default {
        name: "",
        componentName: "",
        components: {},
        data() {
            return {
                detail: {
                    music_info: {},
                    video_list: []
                }
            }
        },
        created() {
            this.getMusic();
        },
        methods: {
            getMusic() {
                this.$vux.loading.show();
                let id = this.$route.query.id;
                axios.get(`${this.$api.liveMusic}?music_id=${id}`)
                    .then((res) => {
                        if (res.data.code === 200) {
                            this.detail = res.data.body;
                        }
                    })
                    .catch((err) => {
                        this.$vux.toast.text(err.message, 'middle');
                    })
                    .finally(() => {
                        this.$vux.loading.hide();
                    })
            },
            download() {
                // downloadZb.call(this);
                wakeNative.call(this, 'zb');
            }
        },
        computed: {},
    }
</script>

<style scoped lang="scss" type="text/scss">
    .music-share {
        padding-top: 15px;
        padding-bottom: 50px;
        height: 100%;
        background: fixed no-repeat url("~assets/image/video/music-bg.png") 0 0 / 100% 100%;
        .mp3 {
            display: flex;
            padding: 0 20px;
            .music-cover {
                width: 120px;
                height: 120px;
                flex-shrink: 0;
                img {
                    height: 100%;
                    width: 100%;
                    border-radius: 5px;
                    }
                }
            .music-info {
                margin-left: 20px;
                p {
                    font-size: 12px;
                    color: #FFFFFF;
                    line-height: 12px;
                    margin-top: 10px;
                    }
                p:first-child {
                    font-size: 16px;
                    color: #FFFFFF;
                    line-height: 16px;
                    }
                }
            }
        .music-list {
            margin-top: 30px;
            ul {
                display: flex;
                flex-wrap: wrap;
                li {
                    position: relative;
                    width: 123px;
                    height: 160px;
                    margin: 1px;
                    img {
                        width: 100%;
                        height: 100%;
                        border-radius: 5px;
                        }
                    p {
                        position: absolute;
                        left: 6px;
                        bottom: 6px;
                        font-size: 12px;
                        color: #FFFFFF;
                        letter-spacing: 0.1px;
                        line-height: 12px;
                        text-shadow: 1px 1px 1px rgba(0, 0, 0, 0.10);
                        span {
                            font-size: 17px;
                            }
                        }
                    }
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

        }
</style>
