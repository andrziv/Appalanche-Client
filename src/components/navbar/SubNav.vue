<script setup lang="ts">
import JobSitesDropdown from "@/components/navbar/JobSitesDropdown.vue";
import CopyableSiteLink from "@/components/navbar/CopyableSiteLink.vue";
import IconPersonalSite from "@/components/icons/IconPersonalSite.vue";
import ThemedImage from "@/components/icons/ThemedImage.vue";
import {useAuthStore} from "@/stores/authentication";
import {JobSite, useProfileStore} from "@/stores/profile";
import {storeToRefs} from "pinia";

const authStore = useAuthStore();
const profileStore = useProfileStore();

const {profile} = storeToRefs(profileStore);

function jobSites(): JobSite[] | undefined {
  return (profileStore.profile?.jobSites?.length) ? profileStore.profile.jobSites : undefined;
}
</script>

<template>
  <div class="bg-gray-100 dark:bg-zinc-900 border-t border-gray-300 dark:border-zinc-800">
    <div class="flex max-w-7xl mx-auto items-center justify-start px-6">
      <JobSitesDropdown :job-sites="jobSites()"/>

      <div v-if="authStore.isAuthenticated" class="flex items-center justify-start space-x-3">
        <CopyableSiteLink v-if="profile?.linkedInProfile" label="LinkedIn Profile" :href="profile?.linkedInProfile">
          <template #icon>
            <img src="https://cdn-icons-png.flaticon.com/512/174/174857.png" class="h-3 w-auto" alt="LinkedIn"/>
          </template>
        </CopyableSiteLink>

        <CopyableSiteLink v-if="profile?.gitHubProfile" label="GitHub Page" :href="profile?.gitHubProfile">
          <template #icon>
            <ThemedImage lightSrc="https://cdn-icons-png.flaticon.com/512/25/25231.png"
                         darkSrc="https://cdn-icons-png.flaticon.com/512/25/25231.png"
                         alt="GitHub logo"
                         imgClass="h-3 w-auto dark:invert-100"/>
          </template>
        </CopyableSiteLink>

        <CopyableSiteLink v-if="profile?.portfolioSite" label="Portfolio Site" :href="profile?.portfolioSite">
          <template #icon>
            <IconPersonalSite class="h-3 w-auto theme-icon"/>
          </template>
        </CopyableSiteLink>
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>