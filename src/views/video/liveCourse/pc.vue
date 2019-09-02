<template>
    <div class = 'pc'>
        <div class="pc-top-bg">
            <img :src="pcImgs[0]">
        </div>
        <div class="content">
            <div class="white-bg">
                <div class="title">OBS简介</div>
                <p>
                    OBS是一款比较好用的开源直播软件，目前支持的操作系统包括：win7，win8，苹果的OS X系统，不支持XP系统。目前OBS有两款产品，一款为旧版本的OBS Classic，一款为新版本的OBS Studio，建议使用OBS Studio。
                </p>
            </div>
            <img :src="pendant">
            <div class="white-bg notop">
                <div class="title">OBS下载</div>
                <p>
                    OBS下载地址：<a href="https://obsproject.com/download" target="_blank" style="color:#673AB7">https://obsproject.com/download</a><br>
                    此为新版本的OBS Studio
                </p>
                <img :src="pcImgs[1]" class="margin10">
                <p class="padding10">
                    如果想使用旧版本的OBS，点击官网下方的链接：
                </p>
                <img :src="pcImgs[2]" style="margin-bottom:20px;" class="margin10">
                <img :src="leafRight" class="leafRight1">
            </div>
            <img :src="pendant">
            <div class="white-bg notop">
                <div class="title">OBS安装</div>
                <p>
                    OBS 安装时直接运行obs的安装源文件，一直下一步就可以了。
                </p>
            </div>
            <img :src="pendant">
            <div class="white-bg notop">
                <div class="title">FAQ1</div>
                <p>
                    如果是安装的OBS studio有一步是选择插件的，如下图，其中框起来的部分是支持intel 实感摄像头的插件，如果主播没有实感摄像头可以不勾选，如果有intel的实感摄像头可以选择勾选。
                </p>
                <img :src="pcImgs[3]" class="margin10" style="margin-bottom:20px;">
                <img :src="leafLeft" class="leaf-left">
            </div>
            <img :src="pendant">
            <div class="white-bg notop">
                <div class="title">FAQ2</div>
                <p>
                    如果安装过程中有如下提示，说明电脑缺少必要的组件，选择“是”，下载组件并安装。
                </p>
                <img :src="pcImgs[4]" class="margin10" style="margin-bottom:10px;">
                <img :src="pcImgs[5]" class="margin10" style="margin-bottom:20px;">
            </div>
            <img :src="pendant">
            <div class="white-bg notop">
                <div class="title">OBS使用步骤</div>
                <p>
                    1、打开OBS软件，界面如下
                </p>
                <img :src="pcImgs[6]" class="margin10" style="margin-bottom:10px;">
                <p class="padding10">
                    2、添加场景：在左下角的场景部分，右键，添加场景，输入场景名字，确定即可
                </p>
                <p class="padding10">
                    3、添加来源：在来源部分，右键，添加，游戏捕获，输入游戏源名称，确定，在弹出的游戏源窗口中，
                    选择“捕捉任何全屏应用程序”，或者选择“捕捉特定窗口”，然后选择游戏，其他设置默认即可
                    （这种方式相当于是晓可的进程直播，通过识别游戏的进程名抓取游戏）；
                </p>
                <div style="position:relative">
                    <img :src="pcImgs[7]" class="margin10" style="margin-bottom:10px;">
                    <img :src="leafRight" class="leafRight2">
                </div>
                <p>
                    如果是想使用屏幕捕捉的方式，则在来源部分，右键，添加，显示器获取或者窗口捕获，输入名称，确定，
                    在弹出的显示器获取窗口中，勾选“捕获光标”和“多适配器的兼容性”，其他设置默认即可。
                    （这种方式相当于是晓可的屏幕捕捉，这里注意屏幕捕捉是获取不到全屏的画面，要将游戏设置为无边框或者是窗口全屏化）
                </p>
                <img :src="pcImgs[8]" class="margin10" style="margin-bottom:10px;">
                <p>
                    其他图层添加：如果想添加摄像头画面或者添加图片，只需要在添加中选择对应的选项即可；
                    <br><br>
                    图层显示方法：在添加好的图层中，在图层前面有个眼睛样式的图标，可以点击控制图层是否显示；
                    <br><br>
                    图层大小调节：选中一个图层，在obs的预览中该图层出现红框，鼠标拖动红框即可调节图层的显示大小；
                </p>
            </div>
            <img :src="pendant">
            <div class="white-bg notop">
                <div class="title">OBS直播参数设定</div>
                <p>
                    1、点击obs上面菜单栏中“文件”中的“设置”选项，如下图
                </p>
                <img :src="pcImgs[9]" class="margin10" style="margin-bottom:10px;">
                <p class="padding10">
                    2、串流：这里可以先不用设置，后面会讲到
                </p>
                <p class="padding10">
                    3、“输出”中的设置，输出模式选择高级
                    <br><br>
                    1）编码器中x264相当于晓可直播中的CPU H.264编码，NVENC H.264相当于晓可直播中的NVIDIA H.264（推荐选择x264）
                    <br><br>
                    2）速率控制：选择CBR就好
                    <br><br>
                    3）比特率：既码率，可以使用虎牙直播中的推荐码率，如果不知道怎么选择，可以使用配置中的自动配置功能
                </p>
                <img :src="pcImgs[10]" class="margin10" style="margin-bottom:10px;">
                <p>
                    4）使用自定义缓存大小：勾选
                    <br><br>
                    5）缓冲大小：设置为与最大比特率一致
                    <br><br>
                    6）关键帧间隔：不要设置为0，建议设置为5，如果这里设置为0，可能会造成黑屏
                    OBS Studio的设置截图：
                </p>
                <img :src="pcImgs[11]" class="margin10" style="margin-bottom:10px;">
                <p>
                    旧版本OBS的设置截图：
                </p>
                <img :src="pcImgs[12]" class="margin10" style="margin-bottom:10px;">
                <p>
                    4、视频中的设置：
                    <br><br>
                    1）分辨率：如果希望直播画面比较流畅，网速也可以的话可以选择1920*1080，如果网速比较差，建议选择1280*720
                    <br><br>
                    2）FPS：既帧数，可以参考在虎牙直播中的帧数
                </p>
                <img :src="pcImgs[13]" class="margin10" style="margin-bottom:10px;">
                <p>
                    5、音频中的设置
                    <br><br>
                    1）采样率：使用44.1khz
                </p>
                <img :src="pcImgs[14]" class="margin10" style="margin-bottom:10px;">
                <p>
                    2）桌面音频设备：选择自己的扬声器
                    <br><br>
                    3）麦克风：选择自己的麦克风即可
                    <br><br>
                    其他的参数使用默认值，设置好以后，点击“应用”。在频道中设置好发言模式和伴奏。
                </p>
                <img :src="pcImgs[15]" class="margin10" style="margin-bottom:10px;">
                <p>
                    6、其他的设置项按照默认设置即可，不需要额外设置，全部设置好以后，点击“确定”即可。  
                </p>
            </div>
            <img :src="pendant">
            <div class="white-bg notop">
                <div class="title">第三方推流开播流程</div>
                <p>
                    1、打开OBS软件，进入晓可直播频道。
                    <br><br>
                    2、在频道中选择“第三方直播软件”，点击“开始直播”，在弹出的框中选择“OBS或XSplit等第三方直播软件”。
                    <br><br>
                    注意：使用第三方软件推流以后，晓可频道设置中的参数全部无效，使用的是OBS中设定的参数，具体的设定方法参考上面的讲解。
                    <br><br>
                    3、点击下面页面的点击复制，打开OBS的设置页面，在串流页面中，选择“自定义流媒体服务器”，
                    将频道给出的推流地址复制到OBS中的“URL”，无需流密钥。点击“应用”后“确定”即可。
                </p>
                <img :src="pcImgs[16]" class="margin10" style="margin-bottom:10px;">
                <img :src="pcImgs[17]" class="margin10" style="margin-bottom:10px;">
                <p>
                    4、在OBS中设置好其他的参数，具体设置方法参考上面的“OBS基础使用”
                    <br><br>
                    5、在OBS中点击“开始串流”，进入游戏
                    <br><br>
                    6、在上方晓可直播页面，点击开始直播按钮，即可开始直播
                </p>
            </div>
        </div>
    </div>
