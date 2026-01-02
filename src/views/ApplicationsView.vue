<script setup lang="ts">
import ApplicationBrowseList from '@/components/applications/ApplicationBrowseList.vue';
import ApplicationFunctionBar from '@/components/applications/function_bar/ApplicationFunctionBar.vue';
import {useApplicationStore} from "@/stores/applications";
import {storeToRefs} from "pinia";
import {JobApplication} from "@/models/JobApplication";
import {ref} from "vue";
import ApplicationEditingList from "@/components/applications/ApplicationEditingList.vue";

const store = useApplicationStore();
const {items} = storeToRefs(store);
store.fetchApplications();

const targetApplication = ref<JobApplication | null>(null);

function updateApplication(application: JobApplication) {
  store.updateApplication(application.id, application);
}
</script>

<template>
  <div class="flex flex-col h-full">
    <ApplicationFunctionBar/>
    <div class="flex flex-col h-full overflow-hidden">
      <div class="py-10 bg-gray-100 dark:bg-neutral-800 border-b border-gray-300 dark:border-zinc-800"/>
      <div class="-mt-16 min-h-full w-full max-w-7xl mx-auto bg-white dark:bg-zinc-900 rounded-t-sm">
        <ApplicationBrowseList v-if="!targetApplication" :applications="items" @select:application="newTarget => targetApplication = newTarget"/>
        <ApplicationEditingList v-else :applications="items" :target-application="targetApplication"
                                @select:application="newTarget => targetApplication = newTarget"
                                @update:target-application="updatedApplication => updateApplication(updatedApplication)"/>
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>