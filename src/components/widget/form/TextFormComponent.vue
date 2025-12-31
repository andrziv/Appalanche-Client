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
</script>

<template>
  <BaseFormComponent :id="props.id" :label="props.label" :error="props.error"
                     :mute-error-message="props.muteErrorMessage" :class="attrs.class" :style="attrs.style">
    <input :id="props.id" v-model="model" :type="props.type" :placeholder="props.placeholder"
           :autocomplete="props.autocomplete" :required="required"
           :class="classes" v-bind="innerInputAttrs"/>
  </BaseFormComponent>
</template>

<style scoped>

</style>