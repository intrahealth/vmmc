import '@babel/polyfill'
import Vue from 'vue'
import './plugins/vuetify'
import Vuelidate from 'vuelidate'
import App from './App.vue'
import store from './store'
import router from './router'

Vue.config.productionTip = false
export const eventBus = new Vue()

Vue.use(Vuelidate)
new Vue({
	store,
	router,
	render: h => h(App)
}).$mount('#app')
