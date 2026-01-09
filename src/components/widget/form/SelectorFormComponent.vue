<script setup lang="ts">
import BaseFormComponent from "@/components/widget/form/BaseFormComponent.vue";
import {twMerge} from 'tailwind-merge';
import {computed} from "vue";
import type {StyleValue} from "vue";

interface Props {
  label: string;
  id: string;
  options: readonly any[],
  valueKey?: string,
  useFullValue?: boolean,
  required?: boolean;
  error?: string | null;
  muteErrorMessage?: boolean;
  placeholder?: string;
  inputClass?: string;
  inputStyle?: StyleValue
  dropDownClass?: string;
}

const props = withDefaults(defineProps<Props>(), {
  valueKey: 'code',
  useFullValue: false,
  required: true,
  error: null,
  placeholder: 'choose...',
  selectorClass: '',
  inputClass: '',
  inputStyle: null,
  dropdownClass: ''
});

const model = defineModel<any>({required: true});

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
    <select :id="props.id" v-model="model" :required="props.required" :class="classes" :style="inputStyle">
      <option v-if="props.placeholder" value="" :class="dropDownClass" disabled selected>
        {{ props.placeholder }}
      </option>
      <option v-for="option in props.options" :key="option[props.valueKey]"
              :value="props.useFullValue ? option : option[props.valueKey]"
              :class="dropDownClass">
        <slot name="optionLabel" :item="option">
          {{ option.label || option }}
        </slot>
      </option>
    </select>
  </BaseFormComponent>
</template>

<style scoped>

</style>