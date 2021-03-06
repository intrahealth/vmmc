import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import router from './router'
import VueCookies from 'vue-cookies'

Vue.use(Vuex)

export const store = new Vuex.Store({
	state: {
		auth: {
      username: '',
      userID: '',
      role: '',
      token: ''
    },
		moduleProgress: {
			one: {
				status: 'pending'
			},
			two: {
				status: 'pending'
			},
			three: {
				status: 'pending'
			}
		},
		mod1ClientsMood: {
			clientA: null,
			clientB: null,
			clientC: null
		},
		dialogError: false,
		errorTitle: '',
		errorDescription: ''
	}
})

axios.interceptors.request.use((config) => {
  let token = store.state.auth.token
  if (token) {
    config.headers['Authorization'] = `Bearer ${token}`
  }
  return config
}, (error) => {
  return Promise.reject(error)
})

axios.interceptors.response.use((response) => {
  return response
}, function (error) {
  let status = error.response.status

  if (status === 401) {
    store.state.auth.token = ''
    VueCookies.remove('token')
    router.push('login')
  }
  return Promise.reject(error)
});
