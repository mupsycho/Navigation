import '@/assets/css/reset.css';

import ElementPlus from 'element-plus';
import zhCn from 'element-plus/es/locale/lang/zh-cn';
import 'element-plus/dist/index.css';
import 'element-plus/theme-chalk/dark/css-vars.css';
import { createApp } from 'vue';
import { createPinia } from 'pinia';

import App from './App.vue';
import { useColorScheme } from './store/colorScheme';
import { useHomeDataManager } from './store/homeDataManager';

const pinia = createPinia();
const app = createApp(App);

app.use(ElementPlus, {
    locale: zhCn,
});
app.use(pinia);

app.mount('#app');

useColorScheme().switch("dark");
useHomeDataManager().update();
