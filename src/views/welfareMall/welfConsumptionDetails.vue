<template>
    <div class="goods welfConsumptionDetails welfGoodsDetails_wrapper ios-scroll" style="padding-bottom: 90px">
        <div class="iphonex-top" id="main">
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
                    <div class="join-way platform-lottery">
                        <p>
                            ¥
                            <span>{{detail.price|parseIntPrice}}</span>
                            <template v-if="detail.jSequence.goods.goodsType==='virtual'">
                                (返券订单金额上限)
                            </template>
                        </p>
                        <p>
                            参与方式:{{getJoinWay(detail.joinWay)}}
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
                    <!--  <span>
                          [{{detail.jSequence.lotteryWay.eachNotePrice | parseIntPrice}}消费券夺{{detail.price|parseIntPrice}}元]
                      </span>-->
                    {{getSafe(()=>detail.jSequence.goods.name,'')}}
                </p>
                <div class="welfDestrucption">
                    <p style="color: #555555;font-size: 13px;margin-top: 4px">(订单金额商家券返还/中奖后凭券0元兑换)</p>
                    <div class="welfDestrucption_row" v-if="detail.jSequence.goods.atrrName"
                         style="padding-bottom: 10px">
                        <p class="welfDestrucption_column" style="line-height: 18px">
                            规格：
                            <span class="wele_val red">
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
                        <div class="lottery-progress" :class="{'is-opened':lotteryIsOpended}">
                            <span>
                            </span>
                            <span>
                                {{lotteryIsOpended?'已开奖':'待开奖'}}
                            </span>
                        </div>
                    </div>
                    <!--
                    开奖进度条
                    -->
                    <template
                            v-if="!lotteryIsOpended&&(lotteryBytimeOrByMember||lotteryBymember||lotteryBytimeAndByMember)">
                        <lottery-schedule :progress-percent="this.baiFenBi">
                            <template slot="content">
                                {{detail.jSequence.currentCustomerNum}}/{{detail.jSequence.lotteryWay.eachSequenceNumber}}
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
                    <!-- <div class="tips">
                        <span>
                            !
                        </span>
                        <span>
                            注意: 满足以上两个条件才可以开奖哦！
                        </span>
                    </div> -->
                </div>
            </article>
            <!--
            往期揭晓
            -->
            <history-publish @cell-click="showMore">
            </history-publish>

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
                                        参与号码:
                                        <span v-for="(num,index) in item.lotteryNumbers">
                                            {{num}}&nbsp;
                                        </span>
                                    </p>
                                </div>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>

            <!--
            店铺主页
            -->
            <div style="margin-top: 10px">
                <div v-if="isShopLottery"
                     class="shop-home" @click="goToShopHomePage">
                    <span>店铺主页</span>
                    <span></span>
                </div>
                <!-- <div class="custom-cell" @click="openAllComments" v-if="!isShopLottery">
                    <div class="left-content">
                        <span>往期晒单({{countComment}})</span>
                        <span>往期晒单</span>
                    </div>
                </div> -->
                <custom-cell @cell-clik="openLotteryDetail" v-if="lotteryIsOpended">
                    <span slot="left">商品详情</span>
                    <span slot="right">商品详情</span>
                </custom-cell>

                <!-- <custom-cell @cell-click="showMore">
                    <span slot="left">本期用户参与详情({{joinConsumerTotal}})</span>
                    <span slot="right" @cell-click="showMore">查看更多</span>
                </custom-cell> -->

                <custom-cell @cell-click="showMore" v-if="lotteryIsOpended">
                    <span slot="left">开奖依据</span>
                    <span slot="right">开奖依据</span>
                </custom-cell>
            </div>

            <!--
            中奖详情
            -->
            <winning-detail v-if="lotteryIsOpended"
                            :winning-user-info="winningDetail"
                            :video="winningVideo"
                            :prize-name="winningPrizeName"
                            :pictures="winningPictures"
                            @cell-click="showMore">
            </winning-detail>

            <!--产品详情-->
            <detail-rich-text v-if="!lotteryIsOpended">
                <div v-html="detail.detailPics"></div>
            </detail-rich-text>
        </div>
        <show-more :url="nativeUrl"></show-more>
    </div>
