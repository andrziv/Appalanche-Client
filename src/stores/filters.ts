import {defineStore} from 'pinia'
import {computed, ref} from 'vue'

export interface InterestCondition {
    operator: '>' | '<' | '>=' | '<=' | '=' | 'range'
    value: number
    value2?: number
}

export const useFilterStore = defineStore('filter', () => {
    const searchQuery = ref('')
    const experience = ref<string[]>([])
    const status = ref<string[]>([])

    const interestFilters = ref<InterestCondition[]>([])

    const appliedRange = ref<[string, string]>(['', ''])
    const responseRange = ref<[string, string]>(['', ''])

    const filters = computed(() => ({
        searchQuery: searchQuery.value,
        experience: experience.value,
        status: status.value,
        interestFilters: interestFilters.value,
        appliedRange: appliedRange.value,
        responseRange: responseRange.value
    }))

    const areFiltersEmpty = computed(() => {
        return (
            !searchQuery.value.trim() &&
            experience.value.length === 0 &&
            status.value.length === 0 &&
            interestFilters.value.length === 0 &&
            !appliedRange.value[0] &&
            !appliedRange.value[1] &&
            !responseRange.value[0] &&
            !responseRange.value[1]
        );
    });

    function clearFilters() {
        searchQuery.value = ''
        experience.value = []
        status.value = []
        interestFilters.value = []
        appliedRange.value = ['', '']
        responseRange.value = ['', '']
    }

    return {
        searchQuery,
        experience,
        status,
        interestFilters,
        appliedRange,
        responseRange,
        filters,
        clearFilters,
        areFiltersEmpty
    }
})