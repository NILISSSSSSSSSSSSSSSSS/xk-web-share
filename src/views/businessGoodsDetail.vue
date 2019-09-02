* Created by zhangmei on 2018/11/19
*/
<template>
    <div class="service-detail">
        <div class="service-detail-main ios-scroll iphonex-top">
            <!--banner轮播图-->
            <div class="service-detail-header">
                <div class="swiper-header">
                    <swiper :show-dots="false" :aspect-ratio="180/355" :auto="true" :loop="true" :interval="5000"
                            @on-index-change="swiperIndexChange">
                        <swiper-item :key="index" v-for="(item,index) in goodsDetail.goods.showPics">
                            <img class="img-object-fit-cover"
                                 :src="item"
                                 alt=""
                                 @click="imgClick(goodsDetail.goods.showPics,index)">
                        </swiper-item>
                    </swiper>
                    <span class="dots">{{banner.currentIndex}}/{{goodsDetail.goods.showPics.length}}</span>
                </div>
                <div class="service-description">
                    <div class="service-name">
                        <p>{{goodsDetail.goods.goodsName}}</p>
                    </div>
                    <div class="service-price">
                        <p class="flex-box">
                            <span class="discount-price"
                                  :class="{'bgblue':goodsDetail.goods.discountType==='MEMBER_DISCOUNT'}">
                                {{goodsDetail.goods.discountType==='MEMBER_DISCOUNT'?'会员价':'折扣价'}}
                            </span>
                            <span style="font-weight: 700" class="rmb-symbol">¥</span>
                            <span style="font-weight: 700" class="price">{{goodsDetail.goods.discountPrice | formatPrice}}</span>
                            <del>{{goodsDetail.goods.originalPrice | formatPrice}}市场价</del>
                        </p>
                        <!--  <span style="font-weight: 700">¥</span>
                          <span style="font-weight: 700">{{goodsDetail.goods.discountPrice | formatPrice}}</span>
                          <del>{{goodsDetail.goods.originalPrice | formatPrice}}门市价</del>
                          <div v-if="goodsDetail.goods.discount" class="goods-discount">商品折扣：{{goodsDetail.goods.discount
                              / 100}}折
                          </div>-->
                    </div>
                    <div class="return-service bgfff flex-box">
                        <template v-if="!isTakeaway">
                            <span v-if="goodsDetail.goods.refunds==='RESERVATION_BEFORE_BYTIME'">提前{{Math.round((goodsDetail.goods.refundsTime/3600)*10)/10}}小时可退</span>
                            <span v-if="goodsDetail.goods.refunds==='CONSUME_BEFORE'">消费前可退</span>
                            <span v-if="goodsDetail.goods.refunds==='RESERVATION_BEFORE'">预约前随时退</span>
                            <span v-if="goodsDetail.goods.refunds==='NOT_REFUNDS'">不支持退</span>
                        </template>
                        <span>已售{{goodsDetail.goods.saleM}}</span>
                    </div>
                    <!--   <div class="service-address">
                         <span>
                         武侯区一周大道中段722号复城国际2层 | 距您2.1km
                         </span>
                       </div>-->
                </div>
            </div>

            <!--规格-->
            <!--  <div class="standard">
                  <span>规格 </span>
                  <span>200g</span>
              </div>-->

            <!--商品描述-->
            <goods-description
                    @img-click="imgClick"
                    :goods-name="goodsDetail.goods.goodsName"
                    :imgs="goodsDetail.goods.showPics"
                    :content="goodsDetail.goods.details">
            </goods-description>
            <!--评价-->
            <comment>
                <comment-header slot="header"
                                :total="goodsScore.commentCount"
                                :score="goodsScore.averageScore || 0">
                </comment-header>
                <template v-if="goodsComment.data.length">
                    <comment-item v-for="(item,$index) in goodsComment.data"
                                  :comment="item"
                                  :key="$index"
                                  @expand-click="(expand)=>{expandClick(item,expand)}"
                                  @img-click="imgClick">
                    </comment-item>
                </template>
                <div class="no-comment" v-else>
                    暂无评价
                </div>
            </comment>
        </div>
        <show-more :url="nativeUrl"></show-more>
        <previewer :list="imgList" ref="previewer"></previewer>
    </div>
