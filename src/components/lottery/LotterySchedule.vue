/**
* Created by zhangmei on 2019/6/15
*/
<template>

    <div class="lottery-schedule">
        <div :style="'width:' + progressPercent">
                                <span>
                                    <slot name="content">
                                    </slot>
                                </span>
        </div>
    </div>
</template>

<script>
    export default {
        name: "LotterySchedule",
        componentName: "LotterySchedule",
        components: {},
        data() {
            return {}
        },
        props: {
            progressPercent: {
                type: String,
                default: '0'
            },
            currentCustomerNum: [String, Number],
            eachSequenceNumber: [String, Number]
        },
        created() {
        },
        methods: {},
        computed: {},
    }
</script>

<style scoped type="text/scss" lang="scss">
    /*
 开奖进度
 */
    .lottery-schedule {
        height: 10px;
        margin: 10px 0 0;
        background: #DFE2E6;
        border-radius: 10px;
        > div {
            height: 10px;
            background: #4A90FA;
            border-radius: 10px;
            position: relative;
            min-width: 40px;
            span {
                text-align: center;
                height: 16px;
                width: 40px;
                line-height: 16px;
                display: block;
                position: absolute;
                background: #4A90FA;
                color: #FFFFFF;
                border-radius: 8px;
                font-size: 10px;
                box-shadow: 0 0 4px 0 rgba(0, 0, 0, 0.17);
                right: 0;
                top: -3px;
                }
            }
        }

</style>
