<script setup lang="ts">
import BaseFormComponent from "@/components/widget/form/BaseFormComponent.vue";
import {twMerge} from 'tailwind-merge';
import {computed} from "vue";

interface Props {
  label: string;
  id: string;
  options: readonly any[],
  valueKey?: string,
  required?: boolean;
  error?: string | null;
  muteErrorMessage?: boolean;
  placeholder?: string;
  inputClass?: string;
}

const props = withDefaults(defineProps<Props>(), {
  valueKey: 'code',
  required: true,
  error: null,
  placeholder: 'choose...',
  selectorClass: '',
  inputClass: '',
});

const model = defineModel<string | number>({required: true});

// https://github.com/dcastil/tailwind-merge/blob/v2.5.4/docs/recipes.md#extracting-classes-with-tailwinds-apply
const NORM_STYLES = 'w-full px-3 py-2 rounded-sm text-sm bg-zinc-200 dark:bg-zinc-900 text-gray-600 dark:text-white focus:outline-none';
const ERROR_STYLES = 'border border-red-400';

const classes = computed(() => {
  return twMerge(
      NORM_STYLES,
      props.error ? ERROR_STYLES : '',
      props.inputClass
  );
});
</script>

<template>
  <BaseFormComponent :id="props.id" :label="props.label" :error="props.error"
                     :mute-error-message="props.muteErrorMessage">
    <select :id="props.id" v-model="model" :required="props.required" :class="classes">
      <option v-if="props.placeholder" value="" disabled selected>
        {{ props.placeholder }}
      </option>
      <option v-for="option in props.options" :key="option[props.valueKey]" :value="option[props.valueKey]">
        <slot name="optionLabel" :item="option">
          {{ option.label || option }}
        </slot>
      </option>
    </select>
  </BaseFormComponent>
</template>

<style scoped>

</style>