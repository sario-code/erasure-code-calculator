import { createApp } from 'vue'
import App from './App.vue'
import './styles/tailwind.css'
import '@fortawesome/fontawesome-free/css/all.css'
import Chart from 'chart.js/auto'

const app = createApp(App)
app.config.globalProperties.$chart = Chart
app.mount('#app')