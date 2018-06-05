const state = {
  current: 0
}

const getters = {
  currentScore: state => {
    return state.current
  }
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
  getters,
  mutations,
  state
}
