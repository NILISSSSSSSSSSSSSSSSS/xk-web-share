<template>
    <div class="video-main">
        <video v-show="!showMask"
               controls
               webkit-playsinline='true'
               playsinline='true'
               class="video-model img-object-fit-cover" id="video" :src="videoSrc"></video>
        <div class="video-mask" v-show="showMask">
            <img class="video-cover img-object-fit-cover" :src="cover" alt="">
            <div @click="playVideo" class="video-play-time">
                <i class="icon-play play-btn"></i>
                <!-- <span>{{allTime}}</span>-->
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        props: {
            videoSrc: {
                type: String,
                default: ""
            }
        },
        data() {
            return {
                video: null,
                showMask: true,
                allTime: "00:00",
                currentTime: "00:00",
                duration: 0,
                videoHeight: 0,
                videoWidth: 0,
                cover: '',
            }
        },
        mounted() {
            this.video = document.getElementById("video");
            this.video.onloadedmetadata = () => {
                this.videoHeight = this.video.videoHeight;
                this.videoWidth = this.video.videoWidth;
                let videoSrc = this.videoSrc;
                this.cover = videoSrc.split('?')[0] + `?vframe/jpg/offset/1/w/${this.videoWidth}`;
                this.duration = this.video.duration;
                this.allTime = this.timeStamp(this.video.duration);
            };
            this.video.ontimeupdate = () => {
                this.currentDate = this.video.currentTime;
                if (this.currentDate == this.duration) {
                    this.video.pause();
                    this.showMask = true;
                }
                this.percent = 100 * (this.currentDate / this.duration);
                this.currentTime = this.timeStamp(this.currentDate);

            };
        },
        methods: {
            //分割时间函数
            timeStamp(second_time) {
                let time1 = ((parseInt(second_time) / 100)).toString();
                let time2 = time1.split(".")[1] ? (time1.split(".")[1].length == 1 ? time1.split(".")[1] + '0' : time1.split(".")[1]) : '00';
                let time = "00" + ':' + time2;
                if (parseInt(second_time) > 60) {
                    let second = ((parseInt(second_time) % 60) / 100).toString();
                    let min = (parseInt(second_time / 60) / 100).toString();
                    let time3 = second.split(".")[1] ? (second.split(".")[1].length == 1 ? second.split(".")[1] + '0' : second.split(".")[1]) : '00';
                    let time4 = min.split(".")[1] ? (min.split(".")[1].length == 1 ? min.split(".")[1] + '0' : min.split(".")[1]) : '00';
                    time = time4 + ":" + time3;
                }
                return time;
            },
            playVideo() {
                this.video.play();
                this.showMask = false;
            }
        }
    }
</script>

<style scoped>
    .video-main {
        position: relative;
        height: 100%;
        display: flex;
        align-items: center;
        }

    .video-model {
        width: 100%;
        background: #000000;
        }

    .video-mask {
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        z-index: 1;
        }

    .play-btn {
        /* position: absolute;*/
        font-size: 40px;
        /* top: 50%;
         transform: translateY(-50%) translateX(50%);
         left: -16px;*/
        }

    .video-play-time {
        display: flex;
        align-items: center;justify-content: center;
        position: absolute;
        z-index: 100;
        left: 50%;
        top: 50%;
        transform: translateX(-50%) translateY(-50%);
        min-width: 80px;
        height: 28px;
        /*
                background-color: rgba(0, 0, 0, .3);
        */
        color: #FFFFFF;
        text-align: right;
        line-height: 28px;
        font-size: 15px;
        }
</style>
