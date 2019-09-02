/**
* Created by zhangmei on 2019/6/17
*/
<template>
    <!--
 往期晒单
 -->
    <div class="history-shared">
        <navigation-label @cell-click="cellClick">
                    <span slot="left">
                        往期晒单({{commentCount}})
                    </span>
            <span slot="right">
                        查看全部晒单
                    </span>
        </navigation-label>
        <div class="shared-list" v-if="pictures.length">
            <ul>
                <li v-for="(item,index) in pictures"
                    :key="index">
                    <img class="block img-object-fit-cover"
                         :src="item"
                         alt="">
                    <div v-if="index===pictures.length-1" class="more-mask">
                        <div>
                        </div>
                        <div>
                            <span>查看全部</span>
                            <span></span>
                        </div>
                    </div>
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
    import NavigationLabel from '@/components/lottery/NavigationLabel'

    export default {
        name: "LotteryHistory",
        componentName: "LotteryHistory",
        components: {
            NavigationLabel
        },
        props: {
            commentCount: [String, Number],
            pictures: {
                type: Array,
                default: function () {
                    return [];
                }
            }
        },
        data() {
            return {}
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
    往期晒单
    */
    .history-shared {
        background: #FFFFFF;
        margin-top: 10px;
        /deep/ .navigation-label {
            padding: 0 15px 0 10px;
            }
        .shared-list {
            height: 119px;
            padding-right: 10px;
            padding-bottom: 15px;
            position: relative;
            ul {
                display: flex;
                overflow-x: auto;
                li {
                    width: 104px;
                    flex-shrink: 0;
                    height: 104px;
                    margin-left: 8px;
                    &:first-child {
                        margin-left: 0;
                        }
                    img {
                        height: 100%;
                        width: 100%;
                        border-radius: 4px;
                        }
                    }
                li:last-child {
                    position: relative;
                    .more-mask {
                        position: absolute;
                        right: 0;
                        top: 0;
                        height: 100%;
                        width: 100%;
                        > div {
                            height: 100%;
                            width: 100%;
                            top: 0;
                            left: 0;
                            }
                        > div:first-child {
                            background: #000000;
                            opacity: .3;
                            border-radius: 4px;
                            }
                        > div:last-child {
                            position: absolute;
                            z-index: 2;
                            display: flex;
                            align-items: center;
                            justify-content: center;
                            span {
                                color: #FFFFFF;
                                }
                            span:last-child {
                                margin-left: 3px;
                                width: 7px;
                                height: 12px;
                                background: no-repeat url("~assets/image/arrow-right-white.png") center/100%;
                                }
                            }
                        }
                    }
                }

            }
        }
</style>
