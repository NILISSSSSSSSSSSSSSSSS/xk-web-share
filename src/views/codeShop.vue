<template>
    <div class='code-shop'>
        <div class="shop-detai">
            <div class="logo">
                <img :src="$route.query.logo" alt="">
            </div>
            <div class="name">{{$route.query.name}}</div>
            <div class="safe-code">晓可联盟安全码：{{$route.query.securityCode}}</div>
            <div class="shop-btns">
                <div class="btn" @click="fnViewOrder">查看订单</div>
                <div class="btn blue" @click="fnEnterShop">进入店铺</div>
            </div>
        </div>
        <x-button :show-loading="loading" class="pay-btn" @click.native="fnPay">付款</x-button>
    </div>
</template>
<script>
    import {callNative} from '../util/publicMehotds'
    import {XButton} from 'vux'

    export default {
        name: 'codeShop',
        components: {
            XButton
        },
        data() {
            return {
                loading: false,
                shopStatus: false,  //店铺状态
            };
        },
        created() {
            let query = this.$route.query;
            //是否在晓可广场APP内打开
            if (!query.isXkGc) {
                this.$router.replace({
                    path: "/scanCode",
                    query
                })
            }
            this.getRegionOpenOrder();
        },
        methods: {
            /**
             * 获取当前地区是否打开交易
             */
            getRegionOpenOrder() {
                this.loading = true;
                this.$http.get(this.$api.qShopBusinessStatus, {shopId: this.$route.query.shopId}, true)
                    .then(res => {
                        if(res) this.shopStatus = res.shopBusinessStatus
                    })
                    .catch(err => {
                        this.$vux.toast.text(err.message)
                    })
                    .finally(() => {
                        this.loading = false;
                    })
            },
            fnViewOrder() {
                callNative('jsOpenShopOrderList');
            },
            fnEnterShop() {
                let params = {
                    shopId: this.$route.query.shopId,
                };
                callNative('jsOpenShopDetail', JSON.stringify(params));
            },
            fnPay() {
                try{
                    if (this.shopStatus === 'WAIT_BUSINESS') return this.$vux.toast.text('线上开业在即');
                    else if (this.shopStatus === 'CAN_NOT_PAY') return this.$vux.toast.text('本店暂时不可支付');
                    else if (this.shopStatus === 'NOT_BUSINESS_AND_PAY') return this.$vux.toast.text('店铺未营业，暂不可支付');

                    let params = {
                        merchantId: this.$route.query.merchantId,
                        shopId: this.$route.query.shopId,
                    };
                    callNative('jsOpenShopStaticPay', JSON.stringify(params));
                }catch (e) {
                    console.error(e)
                }
            },
        },
        watch: {}
    }
</script>
<style scoped lang="scss">
    .code-shop {
        width: 100%;
        height: 100%;
        background: #EEEEEE;
        padding: 10px;
        box-sizing: border-box;

        .shop-detai {
            width: 100%;
            height: 282px;
            background: #FFFFFF;
            border-radius: 8px;
            margin-bottom: 20px;
            overflow: hidden;

            .logo {
                width: 100%;
                height: 90px;
                margin-top: 35px;
                margin-bottom: 25px;
                display: flex;
                justify-content: center;

                img {
                    width: 90px;
                    height: 90px;
                    border-radius: 6px
                }
            }

            .name {
                font-size: 16px;
                color: #222222;
                text-align: center;
                line-height: 16px;
                margin-bottom: 10px;
                width: 100%;
            }

            .safe-code {
                font-family: PingFang-SC-Regular;
                font-size: 12px;
                color: #737373;
                letter-spacing: 0.08px;
                text-align: center;
                line-height: 12px;
                margin-bottom: 30px;
            }

            .shop-btns {
                display: flex;
                padding: 0 45px;
                justify-content: space-between;

                .btn {
                    width: 120px;
                    height: 34px;
                    box-sizing: border-box;
                    border: 1px solid #CCCCCC;
                    border-radius: 6px;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    font-size: 14px;
                    color: #555555;
                }

                .blue {
                    border: 1px solid #4A90FA;
                    color: #4A90FA
                }
            }
        }

        .pay-btn {
            width: 100%;
            height: 44px;
            line-height: 44px;
            text-align: center;
            border-radius: 8px;
            font-size: 17px;
            color: #FFFFFF;
            background: #4A90FA;
            transition: all 0.1s;

            &:active {
                opacity: 0.8;
            }
        }
    }
</style>
