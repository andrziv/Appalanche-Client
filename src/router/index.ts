import {createRouter, createWebHistory} from 'vue-router';

import {useAuthStore} from '@/stores/authentication'

import ApplicationsView from '@/views/ApplicationsView.vue';
import LoginView from '@/views/LoginView.vue';
import SignupView from '@/views/SignupView.vue';
import SettingsView from "@/views/SettingsView.vue";
import {useProfileStore} from "@/stores/profile";

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
    {
        path: '/settings',
        name: 'Settings',
        component: SettingsView,
        meta: {
            title: 'Settings',
            requiresAuth: true,
            requiresNoAuth: false
        },
    },
];

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes,
});

router.beforeEach(async (to, _from, next) => {
    const authStore = useAuthStore();
    const profileStore = useProfileStore();

    if (!authStore.authCheckComplete) {
        await authStore.initializeAuth();
    }

    const authenticated = authStore.isAuthenticated;
    if (authenticated && profileStore.profile == null) {
        await profileStore.fetchProfile();
    }

    if (to.matched.some(record => record.meta.requiresAuth) && !authenticated) {
        return next({name: 'Login'});
    }

    if (to.matched.some(record => record.meta.requiresNoAuth) && authenticated) {
        return next({name: 'Applications'});
    }

    next();
});

export default router;