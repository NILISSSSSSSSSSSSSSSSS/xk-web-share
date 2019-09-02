/**
* Created by zhangmei on 2018/11/20
*/
<template>
    <!--套餐内容-->
    <div class="package-detail">
        <p class="package-header">
            {{title}}
        </p>
        <div class="package-content">
            <p class="package-name">
                {{goodsName}}
            </p>
            <div class="content">
                {{content}}
            </div>
            <div class="goods-img">
                <ul>
                    <li v-for="(item,$index) in imgs"
                        @click="imgClick($index)"
                        :key="$index">
                        <img class='block img-object-fit-cover'
                             :src="item"
                             alt="">
                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>

<script>
    import Previewer from '@/components/comment/Preview'

    export default {
        name: "goodsDescription",
        components: {Previewer},
        comments: {
            Previewer
        },
        props: {
            title: {
                type: String,
                default: "商品介绍"
            },
            goodsName: {
                type: String,
                default: '商品名字'
            },
            content: {
                type: String,
                default: '商品描述'
            },
            imgs: {
                type: Array,
                default: function () {
                    return [];
                }
            }
        },
        methods: {
            imgClick(index) {
                this.$emit("img-click", this.imgs, index)
            }
        }
    }
</script>
<style scoped lang="scss" type="text/scss">

    /*套餐*/
    .package-detail {
        background: #FFFFFF;
        box-shadow: 0 0 4px 0 rgba(215, 215, 215, 0.50);
        border-radius: 8px;
        margin-top: 10px;
        padding-bottom: 10px;
        .package-header {
            height: 40px;
            border-bottom: 1px #F1F1F1 solid;
            line-height: 40px;
            padding: 0 15px;
            font-size: 14px;
            color: #222222;
            }
        .package-content {
            padding: 0 15px;
            .package-name {
                font-size: 12px;
                color: #222222;
                line-height: 12px;
                padding: 10px 0;
                }
            .content {
                line-height: 14px;
                font-size: 12px;
                color: #555555;
                white-space: pre-wrap;
                }
            .goods-img {
                margin-left: -5px;
                ul {
                    display: flex;
                    flex-wrap: wrap;
                    li {
                        margin: 5px 0 0 5px;
                        height: 80px;
                        width: 80px;
                        img {
                            width: 100%;
                            height: 100%;
                            }
                        }
                    }
                }
            }
        }

</style>
