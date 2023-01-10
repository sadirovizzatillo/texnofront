import { createApp } from 'vue'
import App from './App.vue'
import ElementPlus from "element-plus"
import 'element-plus/dist/index.css'
import router from './router'
import store from './store'
import VueCookies from 'vue-cookies'; // import the plugin
import VueSplide from '@splidejs/vue-splide';
import '@splidejs/vue-splide/css';


// set the default SameSite attribute for the created cookies
// to use Lax as the default
// VueCookies.config('SameSite', 'None')

createApp(App).use(store).use(router).use(VueSplide).use(VueCookies, { expires: '7d'}).use(store).use(ElementPlus).mount('#app')
