<template>
    <div class="setting-menu">
        <slot></slot>
    </div>
</template>

<script setup>
import { onMounted, onUnmounted } from "vue";
const emit = defineEmits(["lostFocus"]);
const topEvent = function(e) {
    emit("lostFocus");
}
onMounted(() => {
    document.body.addEventListener("click", topEvent);
});
onUnmounted(() => {
    document.body.removeEventListener("click", topEvent);
});
</script>

<style scoped>
.setting-menu {
    position: absolute;
    right: 0;
}
</style>