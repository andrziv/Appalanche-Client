<script setup lang="ts">
import {ref} from "vue";
import CreateApplicationModal
  from "@/components/applications/function_bar/add_position_buttons/CreateApplicationModal.vue";
import type {JobApplicationForm} from "@/models/JobApplication";

const isShowingAddModal = ref(false);

const emit = defineEmits(["create:application"]);

const showAddModal = () => {
  isShowingAddModal.value = true;
};

const hideAddModal = () => {
  isShowingAddModal.value = false;
};

function createApplication(draft: JobApplicationForm) {
  emit("create:application", draft);
}

</script>

<template>
  <div class="relative inline-block text-left">
    <button @click="showAddModal"
       class="px-4 py-2 rounded-sm cursor-pointer bg-red-800 dark:bg-red-900 text-white hover:bg-red-700">
      Add Application
    </button>

    <CreateApplicationModal @create:application="newApp => createApplication((newApp))"
                            :show="isShowingAddModal" @close="hideAddModal"/>
  </div>
</template>

<style scoped>

</style>