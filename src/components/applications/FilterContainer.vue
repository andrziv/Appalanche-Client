<script setup lang="ts">
import IconDownChevron from "@/components/icons/IconDownChevron.vue";
import SimpleDropdown from "@/components/widget/SimpleDropdown.vue";

const props = defineProps<{
  label: string;
  title: string;
  description: string;
  filterActive: boolean;
}>();
</script>

<template>
  <SimpleDropdown>
    <template #dropdown-button="{dropdownOpen}">
      <div class="flex items-center space-x-2 px-3 py-2 text-sm rounded-sm cursor-pointer transition"
           :class="filterActive ? 'toggled-button-background' : 'filter-button-background'">
        <span class="text-sm font-semibold text-gray-100 dark:text-gray-300">{{ props.label }}</span>
        <IconDownChevron class="h-4 w-auto transition-transform theme-icon" :class="{ 'rotate-180': dropdownOpen }"/>
      </div>
    </template>

    <template #dropdown-menu>
      <div class="absolute left-0 mt-1 p-4 flex flex-col space-y-2 w-max min-w-full
      bg-white dark:bg-zinc-900 rounded-sm theme-shadow-dropdown">
        <div class="flex flex-col space-y-2">
          <span class="font-semibold">{{ props.title }}</span>
          <span class="text-xs">{{ props.description }}</span>
        </div>

        <slot name="dropdown-menu"/>
      </div>
    </template>
  </SimpleDropdown>
</template>

<style scoped>
@reference "../../style.css";

.filter-button-background {
  @apply bg-[#C4615B] dark:bg-zinc-900 hover:bg-[#D8827D] dark:hover:bg-zinc-800;
}

.toggled-button-background {
  @apply bg-[#CB3B3B] dark:bg-[#9B2C2C] hover:bg-[#EA4242] dark:hover:bg-[#9B3B3B];
}
</style>