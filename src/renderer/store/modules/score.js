const state = {
  current: 0
}

const mutations = {
  INCREASE_CURRENT_SCORE (state) {
    state.current++
  },
  RESET_CURRENT_SCORE (state) {
    state.current = 0
  }
}

export default {
  mutations,
  namespaced: true,
  state
}
