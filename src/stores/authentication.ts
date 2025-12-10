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
        authCheckComplete: false
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
            // TODO: add smth to allow user to escape our jail
        }
    }
})