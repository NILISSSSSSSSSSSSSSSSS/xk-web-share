<template>
    <div class="order-detail-shared">
        <div class="ios-scroll">
            <div class="order-container">
                <!--订单状态-->
                <div class="order-status">
                    <p class="status-text">{{orderStatus.value}}</p>
                    <!--<p class="order-tips">-->
                    <!--温馨提示:该订单预约时间过后无法退款，请及时消费-->
                    <!--</p>-->
                </div>
                <!--二维码-->
                <div class="quick-mark"
                     v-if="orderDetail.sceneStatus!=='TAKE_OUT'&&orderStatus.key=='STAY_CONSUMPTION'">
                    <canvas height="105px" width="105px" ref="canvas"></canvas>
                    <p>{{orderDetail.consumeCode}}</p>
                    <span class="block">
                    凭此消费码到店消费
                </span>
                </div>

                <!--外卖-->
                <div v-if="orderDetail.bcleGoodsType=='1004'||orderDetail.bcleGoodsType=='1005'">
                    <div class="store take-out" v-if="orderDetail.isSelfLifting===1">
                        <div class="order-number padding-both-sides-10">
                            <p>配送方式</p>
                            <p>上门自取</p>
                        </div>
                        <div class="order-number padding-both-sides-10">
                            <p>取货时间</p>
                            <p>{{orderDetail.appointRange.split('-')[0] | formatTime("YYYY-MM-DD HH:mm")}}-
                                {{orderDetail.appointRange.split('-')[1] | formatTime("HH:mm")}}</p>
                        </div>
                        <div class="pay-time order-number padding-both-sides-10">
                            <p>取货地址</p>
                            <p class="text-overflow" style="background: none;color: #222222">{{orderDetail.address}}</p>
                        </div>
                    </div>

                    <!--外卖-待接单-->
                    <div class="store take-out"
                         v-if="orderDetail.isSelfLifting=='0'&&(orderDetail.bcleGoodsType=='1004' || orderDetail.bcleGoodsType=='1005')">
                        <div class="order-number padding-both-sides-10">
                            <p>预约送达时间</p>
                            <p>{{orderDetail.appointRange.split('-')[0]
                                |formatTime("")}}-{{orderDetail.appointRange.split('-')[1] | formatTime('HH:mm')}}</p>
                        </div>
                        <div class="pay-time order-number padding-both-sides-10">
                            <p>配送方式</p>
                            <p class="text-overflow" style="background: none;color: #222222">送货上门</p>
                        </div>
                    </div>

                    <!--外卖-进行中-->
                    <!--    <div class="store take-out">
                            <div class="order-number padding-both-sides-10">
                                <p>配送方式</p>
                                <p>上门自取</p>
                            </div>
                            <div class="order-number padding-both-sides-10">
                                <p>取货时间</p>
                                <p>{{orderId}}</p>
                            </div>
                            <div class="pay-time order-number padding-both-sides-10">
                                <p>取货地址</p>
                                <p class="text-overflow">{{orderDetail.address}}</p>
                            </div>
                        </div>-->
                </div>

                <!--店铺-->
                <div class="store">
                    <div class="store-name padding-both-sides-10">
                        <p>{{orderDetail.shopName}}</p>
                        <p class="text-overflow" @click="showShopDetailAddress">{{orderDetail.address}}</p>
                    </div>
                    <div class="order-number padding-both-sides-10">
                        <p>订单编号</p>
                        <p>{{orderId}}</p>
                    </div>
                    <div class="order-number padding-both-sides-10">
                        <p>下单时间</p>
                        <p>{{orderDetail.createdAt | formatTime("YYYY-MM-DD HH:mm")}}</p>
                    </div>
                    <div v-if="orderDetail.sceneStatus==`SERVICE_AND_LOCALE_BUY`||orderDetail.sceneStatus==`LOCALE_BUY`"
                         class="pay-time order-number padding-both-sides-10">
                        <p>订单密码</p>
                        <p>{{orderDetail.orderCipher}}</p>
                    </div>
                </div>


                <!--外卖显示-->
                <div class="reserve" v-if="orderDetail.bcleGoodsType=='1004' || orderDetail.bcleGoodsType=='1005'">
                    <div class="padding-both-sides-10 border-bottom-1px">
                        <p>配送服务</p>
                        <p>{{orderDetail.isSelfLifting===0?'商家配送':'上门自取'}}</p>
                    </div>
                    <div class="padding-both-sides-10 border-bottom-1px">
                        <p>预约手机</p>
                        <p>{{orderDetail.subPhone || '无'}}</p>
                    </div>
                    <div class="padding-both-sides-10 border-bottom-1px">
                        <p>备注</p>
                        <p>{{orderDetail.remark || '无'}}</p>
                    </div>
                </div>

                <!--订单列表-->
                <div class="seat service" v-if="orderDetail.bcleGoodsType!='1002' && orderDetail.bcleGoodsType!='1003'">
                    <p v-if="orderDetail.bcleGoodsType=='1001' || orderDetail.bcleGoodsType=='1003'"
                       class="service-header padding-both-sides-10 border-bottom-1px">
                        {{this.orderDetail.sceneStatus | sceneStatusFilter }}
                    </p>
                    <p v-else class="service-header padding-both-sides-10 border-bottom-1px">
                        {{this.orderDetail.shopName}}
                    </p>
                    <ul class="service-list">
                        <template v-if="orderDetail.items && orderDetail.items.length">
                            <li class="service-item border-bottom-1px"
                                v-for="(item,$index) in orderDetail.items"
                                :key="$index">
                                <div class="service-img">
                                    <img :src="item.skuUrl"
                                         class="block img-object-fit-cover" alt="">
                                </div>
                                <template v-if="item.refundId!=0">
                                    <div class="service-detail">
                                        <p class="store-address">
                                            <span>{{item.goodsName}}</span>
                                            <span>x1</span>
                                        </p>
                                        <p class="model" v-if="orderDetail.bcleGoodsType!='1003'">
                                            <span>{{item.skuName}}</span>
                                        </p>
                                        <p class="model" v-if="orderDetail.bcleGoodsType=='1003'">
                                            <span>{{item.skuName}}</span>
                                            <span>共{{dayDiff(orderDetail.appointRange.split('-')[0],orderDetail.appointRange.split('-')[1])}}晚</span>
                                        </p>
                                        <p class="model" v-if="item.refundId!='0'"
                                           style="color: #4A90FA;margin-top: 5px">
                                            售后号: {{item.refundId}}
                                        </p>
                                        <div class="price" style="margin-top: 5px">
                                            <p>
                                                ¥{{item.platformPrice | formatPrice}}
                                                <del>(市场价¥{{item.originalPrice | formatPrice}})</del>
                                            </p>
                                            <span class="action-btn" @click="addGoods">
                                            {{item | serviceStatusFilter}}
                                        </span>
                                        </div>
                                    </div>
                                </template>
                                <template v-else>
                                    <div class="service-detail">
                                        <p class="store-address">
                                            <span>{{item.goodsName}}</span>
                                            <span>x1</span>
                                        </p>
                                        <p class="model" v-if="orderDetail.bcleGoodsType!='1003'">
                                            <span>{{item.skuName}}</span>
                                        </p>
                                        <p class="model" v-if="orderDetail.bcleGoodsType=='1003'">
                                            <span>{{item.skuName}}</span>
                                            <span>共{{dayDiff(orderDetail.appointRange.split('-')[0],orderDetail.appointRange.split('-')[1])}}晚</span>
                                        </p>
                                        <div class="price">
                                            <p>
                                                ¥{{item.platformPrice | formatPrice}}
                                                <del>(市场价¥{{item.originalPrice | formatPrice}})</del>
                                            </p>
                                            <span class="action-btn" v-if="item.refundId!=0" @click="addGoods">
                                            {{item | serviceStatusFilter}}
                                        </span>
                                        </div>
                                    </div>
                                </template>
                            </li>
                        </template>
                    </ul>
                    <div class="reserve" v-if="orderDetail.status=='del'&&orderDetail.isAgree==0"
                         style="border-radius: unset;box-shadow: unset;margin-top: 0">
                        <div class="padding-both-sides-10 border-bottom-1px">
                            <p>订单总额</p>
                            <p>￥{{serviceOrderAmount | formatPrice}}</p>
                        </div>
                        <div class="padding-both-sides-10 border-bottom-1px">
                            <p>商家优惠价</p>
                            <p>￥{{orderDetail.itemShopVoucherPrice|formatPrice}}</p>
                        </div>
                        <div class="padding-both-sides-10 border-bottom-1px">
                            <p>实际支付</p>
                            <p>￥{{orderDetail.totalRmbPrice | formatPrice}}</p>
                        </div>
                        <div class="padding-both-sides-10 border-bottom-1px">
                            <p>现金支付</p>
                            <p>￥{{orderDetail.itemOriginalPrice | formatPrice}}</p>
                        </div>
                        <div class="padding-both-sides-10 border-bottom-1px">
                            <p>消费券支付</p>
                            <p>￥{{orderDetail.itemVoucherPrice | formatPrice}}</p>
                        </div>
                        <div class="padding-both-sides-10 border-bottom-1px">
                            <p>商家券支付</p>
                            <p>￥{{orderDetail.itemShopVoucherPrice |formatPrice}}</p>
                        </div>
                    </div>
                    <div class="service-summary padding-both-sides-10" v-else>
                        <div v-if="(orderDetail.bcleGoodsType=='1004'||orderDetail.bcleGoodsType=='1005') && orderDetail.isSelfLifting=='0'"
                             class="service-amount">
                            <span>配送费</span>
                            <span>￥{{serviceOrderAmount | formatPrice}}</span>
                        </div>
                        <div class="service-amount">
                            <span>订单总额</span>
                            <span>￥{{serviceOrderAmount | formatPrice}}</span>
                        </div>
                    </div>

                </div>


                <!--酒店-->
                <template v-if="orderDetail.bcleGoodsType==`1003`">
                    <!--订单列表-->
                    <div class="seat service">
                        <p v-if="orderDetail.bcleGoodsType=='1001' || orderDetail.bcleGoodsType=='1003'"
                           class="service-header padding-both-sides-10 border-bottom-1px">
                            酒店
                        </p>
                        <ul class="service-list">
                            <template v-if="orderDetail.items && orderDetail.items.length">
                                <li class="service-item border-bottom-1px" v-for="(item,$index) in orderDetail.items">
                                    <div class="service-img">
                                        <img :src="item.skuUrl"
                                             class="block img-object-fit-cover" alt="">
                                    </div>
                                    <template v-if="item.refundId!='0'">
                                        <div class="service-detail">
                                            <p class="store-address">
                                                <span>{{item.goodsName}}</span>
                                                <span>x1</span>
                                            </p>
                                            <p class="model">
                                                <span>{{item.skuName}}</span>
                                                <span>共{{dayDiff(orderDetail.appointRange.split('-')[0],orderDetail.appointRange.split('-')[1])}}晚</span>
                                            </p>
                                            <p class="model" style="color: #4A90FA;margin-top: 5px">
                                                售后号:{{item.refundId}}
                                            </p>
                                            <div class="price" style="margin-top: 5px">
                                                <p>
                                                    ¥{{item.platformPrice | formatPrice}}
                                                    <del>(市场价¥{{item.originalPrice | formatPrice}})</del>
                                                </p>
                                                <span class="action-btn" @click="addGoods">
                                            {{item | serviceStatusFilter}}
                                        </span>
                                            </div>
                                        </div>
                                    </template>

                                    <template v-else>
                                        <div class="service-detail">
                                            <p class="store-address">
                                                <span>{{item.goodsName}}</span>
                                                <span>x1</span>
                                            </p>
                                            <p class="model">
                                                <span>{{item.skuName}}</span>
                                                <span>共{{dayDiff(orderDetail.appointRange.split('-')[0],orderDetail.appointRange.split('-')[1])}}晚</span>
                                            </p>
                                            <div class="price">
                                                <p>
                                                    ¥{{item.platformPrice | formatPrice}}
                                                    <del>(市场价¥{{item.originalPrice | formatPrice}})</del>
                                                </p>
                                                <span class="action-btn" @click="addGoods">
                                            {{item | serviceStatusFilter}}
                                        </span>
                                            </div>
                                        </div>
                                    </template>
                                    <template slot="action">
                                        <div class="remove" @click="removeGoods">
                                            删除
                                        </div>
                                    </template>
                                </li>
                            </template>
                        </ul>
                        <!--售后中-->
                        <div class="reserve" v-if="orderDetail.status=='del'&&orderDetail.isAgree==0"
                             style="border-radius: unset;box-shadow: unset;margin-top: 0">
                            <div class="padding-both-sides-10 border-bottom-1px">
                                <p>订单总额</p>
                                <p>￥{{serviceOrderAmount | formatPrice}}</p>
                            </div>
                            <div class="padding-both-sides-10 border-bottom-1px">
                                <p>商家优惠价</p>
                                <p>{{orderDetail.appointRange.split('-')[1] | formatTime('YYYY-MM-DD')}}</p>
                            </div>
                            <div class="padding-both-sides-10 border-bottom-1px">
                                <p>实际支付</p>
                                <p>{{orderDetail.subPhone || '无'}}</p>
                            </div>
                            <div class="padding-both-sides-10 border-bottom-1px">
                                <p>现金支付</p>
                                <p>{{orderDetail.items.length}}</p>
                            </div>
                            <div class="padding-both-sides-10 border-bottom-1px">
                                <p>消费券支付</p>
                                <p>{{orderDetail.consumerNum}}</p>
                            </div>
                            <div class="padding-both-sides-10 border-bottom-1px">
                                <p>商家券支付</p>
                                <p>{{orderDetail.remark || '无'}}</p>
                            </div>
                        </div>
                        <div class="service-summary padding-both-sides-10" v-else>
                            <div v-if="orderDetail.bcleGoodsType=='1004'"
                                 class="service-amount">
                                <span>配送费</span>
                                <span>￥{{serviceOrderAmount | formatPrice}}</span>
                            </div>
                            <div class="service-amount">
                                <span>订单总额</span>
                                <span>￥{{serviceOrderAmount | formatPrice}}</span>
                            </div>
                            <!-- <div class="service-pay">
                                 xx会员卡减¥8 微信支付¥58
                             </div>-->
                        </div>
                    </div>

                    <!--住宿显示-->
                    <div class="reserve" v-if="orderDetail.bcleGoodsType=='1003'">
                        <div class="padding-both-sides-10 border-bottom-1px">
                            <p>住店时间</p>
                            <p>{{orderDetail.appointRange.split('-')[0] | formatTime('YYYY-MM-DD')}}</p>
                        </div>
                        <div class="padding-both-sides-10 border-bottom-1px">
                            <p>离店时间</p>
                            <p>{{orderDetail.appointRange.split('-')[1] | formatTime('YYYY-MM-DD')}}</p>
                        </div>
                        <div class="padding-both-sides-10 border-bottom-1px">
                            <p>预约手机</p>
                            <p>{{orderDetail.subPhone || '无'}}</p>
                        </div>
                        <div class="padding-both-sides-10 border-bottom-1px">
                            <p>房间数</p>
                            <p>{{orderDetail.items.length}}</p>
                        </div>
                        <div class="padding-both-sides-10 border-bottom-1px">
                            <p>人数</p>
                            <p>{{orderDetail.consumerNum}}</p>
                        </div>
                        <div class="padding-both-sides-10 border-bottom-1px">
                            <p>备注</p>
                            <p>{{orderDetail.remark || '无'}}</p>
                        </div>
                    </div>
                </template>


                <!--预约-->
                <div class="reserve"
                     v-if="orderDetail.bcleGoodsType!='1004'&&orderDetail.bcleGoodsType!='1003' && orderDetail.bcleGoodsType!='1005'">
                    <template v-if="!(orderDetail.sceneStatus==='LOCALE_BUY')">
                        <div class="padding-both-sides-10 border-bottom-1px">
                            <p>预约时间</p>
                            <p>{{Number(orderDetail.appointRange) | formatTime("YYYY-MM-DD HH:mm")}}</p>
                        </div>
                    </template>
                    <div class="padding-both-sides-10 border-bottom-1px"
                         v-if="orderDetail.sceneStatus==`SERVICE_AND_LOCALE_BUY` ||orderDetail.sceneStatus==`LOCALE_BUY`">
                        <p>席位选择</p>
                        <p>已选 {{purchases.length}} 个</p>
                    </div>
                    <template v-if="!(orderDetail.sceneStatus==='LOCALE_BUY')">
                        <div class="padding-both-sides-10 border-bottom-1px">
                            <p>预约手机</p>
                            <p>{{orderDetail.subPhone || '无'}}</p>
                        </div>
                    </template>
                    <div class="padding-both-sides-10 border-bottom-1px">
                        <p>人数</p>
                        <p>{{orderDetail.consumerNum}}</p>
                    </div>
                    <div class="padding-both-sides-10 border-bottom-1px">
                        <p>备注</p>
                        <p>{{orderDetail.remark || '无'}}</p>
                    </div>
                </div>
                <!--席位-->
                <template
                        v-if="orderDetail.sceneStatus==`SERVICE_AND_LOCALE_BUY` ||orderDetail.sceneStatus==`LOCALE_BUY`">
                    <div class="seat service"
                         v-if="orderDetail.bcleGoodsType=='1001'||orderDetail.bcleGoodsType=='1002'">
                        <template v-for="(item,$index) in purchases">
                            <div class="service-header padding-both-sides-10 border-bottom-1px">
                                <p>席位:{{item.seatName}}</p>
                                <!-- <p @click="addGoods">添加</p>-->
                            </div>
                            <ul class="service-list" v-if="item.purchases.length">
                                <li class="service-item border-bottom-1px"
                                    v-for="(purchases,$purchasesIndex) in item.purchases"
                                    :key="$purchasesIndex">
                                    <div class="service-img">
                                        <img :src="purchases.goodsSkuUrl"
                                             class="block img-object-fit-cover" alt="">
                                    </div>
                                    <div class="service-detail">
                                        <p class="store-address">
                                            <span>{{purchases.goodsName}}</span>
                                            <span>x1</span>
                                        </p>
                                        <p class="model">{{purchases.goodsSkuName}}</p>
                                        <div class="price">
                                            <p>
                                                ¥{{purchases.platformPrice | formatPrice}}
                                                <del>(市场价¥{{purchases. originalPrice | formatPrice}})</del>
                                            </p>
                                            <span class="action-btn" @click="addGoods">
                                            {{purchases | purchasesStatusFilter}}
                                    </span>
                                        </div>
                                    </div>
                                    <template slot="action">
                                        <div class="remove" @click="removeGoods">
                                            删除
                                        </div>
                                    </template>
                                </li>
                            </ul>
                            <div v-else class="no-comment">
                                暂无加购
                            </div>
                        </template>
                        <div class="service-summary padding-both-sides-10">
                            <div class="service-amount">
                                <span>数量</span>
                                <span>*{{purchasesLength}}</span>
                            </div>
                            <div class="service-amount">
                                <span>订单金额</span>
                                <span>￥ {{purchasesAmount | formatPrice}}</span>
                            </div>
                        </div>
                    </div>
                </template>

                <!--退款中  显示退款信息-->
                <div class="reserve"
                     v-if="orderDetail.isAgree=='0' && orderDetail.status=='del'">
                    <template v-if="!(orderDetail.sceneStatus==='LOCALE_BUY')">
                        <div class="padding-both-sides-10 border-bottom-1px">
                            <p>现金退款</p>
                            <p>{{orderDetail.appointRange | formatTime("YYYY-MM-DD HH:mm")}}</p>
                        </div>
                    </template>
                    <div class="padding-both-sides-10 border-bottom-1px">
                        <p>商家券退款</p>
                        <p>已选 {{purchases.length}} 个</p>
                    </div>
                    <template v-if="!(orderDetail.sceneStatus==='LOCALE_BUY')">
                        <div class="padding-both-sides-10 border-bottom-1px">
                            <p>消费券退款</p>
                            <p>{{orderDetail.subPhone || '无'}}</p>
                        </div>
                    </template>
                    <div class="padding-both-sides-10 border-bottom-1px">
                        <p>卡券退款</p>
                        <p>{{orderDetail.consumerNum}}</p>
                    </div>
                    <div class="padding-both-sides-10 border-bottom-1px">
                        <p>优惠说明</p>
                        <p>{{orderDetail.remark || '无'}}</p>
                    </div>
                </div>
            </div>
        </div>
        <show-more :url="nativeUrl"></show-more>
    </div>
