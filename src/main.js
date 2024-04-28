import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import Vueform from '@vueform/vueform'
import vueformConfig from './../vueform.config'
import router from '@/scripts/router.js';

import componentMixin from '@/scripts/mixins/componentMixin.js'

// import { useUserStore } from '@/scripts/stores/userStore'
// import { useTaskStore } from '@/scripts/stores/taskStore'

const app = createApp(App)
const pinia = createPinia()

app.use(router)
app.use(pinia)
app.use(Vueform, vueformConfig)

app.mixin(componentMixin)

app.mount('#app')