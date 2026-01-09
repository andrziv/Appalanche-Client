<script setup lang="ts">
import Navbar from "@/components/navbar/Navbar.vue";
import {useAuthStore} from "@/stores/authentication";
import {onMounted, onUnmounted} from "vue";

const authStore = useAuthStore();

const handleVisibilityChange = () => {
  if (document.visibilityState === 'visible' && authStore.isAuthenticated) {
    authStore.realignCookieRefreshSchedule();
  }
};

onMounted(async () => {
  document.addEventListener('visibilitychange', handleVisibilityChange);
  authStore.realignCookieRefreshSchedule();
});

onUnmounted(() => {
  document.removeEventListener('visibilitychange', handleVisibilityChange);
});
</script>

<template>
  <Navbar/>
  <main class="pt-23 h-screen overflow-hidden flex flex-col">
    <router-view/>
  </main>
</template>

<style scoped>

</style>
