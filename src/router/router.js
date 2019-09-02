// import Vue from 'vue'
// import Router from 'vue-router'
import Home from '../views/Home.vue'
import Download_routes from './download'
import wechat from './wechat'

// Vue.use(Router)

export default new VueRouter({
    // mode: 'history',
    // base: process.env.BASE_URL,
    routes: [
        ...Download_routes,
        ...wechat,
        {
            path: '/',
            name: 'home',
            component: Home
        },
        {
            path: '/about',
            name: 'about',
            // route level code-splitting
            // this generates a separate chunk (about.[hash].js) for this route
            // which is lazy-loaded when the route is visited.
            component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
        },
        {
            path: '/user',
            name: 'user',
            component: () => import(/* webpackChunkName: "user" */ '../views/userHomePage.vue'),
            meta: {
                title: "用户中心"
            }
        },
        {
            path: '/goodsDetail',
            name: 'goodsDetail',
            component: () => import(/* webpackChunkName: "goodsDetail" */ '../views/goodsDetail.vue'),
            meta: {
                title: '商品详情'
            }
        },
        {
            path: '/wechat',
            name: 'wechat',
            component: () => import(/* webpackChunkName: "wechat" */ '../views/wechat.vue'),
            meta: {
                title: '微信登陆'
            }
        },
        {
            path: '/businessDetail',
            name: 'businessDetail',
            component: () => import(/* webpackChunkName: "businessDetail" */ '../views/businessDetailRevision.vue'),
            meta: {
                title: '店铺详情'
            }
        },
        {
            path: '/businessDetailRevision',
            component: () => import(/* webpackChunkName: "businessDetailRevision" */ '../views/businessDetailRevision.vue'),
            meta: {
                title: '店铺首页'
            }
        },
        {
            path: '/businessGoodsDetail',
            name: 'businessGoodsDetail',
            component: () => import(/* webpackChunkName: "businessGoodsDetail" */ '../views/businessGoodsDetail.vue'),
            meta: {
                title: '店铺商品详情'
            }
        },
        {
            path: '/orderDetail',
            name: 'orderDetail',
            component: () => import(/* webpackChunkName: "orderDetail" */ '../views/orderDetail.vue'),
            meta: {
                title: '订单详情'
            }
        },
        {
            path: '/businessDetailMap',
            name: 'businessDetailMap',
            component: () => import(/* webpackChunkName: "businessDetailMap" */ '../views/businessDetailMap.vue'),
            meta: {
                title: '地图'
            }
        },
        {
            path: '/welfFareGoodsDetails',
            name: 'welfFareGoodsDetails',
            component: () => import(/* webpackChunkName: "welfFareGoodsDetails" */ '../views/welfareMall/welfFareGoodsDetails.vue'),
            meta: {
                title: '夺奖商品详情'
            }
        },
        {
            path: '/welfConsumptionDetails',
            name: 'welfConsumptionDetails',
            component: () => import(/* webpackChunkName: "welfConsumptionDetails" */ '../views/welfareMall/welfConsumptionDetails.vue'),
            meta: {
                title: '夺奖商品详情'
            }
        },
        {
            path: '/welfareGoodsShow',
            name: 'welfareGoodsShow',
            component: () => import(/* webpackChunkName: "welfareGoodsShow" */ '../views/welfareMall/welfareGoodsShow.vue'),
            meta: {
                title: '福利详情晒单'
            }
        },
        {
            path: '/live',
            name: 'live',
            component: () => import(/* webpackChunkName: "live" */ '../views/video/live.vue'),
            meta: {
                title: '晓可小视频'
            }
        },
        {
            path: '/liveVideo',
            name: 'liveVideo',
            component: () => import(/* webpackChunkName: "live" */ '../views/video/liveVideo.vue'),
            meta: {
                title: '晓可小视频'
            }
        }, {
            path: '/liveHistory',
            name: 'liveHistory',
            component: () => import(/* webpackChunkName: "live" */ '../views/video/liveHistory'),
            meta: {
                title: '历史直播'
            }
        },
        {
            path: '/liveCourse',
            name: 'liveCourse',
            component: () => import(/* webpackChunkName: "liveCourse" */ '../views/video/liveCourse.vue'),
            meta: {
                title: '晓可直播教程'
            }
        },
        {
            path: '/shareMusic',
            name: 'shareMusic',
            component: () => import(/* webpackChunkName: "shareMusic" */ '../views/video/shareMusic.vue'),
            meta: {
                title: '音乐分享'
            }
        },
        {
            path: '/shareMap',
            name: 'shareMap',
            component: () => import(/* webpackChunkName: "shareMap" */ '../views/shareMap.vue'),
            meta: {
                title: '地图'
            }
        },
        {
            path: '/register',
            name: 'register',
            component: () => import(/* webpackChunkName: "shareMap" */ '../views/register.vue'),
            meta: {
                title: '注册'
            }
        },
        {
            path: '/agreement',
            name: 'agreement',
            component: () => import(/* webpackChunkName: "shareMap" */ '../views/agreement.vue'),
            meta: {
                title: '协议'
            }
        },
        {
            path: '/game',
            name: 'game',
            component: () => import(/* webpackChunkName: "shareMap" */ '../views/game.vue'),
            meta: {
                title: '游戏详情'
            }
        },
        {
            path: '/becomeAnchor',
            name: 'becomeAnchor',
            component: () => import(/* webpackChunkName: "becomeAnchor" */ '../views/becomeAnchor.vue'),
            meta: {
                title: '成为主播'
            }
        },
        {
            path: '/becomeFamily',
            name: 'becomeFamily',
            component: () => import(/* webpackChunkName: "becomeFamily" */ '../views/becomeFamily.vue'),
            meta: {
                title: '成为家族长'
            }
        },
        {
            path: '/spreadTmpInfo',
            name: 'spreadTmpInfo',
            component: () => import(/* webpackChunkName: "becomeFamily" */ '../views/spreadTmpInfo.vue'),
            meta: {
                title: '推广模板'
            }
        },
        {
            path: '/newsInformation',
            name: 'newsInformation',
            component: () => import ('../views/newsInformation.vue'),
            meta: {
                title: '广场资讯'
            }
        },
        {
            path: '/newsContentInformation',
            name: 'newsContentInformation',
            component: () => import ('../views/newsContentInformation.vue'),
            meta: {
                title: '推送内容'
            }
        },
        {
            path: '/winningDetail',
            name: 'winningDetail',
            component: () => import(/* webpackChunkName: "winningDetail" */ '../views/winningDetail.vue'),
            meta: {
                title: '中奖详情'
            }
        },
        {
            path: '/codeShop',
            name: 'codeShop',
            component: () => import(/* webpackChunkName: "codeShop" */ '../views/codeShop.vue'),
            meta: {
                title: '欢迎光临'
            }
        }
    ]
})
