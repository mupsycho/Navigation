<template>
    <div :class="{ 'switch-button': true, 'chos': props.open }"></div>
</template>

<script setup>
const props = defineProps({
    open: Boolean
});
</script>

<style scoped>
.switch-button {
    display: inline-block;
    width: 60px;
    height: 28px;
    margin: 8px 0;
    border: 1px solid var(--color-font);
    border-radius: 22px;
    box-sizing: border-box;
}

.switch-button::before {
    content: '';
    display: block;
    position: absolute;
    top: 5px;
    left: 5px;
    width: 16px;
    height: 16px;
    background-color: var(--color-font);
    border-radius: 50%;
    transition: all 0.3s ease-in-out;
}

.switch-button.chos::before {
    left: 38px;
    background-color: var(--sky-yellow);
}
</style>