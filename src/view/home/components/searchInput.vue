<script setup lang="ts">
import { reactive, ref } from "vue";
import SearchSelect from "./searchSelect.vue";
import type { SearchItem, SearchInfo } from "../../../types/info";
import { ElMessage } from "element-plus";
import { Search } from "@element-plus/icons-vue";

const dialogVisible = ref(false);

const form = reactive({
    input: ""
});

const searchInfo = reactive<SearchInfo>({
    icon: "https://www.bing.com/favicon.ico",
    action: "https://www.bing.com/search",
    method: "get",
    target: "_blank",
    placeholder: "必应搜索",
    searchKey: {
        main: "q",
        other: {}
    }
});

const handleSearch = (e: Event) => {
    e.stopPropagation();
    e.preventDefault();
    if (!form.input.trim()) {
        ElMessage.error("请输入搜索内容");
        return;
    }
    (e.target as HTMLFormElement).submit();
};

const handleChoose = (item: SearchItem) => {
    searchInfo.icon = item.icon;
    searchInfo.action = item.url;
    searchInfo.method = item.method;
    searchInfo.target = item.target;
    searchInfo.placeholder = item.des;
    searchInfo.searchKey.main = item.param.main;
    searchInfo.searchKey.other = item.param.other || {};
    dialogVisible.value = false;
};
</script>

<template>
    <div class="search-input">
        <form :method="searchInfo.method" 
            :action="searchInfo.action" 
            :target="searchInfo.target"
            @submit.prevent="handleSearch">
            <div class="search-container">
                <img @click="dialogVisible = true" :src="searchInfo.icon" class="search-icon" alt="search engine icon" />
                <input
                    v-model="form.input"
                    :placeholder="searchInfo.placeholder"
                    class="search-field"
                    type="text"
                    :name="searchInfo.searchKey.main"
                    autofocus
                />
                <template v-for="key in Object.keys(searchInfo.searchKey.other)">
                    <input :name="key" :value="searchInfo.searchKey.other[key]" type="hidden" />
                </template>
                <button type="submit" class="search-button">
                    <el-icon><Search /></el-icon>
                </button>
            </div>
        </form>
        <el-dialog v-model="dialogVisible" title="选择搜索引擎" width="80%">
            <SearchSelect @choose="handleChoose" />
        </el-dialog>
    </div>
</template>

<style scoped>
.search-input {
    width: 100%;
    max-width: 640px;
    margin: 100px auto;
}

.search-container {
    display: flex;
    align-items: center;
    background-color: var(--el-bg-color);
    border: 1px solid var(--el-border-color);
    border-radius: var(--el-border-radius-round);
    padding: 8px 16px;
    box-shadow: var(--el-box-shadow-light);
    transition: var(--el-transition-duration);
}

.search-container:hover {
    border-color: var(--el-color-primary);
    box-shadow: var(--el-box-shadow);
}

.search-icon {
    width: 32px;
    height: 32px;
    margin-right: 12px;
    cursor: pointer;
}

.search-field {
    flex: 1;
    border: none;
    outline: none;
    font-size: var(--el-font-size-base);
    padding: 8px 0;
    background: transparent;
    color: var(--el-text-color-primary);
}

.search-field::placeholder {
    color: var(--el-text-color-placeholder);
}

.search-button {
    background: var(--el-color-primary);
    color: var(--el-color-white);
    border: none;
    border-radius: 50%;
    width: 40px;
    height: 40px;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    transition: background-color var(--el-transition-duration);
}

.search-button:hover {
    background: var(--el-color-primary-light-3);
}

@media (max-width: 768px) {
    .search-container {
        margin: 0 16px;
    }
}
</style>
