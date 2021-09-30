import { createStore } from "vuex";

import state from "./state";
import actions from "./actions";
import mutations from "./mutations";
import getters from "./getters";
import modules from "./modules";

export default createStore({
  state: state,
  actions: actions,
  mutations: mutations,
  getters: getters,
  modules,
});
