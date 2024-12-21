<script setup lang="ts">
import { MoreFilled, Expand } from "@element-plus/icons-vue";
import ThemeSwitch from "../../components/ThemeSwitch.vue";
import SearchInput from "./components/searchInput.vue";
import SliderDisplay from "./components/sliderDisplay.vue";
import { ref } from "vue";

const drawer = ref(false);

const sliderPosition = ref("rtl");
const sliderSize = ref("50%");
if (window.matchMedia("(max-width: 768px)").matches) {
    sliderPosition.value = "btt";
    sliderSize.value = "80%";
}
</script>

<template>
    <el-container>
        <el-header class="header">
            <el-icon class="dropdown-trigger" @click="drawer = true">
                <Expand />
            </el-icon>
            <el-dropdown trigger="click">
                <el-icon class="dropdown-trigger">
                    <MoreFilled />
                </el-icon>
                <template #dropdown>
                    <el-dropdown-menu>
                        <el-dropdown-item command="theme">
                            主题切换
                            <ThemeSwitch />
                        </el-dropdown-item>
                    </el-dropdown-menu>
                </template>
            </el-dropdown>
        </el-header>
        <el-main>
            <SearchInput />
        </el-main>

        <el-drawer v-model="drawer" 
            :direction="sliderPosition" 
            title="快捷导航" 
            :size="sliderSize">
            <SliderDisplay />
        </el-drawer>
    </el-container>
</template>

<style scoped>
.header {
    display: flex;
    justify-content: flex-end;
    align-items: center;
    padding: 0 20px;
}

.dropdown-trigger {
    margin: 0 10px;
    cursor: pointer;
    font-size: 20px;
}

:deep(.el-dropdown-menu__item) {
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 8px;
}
</style>
