import { createApp } from 'vue'
import { createPinia } from 'pinia'
import piniaPluginPersistence from 'pinia-plugin-persistedstate'
import { Quasar, Notify } from 'quasar'

import App from './App.vue'
import router from './router'

import 'quasar/dist/quasar.css'
import '@quasar/extras/material-icons/material-icons.css'
import 'quasar/src/css/index.sass'
import '@/styles/main.scss'
import '@/plugins/vee-validate'

const app = createApp(App)

const pinia = createPinia()
pinia.use(piniaPluginPersistence)

app.use(pinia)
app.use(router)

app.use(Quasar, { plugins: { Notify } })

app.mount('#app')