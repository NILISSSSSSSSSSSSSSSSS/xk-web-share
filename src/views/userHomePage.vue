<template>
    <div class="user-home-page">
        <div class="bg" :style="styleObj">
        </div>
        <div class="user-detail">
            <!--头像-->
            <div class="avatar">
                <img :src="userInfo.avatar"
                     alt="用户头像">
            </div>
            <div class="user-location">
                <div class="age">
                    {{userInfo.age}} {{userInfo.constellation}}
                </div>
                <div></div>
                <div class="location">
                    {{userInfo.province}}
                    {{userInfo.city}}
                </div>
            </div>

            <!--用户信息-->
            <div class="user-info">
                <p class="user-name">
                    <span>{{userInfo.nickname}}</span>
                    <span class="male-icon"></span>
                </p>
                <p class="user-id">用户ID：{{userInfo.uid}}</p>
                <p class="user-words">{{userInfo.signature}}</p>
            </div>
            <div class="user-follow">
                <div>
                    <span>粉丝</span>
                    <span>{{userInfo.fansNum}}</span>
                </div>
                <div>
                    <span>关注</span>
                    <span>{{userInfo.followNum}}</span>
                </div>
            </div>
        </div>
        <div class="user-home-page-container">

            <!--可友圈-->
            <div class="keyou-circle">
                <div class="circle-nav">
                    <div>
                        <span></span>
                        <span>短视频</span>
                    </div>
                    <div class="active">
                        <span></span>
                        <span>可有圈</span>
                    </div>
                </div>

                <!--可友圈列表-->
                <div class="circle-list">
                    <ul>
                        <li class="circle-item" v-for="(item,$index) in friendCircle" :key="$index">
                            <!--发布日期-->
                            <div class="release-date">
                                <span class="date">{{item.createdAt | formatTime("DD")}}</span>
                                <span class="month">{{item.createdAt | formatTime("MM")}}月</span>
                            </div>
                            <!--发布内容-->
                            <div class="circle-content">
                                <p class="content">
                                    {{item.content}}
                                </p>
                                <ul class="img-list">
                                    <li v-for="(img,$imgIndex) in item.pictureContents" :key="$imgIndex">
                                        <img :src="img.url" alt="">
                                    </li>
                                </ul>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>

            <!--查看更多-->
            <div class="show-more">
                <span>点击查看更多</span>
                <span></span>
            </div>
        </div>

        <!--提示下载app-->
        <div class="download-tips" v-if="client==='zb'">
            <div class="live-logo">
            </div>
            <div class="xk-short-video">
            </div>
            <div class="download" @click="downloadApp">
                打开看看
            </div>
        </div>
        <show-more v-else>
        </show-more>
    </div>
</template>


<script>
    // import Moment from 'moment'
    import ShowMore from "@/components/ShowMore";
    import {wakeNative, queryParam} from "@/util/publicMehotds";

    // window.moment = Moment;
    export default {
        components: {ShowMore},
        data() {
            return {
                userInfo: {
                    avatar: ''
                },
                pagination: {
                    page: 1,
                    limit: 10
                },
                friendCircle: [],
                userId: '',//要查看的用户id
                client: 'xk',
            }
        },
        created() {
            this.userId = this.$route.query.userId;
            this.client = this.$route.query.client;
            this.getUserInfo();
            this.getFriendCircle();
        },
        methods: {
            downloadPage() {
                return;
                let path = 'downloadXkSquare';
                if (this.client === 'sh') {
                    path = 'downloadMerchantAPP'
                }
                if (this.client === 'zb') {
                    path = 'downloadVideoAPP';
                }
                this.$router.push({
                    path: '/' + path
                })
            },
            downloadApp() {
                let client = this.client === 'xk' ? 'gc' : 'zb';
                wakeNative.call(this, client);
            },
            getUserInfo() {
                const parameter = {
                    userId: this.userId,
                };
                this.$vux.loading.show();
                this.$http.get(this.$api.xkUserHomePageShare, parameter, true)
                    .then((res) => {
                        this.userInfo = res
                    })
                    .catch((err) => {
                        console.log(err)
                    })
                    .finally(() => {
                        this.$vux.loading.hide();
                    })
            },

            getFriendCircle() {
                let parameter = {
                    userId: this.userId,
                    page: 1,
                    limit: 20
                };
                this.$http.get(this.$api.friendCircleUserAlbumShare, parameter, true)
                    .then((res) => {
                        if (res && res.list) {
                            this.friendCircle = res.list.map((item) => {
                                if (item.detailType === "picture") {
                                    return item
                                }
                            });
                        } else {
                            this.friendCircle = [];
                        }
                    })
            }
        },
        computed: {
            styleObj() {
                return {
                    background: 'no-repeat url(' + this.userInfo.avatar + ') 0 0 / 100% 100%'
                }
            }
        }
    }
