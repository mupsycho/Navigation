<template>
    <div class="dialog">
        <div>
            {{ props.msg }}
        </div>
    </div>
</template>

<script setup>
const props = defineProps({ msg: String });
</script>

<style scoped>
.dialog {
    display: block;
    position: fixed;
    width: 100%;
    bottom: 5%;
    text-align: center;
}
.dialog>div {
    display: inline-block;
    font-size: 16px;
    line-height: 24px;
    padding: 8px 44px;
    background: var(--color-layout);
    border-radius: 20px;
}
</style>