</template>

<script>
    import {wakeNative} from "../../util/publicMehotds";
    import {Swiper, SwiperItem, Loading, XNumber, Group, Toast, XButton} from 'vux'
    import ShowMore from '../../components/ShowMore'
    import {callNative, countDown, getSafe,formatDate} from '../../util/publicMehotds'
    import LotteryPopup from '@/components/common/dialog/dialog'
    import CustomCell from '@/components/CustomCell'
    import NavigationLabel from '@/components/lottery/NavigationLabel'
    import HistoryPublish from "@/components/lottery/HistoryPublish";
    import LotteryHistory from "@/components/lottery/LotteryHistory";
    import LotterySchedule from '@/components/lottery/LotterySchedule'
    import WinningDetail from '@/components/lottery/WinningDetail'
    import DetailRichText from '@/components/lottery/DetailRichText'

    export default {
        data() {
            return {
                nativeUrl: '',
                sequenceId: '',//期id
                show2: false,
                timer: null,
                percent: "0",
                toBottm: false,
                isShow: false,
                orderId: '',
                num: 1,
                time2: "",
                spread: false,
                banner: {
                    imgs: [],
                    currentIndex: 1,
                    totalNum: 1
                },
                baiFenBi: "",
                joinConsumer: [], //参与人数
                joinConsumerTotal: 0,
                detail: {
                    jOrderLotteryVO: {
                        "videoMainUrl": "https://gc.xksquare.com/784663004.mp4?vframe/jpg/offset/0",
                        "videoUrl": "https://gc.xksquare.com/784663004.mp4"
                    },
                    goods: {
                        pic: []
                    },
                    jSequence: {
                        goods: {},
                        lotteryWay: {}
                    },
                    drawDetail: {}
                },
                commentList: [], //往期晒单
                isShopLottery: false, //是否是店铺大奖
                // 中奖详情相关
                isSh: false,
                isGray: false,
                countComment: 0, //往期晒单数量
                historyPublishPictures: [], //往期晒单图片列表
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
                prizeDetailData: [],
                prizeTotal: 0,
                page: {
                    page: 1,
                    limit: 6
                },
                joinConsumer: [],//参与者,
                showDialog: false, // 抽奖弹框
                countDown: {
                    md: '',
                    hh: '',
                    mm: ''
                },
            }
        },
        created() {
            this.isShopLottery = this.$route.query.type === 'shop';
            this.sequenceId = this.$route.query.id;
            this.orderId = this.$route.query.orderId || '';
            this.show2 = true;
            this.getGoodsDetail();
            this.getLotteryJoin();
            // this.prizeDetail();
        },
        destroyed() {
            clearInterval(this.timer);
            this.timer = null;
        },

        methods: {
            getSafe,
            // 倒计时调用
            countDownStart() {
                let entTime = Number(this.detail.jSequence.expectLotteryDate) * 1000;
                let lotteryTime = formatDate(entTime, "MM.DD-HH-mm").split('-');
                this.countDown.md = lotteryTime[0];
                this.countDown.hh = lotteryTime[1];
                this.countDown.mm = lotteryTime[2];
                /*   let entTime = new Date().getTime() + 1000 * 60 * 60 * 24;*/
                /* this.countDownTimer = setInterval(() => {
                     let currentTime = new Date().getTime();
                     let remainTime = getRemainTime(entTime, currentTime);
                     this.countDown = remainTime;
                     if (remainTime.total < 0) {
                         clearInterval(this.countDownTimer);
                     }
                 }, 1000)*/
            },
            cc(expectTime) {
                countDown(expectTime, (res) => {
                    this.time2 = res;
                    // this.timer = timer;
                })
            },
            indexChangeFun(index) {
                this.banner.currentIndex = index + 1;
            },
            open() {
                this.spread = !this.spread;
            },

            getJoinWay(way) {
                switch (way) {
                    case "expense":
                        return "消费抽奖";
                    case "promotion":
                        return "分享抽奖";
                    case "shop":
                        return "店铺抽奖";
                    case "xfq":
                        return "消费券抽奖";
                    case "expensepromotion":
                        return "消费抽奖、分享抽奖";
                    default:
                        return '备用奖品';
                }
            },

            /**
             * 获取往期晒单数量
             * */
            // getCountComment() {
            //     const parameter = {
            //         sequenceId: this.sequenceId
            //     };
            //     this.$http.get(this.$api.jmallGoodsCountCommentShare, parameter, true)
            //         .then(res => {
            //             this.countComment = res.count;
            //         })
            //         .catch((err => {
            //             this.$vux.toast.text(err.message);
            //         }))
            // },
            // 往期的晒单数
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
             * 本期用户参与详情
             * */
            getLotteryJoin() {
                const parameter = {
                    sequenceId: this.sequenceId
                };
                this.$http.get(this.$api.jSequenceJoinQPageShare, parameter, true)
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
            //获取商品详情
            getGoodsDetail() {
                this.$vux.loading.show();
                let params = {
                    sequenceId: this.sequenceId,
                    orderId: this.orderId
                };
                let api = this.orderId ? this.$api.allDetailLotteryShare : this.$api.lotteryDetailShare;
                this.$http.get(api, params, true)
                    .then(res => {
                        if (!res) {
                            return this.$vux.toast.text('商品信息为空')
                        }
                        if (!res.jOrderLotteryVO) {
                            res.jOrderLotteryVO = {};
                        }
                        this.detail = res;
                        this.getCommentList();
                        console.log('detail', this.detail)
                        this.orderId = this.detail.jOrderLotteryVO ? this.detail.jOrderLotteryVO.orderId : null;
                        this.nativeUrl = `wfmall/consumption_goods_detail?sequenceId=${this.sequenceId}&orderId=${this.orderId}&goodsId=${this.detail.jSequence.goods.id}&type=${this.$route.type}`;
                        [this.banner.imgs, this.banner.totalNum] = [res.mainPics, res.mainPics.length];
                        let jDrawType = this.detail.jSequence.lotteryWay.jDrawType;
                        if (jDrawType === 'bytime' || jDrawType === 'bytime_and_bymember' || jDrawType === 'bytime_or_bymember') {
                            this.countDownStart();
                        }
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
                        this.baiFenBi = percentNum > 98 ? parseInt(percentNum) + "%" : percentNum + "%";
                    })
                    .catch(err => {
                        this.$vux.toast.text(err.message, 'middle');
                    })
                    .finally(() => {
                        this.$vux.loading.hide();
                    })
            },

            //中奖分享
            winningShare() {
                let params = {
                    detail: this.detail
                };
                callNative('shareMyLottery', JSON.stringify(params));
            },

            //计算开奖方式
            computedLotteryDrawType(type) {
                let drawType = getSafe(() => this.detail.jSequence.lotteryWay.jDrawType, '');
                return type === drawType;
            },
            // 提醒打开APP
            showMore() {
                wakeNative.call(this, "gc");
            },
            goToShopHomePage() {
            },
            openAllComments() {
            },
            openLotteryDetail() {
            },
            openAllParticipant() {
            },
            openAlgorithm() {
            }
        },

        computed: {
            //是否开奖
            lotteryIsOpended() {
                let status = getSafe(() => this.detail.jSequence.jPeriodState, '');
                return status === 'finished_status';
            },
            lotteryNotRunning() {
                let status = getSafe(() => this.detail.jSequence.jPeriodState, '');
                return status === 'not_running';
            },
            lotteryRunning() {
                let status = getSafe(() => this.detail.jSequence.jPeriodState, '');
                return status === 'running';
            },
            //按时间开奖
            lotteryBytime() {
                let drawType = getSafe(() => this.detail.jSequence.lotteryWay.jDrawType, '');
                return 'bytime' === drawType;
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

            //按人数开奖
            lotteryBymember() {
                let drawType = getSafe(() => this.detail.jSequence.lotteryWay.jDrawType, '');
                return 'bymember' === drawType;
            },
        },
        components: {
            HistoryPublish,
            LotteryPopup,
            Swiper,
            SwiperItem,
            XNumber,
            Group,
            Toast,
            Loading,
            XButton,
            CustomCell,
            LotteryHistory,
            LotterySchedule,
            WinningDetail,
            DetailRichText,
            ShowMore,
            NavigationLabel
        },
    }
</script>
<style lang="scss" scoped type="text/scss">
    $color4A90FA: #4A90FA;
    $colorFF7E00: #FF7E00;
    .ptb-50 {
        padding-bottom: 50px;
        }

    .welfGoodsDetails_wrapper {
        position: relative;
        height: 100%;
        }

    /*
    开奖状态
    */
    .lottery-status {
        flex-shrink: 0;
        font-size: 16px;
        color: $colorFF7E00;
        font-weight: bold;
        &.opened {
            color: $color4A90FA;
            }
        }

    /*
    开奖进度
    */
    .lottery-schedule {
        height: 10px;
        margin: 10px 0 0;
        background: #DFE2E6;
        border-radius: 10px;
        > div {
            height: 10px;
            background: $color4A90FA;
            border-radius: 10px;
            position: relative;
            min-width: 40px;
            span {
                width: 40px;
                height: 16px;
                display: block;
                position: absolute;
                background: $color4A90FA;
                line-height: 16px;
                color: #FFFFFF;
                border-radius: 8px;
                text-align: center;
                font-size: 10px;
                box-shadow: 0 0 4px 0 rgba(0, 0, 0, 0.17);
                right: 0;
                top: -3px;
                }
            }
        }

    /*
    开奖要求  按注数开奖
    */
    .open-demand {
        display: flex;
        justify-content: space-between;
        align-items: center;
        font-size: 13px;
        padding: 10px 0;
        color: #999999;
        }

    .custom-cell {
        height: 54px;
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 0 10px;
        background: #FFFFFF;
        border-bottom: 1px solid #F1F1F1;
        &::after {
            content: '';
            width: 7px;
            height: 12px;
            background: no-repeat url("~assets/image/arrow-right.png") center / 100% 100%;
            flex-shrink: 0;
            }
        .left-content {
            display: flex;
            align-items: center;
            justify-content: space-between;
            color: #222222;
            font-size: 14px;
            margin-right: 6px;
            height: 18px;
            line-height: 18px;
            flex-grow: 1;
            span:last-child {
                color: #CCCCCC;
                }
            }
        }

    .bottom-status {
        width: 100%;
        height: 50px;
        display: flex;
        align-items: center;
        justify-content: center;
        color: #FFFFFF;
        font-size: 17px;
        position: absolute;
        bottom: 0;
        left: 0;
        background: #EE6161;
        &.order-tip {
            background: #F1F1F1;
            color: #777777;
            }
        }

    /*
    店铺主页
    */
    .shop-home {
        display: flex;
        height: 44px;
        padding: 0 10px;
        align-items: center;
        justify-content: space-between;
        background: #FFFFFF;
        margin-top: 10px;
        span:last-child {
            height: 12px;
            width: 7px;
            background: no-repeat url("../../assets/image/arrow-right-gray.png") center center / 100% 100%;
            }
        }

    .custom-cell {
        height: 54px;
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 0 10px;
        background: #FFFFFF;
        border-bottom: 1px solid #F1F1F1;
        &::after {
            content: '';
            width: 7px;
            height: 12px;
            background: no-repeat url("~assets/image/arrow-right.png") center / 100% 100%;
            flex-shrink: 0;
            }
        .left-content {
            display: flex;
            align-items: center;
            justify-content: space-between;
            color: #222222;
            font-size: 14px;
            margin-right: 6px;
            height: 18px;
            line-height: 18px;
            flex-grow: 1;
            span:last-child {
                color: #CCCCCC;
                }
            }
        }

    /*
    参与详情
    */
    .goods-detail {
        .join-info.lineHeader {
            border-bottom: 1px solid #F1F1F1;
            }
        }

    .participate-list {
        ul {
            padding-left: 15px;
            li {
                padding-top: 10px;
                height: 75px;
                display: flex;
                .participant-avatar {
                    height: 40px;
                    width: 40px;
                    flex-shrink: 0;
                    img {
                        border-radius: 5px;
                        height: 100%;
                        width: 100%;
                        object-fit: cover;
                        }
                    }
                .participant-info {
                    margin-left: 10px;
                    flex-grow: 1;
                    border-bottom: 1px solid #F1F1F1;
                    min-width: 0;
                    p {
                        font-size: 14px;
                        color: #222222;
                        line-height: 16px;
                        }
                    p.quantity {
                        font-size: 12px;
                        color: #777777;
                        margin-top: 7px;
                        span {
                            color: #EE6161;
                            }
                        }
                    p:last-child {
                        font-size: 12px;
                        color: #777777;
                        margin-top: 1px;
                        }
                    }
                }
            }
        }

    /*
    查看更多参与者
    */
    .show-more-participate {
        color: #4A90FA;
        display: flex;
        height: 44px;
        align-items: center;
        justify-content: center;
        span:last-child {
            display: flex;
            height: 12px;
            width: 7px;
            margin-left: 5px;
            background: no-repeat url("~assets/image/arrow-right-blue.png") 0 0 / 100% 100%;
            }
        }

    /*
    中奖详情
    */
    .winning-detail {
        padding: 0 15px;
        margin-top: 10px;
        background: #FFFFFF;
        .lineHeader {
            width: 100vw;
            margin: 0 -15px;
            }
        .prize-detail {
            padding: 10px 0;
            p {
                color: #555555;
                font-size: 14px;
                line-height: 22px;
                margin-top: 3px;
                span {
                    color: #EE6161;
                    }
                }
            border-bottom: 1px solid #F1F1F1;
            }
        .auto-open-lottery {
            font-size: 14px;
            text-align: center;
            color: #555555;
            line-height: 50px;
            }
        .winner-detail {
            display: flex;
            padding: 10px 0;
            > div:last-child {
                flex-grow: 1;
                min-width: 0;
                }
            .winner-avatar {
                height: 40px;
                width: 40px;
                flex-shrink: 0;
                img {
                    display: block;
                    width: 100%;
                    height: 100%;
                    object-fit: cover;
                    border-radius: 5px;
                    }
                }
            .winner-info {
                margin-left: 10px;
                p {
                    font-size: 12px;
                    color: #777777;
                    line-height: 16px;
                    }
                p:first-child {
                    display: flex;
                    font-size: 14px;
                    color: #222222;
                    justify-content: space-between;
                    align-items: center;
                    margin-bottom: 6px;
                    span:first-child {
                        flex-grow: 1;
                        }
                    span:last-child {
                        color: #4A90FA;
                        flex-shrink: 0;
                        margin-left: 5px;
                        }
                    }
                }
            .show-lottery {
                margin-top: 10px;
                padding-left: 10px;
                p {
                    font-size: 12px;
                    color: #777777;
                    line-height: 18px;
                    }
                ul {
                    display: flex;
                    flex-wrap: wrap;
                    margin-left: -5px;
                    li {
                        margin-right: 10px;
                        margin-top: 10px;
                        height: 68px;
                        width: 68px;
                        img {
                            height: 100%;
                            width: 100%;
                            border-radius: 5px;
                            }
                        }
                    }
                }
            }
        }

    .welfDestrucption_row {
        font-size: 13px;
        line-height: 13.0000125px;
        margin-top: 11px;
        }

    .yellow {
        background: #F39B2E !important;
        }

    .button-gray {
        background: #E5E5E5 !important;
        color: #222222 !important;
        border: none !important;
        }

    .commentColumn {
        height: 60px;
        display: flex;
        padding: 10px 15px;
        border-top: 1px solid #DFE2E6;
        }

    div.prizeDetailBox {
        .rate {
            display: flex;
            margin-right: 15px;
            padding-top: 5px;
            width: 22px;
            /* height: 22px; */

            img {
                width: 22px;
                height: 22px;
                margin-right: 0px;
                }

            span {
                width: 20px;
                height: 20px;
                display: inline-block;
                border-radius: 100%;
                border: 1px solid #CCCCCC;
                color: #999999;
                line-height: 20px;
                text-align: center;
                }
            }

        > img {
            width: 36px;
            height: 36px;
            border-radius: 50%;
            }

        .circle {
            width: 20px;
            height: 20px;
            display: inline-block;
            border: 1px solid gray;
            border-radius: 100%;
            }

        .tit {
            span:nth-child(2) {
                color: #4A90FA !important;
                }
            }

        .welfText {
            margin-top: 10px;

            .imgWrapper {
                height: 49px;

                img {
                    width: 48px;
                    height: 48px;
                    margin-right: 7px;
                    }
                }

            .tesx3 {
                word-break: break-all;
                color: #777777;
                }
            }
        }

    .evaluateRow {
        align-items: center;
        }

    .alignCenter {
        align-items: flex-start;
        .evaluateRight .tit {
            align-items: center;
            }
        }

</style>

<style lang="scss" scoped type="text/scss">
    .goods-title {
        background: #FFFFFF;
        padding: 0 10px 10px;
        .title {
            padding: 10px 0;
            span {
                color: #EE6161;
                }
            }
        }

    .goods-detail {
        margin-top: 10px;
        background: #FFFFFF;
        padding-bottom: 10px;
        }

    .goods-header {
        position: relative;
        }

    .dots {
        display: block;
        position: absolute;
        width: 35px;
        height: 18px;
        line-height: 19px;
        font-size: 12px;
        color: #FFFFFF;;
        background-color: rgba(0, 0, 0, .5);
        border-radius: 10px;
        bottom: 10px;
        right: 10px;
        text-align: center;
        }

    .welfDestrucption_row {
        font-size: 13px;
        line-height: 13.0000125px;
        margin-top: 11px;
        }

    .yellow {
        background: #F39B2E !important;
        }

    .commentColumn {
        height: 60px;
        display: flex;
        padding: 10px 15px;
        border-top: 1px solid #DFE2E6;
        }

    div.prizeDetailBox {
        .rate {
            display: flex;
            margin-right: 15px;
            padding-top: 5px;
            width: 22px;
            /* height: 22px; */

            img {
                width: 22px;
                height: 22px;
                margin-right: 0px;
                }

            span {
                width: 20px;
                height: 20px;
                display: inline-block;
                border-radius: 100%;
                border: 1px solid #CCCCCC;
                color: #999999;
                line-height: 20px;
                text-align: center;
                }
            }

        > img {
            width: 36px;
            height: 36px;
            border-radius: 50%;
            }

        .circle {
            width: 20px;
            height: 20px;
            display: inline-block;
            border: 1px solid gray;
            border-radius: 100%;
            }

        .tit {
            span:nth-child(2) {
                color: #4A90FA !important;
                }
            }

        .welfText {
            margin-top: 10px;

            .imgWrapper {
                height: 49px;

                img {
                    width: 48px;
                    height: 48px;
                    margin-right: 7px;
                    }
                }

            .tesx3 {
                word-break: break-all;
                color: #777777;
                }
            }
        }

    .evaluateRow {
        align-items: center;
        }

    .alignCenter {
        align-items: flex-start;
        .evaluateRight .tit {
            align-items: center;
            }
        }
</style>
<style lang="scss" scoped type="text/scss" src="./welfFareGoodsDetails.scss"></style>
<style lang="scss" type="text/scss" scoped>
    .welfConsumptionDetails {
        .goods-detail {
            /deep/ img {
                max-width: 100% !important;
                }
            }
        }
</style>
<style lang="scss" type="text/scss" scoped src="./welfFareGoodsDetailsRevision.scss"></style>
