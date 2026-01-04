<script setup lang="ts">
import type {JobApplication} from "@/models/JobApplication";

const props = defineProps<{
  applications: JobApplication[],
  targetApplication: JobApplication
}>();

const emit = defineEmits(["select:application"]);
</script>

<template>
  <table class="w-full table-auto">
    <thead class="sticky top-0 z-10 bg-white dark:bg-zinc-900">
    <tr>
      <th></th>
      <th>Position</th>
    </tr>
    </thead>
    <tbody>
    <tr v-for="jobApp in props.applications" :key="jobApp.id" @click="emit('select:application', jobApp)"
        :class="targetApplication.id === jobApp.id ? 'bg-neutral-200 dark:bg-zinc-700' : ''">
      <td class="w-20 min-w-20">
        <img :src="`/logo/name/${jobApp.company}`" :alt="`${jobApp.company} Logo`"
             class="object-contain rounded-xs"/>
      </td>
      <td class="text-left">
        <div class="font-semibold">{{ jobApp.title }}</div>
        <div class="text-sm text-gray-500 dark:text-gray-400">{{ jobApp.company }}</div>
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

thead th {
  @apply text-gray-600 text-sm font-medium;
}

tbody tr {
  @apply border-b-[0.5px] border-neutral-100 dark:border-zinc-800 hover:bg-neutral-100 hover:dark:bg-zinc-800;
}
</style>