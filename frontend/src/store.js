import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
	state: {
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
