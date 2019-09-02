<template>
    <div class="actRuleBox">
        <div class="conBox">
            <h3>
                活动 <img src="../../assets/image/ruleStar.png" alt=""> 规则
            </h3>
            <div>
                <div class="column" v-for="(i,index) in 3" :key="index">
                    <span class="circle number">{{index+1}}</span>
                    <p>
                        ewer
                        哈哈哈好哈哈哈好哈哈哈好哈哈哈好哈哈哈好哈哈哈好哈哈哈好
                        哈哈哈好哈哈哈好哈哈哈好哈哈哈好哈哈哈好哈哈哈好哈哈哈好
                    </p>
                </div>
            </div>
        </div>
    </div>
</template>
<script>

</script>
<style lang="scss">
    html,
    body {
        width: 100%;
        height: 100%;

    }

    .actRuleBox {
        width: 100%;
        height: 100%;
        overflow: auto;
        padding: 35px 25px;
        background: url("/src/assets/image/ruleActBg.png") no-repeat;
        background-size: cover;

        .conBox {
            padding: 30px 30px;
            font-size: 13px;
            height: 100%;
            border-radius: 20px;
            background: url("/src/assets/image/ruleWhite.png") no-repeat;
            background-size: cover;
            display: flex;
            flex-direction: column;

            >div {
                overflow: auto;
            }

            h3 {
                height: 48px;
                line-height: 48px;
                color: #130863;
                font-size: 20px;
                font-weight: 900;
                display: flex;
                width: 130px;
                margin: 0 auto;
                /* text-align: center; */
                justify-content: center;
                position: relative;
                border-bottom: 1px solid #EB0697;

                align-items: center;

                img {
                    margin: 0 5px;
                    width: 15px;
                    height: 15px;
                }

                .num {
                    position: absolute;
                    right: -35px;
                    bottom: -10px;
                }
            }

            .column {
                display: flex;
                margin-top: 21px;

                .number {
                    margin-right: 21px;
                }

                p {
                    flex: 1;
                    font-size: 14px;
                    line-height: 1.7;
                    word-break: break-all;
                }
            }
        }
    }

    .circle {
        width: 20px;
        height: 20px;
        background: #DC149D;
        color: white;
        border-radius: 100%;
        line-height: 20px;
        text-align: center;
        font-size: 13px;
        display: inline-block;
    }
</style>
