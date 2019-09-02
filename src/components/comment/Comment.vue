/**
* Created by zhangmei on 2018/11/19
*/
<template>
    <div class="service-comment">
        <slot name="header"></slot>
        <div class="comment-list">
            <slot></slot>
        </div>
    </div>
</template>
<script>

    export default {
        components: {},
        data() {
            return {}
        },
        methods: {},
        computed: {}
    }
</script>

<style type="text/scss" lang="scss" scoped>
    /*评价*/
    .service-comment {
        box-shadow: 0 0 4px 0 rgba(215, 215, 215, 0.50);
        border-radius: 8px;
        background: #FFFFFF;
        margin-top: 10px;
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
        }

    .comment-list {
        }
</style>
