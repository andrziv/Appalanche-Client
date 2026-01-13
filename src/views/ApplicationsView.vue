<script setup lang="ts">
import ApplicationBrowseList from '@/components/applications/ApplicationBrowseList.vue';
import ApplicationFunctionBar from '@/components/applications/function_bar/ApplicationFunctionBar.vue';
import useApplicationStore from "@/stores/applications/applications";
import {storeToRefs} from "pinia";
import type {JobApplication} from "@/models/JobApplication";
import {isEqual} from "@/models/JobApplication";
import {ref} from "vue";
import ApplicationEditingList from "@/components/applications/ApplicationEditingList.vue";
import {useDraftStore} from "@/stores/applications/draft-application";

const serverStore = useApplicationStore();
const draftStore = useDraftStore();
const {items} = storeToRefs(serverStore);
const {currentDraft} = storeToRefs(draftStore);
serverStore.fetchApplications();

const selectedId = ref<string | null>(null);

async function selectTarget(newTarget: JobApplication | null) {
  if (!newTarget) {
    selectedId.value = null;
    draftStore.clear();
    return;
  }

  selectedId.value = newTarget.applicationId;
  await draftStore.initializeDraft(newTarget.applicationId);
}

function updateApplication(application: JobApplication) {
  if (!application || !currentDraft.value || !isEqual(currentDraft.value, application)) {
    return;
  }

  draftStore.currentDraft = application;
  draftStore.saveDraft();
}

function deleteApplication(applicationId: string) {
  serverStore.deleteApplication(applicationId);
  if (draftStore.currentDraft == null || draftStore.currentDraft.applicationId === applicationId) {
    draftStore.clear();
  }
}

async function updatePage(newPage: number) {
  const wasSelected = currentDraft.value != null;
  await serverStore.setPage(newPage);

  if (wasSelected) {
    await selectTarget(serverStore.items[0] ?? null);
  } else {
    await selectTarget(null);
  }
}
</script>

<template>
  <div class="flex flex-col h-full">
    <ApplicationFunctionBar/>
    <div class="flex flex-col h-full overflow-hidden">
      <div class="py-10 bg-gray-100 dark:bg-neutral-800 border-b border-gray-300 dark:border-zinc-800"/>
      <div class="-mt-16 min-h-full w-full max-w-7xl mx-auto bg-white dark:bg-zinc-900 rounded-t-sm">
        <ApplicationBrowseList v-if="!currentDraft" :applications="items" :page="serverStore.pagination.number"
                               :total-pages="serverStore.pagination.totalPages" @select:application="selectTarget"
                               @update:page="updatePage" class="rounded-t-sm"/>
        <ApplicationEditingList v-else :applications="items" :target-application="currentDraft"
                                :page="serverStore.pagination.number" :total-pages="serverStore.pagination.totalPages"
                                @update:page="updatePage" @select:application="selectTarget"
                                @update:target-application="updateApplication"
                                @delete:target-application="deleteApplication"
                                class="rounded-t-sm"/>
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>