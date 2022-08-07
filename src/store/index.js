import { createStore } from 'vuex'

export default createStore({
  state: {
    isLogined: false,
    currentUser: {},
    activePopup: '',
    apiKey: ''
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
    getApiKey(state) {
      return state.apiKey
    }
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
    setApiKey(state, API_KEY) {
      state.apiKey = API_KEY
    }
  },
  actions: {
    isLogined({commit}, loginState) {
      commit('changeLoginState', loginState)
    },
    setApiKey({commit}, API_KEY) {
      commit('setApiKey', API_KEY)
    },
    currentUser({commit}, currentUser) {
      commit('setCurrentUser', currentUser)
    },
    changeActivePopup({commit}, popupName) {
      commit('changeActivePopup', popupName)
    }
  },
})
