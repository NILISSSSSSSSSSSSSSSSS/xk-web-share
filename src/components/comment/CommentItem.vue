/**
* Created by zhangmei on 2018/11/20
*/
<template>
    <div class="comment-item">
        <div class="comment-avatar">
            <img :src="comment.commenter.avatar"
                 alt="头像">
        </div>
        <div class="comment-content">
            <div class="comment-content-header">
                <div class="comment-nikename">
                    <p class="text-overflow">{{comment.commenter.nickName}}</p>
                    <span v-if="showCommentTime">{{comment.createdAt | formatTime}}</span>
                </div>
                <div class="package-score" v-if="showScore">
                    <score :is-show-num="false" :score="comment.score"></score>
                </div>
                <p class="consumption-name">
                    <slot name="consumption-name">
                        {{comment.goods.name}}
                    </slot>
                </p>
                <p class="content">
                    {{comment.content}}
                </p>
            </div>
            <div class="comment-img-list"
                 :class="{'expand': pictureLength}"
                 :style="{'height':height}">
                <ul ref="imgContainer">
                    <li v-for="(item,$index) in comment.pictures">
                        <img class="img-object-fit-cover" :src="item" alt="评论图片" @click="imgPreview(comment.pictures,$index)">
                    </li>
                </ul>
                <div class="expand-toggle" @click="expandClick" v-if="pictureLength>3">
                    <div>
                        {{expand?'收起':'展开'}}
                        <i :class="{'up':expand}"
                           class="verticleMiddlearrowDown icon-arrow icon-down">
                        </i>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<style lang="scss" type="text/scss" scoped>
    .comment-item {
        padding: 15px;
        display: flex;
        border-bottom: 1px solid #F1F1F1;
        .comment-avatar {
            height: 46px;
            flex-shrink: 0;
            width: 46px;
            img {
                display: block;
                height: 100%;
                width: 100%;
                border-radius: 5px;
                }
            }
        .comment-content {
            padding-top: 2px;
            padding-left: 10px;
            min-width: 0;
            flex-grow: 1;
            .comment-content-header {
                .comment-nikename {
                    display: flex;
                    justify-content: space-between;
                    p {
                        font-size: 14px;
                        color: #222222;
                        line-height: 14px;
                        flex-grow: 1;
                        }
                    span {
                        flex-shrink: 0;
                        display: block;
                        font-size: 12px;
                        color: #999999;
                        text-align: right;
                        line-height: 12px;
                        }
                    }
                .package-score {
                    margin-top: 10px;
                    }
                .consumption-name {
                    font-size: 12px;
                    color: #999999;
                    line-height: 12px;
                    margin-top: 5px;
                    }
                .content {
                    font-size: 12px;
                    color: #555555;
                    line-height: 16px;
                    margin-top: 15px;
                    }
                }
            .comment-img-list {
                overflow-y: hidden;
                transition: all .3s;
                position: relative;
                margin-left: -10px;
                &.expand {
                    height: 70px;
                    }
                ul {
                    display: flex;
                    flex-wrap: wrap;
                    li {
                        width: 60px;
                        height: 60px;
                        margin-left: 10px;
                        margin-top: 10px;
                        position: relative;
                        overflow: hidden;
                        img {
                            display: block;
                            }
                        }
                    }
                .expand-toggle {
                    position: absolute;
                    right: 0;
                    bottom: -2px;
                    font-size: 12px;
                    color: #555555;
                    }
                .icon-arrow {
                    display: inline-block;
                    transform: rotateZ(90deg);
                    transition: transform .3s;
                    &.up {
                        transform: rotateZ(-90deg);
                        }
                    }
                }
            }
        }

</style>

<script>
    import Score from '../SCORE';
    import imgPreview from '../../mixins/imgPreview'
    import {getSafe} from "@/util/publicMehotds";

    export default {
        mixins: [imgPreview],
        components: {
            Score,
        },
        data() {
            return {
                expand: false,
            }
        },
        props: {
            comment: {
                type: Object
            },
            showScore: {
                type: Boolean,
                default: true
            },
            showCommentTime: {
                type: Boolean,
                default: true
            }
        },
        methods: {
            imgPreview(imgList, index) {
                this.$emit('img-click', imgList, index);
            },
            expandClick() {
                this.expand = !this.expand;
            },
        },
        computed: {
            height() {
                if (this.expand) {
                    return this.$refs.imgContainer.clientHeight + 'px'
                }
            },
            pictureLength() {
                return getSafe(() => this.comment.pictures.length, 0);
            }
        }
    }
</script>
