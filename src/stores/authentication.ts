import {defineStore} from 'pinia';
import axios from 'axios';

interface Account {
    accountId: string;
    email: string;
}

export const useAuthStore = defineStore('auth', {
    state: () => ({
        user: null as Account | null,
        isLoading: false,
        error: null as Record<string, string> | null,
        authCheckComplete: false,
        refreshTimer: null as ReturnType<typeof setTimeout> | null
    }),

    getters: {
        isAuthenticated: (state) => !!state.user
    },

    actions: {
        async fetchUser() {
            this.isLoading = true;
            try {
                const response = await axios.get('/authenticate');

                if (response.status !== 200) {
                    this.user = null;
                    return false;
                } else {
                    this.user = await response.data;
                }
            } catch (err) {
                this.user = null;
            } finally {
                this.isLoading = false;
                this.authCheckComplete = true;
            }
        },

        async login(email: string, password: string) {
            this.isLoading = true;
            this.error = null;

            try {
                const response = await axios.post('/authenticate/login', {
                    email: email,
                    password: password
                });

                if (response.status !== 200) {
                    this.error = {'message': 'Invalid credentials'};
                    return false;
                }

                this.user = await response.data;
                this.scheduleRefresh(response.data.expiresInSeconds);
                return true;
            } catch (err: any) {
                this.error = err.response.data;
                return false;
            } finally {
                this.isLoading = false;
            }
        },

        async signup(firstName: string, lastName: string, email: string, password: string) {
            this.isLoading = true;
            this.error = null;

            try {
                const response = await axios.post('/authenticate/signup', {
                    firstname: firstName,
                    surname: lastName,
                    email: email,
                    password: password
                });

                if (response.status !== 201) {
                    this.error = response.data;
                    return false;
                }

                return this.login(email, password);
            } catch (err: any) {
                this.error = err.response.data;
                return false;
            } finally {
                this.isLoading = false;
            }
        },

        async logout() {
            this.isLoading = true;
            try {
                await axios.post('/authenticate/logout');
                this.user = null;

                if (this.refreshTimer) {
                    clearTimeout(this.refreshTimer);
                }
                this.refreshTimer = null;
            } catch (err) {
                this.user = null;
            } finally {
                this.isLoading = false;
                this.authCheckComplete = false;
            }
        },

        async cookieRefresh() {
            try {
                const response = await axios.post('/authenticate/refresh');
                this.authCheckComplete = true;

                this.scheduleRefresh(response.data.accessExpiryMilliseconds);
            } catch (error) {
                this.logout();
            }
        },

        scheduleRefresh(lifespanMilliseconds: number) {
            if (this.refreshTimer) {
                clearTimeout(this.refreshTimer);
            }

            const refreshDelayMs = lifespanMilliseconds * 2 / 3;

            if (refreshDelayMs < 5000) {
                return;
            }

            this.refreshTimer = setTimeout(() => {
                this.cookieRefresh();
            }, refreshDelayMs);
        }
    }
})