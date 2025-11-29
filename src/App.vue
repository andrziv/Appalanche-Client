<script setup lang="ts">
import Navbar from "@/components/navbar/Navbar.vue";
</script>

<template>
  <Navbar/>
  <main class="pt-23 h-screen overflow-hidden flex flex-col">
    <router-view/>
  </main>
</template>

<style scoped>

</style>
