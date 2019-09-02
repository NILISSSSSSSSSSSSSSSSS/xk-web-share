import {getHashParameter} from '../util/publicMehotds'

let platform = "ua";
let client = getHashParameter("client");
if (client === "sh") {
    // platform = "ma"
}
const baseUrl = "/api/";

function getHost() {
    let host = location.host;
    let env = host.split('.')[0];
    return env;
}

/**
 *根据当前项目部署环境改变php接口地址
 * */
/*
let LIVE_VIDEO_BASE_URL = `//zb.dev.xksquare.com/index/Web/`;
*/
let LIVE_VIDEO_BASE_URL = `/index/Web/`;
/*
let LIVE_VIDEO_BASE_URL = `//zhibo.xksquare.com/index/Web/`;
*/
/*
if (getHost() === 'test') {
    LIVE_VIDEO_BASE_URL = `//zb.test.xksquare.com/index/Web/`;
}
if (getHost() === 'xkadmin') {
    LIVE_VIDEO_BASE_URL = `//zhibo.xksquare.com/index/Web/`
}
*/

export default {
    timestamp: baseUrl + "sys/" + platform + "/systemTime/1.0",
    //获取验证码
    sendAuthMessage: baseUrl + "sys/" + platform + "/sendAuthMessage/1.0",

    mallCouponUserDraw: baseUrl + "sys/" + platform + "/mallCouponUserDraw/1.0",
    //注册
    xkUserRegisterByPhone: baseUrl + "user/" + platform + "/xkUserRegisterByPhone/1.0",
    //查询商品是否收藏
    isCollection: baseUrl + "user/" + platform + "/xkFavoriteDoFavorite/1.0",
    //商品SKU明细
    goodsSKUDetail: baseUrl + "trade/" + platform + "/mallGoodsSkuQListShare/1.0",
    //商品明细
    goodsDetail: baseUrl + "goods/" + platform + "/goodsDetailShare/2.0",
    //商品关联优惠券列表
    mallCardGoodsQList: baseUrl + "goods/" + platform + "/mallCardGoodsQListShare/1.0",
    //商城-评论列表
    mallGoodsCommentList: baseUrl + "im/" + platform + "/mallGoodsCommentListShare/1.0",
    //微信注册
    wechatRegister: baseUrl + "user/" + platform + "/xkUserScanRegister/1.0",
    //店铺一级类型查询
    shopBcleGoodsCatalogShare: baseUrl + "goods/" + platform + "/shopBcleGoodsCatalogShare/1.0",
    //商圈店铺详情(更新后)
    xkMShopDetailShare: baseUrl + "goods/" + platform + "/shopGoodsAppPageShare/1.0",
    //获取公众号配置（刘国权）
    xkUserGzhConfig: baseUrl + "user/" + platform + "/xkUserGzhConfig/1.0",

    //商圈店铺/商品评价列表
    bcleGoodsCommentListShare: baseUrl + "im/" + platform + "/bcleGoodsCommentListShare/1.0",
    //商圈店铺综合评分
    stat4BcleShopShare: baseUrl + "im/" + platform + "/stat4BcleShopShare/1.0",
    //获取店铺详情商品SKU
    xkMShopGoodsSKUDetailShare: baseUrl + "trade/" + platform + "/shopGoodsSkuQListShare/1.0",

    //商圈商品详情
    xkBusinessGoodsDetailShare: baseUrl + "goods/" + platform + "/shopGoodsDetailShare/1.0",
    //福利商城商品详情
    jSequenceDetailByIdAndNoForOperation:
        baseUrl + "goods/" + platform + "/jSequenceDetailByIdAndNoForOperation/1.0",
    //福利商城商品详情(分享页)
    lotteryDetailShare: baseUrl + "goods/" + platform + "/lotteryDetailShare/1.0",
    //福利-晒单列表
    jmallGoodsCommentListShare: baseUrl + "im/" + platform + "/jmallGoodsCommentListShare/1.0",
    //福利商城加入购物车
    jfmallCartCreate: baseUrl + "goods/" + platform + "/jfmallCartCreate/1.0",

    //消费抽奖商品详情
    allDetailLotteryShare: baseUrl + "trade/" + platform + "/allDetailLotteryShare/1.0",

    /*平台大奖参与人数*/
    jmallGoodsCountCommentShare: baseUrl + "im/" + platform + "/jmallGoodsCountCommentShare/1.0",

    //商圈商品综合评分
    stat4BcleGoodsCommentShare: baseUrl + "im/" + platform + "/stat4BcleGoodsCommentShare/1.0",

    //获取用户主页详情
    xkUserHomePageShare: baseUrl + "user/" + platform + "/xkUserHomePageShare/1.0",

    //我的相册
    friendCircleUserAlbumShare: baseUrl + "im/" + platform + "/friendCircleUserAlbumShare/1.0",

    //订单详情
    shopOrderDetailForShare: baseUrl + "trade/" + platform + "/shopOrderDetailForShare/1.0",

    //中奖详情
    detailJLotteryShare: baseUrl + "trade/" + platform + "/detailJLotteryShare/1.0",

    //中奖列表
    jSequenceJoinQPageShare: baseUrl + "trade/" + platform + "/jSequenceJoinQPageShare/1.0",

    //微信注册
    xkUserWeChatShareRegister: baseUrl + "user/" + platform + "/xkUserWeChatShareRegister/1.0",
    //微信注册
    xkUserWeChatShareReBind: baseUrl + "user/" + platform + "/xkUserWeChatShareReBind/1.0",

    //判断之前是否微信注册过
    xkUserWeChatShareValidate: baseUrl + "user/" + platform + "/xkUserWeChatShareValidate/1.0",

    //游戏分享
    gameDetailForOutsideShare: baseUrl + "goods/" + platform + "/gameDetailForOutsideShare/1.0",
    platformPtotocolConfigDetail: baseUrl + "sys/ua/platformPtotocolConfigDetail/1.0",

    /*小视频*/
    liveVideo: LIVE_VIDEO_BASE_URL + "share_video",
    /*音乐*/
    liveMusic: LIVE_VIDEO_BASE_URL + "share_music",
    /*直播分享*/
    shareLive: LIVE_VIDEO_BASE_URL + "share_live",
    /*直播回放*/
    playback_share: LIVE_VIDEO_BASE_URL + "playback_share",


    //预览推广模板
    promotionTemplateDetail: baseUrl + 'goods/om/promotionTemplateDetail/1.0',
    //预览广场资讯H5
    consultContentDetail: baseUrl + 'sys/om/consultContentDetail/1.0',
    //预览广场推送内容H5
    pushContentDetail: baseUrl + 'sys/ua/pushContentDetail/2.1.1',
    //查询店铺营业状态（王琪）
    qShopBusinessStatus: baseUrl + "goods/" + platform + "/qShopBusinessStatus/2.1.0",

}
