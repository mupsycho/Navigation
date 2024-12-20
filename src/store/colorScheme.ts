import { defineStore } from "pinia";

type ColorScheme = "light" | "dark";
export const useColorScheme = defineStore("color-scheme", {
    state() {
        let colorScheme: ColorScheme = "light";
        if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
            colorScheme = "dark";
        }
        document.documentElement.classList.add(colorScheme);

        return {
            colorScheme: colorScheme
        }
    },
    getters: {
        currScheme(): ColorScheme {
            return this.colorScheme;
        },
        isDark(): boolean {
            return this.colorScheme === "dark";
        }
    },
    actions: {
        switch(colorScheme: ColorScheme) {
            document.documentElement.classList.remove(this.colorScheme);
            this.colorScheme = colorScheme;
            document.documentElement.classList.add(colorScheme);
        }
    }
})