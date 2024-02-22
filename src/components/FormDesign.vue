<template>
    <div class="form-design">
        <form ref="dom" action="#" method="get" @submit="formSubmit">
            <div v-for="v, i in props.q">
                <input-text v-if="v.type == 'text'" 
                            :name="v.name"
                            :title="v.title"
                            :placeholder="v.placeholder"
                            @inputEvent="data[i] = $event"></input-text>
                <input-radio v-if="v.type == 'radio'"
                             :name="v.name"
                             :title="v.title"
                             :val="v.value"
                             @inputEvent="data[i] = $event"></input-radio>
            </div>
            <div class="button">
                <div @click="clickSubmit">
                    提交
                </div>
                <div @click="emits('cancel')">
                    取消
                </div>
            </div>
        </form>
    </div>
</template>

<script setup>
import { ref } from "vue";
import inputText from "./form/InputText.vue";
import inputRadio from "./form/InputRadio.vue";

const emits = defineEmits(["cancel", "submit"]);

const dom = ref();
const props = defineProps({ q: Array });

const data = [];
props.q.forEach(v => {
    data.push(null);
});

const formSubmit = function(e) {
    e.stopPropagation();
    e.preventDefault();

    const r = {};
    props.q.forEach((v, i) => {
        r[v.name] = data[i];
    });
    emits("submit", r);
}
const clickSubmit = function (e) {
    dom.value.dispatchEvent(new Event("submit", {'bubbles': true, 'cancelable' : true}));
};
</script>

<style scoped>
.form-design {
    width: 350px;
    max-height: 400px;
    overflow-y: auto;
}
.form-design>form>div {
    margin: 16px 0;
}
.form-design .button>div {
    display: inline-block;
    width: 50%;
    text-align: center;
    vertical-align: middle;
    border-top: 1px solid var(--color-font);
    cursor: pointer;
}
</style>