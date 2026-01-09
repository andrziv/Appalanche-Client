<script setup lang="ts">
import {nextTick, ref} from 'vue';
import type {JobSite} from "@/stores/profile";
import TextFormComponent from "@/components/widget/form/TextFormComponent.vue";
import LoadingButton from "@/components/widget/LoadingButton.vue";

const props = defineProps<{
  sites: JobSite[]
}>();

const emit = defineEmits(['add:jobSite', 'remove:jobSite']);

const isAdding = ref(false);
const newUrl = ref('');
const inputRef = ref<HTMLInputElement | null>(null);

const startAdding = async () => {
  isAdding.value = true;
  await nextTick();
  inputRef.value?.focus();
};

const cancelAdding = () => {
  isAdding.value = false;
  newUrl.value = '';
};

const submitAdd = () => {
  if (!newUrl.value.trim()) {
    cancelAdding();
    return;
  }

  emit('add:jobSite', newUrl.value.trim());
  cancelAdding();
};
</script>

<template>
  <div class="flex flex-col px-8 py-10 w-full p-4">
    <h2 class="text-xl font-semibold text-gray-900 dark:text-gray-200">
      Add/Remove Job Sites
    </h2>

    <div class="mt-8 space-y-2">
      <div v-for="site in props.sites" :key="site.siteId" class="flex items-center rounded-lg">
        <div class="flex flex-row w-full space-x-4 items-center">
          <div class="w-8 min-w-8">
            <img :src="`/logo/name/${site.name}`" :alt="`${site.name} Logo`"
                 class="object-contain rounded-xs"/>
          </div>

          <div class="flex flex-row w-full px-3 py-1.5 rounded-sm text-sm self-center
          bg-zinc-200/40 dark:bg-zinc-900/40 text-gray-600 dark:text-white">
            <p class="w-1/5 py-1">
              {{ site.name }}
            </p>

            <p class="w-full pl-4 py-1 border-l border-gray-300 dark:border-zinc-800">
              {{ site.url }}
            </p>
          </div>

          <div class="flex flex-row w-1/6 space-x-2">
            <LoadingButton :isSpinning="false" text="Delete" @click="emit('remove:jobSite', site.siteId)"/>
          </div>
        </div>
      </div>

      <div class="pt-2 flex items-center">
        <button v-if="!isAdding" @click="startAdding"
                class="flex items-center w-full gap-2 px-3 py-2 text-sm font-medium rounded-md transition border border-dashed
                text-red-500 border-red-800 dark:border-red-900 hover:border-red-700 hover:bg-gray-200 dark:hover:bg-zinc-900">
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"></path>
          </svg>
          Add Link
        </button>

        <form v-else @submit.prevent="submitAdd" class="flex items-center w-full bg-white dark:bg-zinc-900 rounded-sm">
          <TextFormComponent id="newSiteLink" v-model="newUrl" label="" type="text"
                             placeholder="New Job Site URL" class="w-full"/>

          <button type="submit" @mousedown.prevent class="pr-2 text-red-500 hover:text-red-700">
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
            </svg>
          </button>
        </form>
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>