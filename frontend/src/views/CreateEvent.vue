<template>
    <div class="create-event-page">
        <h1>Create Event</h1>
        <form @submit.prevent="submitForm">
            <select v-model="type" required>
                <option disabled value="">Please select a type</option>
                <option>Concert</option>
                <option>Conference</option>
                <option>Sport Event</option>
                <option>Performance</option>
            </select>
            <input v-model="name" type="text" placeholder="Name" required>
            <input v-model="description" type="text" placeholder="Description" required>
            <input v-model="price" type="number" placeholder="Price" min="0" required>
            <input v-model="tickets" type="number" placeholder="Number of Tickets" min="1" required>
            <input v-model="date" type="date" required>
            <input v-on:change="onFileChange" type="file" accept="image/*" required>
            <button type="submit">Create</button>
        </form>
        <br />
        <p v-if="error">{{ error }}</p>
    </div>
</template>

  
<script>
import '../styles/createEvent.css';

export default {
    name: 'CreateEvent',
    data() {
        return {
            name: '',
            type: '',
            price: '',
            description: '',
            image: null,
            error: '',
            tickets: '',
            date: ''
        }
    },
    methods: {
        onFileChange(e) {
            const files = e.target.files || e.dataTransfer.files;
            if (!files.length)
                return;
            this.createImage(files[0]);
        },
        createImage(file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                this.image = file;
            };
            reader.readAsDataURL(file);
        },
        async submitForm() {
            const eventDate = new Date(this.date);
            const today = new Date();

            eventDate.setHours(0, 0, 0, 0);
            today.setHours(0, 0, 0, 0);

            if (eventDate < today) {
                this.error = 'You cannot create events in the past.';
                return;
            }

            const formData = new FormData();
            formData.append('name', this.name);
            formData.append('type', this.type);
            formData.append('price', this.price);
            formData.append('description', this.description);
            formData.append('image', this.image);
            formData.append('tickets', this.tickets);
            formData.append('date', this.date);

            const response = await fetch('http://localhost:3000/api/events/create', {
                method: 'POST',
                body: formData,
            });
            const data = await response.json();
            console.log(data);
            if (data.success) {
                this.$router.push('/events');
            } else {
                this.error = data.message;
            }
        },

    },
}
</script>
  