<script setup lang="ts">

import IconDownChevron from "@/components/icons/simple-characters/IconDownChevron.vue";
import SimpleDropdown from "@/components/widget/SimpleDropdown.vue";
import IconDoor from "@/components/icons/IconDoor.vue";
import IconGear from "@/components/icons/IconGear.vue";
import {useAuthStore} from "@/stores/authentication";
import {useProfileStore} from "@/stores/profile";
import {useApplicationStore} from "@/stores/applications";
import router from "@/router";

const authStore = useAuthStore();
const profileStore = useProfileStore();
const applicationStore = useApplicationStore();

const props = defineProps<{
  label: string | null;
}>();

async function logout() {
  await authStore.logout();
  profileStore.clear();
  applicationStore.clearAll();
  await router.push({name: 'Login'});
}
</script>

<template>
  <SimpleDropdown>
    <template #dropdown-button="{dropdownOpen}">
      <div class="flex items-center space-x-2 px-3 py-2 text-sm rounded-sm cursor-pointer transition">
        <span class="text-sm font-semibold themed-harsh-text">{{ props.label }}</span>
        <IconDownChevron class="h-4 w-auto transition-transform theme-icon" :class="{ 'rotate-180': dropdownOpen }"/>
      </div>
    </template>

    <template #dropdown-menu>
      <div class="absolute left-0 p-2 flex flex-col space-y-2 w-max min-w-full pt-1
      bg-gray-200 dark:bg-zinc-900 rounded-sm theme-shadow-dropdown">
        <a class="profile-dropdown-button" href="/settings">
          <IconGear class="theme-icon"/>
          <span class="text-sm font-semibold themed-harsh-text">
            Settings
          </span>
        </a>
        <button class="profile-dropdown-button" @click="logout">
          <IconDoor class="theme-icon"/>
          <span class="text-sm font-semibold themed-harsh-text">
            Log Out
          </span>
        </button>
      </div>
    </template>
  </SimpleDropdown>
</template>

<style scoped>
@reference "../../style.css";

.themed-harsh-text {
  @apply text-black dark:text-gray-300;
}

.profile-dropdown-button {
  @apply flex items-center gap-1.5 px-3 py-2 text-sm rounded-sm hover:bg-gray-300 dark:hover:bg-zinc-800;
}
</style>