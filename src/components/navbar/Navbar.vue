<script setup lang="ts">
import {useRoute} from "vue-router";
import {computed} from "vue";
import SubNav from "@/components/navbar/SubNav.vue";
import ThemedImage from "@/components/icons/ThemedImage.vue";
import lightLogo from '@/assets/appalanche.svg';
import darkLogo from '@/assets/appalanche_grayscale.svg';
import {useAuthStore} from "@/stores/authentication";
import {useProfileStore} from "@/stores/profile";
import ProfileDropdown from "@/components/navbar/ProfileDropdown.vue";

const route = useRoute();
const authStore = useAuthStore();
const profileStore = useProfileStore();

const pageTitle = computed(() => {
  return route.meta?.title || route.name || "Untitled Page";
});
</script>

<template>
  <div class="navbar fixed z-30 top-0 left-0 w-full bg-white dark:bg-zinc-950">
    <nav class="max-w-7xl flex items-center justify-between px-6 py-3 mx-auto">
      <RouterLink to="/">
        <div class="flex place-items-center items-center space-x-6">
          <ThemedImage :lightSrc="lightLogo"
                       :darkSrc="darkLogo"
                       alt="Appalanche logo"
                       imgClass="h-7 w-auto dark:invert-100"/>
          <span class="text-xl font-semibold text-gray-800 dark:text-gray-300 leading-none pb-0.5">
            {{ pageTitle }}
          </span>
        </div>
      </RouterLink>

      <div class="flex space-x-4">
        <div v-if="!authStore.isAuthenticated" class="flex space-x-2">
          <RouterLink class="px-3 py-2 text-sm bg-gray-200 dark:bg-zinc-900 rounded-sm hover:bg-gray-300 dark:hover:bg-zinc-800 transition"
             to="/login">
            <span class="text-sm font-semibold text-gray-700 dark:text-gray-300">Login</span>
          </RouterLink>
          <RouterLink class="px-3 py-2 text-sm bg-gray-600 dark:bg-zinc-900 rounded-sm hover:bg-gray-400 dark:hover:bg-zinc-800 transition"
             to="/signup">
            <span class="text-sm font-semibold text-gray-100 dark:text-gray-300">Sign Up</span>
          </RouterLink>
        </div>
        <ProfileDropdown v-else :label="profileStore.fullName"/>
      </div>
    </nav>
    <SubNav/>
  </div>
</template>

<style scoped>

</style>