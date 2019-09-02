/**
* Created by zhangmei on 2019/5/14
*/
<template>
    <div class="winning-detail">
        <div class="ios-scroll">
            <!--
            开奖依据
            -->
            <div class="lottery-basis br8">
                <div class="more-cell" @click="wakeNative">
                    <div class="left-label">
                        <span>开奖依据1</span>
                    </div>
                    <div class="right-label">
                        <span>
                            开奖依据
                        </span>
                        <span>

                        </span>
                    </div>
                </div>
                <div class="lottery-list">
                    <div>
                        <span>时时彩开奖日期：</span>
                        <span> {{winningDetail.thirdWinningTime|formatTime}}</span>
                    </div>
                    <div class="period-number">
                        <span>时时彩开奖期数：</span>
                        <span> {{winningDetail.thirdWinningNo}}</span>
                    </div>
                    <div>
                        <span>时时彩开奖号码：</span>
                        <span> {{winningDetail.thirdWinningNumber}}</span>
                    </div>
                </div>
            </div>

            <!--
            中奖者
            -->
            <div class="lucky-person br8">
                <div class="more-cell">
                    <div class="left-label">
                        <span>中奖详情</span>
                    </div>
                </div>
                <div class="user-info">
                    <div class="header">
                        <div class="user-avatar">
                            <img class="block img-object-fit-cover" :src="winningDetail.avatar" alt="">
                        </div>
                        <div class="user-name">
                            <p class="name">
                                {{winningDetail.nickname}}
                            </p>
                            <p class="numbering">
                                中奖编号： <span>{{winningDetail.lotteryNumber}}</span>
                            </p>
                            <p class="time">
                                开奖时间： {{winningDetail.factDrawDate|formatTime}}
                            </p>
                        </div>
                    </div>
                    <div class="comment-img">
                        <ul>
                            <li v-for="(item,index) in getSafe(()=>winningDetail.pictures,[])"
                                :key="index">
                                <img class="img-object-fit-cover block" :src="item" alt="">
                            </li>
                        </ul>
                    </div>
                </div>
            </div>

            <!--
            参与详情
            -->
            <div class="join-consumer">
                <div class="more-cell" @click="wakeNative">
                    <div class="left-label">
                        <span>参与详情</span>
                    </div>
                    <div class="right-label">
                        <span>
                            查看全部参与
                        </span>
                        <span>
                        </span>
                    </div>
                </div>
                <div class="consumer-list">
                    <ul>
                        <li v-for="(item,index) in winningList"
                            :key="index">
                            <div class="avatar">
                                <img :src="item.avatar" class="block img-object-fit-cover" alt="">
                            </div>
                            <div class="lottery-info">
                                <div class="header">
                                    <p>
                                        购买注数:
                                        <span>{{item.orderNumber}}</span>
                                    </p>
                                    <p class="consume-time">
                                        购买时间：{{item.createdAt|formatTime}}
                                    </p>
                                </div>
                                <div class="lottery-list">
                                    <p v-for="(number,$index) in item.lotteryNumbers"
                                       :key="$index">
                                        编号：{{number}}
                                    </p>
                                </div>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
        <show-more v-if="client!=='zb'"></show-more>
    </div>
</template>

<script>
    import ShowMore from '../components/ShowMore'
    import {getSafe, wakeNative, callNative} from "@/util/publicMehotds";

    export default {
        name: "",
        componentName: "",
        components: {
            ShowMore
        },
        data() {
            return {
                img: 'https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=3110135022,2684976613&fm=26&gp=0.jpg',
                sequenceId: '', //期id
                winningList: [], //参与列表
                winningDetail: {}, //中奖详情
                getSafe,
                client: ''
            }
        },
        created() {
            this.sequenceId = this.$route.query.id;
            this.client = this.$route.query.client;
            this.getWinningDetail();
            this.getWinningList();
        },
        methods: {
            openZb() {
                const parameter = {
                    id: this.sequenceId,
                    type: 'WinDetailForGoods'
                };
                callNative('jsOpenXKSquare', JSON.stringify(parameter))
            },

            getWinningList() {
                const parameter = {
                    limit: 1000,
                    page: 1,
                    sequenceId: this.sequenceId
                };
                this.$vux.loading.show();
                this.$http.get(this.$api.jSequenceJoinQPageShare, parameter, true)
                    .then(res => {
                        this.winningList = res.data;
                    })
                    .catch(err => {
                        this.$vux.toast.text(err.message);
                    })
                    .finally(() => {
                        this.$vux.loading.hide();
                    })
            },

            getWinningDetail() {
                const parameter = {
                    sequenceId: this.sequenceId
                };
                this.$http.get(this.$api.detailJLotteryShare, parameter, true)
                    .then(res => {
                        this.winningDetail = res;
                    })
                    .catch(err => {
                        this.$vux.toast.text(err.message);
                    })
            },
            wakeNative() {
                if (this.client == 'zb') {
                    this.openZb();
                } else {
                    wakeNative.call(this, 'gc');
                }
            }
        },
        computed: {},

    }
