/**
* Created by zhangmei on 2018/12/17
*/
<template>
    <div class="welfare-goods-show ios-scroll iphonex-top">
        <div class="welfare-goods-show-main">
            <div class="welfare-goods-show-content">

                <!--晒单详情-->
                <div class="show-detail">
                    <div class="user">
                        <div class="user-avatar">
                            <img class="block"
                                 :src="showDetails.avatar" alt="">
                        </div>
                        <div class="user-info">
                            <p class="user-name text-overflow">
                                {{showDetails.nickname}}
                            </p>
                            <p>
                                中奖编号：
                                <span>
                                       {{showDetails.lotteryNumber}}
                                </span>
                            </p>
                            <p>
                                开奖时间： {{showDetails.factDrawDate | formatTime("YYYY-MM-DD HH:mm")}}
                            </p>
                        </div>
                    </div>
                    <div class="show-content">
                        {{showDetails.content}}
                    </div>
                    <ul class="show-imgs">
                        <li v-for="(item,$index) in showDetails.pictures" :key="item"
                            @click="imgClick(showDetails.pictures,$index)">
                            <img class="block"
                                 :src="item" alt="">
                        </li>
                    </ul>
                    <div class="comment-btn">
                        <div @click="comment">
                            评论
                        </div>
                    </div>
                </div>

                <!--购买历史-->
                <div class="buy-record">
                    <ul>
                        <li v-for="item in list.data">
                            <div class="user-avatar">
                                <img :src="item.avatar" alt="">
                            </div>
                            <div class="goods-detail">
                                <div class="buy-quantity">
                                    <p>
                                        购买注数: <span>{{item.orderNumber}}</span>
                                    </p>
                                    <p>
                                        购买时间：{{item.createdAt | formatTime("YYYY-MM-DD HH:mm")}}
                                    </p>
                                </div>
                                <div class="sort-number" v-for="number in item.lotteryNumbers" :key="number">
                                    编号：{{number}}
                                </div>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
        <previewer :list="imgList" ref="previewer"></previewer>
    </div>
</template>

<script>
    import Previewer from "@/components/comment/Preview";

    export default {
        name: "",
        componentName: "",
        components: {
            Previewer
        },
        data() {
            return {
                imgList: [],
                showDetails: {},
                list: [],
                sequenceId: ''
            }
        },
        created() {
            this.sequenceId = this.$route.query.id;
            this.$vux.loading.show();
            this.getShowDetails();
            this.getList();
        },
        methods: {
            comment() {
                return;
            },
            imgClick(imgList, index) {
                let imgs = imgList.map(item => {
                    return {
                        msrc: item,
                        src: item
                    }
                });
                this.imgList = imgs;
                this.$nextTick(() => {
                    this.$refs.previewer.show(index)
                })
            },

            //获取晒单
            getShowDetails() {
                let params = {
                    sequenceId: this.sequenceId
                };
                this.$http.get(this.$api.detailJLotteryShare, params, true)
                    .then((res) => {
                        this.showDetails = res;
                    })
                    .catch(err => {
                        this.$vux.toast.text(err.message, "middle");
                    })
                    .finally(() => {
                        this.$vux.loading.hide();
                    })
            },

            //获取列表
            getList() {
                let params = {
                    "limit": 20,
                    "page": 1,
                    "sequenceId": this.sequenceId
                };
                this.$http.get(this.$api.jSequenceJoinQPageShare, params, true)
                    .then((res) => {
                        this.list = res;
                    })
                    .catch((err) => {
                        this.$vux.toast.text(err.message, "middle");
                    })
                    .finally(() => {
                        this.$vux.loading.hide();
                    })
            }
        },
        computed: {},
    }
</script>

<style scoped lang="scss" type="text/scss">
    $textColor: #EF6262;
    $borderBottom: 1px solid #F1F1F1;
    $Color222: #222222;

    .welfare-goods-show {
        height: 100%;
        padding-bottom: 30px;
        .welfare-goods-show-main {
            background: #F6F6F6;
            padding: 10px 10px 0;
            .welfare-goods-show-content {
                background: #FFFFFF;
                border-radius: 8px;

                /*晒单详情*/
                .show-detail {
                    padding: 15px;
                    border-bottom: $borderBottom;
                    .user {
                        display: flex;
                        .user-avatar {
                            height: 60px;
                            width: 60px;
                            flex-shrink: 0;
                            img {
                                height: 100%;
                                width: 100%;
                                border-radius: 6px;
                                }
                            }
                        .user-info {
                            padding-left: 10px;
                            min-width: 0;
                            p {
                                color: $Color222;
                                line-height: 14px;
                                margin-top: 5px;
                                }
                            p.user-name {
                                font-size: 14px;
                                }
                            p:nth-of-type(2) {
                                font-size: 12px;
                                margin-top: 10px;
                                span {
                                    color: $textColor;
                                    }
                                }
                            }
                        }
                    .show-content {
                        margin-top: 10px;
                        line-height: 17px;
                        font-size: 12px;
                        color: #555555;
                        }

                    .show-imgs {
                        display: flex;
                        flex-wrap: wrap;
                        margin-left: -5px;
                        margin-top: 2px;
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
                    .comment-btn {
                        display: flex;
                        justify-content: flex-end;
                        margin-top: 10px;
                        & > div {
                            padding-left: 17px;
                            background: no-repeat url("~assets/image/comment.png") 0 0 /12px 12px;
                            font-size: 12px;
                            color: #777777;
                            line-height: 12px;
                            }
                        }
                    }

                /*购买历史*/
                .buy-record {
                    ul {
                        li {
                            padding: 15px;
                            border-bottom: $borderBottom;
                            display: flex;
                            flex-shrink: 0;
                            &:last-child {
                                border: none;
                                }
                            .user-avatar {
                                height: 40px;
                                width: 40px;
                                img {
                                    height: 100%;
                                    width: 100%;
                                    border-radius: 5px;
                                    }
                                }
                            .goods-detail {
                                margin-left: 10px;
                                padding-top: 3px;
                                flex-grow: 1;
                                .buy-quantity {
                                    display: flex;
                                    justify-content: space-between;
                                    align-items: center;
                                    height: 14px;
                                    p {
                                        font-size: 14px;
                                        color: $Color222;
                                        line-height: 14px;
                                        span {
                                            color: $textColor;
                                            }
                                        }
                                    p:last-child {
                                        font-size: 10px;
                                        line-height: 12px;
                                        align-self: flex-end;
                                        }
                                    }
                                .sort-number {
                                    font-size: 12px;
                                    color: #555555;
                                    line-height: 12px;
                                    margin-top: 5px;
                                    &:first-child {
                                        margin-top: 8px;
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
</style>
