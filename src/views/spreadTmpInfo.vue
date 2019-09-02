<template>
    <div class="spread-tmp-info iphonex-goods-bottom ios-scroll">
        <div v-html="detail"></div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            detail: "",
            tmpId: ''
        }
    },
    created() {
        this.tmpId = this.$route.query.id
        this.getTmpDetail();
    },
    methods: {
        getTmpDetail() {
            if(!this.tmpId) return false;
            this.$vux.loading.show();
            this.$http.get(this.$api.promotionTemplateDetail, {id: this.tmpId}, true)
            .then(res=> {
                this.$vux.loading.hide();
                this.detail = res.info;
            })
            .catch(err=>{
                this.$vux.loading.hide();
                this.$vux.toast.text(err.message);
            })
        }
    }
}
</script>

<style lang="scss">
    .spread-tmp-info {
        padding: 5px;
        img,a,div{
            max-width: 100%!important;
        }
    }
</style>
