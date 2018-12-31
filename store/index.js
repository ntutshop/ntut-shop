import Vuex from 'vuex'

const createStore = () => {
  return new Vuex.Store({
    state: () => ({
      loggedIn: false,
      userInfo: undefined
    }),
    mutations: {
      setLoggedIn(state, loggedIn) {
        state.loggedIn = loggedIn
      },
      setUserInfo(state, userInfo) {
        state.userInfo = userInfo
      }
    },
    actions: {
      async nuxtServerInit({ dispatch }, { $axios, route }) {
        try {
          let { data } = await $axios.get('/user/information')
          dispatch('setLoggedIn', true)
          dispatch('setUserInfo', data)
        } catch (e) {
          const code = parseInt(e.response && e.response.status)
          if (code === 401) {
            dispatch('setLoggedIn', false)
            dispatch('setUserInfo', undefined)
          } else if (code === 403) {
            dispatch('setLoggedIn', true)
            dispatch('setUserInfo', undefined)
          } else if (code === 404) {
            dispatch('setLoggedIn', false)
            dispatch('setUserInfo', undefined)
          } else {
            throw e
          }
        }
      },
      setLoggedIn({ commit }, loggedIn) {
        console.log(this)
        commit('setLoggedIn', loggedIn)
      },
      setUserInfo({ commit }, userInfo) {
        commit('setUserInfo', userInfo)
      },
      async updateUserState({ dispatch }) {
        try {
          let { data } = await this.$axios.get('/user/information')
          dispatch('setLoggedIn', true)
          dispatch('setUserInfo', data)
        } catch (e) {
          const code = parseInt(e.response && e.response.status)
          if (code === 401) {
            dispatch('setLoggedIn', false)
            dispatch('setUserInfo', undefined)
          } else if (code === 403) {
            dispatch('setLoggedIn', true)
            dispatch('setUserInfo', undefined)
          } else if (code === 404) {
            dispatch('setLoggedIn', false)
            dispatch('setUserInfo', undefined)
          } else {
            throw e
          }
        }
      }
    }
  })
}

export default createStore
