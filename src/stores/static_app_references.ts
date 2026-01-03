import {defineStore} from 'pinia';
import {ExperienceLevel} from "@/models/ExperienceLevel";
import type {ApplicationStatus, ApplicationStatusMetadata} from "@/models/ApplicationStatus";
import axios from "axios";

export const useReferenceStore = defineStore('references', {
    state: () => ({
        statuses: [] as ApplicationStatus[],
        statusMetadata: [] as ApplicationStatusMetadata[],
        experiences: [] as ExperienceLevel[],
        loaded: false
    }),

    getters: {
        getStatusByCode: (state) => (code: string) => {
            return state.statuses.find(s => s.code === code);
        },

        getMinStatusByCodeFragment: (state) => (code: string) => {
            return state.statuses.find(s => s.code.startsWith(code));
        },

        getStatusMetadataByCode: (state) => (code: string) => {
            return state.statusMetadata.find(s => code.startsWith(s.codeFragment));
        },

        getExperienceByCode: (state) => (code: string) => {
            return state.experiences.find(e => e.code === code);
        }
    },

    actions: {
        async fetchAll() {
            if (this.loaded) return;

            try {
                const statusResponse = await axios.get("/application/static/statuses");
                const statusMetadataResponse = await axios.get("/application/static/metadata/statuses");
                const experienceResponse = await axios.get("/application/static/experiences");

                this.statuses = statusResponse.data;
                this.experiences = experienceResponse.data;
                this.statusMetadata = statusMetadataResponse.data;
                this.loaded = true;
            } catch (e) {
                console.error("Failed to load references", e);
            }
        }
    }
});