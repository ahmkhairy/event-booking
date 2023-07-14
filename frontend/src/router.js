import { createRouter, createWebHistory } from 'vue-router'
import SignUp from './views/SignUp.vue'
import SignIn from './views/SignIn.vue'
import Events from './views/Events.vue'
import Tickets from './views/Tickets.vue'
import CreateEvent from './views/CreateEvent.vue'
import PaymentSuccess from './views/PaymentSuccess.vue'
import PaymentForm from './views/PaymentForm.vue'

const routes = [
    {
        path: '/signup',
        name: 'SignUp',
        component: SignUp
    },
    {
        path: '/signin',
        name: 'SignIn',
        component: SignIn
    },
    {
        path: '/events',
        name: 'Events',
        component: Events
    },
    {
        path: '/tickets',
        name: 'Tickets',
        component: Tickets
    },
    {
        path: '/create-event',
        name: 'CreateEvent',
        component: CreateEvent
    },
    {
        path: '/payment-form',
        name: 'PaymentForm',
        component: PaymentForm,
    },
    {
        path: '/payment-success',
        name: 'PaymentSuccess',
        component: PaymentSuccess
    },
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router
