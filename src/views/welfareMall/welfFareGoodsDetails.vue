<template>
    <div class="goods welfGoodsDetails_wrapper">
        <!--<scroller :use-pullup="true" :lock-x="true" :use-pulldown="false">-->
        <div class="g-main ios-scroll iphonex-top" id="main">
            <header class="goods-header">
                <swiper :show-dots="false" :aspect-ratio="379/379" :auto="true" :loop="true" :interval="5000"
                        @on-index-change="indexChangeFun">
                    <swiper-item :key="index" v-for="(item,index) in banner.imgs">
                        <img class="img-object-fit" :src="item" alt="">
                    </swiper-item>
                </swiper>
                <span class="dots">
                    {{banner.currentIndex}}/{{banner.totalNum}}
                </span>
            </header>
            <!--
            开奖倒计时
            -->

            <div class="lottery-outline">
                <div class="lottery-price">
                    <div class="join-way"
                         :class="{'lottery-jindu':!(lotteryBytimeAndByMember||lotteryBytime||lotteryBytimeOrByMember)}">
                        <p>
                            参与方式:消费券
                        </p>
                        <p v-if="detail.shoppingNumberLimit===-1">
                            不限购
                        </p>
                        <p v-else>
                            用户最多购买: {{detail.shoppingNumberLimit}}注
                        </p>
                    </div>
                </div>

                <div class="count-down"
                     v-if="!lotteryIsOpended&&(lotteryBytimeAndByMember||lotteryBytime||lotteryBytimeOrByMember)">
                    <p>
                        开奖时间
                    </p>
                    <div class="time-wrapper">
                        <span class="hour">{{countDown.md}}</span>
                        <span class="minute">{{countDown.hh}}</span>
                        <span class="seconds">{{countDown.mm}}</span>
                    </div>
                </div>
            </div>
            <article class="goods-title">
                <p class="title">
                    <span>
                        [{{detail.jSequence.lotteryWay.eachNotePrice | parseIntPrice}}消费券夺{{detail.price|parseIntPrice}}元]
                    </span>
                    {{getSafe(()=>detail.jSequence.goods.name,'')}}
                </p>
                <div class="welfDestrucption">
                    <p style="color: #555555;font-size: 13px;margin-top: 4px">(订单金额商家券返还/中奖后凭券0元兑换)</p>
                    <div class="welfDestrucption_row">
                        <p class="welfDestrucption_column">
                            规格：
                            <span class="wele_val">
                                {{detail.jSequence.goods.atrrName}}
                            </span>
                        </p>
                    </div>
                    <p class="lottery-des">
                        {{detail.description}}
                    </p>
                    <!--
                    期数
                    -->
                    <div class="periods-number">
                        <div class="number">
                            <span>第{{detail.jSequence.currentNper}}期</span>
                            <span>
                            总期数: {{detail.jSequence.lotteryWay.totalSequenceNumber}}期
                            </span>
                        </div>
                    </div>
                    <!--
                    开奖进度条
                    -->
                    <template v-if="lotteryBytimeOrByMember||lotteryBytimeAndByMember||lotteryBymember">
                        <lottery-schedule :progress-percent="percent">
                            <template slot="content">
                                {{detail.jSequence.currentCustomerNum}}
                                /{{detail.jSequence.lotteryWay.eachSequenceNumber}}
                            </template>
                        </lottery-schedule>
                        <!--
                        开奖要求
                        -->
                        <div class="open-demand">
                            <span>满{{detail.jSequence.lotteryWay.eachSequenceNumber}}人次开奖</span>
                            <span>还需{{detail.jSequence.lotteryWay.eachSequenceNumber-detail.jSequence.currentCustomerNum}}人次</span>
                        </div>
                    </template>
                    <!--
                   提示
                   -->
                    <div class="tips" v-if="lotteryBytimeAndByMember">
                             <span>
                                !
                            </span>
                        <span>
                                注意: 满足以上两个条件才可以开奖哦！
                            </span>
                    </div>
                    <div class="tips" v-if="lotteryBytimeOrByMember">
                        <span>!</span>
                        <span>
                                注意: 满足以上任意条件就可以开奖哦!
                            </span>
                    </div>
                    <!-- <div class="welfDestrucption_row">
                        <p class="welfDestrucption_column">
                            消费券：
                            <span class="wele_val red">
                                {{detail.jSequence.lotteryWay.eachNotePrice | parseIntPrice}}
                            </span>
                        </p>
                        <p class="welfDestrucption_column">
                            期数：
                            <span class="wele_val red">
                                第{{detail.jSequence.currentNper}}期
                            </span>
                        </p>
                    </div> -->
                    <!-- <div v-if="showPercentOfDraw"
                         class="welfDestrucption_row">
                        <p class="welfDestrucption_column progress">
                            本次开奖进度：
                        </p>
                        <div class="welfDestrucption_column">
                            <div class="progressBox">
                                <div class="progressLeft" :style="'width:' + percent">
                                    <span class="progressNumber">{{percent}}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div v-if="showDateOfDraw"
                         class="welfDestrucption_row">
                        <p class="welfDestrucption_column">
                            本次开奖时间：
                            {{detail.jSequence.expectLotteryDate | formatTime}}
                        </p>
                    </div>
                    <div class="welfDestrucption_row">
                        <p style="color: #EE6161" v-if="detail.jSequence.lotteryWay.jDrawType == 'bytime_or_bymember'">
                            注意：满足以上任意一个条件就可以开奖哦！
                        </p>
                        <p style="color: #EE6161" v-if="detail.jSequence.lotteryWay.jDrawType == 'bytime_and_bymember'">
                            注意：需满足以上两个条件才可开奖哦！
                        </p>
                    </div> -->
                </div>
            </article>
            <!--
                 往期揭晓
                 -->
            <history-publish @cell-click="showMore">
            </history-publish>
            <!--
            cell 列表
            -->
            <!--
                        <div class="cell-list">
                            <custom-cell v-if="lotteryIsOpended" @cell-click="openLotteryDetail">
                                <span slot="left">
                                    商品详情
                                </span>
                                <span slot="right">
                                查看商品详情
                                 </span>
                            </custom-cell>
                            <custom-cell v-if="lotteryIsOpended" @cell-click="showMore">
                                <span slot="left">
                                    往期晒单
                                </span>
                                <span slot="right">
                                查看全部晒单
                                  </span>
                            </custom-cell>
                            <custom-cell @cell-click="showMore" v-if="lotteryIsOpended">
                                <span slot="left">
                                    本期用户参与参与详情({{joinConsumerTotal}})
                                </span>
                                <span slot="right">
                                查看更多
                                 </span>
                            </custom-cell>
                        </div>
            -->
            <!--
           往期晒单
           -->
            <lottery-history
                    :pictures="historyPublishPictures"
                    :comment-count="countComment"
                    @cell-click="showMore">
            </lottery-history>
            <!--
            本期用户参与详情
            -->
            <div class="current-join-consumer">
                <navigation-label @cell-click="showMore">
                    <span slot="left">
                        本期用户参与详情
                    </span>
                    <span slot="right">
                        查看更多
                    </span>
                </navigation-label>
                <div class="consumer-list">
                    <ul>
                        <li v-for="(item,index) in joinConsumer"
                            :key="index">
                            <div class="avatar">
                                <img :src="item.avatar"
                                     class="block img-object-fit-cover" alt="">
                            </div>
                            <div class="lottery-info">
                                <div class="header">
                                    <p>
                                        {{item.nickname || '无用户名'}}
                                    </p>
                                </div>
                                <div class="lottery-list">
                                    <p>
                                        参与注数
                                        <span>
                                         {{item.orderNumber}}
                                        </span>
                                    </p>
                                    <p>
                                        参与号码:{{item.兑奖编码}}
                                    </p>
                                </div>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
            <!--
            商品详情
            -->
            <detail-rich-text v-if="!lotteryIsOpended">
                <div v-html="detail.detailPics"></div>
            </detail-rich-text>
            <!--
            中奖详情
            -->
            <!--
                        <winning-detail v-if="lotteryIsOpended"
                                        :winning-user-info="winningDetail"
                                        :video="winningVideo"
                                        :pictures="winningPictures"
                                        :prize-name="winningPrizeName">
                        </winning-detail>
            -->
        </div>
        <!--产品详情-->
        <!-- <div class="goods-detail">
            <div class="lineHeader">
                <span class="">产品详情</span>
            </div>
            <div style="overflow: hidden" v-html="detail.detailPics">
            </div>
        </div>
        <comment>
            <comment-header
                    :show-header-score="false"
                    :total="comment.total"
                    header-label="晒单">
            </comment-header>
            <comment-item v-for="(item,$index) in comment.data"
                          :show-comment-time="false"
                          :comment="item"
                          :show-score="false"
                          @img-click="imgClick"
                          :key="$index">
                <template slot="consumption-name">
                    中奖时间: {{item.goods.winDate | formatTime}}
                </template>
            </comment-item>
        </comment>
    </div> -->
        <show-more :url="nativeUrl"></show-more>
        <!-- <previewer :list="imgList" ref="previewer"></previewer> -->
    </div>
