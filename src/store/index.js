import { createStore } from 'vuex'

export default createStore({
  state: {
    isLogined: false,
    currentUser: {},
    activePopup: '',
  },
  getters: {
    isLogined(state) {
      return state.isLogined
    },
    currentUser(state) {
      return state.currentUser
    },
    activePopup(state) {
      return state.activePopup
    },
  },
  mutations: {
    changeLoginState(state, loginState) {
      state.isLogined = loginState
    },
    setCurrentUser(state, currentUser) {
      state.currentUser = currentUser
    },
    changeActivePopup(state, popupName) {
      state.activePopup = popupName
    },
  },
  actions: {
    isLogined({commit}, loginState) {
      commit('changeLoginState', loginState)
    },
    currentUser({commit}, currentUser) {
      commit('setCurrentUser', currentUser)
    },
    changeActivePopup({commit}, popupName) {
      commit('changeActivePopup', popupName)
    }
  },
})
