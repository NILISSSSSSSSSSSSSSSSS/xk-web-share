<template>
    <div class="scoreWrapper">
        <div class="scoreBox">
            <img src="../assets/image/startRed.png" alt="" v-for="(item,index) in Math.round(score)" :key="index">
            <img src="../assets/image/startGray.png" alt="" v-for="(j,index) in (maxScore- Math.round(score))"
                 :key="maxScore-j">
        </div>
        <div class="scoreNum" v-if="isShowNum" :class="{colorGray:score==0}">
            {{Math.round(score)}}分
        </div>
    </div>


</template>
<script>
    export default {
        props: {
            score: {
                type: Number,
                default: 0
            },
            isShowNum: {
                type: Boolean,
                default: true
            },
            maxScore: {
                type: Number,
                default: 5
            }
        },
        data() {
            return {}
        },
        watch: {
            score(val) {
                // alert(val)
                // console.log(val)
                // this.score = Math.floor(val)
            }
        },
        created() {

        },
        methods: {}
    }
</script>
<style lang="scss" scoped>
    .scoreWrapper {
        display: inline-flex;
        align-items: baseline;

        .scoreBox {
            img {
                width: 12px;
                height: 12px;
                margin-right: 3px;
                }
            }

        .scoreNum {
            color: #EE6161;
            font-size: 12px;
            margin-left: 5px;
            font-family: PingFangSC-Regular;
            }

        .colorGray {
            color: gray;
            }
        }
</style>
