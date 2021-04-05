import { PaykeeperState } from '../types/PaykeeperState'
import { ActionTree } from 'vuex'
import config from 'config'
import { processURLAddress } from '@vue-storefront/core/helpers'
import { TaskQueue } from '@vue-storefront/core/lib/sync'
import * as types from './mutation-types'

// it's a good practice for all actions to return Promises with effect of their execution
export const actions: ActionTree<PaykeeperState, any> = {
  // complete({ }, params) {
  //   let url = processURLAddress(config.paykeeper.endpoint.complete)
  //   url = config.storeViews.multistore ? adjustMultistoreApiUrl(url) : url
  //   return fetch(url, {
  //     method: 'POST',
  //     mode: 'cors',
  //     headers: {
  //       'Accept': 'application/json, text/plain, */*',
  //       'Content-Type': 'application/json'
  //     },
  //     body: JSON.stringify(params)
  //   }).then(resp => { return resp.json() })
  // },
  async setToken({ commit, getters, dispatch, rootState }, { amount, cartId }) {
    const tokenUrl = processURLAddress(config.paykeeper.endpoint.token)
    return TaskQueue.execute({
      url: tokenUrl,
      payload: {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        mode: 'cors',
        body: JSON.stringify({ amount, cartId })
      }
    }).then(task => {
      if (task.result.success) {
        commit(types.SET_PAYKEEPER_TOKEN, task.result.result)
      }
      return task
    }).catch(err => {
      console.log('Error token get', err)
    })
  }
}
