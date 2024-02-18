import { defineStore } from "pinia";

export const useStore = defineStore('search', {
    state: () => {
      return {
        searchInfo: [],
        sliderInfo: []
      }
    },
    getters: {
        all() {
            return {
                search: this.searchInfo,
                slider: this.sliderInfo
            }
        }
    },
    actions: {
        loadLocal() {
            import("@/assets/data/search.json")
                .then(r => r.default)
                .then(e => {
                    e.forEach(v => {
                        this.searchInfo.push(v);
                    });
                });
            import("@/assets/data/slider.json")
                .then(r => r.default)
                .then(e => {
                    e["data"].forEach(v => {
                        this.sliderInfo.push(v);
                    });
                });
        }
    }
  })