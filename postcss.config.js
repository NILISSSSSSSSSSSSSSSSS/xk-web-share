module.exports = {
    plugins: {
        autoprefixer: {
            name: 'duplicate-style',
            options: {
                cssProcessorOptions: {
                    safe: true,
                    zindex: false,
                    autoprefixer: {
                        add: true,
                        "browsers": [
                            "iOS >= 7",
                            "Android >= 4.1"
                        ]
                    }
                }
            }
        },
        "postcss-px-to-viewport": {
            viewportWidth: 375, //视窗的宽度，对应的是我们设计稿的宽度
            viewportHeight: 667, // 视窗的高度
            unitPrecision: 5,  // 指定`px`转换为视窗单位值的小数位数（很多时候无法整除）
            viewportUnit: 'vw',  // 指定需要转换成的视窗单位，建议使用vw
            selectorBlackList: ["ig"],// 指定不转换为视窗单位的类，可以自定义，可以无限添加,建议定义一至两个通用的类名
            minPixelValue: 1, // 小于或等于`1px`不转换为视窗单位，你也可以设置为你想要的值
            mediaQuery: false  // 允许在媒体查询中转换`px`
        },
        "postcss-import": {},
        "postcss-url": {},
    }
}
