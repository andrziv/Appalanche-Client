<script setup lang="ts">
import IconXMark from "@/components/icons/IconXMark.vue";

const props = defineProps<{
  show: boolean;
  title: string;
}>()

const emit = defineEmits(['close']);
const close = () => emit('close');
</script>

<template>
  <div v-if="props.show" @click="close"
       class="fixed inset-0 z-40 flex items-center justify-center bg-black/50 dark:bg-black/70">
    <div @click.stop class="relative bg-white dark:bg-zinc-900 rounded-lg shadow-2xl w-full max-w-lg mx-4">
      <header class="flex justify-between items-center border-b border-gray-200 dark:border-neutral-800 px-4 py-2">
        <h2 class="text-lg font-semibold text-gray-800 dark:text-gray-100">
          {{ props.title }}
        </h2>
        <button @click="close" class="text-gray-500 hover:text-gray-700 dark:hover:text-gray-300">
          <IconXMark class="h-4 w-auto dark:invert-70"/>
        </button>
      </header>

      <div class="p-4">
        <slot/>
      </div>

      <footer v-if="$slots.footer" class="border-t border-gray-200 dark:border-neutral-800 px-4 py-2">
        <slot name="footer"/>
      </footer>
    </div>
  </div>
</template>

<style scoped>

</style>