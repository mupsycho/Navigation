import { defineStore } from "pinia";

export const useEditorModeStore = defineStore('editor-mode', {
    state: () => {
        return {
            editor: false
        }
    }
})