<script setup lang="ts">
import type {JobApplication} from "@/models/JobApplication";

defineProps<{ applications: JobApplication[] }>()

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
    <thead class="sticky top-0 z-10 bg-white">
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
    <tr v-for="jobApp in applications" :key="jobApp.id">
      <td class="text-left">
        <div class="font-semibold">{{ jobApp.positionName }}</div>
        <div class="text-sm text-gray-500 dark:text-gray-400">{{ jobApp.employerName }}</div>
      </td>
      <td><a :href="jobApp.link" target="_blank">{{ jobApp.jobId }}</a></td>
      <td>{{ jobApp.level }}</td>
      <td class="interest">{{ jobApp.interest }}/10</td>
      <td class="status">
        <div class="w-full text-center text-white font-medium rounded-md px-2 py-1"
             :style="{ backgroundColor: jobApp.status.colour }">
          {{ jobApp.status.toString() }}
        </div>
      </td>
      <td>
        <div class="font-semibold">{{ formatDate(jobApp.dateApplied) }}</div>
        <div class="text-sm text-gray-300">{{ daysSince(jobApp.dateApplied) }} days ago</div>
      </td>
      <td>
        <div class="font-semibold">{{ formatDate(jobApp.lastResponse) }}</div>
        <div class="text-sm text-gray-300">{{ daysSince(jobApp.lastResponse) }} days ago</div>
      </td>
    </tr>
    </tbody>
  </table>
</template>

<style scoped>
@reference "../../style.css"
table {
  @apply min-w-full border-separate border-spacing-y-3;
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
  @apply shadow-sm hover:shadow-md transition-shadow;
}
</style>