/**
* Created by zhangmei on 2019/6/15
*/
<template>
    <div class="navigation-label" @click="cellClick">
        <div class="title-left">
            <slot name='left'>
                <span>描述</span>
            </slot>
        </div>
        <div class="label-more" v-if="showMore">
            <slot name="right">
                 <span>
                    内容
                 </span>
            </slot>
            <span>
            </span>
        </div>
    </div>
</template>

<script>
    export default {
        name: "",
        componentName: "NavigationLabel",
        components: {},
        data() {
            return {}
        },
        props: {
            showMore: {
                type: Boolean,
                default: true
            }
        },
        created() {
        },
        methods: {
            cellClick() {
                this.$emit('cell-click')
            }
        },
        computed: {},

    }
</script>

<style scoped lang="scss" type="text/scss">
    .navigation-label {
        height: 46px;
        width: 100%;
        background: #FFFFFF;
        display: flex;
        align-items: center;
        justify-content: space-between;
        .title-left {
            padding-left: 8px;
            position: relative;
            font-size: 14px;
            color: #222222;
            font-weight: bold;
            &::before {
                content: '';
                height: 12px;
                width: 3px;
                background: #4A90FA;
                border-radius: 3px;
                position: absolute;
                left: 0;
                top: 50%;
                transform: translateY(-50%);
                }
            }
        .label-more {
            font-size: 13px;
            color: #999999;
            display: flex;
            align-items: center;
            span:last-child {
                margin-left: 6px;
                width: 7px;
                height: 12px;
                background: no-repeat url("~assets/image/arrow-right.png") center/100%;
                }
            }
        }
</style>
