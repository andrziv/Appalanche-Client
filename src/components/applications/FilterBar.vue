<script setup lang="ts">
import {storeToRefs} from 'pinia'
import {ExperienceLevel} from "@/models/ExperienceLevel";
import {APPLICATION_STATUSES} from "@/models/ApplicationStatus";
import FilterContainer from "@/components/applications/FilterContainer.vue";
import InterestFilterMenu from "@/components/applications/InterestFilterMenu.vue";
import IconXMark from "@/components/icons/IconXMark.vue";
import IconSearch from "@/components/icons/IconSearch.vue";
import AddApplicationButton from "@/components/applications/add_position_buttons/AddApplicationButton.vue";
import ImportCSVButton from "@/components/applications/add_position_buttons/ImportCSVButton.vue";
import {useApplicationStore} from "@/stores/applications";

const store = useApplicationStore();
const {filters} = storeToRefs(store);
</script>

<template>
  <div class="w-full z-20 bg-gray-100 dark:bg-neutral-800">
    <div class="max-w-7xl mx-auto py-4 space-y-4">
      <div class="flex justify-between items-center px-8">
        <div class="flex w-1/3 items-center rounded-sm text-sm text-white focus-within:drop-shadow-xl"
             :class="filters.searchQuery.length > 0 ? 'active-search-background' : 'filter-search-background'">
          <IconSearch class="h-6 w-auto px-2 invert dark:invert-70"/>
          <input v-model="filters.searchQuery"
                 type="text"
                 placeholder="Search company, position, or ID..."
                 class="w-full p-2 focus:outline-none"/>
        </div>

        <div class="flex space-x-3 text-center text-sm text-gray-200 font-semibold">
          <AddApplicationButton/>
          <ImportCSVButton/>
        </div>
      </div>

      <!-- button filters -->
      <div class="flex items-center space-x-4 px-8 flex-wrap">
        <FilterContainer label="Experience"
                         title="Experience"
                         description="Filter jobs by experience desired for position"
                         :filterActive="filters.experienceLevels.length > 0">
          <template #dropdown-menu>
            <div class="flex flex-col space-y-2 pt-1">
              <div v-for="level in ExperienceLevel.values()" :key="level.label" class="flex items-center space-x-2">
                <input type="checkbox" :id="`exp-${level.label}`" :value="level.label"
                       v-model="filters.experienceLevels"
                       class="appearance-none h-4 w-4 bg-gray-200 hover:bg-gray-300 dark:bg-zinc-800 dark:hover:bg-zinc-700 rounded-sm
                     checked:bg-green-600 hover:checked:bg-green-800 dark:hover:checked:bg-green-400 cursor-pointer transition"/>
                <label :for="`exp-${level.label}`" class="flex flex-col cursor-pointer">
                <span class="font-medium text-sm text-gray-800 dark:text-gray-200">
                  {{ level.label + " (" + level.description + ')' }}
                </span>
                </label>
              </div>
            </div>
          </template>
        </FilterContainer>

        <FilterContainer label="Interest"
                         title="Personal Interest"
                         description="Filter jobs by your recorded interest in the position"
                         :filterActive="filters.interestCriteria.length > 0">
          <template #dropdown-menu>
            <InterestFilterMenu/>
          </template>
        </FilterContainer>

        <FilterContainer label="Status"
                         title="Application Status"
                         description="Filter jobs by currently recorded application status"
                         :filterActive="filters.statusCodes.length > 0">
          <template #dropdown-menu>
            <div class="flex flex-col space-y-2 pt-1">
              <div v-for="state in APPLICATION_STATUSES" :key="state" class="flex items-center space-x-2">
                <input type="checkbox" :id="`exp-${state}`" :value="state" v-model="filters.statusCodes"
                       class="appearance-none h-4 w-4 bg-gray-200 hover:bg-gray-300 dark:bg-zinc-800 dark:hover:bg-zinc-700 rounded-sm
                     checked:bg-green-600 hover:checked:bg-green-800 dark:hover:checked:bg-green-400 cursor-pointer transition"/>
                <label :for="`exp-${state}`" class="flex flex-col cursor-pointer">
                  <span class="font-medium text-sm text-gray-800 dark:text-gray-200">{{ state }}</span>
                </label>
              </div>
            </div>
          </template>
        </FilterContainer>

        <FilterContainer label="Applied Range"
                         title="Application Date Range"
                         description="Filter jobs between dates for application times"
                         :filterActive="!!(filters.appliedBefore || filters.appliedAfter)">
          <template #dropdown-menu>
            <div class="flex items-center space-x-1 text-sm pt-1">
              <input type="date" v-model="filters.appliedBefore"
                     class="rounded-sm px-2 py-1 bg-gray-200 dark:bg-zinc-800 dark:text-gray-100"/>
              <span> to </span>
              <input type="date" v-model="filters.appliedAfter"
                     class="rounded-sm px-2 py-1 bg-gray-200 dark:bg-zinc-800 dark:text-gray-100"/>
            </div>
          </template>
        </FilterContainer>

        <FilterContainer label="Response Range"
                         title="Response Date Range"
                         description="Filter jobs between dates for last response times"
                         :filterActive="!!(filters.responseBefore || filters.responseAfter)">
          <template #dropdown-menu>
            <div class="flex items-center space-x-1 text-sm pt-1">
              <input type="date" v-model="filters.responseBefore"
                     class="rounded-sm px-2 py-1 bg-gray-200 dark:bg-zinc-800 dark:text-gray-100"/>
              <span> to </span>
              <input type="date" v-model="filters.responseAfter"
                     class="rounded-sm px-2 py-1 bg-gray-200 dark:bg-zinc-800 dark:text-gray-100"/>
            </div>
          </template>
        </FilterContainer>

        <a v-if="!store.areFiltersEmpty" @click="store.clearFilters"
           class="flex items-center space-x-2 px-3 py-2 text-sm bg-gray-600 dark:bg-zinc-900 rounded-sm cursor-pointer hover:bg-gray-500 dark:hover:bg-zinc-800 transition">
          <IconXMark class="h-4 w-auto invert-80"/>
          <span class="text-sm font-semibold text-gray-100 dark:text-gray-300">Clear All</span>
        </a>
      </div>
    </div>
  </div>
</template>

<style scoped>
@reference "../../style.css";

.filter-search-background {
  @apply bg-[#C4615B] dark:bg-zinc-900;
}

.active-search-background {
  @apply bg-[#CB3B3B] dark:bg-[#9B2C2C];
}
</style>