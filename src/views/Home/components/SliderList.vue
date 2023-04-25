<script setup>
import { ref, watch, inject, onMounted } from 'vue';

const sliderView = inject("slider-view");
const slide = ref([]); // slider datasets
watch(slide, (n, o) => {
    localStorage.setItem("m-slider", JSON.stringify(n));
    return n;
});

const sliderInfoInit = () => {
    import("../../../assets/data/slider.json")
        .then(r => r.default)
        .then(e => {
            slide.value = e.data;
        });
};
// get web icon address
const getFaviconSrc = (i) => {
    if (i.icon) return i.icon;
    return `//${i.url.match(/^https?:\/\/([^/]+)/i)[1]}/favicon.ico`;
};

onMounted(() => {
    if (!localStorage.getItem("m-slider")) {
        sliderInfoInit();
    } else {
        slide.value = JSON.parse(localStorage.getItem("m-slider"));
    }
});
</script>

<template>
    <div id="menu" :class="{ on: sliderView }" @click.stop="sliderView = !sliderView">
        <div></div>
    </div>
    <div :class="{ list: true, closed: !sliderView }" @click.stop>
        <ul v-for="item in slide">
            <li class="title">
                {{ item.name }}
            </li>
            <li v-for="i in item.data">
                <a rel="nofollow" :href="i.url" target="_blank">
                    <div class="favicon" :style="{ backgroundImage: `url(${getFaviconSrc(i)})` }"></div>
                    <span style="vertical-align: middle;">{{ i.name }}</span>
                </a>
            </li>
        </ul>
    </div>
</template>

<style scoped>
#menu {
    width: 50px;
    height: 50px;
    transform: scale(0.8);
    position: absolute;
    right: 10px;
    top: 5px;
    z-index: 2000000;
    cursor: pointer;
    transition: 0.5s;
}

.list {
    width: 337px;
    padding: 0 20px;
    height: 100%;
    overflow: hidden;
    overflow-y: auto;
    position: absolute;
    top: 0px;
    right: 0px;
    z-index: 2000;
    background: var(--color-layout);
    transition: 0.5s all ease;
}

.list.closed {
    right: -337px;
}

#menu div {
    position: absolute;
    left: 0;
    right: 0;
    margin: 24px auto;
    width: 30px;
    height: 2px;
    background: var(--color-font);
}

#menu div:before {
    content: '';
    width: 20px;
    height: 2px;
    top: -8px;
    background: var(--color-font);
    position: absolute;
    right: 0;
}

#menu div:after {
    content: '';
    width: 20px;
    height: 2px;
    bottom: -8px;
    background: var(--color-font);
    position: absolute;
    left: 0;
}

#menu.on {
    right: 340px;
    background: #29f;
    border-radius: 25px;
    box-shadow: 0 6px 8px rgba(36, 159, 253, .3);
}

#menu.on div {
    width: 20px;
    background: #fff;
}

#menu.on div:before {
    top: -5px;
    transform: rotate(45deg);
    width: 14px;
    right: -1px;
    left: auto;
    background: #fff;
}

#menu.on div:after {
    bottom: -5px;
    transform: rotate(-45deg);
    width: 14px;
    right: -1px;
    left: auto;
    background: #fff;
}

ul {
    width: 100%;
    float: left;
    padding: 0 0 10px;
    margin-bottom: 10px;
    list-style: none;
}

ul li {
    float: left;
    margin: 5px;
    width: calc(100% / 3 - 10px);
    height: 30px;
    text-align: left;
    line-height: 30px;
}

ul li a {
    width: 100%;
    border-radius: 5px;
    transition: 0.2s all linear;
    height: 100%;
    display: block;
    color: var(--color-font);
    font-weight: 500;
    background: var(--color-background);
    text-align: left;
    text-decoration: none;
    font-size: 12px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
}

ul li a span {
    display: inline-block;
    width: calc(100% - 25px);
    margin: 0 0 0 5px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
}

ul li a .favicon {
    display: inline-block;
    width: 20px;
    height: 20px;
    background-size: cover;
    vertical-align: middle;
}

ul li:hover a {
    color: #fff;
    background-color: #29f;
    background-image: linear-gradient(135deg, rgba(35, 153, 255) 0%, rgba(84, 175, 253) 100%);
    box-shadow: 0 3px 3px rgba(0, 40, 70, .3);
}

ul li.title {
    width: 100%;
    height: 40px;
    line-height: 40px;
    margin: 30px 0 0;
    text-align: left;
    text-indent: 10px;
    /*border-bottom: 1px dashed #dedede;*/
    color: var(--color-font);
    font-size: 18px;
    font-weight: bold;
}

@media (max-width: 640px) {
    #menu.on {
        right: calc(100% - 60px);
    }
    .list {
        width: calc(100% - 60px);
    }
    .list.closed {
        right: calc(60px - 100%);
    }
}
</style>