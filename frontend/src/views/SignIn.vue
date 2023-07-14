<template>
  <div class="signin-page">
    <h1>Sign In</h1>
    <form @submit.prevent="submitForm">
      <input v-model="email" type="email" placeholder="Email" required>
      <input v-model="password" type="password" placeholder="Password" required>
      <button type="submit">Sign In</button>
    </form>
    <br />
    <p v-if="error">{{ error }}</p>
  </div>
</template>

<script>
import '../styles/auth.css';

export default {
  name: 'SignIn',
  data() {
    return {
      email: '',
      password: '',
      error: ''
    }
  },
  methods: {
    async submitForm() {
      const response = await fetch('http://localhost:3000/api/users/signin', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: this.email,
          password: this.password,
        }),
      });
      const data = await response.json();
      if (response.ok) {
        localStorage.setItem('user', JSON.stringify(data.user));
        this.$emit('updateUser', data.user);
        this.$router.push('/');
      } else {
        this.error = data.message;
      }
    },
  },
  created() {
    const user = JSON.parse(localStorage.getItem('user'));
    if (user) {
      this.$router.push('/');
    }
  }
}
</script>
