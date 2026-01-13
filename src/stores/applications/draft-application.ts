import {defineStore} from 'pinia';
import useApplicationStore from './applications';
import type {JobApplication} from '@/models/JobApplication';

export const useDraftStore = defineStore('draft', {
    state: () => ({
        currentDraft: null as JobApplication | null,
        originalId: null as string | null,
        isLoadingData: false,
        isLoadingSave: false,
        error: null as Record<string, string> | null
    }),

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
                await appStore.updateApplication(this.originalId, this.currentDraft);
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