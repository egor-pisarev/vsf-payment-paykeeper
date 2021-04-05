import { Module } from 'vuex'
import { PaykeeperState } from '../types/PaykeeperState'
import { getters } from './getters'
import { actions } from './actions'
import * as types from './mutation-types'

export const module: Module<PaykeeperState, any> = {
  state: {
    token: null,
    orderPayData: null
  },
  namespaced: true,
  actions,
  getters,
  mutations: {
    [types.SET_PAYKEEPER_TOKEN](state, token) {
      state.token = token
    }
  }
}
