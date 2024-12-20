<script setup lang="ts">
import { ref } from 'vue';
import type { SliderItem } from '../../../types/slider';

const activeNames = ref<string[]>(['1']);
const sliderList = ref<SliderItem[]>([]);
fetch("./assets/data/slider.json").then(res => res.json()).then((data: SliderItem[]) => {
    for (const item of data) {
        sliderList.value.push(item);
    }
});

const handleClick = (url: string) => {
    window.open(url, "_blank");
};
</script>

<template>
    <div class="slider-display">
        <el-collapse v-model="activeNames">
            <el-collapse-item v-for="item in sliderList" :key="item.name" :title="item.name" :name="item.name">
                <div class="slider-body">
                    <el-card @click="handleClick(i.url)" v-for="i in item.data" :key="i.name">
                        <el-avatar src="https://empty"></el-avatar>
                        <span style="margin-top: 10px;">{{ i.name }}</span>
                    </el-card>
                </div>
            </el-collapse-item>
        </el-collapse>
    </div>
</template>

<style scoped>
.slider-display :deep(.el-card) {
    display: inline-block;
    margin: 10px;
    cursor: pointer;
    user-select: none;
}

.slider-body :deep(.el-card) {
    --el-card-padding: 8px;
}

.slider-body :deep(.el-card) span {
    display: block;
    margin: auto;
    text-align: center;
    font-size: 12px;
}
</style>
