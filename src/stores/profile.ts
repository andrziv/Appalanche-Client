import {defineStore} from 'pinia';
import axios from 'axios';

export interface AccountProfile {
    accountId: string;
    firstname: string;
    surname: string;
    linkedInProfile: string;
    gitHubProfile: string;
    portfolioSite: string;
}

export const useProfileStore = defineStore('profile', {
    state: () => ({
        profile: null as AccountProfile | null,
        isLoading: false,
        error: null as Record<string, string> | null
    }),

    getters: {
        fullName: (state): string | null => {
            if (state.profile == null) {
                return null;
            } else {
                return state.profile.firstname + " " + state.profile.surname;
            }
        },
    },

    actions: {
        async fetchProfile() {
            this.isLoading = true;
            try {
                const response = await axios.get('/profile');

                if (response.status !== 200) {
                    this.profile = null;
                    return false;
                } else {
                    this.profile = await response.data;
                }
            } catch (err) {
                this.profile = null;
            } finally {
                this.isLoading = false;
            }
        },

        async modify(firstName: string, lastName: string, linkedIn: string, gitHub: string, portfolio: string) {
            this.isLoading = true;
            this.error = null;

            try {
                const response = await axios.patch('/profile', {
                    firstName: firstName,
                    lastName: lastName,
                    linkedInProfile: linkedIn,
                    gitHubProfile: gitHub,
                    portfolioSite: portfolio
                });

                if (response.status !== 204) {
                    this.error = {
                        "message": "Could not Update Profile",
                    };
                    return false;
                }

                if(this.profile == null) {
                    return await this.fetchProfile();
                } else {
                    this.profile = {
                        ...this.profile,
                        accountId: this.profile.accountId,
                        firstname: firstName,
                        surname: lastName,
                        linkedInProfile: linkedIn,
                        gitHubProfile: gitHub,
                        portfolioSite: portfolio
                    };
                }

                return true;
            } catch (err: any) {
                this.error = err.response.data;
                return false;
            } finally {
                this.isLoading = false;
            }
        }
    }
})