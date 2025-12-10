<script setup lang="ts">
import {computed} from 'vue';
import {useFilterStore} from '@/stores/filters';
import ApplicationList from '@/components/applications/ApplicationList.vue';
import FilterBar from '@/components/applications/FilterBar.vue';
import {hardcodedApps} from '@/models/MockData';

const store = useFilterStore();

const filteredApplications = computed(() => {
  return hardcodedApps.filter(app => {
    const f = store.filters;

    const search = f.searchQuery?.toLowerCase() ?? '';
    const matchSearch =
        !search ||
        [app.employer, app.position, app.jobIdentifier].some(val =>
            val.toLowerCase().includes(search)
        );

    const matchExperience = !f.experience.length || f.experience.includes(app.experienceLevel.label);
    const matchStatus = !f.status.length || f.status.includes(app.applicationStatus.label);

    const matchInterest =
        !f.interestFilters.length ||
        f.interestFilters.some(cond => {
          if (cond.operator === 'range')
            return app.interestLevel >= cond.value && app.interestLevel <= (cond.value2 ?? cond.value);
          switch (cond.operator) {
            case '>':
              return app.interestLevel > cond.value;
            case '<':
              return app.interestLevel < cond.value;
            case '>=':
              return app.interestLevel >= cond.value;
            case '<=':
              return app.interestLevel <= cond.value;
            case '=':
              return app.interestLevel === cond.value;
            default:
              return true;
          }
        });

    const appliedStart = f.appliedRange?.[0] ? new Date(f.appliedRange[0]) : null;
    const appliedEnd = f.appliedRange?.[1] ? new Date(f.appliedRange[1]) : null;
    const matchApplied =
        (!appliedStart || new Date(app.appliedDate) >= appliedStart) &&
        (!appliedEnd || new Date(app.appliedDate) <= appliedEnd);

    const responseStart = f.responseRange?.[0] ? new Date(f.responseRange[0]) : null;
    const responseEnd = f.responseRange?.[1] ? new Date(f.responseRange[1]) : null;
    const matchResponse =
        (!responseStart || new Date(app.lastResponseDate) >= responseStart) &&
        (!responseEnd || new Date(app.lastResponseDate) <= responseEnd);

    return matchSearch && matchExperience && matchStatus && matchInterest && matchApplied && matchResponse;
  })
})
</script>

<template>
  <div class="flex flex-col h-full">
    <FilterBar/>
    <div class="flex flex-col h-full overflow-hidden">
      <div class="py-10 bg-gray-100 dark:bg-neutral-800 border-b border-gray-300 dark:border-zinc-800"/>
      <div
          class="-mt-16 flex flex-col min-h-full w-full max-w-7xl overflow-y-auto mx-auto bg-white dark:bg-zinc-900 rounded-t-sm">
        <ApplicationList :applications="filteredApplications"/>
        <div class="h-25 bg-gray-200 dark:bg-zinc-950 mt-auto shrink-0"/>
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>