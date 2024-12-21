<script setup lang="ts">
import { storeToRefs } from "pinia";
import { useHomeDataManager } from "../../../store/homeDataManager";

const homeDataManager = useHomeDataManager();
const { searchInfo } = storeToRefs(useHomeDataManager());

const emit = defineEmits(["choose"]);
const handleChoose = (item: number) => {
    homeDataManager.switchSearchInfo(item);
    emit("choose");
};
</script>

<template>
    <div class="search-select">
        <el-scrollbar height="300px">
            <template v-for="item, i in searchInfo" :key="i">
                <el-card @click="handleChoose(i)">
                    <el-avatar>
                        <img :src="item.icon" />
                    </el-avatar>
                    <span>{{ item.name }}</span>
                </el-card>
            </template>
        </el-scrollbar>
    </div>
</template>

<style scoped>
:deep(.el-card) {
    display: inline-block;
    margin: 10px;
    cursor: pointer;
    user-select: none;
}

:deep(.el-card__body) span {
    display: block;
    margin: 5px auto;
    text-align: center;
}
</style>
