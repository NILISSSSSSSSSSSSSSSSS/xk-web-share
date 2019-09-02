/**
* Created by zhangmei on 2019/5/9
*/
<template>
    <div>
    </div>
</template>

<script>
    import {wakeNative} from "../util/publicMehotds";

    export default {
        name: "",
        componentName: "",
        components: {},
        data() {
            return {}
        },
        created() {
            wakeNative.call(this,'gc');
        },
        methods: {},
        computed: {},

    }
</script>

<style scoped>

</style>
