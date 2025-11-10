<script setup lang="ts">
import {hardcodedApps} from "@/models/MockData";
import FilterBar from "@/components/FilterBar.vue";
import ApplicationList from "@/components/ApplicationList.vue";
</script>

<template>
  <div class="flex flex-col gap-4">
    <FilterBar/>
    <ApplicationList :applications="hardcodedApps"/>
  </div>
</template>

<style scoped>

</style>