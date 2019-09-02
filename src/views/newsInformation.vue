<template>
    <div class="news-infomation iphonex-goods-bottom ios-scroll">
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
            this.$http.get(this.$api.consultContentDetail, {id: this.$route.query.id}, true)
            .then(res=>{
                this.$vux.loading.hide();
                this.htmlStr = res.extendContent;
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
    .news-infomation {
        padding: 15px;
        box-sizing: border-box;
    }
</style>
