<script setup lang="ts">
import {storeToRefs} from 'pinia'
import {ExperienceLevel} from "@/models/ExperienceLevel";
import {SIMPLE_FE_APPLICATION_STATUSES} from "@/models/ApplicationStatus";
import FilterContainer from "@/components/applications/FilterContainer.vue";
import InterestFilterMenu from "@/components/applications/InterestFilterMenu.vue";
import IconXMark from "@/components/icons/IconXMark.vue";
import AddApplicationButton from "@/components/applications/add_position_buttons/AddApplicationButton.vue";
import ImportCSVButton from "@/components/applications/add_position_buttons/ImportCSVButton.vue";
import {useApplicationStore} from "@/stores/applications";
import SimpleSearch from "@/components/widget/SimpleSearch.vue";
import SimpleCheckboxList from "@/components/widget/SimpleCheckboxList.vue";
import SimpleDateRange from "@/components/widget/SimpleDateRange.vue";

const store = useApplicationStore();
const {filters} = storeToRefs(store);

let timeout: ReturnType<typeof setTimeout> | null = null;

const handleSearchChange = (newText: string) => {
  if (timeout) {
    clearTimeout(timeout);
  }

  timeout = setTimeout(() => {
    store.setSearchQuery(newText);
  }, 500);
};

const handleExperienceChange = (experienceLevelCodes: string[]) => {
  if (timeout) {
    clearTimeout(timeout);
  }

  timeout = setTimeout(() => {
    store.setExperienceQuery(experienceLevelCodes);
  }, 500);
}

const handleStatusChange = (statusCodes: string[]) => {
  if (timeout) {
    clearTimeout(timeout);
  }

  timeout = setTimeout(() => {
    store.setStatusQuery(statusCodes);
  }, 500);
}

const handleAppliedRangeChange = (after: string | null, before: string | null) => {
  if (timeout) {
    clearTimeout(timeout);
  }

  timeout = setTimeout(() => {
    store.setAppliedRange(after, before);
  }, 500);
}

const handleResponseRangeChange = (after: string | null, before: string | null) => {
  if (timeout) {
    clearTimeout(timeout);
  }

  timeout = setTimeout(() => {
    store.setResponseRange(after, before);
  }, 500);
}
</script>

<template>
  <div class="w-full z-20 bg-gray-100 dark:bg-neutral-800">
    <div class="max-w-7xl mx-auto py-4 space-y-4">
      <div class="flex justify-between items-center px-8">
        <div class="flex w-1/3 items-center rounded-sm text-sm text-white focus-within:drop-shadow-xl"
             :class="filters.searchQuery.length > 0 ? 'active-search-background' : 'filter-search-background'">
          <SimpleSearch :model-value="filters.searchQuery"
                        @update:model-value="newSearch => handleSearchChange(newSearch)"
                        placeholder="Search company, position, or ID..."/>
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
            <SimpleCheckboxList :model-value="filters.experienceLevels"
                                @update:model-value="newList => handleExperienceChange(newList)"
                                :options="ExperienceLevel.values()" value-key="code" id-prefix="exp">
              <template #label="{ item }">
                <div class="flex flex-col">
                  <span class="font-medium text-sm text-gray-800 dark:text-gray-200">
                    {{ item.label + " (" + item.description + ')' }}
                  </span>
                </div>
              </template>
            </SimpleCheckboxList>
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
            <SimpleCheckboxList :model-value="filters.statusCodes"
                                @update:model-value="newList => handleStatusChange(newList)"
                                :options="SIMPLE_FE_APPLICATION_STATUSES" value-key="code" id-prefix="stat">
              <template #label="{ item }">
                <div class="flex flex-col">
                  <span class="font-medium text-sm text-gray-800 dark:text-gray-200">
                    {{ item.label }}
                  </span>
                </div>
              </template>
            </SimpleCheckboxList>
          </template>
        </FilterContainer>

        <FilterContainer label="Applied Range"
                         title="Application Date Range"
                         description="Filter jobs between dates for application times"
                         :filterActive="!!(filters.appliedBefore || filters.appliedAfter)">
          <template #dropdown-menu>
            <SimpleDateRange :start="filters.appliedAfter" :end="filters.appliedBefore"
                             @update:start="startChange => handleAppliedRangeChange(startChange, filters.appliedBefore)"
                             @update:end="endChange => handleAppliedRangeChange(filters.appliedAfter, endChange)"/>
          </template>
        </FilterContainer>

        <FilterContainer label="Response Range"
                         title="Response Date Range"
                         description="Filter jobs between dates for last response times"
                         :filterActive="!!(filters.responseBefore || filters.responseAfter)">
          <template #dropdown-menu>
            <SimpleDateRange :start="filters.responseAfter" :end="filters.responseBefore"
                             @update:start="startChange => handleResponseRangeChange(startChange, filters.responseBefore)"
                             @update:end="endChange => handleResponseRangeChange(filters.responseAfter, endChange)"/>
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