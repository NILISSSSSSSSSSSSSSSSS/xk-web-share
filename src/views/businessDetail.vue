<template>
    <div class="welfGoodsDetails_wrapper">
        <!--<scroller :use-pullup="true" :lock-x="true" :use-pulldown="false">-->
        <div class="main ios-scroll iphonex-top" id="main">
            <header class="goods-header">
                <swiper :show-dots="false" :aspect-ratio="180/355" :auto="true" :loop="true" :interval="5000"
                        @on-index-change="indexChangeFun">
                    <swiper-item :key="$index" v-for="(item,$index) in getSafe(()=>shopDetail.mShop.pictures,[])">
                        <img class="img-object-fit-cover" style="width: 100%" :src="item" alt=""
                             @click="imgClick(shopDetail.mShop.pictures,$index)">
                    </swiper-item>
                </swiper>
                <span class="dots">
          {{banner.currentIndex}}/{{banner.imgs.length}}
        </span>
            </header>
            <article style="padding-bottom: 0" class="shop-title">
                <h3 class="title1">{{shopDetail.mShop.name}}</h3>
                <div class="raterBox">
                    <score :score="scoreAve.averageScore || 0" class="marginSet"></score>
                    <span class="evaluate"> ({{scoreAve.commentCount}}人评)</span>
                    <div class="rateCount"><span class="line"></span>
                        ￥{{shopDetail.mShop.avgConsumption | formatPrice}}/人
                    </div>
                </div>
                <div class="shop-discount">
                    <span class="discount">折</span>
                    <p class="discount-desc">店铺折扣:{{shopDetail.mShop.discount}}折</p>
                </div>
                <div class="shop-address-item">
                    <img class="dw-icon" src="../assets/image/addressLogo.png" alt="">
                    <div @click="showShopDetailAddress" class="address-detail">
                        <p>{{shopDetail.mShop.address}}</p>
                        <p class="distance">距您{{shopDetail.distance}}km</p>
                    </div>
                    <!-- <a class="shop-phone" :href="`tel:${shopDetail.mShop.fixedPhone}`" tag="div">
                        <img src="../assets/image/dianhua-icon.png" alt="">
                    </a> -->
                    <div class="shop-phone" @click="openConcatPhones">
                        <img src="../assets/image/dianhua-icon.png" alt="">
                    </div>
                    <!-- <div>
                        {{shopDetail.mShop.contactPhones}}
                    </div> -->
                </div>
                <!--<div class="addressBox" @click="showShopDetailAddress">
                    <img src="~assets/image/addressLogo.png"/>
                    <p>
                        <span class="address">{{shopDetail.mShop.address}}</span>
                        <span class="line"></span>
                        <span>距您{{shopDetail.distance}}km</span>
                    </p>
                </div>
                <a class="orderSeat" :href="`tel:${shopDetail.mShop.fixedPhone}`" tag="div">
                    <img src="~assets/image/tel.png" alt="">
                    订座
                </a>-->
            </article>
            <!--店铺活动-->
            <div class="shopAct" @click="openShopCoupon">
                <div>
                    <div>
                        店铺活动
                    </div>
                    <span class="manJian text-overflow" v-if="shopDetail.coupons && shopDetail.coupons.length">
                    {{(shopDetail.coupons && shopDetail.coupons.length)?shopDetail.coupons[0].couponName:''}}
                    &nbsp;&nbsp;&nbsp;&nbsp;
                     {{(shopDetail.coupons && shopDetail.coupons.length>1)?shopDetail.coupons[1].couponName:''}}
                </span>
                    <span v-else class="manJian text-overflow">
                    暂无活动
                </span>
                </div>
                <i class="icon-arrow g-s-arrow"></i>
            </div>
            <!--订座订座,现场购物-->
            <div class="orderWrapper">
                <template v-for="(item,$index) in shopDetail.goods">
                    <!-- 服务 -->
                    <div class="orderRow" v-if="serviceCategory(item.goodsTypeId)">
                        <div class="orderHeader">
                            {{item.goodsTypeId | computedGoodsTypeName}}
                            <p class="rightText">
                                <img src="~assets/image/checkTrue.png" alt="">
                                支持退
                            </p>
                        </div>
                        <div class="orderBody">
                            <div class="orderColumn" :key="goodsItem.goodsId"
                                 v-for="(goodsItem,$index) in item.shopGoods"
                                 @click="toGoodsDetail(item,goodsItem)">

                                <img :src="goodsItem.mainPic" alt="">
                                <div class="destription">
                                    <h3>{{goodsItem.goodsName}}</h3>
                                    <p><span
                                            class="activeRed">¥ {{goodsItem.discountPrice | formatPrice}}</span><span
                                            class="gray">{{goodsItem.originalPrice | formatPrice}}</span>
                                    </p>
                                    <p class="details text-overflow"
                                       v-if="isGoodsCategory">
                                        {{goodsItem.details}}
                                    </p>
                                </div>
                                <div class="status">
                                    <!-- 如果是服务类并且不是酒店，则出现弹框，否则就直接跳转页面 -->
                                    <div class="radiusButton" @click.stop="preOrder(item.goodsTypeId,goodsItem)">预订
                                    </div>
                                    <span>{{goodsItem.saleM}}人已购</span>
                                </div>
                            </div>
                        </div>
                        <div class="dian" @click="toShopGoodsList(item)">
                            <span></span>
                        </div>
                    </div>
                    <!-- 外卖 -->
                    <div class="orderRow" v-if="goodsCategory(item.goodsTypeId)">
                        <div class="orderHeader">
                            {{item.goodsTypeId | computedGoodsTypeName}}
                        </div>
                        <div class="orderBody orderBody2">
                            <div class="row">
                                <div class="column" v-for="(goodsItem,$index) in item.shopGoods"
                                     @click="toGoodsDetail(item,goodsItem)"
                                     :key="goodsItem.goodsId">
                                    <img :src="goodsItem.mainPic" alt="">
                                    <div class="columnBottom">
                                        <h3>{{goodsItem.goodsName}}</h3>
                                        <p><span
                                                class="activeRed">¥ {{goodsItem.discountPrice | formatPrice}}</span>
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="dian" @click="toShopGoodsList(item)">
                            进入购买
                        </div>
                    </div>
                </template>
                <!--店中店-->
                <template v-if="shopDetail.shops.length">
                    <div class="dian-in-dian">
                        <div class="orderBody" v-for="(item,$index) in shopDetail.shops" :key="$index">
                            <div class="orderColumn">
                                <img :src="item.shopPic" alt="">
                                <div class="destription">
                                    <h3>{{item.shopName}}</h3>
                                    <p class="activity">满399减40 抽奖活动中</p>
                                    <div class="score-wrapper">
                                        <score></score>
                                    </div>
                                </div>
                                <div class="status">
                                    <div class="radiusButton">进店</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </template>
            </div>

            <!-- 商户信息 -->
            <div class="orderRow">
                <div class="orderHeader">
                    商户信息
                </div>
                <div class="orderBody shopInfo">
                    <div class="row">
                        <h3>营业时间</h3>
                        <p class="" v-for="(item,$index) in week" :key="item.key">
                            <span>{{item.key | getWeekDay}}</span>
                            {{item.value.startAt}} 到 {{item.value.endAt}}
                        </p>
                        <h3>简介</h3>
                        <div style="color: #555555;font-size: 12px" v-html="shopDetail.mShop.description">
                        </div>
                        <div class="shop-description-imgs">
                            <img v-for="(item,$index) in getSafe(()=>shopDetail.mShop.pictures,[])"
                                 @click="imgClick(shopDetail.mShop.pictures,$index)"
                                 :src="item" :key="$index" alt="">
                        </div>
                    </div>
                </div>
            </div>
            <!-- 评价 -->
            <div class="orderRow">
                <comment>
                    <comment-header
                            :total="scoreAve.commentCount || 0"
                            :score="scoreAve.averageScore || 0"
                            show-type
                            :type-list="shopTypeList"
                            @type-item-click="commentTypeItemClick">
                    </comment-header>
                    <template v-if="comment.data.length">
                        <comment-item v-for="(item,$index) in comment.data"
                                      :comment="item"
                                      :key="$index"
                                      @img-click="imgClick">
                        </comment-item>
                    </template>
                    <div class="no-comment" v-else>暂无评价</div>
                </comment>
            </div>
        </div>
        <!-- 服务预订，不包括酒店 -->
        <popup v-model="isShow" postion="bottom" class="dialogBox" @touchmove.native.self.prevent>
            <div class="dialogWrapper">
                <!-- <div class="header">
                     <span>{{selectedSku.goodsName}}</span>

                     <i @click="closeSkuModel" class="icon-del"></i>
                 </div>-->
                <div class="info">
                    <div class="info-img">
                        <img class="block" :src="selectedSku.skuUrl" alt="">
                    </div>
                    <div class="info-detail">
                        <p class="info-name">{{selectedSku.goodsName}}</p>
                        <p class="info-price">
                            <span>价格:</span>
                            <span>¥{{selectedSku.discountPrice | formatPrice}}</span>
                        </p>
                    </div>
                </div>
                <div class="row" :key="item.key" v-for="(item,$index) in sku.skuAttr.attrList">
                    <p>{{item.name}}</p>
                    <div class="guiGeRow">
                        <label-radio v-model="item.code"
                                     ref="label"
                                     @updateSel="updateLabel"
                                     :attrValues="item.attrValues">

                        </label-radio>
                    </div>
                </div>
                <group class="group reserve-time" v-if="isServiceCategory">
                    <datetime v-model="orderForm.orderTime"
                              format="YYYY-MM-DD HH:mm"
                              :minute-list="['00', '15', '30', '45']" title="预约时间">
                    </datetime>
                </group>

                <div class="goods-num" v-if="isGoodsCategory">
                    <span class="til">购买数量</span>
                    <group>
                        <x-number v-model="goodsNumber"
                                  :min="1"
                                  button-style="round">
                        </x-number>
                    </group>
                </div>
                <!--  <div class="row">
                      <x-button type="primary" class="blueButton" @click.native="nextStep">下一步</x-button>
                  </div>-->
                <div class="submit-btn" @click="nextStep">
                    确认
                </div>
            </div>
            <i @click="closeSkuModel" class="icon-del"></i>
        </popup>
        <popup v-model="concactPhonesShow" position="bottom" max-height="40%">
            <group>
                <div class="phone-content">
                    <div v-for="phone in shopDetail.mShop.contactPhones" :key="phone">
                        <a class="shop-phone-item" :href="`tel:${phone}`" tag="div">{{phone}}</a>
                    </div>
                </div>
                <div class="close-phone" @click="closePhone">
                    取消
                </div>
            </group>
        </popup>
        <previewer :list="imgList" ref="previewer"></previewer>
        <show-more :url="nativeUrl"></show-more>
    </div>
