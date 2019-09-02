/**
* Created by zhangmei on 2019/1/10
*/
<template>
    <div class="game ios-scroll">
        <div class="game-header">
            <div class="game-title">
                <div class="game-pic">
                    <img class="block img-object-fit-cover"
                         :src="gameDetail.smallPic"
                         alt="">
                </div>
                <div class="game-name">
                    <strong>{{gameDetail.name}}</strong>
                    <p>
                        人气指数:
                        <score :score="gameDetail.popularity"></score>
                    </p>
                    <div class="comment-btn">
                        评价
                    </div>
                </div>
            </div>
            <div class="safe-code">
                <p>安全码：{{recommendCode}}</p>
                <div class="alter-btn">修改</div>
            </div>
        </div>
        <div class="game-description">
            <p>
                <span></span>
                游戏介绍
            </p>
            <div class="detail" style="overflow: hidden" v-html="gameDetail.detail">
            </div>
        </div>

        <div class="enter-game" @click="showMore">
            进入游戏
        </div>
        <show-more></show-more>
    </div>
</template>

<script>
    import Score from '@/components/SCORE'
    import ShowMore from '@/components/ShowMore'
    import {wakeNative} from "@/util/publicMehotds";

    export default {
        name: "game",
        componentName: "game",
        components: {
            Score,
            ShowMore
        },
        data() {
            return {
                gameDetail: {},
                id: '',
                recommendCode: ''
            }
        },
        created() {
            this.id = this.$route.query.id;
            this.recommendCode = this.$route.query.recommendCode;
            this.getGameDetail();
        },
        methods: {
            showMore() {
                wakeNative.call(this);
            },

            getGameDetail() {
                let parameter = {
                    id: this.$route.query.id,
                    recommendCode: this.$route.query.recommendCode
                };
                this.$vux.loading.show();
                this.$http.get(this.$api.gameDetailForOutsideShare, parameter, true)
                    .then(res => {
                        this.gameDetail = res;
                    })
                    .catch(error => {
                        this.$vux.toast.text(error.message);
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
    .game {
        padding: 15px 15px 60px;
        height: 100%;
        width: 100%;
        background: #F6F6F6;
        .game-header {
            height: 170px;
            border-radius: 6px;
            background: #FFFFFF;
            box-shadow: 0 0 4px 0 rgba(215, 215, 215, 0.50);
            .game-title {
                padding: 15px;
                display: flex;
                justify-content: flex-start;
                .game-pic {
                    height: 90px;
                    width: 90px;
                    flex-shrink: 0;
                    img {
                        border-radius: 6px;
                        height: 100%;
                        width: 100%;
                        }
                    }
                .game-name {
                    margin-left: 15px;
                    flex-grow: 1;
                    strong {
                        font-size: 14px;
                        color: #222222;
                        letter-spacing: 0;
                        line-height: 17px;
                        }
                    p {
                        font-size: 12px;
                        color: #777777;
                        margin-top: 10px;
                        }
                    }
                .comment-btn {
                    width: 70px;
                    height: 22px;
                    line-height: 22px;
                    background: #4A90FA 100%;
                    border-radius: 12px;
                    color: #FFFFFF;
                    text-align: center;
                    font-size: 12px;
                    margin-top: 25px;
                    }
                }
            .safe-code {
                border-top: 1px solid #F1F1F1;;
                padding-left: 45px;
                padding-right: 15px;
                height: 48px;
                background: no-repeat url("../assets/image/safe-code.png") 15px center / 20px 20px;
                display: flex;
                justify-content: space-between;
                align-items: center;
                p {
                    font-size: 14px;
                    color: #555555;
                    line-height: 14px;
                    }
                .alter-btn {
                    width: 60px;
                    height: 22px;
                    line-height: 20px;
                    color: #4A90FA;
                    text-align: center;
                    border-radius: 12px;
                    border: 1px solid #4A90FA;
                    }
                }
            }

        .game-description {
            margin-top: 10px;
            padding: 15px;
            border-radius: 8px;
            background: #FFFFFF;
            box-shadow: 0 0 4px 0 rgba(215, 215, 215, 0.50);
            .detail {
                /deep/ * {
                    max-width: 100% !important;
                    }
                }
            & > p {
                font-size: 14px;
                color: #555555;
                line-height: 14px;
                position: relative;
                padding-left: 15px;
                font-weight: bold;
                span {
                    display: block;
                    position: absolute;
                    width: 4px;
                    height: 14px;
                    border-radius: 2px;
                    background: #4A90FA;
                    left: 0;
                    top: 0;
                    }
                }
            & > div {
                margin-top: 15px;
                img {
                    max-width: 100%;
                    border-radius: 6px;
                    }
                p {
                    margin-top: 15px;
                    font-size: 12px;
                    color: #555555;
                    line-height: 17px;
                    }
                }
            }
        .enter-game {
            width: 100%;
            height: 44px;
            background: #4A90FA;
            box-shadow: 0 0 4px 0 rgba(215, 215, 215, 0.50);
            border-radius: 8px;
            line-height: 44px;
            text-align: center;
            margin-top: 20px;
            color: #FFFFFF;
            }
        }
</style>
