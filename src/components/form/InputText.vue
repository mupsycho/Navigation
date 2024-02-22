<template>
    <div class="input-text">
        <div class="title">{{ props.title }}</div>
        <input type="text" 
               :name="props.name" 
               :placeholder="props.placeholder"
               autocomplete="off"
               @input="emits('inputEvent', $event.target.value)">
    </div>
</template>

<script setup>
const props = defineProps({
    name: String,
    title: {
        type: String,
        default: "title"
    },
    placeholder: String
});
const emits = defineEmits(["inputEvent"]);
</script>

<style scoped>
.input-text {
    display: flex;
    justify-content: space-between;
    width: 100%;
}

.title {
    width: 25%;
}

input {
    display: inline-block;
    width: 75%;
    font-size: 16px;
    line-height: 24px;
    color: var(--color-font);
    background: transparent;
    border: 1px solid var(--color-font);
}
</style>