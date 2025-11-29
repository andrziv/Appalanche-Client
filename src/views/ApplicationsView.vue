<script setup lang="ts">
import {computed} from 'vue'
import {useFilterStore} from '@/stores/useFilterStore'
import ApplicationList from '@/components/applications/ApplicationList.vue'
import FilterBar from '@/components/applications/FilterBar.vue'
import {hardcodedApps} from '@/models/MockData'

const store = useFilterStore()

const filteredApplications = computed(() => {
  return hardcodedApps.filter(app => {
    const f = store.filters

    const search = f.searchQuery?.toLowerCase() ?? ''
    const matchSearch =
        !search ||
        [app.employerName, app.positionName, app.jobId].some(val =>
            val.toLowerCase().includes(search)
        )

    const matchExperience = !f.experience.length || f.experience.includes(app.experienceLevel.label)
    const matchStatus = !f.status.length || f.status.includes(app.status.label)

    const matchInterest =
        !f.interestFilters.length ||
        f.interestFilters.some(cond => {
          if (cond.operator === 'range')
            return app.interest >= cond.value && app.interest <= (cond.value2 ?? cond.value)
          switch (cond.operator) {
            case '>':
              return app.interest > cond.value
            case '<':
              return app.interest < cond.value
            case '>=':
              return app.interest >= cond.value
            case '<=':
              return app.interest <= cond.value
            case '=':
              return app.interest === cond.value
            default:
              return true
          }
        })

    const appliedStart = f.appliedRange?.[0] ? new Date(f.appliedRange[0]) : null
    const appliedEnd = f.appliedRange?.[1] ? new Date(f.appliedRange[1]) : null
    const matchApplied =
        (!appliedStart || new Date(app.dateApplied) >= appliedStart) &&
        (!appliedEnd || new Date(app.dateApplied) <= appliedEnd)

    const responseStart = f.responseRange?.[0] ? new Date(f.responseRange[0]) : null
    const responseEnd = f.responseRange?.[1] ? new Date(f.responseRange[1]) : null
    const matchResponse =
        (!responseStart || new Date(app.lastResponse) >= responseStart) &&
        (!responseEnd || new Date(app.lastResponse) <= responseEnd)

    return matchSearch && matchExperience && matchStatus && matchInterest && matchApplied && matchResponse
  })
})
</script>

<template>
  <div class="flex flex-col h-full w-full">
    <FilterBar/>
    <div class="flex flex-col overflow-hidden">
      <div class="py-10 bg-gray-100 dark:bg-neutral-800 border-b border-gray-300 dark:border-zinc-800"/>
      <div class="-mt-16 flex flex-col w-full max-w-7xl h-full overflow-hidden overflow-y-auto mx-auto bg-red-400 rounded-t-sm">
        <ApplicationList :applications="filteredApplications"/>
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>