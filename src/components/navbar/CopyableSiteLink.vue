<script setup lang="ts">
import {defineProps} from "vue";
import IconExternal from "@/components/icons/IconExternal.vue";
import CopyLink from "@/components/CopyLink.vue";

const props = defineProps<{
  href: string;
  label: string;
}>();
</script>

<template>
  <div class="flex items-center bg-gray-100 overflow-hidden">
    <CopyLink :href="props.href"/>
    <a :href='props.href'
       target="_blank"
       rel="noopener noreferrer"
       class="flex items-center space-x-2 px-1 py-2 text-sm hover:bg-gray-200 transition">
      <slot name="icon"/>
      <span class="text-gray-600 text-xs font-semibold">{{ props.label }}</span>
      <IconExternal class="h-3 w-auto"/>
    </a>
  </div>
</template>

<style scoped>

</style>