<script setup lang="ts">
import type {JobApplication} from "@/models/JobApplication";
import ApplicationTable from "@/components/applications/application_tables/ApplicationTable.vue";
import LogoBannerPadding from "@/components/applications/LogoBannerPadding.vue";
import PaginationControl from "@/components/widget/PaginationControl.vue";

const props = defineProps<{
  applications: JobApplication[],
  page: number,
  totalPages: number
}>();

const emit = defineEmits(["select:application", "update:page"]);

const handlePageChange = (newPage: number) => {
  emit("update:page", newPage);
};
</script>

<template>
  <div class="flex flex-col h-full overflow-y-auto">
    <ApplicationTable :applications="props.applications"
                      @select:application="newTarget => emit('select:application', newTarget)"/>
    <div class="p-4 bg-gray-100 dark:bg-zinc-800/20 mt-auto">
      <PaginationControl :model-value="props.page" :total-pages="props.totalPages"
                         @update:modelValue="handlePageChange"/>
    </div>
    <LogoBannerPadding/>
  </div>
</template>

<style scoped>

</style>