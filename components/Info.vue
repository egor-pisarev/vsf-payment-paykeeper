<template>
  <div class="mb15 mt20 payment-cash-on-delivery-info-container">
    <h4 class="mt0">Детали оплаты</h4>
    <div class="bg-cl-secondary px20 py20">
      <div id="payment-form"><p>После того, как заказ будет создан, вы будете перенаправлены на страницу оплаты сервиса Paykeeper.</p></div>
    </div>
  </div>
</template>

<script>
import store from '@vue-storefront/core/store'
import { mapGetters } from 'vuex'

export default {
  name: 'PaymentPaykeeper',
  data () {
    return {}
  }
}
</script>
