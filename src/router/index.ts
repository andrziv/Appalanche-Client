import {createRouter, createWebHistory} from 'vue-router';

import ApplicationsView from '@/views/ApplicationsView.vue';
import LoginView from '@/views/LoginView.vue';
import SignupView from '@/views/SignupView.vue';

const routes = [
    {
        path: '/',
        name: 'Applications',
        component: ApplicationsView,
        meta: {title: 'Applications'},
    },
    {
        path: '/login',
        name: 'Login',
        component: LoginView,
        meta: {title: 'Login'},
    },
    {
        path: '/signup',
        name: 'Signup',
        component: SignupView,
        meta: {title: 'Signup'},
    },
];

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes,
});

export default router;