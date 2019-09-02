/**
* Created by zhangmei on 2018/11/15
*/
<template>
    <div class="dialog-wrapper" :style="{zIndex:zIndex}">
        <transition name="dialog">
            <div class="dialog-main" @touchmove.prevent v-show="value">
                <div class="close-dialog" v-if="showCloseBtn" @click="closeDialog">
                </div>
                <slot></slot>
            </div>
        </transition>
    </div>
</template>
<script>
    import DialogMask from './DialogMask'
    import {getMaxZindex} from "@/util/publicMehotds";

    export default {
        name: "CustomDialog",
        data() {
            return {
                zIndex: 501,
                isShow: this.value
            }
        },
        props: {
            value: Boolean,
            hideOnMask: Boolean,
            showCloseBtn: Boolean
        },
        methods: {
            closeDialog() {
                this.mask.hide();
                this.$emit('input', false);
            },
        },
        mounted() {
            let maxIndex = getMaxZindex();
            this.mask = new DialogMask({
                zIndex: maxIndex,
                hideOnMask: this.hideOnMask || false,
                onHide: function () {
                    this.$emit('input', false);
                    this.$emit('hide-dialog')
                }.bind(this)
            });
            this.zIndex = maxIndex + 2;
            if (this.value) {
                this.mask.show();
            }
        },
        watch: {
            value() {
                if (this.value) {
                    this.mask.show();
                } else {
                    this.mask.hide();
                }
            }
        }
    }
</script>
<style>
    .dialog-mask {
        position: fixed;
        left: 0;
        top: 0;
        bottom: 0;
        right: 0;
        background: rgba(0, 0, 0, 0.5);
        transition: opacity .5s;
        }
</style>
<style scoped lang="scss" type="text/scss">
    .dialog-wrapper {
        position: absolute;
        .dialog-main {
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate3d(-50%, -50%, 0);
            .close-dialog {
                position: absolute;
                height: 24px;
                width: 24px;
                right: -24px;
                top: -51px;
                background: no-repeat url("~assets/image/close-icon.png") 0 0 / 100% 100%;
                }
            }
        }

    @keyframes bounce-in {
        0% {
            transform: translate3d(-50%, -50%, 0) scale(0);
            }
        50% {
            transform: translate3d(-50%, -50%, 0) scale(1.2);
            }
        100% {
            transform: translate3d(-50%, -50%, 0) scale(1);
            }
        }

    .dialog-enter-active {
        animation: bounce-in .5s;
        }

    .dialog-leave-active {
        animation: bounce-in .5s reverse;
        }

</style>
