<template>
    <div class="signup-page">
        <h1>Sign Up</h1>
        <form @submit.prevent="submitForm">
            <input v-model="name" type="text" placeholder="Name" required>
            <input v-model="email" type="email" placeholder="Email" required>
            <input v-model="password" type="password" placeholder="Password" required>
            <button type="submit">Sign Up</button>
        </form>
        <br/>
        <p v-if="error">{{ error }}</p>
    </div>
</template>
  
<script>
import '../styles/auth.css';

export default {
    name: 'SignUp',
    data() {
        return {
            name: '',
            email: '',
            password: '',
            error: ''
        }
    },
    methods: {
        async submitForm() {
            if (this.password.length < 8) {
                this.error = "Password should be at least 8 characters.";
                return;
            }
            
            const response = await fetch('http://localhost:3000/api/users/signup', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    name: this.name,
                    email: this.email,
                    password: this.password,
                }),
            });
            const data = await response.json();
            if (response.ok) {
                this.$router.push('/signin');
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
