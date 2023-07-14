<template>
  <div class="payment-success-page">
    <div class="payment-success-container">
      <h1>Payment Successful</h1>
      <p>Your payment has been processed and your ticket has been booked.</p>
      <router-link to="/tickets" class="tickets-button">See Your Tickets</router-link>
    </div>
  </div>
</template>

<script>
export default {
  name: 'PaymentSuccess',
}
</script>

<style scoped>
.payment-success-page {
  display: flex;
  justify-content: center;
  align-items: center;
  height: auto;
  padding: 5em;
}

.payment-success-container {
  text-align: center;
  padding: 50px;
  border-radius: 10px;
  background-color: #fff;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
}

h1 {
  color: #4caf50;
  margin-bottom: 40px;
}

p {
  color: #333;
  margin-bottom: 30px;
}

.tickets-button {
  display: inline-block;
  padding: 10px 20px;
  border-radius: 5px;
  text-decoration: none;
  color: #fff;
  background-color: #4caf50;
  transition: background-color 0.3s ease;
  margin-bottom: 5em;
}

.tickets-button:hover {
  background-color: #45a049;
}
</style>
