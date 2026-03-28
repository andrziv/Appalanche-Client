<script setup lang="ts">
import BaseFormComponent from "@/components/widget/form/BaseFormComponent.vue";
import {twMerge} from 'tailwind-merge';
import {computed, useAttrs} from "vue";

interface Props {
  label: string;
  id: string;
  required?: boolean;
  error?: string | null;
  muteErrorMessage?: boolean;
  type?: string;
  placeholder?: string;
  autocomplete?: string;
  inputClass?: string;
}

const props = withDefaults(defineProps<Props>(), {
  required: true,
  error: null,
  type: 'text',
  placeholder: '',
  autocomplete: 'off',
  inputClass: ''
});

defineOptions({inheritAttrs: false});
const attrs = useAttrs();

const model = defineModel<string | number>({required: true});

const innerInputAttrs = computed(() => {
  const {class: cls, style: styl, ...rest} = attrs;
  return rest;
});

// https://github.com/dcastil/tailwind-merge/blob/v2.5.4/docs/recipes.md#extracting-classes-with-tailwinds-apply
const NORM_STYLES = 'w-full px-3 py-2 rounded-sm text-sm bg-zinc-200 dark:bg-zinc-900 text-gray-600 dark:text-white focus:outline-none focus:drop-shadow-xl';
const ERROR_STYLES = 'border border-red-400';

const classes = computed(() => {
  return twMerge(
      NORM_STYLES,
      props.error ? ERROR_STYLES : '',
      props.inputClass
  );
});

const onPaste = (e: ClipboardEvent) => {
  e.preventDefault();

  const trimmedContent = e.clipboardData?.getData('text/plain').trim() || '';
  const input = e.target as HTMLInputElement;
  const start = input.selectionStart ?? 0;
  const end = input.selectionEnd ?? 0;
  const currentVal = String(model.value) ?? '';

  const newValueStr = currentVal.substring(0, start) + trimmedContent + currentVal.substring(end);

  const isNumberType = props.type === 'number' || typeof model.value === 'number';

  if (isNumberType && newValueStr !== '') {
    const parsed = Number(newValueStr);
    model.value = Number.isNaN(parsed) ? model.value : parsed;
  } else {
    model.value = newValueStr;
  }
}
</script>

<template>
  <BaseFormComponent :id="props.id" :label="props.label" :error="props.error"
                     :mute-error-message="props.muteErrorMessage" :class="attrs.class" :style="attrs.style">
    <input :id="props.id" v-model="model" :type="props.type" :placeholder="props.placeholder"
           :autocomplete="props.autocomplete" :required="required"
           :class="classes" v-bind="innerInputAttrs" @paste.prevent="onPaste"/>
  </BaseFormComponent>
</template>

<style scoped>

</style>