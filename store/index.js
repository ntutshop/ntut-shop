import Vuex from 'vuex'

const cookieparser = process.server ? require('cookieparser') : undefined

const createStore = () => {
  return new Vuex.Store({
    state: () => ({
      loggedIn: false
    }),
    mutations: {
      setLoggedIn (state, loggedIn) {
        state.loggedIn = loggedIn
      }
    },
    actions: {
      nuxtServerInit ({ commit }, { req }) {
        let loggedIn = false
        if (req.headers.cookie) {
          let parsed = cookieparser.parse(req.headers.cookie)
          loggedIn = !!parsed.jwt
        }
        commit('setLoggedIn', loggedIn)
      },
      setLoggedIn ({ commit }, loggedIn) {
        commit('setLoggedIn', loggedIn)
      }
    }
  })
}

export default createStore
