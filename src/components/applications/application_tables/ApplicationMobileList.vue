<script setup lang="ts">
import IconExternal from "@/components/icons/IconExternal.vue";
import type {JobApplication} from "@/models/JobApplication";
import {truncateEnd, truncateMiddle} from "@/utility/StringUtilities";

const props = withDefaults(defineProps<{
  applications: JobApplication[],
  isLoading?: boolean
}>(), {
  isLoading: false
});

const emit = defineEmits(["select:application"]);

const formatDate = (dateString: string) =>
    new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
</script>

<template>
  <div class="w-full">
    <div v-if="props.isLoading" class="divide-y divide-gray-100 dark:divide-zinc-700">
      <div v-for="n in 5" :key="n" class="flex flex-row animate-pulse items-center justify-between gap-4 px-4 py-2">
        <div class="w-1 px-2 py-2 align-middle">
          <div class="h-20 w-20 bg-gray-200 dark:bg-zinc-800 rounded-xs"/>
        </div>
        <div class="flex flex-col gap-4 w-3/4">
          <div class="h-4 bg-gray-200 dark:bg-zinc-800 rounded"/>
          <div class="h-4 bg-gray-200 dark:bg-zinc-800 rounded"/>
          <div class="h-4 bg-gray-200 dark:bg-zinc-800 rounded"/>
        </div>
      </div>
    </div>
    <div v-else>
      <div v-for="jobApp in props.applications" :key="jobApp.applicationId" @click="emit('select:application', jobApp)"
           class="flex flex-row justify-between gap-4 px-4 py-2">
        <div class="w-20 min-w-20">
          <img :src="`/logo/name/${jobApp.company}`" :alt="`${jobApp.company} Logo`"
               class="object-contain rounded-xs"/>
        </div>
        <div class="flex flex-col justify-between w-full">
          <div class="flex justify-between">
            <div class="font-semibold">{{ truncateEnd(jobApp.title) }}</div>
            <div>{{ jobApp.experience.label }}</div>
          </div>

          <div class="flex justify-between">
            <div class="truncate font-mono">
              <a v-if="jobApp.jobPostingLink" class="flex flex-1 space-x-2 items-center"
                 :href='jobApp.jobPostingLink'
                 target="_blank"
                 rel="noopener noreferrer"
                 @click.stop>
                <span>
                  {{ truncateMiddle(jobApp.requisitionId) }}
                </span>
                <IconExternal class="h-3 w-auto shrink-0 theme-icon"/>
              </a>
              <div v-else>
                {{ truncateMiddle(jobApp.requisitionId) }}
              </div>
            </div>
            <div class="interest">{{ jobApp.interest }}/10</div>
          </div>
          <div class="flex justify-between">
            <div class="status">
              <div class="w-full text-center text-white font-medium rounded-2xl px-3 py-0.5"
                   :style="{backgroundColor: jobApp.status.colour, color: jobApp.status.textColour}">
                {{ jobApp.status.label }}
              </div>
            </div>
            <div class="font-semibold">{{ formatDate(jobApp.responseDate) }}</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>