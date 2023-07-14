<template>
  <div class="events-page">
    <div class="search-bar-wrapper">
      <div class="search-bar">
        <input v-model="search" type="text" placeholder="Search events">
        <select v-model="filter" class="filter-bar">
          <option value="">All</option>
          <option value="Concert">Concert</option>
          <option value="Conference">Conference</option>
          <option value="Sport Event">Sport Event</option>
          <option value="Performance">Performance</option>
        </select>
      </div>
    </div>
    <div class="events-grid">
      <div class="event-card" v-for="event in filteredEvents" :key="event._id">
        <button v-if="isAdmin" @click="deleteEvent(event._id)" class="delete">X</button>
        <img :src="event.imageUrl" alt="Event image">
        <p class="type">{{ event.type }}</p>
        <div class="info">
          <h3>{{ event.name }}</h3>
          <h1>{{ event.date }}</h1>
          <p>{{ event.description }}</p>
        </div>
        <br><br><br>
        <div class="bottom">
          <p class="tickets">Available Tickets: {{ event.tickets }}</p>
          <button v-bind:disabled="event.tickets === 0" class="price" :class="{ 'disabled-button': event.tickets === 0 }"
            @click="goToPayment(event._id)">
            RM {{ event.price }}
          </button>

        </div>
      </div>
    </div>
    <button v-if="isAdmin" @click="createEvent" class="create-event-button">Create Event</button>
  </div>
</template>
  
<script>
import '../styles/events.css';

export default {
  name: 'Events',
  data() {
    return {
      events: [],
      search: '',
      filter: '',
      isAdmin: false
    }
  },
  computed: {
    filteredEvents() {
      return this.events.filter(event =>
        event.name.toLowerCase().includes(this.search.toLowerCase()) &&
        (!this.filter || event.type === this.filter)
      );
    }
  },
  methods: {
    async fetchEvents() {
      const response = await fetch('http://localhost:3000/api/events/getAll');
      this.events = await response.json();
    },
    createEvent() {
      this.$router.push('/create-event');
    },
    goToPayment(eventId) {
      this.$store.commit('setEventId', eventId);
      this.$store.commit('setUserId', JSON.parse(localStorage.getItem('user'))._id);
      this.$router.push({ name: 'PaymentForm' });
    },
    async deleteEvent(eventId) {
      const response = await fetch(`http://localhost:3000/api/events/delete`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          eventId: eventId,
        }),
      });
      const data = await response.json();
      console.log(data);
      if (data.success) {
        this.fetchEvents();
      } else {
        this.error = data.message;
      }
    },
  },
  created() {
    this.fetchEvents();
    const user = JSON.parse(localStorage.getItem('user'));
    if (user && user.role === 'admin') {
      this.isAdmin = true;
    } else if (!user) {
      this.$router.push('/signin');
    }
  }
}
</script>
  