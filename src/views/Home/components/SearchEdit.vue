<template>
    <div class="search-edit" @click.stop>
        <div style="max-height: 100%; overflow: hidden auto;">
            <div v-for="(v, i) in searchData" class="display-box">
                <div class="edit edit-id" style="grid-column-start: 2;">{{ i + 1 }}</div>
                <div class="edit edit-logo" :style="{ backgroundImage: `url(${v.icon})` }"></div>
                <div class="edit edit-name">{{ v.name }}</div>
                <div class="edit edit-desc">{{ v.des }}</div>
                <div class="edit edit-control">
                    <!-- <div @click="clickEvent('add', i)">添加</div> -->
                    <div @click="clickEvent('del', i)">删除</div>
                    <!-- <div @click="clickEvent('edit', i)">编辑</div> -->
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { inject } from 'vue';

const searchData = inject("search-data");
const searchCurr = inject("search-curr");

const clickEvent = (action, id) => {
    // deep copy
    let a = [];
    searchData.value.forEach((v, i) => {
        a.push(Object.assign({}, v));
    });
    switch (action) {
        case "del":
            a.splice(id, 1);
            searchData.value = a;
            searchCurr.value = a.length - 1;
            break;
    }
};
</script>

<style scoped>
.search-edit {
    width: 720px;
    height: 360px;
    position: fixed;
    top: calc(50% - 180px);
    left: calc(50% - 360px);
    padding: 25px;
    background-color: var(--color-layout);
    border: 1px solid var(--color-border);
    border-radius: 25px;
}

.search-edit .edit {
    max-width: 100%;
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
}

.search-edit .edit-logo {
    width: 32px;
    height: 32px;
    background-repeat: no-repeat;
    background-size: cover;
}

.search-edit .edit-control {
    display: flex;
    justify-content: space-around;
    align-items: center;
}

.search-edit .edit-control>div {
    cursor: pointer;
    user-select: none;
}

.search-edit .display-box {
    display: grid;
    grid-template-columns: 20px 20px 32px 50px repeat(2, 1fr) 20px;
    align-items: center;
    gap: 10px;
    padding: 10px 0;
    background-color: var(--color-background);
}

.search-edit .display-box:nth-child(even) {
    background-color: var(--color-layout);
}

@media screen and (max-width: 720px) {
    .search-edit {
        width: 90%;
        height: 60%;
        position: fixed;
        top: 20%;
        left: 5%;
        padding: 25px;
        background-color: var(--color-layout);
        border: 1px solid var(--color-border);
        border-radius: 25px;
    }

    .search-edit .display-box {
        grid-template-columns: 20px 20px 32px 50px repeat(1, 1fr) 20px;
    }

    .search-edit .edit-desc {
        display: none;
    }
}</style>