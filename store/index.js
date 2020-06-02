import Vue from 'vue'
import Vuex from 'vuex'
import Mutations from '@/store/mutations'
import Actions from '@/store/actions'
import Getters from '@/store/getters'

Vue.use(Vuex)

export const state = () => ({
  events: [],
  favorites: [],
  totalPages: 0,
  authenticated: false
})
export const mutations = Mutations
export const actions = Actions
export const getters = Getters