</template>

<script>
    import Previewer from '../components/comment/Preview'
    import ShowMore from '../components/ShowMore'
    import imgPreview from '../mixins/imgPreview'
    import CommentHeader from '../components/comment/CommentHeader'
    import CommentItem from '../components/comment/CommentItem'
    import Comment from "../components/comment/Comment"
    import Score from '../components/SCORE'
    import LabelRadio from "../components/LabelRadio"
    import GoodsDescription from "../components/GoodsDescription"
    import {callNative, dateLimit, formatDate} from '../util/publicMehotds'
    import {
        Swiper,
        SwiperItem,
        Popup,
        XNumber,
        Group,
        Datetime,
        XButton,
        Confirm,
        TransferDomDirective as TransferDom
    } from 'vux'

    export default {
        mixins: [imgPreview],
        components: {
            GoodsDescription,
            Score,
            Swiper,
            SwiperItem,
            CommentHeader,
            CommentItem,
            Comment,
            Popup,
            XNumber,
            Group,
            Datetime,
            XButton,
            LabelRadio,
            Confirm,
            ShowMore,
            Previewer
        },
        data() {
            return {
                nativeUrl: '',
                imgList: [],
                //轮播图
                banner: {
                    currentIndex: 1
                },
                expand: false,
                info: {},
                goodsDetail: {  //商品详情
                    goods: {
                        showPics: []
                    }
                },
                goodsScore: {
                    commentCount: 0,
                    averageScore: 5
                },
                goodsComment: {
                    data: [],
                    empty: false,
                    total: 0
                }, //商品评价
                pagination: {      //评价分页
                    page: 1,
                    limit: 3
                },
                goodsTypeId: 0, //商品分类
                isShowShoppingCart: false, //显示购物车
                isShowConfirm: false,   //清空购物车弹出框
                isShow: false, //显示规格选择框
                selectedSku: {
                    skuUrl: '',
                    discountPrice: 0,
                    selectedSku: '',
                    goodsName: ''
                },
                orderForm: {
                    orderTime: '2017-06-12 :00'
                },
                goodsNumber: 1,//商品数量
                defaultSku: {   //规格默认显示信息
                    skuUrl: '',
                    discountPrice: 0,
                    selectedSku: '',
                    goodsName: ''
                },
                ids: {
                    shopId: '',
                    goodsTypeId: '',
                    id: ''
                },
                shoppingCart: [],
            }
        },

        created() {
            this.goodsTypeId = this.$route.query.goodsTypeId;
            this.ids.goodsTypeId = this.$route.query.goodsTypeId;
            this.ids.shopId = this.$route.query.shopId;
            this.ids.id = this.$route.query.id;
            this.nativeUrl = `bcmall/store/goodsdetail?storeId=${this.ids.shopId}&goodsId=${this.ids.id}`;
            this.getGoodsDetail();
            this.getGoodsComment();
            this.getGoodsScore()
        },

        mounted() {
            const _this = this;
            callNative('jsGetShoppingCartInfo', JSON.stringify(_this.ids), (res) => {
                _this.shoppingCart = JSON.parse(res);
            })
        },

        methods: {
            roundFun(value, n) {
                return Math.round(value * Math.pow(10, n)) / Math.pow(10, n);
            },
            imgClick(imgList, index) {
                let imgs = imgList.map(item => {
                    return {
                        msrc: item,
                        src: item
                    }
                });
                this.imgList = imgs;
                this.$nextTick(() => {
                    this.$refs.previewer.show(index)
                })
            },

            //获取商品详情
            getGoodsDetail() {
                const _this = this;
                let params = {
                    id: this.ids.id,
                    shopId: this.ids.shopId
                };
                this.$http.get(this.$api.xkBusinessGoodsDetailShare, params, true)
                    .then((res) => {
                        this.goodsDetail = res;
                        this.goodsDetail.goodsSkuAttrsVO.attrList.forEach((item) => {
                            _this.$set(item, 'code', "")
                        });
                        _this.defaultSku.discountPrice = _this.goodsDetail.goods.discountPrice;
                        _this.defaultSku.skuUrl = _this.goodsDetail.goods.mainPic;
                        _this.defaultSku.goodsName = _this.goodsDetail.goods.goodsName;
                        _this.selectedSku = _this.defaultSku;
                    })
                    .catch((err) => {
                    })
            },

            //获取商品综合评分
            getGoodsScore() {
                const _this = this;
                let params = {
                    goodsId: this.ids.id
                };
                this.$http.get(this.$api.stat4BcleGoodsCommentShare, params, true)
                    .then((res) => {
                        _this.goodsScore = res;
                    })
                    .catch(err => {

                    })
            },

            //获取商品评价
            getGoodsComment() {
                let params = {
                    goodsId: this.ids.id,
                    ...this.pagination,
                };
                this.$http.get(this.$api.bcleGoodsCommentListShare, params, true)
                    .then((res) => {
                        if (res.data && res.data.length) {
                            res.data.forEach((item) => {
                                this.$set(item, "expand", false);
                            });
                            this.goodsComment.total = res.total;
                            this.goodsComment.empty = res.empty;
                            this.goodsComment.data = res.data;
                        } else {
                            this.goodsComment.data = [];
                            this.goodsComment.total = 0;
                            this.goodsComment.empty = true;
                        }
                    })
                    .catch((err) => {
                    })
            },

            //banner轮播图index改变
            swiperIndexChange(currentIndex) {
                this.banner.currentIndex = currentIndex + 1;
            },

            //显示购物车
            showShoppingCart() {
                this.isShowShoppingCart = !this.isShowShoppingCart;
                this.isShow = false;
            },

            //点击立即预定
            reserveNow() {
                this.selectedSku = this.defaultSku;
                if (this.isGoodsCategory) {
                    this.goodsNumber = 1;
                    this.clearSelectedSku();
                } else {
                    this.orderForm.orderTime = formatDate(new Date().getTime());
                }
                this.isShow = true;
                this.isShowShoppingCart = false;
            },

            updateLabel() {
                let code = "";
                let attrList = this.goodsDetail.goodsSkuAttrsVO.attrList;
                for (let i = 0; i < attrList.length; i++) {
                    if (i === attrList.length - 1) {
                        code += attrList[i].code;
                    } else {
                        code += attrList.code + "|";
                    }
                }
                this.selectedSku = this.getSelectedSKU(code);
                this.$nextTick(() => {
                    let params = {
                        shareUrl: `http://${location.host}/share/#/goodsdetail?type=share&id=${this.$route.query.id}&client=${this.$route.query.client}&securityCode=${this.$route.query.securityCode}`,
                        param: this.goods,
                    };
                    callNative("pushSharePath", JSON.stringify(params));
                })
            },

            //获取选中规格的sku
            getSelectedSKU(code) {
                return this.goodsDetail.goodsSkuVOList.find((item) => {
                    return item.skuCode === code;
                }) || {};
            },

            // 预订相关
            closeSkuModel() {
                this.isShow = false;
            },

            //服务类下一步
            nextStep() {
                //酒店类:没有预约时间 数量
                let params = {
                    data: this.selectedSku,
                    goodsTypeId: this.goodsTypeId,
                };
                //服务类有预约时间 没有数量
                if (this.isServiceCategory) {
                    params.orderTime = this.orderForm.orderTime;
                }

                // 商品类 有数量 无预约时间
                if (this.isGoodsCategory) {
                    params.number = this.goodsNumber
                }

                if (new Date().getTime() > new Date(this.orderForm.orderTime).getTime()) {
                    this.$vux.toast.text("预约时间不能小于当前时间", 'middle');
                    return;
                }

                let limit = dateLimit(this.orderForm.orderTime, formatDate(new Date().getTime()));
                if (!limit) {
                    this.$vux.toast.text("预约服务只能在三天内", 'middle');
                    return;
                }

                if (this.selectedSku.skuCode) {
                    callNative("jsOpenReserveGoods", JSON.stringify(params));
                } else {
                    this.$vux.toast.text("请选择规格", 'middle');
                }
            },

            //购物车添加商品
            addGoods() {
                let selectedSku = JSON.stringify(this.selectedSku);
                selectedSku = JSON.parse(selectedSku);
                if (!!!selectedSku.skuCode) {
                    this.$vux.toast.text("请选择规格", 'middle');
                    return;
                }
                selectedSku.goodsNumber = this.goodsNumber;
                this.shoppingCart.push(selectedSku);
                this.isShow = false;
                this.goodsNumber = 1;
                this.clearSelectedSku();
            },

            //清空已选择sku
            clearSelectedSku() {
                const _this = this;
                this.selectedSku = this.defaultSku;
                this.goodsDetail.goodsSkuAttrsVO.attrList.forEach((item) => {
                    item.code = '';
                    item.attrValues.forEach((value) => {
                        _this.$set(value, "isActive", false);
                    })
                })
            },

            //购物车列表商品递减
            decrementGoodsNumber(item) {
                if (item.goodsNumber > 1) item.goodsNumber -= 1;
            },

            //购物车列表商品递增
            incrementGoodsNumber(item) {
                item.goodsNumber += 1;
            },

            //清空购物车
            clearShoppingCart() {
                if (this.shoppingCart.length) {
                    this.isShowConfirm = true;
                }
            },

            //清空购物车
            confirmClearShoppingCart() {
                this.shoppingCart = [];
            },
            //去结算
            toSettlement() {
                callNative('jsOpenGoodsSettlement', JSON.stringify(this.shoppingCart));
            },

            expandClick(item, expand) {
                item.expand = !expand;
            }
        },

        computed: {

            //商品类可选数量
            isGoodsCategory() {
                return (this.goodsTypeId == '1002' || this.goodsTypeId == '1004');
            },

            //服务分类可选预约时间
            isServiceCategory() {
                return this.goodsTypeId == '1001' || this.goodsTypeId == '1003';
            },

            isTakeaway() {
                return this.goodsTypeId == '1004'
            },

            //商品总价
            totalPrice() {
                let price = 0;
                this.shoppingCart.forEach((item) => {
                    price += (Number(item.discountPrice) * Number(item.goodsNumber)) / 100;
                });
                return price.toFixed(2);
            }
        },
        directives: {
            TransferDom
        }
    }

