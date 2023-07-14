<template>
    <div class="tickets-page">
        <div class="tickets-grid">
            <div class="ticket-card" v-for="ticket in sortedTickets" :key="ticket._id">
                <img :src="ticket.event.imageUrl" alt="Ticket image">
                <p class="type">{{ ticket.event.type }}</p>
                <div class="info">
                    <h3>{{ ticket.event.name }}</h3>
                    <p>{{ ticket.event.description }}</p>
                    <br><br><br>
                </div>
                <div class="bottom">
                    <div class="purchase-date">Purchase Date: {{ formatDate(ticket.purchaseDate) }}</div>
                    <button class="status-button" :class="getTicketStatus(ticket.event.date).toLowerCase()">
                        {{ ticket.event.date }}
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>
  
<script>
import '../styles/tickets.css';

export default {
    name: 'Tickets',
    data() {
        return {
            tickets: [],
        }
    },
    computed: {
        sortedTickets() {
            return this.tickets
                .filter(ticket => ticket.event !== null)
                .sort((a, b) => {
                    const statusA = this.getTicketStatus(a.event.date);
                    const statusB = this.getTicketStatus(b.event.date);

                    const statusValue = {
                        'Today': 1,
                        'Soon': 2,
                        'Expired': 3
                    };

                    return statusValue[statusA] - statusValue[statusB];
                });
        }
    },
    methods: {
        formatDate(dateString) {
            const options = { year: 'numeric', month: 'long', day: 'numeric' };
            return new Date(dateString).toLocaleDateString(undefined, options);
        },
        async fetchTickets() {
            const userId = JSON.parse(localStorage.getItem('user'))._id;
            const response = await fetch(`http://localhost:3000/api/events/getUserTickets/${userId}`);
            this.tickets = await response.json();
        },
        getTicketStatus(date) {
            const today = new Date();
            const ticketDate = new Date(date);

            const todayYear = today.getFullYear();
            const todayMonth = today.getMonth();
            const todayDay = today.getDate();

            const ticketYear = ticketDate.getFullYear();
            const ticketMonth = ticketDate.getMonth();
            const ticketDay = ticketDate.getDate();

            if (todayYear > ticketYear || (todayYear === ticketYear && todayMonth > ticketMonth) || (todayYear === ticketYear && todayMonth === ticketMonth && todayDay > ticketDay)) {
                return 'Expired';
            } else if (todayYear === ticketYear && todayMonth === ticketMonth && todayDay === ticketDay) {
                return 'Today';
            } else {
                return 'Soon';
            }
        }

    },
    created() {
        const user = JSON.parse(localStorage.getItem('user'));
        if (!user) {
            this.$router.push('/signin');
        } else {

            this.fetchTickets();
        }
    }
}
</script>
  