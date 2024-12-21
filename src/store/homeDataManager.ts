import { defineStore } from "pinia"
import type { SearchInfo, SearchItem, SearchParam, SearchResponse } from "../types/info";
import type { SliderItem } from "../types/slider";
import { SearchApi } from "../api/search";

const parseUrl2SearchParam = (item: SearchResponse): SearchItem => {
    const param: SearchParam = {
        main: "",
        other: {}
    };

    const urlObj = new URL(item.url);
    urlObj.searchParams.forEach((value, key) => {
        if (value == "%s") {
            param.main = key;
        } else {
            param.other[key] = value;
        }
    });

    return {
        name: item.name,
        des: item.des,
        url: `${urlObj.origin}${urlObj.pathname}`,
        param: param,
        icon: item.icon || `${urlObj.origin}/favicon.ico`,
        method: item.method || "get",
        target: item.target || "_blank"
    };
};

export const useHomeDataManager = defineStore('home-data-manager', {
    state() {
        const searchCurr: SearchInfo = {
            icon: "https://www.bing.com/favicon.ico",
            action: "https://www.bing.com/search",
            method: "get",
            target: "_blank",
            placeholder: "必应搜索",
            searchKey: {
                main: "q",
                other: {}
            }
        };
        const searchInfo: SearchItem[] = [];
        const sliderInfo: SliderItem[] = [];
        return {
            searchCurr,
            searchInfo,
            sliderInfo
        }
    },
    actions: {
        update() {
            SearchApi.searchInfo().then((res) => {
                for (const item of res) {
                    this.searchInfo.push(parseUrl2SearchParam(item));
                }
            });
            SearchApi.sliderInfo().then((res) => {
                this.sliderInfo = res;
            });
        },
        switchSearchInfo(index: number) {
            if (index < 0 || index >= this.searchInfo.length) {
                return;
            }
            this.searchCurr = {
                icon: this.searchInfo[index].icon,
                action: this.searchInfo[index].url,
                method: this.searchInfo[index].method,
                target: this.searchInfo[index].target,
                placeholder: this.searchInfo[index].des,
                searchKey: this.searchInfo[index].param
            };
        }
    }
});
