<script setup lang="ts">
import type {JobApplication} from "@/models/JobApplication";

const props = defineProps<{
  targetApplication: JobApplication,
}>();

const emit = defineEmits(["update:targetApplication"]);
</script>

<template>
  <div class="flex flex-col text-black">
    <p>{{ props.targetApplication.title }}</p>
    <p>{{ props.targetApplication.company }}</p>
    <p>{{ props.targetApplication.requisitionId }}</p>
    <p>{{ props.targetApplication.jobPostingLink }}</p>
    <p>{{ props.targetApplication.interest }}</p>
    <p>{{ props.targetApplication.status.label }}</p>
    <p>{{ props.targetApplication.experience.label }}</p>
    <p>{{ props.targetApplication.appliedDate }}</p>
    <p>{{ props.targetApplication.responseDate }}</p>
  </div>
</template>

<style scoped>

</style>