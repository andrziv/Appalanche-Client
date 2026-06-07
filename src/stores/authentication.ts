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
        isRefreshing: false,
        refreshTimer: null as ReturnType<typeof setTimeout> | null,
        lastRefreshedAt: 0,
        lifespanMilliseconds: 0,
    }),

    getters: {
        isAuthenticated: (state) => !!state.user
    },

    actions: {
        // TODO: calling three times in the worst-case scenario atm, but if I default to cookie-refreshing as first step
        //  it means that every page refresh requires an extra DB cycle on server (refresh cookie check).
        async initializeAuth(): Promise<void> {
            if (this.authCheckComplete) {
                return;
            }

            try {
                await this.fetchUser();
            } catch (error: any) {
                this.user = null;
            } finally {
                this.authCheckComplete = true;
            }

            if (!this.isAuthenticated) {
                try {
                    await this.cookieRefresh();
                    await this.fetchUser();
                } catch (err: any) {
                    this.user = null;
                    this.error = err.response.data;
                } finally {
                    this.authCheckComplete = true;
                }
            }
        },

        async fetchUser(): Promise<boolean> {
            this.isLoading = true;
            try {
                const response = await axios.get('/authenticate');

                if (response.status !== 200) {
                    this.user = null;
                    return false;
                } else {
                    this.user = await response.data;
                    return true;
                }
            } catch (err: any) {
                this.user = null;
                this.error = err.response.data;
                return false;
            } finally {
                this.isLoading = false;
                this.authCheckComplete = true;
            }
        },

        async login(email: string, password: string): Promise<boolean> {
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

        async signup(firstName: string, lastName: string, email: string, password: string): Promise<boolean> {
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

        async logout(): Promise<void> {
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
            } catch (err: any) {
                this.user = null;
            } finally {
                this.isLoading = false;
                this.authCheckComplete = false;
            }
        },

        async cookieRefresh(): Promise<void> {
            if (this.isRefreshing) return;

            this.isRefreshing = true;

            try {
                const response = await axios.post('/authenticate/refresh');
                this.authCheckComplete = true;

                this.scheduleRefresh(response.data.accessExpiryMilliseconds);
                this.lastRefreshedAt = Date.now();
                console.log("Cookies refreshed.");
            } catch (err: any) {
                if (err.response && (err.response.status === 401 || err.response.status === 403)) {
                    this.logout()
                } else {
                    // try another refresh in 10s in case network was squirrely
                    if (this.refreshTimer) {
                        clearTimeout(this.refreshTimer);
                    }

                    this.refreshTimer = setTimeout(() => {
                        this.cookieRefresh();
                    }, 10000);
                }
            } finally {
                this.isRefreshing = false;
            }
        },

        scheduleRefresh(lifespanMilliseconds: number): void {
            if (this.refreshTimer) {
                clearTimeout(this.refreshTimer);
            }

            console.log(`Refresh interval: ${lifespanMilliseconds}`);
            const refreshDelayMs = lifespanMilliseconds * 2 / 3;
            this.lifespanMilliseconds = lifespanMilliseconds;

            if (refreshDelayMs < 5000) {
                return;
            }

            this.refreshTimer = setTimeout(() => {
                this.cookieRefresh();
            }, refreshDelayMs);
        },

        realignCookieRefreshSchedule(): void {
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