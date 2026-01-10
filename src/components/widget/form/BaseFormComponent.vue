<script setup lang="ts">
import {computed} from 'vue';
import IconExclamation from "@/components/icons/simple-characters/IconExclamation.vue";

interface Props {
  label: string;
  id: string;
  error?: string | null;
  muteErrorMessage?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  error: null,
});

const isMuted = computed(() => {
  if (props.muteErrorMessage !== undefined) {
    return props.muteErrorMessage;
  }

  return props.error === null;
});
</script>

<template>
  <div class="flex flex-col space-y-2">
    <label v-if="props.label" :for="props.id" class="text-sm font-semibold text-gray-900 dark:text-gray-200"
           :class="{ 'text-red-600 dark:text-red-400': props.error }">
      {{ props.label }}
    </label>

    <slot/>

    <div v-if="props.error && !isMuted" class="flex items-center gap-1.5 text-sm text-red-600 dark:text-red-400">
      <IconExclamation class="w-4 h-auto fill-red-600 dark:fill-red-400 shrink-0"/>
      <span>{{ props.error }}</span>
    </div>
  </div>
</template>

<style scoped>

</style>