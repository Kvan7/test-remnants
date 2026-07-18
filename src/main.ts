import { createApp } from 'vue';
import App from './App.vue';
import * as Data from './assets/data';

await Data.init();

createApp(App).mount('#app');
