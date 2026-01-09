import {defineStore} from 'pinia';
import axios from 'axios';
import type {JobApplication, JobApplicationForm} from "@/models/JobApplication";
import {InterestCondition} from "@/models/InterestCondition";
import {convertApplicationHateoas} from "@/utility/ResponseAdapters";
import {getUserTimezone} from "@/utility/DateUtilities";

export const useApplicationStore = defineStore('applications', {
    state: () => ({
        items: [] as JobApplication[],
        fetchedDetails: new Set<string>(),
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
            appliedAfter: null as string | null,
            appliedBefore: null as string | null,
            responseAfter: null as string | null,
            responseBefore: null as string | null
        },
        sort: 'responseDate,desc',
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
        async fetchApplication(applicationId: string, force: boolean = false) {
            const existingIndex = this.items.findIndex(app => app.applicationId === applicationId);
            const existingItem = this.items[existingIndex];

            if (!force && existingItem && this.fetchedDetails.has(applicationId)) {
                return existingItem;
            }

            try {
                const response = await axios.get(`/application/${applicationId}`);
                const fullApp = response.data;

                if (existingIndex !== -1) {
                    this.items[existingIndex] = fullApp;
                } else {
                    this.items.push(fullApp);
                }

                this.fetchedDetails.add(applicationId);

                return fullApp;
            } catch (err: any) {
                this.error = err.response.data;
            }
        },

        async fetchApplications() {
            this.isLoading = true;
            this.error = null;

            try {
                const response = await axios.get('/application', {
                    params: {
                        search: this.filters.searchQuery || undefined,
                        statusCodes: this.filters.statusCodes.length ?
                            this.filters.statusCodes.join(',') : undefined,
                        experienceLevelCodes: this.filters.experienceLevels.length ?
                            this.filters.experienceLevels.join(',') : undefined,
                        interestCriteria: this.filters.interestCriteria.length ?
                            this.filters.interestCriteria.join(',') : undefined,
                        appliedAfter: this.filters.appliedAfter || undefined,
                        appliedBefore: this.filters.appliedBefore || undefined,
                        responseAfter: this.filters.responseAfter || undefined,
                        responseBefore: this.filters.responseBefore || undefined,
                        timezone: getUserTimezone(),

                        page: this.pagination.page,
                        size: this.pagination.size,
                        sort: this.sort
                    }
                });

                const {items, meta} = convertApplicationHateoas(response.data);
                this.items = items;
                this.pagination = meta;
                this.fetchedDetails.clear();
            } catch (err: any) {
                this.error = err.response.data;
            } finally {
                this.isLoading = false;
            }
        },

        async addApplication(payload: JobApplicationForm) {
            try {
                await axios.post('/application', payload);

                await this.fetchApplications();
            } catch (err: any) {
                this.error = err.response.data;
            }
        },

        async updateApplication(applicationId: string, changes: any) {
            try {
                await axios.patch(`/application/${applicationId}`, changes);

                await this.fetchApplication(applicationId, true);
            } catch (err: any) {
                this.error = err.response.data;
            }
        },

        async deleteApplication(applicationId: string) {
            try {
                await axios.delete(`/application/${applicationId}`);

                this.items = this.items.filter(app => app.applicationId !== applicationId);
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

        updateFilters(newFilters: any) {
            this.filters = {...this.filters, ...newFilters};
            this.pagination.page = 0;
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

        setSearchQuery(search: string) {
            this.filters.searchQuery = search;
            this.setPage(0);
        },

        setStatusQuery(statusCodes: string[]) {
            this.filters.statusCodes = statusCodes;
            this.setPage(0);
        },

        setExperienceQuery(experienceCodes: string[]) {
            this.filters.experienceLevels = experienceCodes;
            this.setPage(0);
        },

        setInterestQuery(interestPredicates: InterestCondition[]) {
            this.filters.interestCriteria = interestPredicates;
            this.setPage(0);
        },

        setAppliedRange(appliedAfter: string | null, appliedBefore: string | null) {
            this.filters.appliedAfter = appliedAfter;
            this.filters.appliedBefore = appliedBefore;
            this.setPage(0);
        },

        setResponseRange(responseAfter: string | null, responseBefore: string | null) {
            this.filters.responseAfter = responseAfter;
            this.filters.responseBefore = responseBefore;
            this.setPage(0);
        },

        clearAll() {
            this.items = [];
            this.fetchedDetails.clear();
            this.clearFilters();
            this.sort = 'createdAt,desc';
            this.isLoading = false;
            this.error = null;
        }
    }
});