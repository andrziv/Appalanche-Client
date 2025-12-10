<script setup lang="ts">
import type {JobApplication} from "@/models/JobApplication";

defineProps<{ applications: JobApplication[] }>();

const daysSince = (date: Date) => {
  const today = new Date();
  const diffTime = Math.abs(today.getTime() - date.getTime());
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  return diffDays;
};

const formatDate = (date: Date) =>
    new Date(date).toLocaleDateString('en-US', {
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
      <th>Position</th>
      <th>Job ID</th>
      <th>Level</th>
      <th class="interest">Interest</th>
      <th class="status">Status</th>
      <th>Date Applied</th>
      <th>Last Response</th>
    </tr>
    </thead>
    <tbody>
    <tr v-for="jobApp in applications" :key="jobApp.idValue">
      <td class="text-left">
        <div class="font-semibold">{{ jobApp.position }}</div>
        <div class="text-sm text-gray-500 dark:text-gray-400">{{ jobApp.employer }}</div>
      </td>
      <td><a :href="jobApp.jobLink" target="_blank">{{ jobApp.jobIdentifier }}</a></td>
      <td>{{ jobApp.experienceLevel }}</td>
      <td class="interest">{{ jobApp.interestLevel }}/10</td>
      <td class="status">
        <div class="w-full text-center text-white font-medium rounded-md px-2 py-1"
             :style="{ backgroundColor: jobApp.applicationStatus.colour }">
          {{ jobApp.applicationStatus.toString() }}
        </div>
      </td>
      <td>
        <div class="font-semibold">{{ formatDate(jobApp.appliedDate) }}</div>
        <div class="text-sm text-gray-500 dark:text-gray-400">{{ daysSince(jobApp.appliedDate) }} days ago</div>
      </td>
      <td>
        <div class="font-semibold">{{ formatDate(jobApp.lastResponseDate) }}</div>
        <div class="text-sm text-gray-500 dark:text-gray-400">{{ daysSince(jobApp.lastResponseDate) }} days ago</div>
      </td>
    </tr>
    </tbody>
  </table>
</template>

<style scoped>
@reference "../../style.css";

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
  @apply border-b-[0.5px] border-neutral-100 dark:border-zinc-800 hover:bg-neutral-100 hover:dark:bg-zinc-800;
}
</style>