<template>
    <div class="goods iphonex-goods-bottom">
        <!--<scroller :use-pullup="true" :lock-x="true" :use-pulldown="false">-->
        <div class="g-main">
            <header class="goods-header">
                <swiper :show-dots="false" :aspect-ratio="379/379" :loop="true" :interval="5000"
                        @on-index-change="indexChange">
                    <swiper-item v-if="goods.base.showVideoUrl">
                        <video-play :videoSrc="goods.base.showVideoUrl">
                        </video-play>
                    </swiper-item>
                    <swiper-item :key="index" v-for="(item,index) in banner.imgs">
                        <img class="img-object-fit" @click="openImageBrowser(banner.imgs)"
                             :src="item" alt="">
                    </swiper-item>
                </swiper>
                <span class="dots">
                    {{banner.currentIndex}}/{{banner.totalNum}}
                </span>
            </header>
            <article class="goods-title">
                <p class="title">{{goods.base.name}}</p>
                <div class="goods-attr">
                    <div class="price" v-if="!isBulkGoods">
                        ￥
                        <span class="price-money">{{goods.base.defaultSku.buyPrice | formatPrice}}</span>
                        <del v-if="goods.base.defaultSku.price!='0'">￥{{goods.base.defaultSku.price | formatPrice}}
                        </del>
                    </div>
                    <div class="bulk-goods flex-box" v-if="isBulkGoods">
                        <p>
                            预约金:
                            <small>
                                ￥
                            </small>
                            <span>
                              {{goods.base.defaultSku.subscription|formatPrice}}
                            </span>
                        </p>
                        <p>
                            特惠价:
                            <span>
                                ￥{{goods.base.defaultSku.buyPrice | formatPrice}}
                            </span>
                        </p>
                        <del>
                            ￥{{goods.base.defaultSku.price | formatPrice}}
                        </del>
                    </div>
                    <span v-if="!isBulkGoods" class="sales">销售量：{{goods.base.saleQ}}</span>
                </div>
                <p class="sales" id="bulk-sales" v-if="isBulkGoods">销售量：{{goods.base.saleQ}}</p>
            </article>

            <template v-if="!isBulkGoods">
                <div @click="mallCardFun" v-if="mallCard.length" class="goods-discount">
                    <div class="params">
                        <span class="name">优惠</span>
                        <div class="voucher">
                            <template v-for="(item,index) in mallCard">
                                <template v-if="index < 2">
                                    <span v-if="item.couponType === 'DISCOUNT'"
                                          class="item bg-red">立享{{item.price | parseIntPrice}}折</span>
                                    <span v-if="item.couponType === 'DEDUCTION'"
                                          class="item bg-red">立减{{item.price | parseIntPrice}}元</span>
                                    <span v-if="item.couponType === 'FULL_SUB'" class="item bg-red">
                                        满{{item.condition | parseIntPrice}}减{{item.price | parseIntPrice}}元
                                    </span>
                                </template>
                            </template>
                            <!--<span class="item bg-blue">返100消费券</span>-->
                        </div>
                    </div>
                    <div class="btn">
                        <span>我的</span>
                        <i class="icon-arrow g-s-arrow"></i>
                    </div>
                </div>
            </template>


            <div class="goods-sku">
                <div class="sku-item">
                    <div class="params">
                        <span class="name">选择</span>
                        <span class="text">规格：{{goods.base.defaultSku.name}}</span>
                    </div>
                    <i class="icon-arrow g-s-arrow"></i>
                </div>
                <div v-if="goods.goodsAttrs.attrList.length" @click="showAttr" class="sku-item">
                    <div class="params">
                        <span class="name">参数</span>
                        <span class="text text-overflow">
                            <template v-if="goods.goodsAttrs">
                                <span v-for="item in goods.goodsAttrs.attrList">
                                    <span v-for="val in item.columns">
                                        {{val.name}}
                                    </span>
                                </span>
                            </template>

                        </span>
                    </div>
                    <i class="icon-arrow g-s-arrow"></i>
                </div>
                <div class="sku-item">
                    <div class="params">
                        <span class="name">品牌</span>
                        <span class="text">{{goods.base.brandName}}</span>
                    </div>
                    <i class="icon-arrow g-s-arrow"></i>
                </div>
                <div class="sku-item" v-if="goods.base.overSeas">
                    <div class="params">
                        <span class="name">商品</span>
                        <span class="global-featured">海淘优选</span>
                    </div>
                </div>
            </div>

            <div class="comment-empty" v-if="!commentList.length">
                暂无评价
            </div>

            <div class="goods-comment" v-if="commentList.length">
                <div class="comment-title">
                    <span>评价&nbsp;({{commentTotal}})</span>
                    <span @click="openComments">查看全部<i class="icon-arrow g-s-arrow"></i></span>

                </div>
                <div class="comment">
                    <template v-if="commentList.length===0">
                        <div class="comm-null">暂无评价</div>
                    </template>
                    <template v-else>
                        <div v-for="(item,$index) in commentList" :key="$index" class="comment-item">
                            <div class="item-head">
                                <img class="head" :src="getSafe(()=>item.commenter.avatar,'')" alt="">
                                <div class="head-attr">
                                    <span class="name">{{getSafe(()=>item.commenter.nickName,'')}}</span>
                                    <div class="attr">
                                        <span class="label">{{getSafe(()=>item.createdAt,0) | formatTime2}}</span>
                                        <span class="label">{{getSafe(()=>item.goods.skuValue)}}</span>
                                        <!--<span class="label">尺码：175/L</span>-->
                                    </div>
                                </div>
                            </div>
                            <div class="comment-message">
                                <p>
                                    {{item.content}}
                                </p>
                                <div class="comment-img img-imp">
                                    <div class="comm-img" v-for="(val,index) in item.pictures||[]"
                                         @click="imgClick(item.pictures,index)">
                                        <img class="img-object-fit-cover" :src="val" alt="">
                                    </div>
                                </div>
                            </div>
                        </div>
                    </template>
                </div>
            </div>


            <div class="goods-detail">
                <div class="lineHeader">
                    <span class="">产品详情</span>
                </div>
                <div class="content-wrapper" style="position: relative;overflow: hidden" v-html="goods.base.detail">
                </div>
            </div>

        </div>

        <popup v-model="isShowAttr" postion="bottom" @touchmove.native.self.prevent>
            <div class="good-attr-dialog">
                <div class="close-btn">
                    <i @click="closeAttrModel" class="icon-close"></i>
                </div>
                <div class="attr-title">产品参数</div>
                <div class="attr-list ios-scroll">
                    <template v-if="goods.goodsAttrs">
                        <template v-for="item in goods.goodsAttrs.attrList">
                            <div v-for="val in item.columns" class="attr-item">
                                <span class="attr-name">{{val.name}}</span>
                                <span class="attr-val">{{val.value}}</span>
                            </div>
                        </template>
                    </template>
                </div>
            </div>
        </popup>

        <!--选规格弹出框-->
        <!--
                <popup v-model="isShowSku" postion="bottom" @touchmove.native.prevent>
                    <div class="good-attr-dialog">
                        <i @click="closeSkuModel" class="icon-close close-sku"></i>
                        <div class="goods-info">
                            <img class="goods-img" :src="skuInfo.url" alt="">
                            <div class="info">
                                <div class="info-title">
                                    {{goods.base.name}}
                                </div>
                                <div class="info-detail">
                                    <span class="price">￥{{skuInfo.price |formatPrice}}</span>
                                    <span class="info-label">库存：{{skuInfo.stock}}件</span>
                                    <span class="info-label">请选择规格</span>
                                </div>
                            </div>
                        </div>
                        <div class="sku-list">
                            <div v-for="(item,index) in sku.skuAttr.attrList" class="sku-option">
                                <span class="sku-title">{{item.name}}</span>
                                <div class="sku-labels">
                                    <label-radio v-model="item.code" :attrValues="item.attrValues"
                                                 @updateSel="updateLabel"></label-radio>
                                </div>
                            </div>
                            <div class="goods-num">
                                <span class="til">购买数量</span>
                                <group>
                                    <x-number v-model="num" :fillable="true" :min="1" :max="9999"></x-number>
                                </group>
                            </div>
                            <div class="goods-sbu-btn" @click="giveCard">确定</div>
                        </div>
                    </div>
                </popup>
        -->

        <!--优惠券弹出框-->
        <popup v-model="isShowCard" postion="bottom" @touchmove.native.self.prevent>
            <div class="goods-card">
                <div class="card-head">
                    <span class="title">优惠券</span>
                    <i @click="mallCardFun" class="icon-del"></i>
                </div>
                <div class="card-content">
                    <div v-for="(item,index) in mallCard" class="card-item">
                        <div class="card-item-main">
                            <div class="card">
                                <div v-if="item.couponType === 'FULL_SUB'">
                                    <span class="card-price">￥{{item.price | parseIntPrice}}</span>
                                    <p class="card-con">满{{item.condition | parseIntPrice}}元可用</p>
                                </div>
                                <div v-if="item.couponType === 'DISCOUNT'">
                                    <span class="card-price">{{item.price | parseIntPrice}}折</span>
                                    <p class="card-con">{{item.price | parseIntPrice}}折优惠券</p>
                                </div>
                                <div v-if="item.couponType === 'DEDUCTION'">
                                    <span class="card-price">￥{{item.price | parseIntPrice}}</span>
                                    <p class="card-con">抵扣￥{{item.price | parseIntPrice}}</p>
                                </div>
                            </div>
                            <div class="card-detail">
                                <p class="card-desc">{{item.couponName}}</p>
                                <div class="card-other">
                                    <p class="card-time">
                                        {{item.validTime | formatTime('YYYY-MM-DD',item.validTime)}}
                                        -
                                        {{item.invalidTime | formatTime('YYYY-MM-DD',item.invalidTime)}} </p>
                                    <div class="card-set">
                                        <div @click="showCardMessage(item)" class="detail-btn">
                                            <span>详情</span>
                                            <i :class="item.isShow ? 'icon-down' : 'icon-up'" class="icon-arrow"></i>
                                        </div>
                                        <div @click="giveCard(item)" v-if="item.whetherDraw === 0" class="post-btn">
                                            立即领取
                                        </div>
                                        <div v-if="item.whetherDraw === 1" class="post-btn dis">已领取</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div v-if="item.isShow" class="goods-card-desc">{{item.message}}</div>
                    </div>
                </div>
            </div>
        </popup>
        <previewer :list="imgList" ref="previewer"></previewer>
        <show-more :url="nativeUrl" :jumpUrl="jumpUrl"></show-more>
        <div class="guide" :class="{'guide-android':system==='android'}"
             v-if="showGuide">
            <span @click="showGuide=false">我知道了</span>
        </div>
    </div>
