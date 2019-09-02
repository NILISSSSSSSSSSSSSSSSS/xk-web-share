/**
* Created by zhangmei on 2019/7/31
*/
<template>
    <div class="business-detail-revision bgfff">
        <!--
        header 导航栏
        -->
        <div class="header-nav">
            <transition name="fade">
                <div class="action-bar flex-box" v-show="showNavBar">
                    <div class="back-icon action-icon">
                    </div>
                    <div class="action-share flex-box">
                        <div class="collection action-icon"></div>
                        <div class="transport action-icon"></div>
                    </div>
                </div>
            </transition>
            <!--
            店铺标题
            -->
            <transition name="fade">
                <div class="action-title flex-box" ref="actionBar" v-show="!showNavBar">
                    <div class="back-icon">
                        <span></span>
                    </div>
                    <div class="shop-name text-overflow">
                        <span>{{shopDetail.mShop.name}}</span>
                    </div>
                    <div class="action-share">
                        <div class="transport action-icon"></div>
                        <div class="collection action-icon"></div>
                    </div>
                </div>
            </transition>
            <div class="fast-nav-wrapper" v-show="showFastNav">
                <div class="flag" :style="{'transform':transform}">
                </div>
                <div class="fast-nav head flex-box" ref="fastNav">
                    <div class="nav-item" :key="item.index"
                         @click="fastNavClick(item.index)"
                         :class="{'active':item.active}"
                         v-for="item in fastNavIndex">
                        <p>
                            {{item.name}}
                        </p>
                    </div>
                </div>
            </div>
        </div>

        <div class="ios-scroll iphonex-top">
            <div class="page-wrapper">
                <!--
                banner
                -->
                <div class="discount">
                    <div class="banner" v-if="getSafe(()=>shopDetail.mShop.rollingPics.length,0)">
                        <swiper :show-dots="false"
                                :loop="true"
                                :auto="true"
                                :interval="5000"
                                @on-index-change="rollingPicsChangeFun"
                                :aspect-ratio="255/375">
                            <swiper-item v-for="(item,$index) in shopDetail.mShop.rollingPics" :key="$index">
                                <img :src="item.url"
                                     @click="rollingPicsClick(shopDetail.mShop.rollingPics,$index)"
                                     class="block img-object-fit-cover"
                                     alt="">
                            </swiper-item>
                        </swiper>
                        <div class="dots flex-box">
                            <span>{{rollingPicIndex}}/{{getSafe(()=>shopDetail.mShop.rollingPics.length,0)}}</span>
                        </div>
                    </div>

                    <!--
                    店铺基本信息
                    -->
                    <div class="shop-basic-info">
                        <div class="shop-basic flex-box">
                            <div class="shop-name text-overflow">
                                <h4 class="text-overflow">
                                    {{shopDetail.mShop.name}}
                                </h4>
                                <p class="shop-status">
                                    <template v-if="shopDetail.mShop.isAllowBusiness">
                                        {{shopDetail.mShop.inBusinessing?'营业中':'休息中'}}
                                    </template>
                                    <template v-else>
                                        线上开业在即
                                    </template>
                                    <template v-if="!shopDetail.mShop.isAllowBusiness">
                                        &nbsp;|&nbsp;{{getSafe(()=>shopDetail.mShop.newBusinessTime.startAt)}}-{{getSafe(()=>shopDetail.mShop.newBusinessTime.endAt)}}
                                    </template>
                                </p>
                                <!--
                                                                <p class="shop-status">
                                                                    {{shopDetail.mShop.inBusinessing?'营业中':'休息中'}} |
                                                                    {{getSafe(()=>shopDetail.mShop.newBusinessTime.startAt,'00:00')}}-{{getSafe(()=>shopDetail.mShop.newBusinessTime.endtAt,'00:00')}}
                                                                </p>
                                -->
                                <div class="shop-score">
                                    <score :score="scoreAve.averageScore" :is-show-num="false"></score>
                                    <span> {{scoreAve.averageScore}}分({{scoreAve.commentCount}}评价)</span>
                                </div>
                                <p class="deep-discount" v-if="shopDetail.mShop.discountType!=='THE_CUSTOM_DISCOUNT'">
                                    享店铺最低折扣价{{shopDetail.mShop.discount}}折
                                </p>
                                <p class="deep-discount" v-else>
                                    享会员优惠
                                </p>
                            </div>
                            <div class="shop-cover flex-box" @click="imgClick([shopDetail.mShop.logo],0)">
                                <img :src="shopDetail.mShop.logo" class="img-object-fit-cover block" alt="">
                            </div>
                        </div>
                        <div class="shop-distance" @click="showShopDetailAddress">
                            <p>{{shopDetail.mShop.address}}
                                <span v-if="shopDetail.distance>1">距您{{shopDetail.distance}}km</span>
                                <span v-else>距您{{shopDetail.distance*1000}}m</span>
                            </p>
                            <!-- <p>距您{{shopDetail.distance}}km</p>-->
                        </div>
                    </div>
                </div>

                <div class="fast-nav flex-box" ref="fastNavStatic">
                    <div class="nav-item no-flag" @click="fastNavClick(item.index)" :key="item.index"
                         :class="{'active':item.active}"
                         v-for="item in fastNavIndex">
                        <p>
                            {{item.name}}
                        </p>
                    </div>
                </div>

                <!--
                优惠券信息
                -->
                <div class="shop-coupon">
                    <div class="get-coupon" ref="discount" v-if="shopDetail.couponsSize">
                        <custom-cell>
                            <p class="label" slot="left">
                                <span>惠</span>
                                您有{{shopDetail.couponsSize}}个优惠可以领取
                            </p>
                            <span class="right-content" @click="wakeNative" slot="right">
                            立即领取
                        </span>
                        </custom-cell>
                    </div>

                    <div class="activity-banner" ref="active" v-if="getSafe(()=>shopDetail.activities.length,0)">
                        <swiper :show-dots="false"
                                :loop="true"
                                :aspect-ratio="114/345">
                            <swiper-item v-for="(item,$index) in shopDetail.activities||[]" :key="$index">
                                <div class="activity-des">
                                    <p class="activity-name">
                                        {{item.name}}
                                    </p>
                                    <p class="activity-price">
                                        奖品价值
                                        <span>
                                            ￥{{item.activityRule.price|formatPrice}}
                                        </span>
                                    </p>
                                    <p class="activity-expire">
                                        活动时间: {{item.activityRule.startTime|formatTime}} 至
                                        {{item.activityRule.endTime|formatTime}}
                                    </p>
                                    <p class="activity-type">
                                        {{computedActivityType(item.activityType)}}
                                    </p>
                                </div>
                            </swiper-item>
                        </swiper>
                    </div>
                </div>
                <!--
                热销商品
                -->
                <div ref="popular" class="popular-product" v-if="getSafe(()=>catalogAliasList.length,0)">
                    <strong>
                        热销
                    </strong>
                    <div class="product-types">
                        <ul class="flex-box">
                            <li v-for="item in catalogAliasList" @click="goodsTypeClick(item)"
                                class="flex-box"
                                :class="{'active':currentGoodsTypeCode===item.levelOneCode}">
                                <img :src="getGoodsTypeIcon(item)" class="type-icon" alt="">
                                <p>
                                    {{item.alias}}
                                </p>
                            </li>
                        </ul>
                    </div>
                    <div class="product-list">
                        <ul>
                            <li class="flex-box" v-for="(item,index) in goodsList" :key="index">
                                <div class="flex-box product-action">
                                    <div class="product-cover">
                                        <img :src="item.mainPic" class="img-object-fit-cover" alt="">
                                    </div>
                                    <div class="product-info">
                                        <p class="product-name text-overflow">
                                            {{item.goodsName}}
                                        </p>
                                        <p class="product-price flex-box">
                                            ￥{{item.discountPrice|formatPrice}}
                                            <span>
                                               {{decimalPoint($math.divide(item.discountPrice,item.originalPrice)*10,2)}}折
                                            </span>
                                            <del>
                                                {{item.originalPrice|formatPrice}}
                                            </del>
                                        </p>
                                    </div>
                                </div>
                                <div class="buy-product flex-box">
                                    <div class="order-btn" @click="wakeNative">
                                        <span>购买</span>
                                    </div>
                                    <p>{{item.saleM}}人已购</p>
                                </div>
                            </li>
                        </ul>
                    </div>
                    <div class="show-more-product" v-if="getSafe(goodsList.length,0)>2">
                        <custom-cell>
                        <span slot="left">
                        </span>
                            <span slot="right" @click="wakeNative">查看更多</span>
                        </custom-cell>
                    </div>
                </div>
                <!--
                店铺详情
                -->
                <div class="shop-detail" ref="shop">
                    <strong>
                        店铺
                    </strong>
                    <p class="shop-des">
                        {{shopDetail.mShop.description}}
                    </p>
                    <div class="shop-reserve">
                        <dl>
                            <div class="flex-box shop-phone">
                                <dt>联系电话</dt>
                                <dd>
                                    <p v-for="item in shopDetail.mShop.contactPhones">
                                        {{item}}
                                    </p>
                                </dd>
                            </div>
                            <div class="flex-box">
                                <dt>人均消费</dt>
                                <dd>
                                    {{shopDetail.mShop.avgConsumption|formatPrice}}元/人
                                </dd>
                            </div>
                            <div class="flex-box shop-discount"
                                 v-if="shopDetail.mShop.discountType!=='THE_CUSTOM_DISCOUNT'">
                                <dt>优惠方式</dt>
                                <dd>享店铺最低折扣{{shopDetail.mShop.discount}}折</dd>
                            </div>
                            <div class="flex-box shop-discount" v-else>
                                <dt>优惠方式</dt>
                                <dd>享会员优惠</dd>
                            </div>
                        </dl>
                        <div class="phone-icon" @click="openConcatPhones">
                        </div>
                    </div>
                    <div class="shop-images">
                        <template v-if="getSafe(()=>shopDetail.mShop.pictures.length,0)">
                            <strong>
                                店铺照片
                            </strong>
                            <div class="banner">
                                <swiper :show-dots="false"
                                        :loop="true"
                                        :interval="4000"
                                        :auto="true"
                                        @on-index-change="indexChangeFun"
                                        :aspect-ratio="160/345">
                                    <swiper-item v-for="(item,$index) in shopDetail.mShop.pictures" :key="$index">
                                        <img :src="item"
                                             @click="imgClick(shopDetail.mShop.pictures,$index)"
                                             class="block img-object-fit-cover"
                                             alt="">
                                    </swiper-item>
                                </swiper>
                                <div class="dots flex-box">
                                    <span>{{banner.currentIndex}}/{{getSafe(()=>shopDetail.mShop.pictures.length,0)}}</span>
                                </div>
                            </div>
                        </template>

                        <custom-cell v-if="getSafe(()=>shopDetail.mShop.qualifiedPictures.length,0)">
                            <span slot="left"></span>
                            <span slot="right">
                               查看店铺相关资质
                            </span>
                        </custom-cell>
                    </div>
                </div>
                <!--
                评价
                -->
                <div class="comment" ref="comment">
                    <comment>
                        <comment-header
                                :total="scoreAve.commentCount || 0"
                                :score="scoreAve.averageScore || 0"
                                slot="header"></comment-header>
                        <comment-item v-for="(item,$index) in comment.data"
                                      :comment="item"
                                      @img-click="imgClick"
                                      :key="$index">
                        </comment-item>
                    </comment>
                </div>
            </div>
        </div>
        <!-- <div class="shop-closed" v-if="!shopDetail.mShop.inBusinessing">
             本店休息中
         </div>-->
        <show-more>
        </show-more>
        <previewer :list="imgList" ref="previewer"></previewer>
        <popup v-model="concactPhonesShow" position="bottom" max-height="40%">
            <group>
                <div class="phone-content">
                    <div v-for="phone in shopDetail.mShop.contactPhones">
                        <a class="shop-phone-item" v-if="phone" :href="`tel:${phone}`" tag="div">{{phone}}</a>
                    </div>
                </div>
                <div class="close-phone" @click="closePhone">
                    取消
                </div>
            </group>
        </popup>

    </div>
