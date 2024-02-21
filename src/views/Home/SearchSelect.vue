<template>
    <div class="search-select">
        <div v-for="(v, i) in search"
             :style="`--i: ${getRenderInfo(i).ri}; --r: ${getRenderInfo(i).rr}; --j: ${getRenderInfo(i).rj - 1}`"
             @click="clickChoose(v)">
            <span>{{ v.name[0].toLocaleUpperCase() }}</span>
            <img v-if="v.icon" :src="v.icon" alt="">
            <div v-if="editorModel" class="editor">-</div>
        </div>
    </div>
</template>

<script setup>
import { onMounted, onUnmounted, inject } from "vue";
import { storeToRefs } from 'pinia'
import { useStore } from '@/store/search';

const editorModel = inject("editor-mode");

const store = useStore();
const { search } = storeToRefs(store.all);

// calc the position
const getLimtRtoNum = (multiple) => {
    if (multiple == 0) return 0;
    const r1 = 36; // 内部圆
    const r2 = 96 * 0.5; // 外部圆
    const arcR2 = 4 * Math.asin((r2 * 0.5) / (r1 * multiple)) * 180 / Math.PI;
    // 计算能放置的半圆数量
    return Math.floor(180 / arcR2 + 1);
};
const getRenderInfo = (i) => {
    let result = 0;
    let ri = i, rr = 0, rj = 0;
    while (ri >= 0) {
        result++;
        rr = result;
        rj = getLimtRtoNum(result);
        if (ri - rj < 0) break;
        ri = ri - rj;
    }
    return { ri, rj, rr };
};

const emit = defineEmits(["changeSearch", "lostFocus"]);
const clickChoose = function(item) {
    emit("changeSearch", item);
}

const topEvent = function(e) {
    emit("lostFocus");
}
onMounted(() => {
    document.body.addEventListener("click", topEvent);
});
onUnmounted(() => {
    document.body.removeEventListener("click", topEvent);
});
</script>

<style scoped>
.search-select {
    display: block;
    width: 36px;
    height: 36px;
    color: var(--color-font);
}

.search-select>div {
    width: 36px;
    height: 36px;
    position: absolute;
    margin: 2px;
    top: 0px;
    left: 0px;
    transform-origin: center center;
    animation: 0.3s ease-in-out trans forwards;
}
.search-select>div .editor {
    display: none;
    width: 32px;
    height: 32px;
    position: absolute;
    top: 0;
    left: 0;
    font-size: 32px;
    line-height: 32px;
    text-align: center;
    background-color: var(--color-layout);
    opacity: 0.7;
}
.search-select>div:hover .editor {
    display: block;
}

.search-select>div span {
    display: inline-block;
    width: 28px;
    height: 28px;
    font-size: 20px;
    line-height: 24px;
    text-align: center;
    margin: 2px;
    padding: 0;
    overflow: hidden;
    position: absolute;
    top: 0;
    left: 0;
    background-color: var(--color-background);
    border-radius: 50%;
    border: 1px solid var(--color-font);
}
.search-select>div img {
    width: 32px;
    height: 32px;
    background-color: var(--color-background);
}

@keyframes trans {
    0% {
        transform: rotate(0) translate(0px, 0px) rotate(0);
    }

    100% {
        transform: rotate(90deg)
                   rotate(calc(90deg / var(--j) * var(--i)))
                   translate(0px, calc(-48px * var(--r))) 
                   rotate(-90deg)
                   rotate(calc(-90deg / var(--j) * var(--i)));
    }
}
</style>