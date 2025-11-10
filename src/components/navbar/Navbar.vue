<script setup lang="ts">
import {useRoute} from "vue-router";
import {computed, ref} from "vue";
import SubNav from "@/components/navbar/SubNav.vue";

const route = useRoute();

const pageTitle = computed(() => {
  return route.meta?.title || route.name || "Untitled Page";
});

const selectedRegion = ref("USA");
const regions = ["USA", "Canada", "Mexico"];
</script>

<template>
  <div class="navbar fixed top-0 left-0 w-full">
    <div class="bg-white">
      <nav class="max-w-7xl flex items-center justify-between px-6 py-3 mx-auto">
        <div class="flex place-items-center items-center space-x-6">
          <img src="@/assets/jobhunt.svg" alt="Logo" class="h-7 w-auto"/>
          <span class="text-xl font-semibold text-gray-800 leading-none pb-0.5">
            {{ pageTitle }}
          </span>
        </div>

        <div class="flex space-x-4">
          <select v-model="selectedRegion"
                  class="px-3 bg-gray-200 rounded-full text-gray-600 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400">
            <option v-for="region in regions" :key="region">{{ region }}</option>
          </select>

          <div class="flex space-x-2">
            <a class="px-3 py-2 text-sm bg-gray-200 rounded-sm hover:bg-gray-300 transition">
              <span class="text-sm font-semibold text-gray-700">Login</span>
            </a>
            <a class="px-3 py-2 text-sm bg-gray-600 rounded-sm hover:bg-gray-400 transition">
              <span class="text-sm font-semibold text-gray-100">Sign Up</span>
            </a>
          </div>
        </div>
      </nav>
    </div>
    <SubNav/>
  </div>
</template>

<style scoped>

</style>