</template>


<script>
    import {Clipboard, getSafe, dayDiff} from '@/util/publicMehotds'
    import QRCode from 'qrcode'
    import ShowMore from "@/components/ShowMore";

    export default {
        components: {
            ShowMore,
        },
        data() {
            return {
                nativeUrl: '',
                dayDiff: dayDiff,
                orderId: '',    //订单id
                orderDetail: {},    //订单详情
                purchases: [],      //服务加购
                purchasesLength: 0,
                masterStatus: [
                    {
                        sceneStatus: "SERVICE_OR_STAY", //服务住宿
                        value: {
                            STAY_ORDER: "待接单",
                            STAY_PAY: "待付款",
                            STAY_CONSUMPTION: "待消费",
                            STAY_EVALUATE: "待评价",
                            COMPLETELY: "已完成"
                        }
                    },
                    {
                        sceneStatus: "TAKE_OUT", //外卖
                        value: {
                            STAY_ORDER: "待接单",
                            STAY_PAY: "待付款",
                            STOCK_CENTRE: "备货中",
                            PROCESS_CENTRE: "进行中",
                            SHOP_DELIVERY: "已送达",
                            STAY_EVALUATE: "待评价",
                            COMPLETELY: "已完成"
                        },
                    },
                    {
                        sceneStatus: "LOCALE_BUY", //现场购物
                        value: {
                            STAY_ORDER: "待接单",
                            CONSUMPTION_CENTRE: "进行中",
                            AGREE_PAY: "进行中",
                            STAY_CLEARING: "进行中",
                            STAY_EVALUATE: "待评价",
                            COMPLETELY: "已完成"
                        },
                    },
                    {
                        sceneStatus: "SERVICE_AND_LOCALE_BUY", //服务跟现场购物
                        value: {
                            STAY_ORDER: "待接单",
                            STAY_PAY: "待付款",
                            STAY_CONSUMPTION: "待消费",
                            CONSUMPTION_CENTRE: "进行中",
                            AGREE_PAY: "待结算",
                            STAY_CLEARING: "待付款",
                            STAY_EVALUATE: "待评价",
                            COMPLETELY: "已完成"
                        }
                    },
                    {
                        sceneStatus: 'ON_LINE_TAKE_OUT', //在线购物
                        value: {
                            STAY_ORDER: "待接单",
                            STAY_PAY: "待付款",
                            STOCK_CENTRE: "备货中",
                            PROCESS_CENTRE: "进行中",
                            SHOP_DELIVERY: "已送达",
                            STAY_EVALUATE: "待评价",
                            COMPLETELY: "已完成"
                        },
                    }
                ]
            }
        },
        created() {
            Clipboard.copy('text to be copied');
            this.orderId = this.$route.query.orderId;
            this.userId = this.$route.query.userId;
            this.getOrderDetail();

        },
        methods: {
            //获取订单详情
            getOrderDetail() {
                let params = {
                    orderId: this.orderId,
                    userId: this.userId
                };
                this.$vux.loading.show();
                this.$http.get(this.$api.shopOrderDetailForShare, params, true)
                    .then(res => {
                        this.orderDetail = res ? res : {};
                        this.nativeUrl = `order/businesscircle/orderdetail?orderId=${this.orderId}`;
                        if (this.orderDetail.items) {
                            this.purchases = this.orderDetail.items.reduce((accumulator, item) => {
                                let obj = {};
                                obj.seatName = item.seatName;
                                obj.purchases = item.purchases || [];
                                accumulator.push(obj);
                                return accumulator;
                            }, []);
                        }

                        let qrcodeRule = `xkgc://offline_consumption_order?orderId=
                        ${this.orderId}&orderType=
                        ${this.orderDetail.orderType}&consumptionCode=
                        ${this.orderDetail.consumeCode}`;
                        this.$nextTick(() => {
                            QRCode.toCanvas(this.$refs.canvas, qrcodeRule, {
                                width: 105,
                                height: 105
                            }, (err) => {
                            })
                        })
                    })
                    .catch(error => {
                        this.$vux.toast.text(error.message, 'middle');
                    })
                    .finally(() => {
                        this.$vux.loading.hide();
                    })
            },

            //删除商品
            removeGoods() {
                this.$vux.toast.text('请下载App', 'middle');
            },
            //添加商品
            addGoods() {
                this.$vux.toast.text('请下载App', 'middle');
            },
            //显示店家地址
            showShopDetailAddress() {
                this.$router.push({
                    path: "/shareMap",
                    query: {
                        lng: this.orderDetail.lng,
                        lat: this.orderDetail.lat,
                        shopName: this.orderDetail.shopName,
                        address: this.orderDetail.address,
                        tel: this.orderDetail.contactPhones[0] || ""
                    }
                })
            },
        },
        computed: {

            //主订单状态
            orderStatus() {
                let orderStatus = this.orderDetail.orderStatus;
                let sceneStatus = this.orderDetail.sceneStatus;
                if (this.orderDetail.status === 'del') {
                    if (this.orderDetail.isAgree == 0) {
                        return {
                            value: '售后中',
                            key: ''
                        }
                    }
                    if (this.orderDetail.isAgree == 1 && this.orderDetail.orderStatus == 'COMPLETELY') {
                        return {
                            value: '已关闭',
                            key: ''
                        };
                    }
                } else {
                    let noStatus = {
                        value: '未知订单状态',
                        key: ''
                    };
                    if (orderStatus && sceneStatus) {
                        let result = this.masterStatus.find((item) => {
                            return item.sceneStatus === sceneStatus;
                        });
                        return result ? ({
                            value: result.value[orderStatus],
                            key: orderStatus
                        }) || noStatus : noStatus;
                    }
                    return noStatus;
                }
            },

            //席位金额
            purchasesAmount() {
                let price = 0;
                this.purchases.forEach((item) => {
                    item.purchases.forEach((next) => {
                        price += next.platformPrice;
                        this.purchasesLength += 1;
                    })
                });
                return price;
            },

            //服务订单金额
            serviceOrderAmount() {
                let price = 0;
                if (this.orderDetail.items) {
                    this.orderDetail.items.forEach(item => {
                        price += item.platformPrice;
                    });
                }
                return price;
            },

        },

        filters: {
            //当前业务场景
            sceneStatusFilter(val) {
                let sceneStatus = '';
                switch (val) {
                    case "SERVICE_OR_STAY":
                        sceneStatus = "服务住宿";
                        break;
                    case "TAKE_OUT":
                        sceneStatus = "外卖";
                        break;
                    case "LOCALE_BUY":
                        sceneStatus = "现场购物";
                        break;
                    case "SERVICE_AND_LOCALE_BUY":
                        sceneStatus = "服务";
                        break;
                    case "ON_LINE_TAKE_OUT":
                        sceneStatus = "在线购物";
                        break;
                }
                return sceneStatus;
            },

            /*服务订单状态*/
            serviceStatusFilter(val) {
                let payStatus = val.payStatus;
                if (payStatus === "APPLY_REFUND") {
                    return "待退款";
                }

                if (payStatus === "AGREE_REFUND") {
                    return "同意退款";
                }

                if (payStatus === "REFUSE_REFUND") {
                    return "拒绝退款";
                }
                if (payStatus === "REFUSE_REFUND") {
                    return "已退款";
                }
            },

            /*席位订单状态*/
            purchasesStatusFilter(val) {
                let mainStatus = val.mainStatus;
                let status = val.status;
                let payStatus = val.payStatus;
                if (mainStatus === "STAY_ORDER") {
                    return "待接单";
                }
                if (status === "del") {
                    return '已关闭'
                }
                if (payStatus === "NOT_PAY") {
                    if (val.isFree) {
                        return "已确认"
                    } else {
                        return "去支付"
                    }
                }

                if (payStatus === "DURING_PAY") {
                    return "支付中"
                }

                if (payStatus === "SUCCESS_PAY") {
                    return "已支付"
                }

                if (payStatus === "AGREE_REFUND") {
                    return "同意退款"
                }

                if (payStatus === "APPLY_REFUND") {
                    return "待退款"
                }

                if (payStatus === "REFUSE_REFUND") {
                    return "拒绝退款"
                }

                if (payStatus === "SUCCESS_REFUND") {
                    return "已退款"
                }

                if (payStatus === "FAILED_PAY") {
                    return "支付失败"
                }
            }
        }
    }
