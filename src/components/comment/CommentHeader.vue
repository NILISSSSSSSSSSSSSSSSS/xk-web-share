/**
* Created by zhangmei on 2018/11/20
*/
<template>
    <div class="comment-header-container">
        <div class="comment-header" @click="goToCommentList">
            <span>{{headerLabel}} ({{total}})</span>
            <div v-if="showHeaderScore">
                <score :score="score"></score>
                <i class="icon-arrow g-s-arrow"></i>
            </div>
        </div>
        <div class="comment-category" v-if="showType && typeList.length">
            <div @click="typeAllClick"
                 :class="{'active':activeAll}">全部
            </div>
            <div v-for="(item,$index) in typeList"
                 :key="item.code"
                 :class="{'active':item.active}"
                 @click.stop="typeItemClick(item)">{{item.name}}
            </div>
        </div>
    </div>
</template>

<style lang="scss" scoped type="text/scss">
    .comment-header-container {
        .comment-header {
            padding: 0 15px;
            height: 40px;
            border-bottom: 1px solid #F1F1F1;
            display: flex;
            align-items: center;
            justify-content: space-between;
            span:first-child {
                font-size: 14px;
                color: #222222;
                line-height: 14px;
                }
            }
        .comment-category {
            display: flex;
            padding: 0 15px 10px;
            align-items: center;
            justify-content: center;
            border-bottom: 1px solid #F1F1F1;
            flex-wrap: wrap;
            & > div {
                height: 22px;
                min-width: 60px;
                margin-top: 10px;
                padding: 0 10px;
                border-radius: 12px;
                margin-left: 5px;
                font-size: 12px;
                letter-spacing: 2px;
                line-height: 22px;
                text-align: center;
                border: 1px solid #999999;
                color: #999999;
                &:first-child {
                    margin-left: 0;
                    }
                &.active {
                    border: 1px solid #4A90FA;
                    color: #4A90FA;
                    }

                }
            }
        }


</style>

<script>
    import Score from '../SCORE'

    export default {
        components: {Score},
        props: {
            total: {
                type: Number,
                default: 0
            },
            score: {
                type: Number,
                default: 5
            },
            showType: {
                default: false,
                type: Boolean
            },
            typeList: {
                type: Array
            },
            headerLabel: {
                type: String,
                default: "评价"
            },
            showHeaderScore: {
                type: Boolean,
                default: true
            }
        },
        data() {
            return {
                activeAll: true
            }
        },
        methods: {
            typeItemClick(item) {
                this.activeAll = false;
                this.$emit('type-item-click', item.code);
            },
            typeAllClick() {
                this.$emit('type-item-click', '');
                this.activeAll = true;
            },
            goToCommentList() {
                this.$emit("go-to-comment-list")
            }
        },
        computed: {}
    }
</script>
