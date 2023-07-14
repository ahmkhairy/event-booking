<template>
  <div class="payment-form">
    <h1>Payment Details</h1>
    <form @submit.prevent="submitForm">
      <input v-model="state.cardNumber" type="text" placeholder="Card Number" required>
      <input v-model="state.expiryDate" type="text" placeholder="Expiry Date (MM/YY)" required>
      <input v-model="state.cvv" type="text" placeholder="CVV" required>
      <button type="submit">Pay</button>
      <br/><br/>
      <p v-if="state.error">{{ state.error }}</p>
    </form>
    <div v-if="state.isLoading" class="loading-overlay">
      <img src="../images/loading.gif" alt="Loading..." />
    </div>
  </div>
</template>


<script>
import { reactive } from 'vue'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'
import '../styles/paymentForm.css';

export default {
  name: 'PaymentForm',
  setup() {
    const state = reactive({
      cardNumber: '',
      expiryDate: '',
      cvv: '',
      error: '',
      isLoading: false,
    })
    const store = useStore()
    const router = useRouter()

    const validateInput = () => {
      if (state.cardNumber.length !== 16) {
        state.error = 'Card number should be 16 digits'
        return false
      }
      if (!state.expiryDate.match(/^(0[1-9]|1[0-2])\/?([0-9]{2})$/)) {
        state.error = 'Expiry date should be in MM/YY format'
        return false
      }
      if (state.cvv.length !== 3) {
        state.error = 'CVV should be 3 digits'
        return false
      }
      return true
    }
    
    const submitForm = async () => {
      if (!validateInput()) {
        return
      }

      state.isLoading = true

      const eventId = store.state.eventId
      const userId = store.state.userId
      console.log(eventId, userId)
      
      const response = await fetch('http://localhost:3000/api/events/book', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          eventId: eventId,
          userId: userId,
        }),
      })
      const data = await response.json()
      if (data.success) {
        setTimeout(() => {
          state.isLoading = false
          router.push('/payment-success')
        }, 2000)
      } else {
        state.isLoading = false
        state.error = 'Payment failed. Please try again.'
      }
    }

    return {
      state,
      submitForm,
    }
  },
  beforeUnmount() {
    const store = useStore()
    store.commit('setEventId', null)
    store.commit('setUserId', null)
  },
  created() {
    const store = useStore()
    const router = useRouter()
    const eventId = store.state.eventId;
    const userId = store.state.userId;
    if (!userId || !eventId) {
      router.push('/Events')
    }
  },
}
</script>
