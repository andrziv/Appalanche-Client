<script setup lang="ts">
const props = defineProps<{
  start: string | null,
  end: string | null,
  label?: string
}>();

const emit = defineEmits(['update:start', 'update:end']);

const startChange = (value: string | null) => {
  emit('update:start', value);
}

const endChange = (value: string | null) => {
  emit('update:end', value);
}
</script>

<template>
  <div class="flex items-center space-x-1 text-sm pt-1">
    <input type="date" :value="props.start"
           @input="event => startChange((event.target as HTMLInputElement).value)"
           class="rounded-sm px-2 py-1 bg-gray-200 dark:bg-zinc-800 dark:text-gray-100"/>
    <span> to </span>
    <input type="date" :value="props.end"
           @input="event => endChange((event.target as HTMLInputElement).value)"
           class="rounded-sm px-2 py-1 bg-gray-200 dark:bg-zinc-800 dark:text-gray-100"/>
  </div>
</template>

<style scoped>

</style>