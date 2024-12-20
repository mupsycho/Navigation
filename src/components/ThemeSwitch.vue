<script setup lang="ts">
import { ref, watch } from "vue";
import { useColorScheme } from "../store/colorScheme";
import { Moon, Sunny } from "@element-plus/icons-vue";

const colorScheme = useColorScheme();
const isDark = ref(colorScheme.isDark);

watch(isDark, (newVal: boolean) => {
    colorScheme.switch(newVal ? 'dark' : 'light');
});
</script>

<template>
    <el-switch
        v-model="isDark"
        class="dark-switch"
        inline-prompt
        :active-icon="Moon"
        :inactive-icon="Sunny"
    />
</template>