</template>
<script>
let baseUrl = '//sh.xksquare.com/';
import commonImg from "./commonImg.js";
export default {
    name:'pc',
    data () {
        return {
            pcImgs:[
                baseUrl+'pc0.png',
                baseUrl+'pc1.png',
                baseUrl+'pc2.png',
                baseUrl+'pc3.png',
                baseUrl+'pc4.png',
                baseUrl+'pc5.png',
                baseUrl+'pc6.png',
                baseUrl+'pc7.png',
                baseUrl+'pc8.png',
                baseUrl+'pc9.png',
                baseUrl+'pc10.png',
                baseUrl+'pc11.png',
                baseUrl+'pc12.png',
                baseUrl+'pc13.png',
                baseUrl+'pc14.png',
                baseUrl+'pc15.png',
                baseUrl+'pc16.png',
                baseUrl+'pc17.png',
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
.pc-top-bg{
    width: 100%;
    position: absolute;
    left: 0;
    top: 0;
    img{
        width: 100%;
    }
}
.leaf-left{
    position: absolute;
    left: -10px;
    top: 11px;
    width: 37px !important;
}
.leafRight1{
    position: absolute;
    right: -10px;
    width: 38px !important;
    top: -5px
}
.leafRight2{
    position: absolute;
    right: -10px;
    width: 43px !important;
    top: 170px
}
</style>