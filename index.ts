import { StorefrontModule } from '@vue-storefront/core/lib/modules';
import { isServer } from '@vue-storefront/core/helpers'
import Vue from 'vue';
import InfoComponent from './components/Info.vue'
import EventBus from '@vue-storefront/core/compatibility/plugins/event-bus'
import { module } from './store'

export const PaykepeerPaymentModule: StorefrontModule = function ({ store, router, moduleConfig }) {
  store.registerModule('paykeeper', module)

  let correctPaymentMethod = false
  const placeOrder = () => {
    if (correctPaymentMethod) {
      console.log('before Place Order')
    }
  }

  let paymentMethodConfig = {
    'title': 'Paykeeper',
    'code': 'paykeeper',
    'cost': 0,
    'costInclTax': 0,
    'default': true,
    'offline': true,
    'is_server_method': true
  }

  store.dispatch('checkout/addPaymentMethod', paymentMethodConfig);
  if (!isServer) {
    // Update the methods
    let paymentMethodConfig = {
      'title': 'Paykeeper',
      'code': 'paykeeper',
      'cost': 0,
      'cost_incl_tax': 0,
      'default': true,
      'offline': true,
      'is_server_method': true
    }
    store.dispatch('checkout/addPaymentMethod', paymentMethodConfig)

    EventBus.$on('checkout-before-placeOrder', placeOrder)
    EventBus.$on('order-after-placed', ({ order, confirmation }) => {

      console.log(order, confirmation)

      if (correctPaymentMethod && confirmation && confirmation.providerId) {

          const amount = store.getters['cart/getTotals'].find(
          (i) => i.code === 'grand_total'
        ).value

        // store.dispatch('paykeeper/setToken', { amount, orderId: confirmation.providerId }).then(r => {
        //   const confirmationUrl = store.getters['paykeeper/getToken']


        //   window.location.href = confirmationUrl
        // })

        if(confirmation.providerId){
           window.location.href = `/order/${confirmation.providerId}/${amount}`
          //window.location.href = `https://klushki22.server.paykeeper.ru/order/inline?orderid=${confirmation.providerId}&sum=${amount}`
        }
        // const amount = store.getters['cart/getTotals'].find(
        //   (i) => i.code === 'grand_total'
        // ).value
        // const cartId = store.getters['cart/getCartToken']

        
      }
    })
    // Mount the info component when required.
    EventBus.$on('checkout-payment-method-changed', (paymentMethodCode) => {
      let methods = store.state['payment-backend-methods'].methods
      if (methods) {
        let method = methods.find(item => (item.code === paymentMethodCode))

        if (paymentMethodCode === 'paykeeper' && typeof method !== 'undefined') {
          correctPaymentMethod = true
          // Dynamically inject a component into the order review section (optional)
          const Component = Vue.extend(InfoComponent)
          const componentInstance = (new Component())
          componentInstance.$mount('#checkout-order-review-additional')
        } else {
          correctPaymentMethod = false
        }
      }
    })
  }
}
