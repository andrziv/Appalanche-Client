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
        refreshTimer: null as ReturnType<typeof setTimeout> | null,
        lastRefreshedAt: 0,
        lifespanMilliseconds: 0,
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
                this.lastRefreshedAt = Date.now();
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
                this.lastRefreshedAt = 0;
                this.lifespanMilliseconds = 0;
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
                this.lastRefreshedAt = Date.now();
            } catch (error) {
                this.logout();
            }
        },

        scheduleRefresh(lifespanMilliseconds: number) {
            if (this.refreshTimer) {
                clearTimeout(this.refreshTimer);
            }

            const refreshDelayMs = lifespanMilliseconds * 2 / 3;
            this.lifespanMilliseconds = lifespanMilliseconds;

            if (refreshDelayMs < 5000) {
                return;
            }

            this.refreshTimer = setTimeout(() => {
                this.cookieRefresh();
            }, refreshDelayMs);
        },

        realignCookieRefreshSchedule() {
            if (!this.isAuthenticated) {
                return;
            }

            const now = Date.now();
            const targetRefreshTime = this.lastRefreshedAt + (this.lifespanMilliseconds * 2 / 3);

            if (now >= targetRefreshTime) {
                this.cookieRefresh();
                return;
            }

            if (this.refreshTimer) {
                clearTimeout(this.refreshTimer);
            }

            const timeUntilRefresh = targetRefreshTime - now;

            this.refreshTimer = setTimeout(() => {
                this.cookieRefresh();
            }, timeUntilRefresh);
        }
    }
});