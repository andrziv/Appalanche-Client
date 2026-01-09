<script setup lang="ts">
import ApplicationBrowseList from '@/components/applications/ApplicationBrowseList.vue';
import ApplicationFunctionBar from '@/components/applications/function_bar/ApplicationFunctionBar.vue';
import {useApplicationStore} from "@/stores/applications";
import {storeToRefs} from "pinia";
import {isEqual, JobApplication, JobApplicationForm} from "@/models/JobApplication";
import {computed, ref} from "vue";
import ApplicationEditingList from "@/components/applications/ApplicationEditingList.vue";

const store = useApplicationStore();
const {items} = storeToRefs(store);
store.fetchApplications();

const selectedId = ref<string | null>(null);

const targetApplication = computed(() => {
  if (!selectedId.value) {
    return null;
  }

  if (!store.fetchedDetails.has(selectedId.value)) {
    store.fetchApplication(selectedId.value);
  }
  return items.value.find(app => app.applicationId === selectedId.value) || null;
});

function selectTarget(newTarget: JobApplication | null) {
  selectedId.value = newTarget ? newTarget.applicationId : null;
}

function updateApplication(application: JobApplication) {
  if (!application || !targetApplication.value || !isEqual(targetApplication.value, application)) {
    return;
  }

  const updateForm: JobApplicationForm = {
    requisitionId: application.requisitionId,
    title: application.title,
    company: application.company,
    interest: application.interest,
    statusCode: application.status.code,
    experienceLevelCode: application.experience.code,
    jobPostingLink: application.jobPostingLink,
    description: application.description,
    appliedDate: application.appliedDate,
    responseDate: application.responseDate,
  };

  store.updateApplication(targetApplication.value.applicationId, updateForm);
}

function deleteApplication(applicationId: string) {
  store.deleteApplication(applicationId);
}
</script>

<template>
  <div class="flex flex-col h-full">
    <ApplicationFunctionBar/>
    <div class="flex flex-col h-full overflow-hidden">
      <div class="py-10 bg-gray-100 dark:bg-neutral-800 border-b border-gray-300 dark:border-zinc-800"/>
      <div class="-mt-16 min-h-full w-full max-w-7xl mx-auto bg-white dark:bg-zinc-900 rounded-t-sm">
        <ApplicationBrowseList v-if="!targetApplication" :applications="items" @select:application="selectTarget"
                               class="rounded-t-sm"/>
        <ApplicationEditingList v-else :applications="items" :target-application="targetApplication"
                                @select:application="selectTarget"
                                @update:target-application="updateApplication"
                                @delete:target-application="deleteApplication"
                                class="rounded-t-sm"/>
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>