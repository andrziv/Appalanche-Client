<script setup lang="ts">
import {storeToRefs} from 'pinia'
import {useFilterStore} from '@/stores/useFilterStore'
import {ExperienceLevel} from "@/models/ExperienceLevel";
import {ApplicationState} from "@/models/ApplicationState";
import FilterContainer from "@/components/applications/FilterContainer.vue";
import InterestFilterMenu from "@/components/applications/InterestFilterMenu.vue";
import IconXMark from "@/components/icons/IconXMark.vue";

const store = useFilterStore()
const {searchQuery, experience, status, appliedRange, responseRange} = storeToRefs(store)
</script>

<template>
  <div class="w-full bg-gray-100 dark:bg-neutral-800 border-b border-gray-300 dark:border-zinc-800">
    <div class="flex justify-between items-center px-8 py-3">
      <input v-model="searchQuery"
             type="text"
             placeholder="Search company, position, or ID..."
             class="w-1/3 px-3 py-2 border border-gray-300 dark:border-zinc-700 rounded-md text-sm dark:bg-zinc-800 dark:text-gray-100"/>

      <div class="flex space-x-3">
        <a class="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
          Add Position
        </a>
        <a class="px-4 py-2 bg-gray-200 dark:bg-zinc-800 dark:text-gray-200 rounded-md hover:bg-gray-300 dark:hover:bg-zinc-700">
          Import CSV
        </a>
      </div>
    </div>

    <!-- button filters -->
    <div class="flex items-center space-x-4 px-8 p-2 flex-wrap">
      <FilterContainer label="Experience"
                       title="Experience"
                       description="Filter jobs by experience desired for position"
                       :filterActive="store.experience.length > 0">
        <template #dropdown-menu>
          <div class="flex flex-col space-y-2 pt-1">
            <div v-for="level in ExperienceLevel.values()" :key="level.label" class="flex items-center space-x-2">
              <input type="checkbox" :id="`exp-${level.label}`" :value="level.label" v-model="experience"
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
                       :filterActive="store.interestFilters.length > 0">
        <template #dropdown-menu>
          <InterestFilterMenu/>
        </template>
      </FilterContainer>

      <FilterContainer label="Status"
                       title="Application Status"
                       description="Filter jobs by currently recorded application status"
                       :filterActive="store.status.length > 0">
        <template #dropdown-menu>
          <div class="flex flex-col space-y-2 pt-1">
            <div v-for="state in ApplicationState.values()" :key="state.label" class="flex items-center space-x-2">
              <input type="checkbox" :id="`exp-${state.label}`" :value="state.label" v-model="status"
                     class="appearance-none h-4 w-4 bg-gray-200 hover:bg-gray-300 dark:bg-zinc-800 dark:hover:bg-zinc-700 rounded-sm
                     checked:bg-green-600 hover:checked:bg-green-800 dark:hover:checked:bg-green-400 cursor-pointer transition"/>
              <label :for="`exp-${state.label}`" class="flex flex-col cursor-pointer">
                <span class="font-medium text-sm text-gray-800 dark:text-gray-200">{{ state.label }}</span>
              </label>
            </div>
          </div>
        </template>
      </FilterContainer>

      <FilterContainer label="Applied Range"
                       title="Application Date Range"
                       description="Filter jobs between dates for application times"
                       :filterActive="!!(store.appliedRange[0] || store.appliedRange[1])">
        <template #dropdown-menu>
          <div class="flex items-center space-x-1 text-sm pt-1">
            <input type="date" v-model="appliedRange[0]"
                   class="rounded-sm px-2 py-1 bg-gray-200 dark:bg-zinc-800 dark:text-gray-100"/>
            <span> to </span>
            <input type="date" v-model="appliedRange[1]"
                   class="rounded-sm px-2 py-1 bg-gray-200 dark:bg-zinc-800 dark:text-gray-100"/>
          </div>
        </template>
      </FilterContainer>

      <FilterContainer label="Response Range"
                       title="Response Date Range"
                       description="Filter jobs between dates for last response times"
                       :filterActive="!!(store.responseRange[0] || store.responseRange[1])">
        <template #dropdown-menu>
          <div class="flex items-center space-x-1 text-sm pt-1">
            <input type="date" v-model="responseRange[0]"
                   class="rounded-sm px-2 py-1 bg-gray-200 dark:bg-zinc-800 dark:text-gray-100"/>
            <span> to </span>
            <input type="date" v-model="responseRange[1]"
                   class="rounded-sm px-2 py-1 bg-gray-200 dark:bg-zinc-800 dark:text-gray-100"/>
          </div>
        </template>
      </FilterContainer>

      <a v-if="!store.areFiltersEmpty" @click="store.clearFilters"
         class="flex items-center space-x-2 px-3 py-2 text-sm bg-gray-600 dark:bg-zinc-900 rounded-sm cursor-pointer hover:bg-gray-500 dark:hover:bg-zinc-800 transition">
        <IconXMark class="h-4 w-auto invert-80 z-0"/>
        <span class="text-sm font-semibold text-gray-100 dark:text-gray-300">Clear All</span>
      </a>
    </div>
  </div>
</template>

<style scoped>

</style>