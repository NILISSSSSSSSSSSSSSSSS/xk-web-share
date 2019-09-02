<template>
    <div id="app" class="iphonex-pt">
        <!--<router-view/>-->
        <div v-transfer-dom>
            <loading v-model="isLoading"></loading>
        </div>
        <!--<router-view/>-->
        <transition
                @after-enter="$vux.bus && $vux.bus.$emit('vux:after-view-enter')"
                :name="viewTransition" :css="!!direction">
            <keep-alive :include="includeComponents">
                <router-view class="router-view"></router-view>
            </keep-alive>
        </transition>
    </div>
</template>

<script>
    import {createNamespacedHelpers} from 'vuex'
    import {Loading, TransferDom} from 'vux'

    const {mapState} = createNamespacedHelpers('transition');
    export default {
        name: 'App',
        directives: {
            TransferDom
        },
        components: {
            Loading
        },

        data() {
            return {
                mock: '',
                dragged: '',
                includeComponents: ["yellowpage", 'register']
            }
        },
        created() {
            this.mock = window.localStorage.getItem('mock') === 'true';
//            this.moveAble();
        },
        computed: {
            ...mapState({
                isLoading: state => state.isLoading,
                direction: state => state.direction
            }),
            viewTransition() {
                if (!this.direction) return '';
                return 'vux-pop-' + (this.direction === 'forward' ? 'in' : 'out')
            },
            headerTransition() {
                if (!this.direction) return '';
                return this.direction === 'forward' ? 'vux-header-fade-in-right' : 'vux-header-fade-in-left'
            }
        },

        methods: {
            changeMock() {
                this.mock = !this.mock;
                window.localStorage.setItem('mock', this.mock);
                window.location.reload();
            },
            onDragged({el, deltaX, deltaY, offsetX, offsetY, clientX, clientY, first, last}) {
                if (first) {
                    this.dragged = true
                    return
                }
                if (last) {
                    this.dragged = false
                    return
                }
                let l = +window.getComputedStyle(el)['left'].slice(0, -2) || 0
                let t = +window.getComputedStyle(el)['top'].slice(0, -2) || 0
                el.style.left = l + deltaX + 'px'
                el.style.top = t + deltaY + 'px'
            }
        }
    }
</script>

<style>
    #app {
        font-family: PingFangSC-Regular, 'Avenir', Helvetica, Arial, sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        background-color: #F6F6F6;
        height: 100vh;
        font-size: 14px;
        overflow-y: hidden;
        /*
                overflow-y: auto;
        */
        /*-webkit-overflow-scrolling: touch;*/
    }

    .ios-scroll {
        -webkit-overflow-scrolling: touch;
        overflow-y: scroll;
    }

    .router-view {
        width: 100%;
    }

    .mockButton {
        position: absolute;
        left: 0;
        top: 0;
        z-index: 999;
        width: 65px;
        height: 22px;
    }

    .vux-pop-out-enter-active,
    .vux-pop-out-leave-active,
    .vux-pop-in-enter-active,
    .vux-pop-in-leave-active {
        will-change: transform;
        transition: all 500ms;
        height: 100%;
        top: 0;
        position: absolute;
        backface-visibility: hidden;
        perspective: 1000;
    }

    .vux-pop-out-enter {
        opacity: 0;
        transform: translate3d(-100%, 0, 0);
    }

    .vux-pop-out-leave-active {
        opacity: 0;
        transform: translate3d(100%, 0, 0);
    }

    .vux-pop-in-enter {
        opacity: 0;
        transform: translate3d(100%, 0, 0);
    }

    .vux-pop-in-leave-active {
        opacity: 0;
        transform: translate3d(-100%, 0, 0);
    }
</style>
