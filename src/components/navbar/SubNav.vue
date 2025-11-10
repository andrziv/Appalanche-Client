<script setup lang="ts">
import JobSitesDropdown from "@/components/navbar/JobSitesDropdown.vue";
import CopyableSiteLink from "@/components/navbar/CopyableSiteLink.vue";
import IconPersonalSite from "@/components/icons/IconPersonalSite.vue";
import ThemedImage from "@/components/icons/ThemedImage.vue";
</script>

<template>
  <div class="bg-gray-100 dark:bg-zinc-900 border-t border-gray-300 dark:border-zinc-800">
    <div class="flex max-w-7xl mx-auto items-center justify-start px-6 space-x-3">
      <JobSitesDropdown/>

      <CopyableSiteLink label="LinkedIn Profile" href="https://linkedin.com/in/username">
        <template #icon>
          <img src="https://cdn-icons-png.flaticon.com/512/174/174857.png" class="h-3 w-auto" alt="LinkedIn"/>
        </template>
      </CopyableSiteLink>

      <CopyableSiteLink label="GitHub Page" href="https://github.com/username">
        <template #icon>
          <ThemedImage lightSrc="https://cdn-icons-png.flaticon.com/512/25/25231.png"
                       darkSrc="https://cdn-icons-png.flaticon.com/512/25/25231.png"
                       alt="GitHub logo"
                       imgClass="h-3 w-auto dark:invert-100"/>
        </template>
      </CopyableSiteLink>

      <CopyableSiteLink label="Portfolio Site" href="https://yourportfolio.com">
        <template #icon>
          <IconPersonalSite class="h-3 w-auto theme-icon"/>
        </template>
      </CopyableSiteLink>
    </div>
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