</template>

<script>
    import {Swiper, SwiperItem, Popup, XNumber, Group, Clocker} from 'vux'
    import {
        callNative,
        hideLoading,
        getSafe,
        pushSharePath,
        imgPreview,
        establishModel,
        getRemainTime,
        wakeNative,
        formatDate
    } from '../../util/publicMehotds'

    import CustomCell from '@/components/CustomCell'
    import HistoryPublish from '@/components/lottery/HistoryPublish'
    import LotteryHistory from '@/components/lottery/LotteryHistory'
    import WinningDetail from '@/components/lottery/WinningDetail'
    import LotterySchedule from '@/components/lottery/LotterySchedule'
    import NavigationLabel from '@/components/lottery/NavigationLabel'
    import DetailRichText from '@/components/lottery/DetailRichText'
    import ShowMore from '../../components/ShowMore'


    export default {
        components: {
            Swiper,
            SwiperItem,
            Popup,
            XNumber,
            Group,
            Clocker,
            LotterySchedule,
            NavigationLabel,
            CustomCell,
            HistoryPublish,
            LotteryHistory,
            WinningDetail,
            DetailRichText,
            ShowMore
        },
        data() {
            return {
                getSafe,
                nativeUrl: '',
                percent: "0%",
                toBottm: true,
                isShow: false,
                dialogType: 1, //  1 加入购物车  2 直接购买
                isCollection: false,
                comment: {  //晒单列表
                    data: [],
                    total: 0
                },
                num: 1,
                banner: {
                    imgs: [],
                    currentIndex: 1,
                    totalNum: 1
                },
                goodsId: "", //商品id
                orderId: '',
                sequenceId: '',//期id
                detail: {
                    price: 0,
                    jSequence: {
                        lotteryWay: {},
                        goods: {}
                    },
                    drawDetail: {},
                    mainPics: []
                },
                imgList: [], //图片大图查看列表,
                fillable: true,
                isSh: false,  //是否商户app
                countComment: 0, //往期晒单数量
                commentList: [],    //往期晒单列表
                historyPublishPictures: [], //往期晒单图片
                joinConsumer: [], //本期用户参与详情
                joinConsumerTotal: 0, //本期用户参与数量
                winningDetail: {  //中奖人信息
                    nickName: '',
                    avatar: '',
                    orderNumber: '',
                    winningTime: '',
                    content: ''
                },
                winningVideo: {  //晒单视频
                    videoUrl: '',
                    videoMainUrl: ''
                },
                winningPictures: [], //晒单图片
                winningPrizeName: '', //奖品名称
                countDown: {
                    md: '',
                    hh: '',
                    mm: ''
                },
                countDownTimer: null
            }
        },
        created() {
            this.goodsId = this.$route.query.goodsId;
            this.sequenceId = this.$route.query.id;
            this.orderId = this.$route.query.orderId || '';
            this.isSh = this.$route.query.client === 'sh';
            this.getGoodsDetail();
            // this.getComment();
        },
        beforeDestroy() {
            this.countDownTimer && clearInterval(this.countDownTimer);
        },
        methods: {

            countDownStart() {
                let entTime = Number(this.detail.jSequence.expectLotteryDate) * 1000;
                let lotteryTime = formatDate(entTime, "MM.DD-HH-mm").split('-');
                this.countDown.md = lotteryTime[0];
                this.countDown.hh = lotteryTime[1];
                this.countDown.mm = lotteryTime[2];
                /*  let entTime = new Date().getTime() + 1000 * 60 * 60 * 24;
                  this.countDownTimer = setInterval(() => {
                      let currentTime = new Date().getTime();
                      let remainTime = getRemainTime(entTime, currentTime);
                      this.countDown = remainTime;
                      if (remainTime.total < 0) {
                          clearInterval(this.countDownTimer);
                      }
                  }, 1000)*/
            },
            //大图查看图片
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
            indexChangeFun(index) {
                this.banner.currentIndex = index + 1;
            },

            /**
             *获取商品详情
             * */
            getGoodsDetail() {
                const parameter = {
                    sequenceId: this.sequenceId,
                    orderId: this.orderId,
                    goodsId: this.goodsId
                };
                this.$http.get(this.$api.lotteryDetailShare, parameter, true)
                    .then(res => {
                        if (!res) {
                            this.$vux.toast.text('商品详情为空', 'middle');
                            return;
                        }
                        this.detail = res;
                        console.log('detail', res)
                        this.getCommentList();
                        this.nativeUrl = `wfmall/goodsdetail?goodsId=${this.goodsId}&goodsName=${this.detail.jSequence.goods.name}&sequenceId=${this.sequenceId}`;
                        [this.banner.imgs, this.banner.totalNum] = [getSafe(() => res.mainPics, []), getSafe(() => res.mainPics.length, 0)];
                        //已开奖获取晒单信息
                        if (this.detail.jSequence.jPeriodState === 'finished_status') {
                            this.winningDetail.nickName = this.detail.jOrderLotteryVO.nickname;
                            this.winningDetail.avatar = this.detail.jOrderLotteryVO.avatar;
                            this.winningDetail.winningTime = this.detail.jOrderLotteryVO.createdAt;
                            this.winningDetail.content = this.detail.jOrderLotteryVO.content;
                            this.winningDetail.orderNumber = this.detail.jOrderLotteryVO.orderNumber;
                            this.winningPictures = this.detail.jOrderLotteryVO.pictures;
                            this.winningVideo.videoMainUrl = this.detail.jOrderLotteryVO.videoMainUrl;
                            this.winningVideo.videoUrl = this.detail.jOrderLotteryVO.videoUrl;
                            this.winningPrizeName = this.detail.jSequence.goods.name;
                        }
                        let jDrawType = this.detail.jSequence.lotteryWay.jDrawType;
                        if (jDrawType === 'bytime' || jDrawType === 'bytime_and_bymember' || jDrawType === 'bytime_or_bymember') {
                            this.countDownStart();
                        }
                        let value;
                        try {
                            value = parseInt((Number(res.jSequence.currentCustomerNum) / Number(res.jSequence.lotteryWay.eachSequenceNumber)) * 100);
                        } catch (e) {
                            value = 0;
                        }
                        let processValue = value ? value < 1 ? '1' : value : 0;
                        processValue = processValue > 100 ? 100 : processValue;
                        this.percent = processValue + "%";
                        let percentNum = processValue;
                        percentNum = percentNum > 100 ? 100 : percentNum;
                        this.percent = percentNum > 98 ? parseInt(percentNum) + "%" : percentNum + "%";
                    })
                    .catch(err => {
                        this.$vux.toast.text(err.message, "middle");
                    })
            },

            /**
             * 本期用户参与详情
             * */
            getLotteryJoin() {
                const parameter = {
                    sequenceId: this.sequenceId
                };
                this.$http.get(this.$api.jSequenceJoinQPage, parameter, true)
                    .then(res => {
                        if (res && res.data) {
                            this.joinConsumer = res.data;
                            this.joinConsumerTotal = res.total;
                        }
                    })
                    .catch(err => {
                        this.$vux.toast.text(err.message);
                    })
            },
            /**
             *获取往期晒单数量
             * */
            getCommentList() {
                const parameter = {
                    type: 'havePic',
                    page: 1,
                    limit: 6,
                    goodsId: this.detail.jSequence.goods.id,
                };
                this.$http.get(this.$api.jmallGoodsCommentListShare, parameter, true)
                    .then(res => {
                        if (res) {
                            this.commentList = res.data;
                            this.countComment = res.total;
                            res.data.forEach(item => {
                                this.historyPublishPictures = this.historyPublishPictures.concat(item.pictures)
                            })
                        }
                    })
                    .catch((err => {
                        this.$vux.toast.text(err.message);
                    }))
            },
            /**
             *获取评论
             * */
            getComment() {
                let param = {
                    goodsId: this.goodsId,
                    page: 1,
                    limit: 100,
                    type: "all"
                };
                this.$http.get(this.$api.jmallGoodsCommentListShare, param, true)
                    .then(res => {
                        if (!res) return;
                        this.comment = res;
                    })
                    .catch(err => {
                        this.$vux.toast.text(err.message, 'middle');
                    })
            },
            // 提醒打开APP
            showMore() {
                wakeNative.call(this, "gc");
            },
        },

        computed: {
            //是否开奖
            lotteryIsOpended() {
                let status = getSafe(() => this.detail.jSequence.jPeriodState, '');
                return status === 'finished_status';
            },
            //按时间或人数开奖
            lotteryBytimeOrByMember() {
                let drawType = getSafe(() => this.detail.jSequence.lotteryWay.jDrawType, '');
                return 'bytime_or_bymember' === drawType;
            },
            //按时间和人数开奖
            lotteryBytimeAndByMember() {
                let drawType = getSafe(() => this.detail.jSequence.lotteryWay.jDrawType, '');
                return 'bytime_and_bymember' === drawType;
            },

            //按时间开奖
            lotteryBytime() {
                let drawType = getSafe(() => this.detail.jSequence.lotteryWay.jDrawType, '');
                return 'bytime' === drawType;
            },

            //按人数开奖
            lotteryBymember() {
                let drawType = getSafe(() => this.detail.jSequence.lotteryWay.jDrawType, '');
                return 'bymember' === drawType;
            },

            //允许购买最大数量
            maxNumber() {
                let drawType = getSafe(() => this.detail.jSequence.lotteryWay.jDrawType, '');
                if ('bytime' === drawType && this.detail.shoppingNumberLimit === -1) {   //不限购
                    return 9999;
                } else {
                    return this.detail.shoppingNumberLimit;
                }
            },
            /**
             * 按时间开奖方式
             * */
            showDateOfDraw() {
                let flag = null;
                try {
                    flag = this.detail.jSequence.lotteryWay.jDrawType !== 'bymember'
                } catch (e) {
                    return false
                }
                return flag;
            },

            /**
             * 按人数参与进度开奖方式
             * */
            showPercentOfDraw() {
                let flag = false;
                try {
                    flag = this.detail.jSequence.lotteryWay.jDrawType !== 'bytime'
                } catch (e) {
                    return false
                }
                return flag;
            }
        }
    }
