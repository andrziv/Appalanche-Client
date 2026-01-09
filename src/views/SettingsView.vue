<script setup lang="ts">
import {computed, ref} from "vue";
import type {ProfileInfo} from "@/stores/profile";
import {useProfileStore} from "@/stores/profile";
import ProfileBasicSettings from "@/components/profile/settings/ProfileBasicSettings.vue";
import ProfileSiteSettings from "@/components/profile/settings/ProfileSiteSettings.vue";

const profileStore = useProfileStore();

const formInfo = ref<ProfileInfo>({
  firstname: profileStore.profile?.firstname ?? "",
  surname: profileStore.profile?.surname ?? "",
  linkedInProfile: profileStore.profile?.linkedInProfile ?? "",
  gitHubProfile: profileStore.profile?.gitHubProfile ?? "",
  portfolioSite: profileStore.profile?.portfolioSite ?? ""
});

const formSite = computed(() => profileStore.profile?.jobSites ?? []);

const errors = ref<Record<string, string>>({});

const handleProfileUpdate = async (newData: ProfileInfo) => {
  errors.value = {};
  const success = await profileStore.modify(newData.firstname, newData.surname, newData.linkedInProfile, newData.gitHubProfile, newData.portfolioSite);

  if (success) {
  } else {
    if (profileStore.error) {
      errors.value = profileStore.error;
    }
  }
}

const handleAddJobSite = async (newData: string) => {
  errors.value = {};
  const success = await profileStore.addJobSite(newData);

  if (success) {
  } else {
    if (profileStore.error) {
      errors.value = profileStore.error;
    }
  }
}

const handleRemoveJobSite = async (toRemove: string) => {
  errors.value = {};
  const success = await profileStore.removeJobSite(toRemove);

  if (success) {
  } else {
    if (profileStore.error) {
      errors.value = profileStore.error;
    }
  }
}
</script>

<template>
  <div class="flex flex-col h-full">
    <div class="py-10 bg-gray-100 dark:bg-neutral-800 border-b border-gray-300 dark:border-zinc-800"/>
    <div class="-mt-16 min-h-full w-full max-w-7xl overflow-y-auto mx-auto bg-white dark:bg-zinc-950 rounded-t-sm">
      <ProfileBasicSettings :info="formInfo" :is-loading="profileStore.isLoading" :errors="errors"
                            @submit:data="handleProfileUpdate"/>
      <ProfileSiteSettings :sites="formSite" @add:job-site="handleAddJobSite" @remove:job-site="handleRemoveJobSite"/>
    </div>
  </div>
</template>

<style scoped>

</style>