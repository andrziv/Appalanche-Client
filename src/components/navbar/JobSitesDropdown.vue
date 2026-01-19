<script setup lang="ts">
import {ref} from 'vue';
import IconExternal from '../icons/IconExternal.vue';
import IconDownChevron from '../icons/simple-characters/IconDownChevron.vue';
import IconJobBoard from '../icons/IconJobBoard.vue';
import type {JobSite} from "@/stores/profile";

const props = withDefaults(defineProps<{
  jobSites?: JobSite[],
}>(), {
  jobSites: () => [{
    siteId: "fixed-jobsite-1",
    name: "LinkedIn",
    url: "https://www.linkedin.com"
  }, {
    siteId: "fixed-jobsite-2",
    name: "Indeed",
    url: "https://ca.indeed.com/"
  }]
});

const dropdownOpen = ref(false);
let hoverTimeout: ReturnType<typeof setTimeout> | null = null;

const openDropdown = () => {
  if (hoverTimeout) clearTimeout(hoverTimeout);
  dropdownOpen.value = true;
}

const closeDropdown = () => {
  hoverTimeout = setTimeout(() => {
    dropdownOpen.value = false;
  }, 150);
}
</script>

<template>
  <div class="relative flex items-center" @mouseenter="openDropdown"
       @mouseleave="closeDropdown">
    <button class="flex items-center space-x-2 px-3 py-2 hover:bg-gray-200 dark:hover:bg-zinc-800 transition">
      <IconJobBoard class="h-4 w-auto theme-icon"/>
      <span class="text-gray-600 dark:text-zinc-400 text-xs font-semibold">Job Boards</span>
      <IconDownChevron class="h-4 w-auto theme-icon"/>
    </button>

    <Transition
        enter-active-class="transition ease-out duration-200"
        enter-from-class="opacity-0 -translate-x-2"
        enter-to-class="opacity-100 translate-x-0"
        leave-active-class="transition ease-in duration-150"
        leave-from-class="opacity-100 translate-x-0"
        leave-to-class="opacity-0 -translate-x-2">
      <div v-if="dropdownOpen" class="absolute top-full w-40 bg-white dark:bg-zinc-950 shadow-md">
        <a v-for="site in props.jobSites"
           :key="site.name"
           :href="site.url"
           target="_blank"
           rel="noopener noreferrer"
           class="flex items-center justify-between px-3 py-2 hover:bg-gray-200 dark:hover:bg-zinc-800 transition">
          <div class="flex items-center space-x-2">
            <div class="w-5 min-w-5">
              <img :src="`/logo/name/${site.name}`" :alt="`${site.name} Logo`"
                   class="object-contain rounded-xs"/>
            </div>
            <span class="text-gray-600 dark:text-zinc-400">{{ site.name }}</span>
          </div>
          <IconExternal class="h-3 w-3 text-gray-500 theme-icon"/>
        </a>
      </div>
    </Transition>
  </div>
</template>

<style scoped>
.theme-icon {
  color: #000;
}

@media (prefers-color-scheme: dark) {
  .theme-icon {
    filter: invert(0.7);
  }
}
</style>