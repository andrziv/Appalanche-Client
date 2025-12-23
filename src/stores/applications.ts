import {defineStore} from 'pinia';
import axios from 'axios';
import type {JobApplication} from "@/models/JobApplication";
import {InterestCondition} from "@/models/InterestCondition";

export const useApplicationStore = defineStore('applications', {
    state: () => ({
        items: [] as JobApplication[],
        pagination: {
            page: 0,
            size: 20,
            totalElements: 0,
            totalPages: 0,
        },
        filters: {
            searchQuery: '',
            statusCodes: [] as string[],
            experienceLevels: [] as string[],
            interestCriteria: [] as InterestCondition[],
            appliedAfter: null as Date | null,
            appliedBefore: null as Date | null,
            responseAfter: null as Date | null,
            responseBefore: null as Date | null
        },
        sort: 'createdAt,desc',
        isLoading: false,
        error: null as Record<string, string> | null
    }),

    getters: {
        areFiltersEmpty: (state): boolean => {
            const filters = state.filters;
            return !filters.searchQuery &&
                filters.statusCodes?.length === 0 &&
                filters.experienceLevels?.length === 0 &&
                filters.interestCriteria?.length === 0 &&
                !filters.appliedAfter &&
                !filters.appliedBefore &&
                !filters.responseAfter &&
                !filters.responseBefore;
        }
    },

    // TODO: should creating, updating, or deleting create another network call to fetch the latest?
    //  or should we try to make the frontend "smart"?
    actions: {
        async fetchApplications() {
            this.isLoading = true;
            this.error = null;

            try {
                const response = await axios.get('/application', {
                    params: {
                        page: this.pagination.page,
                        size: this.pagination.size,
                        sort: this.sort,

                        search: this.filters.searchQuery || undefined,
                        appliedAfter: this.filters.appliedAfter || undefined,
                        appliedBefore: this.filters.appliedBefore || undefined,
                        statusCodes: this.filters.statusCodes.length ?
                            this.filters.statusCodes.join(',') : undefined,
                        interestCriteria: this.filters.interestCriteria.length ?
                            this.filters.interestCriteria.join(',') : undefined,
                        experienceLevels: this.filters.experienceLevels.length ?
                            this.filters.experienceLevels.join(',') : undefined
                    }
                });

                this.items = response.data.content;
                this.pagination.totalElements = response.data.totalElements;
                this.pagination.totalPages = response.data.totalPages;
            } catch (err: any) {
                this.error = err.response.data;
            } finally {
                this.isLoading = false;
            }
        },

        async addApplication(payload: JobApplication) {
            try {
                await axios.post('/applications', payload);

                await this.fetchApplications();
            } catch (err: any) {
                this.error = err.response.data;
            }
        },

        async updateApplication(id: number, changes: any) {
            try {
                await axios.patch(`/applications/${id}`, changes);

                const index = this.items.findIndex(app => app.id === id);
                if (index !== -1) {
                    this.items[index] = {...this.items[index], ...changes};
                }
            } catch (err: any) {
                this.error = err.response.data;
            }
        },

        async deleteApplication(id: number) {
            try {
                await axios.delete(`/applications/${id}`);

                this.items = this.items.filter(app => app.id !== id);
                this.pagination.totalElements--;

                if (this.items.length === 0 && this.pagination.page > 0) {
                    this.pagination.page--;
                    await this.fetchApplications();
                }
            } catch (err: any) {
                this.error = err.response.data;
            }
        },

        setPage(pageNumber: number) {
            this.pagination.page = pageNumber;
            this.fetchApplications();
        },

        clearFilters() {
            const filters = {
                searchQuery: '',
                statusCodes: [],
                experienceLevels: [],
                interestCriteria: [],
                appliedAfter: null,
                appliedBefore: null,
                responseAfter: null,
                responseBefore: null
            }
            this.updateFilters(filters);
        },

        updateFilters(newFilters: any) {
            this.filters = {...this.filters, ...newFilters};
            this.pagination.page = 0;
            this.fetchApplications();
        }
    }
});