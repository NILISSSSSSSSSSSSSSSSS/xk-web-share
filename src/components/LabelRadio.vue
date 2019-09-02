<template>
    <div>
        <span v-for="(val,index) in dataList" :class="{'is-active' : val.isActive}" @click="selectLabel(val.code,index)"
              class="label-sku">{{val.name}}</span>
    </div>
</template>

<script>
    export default {
        props: {
            attrValues: {
                type: Array,
                default: []
            },
            value: {
                type: String,
                default: ""
            }
        },
        data() {
            return {
                dataList: this.attrValues
            }
        },
        watch: {
            attrValues(val) {
                this.dataList = val;
            },
            value(val) {
                this.initActive(val);
            }
        },
        mounted() {

        },
        methods: {
            initActive(code) {
                for (let item of this.dataList) {
                    if (code === item.code) {
                        this.$set(item, "isActive", true);
                        this.$emit("input", code);
                        this.$emit("updateSel")
                    }
                }
            },
            selectLabel(code, index) {
                let obj = this.dataList[index];
                for (let item of this.dataList) {
                    this.$set(item, "isActive", false);
                }
                this.$set(obj, "isActive", true);
                this.$emit("input", code);
                this.$emit("updateSel")
            }
        }
    }
</script>

<style scoped>
    .label-sku {
        display: inline-block;
        color: #4A90FA;
        font-size: 12px;
        min-width: 60px;
        padding: 0 5px;
        height: 25px;
        text-align: center;
        line-height: 25px;
        border: 1px solid #4A90FA;
        border-radius: 13px;
        margin-bottom: 10px;
        margin-right: 6px;
    }

    .is-active {
        background: #4A90FA;
        color: #ffffff;
    }
</style>