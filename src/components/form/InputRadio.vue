<template>
    <div class="input-radio">
        <div class="title">{{ props.title }}</div>
        <div class="radio">            
            <div v-for="v, i in props.val">
                <label :for="props.name + i.toString()">{{ v }}</label>
                <input type="radio" :name="props.name" 
                       :id="props.name + i.toString()"
                       :value="v"
                       @click.stop="emits('inputEvent', v)">
            </div>
        </div>
    </div>
</template>

<script setup>
const props = defineProps({
    name: String,
    title: {
        type: String,
        default: "title"
    },
    val: Array
});
const emits = defineEmits(["inputEvent"]);
</script>

<style scoped>
.input-radio {
    display: flex;
    justify-content: space-between;
    width: 100%;
}

.title {
    width: 25%;
}

.radio {
    display: flex;
    width: 75%;
    justify-content: space-around;
}

.radio>div>label {
    vertical-align: middle;
}
.radio>div>input[type=radio] {
    width: 16px;
    height: 16px;
    margin: 0px 8px;
    vertical-align: middle;
}
</style>