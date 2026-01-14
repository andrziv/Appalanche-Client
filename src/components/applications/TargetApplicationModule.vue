<script setup lang="ts">
import type {JobApplication} from "@/models/JobApplication";
import {isEqual} from "@/models/JobApplication";
import {getInterestColor} from "@/utility/ColourUtilities";
import TextFormComponent from "@/components/widget/form/TextFormComponent.vue";
import {createIsoBinding} from "@/utility/DateUtilities";
import {computed, onMounted, ref, toRaw, watch} from "vue";
import {useReferenceStore} from "@/stores/static_app_references";
import SelectorFormComponent from "@/components/widget/form/SelectorFormComponent.vue";
import {SIMPLE_FE_APPLICATION_STATUSES} from "@/models/ApplicationStatus";
import RichTextEditor from "@/components/widget/RichTextEditor.vue";
import SimpleSpinner from "@/components/widget/SimpleSpinner.vue";

const props = withDefaults(defineProps<{
  targetApplication: JobApplication,
  isLoading?: boolean,
  isSaving?: boolean
}>(), {
  isLoading: false,
  isSaving: false
});

const draftApplication = ref<JobApplication>(structuredClone(toRaw(props.targetApplication)));

const refStore = useReferenceStore();

onMounted(() => {
  refStore.fetchAll();
});

const statusCoreProxy = computed({
  get: () => {
    const metadata = refStore.getStatusMetadataByCode(draftApplication.value.status.code);
    if (!metadata) {
      return null;
    }
    return metadata.codeFragment;
  },
  set: (newCode: string) => {
    const status = refStore.getMinStatusByCodeFragment(newCode);
    if (!status) {
      return;
    }
    draftApplication.value.status = status;
  }
});

const statusRoundProxy = computed({
  get: () => draftApplication.value.status.round,
  set: (newRound: number) => {
    const potentialCode = [draftApplication.value.status.label.toUpperCase().replace(" ", '_'), newRound].join('_');
    const status = refStore.getStatusByCode(potentialCode);
    if (!status) {
      return;
    }
    draftApplication.value.status = status;
  }
});

const appliedDateRef = computed({
  get: () => draftApplication.value.appliedDate,
  set: (val) => draftApplication.value.appliedDate = val
});

const responseDateRef = computed({
  get: () => draftApplication.value.responseDate,
  set: (val) => draftApplication.value.responseDate = val
});

const appliedDateInput = createIsoBinding(appliedDateRef, "date");
const responseDateInput = createIsoBinding(responseDateRef, "date");

const emit = defineEmits(["select:application", "update:targetApplication", "delete:targetApplication"]);

watch(
    () => props.targetApplication,
    (newVal) => {
      draftApplication.value = structuredClone(toRaw(newVal));
    }
);

function cancelEditing() {
  emit('select:application', null);
}

function save() {
  emit('update:targetApplication', draftApplication.value);
}

function deleteTarget() {
  emit('delete:targetApplication', draftApplication.value.applicationId);
}

const MODIFIABLE_TEXT_FIELD = 'p-1 rounded-none border-b-2 border-neutral-300 dark:border-zinc-800 bg-transparent';

function maxRounds(code: string): number {
  const metadata = refStore.getStatusMetadataByCode(code);
  if (!metadata) {
    return 0;
  }
  return metadata.maxRounds;
}
</script>

