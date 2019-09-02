/**
* Created by zhangmei on 2019/6/17
*/
<template>
    <div class="history-publish" @click="cellClick">
        <navigation-label>
            <template slot="left">
                <span></span>
                <span>往期揭晓</span>
            </template>
            <span slot="right">
                        查看全部往期
                    </span>
        </navigation-label>
    </div>
</template>

<script>
    import NavigationLabel from '@/components/lottery/NavigationLabel'

    export default {
        name: "HistoryPublish",
        componentName: "HistoryPublish",
        components: {
            NavigationLabel
        },
        data() {
            return {}
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
    /*
    往期揭晓
    */
    .history-publish {
        background: #FFFFFF;
        margin-top: 11px;
        align-items: center;
        justify-content: space-between;
        display: flex;
        /deep/ .navigation-label {
            height: 48px;
            padding-left: 10px;
            padding-right: 15px;
            .title-left {
                padding-left: 0;
                &::before {
                    content: unset;
                    }
                display: flex;
                align-items: center;
                span:first-child {
                    margin-right: 5px;
                    width: 17px;
                    height: 17px;
                    background: no-repeat url("~assets/image/history-publish.png") center/100%;
                    }
                }
            }
        }
</style>
