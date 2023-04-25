<template>
    <div class="search-select">
        <div v-for="(v, i) in renderData"
            :style="`--i: ${v.ri}; --r: ${v.rr}; --j: ${v.rj - 1}`">
            <img :src="v.icon" alt="" @click="chosSearchType(v.id)">
        </div>
        <div :style="`--i: ${getRenderInfo(renderData.length).ri}; --r: ${getRenderInfo(renderData.length).rr}; --j: ${getRenderInfo(renderData.length).rj - 1}`"
            v-if="editModel">
            <img :src="`./icon/edit.svg`" alt="" @click='emits("editSearchInfo");'>
        </div>
    </div>
</template>

<script setup>
import { inject, ref } from 'vue';
const emits = defineEmits(["editSearchInfo"]);

// extend data
const searchData = inject("search-data");
const searchCurr = inject("search-curr");
const editModel = inject("edit-model");

// change the selected search index
const chosSearchType = (e) => {
    searchData.value.forEach((v, i) => {
        if (v.id == e) searchCurr.value = i;
    });
}

// calc the position
const getLimtRtoNum = (multiple) => {
    if (multiple == 0) return 0;
    const r1 = 64; // 内部圆
    const r2 = 48 * 0.5; // 外部圆
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

// select what to show
const renderData = ref([]);
let tmpA = [];
searchData.value.forEach((v, i) => {
    v = Object.assign({}, getRenderInfo(i), v);
    tmpA.push(v);
});
renderData.value = tmpA;
</script>

<style scoped>
.search-select {
    display: block;
    width: 100%;
    height: 100%;
    color: var(--color-font);
    z-index: 10;
}

.search-select>div {
    width: 100%;
    position: absolute;
    top: 0px;
    left: 0px;
    transform-origin: center center;
    animation: 0.3s ease-in-out trans forwards;
}

@keyframes trans {
    0% {
        transform: rotate(0) translate(0px, 0px) rotate(0);
    }

    100% {
        transform: rotate(calc(180deg / var(--j) * var(--i))) translate(0px, calc(-64px * var(--r))) rotate(calc(-180deg / var(--j) * var(--i)));
    }
}

.search-select>div img {
    width: 100%;
    background-color: var(--color-background);
    border-radius: 50%;
}
</style>