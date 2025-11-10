<script setup lang="ts">
import Navbar from "@/components/navbar/Navbar.vue";
</script>

<template>
  <Navbar/>
  <main class="w-full justify-start pt-20">
    <router-view/>
  </main>
</template>

<style scoped>

</style>
