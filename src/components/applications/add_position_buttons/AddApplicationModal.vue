<script setup lang="ts">
import SimpleModal from "@/components/widget/SimpleModal.vue";
import {ref, toRef} from "vue";
import TextFormComponent from "@/components/widget/form/TextFormComponent.vue";
import {JobApplicationForm} from "@/models/JobApplication";
import {SIMPLE_FE_APPLICATION_STATUSES} from "@/models/ApplicationStatus";
import {ExperienceLevel} from "@/models/ExperienceLevel";
import SelectorFormComponent from "@/components/widget/form/SelectorFormComponent.vue";
import {createIsoBinding} from "@/utility/DateUtilities";

const props = defineProps<{
  show: boolean;
}>();

const getInitialState = (): JobApplicationForm => ({
  requisitionId: "",
  title: '',
  company: '',
  interest: 0,
  statusCode: '',
  experienceLevelCode: '',
  jobPostingLink: "",
  appliedDate: new Date().toISOString(),
  responseDate: ''
});

const formData = ref<JobApplicationForm>(getInitialState());

const appliedDateInput = createIsoBinding(toRef(formData.value, "appliedDate"), "date");
const responseDateInput = createIsoBinding(toRef(formData.value, "responseDate"), "date");

const emit = defineEmits(["close", "update:createApplication"]);

function save() {
  const payload = {...formData.value};

  emit('update:createApplication', payload);
  emit("close");
}
</script>

<template>
  <SimpleModal :show="props.show" title="Add Application" @close="emit('close')">
    <div class="flex flex-col sm:mx-auto sm:w-full sm:max-w-md text-gray-700 dark:text-gray-200">
      <form id="addApplicationForm" class="space-y-2" @submit.prevent="save">
        <div class="space-y-6">
          <div class="flex flex-row justify-center space-x-8">
            <TextFormComponent id="title" v-model="formData.title" label="Job Title"
                               type="text" placeholder="Job Title (e.g. Software Engineer)" class="w-3/4"
                               input-class="bg-neutral-100 dark:bg-zinc-800"/>
            <TextFormComponent id="interest" v-model="formData.interest" label="Position Interest"
                               type="number" placeholder="1 to 10" min="1" max="10"
                               class="w-1/4" input-class="bg-neutral-100 dark:bg-zinc-800"/>
          </div>

          <TextFormComponent id="postingLink" v-model="formData.jobPostingLink" label="Posting Link"
                             type="text" :required="false" placeholder="https://... (optional)"
                             input-class="bg-neutral-100 dark:bg-zinc-800"/>

          <TextFormComponent id="requisitionId" v-model="formData.requisitionId" label="Job/Requisition ID"
                             type="text" :required="false" placeholder="ID of Job Posting (optional but recommended)"
                             input-class="bg-neutral-100 dark:bg-zinc-800"/>

          <TextFormComponent id="company" v-model="formData.company" label="Company Name"
                             type="text" placeholder="Company Name"
                             input-class="bg-neutral-100 dark:bg-zinc-800"/>

          <div class="flex flex-row justify-center space-x-8">
            <SelectorFormComponent id="status" v-model="formData.statusCode" label="Application Status"
                                   :options="SIMPLE_FE_APPLICATION_STATUSES" value-key="code"
                                   class="w-fit" input-class="bg-neutral-100 dark:bg-zinc-800">
              <template #optionLabel="{ item }">
                {{ item.label }}
              </template>
            </SelectorFormComponent>

            <SelectorFormComponent id="experience" v-model="formData.experienceLevelCode" label="Job Experience Level"
                                   :options="ExperienceLevel.values()" value-key="code"
                                   class="w-fit" input-class="bg-neutral-100 dark:bg-zinc-800">
              <template #optionLabel="{ item }">
                {{ item.label }} ({{ item.description }})
              </template>
            </SelectorFormComponent>
          </div>

          <div class="flex flex-row justify-center space-x-8">
            <TextFormComponent id="appliedDate" v-model="appliedDateInput" label="Date of Application" type="date"
                               class="w-full" input-class="bg-neutral-100 dark:bg-zinc-800"/>

            <TextFormComponent id="responseDate" v-model="responseDateInput" label="Date of Last Response" type="date"
                               class="w-full" input-class="bg-neutral-100 dark:bg-zinc-800"/>
          </div>
        </div>
      </form>
    </div>

    <template #footer>
      <div class="flex justify-end space-x-2">
        <button type=submit form="addApplicationForm"
                class="px-3 py-1 rounded-sm bg-red-800 dark:bg-red-900 text-white hover:bg-red-700 transition">
          Save
        </button>
      </div>
    </template>
  </SimpleModal>
</template>

<style scoped>

</style>