<template>
  <div class="relative flex flex-col bg-white dark:bg-zinc-900">
    <div v-if="props.isLoading" class="absolute inset-0 z-20 bg-white/60 dark:bg-zinc-900/60
    backdrop-blur-[1px] flex items-center justify-center transition-opacity duration-200">
      <SimpleSpinner/>
    </div>

    <div class="flex-1 overflow-y-auto pb-4 min-h-0">
      <div class="sticky top-0 z-10 flex flex-wrap items-center justify-between px-2 py-1.5
    border-b border-neutral-100 dark:border-zinc-800 bg-white dark:bg-zinc-900">
        <button class="close-button" @click="cancelEditing">
          Close Editing
        </button>
        <div class="flex flex-row justify-center space-x-4">
          <button type=submit form="modifyApplicationForm" class="flex flex-row gap-2 items-center transition"
                  :class="isEqual(props.targetApplication, draftApplication) ? 'crud-button' : 'crud-button-inactive'">
            <SimpleSpinner v-if="props.isSaving" colour="fill-black" :size="4"/>
            <span>Save Changes</span>
          </button>
          <button class="crud-button" @click="deleteTarget">
            Delete Application
          </button>
        </div>
      </div>
      <div class="p-4 border-b border-neutral-100 dark:border-zinc-800">
        <form id="modifyApplicationForm" @submit.prevent="save" class="space-y-2">
          <div class="flex flex-wrap items-center justify-between">
            <div class="flex flex-row items-center space-x-4">
              <div class="w-2/3 flex space-x-4 rounded-full text-sm items-center font-semibold transition"
                   :style="{backgroundColor: draftApplication.status.colour}">
                <SelectorFormComponent id="status" label="" v-model="statusCoreProxy" value-key="code"
                                       :options="SIMPLE_FE_APPLICATION_STATUSES" :use-full-value="false"
                                       class="shrink-0"
                                       input-class="px-4 py-1 rounded-full text-sm font-semibold
                                     bg-transparent dark:bg-transparent text-white transition"
                                       :input-style="{backgroundColor: draftApplication.status.colour}"
                                       drop-down-class="text-white transition">
                  <template #optionLabel="{ item }">
                    {{ item.label }}
                  </template>
                </SelectorFormComponent>

                <div v-if="maxRounds(draftApplication.status.code) > 1" class="flex flex-row">
                  <p class="w-fit text-white">Round: </p>
                  <TextFormComponent id="status_round" label="" v-model="statusRoundProxy" type="number"
                                     class="w-16" input-class="py-0 text-white bg-transparent dark:bg-transparent"
                                     min="1" :max="maxRounds(draftApplication.status.code)"/>
                </div>
              </div>

              <SelectorFormComponent id="experience" label="" v-model="draftApplication.experience"
                                     :options="refStore.experiences" :use-full-value="true"
                                     class="flex shrink-0"
                                     input-class="px-4 py-1 rounded-full text-sm font-semibold
                                   bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-zinc-300 transition ease-in-out">
                <template #optionLabel="{ item }">
                  {{ item.label }}
                </template>
              </SelectorFormComponent>
            </div>


            <div class="w-fit flex rounded-full text-sm items-center font-semibold transition"
                 :style="{backgroundColor: getInterestColor(draftApplication.interest)}">
              <p class="w-fit ml-4 text-white">Interest: </p>
              <TextFormComponent id="interest" label="" v-model="draftApplication.interest" type="number"
                                 class="py-0.75"
                                 input-class="px-4 py-0 rounded-full text-sm font-semibold
                                     bg-transparent dark:bg-transparent text-white transition"
                                 :input-style="{backgroundColor: draftApplication.status.colour}"
                                 min="1" max="10"/>
            </div>
          </div>

          <div class="flex flex-wrap items-center justify-between">
            <TextFormComponent id="title" v-model="draftApplication.title" label=""
                               type="text" :required="false" placeholder="Company Name"
                               class="w-3/4" :input-class="`${MODIFIABLE_TEXT_FIELD} text-2xl font-semibold`"/>
            <TextFormComponent id="requisitionId" v-model="draftApplication.requisitionId" label=""
                               type="text" placeholder="ID of Job Posting"
                               class="w-1/6 self-end" :input-class="`${MODIFIABLE_TEXT_FIELD} text-right`"/>
          </div>

          <TextFormComponent id="company" v-model="draftApplication.company" label=""
                             type="text" placeholder="Company Name"
                             class="w-1/2" :input-class="MODIFIABLE_TEXT_FIELD"/>

          <TextFormComponent id="postingLink" v-model="draftApplication.jobPostingLink" label=""
                             type="url" :required="false" placeholder="https://... (optional)"
                             :input-class="MODIFIABLE_TEXT_FIELD"/>

          <div class="flex flex-row justify-center space-x-8">
            <div class="flex flex-wrap w-1/2 items-center justify-between">
              <TextFormComponent id="appliedDate" v-model="appliedDateInput" label="" type="date"
                                 :required="false" class="w-full" :input-class="MODIFIABLE_TEXT_FIELD"/>
              <p class="ml-2 text-sm font-semibold text-neutral-400 dark:text-zinc-600">
                Date of Application
              </p>
            </div>
            <div class="flex flex-wrap w-1/2 items-center justify-between">
              <TextFormComponent id="responseDate" v-model="responseDateInput" label="" type="date"
                                 :required="false" class="w-full" :input-class="MODIFIABLE_TEXT_FIELD"/>
              <p class="ml-2 text-sm font-semibold text-neutral-400 dark:text-zinc-600">
                Date of Last Response
              </p>
            </div>
          </div>
        </form>
      </div>
      <div class="p-4">
        <RichTextEditor :model-value="draftApplication.description" :editable="true"
                        @update:model-value="newText => draftApplication.description = newText"/>
      </div>
    </div>
  </div>
</template>

<style scoped>
@reference "@/style.css";

.close-button {
  @apply px-2 py-1.5 rounded-xs cursor-pointer text-sm font-semibold bg-gray-400 dark:bg-neutral-800 text-white dark:text-zinc-400 hover:bg-neutral-600;
}

.crud-button {
  @apply px-2 py-1.5 rounded-xs cursor-pointer text-sm font-semibold bg-red-800 dark:bg-red-900 text-white hover:bg-red-700;
}

.crud-button-inactive {
  @apply px-2 py-1.5 rounded-xs text-sm font-semibold bg-zinc-200 dark:bg-zinc-800 text-gray-400 dark:text-zinc-500;
}
</style>