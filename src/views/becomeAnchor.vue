<template>
    <div class = 'become-anchor'>
        <img src="//sh.xksquare.com/become-anchor.png" class="banner">
        <div class="white">
            <div class="title">
                主播身份优势
            </div>
            <div class="li">
                <div></div>
                <div>
                    绑定铁粉，你的铁粉给其他主播打赏产生的利润，<br>
                    平台永久分享给您。
                </div>
            </div>
            <div class="li">
                <div></div>
                <div>
                    平台免费进行投放宣传，0投入，高回报。
                </div>
            </div>
            <div class="li">
                <div></div>
                <div>
                    平台全天候为主播免费进行培训、指导。
                </div>
            </div>
            <!--<div class="li">
                <div></div>
                <div>
                    主播与粉丝的利益牢固绑定。粉丝消费，主播得利。
                </div>
            </div>-->
            <div class="li">
                <div></div>
                <div>
                    四大盈利系统，为您持久分成。
                </div>
            </div>
            <div class="li">
                <div></div>
                <div>
                    发布小视频也能获得打赏。
                </div>
            </div>
        </div>
        <div class="white">
            <div class="title">
                新收益模式
            </div>
            <div class="li">
                <div></div>
                <div>
                    晓可广场助您绑定终身客户、终身联盟商，终身<br>
                    享平台收益分成。
                </div>
            </div>
            <div class="li">
                <div></div>
                <div>
                    您推荐用户在精选商城、游戏中心消费产生的利<br>
                    润，平台分给您
                </div>
            </div>
            <div class="li">
                <div></div>
                <div>
                    彩票收益、区域维护收益……平台未来开发的新<br>
                    盈利板块产生的收益永久与你分享。
                </div>
            </div>
        </div>
        <div class="phone">具体详情请联系晓可平台：400-080-118</div>
    </div>
</template>
<script>
export default {
    name:'becomeAnchor',
    data () {
        return {
        };
    },
    props: {},
    components: {},
    computed: {},
    created() {},
    mounted() {},
    methods: {},
    watch: {}
}
</script>
<style scoped lang="scss">
.become-anchor{
    width: 100%;
    height: 100%;
    background: linear-gradient(45deg,#E75E29,#FF8C38);
    position: relative;
    padding: 246px 10px 0;
    overflow-y: auto;
    -webkit-overflow-scrolling: touch;
    .banner{
        width: 100%;
        position: absolute;
        left: 0;
        top: 0;
    }
    .white{
        width: 100%;
        border-radius: 6px;
        background: #ffffff;
        overflow: hidden;
        position: relative;
        padding-bottom: 14px;
        margin-bottom: 10px;
        .title{
            background: url('//sh.xksquare.com/become-title.png') no-repeat center / 100% 100%;
            width: 287px;
            height: 36px;
            line-height: 36px;
            font-size: 16px;
            color: #FFFFFF;
            text-align: center;
            margin: 20px auto 14px;
        }
        .li{
            text-align: center;
            font-size: 14px;
            color: #4A4A4A;
            line-height: 26px;
            display: flex;
            div:first-child{
                width: 7px;
                height: 7px;
                background: #FA8335;
                border-radius: 50%;
                margin-right: 10px;
                margin-left: 17px;
                margin-top: 9px;
            }
            div:last-child{
                flex: 1;
                text-align: left
            }
        }
    }
    .phone{
        padding-top: 4px;
        text-align: center;
        color: #ffffff;
        font-size: 12px;
        opacity: 0.8;
        margin-bottom: 16px;
    }
}
</style>
