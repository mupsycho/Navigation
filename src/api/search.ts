import type { SearchResponse } from "../types/info";
import type { SliderItem } from "../types/slider";

export class SearchApi {
    static searchInfo(): Promise<Array<SearchResponse>> {
        return new Promise((resolve) => {
            fetch("./assets/data/search.json")
                .then((response) => response.json())
                .then((data: Array<SearchResponse>) => {
                    resolve(data);
                });
        });
    }

    static sliderInfo(): Promise<Array<SliderItem>> {
        return new Promise((resolve) => {
            fetch("./assets/data/slider.json")
                .then((response) => response.json())
                .then((data: Array<SliderItem>) => {
                    resolve(data);
                });
        });
    }
}