<script setup lang="ts">
import JobSitesDropdown from "@/components/navbar/JobSitesDropdown.vue";
import {useAuthStore} from "@/stores/authentication";
import type {JobSite} from "@/stores/profile";
import {useProfileStore} from "@/stores/profile";
import {storeToRefs} from "pinia";
import SimpleDropdown from "@/components/widget/SimpleDropdown.vue";
import IconDownChevron from "@/components/icons/simple-characters/IconDownChevron.vue";
import SubNavSocials from "@/components/navbar/SubNavSocials.vue";

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

      <div v-if="authStore.isAuthenticated">
        <SimpleDropdown class="inline sm:hidden">
          <template #dropdown-button="{dropdownOpen}">
            <div class="flex items-center space-x-2 px-3 py-2 text-sm rounded-sm cursor-pointer transition">
              <span class="text-gray-600 dark:text-zinc-400 text-xs font-semibold">Social Links</span>
              <IconDownChevron class="h-4 w-auto transition-transform theme-icon"
                               :class="{ 'rotate-180': dropdownOpen }"/>
            </div>
          </template>

          <template #dropdown-menu>
            <SubNavSocials :profile="profile" class="absolute left-0 z-50 p-2 flex flex-col space-y-2 w-max min-w-full
            pt-1 bg-gray-200 dark:bg-zinc-900 rounded-sm theme-shadow-dropdown"/>
          </template>
        </SimpleDropdown>

        <SubNavSocials :profile="profile" class="hidden sm:flex items-center justify-start space-x-3"/>
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>