</script>

<style scoped lang="scss" type="text/scss">
    .winning-detail {
        height: 100%;
        padding: 10px 10px 50px;
        .winning-detail {padding-bottom: 20px}
        .br8 {
            border-radius: 8px;
            }
        .more-cell {
            height: 44px;
            padding: 0 15px 0 24px;
            display: flex;
            position: relative;
            align-items: center;
            justify-content: space-between;
            font-size: 14px;
            border-bottom: 1px solid #F1F1F1;
            .left-label {
                font-weight: bold;
                }
            &:before {
                position: absolute;
                content: '';
                width: 3px;
                height: 12px;
                background: #4A90FA;
                border-radius: 100%;
                left: 15px;
                top: 16px;
                }
            .right-label {
                display: flex;
                color: #999999;
                align-items: center;
                span:last-child {
                    width: 7px;
                    height: 12px;
                    background: no-repeat url("~assets/image/arrow-right-gray.png") center/100%;
                    margin-left: 5px;
                    }
                }
            }

        /*
        开奖依据
        */
        .lottery-basis {
            background: #FFFFFF;
            .lottery-list {
                padding: 6px 15px;
                > div {
                    height: 30px;
                    display: flex;
                    align-items: center;
                    font-size: 14px;
                    color: #555555;
                    &.period-number {
                        span:last-child {
                            color: #EE6161;
                            }
                        }
                    }
                }
            }
        /*
        中奖人
        */
        .lucky-person {
            background: #FFFFFF;
            margin-top: 10px;
            .more-cell:before {
                position: absolute;
                content: '';
                width: 3px;
                height: 12px;
                background: #EE6161;
                border-radius: 100%;
                left: 15px;
                top: 16px;
                }
            .user-info {
                padding: 15px;
                .header {
                    display: flex;
                    align-items: center;
                    .user-avatar {
                        height: 60px;
                        width: 60px;
                        img {
                            height: 100%;
                            width: 100%;
                            border-radius: 6px;
                            }
                        }
                    .user-name {
                        margin-left: 15px;
                        font-size: 12px;
                        color: #555555;
                        p {
                            line-height: 16px;
                            margin-top: 7px;
                            &:last-child {
                                margin-top: 1px;
                                }
                            &:first-child {
                                margin-top: 4px;
                                }
                            }
                        .name {
                            font-size: 14px;
                            color: #222222;
                            }
                        .numbering {
                            span {
                                color: #EE6161;
                                }
                            }
                        }
                    }
                .comment-img {
                    padding-left: 70px;
                    margin-top: 8px;
                    ul {
                        display: flex;
                        flex-wrap: wrap;
                        li {
                            width: 80px;
                            height: 80px;
                            margin-left: 5px;
                            margin-top: 5px;
                            img {
                                height: 100%;
                                width: 100%;
                                }
                            }
                        }
                    }
                }
            }
        .join-consumer {
            background: #FFFFFF;
            margin-top: 10px;
            .consumer-list {
                ul {
                    padding: 0 15px;
                    li {
                        padding: 15px 0;
                        display: flex;
                        border-bottom: 1px solid #F1F1F1;
                        .avatar {
                            width: 40px;
                            height: 40px;
                            flex-shrink: 0;
                            img {
                                height: 100%;
                                width: 100%;
                                border-radius: 5px;
                                }
                            }
                        .lottery-info {
                            margin-left: 10px;
                            flex-grow: 1;
                            .header {
                                display: flex;
                                height: 16px;
                                font-size: 14px;
                                justify-content: space-between;
                                align-items: center;
                                color: #222222;
                                p:first-child {
                                    span {
                                        color: #EE6161;
                                        }
                                    }
                                .consume-time {
                                    font-size: 10px;
                                    color: #555555;
                                    }
                                }
                            .lottery-list {
                                p {
                                    font-size: 12px;
                                    color: #555555;
                                    line-height: 14px;
                                    margin-top: 4px;
                                    }
                                p:first-child {
                                    margin-top: 10px;
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
</style>
