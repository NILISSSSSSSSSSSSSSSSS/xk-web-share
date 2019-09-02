<template>
    <div class = 'ios'>
        <div class="ios-top-bg">
            <img :src="iosImgs[0]">
        </div>
        <div class="content">
            <div class="white-bg">
                <div class="only">
                    <span class="span1"></span>
                    目前支持windows、Mac
                    <span class="span2"></span>
                    <br>
                    <span class="span-tip">(Mac仅支持单人不支持组队和频道)</span>
                </div>
                <div class="title">开播教程引导</div>
                <p>复制链接，点击登录，“晓可广场账号”和“晓可直播账号”均能登录</p>
                <img :src="beginToShow1" class="margin10">
                <p>输入账号，登录方式包含“验证码登录”和“密码登录”</p>
                <img :src="beginToShow2" class="margin10">
                <img :src="beginToShow3" class="margin10">
                <p>登录成功后，点击“去直播”</p>
                <img :src="beginToShow4" class="margin10">
                <p>如果账号是主播身份，输入“直播标题”可以引起更多关注，获取更多人气哦</p>
                <img :src="beginToShow5" class="margin10">
                <p>点击复制推流地址是OBS画面的推流地址，详情请看使用教程</p>
            </div>
            <img :src="pendant">
            <div class="white-bg notop">
                
                <div class="title">下载爱思助手</div>
                <p>下载爱思助手</p>
                <img :src="iosImgs[1]" class="margin10" style="margin-bottom:14px">
                <img :src="iosImgs[2]" class="margin10" alt="">
                <p class="padding10">安装好了之后点击工具箱</p>
                <div style="position:relative">
                    <img :src="iosImgs[3]" class="margin10" alt="">
                    <img :src="leafRight" class="leaf-right1">
                </div>
                
                <p class="padding10">然后点击投屏直播</p>
                <img :src="iosImgs[4]" class="margin10" alt="">
                <p class="padding10">接着根据提示进行手机和电脑的连接</p>
                <img :src="iosImgs[5]" class="margin10" alt="">
                <p class="padding10">
                    与obs的使用<br>
                    画面采集新加窗口捕获
                </p>
                <img :src="iosImgs[6]" class="margin10" alt="">
                <p class="padding10">
                    进入窗口捕获的位置，设置手机的画面采集，进行推流画面设置，窗口要匹配你的手机画面
                </p>
                <img :src="iosImgs[7]" class="margin10" alt="">
                <img :src="leafLeft" style="width:37px;margin-left:-10px">
                <img :src="iosImgs[8]" class="margin10" style="margin-top:-5px">
                <p class="padding10">
                    新建之后
                </p>
                <img :src="iosImgs[9]" class="margin10" >
                <p class="padding10">
                    下拉框选择你的监听设备<br>
                    如果需要显示你的头像，obs也需要新加窗口捕获
                </p>
                <img :src="iosImgs[10]" class="margin10" >
                <p class="padding10" style="position:relative">
                    添加后
                    <img :src="leafRight" class="leafRight">
                </p>
                <img :src="iosImgs[11]" class="margin10">
                <p class="padding10">
                    选择你的摄像头设备，添加之后能预览你的头像画面，可以直接进行位置调节。如果画面没有可能是位置顺序不对
                </p>
                <img :src="iosImgs[12]" class="margin10" style="margin-bottom:14px">
                <img :src="iosImgs[13]" class="margin10" style="width:50%">
                <p class="padding10">选择你的摄像头设备，添加之后能预览你的头像画面，可以直接进行位置调节。如果画面没有可能是位置顺序不对</p>
            </div>
        </div>
    </div>
</template>
<script>
let baseUrl = '//sh.xksquare.com/';
import commonImg from "./commonImg.js";
export default {
    name:'ios',
    data () {
        return {
            iosImgs:[
                baseUrl+'ios0.png',
                baseUrl+'ios1.png',
                baseUrl+'ios2.png',
                baseUrl+'ios3.png',
                baseUrl+'ios4.png',
                baseUrl+'ios5.png',
                baseUrl+'ios6.png',
                baseUrl+'ios7.png',
                baseUrl+'ios8.png',
                baseUrl+'ios9.png',
                baseUrl+'ios10.png',
                baseUrl+'ios11.png',
                baseUrl+'ios12.png',
                baseUrl+'ios13.png',
            ],
            ...commonImg
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
@import "./common.scss";
.ios-top-bg{
    width: 100%;
    position: absolute;
    left: 0;
    top: 0;
    img{
        width: 100%;
    }
}
.ios{
    .content{
        // margin-top: 275px;
        margin-top: 300px;
        .only{
            width: 100%;
            position: absolute;
            left: 0;
            top: -55px;
            text-align: center;
            color: #ffffff;
            height: 21px;
            font-size: 14px;
            line-height: 21px;
            .span-tip{
                color: rgba(255, 255, 255, 0.3)
            }
            .span1{
                margin: 10px;
                width: 5px;
                height: 5px;
                background: #ffffff;
                opacity: 0.5;
                display: block;
                position: absolute;
                left: 60px;
                top: -2px;
                border-radius: 50%
            }
            .span2{
                margin: 10px;
                width: 5px;
                height: 5px;
                background: #ffffff;
                opacity: 0.5;
                display: block;
                position: absolute;
                right: 60px;
                top: -2px;
                border-radius: 50%
            }
        }
    }
}
.leafRight{
    position: absolute;
    right: -10px;
    top: 0;
    width: 38px !important
}
.leaf-right1{
    position: absolute;
    right: -10px;
    top: 69px;
    width: 54px !important
}
</style>