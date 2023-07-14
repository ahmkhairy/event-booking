<template>
  <div id="app" :class="backgroundClass">
    <header>
      <div class="header-section">
        <router-link to="/" class="title">Event Booking</router-link>
      </div>
      <div class="header-section">
        <nav>
          <router-link to="/events" class="nav-link" >Events</router-link>
          <router-link to="/tickets" class="nav-link" >My Tickets</router-link>
        </nav>
      </div>
      <div class="header-section">
        <div class="profile-pic" @click="toggleProfileMenu"></div>
        <div class="profile-menu" :class="{ active: showProfileMenu }">
          <router-link class="nav-link" v-if="!user" to="/signup">Sign Up</router-link>
          <router-link class="nav-link" v-if="!user" to="/signin">Sign In</router-link>
          <button class="nav-link" v-if="user" @click="signOut">Sign Out</button>
        </div>
      </div>

    </header>
    <main>
      <div v-if="$route.path === '/'" class="banner">
        <h2>Event Ticketing</h2>
        <p>Your one-stop shop for all your event ticketing needs. Discover events, buy tickets, and enjoy!</p>
      </div>
      <router-view v-else @updateUser="user = $event" />
    </main>
    <footer>
      <p>Ahmed Khairy || Hafiz Ridwan</p>
    </footer>
  </div>
</template>

<script>
import './styles/app.css';

export default {
  name: 'App',
  data() {
    return {
      user: null,
      showProfileMenu: false
    }
  },
  methods: {
    signOut() {
      localStorage.removeItem('user');
      this.user = null;
      this.$router.push('/');
    },
    toggleProfileMenu() {
      this.showProfileMenu = !this.showProfileMenu;
    },
  },
  created() {
    const user = localStorage.getItem('user');
    if (user) {
      this.user = JSON.parse(user);
    }
  },
  computed: {
    backgroundClass() {
      if (this.$route.path === '/signin') {
        return 'signin';
      } else if (this.$route.path === '/signup') {
        return 'signup';
      }else if (this.$route.path === '/create-event') {
        return 'create-event';
      }
      return '';
    }
  },
}
</script>
