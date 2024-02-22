<template>
    <div class="edit-search">
        <form-design :q="q" 
                     @cancel="formCancel"
                     @submit="formSubmit"></form-design>
    </div>
</template>

<script setup>
import FormDesign from '@/components/FormDesign.vue';
const q = [
    { type: "text", title: "名称", name: "name", placeholder: "必应" },
    { type: "text", title: "描述", name: "des", placeholder: "比百度好，且国内能用" },
    { type: "text", title: "搜索域名", name: "url", placeholder: "https://cn.bing.com/search?q={i}" },
    { type: "text", title: "图标", name: "icon", placeholder: "https://cn.bing.com/favicon.ico" },
    { type: "radio", title: "请求方式", name: "method", value: ["GET", "POST"] },
    { type: "radio", title: "打开方式", name: "target", value: ["_blank", "_self"] },
];

const emits = defineEmits(["cancel"]);
const formCancel = function() {
    emits("cancel");
}
const formSubmit = function(e) {
    console.log(e);
    emits("cancel");
}

const validData = function (data) {
    const keys = Object.keys(data);
    keys.forEach(v => { 
        if (data[v] == null) {
            return false;
        }
     });
}
</script>

<style scoped>
.edit-search {
    position: absolute;
    max-height: 300px;
    top: 100%;
    left: 50%;
    transform: translate(-50%, 0%);
    color: var(--color-font);
    overflow-y: auto;
}
</style>