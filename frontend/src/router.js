import Vue from 'vue'
import Router from 'vue-router'
import Module1 from './components/Game/Module1'
import Module2 from './components/Game/Module2'
import Home from './components/Home'

Vue.use(Router)

export default new Router({
	routes: [
		{
			path: '/',
			name: 'Home',
			component: Home
		},
		{
			path: '/Module1',
			name: 'Module1',
			component: Module1
		},
		{
			path: '/Module2',
			name: 'Module2',
			component: Module2
		}
	]
})
