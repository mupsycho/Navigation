<template>
    <div class="content">
        <div class="header">
            <div class="icon icon-setting" :style="{ opacity: showSettingMenu ? 1 : 0.5 }" @click.stop="showSettingMenu = !showSettingMenu">
                <set-menu v-if="showSettingMenu" @lostFocus="showSettingMenu = false">
                    <div class="menu-box" @click.stop="changeDarkMode(true)">
                        <div class="title">暗黑模式</div>
                        <dark-switch :dark="dark"></dark-switch>
                    </div>
                    <div class="menu-box" @click.stop="editor = !editor">
                        <div class="title">编辑模式</div>
                        <switch-button :open="editor"></switch-button>
                    </div>
                </set-menu>
            </div>
        </div>
        <search-input></search-input>
    </div>
</template>

<script setup>
import { ref, onMounted, provide } from "vue";
import searchInput from "./SearchInput.vue";
import darkSwitch from "@/components/DarkSwitch.vue";
import switchButton from "@/components/SwitchButton.vue";
import setMenu from "./components/SettingMenu.vue";
import { useStore } from "@/store/dark.js";

const showSettingMenu = ref(false);
const dark = ref(useStore().dark);
const editor = ref(true);
provide("editor-mode", editor);

const changeDarkMode = function (c) {
    if (c) dark.value = !dark.value;
    if (dark.value) {
        document.body.classList.add("dark");
    } else {
        document.body.classList.remove("dark");
    }
}
onMounted(() => {
    changeDarkMode(false);
});
</script>

<style scoped>
.content {
    width: 100vw;
    height: 100vh;
    overflow: hidden;
}

.header {
    display: block;
    position: absolute;
    top: 16px;
    right: 16px;
    padding: 0;
    margin: 0;
}

.menu-box {
    display: flex;
    width: 140px;
    justify-content: space-between;
    align-items: center;
    user-select: none;
}
.menu-box .title {
    display: block;
    font-size: 16px;
    line-height: 16px;
}
.icon {
    width: 36px;
    height: 36px;
    font-size: 36px;
    line-height: 36px;
    cursor: pointer;
}
</style>