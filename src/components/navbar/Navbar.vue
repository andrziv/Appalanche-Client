<script setup lang="ts">
import {useRoute} from "vue-router";
import {computed, ref} from "vue";
import SubNav from "@/components/navbar/SubNav.vue";
import ThemedImage from "@/components/icons/ThemedImage.vue";
import lightLogo from '@/assets/appalanche.svg';
import darkLogo from '@/assets/appalanche_grayscale.svg';

const route = useRoute();

const pageTitle = computed(() => {
  return route.meta?.title || route.name || "Untitled Page";
});

const selectedRegion = ref("USA");
const regions = ["USA", "Canada", "Mexico"];
</script>

<template>
  <div class="navbar fixed z-30 top-0 left-0 w-full bg-white dark:bg-zinc-950">
      <nav class="max-w-7xl flex items-center justify-between px-6 py-3 mx-auto">
        <a href="/">
          <div class="flex place-items-center items-center space-x-6">
            <ThemedImage :lightSrc="lightLogo"
                         :darkSrc="darkLogo"
                         alt="Appalanche logo"
                         imgClass="h-7 w-auto dark:invert-100"/>
            <span class="text-xl font-semibold text-gray-800 dark:text-gray-300 leading-none pb-0.5">
            {{ pageTitle }}
          </span>
          </div>
        </a>

        <div class="flex space-x-4">
          <select v-model="selectedRegion"
                  class="px-3 bg-gray-200 dark:bg-zinc-900 rounded-full text-gray-600 dark:text-gray-300 text-sm focus:outline-none focus:ring-2 focus:ring-red-400">
            <option v-for="region in regions" :key="region">{{ region }}</option>
          </select>

          <div class="flex space-x-2">
            <a class="px-3 py-2 text-sm bg-gray-200 dark:bg-zinc-900 rounded-sm hover:bg-gray-300 dark:hover:bg-zinc-800 transition" href="/login">
              <span class="text-sm font-semibold text-gray-700 dark:text-gray-300">Login</span>
            </a>
            <a class="px-3 py-2 text-sm bg-gray-600 dark:bg-zinc-900 rounded-sm hover:bg-gray-400 dark:hover:bg-zinc-800 transition" href="/signup">
              <span class="text-sm font-semibold text-gray-100 dark:text-gray-300">Sign Up</span>
            </a>
          </div>
        </div>
      </nav>
    <SubNav/>
  </div>
</template>

<style scoped>

</style>