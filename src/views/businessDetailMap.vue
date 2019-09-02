/**
* Created by zhangmei on 2018/12/4
*/
<template>
    <div class="business-detail-map">
        <baidu-map
                class="map"
                :ak="ak"
                :center="center"
                :zoom="zoom"
                @ready="handler">

        </baidu-map>

    </div>
</template>

<script>
    import BaiduMap from 'vue-baidu-map/components/map/Map.vue'

    export default {
        components: {
            BaiduMap
        },
        data() {
            return {
                ak: "qffXaE27nOHVv9jksAFD0WbOfLppme1i",
                center: {lng: 0, lat: 0},
                zoom: 3
            }
        },
        methods: {
            handler({BMap, map}) {
                console.log(BMap, map);
                this.center.lng = 116.404;
                this.center.lat = 39.915;
                this.zoom = 15;
            }
        },
        computed: {}
    }
</script>

<style lang="scss" scoped type="text/scss">
    .business-detail-map {
        height: 100%;
        background: #FFFFFF;
        .map {
            height: 100%;
            }
        }

</style>
