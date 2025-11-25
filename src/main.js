import { createApp } from 'vue';
import App from './App.vue';
import router from './router/index.js';
import { initializeAuth } from './stores/auth.js';
import './style.css';
import { Icon } from '@iconify/vue';

// Initialize authentication state
initializeAuth();

// Create and configure the Vue application
const app = createApp(App);

// Register global components
app.component('Icon', Icon);

// Use router
app.use(router);

// Mount the application
app.mount('#app');