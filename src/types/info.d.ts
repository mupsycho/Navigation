export interface SearchParam {
    main: string;
    other: Record<string, string>;
}

export interface SearchItem {
    name: string;
    des: string;
    icon: string;
    method: "get" | "post";
    target: "_blank" | "_self";
    url: string;
    param: SearchParam;
}

export interface SearchInfo {
    icon: string;
    action: string;
    method: "get" | "post";
    target: "_blank" | "_self";
    placeholder: string;
    searchKey: SearchParam;
}

