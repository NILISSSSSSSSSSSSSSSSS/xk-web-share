<template>
    <div class="news-content-infomation iphonex-goods-bottom ios-scroll">
        <div v-html="htmlStr"></div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            htmlStr: "<div style='line-height: 100vh;text-align:center'>暂无数据</div>"
        }
    },
    created() {
        this.getDetail();
    },
    methods: {
        getDetail() {
            if(!this.$route.query.id) return false;
            this.$vux.loading.show();
            this.$http.get(this.$api.pushContentDetail, {id: this.$route.query.id}, true)
            .then(res=>{
                this.$vux.loading.hide();
                res? this.htmlStr = res.htmlContent: '';
            })
            .catch(err=>{
                this.$vux.loading.hide();
                this.$vux.toast.text(err.message);
            })
        }
    }
}
</script>
<style scoped lang="scss">
    .news-content-infomation {
        padding: 15px;
        box-sizing: border-box;
    }
</style>
