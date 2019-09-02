<template>
    <div class = 'android'>
        <div class="android-top-bg">
            <img :src="androidImgs[0]">
        </div>
        <div class="content">
            <div class="white-bg">
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
                <div class="title">手机直播教程</div>
                <p>使用U5 USB3.0全高清游戏采集盒，其支持windows，mac，linux，android等操作系统，随产品带有驱动、电脑采集以及手机安卓采集软件，win7，win8需要 安装驱动(驱动和软件一体安装完后桌面自动有软件图标即可使用)，win10,mac,linux,android下免驱。支持第三方软件即可采集或串流高清游戏音视频或其它高清 视频源。光盘里带有驱动以及相关软件，也可以网站进行下载http://www.jooview.com。</p>
            </div>
            <img :src="pendant">
            <div class="white-bg notop">
                <div class="title">安装说明</div>
                <img :src="androidImgs[1]" class="margin10">
                <p class="padding10">连接好采集卡后，电脑设备管理器中:声音、视频和游戏控制器以及照相机中将出现采集卡 设备名称分别为:Live Streaming Audio Device 和 Live Audio Video Device 注意:个别64位操作系统可能为感叹号，请安装光盘里或者下载网站的数字签名即可。</p>
                <img :src="leafRight" class="leaf-right1">
            </div>
            <img :src="pendant">
            <div class="white-bg notop">
                <div class="title">设备之间连接</div>
                <p>手机游戏连接方法</p>
                <img :src="androidImgs[2]" class="margin10">
                <img :src="leafLeft" class="leaf-left">
            </div>
            <img :src="pendant">
            <div class="white-bg notop">
                <div class="title">附带音频控制软件</div>
                <p>安装音频控制软件Uxplayer Audio Controller，此软件可以对九视U5输入的音频进行选择以及音量调节。</p>
                <img :src="androidImgs[3]" class="margin10">
                <p>
                    Device:设备名称<br>
                    MIC volume:采集卡上MIC in输入音频控制<br>
                    Line in volume:采集卡上line in输入音频控制<br>
                    HDMI in volume:采集卡HDMI in输入音频控制<br>
                    Line out volume:采集卡上line out输出音量控制，并且可以选择这个输出接口混音或者不混合mic in和line in(选勾是选择混音)
                </p>
            </div>
            <img :src="pendant">
            <div class="white-bg notop">
                <div class="title">与OBS软件使用</div>
                <p>
                    下载OBS软件安装后，点击“来源”窗口下的 “+”图标，在出来的画面里点击 “视频捕获设”。 在“设备” 旁的下拉框里选择 <br>
                    “Live Audio Video Device”， 在”音频输出模式”旁下拉框里选择”输出桌面音频(directshound)”, “音频设备”旁的下拉框里选择”<br>
                    数字音频接口(Live Streaming Audio Device)”，并点击”确定”。即可预览到画面，并且可对帧率分辨率等进行设置选择。
                </p>
                <img :src="androidImgs[4]" class="margin10">
                <p class="padding10">如果要使用yy等其他第三方通讯类工具，需要直播间用户听见的话，OBS还需要添加音频输出捕获</p>
                <div style="position:relative">
                    <img :src="androidImgs[5]" class="margin10">
                    <img :src="leafRight" class="leaf-right1">
                </div>
                <p>新建之后</p>
                <img :src="androidImgs[6]" class="margin10">
                <p class="padding10">
                    下拉框选择你的监听设备<br>
                    如果需要显示你的头像，obs也需要新加窗口捕获
                </p>
                <img :src="androidImgs[7]" class="margin10">
                <p class="padding10">添加后</p>
                <img :src="androidImgs[8]" class="margin10">
                <p class="padding10">选择你的摄像头设备，添加之后能预览你的头像画面，可以直接进行位置调节。如果画面没有可能是位置顺序不对</p>
            </div>
        </div>
    </div>
</template>
<script>
let baseUrl = '//sh.xksquare.com/';
import commonImg from "./commonImg.js";
export default {
    name:'android',
    data () {
        return {
            androidImgs:[
                baseUrl+'android0.png',
                baseUrl+'android1.png',
                baseUrl+'android2.png',
                baseUrl+'android3.png',
                baseUrl+'android4.png',
                baseUrl+'android5.png',
                baseUrl+'android6.png',
                baseUrl+'android7.png',
                baseUrl+'android8.png'
            ],
            ...commonImg,
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
.android-top-bg{
    width: 100%;
    position: absolute;
    left: 0;
    top: 0;
    img{
        width: 100%;
    }
}
.leaf-right1{
    position: absolute;
    top: 152px;
    right: -10px;
    width: 50px !important;
}
.leaf-left{
    position: absolute;
    bottom: -14px;
    left: -9px;
    width: 39px !important;
}
</style>