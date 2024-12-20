<script setup lang="ts">
import { ref } from "vue";
import type { SearchItem, SearchParam } from "../../../types/info";

const searchList = ref<SearchItem[]>([]);

fetch("./assets/data/search.json")
    .then(res => res.json())
    .then(data => {
    for (const item of data) {
        const url = new URL(item.url);
        const param: SearchParam = {
            main: "",
            other: {}
        };

        url.searchParams.forEach((value, key) => {
            if (value == "%s") {
                param.main = key;
            } else {
                param.other[key] = value;
            }
        });

        searchList.value.push({
            name: item.name,
            des: item.des,
            url: `${url.origin}${url.pathname}`,
            param: param,
            icon: item.icon || `${new URL(item.url).origin}/favicon.ico`,
            method: item.method || "get",
            target: item.target || "_blank"
        });
    }
});

const emit = defineEmits(["choose"]);
const handleChoose = (item: SearchItem) => {
    emit("choose", item);
};
</script>

<template>
    <div class="search-select">
        <el-scrollbar height="300px">
            <template v-for="item in searchList">
                <el-card @click="handleChoose(item)">
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