</template>

<script>
    import CommentHeader from '@/components/comment/CommentHeader'
    import CommentItem from '@/components/comment/CommentItem'
    import Comment from "@/components/comment/Comment"
    import {Swiper, SwiperItem, Group, Popup} from 'vux'
    import {throttle, getSafe, wakeNative} from "@/util/publicMehotds"
    import CustomCell from '@/components/CustomCell'
    import ShowMore from '@/components/ShowMore'
    import Score from '@/components/SCORE'
    import Previewer from "@/components/comment/Preview";


    const TAKE_OUT_ICON = require("assets/image/business-detail-revision/take-out-icon.png");
    const SERVICE_ICON = require("assets/image/business-detail-revision/service-icon.png");
    const STAY_ICON = require("assets/image/business-detail-revision/stay-icon.png");
    const LOCAL_BUY_ICON = require("assets/image/business-detail-revision/local-buy-icon.png");
    const LINE_ICON = require("assets/image/business-detail-revision/line-buy-icon.png");
    const DISCOUNT = 'discount';
    const ACTIVE = 'active';
    const POPULAR = 'popular';
    const SHOP = 'shop';
    const COMMENT = 'comment';
    export default {
        name: "businessDetailRevision",
        componentName: "businessDetailRevision",
        components: {
            CommentHeader,
            CommentItem,
            Comment,
            Swiper,
            Score,
            SwiperItem,
            CustomCell,
            Previewer,
            ShowMore,
            Group,
            Popup
        },
        data() {
            return {
                getSafe,
                TAKE_OUT_ICON: TAKE_OUT_ICON,
                fastNavIndex: [
                    {
                        name: "优惠",
                        index: DISCOUNT,
                        active: true,
                    }, {
                        name: "活动",
                        index: ACTIVE,
                        active: false,
                    }, {
                        name: "热销",
                        index: POPULAR,
                        active: false,
                    }, {
                        name: "店铺",
                        index: SHOP,
                        active: false,
                    }, {
                        name: "评价",
                        index: COMMENT,
                        active: false,
                    },
                ],
                concactPhonesShow: false,
                productTypes: [  //商品分类
                    {
                        name: '酒店',
                        icon: STAY_ICON,
                        key: 'hotel',
                        active: true
                    },
                    {
                        name: '服务',
                        icon: SERVICE_ICON,
                        key: 'service',
                        active: false
                    }, {
                        name: '外卖',
                        icon: TAKE_OUT_ICON,
                        key: 'hotel',
                        active: false
                    }, {
                        name: '现场消费',
                        icon: LOCAL_BUY_ICON,
                        key: 'hotel',
                        active: false
                    }, {
                        name: '在线购物',
                        icon: LINE_ICON,
                        key: 'hotel',
                        active: false
                    }
                ],
                imgList: [],
                currentGoodsTypeCode: '', //当前商品分类code
                bannerList: [
                    "https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=3110135022,2684976613&fm=26&gp=0.jpg",
                    "https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=3110135022,2684976613&fm=26&gp=0.jpg",
                    "https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=3110135022,2684976613&fm=26&gp=0.jpg"
                ],
                currentNavIndex: 'discount',
                showFastNav: false, //快捷导航栏
                showActionBar: false,   //分享操作栏
                showNavBar: true,   //透明返回栏
                scrollElementTarget: null, //滚动元素
                actionBarHeight: 0,
                fastNavHeight: 0,
                shopId: '', //店铺id
                shopDetail: {//店铺详情
                    catalogAliasList: [],
                    mShop: {
                        pictures: []
                    },
                    coupons: [],
                    goods: [],
                    shops: []
                },
                catalogAliasList: [],
                banner: {   //顶部banner
                    imgs: [],
                    currentIndex: 1,
                    totalNum: 1
                },
                scoreAve: {  //店铺评分
                    commentCount: 0,
                    averageScore: 0
                },
                commentPage: {  //评价请求参数
                    page: 1,
                    limit: 3
                },
                comment: { //评价列表
                    data: [],
                    total: 0
                },
                rollingPicIndex: 1,
                activeFastNavItem: null,
                translate: 15,
                currentTypeCode: '',
            }
        },
        created() {
            this.shopId = this.$route.query.shopId;
        },
        mounted() {
            this.initScrollHandle();
            this.getShopDetail();
            this.getScore();
            this.getCommentList();
        },
        methods: {
            getGoodsTypeIcon(item) {
                let code = item.levelOneCode;
                if (code == 1001) {
                    return SERVICE_ICON;
                }

                if (code == 1002) {
                    return LOCAL_BUY_ICON;
                }
                if (code == 1003) {
                    return STAY_ICON;
                }
                if (code == 1004) {
                    return TAKE_OUT_ICON;
                }
                if (code == 1005) {
                    return LINE_ICON
                }
            },
            openConcatPhones() {
                this.concactPhonesShow = true
            },
            closePhone() {
                this.concactPhonesShow = false
            },
            /**
             *唤醒app
             * */
            wakeNative() {
                wakeNative.call(this);
            },

            /**
             * 图片预览
             * */
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
            rollingPicsClick(imgs, index) {
                this.imgList = imgs.map(item => {
                    return {
                        msrc: item.url,
                        src: item.url
                    }
                });
                this.$nextTick(() => {
                    this.$refs.previewer.show(index)
                })
            },


            //显示商家地址
            showShopDetailAddress() {
                this.$router.push({
                    path: '/shareMap',
                    query: {
                        lng: this.shopDetail.mShop.lng,
                        lat: this.shopDetail.mShop.lat,
                        shopName: encodeURIComponent(this.shopDetail.mShop.name),
                        address: encodeURIComponent(this.shopDetail.mShop.address),
                        tel: getSafe(() => this.shopDetail.mShop.contactPhones[0], null) || decodeURIComponent('无')
                    }
                })
            },


            /**
             * 商品类型点击
             * */
            goodsTypeClick(item) {
                this.currentGoodsTypeCode = item.levelOneCode;
            },
            indexChangeFun(index) {
                this.banner.currentIndex = index + 1;
            },
            rollingPicsChangeFun(index) {
                this.rollingPicIndex = index + 1;
            },
            initScrollHandle() {
                this.translate = 15;
                this.actionBarHeight = +getComputedStyle(this.$refs.actionBar).getPropertyValue('height').replace('px', '');
                this.fastNavHeight = +getComputedStyle(this.$refs.fastNav).getPropertyValue('height').replace('px', '');
                this.scrollElementTarget = this.$el.querySelector('.ios-scroll');
                this.scrollElementTarget.addEventListener('scroll', throttle(this.scrollHandle, 100))
            },
            /**
             * 页面滚动事件
             * */
            scrollHandle() {
                if (this.scrollElementTarget.scrollTop > 50) {
                    this.showNavBar = false;
                } else {
                    this.showNavBar = true;
                }
                const discountContentBottom = this.getSafe(() => this.$refs.discount.getBoundingClientRect().bottom, 0);
                const fastNavStaticBottom = this.getSafe(() => this.$refs.fastNavStatic.getBoundingClientRect().top, 0);
                const activeContentBottom = this.getSafe(() => this.$refs.active.getBoundingClientRect().bottom, 0);
                const popularContentBottom = this.getSafe(() => this.$refs.popular.getBoundingClientRect().bottom, 0);
                const shopContentBottom = this.$refs.shop.getBoundingClientRect().bottom;
                if (fastNavStaticBottom - this.actionBarHeight <= 0) {
                    this.showFastNav = true;
                } else {
                    this.showFastNav = false;
                }
                if (discountContentBottom - this.actionBarHeight - this.fastNavHeight > 0) {
                    this.currentNavIndex = DISCOUNT;
                } else {
                    if (activeContentBottom - this.actionBarHeight - this.fastNavHeight > 0) {
                        this.currentNavIndex = ACTIVE;
                    } else if (popularContentBottom - this.actionBarHeight - this.fastNavHeight > 0) {
                        this.currentNavIndex = POPULAR;
                    } else if (shopContentBottom - this.actionBarHeight - this.fastNavHeight > 0) {
                        this.currentNavIndex = SHOP;
                    } else {
                        this.currentNavIndex = COMMENT;
                    }
                }
                this.fastNavIndex.forEach(item => {
                    if (item.index === this.currentNavIndex) {
                        item.active = true;
                    } else {
                        item.active = false;
                    }
                });
                this.showFastNav && this.moveIndication();
            },

            moveIndication() {
                this.$nextTick(() => {
                    let activeFastNavItem = this.$refs.fastNav.querySelector('.active');
                    if (activeFastNavItem !== this.activeFastNavItem) {
                        this.activeFastNavItem = activeFastNavItem;
                        this.translate = activeFastNavItem.getBoundingClientRect().left;
                    }
                })
            },

            /**
             * 点击快捷导航栏
             * */
            fastNavClick(key) {
                let scrollDistance,
                    scrollTimeId,
                    direction,
                    positionTop,
                    scrollElementTarget = this.scrollElementTarget,
                    scrollTop = this.scrollElementTarget.scrollTop;
                const targetElement = this.$refs[key];
                const headerHeight = this.actionBarHeight;
                positionTop = targetElement.getBoundingClientRect().top - headerHeight - this.fastNavHeight;
                if (positionTop > 0) {
                    scrollDistance = scrollTop + positionTop
                } else {
                    scrollDistance = scrollTop - Math.abs(positionTop);
                }
                scrollDistance += 5;
                scrollDistance > scrollTop ? direction = 'up' : direction = 'down';
                scrollTimeId = setInterval(() => {
                    direction === 'down' ? scrollTop -= 30 : scrollTop += 30;
                    if ((direction === 'down' && scrollTop < scrollDistance) || (direction === 'up' && scrollTop >= scrollDistance)) {
                        scrollElementTarget.scrollTop = scrollDistance;
                        clearInterval(scrollTimeId)
                    } else {
                        scrollElementTarget.scrollTop = scrollTop;
                    }
                }, 5)
            },

            /**
             *获取店铺详情
             * */
            getShopDetail() {
                let params = {
                    shopId: this.shopId, //店铺id
                    lng: this.$route.query.lng,        //经纬度
                    lat: this.$route.query.lat            //经纬度
                };
                this.$http.get(this.$api.xkMShopDetailShare, params, true)
                    .then(res => {
                        this.shopDetail = res;
                        if (!Array.isArray(this.shopDetail.mShop.contactPhones)) {
                            this.shopDetail.mShop.contactPhones = []
                        }
                        this.shopDetail.mShop.contactPhones.push(this.shopDetail.mShop.fixedPhone);
                        /**
                         * 过滤热销产品
                         * */
                        getSafe(() => this.shopDetail.catalogAliasList, []).forEach((item, index, array) => {
                            let obj = this.shopDetail.goods.find(goods => {
                                return goods.goodsTypeId == item.levelOneCode;
                            });
                            if (obj && obj.shopGoods.length) {
                                this.catalogAliasList.push(item);
                            }
                        });

                        /**
                         * 没有热销商品不显示热销导航栏
                         * */
                        !this.catalogAliasList.length && this.spliceFastNavItem(POPULAR);
                        /**
                         * 没有活动不显示活动导航栏
                         * */
                        !this.getSafe(() => this.shopDetail.activities.length, 0) && this.spliceFastNavItem(ACTIVE);

                        /**
                         * 没有优惠不显示优惠导航栏
                         * */
                        !this.shopDetail.couponsSize && this.spliceFastNavItem(DISCOUNT);

                        this.fastNavIndex[0].active = true;
                        /*  this.handleProductTypes(this.shopDetail.catalogAliasList);*/
                        this.currentGoodsTypeCode = this.getSafe(() => this.catalogAliasList[0].levelOneCode, '1001');
                    })
                    .catch(err => {
                        debugger;
                        this.$vux.toast.text(err.message);
                    })
            },

            /**
             * 删除指定导航栏快捷
             * */
            spliceFastNavItem(key) {
                let index = this.fastNavIndex.findIndex(item => {
                    return item.index === key;
                });
                this.fastNavIndex.splice(index, 1);
            },


            /**
             * 获取评价分数
             * */
            getScore() {
                let params = {
                    shopId: this.shopId,
                };
                this.$http.get(this.$api.stat4BcleShopShare, params, true)
                    .then(res => {
                        if (res) this.scoreAve = res;
                    })
                    .catch(err => {

                    })
            },

            /**
             *评价列表
             * */
            getCommentList() {
                let params = {
                    ...this.commentPage,
                    shopId: this.shopId,
                };
                if (this.currentTypeCode) {
                    params = {
                        categoryCode: this.currentTypeCode,
                        ...params
                    }
                }
                this.$vux.loading.show();
                this.$http.get(this.$api.bcleGoodsCommentListShare, params, true)
                    .then(res => {
                        if (!!res && !!res.data) {
                            res.data.forEach((item) => {
                                this.$set(item, "expand", false);
                            });
                            this.comment.total = res.total;
                            this.comment.data = res.data;
                        }
                    })
                    .catch(err => {
                    })
                    .finally(() => {
                        this.$vux.loading.hide();
                    })
            },

            /**
             * 计算活动方式
             * */
            computedActivityType(type) {
                switch (type) {
                    case "CGift":
                        return "消费送礼";
                    case "CLottery":
                        return "消费抽奖";

                    case "SGift":
                        return "转发送礼";
                    case "SLottery":
                        return "转发抽奖";
                    default:
                        return "未知类型";
                }
            },
            /**
             * 小数点处理
             * */
            decimalPoint(val, len) {
                let num = val;
                if (String(val).indexOf('.') > -1) {
                    return val.toFixed(len);
                } else {
                    return val;
                }
            },
        },



        computed: {
            transform() {
                return `translate3d(${this.translate}px,0,0)`
            },
            /**
             * 当前分类热销商品
             * */
            goodsList() {
                let obj = this.shopDetail.goods.find(item => {
                    return item.goodsTypeId == this.currentGoodsTypeCode;
                });
                if (obj) {
                    return obj.shopGoods.slice(0, 3);
                } else {
                    return [];
                }
            }
        },
        watch: {}

    }
</script>
<style scoped lang="scss" type="text/scss" src="./businessDetailRevision.scss">
</style>
