<script setup lang="ts">
import TargetApplicationModule from "@/components/applications/TargetApplicationModule.vue";
import type {JobApplication} from "@/models/JobApplication";
import MiniApplicationTable from "@/components/applications/application_tables/MiniApplicationTable.vue";

const props = defineProps<{
  applications: JobApplication[],
  targetApplication: JobApplication,
}>();

const emit = defineEmits(["select:application", "update:targetApplication"]);

const pingUpdate = (value: JobApplication) => {
  emit("update:targetApplication", value);
};
</script>

<template>
  <div class="flex flex-row w-full h-full overflow-hidden">
    <div class="flex flex-col h-full overflow-y-auto w-1/3">
      <MiniApplicationTable :applications="props.applications"
                            @select:application="newTarget => emit('select:application', newTarget)"/>
      <div class="h-25 bg-gray-200 dark:bg-zinc-950 mt-auto shrink-0"/>
    </div>

    <TargetApplicationModule :target-application="targetApplication"
                             @update:target-application="newValue => pingUpdate(newValue)"
                             class="w-2/3 bg-gray-50 p-4 overflow-y-auto"/>
  </div>
</template>

<style scoped>

</style>