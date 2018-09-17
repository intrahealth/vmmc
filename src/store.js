import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    moduleProgress: {
      module: 1,
      completed: false
    },
    dialogError: false,
    errorTitle: "",
    errorDescription: ""
  }
});
