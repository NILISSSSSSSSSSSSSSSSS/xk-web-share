/**
* Created by zhangmei on 2018/12/13
*/
<template>
    <div class="share-map">
        <baidu-map class="map"
                   @ready="handleReady"
                   :center="center"
                   :zoom="zoom"
                   :ak="ak">
            <bm-marker
                    :position="center"
                    animation="BMAP_ANIMATION_BOUNCE">
            </bm-marker>
        </baidu-map>

        <div class="shop-address">
            <p>
                {{shopName}}
            </p>
            <p>
                电话:{{shopTel}}
            </p>
            <p>
                {{shopAddress}}
            </p>
        </div>
    </div>
</template>

<script>
    import {BaiduMap, BmMarker} from 'vue-baidu-map/components'

    export default {
        name: "shareMap",
        components: {
            BaiduMap,
            BmMarker,
        },
        data() {
            return {
                ak: 'qffXaE27nOHVv9jksAFD0WbOfLppme1i',
                center: {
                    lng: "104.0723209055", lat: "30.6634439219",
                },
                zoom: 3,
                shopName: '',
                shopTel: '',
                shopAddress: ''
            }
        },
        created() {
            this.center.lng = this.$route.query.lng;
            this.center.lat = this.$route.query.lat;
            this.shopName = decodeURIComponent(this.$route.query.shopName);
            this.shopTel = this.$route.query.tel;
            this.shopAddress = decodeURIComponent(this.$route.query.address);

        },
        methods: {
            handleReady({BMap, map}) {
                this.zoom = 15
            }
        }
    }
</script>
<style scoped lang="scss" type="text/scss">
    .share-map {
        height: 100%;
        width: 100%;
        .map {
            height: 100%;
            width: 100%;
            }
        .shop-address {
            background: #FFFFFF;
            padding: 15px;
            position: fixed;
            width: 100%;
            left: 0;
            bottom: 0;
            p {
                margin-top: 5px;
                }
            p:first-child {
                font-size: 16px;
                line-height: 20px;
                font-weight: bold;
                }
            p:last-child {
                font-size: 12px;
                color: #555555;
                line-height: 14px;
                padding-left: 15px;
                background: no-repeat url("~assets/image/addressLogo.png") 0 0 / 10px 14px;
                }
            }
        }

</style>
