import { defineStore } from "pinia";

function getLocalStorage(key, def = null) {
    const val = localStorage.getItem(`m-${key}`);
    return val ? val : def;
}

function saveLocalStorage(key, val) {
    localStorage.setItem(`m-${key}`, val);
}

export const useStore = defineStore('search', {
    state: () => {
        let searchInfo = [];
        if (getLocalStorage("searchInfo")) {
            searchInfo = JSON.parse(getLocalStorage("searchInfo", "[]"));
        }
        let sliderInfo = [];
        if (getLocalStorage("sliderInfo")) {
            sliderInfo = JSON.parse(getLocalStorage("sliderInfo", "[]"));
        }
        return {
            searchInfo: searchInfo,
            sliderInfo: sliderInfo
        }
    },
    getters: {
        all() {
            if (this.searchInfo.length == 0) { this.loadLocalSearch(); }
            if (this.sliderInfo.length == 0) { this.loadLocalSlider(); }
            return {
                search: this.searchInfo,
                slider: this.sliderInfo
            }
        }
    },
    actions: {
        loadLocalSearch() {
            import("@/assets/data/search.json")
                .then(r => r.default)
                .then(e => {
                    e.forEach(v => {
                        this.searchInfo.push(v);
                    });
                    saveLocalStorage("searchInfo", JSON.stringify(this.searchInfo));
                });
        },
        loadLocalSlider() {
            import("@/assets/data/slider.json")
                .then(r => r.default)
                .then(e => {
                    e.forEach(v => {
                        this.sliderInfo.push(v);
                    });
                    saveLocalStorage("sliderInfo", JSON.stringify(this.sliderInfo));
                });
        },
        delSearch(item) {
            let i = -1;
            this.searchInfo.forEach((v, j) => {
                if (v.id === item.id) i = j;
            });
            if (i >= 0) this.searchInfo.splice(i, 1);
            saveLocalStorage("searchInfo", JSON.stringify(this.searchInfo));
        },
        changeCurr(item) {
            saveLocalStorage("searchCurr", JSON.stringify(item));
        },
        getCurr() {
            const val = JSON.parse(getLocalStorage("searchCurr", "{}"));
            return Object.assign({}, {
                "id": "bing",
                "name": "必应",
                "des": "比百度好，且国内能用",
                "suggestion": "https://cn.bing.com/AS/Suggestions?qry={i}",
                "url": "https://cn.bing.com/search",
                "param": {
                    "main": "q"
                },
                "icon": "./icon/bing.svg",
                "method": "get",
                "target": "_blank"
            }, val);
        }
    }
});