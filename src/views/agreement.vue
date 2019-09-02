<template>
    <div class = 'agreement'>
        <div v-if="showToast" class="agreement-tost">
            <div class="agreement-content">
                <div class="agreement-pop" v-html="agreementContent" v-if="agreementContent"></div>
            </div>
        </div>
        <loading :show="show1" text="协议加载中"></loading>
    </div>
</template>
<script>
import { Loading} from 'vux';
export default {
    name:'agreement',
    data () {
        return {
            showToast:false,
            show1:false,
            agreementContent:''
        };
    },
    props: {},
    components: {
        Loading
    },
    computed: {},
    created() {
        
    },
    mounted() {
        this.agreementDetail();
    },
    methods: {
        agreementDetail(){
            let contractConfigKey = this.$route.query.contractConfigKey
            this.show1 = true ;
            this.agreementContent = '';
            this.$http.get(this.$api.platformPtotocolConfigDetail,{
                contractConfigKey,
                forPlatform:"ua",
            } , false).then((res) => {
                this.agreementContent = res.content ;
                this.show1 = false ;
                this.showToast = true;
            }).catch((err) => {
                this.show1 = false ;
                this.showToast = true;
                this.agreementContent = '';
                this.$vux.toast.text(err.message);
            });
        }
    },
    watch: {}
}
</script>
<style scoped lang="scss">
.agreement-tost{
    height: 100vw;
    height: 100vh;
    padding: 10px;
    background: #f6f6f6;
    position: fixed;
    left: 0;
    top: 0;
    z-index: 9999;
    .agreement-content{
        width: 100%;
        height: 100%;
        padding: 15px;
        overflow-x: hidden;
        overflow-y: auto;
        -webkit-overflow-scrolling: touch;
        background: #ffffff;
        border-radius: 6px;
    }
}
</style>