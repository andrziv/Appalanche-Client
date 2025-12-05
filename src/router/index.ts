import {createRouter, createWebHistory} from 'vue-router';

import {useAuthStore} from '@/stores/authentication'

import ApplicationsView from '@/views/ApplicationsView.vue';
import LoginView from '@/views/LoginView.vue';
import SignupView from '@/views/SignupView.vue';

const routes = [
    {
        path: '/',
        name: 'Applications',
        component: ApplicationsView,
        meta: {
            title: 'Applications',
            requiresAuth: true,
            requiresNoAuth: false
        },
    },
    {
        path: '/login',
        name: 'Login',
        component: LoginView,
        meta: {
            title: 'Login',
            requiresAuth: false,
            requiresNoAuth: true
        },
    },
    {
        path: '/signup',
        name: 'Signup',
        component: SignupView,
        meta: {
            title: 'Signup',
            requiresAuth: false,
            requiresNoAuth: true
        },
    },
];

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes,
});

router.beforeEach(async (to, from, next) => {
    const auth = useAuthStore();

    if (!auth.authCheckComplete) {
        await auth.fetchUser();
    }

    if (to.matched.some(record => record.meta.requiresAuth) && !auth.isAuthenticated) {
        return next({name: 'Login'});
    }

    if (to.matched.some(record => record.meta.requiresNoAuth) && auth.isAuthenticated) {
        return next({name: 'Applications'});
    }

    next();
});

export default router;