</template>

<script>
    import {
        Swiper,
        SwiperItem,
        Popup,
        XNumber,
        Group,
        Cell,
        Datetime,
        XButton,
    } from 'vux'

    import ShowMore from "@/components/ShowMore"
    import imgPreview from '@/mixins/imgPreview'
    import {callNative, formatDate, dateLimit, getSafe} from '../util/publicMehotds'
    import Score from '@/components/SCORE.vue'
    import LabelRadio from "@/components/LabelRadio"
    import CommentHeader from "@/components/comment/CommentHeader";
    import CommentItem from "@/components/comment/CommentItem";
    import Comment from "@/components/comment/Comment";
    import Previewer from "@/components/comment/Preview";

    export default {
        mixins: [imgPreview],
        components: {
            Previewer,
            CommentHeader,
            Swiper,
            SwiperItem,
            Popup,
            XNumber,
            Group,
            Cell,
            Datetime,
            XButton,
            Score,
            LabelRadio,
            CommentItem,
            Comment,
            ShowMore,
        },
        data() {
            return {
                getSafe,
                nativeUrl: '',
                imgList: [],
                toBottm: false,
                shopId: '',   //店铺id
                total: 0,
                concactPhonesShow: false,
                banner: {
                    imgs: [],
                    currentIndex: 1,
                    totalNum: 1
                },
                spread: false,
                //评价相关
                page: {
                    page: 1,
                    limit: 3
                },
                scoreAve: {
                    commentCount: 0,
                    averageScore: 0
                },
                orderForm: {
                    orderTime: '2017-06-12 09:00'
                },
                isShow: false,  //显示规格选择框
                comment: {
                    data: [],
                    empty: false,
                    total: 0
                },
                shopTypeList: [], //店铺商品分类
                currentCommentTypeCode: '',    //当前评论分类
                shopIndustryCode: '',  //当前分类
                shopDetail: {
                    mShop: {
                        pictures: []
                    },
                    coupons: [],
                    goods: [],
                    shops: []

                }, //店铺详情
                // 商品规格
                sku: {
                    skuAttr: {}
                },
                selectedSku: {}, //选中的规格
                goodsTypeId: null, //选中商品类型
                goodsNumber: 1,      //商品数量
                week: [],         //营业时间
            }
        },
        created() {
            this.comment.data.forEach((item) => {
                this.$set(item, 'expand', false)
            });
            this.shopId = this.$route.query.shopId;
            this.nativeUrl = `bcmall/storedetail?storeId=${this.shopId}`;
            this.getShopDetail();
            this.getShopType();
            this.getCommentList();
            this.getScore();
        },
        mounted() {
        },

        methods: {
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

            //评论分类点击
            commentTypeItemClick(code) {
                if (code === this.currentCommentTypeCode) return;
                this.currentCommentTypeCode = code;
                this.shopTypeList.forEach((type) => {
                    if (type.code === code) {
                        this.$set(type, 'active', true);
                    } else {
                        this.$set(type, 'active', false);
                    }
                });
                this.getCommentList();
            },

            //前往店铺商品列表
            toShopGoodsList(item) {
                let goodsTypeId = item.goodsTypeId;
                let shopId = this.shopId;
                let goodsTypeName = item.goodsTypeName;
                let shopName = this.shopDetail.mShop.name;
                let params = {
                    goodsTypeId,
                    shopId,
                    goodsTypeName,
                    shopName
                };
                callNative('jsOpenShopGoodsList', JSON.stringify(params));
            },

            //前往商品详情
            toGoodsDetail(item, goodsItem) {
                this.$router.push({
                    path: "/businessGoodsDetail",
                    query: {
                        id: goodsItem.goodsId,
                        shopId: this.shopId,
                        goodsTypeId: item.goodsTypeId,
                    }
                });
            },

            //获取店铺分类评论
            getShopType() {
                let params = {
                    shopId: this.shopId
                };
                this.$http.get(this.$api.shopBcleGoodsCatalogShare, params, true)
                    .then((res) => {
                        this.shopTypeList = res;
                        this.shopTypeList.forEach((item, index) => {
                            this.$set(item, 'active', false)
                        })
                    })
                    .catch((err) => {
                        this.$vux.toast.text(err.message, "middle");
                    })
            },

            // 获取评价分数
            getScore() {
                let params = {
                    shopId: this.shopId,
                };
                this.$http.get(this.$api.stat4BcleShopShare, params, true)
                    .then(res => {
                        this.scoreAve = res;
                    })
                    .catch(err => {
                        this.$vux.toast.text(err.message, 'middle');
                    })
            },

            // 预订相关
            closeSkuModel() {
                this.isShow = false;
            },

            /*点击预定查规格*/
            preOrder(goodsTypeId, goodesItem) {
                return this.openAppTips();
                this.isShow = true;
                this.orderForm.orderTime = formatDate(new Date().getTime());
                this.goodsTypeId = goodsTypeId;
                this.selectedSku = {};
                this.selectedSku.skuUrl = goodesItem.mainPic;
                this.selectedSku.goodsName = goodesItem.goodsName;
                this.selectedSku.discountPrice = goodesItem.discountPrice;
                let params = {
                    goodsId: goodesItem.goodsId,
                    shopId: this.shopId
                };
                this.$http.get(this.$api.xkMShopGoodsSKUDetailShare, params, true)
                    .then((res) => {
                        this.sku = res;
                        for (let i = 0; i < this.sku.skuAttr.attrList.length; i++) {
                            let attrItem = this.sku.skuAttr.attrList[i];
                            this.$set(attrItem, "code", "");
                        }
                    })
                    .catch((err) => {
                        this.$vux.toast.text(err.message, 'middle');
                    })
            },

            nextStep() {
                let params = {
                    data: this.selectedSku,
                    goodsTypeId: this.goodsTypeId,
                    shopName: this.shopDetail.mShop.name
                };
                //服务类有预约时间 没有数量
                if (this.isServiceCategory) {
                    params.orderTime = new Date(this.orderForm.orderTime).getTime();
                }
                // 商品类 有数量 无预约时间
                if (this.isGoodsCategory) {
                    params.number = this.goodsNumber
                }
                if (!this.selectedSku.skuCode) {
                    this.$vux.toast.text("还未选择规格", 'middle');
                    return;
                }
                if (new Date().getTime() > new Date(this.orderForm.orderTime).getTime()) {
                    this.$vux.toast.text("预约时间不能小于当前时间", 'middle');
                    return;
                }
                //预订
                let limit = dateLimit(this.orderForm.orderTime, formatDate(new Date().getTime()));
                if (!limit && this.isServiceCategory) {
                    this.$vux.toast.text("服务预约只能在三天内", 'middle');
                    return;
                }
                callNative("jsOpenReserveGoods", JSON.stringify(params));
            },

            //店铺详情
            getShopDetail() {
                let params = {
                    shopId: this.shopId, //店铺id
                    lng: this.$route.query.lng,        //经纬度
                    lat: this.$route.query.lat            //经纬度
                };
                this.$vux.loading.show();
                this.$http.get(this.$api.xkMShopDetailShare, params, true)
                    .then(res => {
                        console.log("店铺详情", res);
                        this.shopDetail = res;
                        // this.shopDetail.mShop.contactPhones = ['18380428281','18980940623','13880626312','15882473645','18380428281','18980940623','13880626312','15882473645']
                        if (!this.shopDetail.mShop.pictures) {
                            this.shopDetail.mShop.pictures = []
                        } else {
                            [this.banner.imgs, this.banner.totalNum] = [this.shopDetail.mShop.pictures, this.shopDetail.mShop.pictures.length];
                        }
                        //商品种类排序,服务类在前,商品类在后
                        this.sortCategory();
                        //营业时间排序
                        this.sortWeek();
                    })
                    .catch(err => {

                    })
                    .finally(() => {
                        this.$vux.loading.hide();
                    })
            },
            //获取评价列表
            getCommentList() {
                let params = {
                    page: this.page.page,
                    limit: this.page.limit,
                    shopId: this.shopId,
                };
                if (this.currentCommentTypeCode) {
                    params = {
                        categoryCode: this.currentCommentTypeCode,
                        ...params
                    }
                }
                this.$vux.loading.show();
                this.$http.get(this.$api.bcleGoodsCommentListShare, params, true)
                    .then(res => {
                        if (res && res.data) {
                            res.data.forEach((item) => {
                                this.$set(item, "expand", false);
                            });
                            this.comment.total = res.total;
                            this.comment.empty = res.empty;
                            this.comment.data = res.data;
                        } else {
                            this.comment.empty = true;
                            this.comment.data = [];
                            this.comment.total = 0;
                        }
                    })
                    .catch(err => {
                        this.$vux.toast.text(err.message, 'middle');
                    })
                    .finally(() => {
                        this.$vux.loading.hide();
                    })
            },

            //获取选中的sku
            getSelectedSKU(code) {
                return this.sku.skuAttrValue.find((item) => {
                    return code === item.skuCode
                }) || {};
            },

            updateLabel() {
                let code = "";
                for (let i = 0; i < this.sku.skuAttr.attrList.length; i++) {
                    if (i === this.sku.skuAttr.attrList.length - 1) {
                        code += this.sku.skuAttr.attrList[i].code;
                    } else {
                        code += this.sku.skuAttr.attrList[i].code + "|";
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

            indexChangeFun(index) {
                this.banner.currentIndex = index + 1;
            },
            serviceCategory(goodsTypeId) {
                return (goodsTypeId == '1001' || goodsTypeId == '1003');
            },
            goodsCategory(goodsTypeId) {
                return (goodsTypeId == '1004' || goodsTypeId == '1002' || goodsTypeId == '1005');
            },
            //营业时间星期排序 周一 ==> 周日
            sortWeek() {
                const _this = this;
                let days = ['mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun'];
                let week = [];
                days.forEach((item) => {
                    let value = _this.shopDetail.mShop.businessTime[item];
                    if (value) {
                        week.push({
                            key: item,
                            value
                        })
                    }
                });
                this.week = week;
            },

            //商品类别排序
            sortCategory() {
                const _this = this;
                let goodsTypeId = ['1001', '1003', '1002', '1004', '1005'];
                let goods = [];
                goodsTypeId.forEach((id) => {
                    let goodsItem = _this.shopDetail.goods.find((item) => {
                        return item.goodsTypeId === id;
                    });
                    if (goodsItem) goods.push(goodsItem);
                });
                _this.shopDetail.goods = goods;
            },

            //跳转商家优惠券
            openShopCoupon() {
                let params = {
                    shopId: this.shopId
                };
                callNative('jsOpenShopCoupon', JSON.stringify(params));
            },

            //显示商家地址
            showShopDetailAddress() {
                this.$router.push({
                    path: '/shareMap',
                    query: {
                        lng: this.shopDetail.mShop.lng,
                        lat: this.shopDetail.mShop.lat,
                        shopName: this.shopDetail.mShop.name,
                        address: this.shopDetail.mShop.address,
                        tel: this.shopDetail.mShop.fixedPhone
                    }
                })
            },
            openConcatPhones() {
                this.concactPhonesShow = true
            },
            closePhone() {
                this.concactPhonesShow = false
            }
        },
        computed: {
            //服务分类可选预约时间
            isServiceCategory() {
                return this.goodsTypeId == '1001' || this.goodsTypeId == "1003";
            },
            //商品类可选数量
            isGoodsCategory() {
                return (this.goodsTypeId == '1002' || this.goodsTypeId == '1004');
            }
        },

        filters: {
            getWeekDay(val) {
                let day = '';
                switch (val) {
                    case "mon":
                        day = '周一';
                        break;
                    case "tue":
                        day = '周二';
                        break;
                    case "wed":
                        day = '周三';
                        break;
                    case "thu":
                        day = '周四';
                        break;
                    case "fri":
                        day = '周五';
                        break;
                    case "sat":
                        day = '周六';
                        break;
                    case "sun":
                        day = '周日';
                        break;
                }
                return day;
            },

            computedGoodsTypeName(goodsTypeId) {
                if (goodsTypeId == 1001) {
                    return "服务"
                }

                if (goodsTypeId == 1002) {
                    return '现场购买'
                }

                if (goodsTypeId == 1003) {
                    return '住宿';
                }
                if (goodsTypeId == 1004) {
                    return '外卖'
                }
                return '在线购物';
            }

        },
    }
</script>

<style lang="scss" type="text/scss">
    .welfGoodsDetails_wrapper {
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
        .phone-content {
            text-align: center;
            color: #4A90FA;
            padding-top: 10px;
        }
        .close-phone {
            width: 100%;
            height: 40px;
            line-height: 40px;
            color: #EE6161;
            text-align: center;
            font-size: 14px;
        }
        .shop-phone-item {
            display: block;
            height: 40px;
            line-height: 40px;
            text-decoration: none;
            color: #4A90FA;
        }
        // .line-item {
        //     margin: 0 auto;
        //     width: 90%;
        //     height: 1px;
        //     background-color: #e3e3e3;
        // }
    }

</style>
<style src="./businessDetail.scss" type="text/scss" scoped lang="scss"></style>
<style src="assets/sass/common/theme.scss" lang="scss" scoped type="text/scss"></style>
