<script setup lang="ts">
import TargetApplicationModule from "@/components/applications/TargetApplicationModule.vue";
import type {JobApplication} from "@/models/JobApplication";
import MiniApplicationTable from "@/components/applications/application_tables/MiniApplicationTable.vue";
import LogoBannerPadding from "@/components/applications/LogoBannerPadding.vue";

const props = defineProps<{
  applications: JobApplication[],
  targetApplication: JobApplication
}>();

const emit = defineEmits(["select:application", "update:targetApplication", "delete:targetApplication"]);

const pingSelect = (value: JobApplication | null) => {
  emit("select:application", value);
};

const pingUpdate = (value: JobApplication) => {
  emit("update:targetApplication", value);
};

const pingDelete = (applicationId: number) => {
  emit("delete:targetApplication", applicationId);
};
</script>

<template>
  <div class="flex flex-row w-full h-full overflow-hidden">
    <div class="flex flex-col h-full overflow-y-auto w-1/3 border-r border-neutral-100 dark:border-zinc-800">
      <MiniApplicationTable :applications="props.applications" :target-application="targetApplication" @select:application="pingSelect"/>
      <LogoBannerPadding/>
    </div>

    <TargetApplicationModule :target-application="targetApplication"
                             @select:application="pingSelect"
                             @update:target-application="pingUpdate"
                             @delete:target-application="pingDelete"
                             class="w-2/3 bg-gray-50 overflow-y-auto"/>
  </div>
</template>

<style scoped>

</style>