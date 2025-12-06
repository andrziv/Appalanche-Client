<script setup lang="ts">
import {onBeforeUnmount, onMounted, ref} from "vue";
import IconDownChevron from "@/components/icons/IconDownChevron.vue";

const props = defineProps<{
  label: string;
  title: string;
  description: string;
  filterActive: boolean;
}>();

const open = ref(false);
const dropdownRef = ref<HTMLElement | null>(null);

function toggleDropdown() {
  if (!open.value) {
    window.dispatchEvent(new CustomEvent("close-all-filter-dropdowns"));
  }
  open.value = !open.value;
}

function handleClickOutside(event: MouseEvent) {
  if (dropdownRef.value && !dropdownRef.value.contains(event.target as Node)) {
    open.value = false;
  }
}

function handleGlobalClose() {
  open.value = false;
}

onMounted(() => {
  document.addEventListener("click", handleClickOutside);
  window.addEventListener("close-all-filter-dropdowns", handleGlobalClose);
});
onBeforeUnmount(() => {
  document.removeEventListener("click", handleClickOutside);
  window.removeEventListener("close-all-filter-dropdowns", handleGlobalClose);
});
</script>

<template>
  <div ref="dropdownRef" class="relative inline-block text-left">
    <a @click.stop="toggleDropdown"
       class="flex items-center space-x-2 px-3 py-2 text-sm rounded-sm cursor-pointer transition"
       :class="filterActive ? 'toggledButtonBackground' : 'buttonBackground'">
      <span class="text-sm font-semibold text-gray-100 dark:text-gray-300">{{ props.label }}</span>
      <IconDownChevron class="h-4 w-auto transition-transform theme-icon" :class="{ 'rotate-180': open }"/>
    </a>

    <transition enter-active-class="transition ease-out duration-150"
                enter-from-class="opacity-0 -translate-y-1"
                enter-to-class="opacity-100 translate-y-0"
                leave-active-class="transition ease-in duration-100"
                leave-from-class="opacity-100 translate-y-0"
                leave-to-class="opacity-0 -translate-y-1">
      <div v-if="open"
           class="absolute left-0 mt-1 p-4 flex flex-col space-y-2 w-max min-w-full bg-white dark:bg-zinc-900 rounded-sm shadow-2xl">
        <div class="flex flex-col space-y-2">
          <span class="font-semibold">{{ props.title }}</span>
          <span class="text-xs">{{ props.description }}</span>
        </div>

        <slot name="dropdown-menu"/>
      </div>
    </transition>
  </div>
</template>

<style scoped>
@reference "../../style.css";

.buttonBackground {
  @apply bg-[#C4615B] dark:bg-zinc-900 hover:bg-[#D8827D] dark:hover:bg-zinc-800;
}

.toggledButtonBackground {
  @apply bg-[#CB3B3B] dark:bg-[#9B2C2C] hover:bg-[#EA4242] dark:hover:bg-[#9B3B3B];
}
</style>