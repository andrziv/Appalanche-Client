<script setup lang="ts">
import IconExternal from "@/components/icons/IconExternal.vue";
import type {JobApplication} from "@/models/JobApplication";
import {truncateMiddle} from "@/utility/StringUtilities";

const props = withDefaults(defineProps<{
  applications: JobApplication[],
  isLoading?: boolean
}>(), {
  isLoading: false
});

const emit = defineEmits(["select:application"]);

const daysSince = (dateString: string) => {
  const date = new Date(dateString);
  const today = new Date();
  const diffTime = Math.abs(today.getTime() - date.getTime());
  return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
};

const formatDate = (dateString: string) =>
    new Date(dateString).toLocaleDateString('en-US', {
      weekday: 'short',
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
</script>

<template>
  <table class="w-full table-auto">
    <thead class="sticky top-0 z-10 bg-white dark:bg-zinc-900">
    <tr>
      <th></th>
      <th>Position</th>
      <th>Job ID</th>
      <th>Level</th>
      <th class="interest">Interest</th>
      <th class="status">Status</th>
      <th>Date Applied</th>
      <th>Last Response</th>
    </tr>
    </thead>
    <tbody v-if="props.isLoading" class="divide-y divide-gray-100">
    <tr v-for="n in 20" :key="n" class="animate-pulse">
      <td class="w-1 px-2 py-2 align-middle">
        <div class="h-13 w-13 bg-gray-200 dark:bg-zinc-800 rounded-xs"/>
      </td>
      <td class="px-2 py-2 align-middle space-y-2">
        <div class="h-4 bg-gray-200 dark:bg-zinc-800 rounded w-3/4"/>
        <div class="h-3 bg-gray-200 dark:bg-zinc-800 rounded w-1/2"/>
      </td>
      <td>
        <div class="h-4 bg-gray-200 dark:bg-zinc-800 rounded w-3/4"/>
      </td>
      <td>
        <div class="h-4 bg-gray-200 dark:bg-zinc-800 rounded w-3/4"/>
      </td>
      <td>
        <div class="h-4 bg-gray-200 dark:bg-zinc-800 rounded w-3/4"/>
      </td>
      <td>
        <div class="h-4 bg-gray-200 dark:bg-zinc-800 rounded w-3/4"/>
      </td>
      <td>
        <div class="h-4 bg-gray-200 dark:bg-zinc-800 rounded w-3/4"/>
      </td>
      <td>
        <div class="h-4 bg-gray-200 dark:bg-zinc-800 rounded w-3/4"/>
      </td>
    </tr>
    </tbody>
    <tbody v-else>
    <tr v-for="jobApp in props.applications" :key="jobApp.applicationId" @click="emit('select:application', jobApp)"
        class="real">
      <td class="w-20 min-w-20">
        <img :src="`/logo/name/${jobApp.company}`" :alt="`${jobApp.company} Logo`"
             class="object-contain rounded-xs"/>
      </td>
      <td class="text-left max-w-[20rem]">
        <div class="font-semibold">{{ jobApp.title }}</div>
        <div class="text-sm text-gray-500 dark:text-gray-400">{{ jobApp.company }}</div>
      </td>
      <td>
        <div class="truncate font-mono">
          <a v-if="jobApp.jobPostingLink" class="flex flex-1 space-x-2 items-center"
             :href='jobApp.jobPostingLink'
             target="_blank"
             rel="noopener noreferrer"
             @click.stop>
            <span>
              {{ truncateMiddle(jobApp.requisitionId) }}
            </span>
            <IconExternal class="h-3 w-auto shrink-0 theme-icon"/>
          </a>
          <div v-else>
            {{ truncateMiddle(jobApp.requisitionId) }}
          </div>
        </div>
      </td>
      <td>{{ jobApp.experience.label }}</td>
      <td class="interest">{{ jobApp.interest }}/10</td>
      <td class="status">
        <div class="w-full text-center text-white font-medium rounded-md px-2 py-1"
             :style="{backgroundColor: jobApp.status.colour, color: jobApp.status.textColour}">
          {{ jobApp.status.label }}
        </div>
      </td>
      <td>
        <div class="font-semibold">{{ formatDate(jobApp.appliedDate) }}</div>
        <div class="text-sm text-gray-500 dark:text-gray-400">{{ daysSince(jobApp.appliedDate) }} days ago</div>
      </td>
      <td>
        <div class="font-semibold">{{ formatDate(jobApp.responseDate) }}</div>
        <div class="text-sm text-gray-500 dark:text-gray-400">{{ daysSince(jobApp.responseDate) }} days ago</div>
      </td>
    </tr>
    </tbody>
  </table>
</template>

<style scoped>
@reference "@/style.css";

table {
  @apply min-w-full;
}

th, td {
  @apply px-4 py-3 text-left;
}

td.status,
th.status,
td.interest,
th.interest {
  @apply text-center;
}

thead th {
  @apply text-gray-600 text-sm font-medium;
}

tbody tr {
  @apply border-b-[0.5px] border-neutral-100 dark:border-zinc-800;
}

tbody tr.real {
  @apply hover:bg-neutral-100 hover:dark:bg-zinc-800;
}
</style>