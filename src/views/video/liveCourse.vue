<template>
    <div class = 'live-course'>
        <div class="top">
            <div class="back" @click="goBack">
                <img src="~assets/image/back.png" alt="">
            </div>
            直播教程
        </div>
        <div class="live-tabs">
            <div class="live-tab-pane" :class="{'tab-active':componentId===item.value}" v-for="(item,index) in tabs" :key="index" @click="fnChangeTab(item.value)">
                <button class="live-button">
                    {{item.label}}
                    <div class="border"></div>
                </button>
            </div>
        </div>
        <keep-alive>
            <component :is="componentId"></component>
        </keep-alive>
        <div class="copy">
            <div>
                <span class="span-other">开播地址：</span><br>
                <span>{{liveurl}}</span>
            </div>
            <button class="btn" :data-clipboard-text="liveurl" @click="fnCopy">复制</button>
        </div>
    </div>
</template>
<script>
import pc from "./liveCourse/pc";
import ios from "./liveCourse/ios";
import android from "./liveCourse/android";
import Clipboard from 'clipboard';
import {system} from "@/util/publicMehotds"
export default {
    name:'liveCourse',
    data () {
        return {
            componentId:'android',
            tabs:[
                {
                    label:"安卓投屏开播",
                    value:"android"
                },
                {
                    label:"ios投屏开播",
                    value:"ios"
                },
                {
                    label:"pc开播",
                    value:"pc"
                }
            ],
            liveurl:"",
            isShowTop:false
        };
    },
    props: {},
    components: {
        pc,
        ios,
        android
    },
    computed: {},
    created() {
        this.liveurl = 'https://xkadmin.xksquare.com/live/#/login';
        let os = system();
        if(os==='android' || os==='ios'){
            this.isShowTop = true
        }
    },
    mounted() {
        new Clipboard('.btn');
    },
    methods: {
        fnChangeTab(componentId){
            this.componentId = componentId ;
        },
        fnCopy(){
            console.log('复制成功')
            this.$vux.toast.text('复制成功', 'middle')
        },
        goBack(){
            history.go(-1)
        }
    },
    watch: {}
}
</script>
<style scoped lang="scss">
@import './liveCourse.scss';
</style>