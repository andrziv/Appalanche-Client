<script setup lang="ts">
const props = withDefaults(defineProps<{
  modelValue: any[],
  options: readonly any[],
  valueKey?: string,
  idPrefix?: string
}>(), {
  valueKey: 'code',
  idPrefix: 'chkbox'
});

const emit = defineEmits(['update:modelValue']);

const toggleItem = (value: any, isChecked: boolean) => {
  const copy = props.modelValue.slice();

  const index = copy.indexOf(value);
  if (isChecked && index === -1) {
    copy.push(value);
  } else if (!isChecked && index !== -1) {
    copy.splice(index, 1);
  }

  emit('update:modelValue', copy);
};
</script>

<template>
  <div class="checkbox-list">
    <div v-for="item in props.options" :key="item[props.valueKey]"
         class="flex items-center space-x-2 mb-2">
      <input type="checkbox" :id="`${props.idPrefix}-${item[props.valueKey]}`"
             :checked="props.modelValue.includes(item[props.valueKey])"
             @change="event => toggleItem(item[props.valueKey], (event.target as HTMLInputElement).checked)"
             class="appearance-none h-4 w-4 checkbox-entry-colouring rounded-sm cursor-pointer transition"/>
      <label :for="`${props.idPrefix}-${item[props.valueKey]}`" class="cursor-pointer flex-1">
        <slot name="label" :item="item">
          {{ item.label || item }}
        </slot>
      </label>
    </div>
  </div>
</template>

<style scoped>
@reference "../../style.css";

.checkbox-entry-colouring {
  @apply bg-gray-200 hover:bg-gray-300 dark:bg-zinc-800 dark:hover:bg-zinc-700
  checked:bg-green-600 hover:checked:bg-green-800 dark:hover:checked:bg-green-400;
}
</style>