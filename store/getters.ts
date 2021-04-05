import { PaykeeperState } from '../types/PaykeeperState'
import { GetterTree } from 'vuex';

export const getters: GetterTree<PaykeeperState, any> = {
    getToken: state => state.token,
    getOrderPayData: state => state.orderPayData
}