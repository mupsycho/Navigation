<template>
    <div class="content" @click="reset">
        <SearchInput></SearchInput>
        <SliderList></SliderList>
    </div>
</template>

<script setup>
import { provide, ref, defineAsyncComponent } from 'vue';
import SearchInput from './components/SearchInput.vue';

const SliderList = defineAsyncComponent(() => import("./components/SliderList.vue"));

const searchSelectView = ref(false); // show the select options or not
const searchEditView = ref(false); // show the edit options or not
const sliderView = ref(false); // show the sliders or not
provide("search-select-view", searchSelectView);
provide("search-edit-view", searchEditView);
provide("slider-view", sliderView);

const editModel = ref(false); // edit model
provide("edit-model", editModel);

const reset = () => {
    searchSelectView.value = false;
    searchEditView.value = false;
    sliderView.value = false;
}
</script>

<style scoped>
.content {
    width: 100%;
    height: 100%;
    overflow: hidden;
}
</style>