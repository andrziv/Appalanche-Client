<script setup lang="ts">
import {ref} from "vue";
import IconCopy from "@/components/icons/IconCopy.vue";

interface Props {
  href: string;
}

const props = defineProps<Props>();
const copied = ref(false);

const copyLink = async () => {
  try {
    await navigator.clipboard.writeText(props.href);
    copied.value = true;
    setTimeout(() => (copied.value = false), 1500);
  } catch (err) {
    console.error("Failed to copy:", err);
  }
};
</script>

<template>
  <a class="flex items-center justify-center py-2 hover:bg-gray-200 transition" @click="copyLink">
    <IconCopy class="px-1 h-4 w-auto border-r border-gray-300"/>
  </a>
  <span v-if="copied" class="absolute -top-6 text-xs text-green-600 font-semibold animate-fade">
    Copied!
  </span>
</template>

<style scoped>
@keyframes fade {
  from {
    opacity: 1;
    transform: translateY(0);
  }
  to {
    opacity: 0;
    transform: translateY(-4px);
  }
}

.animate-fade {
  animation: fade 1.5s ease forwards;
}
</style>