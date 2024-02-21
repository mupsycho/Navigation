import { defineStore } from "pinia";

export const useDarkModeStore = defineStore('dark-mode', {
    state: () => {
        return {
            dark: window.matchMedia('(prefers-color-scheme: dark)').matches ? true : false
        }
    }
})