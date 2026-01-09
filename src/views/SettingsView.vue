<script setup lang="ts">
import {reactive, ref} from "vue";
import type {ProfileInfo} from "@/stores/profile";
import {useProfileStore} from "@/stores/profile";
import ProfileBasicSettings from "@/components/profile/settings/ProfileBasicSettings.vue";

const profileStore = useProfileStore();

const form = reactive<ProfileInfo>({
  firstname: profileStore.profile?.firstname ?? "",
  surname: profileStore.profile?.surname ?? "",
  linkedInProfile: profileStore.profile?.linkedInProfile ?? "",
  gitHubProfile: profileStore.profile?.gitHubProfile ?? "",
  portfolioSite: profileStore.profile?.portfolioSite ?? ""
});

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
</script>

<template>
  <div class="flex flex-col h-full">
    <div class="py-10 bg-gray-100 dark:bg-neutral-800 border-b border-gray-300 dark:border-zinc-800"/>
    <div class="-mt-16 min-h-full w-full max-w-7xl overflow-y-auto mx-auto bg-white dark:bg-zinc-950 rounded-t-sm">
      <ProfileBasicSettings :info="form" :is-loading="profileStore.isLoading" :errors="errors"
                            @submit:data="handleProfileUpdate"/>
    </div>
  </div>
</template>

<style scoped>

</style>