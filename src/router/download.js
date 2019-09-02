/**
 * Created by zhangmei on 2019/3/4
 */
const Download_routes = [
    {
        path: '/downloadXkSquare',
        name: 'downloadXkSquare',
        component: () => import(/* webpackChunkName: "downloadXkSquare" */ '../views/download/downloadXkSquare.vue'),
        meta: {
            title: '下载广场APP'
        }
    },
    {
        path: '/downloadMerchantAPP',
        name: 'downloadMerchantAPP',
        component: () => import(/* webpackChunkName: "downloadMerchantAPP" */ '../views/download/downloadMerchantAPP.vue'),
        meta: {
            title: '下载商户APP'
        }
    },
    {
        path: '/downloadVideoAPP',
        name: 'downloadVideoAPP',
        component: () => import(/* webpackChunkName: "downloadVideoAPP" */ '../views/download/downloadVideoAPP.vue'),
        meta: {
            title: '下载小视频APP'
        }
    },
];
export default Download_routes
