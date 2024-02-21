import { defineStore } from "pinia";

export const useStore = defineStore('dark-mode', {
    state: () => {
        return {
            dark: window.matchMedia('(prefers-color-scheme: dark)').matches ? true : false
        }
    }
})