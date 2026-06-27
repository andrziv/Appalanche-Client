<script setup lang="ts">
import ThemedImage from "@/components/icons/ThemedImage.vue";
import IconPersonalSite from "@/components/icons/IconPersonalSite.vue";
import CopyableSiteLink from "@/components/navbar/CopyableSiteLink.vue";
import type {AccountProfile} from "@/stores/profile";

const props = defineProps<{
  profile: AccountProfile | null;
}>();
</script>

<template>
  <div>
    <CopyableSiteLink v-if="props.profile?.linkedInProfile" label="LinkedIn Profile" :href="props.profile?.linkedInProfile">
      <template #icon>
        <img src="https://cdn-icons-png.flaticon.com/512/174/174857.png" class="h-3 w-auto" alt="LinkedIn"/>
      </template>
    </CopyableSiteLink>

    <CopyableSiteLink v-if="props.profile?.gitHubProfile" label="GitHub Page" :href="props.profile?.gitHubProfile">
      <template #icon>
        <ThemedImage lightSrc="https://cdn-icons-png.flaticon.com/512/25/25231.png"
                     darkSrc="https://cdn-icons-png.flaticon.com/512/25/25231.png"
                     alt="GitHub logo"
                     imgClass="h-3 w-auto dark:invert-100"/>
      </template>
    </CopyableSiteLink>

    <CopyableSiteLink v-if="props.profile?.portfolioSite" label="Portfolio Site" :href="props.profile?.portfolioSite">
      <template #icon>
        <IconPersonalSite class="h-3 w-auto theme-icon"/>
      </template>
    </CopyableSiteLink>
  </div>
</template>

<style scoped>

</style>