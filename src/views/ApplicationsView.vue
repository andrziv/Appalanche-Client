<script setup lang="ts">
import ApplicationList from '@/components/applications/ApplicationList.vue';
import ApplicationFunctionBar from '@/components/applications/ApplicationFunctionBar.vue';
import {useApplicationStore} from "@/stores/applications";
import {storeToRefs} from "pinia";

const store = useApplicationStore();
const {items} = storeToRefs(store);
store.fetchApplications();
</script>

<template>
  <div class="flex flex-col h-full">
    <ApplicationFunctionBar/>
    <div class="flex flex-col h-full overflow-hidden">
      <div class="py-10 bg-gray-100 dark:bg-neutral-800 border-b border-gray-300 dark:border-zinc-800"/>
      <div
          class="-mt-16 flex flex-col min-h-full w-full max-w-7xl overflow-y-auto mx-auto bg-white dark:bg-zinc-900 rounded-t-sm">
        <ApplicationList :applications="items"/>
        <div class="h-25 bg-gray-200 dark:bg-zinc-950 mt-auto shrink-0"/>
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>