<template>
    <div class="search-select">
        <div v-for="(v, i) in search"
             :style="`--i: ${getRenderInfo(i).ri}; --r: ${getRenderInfo(i).rr}; --j: ${getRenderInfo(i).rj - 1}`"
             @click="clickChoose(v)">
            <img :src="v.icon" alt="">
        </div>
    </div>
</template>

<script setup>
import { storeToRefs } from 'pinia'
import { useStore } from '@/store/search';

const store = useStore();
const { search, slider } = storeToRefs(store.all);
if (search.value.length == 0 || slider.value.length == 0) { store.loadLocal(); }

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

const emit = defineEmits(["changeSearch"]);
const clickChoose = function(item) {
    emit("changeSearch", item);
}
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