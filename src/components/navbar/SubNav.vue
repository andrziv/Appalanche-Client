<script setup lang="ts">
import JobSitesDropdown from "@/components/navbar/JobSitesDropdown.vue";
import CopyableSiteLink from "@/components/navbar/CopyableSiteLink.vue";
import IconPersonalSite from "@/components/icons/IconPersonalSite.vue";
</script>

<template>
  <div class="bg-gray-100 border-t border-gray-300">
    <div class="flex max-w-7xl mx-auto items-center justify-start px-6 space-x-3">
      <JobSitesDropdown/>

      <CopyableSiteLink label="LinkedIn Profile" href="https://linkedin.com/in/username">
        <template #icon>
          <img src="https://cdn-icons-png.flaticon.com/512/174/174857.png" class="h-3 w-auto" alt="LinkedIn"/>
        </template>
      </CopyableSiteLink>

      <CopyableSiteLink label="GitHub Page" href="https://github.com/username">
        <template #icon>
          <img src="https://cdn-icons-png.flaticon.com/512/25/25231.png" class="h-3 w-auto" alt="GitHub"/>
        </template>
      </CopyableSiteLink>

      <CopyableSiteLink label="Portfolio Site" href="https://yourportfolio.com">
        <template #icon>
          <IconPersonalSite class="h-3 w-auto"/>
        </template>
      </CopyableSiteLink>
    </div>
  </div>
</template>

<style scoped>

</style>