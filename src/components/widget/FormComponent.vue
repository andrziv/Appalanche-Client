<script setup lang="ts">
import {computed} from 'vue'
import IconExclamation from "@/components/icons/IconExclamation.vue";

interface Props {
  label: string;
  id: string;
  error?: string;
  muteErrorMessage?: boolean;
  type?: string;
  placeholder?: string;
  autocomplete?: string;
}

const props = withDefaults(defineProps<Props>(), {
  error: null,
  type: 'text',
  placeholder: '',
  autocomplete: 'off'
});

const model = defineModel<string>({required: true});

const isMuted = computed(() => {
  if (props.muteErrorMessage !== undefined) {
    return props.muteErrorMessage;
  }

  return props.error === null;
});
</script>

<template>
  <div class="flex flex-col space-y-2">
    <label :for="props.id" class="text-sm font-semibold text-gray-900 dark:text-gray-200"
           :class="{ 'text-red-600 dark:text-red-400': props.error }">
      {{ props.label }}
    </label>
    <input :id="props.id" v-model="model" :type="props.type" :placeholder="props.placeholder"
           :autocomplete="props.autocomplete" required
           class="inputField" :class="{ 'border border-red-400': props.error }"/>

    <div v-if="props.error && !isMuted" class="flex items-center gap-1.5 text-sm text-red-600 dark:text-red-400">
      <IconExclamation class="w-4 h-auto fill-red-600 dark:fill-red-400 shrink-0"/>
      <span>{{ props.error }}</span>
    </div>
  </div>
</template>

<style scoped>
@reference "../../style.css";

.inputField {
  @apply w-full px-3 py-2 rounded-sm text-sm bg-zinc-200 dark:bg-zinc-900 text-gray-600 dark:text-white focus:outline-none focus:drop-shadow-xl;
}
</style>