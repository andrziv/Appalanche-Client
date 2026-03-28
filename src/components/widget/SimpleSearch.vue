<script setup lang="ts">
import IconSearch from "@/components/icons/IconSearch.vue";
import {ref, watch} from "vue";

const props = withDefaults(defineProps<{
  modelValue: string,
  placeholder?: string
}>(), {
  placeholder: "Search..."
});

const model = ref<string>(props.modelValue);

watch(
    () => props.modelValue,
    (newValue) => {
      if (newValue !== model.value) {
        model.value = newValue;
      }
    }
);

const onPaste = (e: ClipboardEvent) => {
  e.preventDefault();

  const trimmedContent = e.clipboardData?.getData('text/plain').trim() || '';

  const input = e.target as HTMLInputElement;
  const start = input.selectionStart ?? 0;
  const end = input.selectionEnd ?? 0;
  const currentVal = model.value ?? '';

  const newValue = currentVal.substring(0, start) + trimmedContent + currentVal.substring(end);
  model.value = newValue;
  pingUpdate(newValue);
}

const emit = defineEmits(['update:modelValue']);

const pingUpdate = (value: string) => {
  emit('update:modelValue', value);
};
</script>

<template>
  <IconSearch class="h-6 w-auto px-2 invert dark:invert-70"/>
  <input :value="model"
         @paste.prevent="onPaste"
         @input="event => pingUpdate((event.target as HTMLInputElement).value)"
         type="text" :placeholder="props.placeholder"
         class="w-full p-2 focus:outline-none"/>
</template>

<style scoped>

</style>