<template>
    <div class="foot" style="height: 40px;">
        <a href="https://mupsy.net/" style="color: #777;">主页</a> |
        <a href="https://github.com/mupsycho" target="_blank" style="color: #777;">GitHub</a><br>
        © 2021-2024 by <a href="https://mupsy.net/">Mupsy</a> . All rights reserved.
    </div>
</template>

<style scoped>
.foot {
    position: absolute;
    bottom: 10px;
    text-align: center;
    width: 100%;
    color: #999;
    height: 20px;
    line-height: 20px;
    font-size: 12px;
}
.foot a {
    text-decoration: none;
}
@media (max-height: 420px) { 
    .foot {
        display: none;
    }
}
@media (prefers-color-scheme: dark) {
    .foot a { 
        color: #ea6f5a;
    }
}
</style>