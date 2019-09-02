/**
* Created by zhangmei on 2019/6/17
*/
<template>
    <div class="custom-cell" @click="openAlgorithm">
        <div class="left-content">
            <slot name="left">
                <span>开奖依据</span>
            </slot>
            <slot name="right">
                <span>开奖依据</span>
            </slot>
        </div>
    </div>
</template>

<script>
    export default {
        name: "CustomCell",
        componentName: "CustomCell",
        components: {},
        props: {},
        data() {
            return {}
        },
        created() {
        },
        methods: {
            openAlgorithm() {
                this.$emit('cell-click');
            }
        },
        computed: {},
    }
</script>

<style scoped lang="scss" type="text/scss">
    .custom-cell {
        height: 54px;
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 0 10px;
        background: #FFFFFF;
        border-bottom: 1px solid #F1F1F1;
        &::after {
            content: '';
            width: 7px;
            height: 12px;
            background: no-repeat url("~assets/image/arrow-right.png") center / 100% 100%;
            flex-shrink: 0;
            }
        .left-content {
            display: flex;
            align-items: center;
            justify-content: space-between;
            color: #222222;
            font-size: 14px;
            margin-right: 6px;
            height: 18px;
            line-height: 18px;
            flex-grow: 1;
            span:last-child {
                color: #999;
                }
            }
        }
</style>
