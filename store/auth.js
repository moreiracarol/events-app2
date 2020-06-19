import { Auth } from 'aws-amplify'

export const state = () => ({
  isAuthenticated: false,
  user: null
})

export const mutations = {
  setUser(state, user) {
    state.isAuthenticated = !!user
  }
}

export const actions = {
  async load({ commit }) {
    try {
      const user = await Auth.currentAuthenticatedUser()
      commit('setUser', user)
      return user
    } catch (e) {
      commit('setUser', null)
    }
  },
  async register(_, { email, password }) {
    try {
      await Auth.signUp({
        username: email,
        password
      })
    } catch (e) {
      console.log(e)
    }
  },
  async confirmRegistration(_, { email, code }) {
    try {
      await Auth.confirmSignUp(email, code)
    } catch (e) {
      console.log(e)
    }
  },
  async login({ commit }, { email, password }) {
    const user = await Auth.signIn(email, password)
    commit('setUser', user)
  },
  async logout({ commit }) {
    await Auth.signOut()
    commit('setUser', null)
  }
}