</template>

<script>
    import Previewer from '../components/comment/Preview'
    import {Swiper, SwiperItem, Scroller, Popup, XNumber, Group} from 'vux'
    import LabelRadio from "../components/LabelRadio"
    import ShowMore from '../components/ShowMore'
    import {getWechatConfig} from '../axios/index'
    import {
        callNative,
        getSharePath,
        isWeiXin,
        wakeNative,
        getSafe,
        system,
        initWxConfig,
        shareAppMessage,
        shareTimeline
    } from "../util/publicMehotds"
    import VideoPlay from "../components/VideoPlay"

    export default {
        components: {
            Swiper,
            SwiperItem,
            Scroller,
            Popup,
            XNumber,
            Group,
            LabelRadio,
            VideoPlay,
            ShowMore,
            Previewer
        },
        data() {
            return {
                isBulkGoods: false, //大宗商品
                nativeUrl: '',
                imgList: [],
                isShowAttr: false,
                isWxReady: false,
                showGuide: false,
                isShowSku: false,
                isShowCard: false,
                isCollection: false,
                showMask: true,
                videoBackSrc: "",
                video: null,
                commentTotal: 0,
                dialogType: 1, //  1 加入购物车  2 直接购买
                mallCard: [],
                jumpUrl: `${window.location.href}&isMock=1`,
                banner: {
                    imgs: [],
                    currentIndex: 1,
                    totalNum: 1
                },
                goods: {
                    base: {
                        defaultSku: {}
                    },
                    goodsAttrs: {
                        attrList: []
                    }
                },
                sku: {
                    skuAttr: {}
                },
                skuInfo: {},
                num: 1,  //选中数量
                commentList: [],
                info: '',
                getSafe: getSafe,
                system: system()
            }
        },
        async created() {
            let route = this.$route;
            let query = route.query;
            this.info = route.query.info;
            if (this.info) {
                let url = `${location.origin}/web/#${route.path}`;
                Object.keys(query).forEach((key, index) => {
                    if (!index) {
                        url += `?${key}=${query[key]}`;
                    } else {
                        url += `&${key}=${query[key]}`;
                    }
                });
                window.location = url;
            }
            this.nativeUrl = `mall/goods_detail?goodsId=${this.$route.query.id}`;
            this.getGoodsDetail();
            this.getMallCardGoods();
            this.getComments();
            if (query.isMock == 1 && isWeiXin()) {
                this.showGuide = true;
            }
            let wx = await getWechatConfig();
            if (wx.code !== 200) return this.$vux.toast.text(wx.message)
            let res = await initWxConfig();
            if (res.code !== 200) return this.$vux.toast.text(res.message);
            this.isWxReady = true;
            this.initShare();
        },
        mounted() {
            try {
                if (!isWeiXin() && system() === 'android') {
                    window.location.href = `xkgc://shuimukeji.cn/mall/goods_detail?goodsId=${this.$route.query.id}&type=${this.$route.query.type}&shareCode=${this.$route.query.securityCode}`
                } else if (!isWeiXin() && system() === 'ios') {
                    window.location.href = `xksquare://com.authDynamic?targetclass=XKMallGoodsDetailViewController
                        &goodsId=${this.$route.query.id}&type=${this.$route.query.type}&shareCode=${this.$route.query.securityCode}`
                }
            } catch (e) {
                console.log(e)
            }
        },
        methods: {
            initShare() {
                if (this.isWxReady && this.goods.brandCode) {
                    let options = {
                        title: this.goods.base.name, // 分享标题
                        desc: "精选好物，快来围观", // 分享描述
                        link: window.location.href, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
                        imgUrl: '', // 分享图标
                    };
                    let url = this.$route.query.imgUrl ? this.$route.query.imgUrl.split("//") : this.goods.base.defaultSku.skuUrl.split("//");
                    options.imgUrl = "https://" + url[1];
                    shareAppMessage(options);
                    shareTimeline(options);
                }
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
            indexChange(index) {
                this.banner.currentIndex = index + 1;
            },
            getMallCardGoods() {
                let param = {
                    goodsId: this.$route.query.id,
                    limit: 100,
                    page: 1
                };
                this.$http.get(this.$api.mallCardGoodsQList, param, true)
                    .then(res => {
                        this.mallCard = (res && res.data) ? res.data : [];
                    })
                    .catch(err => {

                    })
            },
            mallCardFun() {
                this.isShowCard = !this.isShowCard;
            },
            showCardMessage(item) {
                this.$set(item, "isShow", !item.isShow);
            },

            //领取优惠券
            giveCard() {
                wakeNative.call(this);
            },

            //获取商品规格,颜色等详细信息
            getGoodsSku() {
                this.$http.get(this.$api.goodsSKUDetail, {goodsId: this.$route.query.id}, true)
                    .then(res => {
                        this.sku = res;
                        console.log('sku', res);
                        this.$nextTick(() => {
                            let arr = this.goods.base.defaultSku.code.split("|");
                            for (let i = 0; i < this.sku.skuAttr.attrList.length; i++) {
                                this.$set(this.sku.skuAttr.attrList[i], "code", arr[i])
                            }
                        })
                    })
                    .catch(err => {
                        this.$vux.toast.text(err.message);
                    })
            },

            //获取banner轮播图
            getGoodsDetail() {
                this.$http.get(this.$api.goodsDetail, {id: this.$route.query.id}, true)
                    .then(res => {
                        this.getGoodsSku();
                        if (getSafe(() => res.base.goodsDivide, 1) === 2) {
                            this.isBulkGoods = true;
                        }
                        this.goods = JSON.parse(JSON.stringify(res));
                        [this.banner.imgs, this.banner.totalNum] = [res.base.showPicUrl, res.base.showPicUrl.length];
                        if (this.goods.base.showVideoUrl) {
                            this.banner.totalNum += 1;
                        }
                        this.initShare();
                    })
                    .catch(err => {
                        this.$vux.toast.text(err.message)
                    })
            },
            showAttr() {
                this.isShowAttr = true;
            },
            closeAttrModel() {
                this.isShowAttr = false;
            },
            showSku() {
                this.dialogType = 1;
                this.isShowSku = true;
            },
            closeSkuModel() {
                this.isShowSku = false;
            },
            openNaticeCart() {
                callNative("jsOpenAppShoppingCart", {});
            },
            openCustomerService() {
                callNative("jsOpenAppCustomerService", {});
            },

            /*打开全部评论*/
            openComments() {
                callNative("jsOpenAppComments", {});
            },
            openImageBrowser(arr) {
                callNative("jsOpenAppImageBrowser", JSON.stringify(arr));
            },
            createOrder() {
                this.isShowSku = true;
                this.dialogType = 2;
            },
            videoPlay() {
                this.video.play();
                this.showMask = false;
            },
            getComments() {
                let param = {
                    goodsId: this.$route.query.id,
                    page: 1,
                    limit: 1
                };
                this.$http.get(this.$api.mallGoodsCommentList, param, true)
                    .then(res => {
                        this.commentList = res ? res.data : [];
                        this.commentTotal = res.total;
                    })
                    .catch(err => {

                    })
            },
        }
    }
</script>

<style lang="scss">
    @import "goodsDetail";

    .guide {
        position: fixed;
        left: 0;
        bottom: 0;
        top: 0;
        right: 0;
        z-index: 100;
        background: rgba(0, 0, 0, .7) no-repeat url("~assets/image/guide-ios.png") center top / 266px 228px;

        &.guide-android {
            background: rgba(0, 0, 0, .7) no-repeat url("~assets/image/guide-android.png") center 15px / 266px 228px;
            }

        text-align: center;
        padding-top: 280px;

        span {
            color: #4A90FA;
            font-size: 15px;
            }
        }
</style>
