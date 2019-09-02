<template>
    <div class = 'become-family'>
        <img src="//sh.xksquare.com/become-family-banner.png" class="banner">
        <img src="//sh.xksquare.com/book.png" class="book">
        <div class="content">
            <div class="white">
                <div class="title">家族长身份优势</div>
                <div class="li">
                    <div></div>
                    <div>
                        家族长对旗下主播收益按一定比例提成
                    </div>
                </div>
                <div class="li">
                    <div></div>
                    <div>
                        家族长参与晓可广场线上线下活动分成
                    </div>
                </div>
                <div class="li">
                    <div></div>
                    <div>
                        家族长可发布直播或小视频获得收益
                    </div>
                    
                </div>
                <div class="li">
                    <div></div>
                    <div>
                        四大盈利系统，为您持久分成。
                    </div>
                    
                </div>
            </div>
            <div class="white">
                <div class="title">新收益模式</div>
                <div class="li">
                    <div></div>
                    <div>
                        晓可广场助您绑定终身客户、终身联盟商，<br>
                        终身享平台收益分成。
                    </div>
                    
                </div>
                <div class="li">
                    <div></div>
                    <div>
                        您推荐用户在精选商城、游戏中心消费产生<br>
                        的利润，平台分给您。
                    </div>
                    
                </div>
                <div class="li">
                    <div></div>
                    <div>
                        彩票收益、区域维护收益……平台未来开发<br>
                        的新盈利板块产生的收益永久与你分享。
                    </div>
                    
                </div>
            </div>
            <div class="phone">具体详情请联系晓可平台：400-080-118</div>
        </div>
    </div>
</template>
<script>
export default {
    name:'becomeFamily',
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
.become-family{
    width: 100%;
    height: 100%;
    background: #4B8BD8;
    position: relative;
    padding-top: 221px;
    overflow-y: auto;
    -webkit-overflow-scrolling: touch;
    .banner{
        position: absolute;
        left: 0;
        top: 12px;
        width: 100%
    }
    .book{
        position: absolute;
        left: 10px;
        top: 177px;
        width: calc(100% - 20px);
        
    }
    .content{
        width: calc(100% - 46px);
        margin-left: 23px;
        position: relative;
        margin-bottom: 51px;
        .white{
            border-radius: 6px;
            background: #ffffff;
            padding-top: 31px;
            padding-bottom: 14px;
            margin-bottom: 34px;
            position: relative;
            .title{
                background: #4160AE;
                border: 3px solid #ffffff;
                border-radius: 6px;
                position: absolute;
                left: 50%;
                top: -18px;
                transform: translateX(-50%);
                width: 173px;
                height: 36px;
                color: #ffffff;
                text-align: center;
                line-height: 30px;
                box-sizing: border-box;
                font-size: 16px;
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
                    background: #4B8BD8;
                    border-radius: 50%;
                    margin-right: 10px;
                    margin-left: 28px;
                    margin-top: 9px;
                }
                div:last-child{
                    flex: 1;
                    text-align: left
                }
            }
        }
        .phone{
            margin-top: -20px;
            text-align: center;
            color: #ffffff;
            font-size: 12px;
            opacity: 0.8;
        }
    }
}
</style>