</script>
<style type="text/scss" lang="scss">
    .service-list {
        li {
            .slide {
                .slide-content {
                    }
                }
            }
        }
</style>
<style scoped type="text/scss" lang="scss">
    .order-detail-shared {
        height: 100%;
        overflow-y: hidden;
        padding-bottom: 60px;
        .border-bottom-1px {
            border-bottom: 1px solid #F1F1F1;
            }
        .padding-both-sides-10 {
            padding-left: 15px;
            padding-right: 15px;
            }
        .order-container {
            background: #F6F6F6;
            padding: 10px 10px 80px;
            /*状态*/
            .order-status {
                box-shadow: 0 0 4px 0 rgba(215, 215, 215, 0.50);
                border-radius: 8px;
                padding: 15px 34px 0;
                height: 66px;
                background: #FFFFFF url("../assets/image/order/order-time.png") no-repeat 15px 15px / 14px 14px;
                .status-text {
                    font-size: 14px;
                    color: #EE6161;
                    line-height: 14px;
                    }
                .order-tips {
                    font-size: 12px;
                    color: #999999;
                    letter-spacing: 0;
                    line-height: 12px;
                    margin-top: 10px;
                    }
                }
            /*二维码*/
            .quick-mark {
                height: 181px;
                background: #FFFFFF;
                box-shadow: 0 0 4px 0 rgba(215, 215, 215, 0.50);
                border-radius: 8px;
                text-align: center;
                padding-top: 15px;
                margin-top: 10px;
                canvas {
                    height: 105px;
                    width: 105px;
                    margin: 0 auto;
                    }
                p {
                    font-size: 14px;
                    color: #222222;
                    letter-spacing: 0;
                    text-align: center;
                    line-height: 14px;
                    margin-top: 15px;
                    }
                span {
                    font-size: 12px;
                    color: #777777;
                    letter-spacing: 0;
                    text-align: center;
                    line-height: 12px;
                    margin-top: 5px;
                    }
                }
            /*店铺*/
            .store {
                box-shadow: 0 0 4px 0 rgba(215, 215, 215, 0.50);
                border-radius: 8px;
                background: #FFFFFF;
                margin-top: 10px;
                > div {
                    p:first-child {
                        flex-shrink: 0;
                        margin-right: 8px;
                        }
                    }
                &.take-out {
                    height: auto;
                    & > div:last-child {
                        min-width: 0;
                        p:last-child {
                            color: #4A90FA;
                            background: no-repeat url("~assets/image/order/adress.png") 0 / 9px 12px;
                            padding-left: 15px;
                            }
                        }
                    }
                .store-name {
                    height: 70px;
                    border-bottom: 1px solid #F1F1F1;;
                    padding-top: 15px;

                    p:first-child {
                        font-size: 17px;
                        color: #222222;
                        line-height: 20px;
                        }
                    p:last-child {
                        font-size: 12px;
                        color: #999999;
                        line-height: 12px;
                        padding-left: 12px;
                        background: no-repeat url("~assets/image/order/adress.png") 0 / 9px 12px;
                        margin-top: 10px;
                        }
                    }
                .order-number {
                    height: 45px;
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                    border-bottom: 1px solid #F1F1F1;;
                    p:first-child {
                        font-size: 14px;
                        color: #777777;
                        line-height: 14px;
                        }
                    p:last-child {
                        font-size: 14px;
                        color: #222222;
                        text-align: right;
                        line-height: 14px;
                        }
                    }
                .pay-time {
                    border-bottom: none;
                    }
                }
            /*服务*/
            .service {
                margin-top: 10px;
                background: #FFFFFF;
                box-shadow: 0 0 4px 0 rgba(215, 215, 215, 0.50);
                border-radius: 8px;
                .no-comment {
                    border-bottom: 1px solid #F1F1F1;
                    color: #555555;
                    }
                .service-header {
                    height: 50px;
                    line-height: 50px;
                    font-weight: bold;
                    font-size: 14px;
                    color: #222222;
                    }
                .service-list {
                    li {
                        height: 110px;
                        .service-img {
                            width: 80px;
                            height: 80px;
                            object-fit: cover;
                            img {
                                height: 80px;
                                width: 100%;
                                border-radius: 5px;
                                }
                            }
                        .remove {
                            width: 68px;
                            background: #EE6161;
                            color: #FFFFFF;
                            height: 110px;
                            line-height: 110px;
                            text-align: center;
                            }
                        .service-detail {
                            flex: 1;
                            padding-left: 15px;
                            height: 80px;
                            & > p {
                                display: flex;
                                align-items: center;
                                span {
                                    display: block;
                                    }
                                }
                            p.store-address {
                                justify-content: space-between;
                                span {
                                    font-size: 12px;
                                    color: #222222;
                                    line-height: 12px;
                                    }
                                span:first-child {
                                    font-size: 14px;
                                    color: #222222;
                                    line-height: 14px;
                                    }
                                }
                            p.model {
                                font-size: 12px;
                                color: #777777;
                                line-height: 12px;
                                margin-top: 13px;
                                justify-content: space-between;
                                }
                            p.price {
                                font-size: 10px;
                                color: #EE6161;
                                line-height: 14px;
                                margin-top: 23px;
                                del {
                                    color: #CCCCCC;
                                    }

                                }
                            }
                        }
                    }
                .service-summary {
                    text-align: right;
                    height: 85px;
                    padding-top: 20px;
                    .service-amount {
                        font-size: 14px;
                        color: #777777;
                        line-height: 14px;
                        span:last-child {
                            color: #EE6161;
                            }
                        }
                    .service-pay {
                        margin-top: 15px;
                        font-size: 14px;
                        color: #999999;
                        line-height: 14px;
                        }
                    }
                }
            /*预约*/
            .reserve {
                margin-top: 10px;
                background: #FFFFFF;
                box-shadow: 0 0 4px 0 rgba(215, 215, 215, 0.50);
                border-radius: 8px;
                & > div {
                    padding: 15px;
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    p {
                        font-size: 14px;
                        color: #777777;
                        line-height: 16px;
                        width: 30%;
                        }
                    & > p:last-child {
                        color: #222222;
                        width: 70%;
                        text-align: right;
                        }
                    }
                & > div:last-child {
                    p:first-child {
                        align-self: flex-start;
                        }
                    }
                }
            .seat {
                box-shadow: 0 0 4px 0 rgba(215, 215, 215, 0.50);
                border-radius: 8px;
                .service-header {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    p {
                        width: 50%;
                        }
                    /* p:last-child {
                         text-align: right;
                         padding-right: 20px;
                         color: #4A90FA;
                         background: url("../assets/image/order/add.png") no-repeat right center / 16px 16px;
                         }*/
                    }
                .service-list {
                    li {
                        padding: 15px;
                        display: flex;
                        align-items: center;
                        height: 100%;
                        .service-detail {
                            div.price {
                                display: flex;
                                justify-content: space-between;
                                font-size: 10px;
                                color: #EE6161;
                                line-height: 14px;
                                margin-top: 23px;
                                del {
                                    color: #CCCCCC;
                                    }
                                .action-btn {
                                    color: #4A90FA;
                                    font-size: 14px;
                                    }
                                }
                            }
                        }
                    }
                .service-amount:last-child {
                    margin-top: 15px;
                    }
                }
            }
        .pay-now {
            position: fixed;
            background: #FFFFFF;
            width: 100%;
            height: 50px;
            bottom: 0;
            left: 0;
            text-align: right;
            z-index: 5;
            span {
                width: 105px;
                display: block;
                line-height: 50px;
                color: #FFFFFF;
                background: #4A90FA;
                text-align: center;
                float: right;
                height: 50px;
                }
            }
        }

</style>
