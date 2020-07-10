import { Auth } from 'aws-amplify'

export const state = () => ({
  isAuthenticated: false,
  isRegistered: false,
  isConfirmed: false,
  authError: null,
  user: null
})

export const mutations = {
  setUser(state, user) {
    state.isAuthenticated = !!user
  },
  setRegister(state, isRegistered) {
    state.isRegistered = isRegistered
  },
  setConfirmed(state, isConfirmed) {
    state.isRegistered = isConfirmed
  },
  setAuthError(state, error) {
    state.authError = error
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
  async register({ commit }, { email, password }) {
    try {
      await Auth.signUp({
        username: email,
        password
      })
      commit('setRegister', true)
    } catch (e) {
      commit('setAuthError', e)
    }
  },
  async confirmRegistration({ commit }, { email, code }) {
    try {
      await Auth.confirmSignUp(email, code)
      commit('setConfirmed', true)
    } catch (e) {
      commit('setAuthError', e)
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
