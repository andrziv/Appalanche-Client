<script setup lang="ts">
import IconSearch from "@/components/icons/IconSearch.vue";

const props = withDefaults(defineProps<{
  modelValue: string,
  placeholder?: string
}>(), {
  placeholder: "Search..."
});

const emit = defineEmits(['update:modelValue']);

const pingUpdate = (value: string) => {
  emit('update:modelValue', value);
};
</script>

<template>
  <IconSearch class="h-6 w-auto px-2 invert dark:invert-70"/>
  <input :value="props.modelValue" @input="event => pingUpdate((event.target as HTMLInputElement).value)"
         type="text" :placeholder="props.placeholder"
         class="w-full p-2 focus:outline-none"/>
</template>

<style scoped>

</style>