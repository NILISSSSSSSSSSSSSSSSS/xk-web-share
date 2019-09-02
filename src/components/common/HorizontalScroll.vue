/**
* Created by zhangmei on 2018/12/17
*/
<template>
    <div class="horizontal-scroll" ref="wrapper">
        <div ref="scrollContainer">
            <slot>
            </slot>
        </div>
    </div>
</template>
<script>
    export default {
        name: "horizontalScroll",
        componentName: "horizontalScroll",
        components: {},
        data() {
            return {
                scrollTimer: null,
                scrollElementTarget: null,
                scrollElementContent: null,
                scrollElementContentHeight: 0,
                scrollElementHeight: 0,
                contentHeight: 0
            }
        },
        created() {
        },
        mounted() {
        },
        methods: {
            //获取滚动元素
            getElement() {
                this.scrollElementTarget = this.$el;
                this.scrollElementContent = this.$refs.scrollContainer;
                this.scrollElementContentHeight = this.scrollElementContent.offsetWidth;
            },
            //初始化滚动
            initScroll() {
                this.getElement();
                const contentInnerHtml = this.scrollElementContent.innerHTML;
                this.scrollElementContent.innerHTML = contentInnerHtml + contentInnerHtml;
                this.scrollTimer = setInterval(() => {
                    if (this.scrollElementTarget.scrollLeft >= this.scrollElementContentHeight-1) {
                        this.scrollElementTarget.scrollLeft = 0;
                    } else {
                        this.scrollElementTarget.scrollLeft = this.scrollElementTarget.scrollLeft + 1;
                    }
                }, 30);
            },
        },
        computed: {},
        beforeDestroy() {
            this.scrollTimer = null;
        }
    }
</script>

<style scoped lang="scss" type="text/scss">
    .horizontal-scroll {
        width: 100%;
        overflow-x: hidden;
        }
</style>