</script>

<style lang="scss">
    .service-detail {
        .swiper-header {
            .vux-swiper {
                height: 180px;
                width: 355px;
                }
            .vux-swiper-item {
                height: 180px;
                width: 355px;
                border-top-left-radius: 8px;
                border-top-right-radius: 8px;
                img {
                    height: 180px;
                    width: 355px;
                    border-top-left-radius: 8px;
                    border-top-right-radius: 8px;
                    }
                }
            }
        .reserve-time {
            .weui-cells {
                a {
                    padding-top: 13px;
                    padding-bottom: 13px;
                    }
                }
            }
        .goods-num {
            display: flex;
            height: 50px;
            padding: 0 15px;
            align-items: center;
            justify-content: space-between;
            & > span {
                font-size: 14px;
                color: #777777;
                letter-spacing: 0;
                line-height: 14px;
                }
            .weui-cells.vux-no-group-title {
                margin-top: 0;
                border: none;
                padding: 0;
                &::after {
                    border: none;
                    }
                &::before {
                    border: none;
                    }
                }
            .weui-cell {
                padding: 0;
                input {
                    font-size: 14px;
                    color: #222222;
                    letter-spacing: 0.13px;
                    }

                .vux-number-selector {
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    border-color: #444444;
                    svg {
                        height: 12px;
                        width: 12px;
                        fill: #444444;
                        }
                    }
                .vux-number-selector-plus {
                    border-color: #4A90FA;
                    svg {
                        fill: #4A90FA;
                        }
                    }
                }
            }
        /*底部确认按钮*/
        .submit-btn {
            height: 44px;
            background: #4A90FA;
            box-shadow: 0 0 4px 0 rgba(215, 215, 215, 0.50);
            line-height: 44px;
            text-align: center;
            color: #FFFFFF;
            }
        }
