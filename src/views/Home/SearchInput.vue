<template>
    <div class="search-input">
        <form ref="dom" @submit="formSubmit"
              :method="searchInfo.method"
              :target="searchInfo.target"
              :action="searchInfo.action">
            <input type="text"
                   :placeholder="searchInfo.placeholder"
                   :name="searchInfo.name"
                   v-model="m"
                   autofocus
                   autocomplete="off" />
            <div :class="{ 'search-logo': true }"
                 :style="{ backgroundImage: 'url(' + searchInfo.icon + ')' }"
                 @click.stop="searchSelectView = !searchSelectView">
                 <div v-if="searchSelectView" class="editor">+</div>
                <search-select v-if="searchSelectView"
                               @changeSearch="changeSearch"
                               @lostFocus="searchSelectView = false"></search-select>
            </div>
            <div class="icon-cha" @click="m = ''" v-if="m != ''"></div>
            <div class="icon-search" @click="clickSubmit"></div>
        </form>
    </div>
</template>

<script setup>
import { ref, reactive, onMounted } from "vue";
import { showDialog } from "@/utils/dialog.js";
import SearchSelect from "./SearchSelect.vue";

import { useStore } from '@/store/search';
const store = useStore();

// 搜索框
const dom = ref();
const m = ref("");
const formSubmit = function (e) {
    e.stopPropagation();
    e.preventDefault();
    if(m.value.length > 0) {
        e.target.submit();
    } else {
        showDialog("请输入检索内容");
    }
};
const clickSubmit = function (e) {
    dom.value.dispatchEvent(new Event("submit", {'bubbles': true, 'cancelable' : true}));
};

// 选择
const searchSelectView = ref(false);
const searchInfo = reactive({
    action: "https://www.bing.com/search",
    method: "get",
    target: "_blank",
    placeholder: "比百度好，且国内能用",
    name: "q",
    icon: "./icon/bing.svg"
});
const changeSearch = function(item) {
    store.changeCurr(item);
    loadSearch();
}
const loadSearch = function () {
    const item = store.getCurr();

    searchInfo.action = item.url;
    searchInfo.method = item.method;
    searchInfo.target = item.target;
    searchInfo.placeholder = item.des;
    searchInfo.name = item.param.main;
    searchInfo.icon = item.icon;
    // 清理附加参数
    dom.value.querySelectorAll("input[type=hidden]").forEach(v => {
        dom.value.removeChild(v);
    });
    // 添加附加参数
    if (item.param.other) {
        Object.keys(item.param.other).forEach(v => {
            let input = document.createElement("input");
            input.type = "hidden";
            input.name = v;
            input.value = item.param.other[v];
            dom.value.appendChild(input);
        });
    }
}
onMounted(() => loadSearch());
</script>

<style scoped>
.search-logo {
    display: block;
    width: 36px;
    height: 36px;
    margin: 6px;
    background-size: cover;
    background-repeat: no-repeat;
    position: absolute;
    top: 8px;
    left: 8px;
    cursor: pointer;
    user-select: none;
}

.search-logo .editor {
    content: '+';
    display: inline-block;
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    font-size: 36px;
    line-height: 36px;
    text-align: center;
    background-color: var(--color-layout);
    opacity: 0.7;
}

.search-input {
    display: block;
    position: absolute;
    top: 25%;
    left: 50%;
    transform: translate(-50%, -50%);
}

.search-input input[type=text] {
    width: 400px;
    height: 48px;
    line-height: 64px;
    font-size: 24px;
    margin: 0;
    padding: 0;
    background: transparent;
    color: var(--color-font);
    padding: 8px 70px 8px 70px;
    box-sizing: content-box;
    border: 1px solid var(--color-font);
    border-radius: 32px;
}

.search-input input[type=text]:focus-visible {
    background: var(--color-layout);
    outline: none;
}

.search-input input[type=text]:-internal-autofill-selected {
    background-color: var(--color-layout) !important;
}

.icon-search {
    position: absolute;
    top: 6px;
    right: 16px;
    font-size: 48px;
    line-height: 48px;
    cursor: pointer;
    user-select: none;
}

.icon-cha {
    position: absolute;
    top: 20px;
    right: 88px;
    font-size: 20px;
    line-height: 24px;
    cursor: pointer;
}
</style>