/**
 * Created by zhangmei on 2019/5/8
 */
const wechat = [
    {
        path: '/bindPhoneNumber',
        name: 'bindPhoneNumber',
        component: () => import(/* webpackChunkName: "downloadXkSquare" */ '../views/bindPhoneNumber.vue'),
        meta: {
            title: '绑定手机号'
        }
    }, {
        path: '/scanCode',
        name: 'scanCode',
        component: () => import(/* webpackChunkName: "downloadXkSquare" */ '../views/scanCode.vue'),
        meta: {
            title: '绑定手机号'
        }
    }
];

export default wechat