</script>
<style scoped lang="scss" type="text/scss">
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

    .user-home-page {
        position: relative;
        .bg {
            > img {
                width: 100%;
                height: 100%;
                display: block;
                }
            height: 235px;
            position: relative;
            &::after {
                content: "";
                width: 100%;
                height: 100%;
                position: absolute;
                left: 0;
                top: 0;
                background: inherit;
                filter: blur(2px);
                }
            }
        .user-detail {
            position: absolute;
            left: 10px;
            top: 105px;
            width: 355px;
            height: 193px;
            border-radius: 6px;
            background: #FFFFFF;
            box-shadow: rgba(215, 215, 215, 0.5) 0px 0px 4.0000124999999995px 0px;
            .avatar {
                width: 81px;
                height: 81px;
                position: absolute;
                top: -32px;
                left: 137px;
                img {
                    display: block;
                    height: 100%;
                    width: 100%;
                    border-radius: 50%;
                    box-shadow: 0px 0px 4.0000124999999995px 0px;
                    }
                }
            .user-location {
                display: flex;
                padding-top: 10px;
                & > div {
                    text-align: center;
                    ont-size: 12px;
                    color: #222222;
                    flex: 1;
                    }
                & > div:nth-of-type(2) {
                    width: 80px;
                    flex: none;
                    }
                }
            .user-info {
                display: flex;
                flex-direction: column;
                align-items: center;
                justify-content: space-between;
                padding: 30px 0 20px;
                p.user-name {
                    font-size: 17px;
                    color: #222222;
                    text-align: center;
                    line-height: 24px;
                    display: flex;
                    align-items: center;
                    .male-icon {
                        width: 16px;
                        height: 16px;
                        margin-left: 5px;
                        background: url("../assets/image/userHomePage/male-icon.png") no-repeat 0 0 / 100%;
                        }
                    }
                p.user-id {
                    line-height: 17px;
                    font-size: 12px;
                    color: #777777;
                    text-align: center;
                    }
                p.user-words {
                    font-size: 12px;
                    color: #555555;
                    text-align: center;
                    line-height: 17px;
                    }
                }
            .user-follow {
                height: 56px;
                display: flex;
                border-top: 1px solid #F1F1F1;
                position: relative;
                & > div {
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    padding-top: 11px;
                    width: 50%;
                    span {
                        display: block;
                        line-height: 17px;
                        text-align: center;
                        }
                    span:nth-child(1) {
                        font-size: 12px;
                        color: #999999;
                        text-align: center;
                        }
                    span:nth-child(2) {
                        font-size: 12px;
                        color: #222222;
                        text-align: center;
                        }
                    }
                &::after {
                    content: "";
                    position: absolute;
                    height: 17px;
                    width: 1px;
                    background: #D3D3D3;
                    left: 50%;
                    top: 20px;
                    }
                }
            }

        .user-home-page-container {
            padding: 72px 10px 0;
            background: rgb(246, 246, 246);
            /*用户信息*/

            /*可友圈*/
            .keyou-circle {
                background: #FFFFFF;
                box-shadow: 0 0 4px 0 rgba(215, 215, 215, 0.50);
                border-radius: 6px;
                //可友圈导航
                .circle-nav {
                    height: 62px;
                    display: flex;
                    align-items: center;
                    & > div.active {
                        color: #4A90FA;
                        position: relative;
                        &::after {
                            content: "";
                            height: 3px;
                            position: absolute;
                            background: #4A90FA;
                            width: 60px;
                            left: 50%;
                            bottom: -1px;
                            transform: translateX(-50%);
                            border-top-right-radius: 3px;
                            border-top-left-radius: 3px;
                            }
                        }
                    & > div {
                        width: 50%;
                        height: 100%;
                        display: flex;
                        justify-content: center;
                        align-items: center;
                        span {
                            display: block;
                            }
                        span:nth-child(1) {
                            margin-right: 5px;
                            width: 15px;
                            height: 15px;
                            background: url("../assets/image/userHomePage/video-icon.png") no-repeat 0 0 / 100%;
                            }
                        }
                    & > div:nth-child(2) span:nth-child(1) {
                        background-image: url("../assets/image/userHomePage/keyou-logo.png");
                        }
                    }

                /*可友圈列表*/
                .circle-list {
                    li.circle-item {
                        padding: 20px 0 15px 0;
                        display: flex;
                        border-top: 1px solid #F1F1F1;
                        .release-date {
                            width: 72px;
                            text-align: right;
                            padding-right: 5px;
                            .date {
                                font-size: 26px;
                                color: #222222;
                                font-weight: 600;
                                }
                            .month {
                                font-size: 10px;
                                color: #222222;
                                }
                            }
                        .circle-content {
                            flex: 1;
                            .content {
                                font-size: 12px;
                                color: #777777;
                                line-height: 12px;
                                text-align: left;
                                }
                            ul.img-list {
                                display: flex;
                                flex-wrap: wrap;
                                margin-left: -5px;
                                li {
                                    width: 80px;
                                    height: 80px;
                                    margin-left: 5px;
                                    margin-top: 10px;
                                    img {
                                        height: 100%;
                                        width: 100%;
                                        display: block;
                                        }
                                    }
                                }
                            }
                        }
                    }

                }
            /*查看更多*/
            .show-more {
                font-size: 12px;
                color: #999999;
                padding: 15px 0;
                display: flex;
                justify-content: center;
                align-items: center;
                span:nth-child(2) {
                    display: inline-block;
                    height: 12px;
                    width: 7px;
                    background: url("../assets/image/userHomePage/show-more.png") no-repeat 0 0 / 100%;
                    margin-left: 5px;
                    }
                }
            }
        }
</style>
