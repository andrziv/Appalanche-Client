<script setup lang="ts">
import {JobApplication} from "@/models/JobApplication";
import ApplicationTable from "@/components/applications/application_tables/ApplicationTable.vue";
import LogoBannerPadding from "@/components/applications/LogoBannerPadding.vue";

const props = defineProps<{
  applications: JobApplication[]
}>();

const emit = defineEmits(["select:application"]);
</script>

<template>
  <div class="flex flex-col h-full overflow-y-auto">
    <ApplicationTable :applications="props.applications"
                      @select:application="newTarget => emit('select:application', newTarget)"/>
    <LogoBannerPadding/>
  </div>
</template>

<style scoped>

</style>