</style>
<style lang="scss" scoped type="text/scss">
    .service-detail {
        height: 100%;
        position: relative;
        .service-detail-main {
            padding: 10px 10px 100px;
            background: #F1F1F1;
            .service-detail-header {
                box-shadow: 0 0 4px 0 rgba(215, 215, 215, 0.50);
                border-bottom-right-radius: 8px;
                border-bottom-left-radius: 8px;
                overflow: hidden;
                .swiper-header {
                    position: relative;
                    height: 180px;
                    width: 355px;
                    .dots {
                        position: absolute;
                        width: 35px;
                        height: 18px;
                        line-height: 18px;
                        font-size: 12px;
                        color: #FFFFFF;;
                        background-color: rgba(0, 0, 0, .5);
                        border-radius: 10px;
                        bottom: 10px;
                        right: 10px;
                        text-align: center;
                        }
                    }
                }

            .service-description {
                border-bottom-left-radius: 8px;
                border-bottom-right-radius: 8px;
                background: #FFFFFF;
                .service-name {
                    font-size: 17px;
                    color: #222222;
                    line-height: 36px;
                    padding: 0 15px;
                    }
                .service-price {
                    padding: 0 15px 2px;
                    border-bottom: 1px solid #F4F4F4;
                    p {
                        display: flex;
                        color: #EE6161;
                        justify-content: flex-start;
                        .discount-price {
                            width: 36px;
                            height: 16px;
                            background: rgba(238, 97, 97, 1);
                            border-radius: 2px;
                            line-height: 16px;
                            text-align: center;
                            font-size: 10px;
                            color: #FFFFFF;
                            background: #EE6161;
                            &.bgblue {
                                background: #4A90FA;
                                }
                            }
                        .rmb-symbol {
                            font-size: 14px;
                            margin-left: 5px;
                            }
                        .price {
                            font-size: 21px;
                            }
                        del {
                            color: #999999;
                            font-size: 12px;
                            margin-left: 10px;
                            }
                        }
                    .goods-discount {
                        min-width: 85px;
                        height: 16px;
                        line-height: 16px;
                        text-align: center;
                        border: 1px solid #FFBABA;
                        border-radius: 2px;
                        margin-left: 25px;
                        padding: 0 5px;
                        font-size: 10px;
                        color: #EE6161;
                        }
                    }
                .return-service {
                    height: 32px;
                    padding: 0 15px;
                    color: #999999;
                    span {
                        padding-left: 17px;
                        font-size: 12px;
                        line-height: 12px;
                        height: 12px;
                        width: 50%;
                        text-align: center;
                        flex-grow: 1;
                        }
                    span:first-child {
                        margin-right: 40px;
                        }
                    }
                .service-address {
                    display: flex;
                    padding: 15px 15px 15px 36px;
                    background: no-repeat url("~assets/image/addressLogo.png") 15px 15px / 11px 13px;
                    span {
                        font-size: 12px;
                        color: #555555;
                        line-height: 12px;
                        display: block;
                        }
                    }
                }

            .standard {
                display: flex;
                justify-content: space-between;
                height: 40px;
                align-items: center;
                border-radius: 8px;
                box-shadow: rgba(215, 215, 215, 0.5) 0px 0px 4px 0px;
                background: #FFFFFF;
                margin-top: 10px;
                padding: 0 15px;
                }
            }
        /*底部操作栏*/
        /*结算栏*/
        .pay-bar {
            height: 50px;
            width: 100%;
            position: absolute;
            bottom: 0;
            left: 0;
            background: #FFFFFF;
            z-index: 10;
            display: flex;
            align-items: center;
            justify-content: space-between;
            &.index-top {
                z-index: 502;
                }
            .bar-left {
                width: 165px;
                height: 50px;
                display: flex;
                align-items: center;
                padding-left: 20px;
                .cart {
                    width: 20px;
                    height: 20px;
                    background: url("../assets/image/shopping-cart.png") no-repeat 0 0 / 100%;
                    position: relative;
                    span.badge {
                        position: absolute;
                        width: 16px;
                        height: 16px;
                        border-radius: 50%;
                        background: #EE6161;
                        color: #FFFFFF;
                        line-height: 16px;
                        text-align: center;
                        font-size: 10px;
                        right: -8px;
                        top: -8px;
                        }
                    }
                .price {
                    margin-left: 15px;
                    color: #EE6161;
                    font-size: 17px;
                    line-height: 20px;
                    }
                }
            .cancel, .pay-for {
                width: 105px;
                line-height: 50px;
                text-align: center;
                color: #FFFFFF;
                font-size: 17px;
                }
            .cancel {
                background: #EE6161;
                }
            .pay-for {
                background: #4A90FA;
                }
            }
        /*底部操作栏*/
        .bottom-action {
            height: 50px;
            position: absolute;
            width: 100%;
            bottom: 0;
            left: 0;
            background: #FFFFFF;
            div {
                line-height: 50px;
                height: 50px;
                width: 105px;
                text-align: center;
                color: #FFFFFF;
                float: right;
                }
            div:first-child {
                background: #EE6161;
                }
            div:last-child {
                background: #4A90FA;
                }
            }
        .shopping-cart {
            padding-bottom: 50px;
            background: #FFFFFF;
            .shopping-cart-title {
                display: flex;
                height: 50px;
                padding: 0 15px;
                justify-content: space-between;
                border-bottom: 1px #F1F1F1 solid;
                align-items: center;
                & > div:first-child {
                    font-size: 17px;
                    color: #000000;
                    text-align: center;
                    line-height: 17px;
                    }
                & > div:last-child {
                    font-size: 12px;
                    color: #777777;
                    line-height: 12px;
                    display: flex;
                    align-items: center;
                    span {
                        display: block;
                        }
                    span:first-child {
                        width: 12px;
                        height: 14px;
                        background: url("../assets/image/remove.png") no-repeat 0 0 / 100%;
                        margin-right: 5px;
                        }
                    }
                }
            .shopping-cart-list {
                ul {
                    li {
                        height: 50px;
                        border-bottom: 1px #F1F1F1 solid;
                        padding: 0 15px;
                        display: flex;
                        justify-content: space-between;
                        align-items: center;
                        div:first-child {
                            font-size: 14px;
                            color: #222222;
                            line-height: 14px;
                            }
                        div:nth-of-type(2) {
                            font-size: 14px;
                            color: #EE6161;
                            letter-spacing: 0.13px;
                            line-height: 14px;
                            }
                        div:last-child {
                            display: flex;
                            justify-content: space-between;
                            align-items: center;
                            span {
                                display: block;
                                }
                            span:first-child, span:last-child {
                                width: 18px;
                                height: 18px;
                                background: no-repeat url("../assets/image/increment.png") 0 0 / 100%;
                                }
                            span:first-child {
                                background-image: url("../assets/image/decrement.png");
                                }
                            span:nth-of-type(2) {
                                width: 36px;
                                text-align: center;
                                font-size: 14px;
                                color: #222222;
                                }
                            }
                        }
                    }
                }
            }

        /*选规格*/

        .dialogBox {
            padding-top: 15px;
            background: #FFFFFF;
            .dialogWrapper {
                padding-bottom: 0;
                }
            .icon-del {
                position: absolute;
                right: 20px;
                top: 20px;
                font-size: 18px;
                }
            .info {
                display: flex;
                padding: 0 15px;
                .info-img {
                    width: 80px;
                    height: 80px;
                    img {
                        width: 100%;
                        height: 100%;
                        }
                    }
                .info-detail {
                    flex: 1;
                    padding-left: 10px;
                    padding-right: 25px;
                    padding-top: 5px;
                    .ino-name {
                        font-size: 14px;
                        height: 14px;
                        color: #222222;
                        letter-spacing: 0.1px;
                        line-height: 14px;
                        }
                    .info-price {
                        margin-top: 15px;
                        font-size: 12px;
                        color: #777777;
                        letter-spacing: 0.17px;
                        line-height: 12px;
                        display: flex;
                        span:last-child {
                            color: #EE6161;
                            margin-left: 10px;
                            }
                        }
                    }
                }

            .row {
                padding: 10px 15px;
                .guiGeRow {
                    display: flex;
                    margin-top: 7px;
                    flex-wrap: wrap;
                    .radiusButton {
                        padding: 4px 0;
                        margin-right: 12px;
                        color: gray;
                        border-color: gainsboro;
                        margin-bottom: 10px;
                        }
                    .blue {
                        border: 1px solid #4A90FA;
                        color: #4A90FA;
                        }
                    }
                }

            }

        }
</style>
