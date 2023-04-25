<template>
    <div class="search-input">
        <input type="text" name="search-input-input" id="search-input-input" :placeholder="searchCurrentDes"
            v-model="searchContent" autofocus="autofocus" autocomplete="off" @keyup.enter="searchStart(searchContent)" />
        <div class="search-logo" 
            :style="{ backgroundImage: 'url(' + searchCurrentLogoSrc + ')' }"
            @click.stop="searchSelectView = !searchSelectView">
            <search-select v-if="searchSelectView" @edit-search-info="searchEditView = true"></search-select>
        </div>
        <div class="icon-cha" @click="searchContent = ''" v-if="searchContent != ''"></div>
        <div class="icon-search" @click="searchStart(searchContent)"></div>
        <search-edit v-if="searchEditView"></search-edit>
    </div>
</template>

<script setup>
import { ref, watch, onMounted, provide, defineAsyncComponent, inject } from 'vue';

const searchSelect = defineAsyncComponent(() => import("./SearchSelect.vue"));
const searchEdit = defineAsyncComponent(() => import("./SearchEdit.vue"));

// search content input value
const searchContent = ref("");
provide("search-content", searchContent);

// search action start
const searchStart = (content) => {
    if (content == "") return 0;
    const a = document.createElement("a");
    a.href = searchData.value[searchCurrent.value].result.replace("{i}", content);
    a.target = "_blank"
    a.click();
};

// search type select
const searchData = ref([]); // total search
const searchCurrent = ref(-1); // index
const searchCurrentDes = ref(""); // des
const searchCurrentLogoSrc = ref(""); // logo
const searchSelectView = inject("search-select-view"); // show the select options or not
provide("search-data", searchData);
provide("search-curr", searchCurrent);
watch(searchCurrent, (n, o) => {
    // stop
    if (n == -1) return n;
    // prevent exceeding index
    if (n >= searchData.value.length) n = searchData.value.length - 1;

    localStorage.setItem("m-search-choose", n);
    searchCurrentLogoSrc.value = searchData.value[n].icon;
    searchCurrentDes.value = searchData.value[n].des;
    return n;
});
watch(searchData, (n, o) => {
    localStorage.setItem("m-search", JSON.stringify(n));
    return n;
});
// search init info or list
const searchInfoInit = () => {
    import("../../../assets/data/search.json")
        .then(r => r.default)
        .then(e => {
            searchData.value = e;
            searchCurrent.value = 0;
        });
};

// edit search
const searchEditView = inject("search-edit-view");

onMounted(() => {
    if (!localStorage.getItem("m-search")) {
        searchInfoInit();
    } else {
        searchData.value = JSON.parse(localStorage.getItem("m-search"));
        if (searchData.value.length == 0) searchInfoInit()
        else searchCurrent.value = parseInt(localStorage.getItem("m-search-choose"));
    }
});
</script>

<style scoped>
.search-input {
    display: block;
    width: 75%;
    height: 64px;
    position: fixed;
    top: 21%;
    left: 12.5%;
}

.search-logo {
    display: block;
    width: 48px;
    height: 48px;
    background-size: cover;
    background-repeat: no-repeat;
    position: absolute;
    top: 8px;
    left: 8px;
    cursor: pointer;
    user-select: none;
}

#search-input-input {
    width: 100%;
    height: 100%;
    border: 1px solid var(--color-font);
    border-radius: 32px;
    background-color: transparent;
    line-height: 100%;
    font-size: 24px;
    line-height: 1.5em;
    text-indent: 70px;
}

#search-input-input:focus {
    outline: none;
}

.icon-cha {
    position: absolute;
    top: 20px;
    right: 88px;
    font-size: 24px;
    line-height: 24px;
    cursor: pointer;
}

.icon-search {
    position: absolute;
    top: 6px;
    right: 16px;
    font-size: 48px;
    line-height: 48px;
    overflow: hidden;
    cursor: pointer;
}

@media screen and (max-width: 600px) {
    .search-input {
        height: 48px;
    }
    .search-logo {
        width: 36px;
        height: 36px;
        top: 6px;
        left: 6px;
    }
    #search-input-input {
        font-size: 16px;
        line-height: 1.5em;
        text-indent: 55px;
    }
    .icon-cha {
        font-size: 16px;
        line-height: 16px;
        top: 16px;
        right: 20%;
    }
    .icon-search {
        font-size: 36px;
        line-height: 36px;
        top: 6px;
        right: 8px;
    }
}
</style>