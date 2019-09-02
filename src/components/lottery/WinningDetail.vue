/**
* Created by zhangmei on 2019/6/17
*/
<template>
    <div class="winning-detail">
        <navigation-label :show-more="false" @cell-click="cellClick">
                    <span slot="left">
                        中奖详情
                    </span>
        </navigation-label>
        <div class="winner-user">
            <div class="user">
                <div class="avatar">
                    <img :src="winningUserInfo.avatar"
                         alt="">
                </div>
                <div class="info">
                    <p class="user-name text-overflow">{{winningUserInfo.nickName}}</p>
                    <p class="winning-number text-overflow">
                        中奖号码：
                        <span>
                                    {{winningUserInfo.orderNumber}}
                                </span>
                    </p>
                    <p class="winning-time text-overflow">
                        中奖时间：{{winningUserInfo.winningTime|formatTime}}
                    </p>
                    <div class="winning-prize text-overflow">
                        {{winningUserInfo.prizeName}}
                    </div>
                </div>
            </div>
            <div class="show-lottery">
                <p class="content">
                    {{winningUserInfo.content}}
                </p>
                <div class="show-img-list">
                    <ul>
                        <li class="video" v-if="getSafe(()=>video.videoUrl,'')">
                            <img :src="video.videoMainUrl"
                                 class="img-object-fit-cover block" alt="">
                        </li>
                        <li v-for="(item,index) in pictures"
                            :key="index">
                            <img :src="item"
                                 class="img-object-fit-cover block" alt="">
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    </div>

</template>

<script>
    import NavigationLabel from '@/components/lottery/NavigationLabel'
    import {getSafe} from "@/util/publicMehotds";

    export default {
        name: "WinningDetail",
        componentName: "WinningDetail",
        components: {
            NavigationLabel
        },
        props: {
            pictures: {
                type: Array,
                pictures: {
                    type: Array,
                    default: function () {
                        return [];
                    },
                },
            },
            prizeName: '',
            winningUserInfo: {
                type: Object,
                default: function () {
                    return {
                        nickName: '',
                        avatar: '',
                        orderNumber: '',
                        winningTime: '',
                        content: ''
                    }
                }
            },
            video: {
                type: Object,
                default: function () {
                    return {
                        videoUrl: '',
                        videoMainUrl: ''
                    }
                }
            },
        },
        data() {
            return {
                getSafe
            }
        },
        created() {
        },
        methods: {
            cellClick() {
                this.$emit("cell-click")
            }
        },
        computed: {},

    }
</script>

<style scoped lang="scss" type="text/scss">
    /*
    中奖详情
    */
    .winning-detail {
        background: #FFFFFF;
        margin-top: 10px;
        padding-bottom: 30px;
        /deep/ .navigation-label {
            padding: 0 15px 0 10px;
            border-bottom: 1px solid #F1F1F1;
            }
        .winner-user {
            margin-top: 15px;
            padding-left: 10px;
            .user {
                display: flex;
                .avatar {
                    height: 50px;
                    width: 50px;
                    flex-shrink: 0;
                    img {
                        height: 100%;
                        width: 100%;
                        border-radius: 4px;
                        }
                    }
                .info {
                    position: relative;
                    margin-left: 10px;
                    flex-grow: 1;
                    min-width: 0;
                    p {
                        font-size: 12px;
                        line-height: 16px;
                        color: #777777;
                        span {
                            color: #EE6161;
                            }
                        }
                    .user-name {
                        font-size: 14px;
                        color: #222222;
                        }
                    .winning-number {
                        margin-top: 3px;
                        }
                    .winning-prize {
                        position: absolute;
                        color: #FFFFFF;
                        font-size: 13px;
                        padding: 0 9px;
                        line-height: 28px;
                        right: 0;
                        bottom: 14px;
                        width: 132px;
                        border-radius: 14px 0 0 14px;
                        background: linear-gradient(90deg, #FF9B32, #FEBE2C);
                        }
                    }
                }
            .show-lottery {
                margin-top: 10px;
                padding-left: 60px;
                padding-right: 10px;
                .content {
                    font-size: 14px;
                    color: #222222;
                    line-height: 16px;
                    word-wrap: break-word
                    }
                }
            .show-img-list {
                ul {
                    display: flex;
                    flex-wrap: wrap;
                    margin-left: -5px;
                    li {
                        height: 88px;
                        width: 88px;
                        margin-left: 5px;
                        margin-top: 5px;
                        img {
                            border-radius: 5px;
                            height: 100%;
                            width: 100%;
                            }
                        }
                    .video {
                        position: relative;
                        &::after {
                            content: '';
                            width: 24px;
                            height: 24px;
                            position: absolute;
                            left: 50%;
                            top: 50%;
                            z-index: 1;
                            transform: translate3d(-50%, -50%, 0);
                            background: no-repeat url("~assets/image/viedo-play-btn.png") center/100%;
                            }
                        }
                    }
                }
            }
        }
</style>