</script>
<style lang="scss" type="text/scss">
    @import "@/assets/sass/common/theme.scss";
</style>
<style src="../goodsDetail.scss" lang="scss" scoped type="text/scss"></style>
<style src="./welfFareGoodsDetails.scss" scoped lang="scss" type="text/scss"></style>
<style lang="scss" type="text/scss">

    .welfGoodsDetails_wrapper {
        /deep/ .custom-cell {
            height: 48px;
            }
        .goods-detail {
            img {
                max-width: 100%;
                }
            }
        .goods-num {
            display: flex;
            justify-content: space-between;
            align-items: center;
            > span {
                padding-left: 15px;
                }
            .weui-cells {
                margin-top: 0;
                .vux-number-selector {
                    padding: 0 5px;
                    }
                .vux-number-selector-sub {
                    border-radius: 3px 0 0 3px;
                    border-color: #B4B4B4 !important;
                    }
                .vux-number-selector-plus {
                    border-radius: 0 3px 3px 0;
                    border-color: #B4B4B4 !important;
                    }
                .vux-number-input {
                    border-color: #B4B4B4;
                    width: 30px !important;
                    font-size: 12px;
                    }
                }
            .vux-number-selector-plus {
                margin-right: 0;
                }
            .vux-number-selector {
                padding-top: 0;
                padding-bottom: 0;
                svg {
                    height: 20px;
                    width: 12px;
                    fill: #000000;
                    margin-top: -1px;
                    }
                }
            }
        }
</style>
<!--<style src="../goodsDetail.scss" lang="scss" scoped type="text/scss"></style>
<style lang="scss" type="text/scss" scoped>
    @import "@/assets/sass/common/theme.scss";
    @import "./welfFareGoodsDetails";
</style>-->
<style scoped lang="scss" type="text/scss" src="./welfFareGoodsDetailsRevision.scss"></style>
