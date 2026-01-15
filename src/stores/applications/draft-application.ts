import {defineStore} from 'pinia';
import useApplicationStore from './applications';
import type {JobApplication, JobApplicationForm} from '@/models/JobApplication';

export const useDraftStore = defineStore('draft', {
    state: () => ({
        currentDraft: null as JobApplication | null,
        originalId: null as string | null,
        isLoadingData: false,
        isLoadingSave: false,
        error: null as Record<string, string> | null
    }),

    getters: {
        convertToForm: (state): JobApplicationForm | null => {
            if (!state.currentDraft || !state.originalId) {
                return null;
            }

            return {
                requisitionId: state.currentDraft.requisitionId,
                title: state.currentDraft.title,
                company: state.currentDraft.company,
                interest: state.currentDraft.interest,
                statusCode: state.currentDraft.status.code,
                experienceLevelCode: state.currentDraft.experience.code,
                jobPostingLink: state.currentDraft.jobPostingLink,
                description: state.currentDraft.description,
                appliedDate: state.currentDraft.appliedDate,
                responseDate: state.currentDraft.responseDate,
            }
        }
    },

    actions: {
        async initializeDraft(applicationId: string) {
            const appStore = useApplicationStore();
            let sourceData = appStore.items.find(application => application.applicationId === applicationId);

            if (sourceData) {
                this.currentDraft = JSON.parse(JSON.stringify(sourceData));
                this.originalId = applicationId;
            }

            if (!sourceData || !sourceData.description) {
                this.isLoadingData = true;

                try {
                    await appStore.fetchApplication(applicationId);
                    const freshData = appStore.items.find(application => application.applicationId === applicationId);

                    if (freshData) {
                        this.currentDraft = JSON.parse(JSON.stringify(freshData));
                        this.originalId = applicationId;
                    }
                } catch (err: any) {
                    this.error = err.response.data;
                } finally {
                    this.isLoadingData = false;
                }
            }
        },

        async saveDraft() {
            if (!this.currentDraft || !this.originalId) {
                return;
            }

            this.isLoadingSave = true;
            try {
                const appStore = useApplicationStore();
                await appStore.updateApplication(this.originalId, this.convertToForm);
            } catch (err: any) {
                this.error = err.response.data;
            } finally {
                this.isLoadingSave = false;
            }
        },

        clear() {
            this.currentDraft = null;
            this.originalId = null;
            this.isLoadingData = false;
            this.isLoadingSave = false;
            this.error = null;
        }
    }
});