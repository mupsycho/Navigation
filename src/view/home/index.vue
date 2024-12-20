<script setup lang="ts">
import { MoreFilled, Setting, InfoFilled } from "@element-plus/icons-vue";
import ThemeSwitch from "../../components/ThemeSwitch.vue";
import SearchInput from "./components/searchInput.vue";
import SliderDisplay from "./components/sliderDisplay.vue";
import { ref } from "vue";

const drawer = ref(false);
</script>

<template>
    <el-container>
        <el-header class="header">
            <el-dropdown trigger="click">
                <el-icon class="dropdown-trigger">
                    <MoreFilled />
                </el-icon>
                <template #dropdown>
                    <el-dropdown-menu>
                        <el-dropdown-item command="slider" @click="drawer = true">
                            快捷导航
                            <el-icon><Setting /></el-icon>
                        </el-dropdown-item>
                        <el-dropdown-item command="theme">
                            主题切换
                            <ThemeSwitch />
                        </el-dropdown-item>
                        <el-dropdown-item command="about">
                            登录账户
                            <el-icon><InfoFilled /></el-icon>
                        </el-dropdown-item>
                    </el-dropdown-menu>
                </template>
            </el-dropdown>
        </el-header>
        <el-main>
            <SearchInput />
        </el-main>

        <el-drawer v-model="drawer" title="快捷导航" size="40%">
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

