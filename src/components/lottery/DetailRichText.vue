/**
* Created by zhangmei on 2019/6/17
*/
<template>
    <div class="detail-rich-text">
        <navigation-label :show-more="false">
                    <span slot="left">
                        商品详情
                    </span>
        </navigation-label>
        <div class="detail">
            <slot></slot>
        </div>
    </div>
</template>

<script>
    import NavigationLabel from '@/components/lottery/NavigationLabel'

    export default {
        name: "DetailRichText",
        componentName: "DetailRichText",
        components: {
            NavigationLabel
        },
        data() {
            return {}
        },
        created() {
        },
        methods: {},
        computed: {},

    }
</script>

<style scoped lang="scss" type="text/scss">
    /*
    商品详情
    */
    .detail-rich-text {
        margin-top: 10px;
        /deep/ .navigation-label {
            padding: 0 15px 0 10px;
            }
        .detail {
            overflow: hidden;
            background: #FFFFFF;
            padding: 5px 10px;
            /deep/ * {
                max-width: 100% !important;
                }
            }
        }
</style>
